// ===== 「今日互联网人设」卡 =====
// 触发: 第 3 个成就解锁时由 app 调用 show()
// 视觉: 接管 phone 全屏
//   - 主区: 行为人格 (co-author 设计, 14种 + 4组合)
//   - 印章画像 (portrait.js, 接 gpt-image-2 占位)
//   - 成就 slug 次要 / 6 维雷达 / 行为证据 / What AI sees 揭示 / 来源成就
// 行为: 关闭 / 截图分享 (canvas) / 再来一张 / 切风格
import { ACHIEVEMENTS, buildPersona, RARITY, DIMENSIONS, computeDimensions, topDimension, buildEvidence } from './data.js';
import { generatePortrait, PORTRAIT_STYLES } from './portrait.js';

export class PersonaCard {
  constructor(rootEl, tracker) {
    this.root = rootEl;
    this.tracker = tracker;
    this.persona = null;
    this.portraitStyle = 'zine';
    this.portraitSeed  = Math.random();
    this.portraitData  = null;
    this.render();
  }

  showFromState() {
    const list = ACHIEVEMENTS.filter(a => this.tracker.state.unlocked[a.id]);
    this.persona = buildPersona(list, this.tracker.state);
    if (!this.persona) return false;
    this.paint();
    this.refreshPortrait();
    this.el.classList.add('show');
    return true;
  }

  close() { this.el.classList.remove('show'); }

  paint() {
    const p = this.persona;
    if (!p) return;

    // 顶部日期
    this.elDate.textContent = formatDate();

    // ── 行为人格区块 (co-author 主视觉) ──
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

    // ── 成就标签拼接 (次要展示) ──
    if (p.slugs.length > 0) {
      this.elLabel.style.display = '';
      this.elLabel.innerHTML = p.slugs.map((s,i) =>
        `<span class="pe-slug pe-slug-${i}">${s}</span>${i<p.slugs.length-1 ? '<span class="pe-dot">·</span>' : ''}`
      ).join('');
    } else {
      this.elLabel.style.display = 'none';
    }

    // ── 副标 (概率行) ──
    const totalUnlocked = Object.keys(this.tracker.state.unlocked).length;
    if (p.behavior) {
      this.elLine.innerHTML =
        `全球约 <b>${p.behavior.rate}</b> 的用户属于这个类型 · 你解锁了 <b>${totalUnlocked}</b> 个荒诞成就`;
    } else {
      this.elLine.textContent = `解锁了 ${totalUnlocked} 个荒诞成就 · 全球仅 ${p.rate} 用户得到这个组合`;
    }

    // ── 6 维雷达 ──
    const dims = computeDimensions(this.tracker.state);
    const top = topDimension(dims);
    this.elRadar.innerHTML = buildRadarSVG(dims, DIMENSIONS);
    this.elRadarTop.innerHTML = `最突出: <b>${top.label}</b> 含量 <b>${top.value}%</b>`;

    // ── 行为证据 ──
    const evidence = buildEvidence(this.tracker.state);
    this.elEvidence.innerHTML = evidence.map(e => `
      <li class="pe-ev">
        <span class="pe-ev-icon">${e.icon}</span>
        <span class="pe-ev-text">${e.text}</span>
      </li>
    `).join('');

    // ── 来源成就 (横排 icon + name + rate) ──
    this.elSources.innerHTML = p.sources.map(a => {
      const meta = RARITY[a.rarity];
      return `
        <div class="pe-src" style="--rc:${meta.color}">
          <div class="pe-src-icon">${a.icon}</div>
          <div class="pe-src-body">
            <div class="pe-src-name">${a.name}</div>
            <div class="pe-src-rate">${a.rate} · ${meta.label}</div>
          </div>
        </div>
      `;
    }).join('');
  }

