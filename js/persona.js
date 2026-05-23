// ===== 「今日互联网人设」卡 =====
// 触发: 第 4 个成就解锁时由 app 调用 show()
// 视觉: 接管 phone 全屏, 上下两段装饰线, 中间是巨大的拼接 slug
// 行为: 关闭 + 截图分享 (canvas)
import { ACHIEVEMENTS, buildPersona, RARITY } from './data.js';

export class PersonaCard {
  constructor(rootEl, tracker) {
    this.root = rootEl;
    this.tracker = tracker;
    this.persona = null;
    this.render();
  }

  // 根据当前 unlocked 计算并展示
  showFromState() {
    const list = ACHIEVEMENTS.filter(a => this.tracker.state.unlocked[a.id]);
    this.persona = buildPersona(list, this.tracker.state);
    if (!this.persona) return false;
    this.paint();
    this.el.classList.add('show');
    return true;
  }

  close() { this.el.classList.remove('show'); }

  paint() {
    const p = this.persona;
    if (!p) return;

    // 顶部日期
    this.elDate.textContent = formatDate();

    // ── 行为人格区块 ──
    const rarityColor = { common:'#4f7be8', rare:'#a85fff', epic:'#26c277', mythic:'#e8a91d' };
    if (p.behavior) {
      const col = rarityColor[p.behavior.rarity] || '#e8a91d';
      this.elBehavior.style.display = '';
      this.elBpIcon.textContent   = p.behavior.icon || '';
      this.elBpCode.textContent   = p.behavior.code;
      this.elBpCode.style.color   = col;
      this.elBpCode.style.textShadow = `0 0 40px ${col}66`;
      this.elBpName.textContent   = p.behavior.name;
      this.elBpTag.textContent    = `"${p.behavior.tagline}"`;
      if (p.behavior.isCombo) this.elBpCode.classList.add('pe-bp-combo');
      else this.elBpCode.classList.remove('pe-bp-combo');
    } else {
      this.elBehavior.style.display = 'none';
    }

    // ── 成就标签拼接（次要展示） ──
    if (p.slugs.length > 0) {
      this.elLabel.style.display = '';
      this.elLabel.innerHTML = p.slugs.map((s,i) =>
        `<span class="pe-slug pe-slug-${i}">${s}</span>${i<p.slugs.length-1 ? '<span class="pe-dot">·</span>' : ''}`
      ).join('');
    } else {
      this.elLabel.style.display = 'none';
    }

    // ── 副标（概率行） ──
    const totalUnlocked = Object.keys(this.tracker.state.unlocked).length;
    if (p.behavior) {
      this.elLine.innerHTML =
        `全球约 <b>${p.behavior.rate}</b> 的用户属于这个类型 · 你解锁了 <b>${totalUnlocked}</b> 个荒诞成就`;
    } else {
      this.elLine.textContent = `解锁了 ${totalUnlocked} 个荒诞成就 · 全球仅 ${p.rate} 用户得到这个组合`;
    }

    // ── 来源成就 ──
    this.elSources.innerHTML = p.sources.map(a => {
      const meta = RARITY[a.rarity];
      return `
        <div class="pe-src" style="--rc:${meta.color}">
          <div class="pe-src-icon">${a.icon}</div>
          <div class="pe-src-name">${a.name}</div>
          <div class="pe-src-rate">${a.rate} · ${meta.label}</div>
        </div>
      `;
    }).join('');

    // ── 行为摘要 ──
    const s = this.tracker.state;
    const min = Math.floor((Date.now()-s.startTs)/60_000);
    this.elSummary.innerHTML = `
      <div class="pe-sum-row">在线 <b>${min}</b> 分钟 · 滑动 <b>${s.swipes}</b> 次 · 点赞 <b>${s.likes}</b> · 收藏 <b>${s.saves}</b></div>
    `;
  }

