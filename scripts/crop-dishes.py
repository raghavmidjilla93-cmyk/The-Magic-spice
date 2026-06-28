"""
Run this once after saving food-grid.jpg:
  python scripts/crop-dishes.py

Crops the 3x3 food photo grid into 9 individual dish images.
"""

from PIL import Image
import os

SRC  = "public/images/food-grid.jpg"
DEST = "public/images/dishes"

# Names match the grid layout (left-to-right, top-to-bottom)
DISHES = [
    "biryani-silver-thali",      # row1 col1 — Hyderabadi Biryani
    "dum-biryani-handi",         # row1 col2 — Dum Biryani in Clay Pot
    "mutton-fry-curry",          # row1 col3 — Mutton Fry
    "mutton-biryani-kadai",      # row2 col1 — Mutton Biryani
    "tandoori-chicken-mandi",    # row2 col2 — Tandoori Chicken Mandi ★ Hero
    "chicken-mandi-plate",       # row2 col3 — Chicken Mandi
    "lamb-biryani-bowl",         # row3 col1 — Lamb Biryani
    "arabian-mandi-pot",         # row3 col2 — Arabian Mandi
    "chicken-platter",           # row3 col3 — Chicken Platter
]

os.makedirs(DEST, exist_ok=True)

img  = Image.open(SRC)
W, H = img.size
cw   = W // 3
ch   = H // 3

for idx, name in enumerate(DISHES):
    col = idx % 3
    row = idx // 3
    x1, y1 = col * cw, row * ch
    x2, y2 = x1 + cw, y1 + ch
    crop = img.crop((x1, y1, x2, y2))
    out  = f"{DEST}/{name}.jpg"
    crop.save(out, "JPEG", quality=92)
    print(f"✓  {out}  ({crop.size[0]}×{crop.size[1]})")

print(f"\nDone — {len(DISHES)} images saved to {DEST}/")
