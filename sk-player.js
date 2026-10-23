(function(){if(window.__ska)return;var s=document.createElement('script');s.async=true;s.src='/sk-analytics.js';document.head.appendChild(s);})();
(function () {
  if (customElements.get('sk-player')) return;
  var I = {
    play: '<svg viewBox="0 0 24 24" width="22" height="22"><path d="M8 5.5v13l11-6.5z" fill="currentColor"/></svg>',
    pause: '<svg viewBox="0 0 24 24" width="22" height="22"><rect x="6.5" y="5" width="4" height="14" rx="1" fill="currentColor"/><rect x="13.5" y="5" width="4" height="14" rx="1" fill="currentColor"/></svg>',
    vol: '<svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M11 5 6 9H3v6h3l5 4z" fill="currentColor"/><path d="M15.5 8.5a5 5 0 0 1 0 7M18.5 5.5a9 9 0 0 1 0 13"/></svg>',
    mute: '<svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M11 5 6 9H3v6h3l5 4z" fill="currentColor"/><path d="m16 9 5 6M21 9l-5 6"/></svg>',
    full: '<svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 9V4h5M20 9V4h-5M4 15v5h5M20 15v5h-5"/></svg>',
    exit: '<svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M9 4v5H4M15 4v5h5M9 20v-5H4M15 20v-5h5"/></svg>'
  };
  var CSS = ':host{display:block}' +
    '.wrap{position:relative;display:block;width:fit-content;max-width:100%;margin:0 auto;border-radius:28px;overflow:hidden;background:#042D7C;box-shadow:0 40px 90px -50px rgba(4,45,124,.7);font-family:Lato,sans-serif;-webkit-tap-highlight-color:transparent;user-select:none}' +
    '.wrap:fullscreen{width:100%;height:100%;border-radius:0;display:flex;align-items:center;justify-content:center;background:#000}' +
    '.wrap:-webkit-full-screen{width:100%;height:100%;border-radius:0;display:flex;align-items:center;justify-content:center;background:#000}' +
    'video{display:block;width:auto;height:auto;max-width:min(100%,880px);max-height:min(620px,75vh);cursor:pointer;background:#042D7C}' +
    '.wrap:fullscreen video,.wrap:-webkit-full-screen video{max-width:100%;max-height:100%;width:100%;height:100%;object-fit:contain;background:#000}' +
    '.start{position:absolute;left:20px;bottom:20px;display:flex;align-items:center;gap:12px;background:#FFFFFF;color:#042D7C;border:0;border-radius:999px;padding:7px 20px 7px 7px;cursor:pointer;box-shadow:0 16px 36px -14px rgba(4,45,124,.6);transition:transform .25s cubic-bezier(.2,.8,.2,1),box-shadow .25s}' +
    '.start:hover{transform:translateY(-2px);box-shadow:0 22px 44px -16px rgba(4,45,124,.7)}' +
    '.start .dot{width:44px;height:44px;border-radius:50%;background:#042D7C;color:#FFFFFF;display:flex;align-items:center;justify-content:center;padding-left:2px;box-sizing:border-box}' +
    '.start .t1{font-weight:900;font-size:14px;line-height:1.2;text-align:left}.start .t2{font-size:12px;color:#053BA0;text-align:left}' +
    '.bar{position:absolute;left:12px;right:12px;bottom:12px;display:flex;align-items:center;gap:10px;background:rgba(4,45,124,.82);backdrop-filter:blur(10px);-webkit-backdrop-filter:blur(10px);border-radius:999px;padding:6px 12px 6px 6px;color:#FFFFFF;transition:opacity .3s,transform .3s}' +
    '.bar.hide{opacity:0;transform:translateY(8px);pointer-events:none}' +
    '.btn{width:38px;height:38px;border-radius:50%;border:0;background:transparent;color:#FFFFFF;display:flex;align-items:center;justify-content:center;cursor:pointer;flex-shrink:0;padding:0;transition:background .2s}' +
    '.btn:hover{background:rgba(255,255,255,.14)}.btn.pp{background:#FFFFFF;color:#042D7C}.btn.pp:hover{background:#E3E4E8}' +
    'button:focus-visible{outline:2px solid #FFFFFF;outline-offset:2px}' +
    '.track{flex:1;height:22px;display:flex;align-items:center;cursor:pointer;min-width:40px;touch-action:none}' +
    '.rail{position:relative;width:100%;height:4px;border-radius:4px;background:rgba(255,255,255,.28)}' +
    '.buf{position:absolute;left:0;top:0;bottom:0;border-radius:4px;background:rgba(255,255,255,.35)}' +
    '.fill{position:absolute;left:0;top:0;bottom:0;border-radius:4px;background:#FFFFFF}' +
    '.knob{position:absolute;top:50%;width:12px;height:12px;border-radius:50%;background:#FFFFFF;transform:translate(-50%,-50%);box-shadow:0 0 0 4px rgba(255,255,255,.2)}' +
    '.time{font-size:12px;font-weight:700;font-variant-numeric:tabular-nums;white-space:nowrap;letter-spacing:.02em}' +
    '@media (max-width:520px){.start{left:12px;bottom:12px}.bar{left:8px;right:8px;bottom:8px;gap:6px}.time{font-size:11px}.btn{width:34px;height:34px}}';

  function fmt(t) { t = Math.max(0, Math.floor(t || 0)); return Math.floor(t / 60) + ':' + String(t % 60).padStart(2, '0'); }

  class P extends HTMLElement {
    connectedCallback() {
      if (this._r) return; this._r = this.attachShadow({ mode: 'open' });
      var srcs = (this.getAttribute('src') || '').split(',').map(function (s) { return s.trim(); }).filter(Boolean);
      var label = this.getAttribute('label') || 'Watch our office';
      this._r.innerHTML = '<style>' + CSS + '</style><div class="wrap"><video playsinline preload="metadata" poster="' + (this.getAttribute('poster') || '') + '">' +
        srcs.map(function (s) { return '<source src="' + s + '" type="video/' + (/\.webm$/i.test(s) ? 'webm' : 'mp4') + '">'; }).join('') + '</video>' +
        '<button class="start" aria-label="Play video"><span class="dot">' + I.play + '</span><span><div class="t1">' + label + '</div><div class="t2">Tap to play</div></span></button>' +
        '<div class="bar hide"><button class="btn pp" aria-label="Play or pause">' + I.play + '</button><div class="track"><div class="rail"><div class="buf"></div><div class="fill"></div><div class="knob"></div></div></div><span class="time">0:00 / 0:00</span><button class="btn mu" aria-label="Mute">' + I.vol + '</button><button class="btn fs" aria-label="Full screen">' + I.full + '</button></div></div>';
      var $ = (s) => this._r.querySelector(s), v = $('video'), w = $('.wrap'), bar = $('.bar'), start = $('.start'), pp = $('.pp'), mu = $('.mu'), fs = $('.fs'), tr = $('.track'), fill = $('.fill'), knob = $('.knob'), buf = $('.buf'), tm = $('.time'), t2 = $('.t2');
      var hideT, self = this;
      function toggle() { v.paused || v.ended ? v.play().catch(function () {}) : v.pause(); }
      function poke() { bar.classList.remove('hide'); clearTimeout(hideT); if (!v.paused) hideT = setTimeout(function () { bar.classList.add('hide'); }, 2600); }
      function upd() { var d = v.duration || 0, p = d ? v.currentTime / d * 100 : 0; fill.style.width = p + '%'; knob.style.left = p + '%'; tm.textContent = fmt(v.currentTime) + ' / ' + fmt(d); try { if (v.buffered.length) buf.style.width = (v.buffered.end(v.buffered.length - 1) / d * 100) + '%'; } catch (e) {} }
      v.addEventListener('loadedmetadata', function () { upd(); if (isFinite(v.duration)) t2.textContent = 'Tap to play · ' + fmt(v.duration); });
      v.addEventListener('timeupdate', upd); v.addEventListener('progress', upd);
      v.addEventListener('play', function () { start.style.display = 'none'; pp.innerHTML = I.pause; poke(); });
      v.addEventListener('pause', function () { pp.innerHTML = I.play; poke(); });
      v.addEventListener('ended', function () { pp.innerHTML = I.play; bar.classList.remove('hide'); });
      v.addEventListener('volumechange', function () { mu.innerHTML = v.muted ? I.mute : I.vol; });
      start.addEventListener('click', function (e) { e.stopPropagation(); v.play().catch(function () {}); });
      v.addEventListener('click', function () { if (start.style.display !== 'none') return v.play().catch(function () {}); if (bar.classList.contains('hide') && matchMedia('(pointer:coarse)').matches) return poke(); toggle(); });
      pp.addEventListener('click', toggle);
      mu.addEventListener('click', function () { v.muted = !v.muted; poke(); });
      fs.addEventListener('click', function () {
        var d = document, inFs = d.fullscreenElement || d.webkitFullscreenElement;
        if (inFs) { (d.exitFullscreen || d.webkitExitFullscreen).call(d); return; }
        if (w.requestFullscreen) w.requestFullscreen().catch(function () {}); else if (w.webkitRequestFullscreen) w.webkitRequestFullscreen(); else if (v.webkitEnterFullscreen) v.webkitEnterFullscreen();
      });
      function fsc() { var on = !!(document.fullscreenElement || document.webkitFullscreenElement); fs.innerHTML = on ? I.exit : I.full; }
      document.addEventListener('fullscreenchange', fsc); document.addEventListener('webkitfullscreenchange', fsc);
      w.addEventListener('mousemove', function () { if (start.style.display === 'none') poke(); });
      function seek(e) { var r = tr.getBoundingClientRect(), x = Math.min(Math.max(0, (e.clientX - r.left) / r.width), 1); if (v.duration) v.currentTime = x * v.duration; upd(); poke(); }
      tr.addEventListener('pointerdown', function (e) { tr.setPointerCapture(e.pointerId); seek(e); var mv = function (ev) { seek(ev); }; tr.addEventListener('pointermove', mv); tr.addEventListener('pointerup', function up() { tr.removeEventListener('pointermove', mv); tr.removeEventListener('pointerup', up); }); });
    }
  }
  customElements.define('sk-player', P);
})();

