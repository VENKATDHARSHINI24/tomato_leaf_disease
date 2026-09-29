import cv2, os, json, numpy as np

manifest_path = "public/real_leaves/manifest.json"
with open(manifest_path) as f:
    manifest = json.load(f)

profiles = {}

for cat, files in manifest.items():
    profiles[cat] = []
    for rel_path in files:
        full_path = os.path.join("public", rel_path.lstrip("/\\"))
        if not os.path.exists(full_path):
            continue
        img = cv2.imread(full_path)
        hsv = cv2.cvtColor(img, cv2.COLOR_BGR2HSV)
        
        # Segment leaf vs neutral background (saturation > 25 or low brightness)
        is_leaf = (hsv[:,:,1] > 25) | (hsv[:,:,2] < 60)
        leaf_pixels = hsv[is_leaf]
        
        if len(leaf_pixels) < 100:
            leaf_pixels = hsv.reshape(-1, 3)
            
        h = leaf_pixels[:, 0].astype(float)
        s = leaf_pixels[:, 1].astype(float) / 255.0
        v = leaf_pixels[:, 2].astype(float) / 255.0
        
        # Key pathological ratios
        green_ratio = np.mean((h >= 35) & (h <= 85) & (s >= 0.25) & (v >= 0.20))
        yellow_ratio = np.mean((h >= 18) & (h < 35) & (s >= 0.25) & (v >= 0.35))
        necrosis_ratio = np.mean((v < 0.25) | ((h < 18) & (s >= 0.20) & (v < 0.50)))
        
        profiles[cat].append({
            "path": rel_path,
            "meanH": float(np.mean(h)),
            "meanS": float(np.mean(s)),
            "meanV": float(np.mean(v)),
            "greenRatio": float(green_ratio),
            "yellowRatio": float(yellow_ratio),
            "necrosisRatio": float(necrosis_ratio)
        })

with open("public/real_leaves/profiles.json", "w") as f:
    json.dump(profiles, f, indent=2)

print("Profiles computed successfully.")
