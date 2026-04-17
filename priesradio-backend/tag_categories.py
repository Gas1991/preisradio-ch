"""
Tag categories — ajoute/met à jour le champ `categorie` dans les 3 collections MongoDB.

Le champ `category_url` (URL de scraping) est mappé vers un nom canonique identique
pour tous les stores :
  smartphones | kaffeemaschinen | staubsauger-roboter | klimaanlage
  waschmaschine | waeschetrockner | fritteuse | kuehlschrank

Usage :
    cd priesradio-backend
    python tag_categories.py
"""
from pymongo import MongoClient, UpdateOne
from decouple import config

# ── Mapping : mots-clés dans category_url → nom canonique ─────────────────
# Ordre important : waeschetrockner AVANT waschmaschine
CATEGORY_MAP = [
    ("smartphones",          ["smartphone", "handy"]),
    ("kaffeemaschinen",      ["kaffeemaschinen", "kaffee-teewelt", "kaffeemaschine"]),
    ("staubsauger-roboter",  ["staubsauger"]),          # couvre staubsauger ET staubsauger-roboter
    ("klimaanlage",          ["klimaanlage", "klimageraet", "raumklimageraete"]),
    ("waeschetrockner",      ["waeschetrockner", "waschtrockner"]),
    ("waschmaschine",        ["waschmaschine"]),
    ("fritteuse",            ["fritteuse", "frittiergeraet"]),
    ("kuehlschrank",         ["kuehlschrank"]),
]

# ── Stores MongoDB ─────────────────────────────────────────────────────────
STORES = [
    {
        "name": "Digitec",
        "uri": config("MONGODB_DIGITEC_URI"),
        "db":  config("MONGODB_DIGITEC_DB",         default="Digitec"),
        "col": config("MONGODB_DIGITEC_COLLECTION", default="DB"),
        "tls_insecure": False,
    },
    {
        "name": "Interdiscount",
        "uri": config("MONGODB_INTERDISCOUNT_URI"),
        "db":  config("MONGODB_INTERDISCOUNT_DB",         default="Interdiscount"),
        "col": config("MONGODB_INTERDISCOUNT_COLLECTION", default="DB"),
        "tls_insecure": False,
    },
    {
        "name": "Brack",
        "uri": config("MONGODB_BRACK_URI"),
        "db":  config("MONGODB_BRACK_DB",         default="Brack"),
        "col": config("MONGODB_BRACK_COLLECTION", default="DB"),
        "tls_insecure": True,   # FreeBSD / Windows SSL compat for this cluster
    },
]

BATCH_SIZE = 500


def resolve_category(category_url: str) -> str | None:
    """Retourne le nom canonique en cherchant les mots-clés dans l'URL."""
    if not category_url:
        return None
    url_lower = category_url.lower()
    for canonical, keywords in CATEGORY_MAP:
        if any(kw in url_lower for kw in keywords):
            return canonical
    return None


def tag_store(store: dict) -> None:
    print(f"\n[{store['name']}] Connexion...")
    client = MongoClient(
        store["uri"],
        serverSelectionTimeoutMS=30000,
        connectTimeoutMS=15000,
        tlsInsecure=store.get("tls_insecure", False),
    )
    col = client[store["db"]][store["col"]]

    total = col.count_documents({})
    print(f"  {total} documents au total")

    ops = []
    matched = 0
    unmatched = 0
    processed = 0

    cursor = col.find({}, {"_id": 1, "category_url": 1})
    for doc in cursor:
        cat = resolve_category(doc.get("category_url", ""))
        if cat:
            ops.append(
                UpdateOne({"_id": doc["_id"]}, {"$set": {"categorie": cat}})
            )
            matched += 1
        else:
            unmatched += 1

        processed += 1
        if len(ops) >= BATCH_SIZE:
            col.bulk_write(ops, ordered=False)
            print(f"  ... {processed}/{total} traites")
            ops = []

    if ops:
        col.bulk_write(ops, ordered=False)

    client.close()
    print(f"  OK {matched} tagues | {unmatched} sans categorie")


if __name__ == "__main__":
    for store in STORES:
        tag_store(store)
    print("\nTermine. Champ `categorie` mis a jour dans les 3 collections.")