(function(){function m(){document.querySelectorAll('.phones').forEach(function(p){if(p.dataset.m)return;p.dataset.m='1';var t=document.createElement('div');t.className='ptrack';while(p.firstChild)t.appendChild(p.firstChild);Array.prototype.slice.call(t.children).forEach(function(c){var k=c.cloneNode(true);k.setAttribute('aria-hidden','true');t.appendChild(k);});p.appendChild(t);p.classList.add('marq');});}
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',m);else m();})();

(function(){function f(){var b=document.querySelector('.fab');if(!b)return;var s=function(){b.classList.toggle('on',window.scrollY>window.innerHeight*0.6)};s();window.addEventListener('scroll',s,{passive:true});}
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',f);else f();})(); /* fab.on */

(function(){function b(){var n=document.querySelector('header nav');if(!n||n.querySelector('a[href$="blog/index.html"]'))return;var a=n.querySelector('a[href$="about.html"]');if(!a)return;var l=document.createElement('a');l.href=a.getAttribute('href').replace('about.html','blog/index.html');l.textContent='Blog';a.after(l);}
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',b);else b();})(); /* blog-nav */

(function(){function go(){var art=document.querySelector('article');if(!art||!/\/blog\//.test(location.pathname+document.baseURI))return;if(art.dataset.r)return;art.dataset.r='1';
var hs=art.querySelectorAll('h2');var words=(art.innerText||'').split(/\s+/).length;var mins=Math.max(2,Math.round(words/200));
var k=art.querySelector('.k');if(k)k.textContent=k.textContent.replace(/\d+ min read/,mins+' min read');
var h1=art.querySelector('h1');var root=(document.querySelector('header a img')||{}).getAttribute?document.querySelector('header a img').getAttribute('src').replace('assets/wordmark-blue.png',''):'../../';
var m=document.createElement('div');m.className='meta';m.innerHTML='<img src="'+root+'assets/logo-blue.png" alt=""><span><strong style="color:#042D7C">Skilleaze Career Team</strong><br>Updated 22 Oct 2026 · '+mins+' min read</span>';if(h1)h1.after(m);
var img=art.querySelector('img[width="1200"]');var toc=document.createElement('nav');toc.className='toc';var ol='';hs.forEach(function(h,i){h.id=h.id||'s'+(i+1);ol+='<li><a href="#'+h.id+'">'+h.textContent+'</a></li>'});toc.innerHTML='<strong>In this guide</strong><ol>'+ol+'</ol>';(img||m).after(toc);
toc.addEventListener('click',function(e){var a=e.target.closest('a');if(!a)return;e.preventDefault();var t=document.getElementById(a.getAttribute('href').slice(1));if(t)window.scrollTo({top:t.getBoundingClientRect().top+window.scrollY-20,behavior:'smooth'})});
var keys=document.createElement('div');keys.className='keys';var li='';hs.forEach(function(h){li+='<li>'+h.textContent+'</li>'});keys.innerHTML='<strong>Key takeaways</strong><ul>'+li+'</ul>';var note=art.querySelector('p[style*="6b7785"]');art.insertBefore(keys,note||null);
var url=location.href.split('#')[0],t=encodeURIComponent((h1||{}).textContent||document.title);var sh=document.createElement('div');sh.className='share';sh.innerHTML='<span>Share this guide:</span><a target="_blank" rel="noopener" href="https://wa.me/?text='+t+'%20'+encodeURIComponent(url)+'">WhatsApp</a><a target="_blank" rel="noopener" href="https://www.linkedin.com/sharing/share-offsite/?url='+encodeURIComponent(url)+'">LinkedIn</a><button type="button">Copy link</button>';sh.querySelector('button').onclick=function(){navigator.clipboard&&navigator.clipboard.writeText(url);this.textContent='Copied'};art.insertBefore(sh,note||null);
var bar=document.createElement('div');bar.className='rp';document.body.appendChild(bar);var on=function(){var r=art.getBoundingClientRect();var p=Math.min(1,Math.max(0,(-r.top)/(r.height-window.innerHeight)));bar.style.transform='scaleX('+p+')'};on();window.addEventListener('scroll',on,{passive:true});}
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',go);else go();})(); /* blog-read */
