"""Vérifie la distribution des catégories dans les 3 collections."""
from pymongo import MongoClient
from decouple import config

STORES = [
    ("Digitec",       config("MONGODB_DIGITEC_URI"),       False),
    ("Interdiscount", config("MONGODB_INTERDISCOUNT_URI"), False),
    ("Brack",         config("MONGODB_BRACK_URI"),         True),
]

for name, uri, tls in STORES:
    client = MongoClient(uri, serverSelectionTimeoutMS=30000, tlsInsecure=tls)
    col = client[name]["DB"]
    pipeline = [
        {"$group": {"_id": "$categorie", "count": {"$sum": 1}}},
        {"$sort": {"count": -1}},
    ]
    print(name + ":")
    for r in col.aggregate(pipeline):
        label = str(r["_id"]) if r["_id"] else "(aucune)"
        print(f"  {label:<30} {r['count']}")
    client.close()
    print()
