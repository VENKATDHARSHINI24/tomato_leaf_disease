import os
import urllib.request
import json

CATEGORIES = [
    "Tomato___Leaf_Mold",
    "Tomato___Target_Spot",
    "Tomato___Tomato_Yellow_Leaf_Curl_Virus",
    "Tomato___Tomato_mosaic_virus",
    "Tomato___healthy"
]

OUT_DIR = "public/real_leaves"

for cat in CATEGORIES:
    cat_dir = os.path.join(OUT_DIR, cat)
    os.makedirs(cat_dir, exist_ok=True)
    
    api_url = f"https://api.github.com/repos/spMohanty/PlantVillage-Dataset/contents/raw/color/{urllib.parse.quote(cat)}"
    req = urllib.request.Request(api_url, headers={'User-Agent': 'TomatoAI/1.0'})
    
    try:
        with urllib.request.urlopen(req, timeout=10) as resp:
            items = json.loads(resp.read().decode())
            image_items = [it for it in items if it['name'].lower().endswith(('.jpg', '.jpeg', '.png'))][:3]
            
            for idx, it in enumerate(image_items):
                download_url = it['download_url']
                local_filename = f"leaf_{idx+1}.jpg"
                local_path = os.path.join(cat_dir, local_filename)
                
                print(f"Downloading {cat} -> {local_filename}")
                img_req = urllib.request.Request(download_url, headers={'User-Agent': 'TomatoAI/1.0'})
                with urllib.request.urlopen(img_req, timeout=10) as img_resp:
                    with open(local_path, 'wb') as f:
                        f.write(img_resp.read())
    except Exception as e:
        print(f"Error {cat}: {e}")

# Build complete manifest for all categories present
ALL_CATS = [
    "Tomato___Bacterial_spot",
    "Tomato___Early_blight",
    "Tomato___healthy",
    "Tomato___Late_blight",
    "Tomato___Leaf_Mold",
    "Tomato___Septoria_leaf_spot",
    "Tomato___Spider_mites Two-spotted_spider_mite",
    "Tomato___Target_Spot",
    "Tomato___Tomato_mosaic_virus",
    "Tomato___Tomato_Yellow_Leaf_Curl_Virus"
]

manifest = {}
for cat in ALL_CATS:
    cat_dir = os.path.join(OUT_DIR, cat)
    manifest[cat] = []
    if os.path.exists(cat_dir):
        files = [f for f in os.listdir(cat_dir) if f.endswith(('.jpg', '.png'))]
        for f in sorted(files):
            manifest[cat].append(f"/real_leaves/{cat}/{f}")

with open("public/real_leaves/manifest.json", "w") as f:
    json.dump(manifest, f, indent=2)

print("MANIFEST_COMPLETED")
print("Manifest summary:", {k: len(v) for k, v in manifest.items()})
