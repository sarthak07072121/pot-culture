# Photos go in this folder

The site is built to be photographic. Until you put files here, every photo
slot renders as designed artwork — nothing looks broken, and you can put the
site live today and add photos later.

## The filenames the site looks for

Use these exact names. Any file you don't provide simply stays as artwork.

### Backgrounds — the ones that transition as you scroll

These are the big ones. Landscape, and they should be *calm* — the text sits
on top of them, so busy photos make it unreadable. Slightly out-of-focus or
open-space shots work best.

| File | Appears behind |
|------|----------------|
| `bg-1.jpg` | the opening screen |
| `bg-2.jpg` | "What we grow" |
| `bg-3.jpg` | the gallery |
| `bg-4.jpg` | corporate gifting + how it works |
| `bg-5.jpg` | FAQ + contact |

### The three cards

| File | Card |
|------|------|
| `grow-1.jpg` | Indoor plants |
| `grow-2.jpg` | Exotic & rare |
| `grow-3.jpg` | Handmade pots |

### The gallery

`shot-1.jpg` through `shot-6.jpg`. `shot-1` is displayed tall, `shot-4` wide —
so give those two a portrait and a landscape photo respectively.

### Two extras

- `gifting.jpg` — tall/portrait, next to the gifting prices
- `social.jpg` — 1200×630, what shows when someone shares your link on
  WhatsApp or LinkedIn

## What size? (the 4K question)

Shoot at 4K — absolutely. But **don't put the raw 4K file on the website.**

A 3840px photo straight from a phone is often 6–12 MB. Fifteen of those is
over 100 MB, and on mobile data your page would take a minute to load. People
leave after three seconds. You would lose customers to a detail nobody can see.

Export for the web at:

| Use | Width | Target file size |
|-----|-------|------------------|
| Backgrounds (`bg-*`) | 2560px | under 400 KB |
| Cards and gallery | 1600px | under 250 KB |
| `social.jpg` | 1200×630 | under 200 KB |

At 2560px wide the photo is still razor-sharp on a 4K monitor, because it
gets displayed at roughly half the screen width. Keep your full-resolution
originals somewhere safe — just don't upload them.

**JPG at about 80% quality** is right for photos. WebP is smaller again if
your editor exports it; rename the files to `.webp` and update the paths in
`index.html`.

## Resizing them

If you have ImageMagick installed, drop your originals in a folder and run:

```
bash tools/make-images.sh ~/my-photos
```

It writes correctly-sized copies into this folder. Otherwise any of these work
and are free:

- **[squoosh.app](https://squoosh.app)** — drag a photo in, set the width,
  download. No install, works in the browser.
- Windows Photos / Mac Preview — both can resize and export
- Canva, Photoshop, Lightroom — "Export for web"

## Two things worth doing

**Shoot against a plain background.** A pot against a clean wall photographs
far better than a pot on a cluttered table, and it makes the site look
expensive.

**Keep the alt text honest.** In `index.html` each photo has an `alt="..."`
description. Update it to describe the real photo — it's what blind visitors
hear, and Google reads it too.