  // 重新生成画像 (按钮 / 切风格 / 首次展示时)
  async refreshPortrait({ newSeed = false, style = null } = {}) {
    if (newSeed) this.portraitSeed = Math.random();
    if (style)   this.portraitStyle = style;

    this.elPortrait.classList.add('loading');
    this.elPortraitMsg.textContent = pickLoadingLine();

    const minDelay = new Promise(r => setTimeout(r, 700));
    try {
      const data = await generatePortrait({
        persona: this.persona,
        dims: computeDimensions(this.tracker.state),
        state: this.tracker.state,
        style: this.portraitStyle,
        seed: this.portraitSeed,
        behavior: this.persona?.behavior,  // 让 prompt 用 co-author 的行为人格
      });
      await minDelay;
      this.portraitData = data;
      this.elPortrait.innerHTML = data.svg;
      this.elPortrait.dataset.kind = data.kind;
      this.elPromptText.textContent = data.prompt;
    } catch (e) {
      await minDelay;
      this.elPortrait.innerHTML = `<div class="pe-portrait-err">画像服务咕咕了, 先看人格吧</div>`;
      this.elPromptText.textContent = '— (API 未接通)';
    }
    this.elPortrait.classList.remove('loading');
    this.updateStyleTabs();
  }

  updateStyleTabs() {
    this.root.querySelectorAll('.pe-style-tab').forEach(t => {
      t.classList.toggle('on', t.dataset.style === this.portraitStyle);
    });
  }