  render() {
    this.root.innerHTML = `
      <div class="persona" id="pe">
        <div class="pe-scrim"></div>
        <div class="pe-sheet">
          <!-- 顶部 chrome -->
          <div class="pe-top">
            <span class="pe-tag">YOUR INTERNET PERSONA</span>
            <button class="pe-close" id="peClose">×</button>
          </div>

          <!-- 标题 -->
          <div class="pe-head">
            <div class="pe-cap">今日互联网人设</div>
            <div class="pe-date" id="peDate">—</div>
          </div>

          <!-- 行为人格区块 (主要) -->
          <div class="pe-band pe-band-top"></div>
          <div class="pe-behavior" id="peBehavior">
            <div class="pe-bp-icon" id="peBpIcon"></div>
            <div class="pe-bp-code" id="peBpCode">—</div>
            <div class="pe-bp-name" id="peBpName">—</div>
            <div class="pe-bp-tag" id="peBpTag">—</div>
          </div>
          <div class="pe-band pe-band-bot"></div>

          <!-- 副标 -->
          <div class="pe-line" id="peLine">—</div>

          <!-- 成就标签 (次要) -->
          <div class="pe-label" id="peLabel"></div>

          <!-- 来源成就 -->
          <div class="pe-sources" id="peSources"></div>

          <!-- 行为摘要 -->
          <div class="pe-summary" id="peSummary"></div>

          <!-- 操作 -->
          <div class="pe-actions">
            <button class="pe-btn primary" id="peShare">截图分享 ↗</button>
            <button class="pe-btn ghost" id="peDismiss">先收下</button>
          </div>

          <div class="pe-watermark">由 <b>互联网生存成就系统</b> 综合颁发</div>
        </div>
      </div>
    `;
    this.el         = this.root.querySelector('#pe');
    this.elBehavior = this.root.querySelector('#peBehavior');
    this.elBpIcon   = this.root.querySelector('#peBpIcon');
    this.elBpCode   = this.root.querySelector('#peBpCode');
    this.elBpName   = this.root.querySelector('#peBpName');
    this.elBpTag    = this.root.querySelector('#peBpTag');
    this.elLabel    = this.root.querySelector('#peLabel');
    this.elLine     = this.root.querySelector('#peLine');
    this.elDate     = this.root.querySelector('#peDate');
    this.elSources  = this.root.querySelector('#peSources');
    this.elSummary  = this.root.querySelector('#peSummary');

    this.root.querySelector('#peClose').addEventListener('click', ()=>this.close());
    this.root.querySelector('#peDismiss').addEventListener('click', ()=>this.close());
    this.root.querySelector('.pe-scrim').addEventListener('click', ()=>this.close());
    this.root.querySelector('#peShare').addEventListener('click', ()=>this.share());
  }

