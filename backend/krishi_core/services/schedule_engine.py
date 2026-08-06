import os
import json
import requests
from datetime import datetime, timedelta
from django.utils.timezone import make_aware, is_aware
from krishi_core.models import ScheduleTask, CropPlan, Alert, Notification

# Load the JSON data generated from the Node.js files
BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))

with open(os.path.join(BASE_DIR, 'crop_database.json'), 'r') as f:
    CROP_DATABASE = json.load(f)

with open(os.path.join(BASE_DIR, 'crop_task_templates.json'), 'r') as f:
    tpl_data = json.load(f)
    TASK_TEMPLATES = tpl_data.get('taskTemplates', {})
    CATEGORY_ICONS = tpl_data.get('categoryIcons', {})

CRITICAL_STAGES = [
    "Sowing", "Planting", "Sett Planting", "Nursery", "Land Preparation",
    "Transplanting", "Flowering", "Harvest", "Germination",
]

def get_category_icon(category):
    return CATEGORY_ICONS.get(category, "📋")

def get_stage_template(crop_name, stage_name):
    # Mimic JS logic
    for group, template in TASK_TEMPLATES.items():
        if crop_name.lower() in template.get('appliesTo', []):
            if stage_name in template.get('stages', {}):
                return template['stages'][stage_name]
    return None

def categorize_stage(stage_name):
    s = stage_name.lower()
    if any(x in s for x in ["sow", "transplant", "nursery", "land prep", "planting", "pit"]): return "planting"
    if any(x in s for x in ["irrigat", "flood"]): return "irrigation"
    if any(x in s for x in ["fertiliz", "nutrition", "nitrogen"]): return "fertilizer"
    if "harvest" in s: return "harvest"
    if any(x in s for x in ["pest", "scout", "disease", "monitor"]): return "monitoring"
    return "monitoring"

def add_days(date_obj, days):
    return date_obj + timedelta(days=days)

def is_critical_stage(stage_name):
    s_lower = stage_name.lower()
    return any(c.lower() in s_lower for c in CRITICAL_STAGES)

def get_stage_for_day(growth_stages, day):
    active = growth_stages[0]
    for stage in growth_stages:
        if stage['dayOffset'] <= day:
            active = stage
        else:
            break
    return active

def get_previous_stage(growth_stages, active_stage):
    try:
        idx = next(i for i, s in enumerate(growth_stages) if s['stage'] == active_stage['stage'])
        return growth_stages[idx - 1] if idx > 0 else None
    except StopIteration:
        return None

def get_next_stage(growth_stages, day):
    for s in growth_stages:
        if s['dayOffset'] > day:
            return s
    return None

def get_stage_day_number(active_stage, day):
    return max(1, day - active_stage['dayOffset'] + 1)

INSPECTION_VARIANTS = [
    {"label": "Pest & disease scan", "detail": "Walk field edges, check leaf undersides for eggs, larvae, and early disease spots on 10 plants."},
    {"label": "Growth & canopy check", "detail": "Measure plant height at 5 sentinel plants. Compare to growth benchmark. Flag stunted patches."},
    {"label": "Weed pressure check", "detail": "Scan for new weed growth near bunds and channels. Hand-pull or spot-spray as needed."},
    {"label": "Soil moisture check", "detail": "Press finger 5 cm into root zone soil. Note whether dry, moist, or waterlogged. Adjust irrigation."},
    {"label": "Nutrient deficiency scan", "detail": "Inspect leaf colour on 10 plants. Yellowing (N), purple (P), or brown margins (K) indicate deficiency."},
]

def at_time(date_obj, hours, minutes):
    return date_obj.replace(hour=hours, minute=minutes, second=0, microsecond=0)

def base_task_fields(crop_plan, category, is_critical=False, day_number=0, stage_name=""):
    return {
        "owner": crop_plan.owner,
        "farm": crop_plan.farm,
        "cropPlan": crop_plan,
        "category": category,
        "isCritical": is_critical,
        "status": "pending",
        "aiGenerated": True,
        "dayNumber": day_number,
        "stageName": stage_name,
        "icon": get_category_icon(category),
    }

def compute_season_progress(sowing_date, duration_days):
    today = make_aware(datetime.now()) if not is_aware(datetime.now()) else datetime.now()
    if not is_aware(sowing_date): sowing_date = make_aware(sowing_date)
    elapsed = max(0, round((today - sowing_date).days))
    return min(100, round((elapsed / duration_days) * 100))

