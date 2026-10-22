(function () {
  if (window.SKSound) return;
  var ctx, pendingIntro = false;
  var on = function () { try { return localStorage.getItem('sk-sound') !== 'off'; } catch (e) { return true; } };
  function ac() {
    if (!ctx) { var C = window.AudioContext || window.webkitAudioContext; if (!C) return null; ctx = new C(); }
    if (ctx.state === 'suspended') ctx.resume();
    return ctx;
  }
  function out(c) {
    if (!c.__bus) {
      var comp = c.createDynamicsCompressor(); comp.threshold.value = -18; comp.ratio.value = 3;
      var master = c.createGain(); master.gain.value = 0.9;
      master.connect(comp); comp.connect(c.destination); c.__bus = master;
    }
    return c.__bus;
  }
  function tone(f, t0, dur, vol, type) {
    var c = ac(); if (!c) return;
    var t = c.currentTime + t0, o = c.createOscillator(), g = c.createGain();
    o.type = type || 'sine'; o.frequency.setValueAtTime(f, t);
    g.gain.setValueAtTime(0, t); g.gain.linearRampToValueAtTime(vol, t + 0.008); g.gain.exponentialRampToValueAtTime(0.0001, t + dur);
    o.connect(g); g.connect(out(c)); o.start(t); o.stop(t + dur + 0.05);
  }
  function noise(dur, vol, f1, f2, t0) {
    var c = ac(); if (!c) return;
    var t = c.currentTime + (t0 || 0), b = c.createBuffer(1, Math.floor(c.sampleRate * dur), c.sampleRate), d = b.getChannelData(0);
    for (var i = 0; i < d.length; i++) d[i] = Math.random() * 2 - 1;
    var s = c.createBufferSource(); s.buffer = b;
    var bp = c.createBiquadFilter(); bp.type = 'bandpass'; bp.Q.value = 0.9;
    bp.frequency.setValueAtTime(f1, t); bp.frequency.exponentialRampToValueAtTime(f2, t + dur);
    var g = c.createGain(); g.gain.setValueAtTime(0, t); g.gain.linearRampToValueAtTime(vol, t + dur * 0.35); g.gain.exponentialRampToValueAtTime(0.0001, t + dur);
    s.connect(bp); bp.connect(g); g.connect(out(c)); s.start(t);
  }
  var S = {
    click: function () { if (!on()) return; tone(1500, 0, 0.05, 0.05); tone(750, 0, 0.07, 0.03, 'triangle'); },
    pop: function () { if (!on()) return; tone(880, 0, 0.12, 0.045); tone(1318.5, 0.05, 0.16, 0.035); },
    send: function () { if (!on()) return; tone(587.3, 0, 0.09, 0.04); tone(880, 0.05, 0.12, 0.04); },
    swipe: function () { if (!on()) return; noise(0.3, 0.06, 500, 2600); },
    intro: function () {
      if (!on()) return;
      noise(1.0, 0.04, 250, 3200);
      [659.25, 987.77, 1318.5].forEach(function (f, i) { tone(f, 0.6 + i * 0.13, 1.8, 0.05); });
      tone(329.63, 0.6, 2.4, 0.035, 'triangle');
    },
    tryIntro: function () { var c = ac(); if (c && c.state === 'running' && on()) { S.intro(); return true; } pendingIntro = true; return false; },
    cancelIntro: function () { pendingIntro = false; },
    isOn: on,
    toggle: function () { try { localStorage.setItem('sk-sound', on() ? 'off' : 'on'); } catch (e) {} render(); if (on()) S.pop(); return on(); }
  };
  S.msg = function () { if (!on()) return; tone(1046.5, 0, 0.14, 0.06); tone(1568, 0.07, 0.22, 0.05); };
  S.sent = function () { if (!on()) return; tone(660, 0, 0.08, 0.05, 'triangle'); tone(990, 0.045, 0.1, 0.04); };
  S.notify = function () { if (!on()) return; tone(784, 0, 0.18, 0.07); tone(1174.7, 0.11, 0.22, 0.06); tone(1568, 0.22, 0.4, 0.05); };
  S.typing = function () { if (!on()) return; tone(1900, 0, 0.025, 0.018); tone(1700, 0.09, 0.025, 0.014); };
  S.whoosh = function () { if (!on()) return; noise(0.55, 0.05, 300, 2400); tone(523.25, 0.18, 0.5, 0.035); tone(783.99, 0.28, 0.6, 0.03); };
  S.click = S.swipe = S.send = function () {};
  window.SKSound = S;
  var last = 0;
  document.addEventListener('pointerdown', function (e) {
    if (pendingIntro) { pendingIntro = false; }
    var t = e.target && e.target.closest && e.target.closest('a,button,summary,[role=button]');
    
  }, true);
  var btn;
  function render() {
    if (!btn) return;
    var o = on();
    btn.setAttribute('aria-label', o ? 'Mute sounds' : 'Turn sounds on');
    btn.title = o ? 'Sound on' : 'Sound off';
    btn.innerHTML = '<span style="font-size:17px;line-height:1">♪</span>' + (o ? '' : '<span style="position:absolute;width:22px;height:2px;background:#042D7C;transform:rotate(-45deg);border-radius:2px"></span>');
  }
  function mount() {
    if (document.getElementById('sk-sound-btn')) return;
    btn = document.createElement('button');
    btn.id = 'sk-sound-btn'; btn.setAttribute('data-sk-silent', '');
    btn.style.cssText = 'position:fixed;left:20px;bottom:20px;z-index:55;width:46px;height:46px;border-radius:50%;background:#FFFFFF;border:1.5px solid #E3E4E8;color:#042D7C;display:flex;align-items:center;justify-content:center;cursor:pointer;box-shadow:0 12px 28px -14px rgba(4,45,124,.5);font-family:Lato,sans-serif';
    btn.onclick = function () { S.toggle(); };
    document.body.appendChild(btn); render();
  }
})();
