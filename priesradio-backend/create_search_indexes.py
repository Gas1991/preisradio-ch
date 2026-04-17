"""
Création des index Atlas Search pour les 3 stores suisses.

Usage :
    cd priesradio-backend
    python create_search_indexes.py
"""
from pymongo import MongoClient
from pymongo.operations import SearchIndexModel
from decouple import config

STORES = [
    {
        'name': 'Digitec',
        'uri': config('MONGODB_DIGITEC_URI'),
        'db':  config('MONGODB_DIGITEC_DB', default='Digitec'),
        'col': config('MONGODB_DIGITEC_COLLECTION', default='DB'),
    },
    {
        'name': 'Interdiscount',
        'uri': config('MONGODB_INTERDISCOUNT_URI'),
        'db':  config('MONGODB_INTERDISCOUNT_DB', default='Interdiscount'),
        'col': config('MONGODB_INTERDISCOUNT_COLLECTION', default='DB'),
    },
    {
        'name': 'Brack',
        'uri': config('MONGODB_BRACK_URI'),
        'db':  config('MONGODB_BRACK_DB', default='Brack'),
        'col': config('MONGODB_BRACK_COLLECTION', default='DB'),
    },
]

INDEX_DEF = SearchIndexModel(
    definition={
        "mappings": {
            "dynamic": False,
            "fields": {
                "name": {
                    "type": "string",
                    "analyzer": "lucene.german"
                }
            }
        }
    },
    name="Text",
    type="search",
)

for store in STORES:
    print(f"\n[{store['name']}] Connexion...")
    try:
        client = MongoClient(
            store['uri'],
            serverSelectionTimeoutMS=30000,
            connectTimeoutMS=15000,
        )
        col = client[store['db']][store['col']]

        existing = list(col.list_search_indexes("Text"))
        if existing:
            status = existing[0].get('status', '?')
            print(f"[{store['name']}] Index 'Text' existe deja -> status: {status}")
        else:
            col.create_search_index(INDEX_DEF)
            print(f"[{store['name']}] Index 'Text' cree -> build en cours...")

        client.close()
    except Exception as e:
        print(f"[{store['name']}] ERREUR : {e}")

print("\nBuild Atlas Search : 2-5 minutes.")
print("Verifier sur cloud.mongodb.com -> chaque cluster -> Search -> status: READY")