def build_tasks_for_day(crop_plan, crop_def, growth_stages, day, inspection_seq):
    active_stage = get_stage_for_day(growth_stages, day)
    milestone_stage = next((s for s in growth_stages if s['dayOffset'] == day), None)
    previous_stage = get_previous_stage(growth_stages, active_stage)
    next_stage = get_next_stage(growth_stages, day)
    stage_day = get_stage_day_number(active_stage, day)
    day_date = add_days(crop_plan.sowingDate, day)

    if milestone_stage:
        critical = is_critical_stage(milestone_stage['stage'])
        category = categorize_stage(milestone_stage['stage'])
        date = at_time(day_date, 8, 0)
        
        desc = ""
        if previous_stage:
            desc = f"Day {day}: transition from {previous_stage['stage']} to {milestone_stage['stage']}. "
            desc += f"Next stage: {next_stage['stage']}." if next_stage else "Final stage — complete all operations."
        else:
            desc = f"Day {day}: start the crop plan with {milestone_stage['stage']}. "
            desc += f"Next stage: {next_stage['stage']}." if next_stage else ""

        task = base_task_fields(crop_plan, category, critical, day, milestone_stage['stage'])
        task.update({
            "title": f"{milestone_stage['stage']} begins — {crop_plan.cropName}",
            "description": desc,
            "date": date,
            "originalDate": date,
            "priority": "high" if critical else "medium",
            "estimatedMinutes": 120 if critical else 60,
        })
        return [task]

    template = get_stage_template(crop_plan.cropName, active_stage['stage'])
    if template:
        if stage_day % template.get('interval', 1) != 1: return []
        tasks_list = template.get('tasks', [])
        task_def = tasks_list[(stage_day - 1) % len(tasks_list)]
        date = at_time(day_date, 8, 30)
        task = base_task_fields(crop_plan, task_def.get('category', 'monitoring'), task_def.get('priority') == "high", day, active_stage['stage'])
        task.update({
            "title": task_def.get('title'),
            "description": f"[Day {day} — {active_stage['stage']}] {task_def.get('description')}",
            "date": date,
            "originalDate": date,
            "priority": task_def.get('priority', 'medium'),
            "estimatedMinutes": task_def.get('estimatedMinutes', 45),
            "icon": task_def.get('icon', get_category_icon(task_def.get('category', 'monitoring'))),
        })
        return [task]

    tasks = []
    water_need = crop_def.get('waterNeedCategory', 'medium')
    irrigation_interval = 3 if water_need == "high" else 5 if water_need == "medium" else 7
    needs_irrigation = day > 0 and day % irrigation_interval == 0
    needs_nutrition = day > 0 and day % 15 == 0
    needs_inspection = day > 0 and day % 3 == 0

    if needs_inspection:
        variant = INSPECTION_VARIANTS[inspection_seq % len(INSPECTION_VARIANTS)]
        date = at_time(day_date, 10, 0)
        rn = crop_def.get('riskNotes', '')
        t = base_task_fields(crop_plan, "monitoring", False, day, active_stage['stage'])
        t.update({
            "title": f"{variant['label']} — {active_stage['stage']}",
            "description": f"[Day {day}] {variant['detail']}" + (f" Known risk for this crop: {rn}" if rn else ""),
            "date": date,
            "originalDate": date,
            "priority": "low",
            "estimatedMinutes": 30,
        })
        tasks.append(t)

    if needs_nutrition:
        date = at_time(day_date, 11, 45)
        ns = next_stage['stage'] if next_stage else "harvest close"
        t = base_task_fields(crop_plan, "fertilizer", False, day, active_stage['stage'])
        t.update({
            "title": f"Fertilizer / nutrient check — {active_stage['stage']}",
            "description": f"[Day {day}] Inspect leaf colour for deficiency signs, then apply the scheduled fertilizer dose. Next stage: {ns}.",
            "date": date,
            "originalDate": date,
            "priority": "medium",
            "estimatedMinutes": 45,
        })
        tasks.append(t)

    if needs_irrigation:
        date = at_time(day_date, 16, 0)
        t = base_task_fields(crop_plan, "irrigation", False, day, active_stage['stage'])
        t.update({
            "title": f"Irrigation — {active_stage['stage']}",
            "description": f"[Day {day}] Check root-zone moisture and irrigate if the soil has dried since the last check.",
            "date": date,
            "originalDate": date,
            "priority": "medium" if water_need == "high" else "low",
            "estimatedMinutes": 40,
        })
        tasks.append(t)

    return tasks

