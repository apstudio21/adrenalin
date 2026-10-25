"""Витягує верхній контур гір із SVG-файлів і робить з них шляхи для роздільників.

    python3 tools/ridges.py Mount_1.svg Mount_2.svg Mount_3.svg Mount_4.svg > tools/ridges.json

Для кожного файлу береться лише верхній край силуету (детальний контур),
нормалізується до ширини 2790 і зберігається як ламана. Низ доповнюється
на сайті сам: «ground» — гори заповнені знизу, «sky» — заповнене небо над ними.
"""
import json, math, re, sys

def parse_transforms(svg):
    return [tuple(float(v) for v in m.split(',')) for m in re.findall(r'matrix\(([^)]*)\)', svg)]

def tokens(d):
    for m in re.finditer(r'[MCLZmclz]|-?\d*\.?\d+(?:e-?\d+)?', d):
        yield m.group(0)

def flatten(d, steps=10):
    pts, cur, start = [], (0, 0), (0, 0)
    toks = list(tokens(d)); i = 0; cmd = None
    num = lambda: float(toks[i])
    while i < len(toks):
        t = toks[i]
        if t in 'MCLZmclz':
            cmd = t; i += 1
            if cmd in 'Zz':
                pts.append(start); cur = start
            continue
        if cmd == 'M':
            cur = (float(toks[i]), float(toks[i + 1])); start = cur; pts.append(cur); i += 2; cmd = 'L'
        elif cmd == 'L':
            cur = (float(toks[i]), float(toks[i + 1])); pts.append(cur); i += 2
        elif cmd == 'C':
            c1 = (float(toks[i]), float(toks[i + 1])); c2 = (float(toks[i + 2]), float(toks[i + 3]))
            p = (float(toks[i + 4]), float(toks[i + 5])); i += 6
            for k in range(1, steps + 1):
                u = k / steps; a = (1 - u) ** 3; b = 3 * u * (1 - u) ** 2; c = 3 * u * u * (1 - u); e = u ** 3
                pts.append((a * cur[0] + b * c1[0] + c * c2[0] + e * p[0], a * cur[1] + b * c1[1] + c * c2[1] + e * p[1]))
            cur = p
        else:
            raise ValueError(cmd)
    return pts

def apply(pts, mats):
    for a, b, c, d, e, f in reversed(mats):
        pts = [(a * x + c * y + e, b * x + d * y + f) for x, y in pts]
    return pts

def top_envelope(poly, width, step=2):
    out = []
    n = len(poly)
    for X in [i * step for i in range(int(width / step) + 1)]:
        best = None
        for j in range(n):
            (x1, y1), (x2, y2) = poly[j], poly[(j + 1) % n]
            if (x1 - X) * (x2 - X) <= 0 and x1 != x2:
                y = y1 + (y2 - y1) * (X - x1) / (x2 - x1)
                best = y if best is None else min(best, y)
        if best is not None:
            out.append((X, best))
    return out

def rdp(pts, eps):
    if len(pts) < 3: return pts
    (x1, y1), (x2, y2) = pts[0], pts[-1]
    dx, dy = x2 - x1, y2 - y1; L = math.hypot(dx, dy) or 1
    dmax, idx = 0, 0
    for i in range(1, len(pts) - 1):
        d = abs(dy * pts[i][0] - dx * pts[i][1] + x2 * y1 - y2 * x1) / L
        if d > dmax: dmax, idx = d, i
    if dmax > eps:
        return rdp(pts[:idx + 1], eps)[:-1] + rdp(pts[idx:], eps)
    return [pts[0], pts[-1]]

if __name__ == '__main__':
    res = {}
    for fn in sys.argv[1:]:
        svg = open(fn).read()
        d = re.search(r'<path d="([^"]+)"', svg).group(1)
        W = float(re.search(r'viewBox="0 0 ([\d.]+)', svg).group(1))
        pts = apply(flatten(d), parse_transforms(svg))
        env = top_envelope(pts, W)
        env[0] = (0, env[0][1]); env[-1] = (W, env[-1][1])
        ymin = min(y for _, y in env)
        env = [(x, y - ymin) for x, y in env]
        env = rdp(env, 0.6)
        name = re.search(r'Mount_(\d)', fn).group(1)
        res['m' + name] = {'h': round(max(y for _, y in env), 1), 'pts': [[round(x, 1), round(y, 1)] for x, y in env]}
    json.dump(res, sys.stdout)
