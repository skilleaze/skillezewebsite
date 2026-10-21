(function () {
  if (window.__skfx) return; window.__skfx = true;
  var pre = new Image(); pre.src = 'assets/logo-blue.png';
  var reduce = window.matchMedia && matchMedia('(prefers-reduced-motion: reduce)').matches;
  var st = document.createElement('style');
  st.textContent = '@keyframes skfx-in{from{opacity:0}to{opacity:1}}' +
    'body{animation:skfx-in .5s ease both}' +
    '#skfx-bar{position:fixed;top:0;left:0;height:3px;width:0;z-index:9999;background:#053BA0;box-shadow:0 0 10px rgba(5,59,160,.5);transition:width .4s ease,opacity .4s ease .2s;pointer-events:none}' +
    '.skfx-r{opacity:0;transform:translateY(28px);transition:opacity .8s cubic-bezier(.2,.8,.2,1),transform .8s cubic-bezier(.2,.8,.2,1)}' +
    '.skfx-r.skfx-on{opacity:1;transform:none}' +

    '#skfx-prog{position:fixed;top:0;left:0;height:3px;width:100%;transform-origin:0 50%;transform:scaleX(0);z-index:9997;background:#053BA0;pointer-events:none}' +
    '.skfx-shine{position:relative;overflow:hidden;isolation:isolate}.skfx-shine::after{content:"";position:absolute;inset:0;background:linear-gradient(110deg,transparent 30%,rgba(255,255,255,.38) 50%,transparent 70%);transform:translateX(-130%);transition:transform .75s cubic-bezier(.2,.8,.2,1);pointer-events:none;z-index:2}.skfx-shine:hover::after{transform:translateX(130%)}' +
    '.skfx-tilt{transition:transform .35s cubic-bezier(.2,.8,.2,1),box-shadow .35s ease!important;will-change:transform}' +
    '.skfx-tilt.skfx-hov{box-shadow:0 30px 60px -30px rgba(4,45,124,.45)!important}' +
    '#skfx-dot,#skfx-ring{position:fixed;top:0;left:0;pointer-events:none;z-index:9996;border-radius:50%;transform:translate(-50%,-50%)}' +
    '#skfx-dot{width:7px;height:7px;background:#053BA0}' +
    '#skfx-ring{width:34px;height:34px;border:1.5px solid rgba(5,59,160,.45);transition:width .25s,height .25s,background .25s,border-color .25s}' +
    '#skfx-ring.big{width:58px;height:58px;background:rgba(5,59,160,.08);border-color:rgba(5,59,160,.25)}' +
    '@media (pointer:coarse){#skfx-dot,#skfx-ring{display:none}}' +

    '#skfx-burger{display:none}' +
    '@media (max-width:760px){header{position:relative;flex-wrap:nowrap!important;gap:14px!important;padding:14px 16px!important;z-index:60}#skfx-burger{display:flex;flex-direction:column;justify-content:center;align-items:center;gap:5px;width:48px;height:48px;border-radius:50%;border:1px solid #E3E4E8;background:#fff;cursor:pointer;padding:0;flex-shrink:0}#skfx-burger span{display:block;width:20px;height:2px;border-radius:2px;background:#042D7C;transition:transform .3s,opacity .3s}header.skfx-open #skfx-burger span:nth-child(1){transform:translateY(7px) rotate(45deg)}header.skfx-open #skfx-burger span:nth-child(2){opacity:0}header.skfx-open #skfx-burger span:nth-child(3){transform:translateY(-7px) rotate(-45deg)}header nav{position:absolute!important;top:calc(100% - 4px);left:16px;right:16px;flex-direction:column!important;align-items:stretch!important;flex-wrap:nowrap!important;gap:2px!important;border-radius:20px!important;padding:10px!important;box-shadow:0 24px 48px -20px rgba(4,45,124,.35);opacity:0;visibility:hidden;transform:translateY(-8px);transition:opacity .25s,transform .25s,visibility .25s}header.skfx-open nav{opacity:1;visibility:visible;transform:none}header nav a{padding:14px 16px!important;font-size:16px!important;border-radius:12px!important;text-align:left}header nav a:last-child{text-align:center;justify-content:center;margin-top:6px}header img{height:44px!important}input,textarea,select{font-size:16px!important}h1{word-break:normal;overflow-wrap:anywhere}}' +
    '@media (max-width:420px){h1{font-size:44px!important}}' +
    'html{-webkit-text-size-adjust:100%}img,video{max-width:100%}' +
    '#skfx-cur{position:fixed;inset:0;z-index:9998;background:#042D7C;display:flex;align-items:center;justify-content:center;flex-direction:column;gap:18px;transition:transform .55s cubic-bezier(.76,0,.24,1)}' +
    '#skfx-cur .ring{width:128px;height:128px;border-radius:50%;border:3px solid #fff;padding:6px;box-sizing:border-box}' +
    '#skfx-cur .disc{width:100%;height:100%;border-radius:50%;background:#fff;display:flex;align-items:center;justify-content:center;overflow:hidden}#skfx-cur .disc img{width:94%;height:94%;object-fit:contain;display:block}' +
    '#skfx-cur .tag{font-family:"Cormorant Garamond",serif;font-style:italic;font-weight:600;font-size:26px;color:#fff}' +
    '@keyframes skfx-rot{to{transform:rotate(360deg)}}#skfx-cur .disc img{animation:skfx-rot 1.4s linear infinite}' +
    '@keyframes skfx-spin{from{transform:rotate(-120deg) scale(.7);opacity:0}to{transform:none;opacity:1}}';
  (document.head || document.documentElement).appendChild(st);
  var bar = document.createElement('div'); bar.id = 'skfx-bar';
  var addBar = function () { if (document.body && !bar.parentNode) document.body.appendChild(bar); };
  addBar(); document.addEventListener('DOMContentLoaded', addBar);
  var w = 8; bar.style.width = w + '%';
  var trickle = setInterval(function () { w = Math.min(90, w + (90 - w) * 0.12); bar.style.width = w + '%'; }, 200);
  var done = function () { clearInterval(trickle); bar.style.width = '100%'; setTimeout(function () { bar.style.opacity = '0'; }, 250); };
  if (document.readyState === 'complete') setTimeout(done, 300); else window.addEventListener('load', function () { setTimeout(done, 200); });
  setTimeout(done, 6000);
  function curtain(){var c=document.createElement('div');c.id='skfx-cur';c.innerHTML='<div class="ring"><div class="disc"><img src="assets/logo-blue.png" alt=""></div></div><div class="tag">Career Simplified</div>';return c;}
  try { if (sessionStorage.getItem('skfx-nav') === '1') { sessionStorage.removeItem('skfx-nav'); var arr = curtain(); arr.style.transform = 'none'; var put = function(){ if (!document.body) return setTimeout(put, 10); document.body.appendChild(arr); setTimeout(function(){ arr.style.transform = 'translateY(-100%)'; setTimeout(function(){ arr.remove(); }, 650); }, 380); }; put(); } } catch (e) {}

  // mobile menu
  (function burger(){ var h = document.querySelector('header'), n = h && h.querySelector('nav'); if (!n) return setTimeout(burger, 150); if (h.querySelector('#skfx-burger')) return; var b = document.createElement('button'); b.id = 'skfx-burger'; b.type = 'button'; b.setAttribute('aria-label', 'Menu'); b.setAttribute('aria-expanded', 'false'); b.innerHTML = '<span></span><span></span><span></span>'; h.appendChild(b); var set = function (o) { h.classList.toggle('skfx-open', o); b.setAttribute('aria-expanded', o ? 'true' : 'false'); }; b.addEventListener('click', function (e) { e.stopPropagation(); set(!h.classList.contains('skfx-open')); }); n.addEventListener('click', function (e) { if (e.target.closest('a')) set(false); }); document.addEventListener('click', function (e) { if (!h.contains(e.target)) set(false); }); })();

  // scroll progress
  var prog = document.createElement('div'); prog.id = 'skfx-prog';
  var onScroll = function () { var h = document.documentElement; var p = h.scrollTop / Math.max(1, h.scrollHeight - h.clientHeight); prog.style.transform = 'scaleX(' + p + ')'; };
  var fine = window.matchMedia && matchMedia('(pointer:fine)').matches;
  function mobilePad() {
    var m = innerWidth < 760;
    document.querySelectorAll('section').forEach(function (sec) {
      if (sec.__skp === undefined) { var cs = getComputedStyle(sec); sec.__skp = [sec.style.paddingTop, sec.style.paddingBottom, parseFloat(cs.paddingTop), parseFloat(cs.paddingBottom)]; }
      var o = sec.__skp;
      sec.style.paddingTop = m && o[2] > 72 ? '64px' : o[0];
      sec.style.paddingBottom = m && o[3] > 72 ? '64px' : o[1];
    });
  }
  window.addEventListener('resize', function () { clearTimeout(window.__skpt); window.__skpt = setTimeout(mobilePad, 150); });
  function enhance() {
    mobilePad();
    if (!prog.parentNode && document.body) document.body.appendChild(prog);
    document.querySelectorAll('a,button').forEach(function (b) {
      if (b.__skb) return;
      var cs = getComputedStyle(b); if (parseFloat(cs.borderTopLeftRadius) < 100 || b.offsetHeight < 30) return;
      b.__skb = true;
      var bg = b.style.background || b.style.backgroundColor || '';
      var fx = cs.position === 'fixed' || !!(b.closest && b.closest('#sk-sound-btn'));
      if (!fx && cs.position === 'static') b.classList.add('skfx-shine');
      if (!fine || fx) return;
      b.addEventListener('mousemove', function (e) { var r = b.getBoundingClientRect(); var x = (e.clientX - r.left - r.width / 2) * 0.18, y = (e.clientY - r.top - r.height / 2) * 0.28; b.style.transform = 'translate(' + x + 'px,' + y + 'px)'; });
      b.addEventListener('mouseleave', function () { b.style.transform = ''; });
    });
    if (!fine) return;
    document.querySelectorAll('section article,section details,section div,section a').forEach(function (c) {
      if (c.__skc) return;
      var cs = getComputedStyle(c), rad = parseFloat(cs.borderTopLeftRadius);
      if (!(rad >= 20 && rad < 100) || cs.position === 'fixed') return;
      var bgc = cs.backgroundColor; if ((!bgc || bgc === 'rgba(0, 0, 0, 0)') && cs.borderTopWidth === '0px') return;
      var p = c.parentElement, inFixed = false; while (p) { if (getComputedStyle(p).position === 'fixed') { inFixed = true; break; } p = p.parentElement; } if (inFixed) return;
      var r0 = c.getBoundingClientRect(); if (r0.width > 900 || r0.height > 700) return;
      c.__skc = true; c.classList.add('skfx-tilt');
      var dark = /rgb\((4, 45, 124|44, 62, 80)\)/.test(bgc);
      var baseImg = c.style.backgroundImage;
      c.addEventListener('mousemove', function (e) {
        var r = c.getBoundingClientRect(), px = (e.clientX - r.left) / r.width, py = (e.clientY - r.top) / r.height;
        c.classList.add('skfx-hov');
        c.style.transform = 'perspective(900px) rotateX(' + ((0.5 - py) * 5) + 'deg) rotateY(' + ((px - 0.5) * 6) + 'deg) translateY(-4px)';
        if (!baseImg) c.style.backgroundImage = 'radial-gradient(420px circle at ' + (px * 100) + '% ' + (py * 100) + '%,' + (dark ? 'rgba(255,255,255,.14)' : 'rgba(5,59,160,.08)') + ',transparent 60%)';
      });
      c.addEventListener('mouseleave', function () { c.classList.remove('skfx-hov'); c.style.transform = ''; if (!baseImg) c.style.backgroundImage = ''; });
    });
  }
  window.addEventListener('scroll', function () { requestAnimationFrame(onScroll); }, { passive: true });
  if (fine && !reduce) {
    var dot = document.createElement('div'), ring = document.createElement('div'); dot.id = 'skfx-dot'; ring.id = 'skfx-ring';
    var mx = -100, my = -100, rx = -100, ry = -100;
    var addC = function () { if (document.body && !dot.parentNode) { document.body.appendChild(ring); document.body.appendChild(dot); } };
    var zf = function () { var p = document.createElement('div'); p.style.cssText = 'position:fixed;left:1000px;top:0;width:1px;height:1px;visibility:hidden;pointer-events:none'; document.body.appendChild(p); var z = p.getBoundingClientRect().left / 1000; p.remove(); return z > 0.1 ? z : 1; }, zc = 0, zw = 0;
    document.addEventListener('mousemove', function (e) { if (zw !== window.innerWidth || !zc) { zc = zf(); zw = window.innerWidth; } var z = zc; mx = e.clientX / z; my = e.clientY / z; addC(); dot.style.left = mx + 'px'; dot.style.top = my + 'px'; var t = e.target.closest && e.target.closest('a,button,summary,[role=button],video'); ring.classList.toggle('big', !!t); }, { passive: true });
    (function loop() { rx += (mx - rx) * 0.18; ry += (my - ry) * 0.18; ring.style.left = rx + 'px'; ring.style.top = ry + 'px'; requestAnimationFrame(loop); })();
    document.addEventListener('mouseleave', function () { mx = my = -100; });
  }
  if (reduce || !('IntersectionObserver' in window)) { var mo0 = new MutationObserver(function(){ enhance(); }); var st0 = function(){ enhance(); mo0.observe(document.body,{childList:true,subtree:true}); }; if (document.body) st0(); else document.addEventListener('DOMContentLoaded', st0); return; }
  var io = new IntersectionObserver(function (es) {
    es.forEach(function (e) { if (e.isIntersecting) { e.target.classList.add('skfx-on'); io.unobserve(e.target); } });
  }, { threshold: 0.08, rootMargin: '0px 0px -6% 0px' });
  var seen = new WeakSet();
  function scan() {
    document.querySelectorAll('section').forEach(function (sec) {
      var kids = sec.children.length === 1 && sec.firstElementChild.children.length > 1 ? sec.firstElementChild.children : sec.children;
      Array.prototype.forEach.call(kids, function (el, i) {
        if (seen.has(el)) return; seen.add(el);
        var r = el.getBoundingClientRect();
        if (r.top < innerHeight * 0.9 && r.bottom > 0) { el.classList.add('skfx-r'); el.style.transitionDelay = (i * 0.08) + 's'; requestAnimationFrame(function () { requestAnimationFrame(function () { el.classList.add('skfx-on'); }); }); return; }
        el.classList.add('skfx-r'); el.style.transitionDelay = Math.min(i, 4) * 0.08 + 's'; io.observe(el);
      });
    });
  }
  var t; var mo = new MutationObserver(function () { clearTimeout(t); t = setTimeout(function () { scan(); enhance(); }, 60); });
  function start() { scan(); enhance(); mo.observe(document.body, { childList: true, subtree: true }); }
  if (document.body) start(); else document.addEventListener('DOMContentLoaded', start);
  document.addEventListener('click', function (e) {
    var a = e.target.closest && e.target.closest('a[href]');
    if (!a || a.target === '_blank' || e.metaKey || e.ctrlKey || e.shiftKey) return;
    var href = a.getAttribute('href');
    if (!href || href.charAt(0) === '#' || /^(mailto:|tel:|https?:)/.test(href)) return;
    e.preventDefault(); var c = curtain(); c.style.transform = 'translateY(100%)'; c.querySelector('.ring').style.animation = 'skfx-spin .6s .2s cubic-bezier(.2,.8,.2,1) both'; document.body.appendChild(c);
    requestAnimationFrame(function () { requestAnimationFrame(function () { c.style.transform = 'none'; }); });
    try { sessionStorage.setItem('skfx-nav', '1'); } catch (e2) {}
    setTimeout(function () { location.href = a.href; }, 700);
  });
  window.addEventListener('pageshow', function (ev) { if (ev.persisted) { var c = document.getElementById('skfx-cur'); if (c) c.remove(); } });
})();
