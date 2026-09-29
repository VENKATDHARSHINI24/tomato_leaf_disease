import os
import urllib.request
import json

CATEGORIES = [
    "Tomato___Bacterial_spot",
    "Tomato___Early_blight",
    "Tomato___Late_blight",
    "Tomato___Leaf_Mold",
    "Tomato___Septoria_leaf_spot",
    "Tomato___Spider_mites Two-spotted_spider_mite",
    "Tomato___Target_Spot",
    "Tomato___Tomato_Yellow_Leaf_Curl_Virus",
    "Tomato___Tomato_mosaic_virus",
    "Tomato___healthy"
]

OUT_DIR = "public/real_leaves"
os.makedirs(OUT_DIR, exist_ok=True)

manifest = {}

for cat in CATEGORIES:
    cat_dir = os.path.join(OUT_DIR, cat)
    os.makedirs(cat_dir, exist_ok=True)
    manifest[cat] = []
    
    # Query GitHub API to get image filenames for this category
    api_url = f"https://api.github.com/repos/spMohanty/PlantVillage-Dataset/contents/raw/color/{urllib.parse.quote(cat)}"
    req = urllib.request.Request(api_url, headers={'User-Agent': 'TomatoAI/1.0'})
    
    try:
        with urllib.request.urlopen(req) as resp:
            items = json.loads(resp.read().decode())
            image_items = [it for it in items if it['name'].lower().endswith(('.jpg', '.jpeg', '.png'))][:3]
            
            for idx, it in enumerate(image_items):
                download_url = it['download_url']
                local_filename = f"leaf_{idx+1}.jpg"
                local_path = os.path.join(cat_dir, local_filename)
                
                print(f"Downloading real leaf for {cat} -> {local_filename}")
                img_req = urllib.request.Request(download_url, headers={'User-Agent': 'TomatoAI/1.0'})
                with urllib.request.urlopen(img_req) as img_resp:
                    with open(local_path, 'wb') as f:
                        f.write(img_resp.read())
                
                rel_url = f"/real_leaves/{cat}/{local_filename}"
                manifest[cat].append(rel_url)
    except Exception as e:
        print(f"Error fetching {cat}: {e}")

# Save manifest to json so the frontend can easily list all real leaf images
with open("public/real_leaves/manifest.json", "w") as f:
    json.dump(manifest, f, indent=2)

print("SUCCESS: Real leaves downloaded and manifest created.")
