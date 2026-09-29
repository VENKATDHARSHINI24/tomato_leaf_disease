import os
import glob
import json

base_cache = os.path.expanduser(r"~\.cache\kagglehub\datasets\noulam\tomato")
print("Checking cache directory:", base_cache)

if os.path.exists(base_cache):
    for root, dirs, files in os.walk(base_cache):
        # Look for train / valid or category folders
        has_categories = any("Tomato___" in d for d in dirs)
        if has_categories or "train" in dirs or "valid" in dirs:
            print(f"Found dataset content at: {root}")
            print(f"Subdirectories: {dirs[:10]}")
            if files:
                print(f"Files sample: {files[:5]}")
            break
else:
    print("Base cache directory not found yet.")