  // ========= canvas 截图 =========
  async share() {
    const p = this.persona;
    if (!p) return;

    const W = 720, H = 1280;     // 9:16 适合分享
    const cvs = document.createElement('canvas');
    cvs.width = W; cvs.height = H;
    const g = cvs.getContext('2d');

    // 背景 (米色 / 印刷)
    const bg = g.createLinearGradient(0,0,0,H);
    bg.addColorStop(0,'#1a1a26');
    bg.addColorStop(1,'#06060c');
    g.fillStyle = bg; g.fillRect(0,0,W,H);

    // 顶部"档案"
    g.save();
    g.translate(48, 80);
    g.strokeStyle = '#e8a91d'; g.lineWidth = 2;
    g.font = 'bold 16px "DM Mono","JetBrains Mono",monospace';
    g.fillStyle = '#e8a91d';
    g.rotate(-0.03);
    roundRect(g, 0, 0, 240, 36, 4); g.stroke();
    g.fillText('YOUR INTERNET PERSONA', 16, 24);
    g.restore();

    // 日期
    g.fillStyle = '#8a8d99';
    g.font = '14px "DM Mono", monospace';
    g.fillText(formatDate(), 48, 152);

    // 主标
    g.fillStyle = '#f5f3ec';
    g.font = '36px "ZCOOL QingKe HuangYou", "Noto Serif SC", serif';
    g.fillText('今日互联网人设', 48, 240);

    // 上装饰线
    g.strokeStyle = '#3a3a48'; g.lineWidth = 1;
    g.beginPath(); g.moveTo(48, 280); g.lineTo(W-48, 280); g.stroke();

    // ── 行为人格区块 ──
    const rarityColor = { common:'#4f7be8', rare:'#a85fff', epic:'#26c277', mythic:'#e8a91d' };
    if (p.behavior) {
      const bCol = rarityColor[p.behavior.rarity] || '#e8a91d';

      // icon
      g.font = '52px sans-serif';
      centerText(g, p.behavior.icon || '', W/2, 370);

      // 代号 (大)
      g.fillStyle = bCol;
      const codeText = p.behavior.code;
      let codeFontSize = 72;
      g.font = `bold ${codeFontSize}px "DM Mono", monospace`;
      while (g.measureText(codeText).width > W - 96 && codeFontSize > 36) {
        codeFontSize -= 4;
        g.font = `bold ${codeFontSize}px "DM Mono", monospace`;
      }
      centerText(g, codeText, W/2, 460);

      // 人格名
      g.fillStyle = '#f5f3ec';
      g.font = '36px "ZCOOL KuaiLe", "Noto Serif SC", serif';
      centerText(g, p.behavior.name, W/2, 520);

      // tagline
      g.fillStyle = '#8a8d99';
      g.font = 'italic 20px "Noto Serif SC", serif';
      centerText(g, `"${p.behavior.tagline}"`, W/2, 568);
    } else {
      // 无行为人格时，回退到成就标签大字
      drawPersonaLabel(g, p.slugs, W/2, 470, W-96);
    }

    // 下装饰线
    g.beginPath(); g.moveTo(48, 610); g.lineTo(W-48, 610); g.stroke();

    // 副标 (居中)
    const s = this.tracker.state;
    const totalUnlocked = Object.keys(s.unlocked).length;
    if (p.behavior) {
      g.fillStyle = '#e8a91d';
      g.font = 'bold 22px "DM Mono", monospace';
      centerText(g, `${p.behavior.rate}`, W/2, 664);

      g.fillStyle = '#cfd0d6';
      g.font = '18px "Noto Serif SC", serif';
      centerText(g, `全球用户属于这个类型的概率`, W/2, 698);

      g.fillStyle = '#8a8d99';
      g.font = '15px "Noto Serif SC", serif';
      centerText(g, `· 你解锁了 ${totalUnlocked} 个荒诞成就 ·`, W/2, 730);
    } else {
      g.fillStyle = '#e8a91d';
      g.font = 'bold 22px "DM Mono", monospace';
      centerText(g, `${p.rate}`, W/2, 664);

      g.fillStyle = '#cfd0d6';
      g.font = '18px "Noto Serif SC", serif';
      centerText(g, `全球用户得到这个组合的概率`, W/2, 698);

      g.fillStyle = '#8a8d99';
      g.font = '15px "Noto Serif SC", serif';
      centerText(g, `· 你解锁了 ${totalUnlocked} 个荒诞成就 ·`, W/2, 730);
    }

    // 来源 cards (居中两个)
    drawSources(g, p.sources, W, 780);

    // 行为摘要
    const min = Math.floor((Date.now()-s.startTs)/60_000);
    g.fillStyle = '#8a8d99';
    g.font = '15px "DM Mono", monospace';
    centerText(g,
      `在线 ${min} 分钟  ·  滑动 ${s.swipes}  ·  点赞 ${s.likes}  ·  收藏 ${s.saves}`,
      W/2, H-160);

    // 底部水印
    g.fillStyle = '#4a4d59';
    g.font = '13px "DM Mono", monospace';
    centerText(g, '互联网生存成就系统', W/2, H-100);

    g.fillStyle = '#2a2a36';
    g.font = '12px "Noto Serif SC", serif';
    g.fillStyle = '#3a3a48';
    centerText(g, '它一边偷偷看你, 一边给你颁奖。', W/2, H-72);

    const dataURL = cvs.toDataURL('image/png');
    if (navigator.canShare) {
      try {
        const blob = await (await fetch(dataURL)).blob();
        const file = new File([blob], '我的互联网人设.png', { type:'image/png' });
        if (navigator.canShare({ files: [file] })) {
          await navigator.share({ files: [file], title:'今日互联网人设' });
          return;
        }
      } catch {}
    }
    const a = document.createElement('a');
    a.href = dataURL;
    a.download = `我的互联网人设-${Date.now()}.png`;
    document.body.appendChild(a); a.click(); a.remove();
  }
}

