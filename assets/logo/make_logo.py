"""Builds the Adrenalin wordmark as pure SVG paths (no font dependency).
Letters: Montserrat Italic (heavy), with the Latin single-storey 'g' standing in
for 'д' to match the cursive д on the hotel's street sign. The «А» gets the flag
from the sign: its top bar extends to the left. (The neon-line variant is still
available via build(..., with_line=True).)"""
from fontTools.ttLib import TTFont
from fontTools.varLib.instancer import instantiateVariableFont
from fontTools.pens.svgPathPen import SVGPathPen
from fontTools.pens.transformPen import TransformPen
import sys

WGHT = 860
SRC = "/home/claude/gfonts/ofl/montserrat/Montserrat-Italic[wght].ttf"
font = instantiateVariableFont(TTFont(SRC), {"wght": WGHT})
cmap = font.getBestCmap(); gs = font.getGlyphSet(); hmtx = font["hmtx"]
upm = font["head"].unitsPerEm

TEXT = "Аgреналін"
TRACK = -6           # units per letter, tighten slightly like the sign
KERN = {("А", "g"): -40, ("р", "е"): 0, ("л", "і"): 0}

# «А» з вивіски готелю: верхня планка виходить «прапорцем» уліво.
# Прапорець — паралелограм під кутом курсиву (11.3°), товщиною як поперечка «А».
A_FLAG = [(52, 700), (400, 700), (346, 548), (22, 548)]

def glyph_path(ch, x):
    gname = cmap[ord(ch)]
    pen = SVGPathPen(gs)
    tp = TransformPen(pen, (1, 0, 0, -1, x, 0))  # flip y for SVG
    gs[gname].draw(tp)
    d = pen.getCommands()
    if ch == "А":
        d += "M" + "L".join(f"{px + x} {-py}" for px, py in A_FLAG) + "Z"
    return d, hmtx[gname][0]

def build(color_word, color_line=None, bg=None, with_line=False, pad=40):
    x = 0; paths = []; prev = None
    for ch in TEXT:
        if prev: x += KERN.get((prev, ch), 0)
        d, adv = glyph_path(ch, x)
        paths.append(d); x += adv + TRACK; prev = ch
    width = x
    body = "".join(f'<path d="{d}"/>' for d in paths)
    # The neon line from the hotel's sign: it comes in from the upper left,
    # dives behind the «А», runs hidden behind the letters, re-emerges from the
    # top of «а», arcs over «л» and lands on the dot of «і».
    SW = 58                                   # tube thickness, font units
    seg1 = "M -340 -620 C -180 -585, 80 -525, 300 -470"
    seg2 = "M 3700 -470 C 3960 -930, 4680 -1060, 5185 -765"
    line = ""
    if with_line:
        line = (f'<g fill="none" stroke="{color_line}" stroke-width="{SW}" stroke-linecap="round">'
                f'<path d="{seg1}"/><path d="{seg2}"/></g>')
    x0 = -380 if with_line else -20
    y0 = -990 if with_line else -830
    x1, y1 = width + 60, 240
    vb = (x0 - pad, y0 - pad, x1 - x0 + 2 * pad, y1 - y0 + 2 * pad)
    bgrect = f'<rect x="{vb[0]}" y="{vb[1]}" width="{vb[2]}" height="{vb[3]}" fill="{bg}"/>' if bg else ""
    return (f'<svg xmlns="http://www.w3.org/2000/svg" viewBox="{vb[0]:.0f} {vb[1]:.0f} {vb[2]:.0f} {vb[3]:.0f}" '
            f'role="img" aria-label="Адреналін">{bgrect}{line}<g fill="{color_word}">{body}</g></svg>')

if __name__ == "__main__":
    out = sys.argv[1] if len(sys.argv) > 1 else "."
    variants = {
        "logo-dark.svg": build("#17231f"),
        "logo-light.svg": build("#f6f2ea"),
        "logo-mono-light.svg": build("#ffffff"),
        "logo-mono-dark.svg": build("#17231f"),
        "logo-preview.svg": build("#17231f", bg="#f3efe6"),
    }
    for name, svg in variants.items():
        open(f"{out}/{name}", "w").write(svg)
    print("ok", list(variants))
