#!/usr/bin/env bash
# Resize photos for the website.
#
#   bash tools/make-images.sh ~/my-photos
#
# Reads every .jpg/.jpeg/.png in the folder you point it at and writes
# web-sized copies into assets/img/. Originals are never modified.
#
# Needs ImageMagick:
#   Mac:     brew install imagemagick
#   Ubuntu:  sudo apt install imagemagick
#   Windows: https://imagemagick.org/script/download.php
#
# No ImageMagick? Use https://squoosh.app instead — same result, no install.

set -euo pipefail

SRC="${1:-}"
OUT="$(cd "$(dirname "$0")/.." && pwd)/assets/img"

if [ -z "$SRC" ] || [ ! -d "$SRC" ]; then
  echo "Usage: bash tools/make-images.sh <folder-with-your-photos>" >&2
  exit 1
fi

if command -v magick >/dev/null 2>&1; then IM="magick"
elif command -v convert >/dev/null 2>&1; then IM="convert"
else
  echo "ImageMagick not found. Install it, or use https://squoosh.app" >&2
  exit 1
fi

# name pattern -> width. The site displays every photo with a CSS
# object-fit:cover crop, so this just caps file size — it doesn't need to
# pre-crop to a specific aspect ratio.
width_for() {
  case "$1" in
    shop-*)    echo 1200 ;;
    social*)   echo 1200 ;;
    *)         echo 1600 ;;
  esac
}

mkdir -p "$OUT"
count=0

shopt -s nullglob nocaseglob
for f in "$SRC"/*.jpg "$SRC"/*.jpeg "$SRC"/*.png; do
  base="$(basename "${f%.*}")"
  w="$(width_for "$base")"
  dest="$OUT/$base.jpg"
  "$IM" "$f" \
      -auto-orient \
      -resize "${w}x${w}>" \
      -strip \
      -quality 80 \
      -interlace Plane \
      "$dest"
  printf '  %-16s -> %sw  %s\n' "$base" "$w" "$(du -h "$dest" | cut -f1)"
  count=$((count + 1))
done

if [ "$count" -eq 0 ]; then
  echo "No .jpg/.jpeg/.png files found in $SRC" >&2
  exit 1
fi

echo
echo "$count image(s) written to assets/img/"
echo "Name them shop-1.jpg, grow-1.jpg, gifting.jpg etc. — see assets/img/README.md"
