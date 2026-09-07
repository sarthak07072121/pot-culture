#!/usr/bin/env python3
"""
Regenerates assets/pot-culture-gifting.pdf.

Run this again after you edit PRODUCTS or the gifting table in
assets/js/main.js / index.html, so the PDF stays in sync with the site.
Needs reportlab: pip install reportlab

This mirrors the PRODUCTS array in assets/js/main.js and the quantity
table in index.html by hand — there are only two, and keeping a real
build pipeline for two files would be overkill. If you change one,
change the other.
"""
import os
from reportlab.lib.pagesizes import A4
from reportlab.lib.units import mm
from reportlab.lib.colors import HexColor
from reportlab.pdfgen import canvas
from reportlab.lib.utils import simpleSplit

BRAND = HexColor("#2f7d5f")
CLAY = HexColor("#c07a4e")
INK = HexColor("#17251d")
INK_SOFT = HexColor("#55665d")
LINE = HexColor("#e2eae4")
BG = HexColor("#fbfdfa")

# Keep this list in sync with PRODUCTS in assets/js/main.js.
PRODUCTS = [
    ("Variegated Monstera Albo", "Monstera deliciosa 'Albo Variegata'", 4999, "Fussy",
     "Striking white variegation on deeply split leaves - a genuine collector's centrepiece."),
    ("Snake Plant", "Sansevieria laurentii", 499, "Easy",
     "Upright, sculptural leaves that tolerate neglect, low light, and infrequent watering."),
    ("ZZ Plant Raven", "Zamioculcas zamiifolia 'Raven'", 1499, "Easy",
     "Glossy near-black foliage on an exceptionally hardy plant that thrives on neglect."),
    ("Philodendron Birkin", "Philodendron 'Birkin'", 1199, "Medium",
     "Compact aroid with crisp white pinstripes on deep green leaves - tidy and architectural."),
    ("Anthurium Andraeanum", "Anthurium andraeanum", 899, "Medium",
     "Glossy heart-shaped blooms in vivid colour, flowering on and off through most of the year."),
]

# Keep this in sync with the gift-table in index.html.
GIFT_TIERS = [
    ("1-10", "Fastest", "Confirmed on enquiry"),
    ("25-99", "Fast", "Confirmed on enquiry"),
    ("100-499", "Standard", "Confirmed on enquiry"),
    ("500+", "Extended", "Confirmed on enquiry"),
]

OUT = os.path.join(os.path.dirname(__file__), "..", "assets", "pot-culture-gifting.pdf")
W, H = A4
MARGIN = 20 * mm


def wrapped(c, text, x, y, width, font="Helvetica", size=10, leading=14, color=INK_SOFT):
    c.setFont(font, size)
    c.setFillColor(color)
    for line in simpleSplit(text, font, size, width):
        c.drawString(x, y, line)
        y -= leading
    return y


def footer(c, page_num):
    c.setFont("Helvetica", 8)
    c.setFillColor(INK_SOFT)
    c.drawString(MARGIN, 12 * mm, "Pot Culture  --  Corporate Gifting Catalogue")
    c.drawRightString(W - MARGIN, 12 * mm, str(page_num))


def draw_rule(c, y):
    c.setStrokeColor(LINE)
    c.setLineWidth(0.75)
    c.line(MARGIN, y, W - MARGIN, y)


c = canvas.Canvas(OUT, pagesize=A4)
c.setFillColor(BG)
c.rect(0, 0, W, H, fill=1, stroke=0)

y = H - MARGIN

# --- header ---
c.setFillColor(BRAND)
c.circle(MARGIN + 4 * mm, y - 3 * mm, 4.5 * mm, fill=1, stroke=0)
c.setFillColor(HexColor("#ffffff"))
c.setFont("Helvetica-Bold", 9)
c.drawCentredString(MARGIN + 4 * mm, y - 4.6 * mm, "PC")
c.setFillColor(INK)
c.setFont("Helvetica-Bold", 20)
c.drawString(MARGIN + 12 * mm, y - 5.5 * mm, "Pot Culture")
c.setFont("Helvetica", 10)
c.setFillColor(INK_SOFT)
c.drawRightString(W - MARGIN, y - 5.5 * mm, "Corporate Gifting Catalogue")
y -= 16 * mm
draw_rule(c, y)
y -= 10 * mm