// ========= canvas 帮助 =========
function drawPersonaLabel(g, slugs, cx, cy, maxW) {
  // 自适应字号: 让总宽不超过 maxW
  let fs = 78;
  g.font = `${fs}px "ZCOOL KuaiLe", "ZCOOL QingKe HuangYou", serif`;
  const joiner = '  ·  ';
  const text = slugs.join(joiner);
  while (g.measureText(text).width > maxW && fs > 36) {
    fs -= 4;
    g.font = `${fs}px "ZCOOL KuaiLe", "ZCOOL QingKe HuangYou", serif`;
  }
  // 单行画法
  g.fillStyle = '#f5f3ec';
  if (g.measureText(text).width <= maxW) {
    centerText(g, text, cx, cy);
    return;
  }
  // 太长 → 两行
  const lineH = fs * 1.15;
  centerText(g, slugs[0], cx, cy - lineH/2);
  g.fillStyle = '#8a8d99';
  centerText(g, '·', cx, cy + lineH/2 - lineH*0.3);
  g.fillStyle = '#f5f3ec';
  centerText(g, slugs[1] || '', cx, cy + lineH/2 + lineH*0.3);
}

function drawSources(g, sources, W, y) {
  const cardW = 280, cardH = 120, gap = 24;
  const totalW = sources.length * cardW + (sources.length-1) * gap;
  let x = (W - totalW) / 2;
  sources.forEach(a => {
    const meta = RARITY[a.rarity];

    g.fillStyle = 'rgba(255,255,255,.04)';
    roundRect(g, x, y, cardW, cardH, 10); g.fill();
    g.strokeStyle = hexA(meta.color, .4); g.lineWidth = 1;
    roundRect(g, x, y, cardW, cardH, 10); g.stroke();

    // 稀有度
    g.fillStyle = meta.color;
    g.font = 'bold 11px "DM Mono", monospace';
    g.fillText(meta.label.toUpperCase(), x+18, y+24);

    // icon
    g.font = '38px sans-serif';
    g.fillText(a.icon, x+18, y+70);

    // 名称
    g.fillStyle = '#fff';
    g.font = '18px "ZCOOL KuaiLe", serif';
    g.fillText(a.name, x+72, y+62);

    // rate
    g.fillStyle = '#aab3c6';
    g.font = '13px "DM Mono", monospace';
    g.fillText(`${a.rate}  ·  ${meta.label}`, x+72, y+88);

    x += cardW + gap;
  });
}

function hexA(hex,a){const n=parseInt(hex.slice(1),16);return `rgba(${n>>16},${(n>>8)&255},${n&255},${a})`;}
function roundRect(g,x,y,w,h,r){
  g.beginPath();
  g.moveTo(x+r,y);
  g.arcTo(x+w,y,x+w,y+h,r);
  g.arcTo(x+w,y+h,x,y+h,r);
  g.arcTo(x,y+h,x,y,r);
  g.arcTo(x,y,x+w,y,r);
  g.closePath();
}
function centerText(g, text, cx, y) {
  const w = g.measureText(text).width;
  g.fillText(text, cx - w/2, y);
}
function formatDate() {
  const d = new Date();
  return `${d.getFullYear()}/${String(d.getMonth()+1).padStart(2,'0')}/${String(d.getDate()).padStart(2,'0')} · ${String(d.getHours()).padStart(2,'0')}:${String(d.getMinutes()).padStart(2,'0')}`;
}
