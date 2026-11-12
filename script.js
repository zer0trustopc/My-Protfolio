(function () {
  var reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ---------- icon sprite ---------- */
  var sprite = '<svg xmlns="http://www.w3.org/2000/svg" style="display:none">' +
    '<symbol id="i-ig" viewBox="0 0 24 24"><rect x="3" y="3" width="18" height="18" rx="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.5" cy="6.5" r=".6"/></symbol>' +
    '<symbol id="i-mail" viewBox="0 0 24 24"><rect x="2" y="4" width="20" height="16" rx="2"/><path d="m22 7-10 6L2 7"/></symbol>' +
    '<symbol id="i-phone" viewBox="0 0 24 24"><path d="M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3.1 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.1 4.2 2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1 1 .4 1.9.7 2.8a2 2 0 0 1-.5 2.1L8.1 9.9a16 16 0 0 0 6 6l1.3-1.3a2 2 0 0 1 2.1-.4c.9.3 1.8.6 2.8.7a2 2 0 0 1 1.7 2Z"/></symbol>' +
    '<symbol id="i-code" viewBox="0 0 24 24"><polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/></symbol>' +
    '<symbol id="i-net" viewBox="0 0 24 24"><circle cx="12" cy="5" r="2.2"/><circle cx="5" cy="19" r="2.2"/><circle cx="19" cy="19" r="2.2"/><path d="M12 7.2V12M12 12l-5.4 5.2M12 12l5.4 5.2"/></symbol>' +
    '<symbol id="i-term" viewBox="0 0 24 24"><polyline points="4 17 10 11 4 5"/><line x1="12" y1="19" x2="20" y2="19"/></symbol>' +
    '<symbol id="i-bolt" viewBox="0 0 24 24"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></symbol>' +
    '<symbol id="i-search" viewBox="0 0 24 24"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></symbol>' +
    '<symbol id="i-shield" viewBox="0 0 24 24"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></symbol>' +
    '<symbol id="i-bug" viewBox="0 0 24 24"><path d="m8 2 1.9 1.9M14.1 3.9 16 2M9 7.1v-1a3 3 0 1 1 6 0v1M12 20c-3.3 0-6-2.7-6-6v-3a4 4 0 0 1 4-4h4a4 4 0 0 1 4 4v3c0 3.3-2.7 6-6 6M12 20v-9M6.5 9C4.6 8.8 3 7.1 3 5M6 13H2M3 21c0-2.1 1.7-3.9 3.8-4M21 5c0 2.1-1.6 3.8-3.5 4M22 13h-4M17.2 17c2.1.1 3.8 1.9 3.8 4"/></symbol>' +
    '<symbol id="i-lock" viewBox="0 0 24 24"><rect x="3" y="11" width="18" height="11" rx="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></symbol>' +
    '<symbol id="i-book" viewBox="0 0 24 24"><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20M4 19.5A2.5 2.5 0 0 0 6.5 22H20V2H6.5A2.5 2.5 0 0 0 4 4.5z"/></symbol>' +
    '<symbol id="i-menu" viewBox="0 0 24 24"><path d="M3 6h18M3 12h18M3 18h18"/></symbol>' +
    '<symbol id="i-send" viewBox="0 0 24 24"><path d="m22 2-7 20-4-9-9-4zM22 2 11 13"/></symbol>' +
    '</svg>';
  document.body.insertAdjacentHTML('afterbegin', sprite);

  /* ---------- loader ---------- */
  var loader = document.getElementById('loader');
  var fill = loader && loader.querySelector('.l-fill');
  var txt = loader && loader.querySelector('.l-text');
  var steps = ['connecting to server', 'loading modules', 'decrypting content', 'access granted'];
  var busy = false;

  function runLoader(done) {
    if (!loader) { done && done(); return; }
    loader.classList.remove('hide');
    var dur = reduce ? 150 : 950, start = performance.now();
    (function tick(now) {
      var p = Math.min(1, (now - start) / dur);
      fill.style.width = (p * 100) + '%';
      txt.innerHTML = '<b>' + Math.round(p * 100) + '%</b> &nbsp;' + steps[Math.min(steps.length - 1, Math.floor(p * steps.length))];
      if (p < 1) requestAnimationFrame(tick); else done && done();
    })(start);
  }

  runLoader(function () {
    loader && loader.classList.add('hide');
    document.body.classList.add('ready');
  });

  window.addEventListener('pageshow', function (e) {
    if (e.persisted) { loader && loader.classList.add('hide'); document.body.classList.add('ready'); busy = false; }
  });

  document.addEventListener('click', function (e) {
    var a = e.target.closest('a[href]');
    if (!a || busy) return;
    var href = a.getAttribute('href');
    if (!/^[\w-]+\.html(#.*)?$/.test(href) && href !== './' && href !== '/') return;
    if (e.metaKey || e.ctrlKey || e.shiftKey || a.target === '_blank') return;
    e.preventDefault();
    busy = true;
    runLoader(function () { window.location.href = href; });
  });

  /* ---------- mobile menu ---------- */
  var nav = document.querySelector('.nav');
  var btn = document.querySelector('.menu-btn');
  if (btn) btn.addEventListener('click', function () {
    var open = nav.classList.toggle('open');
    btn.setAttribute('aria-expanded', open);
  });

  /* ---------- falling binary ---------- */
  var cv = document.getElementById('rain');
  if (cv) {
    var ctx = cv.getContext('2d'), fs = 15, cols, drops, last = 0;
    var size = function () {
      cv.width = window.innerWidth; cv.height = window.innerHeight;
      cols = Math.ceil(cv.width / fs);
      drops = Array.from({ length: cols }, function () { return Math.random() * -50; });
      ctx.fillStyle = '#040A09'; ctx.fillRect(0, 0, cv.width, cv.height);
    };
    size(); window.addEventListener('resize', size);
    var draw = function (t) {
      requestAnimationFrame(draw);
      if (t - last < 55) return; last = t;
      ctx.fillStyle = 'rgba(4,10,9,.12)'; ctx.fillRect(0, 0, cv.width, cv.height);
      ctx.font = fs + 'px monospace';
      for (var i = 0; i < cols; i++) {
        ctx.fillStyle = Math.random() > .96 ? '#b6ffd6' : '#19FF7A';
        ctx.fillText(Math.random() > .5 ? '1' : '0', i * fs, drops[i] * fs);
        if (drops[i] * fs > cv.height && Math.random() > .975) drops[i] = 0;
        drops[i]++;
      }
    };
    if (!reduce) requestAnimationFrame(draw);
  }

  /* ---------- typing effect ---------- */
  var typed = document.getElementById('typed');
  if (typed) {
    var roles = ['Cybersecurity Enthusiast', 'Bug Bounty Hunter', 'Ethical Hacker in training'];
    var r = 0, c = 0, del = false;
    var step = function () {
      var word = roles[r];
      typed.textContent = word.slice(0, c);
      if (reduce) { typed.textContent = roles[0]; return; }
      if (!del && c < word.length) { c++; setTimeout(step, 85); }
      else if (!del) { del = true; setTimeout(step, 1500); }
      else if (c > 0) { c--; setTimeout(step, 40); }
      else { del = false; r = (r + 1) % roles.length; setTimeout(step, 350); }
    };
    step();
  }

  /* ---------- counters ---------- */
  var counters = document.querySelectorAll('[data-count]');
  if (counters.length) {
    var run = function (el) {
      var end = parseFloat(el.dataset.count), dec = parseInt(el.dataset.dec || '0', 10);
      if (reduce) { el.textContent = end.toFixed(dec); return; }
      var s = performance.now(), d = 1400;
      (function f(n) {
        var p = Math.min(1, (n - s) / d), e = 1 - Math.pow(1 - p, 3);
        el.textContent = (end * e).toFixed(dec);
        if (p < 1) requestAnimationFrame(f);
      })(s);
    };
    var io = new IntersectionObserver(function (en) {
      en.forEach(function (x) { if (x.isIntersecting) { run(x.target); io.unobserve(x.target); } });
    }, { threshold: .6 });
    counters.forEach(function (el) { el.textContent = (0).toFixed(parseInt(el.dataset.dec || '0', 10)); io.observe(el); });
  }

  /* ---------- contact form (opens the visitor's mail app) ---------- */
  var form = document.getElementById('contact-form');
  if (form) form.addEventListener('submit', function (e) {
    e.preventDefault();
    var f = new FormData(form);
    var subject = 'Portfolio message from ' + f.get('name');
    var body = f.get('message') + '\n\n— ' + f.get('name') + ' (' + f.get('email') + ')';
    window.location.href = 'mailto:zer0trustopc@gmail.com?subject=' + encodeURIComponent(subject) + '&body=' + encodeURIComponent(body);
    document.getElementById('form-msg').textContent = 'Opening your email app. Press send there to deliver the message.';
  });
})();
