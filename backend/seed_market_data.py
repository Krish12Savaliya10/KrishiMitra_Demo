import os
import django
from datetime import datetime, timedelta
import random

# Setup Django environment
os.environ.setdefault("DJANGO_SETTINGS_MODULE", "krishimitra_ml.settings")
django.setup()

from krishi_core.models import MarketPrice
from django.utils.timezone import make_aware

def seed_market_data():
    print("Clearing old market data...")
    MarketPrice.objects.all().delete()

    states = ["Gujarat", "Maharashtra", "Punjab", "Uttar Pradesh", "Karnataka"]
    districts = {
        "Gujarat": ["Ahmedabad", "Surat", "Rajkot", "Vadodara", "Bhavnagar"],
        "Maharashtra": ["Pune", "Nashik", "Nagpur", "Aurangabad", "Jalgaon"],
        "Punjab": ["Amritsar", "Ludhiana", "Jalandhar", "Patiala", "Bhatinda"],
        "Uttar Pradesh": ["Lucknow", "Kanpur", "Agra", "Varanasi", "Meerut"],
        "Karnataka": ["Bangalore", "Mysore", "Hubli", "Mangalore", "Belgaum"]
    }
    
    commodities = [
        {"name": "Wheat", "base": 2200, "var": 300},
        {"name": "Cotton", "base": 6500, "var": 800},
        {"name": "Rice", "base": 3000, "var": 400},
        {"name": "Tomato", "base": 1500, "var": 500},
        {"name": "Onion", "base": 1200, "var": 400},
        {"name": "Potato", "base": 1000, "var": 300},
        {"name": "Groundnut", "base": 5500, "var": 600},
        {"name": "Sugarcane", "base": 300, "var": 50},
        {"name": "Soyabean", "base": 4200, "var": 500},
        {"name": "Maize", "base": 2000, "var": 250},
    ]

    print("Generating mock market records...")
    
    records_to_create = {}
    now = datetime.now()
    
    for i in range(1000):
        state = random.choice(states)
        district = random.choice(districts[state])
        market = f"{district} APMC"
        
        com = random.choice(commodities)
        commodity = com["name"]
        variety = "Local" if random.random() > 0.5 else "Deshi"
        
        # Simulate price variations
        base = com["base"]
        variance = com["var"]
        
        min_p = base - random.randint(0, variance)
        max_p = base + random.randint(0, variance)
        modal_p = (min_p + max_p) // 2 + random.randint(-50, 50)
        
        # Random date within last 3 days
        days_ago = random.randint(0, 3)
        arrival = now - timedelta(days=days_ago)
        arrival_date_str = arrival.strftime("%d/%m/%Y")
        
        key = (state, district, market, commodity, arrival_date_str)
        
        records_to_create[key] = MarketPrice(
            state=state,
            district=district,
            market=market,
            commodity=commodity,
            variety=variety,
            arrival_date=arrival_date_str,
            parsedDate=make_aware(arrival),
            min_price=min_p,
            max_price=max_p,
            modal_price=modal_p,
            fetchedAt=make_aware(now)
        )
        
    MarketPrice.objects.bulk_create(records_to_create.values())
    print(f"✅ Successfully seeded {len(records_to_create)} unique market price records into the database!")

if __name__ == "__main__":
    seed_market_data()
