// ===== 成就弹窗 =====
// 队列管理 / 主题色 / 粒子 / 颁字印章 / 支持动态 HTML 描述 (含 <b> 高亮)
import { RARITY } from './data.js';

const THEME = {
  common: { rc:'#4f7be8', top:'#1a2436', bot:'#0c1018' },
  rare:   { rc:'#a85fff', top:'#2a1c44', bot:'#140e22' },
  epic:   { rc:'#26c277', top:'#102a1e', bot:'#0a1812' },
  mythic: { rc:'#e8a91d', top:'#36280f', bot:'#1a1207' },
};

const hexA = (hex,a) => {
  const n = parseInt(hex.slice(1),16);
  return `rgba(${n>>16},${(n>>8)&255},${n&255},${a})`;
};

export class AchievementPopup {
  constructor(rootEl, { sound = false } = {}) {
    this.root = rootEl;
    this.sound = sound;
    this.queue = [];
    this.busy = false;
    this.audioCtx = null;
    this.onShare = null;
    this.render();
  }

  // item: { ach, desc, narrator } —— desc/narrator 为已固化的字符串(可含 <b>)
  enqueue(item) {
    this.queue.push(item);
    if (!this.busy) this.next();
  }

  next() {
    const item = this.queue.shift();
    if (!item) { this.busy = false; return; }
    this.busy = true;
    this.show(item);
  }

  show({ ach, desc, narrator }) {
    const rarity = ach.rarity;
    const t = THEME[rarity];
    const meta = RARITY[rarity];
    const wrap = this.wrap;

    wrap.style.setProperty('--rc', t.rc);
    wrap.style.setProperty('--rc-08', hexA(t.rc,.08));
    wrap.style.setProperty('--rc-15', hexA(t.rc,.15));
    wrap.style.setProperty('--rc-30', hexA(t.rc,.30));
    wrap.style.setProperty('--rc-40', hexA(t.rc,.40));
    wrap.style.setProperty('--rc-50', hexA(t.rc,.50));
    wrap.style.setProperty('--card-top', t.top);
    wrap.style.setProperty('--card-bot', t.bot);
    wrap.style.setProperty('--flash', meta.flash);

    this.card.classList.toggle('mythic', rarity==='mythic');
    this.elBadge.textContent  = `${meta.label} · ${ach.id}`;
    this.elNum.textContent    = meta.label;
    this.elTitle.textContent  = ach.name;
    // 描述用 innerHTML, 因为可能含 <b> 高亮真实数据
    this.elDesc.innerHTML     = desc || ach.desc;
    this.elIcon.textContent   = ach.icon;
    this.elNote.innerHTML     = narrator || ach.narrator || '—';
    this.elTime.textContent   = '刚刚';
    this.elRate.dataset.target = ach.rate;
    this.elRate.textContent   = '0%';
    this.buildParticles(rarity);

    wrap.classList.remove('show','fire');
    void wrap.offsetWidth;
    wrap.classList.add('show','fire');
    setTimeout(()=>this.countUp(), 500);
    this.ding(rarity);

    clearTimeout(this._autoTimer);
    // 神话级停长一点
    const dur = rarity==='mythic' ? 5200 : 4400;
    this._autoTimer = setTimeout(()=>this.dismiss(), dur);
  }

  dismiss() {
    this.wrap.classList.remove('show','fire');
    setTimeout(()=>this.next(), 350);
  }

  countUp() {
    const el = this.elRate;
    const target = el.dataset.target || '0%';
    const val = parseFloat(target);
    const dec = target.includes('.') ? 1 : 0;
    let n = 0; const steps = 28;
    clearInterval(el._iv);
    el._iv = setInterval(()=>{
      n++;
      const cur = val * (1 - Math.pow(1 - n/steps, 3));
      el.textContent = cur.toFixed(dec) + '%';
      if (n >= steps) { el.textContent = target; clearInterval(el._iv); }
    }, 22);
  }

