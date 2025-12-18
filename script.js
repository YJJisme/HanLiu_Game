const input = document.getElementById('playerName');
const btn = document.getElementById('startBtn');
const intro = document.querySelector('.intro');
const leaderboardBtn = document.getElementById('leaderboardBtn');
const backdrop = document.getElementById('modalBackdrop');
const modalClose = document.getElementById('modalClose');
const rankHan = document.getElementById('rankHan');
const rankLiu = document.getElementById('rankLiu');
const rankAll = document.getElementById('rankAll');
const aboutBtn = document.getElementById('aboutBtn');
const debugLevelInput = document.getElementById('debugLevelInput');
const debugStartBtn = document.getElementById('debugStartBtn');
const drawCardBtn = document.getElementById('drawCardBtn');
const coinsDisplay = document.getElementById('coinsDisplay');
const selectCardArea = document.getElementById('selectCardArea');
const equipExileCard = document.getElementById('equipExileCard');
const cardManagerBtn = document.getElementById('cardManagerBtn');
const DEV_PASSWORD = '3637';
let devModeEnabled = false;
const CLOUD_SYNC_ENDPOINT = 'https://hanliu-leaderboard.50327willy50327.workers.dev/scores';
const CLOUD_SYNC_AUTH = '';
const FEEDBACK_URL = 'https://mail.google.com/mail/?view=cm&fs=1&to=50327willy50327@gmail.com&su=%E3%80%90%E5%AF%92%E6%B5%81%E3%80%91%E9%81%8A%E6%88%B2%E5%9B%9E%E5%A0%B1%E8%88%87%E5%BB%BA%E8%AD%B0';
const _dc = document.getElementById('debugControls');
if (_dc) _dc.style.display = 'none';
const _da = debugLevelInput ? debugLevelInput.parentElement : null;
if (_da) _da.style.display = 'none';
let appVersion = '1.31';
let releaseNotes = [
  '圖鑑排行榜整合至主頁排行榜彈窗',
  '做夢關／迴光返照關題庫擴充 10 題',
  'SSR 一血機制優化：裝備即一血提示',
  '莊周夢蝶預確認流程：進入夢前詢問是否使用',
  '第四關插圖解鎖邏輯修復：孟郊月下正常解鎖'
];
let releaseHistory = {
  '1.31': [
    '圖鑑排行榜整合至主頁排行榜彈窗',
    '做夢關／迴光返照關題庫擴充 10 題',
    'SSR 一血機制優化：裝備即一血提示',
    '莊周夢蝶預確認流程：進入夢前詢問是否使用',
    '第四關插圖解鎖邏輯修復：孟郊月下正常解鎖'
  ],
  '1.30': [
    '卡牌系統正式實裝：抽卡、背包、裝備、展示',
    '圖鑑分組與永久解鎖：結算／場景／事件／卡片',
    '登入頁隱藏貨幣；主頁顯示並長按提示獲取方式',
    '每日首次登入自動簽到與月曆打勾；連續 5 天 +5',
    '新帳號首次登入贈送免費一抽（遊客不適用）'
  ],
  '1.22': [
    '介面體驗優化與穩定性改善',
    '排行榜與設定流程調整',
    '文字內容與可讀性提升'
  ],
  '1.21': ['修正排行榜進度顯示僅通關為 Completed','移除首頁音量控制，統一使用設定視窗','設定加入登出按鈕','支援同裝置多帳號與暱稱修改，排行榜跨裝置顯示同步'],
  '1.2.0': [
    '新增登入選擇入口與隱私導向本機帳號',
    '首頁登入按鈕響應式（橫排/直排）與定位優化',
    '綁定帳號暱稱唯讀；遊客可編輯暱稱',
    '新增圖鑑：遊玩後解鎖插圖並顯示',
    '帳號登入者圖鑑跨裝置保存（雲端同步）',
    '遊客圖鑑僅本次遊玩有效（重置後需重解）'
  ],
  '1.1.7': ['結算頁加入分享結果按鈕','生成分享圖片（暱稱/分數/評語）','支援 Web Share；回退提供下載與複製','依評級自動匹配結算插圖'],
  '1.1.6': ['分離背景音量與音效音量','首頁改為視窗集中調整音量','♪ 再次點擊可關閉音量視窗','音量標籤文字加粗提亮','雙滑桿位置分層不重疊','新增多種 WebAudio 音效（成功/失誤/受傷/收集/轉場）','錯誤與受傷時播放提示音','音效音量獨立保存'],
  '1.1.5': ['首頁♪音量滑桿淡入動畫','關於遊戲新增背景音樂：楊竣傑'],
  '1.1.4': ['設定紐開啟時隱藏並修復功能按鈕','首頁音量移至右上角並以♪顯示後展開滑桿','第九關段落文字提亮以增強辨識','修復「重來一次」與「回到首頁」動作'],
  '1.1.3': ['第九關 UI 直覺化：拖曳排序與即時預覽'],
  '1.1.2': ['設定面板新增音量滑桿；整合回報/首頁/重來/公告','移除下方固定回報按鈕以免遮擋'],
  '1.1.1': ['加入結算插圖（SS/S/A/B/C/D 等級對應）','SS 稀有特效強化：光暈、掃光、星粒與脈動','新增稱號等級與排行榜 SS 特效（SS：泰山北斗）','調整各關卡分數至新標準（總分 220，不含夢與返照）','強化全域文字對比，避免文字與背景相近','第十關起始延遲下墜 1.2 秒，提升反應時間','第九關玩法改為「段落排序」，說明已更新','測試卡暱稱顯示「測試卡」','套用冰室照片作為背景']
};
let noticeShownOnAuthGate = false;
const NOTICE_TEXT = {
  game: [
    '歡迎來到寒流世界！註冊帳號首次登入送免費一抽！',
    '警告！遊戲內容雖有設後台儲存資料，但仍可能無法完全跨裝置保存，敬請見諒。'
  ]
};
const DRAW_RATE = { SSR: 5, SR: 20, R: 40, N: 35 };

let matchScore = 0;
let errorCount = 0;
let errorLock = false;
let currentRoute = null;
let currentQuestions = [];
let currentQuestionIndex = 0;
let currentLevel = 1;
let startTime;
let currentProgress = 'Level 1';
let currentExamAttempt = 1;
let examQuestions = [];
let hpMax = 2;
const gameFlow = [1, 2, 3, 'Dream', 4, 5, 6, 'Dream', 7, 8, 9, 'Dream', 10, 'Review'];
let currentLevelIndex = -1;
let currentLetterGoal = 1;
let blockingModalOpen = false;
let levelTransitioning = false;
let customNumberFailText = null;
let isHintUsedInLevel = false;
let springHintUsedInRun = false;
let dreamGambleAutoActivate = false;
let mismatchCounter = 0;
let bgmAudio = null;
let bgmEnabled = true;
let bgmVolume = 0.0;
let audioCtx = null;
let sfxEnabled = true;
let sfxVolume = 0.6;
let orderFailed = false;
let cloudSyncDisabled = false;
let lastRunId = null;
let clickFxEnabled = true;
function debounce(fn, wait) {
  let t = null;
  return function() {
    const ctx = this;
    const args = arguments;
    if (t) clearTimeout(t);
    t = setTimeout(function() { fn.apply(ctx, args); }, wait);
  };
}

function getCoinsKey() {
  try {
    if (devModeEnabled) return 'hanliu_dev_coins';
    if (isAccountBound()) {
      const acc = getStoredAccount();
      const id = acc && acc.id ? String(acc.id) : 'guest';
      return `hanliu_acc_${id}_coins`;
    }
    return 'hanliu_guest_coins';
  } catch { return 'hanliu_guest_coins'; }
}
let userCoins = (() => { try { const v = localStorage.getItem(getCoinsKey()); return v ? Number(v) || 0 : 0; } catch { return 0; } })();
let __profileSyncTimer = null;
function scheduleProfileSync() {
  try {
    if (!isAccountBound()) return;
    if (__profileSyncTimer) { clearTimeout(__profileSyncTimer); __profileSyncTimer = null; }
    __profileSyncTimer = setTimeout(() => { try { syncProfileToCloud(buildProfileFromLocal()); } catch {} }, 400);
  } catch {}
}
function saveCoins() { try { localStorage.setItem(getCoinsKey(), String(userCoins)); } catch {} scheduleProfileSync(); }
function updateCoinsDisplay() { try { if (coinsDisplay) { coinsDisplay.textContent = devModeEnabled ? '貨幣：∞' : `貨幣：${userCoins}`; } } catch {} }
function addCoins(n) { const v = Number(n || 0); if (v > 0) { userCoins += v; saveCoins(); updateCoinsDisplay(); } }
function reloadCoins() { try { userCoins = Number(localStorage.getItem(getCoinsKey()) || 0) || 0; updateCoinsDisplay(); } catch {} }
updateCoinsDisplay();
let isFirstLoginFreeDraw = false;
function showCoinsOnHome() { try { if (coinsDisplay) { coinsDisplay.hidden = false; coinsDisplay.textContent = devModeEnabled ? '貨幣：∞' : `貨幣：${userCoins}`; } } catch {} }
function hideCoins() { try { if (coinsDisplay) coinsDisplay.hidden = true; } catch {} }
function openCoinsHelp() {
  const overlay = document.createElement('div');
  overlay.className = 'modal-backdrop active-block';
  const modal = document.createElement('div');
  modal.className = 'modal';
  const close = document.createElement('button');
  close.className = 'modal-close';
  close.type = 'button';
  close.textContent = '×';
  close.addEventListener('click', () => { try { document.body.removeChild(overlay); } catch {} });
  const title = document.createElement('h2');
  title.className = 'modal-title';
  title.textContent = '貨幣獲取方法';
  const a = document.createElement('p'); a.className = 'dialog-text'; a.textContent = '每日領賞：每日首次領取 +1';
  const b = document.createElement('p'); b.className = 'dialog-text'; b.textContent = '結算換算：分數 ÷ 100 向下取整（一次一局）';
  const c = document.createElement('p'); c.className = 'dialog-text'; c.textContent = '特殊事件：部分稀有事件可能贈送';
  modal.appendChild(close);
  modal.appendChild(title);
  modal.appendChild(a);
  modal.appendChild(b);
  modal.appendChild(c);
  overlay.appendChild(modal);
  document.body.appendChild(overlay);
}
(() => {
  if (!coinsDisplay) return;
  let t = null;
  const start = () => { try { clearTimeout(t); } catch {} t = setTimeout(openCoinsHelp, 650); };
  const cancel = () => { try { clearTimeout(t); } catch {} t = null; };
  coinsDisplay.addEventListener('pointerdown', start);
  coinsDisplay.addEventListener('pointerup', cancel);
  coinsDisplay.addEventListener('pointerleave', cancel);
  coinsDisplay.addEventListener('touchstart', start);
  coinsDisplay.addEventListener('touchend', cancel);
})();

let currentLevelMistakes = 0;
let dreamGambleActive = false;
let surviveNegationUsed = false;
let levelScoreSuppressed = false;
function storageKey(base) {
  if (devModeEnabled) return `hanliu_dev_${base}`;
  if (isAccountBound()) {
    const acc = getStoredAccount();
    const id = acc && acc.id ? String(acc.id) : 'guest';
    return `hanliu_acc_${id}_${base}`;
  }
  return `hanliu_guest_${base}`;
}
const CARD_DATA = [
  { id: 'card_exile', name: '夕貶潮州', rarity: 'SR', desc: '一封朝奏九重天，夕貶潮州路八千。被貶潮州前不會死亡；但每關依錯誤次數扣分。' },
  { id: 'card_dream', name: '莊周夢蝶', rarity: 'N', desc: '莫憂世事兼身事，須著人間比夢間。作夢關卡可選擇觸發，使稀有事件發生機率提高 10%；攜帶出征即視同使用，該局結算扣除。' },
  { id: 'card_spring', name: '早春小雨', rarity: 'R', desc: '天街小雨潤如酥，草色遙看近卻無。適用關卡顯示「小雨提示」高亮正解；通關後依失誤：完美 +5，失誤 -5。' },
  { id: 'card_memorial', name: '諫迎佛骨', rarity: 'SSR', desc: '欲為聖明除弊事，肯將衰朽惜殘年！一血挑戰：生命上限 1；每關通關後額外 +10 分。', effectType: 'HARDCORE_SCORE', hpLimit: 1, bonusPerLevel: 10 },
  { id: 'card_dragon', name: '寒泉化龍', rarity: 'N', desc: '聞說旱時求得雨，只疑科斗是蛟龍。完成最後一關後結算時間偏移 -5 秒，用於排行榜與迴光返照判定。', effectType: 'TIME_BUFF' },
  { id: 'card_survive', name: '蠻荒餘生', rarity: 'N', desc: '竄逐蠻荒幸不死，衣食才足甘長終。裝備此卡可在一血扣血時抵銷一次傷害，但該關卡通關不會獲得分數。', effectType: 'SURVIVE_ONE' },
];
const TIME_BUFF = -5000;
function getCardName(id) { const f = CARD_DATA.find(x => x.id === id); return f ? f.name : id; }
function getCardRarity(id) { const f = CARD_DATA.find(x => x.id === id); return f ? f.rarity : ''; }
function getCardImage(id) {
  const map = {
    card_exile: 'card_exile.png',
    card_dream: 'card_dream.png',
    card_spring: 'card_spring.png',
    card_memorial: 'card_memorial.png',
    card_dragon: 'card_dragon.png',
    card_survive: 'card_survive.png',
  };
  return map[id] || '';
}
function drawCard() {
  const r = Math.random() * 100;
  let tier = 'N';
  if (r < DRAW_RATE.SSR) tier = 'SSR';
  else if (r < (DRAW_RATE.SSR + DRAW_RATE.SR)) tier = 'SR';
  else if (r < (DRAW_RATE.SSR + DRAW_RATE.SR + DRAW_RATE.R)) tier = 'R';
  else tier = 'N';
  const pool = CARD_DATA.filter(c => c.rarity === tier);
  const pick = pool.length ? pool[Math.floor(Math.random() * pool.length)] : (CARD_DATA[Math.floor(Math.random() * CARD_DATA.length)]);
  return pick;
}
function loadInventory() { try { const raw = localStorage.getItem(storageKey('inventory')); const arr = raw ? JSON.parse(raw) : []; return Array.isArray(arr) ? arr : []; } catch { return []; } }
function saveInventory(list) { try { localStorage.setItem(storageKey('inventory'), JSON.stringify(list || [])); } catch {} scheduleProfileSync(); }
let selectedCardId = (() => { try { return localStorage.getItem(storageKey('selected_card')) || ''; } catch { return ''; } })();
function setSelectedCard(id) { selectedCardId = id || ''; try { localStorage.setItem(storageKey('selected_card'), selectedCardId); } catch {} renderSelectCardArea(); if (equipExileCard) equipExileCard.checked = (selectedCardId === 'card_exile'); scheduleProfileSync(); }
function ensureDefaultExileCard() {}
function renderSelectCardArea() {
  if (!selectCardArea) return;
  const inv = loadInventory();
  selectCardArea.innerHTML = '';
  if (!inv.length) { const p = document.createElement('p'); p.className = 'dialog-text'; p.textContent = '裝備卡片：尚未獲得卡片'; selectCardArea.appendChild(p); return; }
  const label = document.createElement('p'); label.className = 'dialog-text'; label.textContent = '裝備卡片：點擊選擇';
  selectCardArea.appendChild(label);
  inv.forEach((id, idx) => {
    const btn = document.createElement('button');
    btn.type = 'button';
    btn.className = 'card-item';
    if (id === selectedCardId) btn.classList.add('selected');
    btn.textContent = getCardName(id);
    btn.addEventListener('click', () => setSelectedCard(id));
    selectCardArea.appendChild(btn);
  });
}
renderSelectCardArea();
if (equipExileCard) {
  equipExileCard.checked = (selectedCardId === 'card_exile');
  equipExileCard.addEventListener('change', () => {
    const inv = loadInventory();
    if (equipExileCard.checked) {
      if (inv.includes('card_exile')) setSelectedCard('card_exile');
      else equipExileCard.checked = false;
    } else {
      if (selectedCardId === 'card_exile') setSelectedCard('');
    }
  });
}
function openCardManager() {
  const overlay = document.createElement('div');
  overlay.className = 'modal-backdrop active-block';
  const modal = document.createElement('div');
  modal.className = 'modal';
  const close = document.createElement('button');
  close.className = 'modal-close';
  close.type = 'button';
  close.textContent = '×';
  close.addEventListener('click', () => { try { document.body.removeChild(overlay); } catch {} });
  const title = document.createElement('h2');
  title.className = 'modal-title';
  title.textContent = '卡片背包';
  const mode = document.createElement('p');
  mode.className = 'dialog-text';
  mode.textContent = `模式：${devModeEnabled ? '開發者' : '一般'}｜上限：${devModeEnabled ? '無限制' : '5 張'}`;
  const list = document.createElement('div');
  list.className = 'card-select';
  const inv = loadInventory();
  const render = () => {
    list.innerHTML = '';
    const cur = loadInventory();
    cur.forEach((id) => {
      const row = document.createElement('div');
      row.className = `card-item rar-${getCardRarity(id)}`;
       if (id === selectedCardId) row.classList.add('selected');
       const name = document.createElement('span'); name.textContent = `${getCardName(id)}（${getCardRarity(id)}）`;
       const equip = document.createElement('button'); equip.className = 'button'; equip.type = 'button'; equip.textContent = '裝備'; equip.style.marginLeft = '8px';
       const del = document.createElement('button'); del.className = 'button'; del.type = 'button'; del.textContent = '刪除'; del.style.marginLeft = '8px';
      equip.addEventListener('click', (e) => { e.stopPropagation(); setSelectedCard(id); render(); });
      const confirmDelete = () => {
        const ov = document.createElement('div'); ov.className = 'modal-backdrop active-block';
        const md = document.createElement('div'); md.className = 'modal';
        const x = document.createElement('button'); x.className = 'modal-close'; x.type = 'button'; x.textContent = '×';
        x.addEventListener('click', () => { try { document.body.removeChild(ov); } catch {} });
        const t = document.createElement('h2'); t.className = 'modal-title'; t.textContent = '刪除卡片';
        const msg = document.createElement('p'); msg.className = 'dialog-text'; msg.textContent = `是否確定刪除「${getCardName(id)}（${getCardRarity(id)}）」？`;
        const actions = document.createElement('div'); actions.className = 'modal-actions';
        const ok = document.createElement('button'); ok.className = 'button'; ok.type = 'button'; ok.textContent = '確定刪除';
        ok.addEventListener('click', () => {
          const arr = loadInventory();
          const ix = arr.indexOf(id);
          if (ix >= 0) arr.splice(ix, 1);
          saveInventory(arr);
          if (selectedCardId === id) setSelectedCard('');
          try { document.body.removeChild(ov); } catch {}
          render();
        });
        const cancel = document.createElement('button'); cancel.className = 'button'; cancel.type = 'button'; cancel.textContent = '取消';
        cancel.addEventListener('click', () => { try { document.body.removeChild(ov); } catch {} });
        actions.appendChild(ok); actions.appendChild(cancel);
        md.appendChild(x); md.appendChild(t); md.appendChild(msg); md.appendChild(actions);
        ov.appendChild(md); document.body.appendChild(ov);
      };
      del.addEventListener('click', (e) => { e.stopPropagation(); confirmDelete(); });
      row.addEventListener('click', (e) => {
        const btn = (e.target && e.target.closest) ? e.target.closest('button') : null;
        if (btn) return;
        openInventoryCardDetail(id);
      });
      row.appendChild(name);
      row.appendChild(equip);
      row.appendChild(del);
      list.appendChild(row);
    });
    if (!cur.length) {
      const empty = document.createElement('p'); empty.className = 'dialog-text'; empty.textContent = '目前尚無卡片';
      list.appendChild(empty);
    }
  };
  render();
  const actions = document.createElement('div'); actions.className = 'actions';
  const closeBtn = document.createElement('button'); closeBtn.className = 'button'; closeBtn.type = 'button'; closeBtn.textContent = '關閉'; closeBtn.addEventListener('click', () => { try { document.body.removeChild(overlay); } catch {} });
  actions.appendChild(closeBtn);
  modal.appendChild(close);
  modal.appendChild(title);
  modal.appendChild(mode);
  modal.appendChild(list);
  modal.appendChild(actions);
  overlay.appendChild(modal);
  document.body.appendChild(overlay);
}
if (cardManagerBtn) cardManagerBtn.addEventListener('click', openCardManager);

function initBgm() {
  if (bgmAudio) return;
  const el = document.getElementById('bgm');
  if (el && el.tagName === 'AUDIO') {
    bgmAudio = el;
  } else {
    bgmAudio = new Audio('music1.mp3');
  }
  bgmAudio.loop = true;
  bgmAudio.preload = 'auto';
  bgmAudio.autoplay = true;
  bgmAudio.muted = false;
  bgmVolume = getStoredVolume();
  bgmAudio.volume = bgmVolume;
}
function getStoredVolume() {
  try {
    const v = parseFloat(localStorage.getItem('hanliu_bgm_volume'));
    if (!isNaN(v) && v >= 0 && v <= 1) return v;
  } catch {}
  return bgmVolume;
}
function setStoredVolume(v) {
  try { localStorage.setItem('hanliu_bgm_volume', String(v)); } catch {}
}
function getStoredSfxVolume() {
  try {
    const v = parseFloat(localStorage.getItem('hanliu_sfx_volume'));
    if (!isNaN(v) && v >= 0 && v <= 1) return v;
  } catch {}
  return sfxVolume;
}
function setStoredSfxVolume(v) {
  try { localStorage.setItem('hanliu_sfx_volume', String(v)); } catch {}
}
function getStoredClickFxEnabled() {
  try {
    const v = localStorage.getItem('hanliu_click_fx');
    if (v === '0') return false;
    if (v === '1') return true;
  } catch {}
  return true;
}
function setStoredClickFxEnabled(v) {
  try { localStorage.setItem('hanliu_click_fx', v ? '1' : '0'); } catch {}
}
function ensureAudioCtx() {
  if (audioCtx) return;
  try { audioCtx = new (window.AudioContext || window.webkitAudioContext)(); } catch {}
}
function resumeAudioCtx() {
  try { if (audioCtx && audioCtx.state === 'suspended') audioCtx.resume(); } catch {}
}
function triggerShakeEffect() {
  const el = document.body;
  if (!el) return;
  el.classList.add('shaking');
  setTimeout(() => { try { el.classList.remove('shaking'); } catch {} }, 500);
}
function playClick() {
  if (!sfxEnabled) return;
  ensureAudioCtx();
  if (!audioCtx) return;
  const t = audioCtx.currentTime;
  const osc = audioCtx.createOscillator();
  const gain = audioCtx.createGain();
  if ((sfxVolume || 0) <= 0) return;
  const base = Math.max(0, Math.min(1, (sfxVolume || 0)));
  gain.gain.setValueAtTime(base, t);
  gain.gain.exponentialRampToValueAtTime(0.001, t + 0.08);
  osc.type = 'square';
  osc.frequency.setValueAtTime(1100, t);
  osc.connect(gain);
  gain.connect(audioCtx.destination);
  osc.start(t);
  osc.stop(t + 0.09);
}

function sfxSuccess() {
  if (!sfxEnabled) return;
  ensureAudioCtx();
  if (!audioCtx) return;
  if ((sfxVolume || 0) <= 0) return;
  const t = audioCtx.currentTime;
  const g = audioCtx.createGain();
  g.gain.setValueAtTime(Math.max(0, (sfxVolume || 0) * 0.8), t);
  g.gain.exponentialRampToValueAtTime(0.001, t + 0.6);
  const o1 = audioCtx.createOscillator();
  const o2 = audioCtx.createOscillator();
  o1.type = 'sine';
  o2.type = 'triangle';
  o1.frequency.setValueAtTime(660, t);
  o1.frequency.linearRampToValueAtTime(880, t + 0.2);
  o2.frequency.setValueAtTime(990, t + 0.05);
  o2.frequency.linearRampToValueAtTime(1320, t + 0.25);
  o1.connect(g); o2.connect(g);
  g.connect(audioCtx.destination);
  o1.start(t); o2.start(t);
  o1.stop(t + 0.3); o2.stop(t + 0.3);
}

function sfxError() {
  if (!sfxEnabled) return;
  ensureAudioCtx();
  if (!audioCtx) return;
  if ((sfxVolume || 0) <= 0) return;
  const t = audioCtx.currentTime;
  const g = audioCtx.createGain();
  g.gain.setValueAtTime(Math.max(0, (sfxVolume || 0) * 0.7), t);
  g.gain.exponentialRampToValueAtTime(0.001, t + 0.25);
  const o = audioCtx.createOscillator();
  o.type = 'sawtooth';
  o.frequency.setValueAtTime(600, t);
  o.frequency.linearRampToValueAtTime(220, t + 0.18);
  o.connect(g);
  g.connect(audioCtx.destination);
  o.start(t);
  o.stop(t + 0.22);
}

function sfxCoin() {
  if (!sfxEnabled) return;
  ensureAudioCtx();
  if (!audioCtx) return;
  if ((sfxVolume || 0) <= 0) return;
  const t = audioCtx.currentTime;
  const g = audioCtx.createGain();
  g.gain.setValueAtTime(Math.max(0, (sfxVolume || 0)), t);
  g.gain.exponentialRampToValueAtTime(0.001, t + 0.15);
  const o = audioCtx.createOscillator();
  o.type = 'square';
  o.frequency.setValueAtTime(1200, t);
  o.frequency.exponentialRampToValueAtTime(1800, t + 0.1);
  o.connect(g);
  g.connect(audioCtx.destination);
  o.start(t);
  o.stop(t + 0.12);
}

function sfxDamage() {
  if (!sfxEnabled) return;
  ensureAudioCtx();
  if (!audioCtx) return;
  if ((sfxVolume || 0) <= 0) return;
  const t = audioCtx.currentTime;
  const len = Math.floor(audioCtx.sampleRate * 0.18);
  const buf = audioCtx.createBuffer(1, len, audioCtx.sampleRate);
  const data = buf.getChannelData(0);
  for (let i = 0; i < len; i++) { data[i] = (Math.random() * 2 - 1) * 0.9; }
  const src = audioCtx.createBufferSource();
  src.buffer = buf;
  const bp = audioCtx.createBiquadFilter();
  bp.type = 'bandpass';
  bp.frequency.setValueAtTime(400, t);
  bp.Q.setValueAtTime(8, t);
  const g = audioCtx.createGain();
  g.gain.setValueAtTime(Math.max(0, (sfxVolume || 0) * 0.8), t);
  g.gain.exponentialRampToValueAtTime(0.001, t + 0.18);
  src.connect(bp);
  bp.connect(g);
  g.connect(audioCtx.destination);
  src.start(t);
}

function sfxWhoosh() {
  if (!sfxEnabled) return;
  ensureAudioCtx();
  if (!audioCtx) return;
  if ((sfxVolume || 0) <= 0) return;
  const t = audioCtx.currentTime;
  const len = Math.floor(audioCtx.sampleRate * 0.35);
  const buf = audioCtx.createBuffer(1, len, audioCtx.sampleRate);
  const data = buf.getChannelData(0);
  for (let i = 0; i < len; i++) { data[i] = (Math.random() * 2 - 1); }
  const src = audioCtx.createBufferSource();
  src.buffer = buf;
  const lp = audioCtx.createBiquadFilter();
  lp.type = 'lowpass';
  lp.frequency.setValueAtTime(600, t);
  lp.frequency.linearRampToValueAtTime(2200, t + 0.32);
  const g = audioCtx.createGain();
  g.gain.setValueAtTime(Math.max(0, (sfxVolume || 0) * 0.6), t);
  g.gain.exponentialRampToValueAtTime(0.001, t + 0.35);
  src.connect(lp);
  lp.connect(g);
  g.connect(audioCtx.destination);
  src.start(t);
}

function playBgm() {
  if (!bgmEnabled) return;
  if (!bgmAudio) initBgm();
  const p = bgmAudio.play();
  if (p && typeof p.catch === 'function') { p.catch(() => { try { showAudioEnableTip(); } catch {} }); }
}

function pauseBgm() {
  if (bgmAudio) { try { bgmAudio.pause(); } catch {} }
}

function toggleBgm() {
  bgmEnabled = !bgmEnabled;
  if (bgmEnabled) playBgm(); else pauseBgm();
  const btn = document.getElementById('bgmToggle');
  if (btn) btn.textContent = bgmEnabled ? '♪' : '🔇';
}

function setupBgmAutoplay() {
  if (window.__bgmSetup) return;
  window.__bgmSetup = true;
  const handler = () => {
    initBgm();
    try { if (bgmAudio) { bgmAudio.muted = false; bgmAudio.volume = bgmVolume; } } catch {}
    playBgm();
    try { const tip = document.getElementById('audioTip'); if (tip) tip.remove(); } catch {}
    document.removeEventListener('click', handler);
    document.removeEventListener('keydown', handler);
  };
  document.addEventListener('click', handler, { once: true });
  document.addEventListener('keydown', handler, { once: true });
}

function showAudioEnableTip() {
  if (document.getElementById('audioTip')) return;
  const tip = document.createElement('div');
  tip.id = 'audioTip';
  tip.className = 'audio-tip';
  const text = document.createElement('span');
  text.className = 'audio-tip-text';
  text.textContent = '點一下開啟音樂';
  tip.appendChild(text);
  document.body.appendChild(tip);
}

let isGameOver = false;
const timerRegistry = { intervals: new Set(), timeouts: new Set() };
function trackedSetInterval(fn, ms) { const id = setInterval(fn, ms); timerRegistry.intervals.add(id); return id; }
function trackedSetTimeout(fn, ms) { const id = setTimeout(fn, ms); timerRegistry.timeouts.add(id); return id; }
function clearAllTimers() { timerRegistry.intervals.forEach((id) => clearInterval(id)); timerRegistry.timeouts.forEach((id) => clearTimeout(id)); timerRegistry.intervals.clear(); timerRegistry.timeouts.clear(); window.scoreDisplayIntervalId = null; }
function systemCleanup(lockGame) { clearAllTimers(); if (lockGame === true) isGameOver = true; }
function bumpScore(amount) {
  matchScore += amount;
  const bar = document.getElementById('hpBar');
  const stEl = document.getElementById('scoreText');
  if (stEl) stEl.textContent = String(matchScore || 0);
  if (!bar || amount === 0) return;
  const tip = document.createElement('div');
  tip.className = 'score-float';
  if (amount < 0) tip.classList.add('neg');
  tip.textContent = `${amount > 0 ? '+' : ''}${amount}`;
  bar.appendChild(tip);
  tip.addEventListener('animationend', () => { tip.remove(); });
  const st = document.getElementById('scoreText');
  if (st) {
    st.classList.add('score-bump');
    st.addEventListener('animationend', () => { st.classList.remove('score-bump'); }, { once: true });
  }
}

function getLevelType(item) {
  if (typeof item === 'number') return 'Number';
  if (item === 'Dream') return 'Dream';
  if (item === 'Review') return 'Review';
  return 'Unknown';
}

function getCharacterVersion() {
  if (currentLevel === 5) return 'youth';
  if (currentLevel <= 3) return 'youth';
  if (currentLevel <= 6) return 'middle';
  return 'aged';
}

function applyLevelStyle(levelType) {
  const root = document.documentElement;
  if (levelType === 'Number') { levelScoreSuppressed = false; }
  if (levelType === 'Number') {
    root.style.setProperty('--bg', '#fff');
    root.style.setProperty('--fg', '#000000');
    root.style.setProperty('--muted', '#4a5b6b');
    root.style.setProperty('--title', '#000000');
  } else if (levelType === 'Dream') {
    root.style.setProperty('--bg', '#000000');
    root.style.setProperty('--fg', '#ffffff');
    root.style.setProperty('--muted', '#cfcfcf');
    root.style.setProperty('--title', '#ffffff');
  } else if (levelType === 'Review') {
    root.style.setProperty('--bg', '#1a1a1a');
    root.style.setProperty('--fg', '#cfcfcf');
    root.style.setProperty('--muted', '#9aa0a6');
    root.style.setProperty('--title', '#f7fbff');
  }
}

function updateCharacterDisplay() {
  const wrap = document.getElementById('characterDisplay');
  if (!wrap) return;
  const img = document.getElementById('characterImage') || wrap.querySelector('img');
  const ver = getCharacterVersion();
  const src = ver === 'youth' ? 'han_yu_youth.png' : ver === 'middle' ? 'han_yu_middle.png' : 'han_yu_aged.png';
  if (img) img.src = src;
  wrap.hidden = false;
}

function hideCharacterDisplay() {
  const wrap = document.getElementById('characterDisplay');
  if (wrap) wrap.hidden = true;
}

function finalizeGame() {
  systemCleanup(true);
  try {
    Array.from(document.querySelectorAll('.modal-backdrop.active-block')).forEach(el => { try { document.body.removeChild(el); } catch { el.remove(); } });
    blockingModalOpen = false;
  } catch {}
  const playerName = localStorage.getItem('hanliu_player_name') || '無名';
  const route = currentRoute || 'HanYu';
  const rk = computeRank(matchScore, orderFailed);
  const finishAndRender = () => {
    consumeCard();
    renderLeaderboardPage(route, '結算：本局結果如下');
  };
  if (!orderFailed) {
    const atEnd = Array.isArray(gameFlow) ? (currentLevelIndex >= gameFlow.length) : false;
    if (atEnd || currentProgress === 'Review') { currentProgress = 'Completed'; }
  } else {
    if (currentProgress === 'Review') currentProgress = 'Failed at Review';
    // 保留先前的失敗文字，例如 Number 關卡的 "Failed at Level X"
  }
  if (route === 'HanYu' && rk && rk.level === 'SS') {
    saveScore(playerName, matchScore, route);
    showBlockModal('傳說', [
      { image: 'hanyu_ss.png', alt: '泰山北斗', text: '唯有韓愈能超越韓愈。你立於群山之巔，視天下為筆墨，文道與山河同在。' }
    ], finishAndRender);
    return;
  }
  if (rk && rk.level === 'S') {
    saveScore(playerName, matchScore, route);
    showBlockModal('百代文宗', [
      { image: 'hanyu_s.png', alt: '百代文宗', text: '匹夫而為百世師，一言而為天下法。你的靈魂與韓昌黎完全共振，文能載道，武能平亂。' }
    ], finishAndRender);
    return;
  }
  if (rk && rk.level === 'A') {
    saveScore(playerName, matchScore, route);
    showBlockModal('唐宋八大家之首', [
      { image: 'hanyu_a.png', alt: '唐宋八大家之首', text: '文筆雄健，氣勢磅礡。雖偶有波折，但你堅持古文運動，力抗流俗。你的名字將與柳宗元並列，永載史冊。' }
    ], finishAndRender);
    return;
  }
  if (rk && rk.level === 'B') {
    saveScore(playerName, matchScore, route);
    showBlockModal('剛直名臣', [
      { image: 'hanyu_b.png', alt: '剛直名臣', text: '你性格剛直，不畏強權。雖然在文學上的細膩度稍遜一籌，但你的一身傲骨與經世濟民的熱忱，足以立足朝堂。' }
    ], finishAndRender);
    return;
  }
  if (rk && rk.level === 'C') {
    saveScore(playerName, matchScore, route);
    showBlockModal('國子監祭酒', [
      { image: 'hanyu_c.png', alt: '國子監祭酒', text: '業精於勤荒於嬉。你對韓學有所涉獵，但尚未融會貫通。你在國子監授課，台下學生或睡或點頭。' }
    ], finishAndRender);
    return;
  }
  if (rk && rk.level === 'D') {
    saveScore(playerName, matchScore, route);
    showBlockModal('時運不濟', [
      { image: 'hanyu_d.png', alt: '落第秀才', text: '二鳥賦中歎不遇，你的才華似乎還需要時間打磨。或者，你其實更適合去隔壁棚找李白喝酒？' }
    ], finishAndRender);
    return;
  }
  if (rk && rk.level === 'E') {
    saveScore(playerName, matchScore, route);
    showBlockModal('非我族類', [
      { image: 'han_yu_aged_dead.png', alt: '非我族類', text: rk.description }
    ], finishAndRender);
    return;
  }
  saveScore(playerName, matchScore, route);
  finishAndRender();
}

function consumeCard() {
  if (selectedCardId === 'card_dream') {
    try {
      const raw = localStorage.getItem('hanliu_inventory');
      let arr = raw ? JSON.parse(raw) : [];
      const idx = arr.indexOf('card_dream');
      if (idx >= 0) {
        arr.splice(idx, 1);
        localStorage.setItem('hanliu_inventory', JSON.stringify(arr));
      }
    } catch {}
  }
}

function handleError(levelType) {
  if (levelType === 'Dream') {
    const main = document.querySelector('main.container');
    const sec = document.createElement('section');
    sec.className = 'dialog-container';
    const p = document.createElement('p');
    p.className = 'dialog-text';
    p.textContent = '夢醒了，進入下一關';
    const next = document.createElement('button');
    next.className = 'button';
    next.type = 'button';
    next.textContent = '下一關';
    next.addEventListener('click', () => { sec.remove(); goToNextLevel(); });
    sec.appendChild(p);
    sec.appendChild(next);
    main.appendChild(sec);
    return;
  }
  if (levelType === 'Number') {
    if (errorLock) return;
    errorLock = true;
    const protectedByExile = (selectedCardId === 'card_exile' && currentLevel < 8);
    currentLevelMistakes = (Number(currentLevelMistakes || 0) + 1);
    if (protectedByExile) {
      updateHpBar();
      try { sfxError(); sfxDamage(); } catch {}
      try { triggerShakeEffect(); } catch {}
      const penalty = (10 + Math.max(0, currentLevelMistakes - 2));
      showPunishOverlay();
      showBlockModal('提示', [{ text: `夕貶潮州：命運庇護中。目前該關扣分：${penalty}` }]);
      setTimeout(() => {
        errorLock = false;
        if (currentLevel === 8 && typeof window.level8Reset === 'function') { window.level8Reset(); }
        if (currentLevel === 9 && typeof window.level9Reset === 'function') { window.level9Reset(); }
        if (currentLevel === 10 && typeof window.level10Reset === 'function') { window.level10Reset(); }
      }, 2000);
      return;
    }
    if (hpMax === 1 && selectedCardId === 'card_survive' && !surviveNegationUsed) {
      surviveNegationUsed = true;
      levelScoreSuppressed = true;
      updateHpBar();
      try { sfxError(); } catch {}
      showPunishOverlay();
      showBlockModal('提示', [{ text: '蠻荒餘生：抵銷一次一血傷害。本關結算分數為 0。' }]);
      setTimeout(() => {
        errorLock = false;
        if (currentLevel === 8 && typeof window.level8Reset === 'function') { window.level8Reset(); }
        if (currentLevel === 9 && typeof window.level9Reset === 'function') { window.level9Reset(); }
        if (currentLevel === 10 && typeof window.level10Reset === 'function') { window.level10Reset(); }
      }, 2000);
      return;
    }
    errorCount += 1;
    updateHpBar();
    try { sfxError(); sfxDamage(); } catch {}
    try { triggerShakeEffect(); } catch {}
    if (errorCount === 1 && selectedCardId !== 'card_memorial') {
      showPunishOverlay();
      setTimeout(() => {
        errorLock = false;
        if (currentLevel === 8 && typeof window.level8Reset === 'function') { window.level8Reset(); }
        if (currentLevel === 9 && typeof window.level9Reset === 'function') { window.level9Reset(); }
        if (currentLevel === 10 && typeof window.level10Reset === 'function') { window.level10Reset(); }
      }, 2000);
      return;
    }
    systemCleanup(true);
    clearMainContent(true);
    hideCharacterDisplay();
    hideHpBar();
    try { sfxDamage(); } catch {}
  try { triggerShakeEffect(); } catch {}
    if (currentLevel === 8) {
      const overlay = document.createElement('div');
      overlay.className = 'punish-overlay';
      const sym = document.createElement('div');
      sym.className = 'punish-symbol';
      sym.textContent = '🐊';
      overlay.appendChild(sym);
      document.body.appendChild(overlay);
      sym.addEventListener('animationend', () => { overlay.remove(); });
    }
    const main = document.querySelector('main.container');
    const death = document.createElement('section');
    death.className = 'dialog-container';
    const stage = getCharacterVersion();
    const img = document.createElement('img');
    img.alt = '死亡畫面';
    img.src = stage === 'youth' ? 'han_yu_youth_dead.png' : stage === 'middle' ? 'han_yu_middle_dead.png' : 'han_yu_aged_dead.png';
    img.style.maxWidth = '280px';
    img.style.border = '1px solid #2a2a2a';
    img.style.borderRadius = '10px';
    try { unlockIllustration(img.src); } catch {}
    const text = document.createElement('p');
    text.className = 'dialog-text';
    text.textContent = customNumberFailText || '你終究未能完成兄嫂的囑託，遺憾地結束了這段困頓的求仕之旅...';
    death.appendChild(img);
    death.appendChild(text);
    main.appendChild(death);
    setTimeout(() => {
      death.remove();
      currentProgress = `Failed at Level ${currentLevel}`;
      currentRoute = currentRoute || 'HanYu';
      finalizeGame();
      errorLock = false;
      customNumberFailText = null;
    }, 2500);
  }
}

function goToNextLevel() {
  // keep lock during transition to prevent multi-advance on rapid clicks
  systemCleanup(false);
  clearMainContent(true);
  currentLevelIndex += 1;
  const item = gameFlow[currentLevelIndex];
  if (item === undefined) { finalizeGame(); return; }
  const type = getLevelType(item);
  if (type === 'Number') currentLevel = item;
  if (type === 'Review') currentLevel = 10;
  if (type === 'Dream' && selectedCardId === 'card_dream') {
    const overlay = document.createElement('div');
    overlay.className = 'modal-backdrop active-block';
    const modal = document.createElement('div');
    modal.className = 'modal';
    const close = document.createElement('button');
    close.className = 'modal-close';
    close.type = 'button';
    close.textContent = '×';
    const doSkip = () => {
      try { document.body.removeChild(overlay); } catch {}
      blockingModalOpen = false;
      dreamGambleAutoActivate = false;
      applyLevelStyle(type);
      currentProgress = 'Dream';
      updateCharacterDisplay();
      showHpBar();
      updateHpBar();
      startDreamLevel();
    };
    close.addEventListener('click', doSkip);
    const title = document.createElement('h2');
    title.className = 'modal-title';
    title.textContent = '提示';
    const p = document.createElement('p');
    p.className = 'dialog-text';
    p.textContent = '是否使用莊周夢蝶觸發稀有事件？';
    const actions = document.createElement('div');
    actions.className = 'modal-actions';
    const useBtn = document.createElement('button');
    useBtn.className = 'button';
    useBtn.type = 'button';
    useBtn.textContent = '使用';
    useBtn.addEventListener('click', () => {
      dreamGambleAutoActivate = true;
      try { document.body.removeChild(overlay); } catch {}
      blockingModalOpen = false;
      applyLevelStyle(type);
      currentProgress = 'Dream';
      updateCharacterDisplay();
      showHpBar();
      updateHpBar();
      startDreamLevel();
    });
    const skipBtn = document.createElement('button');
    skipBtn.className = 'button';
    skipBtn.type = 'button';
    skipBtn.textContent = '跳過';
    skipBtn.addEventListener('click', doSkip);
    actions.appendChild(useBtn);
    actions.appendChild(skipBtn);
    modal.appendChild(close);
    modal.appendChild(title);
    modal.appendChild(p);
    modal.appendChild(actions);
    overlay.appendChild(modal);
    document.body.appendChild(overlay);
    blockingModalOpen = true;
    return;
  }
  applyLevelStyle(type);
  if (type === 'Number') { currentLevelMistakes = 0; isHintUsedInLevel = false; }
  if (type === 'Number') currentProgress = `Level ${currentLevel}`;
  if (type === 'Dream') currentProgress = 'Dream';
  if (type === 'Review') currentProgress = 'Review';
  if (type === 'Number' || type === 'Dream') updateCharacterDisplay();
  if (type === 'Number' || type === 'Dream') { showHpBar(); updateHpBar(); }
  if (type === 'Number') {
    startNumberLevel(item);
  } else if (type === 'Dream') {
    startDreamLevel();
  } else if (type === 'Review') {
    startReviewLevel();
  }
  setTimeout(() => { levelTransitioning = false; }, 250);
}

function startNumberLevel(n) {
  applyLevelStyle('Number');
  updateCharacterDisplay();
  showHpBar();
  updateHpBar();
  if (n === 1) { presentLevelIntro('第一關：句讀明義', '在題目中於適當處輸入「/」進行斷句，完成即通關。', startSentenceLevel); return; }
  if (n === 2) { presentLevelIntro('第二關：四次科舉', '點擊選項填入空格，依序完成四次試題，最後中進士。', startExamLevel); return; }
  if (n === 3) { presentLevelIntro('第三關：三次上書', '沿白色路徑移動，依序抵達三封「函」，再前往「公府」。錯誤會扣生命。', startLetterMazeLevel); return; }
  if (n === 4) { presentLevelIntro('第四關：結交孟郊', '先選詩名，後進行詩句填空。答對累積分數，完成後通關。', startPoetryLevel); return; }
  if (n === 5) { presentLevelIntro('第五關：五原立論', '記憶配對：翻牌找到每一組《原》與其學說，配對完成即通關。', startFiveOriginalsLevel); return; }
  if (n === 6) { presentLevelIntro('第六關：平定淮西', '移動滑條接住正確數字，避開錯誤與特殊項。達成目標後通關。', startHuaiXiLevel); return; }
  if (n === 7) { presentLevelIntro('第七關：諫迎佛骨', '第一段接住「佛」影響局勢；第二段以行動平衡怒氣、勸諫與朝臣支持。達成條件即通關。', startBuddhaBoneLevel); return; }
  if (n === 8) { presentLevelIntro('第八關：祭鱷魚文', '在棋盤上蛇形移動，依序吃到句子的字。撞牆或吃錯會受傷。', startCrocodileLevel); return; }
  if (n === 9) { presentLevelIntro('第九關：為友撰銘', '拖曳七段亂序段落排成正確順序，完成即通關；錯誤會受傷。', startEpitaphLevel); return; }
  if (n === 10) { startLevel10(); return; }
  const main = document.querySelector('main.container');
  const sec = document.createElement('section');
  sec.className = 'dialog-container';
  const p = document.createElement('p');
  p.className = 'dialog-text';
  p.textContent = `第 ${n} 關即將開始...`;
  const next = document.createElement('button');
  next.className = 'button';
  next.type = 'button';
  next.textContent = '下一關';
  let nextLocked = false;
  next.addEventListener('click', () => {
    if (nextLocked) return;
    nextLocked = true;
    next.disabled = true;
    sec.remove();
    goToNextLevel();
  });
  sec.appendChild(p);
  sec.appendChild(next);
  main.appendChild(sec);
}

function presentLevelIntro(titleText, descriptionText, onStart) {
  const main = document.querySelector('main.container');
  if (!main) return;
  let intro = document.getElementById('levelIntro');
  if (!intro) {
    intro = document.createElement('section');
    intro.className = 'dialog-container';
    intro.id = 'levelIntro';
    main.appendChild(intro);
  }
  intro.style.display = '';
  intro.innerHTML = '';
  const title = document.createElement('h2');
  title.className = 'modal-title';
  title.textContent = titleText || '關卡介紹';
  const desc = document.createElement('p');
  desc.className = 'dialog-text';
  desc.textContent = descriptionText || '';
  const startBtn = document.createElement('button');
  startBtn.className = 'button';
  startBtn.type = 'button';
  startBtn.textContent = '開始遊戲';
  let started = false;
  startBtn.addEventListener('click', () => {
    if (started) return;
    started = true;
    startBtn.disabled = true;
    intro.style.display = 'none';
    if (typeof onStart === 'function') onStart();
  });
  intro.appendChild(title);
  intro.appendChild(desc);
  intro.appendChild(startBtn);
}

function startBuddhaBoneLevel() {
  applyLevelStyle('Number');
  updateCharacterDisplay();
  if (selectedCardId === 'card_memorial') { hpMax = 1; }
  showHpBar();
  updateHpBar();
  const img = document.getElementById('characterImage');
  if (img) img.src = 'han_yu_aged.png';
  const main = document.querySelector('main.container');
  let level = document.getElementById('levelAdmonish');
  if (!level) {
    level = document.createElement('section');
    level.className = 'dialog-container';
    level.id = 'levelAdmonish';
    main.appendChild(level);
  } else {
    level.innerHTML = '';
    level.style.display = '';
  }
  const title = document.createElement('h2');
  title.className = 'modal-title';
  title.textContent = '第七關：諫迎佛骨';
  level.appendChild(title);

  let rageValue = 0;
  let pleaPoint = 0;
  let willpowerDebuff = false;

  const p1 = document.createElement('div');
  p1.className = 'catch-stage';
  const catcher = document.createElement('div');
  catcher.className = 'catcher';
  p1.appendChild(catcher);
  level.appendChild(p1);

  let running = false;
  const items = [];
  const rng = () => Math.random();
  const nowMs = () => performance.now();
  const ctrl = { x: 0.5, speed: 0.7 };
  function setCatcherX(nx) { ctrl.x = Math.max(0, Math.min(1, nx)); catcher.style.left = (ctrl.x * 100) + '%'; }
  setCatcherX(0.5);
  let lastTs = nowMs();
  let misses = 0;
  let p1Ended = false;
  function activeItems() { return items.filter(it => !it.removed && !it.caught); }
  function rectsIntersect(a, b) { return !(a.right < b.left || a.left > b.right || a.bottom < b.top || a.top > b.bottom); }

  function clearTokens() { tokens.forEach(t => { if (t.el && t.el.parentNode) t.el.parentNode.removeChild(t.el); }); tokens.length = 0; }
  function updateNextTokenHighlight() {
    tokens.forEach(t => {
      if (t.removed || !t.el) return;
      if (t.idx === nextIndex) t.el.classList.add('next');
      else t.el.classList.remove('next');
    });
  }
  function scatterTokens() {
    clearTokens();
    const placed = [];
    for (let i = 0; i < chars.length; i++) {
      const el = document.createElement('div');
      el.className = 'croc-token';
      el.textContent = chars[i];
      stage.appendChild(el);
      let x = 0, y = 0; let ok = false; let tries = 0;
      while (!ok && tries < 100) {
        x = 0.08 + rng() * 0.84;
        y = 0.10 + rng() * 0.76;
        const farFromHead = Math.hypot(ctrl.x - x, ctrl.y - y) > 0.16;
        ok = farFromHead && placed.every(p => Math.hypot(p.x - x, p.y - y) > 0.12);
        tries++;
      }
      el.style.left = (x * 100) + '%';
      el.style.top = (y * 100) + '%';
      const token = { el, x, y, idx: i, removed: false };
      tokens.push(token); placed.push({ x, y });
    }
    updateNextTokenHighlight();
  }

  function clearTokens() { tokens.forEach(t => { if (t.el && t.el.parentNode) t.el.parentNode.removeChild(t.el); }); tokens.length = 0; }
  function updateNextTokenHighlight() {
    tokens.forEach(t => {
      if (t.removed || !t.el) return;
      if (t.idx === nextIndex) t.el.classList.add('next');
      else t.el.classList.remove('next');
    });
  }
  function scatterTokens() {
    clearTokens();
    const placed = [];
    for (let i = 0; i < chars.length; i++) {
      const el = document.createElement('div');
      el.className = 'croc-token';
      el.textContent = chars[i];
      stage.appendChild(el);
      let x = 0, y = 0; let ok = false; let tries = 0;
      while (!ok && tries < 100) {
        x = 0.08 + rng() * 0.84;
        y = 0.10 + rng() * 0.76;
        const farFromHead = Math.hypot(ctrl.x - x, ctrl.y - y) > 0.16;
        ok = farFromHead && placed.every(p => Math.hypot(p.x - x, p.y - y) > 0.12);
        tries++;
      }
      el.style.left = (x * 100) + '%';
      el.style.top = (y * 100) + '%';
      const token = { el, x, y, idx: i, removed: false };
      tokens.push(token); placed.push({ x, y });
    }
    updateNextTokenHighlight();
  }

  function clearTokens() { tokens.forEach(t => { if (t.el.parentNode) t.el.parentNode.removeChild(t.el); }); tokens.length = 0; }
  function scatterTokens() {
    clearTokens();
    const placed = [];
    for (let i = 0; i < chars.length; i++) {
      const el = document.createElement('div');
      el.className = 'croc-token';
      el.textContent = chars[i];
      stage.appendChild(el);
      let x = 0, y = 0; let ok = false; let tries = 0;
      while (!ok && tries < 100) {
        x = 0.08 + rng() * 0.84;
        y = 0.10 + rng() * 0.76;
        const farFromHead = Math.hypot(ctrl.x - x, ctrl.y - y) > 0.16;
        ok = farFromHead && placed.every(p => Math.hypot(p.x - x, p.y - y) > 0.12);
        tries++;
      }
      el.style.left = (x * 100) + '%';
      el.style.top = (y * 100) + '%';
      const token = { el, x, y, idx: i, removed: false };
      tokens.push(token); placed.push({ x, y });
    }
    updateNextTokenHighlight();
  }

  function updateNextTokenHighlight() {
    tokens.forEach(t => {
      if (t.removed || !t.el) return;
      if (t.idx === nextIndex) t.el.classList.add('next');
      else t.el.classList.remove('next');
    });
  }

  function clearTokens() { tokens.forEach(t => { if (t.el.parentNode) t.el.parentNode.removeChild(t.el); }); tokens.length = 0; }
  function scatterTokens() {
    clearTokens();
    const placed = [];
    for (let i = 0; i < chars.length; i++) {
      const el = document.createElement('div');
      el.className = 'croc-token';
      el.textContent = chars[i];
      stage.appendChild(el);
      let x = 0, y = 0; let ok = false; let tries = 0;
      while (!ok && tries < 100) {
        x = 0.08 + rng() * 0.84;
        y = 0.10 + rng() * 0.76;
        const farFromHead = Math.hypot(ctrl.x - x, ctrl.y - y) > 0.16;
        ok = farFromHead && placed.every(p => Math.hypot(p.x - x, p.y - y) > 0.12);
        tries++;
      }
      el.style.left = (x * 100) + '%';
      el.style.top = (y * 100) + '%';
      const token = { el, x, y, idx: i, removed: false };
      tokens.push(token); placed.push({ x, y });
    }
  }
function endP1(success) {
  if (p1Ended) return;
  p1Ended = true;
  running = false;
  clearInterval(spawnTimer);
  if (endTimer) clearTimeout(endTimer);
  activeItems().forEach(it => { if (!it.removed) { it.removed = true; p1.removeChild(it.el); } });
  willpowerDebuff = !success;
  const msg = success ? '意志阻擋成功' : '意志阻擋失敗';
  const count = 28;
  let done = 0;
  const rainItems = [];
  for (let i = 0; i < count; i++) {
    const el = document.createElement('div');
    el.className = 'fall-item';
    el.textContent = '佛';
    el.style.pointerEvents = 'none';
    p1.appendChild(el);
    const v = 0.12 + Math.random() * 0.18;
    const it = { el, x: Math.random(), y: -0.1, v, reached: false };
    el.style.left = (it.x * 100) + '%';
    el.style.top = (it.y * 100) + '%';
    rainItems.push(it);
  }
  let last = nowMs();
  function rainLoop() {
    const ts = nowMs();
    const dt = Math.min(0.033, (ts - last) / 1000);
    last = ts;
    rainItems.forEach(it => {
      if (it.reached) return;
      it.y += it.v * dt;
      it.el.style.top = (it.y * 100) + '%';
      if (it.y >= 0.92) {
        it.reached = true;
        done += 1;
        if (it.el.parentNode) p1.removeChild(it.el);
      }
    });
    if (done < count) {
      requestAnimationFrame(rainLoop);
    } else {
      showConfirmModal('提示', '佛骨進宮', '準備勸諫', () => { renderP2(); });
    }
  }
  requestAnimationFrame(rainLoop);
}
  function spawnFo() {
    const el = document.createElement('div');
    el.className = 'fall-item';
    el.textContent = '佛';
    p1.appendChild(el);
    const minSepMs = 1200;
    let v = 0.12 + rng() * 0.18;
    let ok = false;
    for (let tries = 0; tries < 6; tries++) {
      const tBottom = nowMs() + ((1.05 - (-0.1)) / v) * 1000;
      const conflict = activeItems().some(it => Math.abs((it.tBottom || 0) - tBottom) < minSepMs);
      if (!conflict) { ok = true; break; }
      v = 0.12 + rng() * 0.18;
    }
    const obj = { el, x: rng(), y: -0.1, v, caught: false, removed: false, tBottom: nowMs() + ((1.05 - (-0.1)) / v) * 1000 };
    el.style.left = (obj.x * 100) + '%';
    el.style.top = (obj.y * 100) + '%';
    items.push(obj);
  }
  function gameLoop() {
    if (!running || isGameOver) return;
    const ts = nowMs();
    const dt = Math.min(0.033, (ts - lastTs) / 1000);
    lastTs = ts;
    const cRect = catcher.getBoundingClientRect();
    items.forEach(it => {
      it.y += it.v * dt;
      it.el.style.top = (it.y * 100) + '%';
      if (!it.caught && !it.removed) {
        const iRect = it.el.getBoundingClientRect();
        if (rectsIntersect(iRect, cRect)) {
          it.caught = true;
          it.removed = true;
          p1.removeChild(it.el);
        }
      }
      if (it.y > 1.05 && !it.removed) {
        it.removed = true;
        if (!it.caught) { misses += 1; willpowerDebuff = true; }
        p1.removeChild(it.el);
      }
    });
    trackedSetTimeout(() => requestAnimationFrame(gameLoop), 0);
  }
  const spawnTimer = trackedSetInterval(() => { if (running && activeItems().length < 4) spawnFo(); }, 900);
  let endTimer = null;
  document.addEventListener('keydown', (ev) => { if (!running || isGameOver) return; if (ev.key === 'ArrowLeft' || ev.key === 'a') setCatcherX(ctrl.x - ctrl.speed); if (ev.key === 'ArrowRight' || ev.key === 'd') setCatcherX(ctrl.x + ctrl.speed); });
  p1.addEventListener('mousemove', (ev) => { const r = p1.getBoundingClientRect(); setCatcherX((ev.clientX - r.left) / r.width); });
  p1.addEventListener('touchmove', (ev) => { const t = ev.touches[0]; if (!t) return; const r = p1.getBoundingClientRect(); setCatcherX((t.clientX - r.left) / r.width); }, { passive: true });
  showConfirmModal('提示', '準備好了嗎？', '準備好了', () => { running = true; lastTs = nowMs(); endTimer = setTimeout(() => endP1(misses === 0), 10000); requestAnimationFrame(gameLoop); });

  function renderP2() {
    level.innerHTML = '';
    const t2 = document.createElement('h2');
    t2.className = 'modal-title';
    t2.textContent = '第七關：諫迎佛骨';
    level.appendChild(t2);
    rageValue = willpowerDebuff ? 50 : 30;
    pleaPoint = 0;
    let courtOpinionValue = 50;
    let courtDebuffNext = false;
    const stats = document.createElement('p');
    stats.className = 'dialog-text';
    stats.textContent = `怒氣：${rageValue} / 100　勸諫：${pleaPoint} / 4　朝臣：${courtOpinionValue} / 100`;
    level.appendChild(stats);
    const cards = document.createElement('div');
    cards.className = 'options';
    function updateStats() { stats.textContent = `怒氣：${rageValue} / 100　勸諫：${pleaPoint} / 4　朝臣：${courtOpinionValue} / 100`; }
    let locked = false;
    function applyAction(kind) {
      if (locked || blockingModalOpen || isGameOver) return;
      const base = rageValue;
      const debuffNow = courtDebuffNext === true;
      courtDebuffNext = false;
      let rageDelta = 0;
      let pleaDelta = 0;
      let courtDelta = 0;
      if (kind === 'A') { rageDelta += 35; pleaDelta += (base <= 40 ? 2 : 1); if (base > 70) rageDelta += 15; courtDelta -= 15; }
      else if (kind === 'B') { rageDelta -= 25; if (willpowerDebuff) rageDelta += 5; if (base < 30) rageDelta += 5; courtDelta -= 5; }
      else if (kind === 'C') { rageDelta += 20; pleaDelta += 1; if (base > 80) rageDelta += 15; courtDelta += 15; }
      else if (kind === 'D') { rageDelta -= 10; if (base > 85) rageDelta += 10; courtDelta -= 10; }
      if (debuffNow) rageDelta += 10;
      rageValue = Math.max(0, Math.min(100, rageValue + rageDelta));
      pleaPoint = Math.max(0, Math.min(4, pleaPoint + pleaDelta));
      courtOpinionValue = Math.max(0, Math.min(100, courtOpinionValue + courtDelta));
      updateStats();
      courtDebuffNext = courtOpinionValue < 20;
      if (rageValue >= 100) {
        locked = true;
        if (selectedCardId === 'card_memorial') {
          errorCount = Math.max(errorCount, 1);
        }
        customNumberFailText = '遭斬';
        handleError('Number');
        return;
      }
      if (pleaPoint >= 4 && rageValue < 100 && courtOpinionValue >= 80) {
        locked = true;
        showBlockModal('通關', [{ text: '進入潮州貶謫' }], () => { applyLevelClear(level, 25); });
      }
    }
    const a = document.createElement('button'); a.className = 'button option'; a.type = 'button'; a.textContent = '終極勸諫'; a.addEventListener('click', () => applyAction('A'));
    const b = document.createElement('button'); b.className = 'button option'; b.type = 'button'; b.textContent = '極度恭維'; b.addEventListener('click', () => applyAction('B'));
    const c = document.createElement('button'); c.className = 'button option'; c.type = 'button'; c.textContent = '溫和批判'; c.addEventListener('click', () => applyAction('C'));
    const d = document.createElement('button'); d.className = 'button option'; d.type = 'button'; d.textContent = '自謙求情'; d.addEventListener('click', () => applyAction('D'));
    cards.appendChild(a);
    cards.appendChild(b);
    cards.appendChild(c);
    cards.appendChild(d);
    level.appendChild(cards);
  }
}

function startCrocodileLevel() {
  applyLevelStyle('Number');
  updateCharacterDisplay();
  showHpBar();
  updateHpBar();
  const main = document.querySelector('main.container');
  let level = document.getElementById('levelCrocodile');
  if (!level) {
    level = document.createElement('section');
    level.className = 'dialog-container';
    level.id = 'levelCrocodile';
    main.appendChild(level);
  } else {
    level.innerHTML = '';
    level.style.display = '';
  }
  const title = document.createElement('h2');
  title.className = 'modal-title';
  title.textContent = '第八關：祭鱷魚文';
  level.appendChild(title);
  const stage = document.createElement('div');
  stage.className = 'croc-stage';
  level.appendChild(stage);
  stage.tabIndex = 0;

  stage.innerHTML = '';
  const ui = document.createElement('div'); ui.id = 'ui-layer'; stage.appendChild(ui);
  const target = document.createElement('div'); target.id = 'target-sentence'; target.className = 'dialog-text'; ui.appendChild(target);
  const canvas = document.createElement('canvas'); canvas.id = 'game-board';
  const rect = stage.getBoundingClientRect();
  canvas.width = Math.max(200, Math.floor(rect.width));
  canvas.height = Math.max(200, Math.floor(rect.height));
  stage.appendChild(canvas);
  const ctx = canvas.getContext('2d');

  const gridSize = 40;
  const tileCountX = Math.floor(canvas.width / gridSize);
  const tileCountY = Math.floor(canvas.height / gridSize);
  const rng = () => Math.random();
  const sentences = [
    '以與鱷魚食',
    '且承天子命',
    '雜處此土也',
    '其聽刺史言',
    '其率醜類',
    '四海之外',
    '朝發而夕至',
    '必盡殺乃止',
  ];
  const sentence = sentences[Math.floor(rng() * sentences.length)];
  const chars = Array.from(sentence).filter(c => /[\u4E00-\u9FFF]/.test(c));
  target.textContent = '';
  target.style.display = 'none';
  let snake = [{ x: Math.floor(tileCountX / 2), y: Math.floor(tileCountY / 2) }];
  let velocity = { x: 0, y: 0 };
  let gameLoop = null;
  let currentIndex = 0;
  const foodItems = [];
  const occupied = new Set([`${snake[0].x},${snake[0].y}`]);
  let hintShown = false;
  let lastProgressAt = performance.now();

  function spawnFoods() {
    foodItems.length = 0;
    occupied.clear();
    occupied.add(`${snake[0].x},${snake[0].y}`);
    const total = chars.length;
    const marginX = 1;
    const marginTop = 2;
    const marginBottom = 1;
    const candidates = [];
    for (let x = marginX; x <= tileCountX - 1 - marginX; x++) {
      for (let y = marginTop; y <= tileCountY - 1 - marginBottom; y++) {
        if (x === snake[0].x && y === snake[0].y) continue;
        candidates.push({ x, y });
      }
    }
    for (let i = candidates.length - 1; i > 0; i--) {
      const j = Math.floor(rng() * (i + 1));
      const tmp = candidates[i];
      candidates[i] = candidates[j];
      candidates[j] = tmp;
    }
    const chosen = [];
    const minDist = 2;
    function farEnough(p) {
      for (let k = 0; k < chosen.length; k++) {
        const q = chosen[k];
        const dx = p.x - q.x;
        const dy = p.y - q.y;
        if (Math.abs(dx) + Math.abs(dy) < minDist) return false;
      }
      return true;
    }
    for (let i = 0; i < candidates.length && chosen.length < total; i++) {
      const p = candidates[i];
      if (!occupied.has(`${p.x},${p.y}`) && farEnough(p)) {
        chosen.push(p);
        occupied.add(`${p.x},${p.y}`);
      }
    }
    for (let i = 0; i < candidates.length && chosen.length < total; i++) {
      const p = candidates[i];
      if (!occupied.has(`${p.x},${p.y}`)) {
        chosen.push(p);
        occupied.add(`${p.x},${p.y}`);
      }
    }
    for (let i = 0; i < total; i++) {
      const pos = chosen[i] || { x: 0, y: 0 };
      foodItems.push({ x: pos.x, y: pos.y, idx: i, ch: chars[i] });
    }
  }
  spawnFoods();


  function resetLevelState() {
    if (gameLoop) { clearInterval(gameLoop); gameLoop = null; }
    velocity = { x: 0, y: 0 };
    currentIndex = 0;
    hintShown = false;
    lastProgressAt = performance.now();
    snake = [{ x: Math.floor(tileCountX / 2), y: Math.floor(tileCountY / 2) }];
    occupied.clear();
    occupied.add(`${snake[0].x},${snake[0].y}`);
    spawnFoods();
    drawBackground();
    drawFoods();
    drawSnake();
    document.addEventListener('keydown', keyListener, { passive: false });
    if (!gameLoop) gameLoop = trackedSetInterval(step, 150);
  }

  function drawBackground() {
    ctx.fillStyle = '#0d1108';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.strokeStyle = 'rgba(80,120,60,0.15)';
    ctx.lineWidth = 1;
    for (let gx = 0; gx <= tileCountX; gx++) { ctx.beginPath(); ctx.moveTo(gx * gridSize, 0); ctx.lineTo(gx * gridSize, canvas.height); ctx.stroke(); }
    for (let gy = 0; gy <= tileCountY; gy++) { ctx.beginPath(); ctx.moveTo(0, gy * gridSize); ctx.lineTo(canvas.width, gy * gridSize); ctx.stroke(); }
  }


  function drawFoods() {
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.font = 'bold 20px Noto Serif TC, serif';
    foodItems.forEach(item => {
      const hinted = hintShown && item.idx === currentIndex;
      ctx.fillStyle = hinted ? '#f8e78e' : '#b7b7b7';
      ctx.fillText(item.ch, item.x * gridSize + gridSize / 2, item.y * gridSize + gridSize / 2);
    });
  }

  function drawSnake() {
    ctx.fillStyle = '#2fb84f';
    snake.forEach(seg => { ctx.fillRect(seg.x * gridSize + 4, seg.y * gridSize + 4, gridSize - 8, gridSize - 8); });
  }
  function stopGame() {
    if (gameLoop) { clearInterval(gameLoop); gameLoop = null; }
    if (keyListener) { document.removeEventListener('keydown', keyListener, { passive: false }); }
  }
  function onFail() {
    if (gameLoop) { clearInterval(gameLoop); gameLoop = null; }
    velocity = { x: 0, y: 0 };
    handleError('Number');
  }
  function step() {
    if (velocity.x !== 0 || velocity.y !== 0) {
      const head = { x: snake[0].x + velocity.x, y: snake[0].y + velocity.y };
      if (head.x < 0 || head.y < 0 || head.x >= tileCountX || head.y >= tileCountY) { onFail(); return; }
      for (let i = 0; i < snake.length; i++) { if (snake[i].x === head.x && snake[i].y === head.y) { onFail(); return; } }
      snake.unshift(head);
      const hitIndex = foodItems.findIndex(f => f.x === head.x && f.y === head.y);
      if (hitIndex >= 0) {
        const item = foodItems[hitIndex];
        if (item.idx === currentIndex) {
          foodItems.splice(hitIndex, 1);
          currentIndex += 1;
          hintShown = false;
          lastProgressAt = performance.now();
          if (currentIndex >= chars.length) { stopGame(); showBlockModal('通關', [{ text: '鱷魚被驅逐，江岸重歸寧靜。' }], () => { applyLevelClear(level, 20); }); return; }
        } else { onFail(); return; }
      } else { snake.pop(); }
    }
    drawBackground();
    drawFoods();
    drawSnake();
  }
  let keyListener = (ev) => {
    const k = ev.key;
    if (k === 'ArrowLeft' || k === 'ArrowRight' || k === 'ArrowUp' || k === 'ArrowDown') ev.preventDefault();
    if (isGameOver || blockingModalOpen) return;
    if (k === 'ArrowLeft' || k === 'a') { if (velocity.x !== 1) velocity = { x: -1, y: 0 }; }
    else if (k === 'ArrowRight' || k === 'd') { if (velocity.x !== -1) velocity = { x: 1, y: 0 }; }
    else if (k === 'ArrowUp' || k === 'w') { if (velocity.y !== 1) velocity = { x: 0, y: -1 }; }
    else if (k === 'ArrowDown' || k === 's') { if (velocity.y !== -1) velocity = { x: 0, y: 1 }; }
  };
  document.addEventListener('keydown', keyListener, { passive: false });
  let touchStart = null;
  stage.addEventListener('touchstart', (ev) => {
    const t = ev.touches[0];
    if (!t) return;
    touchStart = { x: t.clientX, y: t.clientY };
  }, { passive: true });
  stage.addEventListener('touchend', (ev) => {
    if (!touchStart) return;
    const t = ev.changedTouches && ev.changedTouches[0];
    if (!t) { touchStart = null; return; }
    const dx = t.clientX - touchStart.x;
    const dy = t.clientY - touchStart.y;
    touchStart = null;
    if (Math.abs(dx) < 8 && Math.abs(dy) < 8) return;
    if (Math.abs(dx) > Math.abs(dy)) {
      if (dx < 0) { if (velocity.x !== 1) velocity = { x: -1, y: 0 }; }
      else { if (velocity.x !== -1) velocity = { x: 1, y: 0 }; }
    } else {
      if (dy < 0) { if (velocity.y !== 1) velocity = { x: 0, y: -1 }; }
      else { if (velocity.y !== -1) velocity = { x: 0, y: 1 }; }
    }
  }, { passive: true });
  gameLoop = trackedSetInterval(step, 1000 / 5);
  trackedSetInterval(() => {
    const now = performance.now();
    const idleMs = now - lastProgressAt;
    if (!hintShown && idleMs >= 10000) hintShown = true;
  }, 500);

  window.level8Reset = resetLevelState;
}

function startEpitaphLevel() {
  applyLevelStyle('Number');
  updateCharacterDisplay();
  showHpBar();
  updateHpBar();
  const main = document.querySelector('main.container');
  let level = document.getElementById('levelEpitaph');
  if (!level) {
    level = document.createElement('section');
    level.className = 'dialog-container';
    level.id = 'levelEpitaph';
    main.appendChild(level);
  } else {
    level.innerHTML = '';
    level.style.display = '';
  }
  const title = document.createElement('h2');
  title.className = 'modal-title';
  title.textContent = '第九關：為友撰銘';
  level.appendChild(title);

  const intro = document.createElement('p');
  intro.className = 'dialog-text';
  intro.textContent = '拖曳排序成完整文章：';
  level.appendChild(intro);

  const correct = [
    '子厚，諱宗元。',
    '七世祖慶，為拓跋魏侍中，封濟陰公。',
    '曾伯祖奭，為唐宰相，與褚遂良、韓瑗俱得罪武后，死高宗朝。',
    '皇考諱鎮，以事母棄太常博士，求為縣令江南。',
    '其後以不能媚權貴，失禦史。',
    '權貴人死，乃複拜侍御史。',
    '號為剛直，所與遊皆當世名人。'
  ];
  const toText = (arr) => arr.join('');
  let order = correct.slice();
  for (let i = order.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    const t = order[i]; order[i] = order[j]; order[j] = t;
  }

  const list = document.createElement('div');
  list.className = 'ordering-list';
  level.appendChild(list);
  const preview = document.createElement('div');
  preview.className = 'order-preview';
  level.appendChild(preview);

  const actions = document.createElement('div');
  actions.className = 'modal-actions';
  const accountSelect = document.createElement('select');
  accountSelect.className = 'input';
  const fillAccountSelect = () => {
    const list = loadAccountsList();
    accountSelect.innerHTML = '';
    const placeholder = document.createElement('option');
    placeholder.value = '';
    placeholder.textContent = list && list.length ? '選擇已註冊帳號' : '目前沒有帳號';
    accountSelect.appendChild(placeholder);
    const activeId = getActiveAccountId();
    (list || []).forEach((a) => {
      const opt = document.createElement('option');
      opt.value = String(a.id);
      opt.textContent = String(a.name || a.id);
      if (activeId && String(a.id) === activeId) opt.selected = true;
      accountSelect.appendChild(opt);
    });
  };
  fillAccountSelect();
  const checkBtn = document.createElement('button');
  checkBtn.className = 'button';
  checkBtn.type = 'button';
  checkBtn.textContent = '提交排序';
  const shuffleBtn = document.createElement('button');
  shuffleBtn.className = 'button';
  shuffleBtn.type = 'button';
  shuffleBtn.textContent = '隨機重排';
  actions.appendChild(checkBtn);
  actions.appendChild(shuffleBtn);
  level.appendChild(actions);

  let locked = false;
  let draggedIndex = -1;

  function renderList() {
    list.innerHTML = '';
    order.forEach((text, idx) => {
      const row = document.createElement('div');
      row.className = 'ordering-item';
      row.draggable = true;
      const idxBadge = document.createElement('span');
      idxBadge.className = 'order-index';
      idxBadge.textContent = String(idx + 1);
      const para = document.createElement('p');
      para.className = 'dialog-text';
      para.textContent = text;
      row.appendChild(idxBadge);
      row.appendChild(para);
      row.addEventListener('dragstart', () => { draggedIndex = idx; });
      row.addEventListener('dragover', (e) => { e.preventDefault(); row.classList.add('drag-over'); });
      row.addEventListener('dragleave', () => { row.classList.remove('drag-over'); });
      row.addEventListener('drop', (e) => {
        e.preventDefault();
        row.classList.remove('drag-over');
        if (locked || isGameOver || blockingModalOpen) return;
        if (draggedIndex === idx || draggedIndex < 0) return;
        const item = order.splice(draggedIndex, 1)[0];
        order.splice(idx, 0, item);
        draggedIndex = -1;
        renderList();
        updatePreview();
      });
      list.appendChild(row);
    });
  }

  function resetOrdering() {
    locked = false;
    order = correct.slice();
    for (let i = order.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      const t = order[i]; order[i] = order[j]; order[j] = t;
    }
    renderList();
    updatePreview();
  }
  window.level9Reset = resetOrdering;

  function updatePreview() {
    preview.textContent = order.join('');
  }

  checkBtn.addEventListener('click', () => {
    if (locked || isGameOver || blockingModalOpen) return;
    const ok = toText(order) === toText(correct);
    if (ok) {
      locked = true;
      showBlockModal('通關', [
        { text: '墓誌銘完成，字跡剛勁有力，韓愈表情釋然。' },
        { text: '「文成！ 你明白了文以載道的真義，在公義與私情之間劃下了最完美的句點。你的道統，無人可撼動。」' },
      ], () => { applyLevelClear(level, 20); });
    } else {
      showPunishOverlay();
      handleError('Number');
    }
  });

  shuffleBtn.addEventListener('click', () => {
    if (locked || isGameOver || blockingModalOpen) return;
    resetOrdering();
  });

  renderList();
  updatePreview();
  showConfirmModal('提示', '準備好了嗎？拖曳開始排序。', '開始');
}

function startFiveOriginalsLevel() {
  applyLevelStyle('Number');
  updateCharacterDisplay();
  const img = document.getElementById('characterImage');
  if (img) img.src = 'han_yu_youth.png';
  showHpBar();
  updateHpBar();
  mismatchCounter = 0;
  const main = document.querySelector('main.container');
  let level = document.getElementById('levelFiveOriginals');
  if (!level) {
    level = document.createElement('section');
    level.className = 'dialog-container';
    level.id = 'levelFiveOriginals';
    main.appendChild(level);
  } else {
    level.innerHTML = '';
    level.style.display = '';
  }
  const title = document.createElement('h2');
  title.className = 'modal-title';
  title.textContent = '第五關：五原立論';
  level.appendChild(title);

  const fiveOriginalsCards = [
    { title: '《原道》', doctrine: '弘揚仁義，驅逐佛老。' },
    { title: '《原性》', doctrine: '性有三品：上中下。' },
    { title: '《原人》', doctrine: '聖人合德，賢人弘道。' },
    { title: '《原毀》', doctrine: '不進則退，退則招毀。' },
    { title: '《原鬼》', doctrine: '鬼神之說，因人附會。' },
  ];

  const grid = document.createElement('div');
  grid.className = 'card-grid';
  level.appendChild(grid);

  const cards = [];
  fiveOriginalsCards.forEach((it, idx) => {
    cards.push({ key: String(idx), type: 'title', text: it.title });
    cards.push({ key: String(idx), type: 'doctrine', text: it.doctrine });
  });

  const shuffled = sampleQuestions(cards, cards.length);
  const state = { open: [], matched: 0, previewing: true, lock: false };

  shuffled.forEach(info => {
    const card = document.createElement('button');
    card.className = 'match-card';
    card.type = 'button';
    card.dataset.key = info.key;
    card.dataset.type = info.type;
    const inner = document.createElement('div');
    inner.className = 'card-inner';
    const back = document.createElement('div');
    back.className = 'card-face card-back';
    back.textContent = '原';
    const front = document.createElement('div');
    front.className = 'card-face card-front';
    front.textContent = info.text;
    inner.appendChild(back);
    inner.appendChild(front);
    card.appendChild(inner);
    card.addEventListener('click', () => {
      if (state.previewing || state.lock) return;
      if (card.classList.contains('open')) return;
      card.classList.add('open');
      state.open.push(card);
      if (state.open.length === 2) {
        state.lock = true;
        const a = state.open[0];
        const b = state.open[1];
        const ok = a.dataset.key === b.dataset.key && a.dataset.type !== b.dataset.type;
        if (ok) {
          bumpScore(3);
          setTimeout(() => {
            a.classList.add('matched');
            b.classList.add('matched');
            a.classList.remove('open');
            b.classList.remove('open');
            state.open = [];
            state.matched += 1;
            mismatchCounter = 0;
            state.lock = false;
            if (state.matched === 5) {
              showBlockModal('通關', [{ text: '文成！你將重回京城，準備大展經綸！' }], () => { applyLevelClear(level, 10); });
            }
          }, 200);
        } else {
          mismatchCounter += 1;
          setTimeout(() => {
            a.classList.remove('open');
            b.classList.remove('open');
            state.open = [];
            state.lock = false;
            if (mismatchCounter >= 5) {
              handleError('Number');
              showBlockModal('警告', [{ text: '身體與靈魂不匹配的警告...請再次感受文脈的邏輯...' }]);
              mismatchCounter = 0;
            }
          }, 1000);
        }
      }
    });
    grid.appendChild(card);
  });

  Array.from(grid.children).forEach(el => el.classList.add('open'));
  setTimeout(() => {
    state.previewing = false;
    Array.from(grid.children).forEach(el => el.classList.remove('open'));
    state.lock = false;
  }, 3000);
}

function startPoetryLevel() {
  applyLevelStyle('Number');
  updateCharacterDisplay();
  showHpBar();
  updateHpBar();
  customNumberFailText = '文氣渙散，精神不濟！...魂歸寒流。';
  const main = document.querySelector('main.container');
  let level = document.getElementById('levelPoetry');
  if (!level) {
    level = document.createElement('section');
    level.className = 'dialog-container';
    level.id = 'levelPoetry';
    main.appendChild(level);
  } else {
    level.innerHTML = '';
    level.style.display = '';
  }
  const title = document.createElement('h2');
  title.className = 'modal-title';
  title.textContent = '第四關：結交孟郊';
  level.appendChild(title);

  const poetryLevelQuestions = [
    { title: '列女操', author: '孟郊', lines: ['梧桐相待老，鴛鴦會雙死。', '貞女貴徇夫，舍生亦如此。', '波瀾誓不起，妾心井中水。'], full_text: '梧桐相待老，鴛鴦會雙死。貞女貴徇夫，舍生亦如此。波瀾誓不起，妾心井中水。' },
    { title: '長安道', author: '孟郊', lines: ['胡風激秦樹，賤子風中泣。家家朱門開，得見不可入。', '長安十二衢，投樹鳥亦急。高閣何人家，笙簧正喧吸。'], full_text: '胡風激秦樹，賤子風中泣。家家朱門開，得見不可入。長安十二衢，投樹鳥亦急。高閣何人家，笙簧正喧吸。' },
    { title: '送遠吟', author: '孟郊', lines: ['河水昏複晨，河邊相送頻。離杯有淚飲，別柳無枝春。', '一笑忽然斂，萬愁俄已新。東波與西日，不惜遠行人。'], full_text: '河水昏複晨，河邊相送頻。離杯有淚飲，別柳無枝春。一笑忽然斂，萬愁俄已新。東波與西日，不惜遠行人。' },
    { title: '古離別（一作對景惜別）', author: '孟郊', lines: ['松山雲繚繞，萍路水分離。雲去有歸日，水分無合時。', '春芳役雙眼，春色柔四支。楊柳織別愁，千條萬條絲。'], full_text: '松山雲繚繞，萍路水分離。雲去有歸日，水分無合時。春芳役雙眼，春色柔四支。楊柳織別愁，千條萬條絲。' },
    { title: '靜女吟', author: '孟郊', lines: ['豔女皆妒色，靜女獨檢蹤。任禮恥任妝，嫁德不嫁容。', '君子易求聘，小人難自從。此志誰與諒，琴弦幽韻重。'], full_text: '豔女皆妒色，靜女獨檢蹤。任禮恥任妝，嫁德不嫁容。君子易求聘，小人難自從。此志誰與諒，琴弦幽韻重。' },
    { title: '歸信吟', author: '孟郊', lines: ['淚墨灑為書，將寄萬里親。書去魂亦去，兀然空一身。'], full_text: '淚墨灑為書，將寄萬里親。書去魂亦去，兀然空一身。' },
    { title: '山老吟', author: '孟郊', lines: ['不行山下地，唯種山上田。腰斧斫旅松，手瓢汲家泉。', '詎知文字力，莫記日月遷。蟠木為我身，始得全天年。'], full_text: '不行山下地，唯種山上田。腰斧斫旅松，手瓢汲家泉。詎知文字力，莫記日月遷。蟠木為我身，始得全天年。' },
    { title: '遊子吟（迎母漂上作）', author: '孟郊', lines: ['慈母手中線，遊子身上衣。', '臨行密密縫，意恐遲遲歸。', '誰言寸草心，報得三春暉。'], full_text: '慈母手中線，遊子身上衣。臨行密密縫，意恐遲遲歸。誰言寸草心，報得三春暉。' },
    { title: '小隱吟', author: '孟郊', lines: ['我飲不在醉，我歡長寂然。酌溪四五盞，聽彈兩三弦。', '煉性靜棲白，洗情深寄玄。號怒路傍子，貪敗不貪全。'], full_text: '我飲不在醉，我歡長寂然。酌溪四五盞，聽彈兩三弦。煉性靜棲白，洗情深寄玄。號怒路傍子，貪敗不貪全。' },
    { title: '苦寒吟', author: '孟郊', lines: ['天寒色青蒼，北風叫枯桑。厚冰無裂文，短日有冷光。', '敲石不得火，壯陰奪正陽。苦調竟何言，凍吟成此章。'], full_text: '天寒色青蒼，北風叫枯桑。厚冰無裂文，短日有冷光。敲石不得火，壯陰奪正陽。苦調竟何言，凍吟成此章。' },
    { title: '猛將吟', author: '孟郊', lines: ['擬膾樓蘭肉，蓄怒時未揚。秋鼙無退聲，夜劍不隱光。', '虎隊手驅出，豹篇心卷藏。古今皆有言，猛將出北方。'], full_text: '擬膾樓蘭肉，蓄怒時未揚。秋鼙無退聲，夜劍不隱光。虎隊手驅出，豹篇心卷藏。古今皆有言，猛將出北方。' },
    { title: '怨詩（一作古怨）', author: '孟郊', lines: ['試妾與君淚，兩處滴池水。看取芙蓉花，今年為誰死。'], full_text: '試妾與君淚，兩處滴池水。看取芙蓉花，今年為誰死。' },
    { title: '邊城吟', author: '孟郊', lines: ['西城近日天，俗稟氣候偏。行子獨自渴，主人仍賣泉。', '燒烽碧雲外，牧馬青坡巔。何處鶻突夢，歸思寄仰眠。'], full_text: '西城近日天，俗稟氣候偏。行子獨自渴，主人仍賣泉。燒烽碧雲外，牧馬青坡巔。何處鶻突夢，歸思寄仰眠。' },
    { title: '新平歌送許問', author: '孟郊', lines: ['邊柳三四尺，暮春離別歌。', '早回儒士駕，莫飲土番河。', '誰識匣中寶，楚雲章句多。'], full_text: '邊柳三四尺，暮春離別歌。早回儒士駕，莫飲土番河。誰識匣中寶，楚雲章句多。' },
    { title: '弦歌行', author: '孟郊', lines: ['驅儺擊鼓吹長笛，瘦鬼染面惟齒白。', '暗中崒崒拽茅鞭，倮足朱褌行戚戚。', '相顧笑聲沖庭燎，桃弧射矢時獨叫。'], full_text: '驅儺擊鼓吹長笛，瘦鬼染面惟齒白。暗中崒崒拽茅鞭，倮足朱褌行戚戚。相顧笑聲沖庭燎，桃弧射矢時獨叫。' },
    { title: '巫山高', author: '孟郊', lines: ['見盡數萬里，不聞三聲猿。但飛蕭蕭雨，中有亭亭魂。', '千載楚王恨，遺文宋玉言。至今晴明天，雲結深閨門。'], full_text: '見盡數萬里，不聞三聲猿。但飛蕭蕭雨，中有亭亭魂。千載楚王恨，遺文宋玉言。至今晴明天，雲結深閨門。' },
    { title: '楚怨', author: '孟郊', lines: ['秋入楚江水，獨照汨羅魂。', '手把綠荷泣，意愁珠淚翻。', '九門不可入，一犬吠千門。'], full_text: '秋入楚江水，獨照汨羅魂。手把綠荷泣，意愁珠淚翻。九門不可入，一犬吠千門。' },
    { title: '塘下行', author: '孟郊', lines: ['塘邊日欲斜，年少早還家。', '徒將白羽扇，調妾木蘭花。', '不是城頭樹，那棲來去鴉。'], full_text: '塘邊日欲斜，年少早還家。徒將白羽扇，調妾木蘭花。不是城頭樹，那棲來去鴉。' },
    { title: '臨池曲', author: '孟郊', lines: ['池中春蒲葉如帶，紫菱成角蓮子大。', '羅裙蟬鬢倚迎風，雙雙伯勞飛向東。'], full_text: '池中春蒲葉如帶，紫菱成角蓮子大。羅裙蟬鬢倚迎風，雙雙伯勞飛向東。' },
    { title: '空城雀', author: '孟郊', lines: ['一雀入官倉，所食寧損幾。只慮往覆頻，官倉終害爾。', '魚網不在天，鳥羅不張水。飲啄要自然，可以空城裡。'], full_text: '一雀入官倉，所食寧損幾。只慮往覆頻，官倉終害爾。魚網不在天，鳥羅不張水。飲啄要自然，可以空城裡。' },
    { title: '遊俠行', author: '孟郊', lines: ['壯士性剛決，火中見石裂。殺人不回頭，輕生如暫別。', '豈知眼有淚，肯白頭上髮。半生無恩酬，劍閑一百月。'], full_text: '壯士性剛決，火中見石裂。殺人不回頭，輕生如暫別。豈知眼有淚，肯白頭上髮。半生無恩酬，劍閑一百月。' },
    { title: '求仙曲', author: '孟郊', lines: ['仙教生為門，仙宗靜為根。持心若妄求，服食安足論。', '鏟惑有靈藥，餌真成本源。自當出塵網，馭鳳登昆侖。'], full_text: '仙教生為門，仙宗靜為根。持心若妄求，服食安足論。鏟惑有靈藥，餌真成本源。自當出塵網，馭鳳登昆侖。' },
    { title: '南浦篇', author: '孟郊', lines: ['南浦桃花亞水紅，水邊柳絮由春風。鳥鳴喈喈煙濛濛，', '自從遠送對悲翁。此翁已與少年別，唯憶深山深谷中。'], full_text: '南浦桃花亞水紅，水邊柳絮由春風。鳥鳴喈喈煙濛濛。自從遠送對悲翁。此翁已與少年別，唯憶深山深谷中。' },
    { title: '和丁助教塞上吟', author: '孟郊', lines: ['哭雪複吟雪，廣文丁夫子。江南萬里寒，曾未及如此。', '整頓氣候誰，言從生靈始。無令惻隱者，哀哀不能已。'], full_text: '哭雪複吟雪，廣文丁夫子。江南萬里寒，曾未及如此。整頓氣候誰，言從生靈始。無令惻隱者，哀哀不能已。' },
    { title: '衰松', author: '孟郊', lines: ['近世交道衰，青松落顏色。人心忌孤直，木性隨改易。', '既摧棲日干，未展擎天力。終是君子材，還思君子識。'], full_text: '近世交道衰，青松落顏色。人心忌孤直，木性隨改易。既摧棲日干，未展擎天力。終是君子材，還思君子識。' },
    { title: '遣興', author: '孟郊', lines: ['弦貞五條音，松直百尺心。', '貞弦含古風，直松淩高岑。', '浮聲與狂葩，胡為欲相侵。'], full_text: '弦貞五條音，松直百尺心。貞弦含古風，直松淩高岑。浮聲與狂葩，胡為欲相侵。' },
    { title: '退居（一作退老）', author: '孟郊', lines: ['退身何所食，敗力不能閑。種稻耕白水，負薪斫青山。', '眾聽喜巴唱，獨醒愁楚顏。日暮靜歸時，幽幽扣松關。'], full_text: '退身何所食，敗力不能閑。種稻耕白水，負薪斫青山。眾聽喜巴唱，獨醒愁楚顏。日暮靜歸時，幽幽扣松關。' },
    { title: '獨愁（一作獨怨，一作贈韓愈）', author: '孟郊', lines: ['前日遠別離，昨日生白髮。', '欲知萬里情，曉臥半床月。', '常恐百蟲鳴，使我芳草歇。'], full_text: '前日遠別離，昨日生白髮。欲知萬里情，曉臥半床月。常恐百蟲鳴，使我芳草歇。' },
    { title: '春日有感', author: '孟郊', lines: ['雨滴草芽出，一日長一日。風吹柳線垂，一枝連一枝。', '獨有愁人顏，經春如等閒。且持酒滿杯，狂歌狂笑來。'], full_text: '雨滴草芽出，一日長一日。風吹柳線垂，一枝連一枝。獨有愁人顏，經春如等閒。且持酒滿杯，狂歌狂笑來。' },
    { title: '將見故人', author: '孟郊', lines: ['故人季夏中，及此百餘日。無日不相思，明鏡改形色。', '甯知仲冬時，忽有相逢期。振衣起躑躅，赬鯉躍天池。'], full_text: '故人季夏中，及此百餘日。無日不相思，明鏡改形色。甯知仲冬時，忽有相逢期。振衣起躑躅，赬鯉躍天池。' },
    { title: '勸學', author: '孟郊', lines: ['擊石乃有火，不擊元無煙。人學始知道，不學非自然。', '萬事須己運，他得非我賢。青春須早為，豈能長少年。'], full_text: '擊石乃有火，不擊元無煙。人學始知道，不學非自然。萬事須己運，他得非我賢。青春須早為，豈能長少年。' },
    { title: '勸友', author: '孟郊', lines: ['至白涅不緇，至交淡不疑。人生靜躁殊，莫厭相箴規。', '膠漆武可接，金蘭文可思。堪嗟無心人，不如松柏枝。'], full_text: '至白涅不緇，至交淡不疑。人生靜躁殊，莫厭相箴規。膠漆武可接，金蘭文可思。堪嗟無心人，不如松柏枝。' },
    { title: '夷門雪贈主人（是贈陸長源，陸有答詩）', author: '孟郊', lines: ['夷門貧士空吟雪，夷門豪士皆飲酒。酒聲歡閑入雪銷，', '雪聲激切悲枯朽。悲歡不同歸去來，萬里春風動江柳。'], full_text: '夷門貧士空吟雪，夷門豪士皆飲酒。酒聲歡閑入雪銷。雪聲激切悲枯朽。悲歡不同歸去來，萬里春風動江柳。' },
    { title: '聞砧', author: '孟郊', lines: ['杜鵑聲不哀，斷猿啼不切。月下誰家砧，一聲腸一絕。', '杵聲不為客，客聞發自白。杵聲不為衣，欲令遊子歸。'], full_text: '杜鵑聲不哀，斷猿啼不切。月下誰家砧，一聲腸一絕。杵聲不為客，客聞發自白。杵聲不為衣，欲令遊子歸。' },
    { title: '酒德', author: '孟郊', lines: ['酒是古明鏡，輾開小人心。醉見異舉止，醉聞異聲音。', '酒功如此多，酒屈亦以深。罪人免罪酒，如此可為箴。'], full_text: '酒是古明鏡，輾開小人心。醉見異舉止，醉聞異聲音。酒功如此多，酒屈亦以深。罪人免罪酒，如此可為箴。' },
    { title: '登科後', author: '孟郊', lines: ['昔日齷齪不足誇，今朝放蕩思無涯。', '春風得意馬蹄疾，一日看盡長安花。'], full_text: '昔日齷齪不足誇，今朝放蕩思無涯。春風得意馬蹄疾，一日看盡長安花。' },
  ];

  const idxs = Array.from({ length: poetryLevelQuestions.length }, (_, i) => i);
  const pick = sampleQuestions(idxs, 2);
  const q1Poem = poetryLevelQuestions[pick[0]];
  const q2Poem = poetryLevelQuestions[pick[1]];

  function renderQ1() {
    level.innerHTML = '';
    level.appendChild(title);
    const prompt = document.createElement('p');
    prompt.className = 'dialog-text';
    prompt.textContent = 'Q1：選詩名';
    level.appendChild(prompt);
    const content = document.createElement('p');
    content.className = 'dialog-text';
    content.textContent = q1Poem.full_text;
    level.appendChild(content);
    const hintBtn = document.createElement('button');
    hintBtn.className = 'button';
    hintBtn.type = 'button';
    hintBtn.textContent = '小雨提示';
    if (selectedCardId !== 'card_spring' || springHintUsedInRun) hintBtn.style.display = 'none';
    const options = document.createElement('div');
    options.className = 'options';
    const distractorTitles = shuffleArray(idxs.filter(i => i !== pick[0])).slice(0, 3).map(i => poetryLevelQuestions[i].title);
    const all = shuffleArray([q1Poem.title, ...distractorTitles]);
    all.forEach(t => {
      const btn = document.createElement('button');
      btn.className = 'button option';
      btn.type = 'button';
      btn.textContent = t;
      btn.addEventListener('click', () => {
        const ok = t === q1Poem.title;
        if (ok) {
          bumpScore(5);
          renderQ2();
        } else {
          handleError('Number');
          showPunishOverlay();
          showBlockModal('警告', [{ text: '身體與靈魂不匹配的警告...' }], () => { renderQ2(); });
        }
      });
      options.appendChild(btn);
    });
    level.appendChild(options);
    hintBtn.addEventListener('click', () => {
    isHintUsedInLevel = true;
    springHintUsedInRun = true;
    hintBtn.style.display = 'none';
    playSpringHintEffect();
    const btns = options.querySelectorAll('button.option');
    btns.forEach(b => { if (b.textContent === q1Poem.title) b.classList.add('hint-green'); });
    });
    level.appendChild(hintBtn);
  }

  function renderQ2() {
    level.innerHTML = '';
    level.appendChild(title);
    const prompt = document.createElement('p');
    prompt.className = 'dialog-text';
    prompt.textContent = 'Q2：詩句填空';
    level.appendChild(prompt);
    const clauses = extractClauses(q2Poem.full_text);
    const picked = Math.max(0, Math.floor(Math.random() * Math.max(1, clauses.length)));
    const content = document.createElement('p');
    content.className = 'dialog-text';
    content.innerHTML = clauses.map((c, i) => (i === picked ? `______${c.punct}` : `${c.text}${c.punct}`)).join('');
    level.appendChild(content);
    const hintBtn = document.createElement('button');
    hintBtn.className = 'button';
    hintBtn.type = 'button';
    hintBtn.textContent = '小雨提示';
    if (selectedCardId !== 'card_spring' || springHintUsedInRun) hintBtn.style.display = 'none';
    const options = document.createElement('div');
    options.className = 'options';
    const otherClauses = poetryLevelQuestions.filter(p => p !== q2Poem).flatMap(p => extractClauses(p.full_text).map(x => x.text));
    const distractorLines = shuffleArray(Array.from(new Set(otherClauses)).filter(ln => ln && ln !== clauses[picked].text)).slice(0, 3);
    const all = shuffleArray([clauses[picked].text, ...distractorLines]);
    all.forEach(line => {
      const btn = document.createElement('button');
      btn.className = 'button option';
      btn.type = 'button';
      btn.textContent = line;
      btn.addEventListener('click', () => {
        const ok = line === clauses[picked].text;
        if (ok) {
          const base = 15;
          applyLevelClear(level, base);
        } else {
          handleError('Number');
          if (errorCount === 1) {
            showPunishOverlay();
            showBlockModal('警告', [{ text: '身體與靈魂不匹配的警告...' }]);
          }
        }
      });
      options.appendChild(btn);
    });
    level.appendChild(options);
    hintBtn.addEventListener('click', () => {
    isHintUsedInLevel = true;
    springHintUsedInRun = true;
    hintBtn.style.display = 'none';
    playSpringHintEffect();
    const btns = options.querySelectorAll('button.option');
    btns.forEach(b => { if (b.textContent === clauses[picked].text) b.classList.add('hint-green'); });
    });
    level.appendChild(hintBtn);
  }

  renderQ1();
}

function startHuaiXiLevel() {
  applyLevelStyle('Number');
  updateCharacterDisplay();
  showHpBar();
  updateHpBar();
  const main = document.querySelector('main.container');
  let level = document.getElementById('levelHuaiXi');
  if (!level) {
    level = document.createElement('section');
    level.className = 'dialog-container';
    level.id = 'levelHuaiXi';
    main.appendChild(level);
  } else {
    level.innerHTML = '';
    level.style.display = '';
  }
  const title = document.createElement('h2');
  title.className = 'modal-title';
  title.textContent = '第六關：平定淮西';
  level.appendChild(title);

  const huaiXiQuestions = [
    { text: '「四」聖不宥', answer: '四' },
    { text: '「百」隸怠官', answer: '百' },
    { text: '「六」州降從', answer: '六' },
    { text: '「三」方分攻', answer: '三' },
    { text: '「五萬」其師', answer: '五萬' },
    { text: '其壃「千」里', answer: '千' },
    { text: '即伐「四」年', answer: '四' },
    { text: '「四」夷畢來', answer: '四' },
  ];
  const distractNumbers = ['一','二','五','七','八','九','十','百','千','萬'];
  const specials = ['緩','繁'];

  let q = sampleQuestions(huaiXiQuestions, 1)[0];
  const prompt = document.createElement('p');
  prompt.className = 'dialog-text';
  const masked = String(q.text).replace(/「[^」]*」/g, '「」');
  prompt.textContent = `挑戰：${masked}`;
  level.appendChild(prompt);

  const stage = document.createElement('div');
  stage.className = 'catch-stage';
  const catcher = document.createElement('div');
  catcher.className = 'catcher';
  stage.appendChild(catcher);
  level.appendChild(stage);

  let running = false;
  let needSecondChallenge = false;
  let slowUntil = 0;
  let targetCaught = false;
  let firstWaveTargetSpawned = false;
  const items = [];
  const rng = () => Math.random();
  const nowMs = () => performance.now();

  const ctrl = { x: 0.5, speed: 0.7 }; // normalized x [0,1]

  function setCatcherX(nx) {
    ctrl.x = Math.max(0, Math.min(1, nx));
    catcher.style.left = (ctrl.x * 100) + '%';
  }
  setCatcherX(0.5);

  function handleMove(dir, dt) {
    const base = ctrl.speed;
    const slow = nowMs() < slowUntil ? base * 0.4 : base;
    setCatcherX(ctrl.x + dir * slow * dt);
  }

  let lastTs = nowMs();
  function gameLoop() {
    if (!running) return;
    const ts = nowMs();
    const dt = Math.min(0.033, (ts - lastTs) / 1000);
    lastTs = ts;
    items.forEach(it => {
      it.y += it.v * dt;
      it.el.style.top = (it.y * 100) + '%';
      if (!it.caught && it.y >= 0.92) {
        const cx = ctrl.x;
        if (Math.abs(cx - it.x) <= 0.08) {
          it.caught = true;
          if (it.kind === 'target') {
            targetCaught = true;
            running = false;
            if (needSecondChallenge) {
              needSecondChallenge = false;
              const prev = q;
              const pool = huaiXiQuestions.filter(x => x !== prev);
              q = sampleQuestions(pool, 1)[0];
              const masked2 = String(q.text).replace(/「[^」]*」/g, '「」');
              prompt.textContent = `挑戰：${masked2}`;
              items.splice(0, items.length);
              Array.from(stage.querySelectorAll('.fall-item')).forEach(el => stage.removeChild(el));
              firstWaveTargetSpawned = false;
              showBlockModal('提示', [{ text: '第一句完成，進入第二句軍情挑戰' }], () => {
                showCountdown(() => { running = true; lastTs = nowMs(); requestAnimationFrame(gameLoop); });
              });
            } else {
              showBlockModal('提示', [{ text: '目標已捕獲！' }], () => {
                trackedSetTimeout(() => {
                  showBlockModal('通關', [{ text: '韓愈獲授刑部侍郎官服，功成名就！' }], () => { applyLevelClear(level, 20); });
                }, 700);
              });
            }
          } else if (it.kind === 'slow') {
            running = false;
            slowUntil = nowMs() + 3000;
            showBlockModal('提示', [{ text: '速度降低（緩）' }], () => {
              showCountdown(() => { running = true; lastTs = nowMs(); requestAnimationFrame(gameLoop); });
            });
          } else if (it.kind === 'complex') {
            running = false;
            needSecondChallenge = true;
            showBlockModal('提示', [{ text: '挑戰升級（繁）' }], () => {
              showCountdown(() => { running = true; lastTs = nowMs(); requestAnimationFrame(gameLoop); });
            });
          } else if (it.kind === 'wrong') {
            running = false;
            handleError('Number');
            showBlockModal('警告', [{ text: '身體與靈魂不匹配的警告...' }], () => {
              const stillHere = document.getElementById('levelHuaiXi');
              if (stillHere) {
                showCountdown(() => { running = true; lastTs = nowMs(); requestAnimationFrame(gameLoop); });
              }
            });
          }
        }
      }
      if (it.y > 1.2 && !it.removed) {
        it.removed = true;
        stage.removeChild(it.el);
      }
    });
    requestAnimationFrame(gameLoop);
  }

  function showCountdown(cb) {
    const overlay = document.createElement('div');
    overlay.className = 'countdown-overlay';
    const num = document.createElement('div');
    num.className = 'countdown-number';
    overlay.appendChild(num);
    stage.appendChild(overlay);
    let n = 3;
    function step() {
      num.textContent = String(n);
      if (n === 1) {
        const t = trackedSetTimeout(() => {
          stage.removeChild(overlay);
          if (typeof cb === 'function') cb();
        }, 700);
        timerRegistry.timeouts.add(t);
      } else {
        const t = trackedSetTimeout(() => { n -= 1; step(); }, 700);
        timerRegistry.timeouts.add(t);
      }
    }
    step();
  }

  showConfirmModal('提示', '準備好了嗎？', '準備好了', () => {
    running = true;
    lastTs = nowMs();
    requestAnimationFrame(gameLoop);
  });

  function activeItems() { return items.filter(it => !it.removed && !it.caught); }
  const minSpacingX = 0.2;
  const maxActive = 3;
  const spawnIntervalMs = 1800;

  function spawn(kind, text) {
    const el = document.createElement('div');
    el.className = 'fall-item';
    el.textContent = text;
    stage.appendChild(el);
    function pickX() {
      let x = rng();
      for (let i = 0; i < 8; i++) {
        const ok = activeItems().every(it => Math.abs(x - it.x) >= minSpacingX);
        if (ok) break;
        x = rng();
      }
      return x;
    }
    const obj = {
      el,
      kind,
      x: pickX(),
      y: -0.1,
      v: 0.06 + rng() * 0.12,
      caught: false,
      removed: false,
    };
    el.style.left = (obj.x * 100) + '%';
    el.style.top = (obj.y * 100) + '%';
    items.push(obj);
    // 無限時：不設結束計時
  }

  const spawnTimer = trackedSetInterval(() => {
    if (!running) return;
    if (!firstWaveTargetSpawned) {
      spawn('target', q.answer);
      const wrongs = sampleQuestions(distractNumbers, 2);
      spawn('wrong', wrongs[0]);
      spawn('wrong', wrongs[1]);
      spawn('slow', specials[0]);
      spawn('complex', specials[1]);
      firstWaveTargetSpawned = true;
      return;
    }
    if (activeItems().length >= maxActive) return;
    const r = rng();
    if (r < 0.25) spawn('target', q.answer);
    else if (r < 0.8) spawn('wrong', sampleQuestions(distractNumbers, 1)[0]);
    else spawn(rng() < 0.6 ? 'slow' : 'complex', rng() < 0.6 ? specials[0] : specials[1]);
  }, spawnIntervalMs);

  function cleanup() {
    clearInterval(spawnTimer);
  }
  level.addEventListener('transitionend', cleanup, { once: true });

  document.addEventListener('keydown', (ev) => {
    if (!running || isGameOver) return;
    if (ev.key === 'ArrowLeft' || ev.key === 'a') handleMove(-1, 1);
    if (ev.key === 'ArrowRight' || ev.key === 'd') handleMove(1, 1);
  });
  stage.addEventListener('mousemove', (ev) => {
    const rect = stage.getBoundingClientRect();
    const nx = (ev.clientX - rect.left) / rect.width;
    setCatcherX(nx);
  });
  stage.addEventListener('touchmove', (ev) => {
    const t = ev.touches[0];
    if (!t) return;
    const rect = stage.getBoundingClientRect();
    const nx = (t.clientX - rect.left) / rect.width;
    setCatcherX(nx);
  }, { passive: true });

}

const dreamQuestionBank = [
  { q: '〈感二鳥賦〉中的「二鳥」主要象徵什麼？', options: ['自然界的奇異現象', '自身仕途與才德不遇', '官員競爭與爭名逐利', '對古人的景仰與學習'], correct: 1, explain: '二鳥象徵韓愈才德不遇、時運未到的處境。' },
  { q: '〈復志賦〉中仕途不順、抱負未酬的主要原因？', options: ['才德不足', '時運未到難以施展', '家境貧寒', '沉於自然遊歷'], correct: 1, explain: '核心在時運未至，雖有才德亦難施展。' },
  { q: '〈閔己賦〉「閔己」的主要情感是？', options: ['好奇自然', '憂慮才德未施', '自滿祖功', '追求名利'], correct: 1, explain: '作者自憂自省，感嘆才德難以施展。' },
  { q: '〈別知賦〉作者對朋友的態度與感受？', options: ['隨緣交友', '珍視友誼感慨別離', '權勢利益不可信', '友情不如仕途重要'], correct: 1, explain: '重友情、惜別離，感人生無常。' },
  { q: '〈元和聖德詩〉主要意圖？', options: ['描寫邊塞殘酷', '讚頌皇帝聖德與治績', '記錄臣下升遷', '諷刺藩鎮叛亂'], correct: 1, explain: '全篇在頌揚皇帝聖德與施政功績。' },
  { q: '〈南山詩〉作者藉四季景象主要意圖？', options: ['地理位置與高度', '自然壯麗與變化', '被貶心情遭遇', '科學觀察資料'], correct: 1, explain: '四季描寫突出南山的壯麗與變化。' },
  { q: '〈謝自然詩〉寒女謝自然的特點？', options: ['受父母寵愛', '追求神仙之術能感應', '善於農耕紡織', '長壽無災'], correct: 1, explain: '她追求修道，能感應天地幽冥。' },
  { q: '〈赴江陵途中…〉主要情感？', options: ['讚美風景', '同情貧民與欣慰官府', '政治失意羈旅悲憤無奈', '友情與同僚讚賞'], correct: 2, explain: '重點是政治失意與漂泊的悲憤無奈。' },
  { q: '〈暮行河堤上〉最正確理解？', options: ['人聲鼎沸熱鬧歡欣', '獨行河堤夜歸愁思無奈', '春日景色心情愉快', '與友人夜遊成功喜悅'], correct: 1, explain: '孤寂夜歸，愁思與無奈為核心意境。' },
  { q: '〈夜歌〉主旨最正確？', options: ['恐懼與孤單', '夜晚自省心境自得', '憂慮世事力不從心', '僅描寫夜景不涉內心'], correct: 1, explain: '夜間自省，心境自得、無怨無悔。' },
  { q: '〈原道〉內容理解最正確？', options: ['道德與仁義無關', '先王以仁義治世秩序安定', '不必學仁義道德', '貧窮與盜賊因缺制度'], correct: 1, explain: '仁義為治世根本，使社會秩序安定。' },
  { q: '〈原性〉對「性」與「情」的看法？', options: ['性後天習得情與生俱來', '性情皆有三品可教可制', '性完全不可改變', '上等性必不犯錯'], correct: 1, explain: '性與情皆有上中下之分，可教可制。' },
  { q: '〈原毀〉古今君子比較最正確？', options: ['古君子責人詳待己廉', '古君子責己重以周待人輕以約', '古君子不修己今君子自重', '古重名譽今重道德'], correct: 1, explain: '古君子嚴於責己、寬於待人；今反之。' },
  { q: '〈原人〉「人道亂，而夷狄禽獸不得其情」意指？', options: ['人行為失序天地混亂', '人失正道則夷狄禽獸受影響', '自然規律不變', '聖人只治天道地道'], correct: 1, explain: '人道失序將牽動萬物秩序的失衡。' },
  { q: '〈原鬼〉主要意思？', options: ['鬼神隨時顯現主宰萬物', '鬼神全為虛構', '人違天理民倫自然而感應有鬼', '鬼神有聲有形隨意施禍福'], correct: 2, explain: '人事違道而感應，鬼神活動隨之起應。' },
  { q: '〈行難〉與陸先生對話指出的觀念？', options: ['階級固定不應仕途', '只重名望不重才能', '聖賢成功因家世', '不以出身限制成就'], correct: 3, explain: '真正賢才可能出自任何階層，不拘出身。' },
  { q: '〈對禹問〉禹選擇傳子非傳賢的理由？', options: ['前定繼承可止爭亂', '子孫皆聖人', '民心期望世襲', '舜強求傳子'], correct: 0, explain: '前定繼承可止爭奪，至少能守法安定。' },
  { q: '〈讀荀〉末評「孟氏醇乎醇，荀與揚大醇而小疵」意指？', options: ['三家影響不如百家', '思想由淺入深荀最圓滿', '孟子最純正荀揚稍有瑕疵', '荀揚最接近春秋筆法'], correct: 2, explain: '孟子最純正；荀、揚大體合道而略有瑕疵。' },
  { q: '〈讀鶡冠子〉整體評價最貼切？', options: ['多誤價值有限', '只重文字不論思想', '推崇為最純正道家', '肯定部分篇章足以治天下並校正文字'], correct: 3, explain: '肯定其要義，認為足以治天下，並親校文字。' },
  { q: '〈讀儀禮〉作者主要態度？', options: ['過時難懂不必研究', '制度已失毫無價值', '雖難讀仍保存周制極為珍貴', '應全由後代改制'], correct: 2, explain: '雖難讀不行於今，但保存周制，價值極高。' },
  { q: '〈讀墨子〉儒、墨之異的根本原因？', options: ['儒墨理念完全相反', '代表不同利益必然對立', '互不瞭解經典致曲解', '後學成見各售師說非本意對立'], correct: 3, explain: '儒墨之爭多出於後學成見，非孔墨本意。' },
  { q: '〈獲麟解〉「以德不以形」意旨？', options: ['形體特殊無法判吉凶', '外形多端易混淆', '德義判準：應聖人而出', '聖人看不出外貌故存疑'], correct: 2, explain: '麟之為麟在德義：因聖人在位而出。' },
  { q: '〈師說〉弟子不必不如師的理由？', options: ['弟子更通世務', '制度重年齡地位對等', '聖人皆受業於眾人', '聞道有先後術業有專攻'], correct: 3, explain: '聞道有先後、術業有專攻，不以年齡地位判。' },
  { q: '〈進學解〉提孟子荀子遭遇用意？', options: ['性格剛強難仕進', '戰亂不採用儒學', '有才德者未必遇知時', '不勤學修德更不得認可'], correct: 2, explain: '至賢亦可能不遇於世，遭貶非因無能。' },
  { q: '〈本政〉後世政治混亂原因？', options: ['人民不遵古制', '君主過度依賴武力', '一時之法被當永恆之道', '忽略商周外史事'], correct: 2, explain: '以權宜一時之術誤作永恆之道，迷惑民心。' },
  { q: '依〈守戒〉內容，作者認為國家面對外患時最根本的防備之道是什麼？', options: ['加強城牆與陷阱等物理防禦', '擴大領土以拉開與敵國的距離', '增強財力以儲備更多兵器', '得人——任用合適之人才'], correct: 3, explain: '末段指出「在得人」，真正防備在於用人得當，而非僅靠物理手段或地形。' },
  { q: '從〈圬者王承福傳〉來看，王承福選擇以「圬者」為終身職業的主要原因是什麼？', options: ['該行業能快速致富，利潤遠高於農業', '認為勞力之事雖辛苦但可力而有功，取其直而無愧，心安', '他身體羸弱，只能做輕鬆的工作', '想藉此行業結識貴族以求仕進'], correct: 1, explain: '「夫镘易能，可力焉，又誠有功，取其直，雖勞無愧，吾心安焉」；以勞力換取正當報酬，雖辛苦而無愧於心。' },
  { q: '〈諱辯〉中韓愈主張李賀舉進士並無違犯避諱，其主要論證方式為何？', options: ['指出李賀父名與「進士」二字在字形上完全不同', '以經典、律例與歷代不諱的事例證明避諱並非如此拘泥', '強調李賀文名卓絕，不應以小節拘人', '以皇甫湜的意見作為最終權威'], correct: 1, explain: '引《律》《經》《春秋》及周公、孔子、漢代例，證明「二名不偏諱」「不諱嫌名」，反證偏執避諱之非。' },
  { q: '在〈訟風伯〉一文中，作者之所以「上訟」風伯，其核心理由為何？', options: ['風伯不遵天命，擅自掀起暴雨淹沒農作', '風伯吹散雲氣、阻止雨水成形，使旱災加劇', '風伯奪走暘烏之光，使人間失去陽氣', '風伯未接受祭祀，因此憤怒報復人間'], correct: 1, explain: '風伯「吹使離之」，使「氣不得化」「雲不得施」，雨將成而不成，導致大旱。' },
  { q: '〈伯夷頌〉中作者認為伯夷、叔齊之行為最能體現其「特立獨行」的原因是什麼？', options: ['他們拒絕追隨微子一起逃離殷朝', '他們反對武王、周公討伐殷紂，並在殷亡後恥食周粟而餓死', '他們曾勸諫天下諸侯不要攻殷', '他們在周朝被封為賢士卻主動隱退山林'], correct: 1, explain: '反對伐紂，天下歸周後恥食其粟，餓死不顧，堅守義理、特立獨行。' },
  { q: '根據〈子產不毀鄉校頌〉，子產主張不毀鄉校的主要理由是什麼？', options: ['鄉校是鄭國祭祀的重要場所', '留下鄉校可以讓人民自由議論，從而成就政治上的美善', '鄉校是古代制度，毀之不敬', '毀鄉校會使外國誤會鄭國無文化'], correct: 1, explain: '「可以成美……川不可防，言不可弭。下塞上聾，邦其傾矣。」保留民間議論空間，成就政治之美善。' },
  { q: '根據〈釋言〉，韓愈認為自己「不可能傲慢放言」的主要理由是什麼？', options: ['自己年紀太輕，尚不足以在朝堂上發言', '自知才能有限，沒有任何可倚仗的背景力量', '他覺得讒言終會自然消失，不須理會', '宰相與翰林學士皆十分偏袒他，因此不會相信讒言'], correct: 1, explain: '自述「無所恃」：族親鮮少、不善交人、無宿資、弱於才而腐於力，故不可能有恃無恐、傲慢敖言。' },
  { q: '根據〈愛直贈李君房別〉，韓愈之所以特意「為天下道其為人」的最主要原因是什麼？', options: ['他擔心世人誤以為李生仗勢倚靠貴戚', '他認為李生文采絕倫，值得廣為宣傳', '他希望南陽公能以更高官職任用李生', '他想替南陽公澄清政績，避免被誤解'], correct: 0, explain: '外人或誤以為李生托婚貴富以求利，故特為其人品（正直、敢言、審思）作證明。' },
  { q: '韓愈在〈張中聽傳後敘〉中特別強調許遠的最大功績是什麼？', options: ['能統禦軍隊、善於作戰，屢破叛軍', '能以寬厚待人，使部將人人願意死守', '與張巡同心協力，守一城以捍全天下', '斷指明志，向賀蘭請求出兵援助'], correct: 2, explain: '「守一城，捍天下」為論旨重心，睢陽一城之守，關乎江淮與天下局勢。' },
  { q: '〈河中府連理木頌〉中「連理木」的出現最主要象徵什麼？', options: ['王尹治理河中府時，上天以祥瑞示其德政', '戰禍將至，天地示警', '城中將發生水患，需及早修治河道', '民間妖異之氣交結，預示災異'], correct: 0, explain: '以王尹之德「交暢」感天降祥，全文為德政頌，連理木象徵德政感天、祥瑞示現。' },
  { q: '〈汴州東西水門記〉最主要的論述重心是？', options: ['描寫水門建築的技術與壯麗', '記錄汴州河水地勢變化的原因', '讚揚隴西公施政得當、德政顯著', '述說人民樂於參與慶典的盛況'], correct: 2, explain: '全文表面在記水門落成，實質以工程為引，集中歌頌隴西公「拯危去疵」「布武宣文」「神應祥福」等德政，是典型的政績碑銘文體。' },
  { q: '〈燕喜亭記〉最主要的論述核心是？', options: ['展示連州自然景觀的奇特壯麗', '記錄燕喜亭建造過程的細節', '借燕喜亭與諸景之名，肯定王宏中的德行與前途', '描述地方百姓對此亭的讚嘆與向往'], correct: 2, explain: '文章表面寫亭景之勝、命名之義，本質在於以山水寓德，讚美王宏中「智以謀之，仁以居之」，點出其德性與仕途可望再振，是典型以事寓德的敘事碑記。' },
  { q: '〈徐、泗、豪三州節度掌書記廳石記〉的主旨是？', options: ['說明節度使所轄三州的軍政情況', '強調書記一職的艱難與瑣碎', '讚揚南陽公與其三位掌書記文才相得、賓主和合', '記錄書記廳建成與刻石的過程'], correct: 2, explain: '文章以書記職任為引，實旨在稱頌南陽公文名冠世，且所辟三位書記皆「閎辨通敏」之才；又以賓主文章互為映照，氣合志同為文壇佳事，因此刻石以誌。' },
  { q: '下列何者最能概括〈畫記〉本文所強調的核心意義？', options: ['古代軍旅生活的艱困與戰爭場面的真實再現', '此畫以眾多人物與動物姿態展現工筆細緻、匠意群集的藝術價值', '作者在旅途中偶然獲得珍物，象徵命運的無常', '趙侍御憶起少年志業，反映仕途與抱負的落差'], correct: 1, explain: '全文詳記此畫所描繪人物、馬匹、器物之繁多與各異姿態，並強調其「非一工人所能運思」而是「藂集眾工之所長」，核心在凸顯作品的藝術高度與技藝之精妙。' },
  { q: '下列何者最能概括〈藍田縣丞廳壁記〉主旨？', options: ['讚揚藍田縣丞職位的重要性與權力之大', '揭示地方官署制度中「丞」名位不符、職權受限的困境', '記述崔斯立如何以文章與學識在京師顯名', '描述丞廳環境之優美與修繕後的煥然一新'], correct: 1, explain: '全文以「丞」職為核心，先寫其職責應廣，而實際權勢反被主簿、尉所制，名位不符；再敘崔斯立才學優異卻因制度安排而抱負難展，皆指向制度造成的職位困境，是全文的主旨所在。' },
  { q: '〈新修滕王閣記〉最主要表達的中心思想為何？', options: ['韓愈藉由重修滕王閣，抒寫江南勝景之美與登臨之樂。', '韓愈追述滕王閣的歷史傳承，強調三王文章的文學價值。', '韓愈感慨仕途多舛，卻因王中丞的任事與治理，使民生大治，終得以補書記文。', '借重修滕王閣一事，讚頌王中丞廉能政績與不侈不廢的施政態度，並述自身得以為其立記的榮幸。'], correct: 3, explain: '重點在讚頌王中丞德政與不侈不廢之修閣，作者亦以得立記為榮。' },
  { q: '〈科斗書後記〉一文的核心用意是什麼？', options: ['詳細考證科斗文與篆書、八分書的字形源流', '炫示韓愈家族在書法史上的卓越地位', '說明自己學習古文字、保存古書的完整成果', '交代古書傳承的因緣，並表明學古文字是為寫作與立言所需'], correct: 3, explain: '重點在傳承與用古：學古文字為銘述德、立言服務；敬重古書，不私有。' },
  { q: '〈鄆州溪堂詩〉中，韓愈藉由敘事與詩歌主要要彰顯的是哪一核心觀念？', options: ['鄆州地理形勢險要，足以成為四方屏障', '馬公以武力鎮壓驕兵，迅速平定多年積亂', '善政須先以德化人，使眾心歸附，然後邦國自安', '建築溪堂的目的在於宴飲賓客、歌詠山水之樂'], correct: 2, explain: '德化先行、上勤下順，方能邦國既安；武力非治亂之本。' },
  { q: '〈貓相乳〉一文中，韓愈藉由「貓相乳」的異事，主要要說明的是哪一核心思想？', options: ['動物亦具仁義之性，可與人相比', '奇異自然現象本身具有預示吉凶的功能', '有德之人能感化萬物，祥瑞乃德政所致', '家庭倫理秩序是治國成功的唯一條件'], correct: 2, explain: '否定動物本具仁義；以德政感通而致祥，《易》所謂「信及豚魚」。' },
  { q: '〈爭臣論〉中，韓愈對諫議大夫陽城的主要批評是下列何者？', options: ['陽城學問不足，無法勝任諫官之職', '陽城品行雖高，卻以清高自守而曠其官責', '陽城諫言過於激烈，易招君上怨恨', '陽城貪戀俸祿，不願辭官歸隱'], correct: 1, explain: '在其位不任其職：諫官應盡言責，不可高潔而不諫政事。' },
  { q: '〈改葬服議〉中，韓愈對「改葬時所服之服制」的核心主張為何？', options: ['改葬應依原本喪禮，恢復斬衰或重服', '改葬一律不服喪，以免加重哀戚', '改葬僅對父母服緦麻，其餘親屬不服', '改葬可視情況加重服制，以表孝心'], correct: 2, explain: '據《經》《穀梁》，改葬對父母服最輕緦麻，其餘不服；禮有進無退、以輕為宜。' },
  { q: '〈省試學生代齋郎議〉中，韓愈反對以學生取代齋郎的最核心理由是什麼？', options: ['齋郎出身低賤，不宜由學生兼任', '學生人數不足，無法分擔齋郎之役', '以德藝之士從事力役，既失禮制又違教化', '宗廟之事過於瑣碎，無須專設齋郎'], correct: 2, explain: '君子之職在德藝教化，不宜服小人之事；不專不習，近於不敬宗廟。' },
  { q: '〈禘祫議〉中，韓愈提出的核心主張是下列哪一項？', options: ['毀去獻、懿二祖廟主，以合於後世禮制', '將獻、懿二祖遷出太廟，改於陵所致祭', '禘祫時以獻祖居東向位，太祖景皇帝從昭穆', '另立新廟專祀獻、懿二祖，不再參與禘祫'], correct: 2, explain: '禘祫合祭當遵父子倫理：獻、懿祖居尊位；景皇帝以孫屈於祖，合乎禮與人情。' },
  { q: '〈省試顏子不貳過論〉中，韓愈對「不貳過」的根本解釋是下列哪一項？', options: ['顏子天資近聖，因此一生幾乎沒有任何過失', '能在過失表現於言行前，於心念初萌即止絕', '嚴守外在禮法，所以不讓過錯反覆發生', '隱居陋巷、遠離世事，因此減少犯錯機會'], correct: 1, explain: '過在心念之萌，顏子能自覺自止，使過不入於言行，故稱不貳過。' },
  { q: '〈與李秘書論小功不稅書〉中，韓愈對「小功不稅」的主要質疑重點是下列哪一項？', options: ['「小功不稅」本是聖人立禮，用以減輕喪服負擔', '「小功不稅」只適用於古代，今人不必再討論', '將「不稅」解為「不追服」，違背人情與孝道', '小功所涉親屬過遠，本就不應服喪'], correct: 2, explain: '誤解「不稅」為完全不補服，違人情與孝道；禮本於人情，不可以制度掩飾冷漠。' },
];

function startDreamLevel() {
  dreamGambleActive = false;
  applyLevelStyle('Dream');
  updateCharacterDisplay();
  showHpBar();
  updateHpBar();
  const main = document.querySelector('main.container');
  const sec = document.createElement('section');
  sec.className = 'dialog-container';
  const title = document.createElement('h2');
  title.className = 'modal-title';
  title.textContent = '做夢關：夢境試題';
  const dreamActions = document.createElement('div');
  dreamActions.className = 'actions';
  let triggerBtn = null;
  if (selectedCardId === 'card_dream') {
    triggerBtn = document.createElement('button');
    triggerBtn.className = 'button';
    triggerBtn.type = 'button';
    triggerBtn.textContent = '觸發：莊周夢蝶（+10% 稀有事件）';
    triggerBtn.addEventListener('click', () => {
      dreamGambleActive = true;
      triggerBtn.disabled = true;
      triggerBtn.textContent = '已觸發：莊周夢蝶';
    });
    dreamActions.appendChild(triggerBtn);
    if (dreamGambleAutoActivate) {
      dreamGambleActive = true;
      dreamGambleAutoActivate = false;
      triggerBtn.disabled = true;
      triggerBtn.textContent = '已觸發：莊周夢蝶';
    }
  }
  const verAll = getCharacterVersion();
  const boost = dreamGambleActive ? 1.10 : 1.00;
  if (verAll === 'aged' && Math.random() < 0.0005 * boost) {
    bumpScore(-10);
    const imgDark = 'han_yu_aged_dark_cuisine.png';
    showBlockModal('夢境', [{ image: imgDark, text: '腥臊始發越，咀吞面汗騂｜受到驚嚇：-10 分' }], () => { sec.remove(); if (selectedCardId === 'card_dream') consumeCard(); goToNextLevel(); });
    return;
  }
  if (Math.random() < 0.001 * boost) {
    bumpScore(10);
    const ver = verAll;
    const imgKey = ver === 'youth' ? 'han_yu_youth_sleep.png' : ver === 'middle' ? 'han_yu_middle_sleep.png' : 'han_yu_aged_sleep.png';
    const items = imgKey ? [{ image: imgKey, text: '你做了一場好夢，精神飽滿：+10 分' }] : [{ text: '你做了一場好夢，精神飽滿：+10 分' }];
    showBlockModal('夢境', items, () => { sec.remove(); if (selectedCardId === 'card_dream') consumeCard(); goToNextLevel(); });
    return;
  }
  if (Math.random() < 0.05 * boost) {
    const imgIns = verAll === 'youth' ? 'han_yu_youth_insomnia.png' : verAll === 'middle' ? 'han_yu_middle_insomnia.png' : 'han_yu_aged_insomnia.png';
    showBlockModal('夢境', [{ image: imgIns, text: '夜歸孤舟卧，展轉空及晨。謀計竟何就，嗟嗟世與身。' }], () => { sec.remove(); if (selectedCardId === 'card_dream') consumeCard(); goToNextLevel(); });
    return;
  }
  const qs = sampleQuestions(dreamQuestionBank, 1)[0];
  const prompt = document.createElement('p');
  prompt.className = 'dialog-text';
  prompt.textContent = qs.q;
  const list = document.createElement('div');
  list.className = 'option-list';
  qs.options.forEach((opt, i) => {
    const btn = document.createElement('button');
    btn.className = 'button option';
    btn.type = 'button';
    btn.textContent = opt;
    btn.addEventListener('click', () => {
      const ok = i === qs.correct;
      if (ok) {
        const msg = document.createElement('p');
        msg.className = 'dialog-text';
        msg.textContent = '選擇獎勵：';
        const actions = document.createElement('div');
        actions.className = 'actions';
        const healBtn = document.createElement('button');
        healBtn.className = 'button';
        healBtn.type = 'button';
        healBtn.textContent = '回血';
        const scoreBtn = document.createElement('button');
        scoreBtn.className = 'button';
        scoreBtn.type = 'button';
        scoreBtn.textContent = '+5分';
        const finalize = (fn) => { healBtn.disabled = true; scoreBtn.disabled = true; fn(); };
        healBtn.addEventListener('click', () => {
          finalize(() => {
            errorCount = Math.max(0, errorCount - 1);
            updateHpBar();
            showBlockModal('提示', [{ text: '已回血' }], () => { sec.remove(); if (selectedCardId === 'card_dream') consumeCard(); goToNextLevel(); });
          });
        });
        scoreBtn.addEventListener('click', () => {
          finalize(() => {
            bumpScore(5);
            showBlockModal('提示', [{ text: '獲得 +5 分' }], () => { sec.remove(); if (selectedCardId === 'card_dream') consumeCard(); goToNextLevel(); });
          });
        });
        actions.appendChild(healBtn);
        actions.appendChild(scoreBtn);
        sec.appendChild(msg);
        sec.appendChild(actions);
      } else {
        const ex = qs.explain || '解析：請再思考本文主旨與關鍵語句。';
        showBlockModal('解析', [{ text: ex }, { text: '單純夢醒，進入下一關。' }], () => { sec.remove(); if (selectedCardId === 'card_dream') consumeCard(); goToNextLevel(); });
      }
    });
    list.appendChild(btn);
  });
  sec.appendChild(title);
  if (dreamActions.children.length) sec.appendChild(dreamActions);
  sec.appendChild(prompt);
  sec.appendChild(list);
  main.appendChild(sec);
}

function startReviewLevel() {
  const prevContainer = document.getElementById('level-container');
  if (prevContainer) prevContainer.remove();
  const main = document.querySelector('main.container');
  let sec = document.getElementById('levelReview');
  if (!sec) {
    sec = document.createElement('section');
    sec.className = 'dialog-container';
    sec.id = 'levelReview';
    main.appendChild(sec);
  } else {
    sec.innerHTML = '';
    sec.style.display = '';
  }
  const title = document.createElement('h2');
  title.className = 'modal-title';
  title.textContent = '老生常談關：關卡名稱排序';
  const prompt = document.createElement('p');
  prompt.className = 'dialog-text';
  prompt.textContent = '請拖曳排列成第一關至第十關的正確順序';
  const expected = ['句讀明義','四次科舉','三次上書','結交孟郊','五原立論','平定淮西','諫迎佛骨','祭鱷魚文','為友撰銘','仕途頂峰'];
  const list = document.createElement('ul');
  list.id = 'reviewList';
  list.style.listStyle = 'none';
  list.style.padding = '0';
  list.style.margin = '0';
  list.style.width = 'min(560px, 92vw)';
  const shuffled = expected.slice().sort(() => Math.random() - 0.5);
  shuffled.forEach(name => {
    const li = document.createElement('li');
    li.className = 'review-item';
    li.draggable = true;
    li.textContent = name;
    li.style.padding = '0.6rem 0.75rem';
    li.style.margin = '0.35rem 0';
    li.style.border = '1px solid #2a2a2a';
    li.style.borderRadius = '10px';
    li.style.background = 'var(--surface)';
    li.style.color = 'var(--fg)';
    li.style.cursor = 'grab';
    li.addEventListener('dragstart', (e) => { li.classList.add('dragging'); e.dataTransfer.effectAllowed = 'move'; });
    li.addEventListener('dragend', () => { li.classList.remove('dragging'); });
    li.addEventListener('dragover', (e) => { e.preventDefault(); e.dataTransfer.dropEffect = 'move'; });
    li.addEventListener('drop', (e) => { e.preventDefault(); const dragging = list.querySelector('.dragging'); if (!dragging || dragging === li) return; list.insertBefore(dragging, li.nextSibling); });
    const controls = document.createElement('div');
    controls.className = 'actions';
    const up = document.createElement('button');
    up.className = 'button';
    up.type = 'button';
    up.textContent = '↑';
    up.style.padding = '0.4rem 0.6rem';
    up.addEventListener('click', () => { const prev = li.previousElementSibling; if (prev) list.insertBefore(li, prev); });
    const down = document.createElement('button');
    down.className = 'button';
    down.type = 'button';
    down.textContent = '↓';
    down.style.padding = '0.4rem 0.6rem';
    down.addEventListener('click', () => { const next = li.nextElementSibling; if (next) list.insertBefore(next, li); });
    controls.appendChild(up);
    controls.appendChild(down);
    li.appendChild(controls);
    list.appendChild(li);
  });
  const submit = document.createElement('button');
  submit.className = 'button';
  submit.type = 'button';
  submit.textContent = '提交排序';
  submit.addEventListener('click', () => {
    const actual = Array.from(list.children).map(el => el.firstChild.nodeValue.trim());
    const ok = actual.length === expected.length && actual.every((x, i) => x === expected[i]);
    if (ok) {
      bumpScore(30);
      const ms = startTime ? Math.max(0, (Date.now() - startTime) + (selectedCardId === 'card_dragon' ? TIME_BUFF : 0)) : Number.MAX_SAFE_INTEGER * 1000;
      const elapsedSec = Math.floor(ms / 1000);
      const fastRoute = elapsedSec <= 600;
      if (fastRoute) {
        showBlockModal('通關', [{ text: '你在十分鐘內完成排序，開啟迴光返照福利。' }], () => { sec.style.display = 'none'; startRevivalLevel(); });
      } else {
        showBlockModal('通關', [{ text: '你完整回顧了旅程，秩序井然。' }], () => { sec.style.display = 'none'; finalizeGame(); });
      }
    } else {
      const prev = matchScore;
      if (prev > 0) bumpScore(-prev);
      const ms = startTime ? Math.max(0, (Date.now() - startTime) + (selectedCardId === 'card_dragon' ? TIME_BUFF : 0)) : Number.MAX_SAFE_INTEGER * 1000;
      const elapsedSec = Math.floor(ms / 1000);
      const fastRoute = elapsedSec <= 600;
      orderFailed = true;
      if (fastRoute) {
        showBlockModal('白活了', [{ text: `順序錯誤，所有分數歸零（-${prev} 分）。但你在十分鐘內抵達，進入迴光返照關。` }], () => { sec.style.display = 'none'; startRevivalLevel(); });
      } else {
        showBlockModal('白活了', [{ text: `順序錯誤，所有分數歸零（-${prev} 分）。` }], () => { sec.style.display = 'none'; finalizeGame(); });
      }
    }
  });
  const reshuffle = document.createElement('button');
  reshuffle.className = 'button';
  reshuffle.type = 'button';
  reshuffle.textContent = '隨機重排';
  reshuffle.addEventListener('click', () => {
    const all = Array.from(list.children);
    all.forEach(ch => ch.remove());
    const newOrder = expected.slice().sort(() => Math.random() - 0.5);
    newOrder.forEach(name => {
      const li = all.find(x => x.firstChild && x.firstChild.nodeValue && x.firstChild.nodeValue.trim() === name);
      if (li) list.appendChild(li);
    });
  });
  const actions = document.createElement('div');
  actions.className = 'actions';
  actions.appendChild(submit);
  actions.appendChild(reshuffle);
  sec.appendChild(title);
  sec.appendChild(prompt);
  sec.appendChild(list);
  sec.appendChild(actions);
}


function startRevivalLevel() {
  applyLevelStyle('Dream');
  hideHpBar();
  const main = document.querySelector('main.container');
  let sec = document.getElementById('revivalLevel');
  if (!sec) {
    sec = document.createElement('section');
    sec.className = 'dialog-container';
    sec.id = 'revivalLevel';
    main.appendChild(sec);
  } else {
    sec.innerHTML = '';
    sec.style.display = '';
  }
  const title = document.createElement('h2');
  title.className = 'modal-title';
  title.textContent = '迴光返照關：30秒問答';
  const img = document.createElement('img');
  img.alt = '迴光返照';
  img.src = 'han_yu_immortal.png';
  img.style.maxWidth = '280px';
  img.style.border = '1px solid #2a2a2a';
  img.style.borderRadius = '10px';
  img.addEventListener('load', () => { try { unlockIllustration(img.src); } catch {} }, { once: true });
  const timerText = document.createElement('p');
  timerText.className = 'dialog-text';
  let remain = 30;
  timerText.textContent = `倒數：${remain} 秒`;
  const qText = document.createElement('p');
  qText.className = 'dialog-text';
  const options = document.createElement('div');
  options.className = 'options';
  const bank = dreamQuestionBank;
  let queue = bank.slice();
  for (let i = queue.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); const t = queue[i]; queue[i] = queue[j]; queue[j] = t; }
  function renderOne() {
    if (queue.length === 0) { qText.textContent = '題庫已用完'; options.innerHTML = ''; return; }
    const item = queue.shift();
    qText.textContent = item.q;
    options.innerHTML = '';
    item.options.forEach((opt, i) => {
      const btn = document.createElement('button');
      btn.className = 'button option';
      btn.type = 'button';
      btn.textContent = opt;
      btn.addEventListener('click', () => { if (i === item.correct) bumpScore(5); renderOne(); });
      options.appendChild(btn);
    });
  }
  renderOne();
  sec.appendChild(title);
  sec.appendChild(img);
  sec.appendChild(timerText);
  sec.appendChild(qText);
  sec.appendChild(options);
  const tid = trackedSetInterval(() => {
    remain -= 1;
    timerText.textContent = `倒數：${remain} 秒`;
    if (remain <= 0) {
      clearInterval(tid);
      showBlockModal('時間到', [{ text: '迴光返照結束。' }], () => { sec.style.display = 'none'; finalizeGame(); });
    }
  }, 1000);
}

function startLevel10() {
  applyLevelStyle('Number');
  updateCharacterDisplay();
  showHpBar();
  updateHpBar();
  const container = document.getElementById('level-container');
  if (!container) {
    const main = document.querySelector('main.container');
    const sec = document.createElement('section');
    sec.className = 'dialog-container';
    sec.id = 'level-container';
    main.appendChild(sec);
  }
  const ctn = document.getElementById('level-container');
  ctn.innerHTML = `
        <div id="game-container"> 
            <div id="score-display">0 / 10</div> 
            <canvas id="gameCanvas" width="400" height="600"></canvas> 
            <div id="start-screen" class="ui-layer"> 
                <h1>第十關：仕途頂峰</h1> 
                <p>點擊螢幕控制，穿梭於障礙。</p> 
                <button class="btn" id="start-btn">開始履職</button> 
            </div> 
            <div id="win-screen" class="ui-layer hidden"> 
                <h1>通關！</h1> 
                <p>仕途頂峰達成！</p> 
                <button class="btn" id="win-btn">繼續旅程</button> 
            </div> 
        </div> 
    `;

  const canvas = document.getElementById('gameCanvas'); 
  const gameContainer = document.getElementById('game-container');
  const fitCanvas = () => {
    const maxW = 400, maxH = 600, ratio = maxH / maxW;
    const vw = Math.floor(window.innerWidth * 0.92);
    const vh = Math.floor(window.innerHeight * 0.75);
    let w = Math.min(maxW, vw);
    let h = Math.min(Math.floor(w * ratio), vh);
    if (h < Math.floor(w * ratio)) {
      w = Math.floor(vh / ratio);
      h = vh;
    }
    canvas.width = w;
    canvas.height = h;
    gameContainer.style.width = w + 'px';
    gameContainer.style.height = h + 'px';
  };
  fitCanvas();
  const ctx = canvas.getContext('2d'); 
  
  let frames = 0, score = 0, isRunning = false; 
  let levelStartMs = 0; const FALL_DELAY_MS = 1200;
  const targetScore = 10; 
  const PIPE_SPAWN_INTERVAL = 150, FIRST_PIPE_DELAY = 120;   

  const player = { 
      x: 50, y: 150, width: 30, height: 30, velocity: 0, gravity: 0.18, jump: -4.6, 
      draw: function() { 
          ctx.fillStyle = "#8e44ad"; 
          ctx.fillRect(this.x, this.y, this.width, this.height); 
      }, 
      update: function() { 
          const elapsed = performance.now() - levelStartMs; 
          if (elapsed >= FALL_DELAY_MS) this.velocity += this.gravity; 
          this.y += this.velocity; 
          if (elapsed >= FALL_DELAY_MS) { 
            if (this.y + this.height > canvas.height || this.y < 0) { 
              levelFailed(); 
            } 
          } else { 
            if (this.y < 0) { this.y = 0; this.velocity = 0; } 
            if (this.y + this.height > canvas.height) { this.y = canvas.height - this.height; this.velocity = 0; } 
          } 
      } 
  }; 

  const pipes = { 
      items: [], width: 50, gap: 160, dx: 2, 
      draw: function() { 
          for(let p of this.items) { 
              ctx.fillStyle = "#2ecc71"; // 上柱 (權貴) 
              ctx.fillRect(p.x, 0, this.width, p.y); 
              ctx.fillStyle = "#e74c3c"; // 下柱 (貪腐) 
              ctx.fillRect(p.x, p.y + this.gap, this.width, canvas.height - p.y - this.gap); 
          } 
      }, 
      update: function() { 
          if(frames > FIRST_PIPE_DELAY && frames % PIPE_SPAWN_INTERVAL === 0) { 
              let maxY = canvas.height - 150 - this.gap; 
              let minY = 50; 
              this.items.push({ x: canvas.width, y: Math.floor(Math.random() * (maxY - minY + 1) + minY), passed: false }); 
          } 

          for(let i=0; i<this.items.length; i++) { 
              let p = this.items[i]; 
              p.x -= this.dx; 

              // 碰撞檢測 
              if(player.x < p.x + this.width && player.x + player.width > p.x && 
                 (player.y < p.y || player.y + player.height > p.y + this.gap)) { 
                  levelFailed(); 
              } 

              // 通過檢測 
              if(p.x + this.width < player.x && !p.passed) { 
                  score++; p.passed = true; 
                  document.getElementById('score-display').innerText = score + " / " + targetScore; 
                  if(score % 3 === 0) this.dx += 0.2; 
                  if(score >= targetScore) gameWin(); 
              } 

              if(p.x + p.width < 0) { 
                  this.items.shift(); i--; 
              } 
          } 
      } 
  }; 

  const bg = { 
      draw: function() { 
          ctx.fillStyle = "#fdf5e6"; 
          ctx.fillRect(0,0, canvas.width, canvas.height); 
      } 
  }

  // --- 流程控制函數 ---
  let animationFrameId;
  function loop() {
    if(!isRunning) return;
    bg.draw(); pipes.update(); pipes.draw();
    player.update(); player.draw();
    frames++;
    animationFrameId = requestAnimationFrame(loop);
  }

  function resetGameVars() {
    player.y = 150; player.velocity = 0;
    pipes.items = []; pipes.dx = 2;
    score = 0; frames = 0;
    document.getElementById('score-display').innerText = "0 / " + targetScore;
  }
  
  function levelFailed() {
    if (!isRunning) return;
    isRunning = false;
    cancelAnimationFrame(animationFrameId);
    handleError('Number');
  }

  function levelRetry() {
    if (isRunning) return;
    resetGameVars();
    levelStartMs = performance.now();
    isRunning = true;
    loop();
  }

  function gameWin() {
    isRunning = false;
    cancelAnimationFrame(animationFrameId);
    document.getElementById('win-screen').classList.remove('hidden');
    document.getElementById('win-btn').onclick = () => { bumpScore(20); goToNextLevel(); };
  }
  
  function startGame() {
    document.getElementById('start-screen').classList.add('hidden');
    levelRetry();
  }

  // --- 事件監聽與啟動 ---
  document.getElementById('start-btn').onclick = startGame;
  window.addEventListener('resize', () => { if (!isRunning) fitCanvas(); });

  function handleJump() {
    if(isRunning) player.velocity = player.jump;
  }
  
  canvas.addEventListener("click", handleJump);
  
  document.addEventListener("keydown", function(e) {
    if(e.code === "Space" && isRunning) {
      handleJump();
      e.preventDefault();
    }
  });

window.level10Reset = levelRetry;
}
function computeRank(score, failedOrder) {
  const s = Number(score || 0);
  if (s > 300) return { level: 'SS', title: '泰山北斗', description: '【傳說級成就】文起八代之衰，道濟天下之溺。蘇軾讚你：「如長江大河，渾浩流轉...泰山北斗」。你的光芒已超越時代，成為千古傳頌的神話！' };
  if (s >= 240 && s <= 300) return { level: 'S', title: '百代文宗', description: '「匹夫而為百世師，一言而為天下法。你的靈魂與韓昌黎完全共振，文能載道，武能平亂，你是大唐夜空中最亮的那顆星！」' };
  if (s >= 200 && s <= 239) return { level: 'A', title: '唐宋八大家之首', description: '「文筆雄健，氣勢磅礡。雖偶有波折，但你堅持古文運動，力抗流俗。你的名字將與柳宗元並列，永載史冊。」' };
  if (s >= 160 && s <= 199) return { level: 'B', title: '刑部侍郎', description: '「你性格剛直，不畏強權。雖然在文學上的細膩度稍遜一籌，但你的一身傲骨與經世濟民的熱忱，足以立足朝堂。」' };
  if (s >= 100 && s <= 159) return { level: 'C', title: '國子先生', description: '「業精於勤荒於嬉。你對韓學有所涉獵，但尚未融會貫通。或許是被長安的花迷了眼，亦或是被貶謫的寒風凍傷了筆觸？」' };
  if (s >= 1 && s <= 99) return { level: 'D', title: '時運不濟', description: '「二鳥賦中歎不遇，你的才華似乎還需要時間打磨。或者，你其實更適合去隔壁棚找李白喝酒？」' };
  return failedOrder ? { level: 'E', title: '非我族類', description: '「你的人生順序錯亂，記憶拼湊不出完整的韓愈。歷史的長河中，查無此人。」' } : { level: 'E', title: '非我族類', description: '「你的人生順序錯亂，記憶拼湊不出完整的韓愈。歷史的長河中，查無此人。」' };
}

function getRankImagePath(level) {
  if (level === 'SS') return 'hanyu_ss.png';
  if (level === 'S') return 'hanyu_s.png';
  if (level === 'A') return 'hanyu_a.png';
  if (level === 'B') return 'hanyu_b.png';
  if (level === 'C') return 'hanyu_c.png';
  if (level === 'D') return 'hanyu_d.png';
  return 'han_yu_aged_dead.png';
}

function buildShareText(name, score, rk) {
  const lines = [];
  lines.push(`玩家：${name}`);
  lines.push(`分數：${score}`);
  lines.push(`評級：${rk.title}（${rk.level}）`);
  if (rk.description) lines.push(`評語：${rk.description}`);
  return lines.join('\n');
}

function showShareModal(previewUrl, text, onDownload, onCopy) {
  const overlay = document.createElement('div');
  overlay.className = 'modal-backdrop';
  const modal = document.createElement('div');
  modal.className = 'modal';
  const close = document.createElement('button');
  close.className = 'modal-close';
  close.type = 'button';
  close.textContent = '×';
  close.addEventListener('click', () => { try { document.body.removeChild(overlay); } catch {} });
  const title = document.createElement('h2');
  title.className = 'modal-title';
  title.textContent = '分享結果';
  const img = document.createElement('img');
  img.className = 'illustration';
  img.src = previewUrl;
  img.alt = '分享預覽';
  const p = document.createElement('p');
  p.className = 'dialog-text';
  p.textContent = text;
  const actions = document.createElement('div');
  actions.className = 'actions';
  const dl = document.createElement('button');
  dl.className = 'button';
  dl.type = 'button';
  dl.textContent = '下載圖片';
  dl.addEventListener('click', () => { try { onDownload(); } catch {} });
  const cp = document.createElement('button');
  cp.className = 'button';
  cp.type = 'button';
  cp.textContent = '複製文字';
  cp.addEventListener('click', () => { try { onCopy(); } catch {} });
  actions.appendChild(dl);
  actions.appendChild(cp);
  modal.appendChild(close);
  modal.appendChild(title);
  modal.appendChild(img);
  modal.appendChild(p);
  modal.appendChild(actions);
  overlay.appendChild(modal);
  document.body.appendChild(overlay);
}

async function shareGameResult() {
  const name = localStorage.getItem('hanliu_player_name') || '無名';
  const score = Number(matchScore || 0);
  const rk = computeRank(score, orderFailed);
  const imgSrc = getRankImagePath(rk.level);
  const img = new Image();
  const canvas = document.createElement('canvas');
  const w = 720, h = 1080;
  canvas.width = w; canvas.height = h;
  const ctx = canvas.getContext('2d');
  const draw = () => {
    const grad = ctx.createLinearGradient(0, 0, 0, h);
    grad.addColorStop(0, '#1a1a1a');
    grad.addColorStop(1, '#0f0f0f');
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, w, h);
    const pad = 24;
    let ih = Math.floor(h * 0.42);
    let iw = Math.floor(ih * (4/3));
    const x = Math.floor((w - iw) / 2);
    const y = pad;
    try { ctx.drawImage(img, x, y, iw, ih); } catch {}
    ctx.fillStyle = '#f7fbff';
    ctx.font = 'bold 36px system-ui, Arial';
    ctx.textBaseline = 'top';
    const title = '寒流｜遊玩結果';
    ctx.fillText(title, pad, ih + y + 12);
    ctx.font = 'bold 30px system-ui, Arial';
    ctx.fillText(`玩家：${name}`, pad, ih + y + 64);
    ctx.fillText(`分數：${score}`, pad, ih + y + 106);
    ctx.fillText(`評級：${rk.title}（${rk.level}）`, pad, ih + y + 148);
    ctx.font = '24px system-ui, Arial';
    const comment = rk.description || '';
    const maxWidth = w - pad * 2;
    const lines = [];
    let rest = comment;
    while (rest.length) {
      let len = Math.min(28, rest.length);
      let seg = rest.slice(0, len);
      while (ctx.measureText(seg).width > maxWidth && len > 8) { len -= 1; seg = rest.slice(0, len); }
      lines.push(seg);
      rest = rest.slice(seg.length);
    }
    let ty = ih + y + 196;
    lines.forEach((ln) => { ctx.fillText(ln, pad, ty); ty += 34; });
    ctx.fillStyle = '#9aa0a6';
    ctx.font = '20px system-ui, Arial';
    const dt = new Date();
    const footer = `${dt.getFullYear()}-${String(dt.getMonth()+1).padStart(2,'0')}-${String(dt.getDate()).padStart(2,'0')} ${String(dt.getHours()).padStart(2,'0')}:${String(dt.getMinutes()).padStart(2,'0')}`;
    ctx.fillText(footer, pad, h - pad - 24);
  };
  const asBlob = () => new Promise((resolve) => { canvas.toBlob((b) => resolve(b), 'image/png'); });
  await new Promise((resolve) => { img.onload = resolve; img.onerror = resolve; img.src = imgSrc; });
  draw();
  const blob = await asBlob();
  const text = buildShareText(name, score, rk);
  if (navigator.share && blob) {
    try {
      const file = new File([blob], `hanliu_${score}_${rk.level}.png`, { type: 'image/png' });
      const canFiles = typeof navigator.canShare === 'function' ? navigator.canShare({ files: [file] }) : true;
      if (canFiles) {
        await navigator.share({ title: '寒流｜遊玩結果', text, files: [file] });
        return;
      }
    } catch {}
  }
  const url = URL.createObjectURL(blob);
  const doDownload = () => {
    try {
      const a = document.createElement('a');
      a.href = url;
      a.download = `hanliu_${score}_${rk.level}.png`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
    } catch {}
  };
  const doCopy = () => {
    try { navigator.clipboard.writeText(text); } catch {}
  };
  showShareModal(url, text, doDownload, doCopy);
}
function renderLeaderboardPage(filterRoute, headingText, skipRemote) {
  clearMainContent(true);
  hideCharacterDisplay();
  hideHpBar();
  document.documentElement.style.setProperty('--bg', '#1a1a1a');
  document.documentElement.style.setProperty('--fg', '#cfcfcf');
  document.documentElement.style.setProperty('--muted', '#9aa0a6');
  const key = 'hanliu_scores';
  const renderLocal = () => {
    const raw = localStorage.getItem(key);
    let arr = [];
    try { arr = raw ? JSON.parse(raw) : []; } catch { arr = []; }
    let list = arr;
    if (filterRoute && filterRoute !== 'All') list = arr.filter(x => x.route === filterRoute);
    list = selectBestPerName(list);
    const currentRec = arr.find(r => String(r && r.id || '') === String(lastRunId || ''));
    if (currentRec && !list.some(r => String(r && r.id || '') === String(currentRec.id))) {
      list.push(currentRec);
    }
    list.sort((a, b) => b.score - a.score);
    const main = document.querySelector('main.container');
    if (main) { main.style.alignItems = 'flex-start'; main.style.justifyItems = 'center'; main.scrollTop = 0; }
    const page = document.createElement('section');
    page.className = 'dialog-container';
    page.id = 'leaderboardPage';
    
    const info = document.createElement('p');
    info.className = 'dialog-text';
    info.textContent = headingText || '';
    const curRank = computeRank(matchScore, orderFailed);
    const curIndex = list.findIndex(r => String(r && r.id || '') === String(lastRunId || ''));
    const pos = 1 + list.filter(r => Number(r && r.score || 0) > Number(matchScore || 0)).length;
    const rankInfo = document.createElement('p');
    rankInfo.className = 'dialog-text';
    rankInfo.textContent = `本次名次：第${curIndex >= 0 ? (curIndex + 1) : pos} 名`;
    const awardKey = 'hanliu_coin_awarded';
    let awardMap = {};
    try { awardMap = JSON.parse(localStorage.getItem(awardKey) || '{}') || {}; } catch { awardMap = {}; }
    const curScore = Number(matchScore || 0);
    const toAward = Math.floor(curScore / 100);
    const awInfo = document.createElement('p');
    awInfo.className = 'dialog-text';
    awInfo.textContent = `本次得分 ${curScore}，換算獲得 ${toAward} 個貨幣`;
    if (lastRunId && !awardMap[lastRunId]) {
      if (toAward > 0) { addCoins(toAward); }
      awardMap[lastRunId] = { coins: toAward, ts: Date.now() };
      try { localStorage.setItem(awardKey, JSON.stringify(awardMap)); } catch {}
    }
    if (curRank.level === 'E') {
      document.documentElement.style.setProperty('--bg', '#000000');
    }
    const content = document.createElement('div');
    content.className = 'leaderboard-content';
    const hasSS = list.some(r => {
      const rr = computeRank(Number(r.score || 0), false);
      return rr && rr.level === 'SS';
    });
    if (list.length === 0) {
      const empty = document.createElement('p');
      empty.className = 'dialog-text';
      empty.textContent = '尚無成績記錄';
      content.appendChild(empty);
    } else {
      list.forEach((r, i) => {
        const row = document.createElement('div');
        row.className = 'row';
        const name = document.createElement('span');
        name.className = 'name';
        name.textContent = `${i + 1}. ${r.name}`;
        const score = document.createElement('span');
        score.className = 'score';
        score.textContent = `${r.score}`;
        const time = document.createElement('span');
        time.className = 'route';
        time.textContent = formatTime(r.time || 0);
        const progress = document.createElement('span');
        progress.className = 'route';
        progress.textContent = r.progress || '';
        const route = document.createElement('span');
        route.className = 'route';
        route.textContent = r.route === 'HanYu' ? '韓愈線' : (r.route === 'LiuZongyuan' ? '柳宗元線' : r.route);
        const rRank = computeRank(Number(r.score || 0), false);
        if (rRank && rRank.level === 'SS') {
          row.classList.add('rank-ss');
          row.style.background = 'linear-gradient(90deg, #ffd54f, #ffb74d)';
          row.style.borderBottom = 'none';
          row.style.animation = 'ssPulse 4.8s ease-in-out infinite';
        }
        if (String(r && r.id || '') === String(lastRunId || '')) {
          row.style.outline = '3px solid #64b5f6';
          row.style.boxShadow = '0 0 0 3px rgba(100,181,246,0.35)';
          const curBadge = document.createElement('span');
          curBadge.className = 'route';
          curBadge.textContent = '【本次】';
          row.appendChild(curBadge);
        }
        const badge = document.createElement('span');
        badge.className = 'route';
        badge.textContent = rRank ? `【${rRank.title}】` : '';
        row.appendChild(name);
        row.appendChild(score);
        row.appendChild(time);
        row.appendChild(progress);
        row.appendChild(route);
        if (badge.textContent) row.appendChild(badge);
        content.appendChild(row);
      });
    }
    const actions = document.createElement('div');
    actions.className = 'actions';
    const backBtn = document.createElement('button');
    backBtn.className = 'button';
    backBtn.type = 'button';
    backBtn.textContent = '返回主頁';
    backBtn.addEventListener('click', navigateHome);
    const retryBtn = document.createElement('button');
    retryBtn.className = 'button';
    retryBtn.type = 'button';
    retryBtn.textContent = '重來一次';
    retryBtn.addEventListener('click', retryGame);
    actions.appendChild(backBtn);
    actions.appendChild(retryBtn);
    const shareBtn = document.createElement('button');
    shareBtn.className = 'button';
    shareBtn.type = 'button';
    shareBtn.textContent = '分享結果';
    shareBtn.addEventListener('click', shareGameResult);
    actions.appendChild(shareBtn);
    if (headingText) page.appendChild(info);
    if (rankInfo.textContent) page.appendChild(rankInfo);
    page.appendChild(awInfo);
    page.appendChild(content);
    page.appendChild(actions);
    backdrop.hidden = true;
    main.appendChild(page);
    page.scrollTop = 0;
  };
  if (!skipRemote && !cloudSyncDisabled && getCloudEndpoint()) {
    try {
      fetch(getCloudEndpoint(), { headers: { ...(getCloudAuth() ? { authorization: getCloudAuth() } : {}) } })
        .then(r => r.json())
        .then((remote) => {
          if (Array.isArray(remote)) {
            const raw = localStorage.getItem(key);
            let arr = [];
            try { arr = raw ? JSON.parse(raw) : []; } catch { arr = []; }
            const merged = dedupeRecords(arr.concat(remote));
            localStorage.setItem(key, JSON.stringify(merged));
          }
          renderLocal();
        })
        .catch(() => { renderLocal(); });
    } catch { renderLocal(); }
    return;
  }
  renderLocal();
}

async function fetchUnlocksForAccountId(id) {
  try {
    const ep = getUnlockEndpoint();
    const au = getUnlockAuth();
    if (!ep || !id) return [];
    const url = ep + (ep.includes('?') ? '&' : '?') + 'id=' + encodeURIComponent(id);
    const r = await fetch(url, { headers: { ...(au ? { authorization: au } : {}) } });
    if (!r.ok) return [];
    const data = await r.json().catch(() => []);
    return Array.isArray(data) ? data.map(normalizeIllustrationKey).filter(Boolean) : [];
  } catch { return []; }
}
function getLocalUnlocksForAccountId(id) {
  try {
    const map = loadAccountUnlocks();
    const list = Array.isArray(map && map[id]) ? map[id] : [];
    return list.map(normalizeIllustrationKey).filter(Boolean);
  } catch { return []; }
}
async function renderUnlocksLeaderboardPage() {
  clearMainContent(true);
  hideCharacterDisplay();
  hideHpBar();
  const main = document.querySelector('main.container');
  const page = document.createElement('section');
  page.className = 'dialog-container';
  page.id = 'galleryLeaderboardPage';
  const title = document.createElement('h2');
  title.className = 'modal-title';
  title.textContent = '圖鑑收集排行';
  const info = document.createElement('p');
  info.className = 'dialog-text';
  const accounts = loadAccountsList();
  const allKeys = getIllustrationList();
  const stats = [];
  const pushStat = (acc, items) => {
    const set = new Set(items);
    const count = allKeys.reduce((n, k) => n + (set.has(k) ? 1 : 0), 0);
    const pct = allKeys.length ? Math.round((count / allKeys.length) * 100) : 0;
    stats.push({ id: acc.id, name: acc.name || acc.id, count, pct });
  };
  for (const acc of accounts) {
    let items = await fetchUnlocksForAccountId(acc.id);
    if (!items.length) items = getLocalUnlocksForAccountId(acc.id);
    pushStat(acc, items);
  }
  if (!accounts.length) {
    const guestSet = getCurrentUnlocksSet();
    const count = Array.from(guestSet).length;
    const pct = allKeys.length ? Math.round((count / allKeys.length) * 100) : 0;
    stats.push({ id: 'guest', name: localStorage.getItem('hanliu_player_name') || '無名', count, pct });
  }
  stats.sort((a, b) => b.count - a.count || a.name.localeCompare(b.name));
  info.textContent = `總圖鑑項目：${allKeys.length}｜帳號數：${accounts.length || 1}`;
  const list = document.createElement('div');
  list.className = 'leaderboard-content';
  stats.forEach((s, i) => {
    const row = document.createElement('div');
    row.className = 'row';
    const name = document.createElement('span');
    name.className = 'name';
    name.textContent = `${i + 1}. ${s.name}`;
    const score = document.createElement('span');
    score.className = 'score';
    score.textContent = `${s.count}`;
    const route = document.createElement('span');
    route.className = 'route';
    route.textContent = `${s.pct}%`;
    row.appendChild(name);
    row.appendChild(score);
    row.appendChild(route);
    list.appendChild(row);
  });
  const actions = document.createElement('div');
  actions.className = 'actions';
  const backBtn = document.createElement('button');
  backBtn.className = 'button';
  backBtn.type = 'button';
  backBtn.textContent = '返回主頁';
  backBtn.addEventListener('click', navigateHome);
  actions.appendChild(backBtn);
  page.appendChild(title);
  page.appendChild(info);
  page.appendChild(list);
  page.appendChild(actions);
  main.appendChild(page);
}

function clearMainContent(preserveStartScreen) {
  const main = document.querySelector('main.container');
  if (!main) return;
  const start = document.getElementById('startScreen');
  Array.from(main.children).forEach(ch => {
    if (preserveStartScreen && start && ch === start) return;
    main.removeChild(ch);
  });
}

function navigateHome() {
  const main = document.querySelector('main.container');
  const start = document.getElementById('startScreen');
  Array.from(main.children).forEach(ch => { if (!start || ch !== start) ch.remove(); });
  if (start) { start.style.display = ''; }
  document.documentElement.style.setProperty('--bg', '#1a1a1a');
  document.documentElement.style.setProperty('--fg', '#cfcfcf');
  document.documentElement.style.setProperty('--muted', '#9aa0a6');
  document.documentElement.style.setProperty('--bg-image', "url('home.png')");
  document.documentElement.style.setProperty('--bg-overlay', 'linear-gradient(rgba(0,0,0,0.38), rgba(0,0,0,0.38))');
  if (main) { main.style.alignItems = ''; main.style.justifyItems = ''; }
  hideCharacterDisplay();
  hideHpBar();
  resetGlobalState();
  systemCleanup(false);
  applyPlayerNameInputState();
  const sbtn = document.getElementById('settingsBtn'); if (sbtn) sbtn.hidden = false;
  const fb = document.getElementById('feedback-btn'); if (fb) fb.hidden = false;
  const hvb = document.getElementById('homeVolumeToggle'); if (hvb) hvb.hidden = false;
  const hv = document.getElementById('homeVolume'); if (hv) { hv.classList.remove('is-visible'); hv.hidden = true; hv.value = String(Math.round((getStoredVolume() || 0.35) * 100)); }
  const hsv = document.getElementById('homeSfxVolume'); if (hsv) { hsv.classList.remove('is-visible'); hsv.hidden = true; hsv.value = String(Math.round((getStoredSfxVolume() || 0.6) * 100)); }
  reloadCoins();
  showCoinsOnHome();
  renderSelectCardArea();
  performAutoDailyCheckIn();
}

function openNotice() {
  if (document.querySelector('.modal-backdrop.notice')) return;
  const overlay = document.createElement('div');
  overlay.className = 'modal-backdrop notice';
  const modal = document.createElement('div');
  modal.className = 'modal hc3';
  const close = document.createElement('button');
  close.className = 'modal-close';
  close.type = 'button';
  close.textContent = '×';
  close.addEventListener('click', () => { document.body.removeChild(overlay); });
  const title = document.createElement('h2');
  title.className = 'modal-title';
  title.textContent = '公告';
  modal.appendChild(close);
  modal.appendChild(title);
  const tabs = document.createElement('div');
  tabs.className = 'modal-actions';
  const gameBtn = document.createElement('button');
  gameBtn.className = 'button';
  gameBtn.type = 'button';
  gameBtn.textContent = '遊戲公告';
  const updateBtn = document.createElement('button');
  updateBtn.className = 'button';
  updateBtn.type = 'button';
  updateBtn.textContent = '更新公告';
  tabs.appendChild(gameBtn);
  tabs.appendChild(updateBtn);
  const content = document.createElement('div');
  content.className = 'dialog-container';
  modal.appendChild(tabs);
  modal.appendChild(content);
  const renderGame = () => {
    content.innerHTML = '';
    const frag = document.createDocumentFragment();
    const basicTitle = document.createElement('h3'); basicTitle.className = 'modal-title'; basicTitle.textContent = '遊戲公告';
    frag.appendChild(basicTitle);
    (NOTICE_TEXT.game || []).forEach(function(txt){
      const p = document.createElement('p'); p.className = 'dialog-text'; p.textContent = txt; frag.appendChild(p);
    });
    content.appendChild(frag);
  };
  const renderUpdate = () => {
    content.innerHTML = '';
    const frag = document.createDocumentFragment();
    const updateTitle = document.createElement('h3'); updateTitle.className = 'modal-title'; updateTitle.textContent = '更新公告';
    const ver = document.createElement('p'); ver.className = 'dialog-text'; ver.textContent = `版本：${appVersion}`;
    frag.appendChild(updateTitle);
    frag.appendChild(ver);
    try {
      const versions = Object.keys(releaseHistory).sort((a, b) => {
        const pa = a.split('.').map(Number); const pb = b.split('.').map(Number);
        for (let i = 0; i < Math.max(pa.length, pb.length); i++) {
          const da = pa[i] || 0; const db = pb[i] || 0; if (da !== db) return db - da;
        }
        return 0;
      });
      versions.forEach(function(v){
        const vh = document.createElement('p'); vh.className = 'dialog-text'; vh.textContent = `版本 ${v}`; frag.appendChild(vh);
        const items = Array.isArray(releaseHistory[v]) ? releaseHistory[v] : [];
        items.forEach(function(n){ const p = document.createElement('p'); p.className = 'dialog-text'; p.textContent = `• ${n}`; frag.appendChild(p); });
      });
    } catch {
      releaseNotes.forEach(function(n){ const p = document.createElement('p'); p.className = 'dialog-text'; p.textContent = `• ${n}`; frag.appendChild(p); });
    }
    content.appendChild(frag);
  };
  let activeTab = 'game';
  const syncButtons = () => {
    gameBtn.disabled = (activeTab === 'game');
    updateBtn.disabled = (activeTab === 'update');
  };
  gameBtn.addEventListener('click', () => { activeTab = 'game'; syncButtons(); renderGame(); });
  updateBtn.addEventListener('click', () => { activeTab = 'update'; syncButtons(); renderUpdate(); });
  renderGame();
  syncButtons();
  try {
    document.body.appendChild(overlay);
  } catch {
    document.body.appendChild(overlay);
  }
  overlay.appendChild(modal);
}

function openSettings() {
  if (document.querySelector('.modal-backdrop.active-block')) return;
  const overlay = document.createElement('div');
  overlay.className = 'modal-backdrop active-block';
  const modal = document.createElement('div');
  modal.className = 'modal';
  const close = document.createElement('button');
  close.className = 'modal-close';
  close.type = 'button';
  close.textContent = '×';
  const sbtn = document.getElementById('settingsBtn');
  if (sbtn) sbtn.hidden = true;
  close.addEventListener('click', () => { blockingModalOpen = false; document.body.removeChild(overlay); const sb = document.getElementById('settingsBtn'); if (sb) sb.hidden = false; });
  const title = document.createElement('h2');
  title.className = 'modal-title';
  title.textContent = '設定';
  const ver = document.createElement('p');
  ver.className = 'dialog-text';
  ver.textContent = `版本：${appVersion}`;
  const nick = document.createElement('p');
  nick.className = 'dialog-text';
  if (isAccountBound()) {
    const nm = getAccountName();
    nick.textContent = `暱稱：${nm || '（未設定）'}`;
  }
  const actions = document.createElement('div');
  actions.className = 'modal-actions';
  const report = document.createElement('a');
  report.className = 'button';
  report.href = FEEDBACK_URL;
  report.target = '_blank';
  report.rel = 'noopener';
  report.textContent = '回報錯誤/建議';
  const volWrap = document.createElement('div');
  volWrap.className = 'actions';
  volWrap.style.display = 'flex';
  volWrap.style.flexDirection = 'column';
  volWrap.style.alignItems = 'stretch';
  volWrap.style.gap = '0.5rem';
  const volLabel = document.createElement('span');
  volLabel.className = 'volume-label';
  volLabel.textContent = '背景音量：';
  const volSlider = document.createElement('input');
  volSlider.type = 'range';
  volSlider.min = '0';
  volSlider.max = '100';
  volSlider.value = String(Math.round(bgmVolume * 100));
  volSlider.addEventListener('input', () => {
    const val = Math.max(0, Math.min(100, parseInt(volSlider.value, 10) || 0));
    const nv = val / 100;
    bgmVolume = nv;
    if (bgmAudio) bgmAudio.volume = nv;
    setStoredVolume(nv);
  });
  const sfxLabel = document.createElement('span');
  sfxLabel.className = 'volume-label';
  sfxLabel.textContent = '音效音量：';
  const sfxSlider = document.createElement('input');
  sfxSlider.type = 'range';
  sfxSlider.min = '0';
  sfxSlider.max = '100';
  sfxSlider.value = String(Math.round((getStoredSfxVolume() || sfxVolume || 0.6) * 100));
  sfxSlider.addEventListener('input', () => {
    const val = Math.max(0, Math.min(100, parseInt(sfxSlider.value, 10) || 0));
    const nv = val / 100;
    sfxVolume = nv;
    setStoredSfxVolume(nv);
  });
  const fxLabel = document.createElement('span');
  fxLabel.className = 'volume-label';
  fxLabel.textContent = '點擊特效：';
  const fxToggle = document.createElement('input');
  fxToggle.type = 'checkbox';
  fxToggle.checked = getStoredClickFxEnabled();
  clickFxEnabled = fxToggle.checked;
  fxToggle.addEventListener('change', () => { clickFxEnabled = !!fxToggle.checked; setStoredClickFxEnabled(clickFxEnabled); });
  const toHome = document.createElement('button');
  toHome.className = 'button';
  toHome.type = 'button';
  toHome.textContent = '回到首頁';
  toHome.addEventListener('click', () => {
    showConfirmModal('返回主頁', '此操作將放棄本局進度，確定嗎？', '確定', () => { resetGlobalState(); blockingModalOpen = false; try { document.body.removeChild(overlay); } catch {} navigateHome(); });
  });
  const restart = document.createElement('button');
  restart.className = 'button';
  restart.type = 'button';
  restart.textContent = '重來一次';
  restart.addEventListener('click', () => {
    showConfirmModal('重來一次', '將從第一關重新開始本局，確定嗎？', '確定', () => {
      resetGlobalState();
      blockingModalOpen = false;
      try { document.body.removeChild(overlay); } catch {}
      const nm = (localStorage.getItem('hanliu_player_name') || '無名'); if (input) input.value = nm;
      navigateHome();
      setTimeout(() => { start(); }, 0);
    });
  });
  const toLogin = document.createElement('button');
  toLogin.className = 'button';
  toLogin.type = 'button';
  toLogin.textContent = '返回登入頁';
  toLogin.addEventListener('click', () => {
    blockingModalOpen = false;
    try { document.body.removeChild(overlay); } catch {}
    openAuthGate();
  });
  const notice = document.createElement('button');
  notice.className = 'button';
  notice.type = 'button';
  notice.textContent = '公告';
  notice.addEventListener('click', () => { openNotice(); });
  const cloud = document.createElement('button');
  cloud.className = 'button';
  cloud.type = 'button';
  cloud.textContent = '雲端設定';
  cloud.addEventListener('click', () => { blockingModalOpen = false; try { document.body.removeChild(overlay); } catch {} openCloudConfig(); });
  const logout = document.createElement('button');
  logout.className = 'button';
  logout.type = 'button';
  logout.textContent = '登出';
  logout.addEventListener('click', () => {
    const doLogout = () => {
      setActiveAccountId('');
      try { localStorage.removeItem('hanliu_account_name'); } catch {}
      applyPlayerNameInputState();
      blockingModalOpen = false;
      try { document.body.removeChild(overlay); } catch {}
      openAuthGate();
    };
    showConfirmModal('登出', '將登出目前帳號，之後可在「註冊 / 登入」再次登入。確定嗎？', '確定', doLogout);
  });
  const rename = document.createElement('button');
  rename.className = 'button';
  rename.type = 'button';
  rename.textContent = '修改暱稱';
  rename.addEventListener('click', async () => {
    const acc = getStoredAccount();
    if (!acc || !acc.salt || !acc.hash) return;
    const nm = String(prompt('輸入新的暱稱（2–16 個字）', acc.name) || '').trim();
    if (nm.length < 2 || nm.length > 16) return;
    const next = { ...acc, name: nm, ts: Date.now() };
    setStoredAccount(next);
    try { await syncAccountToCloud(next); } catch {}
    try { updateStoredScoresNameForAccount(next.id, nm); } catch {}
    applyPlayerNameInputState();
    if (isAccountBound()) { const cur = getAccountName(); const label = `暱稱：${cur || nm}`; if (nick) nick.textContent = label; }
  });
  const about = document.createElement('button');
  about.className = 'button';
  about.type = 'button';
  about.textContent = '關於遊戲';
  about.addEventListener('click', () => { openAbout(); });
  const preLogin = isPreLogin();
  actions.appendChild(report);
  if (!preLogin) {
    actions.appendChild(toHome);
    actions.appendChild(restart);
  }
  actions.appendChild(notice);
  if (preLogin) actions.appendChild(toLogin);
  if (isAccountBound()) actions.appendChild(logout);
  if (isAccountBound()) actions.appendChild(rename);
  if (isAdminEnabled()) actions.appendChild(cloud);
  actions.appendChild(about);
  modal.appendChild(close);
  modal.appendChild(title);
  modal.appendChild(ver);
  if (isAccountBound()) modal.appendChild(nick);
  const bgmGroup = document.createElement('div');
  bgmGroup.style.display = 'flex';
  bgmGroup.style.flexDirection = 'column';
  bgmGroup.style.gap = '0.25rem';
  bgmGroup.appendChild(volLabel);
  bgmGroup.appendChild(volSlider);
  const sfxGroup = document.createElement('div');
  sfxGroup.style.display = 'flex';
  sfxGroup.style.flexDirection = 'column';
  sfxGroup.style.gap = '0.25rem';
  sfxGroup.appendChild(sfxLabel);
  sfxGroup.appendChild(sfxSlider);
  const fxGroup = document.createElement('div');
  fxGroup.style.display = 'flex';
  fxGroup.style.flexDirection = 'column';
  fxGroup.style.gap = '0.25rem';
  fxGroup.appendChild(fxLabel);
  fxGroup.appendChild(fxToggle);
  modal.appendChild(volWrap);
  volWrap.appendChild(bgmGroup);
  volWrap.appendChild(sfxGroup);
  volWrap.appendChild(fxGroup);
  modal.appendChild(actions);
  overlay.appendChild(modal);
  document.body.appendChild(overlay);
  blockingModalOpen = true;
}

function retryGame() {
  matchScore = 0;
  errorCount = 0;
  currentRoute = null;
  resetHpBar();
  navigateHome();
  input.focus();
}
let leaderboardFilter = 'All';
function genRecordId() {
  try { if (crypto && typeof crypto.randomUUID === 'function') return crypto.randomUUID(); } catch {}
  const rnd = Math.random().toString(36).slice(2);
  const t = Date.now();
  return `hl-${t}-${rnd}`;
}
function dedupeRecords(list) {
  const byId = new Map();
  const rest = [];
  list.forEach((r) => {
    const id = String(r && r.id || '').trim();
    if (id) {
      const cur = byId.get(id);
      if (!cur || Number(r.ts || 0) > Number(cur.ts || 0)) byId.set(id, r);
    } else {
      rest.push(r);
    }
  });
  const byBase = new Map();
  const norm = (v) => String(v == null ? '' : v).trim();
  rest.forEach((r) => {
    const base = `${norm(r && r.name)}|${norm(r && r.route)}|${Number(r && r.score || 0)}|${Number(r && r.time || 0)}`;
    const cur = byBase.get(base);
    if (!cur || Number(r.ts || 0) > Number(cur.ts || 0)) byBase.set(base, r);
  });
  const out = [];
  byId.forEach((v) => { out.push(v); });
  byBase.forEach((v) => { out.push(v); });
  return out;
}
function selectBestPerName(list) {
  const m = new Map();
  (list || []).forEach((r) => {
    const nm = String(r && r.name || '').trim();
    const sc = Number(r && r.score || 0);
    const ts = Number(r && r.ts || 0);
    const cur = m.get(nm);
    if (!cur || sc > Number(cur && cur.score || 0) || (sc === Number(cur && cur.score || 0) && ts > Number(cur && cur.ts || 0))) {
      m.set(nm, r);
    }
  });
  const out = [];
  m.forEach((v) => { out.push(v); });
  return out;
}
function saveScore(name, score, route) {
  const key = 'hanliu_scores';
  const raw = localStorage.getItem(key);
  let arr = [];
  try { arr = raw ? JSON.parse(raw) : []; } catch { arr = []; }
  const now = Date.now();
  const msElapsed = startTime ? Math.max(0, (now - startTime) + (selectedCardId === 'card_dragon' ? TIME_BUFF : 0)) : 0;
  const totalSeconds = Math.floor(msElapsed / 1000);
  const acc = isAccountBound() ? getStoredAccount() : null;
  const rec = { id: genRecordId(), name: acc && acc.name ? acc.name : name, score, route, time: totalSeconds, progress: currentProgress, ts: now, ...(acc && acc.id ? { accountId: acc.id } : {}) };
  lastRunId = rec.id;
  arr.push(rec);
  localStorage.setItem(key, JSON.stringify(dedupeRecords(arr)));
  if (!cloudSyncDisabled && getCloudEndpoint()) {
    try {
      fetch(getCloudEndpoint(), {
        method: 'POST',
        headers: { 'content-type': 'application/json', ...(getCloudAuth() ? { authorization: getCloudAuth() } : {}) },
        body: JSON.stringify(rec),
      }).catch(() => {});
    } catch {}
  }
}

function updateStoredScoresNameForAccount(accId, nm) {
  const key = 'hanliu_scores';
  const raw = localStorage.getItem(key);
  let arr = [];
  try { arr = raw ? JSON.parse(raw) : []; } catch { arr = []; }
  const out = (arr || []).map((r) => {
    if (r && String(r.accountId || '') === String(accId)) return { ...r, name: nm };
    return r;
  });
  try { localStorage.setItem(key, JSON.stringify(out)); } catch {}
}

function displayLeaderboard(filterRoute, skipRemote) {
  if (!skipRemote && getCloudEndpoint()) {
    const fallback = () => { try { displayLeaderboard(filterRoute, true); } catch {} };
    try {
      fetch(getCloudEndpoint(), { headers: { ...(getCloudAuth() ? { authorization: getCloudAuth() } : {}) } })
        .then(r => r.json())
        .then((remote) => {
          if (Array.isArray(remote)) {
            const key = 'hanliu_scores';
            const raw = localStorage.getItem(key);
            let arr = [];
            try { arr = raw ? JSON.parse(raw) : []; } catch { arr = []; }
            const merged = dedupeRecords(arr.concat(remote));
            localStorage.setItem(key, JSON.stringify(merged));
          }
          const accEp = getAccountEndpoint();
          const accAu = getAccountAuth();
          if (accEp) {
            fetch(accEp, { headers: { ...(accAu ? { authorization: accAu } : {}) } })
              .then(r => r.json())
              .then((accounts) => {
                if (Array.isArray(accounts)) {
                  const local = loadAccountsList();
                  const byId = new Map();
                  local.forEach((a) => { const id = String(a && a.id || ''); if (id) byId.set(id, a); });
                  accounts.forEach((a) => {
                    const id = String(a && a.id || '');
                    if (!id) return;
                    const cur = byId.get(id);
                    if (!cur || Number(a.ts || 0) > Number(cur.ts || 0)) byId.set(id, a);
                  });
                  const merged = [];
                  byId.forEach((v) => { merged.push(v); });
                  saveAccountsList(merged);
                }
              })
              .catch(() => {})
              .finally(() => { fallback(); });
            return;
          }
          fallback();
        })
        .catch(() => { fallback(); });
    } catch { fallback(); }
    return;
  }
  const key = 'hanliu_scores';
  const raw = localStorage.getItem(key);
  let arr = [];
  try { arr = raw ? JSON.parse(raw) : []; } catch { arr = []; }
  let list = arr;
  if (filterRoute && filterRoute !== 'All') list = arr.filter(x => x.route === filterRoute);
  const accMap = (() => { const m = new Map(); (loadAccountsList() || []).forEach(a => { const id = String(a && a.id || ''); const nm = String(a && a.name || '').trim(); if (id && nm) m.set(id, nm); }); return m; })();
  list = (list || []).map((r) => { if (r && r.accountId && accMap.has(String(r.accountId))) return { ...r, name: accMap.get(String(r.accountId)) }; return r; });
  list = selectBestPerName(list);
  list.sort((a, b) => b.score - a.score);
  list = list.slice(0, 100);
  const content = document.getElementById('leaderboardContent');
  if (content) {
    content.innerHTML = '';
    const hasSS = list.some(r => {
      const rr = computeRank(Number(r.score || 0), false);
      return rr && rr.level === 'SS';
    });
    if (list.length === 0) {
      const empty = document.createElement('p');
      empty.className = 'dialog-text';
      empty.textContent = '尚無成績記錄';
      content.appendChild(empty);
    } else {
      list.forEach((r, i) => {
        const row = document.createElement('div');
        row.className = 'row';
        const name = document.createElement('span');
        name.className = 'name';
        name.textContent = `${i + 1}. ${r.name}`;
        const score = document.createElement('span');
        score.className = 'score';
        score.textContent = `${r.score}`;
        const time = document.createElement('span');
        time.className = 'route';
        time.textContent = formatTime(r.time || 0);
        const progress = document.createElement('span');
        progress.className = 'route';
        progress.textContent = r.progress || '';
        const route = document.createElement('span');
        route.className = 'route';
        route.textContent = r.route === 'HanYu' ? '韓愈線' : (r.route === 'LiuZongyuan' ? '柳宗元線' : r.route);
        const rRank = computeRank(Number(r.score || 0), false);
        if (rRank && rRank.level === 'SS') row.classList.add('rank-ss');
        const badge = document.createElement('span');
        badge.className = 'route';
        badge.textContent = rRank ? `【${rRank.title}】` : '';
        row.appendChild(name);
        row.appendChild(score);
        row.appendChild(time);
        row.appendChild(progress);
        row.appendChild(route);
        if (badge.textContent) row.appendChild(badge);
        content.appendChild(row);
      });
    }
  }
  leaderboardFilter = filterRoute || 'All';
  backdrop.hidden = false;
}

async function displayUnlocksLeaderboardInModal() {
  const content = document.getElementById('leaderboardContent');
  const titleEl = document.getElementById('modalTitle');
  if (content) {
    content.innerHTML = '';
    const info = document.createElement('p');
    info.className = 'dialog-text';
    const accounts = loadAccountsList();
    const allKeys = getIllustrationList();
    const stats = [];
    const pushStat = (acc, items) => {
      const set = new Set(items);
      const count = allKeys.reduce((n, k) => n + (set.has(k) ? 1 : 0), 0);
      const pct = allKeys.length ? Math.round((count / allKeys.length) * 100) : 0;
      stats.push({ id: acc.id, name: acc.name || acc.id, count, pct });
    };
    for (const acc of accounts) {
      let items = await fetchUnlocksForAccountId(acc.id);
      if (!items.length) items = getLocalUnlocksForAccountId(acc.id);
      pushStat(acc, items);
    }
    if (!accounts.length) {
      const guestSet = getCurrentUnlocksSet();
      const count = Array.from(guestSet).length;
      const pct = allKeys.length ? Math.round((count / allKeys.length) * 100) : 0;
      stats.push({ id: 'guest', name: localStorage.getItem('hanliu_player_name') || '無名', count, pct });
    }
    stats.sort((a, b) => b.count - a.count || a.name.localeCompare(b.name));
    info.textContent = `圖鑑收集排行｜總圖鑑項目：${allKeys.length}｜帳號數：${accounts.length || 1}`;
    content.appendChild(info);
    stats.forEach((s, i) => {
      const row = document.createElement('div');
      row.className = 'row';
      const name = document.createElement('span');
      name.className = 'name';
      name.textContent = `${i + 1}. ${s.name}`;
      const score = document.createElement('span');
      score.className = 'score';
      score.textContent = `${s.count}`;
      const route = document.createElement('span');
      route.className = 'route';
      route.textContent = `${s.pct}%`;
      row.appendChild(name);
      row.appendChild(score);
      row.appendChild(route);
      content.appendChild(row);
    });
  }
  if (titleEl) titleEl.textContent = '排行榜';
  backdrop.hidden = false;
}

function formatTime(totalSeconds) {
  const m = Math.floor(totalSeconds / 60);
  const s = totalSeconds % 60;
  return `${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`;
}

function clearLeaderboard() {
  requirePassword(() => {
    localStorage.removeItem('hanliu_scores');
    displayLeaderboard(leaderboardFilter, true);
  });
}
async function wipeCloudScores() {
  if (cloudSyncDisabled) return;
  const ep = getCloudEndpoint();
  const auth = getCloudAuth();
  if (!ep) return;
  const headers = { ...(auth ? { authorization: auth } : {}) };
  const jsonHeaders = { 'content-type': 'application/json', ...(auth ? { authorization: auth } : {}) };
  let list = null;
  try {
    const r = await fetch(ep, { headers });
    const txt = await r.text();
    try { list = JSON.parse(txt); } catch { list = null; }
  } catch {}
  const bulkDelete = () => fetch(ep, { method: 'DELETE', headers, mode: 'cors', keepalive: true });
  const bulkPost = () => fetch(ep, { method: 'POST', headers: jsonHeaders, mode: 'cors', keepalive: true, body: JSON.stringify({ action: 'clear_all' }) });
  const bulkPut = () => fetch(ep, { method: 'PUT', headers: jsonHeaders, mode: 'cors', keepalive: true, body: '[]' });
  try { await bulkDelete(); } catch {}
  if (Array.isArray(list) && list.length) {
    for (const it of list) {
      const id = String(it && it.id || '').trim();
      if (!id) continue;
      try { await fetch(`${ep.replace(/\/$/, '')}/${encodeURIComponent(id)}`, { method: 'DELETE', headers, mode: 'cors', keepalive: true }); }
      catch {
        try { await fetch(ep, { method: 'POST', headers: jsonHeaders, mode: 'cors', keepalive: true, body: JSON.stringify({ action: 'delete', id }) }); } catch {}
      }
    }
  }
  try { await bulkPost(); } catch {}
  try { await bulkPut(); } catch {}
}
function clearLeaderboardAll() {
  requirePassword(() => {
    const done = () => { try { localStorage.removeItem('hanliu_scores'); } catch {} displayLeaderboard(leaderboardFilter, true); };
    if (cloudSyncDisabled) { done(); return; }
    wipeCloudScores().then(() => { done(); }).catch(() => { done(); });
  });
}
function exportLeaderboard() {
  const raw = localStorage.getItem('hanliu_scores') || '[]';
  const blob = new Blob([raw], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = 'hanliu_leaderboard.json';
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}
function importLeaderboard(ev) {
  const file = ev && ev.target && ev.target.files && ev.target.files[0];
  if (!file) return;
  const reader = new FileReader();
  reader.onload = () => {
    try {
      const incoming = JSON.parse(String(reader.result || '[]'));
      const key = 'hanliu_scores';
      const raw = localStorage.getItem(key);
      let arr = [];
      try { arr = raw ? JSON.parse(raw) : []; } catch { arr = []; }
      const merged = Array.isArray(incoming) ? dedupeRecords(arr.concat(incoming)) : arr;
      localStorage.setItem(key, JSON.stringify(merged));
      displayLeaderboard(leaderboardFilter);
    } catch {}
  };
  reader.readAsText(file);
}

function saveName() {
  const name = input.value.trim();
  if (!name) { input.focus(); return; }
  localStorage.setItem('hanliu_player_name', name);
  intro.textContent = `已設定暱稱：${name}`;
}

function createDialogContainer(playerName) {
  const container = document.createElement('section');
  container.className = 'dialog-container';
  container.id = 'dialogContainer';

  const p1 = document.createElement('p');
  p1.className = 'dialog-text';
  p1.textContent = '寒流來襲，您在極致的寒冷中失去知覺，醒來時發現身處一片奇異的空間，一片虛無中，僅一顆糖果飄在面前。';

  const p2 = document.createElement('p');
  p2.className = 'dialog-text';
  p2.textContent = '一個神秘的聲音問道：「今有糖，你要含入口中還是留著？」';

  const candy = document.createElement('span');
  candy.className = 'candy';
  candy.textContent = '🍭';

  const choices = document.createElement('div');
  choices.className = 'choices';

  const swallowBtn = document.createElement('button');
  swallowBtn.className = 'button';
  swallowBtn.type = 'button';
  swallowBtn.textContent = '含入口中';

  const keepBtn = document.createElement('button');
  keepBtn.className = 'button';
  keepBtn.type = 'button';
  keepBtn.textContent = '留著';

  swallowBtn.addEventListener('click', () => {
    currentRoute = 'HanYu';
    startTime = Date.now();
    currentProgress = 'Level 1';
    const prologue = document.getElementById('dialogContainer');
    if (prologue) prologue.style.display = 'none';
    openRouteDialog('HanYu');
  });
  keepBtn.addEventListener('click', () => {
    showBlockModal('功能開發中', [
      { text: '此功能開發中，敬請期待' }
    ], () => { navigateHome(); });
  });

  choices.appendChild(swallowBtn);
  choices.appendChild(keepBtn);

  container.appendChild(p1);
  container.appendChild(p2);
  container.appendChild(candy);
  container.appendChild(choices);

  const main = document.querySelector('main.container');
  main.appendChild(container);
}

function openAbout() {
  const overlay = document.createElement('div');
  overlay.className = 'modal-backdrop';
  const modal = document.createElement('div');
  modal.className = 'modal hc3';
  const close = document.createElement('button');
  close.className = 'modal-close';
  close.type = 'button';
  close.textContent = '×';
  close.addEventListener('click', () => { document.body.removeChild(overlay); });
  const title = document.createElement('h2');
  title.className = 'modal-title';
  title.textContent = '關於遊戲';
  const gameName = document.createElement('p');
  gameName.className = 'dialog-text';
  gameName.textContent = '遊戲名稱：寒流';
  const d0 = document.createElement('p'); d0.className = 'dialog-text'; d0.textContent = '總設計：楊竣傑';
  const d1 = document.createElement('p'); d1.className = 'dialog-text'; d1.textContent = '程式開發：Trae.ai (AI 輔助實作)';
  const d2 = document.createElement('p'); d2.className = 'dialog-text'; d2.textContent = '專案指導與架構分析：Gemini (AI 協作顧問)';
  const d3 = document.createElement('p'); d3.className = 'dialog-text'; d3.textContent = '背景音樂：楊竣傑';
  const d4 = document.createElement('p'); d4.className = 'dialog-text'; d4.textContent = '視覺素材：Gemini (AI 繪圖)';
  const d5 = document.createElement('p'); d5.className = 'dialog-text'; d5.textContent = '數據來源：經典文獻與韓柳文集、上課簡報';
  const d6 = document.createElement('p'); d6.className = 'dialog-text'; d6.textContent = '品質管制顧問 (QC)：楊采樺';
  const d7 = document.createElement('p'); d7.className = 'dialog-text'; d7.textContent = '專案政策顧問：鍾旻諺、李聖億';
  const d8 = document.createElement('p'); d8.className = 'dialog-text'; d8.textContent = `版本：${appVersion}`;
  modal.appendChild(close);
  modal.appendChild(title);
  modal.appendChild(gameName);
  modal.appendChild(d0);
  modal.appendChild(d1);
  modal.appendChild(d2);
  modal.appendChild(d3);
  modal.appendChild(d4);
  modal.appendChild(d5);
  modal.appendChild(d6);
  modal.appendChild(d7);
  modal.appendChild(d8);
  overlay.appendChild(modal);
  document.body.appendChild(overlay);
}

async function openAutoTest() {
  const overlay = document.createElement('div');
  overlay.className = 'modal-backdrop active-block';
  const modal = document.createElement('div');
  modal.className = 'modal';
  const close = document.createElement('button');
  close.className = 'modal-close';
  close.type = 'button';
  close.textContent = '×';
  close.addEventListener('click', () => { try { document.body.removeChild(overlay); } catch {} });
  const title = document.createElement('h2');
  title.className = 'modal-title';
  title.textContent = '自動測試';
  const status = document.createElement('div');
  status.className = 'actions';
  status.style.flexDirection = 'column';
  status.style.alignItems = 'stretch';
  status.style.justifyContent = 'flex-start';
  status.style.gap = '0.5rem';
  const append = (text, ok) => {
    const p = document.createElement('p');
    p.className = 'dialog-text';
    p.textContent = `${ok ? '✅' : '❌'} ${text}`;
    status.appendChild(p);
  };
  try {
    let ok = false;
    try { localStorage.setItem('hanliu_self_test', 'ok'); ok = (localStorage.getItem('hanliu_self_test') === 'ok'); } catch {}
    append('本機儲存可用', ok);
  } catch { append('本機儲存可用', false); }
  try {
    initBgm();
    append('音樂元件已建立', !!bgmAudio);
  } catch { append('音樂元件已建立', false); }
  try {
    const startBtn = document.getElementById('startBtn');
    const leaderboardBtn = document.getElementById('leaderboardBtn');
    const drawCardBtn = document.getElementById('drawCardBtn');
    const cardManagerBtn = document.getElementById('cardManagerBtn');
    append('主要按鈕存在：開始遊戲', !!startBtn);
    append('主要按鈕存在：排行榜', !!leaderboardBtn);
    append('主要按鈕存在：筆墨祈願', !!drawCardBtn);
    append('主要按鈕存在：卡片背包', !!cardManagerBtn);
  } catch {
    append('主要按鈕檢查', false);
  }
  try {
    const ep = getCloudEndpoint();
    if (ep) {
      let ok = false;
      try {
        const r = await fetch(ep, { method: 'GET', mode: 'cors' });
        ok = !!r;
      } catch { ok = false; }
      append(`雲端端點連線：${ep}`, ok);
    } else {
      append('雲端端點設定缺失', false);
    }
  } catch { append('雲端端點連線', false); }
  modal.appendChild(close);
  modal.appendChild(title);
  modal.appendChild(status);
  overlay.appendChild(modal);
  document.body.appendChild(overlay);
}

function openRouteDialog(route) {
  const container = document.createElement('section');
  container.className = 'dialog-container';
  const text = document.createElement('p');
  text.className = 'dialog-text';
  if (route === 'HanYu') {
    text.textContent = '韓愈線：你含下了糖果，舌尖感受到極致的甘甜，但身體隨即感受到無盡的寒意。你獲得了甜頭，但這也預示著你的開局將是父母雙亡、天崩開局。然而，你的人生終將爬到高處。';
  } else {
    text.textContent = '柳宗元線：你選擇留著糖果，獲得了完美的開局。但因不願嘗甜，你的人生每況愈下，你的路將比任何人都坎坷。到最後，你只有苦頭可吃。';
  }
  container.appendChild(text);
  if (route === 'HanYu') {
    const nextBtn = document.createElement('button');
    nextBtn.className = 'button';
    nextBtn.type = 'button';
    nextBtn.textContent = '進入第一關：句讀';
    container.appendChild(nextBtn);
  } else {
    const backBtn = document.createElement('button');
    backBtn.className = 'button';
    backBtn.type = 'button';
    backBtn.textContent = '返回首頁';
    container.appendChild(backBtn);
  }
  const main = document.querySelector('main.container');
  main.appendChild(container);
  if (route === 'HanYu') triggerLightning();
  if (route === 'HanYu') {
    const nextBtn = container.querySelector('.button');
    if (nextBtn) nextBtn.addEventListener('click', () => {
      container.style.display = 'none';
      currentLevelIndex = -1;
      goToNextLevel();
    });
  } else {
    const backBtn = container.querySelector('.button');
    if (backBtn) backBtn.addEventListener('click', () => {
      container.style.display = 'none';
      navigateHome();
    });
  }
}

function triggerLightning() {
  const overlay = document.createElement('div');
  overlay.className = 'flash-overlay';
  overlay.addEventListener('animationend', () => {
    overlay.remove();
    document.documentElement.style.setProperty('--bg', '#0A0B1A');
  });
  document.body.appendChild(overlay);
}

const sentenceBank = [
  { question: '子曰學而時習之不亦說乎有朋自遠方來不亦樂乎人不知而不慍不亦君子乎', correctSegmentation: '子曰/學而時習之/不亦說乎/有朋自遠方來/不亦樂乎/人不知而不慍/不亦君子乎' },
  { question: '惻隱之心仁之端也羞惡之心義之端也辭讓之心禮之端也是非之心智之端也', correctSegmentation: '惻隱之心/仁之端也/羞惡之心/義之端也/辭讓之心/禮之端也/是非之心/智之端也' },
  { question: '大學之道在明明德在親民在止於至善知止而後有定定而後能靜靜而後能安安而後能慮慮而後能得', correctSegmentation: '大學之道/在明明德/在親民/在止於至善/知止而後有定/定而後能靜/靜而後能安/安而後能慮/慮而後能得' },
  { question: '天命之謂性率性之謂道修道之謂教道也者不可須臾離也可離非道也', correctSegmentation: '天命之謂性/率性之謂道/修道之謂教/道也者/不可須臾離也/可離/非道也' },
  { question: '投我以木桃報之以瓊瑤匪報也永以為好也', correctSegmentation: '投我以木桃/報之以瓊瑤/匪報也/永以為好也' },
  { question: '寬而栗柔而立願而恭亂而敬擾而毅直而溫簡而廉剛而塞強而義彰厥有常吉哉', correctSegmentation: '寬而栗/柔而立/願而恭/亂而敬/擾而毅/直而溫/簡而廉/剛而塞/強而義/彰厥有常/吉哉' },
  { question: '凡學之道嚴師為難師嚴然後道尊道尊然後民知敬學', correctSegmentation: '凡學之道/嚴師為難/師嚴然後道尊/道尊然後民知敬學' },
  { question: '易有太極是生兩儀兩儀生四象四象生八卦八卦定吉凶吉凶生大業', correctSegmentation: '易有太極/是生兩儀/兩儀生四象/四象生八卦/八卦定吉凶/吉凶生大業' },
  { question: '九月宋人執鄭祭仲突歸於鄭鄭忽出奔衛', correctSegmentation: '九月/宋人執鄭祭仲/突歸於鄭/鄭忽出奔衛' },
];

function sampleQuestions(bank, n) {
  const arr = [...bank];
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr.slice(0, n);
}

function normalizeSegmentation(str) {
  if (!str) return '';
  let s = str.replace(/[／]/g, '/');
  s = s.trim();
  s = s.replace(/^\/+|\/+$/g, '');
  s = s.replace(/[ \t\u00A0\u3000]+/g, '');
  s = s.replace(/\/+/g, '/');
  return s;
}

function startSentenceLevel() {
  applyLevelStyle('Number');
  currentQuestions = sampleQuestions(sentenceBank, 3);
  currentQuestionIndex = 0;
  const main = document.querySelector('main.container');
  let level = document.getElementById('levelSentence');
  if (!level) {
    level = document.createElement('section');
    level.className = 'dialog-container';
    level.id = 'levelSentence';
    main.appendChild(level);
  } else {
    level.innerHTML = '';
    level.style.display = '';
  }
  showHpBar();
  updateHpBar();
  renderSentenceQuestion();
}

function renderSentenceQuestion() {
  const main = document.querySelector('main.container');
  if (!main) return;
  const leaderboardPage = document.getElementById('leaderboardPage');
  if (leaderboardPage || (typeof backdrop !== 'undefined' && !backdrop.hidden)) return;
  let level = document.getElementById('levelSentence');
  if (!level) {
    level = document.createElement('section');
    level.className = 'dialog-container';
    level.id = 'levelSentence';
    main.appendChild(level);
  }
  level.innerHTML = '';
  const q = currentQuestions[currentQuestionIndex];
  const title = document.createElement('h2');
  title.className = 'modal-title';
  title.textContent = '第一關：句讀明義';
  const prompt = document.createElement('p');
  prompt.className = 'dialog-text';
  prompt.textContent = '操作指南：請點擊文字之間的空隙以插入斷句符號（/）。再次點擊可移除。';
  const segBox = document.createElement('div');
  segBox.className = 'seg-box';
  const chars = Array.from(q.question);
  for (let i = 0; i < chars.length; i++) {
    const sc = document.createElement('span');
    sc.className = 'seg-char';
    sc.textContent = chars[i];
    segBox.appendChild(sc);
    if (i < chars.length - 1) {
      const gap = document.createElement('button');
      gap.className = 'seg-gap';
      gap.type = 'button';
      gap.dataset.index = String(i);
      gap.textContent = '';
      gap.addEventListener('click', () => {
        gap.classList.toggle('active');
        gap.textContent = gap.classList.contains('active') ? '/' : '';
      });
      segBox.appendChild(gap);
    }
  }
  const hintBtn = document.createElement('button');
  hintBtn.className = 'button';
  hintBtn.type = 'button';
  hintBtn.textContent = '小雨提示';
  if (selectedCardId !== 'card_spring' || springHintUsedInRun) hintBtn.style.display = 'none';
  const submitBtn = document.createElement('button');
  submitBtn.className = 'button';
  submitBtn.type = 'button';
  submitBtn.textContent = '提交';
  const msg = document.createElement('p');
  msg.className = 'dialog-text';
  let submitting = false;
  hintBtn.addEventListener('click', () => {
    isHintUsedInLevel = true;
    springHintUsedInRun = true;
    hintBtn.style.display = 'none';
    playSpringHintEffect();
    const correct = normalizeSegmentation(q.correctSegmentation);
    const groups = correct.split('/');
    let pos = 0;
    for (let i = 0; i < groups.length - 1; i++) {
      pos += Array.from(groups[i]).length;
      const gapEl = segBox.querySelector(`.seg-gap[data-index="${pos - 1}"]`);
      if (gapEl) gapEl.classList.add('hint-green');
    }
  });

  submitBtn.addEventListener('click', () => {
    if (submitting) return;
    let built = '';
    for (let i = 0; i < chars.length; i++) {
      built += chars[i];
      const gapEl = segBox.querySelector(`.seg-gap[data-index="${i}"]`);
      if (gapEl && gapEl.classList.contains('active')) built += '/';
    }
    const user = normalizeSegmentation(built);
    const correct = normalizeSegmentation(q.correctSegmentation);
    if (user && user === correct) {
      submitting = true;
      submitBtn.disabled = true;
      segBox.style.pointerEvents = 'none';
      msg.className = 'dialog-text success-text';
      msg.textContent = '答對！';
      currentQuestionIndex += 1;
      if (currentQuestionIndex >= currentQuestions.length) {
        const pause = document.createElement('p');
        pause.className = 'dialog-text success-text';
        pause.textContent = '句讀精準！+10 分，第二關即將開始...';
        level.appendChild(pause);
        applyLevelClear(level, 10);
      } else {
        setTimeout(renderSentenceQuestion, 1500);
      }
    } else {
      handleError('Number');
      if (errorCount === 1) {
        msg.className = 'dialog-text error-text';
        msg.textContent = '身體與靈魂不匹配的警告。韓愈，你辜負了兄嫂的日夜期盼... 請再想想天上的父母，他們的期望，你還能承擔幾次失誤？';
        currentQuestionIndex = Math.min(currentQuestionIndex + 1, currentQuestions.length - 1);
        setTimeout(renderSentenceQuestion, 2000);
      }
    }
  });

  level.appendChild(title);
  level.appendChild(prompt);
  level.appendChild(segBox);
  level.appendChild(hintBtn);
  level.appendChild(submitBtn);
  level.appendChild(msg);
}
function playSpringHintEffect() {
  try {
    const ov = document.createElement('div');
    ov.className = 'rain-overlay';
    document.body.appendChild(ov);
    setTimeout(() => { try { document.body.removeChild(ov); } catch {} }, 1200);
  } catch {}
  try {
    const a = new Audio('water_drop.mp3');
    a.volume = Math.min(1, (bgmVolume || 0.6) * 0.8);
    a.play().catch(() => {});
  } catch {}
}
function triggerMemorialEffect() {
  try {
    const fx = document.createElement('div'); fx.className = 'ssr-effect-memorial';
    for (let i = 0; i < 120; i++) {
      const p = document.createElement('i');
      p.className = 'ash ' + (Math.random() < 0.6 ? 'black' : 'gold');
      p.style.left = (Math.random() * 100) + 'vw';
      p.style.setProperty('--x', (Math.random() * 40 - 20) + 'px');
      p.style.setProperty('--t', (2.4 + Math.random() * 1.6) + 's');
      fx.appendChild(p);
    }
    document.body.appendChild(fx);
    setTimeout(() => { try { document.body.removeChild(fx); } catch {} }, 1000);
  } catch {}
  try {
    const a = new Audio('drum_boom.mp3');
    a.volume = Math.min(1, (bgmVolume || 0.6) * 0.9);
    a.play().catch(() => {});
  } catch {}
  try {
    const main = document.querySelector('main.container') || document.body;
    const t0 = performance.now();
    const dur = 500;
    const base = getComputedStyle(main).transform;
    function shake(now) {
      const el = main;
      const dt = now - t0;
      if (dt >= dur) { el.style.transform = base; return; }
      const x = (Math.random() * 10 - 5);
      const y = (Math.random() * 10 - 5);
      el.style.transform = `translate(${x}px, ${y}px)`;
      requestAnimationFrame(shake);
    }
    requestAnimationFrame(shake);
  } catch {}
}
function openCardDetail(id) {
  try {
    const reveal = document.createElement('div'); reveal.className = 'modal-backdrop active-block';
    const modal = document.createElement('div'); modal.className = 'modal';
    const close = document.createElement('button'); close.className = 'modal-close'; close.type = 'button'; close.textContent = '×'; close.addEventListener('click', () => { try { document.body.removeChild(reveal); } catch {} });
    const title = document.createElement('h2'); title.className = 'modal-title'; title.textContent = getCardName(id);
    const imgSrc = getCardImage(id);
    if (imgSrc) { const img = document.createElement('img'); img.src = imgSrc; img.alt = getCardName(id); img.className = 'detail-img'; img.onerror = () => { try { modal.removeChild(img); } catch {} }; modal.appendChild(img); }
    const desc = document.createElement('p'); desc.className = 'dialog-text'; desc.textContent = (CARD_DATA.find(x => x.id === id)?.desc) || '';
    modal.appendChild(close); modal.appendChild(title); if (imgSrc) modal.appendChild(desc); else modal.appendChild(desc);
    reveal.appendChild(modal); document.body.appendChild(reveal);
  } catch {}
}
function refreshOpenCardManager() {
  const list = document.querySelector('.card-select');
  if (!list) return;
  const rows = list.querySelectorAll('.card-item');
  rows.forEach(r => {
    const nameEl = r.querySelector('span');
    if (!nameEl) return;
    const text = nameEl.textContent || '';
    const id = CARD_DATA.find(c => text.includes(c.name))?.id || '';
    if (!id) return;
    if (id === selectedCardId) r.classList.add('selected'); else r.classList.remove('selected');
  });
}
function openInventoryCardDetail(id) {
  try {
    const reveal = document.createElement('div'); reveal.className = 'modal-backdrop active-block';
    const modal = document.createElement('div'); modal.className = 'modal';
    const close = document.createElement('button'); close.className = 'modal-close'; close.type = 'button'; close.textContent = '×'; close.addEventListener('click', () => { try { document.body.removeChild(reveal); } catch {} });
    const title = document.createElement('h2'); title.className = 'modal-title'; title.textContent = getCardName(id);
    const badge = document.createElement('span'); badge.className = `rar-badge rar-${getCardRarity(id)}`; badge.textContent = getCardRarity(id); title.appendChild(badge);
    const status = document.createElement('p'); status.className = 'dialog-text'; status.textContent = (selectedCardId === id) ? '狀態：已裝備' : '狀態：未裝備';
    const imgSrc = getCardImage(id);
    if (imgSrc) { const img = document.createElement('img'); img.src = imgSrc; img.alt = getCardName(id); img.className = 'detail-img'; img.onerror = () => { try { modal.removeChild(img); } catch {} }; modal.appendChild(img); }
    const desc = document.createElement('p'); desc.className = 'dialog-text'; desc.textContent = (CARD_DATA.find(x => x.id === id)?.desc) || '';
    const warn = document.createElement('p'); warn.className = 'dialog-text'; warn.textContent = '提醒：使用後卡片將消失（消耗品）。';
    const actions = document.createElement('div'); actions.className = 'actions';
    const equipBtn = document.createElement('button'); equipBtn.className = 'button'; equipBtn.type = 'button'; equipBtn.textContent = '裝備'; equipBtn.addEventListener('click', () => { setSelectedCard(id); status.textContent = '狀態：已裝備'; refreshOpenCardManager(); });
    const unequipBtn = document.createElement('button'); unequipBtn.className = 'button'; unequipBtn.type = 'button'; unequipBtn.textContent = '卸下'; unequipBtn.addEventListener('click', () => { if (selectedCardId === id) setSelectedCard(''); status.textContent = '狀態：未裝備'; refreshOpenCardManager(); });
    actions.appendChild(equipBtn); actions.appendChild(unequipBtn);
    modal.appendChild(close); modal.appendChild(title); modal.appendChild(status); if (imgSrc) modal.appendChild(desc); else modal.appendChild(desc); modal.appendChild(warn); modal.appendChild(actions);
    reveal.appendChild(modal); document.body.appendChild(reveal);
  } catch {}
}
function openPreEquipModal(onConfirm) {
  const overlay = document.createElement('div');
  overlay.className = 'modal-backdrop active-block';
  const modal = document.createElement('div');
  modal.className = 'modal';
  const close = document.createElement('button');
  close.className = 'modal-close';
  close.type = 'button';
  close.textContent = '×';
  close.addEventListener('click', () => { try { document.body.removeChild(overlay); } catch {} });
  const title = document.createElement('h2');
  title.className = 'modal-title';
  title.textContent = '出發前裝備';
  const status = document.createElement('p');
  status.className = 'dialog-text';
  status.textContent = selectedCardId ? `目前裝備：${getCardName(selectedCardId)}（${getCardRarity(selectedCardId)}）` : '目前裝備：無';
  const list = document.createElement('div');
  list.className = 'card-select';
  const preview = document.createElement('div');
  preview.className = 'dialog-container';
  const renderPreview = (id) => {
    preview.innerHTML = '';
    if (!id) { const p = document.createElement('p'); p.className = 'dialog-text'; p.textContent = '未選擇卡片'; preview.appendChild(p); return; }
    const head = document.createElement('h3'); head.className = 'modal-title'; head.textContent = getCardName(id);
    const badge = document.createElement('span'); badge.className = `rar-badge rar-${getCardRarity(id)}`; badge.textContent = getCardRarity(id); head.appendChild(badge);
    const imgSrc = getCardImage(id);
    let imgEl = null;
    if (imgSrc) { imgEl = document.createElement('img'); imgEl.src = imgSrc; imgEl.alt = getCardName(id); imgEl.className = 'card-img'; }
    const desc = document.createElement('p'); desc.className = 'dialog-text'; desc.textContent = (CARD_DATA.find(x => x.id === id)?.desc) || '';
    const warn = document.createElement('p'); warn.className = 'dialog-text'; warn.textContent = '提醒：使用後卡片將消失（消耗品）。';
    const actions = document.createElement('div'); actions.className = 'actions';
    const equipBtn = document.createElement('button'); equipBtn.className = 'button'; equipBtn.type = 'button'; equipBtn.textContent = '裝備'; equipBtn.addEventListener('click', () => { setSelectedCard(id); status.textContent = `目前裝備：${getCardName(selectedCardId)}（${getCardRarity(selectedCardId)}）`; });
    const unequipBtn = document.createElement('button'); unequipBtn.className = 'button'; unequipBtn.type = 'button'; unequipBtn.textContent = '不裝備'; unequipBtn.addEventListener('click', () => { setSelectedCard(''); status.textContent = '目前裝備：無'; });
    actions.appendChild(equipBtn); actions.appendChild(unequipBtn);
    preview.appendChild(head); if (imgEl) preview.appendChild(imgEl); preview.appendChild(desc); preview.appendChild(warn); preview.appendChild(actions);
  };
  const inv = loadInventory();
  list.innerHTML = '';
  inv.forEach((id) => {
    const row = document.createElement('div');
    row.className = `card-item rar-${getCardRarity(id)}`;
    if (id === selectedCardId) row.classList.add('selected');
    const name = document.createElement('span'); name.textContent = `${getCardName(id)}（${getCardRarity(id)}）`;
    row.appendChild(name);
    row.addEventListener('click', () => { renderPreview(id); });
    list.appendChild(row);
  });
  if (!inv.length) { const empty = document.createElement('p'); empty.className = 'dialog-text'; empty.textContent = '目前尚無卡片'; list.appendChild(empty); }
  renderPreview(selectedCardId || (inv[0] || ''));
  const actions = document.createElement('div'); actions.className = 'actions';
  const confirmBtn = document.createElement('button'); confirmBtn.className = 'button'; confirmBtn.type = 'button'; confirmBtn.textContent = '確定開始'; confirmBtn.addEventListener('click', () => { try { document.body.removeChild(overlay); } catch {} if (typeof onConfirm === 'function') onConfirm(); });
  const cancelBtn = document.createElement('button'); cancelBtn.className = 'button'; cancelBtn.type = 'button'; cancelBtn.textContent = '返回'; cancelBtn.addEventListener('click', () => { try { document.body.removeChild(overlay); } catch {} });
  actions.appendChild(confirmBtn); actions.appendChild(cancelBtn);
  modal.appendChild(close); modal.appendChild(title); modal.appendChild(status); modal.appendChild(list); modal.appendChild(preview); modal.appendChild(actions);
  overlay.appendChild(modal); document.body.appendChild(overlay);
}
function attachDrawCardInteractions(container, rarity, id, onShowComplete, noFlipBack = false) {
  let flipped = false;
  let userInteracted = false;
  let longPressed = false;
  let lpTimer = null;
  let autoFlipTimer = null;
  let autoNextTimer = null;
  function scheduleAutoFlip() {
    if (rarity === 'N' || rarity === 'R') {
      autoFlipTimer = setTimeout(() => {
        if (!userInteracted && !flipped) {
          container.classList.add('flip'); flipped = true;
          scheduleAutoNext();
        }
      }, 1000);
    }
  }
  function scheduleAutoNext() {
    if (typeof onShowComplete === 'function') {
      autoNextTimer = setTimeout(() => { try { onShowComplete(); } catch {} }, 5000);
    }
  }
  container.addEventListener('pointerdown', () => {
    userInteracted = true;
    lpTimer = setTimeout(() => { longPressed = true; openCardDetail(id); }, 600);
  });
  function clearLp() { if (lpTimer) { clearTimeout(lpTimer); lpTimer = null; } }
  container.addEventListener('pointerup', () => {
    clearLp();
    if (!longPressed) {
      if (noFlipBack) {
        if (!flipped) { container.classList.add('flip'); flipped = true; scheduleAutoNext(); }
      } else {
        container.classList.toggle('flip');
        flipped = container.classList.contains('flip');
        if (flipped) scheduleAutoNext();
      }
    }
    longPressed = false;
  });
  container.addEventListener('pointerleave', clearLp);
  scheduleAutoFlip();
}

const quanxueSegments = [
  { text: '君子曰：「學不可以已矣。青取之於藍，而青於藍；水則為冰，而寒於水。」', correctSegmentation: '君子曰/學不可以已矣/青取之於藍/而青於藍/水則為冰/而寒於水', keywords: ['學不可以已矣', '青於藍', '寒於水'], idea: '學無止境，弟子可勝於師。' },
  { text: '不升高山，不知天之高也；不臨深谿，不知地之厚也。', correctSegmentation: '不升高山/不知天之高也/不臨深谿/不知地之厚也', keywords: ['不升高山', '不臨深谿', '天之高', '地之厚'], idea: '唯有親身實踐，方知學問之博大。' },
  { text: '木從繩則直，金就礪則利。君子博學如日參己焉，故知明則行無過。', correctSegmentation: '木從繩則直/金就礪則利/君子博學/如日參己焉/故知明則行無過', keywords: ['木從繩則直', '金就礪則利', '博學', '行無過'], idea: '修學可正己身，明理以致行。' },
  { text: '君子之性非異也，而善假於物也。', correctSegmentation: '君子之性非異也/而善假於物也', keywords: ['善假於物', '君子之性'], idea: '善於借助外物者，能成大才。' },
  { text: '巢非不完也，所繫者然也。', correctSegmentation: '巢非不完也/所繫者然也', keywords: ['巢非不完', '所繫者然'], idea: '環境決定成敗。' },
  { text: '君子靖居恭學，脩身致志，處必擇鄉，游必就士。', correctSegmentation: '君子靖居恭學/脩身致志/處必擇鄉/游必就士', keywords: ['恭學', '脩身致志', '擇鄉', '就士'], idea: '慎選師友與環境，以正其道。' },
  { text: '物類之從，必有所由；榮辱之來，各象其德。', correctSegmentation: '物類之從/必有所由/榮辱之來/各象其德', keywords: ['物類之從', '榮辱之來', '其德'], idea: '德行決定榮辱。' },
  { text: '言有召禍，行有招辱，君子慎其所立焉。', correctSegmentation: '言有召禍/行有招辱/君子慎其所立焉', keywords: ['召禍', '招辱', '慎其所立'], idea: '慎言慎行，方免於禍。' },
  { text: '不積跬步，無以致千里；不積小流，無以成江海。', correctSegmentation: '不積跬步/無以致千里/不積小流/無以成江海', keywords: ['不積跬步', '致千里', '成江海'], idea: '積少成多，持之以恆。' },
  { text: '無憤憤之志者，無昭昭之明；無綿綿之事者，無赫赫之功。', correctSegmentation: '無憤憤之志者/無昭昭之明/無綿綿之事者/無赫赫之功', keywords: ['憤憤之志', '昭昭之明', '赫赫之功'], idea: '專一持志，方能有成。' },
  { text: '行無隱而不行；玉居山而木潤，淵生珠而岸不枯。', correctSegmentation: '行無隱而不行/玉居山而木潤/淵生珠而岸不枯', keywords: ['行無隱', '木潤', '淵生珠'], idea: '善行終將流傳，潤物無聲。' },
  { text: '君子不可以不學，見人不可以不飾。', correctSegmentation: '君子不可以不學/見人不可以不飾', keywords: ['不可以不學', '不可以不飾'], idea: '學以修內，飾以正外，內外兼修。' },
  { text: '珠者，陰之陽也，故勝火；玉者，陽之陰也，故勝水。', correctSegmentation: '珠者/陰之陽也/故勝火/玉者/陽之陰也/故勝水', keywords: ['珠者', '玉者', '勝火', '勝水'], idea: '珠玉比德，君子內剛外柔。' },
  { text: '夫水者，君子比德焉：偏與之而無私，似德；所及者生，似仁。', correctSegmentation: '夫水者/君子比德焉/偏與之而無私/似德/所及者生/似仁', keywords: ['君子比德', '無私', '似仁'], idea: '觀水知德，仁而無私。' },
];

const quanxueFullText = '君子曰：學不可以已矣，青取之於藍，而青於藍；水則為冰，而寒於水；木直而中繩，輮而為輪，其曲中規，枯暴不復挺者，輮使之然也。是故不升高山，不知天之高也；不臨深谿，不知地之厚也；不聞先王之遺道，不知學問之大也。于越戎貉之子，生而同聲，長而異俗者，教使之然也。是故木從繩則直，金就礪則利，君子博學如日參己焉，故知明則行無過。《詩》云：「嗟爾君子，無恆安息；靖恭爾位，好是正直；神之聽之，介爾景福。」神莫大於化道，福莫長於旡咎。孔子曰：「吾嘗終日思矣，不如須臾之所學。」吾嘗跂而望之，不如升高而博見也；升高而招，非臂之長也，而見者遠；順風而呼，非聲加疾也，而聞者著；假車馬者，非利足也，而致千里；假舟楫者，非能水也，而絕江海；君子之性非異也，而善假於物也。南方有鳥，名曰𧊷鳩，以羽為巢，編之以髮，繫之葦苕，風至苕折，子死卵破，巢非不完也，所繫者然也。西方有木，名曰射干，莖長四寸，生於高山之上，而臨百仞之淵，木莖非能長也，所立者然也。蓬生麻中，不扶自直。蘭氏之根，懷氏之苞，漸之滫中，君子不近，庶人不服，質非不美也，所漸者然也。是故君子靖居恭學，脩身致志，處必擇鄉，游必就士，所以防僻邪而道中正也。物類之從，必有所由；榮辱之來，各象其德。肉腐出蟲，魚枯生蠹；殆教亡身，禍災乃作。強自取折，柔自取束；邪穢在身，怨之所構。布薪若一火就燥，平地若一水就濕，草木疇生，禽獸群居，物各從其類也。是故正鵠張，而弓矢至焉；林木茂，而斧斤至焉。樹成蔭，而鳥息焉；醯酸，而蚋聚焉，故言有召禍，行有招辱，君子慎其所立焉。積土成山，風雨興焉；積水成川，蛟龍生焉；積善成德，神明自傳，聖心備矣。是故不積跬步，無以致千里；不積小流，無以成江海；騏驥一躒，不能千里；駑馬無極，功在不舍；楔而舍之，朽木不折；楔而不舍，金石可鏤。夫螾無爪牙之利，筋脈之強，上食晞土，下飲黃泉者，用心一也。蟹二螯八足，非蛇夔之穴，而無所寄託者，用心躁也。是故無憤憤之志者，無昭昭之明；無綿綿之事者，無赫赫之功；行跂塗者不至，事兩君者不容；目不能兩視而明，耳不能兩聽而聰；騰蛇無足而騰，鼫鼠五伎而窮。《詩》云：「鳲鳩在桑，其子七兮；淑人君子，其儀一兮；其儀一兮，心若結兮。」君子其結於一也。昔者瓠巴鼓瑟，而沈魚出聽；伯牙鼓琴，而六馬仰秣，夫聲無細而不聞，行無隱而不行；玉居山而木潤，淵生珠而岸不枯；為善而不積乎？豈有不至哉？孔子曰：「野哉！君子不可以不學，見人不可以不飾。」不飾無貌，無貌不敬，不敬無禮，無禮不立。夫遠而有光者，飾也；近而逾明者，學也。譬如洿邪，水潦灟焉，莞蒲生焉，從上觀之，誰知其非源泉也。珠者，陰之陽也，故勝火；玉者，陽之陰也，故勝水；其化如神，故天子藏珠玉，諸侯藏金石，大夫畜犬馬，百姓藏布帛。不然，則強者能守之，知者能秉之，賤其所貴，而貴其所賤；不然，矜寡孤獨不得焉。子貢曰：「君子見大川必觀，何也？」孔子曰：「夫水者，君子比德焉：偏與之而無私，似德；所及者生，所不及者死，似仁；其流行庳下，倨句皆循其理，似義；其赴百仞之谿不疑，似勇；淺者流行，深淵不測，似智；弱約危通，似察；受惡不讓，似貞；苞裹不清以入，鮮潔以出，似善化；必出，量必平，似正；盈不求概，似厲；折必以東西，似意，是以見大川必觀焉。';

function startExamLevel() {
  currentExamAttempt = 1;
  examQuestions = sampleQuestions(quanxueSegments, 4);
  renderExamAttempt();
}

function getSceneImageUrl(key) {
  try {
    const mapRaw = localStorage.getItem('hanliu_scene_images') || '{}';
    const map = JSON.parse(mapRaw);
    if (map && typeof map[key] === 'string' && map[key].trim()) return map[key].trim();
  } catch {}
  if (key === 'luliang') return 'images/luliang.png';
  return '';
}
function resolveSceneImage(img, key) {
  const seen = new Set();
  const candidates = [];
  const fromLocal = getSceneImageUrl(key);
  if (fromLocal) candidates.push(fromLocal);
  candidates.push(`images/${key}.png`, `${key}.png`, `./${key}.png`);
  const list = candidates.filter((x) => { const y = String(x || '').trim(); if (!y || seen.has(y)) return false; seen.add(y); return true; });
  let i = 0;
  img.addEventListener('load', () => { try { unlockIllustration(img.src); } catch {} }, { once: true });
  const tryNext = () => { if (i >= list.length) return; img.src = list[i++]; };
  img.addEventListener('error', () => { tryNext(); }, { once: true });
  tryNext();
}

function renderExamAttempt() {
  const main = document.querySelector('main.container');
  if (!main) return;
  let level = document.getElementById('levelExam');
  if (!level) {
    level = document.createElement('section');
    level.className = 'dialog-container';
    level.id = 'levelExam';
    main.appendChild(level);
  }
  level.innerHTML = '';
  const title = document.createElement('h2');
  title.className = 'modal-title';
  title.textContent = '第二關：四次科舉';
  level.appendChild(title);

  const q = examQuestions[currentExamAttempt - 1];
  const positions = selectBlankPositions(q.text, currentExamAttempt);
  const answers = positions.map(i => q.text[i]);
  const textHTML = buildBlankedHTMLChars(q.text, positions);
  const passage = document.createElement('p');
  passage.className = 'dialog-text';
  passage.innerHTML = textHTML;
  level.appendChild(passage);

  const options = document.createElement('div');
  options.className = 'options';
  const distractors = getCharDistractors(answers, answers.length + 4);
  const optWords = shuffleArray([...answers, ...distractors]);
  optWords.forEach((word, idx) => {
    const ob = document.createElement('button');
    ob.className = 'button option';
    ob.type = 'button';
    ob.textContent = word;
    ob.dataset.optionId = `opt_${idx}`;
    ob.addEventListener('click', () => {
      const blanks = passage.querySelectorAll('.blank');
      for (const b of blanks) {
        if (!b.textContent) {
          b.textContent = word;
          b.dataset.sourceId = ob.dataset.optionId;
          ob.disabled = true;
          break;
        }
      }
    });
    options.appendChild(ob);
  });
  level.appendChild(options);

  Array.from(passage.querySelectorAll('.blank')).forEach((b) => {
    b.addEventListener('click', () => {
      const id = b.dataset.sourceId;
      if (id) {
        const btn = level.querySelector(`[data-option-id="${id}"]`);
        if (btn) btn.disabled = false;
      }
      b.textContent = '';
      b.dataset.sourceId = '';
    });
  });

  const submit = document.createElement('button');
  submit.className = 'button';
  submit.type = 'button';
  submit.textContent = '提交';
  submit.addEventListener('click', () => {
    const blanks = Array.from(passage.querySelectorAll('.blank'));
    const allFilled = blanks.every(b => !!b.textContent);
    const allCorrect = blanks.every(b => b.textContent === b.dataset.answer);
    if (!allFilled || !allCorrect) {
      handleError('Number');
      return;
    }
    const after = () => {
      level.innerHTML = '';
      if (currentExamAttempt <= 3) {
        const msg = document.createElement('p');
        msg.className = 'dialog-text';
        msg.textContent = '落第。你已盡全力，士氣未衰，整束再戰。';
        level.appendChild(msg);
        const next = document.createElement('button');
        next.className = 'button';
        next.type = 'button';
        next.textContent = '準備下一次科舉';
        next.addEventListener('click', () => {
          if (currentExamAttempt === 3) {
            level.innerHTML = '';
            const inter = document.createElement('p');
            inter.className = 'dialog-text';
            inter.textContent = '文名遠播，轉機已現 🧑‍💼 📚 陸贄、梁肅';
            level.appendChild(inter);
            const pic = document.createElement('img');
            pic.alt = '陸贄、梁肅';
            pic.loading = 'lazy';
            resolveSceneImage(pic, 'luliang');
            pic.style.width = 'min(420px, 80vw)';
            pic.style.maxHeight = '60vh';
            pic.style.objectFit = 'contain';
            pic.style.border = '1px solid #2a2a2a';
            pic.style.borderRadius = '10px';
            pic.style.boxShadow = '0 10px 24px rgba(0,0,0,0.35)';
            level.appendChild(pic);
            setTimeout(() => { currentExamAttempt = 4; renderExamAttempt(); }, 3000);
          } else {
            currentExamAttempt += 1;
            renderExamAttempt();
          }
        });
        level.appendChild(next);
      } else {
        const final = document.createElement('p');
        final.className = 'dialog-text success-text';
        final.textContent = '貞元八年（792年），你終於中進士了！';
        level.appendChild(final);
        bumpScore(15);
        setTimeout(() => { level.style.display = 'none'; goToNextLevel(); }, 1800);
      }
    };
    showIdeaModal(q.text, q.idea, after);
  });
  level.appendChild(submit);
}

function getCjkIndices(text) {
  const re = /[\u4E00-\u9FFF]/;
  const out = [];
  for (let i = 0; i < text.length; i++) { if (re.test(text[i])) out.push(i); }
  return out;
}

function extractClauses(text) {
  const re = /([^，、；。！？]+)([，、；。！？])/g;
  const out = [];
  let m;
  while ((m = re.exec(String(text))) !== null) {
    out.push({ text: String(m[1]).trim(), punct: String(m[2]) });
  }
  if (out.length === 0) return [{ text: String(text), punct: '' }];
  return out;
}

function selectBlankPositions(text, count) {
  const indices = getCjkIndices(text);
  const n = Math.min(count, indices.length);
  return sampleQuestions(indices, n).sort((a, b) => a - b);
}

function buildBlankedHTMLChars(text, positions) {
  const set = new Set(positions);
  let html = '';
  for (let i = 0; i < text.length; i++) {
    const ch = text[i];
    if (set.has(i)) html += `<span class="blank" data-answer="${ch}"></span>`;
    else html += ch;
  }
  return html;
}

function getCharDistractors(answers, count) {
  const re = /[\u4E00-\u9FFF]/;
  const chars = Array.from(quanxueFullText).filter(c => re.test(c));
  const set = new Set(answers);
  const pool = Array.from(new Set(chars)).filter(c => !set.has(c));
  return shuffleArray(pool).slice(0, count);
}

function shuffleArray(arr) { return sampleQuestions(arr, arr.length); }

function showPunishOverlay() {
  if (currentLevel === 8) {
    const flash = document.createElement('div');
    flash.className = 'flash-overlay';
    document.body.appendChild(flash);
    const overlay = document.createElement('div');
    overlay.className = 'punish-overlay';
    const sym = document.createElement('div');
    sym.className = 'punish-symbol';
    sym.textContent = '⚡';
    const silhouette = document.createElement('div');
    silhouette.className = 'punish-silhouette';
    silhouette.textContent = '👥';
    const text = document.createElement('p');
    text.className = 'dialog-text';
    text.textContent = '身體與靈魂不匹配的警告。韓愈，你寫出《祭鱷魚文》，是為驅逐蠻荒、安撫百姓。請再次感受文中的氣勢與脈絡…你還能承擔幾次失誤？';
    overlay.appendChild(sym);
    overlay.appendChild(silhouette);
    overlay.appendChild(text);
    document.body.appendChild(overlay);
    sym.addEventListener('animationend', () => { overlay.remove(); });
    flash.addEventListener('animationend', () => { flash.remove(); });
    return;
  }
  if (currentLevel === 9) {
    const overlay = document.createElement('div');
    overlay.className = 'punish-overlay';
    const sym = document.createElement('div');
    sym.className = 'punish-symbol';
    sym.textContent = '🖋️';
    const text = document.createElement('p');
    text.className = 'dialog-text';
    text.textContent = '身體與靈魂不匹配的警告。 韓愈，史筆當求精確，一字之差，傳世之作便成謬誤。請再次體會文字的重量...你還能承擔幾次失誤？';
    overlay.appendChild(sym);
    overlay.appendChild(text);
    document.body.appendChild(overlay);
    sym.addEventListener('animationend', () => { overlay.remove(); });
    return;
  }
  const overlay = document.createElement('div');
  overlay.className = 'punish-overlay';
  const sym = document.createElement('div');
  sym.className = 'punish-symbol';
  sym.textContent = '🕯️';
  overlay.appendChild(sym);
  document.body.appendChild(overlay);
  sym.addEventListener('animationend', () => { overlay.remove(); });
}

function showIdeaModal(excerpt, idea, onClose) {
  showBlockModal('主旨提示', [
    { className: 'dialog-text idea-excerpt', text: excerpt },
    { className: 'dialog-text idea-main', text: `💬 主旨：${idea}` },
  ], onClose);
}

function showConfirmModal(titleText, messageText, confirmText, onConfirm) {
  if (document.querySelector('.modal-backdrop.active-block.confirm')) return;
  const overlay = document.createElement('div');
  overlay.className = 'modal-backdrop active-block confirm';
  const modal = document.createElement('div');
  modal.className = 'modal';
  modal.classList.add('confirm-modal');
  const title = document.createElement('h2');
  title.className = 'modal-title';
  title.textContent = titleText || '提示';
  modal.appendChild(title);
  const p = document.createElement('p');
  p.className = 'dialog-text';
  p.textContent = messageText || '';
  modal.appendChild(p);
  const actions = document.createElement('div');
  actions.className = 'modal-actions';
  const btn = document.createElement('button');
  btn.className = 'button';
  btn.classList.add('primary');
  btn.type = 'button';
  btn.textContent = confirmText || '確定';
  btn.autofocus = true;
  btn.addEventListener('click', () => {
    blockingModalOpen = false;
    document.body.removeChild(overlay);
    if (typeof onConfirm === 'function') onConfirm();
  });
  actions.appendChild(btn);
  modal.appendChild(actions);
  overlay.appendChild(modal);
  document.body.appendChild(overlay);
  blockingModalOpen = true;
}

function showBlockModal(titleText, bodyItems, onClose) {
  if (document.querySelector('.modal-backdrop.active-block')) return;
  const overlay = document.createElement('div');
  overlay.className = 'modal-backdrop active-block';
  const modal = document.createElement('div');
  modal.className = 'modal';
  if (currentLevel === 3) modal.classList.add('hc3');
  const title = document.createElement('h2');
  title.className = 'modal-title';
  title.textContent = titleText || '提示';
  const close = document.createElement('button');
  close.className = 'modal-close';
  close.type = 'button';
  close.textContent = '×';
  const doClose = () => {
    blockingModalOpen = false;
    document.body.removeChild(overlay);
    if (typeof onClose === 'function') onClose();
  };
  close.addEventListener('click', doClose);
  modal.appendChild(close);
  modal.appendChild(title);
  if (Array.isArray(bodyItems)) {
    bodyItems.forEach(item => {
      if (item && item.image) {
        const img = document.createElement('img');
        img.className = 'illustration';
        img.src = item.image;
        img.onerror = () => { try { img.src = 'home.png'; } catch {} };
        img.alt = item.alt || '';
        try { unlockIllustration(item.image); } catch {}
        modal.appendChild(img);
        if (item.text) {
          const p = document.createElement('p');
          p.className = item.className || 'dialog-text';
          p.textContent = item.text;
          modal.appendChild(p);
        }
      } else {
        const p = document.createElement('p');
        p.className = item.className || 'dialog-text';
        p.textContent = item.text || '';
        modal.appendChild(p);
      }
    });
  }
  const actions = document.createElement('div');
  actions.className = 'modal-actions';
  if (typeof onClose === 'function') {
    const btn = document.createElement('button');
    btn.className = 'button';
    btn.classList.add('primary');
    btn.type = 'button';
    btn.textContent = '繼續';
    btn.autofocus = true;
    btn.addEventListener('click', doClose);
    actions.appendChild(btn);
    modal.appendChild(actions);
  }
  overlay.appendChild(modal);
  document.body.appendChild(overlay);
  blockingModalOpen = true;
}

function requirePassword(onSuccess) {
  if (document.querySelector('.modal-backdrop.active-block')) return;
  const overlay = document.createElement('div');
  overlay.className = 'modal-backdrop active-block';
  const modal = document.createElement('div');
  modal.className = 'modal';
  const title = document.createElement('h2');
  title.className = 'modal-title';
  title.textContent = '輸入密碼';
  const close = document.createElement('button');
  close.className = 'modal-close';
  close.type = 'button';
  close.textContent = '×';
  close.addEventListener('click', () => { blockingModalOpen = false; document.body.removeChild(overlay); });
  const promptText = document.createElement('p');
  promptText.className = 'dialog-text';
  promptText.textContent = '請輸入開發者密碼';
  const inputBox = document.createElement('input');
  inputBox.type = 'password';
  inputBox.className = 'input';
  inputBox.placeholder = '密碼';
  const err = document.createElement('p');
  err.className = 'dialog-text';
  err.style.color = '#e57373';
  err.textContent = '';
  const actions = document.createElement('div');
  actions.className = 'modal-actions';
  const ok = document.createElement('button');
  ok.className = 'button';
  ok.type = 'button';
  ok.textContent = '確認';
  const cancel = document.createElement('button');
  cancel.className = 'button';
  cancel.type = 'button';
  cancel.textContent = '取消';
  cancel.addEventListener('click', () => { blockingModalOpen = false; document.body.removeChild(overlay); });
  ok.addEventListener('click', () => {
    const v = inputBox.value.trim();
    if (v !== DEV_PASSWORD) { err.textContent = '密碼錯誤'; return; }
    blockingModalOpen = false;
    document.body.removeChild(overlay);
    if (typeof onSuccess === 'function') onSuccess();
  });
  modal.appendChild(close);
  modal.appendChild(title);
  modal.appendChild(promptText);
  modal.appendChild(inputBox);
  modal.appendChild(err);
  actions.appendChild(ok);
  actions.appendChild(cancel);
  modal.appendChild(actions);
  overlay.appendChild(modal);
  document.body.appendChild(overlay);
  blockingModalOpen = true;
  inputBox.focus();
}

function startLetterMazeLevel() {
  applyLevelStyle('Number');
  currentLetterGoal = 1;
  const main = document.querySelector('main.container');
  let level = document.getElementById('levelLetterMaze');
  if (!level) {
    level = document.createElement('section');
    level.className = 'dialog-container';
    level.id = 'levelLetterMaze';
    main.appendChild(level);
  } else {
    level.innerHTML = '';
    level.style.display = '';
  }
  const title = document.createElement('h2');
  title.className = 'modal-title';
  title.textContent = '第三關：三次上書';
  const msg = document.createElement('p');
  msg.className = 'dialog-text';
  msg.textContent = '';
  const grid = document.createElement('div');
  grid.className = 'maze-grid';
  const goals = [
    { id: 'g1', name: '上宰相書', feedback: '你投出第一封信，心懷希望，等待回應。' },
    { id: 'g2', name: '後十九日復上宰相書', feedback: '無人回應。你再次投書，強忍憤慨，期望能感動宰相。' },
    { id: 'g3', name: '後廿九日覆上宰相書', feedback: '仍是沉寂。你投出第三封信，已經筋疲力盡，只剩絕望。' },
  ];
  const finalGoal = { id: 'final', name: '終點：宰相公府', feedback: '通關！畫面：宰相公府大門緊閉，無人應答，門前空無一人。' };

  function buildRandomMazeMap(rows = 5, cols = 5, minLen = 14) {
    const within = (r, c) => r >= 0 && c >= 0 && r < rows && c < cols;
    const neighbors = (r, c) => [[r-1,c],[r+1,c],[r,c-1],[r,c+1]].filter(([nr,nc]) => within(nr,nc));
    const map = Array.from({ length: rows }, () => Array.from({ length: cols }, () => 'wall'));
    let sr = Math.floor(Math.random() * rows), sc = Math.floor(Math.random() * cols);
    const stack = [[sr, sc]];
    const visited = new Set([`${sr},${sc}`]);
    const path = [[sr, sc]];
    while (stack.length) {
      const [r, c] = stack[stack.length - 1];
      const choices = neighbors(r, c).filter(([nr, nc]) => !visited.has(`${nr},${nc}`));
      if (choices.length === 0) { stack.pop(); continue; }
      const [nr, nc] = choices[Math.floor(Math.random() * choices.length)];
      visited.add(`${nr},${nc}`);
      stack.push([nr, nc]);
      path.push([nr, nc]);
      if (path.length >= rows * cols) break;
    }
    if (path.length < minLen) return buildRandomMazeMap(rows, cols, minLen);
    const usable = path;
    usable.forEach(([r, c]) => { map[r][c] = 'path'; });
    const quarter = Math.floor(usable.length / 4);
    const p1 = usable[Math.min(quarter, usable.length - 4)];
    const p2 = usable[Math.min(quarter * 2, usable.length - 3)];
    const p3 = usable[Math.min(quarter * 3, usable.length - 2)];
    const pf = usable[usable.length - 1];
    map[p1[0]][p1[1]] = 'g1';
    map[p2[0]][p2[1]] = 'g2';
    map[p3[0]][p3[1]] = 'g3';
    map[pf[0]][pf[1]] = 'final';
    map[sr][sc] = 'start';
    return map;
  }

  const mazeMap = buildRandomMazeMap();

  const toIndex = (r, c) => r * 5 + c;
  const isAdjacent = (a, b) => {
    const ar = Math.floor(a / 5), ac = a % 5;
    const br = Math.floor(b / 5), bc = b % 5;
    return Math.abs(ar - br) + Math.abs(ac - bc) === 1;
  };

  const state = { achieved: { g1: false, g2: false, g3: false }, finalEnabled: false };
  let playerPos = -1;

  for (let r = 0; r < 5; r++) {
    for (let c = 0; c < 5; c++) {
      const i = toIndex(r, c);
      const t = mazeMap[r][c];
      const cell = document.createElement('div');
      cell.className = 'maze-cell';
      cell.dataset.index = String(i);
      cell.dataset.type = t;
      if (t === 'wall') {
        cell.classList.add('wall');
        cell.textContent = '';
      } else if (t === 'path') {
        cell.classList.add('path');
        cell.textContent = '...';
      } else if (t === 'start') {
        cell.classList.add('path');
        cell.textContent = '🚶';
        cell.classList.add('player');
        playerPos = i;
      } else if (t === 'final') {
        cell.classList.add('final');
        cell.textContent = '公府';
        cell.title = finalGoal.name;
      } else if (t === 'g1' || t === 'g2' || t === 'g3') {
        cell.classList.add('letter');
        cell.textContent = '函';
        const gi = t === 'g1' ? 0 : (t === 'g2' ? 1 : 2);
        const goalName = goals[gi].name;
        cell.title = goalName;
        cell.dataset.goalName = goalName;
      }
      cell.addEventListener('mouseenter', () => {
        if (t === 'g1' || t === 'g2' || t === 'g3') {
          cell.title = cell.dataset.goalName || cell.title;
        }
      });
      cell.addEventListener('touchstart', () => {
        if (t === 'g1' || t === 'g2' || t === 'g3') {
          msg.className = 'dialog-text';
          msg.textContent = cell.dataset.goalName || '';
          setTimeout(() => { msg.textContent = ''; }, 1500);
        }
      }, { passive: true });
      cell.addEventListener('click', () => {
        if (isGameOver || blockingModalOpen) return;
        const type = cell.dataset.type;
        const idx = Number(cell.dataset.index);
        if (!isAdjacent(playerPos, idx)) {
          handleError('Number');
          showBlockModal('提示', [{ text: '道路阻滯，你再次感到心神受創。' }]);
          return;
        }
        if (type === 'wall') {
          showBlockModal('提示', [{ text: '道路阻滯，牆不可通行。' }]);
          return;
        }
        const prev = grid.querySelector(`[data-index="${playerPos}"]`);
        if (type === 'path') {
          if (prev) {
            prev.classList.remove('player');
            if (prev.dataset.type === 'start' || prev.dataset.type === 'path') prev.textContent = '...';
            if (prev.dataset.type === 'g1' || prev.dataset.type === 'g2' || prev.dataset.type === 'g3') {
              prev.textContent = state.achieved[prev.dataset.type] ? '✅' : '函';
            }
            if (prev.dataset.type === 'final') prev.textContent = '公府';
          }
          cell.textContent = '🚶';
          cell.classList.add('player');
          playerPos = idx;
          return;
        }
        if (type === 'g1' || type === 'g2' || type === 'g3') {
          const expect = 'g' + String(currentLetterGoal);
          if (type !== expect) {
            handleError('Number');
            showBlockModal('提示', [{ text: '道路阻滯，你再次感到心神受創。' }]);
            // 回到原位顯示玩家
            const origin = grid.querySelector(`[data-index="${playerPos}"]`);
            if (origin) { origin.classList.add('player'); origin.textContent = '🚶'; }
            return;
          }
          const gi = Number(currentLetterGoal) - 1;
          showBlockModal('提示', [{ text: goals[gi].feedback }]);
          state.achieved[type] = true;
          if (prev) {
            prev.classList.remove('player');
            if (prev.dataset.type === 'start' || prev.dataset.type === 'path') prev.textContent = '...';
            if (prev.dataset.type === 'g1' || prev.dataset.type === 'g2' || prev.dataset.type === 'g3') {
              prev.textContent = state.achieved[prev.dataset.type] ? '✅' : '函';
            }
            if (prev.dataset.type === 'final') prev.textContent = '公府';
          }
          cell.classList.add('done');
          cell.textContent = '🚶';
          cell.style.pointerEvents = 'none';
          playerPos = idx;
          currentLetterGoal += 1;
          if (currentLetterGoal === 4) { state.finalEnabled = true; }
          return;
        }
        if (type === 'final') {
          if (!state.finalEnabled) {
            showBlockModal('提示', [{ text: '還不能進入公府。先完成三次上書。' }]);
            // 回到原位顯示玩家
            const origin = grid.querySelector(`[data-index="${playerPos}"]`);
            if (origin) { origin.classList.add('player'); origin.textContent = '🚶'; }
            return;
          }
          if (prev) {
            prev.classList.remove('player');
            if (prev.dataset.type === 'start' || prev.dataset.type === 'path') prev.textContent = '...';
            if (prev.dataset.type === 'g1' || prev.dataset.type === 'g2' || prev.dataset.type === 'g3') {
              prev.textContent = state.achieved[prev.dataset.type] ? '✅' : '函';
            }
            if (prev.dataset.type === 'final') prev.textContent = '公府';
          }
          cell.textContent = '🚶';
          playerPos = idx;
          showBlockModal('通關', [{ image: 'Mansion.png', alt: '宰相公府大門', text: finalGoal.feedback }], () => { applyLevelClear(level, 15); });
          return;
        }
      });
      grid.appendChild(cell);
    }
  }

  const help = document.createElement('p');
  help.className = 'dialog-text';
  help.textContent = '遊戲說明：點擊相鄰白色路徑移動；依序完成三封「函」，再前往「公府」。點擊非相鄰格會受傷；點擊牆僅無效。移到「函」上會顯示全稱。';
  level.appendChild(title);
  level.appendChild(help);
  level.appendChild(grid);
  level.appendChild(msg);
}

function endGameFail() {
  systemCleanup(true);
  clearMainContent(false);
  const main = document.querySelector('main.container');
  const over = document.createElement('section');
  over.className = 'dialog-container';
  const text = document.createElement('p');
  text.className = 'dialog-text';
  text.textContent = '讀書不用心，上天都傷心，文曲星不佑，祖宗蒙羞。你終究未能完成兄嫂的囑託，遺憾地結束了這段困頓的求仕之旅...';
  const restart = document.createElement('button');
  restart.className = 'button';
  restart.type = 'button';
  restart.textContent = '重新開始';
  restart.addEventListener('click', () => {
    matchScore = 0;
    errorCount = 0;
    currentRoute = null;
    document.documentElement.style.setProperty('--bg', '#1a1a1a');
    location.reload();
  });
  over.appendChild(text);
  over.appendChild(restart);
  main.appendChild(over);
}

function start() {
  const playerName = devModeEnabled ? '開發者' : input.value.trim();
  if (!playerName) { input.focus(); return; }
  localStorage.setItem('hanliu_player_name', playerName);
  openPreEquipModal(() => {
    const startScreen = document.getElementById('startScreen');
    startScreen.style.display = 'none';
    hideCoins();
    isGameOver = false;
    systemCleanup(false);
    try {
      Array.from(document.querySelectorAll('.modal-backdrop.active-block')).forEach(el => { try { document.body.removeChild(el); } catch { el.remove(); } });
      Array.from(document.querySelectorAll('.flash-overlay')).forEach(el => { try { document.body.removeChild(el); } catch { el.remove(); } });
      const baseBackdrop = document.getElementById('modalBackdrop');
      if (baseBackdrop) baseBackdrop.hidden = true;
      blockingModalOpen = false;
    } catch {}
    matchScore = 0;
    orderFailed = false;
    lastRunId = null;
    customNumberFailText = null;
    currentLevel = 1;
    currentLevelIndex = -1;
    cloudSyncDisabled = false;
    document.documentElement.style.removeProperty('--bg-image');
    document.documentElement.style.removeProperty('--bg-overlay');
    document.documentElement.style.removeProperty('--bg-overlay');
    const sbtn = document.getElementById('settingsBtn'); if (sbtn) sbtn.hidden = false;
    const fb = document.getElementById('feedback-btn'); if (fb) fb.hidden = true;
    const hv = document.getElementById('homeVolume'); if (hv) hv.hidden = true;
    const hsv = document.getElementById('homeSfxVolume'); if (hsv) hsv.hidden = true;
    const hvb = document.getElementById('homeVolumeToggle'); if (hvb) hvb.hidden = true;
    hpMax = (selectedCardId === 'card_memorial' ? 1 : 2);
    springHintUsedInRun = false;
    dreamGambleAutoActivate = false;
    resetHpBar();
    createDialogContainer(playerName);
  });
}

function todayString() {
  const d = new Date();
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');
  return `${y}-${m}-${day}`;
}
function getLoginDays() { try { const raw = localStorage.getItem(storageKey('login_days')) || '[]'; const arr = JSON.parse(raw); return Array.isArray(arr) ? arr : []; } catch { return []; } }
function saveLoginDays(arr) { try { localStorage.setItem(storageKey('login_days'), JSON.stringify(Array.isArray(arr) ? arr : [])); } catch {} scheduleProfileSync(); }
function countMonthlyLogins(arr, ym) { return (Array.isArray(arr) ? arr : []).filter(d => String(d || '').startsWith(ym + '-')).length; }
function getYesterdayString() { const d = new Date(); d.setDate(d.getDate() - 1); const y = d.getFullYear(); const m = String(d.getMonth() + 1).padStart(2, '0'); const day = String(d.getDate()).padStart(2, '0'); return `${y}-${m}-${day}`; }
function computeConsecutiveStreak(days) { const set = new Set(Array.isArray(days) ? days : []); let streak = 0; let d = new Date(); while (true) { const y = d.getFullYear(); const m = String(d.getMonth() + 1).padStart(2, '0'); const day = String(d.getDate()).padStart(2, '0'); const key = `${y}-${m}-${day}`; if (set.has(key)) { streak += 1; d.setDate(d.getDate() - 1); } else { break; } } return streak; }
function openSignInModal(message, ym, days) {
  const overlay = document.createElement('div');
  overlay.className = 'modal-backdrop active-block';
  const modal = document.createElement('div');
  modal.className = 'modal';
  const close = document.createElement('button');
  close.className = 'modal-close';
  close.type = 'button';
  close.textContent = '×';
  close.addEventListener('click', () => { try { document.body.removeChild(overlay); } catch {} });
  const title = document.createElement('h2');
  title.className = 'modal-title';
  title.textContent = '簽到成功';
  const info = document.createElement('p');
  info.className = 'dialog-text';
  info.textContent = message || '';
  const grid = document.createElement('div');
  grid.style.display = 'grid';
  grid.style.gridTemplateColumns = 'repeat(7, 1fr)';
  grid.style.gap = '6px';
  grid.style.marginTop = '0.5rem';
  const week = ['日','一','二','三','四','五','六'];
  week.forEach((w) => { const h = document.createElement('div'); h.className = 'dialog-text'; h.style.textAlign = 'center'; h.style.fontWeight = '900'; h.textContent = w; grid.appendChild(h); });
  const parts = String(ym).split('-'); const yy = parseInt(parts[0], 10); const mm = parseInt(parts[1], 10) - 1;
  const first = new Date(yy, mm, 1); const startWd = first.getDay(); const last = new Date(yy, mm + 1, 0); const dayCount = last.getDate();
  for (let i = 0; i < startWd; i++) { const s = document.createElement('div'); grid.appendChild(s); }
  const storedDays = getLoginDays();
  const unionDays = Array.from(new Set([...(Array.isArray(days) ? days : []), ...(Array.isArray(storedDays) ? storedDays : [])]));
  const set = new Set(unionDays);
  const today = todayString();
  for (let d = 1; d <= dayCount; d++) {
    const cell = document.createElement('div');
    cell.style.border = '1px solid #2a2a2a';
    cell.style.borderRadius = '8px';
    cell.style.padding = '6px';
    cell.style.display = 'flex';
    cell.style.alignItems = 'center';
    cell.style.justifyContent = 'center';
    cell.style.position = 'relative';
    const label = document.createElement('span'); label.className = 'dialog-text'; label.textContent = String(d);
    const key = `${ym}-${String(d).padStart(2, '0')}`;
    if (set.has(key)) { cell.style.background = 'linear-gradient(180deg, #263238, #0f1a24)'; label.style.color = '#cfe9f3'; }
    if (set.has(key)) {
      const mark = document.createElement('span');
      mark.className = 'dialog-text';
      mark.textContent = '✓';
      mark.style.position = 'absolute';
      mark.style.top = '4px';
      mark.style.right = '6px';
      mark.style.color = key === today ? '#9be7ff' : '#6ea3b5';
      mark.style.fontWeight = '900';
      cell.appendChild(mark);
    }
    cell.appendChild(label);
    grid.appendChild(cell);
  }
  modal.appendChild(close);
  modal.appendChild(title);
  modal.appendChild(info);
  modal.appendChild(grid);
  overlay.appendChild(modal);
  document.body.appendChild(overlay);
}
function openSignInCalendar() {
  try {
    const today = todayString();
    const ym = today.slice(0, 7);
    const storedDays = getLoginDays();
    const overlay = document.createElement('div');
    overlay.className = 'modal-backdrop active-block';
    const modal = document.createElement('div');
    modal.className = 'modal';
    const close = document.createElement('button');
    close.className = 'modal-close';
    close.type = 'button';
    close.textContent = '×';
    close.addEventListener('click', () => { try { document.body.removeChild(overlay); } catch {} });
    const title = document.createElement('h2');
    title.className = 'modal-title';
    title.textContent = '簽到月曆';
    const info = document.createElement('p');
    info.className = 'dialog-text';
    const streak = computeConsecutiveStreak(storedDays);
    const mcount = countMonthlyLogins(storedDays, ym);
    const total = (Array.isArray(storedDays) ? storedDays.length : 0);
    info.textContent = `連續 ${streak} 天｜本月 ${mcount} 天｜累計 ${total} 天`;
    const grid = document.createElement('div');
    grid.style.display = 'grid';
    grid.style.gridTemplateColumns = 'repeat(7, 1fr)';
    grid.style.gap = '6px';
    grid.style.marginTop = '0.5rem';
    const week = ['日','一','二','三','四','五','六'];
    week.forEach((w) => { const h = document.createElement('div'); h.className = 'dialog-text'; h.style.textAlign = 'center'; h.style.fontWeight = '900'; h.textContent = w; grid.appendChild(h); });
    const parts = ym.split('-'); const yy = parseInt(parts[0], 10); const mm = parseInt(parts[1], 10) - 1;
    const first = new Date(yy, mm, 1); const startWd = first.getDay(); const last = new Date(yy, mm + 1, 0); const dayCount = last.getDate();
    for (let i = 0; i < startWd; i++) { const s = document.createElement('div'); grid.appendChild(s); }
    const set = new Set(Array.isArray(storedDays) ? storedDays : []);
    for (let d = 1; d <= dayCount; d++) {
      const cell = document.createElement('div');
      cell.style.border = '1px solid #2a2a2a';
      cell.style.borderRadius = '8px';
      cell.style.padding = '6px';
      cell.style.display = 'flex';
      cell.style.alignItems = 'center';
      cell.style.justifyContent = 'center';
      cell.style.position = 'relative';
      const label = document.createElement('span'); label.className = 'dialog-text'; label.textContent = String(d);
      const key = `${ym}-${String(d).padStart(2, '0')}`;
      if (set.has(key)) { cell.style.background = 'linear-gradient(180deg, #263238, #0f1a24)'; label.style.color = '#cfe9f3'; }
      if (set.has(key)) {
        const mark = document.createElement('span');
        mark.className = 'dialog-text';
        mark.textContent = '✓';
        mark.style.position = 'absolute';
        mark.style.top = '4px';
        mark.style.right = '6px';
        mark.style.color = key === today ? '#9be7ff' : '#6ea3b5';
        mark.style.fontWeight = '900';
        cell.appendChild(mark);
      }
      cell.appendChild(label);
      grid.appendChild(cell);
    }
    modal.appendChild(close);
    modal.appendChild(title);
    modal.appendChild(info);
    modal.appendChild(grid);
    overlay.appendChild(modal);
    document.body.appendChild(overlay);
  } catch {}
}
function performAutoDailyCheckIn() {
  try {
    const today = todayString();
    const last = localStorage.getItem(storageKey('lastCheckInDate')) || '';
    if (last === today) return;
    localStorage.setItem(storageKey('lastCheckInDate'), today);
    const days = getLoginDays();
    if (!days.includes(today)) { days.push(today); saveLoginDays(days); }
    addCoins(1);
    const ym = today.slice(0, 7);
    const mcount = countMonthlyLogins(days, ym);
    const total = days.length;
    const streak = computeConsecutiveStreak(days);
    let text = `簽到成功：+1 貨幣｜連續 ${streak} 天｜本月 ${mcount} 天｜累計 ${total} 天`;
    if (streak > 0 && streak % 5 === 0) { addCoins(5); text += '｜連續 5 天獎勵 +5'; }
    openSignInModal(text, ym, days);
  } catch {}
}
function handleDrawCard() {
  try {
    const cost = devModeEnabled ? 0 : 10;
    if (userCoins >= cost) {
      if (cost > 0) {
        userCoins -= cost;
        saveCoins();
        updateCoinsDisplay();
      }
      const invBefore = loadInventory();
      if (!devModeEnabled && invBefore.length >= 5) {
        showBlockModal('提示', [{ text: '背包已滿（最多 5 張）' }]);
        return;
      }
      const card = drawCard();
      const id = card.id;
      const inv = invBefore.slice();
      inv.push(id);
      saveInventory(inv);
      renderSelectCardArea();
      const overlay = document.createElement('div');
      overlay.className = 'modal-backdrop draw-overlay';
      const cover = document.createElement('div');
      cover.className = 'draw-cover';
      const rare = getCardRarity(id);
      const variant = rare === 'SSR' ? 'ssr-glow' : rare === 'SR' ? 'sr-glow' : rare === 'R' ? 'r-glow' : 'n-glow';
      cover.classList.add(variant);
      const ttl = document.createElement('div');
      ttl.className = 'title';
      ttl.textContent = '筆墨卷展';
      cover.appendChild(ttl);
      overlay.appendChild(cover);
      document.body.appendChild(overlay);
      if (rare === 'SSR') {
        const dust = document.createElement('div');
        dust.className = 'gold-dust';
        for (let i = 0; i < 60; i++) {
          const p = document.createElement('i');
          p.className = 'dust';
          const left = Math.random() * 100;
          const dx = (Math.random() * 40 - 20) + 'px';
          const t = (2.2 + Math.random() * 1.6) + 's';
          p.style.left = left + 'vw';
          p.style.setProperty('--dx', dx);
          p.style.setProperty('--t', t);
          dust.appendChild(p);
        }
        document.body.appendChild(dust);
        setTimeout(() => { try { document.body.removeChild(dust); } catch {} }, 1800);
      }
      const suffix = devModeEnabled ? '（開發者模式：免扣費）' : '';
      setTimeout(() => {
        try { document.body.removeChild(overlay); } catch {}
        const desc = (CARD_DATA.find(x => x.id === id)?.desc) || '';
        const reveal = document.createElement('div');
        reveal.className = 'modal-backdrop active-block';
        const modal = document.createElement('div');
        modal.className = 'modal';
        const close = document.createElement('button');
        close.className = 'modal-close';
        close.type = 'button';
        close.textContent = '×';
        close.addEventListener('click', () => { try { document.body.removeChild(reveal); } catch {} });
        const title = document.createElement('h2');
        title.className = 'modal-title';
        title.textContent = '獲得卡片';
        const card = document.createElement('div');
        card.className = 'card3d';
        const faceFront = document.createElement('div');
        faceFront.className = `face front rar-${rare}`;
        const tip = document.createElement('p');
        tip.className = 'dialog-text';
        tip.textContent = '長按看詳情';
        faceFront.appendChild(tip);
        const faceBack = document.createElement('div');
        faceBack.className = `face back rar-${rare}`;
        const imgSrc = getCardImage(id);
        if (imgSrc) {
          const img = document.createElement('img');
          img.src = imgSrc;
          img.alt = getCardName(id);
          img.className = 'card-img';
          img.onerror = () => { try { faceBack.removeChild(img); } catch {} };
          faceBack.appendChild(img);
        }
        /* show only image on back; details via long press */
        card.appendChild(faceFront);
        card.appendChild(faceBack);
        card.addEventListener('click', () => { card.classList.toggle('flip'); });
        modal.appendChild(close);
        modal.appendChild(title);
        modal.appendChild(card);
        reveal.appendChild(modal);
        document.body.appendChild(reveal);
        if (rare === 'N' || rare === 'R') { setTimeout(() => { card.classList.add('flip'); }, 200); }
      }, 1500);
    } else {
      showBlockModal('提示', [{ text: '貨幣不足' }], () => {});
    }
  } catch {
    showBlockModal('提示', [{ text: '發生錯誤，稍後再試' }], () => {});
  }
}
function handleDraw5Cards() {
  try {
    const cost = devModeEnabled ? 0 : 50;
    if (userCoins < cost) { showBlockModal('提示', [{ text: '貨幣不足｜五連抽需 50' }]); return; }
    const invBefore = loadInventory();
    if (!devModeEnabled && invBefore.length + 5 > 5) {
      const free = Math.max(0, 5 - invBefore.length);
      showBlockModal('提示', [{ text: `背包空位不足：目前空位 ${free}，五連抽需 5。請刪除卡片後再試。` }]);
      return;
    }
    if (cost > 0) { userCoins -= cost; saveCoins(); updateCoinsDisplay(); }
    const picks = [];
    for (let i = 0; i < 5; i++) { const c = drawCard(); picks.push(c); }
    const inv = invBefore.slice();
    picks.forEach((c) => inv.push(c.id));
    saveInventory(inv);
    renderSelectCardArea();
    const overlay = document.createElement('div');
    overlay.className = 'modal-backdrop draw-overlay';
    const cover = document.createElement('div');
    cover.className = 'draw-cover';
    const getTierRank = (r) => r === 'SSR' ? 3 : r === 'SR' ? 2 : r === 'R' ? 1 : 0;
    const top = picks.reduce((a, b) => (getTierRank(a.rarity) >= getTierRank(b.rarity) ? a : b), picks[0]);
    const variant = top.rarity === 'SSR' ? 'ssr-glow' : top.rarity === 'SR' ? 'sr-glow' : top.rarity === 'R' ? 'r-glow' : 'n-glow';
    cover.classList.add(variant);
    const ttl = document.createElement('div'); ttl.className = 'title'; ttl.textContent = '筆墨卷展 ×5';
    cover.appendChild(ttl);
    overlay.appendChild(cover);
    document.body.appendChild(overlay);
    if (top.rarity === 'SSR') {
      const dust = document.createElement('div');
      dust.className = 'gold-dust';
      for (let i = 0; i < 80; i++) { const p = document.createElement('i'); p.className = 'dust'; p.style.left = (Math.random() * 100) + 'vw'; p.style.setProperty('--dx', (Math.random() * 40 - 20) + 'px'); p.style.setProperty('--t', (2.0 + Math.random() * 1.8) + 's'); dust.appendChild(p); }
      document.body.appendChild(dust);
      setTimeout(() => { try { document.body.removeChild(dust); } catch {} }, 1800);
    }
    setTimeout(() => {
      try { document.body.removeChild(overlay); } catch {}
      const reveal = document.createElement('div');
      reveal.className = 'modal-backdrop active-block';
      const modal = document.createElement('div'); modal.className = 'modal';
      const close = document.createElement('button'); close.className = 'modal-close'; close.type = 'button'; close.textContent = '×'; close.addEventListener('click', () => { try { document.body.removeChild(reveal); } catch {} });
      const title = document.createElement('h2'); title.className = 'modal-title'; title.textContent = '五連抽結果';
      const list = document.createElement('div'); list.className = 'dialog-container';
      picks.forEach((c) => { const p = document.createElement('p'); p.className = 'dialog-text'; p.textContent = `【${c.rarity}】${getCardName(c.id)}`; list.appendChild(p); });
      const actions = document.createElement('div'); actions.className = 'actions';
      const okBtn = document.createElement('button'); okBtn.className = 'button'; okBtn.type = 'button'; okBtn.textContent = '關閉'; okBtn.addEventListener('click', () => { try { document.body.removeChild(reveal); } catch {} });
      actions.appendChild(okBtn);
      modal.appendChild(close);
      modal.appendChild(title);
      modal.appendChild(list);
      modal.appendChild(actions);
      reveal.appendChild(modal);
      document.body.appendChild(reveal);
    }, 1500);
  } catch {
    showBlockModal('提示', [{ text: '發生錯誤，稍後再試' }]);
  }
}
function openDrawPrompt() {
  const overlay = document.createElement('div');
  overlay.className = 'modal-backdrop active-block';
  const modal = document.createElement('div');
  modal.className = 'modal';
  const close = document.createElement('button'); close.className = 'modal-close'; close.type = 'button'; close.textContent = '×'; close.addEventListener('click', () => { try { document.body.removeChild(overlay); } catch {} });
  const title = document.createElement('h2'); title.className = 'modal-title'; title.textContent = '抽卡';
  const info = document.createElement('p'); info.className = 'dialog-text'; info.textContent = devModeEnabled ? '開發者模式：抽卡免扣費' : '單抽 10｜五連抽 50';
  const rate = document.createElement('p'); rate.className = 'dialog-text'; rate.textContent = `機率：SSR ${DRAW_RATE.SSR}%｜SR ${DRAW_RATE.SR}%｜R ${DRAW_RATE.R}%｜N ${DRAW_RATE.N}%`;
  const actions = document.createElement('div'); actions.className = 'actions';
  const singleBtn = document.createElement('button'); singleBtn.className = 'button'; singleBtn.type = 'button'; singleBtn.textContent = '單抽'; singleBtn.addEventListener('click', () => { try { document.body.removeChild(overlay); } catch {} performDraw(1); });
  const fiveBtn = document.createElement('button'); fiveBtn.className = 'button'; fiveBtn.type = 'button'; fiveBtn.textContent = '五連抽'; fiveBtn.addEventListener('click', () => { try { document.body.removeChild(overlay); } catch {} performDraw(5); });
  const cancelBtn = document.createElement('button'); cancelBtn.className = 'button'; cancelBtn.type = 'button'; cancelBtn.textContent = '取消'; cancelBtn.addEventListener('click', () => { try { document.body.removeChild(overlay); } catch {} });
  actions.appendChild(singleBtn); actions.appendChild(fiveBtn); actions.appendChild(cancelBtn);
  modal.appendChild(close); modal.appendChild(title); modal.appendChild(info); modal.appendChild(rate); modal.appendChild(actions);
  overlay.appendChild(modal);
  document.body.appendChild(overlay);
}
function performDraw(count) {
  try {
    const cost = (devModeEnabled || isFirstLoginFreeDraw) ? 0 : 10 * count;
    const invBefore = loadInventory();
    if (!devModeEnabled && invBefore.length + count > 5) {
      const free = Math.max(0, 5 - invBefore.length);
      showBlockModal('提示', [{ text: `背包空位不足：目前空位 ${free}，需要 ${count}` }]);
      return;
    }
    if (userCoins < cost) { showBlockModal('提示', [{ text: `貨幣不足｜需要 ${cost}` }]); return; }
    if (cost > 0) { userCoins -= cost; saveCoins(); updateCoinsDisplay(); }
    const picks = [];
    for (let i = 0; i < count; i++) picks.push(drawCard());
    const inv = invBefore.slice();
    picks.forEach((c) => inv.push(c.id));
    saveInventory(inv);
    renderSelectCardArea();
    try { picks.forEach((c) => { const img = getCardImage(c.id); if (img) unlockIllustration(img); }); } catch {}
    const overlay = document.createElement('div'); overlay.className = 'modal-backdrop draw-overlay';
    const cover = document.createElement('div'); cover.className = 'draw-cover';
    const getTierRank = (r) => r === 'SSR' ? 3 : r === 'SR' ? 2 : r === 'R' ? 1 : 0;
    const top = picks.reduce((a, b) => (getTierRank(a.rarity) >= getTierRank(b.rarity) ? a : b), picks[0]);
    const variant = top.rarity === 'SSR' ? 'ssr-glow' : top.rarity === 'SR' ? 'sr-glow' : top.rarity === 'R' ? 'r-glow' : 'n-glow';
    cover.classList.add(variant);
    const ttl = document.createElement('div'); ttl.className = 'title'; ttl.textContent = count === 5 ? '筆墨卷展 ×5' : '筆墨卷展';
    cover.appendChild(ttl); overlay.appendChild(cover); document.body.appendChild(overlay);
    if (top.rarity === 'SSR') {
      const dust = document.createElement('div'); dust.className = 'gold-dust';
      for (let i = 0; i < (count === 5 ? 80 : 60); i++) { const p = document.createElement('i'); p.className = 'dust'; p.style.left = (Math.random() * 100) + 'vw'; p.style.setProperty('--dx', (Math.random() * 40 - 20) + 'px'); p.style.setProperty('--t', (2.0 + Math.random() * 1.8) + 's'); dust.appendChild(p); }
      document.body.appendChild(dust);
      const snow = document.createElement('div'); snow.className = 'snowflakes';
      for (let i = 0; i < (count === 5 ? 60 : 40); i++) { const p = document.createElement('i'); p.className = 'flake'; p.style.left = (Math.random() * 100) + 'vw'; p.style.setProperty('--dx', (Math.random() * 30 - 15) + 'px'); p.style.setProperty('--t', (2.0 + Math.random() * 1.8) + 's'); snow.appendChild(p); }
      document.body.appendChild(snow);
      setTimeout(() => { try { document.body.removeChild(dust); } catch {} try { document.body.removeChild(snow); } catch {} }, 1800);
    }
    if (top.rarity === 'R') {
      const rain = document.createElement('div'); rain.className = 'drizzle';
      for (let i = 0; i < (count === 5 ? 60 : 40); i++) { const d = document.createElement('i'); d.className = 'drop'; d.style.left = (Math.random() * 100) + 'vw'; d.style.setProperty('--dx', (Math.random() * 20 - 10) + 'px'); d.style.setProperty('--t', (1.2 + Math.random() * 1.0) + 's'); rain.appendChild(d); }
      document.body.appendChild(rain);
      setTimeout(() => { try { document.body.removeChild(rain); } catch {} }, 1800);
    }
    const suffix = devModeEnabled ? '（開發者模式：免扣費）' : (isFirstLoginFreeDraw ? '（首次登入：免費抽）' : '');
    setTimeout(() => {
      try { document.body.removeChild(overlay); } catch {}
      if (picks.length === 1) {
        const c = picks[0]; const id = c.id; const rare = c.rarity; const desc = (CARD_DATA.find(x => x.id === id)?.desc) || '';
        const needMemFx = (id === 'card_memorial');
        if (needMemFx) { try { triggerMemorialEffect(); } catch {} }
        const show = () => {
          const reveal = document.createElement('div'); reveal.className = 'modal-backdrop active-block';
          const modal = document.createElement('div'); modal.className = 'modal';
          const close = document.createElement('button'); close.className = 'modal-close'; close.type = 'button'; close.textContent = '×'; close.addEventListener('click', () => { try { document.body.removeChild(reveal); } catch {} });
          const title = document.createElement('h2'); title.className = 'modal-title'; title.textContent = '獲得卡片';
          const card = document.createElement('div'); card.className = 'card3d';
          const faceFront = document.createElement('div'); faceFront.className = `face front rar-${rare}`; const tip = document.createElement('p'); tip.className = 'dialog-text'; tip.textContent = '長按看詳情'; faceFront.appendChild(tip);
          const faceBack = document.createElement('div'); faceBack.className = `face back rar-${rare}`;
          const imgSrc = getCardImage(id); if (imgSrc) { const img = document.createElement('img'); img.src = imgSrc; img.alt = getCardName(id); img.className = 'card-img'; img.onerror = () => { try { faceBack.removeChild(img); } catch {} }; faceBack.appendChild(img); }
          /* only image on back; details via long press */
          card.appendChild(faceFront); card.appendChild(faceBack);
          attachDrawCardInteractions(card, rare, id, null, true);
          modal.appendChild(close); modal.appendChild(title); modal.appendChild(card);
          reveal.appendChild(modal); document.body.appendChild(reveal);
          if (rare === 'N' || rare === 'R') { setTimeout(() => { card.classList.add('flip'); }, 200); }
        };
        if (needMemFx) { setTimeout(show, 1000); } else { show(); }
      } else {
        const reveal = document.createElement('div'); reveal.className = 'modal-backdrop active-block';
        const modal = document.createElement('div'); modal.className = 'modal';
        const close = document.createElement('button'); close.className = 'modal-close'; close.type = 'button'; close.textContent = '×'; close.addEventListener('click', () => { try { document.body.removeChild(reveal); } catch {} });
        const title = document.createElement('h2'); title.className = 'modal-title'; title.textContent = '五連抽結果';
        const grid = document.createElement('div'); grid.className = 'draw-grid';
        picks.forEach((c) => {
          const container = document.createElement('div');
          container.className = 'card3d';
          const faceFront = document.createElement('div'); faceFront.className = `face front rar-${c.rarity}`;
          const tip = document.createElement('p'); tip.className = 'dialog-text'; tip.textContent = '長按看詳情'; faceFront.appendChild(tip);
          const faceBack = document.createElement('div'); faceBack.className = `face back rar-${c.rarity}`;
          const imgSrc = getCardImage(c.id);
          if (imgSrc) {
            const img = document.createElement('img'); img.src = imgSrc; img.alt = getCardName(c.id); img.className = 'card-img';
            img.onerror = () => { try { faceBack.removeChild(img); } catch {} };
            faceBack.appendChild(img);
          }
          /* only image in grid; details via long press */
          container.appendChild(faceFront); container.appendChild(faceBack);
          attachDrawCardInteractions(container, c.rarity, c.id, null, true);
          grid.appendChild(container);
        });
        modal.appendChild(close); modal.appendChild(title); modal.appendChild(grid);
        reveal.appendChild(modal); document.body.appendChild(reveal);
      }
    }, 1500);
  } catch {
    showBlockModal('提示', [{ text: '發生錯誤，稍後再試' }]);
  }
}
if (drawCardBtn) drawCardBtn.addEventListener('click', openDrawPrompt);

btn.addEventListener('click', start);
input.addEventListener('keydown', (e) => { if (e.key === 'Enter') saveName(); });
leaderboardBtn.addEventListener('click', () => { displayLeaderboard('All'); rankHan.focus(); });
modalClose.addEventListener('click', () => { backdrop.hidden = true; });
backdrop.addEventListener('click', (e) => { if (e.target === backdrop) backdrop.hidden = true; });
document.addEventListener('keydown', (e) => { if (e.key === 'Escape' && !backdrop.hidden) backdrop.hidden = true; });
rankHan.addEventListener('click', () => { displayLeaderboard('HanYu'); });
rankLiu.addEventListener('click', () => { displayLeaderboard('LiuZongyuan'); });
rankAll.addEventListener('click', () => { displayLeaderboard('All'); });
const galleryRankBtnHome = document.getElementById('galleryRankBtnHome');
if (galleryRankBtnHome) galleryRankBtnHome.addEventListener('click', () => { try { displayUnlocksLeaderboardInModal(); } catch { renderUnlocksLeaderboardPage(); } });
document.getElementById('rankClear').addEventListener('click', clearLeaderboard);
const rankClearAllBtn = document.getElementById('rankClearAll');
if (rankClearAllBtn) rankClearAllBtn.addEventListener('click', clearLeaderboardAll);
const cloudBtn = document.getElementById('cloudConfigBtn');
if (cloudBtn) cloudBtn.addEventListener('click', openCloudConfig);
const rankExportBtn = document.getElementById('rankExport');
const rankImportBtn = document.getElementById('rankImport');
const rankFileInput = document.getElementById('rankFile');
if (rankExportBtn) rankExportBtn.addEventListener('click', exportLeaderboard);
const noticeBtn = document.getElementById('noticeBtn');
if (noticeBtn) noticeBtn.addEventListener('click', openNotice);
if (rankImportBtn) rankImportBtn.addEventListener('click', () => { if (rankFileInput) rankFileInput.click(); });
if (rankFileInput) rankFileInput.addEventListener('change', importLeaderboard);
if (aboutBtn) aboutBtn.addEventListener('click', openAbout);
const autoTestBtn = document.getElementById('autoTestBtn');
if (autoTestBtn) autoTestBtn.addEventListener('click', openAutoTest);
const aboutParent = aboutBtn ? aboutBtn.parentElement : null;
{
  const host = aboutParent || document.querySelector('#startScreen .actions');
  if (host) {
    const galleryBtn = document.createElement('button');
    galleryBtn.id = 'galleryBtn';
    galleryBtn.className = 'button';
    galleryBtn.type = 'button';
    galleryBtn.textContent = '圖鑑';
    galleryBtn.addEventListener('click', openGallery);
    host.appendChild(galleryBtn);
  }
}
if (debugStartBtn) debugStartBtn.addEventListener('click', () => {
  if (!devModeEnabled) {
    requirePassword(() => {
      devModeEnabled = true;
      const dc = document.getElementById('debugControls');
      if (dc) dc.style.display = '';
      const da = debugLevelInput ? debugLevelInput.parentElement : null;
      if (da) da.style.display = '';
      startDebugLevel();
    });
    return;
  }
  startDebugLevel();
});
document.addEventListener('keydown', (e) => {
  const k = e.key.toLowerCase();
  if (e.ctrlKey && e.shiftKey && k === 'd') {
    requirePassword(() => {
      devModeEnabled = true;
      const dc = document.getElementById('debugControls');
      if (dc) dc.style.display = '';
      const da = debugLevelInput ? debugLevelInput.parentElement : null;
      if (da) da.style.display = '';
      if (autoTestBtn) autoTestBtn.style.display = '';
    });
  }
});
document.addEventListener('click', (e) => {
  const el = e.target;
  const btn = el && el.closest ? el.closest('.button') : null;
  if (!btn) return;
  try { playClick(); } catch {}
});
let lastClickFxTs = 0;
function spawnClickFx(x, y) {
  if (!clickFxEnabled) return;
  const now = performance.now();
  if (now - lastClickFxTs < 60) return;
  lastClickFxTs = now;
  const el = document.createElement('div');
  el.className = 'click-effect';
  el.style.left = x + 'px';
  el.style.top = y + 'px';
  document.body.appendChild(el);
  el.addEventListener('animationend', () => { try { document.body.removeChild(el); } catch {} });
}
document.addEventListener('pointerdown', (e) => {
  spawnClickFx(e.clientX, e.clientY);
});
const settingsBtn = document.getElementById('settingsBtn');
if (settingsBtn) settingsBtn.addEventListener('click', openSettings);
const calendarBtn = document.getElementById('calendarBtn');
if (calendarBtn) calendarBtn.addEventListener('click', openSignInCalendar);
setupBgmAutoplay();
initBgm();
playBgm();
try { sfxVolume = getStoredSfxVolume(); } catch {}
try { clickFxEnabled = getStoredClickFxEnabled(); } catch {}
document.addEventListener('pointerdown', () => { ensureAudioCtx(); resumeAudioCtx(); initBgm(); playBgm(); }, { once: true });
document.documentElement.style.setProperty('--bg-image', "url('home.png')");
document.documentElement.style.setProperty('--bg-overlay', 'linear-gradient(rgba(0,0,0,0.38), rgba(0,0,0,0.38))');
showCoinsOnHome();
  // 自動從網址參數寫入雲端設定（避免每台裝置手動輸入）。
  try {
    const sp = new URLSearchParams(location.search);
    const ep = sp.get('cloud_endpoint');
    const au = sp.get('cloud_auth');
    if (ep) localStorage.setItem('hanliu_cloud_endpoint', ep);
    if (au) localStorage.setItem('hanliu_cloud_auth', au);
    const uep = sp.get('cloud_unlock_endpoint');
    const uau = sp.get('cloud_unlock_auth');
    if (uep) localStorage.setItem('hanliu_cloud_unlock_endpoint', uep);
    if (uau) localStorage.setItem('hanliu_cloud_unlock_auth', uau);
    const pv = (sp.get('preview') || '').toLowerCase();
    const sc = parseInt(sp.get('score') || '', 10);
    const multi = (sp.get('scores') || '').split(',').map(x => parseInt(x.trim(), 10)).filter(x => !isNaN(x));
    const fl = String(sp.get('force_login') || '').trim().toLowerCase();
    if (fl === '1' || fl === 'true') { try { openAuthGate(); } catch {} }
    if (pv === 'ss' || (!isNaN(sc) && sc >= 0)) {
      cloudSyncDisabled = true;
      const demoScore = pv === 'ss' ? 301 : Math.max(0, sc);
      matchScore = demoScore;
      orderFailed = false;
      currentRoute = 'HanYu';
      currentProgress = 'Completed';
      startTime = Date.now() - 120000;
      try { saveScore('測試卡-SS預覽', demoScore, currentRoute); } catch {}
      renderLeaderboardPage('All', pv === 'ss' ? 'SS 稀有特效預覽' : `分數預覽：${demoScore}`);
      displayLeaderboard('All', true);
      try { finalizeGame(); } catch {}
    } else if (pv === 'demo' || (Array.isArray(multi) && multi.length)) {
      cloudSyncDisabled = true;
      const sample = pv === 'demo' ? [301, 280, 220, 180, 130, 50, 0] : multi;
      const baseNames = ['測試卡-SS','測試卡-S','測試卡-A','測試卡-B','測試卡-C','測試卡-D','測試卡-E'];
      currentRoute = 'HanYu';
      startTime = Date.now() - 180000;
      sample.forEach((s, i) => {
        const nm = baseNames[i] || `測試卡-${s}`;
        try { saveScore(nm, s, currentRoute); } catch {}
      });
      renderLeaderboardPage('All', '預覽成績注入');
      displayLeaderboard('All', true);
    }
  } catch {}
function showHpBar() {
  const bar = document.getElementById('hpBar');
  if (bar) bar.hidden = false;
  if (bar) {
    bar.classList.toggle('hardcore', selectedCardId === 'card_memorial');
    let playerLabel = bar.querySelector('#playerLabel');
    let playerNameText = bar.querySelector('#playerNameText');
    let scoreLabel = bar.querySelector('#scoreLabel');
    let scoreText = bar.querySelector('#scoreText');
    let hardcoreBadge = bar.querySelector('#hardcoreBadge');
    let timeLabel = bar.querySelector('#timeLabel');
    let timeText = bar.querySelector('#currentTimeText');
    if (!scoreLabel) {
      scoreLabel = document.createElement('span');
      scoreLabel.id = 'scoreLabel';
      scoreLabel.className = 'hp-label';
      scoreLabel.textContent = '分數';
      bar.appendChild(scoreLabel);
    }
    if (!playerLabel) {
      playerLabel = document.createElement('span');
      playerLabel.id = 'playerLabel';
      playerLabel.className = 'hp-label';
      playerLabel.textContent = '玩家';
      bar.appendChild(playerLabel);
    }
    if (!playerNameText) {
      playerNameText = document.createElement('span');
      playerNameText.id = 'playerNameText';
      playerNameText.className = 'hp-text';
      playerNameText.textContent = localStorage.getItem('hanliu_player_name') || '無名';
      bar.appendChild(playerNameText);
    }
    if (!scoreText) {
      scoreText = document.createElement('span');
      scoreText.id = 'scoreText';
      scoreText.className = 'hp-text';
      scoreText.textContent = String(matchScore || 0);
      bar.appendChild(scoreText);
    }
    if (!timeLabel) {
      timeLabel = document.createElement('span');
      timeLabel.id = 'timeLabel';
      timeLabel.className = 'hp-label';
      timeLabel.textContent = '時間';
      bar.appendChild(timeLabel);
    }
    if (!timeText) {
      timeText = document.createElement('span');
      timeText.id = 'currentTimeText';
      timeText.className = 'hp-text';
      const sec = startTime ? Math.floor(Math.max(0, Date.now() - startTime) / 1000) : 0;
      const mm = String(Math.floor(sec / 60)).padStart(2, '0');
      const ss = String(sec % 60).padStart(2, '0');
      timeText.textContent = `${mm}:${ss}`;
      bar.appendChild(timeText);
    }
    if (selectedCardId === 'card_memorial') {
      if (!hardcoreBadge) {
        hardcoreBadge = document.createElement('span');
        hardcoreBadge.id = 'hardcoreBadge';
        hardcoreBadge.className = 'hp-badge';
        hardcoreBadge.textContent = '一血挑戰中';
        bar.appendChild(hardcoreBadge);
      } else {
        hardcoreBadge.hidden = false;
      }
    } else if (hardcoreBadge) {
      hardcoreBadge.hidden = true;
    }
    let bgmBtn = bar.querySelector('#bgmToggle');
    if (!bgmBtn) {
      bgmBtn = document.createElement('button');
      bgmBtn.id = 'bgmToggle';
      bgmBtn.type = 'button';
      bgmBtn.className = 'button';
      bgmBtn.textContent = bgmEnabled ? '♪' : '🔇';
      bgmBtn.style.marginTop = '0';
      bgmBtn.style.padding = '0.3rem 0.5rem';
      bgmBtn.addEventListener('click', toggleBgm);
      bar.appendChild(bgmBtn);
    }
    let charBtn = bar.querySelector('#characterToggle');
    if (!charBtn) {
      charBtn = document.createElement('button');
      charBtn.id = 'characterToggle';
      charBtn.type = 'button';
      charBtn.className = 'button';
      charBtn.textContent = '隱藏角色';
      charBtn.style.marginTop = '0';
      charBtn.style.padding = '0.3rem 0.5rem';
      charBtn.addEventListener('click', () => {
        const wrap = document.getElementById('characterDisplay');
        if (!wrap) return;
        const nowHidden = !wrap.hidden;
        wrap.hidden = nowHidden;
        charBtn.textContent = nowHidden ? '顯示角色' : '隱藏角色';
      });
      bar.appendChild(charBtn);
    }
    if (!window.scoreDisplayIntervalId) {
      window.scoreDisplayIntervalId = trackedSetInterval(() => {
        const st = document.getElementById('scoreText');
        if (st) st.textContent = String(matchScore || 0);
        const pn = document.getElementById('playerNameText');
        if (pn) pn.textContent = localStorage.getItem('hanliu_player_name') || '無名';
        const tt = document.getElementById('currentTimeText');
        if (tt) {
          const sec = startTime ? Math.floor(Math.max(0, Date.now() - startTime) / 1000) : 0;
          const mm = String(Math.floor(sec / 60)).padStart(2, '0');
          const ss = String(sec % 60).padStart(2, '0');
          tt.textContent = `${mm}:${ss}`;
        }
      }, 300);
    }
  }
}

function hideHpBar() {
  const bar = document.getElementById('hpBar');
  if (bar) bar.hidden = true;
  if (window.scoreDisplayIntervalId) { clearInterval(window.scoreDisplayIntervalId); window.scoreDisplayIntervalId = null; }
}

function updateHpBar() {
  const bar = document.getElementById('hpBar');
  if (!bar) return;
  const fill = bar.querySelector('.hp-fill');
  const text = document.getElementById('hpText');
  const remain = Math.max(0, hpMax - errorCount);
  const pct = Math.round((remain / hpMax) * 100);
  if (fill) fill.style.width = pct + '%';
  if (text) text.textContent = `${remain}/${hpMax}`;
}
function getSelectedCardLevelBonus() { return 0; }
function applyLevelClear(levelEl, baseScore) {
  if (levelTransitioning) return;
  levelTransitioning = true;
  const bonus = getSelectedCardLevelBonus();
  const exileEquipped = (selectedCardId === 'card_exile' && currentLevel < 8);
  const computeExilePenalty = () => {
    let p = 10;
    if (currentLevelMistakes >= 3) p += (currentLevelMistakes - 2);
    return p;
  };
  const penalty = exileEquipped ? computeExilePenalty() : 0;
  let gain = Math.max(0, Number(baseScore || 0) + bonus - penalty);
  let hintMsg = '';
  let hintPositive = false;
  if (levelScoreSuppressed) { gain = 0; hintMsg = hintMsg ? (hintMsg + '｜蠻荒餘生：本關結算 0 分') : '蠻荒餘生：本關結算 0 分'; }
  if (selectedCardId === 'card_spring' && isHintUsedInLevel) {
    if (currentLevelMistakes === 0) { gain += 5; hintMsg = '雨潤如酥：完美答對，分數+5'; hintPositive = true; }
    else { gain = Math.max(0, gain - 5); hintMsg = '草色卻無：使用提示後失誤，分數-5'; hintPositive = false; }
  }
  if (selectedCardId === 'card_memorial') {
    gain += 10;
    hintMsg = hintMsg ? (hintMsg + '｜殘年除弊：額外獲得 +10 分') : '殘年除弊：額外獲得 +10 分';
  }
  if (currentLevel === 4) {
    try { unlockIllustration('mengjiao_moon.png'); } catch {}
  }
  bumpScore(gain);
  if (levelEl) { levelEl.style.display = 'none'; levelEl.style.pointerEvents = 'none'; }
  if (hintMsg) {
    showBlockModal('提示', [{ text: hintMsg }], () => { goToNextLevel(); });
  } else {
    goToNextLevel();
  }
}
function consumeCard() {
  if (!selectedCardId) return;
  const inv = loadInventory();
  const idx = inv.indexOf(selectedCardId);
  if (idx >= 0) { inv.splice(idx, 1); saveInventory(inv); }
  setSelectedCard('');
}
hideHpBar();

function resetHpBar() {
  errorCount = 0;
  const bar = document.getElementById('hpBar');
  const fill = bar ? bar.querySelector('.hp-fill') : null;
  const text = document.getElementById('hpText');
  if (fill) fill.style.width = '100%';
  if (text) text.textContent = `${hpMax}/${hpMax}`;
  hideHpBar();
}

function startDebugLevel() {
  let n = 1;
  if (debugLevelInput) {
    const v = parseInt(debugLevelInput.value, 10);
    if (!isNaN(v)) n = Math.max(1, Math.min(10, v));
  }
  const startScreen = document.getElementById('startScreen');
  if (startScreen) startScreen.style.display = 'none';
  hideCoins();
  isGameOver = false;
  systemCleanup(false);
  try { localStorage.setItem('hanliu_player_name', '開發者'); } catch {}
  if (input) { input.value = '開發者'; input.disabled = true; input.readOnly = true; }
  document.documentElement.style.removeProperty('--bg-image');
  currentRoute = 'HanYu';
  startTime = Date.now();
  currentLevel = n;
  currentProgress = `Level ${n}`;
  currentLevelIndex = Array.isArray(gameFlow) ? gameFlow.indexOf(n) : -1;
  matchScore = (n - 1) * 10;
  springHintUsedInRun = false;
  dreamGambleAutoActivate = false;
  resetHpBar();
  startNumberLevel(n);
}
function getCloudEndpoint() {
  try { return localStorage.getItem('hanliu_cloud_endpoint') || CLOUD_SYNC_ENDPOINT; } catch { return CLOUD_SYNC_ENDPOINT; }
}
function getCloudAuth() {
  try { return localStorage.getItem('hanliu_cloud_auth') || CLOUD_SYNC_AUTH; } catch { return CLOUD_SYNC_AUTH; }
}
function getUnlockEndpoint() {
  try {
    const v = localStorage.getItem('hanliu_cloud_unlock_endpoint');
    if (v && String(v).trim()) return String(v).trim();
    const base = getCloudEndpoint();
    if (!base) return '';
    if (/scores\/?$/.test(base)) return base.replace(/scores\/?$/, 'unlocks');
    return base + '/unlocks';
  } catch { return ''; }
}
function getUnlockAuth() {
  try { return localStorage.getItem('hanliu_cloud_unlock_auth') || getCloudAuth(); } catch { return getCloudAuth(); }
}
function getAccountEndpoint() {
  try {
    const v = localStorage.getItem('hanliu_cloud_account_endpoint');
    if (v && String(v).trim()) return String(v).trim();
    const base = getCloudEndpoint();
    if (!base) return '';
    if (/scores\/?$/.test(base)) return base.replace(/scores\/?$/, 'accounts');
    return base + '/accounts';
  } catch { return ''; }
}
function getAccountAuth() {
  try { return localStorage.getItem('hanliu_cloud_account_auth') || getCloudAuth(); } catch { return getCloudAuth(); }
}
function getProfileEndpoint() {
  try {
    const v = localStorage.getItem('hanliu_cloud_profile_endpoint');
    if (v && String(v).trim()) return String(v).trim();
    const base = getCloudEndpoint();
    if (!base) return '';
    if (/scores\/?$/.test(base)) return base.replace(/scores\/?$/, 'profile');
    return base + '/profile';
  } catch { return ''; }
}
function getProfileAuth() {
  try { return localStorage.getItem('hanliu_cloud_profile_auth') || getCloudAuth(); } catch { return getCloudAuth(); }
}
function buildProfileFromLocal() {
  try {
    const coins = Number(localStorage.getItem(getCoinsKey()) || 0) || 0;
    const invRaw = localStorage.getItem(storageKey('inventory'));
    const inv = invRaw ? JSON.parse(invRaw) : [];
    const sel = localStorage.getItem(storageKey('selected_card')) || '';
    const daysRaw = localStorage.getItem(storageKey('login_days')) || '[]';
    const days = JSON.parse(daysRaw);
    const last = localStorage.getItem(storageKey('lastCheckInDate')) || '';
    return { coins, inventory: Array.isArray(inv) ? inv : [], selected_card: sel, login_days: Array.isArray(days) ? days : [], lastCheckInDate: last };
  } catch { return { coins: 0, inventory: [], selected_card: '', login_days: [], lastCheckInDate: '' }; }
}
function applyProfileToLocal(p) {
  try {
    if (!p || typeof p !== 'object') return;
    if (typeof p.coins === 'number') { userCoins = Number(p.coins) || 0; localStorage.setItem(getCoinsKey(), String(userCoins)); updateCoinsDisplay(); }
    if (Array.isArray(p.inventory)) { localStorage.setItem(storageKey('inventory'), JSON.stringify(p.inventory)); renderSelectCardArea(); }
    if (typeof p.selected_card === 'string') { selectedCardId = p.selected_card || ''; localStorage.setItem(storageKey('selected_card'), selectedCardId); if (equipExileCard) equipExileCard.checked = (selectedCardId === 'card_exile'); }
    if (Array.isArray(p.login_days)) { localStorage.setItem(storageKey('login_days'), JSON.stringify(p.login_days)); }
    if (typeof p.lastCheckInDate === 'string') { localStorage.setItem(storageKey('lastCheckInDate'), p.lastCheckInDate || ''); }
  } catch {}
}
async function loadProfileFromCloud() {
  if (!isAccountBound()) return;
  const acc = getStoredAccount();
  const ep = getProfileEndpoint();
  const au = getProfileAuth();
  if (!acc || !acc.id || !ep) return;
  try {
    const url = ep + (ep.includes('?') ? '&' : '?') + 'id=' + encodeURIComponent(acc.id);
    const r = await fetch(url, { headers: { ...(au ? { authorization: au } : {}) } });
    if (!r.ok) return;
    const data = await r.json().catch(() => null);
    if (!data || typeof data !== 'object') return;
    applyProfileToLocal(data);
  } catch {}
}
async function syncProfileToCloud(obj) {
  if (!isAccountBound()) return;
  const acc = getStoredAccount();
  const ep = getProfileEndpoint();
  const au = getProfileAuth();
  if (!acc || !acc.id || !ep) return;
  try {
    const body = { accountId: acc.id, kind: 'profile', profile: (obj || buildProfileFromLocal()), ts: Date.now() };
    await fetch(ep, { method: 'POST', headers: { 'content-type': 'application/json', ...(au ? { authorization: au } : {}) }, body: JSON.stringify(body) }).catch(() => {});
  } catch {}
}
async function syncAccountToCloud(acc) {
  const ep = getAccountEndpoint();
  const au = getAccountAuth();
  if (!ep || !acc) return;
  try {
    await fetch(ep, { method: 'POST', headers: { 'content-type': 'application/json', ...(au ? { authorization: au } : {}) }, body: JSON.stringify({ id: acc.id, name: acc.name, salt: acc.salt, hash: acc.hash, ts: acc.ts }) }).catch(() => {});
  } catch {}
}
async function deleteAccountFromCloud(acc) {
  const ep = getAccountEndpoint();
  const au = getAccountAuth();
  if (!ep || !acc || !acc.id) return;
  try {
    const url = ep + (ep.includes('?') ? '&' : '?') + 'id=' + encodeURIComponent(acc.id);
    await fetch(url, { method: 'DELETE', headers: { ...(au ? { authorization: au } : {}) } }).catch(() => {});
  } catch {
    try {
      await fetch(ep, { method: 'POST', headers: { 'content-type': 'application/json', ...(au ? { authorization: au } : {}) }, body: JSON.stringify({ action: 'delete', id: acc.id }) });
    } catch {}
  }
}
async function clearAccountUnlocksCloud(acc) {
  const ep = getUnlockEndpoint();
  const au = getUnlockAuth();
  if (!ep || !acc || !acc.id) return;
  try {
    await fetch(ep, { method: 'POST', headers: { 'content-type': 'application/json', ...(au ? { authorization: au } : {}) }, body: JSON.stringify({ kind: 'unlocks', accountId: acc.id, items: [], ts: Date.now() }) }).catch(() => {});
  } catch {}
}
function removeAccountUnlocksLocal(accId) {
  try {
    const raw = localStorage.getItem('hanliu_unlocks');
    const map = raw ? JSON.parse(raw) : {};
    if (accId && map && Object.prototype.hasOwnProperty.call(map, accId)) {
      delete map[accId];
      localStorage.setItem('hanliu_unlocks', JSON.stringify(map));
    }
  } catch {}
}
function clearLocalAccount() {
  try { localStorage.removeItem('hanliu_account'); } catch {}
  try { localStorage.removeItem('hanliu_account_name'); } catch {}
  try { localStorage.removeItem('hanliu_active_account_id'); } catch {}
}
async function loadAccountFromCloud(name) {
  const ep = getAccountEndpoint();
  const au = getAccountAuth();
  const nm = String(name || '').trim();
  if (!ep || !nm) return null;
  try {
    const url = ep + (ep.includes('?') ? '&' : '?') + 'name=' + encodeURIComponent(nm);
    const r = await fetch(url, { headers: { ...(au ? { authorization: au } : {}) } });
    if (!r.ok) return null;
    const data = await r.json().catch(() => null);
    if (!data || !data.id || !data.salt || !data.hash) return null;
    return { id: String(data.id), name: String(data.name || nm), salt: String(data.salt), hash: String(data.hash), ts: Number(data.ts || Date.now()) };
  } catch { return null; }
}
function dismissAuthGateToHome() {
  const main = document.querySelector('main.container');
  const startScreen = document.getElementById('startScreen');
  document.documentElement.style.setProperty('--bg-image', "url('home.png')");
  document.documentElement.style.setProperty('--bg-overlay', 'none');
  const gateActions = document.getElementById('authGateActions');
  if (gateActions && main) { try { main.removeChild(gateActions); } catch {} }
  if (startScreen) startScreen.style.display = '';
  const sbtn = document.getElementById('settingsBtn'); if (sbtn) sbtn.hidden = false;
  const cal = document.getElementById('calendarBtn'); if (cal) cal.hidden = false;
  try { if (window.__authGateResizeHandler) { window.removeEventListener('resize', window.__authGateResizeHandler); window.__authGateResizeHandler = null; } } catch {}
  applyPlayerNameInputState();
  const hvb2 = document.getElementById('homeVolumeToggle'); if (hvb2) hvb2.hidden = true;
  const hv2 = document.getElementById('homeVolume'); if (hv2) hv2.hidden = true;
  const hsv2 = document.getElementById('homeSfxVolume'); if (hsv2) hsv2.hidden = true;
  const inputEl = document.getElementById('playerName');
  try { if (inputEl) inputEl.focus(); } catch {}
  performAutoDailyCheckIn();
  reloadCoins();
  showCoinsOnHome();
}
async function syncUnlocksFromCloud() {
  if (!isAccountBound()) return;
  const acc = getStoredAccount();
  const ep = getUnlockEndpoint();
  const au = getUnlockAuth();
  if (!acc || !acc.id || !ep) return;
  try {
    const url = ep + (ep.includes('?') ? '&' : '?') + 'id=' + encodeURIComponent(acc.id);
    const r = await fetch(url, { headers: { ...(au ? { authorization: au } : {}) } });
    if (!r.ok) return;
    const data = await r.json().catch(() => null);
    if (!Array.isArray(data)) return;
    const cur = getCurrentUnlocksSet();
    data.forEach((k) => { const s = normalizeIllustrationKey(k); if (s) cur.add(s); });
    persistCurrentUnlocks(cur);
  } catch {}
}
async function syncUnlocksToCloud(set) {
  if (!isAccountBound()) return;
  const acc = getStoredAccount();
  const ep = getUnlockEndpoint();
  const au = getUnlockAuth();
  if (!acc || !acc.id || !ep) return;
  try {
    const body = { kind: 'unlocks', accountId: acc.id, items: Array.from(set || []), ts: Date.now() };
    await fetch(ep, { method: 'POST', headers: { 'content-type': 'application/json', ...(au ? { authorization: au } : {}) }, body: JSON.stringify(body) }).catch(() => {});
  } catch {}
}

let guestUnlockedIllustrations = new Set();
function normalizeIllustrationKey(p) {
  const s = String(p || '').trim();
  if (!s) return '';
  const parts = s.split(/[\\/]/);
  return parts[parts.length - 1];
}
function getIllustrationList() {
  return [
    'hanyu_ss.png','hanyu_s.png','hanyu_a.png','hanyu_b.png','hanyu_c.png','hanyu_d.png',
    'han_yu_youth_dead.png','han_yu_middle_dead.png','han_yu_aged_dead.png',
    'han_yu_youth_sleep.png','han_yu_middle_sleep.png','han_yu_aged_sleep.png',
    'han_yu_youth_insomnia.png','han_yu_middle_insomnia.png','han_yu_aged_insomnia.png',
    'han_yu_aged_dark_cuisine.png','han_yu_immortal.png','luliang.png','mengjiao_moon.png','Mansion.png',
    'card_exile.png','card_dream.png','card_spring.png','card_memorial.png'
  ];
}
function getIllustrationGroups() {
  return [
    { title: '結算', items: ['hanyu_ss.png','hanyu_s.png','hanyu_a.png','hanyu_b.png','hanyu_c.png','hanyu_d.png'] },
    { title: '場景', items: ['luliang.png','mengjiao_moon.png','Mansion.png'] },
    { title: '事件', items: ['han_yu_youth_dead.png','han_yu_middle_dead.png','han_yu_aged_dead.png','han_yu_youth_sleep.png','han_yu_middle_sleep.png','han_yu_aged_sleep.png','han_yu_youth_insomnia.png','han_yu_middle_insomnia.png','han_yu_aged_insomnia.png','han_yu_aged_dark_cuisine.png','han_yu_immortal.png'] },
    { title: '卡片', items: ['card_exile.png','card_dream.png','card_spring.png','card_memorial.png','card_dragon.png','card_survive.png'] },
  ];
}
function loadAccountUnlocks() {
  try { const raw = localStorage.getItem('hanliu_unlocks'); return raw ? JSON.parse(raw) : {}; } catch { return {}; }
}
function saveAccountUnlocks(obj) {
  try { localStorage.setItem('hanliu_unlocks', JSON.stringify(obj || {})); } catch {}
}
function getCurrentUnlocksSet() {
  if (isAccountBound()) {
    const acc = getStoredAccount();
    const map = loadAccountUnlocks();
    const key = acc && acc.id ? String(acc.id) : '';
    const list = key && Array.isArray(map[key]) ? map[key] : [];
    return new Set(list);
  }
  return new Set(Array.from(guestUnlockedIllustrations));
}
function persistCurrentUnlocks(set) {
  if (isAccountBound()) {
    const acc = getStoredAccount();
    const key = acc && acc.id ? String(acc.id) : '';
    if (!key) return;
    const map = loadAccountUnlocks();
    map[key] = Array.from(set);
    saveAccountUnlocks(map);
    try { syncUnlocksToCloud(set); } catch {}
  } else {
    guestUnlockedIllustrations = new Set(Array.from(set));
  }
}
function unlockIllustration(p) {
  const k = normalizeIllustrationKey(p);
  if (!k) return;
  const cur = getCurrentUnlocksSet();
  cur.add(k);
  persistCurrentUnlocks(cur);
}
function setIllustrationUnlocked(key, on) {
  const cur = getCurrentUnlocksSet();
  if (on) cur.add(key); else cur.delete(key);
  persistCurrentUnlocks(cur);
}
async function openGallery() {
  if (document.querySelector('.modal-backdrop.active-block')) return;
  try { await syncUnlocksFromCloud(); } catch {}
  const overlay = document.createElement('div');
  overlay.className = 'modal-backdrop active-block';
  const modal = document.createElement('div');
  modal.className = 'modal';
  const close = document.createElement('button');
  close.className = 'modal-close';
  close.type = 'button';
  close.textContent = '×';
  close.addEventListener('click', () => { try { document.body.removeChild(overlay); } catch {} });
  const title = document.createElement('h2');
  title.className = 'modal-title';
  title.textContent = '圖鑑';
  const unlocked = getCurrentUnlocksSet();
  const groups = getIllustrationGroups();
  modal.appendChild(close);
  modal.appendChild(title);
  const tabs = document.createElement('div');
  tabs.className = 'modal-actions';
  const content = document.createElement('div');
  const btns = [];
  groups.forEach((g, i) => {
    const b = document.createElement('button');
    b.className = 'button';
    b.type = 'button';
    b.textContent = g.title;
    btns.push(b);
    tabs.appendChild(b);
  });
  const renderGroup = (idx) => {
    content.innerHTML = '';
    const gh = document.createElement('p');
    gh.className = 'dialog-text';
    gh.textContent = groups[idx].title;
    const grid = document.createElement('div');
    grid.style.display = 'grid';
    grid.style.gridTemplateColumns = 'repeat(auto-fill, minmax(160px, 1fr))';
    grid.style.gap = '0.75rem';
    content.appendChild(gh);
    content.appendChild(grid);
    const fragCells = document.createDocumentFragment();
    (groups[idx].items || []).forEach((key) => {
      const cell = document.createElement('div');
      cell.style.display = 'flex';
      cell.style.flexDirection = 'column';
      cell.style.alignItems = 'center';
      cell.style.justifyContent = 'center';
      cell.style.padding = '0.5rem';
      cell.style.border = '1px solid #2a2a2a';
      cell.style.borderRadius = '10px';
      cell.style.minHeight = '180px';
      const label = document.createElement('span');
      label.className = 'dialog-text';
      label.textContent = key;
      label.style.fontSize = '0.95rem';
      label.style.marginTop = '0.5rem';
      if (unlocked.has(key)) {
        const img = document.createElement('img');
        img.className = 'illustration';
        img.src = key;
        img.alt = key;
        img.loading = 'lazy';
        img.decoding = 'async';
        img.style.width = 'min(140px, 38vw)';
        img.style.maxHeight = '120px';
        img.style.objectFit = 'contain';
        cell.appendChild(img);
        cell.appendChild(label);
        img.style.cursor = 'pointer';
        label.style.cursor = 'pointer';
        img.addEventListener('click', () => { try { openIllustrationDetail(key); } catch {} });
        label.addEventListener('click', () => { try { openIllustrationDetail(key); } catch {} });
        const r = getIllustrationRarity(key);
        if (r) { const rb = document.createElement('span'); rb.className = 'badge sm'; const variant = getIllustrationRarityClass(key); if (variant) rb.classList.add(variant); rb.textContent = r; rb.style.marginTop = '0.4rem'; cell.appendChild(rb); }
        if (devModeEnabled) {
          const toggleBtn = document.createElement('button');
          toggleBtn.className = 'button';
          toggleBtn.type = 'button';
          toggleBtn.textContent = '鎖定';
          toggleBtn.style.marginTop = '0.4rem';
          toggleBtn.addEventListener('click', () => { try { setIllustrationUnlocked(key, false); document.body.removeChild(overlay); } catch {} try { openGallery(); } catch {} });
          cell.appendChild(toggleBtn);
        }
      } else {
        const lock = document.createElement('div');
        lock.textContent = '已鎖定';
        lock.style.width = 'min(140px, 38vw)';
        lock.style.maxHeight = '120px';
        lock.style.display = 'flex';
        lock.style.alignItems = 'center';
        lock.style.justifyContent = 'center';
        lock.style.background = 'linear-gradient(135deg, rgba(90,90,90,0.35), rgba(40,40,40,0.35))';
        lock.style.border = '1px dashed #555';
        lock.style.borderRadius = '10px';
        lock.style.color = '#9aa0a6';
        cell.appendChild(lock);
        if (devModeEnabled) {
          cell.appendChild(label);
          const toggleBtn = document.createElement('button');
          toggleBtn.className = 'button';
          toggleBtn.type = 'button';
          toggleBtn.textContent = '解鎖';
          toggleBtn.style.marginTop = '0.4rem';
          toggleBtn.addEventListener('click', () => { try { setIllustrationUnlocked(key, true); document.body.removeChild(overlay); } catch {} try { openGallery(); } catch {} });
          cell.appendChild(toggleBtn);
        }
      }
      fragCells.appendChild(cell);
    });
    grid.appendChild(fragCells);
  };
  let active = 0;
  const sync = () => { btns.forEach((b, i) => { b.disabled = i === active; }); };
  btns.forEach((b, i) => { b.addEventListener('click', () => { active = i; sync(); renderGroup(active); }); });
  modal.appendChild(tabs);
  modal.appendChild(content);
  renderGroup(active);
  sync();
  modal.tabIndex = -1;
  try { modal.focus(); } catch {}
  modal.addEventListener('keydown', (ev) => {
    if (ev.key === 'ArrowLeft') { active = Math.max(0, active - 1); sync(); renderGroup(active); }
    if (ev.key === 'ArrowRight') { active = Math.min(btns.length - 1, active + 1); sync(); renderGroup(active); }
  });
  overlay.appendChild(modal);
  document.body.appendChild(overlay);
}
function getIllustrationDescription(key) {
  const map = {
    'hanyu_ss.png': '泰山北斗，文道同山河偉力。',
    'hanyu_s.png': '百代文宗，古文運動引領復興。',
    'hanyu_a.png': '唐宋八大家之首，文筆雄健。',
    'hanyu_b.png': '剛直名臣，力抗流俗。',
    'hanyu_c.png': '國子先生，尚需融會貫通。',
    'hanyu_d.png': '時運不濟，才華待磨。',
    'han_yu_youth_dead.png': '少壯未遇，行路艱難。',
    'han_yu_middle_dead.png': '中歲失意，志不改。',
    'han_yu_aged_dead.png': '暮年殞志，然道不泯。',
    'han_yu_youth_sleep.png': '少歲好眠，精神飽滿。',
    'han_yu_middle_sleep.png': '中歲好眠，心志復甦。',
    'han_yu_aged_sleep.png': '老年好眠，神清氣朗。',
    'han_yu_youth_insomnia.png': '少歲失眠，愁思難寐。',
    'han_yu_middle_insomnia.png': '中歲失眠，政事牽心。',
    'han_yu_aged_insomnia.png': '老年失眠，世事無奈。',
    'han_yu_aged_dark_cuisine.png': '黑暗料理驚魂，失分之夢。',
    'han_yu_immortal.png': '迴光返照，三十秒問答。',
    'luliang.png': '陸贄、梁肅出現，文名遠播，轉機已現',
    'mengjiao_moon.png': '孟郊月下，詩友同心。',
    'Mansion.png': '宰相公府，門緊閉而志不屈。',
    'card_exile.png': '夕貶潮州：被貶前不會死亡；依失誤扣分。',
    'card_dream.png': '莊周夢蝶：夢境稀有事件機率提升。',
    'card_spring.png': '早春小雨：提示高亮正解；結算依失誤調整分數。',
    'card_memorial.png': '諫迎佛骨：一血挑戰；每關額外加分。'
  };
  return map[key] || '';
}
function getIllustrationRarity(key) {
  const map = {
    'han_yu_aged_dark_cuisine.png': '0.05%',
    'han_yu_youth_sleep.png': '0.1%',
    'han_yu_middle_sleep.png': '0.1%',
    'han_yu_aged_sleep.png': '0.1%',
    'han_yu_youth_insomnia.png': '5%',
    'han_yu_middle_insomnia.png': '5%',
    'han_yu_aged_insomnia.png': '5%'
  };
  return map[key] || '';
}
function getIllustrationRarityClass(key) {
  const r = getIllustrationRarity(key);
  if (!r) return '';
  if (r === '0.05%') return 'legendary';
  if (r === '0.1%') return 'rare';
  if (r === '5%') return 'uncommon';
  return '';
}
function buildIllustrationShareText(key, desc) {
  const lines = [];
  lines.push(`圖鑑：${key}`);
  if (desc) lines.push(`說明：${desc}`);
  const rare = getIllustrationRarity(key);
  if (rare) lines.push(`稀有度：${rare}`);
  return lines.join('\n');
}
async function shareIllustration(key) {
  const desc = getIllustrationDescription(key);
  const img = new Image();
  const pad = 20;
  const w = 600; const h = 740;
  const canvas = document.createElement('canvas');
  canvas.width = w; canvas.height = h;
  const ctx = canvas.getContext('2d');
  ctx.fillStyle = '#1a1a1a';
  ctx.fillRect(0,0,w,h);
  const y = pad;
  const draw = () => {
    const iw = w - pad * 2; const ih = 360;
    ctx.fillStyle = '#2a2a2a';
    ctx.fillRect(pad, y, iw, ih);
    try { ctx.drawImage(img, pad, y, iw, ih); } catch {}
    ctx.fillStyle = '#f7fbff';
    ctx.font = 'bold 26px system-ui, Arial';
    ctx.fillText('寒流｜圖鑑', pad, ih + y + 40);
    ctx.font = 'bold 22px system-ui, Arial';
    ctx.fillText(String(key), pad, ih + y + 80);
    ctx.font = '20px system-ui, Arial';
    const text = buildIllustrationShareText(key, desc);
    const maxWidth = w - pad * 2;
    const words = text.split(/\n+/);
    let ty = ih + y + 120;
    words.forEach((ln) => {
      let rest = ln;
      while (rest.length) {
        let len = rest.length; let seg = rest.slice(0, len);
        while (ctx.measureText(seg).width > maxWidth && len > 8) { len -= 1; seg = rest.slice(0, len); }
        ctx.fillText(seg, pad, ty);
        ty += 30; rest = rest.slice(seg.length);
      }
    });
    ctx.fillStyle = '#9aa0a6';
    ctx.font = '18px system-ui, Arial';
    const dt = new Date();
    const footer = `${dt.getFullYear()}-${String(dt.getMonth()+1).padStart(2,'0')}-${String(dt.getDate()).padStart(2,'0')} ${String(dt.getHours()).padStart(2,'0')}:${String(dt.getMinutes()).padStart(2,'0')}`;
    ctx.fillText(footer, pad, h - pad - 20);
  };
  const asBlob = () => new Promise((resolve) => { canvas.toBlob((b) => resolve(b), 'image/png'); });
  await new Promise((resolve) => { img.onload = resolve; img.onerror = resolve; img.src = key; });
  draw();
  const blob = await asBlob();
  const text = buildIllustrationShareText(key, desc);
  if (navigator.share && blob) {
    try {
      const file = new File([blob], `hanliu_gallery_${key}.png`, { type: 'image/png' });
      const canFiles = typeof navigator.canShare === 'function' ? navigator.canShare({ files: [file] }) : true;
      if (canFiles) { await navigator.share({ title: '寒流｜圖鑑', text, files: [file] }); return; }
    } catch {}
  }
  const url = URL.createObjectURL(blob);
  const doDownload = () => {
    try { const a = document.createElement('a'); a.href = url; a.download = `hanliu_gallery_${key}.png`; document.body.appendChild(a); a.click(); document.body.removeChild(a); } catch {}
  };
  const doCopy = () => { try { navigator.clipboard.writeText(text); } catch {} };
  showShareModal(url, text, doDownload, doCopy);
}
function openIllustrationDetail(key) {
  const overlay = document.createElement('div');
  overlay.className = 'modal-backdrop';
  const modal = document.createElement('div');
  modal.className = 'modal';
  const close = document.createElement('button');
  close.className = 'modal-close';
  close.type = 'button';
  close.textContent = '×';
  close.addEventListener('click', () => { try { document.body.removeChild(overlay); } catch {} });
  const title = document.createElement('h2');
  title.className = 'modal-title';
  title.textContent = '圖鑑詳情';
  const img = document.createElement('img');
  img.className = 'illustration';
  img.src = key;
  img.alt = key;
  img.style.maxWidth = '320px';
  img.style.border = '1px solid #2a2a2a';
  img.style.borderRadius = '10px';
  const p = document.createElement('p');
  p.className = 'dialog-text';
  p.textContent = getIllustrationDescription(key) || '';
  const r = getIllustrationRarity(key);
  let rp = null;
  if (r) { rp = document.createElement('span'); rp.className = `badge`; const variant = getIllustrationRarityClass(key); if (variant) rp.classList.add(variant); rp.textContent = r; }
  const actions = document.createElement('div');
  actions.className = 'actions';
  const shareBtn = document.createElement('button');
  shareBtn.className = 'button';
  shareBtn.type = 'button';
  shareBtn.textContent = '分享';
  shareBtn.addEventListener('click', () => { try { shareIllustration(key); } catch {} });
  actions.appendChild(shareBtn);
  modal.appendChild(close);
  modal.appendChild(title);
  modal.appendChild(img);
  modal.appendChild(p);
  if (rp) { const row = document.createElement('div'); row.className = 'actions'; row.appendChild(rp); modal.appendChild(row); }
  modal.appendChild(actions);
  overlay.appendChild(modal);
  document.body.appendChild(overlay);
}
async function deriveAccountHash(password, saltB64) {
  try {
    const enc = new TextEncoder();
    const key = await crypto.subtle.importKey('raw', enc.encode(password), { name: 'PBKDF2' }, false, ['deriveBits']);
    const salt = (() => { const bin = atob(saltB64); const out = new Uint8Array(bin.length); for (let i = 0; i < bin.length; i++) out[i] = bin.charCodeAt(i); return out; })();
    const bits = await crypto.subtle.deriveBits({ name: 'PBKDF2', salt, iterations: 120000, hash: 'SHA-256' }, key, 256);
    const bytes = new Uint8Array(bits);
    let s = ''; for (let i = 0; i < bytes.length; i++) s += String.fromCharCode(bytes[i]);
    return btoa(s);
  } catch {
    const enc = new TextEncoder();
    const data = enc.encode(String(password || '') + String(saltB64 || ''));
    const digest = await crypto.subtle.digest('SHA-256', data);
    const bytes = new Uint8Array(digest);
    let s = ''; for (let i = 0; i < bytes.length; i++) s += String.fromCharCode(bytes[i]);
    return btoa(s);
  }
}
function genAccountId() {
  try { if (crypto && typeof crypto.randomUUID === 'function') return crypto.randomUUID(); } catch {}
  return `hl-${Date.now()}-${Math.random().toString(36).slice(2)}`;
}
function genSaltB64() {
  const arr = new Uint8Array(16);
  try { crypto.getRandomValues(arr); } catch { for (let i = 0; i < arr.length; i++) arr[i] = Math.floor(Math.random() * 256); }
  let s = ''; for (let i = 0; i < arr.length; i++) s += String.fromCharCode(arr[i]);
  return btoa(s);
}
function loadAccountsList() {
  try { const raw = localStorage.getItem('hanliu_accounts'); return raw ? JSON.parse(raw) : []; } catch { return []; }
}
function saveAccountsList(list) {
  try { localStorage.setItem('hanliu_accounts', JSON.stringify(Array.isArray(list) ? list : [])); } catch {}
}
function getActiveAccountId() {
  try { return String(localStorage.getItem('hanliu_active_account_id') || '').trim(); } catch { return ''; }
}
function setActiveAccountId(id) {
  try { if (id) localStorage.setItem('hanliu_active_account_id', String(id)); else localStorage.removeItem('hanliu_active_account_id'); } catch {}
}
function migrateLegacyAccount() {
  try {
    const raw = localStorage.getItem('hanliu_account');
    const acc = raw ? JSON.parse(raw) : null;
    if (acc && acc.id) {
      let list = loadAccountsList();
      const exists = list.some(a => String(a && a.id || '') === String(acc.id));
      if (!exists) { list.push(acc); saveAccountsList(list); }
      setActiveAccountId(acc.id);
      localStorage.removeItem('hanliu_account');
    }
  } catch {}
}
function getStoredAccount() {
  migrateLegacyAccount();
  const list = loadAccountsList();
  let id = getActiveAccountId();
  if (!id && Array.isArray(list) && list.length) id = String(list[0] && list[0].id || '');
  if (!id) return null;
  const acc = list.find(a => String(a && a.id || '') === String(id));
  return acc || null;
}
function setStoredAccount(acc) {
  if (!acc || !acc.id) return;
  let list = loadAccountsList();
  let found = false;
  list = (list || []).map((a) => {
    if (String(a && a.id || '') === String(acc.id)) { found = true; return acc; }
    return a;
  });
  if (!found) list.push(acc);
  saveAccountsList(list);
  setActiveAccountId(acc.id);
  try { localStorage.setItem('hanliu_account_name', String(acc && acc.name || '')); } catch {}
}
function openAccountDialog() {
  try { Array.from(document.querySelectorAll('.modal-backdrop.active-block')).forEach(el => { try { document.body.removeChild(el); } catch { el.remove(); } }); } catch {}
  const overlay = document.createElement('div');
  overlay.className = 'modal-backdrop active-block';
  const modal = document.createElement('div');
  modal.className = 'modal';
  const close = document.createElement('button');
  close.className = 'modal-close';
  close.type = 'button';
  close.textContent = '×';
  const sbtnHide = document.getElementById('settingsBtn'); if (sbtnHide) sbtnHide.hidden = true;
  close.addEventListener('click', () => { blockingModalOpen = false; document.body.removeChild(overlay); const sb = document.getElementById('settingsBtn'); if (sb) sb.hidden = false; });
  const title = document.createElement('h2');
  title.className = 'modal-title';
  title.textContent = '註冊 / 登入';
  const status = document.createElement('p');
  status.className = 'dialog-text';
  const content = document.createElement('div');
  content.className = 'actions';
  content.style.flexDirection = 'column';
  content.style.alignItems = 'stretch';
  content.style.justifyContent = 'flex-start';
  content.style.gap = '0.5rem';
  const accountSelect = document.createElement('select');
  accountSelect.className = 'input';
  const fillAccountSelect = () => {
    const list = loadAccountsList();
    accountSelect.innerHTML = '';
    const placeholder = document.createElement('option');
    placeholder.value = '';
    placeholder.textContent = list && list.length ? '選擇已註冊帳號' : '目前沒有帳號';
    accountSelect.appendChild(placeholder);
    const activeId = getActiveAccountId();
    (list || []).forEach((a) => {
      const opt = document.createElement('option');
      opt.value = String(a.id);
      opt.textContent = String(a.name || a.id);
      if (activeId && String(a.id) === activeId) opt.selected = true;
      accountSelect.appendChild(opt);
    });
  };
  fillAccountSelect();
  const nameLabel = document.createElement('span');
  nameLabel.className = 'volume-label';
  nameLabel.textContent = '暱稱：';
  const nameInput = document.createElement('input');
  nameInput.className = 'input';
  nameInput.type = 'text';
  nameInput.placeholder = '2–16 個字';
  const passLabel = document.createElement('span');
  passLabel.className = 'volume-label';
  passLabel.textContent = '密碼：';
  const passInput = document.createElement('input');
  passInput.className = 'input';
  passInput.type = 'password';
  passInput.placeholder = '至少 6 碼';
  const actions = document.createElement('div');
  actions.className = 'modal-actions';
  const registerBtn = document.createElement('button');
  registerBtn.className = 'button';
  registerBtn.type = 'button';
  registerBtn.textContent = '註冊';
  const loginBtn = document.createElement('button');
  loginBtn.className = 'button';
  loginBtn.type = 'button';
  loginBtn.textContent = '登入';
  const deleteBtn = document.createElement('button');
  deleteBtn.className = 'button';
  deleteBtn.type = 'button';
  deleteBtn.textContent = '註銷帳號';
  const applyNameState = () => {
    const acc = getStoredAccount();
    if (acc && acc.name) { nameInput.value = acc.name; }
    nameInput.readOnly = false; nameInput.disabled = false;
    deleteBtn.disabled = !(acc && acc.id);
  };
  applyNameState();
  const switchBtn = document.createElement('button');
  switchBtn.className = 'button';
  switchBtn.type = 'button';
  switchBtn.textContent = '切換帳號';
  switchBtn.addEventListener('click', () => {
    const id = String(accountSelect.value || '').trim();
    if (!id) { status.textContent = '請先選擇帳號'; return; }
    const list = loadAccountsList();
    const acc = (list || []).find(a => String(a && a.id || '') === id);
    if (!acc) { status.textContent = '找不到帳號'; return; }
    setStoredAccount(acc);
    applyPlayerNameInputState();
    status.textContent = `已切換為：${String(acc.name || '')}`;
    fillAccountSelect();
  });
  registerBtn.addEventListener('click', async () => {
    const nm = String(nameInput.value || '').trim();
    const pw = String(passInput.value || '').trim();
    if (nm.length < 2 || nm.length > 16) { status.textContent = '暱稱需介於 2–16 字'; return; }
    if (pw.length < 6 || pw.length > 64) { status.textContent = '密碼需至少 6 碼'; return; }
    const salt = genSaltB64();
    const hash = await deriveAccountHash(pw, salt).catch(() => '');
    if (!hash) { status.textContent = '無法建立帳號'; return; }
    const acc = { id: genAccountId(), name: nm, salt, hash, ts: Date.now() };
    setStoredAccount(acc);
    try { await syncAccountToCloud(acc); } catch {}
    applyPlayerNameInputState();
    blockingModalOpen = false;
    try { document.body.removeChild(overlay); } catch {}
    const sb = document.getElementById('settingsBtn'); if (sb) sb.hidden = false;
    await loadProfileFromCloud().catch(() => {});
    dismissAuthGateToHome();
    setTimeout(() => {
      try {
        const acc2 = getStoredAccount();
        if (acc2 && acc2.id) {
          const k = `hanliu_first_draw_awarded_${acc2.id}`;
          const done = localStorage.getItem(k) === '1';
          if (!done) { isFirstLoginFreeDraw = true; performDraw(1); isFirstLoginFreeDraw = false; localStorage.setItem(k, '1'); }
        }
      } catch {}
    }, 600);
  });
  loginBtn.addEventListener('click', async () => {
    const nm = String(nameInput.value || '').trim();
    let acc = null;
    const list = loadAccountsList();
    if (nm) acc = (list || []).find(a => String(a && a.name || '') === nm) || null;
    if (!acc) acc = await loadAccountFromCloud(nm).catch(() => null);
    if (!acc || !acc.salt || !acc.hash) { status.textContent = '尚未註冊'; return; }
    setStoredAccount(acc);
    const pw = String(passInput.value || '').trim();
    if (!pw) { status.textContent = '請輸入密碼'; return; }
    const h = await deriveAccountHash(pw, acc.salt).catch(() => '');
    if (!h || h !== acc.hash) { status.textContent = '密碼錯誤'; return; }
    try { localStorage.setItem('hanliu_account_name', String(acc.name || '')); } catch {}
    await syncUnlocksFromCloud().catch(() => {});
    await loadProfileFromCloud().catch(() => {});
    applyPlayerNameInputState();
    blockingModalOpen = false;
    try { document.body.removeChild(overlay); } catch {}
    const sb = document.getElementById('settingsBtn'); if (sb) sb.hidden = false;
    dismissAuthGateToHome();
    setTimeout(() => {
      try {
        const acc2 = getStoredAccount();
        if (acc2 && acc2.id) {
          const k = `hanliu_first_draw_awarded_${acc2.id}`;
          const done = localStorage.getItem(k) === '1';
          if (!done) { isFirstLoginFreeDraw = true; performDraw(1); isFirstLoginFreeDraw = false; localStorage.setItem(k, '1'); }
        }
      } catch {}
    }, 600);
  });
  deleteBtn.addEventListener('click', async () => {
    const acc = getStoredAccount();
    if (!acc || !acc.id) { status.textContent = '尚未註冊'; return; }
    const pw = String(passInput.value || '').trim();
    if (!pw) { status.textContent = '請輸入密碼以註銷'; return; }
    const h = await deriveAccountHash(pw, acc.salt).catch(() => '');
    if (!h || h !== acc.hash) { status.textContent = '密碼錯誤'; return; }
    status.textContent = '正在註銷...';
    await clearAccountUnlocksCloud(acc).catch(() => {});
    await deleteAccountFromCloud(acc).catch(() => {});
    removeAccountUnlocksLocal(acc.id);
    clearLocalAccount();
    applyPlayerNameInputState();
    status.textContent = '已註銷';
    blockingModalOpen = false;
    try { document.body.removeChild(overlay); } catch {}
    const sb = document.getElementById('settingsBtn'); if (sb) sb.hidden = false;
    openAuthGate();
  });
  modal.appendChild(close);
  modal.appendChild(title);
  modal.appendChild(status);
  modal.appendChild(content);
  content.appendChild(accountSelect);
  content.appendChild(nameLabel);
  content.appendChild(nameInput);
  content.appendChild(passLabel);
  content.appendChild(passInput);
  actions.appendChild(switchBtn);
  actions.appendChild(registerBtn);
  actions.appendChild(loginBtn);
  actions.appendChild(deleteBtn);
  modal.appendChild(actions);
  overlay.appendChild(modal);
  document.body.appendChild(overlay);
  blockingModalOpen = true;
}

function openCloudConfig() {
  const main = document.querySelector('main.container');
  if (!main) return;
  const backdrop = document.getElementById('modalBackdrop');
  if (backdrop) backdrop.hidden = true;
  const startScreen = document.getElementById('startScreen');
  if (startScreen) startScreen.style.display = 'none';
  clearMainContent(true);
  let sec = document.getElementById('cloudConfigDialog');
  if (!sec) {
    sec = document.createElement('section');
    sec.className = 'dialog-container';
    sec.id = 'cloudConfigDialog';
    main.appendChild(sec);
  }
  sec.innerHTML = '';
  const sbtnHide = document.getElementById('settingsBtn'); if (sbtnHide) sbtnHide.hidden = true;
  const title = document.createElement('h2');
  title.className = 'modal-title';
  title.textContent = '雲端排行榜設定';
  const epInput = document.createElement('input');
  epInput.className = 'input';
  epInput.type = 'text';
  epInput.placeholder = 'Endpoint，例如 https://xxx.workers.dev/scores';
  epInput.value = getCloudEndpoint() || '';
  const authInput = document.createElement('input');
  authInput.className = 'input';
  authInput.type = 'text';
  authInput.placeholder = 'Authorization（可空），例如 Bearer xxx';
  authInput.value = getCloudAuth() || '';
  const unlockEpInput = document.createElement('input');
  unlockEpInput.className = 'input';
  unlockEpInput.type = 'text';
  unlockEpInput.placeholder = '圖鑑 Endpoint（可空），例如 https://xxx.workers.dev/unlocks';
  unlockEpInput.value = getUnlockEndpoint() || '';
  const unlockAuthInput = document.createElement('input');
  unlockAuthInput.className = 'input';
  unlockAuthInput.type = 'text';
  unlockAuthInput.placeholder = '圖鑑 Authorization（可空），例如 Bearer xxx';
  unlockAuthInput.value = getUnlockAuth() || '';
  const profileEpInput = document.createElement('input');
  profileEpInput.className = 'input';
  profileEpInput.type = 'text';
  profileEpInput.placeholder = '玩家資料 Endpoint（可空），例如 https://xxx.workers.dev/profile';
  profileEpInput.value = getProfileEndpoint() || '';
  const profileAuthInput = document.createElement('input');
  profileAuthInput.className = 'input';
  profileAuthInput.type = 'text';
  profileAuthInput.placeholder = '玩家資料 Authorization（可空），例如 Bearer xxx';
  profileAuthInput.value = getProfileAuth() || '';
  const accEpInput = document.createElement('input');
  accEpInput.className = 'input';
  accEpInput.type = 'text';
  accEpInput.placeholder = '帳號 Endpoint（可空），例如 https://xxx.workers.dev/accounts';
  accEpInput.value = getAccountEndpoint() || '';
  const accAuthInput = document.createElement('input');
  accAuthInput.className = 'input';
  accAuthInput.type = 'text';
  accAuthInput.placeholder = '帳號 Authorization（可空），例如 Bearer xxx';
  accAuthInput.value = getAccountAuth() || '';
  const status = document.createElement('p');
  status.className = 'dialog-text';
  const actions = document.createElement('div');
  actions.className = 'actions';
  const save = document.createElement('button');
  save.className = 'button';
  save.type = 'button';
  save.textContent = '保存';
  const test = document.createElement('button');
  test.className = 'button';
  test.type = 'button';
  test.textContent = '測試連線';
  const wipe = document.createElement('button');
  wipe.className = 'button';
  wipe.type = 'button';
  wipe.textContent = '清除雲端全部';
  const close = document.createElement('button');
  close.className = 'button';
  close.type = 'button';
  close.textContent = '返回首頁';
  const runExtraTests = () => {
    const uurl = unlockEpInput.value.trim();
    if (uurl) {
      fetch(uurl, { headers: { ...(unlockAuthInput.value.trim() ? { authorization: unlockAuthInput.value.trim() } : {}) } })
        .then(async (r) => {
          const ok = r.ok;
          status.textContent += ok ? '｜圖鑑 OK' : `｜圖鑑失敗 HTTP ${r.status}`;
        })
        .catch(() => { status.textContent += '｜圖鑑失敗'; });
    }
    const aurl = accEpInput.value.trim();
    if (aurl) {
      fetch(aurl, { headers: { ...(accAuthInput.value.trim() ? { authorization: accAuthInput.value.trim() } : {}) } })
        .then(async (r) => {
          const ok = r.ok;
          status.textContent += ok ? '｜帳號 OK' : `｜帳號失敗 HTTP ${r.status}`;
        })
        .catch(() => { status.textContent += '｜帳號失敗'; });
    }
    const purl = profileEpInput.value.trim();
    if (purl) {
      fetch(purl, { headers: { ...(profileAuthInput.value.trim() ? { authorization: profileAuthInput.value.trim() } : {}) } })
        .then(async (r) => {
          const ok = r.ok;
          status.textContent += ok ? '｜資料 OK' : `｜資料失敗 HTTP ${r.status}`;
        })
        .catch(() => { status.textContent += '｜資料失敗'; });
    }
  };
  save.addEventListener('click', () => {
    try { localStorage.setItem('hanliu_cloud_endpoint', epInput.value.trim()); } catch {}
    try { if (authInput.value.trim()) localStorage.setItem('hanliu_cloud_auth', authInput.value.trim()); else localStorage.removeItem('hanliu_cloud_auth'); } catch {}
    try { if (unlockEpInput.value.trim()) localStorage.setItem('hanliu_cloud_unlock_endpoint', unlockEpInput.value.trim()); else localStorage.removeItem('hanliu_cloud_unlock_endpoint'); } catch {}
    try { if (unlockAuthInput.value.trim()) localStorage.setItem('hanliu_cloud_unlock_auth', unlockAuthInput.value.trim()); else localStorage.removeItem('hanliu_cloud_unlock_auth'); } catch {}
    try { if (accEpInput.value.trim()) localStorage.setItem('hanliu_cloud_account_endpoint', accEpInput.value.trim()); else localStorage.removeItem('hanliu_cloud_account_endpoint'); } catch {}
    try { if (accAuthInput.value.trim()) localStorage.setItem('hanliu_cloud_account_auth', accAuthInput.value.trim()); else localStorage.removeItem('hanliu_cloud_account_auth'); } catch {}
    try { if (profileEpInput.value.trim()) localStorage.setItem('hanliu_cloud_profile_endpoint', profileEpInput.value.trim()); else localStorage.removeItem('hanliu_cloud_profile_endpoint'); } catch {}
    try { if (profileAuthInput.value.trim()) localStorage.setItem('hanliu_cloud_profile_auth', profileAuthInput.value.trim()); else localStorage.removeItem('hanliu_cloud_profile_auth'); } catch {}
    status.textContent = '已保存';
  });
  test.addEventListener('click', () => {
    const url = epInput.value.trim();
    if (!url) { status.textContent = '請先填入 Endpoint'; return; }
    fetch(url, { headers: { ...(authInput.value.trim() ? { authorization: authInput.value.trim() } : {}) } })
      .then(async (r) => {
        const txt = await r.text().catch(() => '');
        if (!r.ok) {
          status.textContent = `連線失敗：HTTP ${r.status} ${r.statusText}${txt ? '｜' + txt.slice(0, 160) : ''}`;
          return;
        }
        let data = null;
        try { data = JSON.parse(txt); } catch { data = null; }
        if (Array.isArray(data)) status.textContent = `連線成功，共有 ${data.length} 筆資料`;
        else status.textContent = '連線成功';
      })
      .catch((err) => { status.textContent = `連線失敗：${String(err && err.message || err)}`; })
      .finally(() => { runExtraTests(); });
  });
  close.addEventListener('click', () => {
    navigateHome();
    const sb = document.getElementById('settingsBtn'); if (sb) sb.hidden = false;
  });
  wipe.addEventListener('click', () => {
    const url = epInput.value.trim();
    const authVal = authInput.value.trim();
    if (!url) { status.textContent = '請先填入 Endpoint'; return; }
    try { localStorage.setItem('hanliu_cloud_endpoint', url); } catch {}
    try { if (authVal) localStorage.setItem('hanliu_cloud_auth', authVal); else localStorage.removeItem('hanliu_cloud_auth'); } catch {}
    status.textContent = '正在清除雲端...';
    wipeCloudScores()
      .then(() => { status.textContent = '雲端已清除'; })
      .catch((err) => { status.textContent = `清除失敗：${String(err && err.message || err)}`; });
  });
  close.addEventListener('click', () => { sec.remove(); const start = document.getElementById('startScreen'); if (start) start.style.display = ''; });
  actions.appendChild(save);
  actions.appendChild(test);
  actions.appendChild(wipe);
  actions.appendChild(close);
  sec.appendChild(title);
  sec.appendChild(epInput);
  sec.appendChild(authInput);
  sec.appendChild(unlockEpInput);
  sec.appendChild(unlockAuthInput);
  sec.appendChild(accEpInput);
  sec.appendChild(accAuthInput);
  sec.appendChild(profileEpInput);
  sec.appendChild(profileAuthInput);
  sec.appendChild(status);
  sec.appendChild(actions);
}
// 首頁音量滑桿
const homeVol = document.getElementById('homeVolume');
if (homeVol) {
  homeVol.hidden = true;
  homeVol.value = String(Math.round(getStoredVolume() * 100));
  homeVol.addEventListener('input', () => {
    const val = Math.max(0, Math.min(100, parseInt(homeVol.value, 10) || 0));
    const nv = val / 100;
    bgmVolume = nv;
    if (bgmAudio) bgmAudio.volume = nv;
    setStoredVolume(nv);
  });
}
const homeSfxVol = document.getElementById('homeSfxVolume');
if (homeSfxVol) {
  homeSfxVol.hidden = true;
  homeSfxVol.value = String(Math.round(getStoredSfxVolume() * 100));
  homeSfxVol.addEventListener('input', () => {
    const val = Math.max(0, Math.min(100, parseInt(homeSfxVol.value, 10) || 0));
    const nv = val / 100;
    sfxVolume = nv;
    setStoredSfxVolume(nv);
  });
}
const homeVolToggle = document.getElementById('homeVolumeToggle');
if (homeVolToggle) { homeVolToggle.hidden = true; }

function openHomeVolumeModal() {
  const existing = document.getElementById('homeVolumeBackdrop');
  if (existing) { try { document.body.removeChild(existing); } catch {} return; }
  const overlay = document.createElement('div');
  overlay.id = 'homeVolumeBackdrop';
  overlay.className = 'modal-backdrop';
  const modal = document.createElement('div');
  modal.className = 'modal';
  const title = document.createElement('h2');
  title.className = 'modal-title';
  title.textContent = '音量設定';
  const volWrap = document.createElement('div');
  volWrap.className = 'actions';
  const volLabel = document.createElement('span');
  volLabel.className = 'volume-label';
  volLabel.textContent = '背景音量：';
  const volSlider = document.createElement('input');
  volSlider.type = 'range';
  volSlider.min = '0';
  volSlider.max = '100';
  volSlider.value = String(Math.round(getStoredVolume() * 100));
  volSlider.addEventListener('input', () => {
    const val = Math.max(0, Math.min(100, parseInt(volSlider.value, 10) || 0));
    const nv = val / 100;
    bgmVolume = nv;
    if (bgmAudio) bgmAudio.volume = nv;
    setStoredVolume(nv);
  });
  const sfxLabel = document.createElement('span');
  sfxLabel.className = 'volume-label';
  sfxLabel.textContent = '音效音量：';
  const sfxSlider = document.createElement('input');
  sfxSlider.type = 'range';
  sfxSlider.min = '0';
  sfxSlider.max = '100';
  sfxSlider.value = String(Math.round(getStoredSfxVolume() * 100));
  sfxSlider.addEventListener('input', () => {
    const val = Math.max(0, Math.min(100, parseInt(sfxSlider.value, 10) || 0));
    const nv = val / 100;
    sfxVolume = nv;
    setStoredSfxVolume(nv);
  });
  const bgmGroup = document.createElement('div');
  bgmGroup.style.display = 'flex';
  bgmGroup.style.flexDirection = 'column';
  bgmGroup.style.gap = '0.25rem';
  bgmGroup.appendChild(volLabel);
  bgmGroup.appendChild(volSlider);
  const sfxGroup = document.createElement('div');
  sfxGroup.style.display = 'flex';
  sfxGroup.style.flexDirection = 'column';
  sfxGroup.style.gap = '0.25rem';
  sfxGroup.appendChild(sfxLabel);
  sfxGroup.appendChild(sfxSlider);
  modal.appendChild(title);
  modal.appendChild(volWrap);
  volWrap.appendChild(bgmGroup);
  volWrap.appendChild(sfxGroup);
  overlay.appendChild(modal);
  document.body.appendChild(overlay);
  overlay.addEventListener('click', (e) => { if (e.target === overlay) { try { document.body.removeChild(overlay); } catch {} } });
}
function resetGlobalState() {
  matchScore = 0;
  errorCount = 0;
  orderFailed = false;
  lastRunId = null;
  customNumberFailText = null;
  currentLevel = 1;
  currentLevelIndex = -1;
  cloudSyncDisabled = false;
  isGameOver = false;
  mismatchCounter = 0;
  guestUnlockedIllustrations = new Set();
}

function isAccountBound() {
  try { const n = localStorage.getItem('hanliu_account_name'); return !!(n && String(n).trim()); } catch { return false; }
}
function getAccountName() {
  try { return String(localStorage.getItem('hanliu_account_name') || '').trim(); } catch { return ''; }
}
function applyPlayerNameInputState() {
  const el = document.getElementById('playerName');
  if (!el) return;
  if (isAccountBound() || devModeEnabled) {
    const name = getAccountName() || String(localStorage.getItem('hanliu_player_name') || '').trim();
    const finalName = devModeEnabled ? '開發者' : name;
    el.value = finalName || '開發者';
    el.readOnly = true;
    el.disabled = true;
  } else {
    el.readOnly = false;
    el.disabled = false;
    if (!el.value) el.placeholder = '輸入名字';
  }
}

function isAdminEnabled() {
  try {
    const sp = new URLSearchParams(location.search);
    const q = String(sp.get('admin') || '').trim().toLowerCase();
    if (q === '1' || q === 'true') return true;
  } catch {}
  try { if (typeof devModeEnabled !== 'undefined' && !!devModeEnabled) return true; } catch {}
  return false;
}

function isPreLogin() {
  const gate = document.getElementById('authGate') || document.getElementById('authGateActions');
  const start = document.getElementById('startScreen');
  const gateVisible = !!(gate && gate.style.display !== 'none');
  const startVisible = !!(start && start.style.display !== 'none');
  return gateVisible || startVisible;
}

function openAuthGate() {
  const main = document.querySelector('main.container');
  if (!main) return;
  try {
    Array.from(document.querySelectorAll('.modal-backdrop.active-block')).forEach(el => { try { document.body.removeChild(el); } catch { el.remove(); } });
    Array.from(document.querySelectorAll('.flash-overlay')).forEach(el => { try { document.body.removeChild(el); } catch { el.remove(); } });
    const baseBackdrop = document.getElementById('modalBackdrop');
    if (baseBackdrop) baseBackdrop.hidden = true;
  } catch {}
  const startScreen = document.getElementById('startScreen');
  if (startScreen) startScreen.style.display = 'none';
  const hvb = document.getElementById('homeVolumeToggle'); if (hvb) hvb.hidden = true;
  const hv = document.getElementById('homeVolume'); if (hv) hv.hidden = true;
  const hsv = document.getElementById('homeSfxVolume'); if (hsv) hsv.hidden = true;
  const calHide = document.getElementById('calendarBtn'); if (calHide) calHide.hidden = true;
  hideCoins();
  clearMainContent(true);
  document.documentElement.style.setProperty('--bg-image', 'url("hanliu_auth_bg.png")');
  document.documentElement.style.setProperty('--bg-overlay', 'none');
  const sbtnShow = document.getElementById('settingsBtn');
  if (sbtnShow) sbtnShow.hidden = false;
  const fbBtn = document.getElementById('feedback-btn');
  if (fbBtn) { try { document.body.removeChild(fbBtn); } catch {} }
  const oldSec = document.getElementById('authGate');
  if (oldSec) { try { main.removeChild(oldSec); } catch {} }
  const actions = document.createElement('div');
  actions.className = 'modal-actions';
  actions.id = 'authGateActions';
  actions.style.display = 'flex';
  actions.style.justifyContent = 'center';
  actions.style.gap = '0.75rem';
  actions.style.position = 'fixed';
  actions.style.left = '50%';
  actions.style.transform = 'translateX(-50%)';
  actions.style.bottom = '12vh';
  actions.style.flexWrap = 'wrap';
  actions.style.zIndex = '1000';
  const applyAuthGateLayout = () => {
    const narrow = window.innerWidth < 560;
    actions.style.flexDirection = narrow ? 'column' : 'row';
  };
  applyAuthGateLayout();
  try { if (window.__authGateResizeHandler) window.removeEventListener('resize', window.__authGateResizeHandler); } catch {}
  window.__authGateResizeHandler = debounce(applyAuthGateLayout, 150);
  window.addEventListener('resize', window.__authGateResizeHandler);
  const accountBtn = document.createElement('button');
  accountBtn.className = 'button';
  accountBtn.type = 'button';
  accountBtn.textContent = '註冊 / 登入';
  accountBtn.addEventListener('click', () => { setTimeout(() => { try { openAccountDialog(); } catch {} }, 0); });
  const guestBtn = document.createElement('button');
  guestBtn.className = 'button';
  guestBtn.type = 'button';
  guestBtn.textContent = '以遊客進入';
  guestBtn.addEventListener('click', () => {
    clearLocalAccount();
    document.documentElement.style.setProperty('--bg-image', "url('home.png')");
    document.documentElement.style.setProperty('--bg-overlay', 'none');
    const gateActions = document.getElementById('authGateActions');
    if (gateActions) { try { main.removeChild(gateActions); } catch {} }
    if (startScreen) startScreen.style.display = '';
    const sbtn = document.getElementById('settingsBtn'); if (sbtn) sbtn.hidden = false;
    applyPlayerNameInputState();
    const hvb2 = document.getElementById('homeVolumeToggle'); if (hvb2) hvb2.hidden = false;
    const hv2 = document.getElementById('homeVolume'); if (hv2) hv2.hidden = false;
    const hsv2 = document.getElementById('homeSfxVolume'); if (hsv2) hsv2.hidden = false;
    const cal = document.getElementById('calendarBtn'); if (cal) cal.hidden = false;
    try { input.focus(); } catch {}
    performAutoDailyCheckIn();
    reloadCoins();
    showCoinsOnHome();
  });
  actions.appendChild(accountBtn);
  actions.appendChild(guestBtn);
  main.appendChild(actions);
  try {
    if (!noticeShownOnAuthGate) { noticeShownOnAuthGate = true; openNotice(); }
  } catch {}
}

try { openAuthGate(); } catch {}
