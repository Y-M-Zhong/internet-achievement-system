// ===== 成就弹窗组件 =====
// 提供 enqueue(ach) 与队列，避免连发；含主题切换/粒子/音效
import { RARITY } from './data.js';

const THEME = {
  common:{ rc:'#5b8def', top:'#1a2436', bot:'#10141f' },
  rare:  { rc:'#b76bff', top:'#241a3a', bot:'#140e22' },
  epic:  { rc:'#46e08a', top:'#13301f', bot:'#0a1c12' },
  mythic:{ rc:'#ffc24b', top:'#332512', bot:'#1c1408' },
};

function hexA(hex,a){const n=parseInt(hex.slice(1),16);return `rgba(${n>>16},${(n>>8)&255},${n&255},${a})`;}

export class AchievementPopup {
  constructor(rootEl, { sound = false } = {}) {
    this.root = rootEl;
    this.sound = sound;
    this.queue = [];
    this.busy = false;
    this.audioCtx = null;
    this.onShare = null;          // 外部注入分享回调
    this.render();
  }

  enqueue(ach) {
    this.queue.push(ach);
    if (!this.busy) this.next();
  }

  next() {
    const ach = this.queue.shift();
    if (!ach) { this.busy = false; return; }
    this.busy = true;
    this.show(ach);
  }

  show(ach) {
    const rarity = ach.rarity;
    const t = THEME[rarity];
    const meta = RARITY[rarity];
    const wrap = this.wrap;

    // 主题变量
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
    this.elBadge.textContent = meta.label;
    this.elNum.textContent   = meta.label;
    this.elTitle.textContent = ach.name;
    this.elDesc.textContent  = ach.desc;
    this.elIcon.textContent  = ach.icon;
    this.elNote.textContent  = ach.aiNote;
    this.elTime.textContent  = '刚刚';
    this.elRate.dataset.target = ach.rate;
    this.elRate.textContent = '0%';
    this.buildParticles(rarity);

    wrap.classList.remove('show','fire');
    void wrap.offsetWidth;
    wrap.classList.add('show','fire');
    setTimeout(()=>this.countUp(), 500);
    this.ding(rarity);

    // 自动关闭 + 队列消费
    clearTimeout(this._autoTimer);
    this._autoTimer = setTimeout(()=>this.dismiss(), 4200);
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
      const cur = val*(1 - Math.pow(1 - n/steps, 3));
      el.textContent = cur.toFixed(dec) + '%';
      if (n>=steps) { el.textContent = target; clearInterval(el._iv); }
    }, 22);
  }

  ding(rarity) {
    if (!this.sound) return;
    try {
      this.audioCtx = this.audioCtx || new (window.AudioContext||window.webkitAudioContext)();
      const base = rarity==='mythic'?523 : rarity==='epic'?466 : rarity==='rare'?440 : 392;
      [0,90,180].forEach((delay,k)=>{
        const o = this.audioCtx.createOscillator(), g = this.audioCtx.createGain();
        o.type='triangle'; o.frequency.value = base*Math.pow(1.26,k);
        o.connect(g); g.connect(this.audioCtx.destination);
        const t0 = this.audioCtx.currentTime + delay/1000;
        g.gain.setValueAtTime(0,t0);
        g.gain.linearRampToValueAtTime(.16,t0+.02);
        g.gain.exponentialRampToValueAtTime(.001,t0+.5);
        o.start(t0); o.stop(t0+.55);
      });
    } catch {}
  }

  buildParticles(rarity) {
    const box = this.elParts; box.innerHTML='';
    if (rarity!=='mythic' && rarity!=='epic') return;
    const n = rarity==='mythic' ? 14 : 8;
    for (let i=0;i<n;i++){
      const p = document.createElement('div');
      p.className='p';
      p.style.left = (8+Math.random()*84)+'%';
      p.style.setProperty('--d', (2.4+Math.random()*1.8)+'s');
      p.style.setProperty('--delay', (Math.random()*1.5)+'s');
      const sz = (4+Math.random()*5)+'px';
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
        <div class="banner">ACHIEVEMENT UNLOCKED</div>
        <div class="card" id="achCard">
          <div class="rarity-row">
            <span class="rarity-badge" id="achBadge">普通</span>
            <span class="ai-note" id="achNote">—</span>
          </div>
          <div class="trophy" id="achIcon">🏆</div>
          <div class="ach-title" id="achTitle">—</div>
          <div class="ach-desc"  id="achDesc">—</div>
          <div class="stats">
            <div class="stat"><div class="num" id="achRate">0%</div><div class="lbl">全球解锁率</div></div>
            <div class="stat"><div class="num" id="achNum">—</div><div class="lbl">稀有度</div></div>
            <div class="stat"><div class="num" id="achTime">刚刚</div><div class="lbl">解锁于</div></div>
          </div>
          <div class="ach-actions">
            <button class="ach-btn" data-act="share">分享 ↗</button>
            <button class="ach-btn ghost" data-act="dismiss">收下</button>
          </div>
          <div class="watermark">由 <b>互联网生存成就系统</b> 自动颁发</div>
        </div>
        <div class="particles" id="achParts"></div>
      </div>
    `;
    this.wrap     = this.root.querySelector('#achWrap');
    this.card     = this.root.querySelector('#achCard');
    this.elBadge  = this.root.querySelector('#achBadge');
    this.elNote   = this.root.querySelector('#achNote');
    this.elTitle  = this.root.querySelector('#achTitle');
    this.elDesc   = this.root.querySelector('#achDesc');
    this.elIcon   = this.root.querySelector('#achIcon');
    this.elRate   = this.root.querySelector('#achRate');
    this.elNum    = this.root.querySelector('#achNum');
    this.elTime   = this.root.querySelector('#achTime');
    this.elParts  = this.root.querySelector('#achParts');

    this.wrap.querySelector('.scrim').addEventListener('click', ()=>this.dismiss());
    this.wrap.addEventListener('click', e=>{
      const btn = e.target.closest('.ach-btn'); if (!btn) return;
      if (btn.dataset.act === 'dismiss') this.dismiss();
      if (btn.dataset.act === 'share' && this.onShare) this.onShare();
    });
  }
}
