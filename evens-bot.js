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
      background: linear-gradient(135deg, #4a6b3a, #7aab5a);
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
    .ev-head-icon { font-size: 34px; flex-shrink: 0; }
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
  `;
  document.head.appendChild(style);

  // ── FAB ──
  const fab = document.createElement('button');
  fab.className = 'ev-fab';
  fab.innerHTML = `🌿<div class="ev-notif">1</div>`;
  document.body.appendChild(fab);

  // ── WINDOW ──
  const win = document.createElement('div');
  win.className = 'ev-window';
  win.innerHTML = `
    <div class="ev-head">
      <div class="ev-head-icon">🌿</div>
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
    <div class="ev-msgs" id="ev-msgs"></div>`;
  document.body.appendChild(win);

  const MSG = document.getElementById('ev-msgs');
  const FILL = document.getElementById('ev-fill');
  const PLBL = document.getElementById('ev-lbl');
  const TOTAL = 12;

  let state = {};
  function fn() { return state.name ? state.name.split(' ')[0] : ''; }

  fab.onclick = () => {
    win.classList.toggle('open');
    fab.querySelector('.ev-notif').style.display = 'none';
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

  function addInput(ph, onSub, type) {
    const r = document.createElement('div');
    r.className = 'ev-input-row';
    const inp = document.createElement('input');
    inp.className = 'ev-input'; inp.placeholder = ph;
    inp.type = type || 'text';
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
    // Remove previous input-row if exists
    const prev = MSG.querySelector('.ev-input-row:last-child');
    MSG.appendChild(r);
    MSG.scrollTop = MSG.scrollHeight;
    setTimeout(() => inp.focus(), 100);
  }

  function addSum() {
    const s = state;
    const rows = [
      ['שם', s.name || '—'],
      ['חברה', s.company || '—'],
      ['טלפון', s.phone || '—'],
      ['מייל', s.email || '—'],
      ['סוג אירוע', s.eventCategory || '—'],
      ['פירוט', s.eventType || '—'],
      ['תאריך', s.date || '—'],
      ['שעות', s.hours || '—'],
      ['כמות אורחים', s.size || '—'],
      ['סוג אירוח', s.catering || '—'],
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
      // "אחר" - free text
      addInput('ספר/י לנו במה מדובר...', v => {
        addUser(v);
        onSel(v);
      });
      return;
    }
    addOpts(opts, c => {
      addUser(c);
      onSel(c);
    });
  }

  // ── FLOW ──
  const FLOW = [
    // 0 → שלב 1: פתיחה + שם
    {
      step: 1,
      bot: 'היי 😊 איזה כיף שפנית אלינו!\nאני הבוט של Even\'s — אשמח לעזור לך לתכנן אירוע מושלם אצלנו ✨\n\nנתחיל בהיכרות — מה שמך?',
      isInput: true, ph: 'שם פרטי + שם משפחה',
      run: (v, n) => { state.name = v; n(); }
    },
    // 1 → שלב 2: שם חברה
    {
      step: 2,
      bot: () => `נעים מאוד, ${fn()}! 🌿\n\nמאיזה חברה / ארגון את/ה? (אם פרטי — אפשר לכתוב "פרטי")`,
      isInput: true, ph: 'שם חברה / ארגון',
      run: (v, n) => { state.company = v; n(); }
    },
    // 2 → שלב 3: סוג האירוע — עסקי / פרטי / אחר
    {
      step: 3,
      bot: () => `מעולה! 😊\n\nמה סוג האירוע שאת/ה מתכנן/ת?`,
      opts: ['אירוע עסקי', 'אירוע פרטי', 'אחר'],
      run: (c, n) => { state.eventCategory = c; n(); }
    },
    // 3 → שלב 4א: פירוט עסקי
    {
      step: 4,
      bot: () => {
        const cat = state.eventCategory || '';
        if (cat === 'אירוע עסקי') return `נהדר! יש לנו מתחם מצויד ושקט, מוקף טבע — מושלם לפגישות ממוקדות ואירועים עסקיים ✨\n\nאיזה סוג אירוע עסקי מדובר?`;
        if (cat === 'אירוע פרטי') return `כמה מרגש! 🎉 אנחנו אוהבים לארח אירועים פרטיים באווירה חמה ואינטימית.\n\nמה האירוע הספציפי?`;
        return `בכיף! ספר/י לי קצת ונמצא יחד מה מתאים 😊\n\nעל מה היית רוצה לשמוע?`;
      },
      isOptsConditional: true,
      run: (c, n) => { state.eventType = c; n(); }
    },
    // 4 → שלב 5: כמות אורחים
    {
      step: 5,
      bot: () => `מעולה! 💫\n\nלכמה אורחים בערך?`,
      opts: ['עד 20', '20–50', '50–80', '80–120'],
      run: (c, n) => { state.size = c; n(); }
    },
    // 5 → שלב 6: תאריך עם date picker
    {
      step: 6,
      bot: () => `${fn()}, מצוין! 💫\n\nיש תאריך מועדף בראש?`,
      isDatePicker: true,
      run: (v, n) => { state.date = v; n(); }
    },
    // 6 → שלב 7: שעות האירוע
    {
      step: 7,
      bot: () => `ומה שעות האירוע המשוערות?`,
      opts: ['בוקר (08:00–13:00)', 'צהריים (12:00–16:00)', 'אחר הצהריים / ערב (17:00+)', 'יום שלם / גמיש'],
      run: (c, n) => { state.hours = c; n(); }
    },
    // 7 → שלב 8: סוג האירוח
    {
      step: 8,
      bot: () => `ומה לגבי האוכל? 🍽️\nניתן לבחור יותר מאפשרות אחת:`,
      isMulti: true,
      opts: ['ארוחת בוקר', 'ארוחת צהריים', 'ארוחת ערב', 'כיבוד קל / קפה ועוגות', 'חלבי', 'בשרי', 'ללא אוכל'],
      run: (c, n) => { state.catering = c; n(); }
    },
    // 8 → שלב 9: טלפון
    {
      step: 9,
      bot: () => `${fn()}, כמעט סיימנו! 😊\n\nכדי שנחזור אליך עם הצעה מפורטת —\nמה מספר הטלפון שלך?`,
      isInput: true, ph: 'מספר טלפון',
      run: (v, n) => { state.phone = v; n(); }
    },
    // 9 → שלב 10: מייל
    {
      step: 10,
      bot: () => `ומייל? (לא חובה — אפשר לדלג עם "-")`,
      isInput: true, ph: 'כתובת מייל',
      run: (v, n) => {
        state.email = (v === '-' || v === '') ? '' : v;
        submitLead();
        n();
      }
    },
    // 10 → שלב 11: תודה
    {
      step: 11,
      bot: () => `תודה רבה, ${fn()}! 🌿💫\n\nקיבלנו את כל הפרטים שלך ואנחנו ממש שמחים שפנית אלינו!\nמיכל או אביב יחזרו אליך בהקדם — בדרך כלל תוך יום עסקים אחד.\n\nמחכים לכם אצלנו ב-Even's 🏡✨`,
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
      if (s.isInput) {
        addInput(s.ph, v => {
          addUser(v);
          s.run(v, () => setTimeout(() => runStep(idx + 1), 350));
        });
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
