// Even's Chatbot v2.0
// מטמיעים באתר Wix דרך Custom Code → Body End

(function () {
  // ── FONTS ──
  const font = document.createElement('link');
  font.rel = 'stylesheet';
  font.href = 'https://fonts.googleapis.com/css2?family=Heebo:wght@400;500;600;700&display=swap';
  document.head.appendChild(font);

  // ── STYLE ──
  const style = document.createElement('style');
  style.textContent = `
    .ev-fab {
      position: fixed; left: 24px; bottom: 24px; z-index: 9999;
      cursor: pointer; width: 68px; height: 68px; border-radius: 50%;
      background: #5a7c4a;
      box-shadow: 0 4px 24px rgba(90,124,74,0.5);
      display: flex; align-items: center; justify-content: center;
      border: none; transition: all .25s;
      animation: evPulse 3s ease-in-out infinite;
      font-size: 28px;
    }
    .ev-fab:hover { transform: scale(1.08); box-shadow: 0 6px 32px rgba(90,124,74,0.75); }
    @keyframes evPulse {
      0%,100% { box-shadow: 0 4px 24px rgba(90,124,74,0.5); }
      50% { box-shadow: 0 4px 36px rgba(90,124,74,0.85); }
    }
    .ev-notif {
      position: absolute; top: -4px; right: -4px;
      width: 18px; height: 18px; border-radius: 50%;
      background: #c0392b; display: flex; align-items: center;
      justify-content: center; font-size: 10px; font-weight: 700;
      color: #fff; font-family: 'Heebo', sans-serif;
    }
    .ev-window {
      position: fixed; left: 0; top: 0; bottom: 0; z-index: 9999;
      width: min(96vw, 430px); height: 100vh;
      background: #fdf8f2;
      border-right: 1px solid rgba(90,124,74,0.2);
      display: flex; flex-direction: column; overflow: hidden;
      box-shadow: 8px 0 48px rgba(0,0,0,0.15);
      transform: translateX(-100%); opacity: 0; pointer-events: none;
      transition: transform .38s cubic-bezier(.4,0,.2,1), opacity .28s ease;
      font-family: 'Heebo', Arial, sans-serif;
      direction: rtl;
    }
    .ev-window.open { transform: translateX(0); opacity: 1; pointer-events: all; }

    .ev-head {
      background: linear-gradient(135deg, #3d5c2e, #5a7c4a);
      padding: 16px 20px; display: flex; align-items: center; gap: 12px;
      border-bottom: 1px solid rgba(255,255,255,0.12);
      flex-shrink: 0;
    }
    .ev-head-icon { flex-shrink: 0; display:flex; align-items:center; }
    .ev-head-name { font-size: 16px; font-weight: 700; color: #fff; }
    .ev-head-sub { font-size: 11px; color: rgba(255,255,255,0.72); margin-top: 2px; }
    .ev-head-dot {
      width: 8px; height: 8px; border-radius: 50%;
      background: #7fff7f; box-shadow: 0 0 8px #7fff7f;
      margin-right: auto; flex-shrink: 0;
    }
    .ev-close {
      background: none; border: none; color: rgba(255,255,255,0.7);
      cursor: pointer; font-size: 20px; padding: 0 4px; flex-shrink: 0;
      transition: color .18s;
    }
    .ev-close:hover { color: #fff; }

    .ev-prog {
      background: #f0e8d8; padding: 8px 18px;
      display: flex; align-items: center; gap: 10px;
      border-bottom: 1px solid rgba(90,124,74,0.1);
      flex-shrink: 0;
    }
    .ev-prog-lbl { font-size: 11px; color: #5a7c4a; white-space: nowrap; font-weight: 600; }
    .ev-prog-track {
      flex: 1; height: 5px; background: rgba(90,124,74,0.15);
      border-radius: 3px; overflow: hidden;
    }
    .ev-prog-fill {
      height: 100%;
      background: linear-gradient(90deg, #5a7c4a, #8b6914);
      transition: width .5s ease;
    }

    .ev-msgs {
      flex: 1; overflow-y: auto; padding: 20px 16px;
      display: flex; flex-direction: column; gap: 12px;
      background: #fdf8f2;
    }
    .ev-msgs::-webkit-scrollbar { width: 4px; }
    .ev-msgs::-webkit-scrollbar-thumb { background: rgba(90,124,74,0.25); border-radius: 2px; }

    .ev-row { display: flex; gap: 8px; align-items: flex-end; direction: rtl; }
    .ev-row.user { flex-direction: row-reverse; }

    .ev-bubble {
      max-width: 87%; padding: 12px 16px;
      font-size: 14.5px; line-height: 1.8; border-radius: 16px;
      font-family: 'Heebo', Arial, sans-serif; direction: rtl;
    }
    .ev-bubble.bot {
      background: #fff; color: #2d2d2d;
      border: 1px solid rgba(90,124,74,0.18);
      border-radius: 16px 16px 16px 4px;
      box-shadow: 0 2px 10px rgba(0,0,0,0.06);
    }
    .ev-bubble.bot a { color: #5a7c4a; font-weight: 600; }
    .ev-bubble.user {
      background: linear-gradient(135deg, #4a6b3a, #5a7c4a);
      color: #fff; border-radius: 16px 16px 4px 16px;
    }

    .ev-typing {
      background: #fff; border: 1px solid rgba(90,124,74,0.15);
      border-radius: 16px 16px 16px 4px;
      padding: 14px 16px; display: flex; gap: 5px;
      align-items: center; width: 64px;
      box-shadow: 0 2px 10px rgba(0,0,0,0.06);
    }
    .ev-dot {
      width: 7px; height: 7px; border-radius: 50%;
      background: #5a7c4a; animation: evdot 1.2s infinite;
    }
    .ev-dot:nth-child(2) { animation-delay: .2s; }
    .ev-dot:nth-child(3) { animation-delay: .4s; }
    @keyframes evdot {
      0%,80%,100% { opacity: .3; transform: translateY(0); }
      40% { opacity: 1; transform: translateY(-5px); }
    }

    .ev-opts {
      display: flex; flex-direction: column; gap: 7px;
      padding: 0 16px 10px; direction: rtl;
    }
    .ev-opt {
      padding: 11px 18px; font-size: 14px;
      background: #fff; border: 1.5px solid #5a7c4a;
      color: #3d5c2e; border-radius: 22px;
      cursor: pointer; text-align: right;
      font-family: 'Heebo', Arial, sans-serif;
      transition: all .18s; font-weight: 500;
    }
    .ev-opt:hover { background: #5a7c4a; color: #fff; }
    .ev-opt.selected { background: #5a7c4a; color: #fff; opacity: .6; }
    .ev-opt:disabled { opacity: .35; cursor: default; }

    .ev-multi-wrap {
      padding: 0 16px 10px; direction: rtl;
    }
    .ev-multi-opts {
      display: flex; flex-direction: column; gap: 7px; margin-bottom: 10px;
    }
    .ev-multi-opt {
      padding: 11px 18px; font-size: 14px;
      background: #fff; border: 1.5px solid rgba(90,124,74,0.4);
      color: #3d5c2e; border-radius: 22px;
      cursor: pointer; text-align: right;
      font-family: 'Heebo', Arial, sans-serif;
      transition: all .18s; font-weight: 500;
      display: flex; align-items: center; gap: 8px;
    }
    .ev-multi-opt.active { background: #eef5e9; border-color: #5a7c4a; color: #3d5c2e; }
    .ev-multi-opt .ev-chk {
      width: 18px; height: 18px; border-radius: 4px;
      border: 1.5px solid #5a7c4a; flex-shrink: 0;
      display: flex; align-items: center; justify-content: center;
      font-size: 11px; color: #fff;
      background: transparent; transition: background .15s;
    }
    .ev-multi-opt.active .ev-chk { background: #5a7c4a; }
    .ev-multi-confirm {
      padding: 11px 24px; background: #5a7c4a; color: #fff;
      border: none; border-radius: 22px; font-size: 14px; font-weight: 700;
      font-family: 'Heebo', Arial, sans-serif; cursor: pointer;
      transition: background .18s; width: 100%;
    }
    .ev-multi-confirm:hover { background: #3d5c2e; }

    .ev-input-row {
      display: flex; gap: 8px; padding: 14px 16px;
      background: #f0e8d8;
      border-top: 1px solid rgba(90,124,74,0.12);
      flex-shrink: 0;
    }
    .ev-input {
      flex: 1; padding: 11px 16px; font-size: 15px;
      font-family: 'Heebo', Arial, sans-serif;
      background: #fff; border: 1px solid rgba(90,124,74,0.3);
      border-radius: 20px; color: #2d2d2d; outline: none; direction: rtl;
      transition: border-color .18s;
    }
    .ev-input:focus { border-color: #5a7c4a; }
    .ev-send {
      padding: 11px 18px; background: #5a7c4a; color: #fff;
      border: none; border-radius: 20px;
      font-size: 14px; font-weight: 700;
      font-family: 'Heebo', Arial, sans-serif;
      cursor: pointer; transition: background .18s; flex-shrink: 0;
    }
    .ev-send:hover { background: #3d5c2e; }

    .ev-sum {
      background: #fff; border: 1px solid rgba(90,124,74,0.18);
      border-radius: 14px; padding: 16px 18px;
      margin: 0 16px 10px; font-size: 13px; direction: rtl;
      box-shadow: 0 2px 10px rgba(0,0,0,0.05);
    }
    .ev-sum-title {
      font-size: 11px; color: #5a7c4a; letter-spacing: .08em;
      font-weight: 700; margin-bottom: 10px;
    }
    .ev-sum-row {
      display: flex; justify-content: space-between; align-items: flex-start;
      padding: 6px 0; border-bottom: 1px solid rgba(90,124,74,0.07);
      gap: 12px;
    }
    .ev-sum-row:last-child { border-bottom: none; }
    .ev-sum-k { color: #5a7c4a; font-weight: 600; flex-shrink: 0; }
    .ev-sum-v { font-weight: 600; color: #2d2d2d; text-align: left; }

    input[type="date"].ev-input {
      cursor: pointer;
    }
    input[type="date"].ev-input::-webkit-calendar-picker-indicator {
      cursor: pointer; opacity: 0.6; filter: invert(30%) sepia(50%) saturate(500%) hue-rotate(80deg);
    }
    .ev-restart {
      display: block; margin: 6px auto 12px;
      padding: 8px 22px; font-size: 12px;
      font-family: 'Heebo', Arial, sans-serif;
      background: transparent;
      border: 1px solid rgba(90,124,74,0.3);
      color: #5a7c4a; border-radius: 18px; cursor: pointer;
      transition: background .18s;
    }
    .ev-restart:hover { background: #f0e8d8; }
    /* ── סרגל תחתון בתוך הצ'אט ── */
    .ev-bottom-bar {
      display: flex; align-items: center; justify-content: space-between;
      padding: 10px 16px;
      background: #f0e8d8;
      border-top: 1px solid rgba(90,124,74,0.15);
      flex-shrink: 0; gap: 8px;
    }
    .ev-bottom-actions { display: flex; gap: 8px; align-items: center; }
    .ev-action-btn {
      width: 38px; height: 38px; border-radius: 50%;
      border: 1.5px solid rgba(90,124,74,0.3);
      cursor: pointer; background: #fff; color: #5a7c4a;
      display: flex; align-items: center; justify-content: center;
      font-size: 16px; box-shadow: 0 1px 6px rgba(0,0,0,0.08);
      transition: all .18s; text-decoration: none; flex-shrink: 0;
    }
    .ev-action-btn:hover { background: #eef5e9; transform: scale(1.06); }
    .ev-bottom-label {
      font-size: 11px; color: #8b6914; font-family: 'Heebo', Arial, sans-serif;
      font-weight: 600; direction: rtl; flex: 1; text-align: center;
    }

    /* ── פאנל נגישות ── */
    .ev-a11y-panel {
      position: absolute; bottom: 130px; left: 16px; z-index: 9997;
      background: #fff; border: 1.5px solid rgba(90,124,74,0.3);
      border-radius: 14px; padding: 14px 16px;
      box-shadow: 0 4px 20px rgba(0,0,0,0.15);
      display: none; flex-direction: column; gap: 10px;
      min-width: 200px; direction: rtl; font-family: 'Heebo', Arial, sans-serif;
    }
    .ev-a11y-panel.open { display: flex; }
    .ev-a11y-panel-title {
      font-size: 13px; font-weight: 700; color: #3d5c2e;
      border-bottom: 1px solid rgba(90,124,74,0.15); padding-bottom: 8px;
      margin-bottom: 2px;
    }
    .ev-a11y-row {
      display: flex; align-items: center; justify-content: space-between; gap: 10px;
    }
    .ev-a11y-label { font-size: 13px; color: #2d2d2d; }
    .ev-a11y-controls { display: flex; gap: 6px; }
    .ev-a11y-ctrl {
      width: 30px; height: 30px; border-radius: 8px;
      border: 1.5px solid #5a7c4a; background: #fff;
      color: #3d5c2e; font-size: 16px; font-weight: 700;
      cursor: pointer; display: flex; align-items: center; justify-content: center;
      transition: background .15s;
    }
    .ev-a11y-ctrl:hover { background: #eef5e9; }
    .ev-a11y-toggle {
      width: 44px; height: 24px; border-radius: 12px;
      background: rgba(90,124,74,0.15); border: 1.5px solid #5a7c4a;
      cursor: pointer; position: relative; transition: background .2s;
    }
    .ev-a11y-toggle.on { background: #5a7c4a; }
    .ev-a11y-toggle::after {
      content: ''; position: absolute; top: 2px; right: 2px;
      width: 16px; height: 16px; border-radius: 50%; background: #fff;
      transition: transform .2s;
    }
    .ev-a11y-toggle.on::after { transform: translateX(-20px); }
    .ev-a11y-reset {
      width: 100%; padding: 7px; border-radius: 8px;
      border: 1px solid rgba(90,124,74,0.3); background: #f0e8d8;
      color: #3d5c2e; font-size: 12px; font-weight: 600;
      font-family: 'Heebo', Arial, sans-serif; cursor: pointer;
      transition: background .15s;
    }
    .ev-a11y-reset:hover { background: #e0d8c8; }

  `;

  document.head.appendChild(style);

  // ── FAB ──
  const fab = document.createElement('button');
  fab.className = 'ev-fab';
  fab.innerHTML = `<span style="font-family:Georgia,serif;font-size:28px;font-weight:700;color:#fff;letter-spacing:-1px;">E</span>`;
  document.body.appendChild(fab);

  // ── WINDOW ──
  const win = document.createElement('div');
  win.className = 'ev-window';
  win.innerHTML = `
    <div class="ev-head">
      <div class="ev-head-icon" style="display:flex;align-items:center;"><img src="data:image/png;base64,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" style="height:38px;max-width:120px;object-fit:contain;filter:brightness(0) invert(1);" alt="Even's" /></div>
      <div>
        <div class="ev-head-name">Even's – נשמח לעזור!</div>
        <div class="ev-head-sub">אירוח • סדנאות • תבלינים • בית נחמיה</div>
      </div>
      <div class="ev-head-dot"></div>
      <button class="ev-close" id="ev-close">✕</button>
    </div>
    <div class="ev-prog">
      <span class="ev-prog-lbl" id="ev-lbl">שלב 1 / 12</span>
      <div class="ev-prog-track"><div class="ev-prog-fill" id="ev-fill" style="width:8%"></div></div>
    </div>
    <div class="ev-msgs" id="ev-msgs"></div>
    <div class="ev-bottom-bar">
      <div class="ev-bottom-actions">
        <a class="ev-action-btn" href="https://wa.me/972524763530" target="_blank" title="WhatsApp – מיכל" id="ev-wa-btn">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="18" height="18" fill="#5a7c4a"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
        </a>
        <a class="ev-action-btn" href="tel:+972524763530" title="חייגי למיכל" id="ev-tel-btn">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="17" height="17" fill="#5a7c4a"><path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z"/></svg>
        </a>
        <button class="ev-action-btn" id="ev-a11y-btn" title="נגישות">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="17" height="17" fill="#5a7c4a"><path d="M12 2a2 2 0 110 4 2 2 0 010-4zm-1 15H9v-5H7l2.09-5.85A1 1 0 0110 5h4a1 1 0 01.93.63L17 11h-2v5h-2v3h-2v-2zm1-11c-.55 0-1-.45-1-1s.45-1 1-1 1 .45 1 1-.45 1-1 1z"/></svg>
        </button>
      </div>
      <span class="ev-bottom-label">Even&#39;s אירוח • 054-476-3530</span>
    </div>`;
  document.body.appendChild(win);

  const MSG = document.getElementById('ev-msgs');
  const FILL = document.getElementById('ev-fill');
  const PLBL = document.getElementById('ev-lbl');
  const TOTAL = 12;

  let state = {};
  function fn() { return state.name ? state.name.split(' ')[0] : ''; }

  // ── ACCESSIBILITY PANEL ──
  const a11yPanel = document.createElement('div');
  a11yPanel.className = 'ev-a11y-panel';
  a11yPanel.innerHTML = `
    <div class="ev-a11y-panel-title">⚙️ הגדרות נגישות</div>
    <div class="ev-a11y-row">
      <span class="ev-a11y-label">גודל טקסט</span>
      <div class="ev-a11y-controls">
        <button class="ev-a11y-ctrl" id="ev-font-down">A-</button>
        <button class="ev-a11y-ctrl" id="ev-font-up">A+</button>
      </div>
    </div>
    <div class="ev-a11y-row">
      <span class="ev-a11y-label">ניגודיות גבוהה</span>
      <div class="ev-a11y-toggle" id="ev-contrast-toggle"></div>
    </div>
    <div class="ev-a11y-row">
      <span class="ev-a11y-label">הדגשת קישורים</span>
      <div class="ev-a11y-toggle" id="ev-links-toggle"></div>
    </div>
    <button class="ev-a11y-reset" id="ev-a11y-reset">↺ איפוס</button>
  `;
  win.appendChild(a11yPanel);

  // Wire a11y button (inside window)
  document.getElementById('ev-a11y-btn').onclick = () => a11yPanel.classList.toggle('open');
  document.addEventListener('click', e => {
    const btn = document.getElementById('ev-a11y-btn');
    if (btn && !a11yPanel.contains(e.target) && e.target !== btn)
      a11yPanel.classList.remove('open');
  });

  // Font size
  let fontSize = 14.5;
  document.getElementById('ev-font-up').onclick = () => {
    fontSize = Math.min(fontSize + 1, 20);
    document.querySelectorAll('.ev-bubble, .ev-opt, .ev-multi-opt, .ev-input, .ev-send').forEach(el => { el.style.fontSize = fontSize + 'px'; });
  };
  document.getElementById('ev-font-down').onclick = () => {
    fontSize = Math.max(fontSize - 1, 11);
    document.querySelectorAll('.ev-bubble, .ev-opt, .ev-multi-opt, .ev-input, .ev-send').forEach(el => { el.style.fontSize = fontSize + 'px'; });
  };

  // High contrast
  const contrastToggle = document.getElementById('ev-contrast-toggle');
  contrastToggle.onclick = () => {
    contrastToggle.classList.toggle('on');
    win.style.filter = contrastToggle.classList.contains('on') ? 'contrast(1.5) brightness(0.95)' : '';
  };

  // Highlight links
  const linksToggle = document.getElementById('ev-links-toggle');
  linksToggle.onclick = () => {
    linksToggle.classList.toggle('on');
    const on = linksToggle.classList.contains('on');
    document.querySelectorAll('.ev-bubble a').forEach(a => {
      a.style.textDecoration = on ? 'underline' : '';
      a.style.fontWeight = on ? '800' : '';
    });
  };

  // Reset
  document.getElementById('ev-a11y-reset').onclick = () => {
    fontSize = 14.5;
    document.querySelectorAll('.ev-bubble, .ev-opt, .ev-multi-opt, .ev-input, .ev-send').forEach(el => { el.style.fontSize = ''; });
    win.style.filter = '';
    contrastToggle.classList.remove('on');
    linksToggle.classList.remove('on');
    document.querySelectorAll('.ev-bubble a').forEach(a => { a.style.textDecoration = ''; a.style.fontWeight = ''; });
  };





  fab.onclick = () => {
    win.classList.toggle('open');
    if (win.classList.contains('open') && MSG.children.length === 0) runStep(0);
  };
  document.getElementById('ev-close').onclick = () => win.classList.remove('open');

  function updProg(step) {
    FILL.style.width = Math.round((step / TOTAL) * 100) + '%';
    PLBL.textContent = 'שלב ' + step + ' / ' + TOTAL;
  }

  function addBot(text, delay) {
    delay = delay || 0;
    return new Promise(res => {
      const tr = document.createElement('div');
      tr.className = 'ev-row';
      tr.innerHTML = `<div class="ev-typing"><div class="ev-dot"></div><div class="ev-dot"></div><div class="ev-dot"></div></div>`;
      MSG.appendChild(tr); MSG.scrollTop = MSG.scrollHeight;
      setTimeout(() => {
        tr.remove();
        const r = document.createElement('div');
        r.className = 'ev-row';
        r.innerHTML = `<div class="ev-bubble bot">${text.replace(/\n/g, '<br>')}</div>`;
        MSG.appendChild(r); MSG.scrollTop = MSG.scrollHeight; res();
      }, delay + 900);
    });
  }

  function addUser(text) {
    const r = document.createElement('div');
    r.className = 'ev-row user';
    r.innerHTML = `<div class="ev-bubble user">${text}</div>`;
    MSG.appendChild(r); MSG.scrollTop = MSG.scrollHeight;
  }

  function addOpts(opts, onSel) {
    const w = document.createElement('div');
    w.className = 'ev-opts';
    opts.forEach(o => {
      const b = document.createElement('button');
      b.className = 'ev-opt'; b.textContent = o;
      b.onclick = () => {
        w.querySelectorAll('.ev-opt').forEach(x => { x.disabled = true; });
        b.classList.add('selected');
        onSel(o);
      };
      w.appendChild(b);
    });
    MSG.appendChild(w); MSG.scrollTop = MSG.scrollHeight;
  }

  function addMultiOpts(opts, onSel) {
    const wrap = document.createElement('div');
    wrap.className = 'ev-multi-wrap';
    const optWrap = document.createElement('div');
    optWrap.className = 'ev-multi-opts';
    const selected = new Set();

    opts.forEach(o => {
      const b = document.createElement('button');
      b.className = 'ev-multi-opt';
      b.innerHTML = `<span class="ev-chk"></span><span>${o}</span>`;
      b.onclick = () => {
        if (selected.has(o)) { selected.delete(o); b.classList.remove('active'); b.querySelector('.ev-chk').textContent = ''; }
        else { selected.add(o); b.classList.add('active'); b.querySelector('.ev-chk').textContent = '✓'; }
      };
      optWrap.appendChild(b);
    });

    const confirm = document.createElement('button');
    confirm.className = 'ev-multi-confirm';
    confirm.textContent = 'המשך ←';
    confirm.onclick = () => {
      if (selected.size === 0) return;
      wrap.querySelectorAll('.ev-multi-opt').forEach(x => { x.disabled = true; x.style.opacity = '.5'; });
      confirm.disabled = true; confirm.style.opacity = '.5';
      onSel(Array.from(selected).join(', '));
    };

    wrap.appendChild(optWrap);
    wrap.appendChild(confirm);
    MSG.appendChild(wrap);
    MSG.scrollTop = MSG.scrollHeight;
  }

  function addInput(ph, onSub, type, inputType) {
    const r = document.createElement('div');
    r.className = 'ev-input-row';
    const inp = document.createElement('input');
    inp.className = 'ev-input'; inp.placeholder = ph;
    inp.type = inputType || type || 'text';
    const btn = document.createElement('button');
    btn.className = 'ev-send'; btn.textContent = 'שלח';
    function sub() {
      const v = inp.value.trim();
      if (!v) return;
      inp.disabled = true; btn.disabled = true; r.style.opacity = '.5';
      onSub(v);
    }
    btn.onclick = sub;
    inp.onkeydown = e => { if (e.key === 'Enter') sub(); };
    r.appendChild(inp); r.appendChild(btn);
    // Insert before bottom bar if it exists
    const bottomBar = win.querySelector('.ev-bottom-bar');
    if (bottomBar) {
      win.insertBefore(r, bottomBar);
    } else {
      MSG.appendChild(r);
    }
    MSG.scrollTop = MSG.scrollHeight;
    setTimeout(() => inp.focus(), 100);
  }

  function addSum() {
    const s = state;
    const rows = [
      ['שם', s.name || '—'],
      ['טלפון', s.phone || '—'],
      ['מייל', s.email || '—'],
      ['חברה', s.company || '—'],
      ['סוג אירוע', s.eventCategory || '—'],
      ['פירוט', s.eventType || '—'],
      ['תאריך', s.date || '—'],
      ['שעות', s.hours || '—'],
      ['כמות אורחים', s.size || '—'],
      ['דיוור', s.consent || '—'],
    ];
    const c = document.createElement('div');
    c.className = 'ev-sum';
    c.innerHTML = '<div class="ev-sum-title">✅ סיכום הפנייה שלך</div>' +
      rows.map(r => `<div class="ev-sum-row"><span class="ev-sum-k">${r[0]}</span><span class="ev-sum-v">${r[1]}</span></div>`).join('');
    MSG.appendChild(c); MSG.scrollTop = MSG.scrollHeight;
  }

  function submitLead() {
    const s = state;
    const body = new URLSearchParams({
      'form-name': 'evens-lead',
      'name':          s.name || '',
      'company':       s.company || '',
      'phone':         s.phone || '',
      'email':         s.email || '',
      'eventCategory': s.eventCategory || '',
      'eventType':     s.eventType || '',
      'date':          s.date || '',
      'hours':         s.hours || '',
      'size':          s.size || '',
      'catering':      s.catering || '',
    });
    fetch('/', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: body.toString()
    })
    .then(() => console.log('EVENS Lead sent ✅'))
    .catch(err => console.error('Netlify form error:', err));
  }

  function addDatePicker(onSub) {
    const r = document.createElement('div');
    r.className = 'ev-input-row';
    r.style.flexDirection = 'column'; r.style.gap = '8px';
    const inp = document.createElement('input');
    inp.className = 'ev-input'; inp.type = 'date';
    inp.style.width = '100%';
    // Set min date to today
    const today = new Date().toISOString().split('T')[0];
    inp.min = today;
    const row2 = document.createElement('div');
    row2.style.cssText = 'display:flex;gap:8px;width:100%';
    const skipBtn = document.createElement('button');
    skipBtn.className = 'ev-send'; skipBtn.textContent = 'גמיש / לא יודע';
    skipBtn.style.cssText = 'background:#8b6914;flex:1;font-size:13px';
    const btn = document.createElement('button');
    btn.className = 'ev-send'; btn.textContent = 'שלח'; btn.style.flex = '1';
    function sub(val) {
      inp.disabled = true; btn.disabled = true; skipBtn.disabled = true;
      r.style.opacity = '.5';
      onSub(val);
    }
    btn.onclick = () => { const v = inp.value; if (!v) return; sub(formatDate(v)); };
    skipBtn.onclick = () => sub('גמיש / לא יודע עדיין');
    inp.onkeydown = e => { if (e.key === 'Enter' && inp.value) sub(formatDate(inp.value)); };
    row2.appendChild(skipBtn); row2.appendChild(btn);
    r.appendChild(inp); r.appendChild(row2);
    MSG.appendChild(r); MSG.scrollTop = MSG.scrollHeight;
    setTimeout(() => inp.focus(), 100);
  }

  function formatDate(d) {
    if (!d) return '';
    const [y, m, day] = d.split('-');
    const months = ['','ינואר','פברואר','מרץ','אפריל','מאי','יוני','יולי','אוגוסט','ספטמבר','אוקטובר','נובמבר','דצמבר'];
    return `${parseInt(day)} ב${months[parseInt(m)]} ${y}`;
  }

  function addOptsConditional(onSel) {
    const cat = state.eventCategory || '';
    let opts;
    if (cat === 'אירוע עסקי') {
      opts = ['כנס / הרצאה', 'ישיבת הנהלה / מפגש מנהלים', 'יום גיבוש', 'סדנה מקצועית', 'אחר'];
    } else if (cat === 'אירוע פרטי') {
      opts = ['בר / בת מצווה', 'יום הולדת', 'חתונה / אירוסין', 'מסיבה / מפגש משפחתי', 'אחר'];
    } else {
      addInput('ספר/י לנו במה מדובר...', v => {
        addUser(v);
        onSel(v);
      });
      return;
    }
    addOpts(opts, c => {
      addUser(c);
      if (c === 'אחר') {
        addInput('ספר/י לנו איזה סוג אירוע...', v => {
          addUser(v);
          onSel(v);
        });
      } else {
        onSel(c);
      }
    });
  }

  // ── FLOW ──
  const FLOW = [
    // 0 → שלב 1: פתיחה + שם
    {
      step: 1,
      bot: 'היי 😊 איזה כיף שפנית אלינו!\nאני הבוט של Even\'s — אשמח לעזור לך לתכנן אירוע מושלם אצלנו ✨\n\nנתחיל בהיכרות קצרה — מה שמך?',
      isInput: true, ph: 'שם פרטי + שם משפחה',
      run: (v, n) => { state.name = v; n(); }
    },
    // 1 → שלב 2: טלפון (חובה)
    {
      step: 2,
      bot: () => `נעים מאוד, ${fn()}! 🌿\n\nמה מספר הטלפון שלך?`,
      isInput: true, ph: 'מספר טלפון',
      run: (v, n) => { state.phone = v; n(); }
    },
    // 2 → שלב 3: מייל (חובה)
    {
      step: 3,
      bot: () => `ומה כתובת המייל שלך?`,
      isInput: true, ph: 'כתובת מייל',
      run: (v, n) => { state.email = v; n(); }
    },
    // 3 → שלב 4: סוג האירוע
    {
      step: 4,
      bot: () => `תודה ${fn()}! 😊\n\nמה סוג האירוע שאת/ה מתכנן/ת?`,
      opts: ['אירוע עסקי', 'אירוע פרטי', 'אחר'],
      run: (c, n) => { state.eventCategory = c; n(); }
    },
    // 4 → שלב 5: שם חברה — רק לעסקי (שדה טקסט), אחרים עוברים הלאה
    {
      step: 5,
      bot: () => {
        const cat = state.eventCategory || '';
        if (cat === 'אירוע עסקי') return `נהדר! יש לנו מתחם מצויד ושקט, מוקף טבע — מושלם לפגישות ממוקדות ✨\n\nמאיזה חברה / ארגון את/ה?`;
        return null; // skip for non-business
      },
      isSkippable: true,
      isInput: true, ph: 'שם חברה / ארגון',
      run: (v, n) => { state.company = v; n(); }
    },
    // 5 → שלב 6: סוג האירוע הספציפי
    {
      step: 6,
      bot: () => {
        const cat = state.eventCategory || '';
        if (cat === 'אירוע עסקי') return `איזה סוג אירוע עסקי מדובר?`;
        if (cat === 'אירוע פרטי') return `כמה מרגש! 🎉 אנחנו אוהבים לארח אירועים פרטיים באווירה חמה ואינטימית.\n\nמה האירוע הספציפי?`;
        return `בשמחה! 🌿\n\nספר/י לנו במה מדובר — נשמח להתאים לך את החוויה המושלמת ✨`;
      },
      isOptsConditional: true,
      run: (c, n) => { state.eventType = c; n(); }
    },
    // 6 → שלב 7: כמות אורחים — שדה חופשי
    {
      step: 7,
      bot: () => {
        const cat = state.eventCategory || '';
        const max = cat === 'אירוע פרטי' ? 150 : 100;
        return `מעולה! 💫\n\nלכמה אורחים בערך? (עד ${max} אנשים)`;
      },
      isInput: true, ph: 'הכנס מספר אורחים', inputType: 'number',
      run: (v, n) => { state.size = v; n(); }
    },
    // 7 → שלב 8: תאריך
    {
      step: 8,
      bot: () => `${fn()}, מצוין! 💫\n\nיש תאריך מועדף בראש?`,
      isDatePicker: true,
      run: (v, n) => { state.date = v; n(); }
    },
    // 8 → שלב 9: שעות — שונה לפרטי/עסקי
    {
      step: 9,
      bot: () => `ומה שעות האירוע המשוערות?`,
      isOptsHours: true,
      run: (c, n) => { state.hours = c; n(); }
    },
    // 9 → שלב 10: הסכמה לדיוור
    {
      step: 10,
      bot: () => `כמעט סיימנו! 😊\n\nאני מסכימ/ה לקבל עדכונים ומבצעים מ-Even\'s:`,
      opts: ['כן, אשמח לקבל עדכונים 💌', 'לא תודה'],
      run: (c, n) => { state.consent = c.includes('כן') ? 'כן' : 'לא'; submitLead(); n(); }
    },
    // 10 → שלב 11: תודה
    {
      step: 11,
      bot: () => `תודה רבה, ${fn()}! 🌿💫\n\nקיבלנו את כל הפרטים שלך ואנחנו ממש שמחים שפנית אלינו!\nמיכל תחזור אליך בהקדם — בדרך כלל תוך יום עסקים אחד.\n\nמחכים לכם אצלנו ב-Even\'s 🏡✨`,
      isFinal: true
    },
    // 11 → שלב 12: סיכום + לינקים
    {
      step: 12,
      bot: () => `בינתיים, מוזמנ/ת להציץ:\n\n🌿 <a href="https://www.evens.co.il/event-s" target="_blank">מתחם האירוח שלנו</a>\n🧑‍🍳 <a href="https://www.evens.co.il/copy-of-פרויקט-החממה" target="_blank">הסדנאות שלנו</a>\n📞 <a href="https://wa.me/972524763530" target="_blank">WhatsApp ישיר עם מיכל</a>`,
      isSummary: true
    }
  ];

  function runStep(idx) {
    if (idx === null || idx === undefined || idx >= FLOW.length) return;
    const s = FLOW[idx];
    updProg(s.step);
    const text = typeof s.bot === 'function' ? s.bot() : s.bot;
    // Skip step if bot returns null (condition not met)
    if (text === null) {
      setTimeout(() => runStep(idx + 1), 50);
      return;
    }
    addBot(text, 120).then(() => {
      if (s.isSummary) {
        addSum();
        const rb = document.createElement('button');
        rb.className = 'ev-restart';
        rb.textContent = '↺ התחל מחדש';
        rb.onclick = () => { state = {}; MSG.innerHTML = ''; runStep(0); };
        MSG.appendChild(rb);
        MSG.scrollTop = MSG.scrollHeight;
        return;
      }
      if (s.isFinal) {
        setTimeout(() => runStep(idx + 1), 700);
        return;
      }
      if (s.isMulti) {
        addMultiOpts(s.opts, c => {
          addUser(c);
          s.run(c, () => setTimeout(() => runStep(idx + 1), 350));
        });
        return;
      }
      if (s.isDatePicker) {
        addDatePicker(v => {
          addUser(v);
          s.run(v, () => setTimeout(() => runStep(idx + 1), 350));
        });
        return;
      }
      if (s.isOptsConditional) {
        addOptsConditional(c => {
          s.run(c, () => setTimeout(() => runStep(idx + 1), 350));
        });
        return;
      }
      if (s.isOptsConditionalBiz) {
        // Only show for עסקי, skip otherwise
        if ((state.eventCategory || '') !== 'אירוע עסקי') {
          s.run('', () => setTimeout(() => runStep(idx + 1), 50));
          return;
        }
        addOpts(['כנס / הרצאה', 'ישיבת הנהלה / מפגש מנהלים', 'יום גיבוש', 'סדנה מקצועית', 'אחר'], c => {
          addUser(c);
          s.run(c, () => setTimeout(() => runStep(idx + 1), 350));
        });
        return;
      }
      if (s.isOptsHours) {
        const cat = state.eventCategory || '';
        let hoursOpts;
        if (cat === 'אירוע עסקי') {
          hoursOpts = ['חצי יום בוקר', 'חצי יום צהריים', 'יום שלם', 'ערב'];
        } else {
          hoursOpts = ['בוקר', 'צהריים', 'ערב'];
        }
        addOpts(hoursOpts, c => {
          addUser(c);
          s.run(c, () => setTimeout(() => runStep(idx + 1), 350));
        });
        return;
      }
      if (s.isInput) {
        addInput(s.ph, v => {
          addUser(v);
          s.run(v, () => setTimeout(() => runStep(idx + 1), 350));
        }, 'text', s.inputType || 'text');
        return;
      }
      if (s.opts) {
        addOpts(s.opts, c => {
          addUser(c);
          s.run(c, () => setTimeout(() => runStep(idx + 1), 350));
        });
      }
    });
  }

})();