  render() {
    const styleTabs = PORTRAIT_STYLES.map(s => `
      <button class="pe-style-tab" data-style="${s.key}">${s.label}</button>
    `).join('');

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

          <!-- 行为人格区块 (co-author 主视觉) -->
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

          <!-- 印章画像 -->
          <div class="pe-portrait-wrap">
            <div class="pe-portrait" id="pePortrait">
              <div class="pe-portrait-skeleton"></div>
            </div>
            <div class="pe-portrait-msg" id="pePortraitMsg">AI 正在勾你的肖像...</div>
            <div class="pe-portrait-controls">
              <button class="pe-portrait-btn" id="pePortraitRoll" title="再来一张">
                <span class="pe-roll-ico">🎲</span><span>再来一张</span>
              </button>
              <div class="pe-style-tabs" id="peStyleTabs">${styleTabs}</div>
            </div>
          </div>

          <!-- 6 维雷达 -->
          <div class="pe-radar-wrap">
            <div class="pe-radar-cap">YOUR 6 DIMENSIONS</div>
            <div class="pe-radar" id="peRadar"></div>
            <div class="pe-radar-top" id="peRadarTop">—</div>
          </div>

          <!-- 行为证据 -->
          <div class="pe-evidence-wrap">
            <div class="pe-evidence-cap">系统从你身上读到这些:</div>
            <ul class="pe-evidence" id="peEvidence"></ul>
          </div>

          <!-- AI 看见的你 (prompt 彩蛋) -->
          <div class="pe-prompt-reveal">
            <div class="pe-prompt-cap">WHAT AI SEES <span class="pe-prompt-sub">— 它在心里这么描述你</span></div>
            <div class="pe-prompt-text" id="pePromptText">—</div>
          </div>

          <!-- 来源成就 -->
          <div class="pe-sources-cap">画像源自这些时刻:</div>
          <div class="pe-sources" id="peSources"></div>

          <!-- 操作 -->
          <div class="pe-actions">
            <button class="pe-btn primary" id="peShare">截图分享 ↗</button>
            <button class="pe-btn ghost" id="peDismiss">先收下</button>
          </div>

          <div class="pe-watermark">由 <b>互联网生存成就系统</b> 综合颁发</div>
        </div>
      </div>
    `;
    this.el            = this.root.querySelector('#pe');
    this.elBehavior    = this.root.querySelector('#peBehavior');
    this.elBpIcon      = this.root.querySelector('#peBpIcon');
    this.elBpCode      = this.root.querySelector('#peBpCode');
    this.elBpName      = this.root.querySelector('#peBpName');
    this.elBpTag       = this.root.querySelector('#peBpTag');
    this.elLabel       = this.root.querySelector('#peLabel');
    this.elLine        = this.root.querySelector('#peLine');
    this.elDate        = this.root.querySelector('#peDate');
    this.elRadar       = this.root.querySelector('#peRadar');
    this.elRadarTop    = this.root.querySelector('#peRadarTop');
    this.elEvidence    = this.root.querySelector('#peEvidence');
    this.elSources     = this.root.querySelector('#peSources');
    this.elPortrait    = this.root.querySelector('#pePortrait');
    this.elPortraitMsg = this.root.querySelector('#pePortraitMsg');
    this.elPromptText  = this.root.querySelector('#pePromptText');

    this.root.querySelector('#peClose').addEventListener('click', ()=>this.close());
    this.root.querySelector('#peDismiss').addEventListener('click', ()=>this.close());
    this.root.querySelector('.pe-scrim').addEventListener('click', ()=>this.close());
    this.root.querySelector('#peShare').addEventListener('click', ()=>this.share());
    this.root.querySelector('#pePortraitRoll').addEventListener('click', ()=>this.refreshPortrait({ newSeed:true }));
    this.root.querySelector('#peStyleTabs').addEventListener('click', e=>{
      const t = e.target.closest('.pe-style-tab');
      if (!t) return;
      if (t.classList.contains('on')) return;
      this.refreshPortrait({ style: t.dataset.style });
    });
  }

  // ========= canvas 截图 =========
  // 布局 (W=720, H=1280):
  //   chrome + 标题 → 行为人格区块 (co-author 主) → 印章 → slug 次要
  //   → 副标 → 雷达 → 证据 → prompt 揭示 → 来源 → 水印
  async share() {
    const p = this.persona;
    if (!p) return;

    const W = 720;
    const cvs = document.createElement('canvas');
    const g0  = document.createElement('canvas').getContext('2d');

    // 先按内容算总高度 (动态)
    const s = this.tracker.state;
    const dims = computeDimensions(s);
    const top  = topDimension(dims);
    const evidence = buildEvidence(s);

    // y 轴跟踪
    let H = 1480; // 预估; 内容多就够用 (后面会按需扩展)
    cvs.width = W; cvs.height = H;
    const g = cvs.getContext('2d');

    // 背景
    const bg = g.createLinearGradient(0,0,0,H);
    bg.addColorStop(0,'#1a1a26');
    bg.addColorStop(1,'#06060c');
    g.fillStyle = bg; g.fillRect(0,0,W,H);

    // ---- 顶部 chrome ----
    g.save();
    g.translate(48, 80);
    g.strokeStyle = '#e8a91d'; g.lineWidth = 2;
    g.font = 'bold 14px "DM Mono", monospace';
    g.fillStyle = '#e8a91d';
    g.rotate(-0.03);
    roundRect(g, 0, 0, 220, 32, 4); g.stroke();
    g.fillText('YOUR INTERNET PERSONA', 14, 21);
    g.restore();

    g.fillStyle = '#8a8d99';
    g.font = '13px "DM Mono", monospace';
    g.fillText(formatDate(), 48, 140);

    g.fillStyle = '#f5f3ec';
    g.font = '28px "ZCOOL QingKe HuangYou", "Noto Serif SC", serif';
    g.fillText('今日互联网人设', 48, 176);

    g.strokeStyle = '#3a3a48'; g.lineWidth = 1;
    g.beginPath(); g.moveTo(48, 200); g.lineTo(W-48, 200); g.stroke();

    // ---- 行为人格区块 (co-author 主视觉) ----
    const rarityColor = { common:'#4f7be8', rare:'#a85fff', epic:'#26c277', mythic:'#e8a91d' };
    let y = 240;
    if (p.behavior) {
      const bCol = rarityColor[p.behavior.rarity] || '#e8a91d';
      g.font = '48px sans-serif';
      centerText(g, p.behavior.icon || '', W/2, y + 12); // icon
      y += 36;

      // 代号
      g.fillStyle = bCol;
      let cs = 64; g.font = `bold ${cs}px "DM Mono", monospace`;
      while (g.measureText(p.behavior.code).width > W - 96 && cs > 32) {
        cs -= 4; g.font = `bold ${cs}px "DM Mono", monospace`;
      }
      centerText(g, p.behavior.code, W/2, y + 50);
      y += 70;

      // 人格名
      g.fillStyle = '#f5f3ec';
      g.font = '30px "ZCOOL KuaiLe", "Noto Serif SC", serif';
      centerText(g, p.behavior.name, W/2, y + 28);
      y += 40;

      // tagline
      g.fillStyle = '#8a8d99';
      g.font = 'italic 17px "Noto Serif SC", serif';
      centerText(g, `"${p.behavior.tagline}"`, W/2, y + 22);
      y += 36;
    } else {
      drawPersonaLabel(g, p.slugs, W/2, y + 90, W-96);
      y += 130;
    }

    // 下装饰线
    g.strokeStyle = '#3a3a48'; g.lineWidth = 1;
    g.beginPath(); g.moveTo(48, y + 12); g.lineTo(W-48, y + 12); g.stroke();
    y += 30;

    // ---- 副标: 概率 + top 维度 ----
    g.fillStyle = '#e8a91d';
    g.font = 'bold 20px "DM Mono", monospace';
    centerText(g, p.behavior ? p.behavior.rate : p.rate, W/2, y + 16);
    g.fillStyle = '#cfd0d6';
    g.font = '14px "Noto Serif SC", serif';
    centerText(g, `${p.behavior ? '用户属于这个类型' : '用户得到这个组合'} · ${top.label}含量 ${top.value}%`, W/2, y + 36);
    y += 56;

    // ---- 印章画像 (插入) ----
    const portraitSize = 280;
    const portraitX = (W - portraitSize) / 2;
    await drawPortraitToCanvas(g, this.portraitData, portraitX, y, portraitSize, portraitSize);
    y += portraitSize + 18;

    // ---- 6 DIMENSIONS ----
    g.fillStyle = '#e8a91d';
    g.font = 'bold 10px "DM Mono", monospace';
    centerText(g, 'YOUR 6 DIMENSIONS', W/2, y);
    drawRadarCanvas(g, dims, DIMENSIONS, W/2, y + 130, 100, '#e8a91d');
    y += 252;

    // ---- 行为证据 ----
    g.fillStyle = '#e8a91d';
    g.font = 'bold 10px "DM Mono", monospace';
    centerText(g, '系统从你身上读到这些', W/2, y);
    y += 14;
    evidence.slice(0, 3).forEach((ev) => {
      g.fillStyle = 'rgba(232,169,29,.06)';
      roundRect(g, 48, y, W-96, 44, 6); g.fill();
      g.strokeStyle = 'rgba(232,169,29,.15)';
      roundRect(g, 48, y, W-96, 44, 6); g.stroke();
      g.font = '20px sans-serif'; g.fillStyle = '#fff';
      g.fillText(ev.icon, 60, y + 28);
      const plain = ev.text.replace(/<\/?b>/g, '');
      g.fillStyle = '#e6e6ec';
      g.font = '13px "Noto Serif SC", serif';
      wrapText(g, plain, 94, y + 26, W-148, 16, 2);
      y += 50;
    });
    y += 8;

    // ---- WHAT AI SEES ----
    g.fillStyle = '#7a8aff';
    g.font = 'bold 10px "DM Mono", monospace';
    g.fillText('WHAT AI SEES:', 48, y);
    y += 14;
    g.fillStyle = '#8a8d99';
    g.font = 'italic 11px "DM Mono", monospace';
    const promptTxt = (this.portraitData?.prompt) || '—';
    wrapText(g, promptTxt, 48, y, W-96, 14, 3);
    y += 50;

    // ---- 来源成就 (简版) ----
    if (p.sources?.length) {
      g.fillStyle = '#8a8d99';
      g.font = 'bold 10px "DM Mono", monospace';
      centerText(g, '画像源自这些时刻', W/2, y);
      y += 18;
      const srcs = p.sources.slice(0, 2);
      const sw = (W - 96 - 16) / Math.max(srcs.length, 1);
      srcs.forEach((a, i) => {
        const x = 48 + i*(sw + 16);
        const meta = RARITY[a.rarity];
        g.fillStyle = 'rgba(255,255,255,.04)';
        roundRect(g, x, y, sw, 48, 6); g.fill();
        g.strokeStyle = hexA(meta.color, .35);
        roundRect(g, x, y, sw, 48, 6); g.stroke();
        g.font = '22px sans-serif'; g.fillStyle = '#fff';
        g.fillText(a.icon, x+12, y+30);
        g.fillStyle = '#f5f3ec';
        g.font = '14px "ZCOOL KuaiLe", serif';
        g.fillText(a.name, x+46, y+22);
        g.fillStyle = meta.color;
        g.font = 'bold 10px "DM Mono", monospace';
        g.fillText(`${a.rate} · ${meta.label}`, x+46, y+38);
      });
      y += 60;
    }

    // ---- 水印 ----
    g.fillStyle = '#4a4d59';
    g.font = '11px "DM Mono", monospace';
    centerText(g, '互联网生存成就系统 · 它一边偷偷看你, 一边给你颁奖', W/2, H-22);

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
  let fs = 64;
  g.font = `${fs}px "ZCOOL KuaiLe", "ZCOOL QingKe HuangYou", serif`;
  const joiner = '  ·  ';
  const text = slugs.join(joiner);
  while (g.measureText(text).width > maxW && fs > 32) {
    fs -= 4;
    g.font = `${fs}px "ZCOOL KuaiLe", "ZCOOL QingKe HuangYou", serif`;
  }
  g.fillStyle = '#f5f3ec';
  if (g.measureText(text).width <= maxW) { centerText(g, text, cx, cy); return; }
  const lineH = fs * 1.15;
  centerText(g, slugs[0], cx, cy - lineH/2);
  g.fillStyle = '#8a8d99';
  centerText(g, '·', cx, cy + lineH/2 - lineH*0.3);
  g.fillStyle = '#f5f3ec';
  centerText(g, slugs[1] || '', cx, cy + lineH/2 + lineH*0.3);
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
function wrapText(g, text, x, y, maxW, lh, maxLines){
  const chars = [...text];
  let line = '', lineCount = 0;
  for (let i = 0; i < chars.length; i++){
    const test = line + chars[i];
    if (g.measureText(test).width > maxW){
      g.fillText(line, x, y);
      line = chars[i];
      y += lh; lineCount++;
      if (lineCount >= maxLines-1){
        const rest = chars.slice(i).join('');
        let trimmed = rest;
        while (g.measureText(trimmed + '…').width > maxW && trimmed.length > 0) trimmed = trimmed.slice(0,-1);
        g.fillText(trimmed + (trimmed.length < rest.length ? '…' : ''), x, y);
        return;
      }
    } else line = test;
  }
  g.fillText(line, x, y);
}
function formatDate() {
  const d = new Date();
  return `${d.getFullYear()}/${String(d.getMonth()+1).padStart(2,'0')}/${String(d.getDate()).padStart(2,'0')} · ${String(d.getHours()).padStart(2,'0')}:${String(d.getMinutes()).padStart(2,'0')}`;
}

const LOADING_LINES = [
  'AI 正在勾你的肖像...',
  '调色板加载中...',
  '正在说服 AI 你长这样...',
  '尝试理解你的眼神...',
  '提笔, 又放下了...',
  '它在你的滑动里找特征...',
  '渲染中, 像素正在排队...',
  '把你的草稿箱也拍进去了...',
];
function pickLoadingLine() {
  return LOADING_LINES[Math.floor(Math.random()*LOADING_LINES.length)];
}

// 把 portraitData 画到 canvas. SVG → Blob URL → Image → drawImage
async function drawPortraitToCanvas(g, portraitData, x, y, w, h) {
  if (!portraitData) {
    g.fillStyle = 'rgba(255,255,255,.04)';
    roundRect(g, x, y, w, h, 12); g.fill();
    g.strokeStyle = 'rgba(232,169,29,.3)';
    g.lineWidth = 1.5;
    roundRect(g, x, y, w, h, 12); g.stroke();
    g.fillStyle = '#8a8d99';
    g.font = '14px "DM Mono", monospace';
    centerText(g, '画像加载中...', x + w/2, y + h/2);
    return;
  }
  let imgSrc;
  if (portraitData.kind === 'stamp') {
    const blob = new Blob([portraitData.svg], { type:'image/svg+xml;charset=utf-8' });
    imgSrc = URL.createObjectURL(blob);
  } else {
    const m = portraitData.svg.match(/src="([^"]+)"/);
    if (!m) return;
    imgSrc = m[1];
  }
  try {
    const img = await loadImage(imgSrc);
    g.save();
    roundClipRect(g, x, y, w, h, 12);
    g.drawImage(img, x, y, w, h);
    g.restore();
    g.strokeStyle = 'rgba(232,169,29,.5)';
    g.lineWidth = 2;
    roundRect(g, x, y, w, h, 12); g.stroke();
  } catch {
    g.fillStyle = '#3a3a48';
    g.font = '14px "DM Mono", monospace';
    centerText(g, '画像渲染失败', x + w/2, y + h/2);
  } finally {
    if (portraitData.kind === 'stamp') URL.revokeObjectURL(imgSrc);
  }
}

function loadImage(src) {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.crossOrigin = 'anonymous';
    img.onload = ()=>resolve(img);
    img.onerror = reject;
    img.src = src;
  });
}

function roundClipRect(g, x, y, w, h, r) {
  g.beginPath();
  g.moveTo(x+r,y);
  g.arcTo(x+w,y,x+w,y+h,r);
  g.arcTo(x+w,y+h,x,y+h,r);
  g.arcTo(x,y+h,x,y,r);
  g.arcTo(x,y,x+w,y,r);
  g.closePath();
  g.clip();
}

// ========= 雷达图: SVG (DOM 卡片用) =========
export function buildRadarSVG(dims, defs) {
  const cx = 120, cy = 120, R = 78;
  const N = defs.length;
  const angles = defs.map((_, i) => -Math.PI/2 + (i * 2*Math.PI / N));
  const pt = (a, r) => [cx + Math.cos(a)*r, cy + Math.sin(a)*r];
  const fmt = (xy) => `${xy[0].toFixed(1)},${xy[1].toFixed(1)}`;

  const rings = [0.25, 0.5, 0.75, 1].map(s => {
    const pts = angles.map(a => fmt(pt(a, R*s))).join(' ');
    return `<polygon points="${pts}" class="rg-ring" />`;
  }).join('');

  const axes = angles.map(a => {
    const [x2,y2] = pt(a, R);
    return `<line x1="${cx}" y1="${cy}" x2="${x2.toFixed(1)}" y2="${y2.toFixed(1)}" class="rg-axis" />`;
  }).join('');

  const dataPts = defs.map((d, i) => {
    const v = Math.max(0, Math.min(100, dims[d.key] || 0));
    return fmt(pt(angles[i], R * v/100));
  }).join(' ');

  const labels = defs.map((d, i) => {
    const a = angles[i];
    const [lx, ly] = pt(a, R + 22);
    const v = dims[d.key] || 0;
    const anchor = Math.abs(Math.cos(a)) < 0.2 ? 'middle' : (Math.cos(a) > 0 ? 'start' : 'end');
    return `
      <g class="rg-lab" text-anchor="${anchor}">
        <text x="${lx.toFixed(1)}" y="${(ly-3).toFixed(1)}" class="rg-lab-name">${d.label}</text>
        <text x="${lx.toFixed(1)}" y="${(ly+11).toFixed(1)}" class="rg-lab-val">${v}</text>
      </g>
    `;
  }).join('');

  const dots = defs.map((d, i) => {
    const v = Math.max(0, Math.min(100, dims[d.key] || 0));
    const [px, py] = pt(angles[i], R * v/100);
    return `<circle cx="${px.toFixed(1)}" cy="${py.toFixed(1)}" r="3" class="rg-dot" />`;
  }).join('');

  return `
    <svg viewBox="0 0 240 240" class="pe-radar-svg" xmlns="http://www.w3.org/2000/svg">
      <g class="rg-grid">${rings}</g>
      <g class="rg-axes">${axes}</g>
      <polygon points="${dataPts}" class="rg-data" />
      ${dots}
      <g class="rg-labs">${labels}</g>
    </svg>
  `;
}

// ========= 雷达图: Canvas (分享图用) =========
export function drawRadarCanvas(g, dims, defs, cx, cy, R, accent='#e8a91d') {
  const N = defs.length;
  const angles = defs.map((_, i) => -Math.PI/2 + (i * 2*Math.PI / N));
  const pt = (a, r) => [cx + Math.cos(a)*r, cy + Math.sin(a)*r];

  [0.25, 0.5, 0.75, 1].forEach((s, idx) => {
    g.beginPath();
    angles.forEach((a, i) => {
      const [x,y] = pt(a, R*s);
      if (i === 0) g.moveTo(x,y); else g.lineTo(x,y);
    });
    g.closePath();
    g.strokeStyle = idx === 3 ? 'rgba(255,255,255,.18)' : 'rgba(255,255,255,.08)';
    g.lineWidth = 1;
    g.stroke();
  });

  g.strokeStyle = 'rgba(255,255,255,.08)';
  g.lineWidth = 1;
  angles.forEach(a => {
    const [x,y] = pt(a, R);
    g.beginPath(); g.moveTo(cx, cy); g.lineTo(x, y); g.stroke();
  });

  g.beginPath();
  defs.forEach((d, i) => {
    const v = Math.max(0, Math.min(100, dims[d.key] || 0));
    const [x,y] = pt(angles[i], R * v/100);
    if (i === 0) g.moveTo(x,y); else g.lineTo(x,y);
  });
  g.closePath();
  g.fillStyle = hexA(accent, .22);
  g.fill();
  g.strokeStyle = accent;
  g.lineWidth = 1.8;
  g.stroke();

  defs.forEach((d, i) => {
    const v = Math.max(0, Math.min(100, dims[d.key] || 0));
    const [x,y] = pt(angles[i], R * v/100);
    g.beginPath(); g.arc(x, y, 3.5, 0, Math.PI*2);
    g.fillStyle = accent; g.fill();
  });

  defs.forEach((d, i) => {
    const a = angles[i];
    const [lx, ly] = pt(a, R + 22);
    const v = dims[d.key] || 0;
    let align = 'center';
    if (Math.cos(a) > 0.2) align = 'left';
    else if (Math.cos(a) < -0.2) align = 'right';
    g.fillStyle = '#f5f3ec';
    g.font = 'bold 13px "ZCOOL KuaiLe", "Noto Serif SC", serif';
    drawAligned(g, d.label, lx, ly, align);
    g.fillStyle = accent;
    g.font = 'bold 12px "DM Mono", monospace';
    drawAligned(g, String(v), lx, ly + 14, align);
  });
}

function drawAligned(g, text, x, y, align) {
  const w = g.measureText(text).width;
  let drawX = x;
  if (align === 'center') drawX = x - w/2;
  else if (align === 'right') drawX = x - w;
  g.fillText(text, drawX, y);
}
