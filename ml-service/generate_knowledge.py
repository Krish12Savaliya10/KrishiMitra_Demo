import json

crops = ['Potato', 'Fennel', 'ChickPea', 'Tomato', 'Banana', 'Barley',
         'Maize', 'Mustard', 'Guar', 'Castor', 'Sunflower', 'Sesame',
         'Cotton', 'Groundnut', 'Chilli', 'Wheat', 'Sugarcane', 'MungBean',
         'Turmeric', 'Bajra', 'Soybean', 'Onion', 'UradBean', 'Rice',
         'Pigeonpea']

# Define basic stage templates
stages = [
    {
        "stage": "Land Preparation",
        "days": "-15 to 0",
        "day_start": -15, "day_end": 0,
        "tasks": "- Deep plough and prepare fine tilth\n- Apply basal FYM and level field\n- Soil testing and nutrient balancing",
        "fert": "Basal dose incorporated into soil (FYM + NPK)",
        "irr": "Pre-sowing irrigation to ensure adequate moisture",
        "watch": "Soil-borne pathogens, weed seeds",
        "why": "Good land preparation ensures proper root penetration and uniform germination."
    },
    {
        "stage": "Germination & Early Growth",
        "days": "0-20",
        "day_start": 0, "day_end": 20,
        "tasks": "- Sow seeds at appropriate depth and spacing\n- Check for uniform emergence and gap-fill if necessary\n- First manual weeding",
        "fert": "No additional fertilizer; rely on basal dose",
        "irr": "Light irrigation if soil surface dries out to prevent crusting",
        "watch": "Damping-off disease, cutworms, poor emergence",
        "why": "A uniform plant stand is critical as gaps directly reduce potential yield."
    },
    {
        "stage": "Vegetative Growth",
        "days": "21-50",
        "day_start": 21, "day_end": 50,
        "tasks": "- Top-dress fertilizer (Nitrogen split)\n- Second weeding or herbicide application\n- Scout for foliar pests and diseases weekly",
        "fert": "Top-dress with Urea/Nitrogen",
        "irr": "Regular irrigation cycle based on crop water requirements",
        "watch": "Leaf-eating caterpillars, aphids, early signs of leaf blight",
        "why": "Healthy canopy development drives photosynthesis needed for later yield."
    },
    {
        "stage": "Flowering / Reproductive Phase",
        "days": "51-80",
        "day_start": 51, "day_end": 80,
        "tasks": "- Avoid chemical sprays during peak flowering to protect pollinators\n- Maintain consistent soil moisture\n- Apply micronutrient spray if required",
        "fert": "Avoid heavy Nitrogen; focus on Potassium if deficient",
        "irr": "Critical stage: ensure no moisture stress to prevent flower/fruit drop",
        "watch": "Flower drop, pod borers, sucking pests",
        "why": "Moisture or pest stress during flowering directly reduces the number of fruits/grains formed."
    },
    {
        "stage": "Fruit / Grain Development",
        "days": "81-110",
        "day_start": 81, "day_end": 110,
        "tasks": "- Monitor for pod/fruit borers\n- Ensure proper drainage if heavy rains occur\n- Final rounds of irrigation before maturity",
        "fert": "Foliar application if nutrient deficiency is visible",
        "irr": "Maintain moisture but avoid waterlogging",
        "watch": "Fruit rot, pod borers, birds/rodents",
        "why": "Proper grain/fruit filling requires sustained water and nutrient transport."
    },
    {
        "stage": "Harvesting",
        "days": "111-130",
        "day_start": 111, "day_end": 130,
        "tasks": "- Stop irrigation 10-15 days before harvest\n- Harvest at proper maturity index (color/moisture)\n- Dry produce to safe moisture levels before storage",
        "fert": "None",
        "irr": "Stop irrigation to allow drying and maturation",
        "watch": "Shattering losses, unseasonal rain damage",
        "why": "Timely harvest prevents post-maturity field losses and ensures good market quality."
    }
]

# Generate JSON
timeline_data = []

for crop in crops:
    # Set a generic season for now, could be dynamic
    season = "Kharif/Rabi"
    
    for stage in stages:
        doc_text = f"""Crop: {crop} | Stage: {stage['stage']} | Days: {stage['days']}
Season: {season}

Key tasks:
{stage['tasks']}

Fertilizer: {stage['fert']}
Irrigation: {stage['irr']}
Watch for: {stage['watch']}
Why it matters: {stage['why']}

Critical: YES - crucial for overall {crop} success."""

        entry = {
            "id": f"{crop.lower()}_{stage['stage'].lower().replace(' ', '_').replace('/', '').replace('&', '')}",
            "metadata": {
                "crop": crop,
                "stage": stage['stage'],
                "stage_day_start": stage['day_start'],
                "stage_day_end": stage['day_end'],
                "season": season,
                "source": "timeline_kb",
                "priority": "high"
            },
            "document": doc_text
        }
        timeline_data.append(entry)

with open('../knowledge-base/data/timeline_kb.json', 'w') as f:
    json.dump(timeline_data, f, indent=2)

print(f"Successfully generated timeline_kb.json with {len(timeline_data)} entries for {len(crops)} crops.")
