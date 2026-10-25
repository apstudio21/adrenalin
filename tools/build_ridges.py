"""Вставляє силуети гір (з tools/ridges.json) у index.html.
Запуск: python3 tools/build_ridges.py"""
import json, re
R = json.load(open('tools/ridges.json'))
W = 2790

def contour(k, mirror=False):
    pts = R[k]['pts']
    if mirror: pts = [[W - x, y] for x, y in reversed(pts)]
    return pts

def d_of(pts):
    return 'M' + ' L'.join(f'{x:g} {y:g}' for x, y in pts)

defs = []
for k in R:
    for m in (False, True):
        pts = contour(k, m); suf = 'r' if m else ''
        defs.append(f'<path id="rg-{k}{suf}" d="{d_of(pts)} L{W} 3000 L0 3000Z"/>')   # ground: filled below
        defs.append(f'<path id="rs-{k}{suf}" d="{d_of(pts)} L{W} -3000 L0 -3000Z"/>') # sky: filled above

def ridge(cls, H, layers, minh=54):
    uses = ''.join(f'<use href="#{ref}" transform="translate(0 {dy})" style="fill:{fill};opacity:{op}"/>' for ref, dy, fill, op in layers)
    return (f'<div class="ridge {cls}" aria-hidden="true"><svg viewBox="0 0 {W} {H}" preserveAspectRatio="xMidYMax slice" '
            f'style="--h:{H};--minh:{minh}px">{uses}</svg></div>')

P, S, N = 'var(--paper)', 'var(--snow)', 'var(--night)'
blocks = [
  # hero → stats: three ridges, the front one is the paper of the next section
  ridge('ridge--bottom', 400, [('rg-m2', 10, P, .28), ('rg-m4r', 120, P, .5), ('rg-m1r', 52, P, 1)], 64),
  # services → banner photo: the sky above the ridge is the section above
  ridge('ridge--top', 190, [('rs-m4', 40, P, .4), ('rs-m3', 0, P, 1)]),
  # banner → Dragobrat
  ridge('ridge--bottom', 230, [('rg-m3r', 0, S, .45), ('rg-m2', 42, S, 1)]),
  # gallery → reviews (dark)
  ridge('ridge--top', 200, [('rs-m3r', 46, P, .4), ('rs-m4r', 0, P, 1)]),
  # reviews (dark) → booking: paper mountains rise into the night
  ridge('ridge--top', 200, [('rs-m2r', 0, N, .45), ('rs-m3', 52, N, 1)]),
  # booking → footer
  ridge('ridge--top', 360, [('rs-m4', 150, P, .35), ('rs-m1', 0, P, 1)], 70),
]

s = open('index.html').read()
found = list(re.finditer(r'<div class="ridge[^"]*" aria-hidden="true">.*?</svg>\s*</div>', s, flags=re.S))
assert len(found) == len(blocks), len(found)
for m, b in reversed(list(zip(found, blocks))):
    s = s[:m.start()] + b + s[m.end():]
s = re.sub(r'\s*<g id="ridge-defs">.*?</g>', '', s, flags=re.S)
s = s.replace('  <defs>\n', '  <defs>\n    <g id="ridge-defs">' + ''.join(defs) + '</g>\n', 1)
open('index.html', 'w').write(s)
print('ok', len(s))
