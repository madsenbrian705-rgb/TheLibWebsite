/* The Library Kitchen & Taphouse — site behavior. Content lives in data.js. */
(function () {
  "use strict";

  var D = window.LIBRARY;
  var DAY_KEYS = ["sun", "mon", "tue", "wed", "thu", "fri", "sat"];
  var DAY_NAMES = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
  var WEEK_ORDER = [1, 2, 3, 4, 5, 6, 0]; // Mon first
  var MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  var reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  function $(sel, root) { return (root || document).querySelector(sel); }
  function $$(sel, root) { return Array.prototype.slice.call((root || document).querySelectorAll(sel)); }
  function el(tag, cls, text) {
    var n = document.createElement(tag);
    if (cls) n.className = cls;
    if (text != null) n.textContent = text;
    return n;
  }
  function swapAnim(node) {
    if (reduceMotion) return;
    node.classList.remove("is-swapping");
    void node.offsetWidth;
    node.classList.add("is-swapping");
  }

  /* ---------- Links from data ---------- */
  function wireLinks() {
    var i = D.info;
    $$(".js-order").forEach(function (a) { a.href = i.orderUrl; });
    $$(".js-gift").forEach(function (a) { a.href = i.giftCardUrl; });
    $$(".js-ig").forEach(function (a) { a.href = i.instagram; });
    $$(".js-fb").forEach(function (a) { a.href = i.facebook; });
    $$(".js-phone").forEach(function (a) { a.href = "tel:" + i.phoneHref; });
    $$(".js-phone-text").forEach(function (s) { s.textContent = i.phone; });
    $("#quick-map").href = i.mapsUrl;
    $("#visit-map").href = i.mapsUrl;
    $("#quick-address").textContent = i.address;
    $("#visit-address").innerHTML = "";
    $("#visit-address").append(i.address, document.createElement("br"), i.cityStateZip);
    $("#student-deal").textContent = D.studentDeal;
    $("#kitchen-note").textContent = D.kitchenNote;
    $("#menu-disclaimer").textContent = D.menuDisclaimer;
    $("#year").textContent = new Date().getFullYear();
  }

  /* ---------- Hours + open status ---------- */
  function toMin(hhmm) { var p = hhmm.split(":"); return (+p[0]) * 60 + (+p[1]); }
  function fmtTime(hhmm) {
    var m = toMin(hhmm), h = Math.floor(m / 60), mm = m % 60;
    if (h === 0 && mm === 0) return "Midnight";
    if (h === 12 && mm === 0) return "Noon";
    var ap = h >= 12 ? "PM" : "AM";
    h = h % 12 || 12;
    return h + (mm ? ":" + String(mm).padStart(2, "0") : "") + " " + ap;
  }
  // Minutes-from-start-of-today ranges for a given day offset (handles past-midnight closes)
  function windowFor(dayIdx, offsetDays) {
    var h = D.hours[DAY_KEYS[(dayIdx + 7) % 7]];
    if (!h) return null;
    var o = toMin(h.open), c = toMin(h.close);
    if (c <= o) c += 1440;
    return [o + offsetDays * 1440, c + offsetDays * 1440, h];
  }
  function renderHours() {
    var now = new Date(), today = now.getDay();
    var body = $("#hours-body");
    WEEK_ORDER.forEach(function (d) {
      var h = D.hours[DAY_KEYS[d]];
      var tr = el("tr");
      if (d === today) tr.className = "is-today";
      var th = el("th", null, DAY_NAMES[d]); th.scope = "row";
      var td = el("td", null, h ? fmtTime(h.open) + " – " + fmtTime(h.close) : "Closed");
      tr.append(th, td);
      body.append(tr);
    });

    var mins = now.getHours() * 60 + now.getMinutes();
    var todayW = windowFor(today, 0), ydayW = windowFor(today - 1, -1);
    var openW = null;
    if (todayW && mins >= todayW[0] && mins < todayW[1]) openW = todayW;
    if (ydayW && mins >= ydayW[0] && mins < ydayW[1]) openW = ydayW;

    var status = $("#open-status"), detail = $("#open-detail");
    status.textContent = "";
    var dot = el("span", "status-dot" + (openW ? " status-dot--open" : ""));
    dot.setAttribute("aria-hidden", "true");
    status.append(dot, openW ? "Open now" : "Closed now");
    if (openW) detail.textContent = "Until " + fmtTime(openW[2].close) + " tonight";
    else if (todayW && mins < todayW[0]) detail.textContent = "Opens today at " + fmtTime(todayW[2].open);
    else detail.textContent = "See all hours";
  }

  /* ---------- Tonight bar ---------- */
  function renderTonight() {
    var s = D.specials[DAY_KEYS[new Date().getDay()]];
    if (!s) return;
    $("#tonight-text").textContent = s.theme + (s.deals[0] ? ": " + s.deals[0] : "");
  }

  /* ---------- Accessible tabs helper ---------- */
  function makeTabs(list, tabs, onSelect, initial) {
    function select(i, focus) {
      tabs.forEach(function (t, j) {
        var on = i === j;
        t.setAttribute("aria-selected", on ? "true" : "false");
        t.tabIndex = on ? 0 : -1;
      });
      if (focus) tabs[i].focus();
      onSelect(i);
    }
    tabs.forEach(function (t, i) {
      t.addEventListener("click", function () { select(i, false); });
      t.addEventListener("keydown", function (e) {
        var n = tabs.length, k = e.key, next = null;
        if (k === "ArrowRight") next = (i + 1) % n;
        else if (k === "ArrowLeft") next = (i - 1 + n) % n;
        else if (k === "Home") next = 0;
        else if (k === "End") next = n - 1;
        if (next !== null) { e.preventDefault(); select(next, true); }
      });
      list.append(t);
    });
    select(initial || 0, false);
  }

  /* ---------- Specials ---------- */
  var GLASS = "M18 8 L102 8 L92 170 Q91 176 85 176 L35 176 Q29 176 28 170 Z";
  var PINT_SVG =
    '<svg class="pint" viewBox="0 0 120 180" aria-hidden="true">' +
      '<defs><clipPath id="pint-clip"><path d="' + GLASS + '"/></clipPath>' +
      '<linearGradient id="pint-beer" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#f7c948"/><stop offset="1" stop-color="#c98500"/></linearGradient></defs>' +
      '<g clip-path="url(#pint-clip)">' +
        '<g class="pint__fill">' +
          '<rect x="0" y="36" width="120" height="150" fill="url(#pint-beer)"/>' +
          '<rect x="0" y="16" width="120" height="24" fill="#f3ebdd"/>' +
          '<circle cx="24" cy="40" r="9" fill="#f3ebdd"/><circle cx="42" cy="42" r="10" fill="#f3ebdd"/><circle cx="62" cy="40" r="9" fill="#f3ebdd"/><circle cx="82" cy="42" r="10" fill="#f3ebdd"/><circle cx="98" cy="40" r="8" fill="#f3ebdd"/>' +
        '</g>' +
        '<circle class="pint__bubble" cx="46" cy="162" r="2.5" style="animation-delay:1.2s"/>' +
        '<circle class="pint__bubble" cx="62" cy="166" r="2" style="animation-delay:1.7s"/>' +
        '<circle class="pint__bubble" cx="74" cy="160" r="3" style="animation-delay:2.2s"/>' +
      '</g>' +
      '<path class="pint__glass" d="' + GLASS + '"/>' +
    '</svg>';

  function renderSpecials() {
    var list = $("#day-tabs"), panel = $("#special-panel");
    var today = new Date().getDay();
    var tabs = WEEK_ORDER.map(function (d) {
      var b = el("button", "day");
      b.type = "button";
      b.setAttribute("role", "tab");
      b.id = "day-tab-" + d;
      b.setAttribute("aria-controls", "special-panel");
      b.setAttribute("aria-label", DAY_NAMES[d] + (d === today ? " (today)" : ""));
      b.append(DAY_NAMES[d].slice(0, 3));
      if (d === today) b.append(el("span", "day__today", "Today"));
      return b;
    });
    makeTabs(list, tabs, function (i) {
      var d = WEEK_ORDER[i], s = D.specials[DAY_KEYS[d]];
      panel.setAttribute("aria-labelledby", "day-tab-" + d);
      panel.innerHTML = "";
      var wrap = el("div");
      wrap.append(el("p", "special-card__day", DAY_NAMES[d] + (d === today ? " — tonight" : "")));
      wrap.append(el("h3", "special-card__theme", s ? s.theme : "Stay tuned"));
      var ul = el("ul", "special-card__deals");
      (s ? s.deals : ["Check our Instagram for this week's specials"]).forEach(function (x) { ul.append(el("li", null, x)); });
      wrap.append(ul);
      panel.append(wrap);
      panel.insertAdjacentHTML("beforeend", PINT_SVG);
      swapAnim(panel);
    }, WEEK_ORDER.indexOf(today));
  }

  /* ---------- Menu ---------- */
  function fmtPrice(p) {
    if (p === "" || p == null) return "";
    return typeof p === "number" ? "$" + p : String(p).split("/").map(function (x) { return "$" + x.trim(); }).join(" / ");
  }
  function renderMenu() {
    var list = $("#menu-tabs"), panel = $("#menu-panel");
    var tabs = D.menu.map(function (cat) {
      var b = el("button", "menu-tab", cat.name);
      b.type = "button";
      b.setAttribute("role", "tab");
      b.id = "menu-tab-" + cat.id;
      b.setAttribute("aria-controls", "menu-panel");
      return b;
    });
    makeTabs(list, tabs, function (i) {
      var cat = D.menu[i];
      panel.setAttribute("aria-labelledby", "menu-tab-" + cat.id);
      panel.innerHTML = "";
      var ul = el("ul", "menu-list");
      cat.items.forEach(function (it, n) {
        var li = el("li", "menu-item" + (it.featured ? " menu-item--featured" : ""));
        li.style.setProperty("--i", n);
        if (it.featured) li.append(el("span", "menu-badge", "House favorite"));
        var head = el("div", "menu-item__head");
        head.append(el("h3", "menu-item__name", it.name));
        var price = fmtPrice(it.price);
        if (price) {
          var dots = el("span", "menu-item__dots"); dots.setAttribute("aria-hidden", "true");
          head.append(dots, el("span", "menu-item__price", price));
        }
        li.append(head);
        if (it.desc) li.append(el("p", "menu-item__desc", it.desc));
        ul.append(li);
      });
      panel.append(ul);
      if (cat.note) panel.append(el("p", "menu-note", cat.note));
      swapAnim(panel);
    }, 0);
  }

  /* ---------- Events ---------- */
  function renderEvents() {
    var out = [], start = new Date(); start.setHours(0, 0, 0, 0);
    var horizon = 21; // days ahead
    for (var i = 0; i < horizon; i++) {
      var d = new Date(start); d.setDate(start.getDate() + i);
      D.events.recurring.forEach(function (ev) {
        if (ev.day === d.getDay()) out.push({ date: d, time: ev.time, title: ev.title, blurb: ev.blurb });
      });
    }
    D.events.oneOff.forEach(function (ev) {
      var p = ev.date.split("-"), d = new Date(+p[0], +p[1] - 1, +p[2]);
      if (d >= start) out.push({ date: d, time: ev.time, title: ev.title, blurb: ev.blurb });
    });
    out.sort(function (a, b) { return a.date - b.date; });

    var list = $("#event-list");
    out.slice(0, 6).forEach(function (ev) {
      var li = el("li", "event reveal");
      var date = el("div", "event__date");
      date.setAttribute("aria-hidden", "true");
      date.append(el("span", "event__mon", MONTHS[ev.date.getMonth()]), el("span", "event__day", ev.date.getDate()));
      var body = el("div");
      var when = DAY_NAMES[ev.date.getDay()] + " · " + ev.time;
      var meta = el("p", "event__meta", when);
      var sr = el("span", "sr-only", MONTHS[ev.date.getMonth()] + " " + ev.date.getDate() + ", ");
      meta.prepend(sr);
      body.append(meta, el("h3", "event__title", ev.title), el("p", "event__blurb", ev.blurb));
      li.append(date, body);
      list.append(li);
    });
  }

  /* ---------- Hero slideshow ---------- */
  function initHeroSlides() {
    var slides = D.heroSlides, hero = $(".hero"), wrap = $("#hero-slides"), status = $("#hero-status");
    var controls = $("#hero-controls"), toggle = $("#hero-toggle"), dotsWrap = $("#hero-dots");
    var INTERVAL = 4500, bar = $("#hero-progress");
    var imgs = [$(".hero__slide", wrap)], dots = [];
    var idx = 0, token = 0, timer = null;
    var userPaused = reduceMotion, focusPaused = false, hoverPaused = false;

    function build(i) {
      if (imgs[i]) return imgs[i];
      var img = el("img", "hero__slide");
      img.alt = "";
      img.src = slides[i].src;
      img.style.objectPosition = slides[i].position;
      wrap.append(img);
      imgs[i] = img;
      return img;
    }
    function schedule() {
      clearTimeout(timer);
      bar.classList.remove("is-running");
      if (userPaused || focusPaused || hoverPaused || document.hidden) return;
      void bar.offsetWidth;
      bar.classList.add("is-running");
      timer = setTimeout(function () { go(idx + 1); }, INTERVAL);
    }
    function activate(i) {
      imgs[idx].classList.remove("is-active", "is-zoom");
      imgs[idx].alt = "";
      imgs[i].classList.add("is-active");
      if (!reduceMotion) imgs[i].classList.add("is-zoom");
      imgs[i].alt = slides[i].alt;
      dots[idx].removeAttribute("aria-current");
      dots[i].setAttribute("aria-current", "true");
      idx = i;
      status.textContent = "Photo " + (i + 1) + " of " + slides.length + ": " + slides[i].alt;
      build((i + 1) % slides.length); // load the next photo ahead of time
      schedule();
    }
    function go(i) {
      i = (i + slides.length) % slides.length;
      if (i === idx) return;
      clearTimeout(timer);
      var t = ++token, img = build(i);
      if (img.complete && img.naturalWidth) { activate(i); return; }
      // Only the most recent request wins if someone clicks quickly
      img.addEventListener("load", function () { if (t === token) activate(i); }, { once: true });
      img.addEventListener("error", function () { if (t === token) schedule(); }, { once: true });
    }
    function setPaused(p) {
      userPaused = p;
      toggle.setAttribute("aria-label", p ? "Play slideshow" : "Pause slideshow");
      $("use", toggle).setAttribute("href", p ? "#i-play" : "#i-pause");
      status.setAttribute("aria-live", p ? "polite" : "off");
      schedule();
    }

    imgs[0].style.objectPosition = slides[0].position;
    bar.style.animationDuration = INTERVAL + "ms";
    if (!reduceMotion) requestAnimationFrame(function () {
      requestAnimationFrame(function () { imgs[0].classList.add("is-zoom"); });
    });
    slides.forEach(function (s, i) {
      var d = el("button", "hero__dot");
      d.type = "button";
      d.setAttribute("aria-label", "Show photo " + (i + 1) + " of " + slides.length);
      d.addEventListener("click", function () { go(i); });
      dotsWrap.append(d);
      dots.push(d);
    });
    dots[0].setAttribute("aria-current", "true");

    $("#hero-prev").addEventListener("click", function () { go(idx - 1); });
    $("#hero-next").addEventListener("click", function () { go(idx + 1); });
    toggle.addEventListener("click", function () { setPaused(!userPaused); });

    controls.addEventListener("mouseenter", function () { hoverPaused = true; schedule(); });
    controls.addEventListener("mouseleave", function () { hoverPaused = false; schedule(); });
    hero.addEventListener("focusin", function (e) {
      if (e.target.matches(":focus-visible")) { focusPaused = true; schedule(); }
    });
    hero.addEventListener("focusout", function (e) {
      if (!hero.contains(e.relatedTarget)) { focusPaused = false; schedule(); }
    });
    document.addEventListener("visibilitychange", schedule);

    var x0 = null, y0 = null;
    hero.addEventListener("touchstart", function (e) {
      if (controls.contains(e.target)) { x0 = null; return; }
      x0 = e.touches[0].clientX; y0 = e.touches[0].clientY;
    }, { passive: true });
    hero.addEventListener("touchend", function (e) {
      if (x0 === null) return;
      var dx = e.changedTouches[0].clientX - x0, dy = e.changedTouches[0].clientY - y0;
      if (Math.abs(dx) > 50 && Math.abs(dx) > Math.abs(dy)) go(idx + (dx < 0 ? 1 : -1));
      x0 = null;
    });

    build(1);
    setPaused(userPaused);
  }

  /* ---------- String lights ---------- */
  function initLights() {
    var W = 2880, P = 240, TOP = 6, SAG = 32;
    var path = "M0 " + TOP, bulbs = "";
    for (var x = 0; x < W; x += P) {
      path += " Q" + (x + P / 2) + " " + (TOP + SAG * 2) + " " + (x + P) + " " + TOP;
      [0.15, 0.38, 0.62, 0.85].forEach(function (t) {
        var bx = x + P * t, by = TOP + 4 * SAG * t * (1 - t) + 9;
        var delay = reduceMotion ? 0 : Math.round(Math.abs(bx - W / 2) * 0.9); // lights come on from the center out
        bulbs +=
          '<rect x="' + (bx - 2.5) + '" y="' + (by - 11) + '" width="5" height="7" fill="#2b2619"/>' +
          '<circle class="bulb__off" cx="' + bx + '" cy="' + by + '" r="5.5"/>' +
          '<g class="bulb__on" style="animation-delay:' + delay + 'ms">' +
            '<circle cx="' + bx + '" cy="' + by + '" r="24" fill="url(#bulb-glow)"/>' +
            '<circle cx="' + bx + '" cy="' + by + '" r="5.5" fill="#ffe2a3"/>' +
          '</g>';
      });
    }
    $("#lights").innerHTML =
      '<svg viewBox="0 0 ' + W + ' 96"><defs><radialGradient id="bulb-glow">' +
      '<stop offset="0" stop-color="#ffd27a" stop-opacity="0.55"/><stop offset="1" stop-color="#ffd27a" stop-opacity="0"/>' +
      '</radialGradient></defs><path class="lights__wire" d="' + path + '"/>' + bulbs + "</svg>";
  }

  /* ---------- Ticker ---------- */
  function initTicker() {
    var root = $("#ticker"), track = $(".ticker__track", root), toggle = $(".ticker__toggle", root);
    for (var g = 0; g < 3; g++) {
      var group = el("div", "ticker__group");
      D.tickerItems.forEach(function (t) { group.append(el("span", "ticker__item", t)); });
      track.append(group);
    }
    if (reduceMotion) { toggle.hidden = true; return; }
    root.classList.add("is-moving");
    toggle.addEventListener("click", function () {
      var paused = root.classList.toggle("is-paused");
      toggle.setAttribute("aria-label", paused ? "Play scrolling text" : "Pause scrolling text");
      $("use", toggle).setAttribute("href", paused ? "#i-play" : "#i-pause");
    });
  }

  /* ---------- Drawer ---------- */
  function initDrawer() {
    var drawer = $("#drawer"), toggle = $(".nav-toggle"), close = $(".drawer__close");
    var lastFocus = null;
    function open() {
      lastFocus = document.activeElement;
      drawer.hidden = false;
      toggle.setAttribute("aria-expanded", "true");
      document.body.style.overflow = "hidden";
      close.focus();
    }
    function shut() {
      drawer.hidden = true;
      toggle.setAttribute("aria-expanded", "false");
      document.body.style.overflow = "";
      if (lastFocus) lastFocus.focus();
    }
    toggle.addEventListener("click", open);
    close.addEventListener("click", shut);
    drawer.addEventListener("click", function (e) { if (e.target === drawer) shut(); });
    $$(".drawer__list a", drawer).forEach(function (a) { a.addEventListener("click", function () { lastFocus = null; shut(); }); });
    drawer.addEventListener("keydown", function (e) {
      if (e.key === "Escape") shut();
      if (e.key === "Tab") trapFocus(e, drawer);
    });
  }
  function trapFocus(e, root) {
    var f = $$("a[href], button:not([disabled]), input, select, textarea", root).filter(function (n) { return n.offsetParent !== null; });
    if (!f.length) return;
    var first = f[0], last = f[f.length - 1];
    if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
    else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
  }

  /* ---------- Lightbox ---------- */
  function initLightbox() {
    var items = $$(".g-item"), box = $("#lightbox"), img = $("#lightbox-img"), cap = $("#lightbox-cap");
    var idx = 0, lastFocus = null;
    function show(i) {
      idx = (i + items.length) % items.length;
      var src = $("img", items[idx]);
      img.src = src.currentSrc || src.src;
      img.alt = src.alt;
      cap.textContent = src.alt + " (" + (idx + 1) + " of " + items.length + ")";
    }
    function open(i) {
      lastFocus = document.activeElement;
      show(i);
      box.hidden = false;
      document.body.style.overflow = "hidden";
      $(".lightbox__close", box).focus();
    }
    function shut() {
      box.hidden = true;
      document.body.style.overflow = "";
      if (lastFocus) lastFocus.focus();
    }
    items.forEach(function (b, i) {
      b.setAttribute("aria-label", "View photo: " + $("img", b).alt);
      b.addEventListener("click", function () { open(i); });
    });
    $(".lightbox__close", box).addEventListener("click", shut);
    $(".lightbox__prev", box).addEventListener("click", function () { show(idx - 1); });
    $(".lightbox__next", box).addEventListener("click", function () { show(idx + 1); });
    box.addEventListener("click", function (e) { if (e.target === box) shut(); });
    box.addEventListener("keydown", function (e) {
      if (e.key === "Escape") shut();
      else if (e.key === "ArrowLeft") show(idx - 1);
      else if (e.key === "ArrowRight") show(idx + 1);
      else if (e.key === "Tab") trapFocus(e, box);
    });
    // Swipe on touch
    var x0 = null;
    box.addEventListener("touchstart", function (e) { x0 = e.touches[0].clientX; }, { passive: true });
    box.addEventListener("touchend", function (e) {
      if (x0 === null) return;
      var dx = e.changedTouches[0].clientX - x0;
      if (Math.abs(dx) > 50) show(idx + (dx < 0 ? 1 : -1));
      x0 = null;
    });
  }

  /* ---------- Jobs form ---------- */
  function initForm() {
    var form = $("#jobs-form"), summary = $("#form-summary"), status = $("#form-status"), btn = $("#jobs-submit");
    var rules = {
      "f-name": function (v) { return v.trim() ? "" : "Enter your full name."; },
      "f-phone": function (v) { return v.replace(/\D/g, "").length >= 10 ? "" : "Enter a 10-digit phone number, like 269-555-0123."; },
      "f-email": function (v) { return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v.trim()) ? "" : "Enter an email address like name@example.com."; },
      "f-position": function (v) { return v ? "" : "Choose the position you're interested in."; }
    };
    function check(id) {
      var input = document.getElementById(id), msg = rules[id](input.value);
      input.setAttribute("aria-invalid", msg ? "true" : "false");
      document.getElementById(id + "-err").textContent = msg;
      return msg;
    }
    Object.keys(rules).forEach(function (id) {
      var input = document.getElementById(id);
      input.addEventListener("blur", function () { if (input.value) check(id); });
      input.addEventListener("input", function () { if (input.getAttribute("aria-invalid") === "true") check(id); });
    });

    form.addEventListener("submit", function (e) {
      e.preventDefault();
      status.textContent = ""; status.className = "form__status";
      var errors = [];
      Object.keys(rules).forEach(function (id) { var m = check(id); if (m) errors.push([id, m]); });
      if (errors.length) {
        summary.innerHTML = "";
        summary.append(el("strong", null, "Please fix " + errors.length + (errors.length > 1 ? " fields:" : " field:")));
        var ul = el("ul");
        errors.forEach(function (er) {
          var li = el("li"), a = el("a", null, er[1]);
          a.href = "#" + er[0];
          a.addEventListener("click", function (ev) { ev.preventDefault(); document.getElementById(er[0]).focus(); });
          li.append(a); ul.append(li);
        });
        summary.append(ul);
        summary.hidden = false;
        summary.focus();
        return;
      }
      summary.hidden = true;

      var endpoint = D.info.jobsFormEndpoint;
      if (!endpoint || endpoint.indexOf("YOUR_FORM_ID") !== -1) {
        status.textContent = "Online applications are almost ready. For now, stop by or call " + D.info.phone + " and ask for a manager.";
        status.classList.add("is-error");
        return;
      }
      btn.disabled = true;
      var label = btn.textContent;
      btn.textContent = "Sending…";
      fetch(endpoint, { method: "POST", body: new FormData(form), headers: { Accept: "application/json" } })
        .then(function (r) {
          if (!r.ok) throw new Error();
          form.reset();
          status.textContent = "Thanks! Your application is in. A manager will reach out soon.";
          status.classList.add("is-success");
        })
        .catch(function () {
          status.textContent = "Something went wrong sending your application. Try again, or call " + D.info.phone + ".";
          status.classList.add("is-error");
        })
        .then(function () { btn.disabled = false; btn.textContent = label; });
    });
  }

  /* ---------- Active nav + reveal ---------- */
  function initScrollUI() {
    if (!("IntersectionObserver" in window)) { $$(".reveal, .lights, .special-card").forEach(function (n) { n.classList.add("is-in"); }); return; }
    var links = $$(".nav__list a");
    var spy = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (!en.isIntersecting) return;
        links.forEach(function (a) {
          a.setAttribute("aria-current", a.getAttribute("href") === "#" + en.target.id ? "true" : "false");
        });
      });
    }, { rootMargin: "-45% 0px -50% 0px" });
    ["menu", "specials", "events", "gallery", "jobs", "visit"].forEach(function (id) { spy.observe(document.getElementById(id)); });

    $$(".section-head, .about__copy, .about__media, .merch-card, .form, .visit__info, .gallery-grid li").forEach(function (n) { n.classList.add("reveal"); });
    $$(".event").forEach(function (n, i) { n.style.transitionDelay = Math.min(i, 5) * 60 + "ms"; });
    $$(".merch-card").forEach(function (n, i) { n.style.transitionDelay = i * 90 + "ms"; });
    $$(".gallery-grid li").forEach(function (n, i) { n.style.transitionDelay = (i % 4) * 60 + "ms"; });

    var rev = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (!en.isIntersecting) return;
        var n = en.target;
        n.classList.add("is-in");
        rev.unobserve(n);
        if (n.matches(".about__stats strong")) countUp(n);
        // Hand control back to each element's own hover transitions once it has arrived
        if (n.classList.contains("reveal")) setTimeout(function () {
          n.classList.remove("reveal", "is-in");
          n.style.transitionDelay = "";
        }, (parseFloat(n.style.transitionDelay) || 0) + 700);
      });
    }, { rootMargin: "0px 0px -8% 0px" });

    var watched = $$(".reveal, .lights, .special-card");
    if (!reduceMotion) {
      $$(".section-title").forEach(function (h) { splitWords(h); watched.push(h); });
      $$(".chapter").forEach(function (c) { c.classList.add("draw"); watched.push(c); });
      $$(".about__stats strong").forEach(function (s) { if (/^\d+$/.test(s.textContent)) watched.push(s); });
    }
    watched.forEach(function (n) { rev.observe(n); });
  }
  function splitWords(h) {
    var text = h.textContent.trim();
    h.setAttribute("aria-label", text);
    h.textContent = "";
    text.split(/\s+/).forEach(function (word, i) {
      if (i) h.append(" ");
      var outer = el("span", "w"), inner = el("span", null, word);
      outer.setAttribute("aria-hidden", "true");
      inner.style.transitionDelay = i * 45 + "ms";
      outer.append(inner);
      h.append(outer);
    });
    h.classList.add("split");
  }
  function countUp(n) {
    var end = +n.textContent, start = end > 100 ? end - 25 : 0, t0 = null, DURATION = 1100;
    n.style.minWidth = n.offsetWidth + "px";
    n.textContent = start;
    function step(t) {
      if (t0 === null) t0 = t;
      var p = Math.min(1, (t - t0) / DURATION);
      n.textContent = Math.round(start + (end - start) * (1 - Math.pow(1 - p, 3)));
      if (p < 1) requestAnimationFrame(step);
    }
    requestAnimationFrame(step);
  }

  wireLinks();
  renderHours();
  renderTonight();
  renderSpecials();
  renderMenu();
  renderEvents();
  initHeroSlides();
  initLights();
  initTicker();
  initDrawer();
  initLightbox();
  initForm();
  initScrollUI();
})();