  ding(rarity) {
    if (!this.sound) return;
    try {
      this.audioCtx = this.audioCtx || new (window.AudioContext||window.webkitAudioContext)();
      const base = rarity==='mythic'?523 : rarity==='epic'?466 : rarity==='rare'?440 : 392;
      [0,90,180].forEach((delay,k)=>{
        const o = this.audioCtx.createOscillator(), g = this.audioCtx.createGain();
        o.type = 'triangle'; o.frequency.value = base * Math.pow(1.26,k);
        o.connect(g); g.connect(this.audioCtx.destination);
        const t0 = this.audioCtx.currentTime + delay/1000;
        g.gain.setValueAtTime(0, t0);
        g.gain.linearRampToValueAtTime(.16, t0+.02);
        g.gain.exponentialRampToValueAtTime(.001, t0+.5);
        o.start(t0); o.stop(t0+.55);
      });
    } catch {}
  }

  buildParticles(rarity) {
    const box = this.elParts; box.innerHTML = '';
    if (rarity !== 'mythic' && rarity !== 'epic') return;
    const n = rarity === 'mythic' ? 14 : 8;
    for (let i = 0; i < n; i++){
      const p = document.createElement('div');
      p.className = 'p';
      p.style.left = (8 + Math.random()*84) + '%';
      p.style.setProperty('--d', (2.4 + Math.random()*1.8) + 's');
      p.style.setProperty('--delay', (Math.random()*1.5) + 's');
      const sz = (4 + Math.random()*5) + 'px';
      p.style.width = p.style.height = sz;
      box.appendChild(p);
    }
  }

  setSound(on) { this.sound = on; }

  render() {
    this.root.innerHTML = `
      <div class="ach-wrap" id="achWrap">
        <div class="scrim"></div>
        <div class="flash"></div>
        <div class="banner">
          <span class="b-line"></span>
          <span class="b-text">ACHIEVEMENT UNLOCKED</span>
          <span class="b-line"></span>
        </div>
        <div class="card" id="achCard">
          <div class="rarity-row">
            <span class="rarity-badge" id="achBadge">普通</span>
            <span class="ai-note" id="achNote">—</span>
          </div>
          <div class="trophy-icon" id="achIcon">🏆</div>
          <div class="ach-title" id="achTitle">—</div>
          <div class="ach-desc"  id="achDesc">—</div>
          <div class="stats">
            <div class="stat"><div class="num" id="achRate">0%</div><div class="lbl">全球解锁率</div></div>
            <div class="stat"><div class="num" id="achNum">—</div><div class="lbl">稀有度</div></div>
            <div class="stat"><div class="num" id="achTime">刚刚</div><div class="lbl">解锁于</div></div>
          </div>
          <div class="ach-actions">
            <button class="ach-btn" data-act="share">截图分享 ↗</button>
            <button class="ach-btn ghost" data-act="dismiss">收下</button>
          </div>
          <div class="watermark">由 <b>互联网生存成就系统</b> 自动颁发</div>
        </div>
        <div class="particles" id="achParts"></div>
      </div>
    `;
    this.wrap    = this.root.querySelector('#achWrap');
    this.card    = this.root.querySelector('#achCard');
    this.elBadge = this.root.querySelector('#achBadge');
    this.elNote  = this.root.querySelector('#achNote');
    this.elTitle = this.root.querySelector('#achTitle');
    this.elDesc  = this.root.querySelector('#achDesc');
    this.elIcon  = this.root.querySelector('#achIcon');
    this.elRate  = this.root.querySelector('#achRate');
    this.elNum   = this.root.querySelector('#achNum');
    this.elTime  = this.root.querySelector('#achTime');
    this.elParts = this.root.querySelector('#achParts');

    this.wrap.querySelector('.scrim').addEventListener('click', ()=>this.dismiss());
    this.wrap.addEventListener('click', e=>{
      const btn = e.target.closest('.ach-btn');
      if (!btn) return;
      if (btn.dataset.act === 'dismiss') this.dismiss();
      if (btn.dataset.act === 'share' && this.onShare) this.onShare();
    });
  }
}
