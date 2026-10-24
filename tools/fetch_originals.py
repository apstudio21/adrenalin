"""Завантажує оригінальні фото з сайту готелю та готує їх для сайту (WebP).

Запуск (коли домен adrenalin-dragobrat.com.ua доступний):
    python3 tools/fetch_originals.py

Фото потрапляють у tools/originals/ (сирі файли) та assets/img/ (оптимізовані WebP).
Поки що на сайті стоять фото, витягнуті зі скриншотів, — цей скрипт замінить їх
на оригінали у кращій якості й додасть фото галереї.
"""
import os, sys, urllib.parse, urllib.request
from PIL import Image

BASE = "https://adrenalin-dragobrat.com.ua/wp-content/uploads/"
HERE = os.path.dirname(os.path.abspath(__file__))
RAW = os.path.join(HERE, "originals")
OUT = os.path.join(HERE, "..", "assets", "img")

# назва на сайті  ->  шлях оригіналу
MAP = {
    "hero-night": "2026/10/Засніжений-готель-Адреналін-вночі.png",
    "room-standart": "2026/10/Светлая-гостиничная-спальня-с-тремя-кроватями-1.png",
    "room-pivluks-1": "2026/10/Уютная-спальня-с-балконом-и-лесным-видом.png",
    "room-pivluks-2": "2026/10/Світлий-затишний-номер-із-видом-на-пагорби.png",
    "svc-sauna": "2026/04/photo-55-scaled.jpg",
    "svc-tennis": "2026/04/382original1601665493.jpg",
    "svc-salt": "2026/04/photo-28-scaled.jpg",
    "room-luks": "2026/10/Уютный-гостиничный-номер-в-тёплом-свете.png",
    "svc-fireplace": "2026/04/depositphotos_22452055-stock-photo-fire-in-a-fireplace-fire.webp",
    "svc-ski": "2026/04/prokat-lyzh-girskyh.jpg",
    "restaurant-entrance": "2026/10/Зимний-вход-в-Адреналін.png",
}
GALLERY = [
    "2026/10/Тёплая-ёлка-у-зимнего-окна.png",
    "2026/10/Затишний-різдвяний-хол-із-вивіскою-Адреналін.png",
    "2026/10/Зимняя-роскошь_-шампанское-и-десерт.png",
    "2026/10/Праздничный-стол-с-бокалами-и-ёлкой.png",
    "2026/10/Зимний-отель-Адреналин.png",
    "2026/10/Романтический-десерт-у-альпийского-окна.png",
    "2026/10/Зимній-вечір-біля-готелю-Апрелька.png",
    "2026/07/dragobrat-map.jpg",
]

def get(path):
    url = BASE + urllib.parse.quote(path)
    dst = os.path.join(RAW, path.replace("/", "_"))
    if not os.path.exists(dst):
        req = urllib.request.Request(url, headers={"User-Agent": "Mozilla/5.0"})
        with urllib.request.urlopen(req, timeout=60) as r, open(dst, "wb") as f:
            f.write(r.read())
    return dst

def to_webp(src, name, max_w=1920, q=80):
    im = Image.open(src).convert("RGB")
    if im.width > max_w:
        im = im.resize((max_w, round(im.height * max_w / im.width)), Image.LANCZOS)
    im.save(os.path.join(OUT, name + ".webp"), "WEBP", quality=q, method=6)
    print(f"  {name}.webp  {im.size}")

if __name__ == "__main__":
    os.makedirs(RAW, exist_ok=True)
    for name, path in MAP.items():
        try:
            to_webp(get(path), name, 1920 if name.startswith("hero") else 1400)
        except Exception as e:
            print("!", name, e, file=sys.stderr)
    for i, path in enumerate(GALLERY, 1):
        try:
            to_webp(get(path), f"gallery-{i:02d}", 1400)
        except Exception as e:
            print("!", path, e, file=sys.stderr)
