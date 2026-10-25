/* Адреналін — головна сторінка (зимова версія) */
(() => {
  'use strict';
  const $ = (s, c = document) => c.querySelector(s);
  const $$ = (s, c = document) => [...c.querySelectorAll(s)];
  const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ------------------------------------------------------------------
     ДАНІ (у майбутньому — з адмінки Decap CMS)
  ------------------------------------------------------------------ */
  const BOOKING_PHONE = '+380980566772';           // Viber / Telegram відділу бронювання

  const ROOMS = {
    standart: {
      title: 'Стандарт', form: 'Стандарт', price: 7300, extra: 3250,
      photos: ['assets/img/r-standart-1.webp', 'assets/img/r-standart-2.webp', 'assets/img/r-standart-3.webp', 'assets/img/r-standart-4.webp'],
      desc: 'Комфортний номер для спокійного відпочинку',
      spec: [['Площа', '22 м²'], ['Кімнат', '1'], ['Ліжка', '3 односпальні ліжка або 1 двоспальне ліжко + диван'], ['Розміщення', '1+1+1; 2+1']],
      equip: ['TFT LED 32 – телевізор', 'холодильник', 'персональний сейф', 'шафа', 'ванна кімната з душовою кабіною', 'рушники, капці, індивідуальні мийні засоби', 'фен', 'безкоштовний Wi Fi']
    },
    pivluks1: {
      title: 'Півлюкс з одним великим ліжком', form: 'Напівлюкс (1 велике ліжко)', price: 8200, extra: 3250,
      photos: ['assets/img/r-pivluks1-1.webp', 'assets/img/r-pivluks1-2.webp', 'assets/img/r-pivluks1-3.webp', 'assets/img/r-pivluks1-4.webp', 'assets/img/r-pivluks1-5.webp'],
      desc: 'Просторий номер із великим ліжком',
      spec: [['Площа', '24 м²'], ['Кімнат', '1'], ['Ліжка', '1 двоспальне ліжко + диван'], ['Розміщення', '2+1; 2+2; 1+1']],
      equip: ['TFT LED 32 – телевізор', 'холодильник', 'персональний сейф', 'шафа', 'ванна кімната з душовою кабіною', 'рушники, капці, індивідуальні мийні засоби', 'фен', 'безкоштовний Wi Fi']
    },
    pivluks2: {
      title: 'Півлюкс з двома окремими ліжками', form: 'Напівлюкс (2 окремих ліжка)', price: 7800, extra: 3250,
      photos: ['assets/img/r-pivluks2-1.webp', 'assets/img/r-pivluks2-2.webp', 'assets/img/r-pivluks2-3.webp', 'assets/img/r-pivluks2-4.webp'],
      desc: 'Зручний номер із двома окремими ліжками',
      spec: [['Площа', '24 м²'], ['Кімнат', '1'], ['Ліжка', '2 односпальні ліжка + тахта'], ['Розміщення', '2+1; 1+1']],
      equip: ['TFT LED 32 – телевізор', 'холодильник', 'персональний сейф', 'шафа', 'ванна кімната з душовою кабіною', 'рушники, капці, індивідуальні мийні засоби', 'фен', 'безкоштовний Wi Fi']
    },
    luks: {
      title: 'Люкс', form: 'Люкс', price: 9000, extra: 3650,
      photos: ['assets/img/r-luks-1.webp', 'assets/img/r-luks-2.webp', 'assets/img/r-luks-3.webp', 'assets/img/r-luks-4.webp', 'assets/img/r-luks-5.webp', 'assets/img/r-luks-6.webp'],
      desc: 'Преміальний простір для максимального комфорту',
      spec: [['Площа', '42 м²'], ['Кімнат', '1 + передпокій'], ['Ліжка', '1 двоспальне ліжко + диван + диван на лоджії'], ['Розміщення', '2+2+1']],
      equip: ['TFT LED 32 – телевізор', 'холодильник', 'персональний сейф', 'шафа', 'ванна кімната з душовою кабіною', 'халати, рушники, капці, індивідуальні мийні засоби', 'фен', '«набір гостинності» (для приготування чаю та кави)', 'безкоштовний Wi Fi']
    }
  };

  const REVIEWS = [
    { n: 'Дмитро', d: '02.03.2024', t: 'Топовий готель Драгобрату, тепер тільки тут зупинятись будемо: – гарний прокат, все підібрали, допомогли; – гарний, чистий номер з класним видом на ВК (+ нормальний за розміром, зазвичай маленькі номери на Дразі); – нормальні сніданки, можна вибрати, що по подобається; – дякую дівчатам на рецепції, вирішували всі питання; – окремо за шумоізоляцію, нікого не чули (зазвичай в інших готелях чуєш навіть розмови); – ну і просто комфортно було, при тому, що готель був заселений повністю. + ідеальне місцезнаходження, поряд Чайка, Різдво, не так далеко ВК' },
    { n: 'Наталія', d: '15.02.2025', t: 'Відпочивали з 09.02 по 15.02.2025. Все дуже сподобалось. Номера комфортні, дуже тепло, при цьому є можливість тепло регулювати тепло в номері. Види з вікна номеру заворожуючи. В номері є фен, холодильник, телевізор, капці, сейф….Весь персонал привітний та забезпечують комфортний відпочинок. Окремо хочу відзначити дівчат на ресепшені, які завжди з посмішкою допомагають у будь-якому питанні. Кухня в готелі дуже смачна!! Респект повару! Сніданки шведський стіл з 8:30 до 10:00 – асортимент великий, все смачно та завжди доповнюється. Офіціанти дуже уважні, привітні. Взагалі сервіс на вищому рівні. Для досугу на вечір наявні сауна, більярд, маленький теніс, настільні ігри, книги тощо. Поруч с готелем прокат спорядження та багато розваг на будь-який смак та гаманець) Нам сподобалось все. Дякую адміністрації готелю і всьому персоналу! Повернемося сюди не раз )' },
    { n: 'Leka', d: '10.01.2025', t: 'Вайбове місце! Чайка поряд зовсім. Шикарний вид з вікна. Номери теплі, зручні. Хороша білизна та зручне ліжко. Плюс відмінний шведський стіл на сніданок та вечерю. Офіціант Олександр професіонал своєї справи! Чуйний персонал, допомогли з пральною, трансфером, раннім заселенням. Залишилися дуже задоволені і повернемось ще обов’язково!' },
    { n: 'Carine', d: '11.01.2025', t: 'Абсолютно чудовий готель, все на вищому рівні, чисті хороші номера, сніданки і вечері то окрема любов, все супер смачно, персонал дуже хороший всім рекомендую, все відповідає ціні, повернемось до вас ще не раз, Адреналін ви найкращі' },
    { n: 'Ольга', d: '20.04.2023', t: 'Адреналін, як завжди на висоті. Дякуємо за добре проведені 10 днів у зимовій казці з високим рівнем сервісу. Вісім років теплої дружби, якщо Драг, то тільки до вас.' },
    { n: 'Олексендр', d: '28.01.2025', t: 'Найкращий, як на мене, готель на Драгобраті. Крутий ресторан с відмінною подачею страв, великим асортиментом та першокласним обслуговуванням. Коротше кажучи – топ. (Ціни відповідно також, але воно того варте)' },
    { n: 'Христина', d: '21.01.2021', t: 'Надзвичайно затишний гірський готель коло самого підйомника. Чисті просторі кімнати і смачна їжа, але саме красиве тут вигляд з балкону на засніжені гори' },
    { n: 'Констянтин', d: '23.02.2025', t: 'Готель сподобався всім. Номер теплий, чистий з гарним краєвидом. Завжди гаряча вода. Сервіс на рівні. Окреме спасибі хлопцям офіціантом, відзначу поштивість, ненастирливість і при цьому тонке розуміння дитячої поведінки. Кухарю окреме дякую' }
  ];

  // Фото: Вікісховище (Wikimedia Commons), вільні ліцензії — автор вказаний у підписі
  const PINS = {
    hotel: { t: 'Готель «Адреналін»', m: ['1700 м', 'поруч із підйомниками'], p: 'Найновіший та наймасштабніший заклад Драгобрату. Звідси кілька хвилин до схилів, а з вікон номерів видно Говерлу та гору Стіг.', img: 'assets/img/hero-night.webp' },
    blyznytsia: { t: 'Велика Близниця', m: ['1881 м', 'найвища точка Свидовця'], p: 'Найвища вершина Свидовецького хребта зовсім поруч із Драгобратом. З вершини видно Чорногору з Говерлою, а до неї веде дорога від курорту.', img: 'assets/img/loc-blyznytsia.webp', c: 'Тарас Лесів, CC BY-SA 4.0' },
    zhandarm: { t: 'Жандарм', m: ['1763 м', 'скелі'], p: 'Скеляста вершина над курортом — популярна мета прогулянок. Звідси відкривається один із найкращих краєвидів на Драгобрат.', img: 'assets/img/loc-zhandarm.webp', c: 'Misha Reme, CC BY-SA 4.0' },
    peremychka: { t: 'Перемичка', m: ['1560 м', 'перевал'], p: 'Сідловина між Жандармом і Стогом, де сходяться підйомники та траси. Звідси починається дорога на Близницю та Жандарми.', img: 'assets/img/loc-peremychka.webp', c: 'Тарас Лесів, CC BY-SA 4.0' },
    stih: { t: 'Гора Стіг', m: ['1704 м', 'Свидовецький хребет'], p: 'Біля самого підніжжя гори Стіг серед густих хвойних лісів розташований курорт Драгобрат. На її схилах — найдовші траси курорту.', img: 'assets/img/loc-stih.webp', c: 'ЯдвигаВереск, CC BY-SA 4.0' },
    ivor: { t: 'Озеро Івор', m: ['1600 м', 'льодовикове озеро'], p: 'Високогірне озеро біля підніжжя Близниці та Жандармів. Влітку — одна з найкрасивіших точок пішого маршруту від готелю.', img: 'assets/img/loc-ivor.webp', c: 'Billchik, CC BY-SA 4.0' },
    hereshaska: { t: 'Озеро Герешаска', m: ['1577 м', '≈ 2–2,5 год пішки'], p: 'Льодовикове озеро на схилах гори Догяска, над Драгобратським водоспадом. Вода навіть улітку прогрівається не більше ніж до +11 °C.', img: 'assets/img/loc-hereshaska.webp', c: 'Mariia Nasypana, CC BY-SA 4.0' },
    runs: { t: 'Траси та підйомники', m: ['9:00–18:00', 'абонементи'], p: '5 трас для новачків, 5 червоних, 2 чорні та траса для фрірайду. Підйомники працюють щодня, діє система абонементів, а лижна школа навчить навіть діток від 3 років.', img: 'assets/img/loc-runs.webp', c: 'Тарас Лесів, CC BY-SA 4.0' }
  };

  /* ------------------------------------------------------------------
     Toast
  ------------------------------------------------------------------ */
  const toastEl = $('.toast');
  let toastT;
  const toast = (msg, ms = 3600) => {
    $('span', toastEl).textContent = msg;
    toastEl.classList.add('is-on');
    clearTimeout(toastT);
    toastT = setTimeout(() => toastEl.classList.remove('is-on'), ms);
  };

  /* ------------------------------------------------------------------
     Header: solid on scroll, hide on scroll down
  ------------------------------------------------------------------ */
  const header = $('#header');
  let lastY = scrollY;
  const onScrollHeader = () => {
    const y = scrollY;
    header.classList.toggle('is-solid', y > 40);
    if (!document.body.classList.contains('menu-open')) {
      header.classList.toggle('is-hidden', y > 600 && y > lastY + 4);
      if (y < lastY - 4) header.classList.remove('is-hidden');
    }
    lastY = y;
  };
  addEventListener('scroll', onScrollHeader, { passive: true });
  onScrollHeader();

  /* Mobile menu */
  const burger = $('.burger');
  const mmenu = $('#mmenu');
  const setMenu = open => {
    document.body.classList.toggle('menu-open', open);
    burger.setAttribute('aria-expanded', open);
    mmenu.setAttribute('aria-hidden', !open);
    $$('.mmenu__links a').forEach((a, i) => a.style.transitionDelay = open ? `${120 + i * 45}ms` : '0ms');
  };
  burger.addEventListener('click', () => setMenu(!document.body.classList.contains('menu-open')));
  $$('.mmenu a').forEach(a => a.addEventListener('click', () => setMenu(false)));
  addEventListener('keydown', e => { if (e.key === 'Escape') setMenu(false); });

  /* Active link highlight */
  const navLinks = $$('.nav__links a[href^="#"]');
  const secObs = new IntersectionObserver(es => es.forEach(e => {
    if (!e.isIntersecting) return;
    const id = e.target.classList.contains('hero') ? '#top' : '#' + e.target.id;
    navLinks.forEach(a => a.classList.toggle('is-active', a.getAttribute('href') === id));
  }), { rootMargin: '-45% 0px -50% 0px' });
  ['rooms', 'reviews', 'gallery', 'dragobrat', 'contacts'].forEach(id => { const el = document.getElementById(id); el && secObs.observe(el); });
  const heroEl = $('.hero'); if (heroEl) { heroEl.id = heroEl.id || 'hero'; secObs.observe(heroEl); }

  /* "Coming soon" pages */
  $$('[data-soon]').forEach(a => a.addEventListener('click', e => {
    e.preventDefault();
    toast(`Сторінка «${a.dataset.soon}» з’явиться найближчим часом`);
  }));

  /* ------------------------------------------------------------------
     Season: winter / summer (summer version is planned)
     Auto: листопад–квітень = зима, травень–жовтень = літо
  ------------------------------------------------------------------ */
  const SUMMER_READY = false;
  const autoSeason = () => { const m = new Date().getMonth() + 1; return (m >= 11 || m <= 4) ? 'winter' : 'summer'; };
  const setSeason = (s, user) => {
    if (s === 'summer' && !SUMMER_READY) {
      if (user) toast('Літня версія сайту вже готується — скоро тут будуть озера, водоспади та гірські маршрути');
      s = 'winter';
    }
    document.documentElement.dataset.season = s;
    $$('[data-season-btn]').forEach(b => b.setAttribute('aria-pressed', b.dataset.seasonBtn === s));
  };
  $$('[data-season-btn]').forEach(b => b.addEventListener('click', () => setSeason(b.dataset.seasonBtn, true)));
  setSeason(autoSeason(), false);

  /* ------------------------------------------------------------------
     Snow
  ------------------------------------------------------------------ */
  const canvas = $('#snow');
  const ctx = canvas.getContext('2d');
  let flakes = [], W = 0, H = 0, dpr = 1, raf;
  // сніг іде лише в зимовій версії сайту
  const snowOn = () => document.documentElement.dataset.season === 'winter';
  const mkFlake = (init) => {
    const z = Math.random();                 // depth 0..1
    return { x: Math.random() * W, y: init ? Math.random() * H : -10, z,
      r: 0.6 + z * 2.4, vy: 0.25 + z * 1.05, vx: (Math.random() - .5) * .3,
      a: 0.25 + z * 0.6, ph: Math.random() * Math.PI * 2, sp: 0.004 + Math.random() * 0.01 };
  };
  const sizeSnow = () => {
    dpr = Math.min(devicePixelRatio || 1, 2);
    W = innerWidth; H = innerHeight;
    canvas.width = W * dpr; canvas.height = H * dpr;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    const n = Math.round(Math.min(140, W * H / 11000));
    flakes = Array.from({ length: n }, () => mkFlake(true));
  };
  let wind = 0, windT = 0;
  const tick = () => {
    ctx.clearRect(0, 0, W, H);
    windT += 0.002; wind = Math.sin(windT) * 0.35;
    // denser over the hero, lighter further down the page
    const fade = Math.max(0.35, 1 - scrollY / (H * 1.6));
    for (const f of flakes) {
      f.ph += f.sp;
      f.y += f.vy;
      f.x += f.vx + wind * f.z + Math.sin(f.ph) * 0.3;
      if (f.y > H + 10) Object.assign(f, mkFlake(false));
      if (f.x > W + 10) f.x = -10; else if (f.x < -10) f.x = W + 10;
      ctx.globalAlpha = f.a * fade;
      ctx.beginPath(); ctx.arc(f.x, f.y, f.r, 0, Math.PI * 2);
      ctx.fillStyle = '#fff'; ctx.fill();
    }
    raf = requestAnimationFrame(tick);
  };
  const startSnow = () => { cancelAnimationFrame(raf); if (snowOn() && !reduce) tick(); else ctx.clearRect(0, 0, W, H); };
  const applySnow = () => { document.body.classList.toggle('no-snow', !snowOn()); startSnow(); };
  sizeSnow(); applySnow();
  let rT; addEventListener('resize', () => { clearTimeout(rT); rT = setTimeout(() => { sizeSnow(); }, 200); });
  document.addEventListener('visibilitychange', () => { if (document.hidden) cancelAnimationFrame(raf); else startSnow(); });

  /* ------------------------------------------------------------------
     Split headings into words
  ------------------------------------------------------------------ */
  $$('[data-split]').forEach(el => {
    let i = 0;
    const walk = node => {
      [...node.childNodes].forEach(ch => {
        if (ch.nodeType === 3) {
          const frag = document.createDocumentFragment();
          ch.textContent.split(/(\s+)/).forEach(part => {
            if (!part) return;
            if (/^\s+$/.test(part)) { frag.append(document.createTextNode(' ')); return; }
            const w = document.createElement('span'); w.className = 'w';
            const s = document.createElement('span'); s.textContent = part; s.style.setProperty('--i', i++);
            w.append(s); frag.append(w);
          });
          ch.replaceWith(frag);
        } else if (ch.nodeType === 1) walk(ch);
      });
    };
    walk(el);
  });

  /* ------------------------------------------------------------------
     Reveal on scroll + counters + bars
  ------------------------------------------------------------------ */
  const countUp = el => {
    const end = +el.dataset.count; const dur = 1800; const t0 = performance.now();
    const fmt = n => String(n);
    const step = t => {
      const p = Math.min(1, (t - t0) / dur);
      const e = 1 - Math.pow(1 - p, 4);
      el.textContent = fmt(Math.round(end * e));
      if (p < 1) requestAnimationFrame(step);
    };
    if (reduce) el.textContent = fmt(end); else requestAnimationFrame(step);
  };
  const io = new IntersectionObserver(es => es.forEach(e => {
    if (!e.isIntersecting) return;
    e.target.classList.add('is-in');
    $$('[data-count]', e.target).forEach(countUp);
    io.unobserve(e.target);
  }), { threshold: 0.15, rootMargin: '0px 0px -6% 0px' });
  $$('.rv, .split, [data-reveal-img], [data-bars]').forEach(el => io.observe(el));

  /* ------------------------------------------------------------------
     Parallax
  ------------------------------------------------------------------ */
  const px = $$('[data-parallax]');
  if (!reduce && px.length) {
    let ticking = false;
    const run = () => {
      px.forEach(el => {
        const r = el.parentElement.getBoundingClientRect();
        if (r.bottom < 0 || r.top > innerHeight) return;
        const k = +el.dataset.parallax;
        const off = (r.top + r.height / 2 - innerHeight / 2) * -k;
        el.style.transform = `translate3d(0,${off.toFixed(1)}px,0)`;
      });
      ticking = false;
    };
    addEventListener('scroll', () => { if (!ticking) { ticking = true; requestAnimationFrame(run); } }, { passive: true });
    run();
  }

  /* ------------------------------------------------------------------
     Services tabs
  ------------------------------------------------------------------ */
  const svc = $('[data-svc]');
  if (svc) {
    const items = $$('.svc__item', svc), imgs = $$('.svc__img', svc);
    const title = $('[data-svc-title]', svc), num = $('[data-svc-num]', svc);
    let cur = 0, auto;
    const show = i => {
      cur = i;
      items.forEach((it, k) => { it.classList.toggle('is-active', k === i); $('.svc__btn', it).setAttribute('aria-expanded', k === i); });
      imgs.forEach((im, k) => im.classList.toggle('is-active', k === i));
      title.textContent = $('.t', items[i]).textContent;
      num.textContent = String(i + 1).padStart(2, '0');
    };
    items.forEach((it, i) => {
      const b = $('.svc__btn', it);
      b.addEventListener('click', () => { show(i); clearInterval(auto); });
      b.addEventListener('mouseenter', () => { if (matchMedia('(hover:hover)').matches) { show(i); clearInterval(auto); } });
    });
    const sObs = new IntersectionObserver(es => es.forEach(e => {
      clearInterval(auto);
      if (e.isIntersecting && !reduce) auto = setInterval(() => show((cur + 1) % items.length), 5000);
    }), { threshold: .4 });
    sObs.observe(svc);
  }

  /* ------------------------------------------------------------------
     Photo slider (room cards + room drawer)
  ------------------------------------------------------------------ */
  const makeSlider = (host, photos, alt, { onPick, counter = false, eager = false } = {}) => {
    host.querySelectorAll('.sl, :scope > img').forEach(n => n.remove());
    const sl = document.createElement('div'); sl.className = 'sl';
    sl.innerHTML = `<div class="sl__track">${photos.map((src, i) =>
        `<img src="${src}" alt="${alt}, фото ${i + 1}" ${eager && i === 0 ? '' : 'loading="lazy"'} draggable="false">`).join('')}</div>
      <button class="sl__btn sl__prev" type="button" aria-label="Попереднє фото"><svg><use href="#i-left"/></svg></button>
      <button class="sl__btn sl__next" type="button" aria-label="Наступне фото"><svg><use href="#i-arrow"/></svg></button>
      <div class="sl__dots">${photos.map(() => '<i></i>').join('')}</div>
      ${counter ? '<span class="sl__count"></span>' : ''}`;
    host.prepend(sl);
    const track = $('.sl__track', sl), dots = $$('.sl__dots i', sl), cnt = $('.sl__count', sl);
    const prev = $('.sl__prev', sl), next = $('.sl__next', sl);
    const idx = () => Math.round(track.scrollLeft / (track.clientWidth || 1));
    const go = (i, smooth = true) => track.scrollTo({ left: Math.max(0, Math.min(photos.length - 1, i)) * track.clientWidth, behavior: smooth && !reduce ? 'smooth' : 'auto' });
    const sync = () => {
      const i = idx();
      dots.forEach((d, k) => d.classList.toggle('is-on', k === i));
      prev.disabled = i <= 0; next.disabled = i >= photos.length - 1;
      if (cnt) cnt.textContent = `${i + 1} / ${photos.length}`;
    };
    prev.addEventListener('click', e => { e.stopPropagation(); go(idx() - 1); });
    next.addEventListener('click', e => { e.stopPropagation(); go(idx() + 1); });
    track.addEventListener('scroll', () => requestAnimationFrame(sync), { passive: true });
    if (onPick) track.addEventListener('click', () => onPick(idx()));
    sync();
    return { go };
  };

  /* ------------------------------------------------------------------
     Room drawer
  ------------------------------------------------------------------ */
  const drawer = $('#drawer');
  let drawerRoom = null, lastFocus = null;
  const money = n => n.toLocaleString('uk-UA').replace(/ /g, ' ');
  const drawerGal = $('[data-drawer-gallery]', drawer);
  const openDrawer = (key, start = 0) => {
    const r = ROOMS[key]; if (!r) return;
    drawerRoom = key; lastFocus = document.activeElement;
    const ds = makeSlider(drawerGal, r.photos, r.title, { counter: true, eager: true });
    requestAnimationFrame(() => ds.go(start, false));
    $('#drawerTitle').textContent = r.title;
    $('[data-d-desc]', drawer).textContent = r.desc;
    $('[data-d-spec]', drawer).innerHTML = r.spec.map(([k, v]) => `<div><dt>${k}</dt><dd>${v}</dd></div>`).join('');
    $('[data-d-equip]', drawer).innerHTML = r.equip.map(x => `<li><svg><use href="#i-check"/></svg>${x}</li>`).join('');
    $('[data-d-price]', drawer).textContent = `від ${money(r.price)} грн`;
    $('[data-d-extra]', drawer).textContent = `${money(r.extra)} грн`;
    drawer.classList.add('is-open'); drawer.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
    setTimeout(() => $('.drawer__close', drawer).focus(), 50);
  };
  const closeDrawer = () => {
    drawer.classList.remove('is-open'); drawer.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
    lastFocus && lastFocus.focus && lastFocus.focus({ preventScroll: true });
  };
  $$('[data-room-open]').forEach(a => a.addEventListener('click', e => { e.preventDefault(); openDrawer(a.dataset.roomOpen); }));
  $$('[data-gallery]').forEach(m => {
    const key = m.dataset.gallery, r = ROOMS[key];
    if (r) makeSlider(m, r.photos, r.title, { onPick: i => openDrawer(key, i) });
  });
  $$('[data-drawer-close]', drawer).forEach(b => b.addEventListener('click', closeDrawer));
  $('[data-d-book]', drawer).addEventListener('click', () => { closeDrawer(); pickRoom(drawerRoom); });
  addEventListener('keydown', e => { if (e.key === 'Escape' && drawer.classList.contains('is-open')) closeDrawer(); });

  /* ------------------------------------------------------------------
     Booking form → Viber / Telegram
  ------------------------------------------------------------------ */
  const form = $('#bookForm');
  const errBox = $('[data-err]');
  const guests = { adults: 2, kids: 0 };
  const limits = { adults: [1, 5], kids: [0, 4] };
  const pad = n => String(n).padStart(2, '0');
  const iso = d => `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`;
  const ua = s => { if (!s) return ''; const [y, m, d] = s.split('-'); return `${d}.${m}.${y}`; };
  const today = new Date();
  form.checkin.min = iso(today);
  form.checkout.min = iso(new Date(today.getTime() + 864e5));

  function pickRoom(key) {
    const input = form.querySelector(`input[name="room"][value="${key}"]`);
    if (input) { input.checked = true; updateSummary(); }
    $('#booking').scrollIntoView({ behavior: reduce ? 'auto' : 'smooth' });
  }
  $$('[data-book-room]').forEach(b => b.addEventListener('click', () => pickRoom(b.dataset.bookRoom)));

  $$('[data-stepper]').forEach(st => {
    const key = st.dataset.stepper, out = $('output', st);
    $$('button', st).forEach(b => b.addEventListener('click', () => {
      const [mn, mx] = limits[key];
      guests[key] = Math.min(mx, Math.max(mn, guests[key] + +b.dataset.step));
      out.textContent = guests[key];
      updateSummary();
    }));
  });

  const nights = () => {
    const a = form.checkin.value, b = form.checkout.value;
    if (!a || !b) return 0;
    const n = Math.round((new Date(b) - new Date(a)) / 864e5);
    return n > 0 ? n : 0;
  };
  const plural = (n, one, few, many) => {
    const m10 = n % 10, m100 = n % 100;
    if (m10 === 1 && m100 !== 11) return one;
    if (m10 >= 2 && m10 <= 4 && (m100 < 12 || m100 > 14)) return few;
    return many;
  };
  function updateSummary() {
    const key = form.room.value;
    const r = ROOMS[key];
    const n = nights();
    const l = $('[data-sum-l]'), p = $('[data-sum-p]'), s = $('[data-sum-s]');
    if (!r) { l.textContent = 'Оберіть номер і дати, щоб побачити орієнтовну вартість'; p.textContent = '—'; s.textContent = ''; return; }
    const g = `${guests.adults} ${plural(guests.adults, 'дорослий', 'дорослих', 'дорослих')}` + (guests.kids ? `, ${guests.kids} ${plural(guests.kids, 'дитина', 'дитини', 'дітей')}` : '');
    l.innerHTML = `<b>${r.title}</b><br>${n ? `${n} ${plural(n, 'ніч', 'ночі', 'ночей')} · ` : ''}${g}`;
    if (n) { p.textContent = `${money(r.price * n)} грн`; s.textContent = 'орієнтовно, за 2 осіб'; }
    else { p.textContent = `${money(r.price)} грн`; s.textContent = 'за ніч · оберіть дати'; }
  }
  form.addEventListener('change', e => {
    if (e.target.name === 'checkin' && form.checkin.value) {
      const d = new Date(form.checkin.value); d.setDate(d.getDate() + 1);
      form.checkout.min = iso(d);
      if (!form.checkout.value || form.checkout.value <= form.checkin.value) form.checkout.value = iso(d);
    }
    updateSummary();
  });
  form.addEventListener('input', e => e.target.closest('.fld')?.classList.remove('is-err'));

  const buildMessage = () => {
    const r = ROOMS[form.room.value];
    const n = nights();
    const lines = [
      'Добрий день! Хочу забронювати номер у готелі «Адреналін».',
      '',
      `Номер: ${r.form}`,
      `Заїзд: ${ua(form.checkin.value)}`,
      `Виїзд: ${ua(form.checkout.value)} (${n} ${plural(n, 'ніч', 'ночі', 'ночей')})`,
      `Гості: ${guests.adults} ${plural(guests.adults, 'дорослий', 'дорослих', 'дорослих')}${guests.kids ? `, ${guests.kids} ${plural(guests.kids, 'дитина', 'дитини', 'дітей')}` : ''}`,
      `Ім'я: ${form.name.value.trim()}`,
      `Телефон: ${form.phone.value.trim()}`
    ];
    if (form.note.value.trim()) lines.push(`Побажання: ${form.note.value.trim()}`);
    lines.push('', 'Повідомлення з сайту adrenalin-dragobrat.com.ua');
    return lines.join('\n');
  };
  const validate = () => {
    const errs = [];
    $$('.fld', form).forEach(f => f.classList.remove('is-err'));
    if (!form.room.value) errs.push('оберіть тип номеру');
    if (!form.checkin.value) { errs.push('вкажіть дату заїзду'); form.checkin.closest('.fld').classList.add('is-err'); }
    if (!form.checkout.value || !nights()) { errs.push('вкажіть дату виїзду'); form.checkout.closest('.fld').classList.add('is-err'); }
    if (form.name.value.trim().length < 2) { errs.push('вкажіть ім’я'); form.name.closest('.fld').classList.add('is-err'); }
    if (form.phone.value.replace(/\D/g, '').length < 10) { errs.push('вкажіть телефон'); form.phone.closest('.fld').classList.add('is-err'); }
    errBox.classList.toggle('is-on', !!errs.length);
    errBox.textContent = errs.length ? 'Будь ласка, ' + errs.join(', ') + '.' : '';
    return !errs.length;
  };
  const copy = async txt => {
    try { await navigator.clipboard.writeText(txt); return true; }
    catch (e) {
      const ta = document.createElement('textarea'); ta.value = txt; ta.style.position = 'fixed'; ta.style.opacity = '0';
      document.body.append(ta); ta.select();
      let ok = false; try { ok = document.execCommand('copy'); } catch (er) {}
      ta.remove(); return ok;
    }
  };
  $$('[data-send]').forEach(b => b.addEventListener('click', async () => {
    if (!validate()) { errBox.scrollIntoView({ behavior: 'smooth', block: 'center' }); return; }
    const msg = buildMessage();
    const copied = await copy(msg);
    const num = BOOKING_PHONE.replace('+', '');
    if (b.dataset.send === 'viber') {
      // Viber підставляє текст у поле повідомлення (draft) — на телефоні працює одразу
      location.href = `viber://chat?number=%2B${num}&draft=${encodeURIComponent(msg)}`;
      toast(copied ? 'Відкриваємо Viber… Текст також скопійовано — якщо поле порожнє, просто вставте його' : 'Відкриваємо Viber…', 6000);
    } else {
      // Telegram не дозволяє підставити текст у чат за номером — тому текст копіюється в буфер
      window.open(`https://t.me/+${num}`, '_blank', 'noopener');
      toast(copied ? 'Текст заявки скопійовано — вставте його в чат Telegram і надішліть' : 'Відкриваємо Telegram…', 7000);
    }
  }));
  updateSummary();

  /* ------------------------------------------------------------------
     Interactive Dragobrat map
  ------------------------------------------------------------------ */
  const map = $('[data-map]');
  if (map) {
    const pop = $('.pop', map), canvasEl = $('.map__canvas', map), scroller = $('.map__scroller', map);
    let active = null;
    const close = () => { pop.classList.remove('is-open'); active && active.classList.remove('is-active'); active = null; };
    const open = pin => {
      const d = PINS[pin.dataset.pin]; if (!d) return;
      active && active.classList.remove('is-active');
      active = pin; pin.classList.add('is-active');
      $('h4', pop).textContent = d.t;
      $('p', pop).textContent = d.p;
      $('.pop__meta', pop).innerHTML = d.m.map(x => `<span>${x}</span>`).join('');
      $('.pop__media', pop).innerHTML = `<img src="${d.img}" alt="${d.t}">` + (d.c ? `<small class="pop__credit">Фото: ${d.c} · Вікісховище</small>` : '');
      // position near the pin (desktop); on mobile CSS turns it into a bottom sheet
      const mr = map.getBoundingClientRect(), pr = pin.getBoundingClientRect();
      let left = pr.left - mr.left + pr.width / 2 + 24;
      let top = pr.top - mr.top - 40;
      const pw = Math.min(340, mr.width - 32);
      if (left + pw > mr.width - 16) left = pr.left - mr.left - pw - 24 + pr.width / 2;
      left = Math.max(16, left);
      top = Math.max(16, Math.min(top, mr.height - 330));
      pop.style.left = left + 'px'; pop.style.top = top + 'px';
      pop.classList.add('is-open');
    };
    $$('.pin', map).forEach(p => p.addEventListener('click', e => { e.stopPropagation(); active === p ? close() : open(p); }));
    $('.pop__close', pop).addEventListener('click', close);
    canvasEl.addEventListener('click', close);
    addEventListener('keydown', e => { if (e.key === 'Escape') close(); });
    // drag to pan (on narrow screens the panorama is wider than the viewport)
    let down = false, sx = 0, sl = 0, moved = false;
    scroller.addEventListener('pointerdown', e => { if (e.pointerType !== 'mouse') return; down = true; moved = false; sx = e.clientX; sl = scroller.scrollLeft; });
    addEventListener('pointermove', e => { if (!down) return; const dx = e.clientX - sx; if (Math.abs(dx) > 3) moved = true; scroller.scrollLeft = sl - dx; });
    addEventListener('pointerup', () => { down = false; });
    scroller.addEventListener('scroll', () => { if (active && innerWidth > 820) close(); }, { passive: true });
    // start centred on the hotel on small screens
    requestAnimationFrame(() => { if (scroller.scrollWidth > scroller.clientWidth) scroller.scrollLeft = (scroller.scrollWidth - scroller.clientWidth) * 0.55; });
  }

  /* ------------------------------------------------------------------
     Gallery: drag scroll, arrows, progress, lightbox
  ------------------------------------------------------------------ */
  const gal = $('[data-gal]');
  if (gal) {
    const bar = $('[data-gal-bar]'), prev = $('[data-gal-prev]'), next = $('[data-gal-next]');
    const upd = () => {
      const max = gal.scrollWidth - gal.clientWidth;
      const p = max > 0 ? gal.scrollLeft / max : 0;
      const w = Math.max(.12, gal.clientWidth / gal.scrollWidth);
      bar.style.width = (w * 100) + '%';
      bar.style.transform = `translateX(${p * (1 / w - 1) * 100}%)`;
      prev.disabled = gal.scrollLeft < 8; next.disabled = gal.scrollLeft > max - 8;
    };
    gal.addEventListener('scroll', upd, { passive: true }); addEventListener('resize', upd); upd();
    const stepBy = dir => gal.scrollBy({ left: dir * gal.clientWidth * 0.7, behavior: 'smooth' });
    prev.addEventListener('click', () => stepBy(-1)); next.addEventListener('click', () => stepBy(1));
    let down = false, sx = 0, sl = 0, moved = false;
    gal.addEventListener('pointerdown', e => { if (e.pointerType !== 'mouse') return; down = true; moved = false; sx = e.clientX; sl = gal.scrollLeft; });
    addEventListener('pointermove', e => { if (!down) return; const dx = e.clientX - sx; if (Math.abs(dx) > 5) { moved = true; gal.classList.add('is-drag'); } gal.scrollLeft = sl - dx; });
    addEventListener('pointerup', () => { if (!down) return; down = false; setTimeout(() => gal.classList.remove('is-drag'), 0); });

    // lightbox
    const lb = $('#lb'), lbImg = $('img', lb), lbCount = $('.lb__count', lb);
    const items = $$('.gal__item img', gal);
    let li = 0;
    const lbShow = i => { li = (i + items.length) % items.length; lbImg.src = items[li].src; lbImg.alt = items[li].alt; lbCount.textContent = `${pad(li + 1)} / ${pad(items.length)}`; };
    const lbOpen = i => { lbShow(i); lb.classList.add('is-open'); lb.setAttribute('aria-hidden', 'false'); document.body.style.overflow = 'hidden'; $('.lb__close', lb).focus(); };
    const lbClose = () => { lb.classList.remove('is-open'); lb.setAttribute('aria-hidden', 'true'); document.body.style.overflow = ''; };
    items.forEach((img, i) => { img.parentElement.tabIndex = 0; img.parentElement.addEventListener('click', () => { if (!moved) lbOpen(i); }); img.parentElement.addEventListener('keydown', e => { if (e.key === 'Enter') lbOpen(i); }); });
    $('.lb__close', lb).addEventListener('click', lbClose);
    $('.lb__prev', lb).addEventListener('click', () => lbShow(li - 1));
    $('.lb__next', lb).addEventListener('click', () => lbShow(li + 1));
    lb.addEventListener('click', e => { if (e.target === lb) lbClose(); });
    addEventListener('keydown', e => {
      if (!lb.classList.contains('is-open')) return;
      if (e.key === 'Escape') lbClose(); if (e.key === 'ArrowLeft') lbShow(li - 1); if (e.key === 'ArrowRight') lbShow(li + 1);
    });
    let tx = 0; lb.addEventListener('touchstart', e => tx = e.touches[0].clientX, { passive: true });
    lb.addEventListener('touchend', e => { const dx = e.changedTouches[0].clientX - tx; if (Math.abs(dx) > 50) lbShow(li + (dx < 0 ? 1 : -1)); });
  }

  /* ------------------------------------------------------------------
     Reviews slider
  ------------------------------------------------------------------ */
  const rev = $('[data-rev]');
  if (rev) {
    const star = '<svg><use href="#i-star"/></svg>';
    rev.innerHTML = REVIEWS.map(r => `
      <article class="rcard">
        <svg class="rcard__q"><use href="#i-quote"/></svg>
        <p class="rcard__text">${r.t}</p>
        <button class="rcard__more" type="button" hidden>Читати повністю</button>
        <div class="rcard__foot">
          <span class="avatar">${r.n.trim()[0]}</span>
          <div><div class="rcard__name">${r.n}</div><div class="rcard__date">${r.d}</div></div>
          <span class="stars">${star.repeat(5)}</span>
        </div>
      </article>`).join('');
    const cards = $$('.rcard', rev);
    requestAnimationFrame(() => cards.forEach(c => {
      const t = $('.rcard__text', c), m = $('.rcard__more', c);
      if (t.scrollHeight > t.clientHeight + 4) {
        m.hidden = false;
        m.addEventListener('click', () => { c.classList.toggle('is-open'); m.textContent = c.classList.contains('is-open') ? 'Згорнути' : 'Читати повністю'; });
      }
    }));
    const dots = $('[data-rev-dots]');
    dots.innerHTML = cards.map((_, i) => `<button type="button" aria-label="Відгук ${i + 1}"></button>`).join('');
    const db = $$('button', dots);
    const idx = () => Math.round(rev.scrollLeft / (cards[0].offsetWidth + 20));
    const go = i => rev.scrollTo({ left: Math.max(0, Math.min(i, cards.length - 1)) * (cards[0].offsetWidth + 20) });
    const sync = () => { const i = idx(); db.forEach((d, k) => d.classList.toggle('is-active', k === i)); };
    rev.addEventListener('scroll', () => requestAnimationFrame(sync), { passive: true });
    db.forEach((d, i) => d.addEventListener('click', () => go(i)));
    $('[data-rev-prev]').addEventListener('click', () => go(idx() - 1));
    $('[data-rev-next]').addEventListener('click', () => go(idx() + 1 >= cards.length ? 0 : idx() + 1));
    sync();
  }
})();
