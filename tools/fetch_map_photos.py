"""Фото локацій для мапи з Вікісховища (вільні ліцензії, з підписом автора).
Запуск: python3 tools/fetch_map_photos.py"""
import os, urllib.request, urllib.parse, io
from PIL import Image
B = "https://upload.wikimedia.org/wikipedia/commons/thumb/"
PHOTOS = {  # pin: (path, author, license)
  "blyznytsia": ("9/97/Зимова_Близниця.jpg", "Тарас Лесів", "CC BY-SA 4.0"),
  "zhandarm":   ("6/6a/Карпатська_піраміда.Жандарм.jpg", "Misha Reme", "CC BY-SA 4.0"),
  "stih":       ("4/4c/Вид_на_Стіг_та_Догяску.jpg", "ЯдвигаВереск", "CC BY-SA 4.0"),
  "peremychka": ("1/19/Вид_на_Драгобрат_з_гори_Жандарм.jpg", "Тарас Лесів", "CC BY-SA 4.0"),
  "runs":       ("0/06/Dragobrat,_Ukraine_(Unsplash).jpg", "Ross Sokolovski", "CC0"),
  "ivor":       ("7/76/Озеро_Івор_у_підніжжі_Близниці_й_Жандармів.jpg", "Billchik", "CC BY-SA 4.0"),
  "hereshaska": ("0/0b/Озеро_Герешаска_(Догяска).jpg", "Mariia Nasypana", "CC BY-SA 4.0"),
  "evening":    ("4/41/Зимовий_вечір_на_Драгобраті.jpg", "Тарас Лесів", "CC BY-SA 4.0"),
}
OUT = os.path.join(os.path.dirname(os.path.abspath(__file__)), "..", "assets", "img")
import time
for k, (p, a, l) in PHOTOS.items():
    if os.path.exists(os.path.join(OUT, f"loc-{k}.webp")): continue
    time.sleep(8)
    name = p.split("/")[-1]
    url = B + urllib.parse.quote(p) + "/960px-" + urllib.parse.quote(name)
    req = urllib.request.Request(url, headers={"User-Agent": "AdrenalinHotelSite/1.0 (https://github.com/apstudio21/adrenalin) python-urllib"})
    try:
        data = urllib.request.urlopen(req, timeout=60).read()
        im = Image.open(io.BytesIO(data)).convert("RGB")
        im.thumbnail((720, 720))
        im.save(os.path.join(OUT, f"loc-{k}.webp"), "WEBP", quality=78, method=6)
        print("ok", k, im.size)
    except Exception as e:
        print("!", k, e)