def generate_schedule_for_crop_plan(crop_plan, source="fallback", start_day=0):
    start_day = max(0, int(start_day or 0))
    crop_def = next((c for c in CROP_DATABASE if c['name'] == crop_plan.cropName), None)
    if not crop_def:
        raise ValueError(f"No growth-stage template found for crop {crop_plan.cropName}")

    milestones = []
    for stage in crop_def.get('growthStages', []):
        milestones.append({
            "stage": stage['stage'],
            "plannedDate": add_days(crop_plan.sowingDate, stage['dayOffset']).isoformat(),
            "status": "done" if stage['dayOffset'] < start_day else "pending"
        })

    season_progress_pct = compute_season_progress(crop_plan.sowingDate, crop_def['durationDays'])

    crop_plan.milestones = milestones
    crop_plan.expectedHarvestDate = add_days(crop_plan.sowingDate, crop_def['durationDays'])
    crop_plan.seasonProgressPct = round((start_day / crop_def['durationDays']) * 100) if start_day > 0 else season_progress_pct
    crop_plan.save()

    ScheduleTask.objects.filter(cropPlan=crop_plan).delete()

    tasks_to_create = []
    seen_keys = set()
    inspection_seq = 0

    for day in range(start_day, crop_def['durationDays'] + 1):
        day_tasks = build_tasks_for_day(crop_plan, crop_def, crop_def['growthStages'], day, inspection_seq)
        
        for task_dict in day_tasks:
            key = f"{day}::{task_dict['title']}"
            if key in seen_keys: continue
            seen_keys.add(key)
            
            tasks_to_create.append(ScheduleTask(**task_dict))
            if task_dict['category'] == "monitoring":
                inspection_seq += 1

    if tasks_to_create:
        ScheduleTask.objects.bulk_create(tasks_to_create)

    return {"milestones": milestones, "taskCount": len(tasks_to_create), "warnings": []}

def reschedule_on_task_update(task_id):
    try:
        task = ScheduleTask.objects.get(id=task_id)
    except ScheduleTask.DoesNotExist:
        return None

    today = make_aware(datetime.now()) if not is_aware(datetime.now()) else datetime.now()
    delay_days = 0

    if task.status in ["delayed", "skipped"]:
        delay_days = max(0, (today.date() - task.date.date()).days)

    if delay_days > 0 and task.cropPlan:
        future_tasks = ScheduleTask.objects.filter(
            cropPlan=task.cropPlan,
            status="pending",
            date__gt=task.date
        ).order_by('date')

        for ft in future_tasks:
            ft.date = add_days(ft.date, delay_days)
            ft.save()

        crop_plan = task.cropPlan
        if crop_plan:
            updated_milestones = []
            for m in crop_plan.milestones:
                if m.get('status') == 'pending':
                    orig_date = datetime.fromisoformat(m['plannedDate'])
                    m['plannedDate'] = add_days(orig_date, delay_days).isoformat()
                updated_milestones.append(m)
            crop_plan.milestones = updated_milestones
            crop_plan.expectedHarvestDate = add_days(crop_plan.expectedHarvestDate, delay_days)
            crop_plan.save()

    if task.cropPlan:
        crop_plan = task.cropPlan
        crop_def = next((c for c in CROP_DATABASE if c['name'] == crop_plan.cropName), None)
        if crop_def:
            sp = compute_season_progress(crop_plan.sowingDate, crop_def['durationDays'])
            crop_plan.seasonProgressPct = sp
            crop_plan.save()

    if task.status in ["skipped", "delayed"]:
        Notification.objects.create(
            owner=task.owner,
            type="schedule",
            title="Task skipped" if task.status == "skipped" else "Task delayed",
            message=f'"{task.title}" was marked skipped.' if task.status == "skipped" else f'"{task.title}" is running {delay_days} day(s) late.',
            refModel="ScheduleTask",
            refId=str(task.id)
        )

    if (task.isCritical or task.priority == "high") and (task.status in ["skipped", "delayed"]):
        Alert.objects.create(
            owner=task.owner,
            farm=task.farm,
            category="schedule_delay",
            severity="critical" if task.status == "skipped" else "warning",
            riskScorePct=85 if task.status == "skipped" else 55,
            title=f"High-priority task {task.status}: {task.title}",
            message=f'"{task.title}" was skipped. This is a must-do stage — yield impact expected. Schedule pushed {delay_days} day(s).' if task.status == "skipped" else f'"{task.title}" is {delay_days} day(s) late. Remaining tasks rescheduled.',
            status="active"
        )

    return {"delayDays": delay_days}