# --- intro ---
c.setFont("Helvetica-Bold", 14)
c.setFillColor(INK)
c.drawString(MARGIN, y, "Living gifts, delivered alive, at volume, on a date.")
y -= 8 * mm
y = wrapped(
    c,
    "We source, pot, brand, pack and deliver exotic plants alive - from a single desk gift "
    "to a thousand-unit rollout. This catalogue is a starting point for a conversation, not a "
    "final quote: every price and lead time below is confirmed when you enquire.",
    MARGIN, y, W - 2 * MARGIN, size=10, leading=13.5,
)
y -= 8 * mm

# --- products ---
c.setFont("Helvetica-Bold", 13)
c.setFillColor(INK)
c.drawString(MARGIN, y, "Plants available for gifting")
y -= 9 * mm

for name, botanical, price, difficulty, desc in PRODUCTS:
    if y < 40 * mm:
        footer(c, c.getPageNumber())
        c.showPage()
        c.setFillColor(BG)
        c.rect(0, 0, W, H, fill=1, stroke=0)
        y = H - MARGIN

    c.setFillColor(HexColor("#ffffff"))
    c.setStrokeColor(LINE)
    box_h = 22 * mm
    c.roundRect(MARGIN, y - box_h, W - 2 * MARGIN, box_h, 3 * mm, fill=1, stroke=1)

    c.setFont("Helvetica-Bold", 11.5)
    c.setFillColor(INK)
    c.drawString(MARGIN + 5 * mm, y - 7 * mm, name)

    c.setFont("Helvetica-Oblique", 9)
    c.setFillColor(INK_SOFT)
    c.drawString(MARGIN + 5 * mm, y - 12 * mm, botanical)

    wrapped(c, desc, MARGIN + 5 * mm, y - 17 * mm, W - 2 * MARGIN - 45 * mm, size=8.5, leading=10.5)

    c.setFont("Helvetica-Bold", 8)
    c.setFillColor(CLAY)
    c.drawRightString(W - MARGIN - 5 * mm, y - 7 * mm, difficulty.upper())

    c.setFont("Helvetica-Bold", 13)
    c.setFillColor(BRAND)
    c.drawRightString(W - MARGIN - 5 * mm, y - 15 * mm, "Rs. {:,} *".format(price))

    y -= box_h + 5 * mm

c.setFont("Helvetica-Oblique", 7.5)
c.setFillColor(INK_SOFT)
c.drawString(MARGIN, y, "* Indicative pricing, confirmed at quote.")
y -= 12 * mm

# --- gifting tiers table ---
if y < 55 * mm:
    footer(c, c.getPageNumber())
    c.showPage()
    c.setFillColor(BG)
    c.rect(0, 0, W, H, fill=1, stroke=0)
    y = H - MARGIN

c.setFont("Helvetica-Bold", 13)
c.setFillColor(INK)
c.drawString(MARGIN, y, "Quantity, lead time & price band")
y -= 9 * mm

col_x = [MARGIN, MARGIN + 45 * mm, MARGIN + 85 * mm]
headers = ["Quantity", "Lead time", "Price band"]
c.setFont("Helvetica-Bold", 9)
c.setFillColor(INK_SOFT)
for cx, h in zip(col_x, headers):
    c.drawString(cx, y, h)
y -= 4 * mm
draw_rule(c, y)
y -= 7 * mm

c.setFont("Helvetica", 9.5)
c.setFillColor(INK)
for qty, lead, band in GIFT_TIERS:
    c.setFont("Helvetica-Bold", 9.5)
    c.drawString(col_x[0], y, qty)
    c.setFont("Helvetica", 9.5)
    c.setFillColor(INK_SOFT)
    c.drawString(col_x[1], y, lead)
    c.drawString(col_x[2], y, band)
    c.setFillColor(INK)
    y -= 8 * mm

y -= 4 * mm
y = wrapped(
    c,
    "Branding - logo on the pot, a tag, or the packaging - available at every tier, confirmed "
    "at quote. Bulk and corporate orders use hardy, low-maintenance species only; every box "
    "ships with a printed care card. Prices exclude GST and delivery.",
    MARGIN, y, W - 2 * MARGIN, size=9, leading=12,
)
y -= 10 * mm

# --- contact ---
# Deliberately omitted rather than filled with placeholder contact
# details (same rule as the rest of the site: a real value or nothing).
# Once you have a confirmed email, WhatsApp number and domain, add a
# "Get a quote" block here the same way the removed one worked — see
# git history / README.md for the exact code if you want it back.

footer(c, c.getPageNumber())
c.save()
print("Wrote", os.path.abspath(OUT))
