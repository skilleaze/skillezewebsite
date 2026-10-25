(function () {
  if (window.__ska) return; window.__ska = true;
  var GA = 'G-B6NCT8M3FH', CL = 'tk0tiom1u6';
  if (!/skilleaze\.com$/.test(location.hostname)) return;
  var s = document.createElement('script'); s.async = true; s.src = 'https://www.googletagmanager.com/gtag/js?id=' + GA; document.head.appendChild(s);
  window.dataLayer = window.dataLayer || [];
  window.gtag = window.gtag || function () { dataLayer.push(arguments); };
  gtag('js', new Date()); gtag('config', GA);
  (function (c, l, a, r, i, t, y) { c[a] = c[a] || function () { (c[a].q = c[a].q || []).push(arguments); }; t = l.createElement(r); t.async = 1; t.src = 'https://www.clarity.ms/tag/' + i; y = l.getElementsByTagName(r)[0]; y.parentNode.insertBefore(t, y); })(window, document, 'clarity', 'script', CL);
  var page = location.pathname.replace(/index\.html$/, '') || '/';
  var parts = page.split('/').filter(Boolean);
  function ev(name, p) {
    p = p || {}; p.page_path = page; if (parts.length === 2) { p.city = parts[0]; p.topic = parts[1]; }
    try { gtag('event', name, p); } catch (e) {}
    try { window.clarity('event', name); if (p.service) window.clarity('set', 'service', p.service); } catch (e) {}
  }
  window.skTrack = ev;
  function txt(u) { try { return decodeURIComponent((u.split('text=')[1] || '')).slice(0, 100); } catch (e) { return ''; } }
  document.addEventListener('click', function (e) {
    var a = e.target.closest && e.target.closest('a[href]');
    if (a) {
      var h = a.getAttribute('href') || '';
      if (/wa\.me|whatsapp\.com/.test(h)) { var m = txt(h).match(/in (.+?)[.\s]*$/i); ev('whatsapp_click', { service: m ? m[1] : '', link_text: (a.textContent || '').trim().slice(0, 60) }); ev('generate_lead', { method: 'whatsapp' }); return; }
      if (/^mailto:/.test(h)) { ev('email_click'); return; }
      if (/^tel:/.test(h)) { ev('phone_click'); return; }
      if (/figma\.site/.test(h)) { ev('portfolio_template_open', { link_url: h }); return; }
    }
    var b = e.target.closest && e.target.closest('button,[role="button"]');
    if (b && /priya|chat/i.test((b.getAttribute('aria-label') || '') + ' ' + (b.textContent || ''))) ev('priya_chat_open');
  }, true);
  document.addEventListener('play', function (e) { if (e.target && e.target.tagName === 'VIDEO' && !e.target.__skp) { e.target.__skp = 1; ev('office_video_play'); } }, true);
})();
