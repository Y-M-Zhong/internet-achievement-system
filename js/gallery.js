// ===== 成就馆 (档案本风) =====
// 用 unlock 记录里固化的 desc/narrator (含 <b>) 渲染, 已解锁=动态文案, 未解锁=静态文案
import { ACHIEVEMENTS, RARITY, getArchetype, buildPersona } from './data.js';

export class Gallery {
  constructor(rootEl, tracker, { onShowPersona } = {}) {
    this.root = rootEl;
    this.tracker = tracker;
    this.onShowPersona = onShowPersona;
    this.render();
  }

  open()  { this.refresh(); this.el.classList.add('show'); }
  close() { this.el.classList.remove('show'); }

  refresh() {
    const s = this.tracker.state;
    const unlocked = s.unlocked;
    const total = ACHIEVEMENTS.length;
    const got = Object.keys(unlocked).length;
    this.elCount.textContent = `${got}/${total}`;
    this.elRatio.style.width = `${(got/total*100).toFixed(1)}%`;

    // archetype
    const arche = getArchetype(s);
    this.elArcheLabel.textContent = arche.label;
    this.elArcheSub.textContent   = arche.sub;
    this.elArcheNum.textContent   = String(got).padStart(2,'0');

    // 数字概览
    this.elStats.innerHTML = `
      <div class="gal-stat"><div class="n">${s.swipes}</div><div class="l">SWIPES</div></div>
      <div class="gal-stat"><div class="n">${s.likes}</div><div class="l">LIKES</div></div>
      <div class="gal-stat"><div class="n">${s.saves}</div><div class="l">SAVES</div></div>
      <div class="gal-stat"><div class="n">${s.commentOpens}</div><div class="l">COMMENTS</div></div>
    `;

    // 人设条
    const list = ACHIEVEMENTS.filter(a => unlocked[a.id]);
    const persona = buildPersona(list);
    if (persona && got >= 4) {
      this.elPersonaBar.style.display = '';
      this.elPersonaBar.innerHTML = `
        <div class="pb-info">
          <div class="pb-cap">YOUR PERSONA</div>
          <div class="pb-label">${persona.label}</div>
          <div class="pb-rate">${persona.rate} 用户得到这个组合</div>
        </div>
        <button class="pb-btn" id="pbShow">查看 ↗</button>
      `;
      const btn = this.elPersonaBar.querySelector('#pbShow');
      btn?.addEventListener('click', ()=>{ this.close(); this.onShowPersona?.(); });
    } else {
      this.elPersonaBar.style.display = 'none';
      this.elPersonaBar.innerHTML = '';
    }

    // 分组卡片
    const groups = ['mythic','epic','rare','common'];
    let html = '';
    for (const g of groups) {
      const items = ACHIEVEMENTS.filter(a => a.rarity === g);
      const meta = RARITY[g];
      const gotN = items.filter(a => unlocked[a.id]).length;
      html += `<div class="gp-head" style="color:${meta.color}">
        <span>${meta.label.toUpperCase()}</span>
        <span class="gp-bar"></span>
        <span class="gp-mute">${gotN}/${items.length}</span>
      </div>`;
      html += '<div class="gp-grid">';
      for (const a of items) {
        const rec = unlocked[a.id];
        const ok = !!rec;
        // 已解锁 → 用固化的 desc (含 <b>); 未解锁 → 提示语
        const descHtml = ok ? (rec.desc || a.desc) : '尚未触发, 再刷一会儿';
        const name = ok ? a.name : '???';
        html += `
          <div class="gp-card ${ok?'ok':''}" style="--rc:${meta.color}; --rc-30:${hexA(meta.color,.30)}">
            <div class="gp-icon">${ok ? a.icon : '🔒'}</div>
            <div class="gp-name">${name}</div>
            <div class="gp-desc">${descHtml}</div>
            <div class="gp-foot">
              <span>${a.rate}</span>
              <span class="gp-rare">${meta.label}</span>
            </div>
          </div>`;
      }
      html += '</div>';
    }
    this.elList.innerHTML = html;
  }

  render() {
    this.root.innerHTML = `
      <div class="gallery" id="gal">
        <div class="gal-head">
          <span class="gal-tag">FILE · 你的档案</span>
          <div class="gal-title">互联网生存档案</div>
          <div class="gal-sub">系统替你存档了一些你不愿承认的瞬间。</div>
          <button class="gal-close" id="galClose" aria-label="关闭">×</button>
        </div>

        <div class="gal-arche">
          <div class="a-num" id="galArcheNum">00</div>
          <div class="a-body">
            <div class="a-cap">YOUR ARCHETYPE</div>
            <div class="a-label" id="galArcheLabel">还在观察中</div>
            <div class="a-sub" id="galArcheSub">再刷一会儿, 系统就能误读你</div>
          </div>
        </div>

        <div class="gal-persona-bar" id="galPersonaBar"></div>

        <div class="gal-stats" id="galStats"></div>

        <div class="gal-progress">
          <div class="gal-progress-row">
            <span>OVERALL UNLOCK</span>
            <b id="galCount">0/0</b>
          </div>
          <div class="gal-bar"><div class="gal-bar-fill" id="galRatio"></div></div>
        </div>

        <div class="gal-list" id="galList"></div>

        <div class="gal-foot">
          <button class="gal-btn primary" id="galShare">截图分享我的档案 📸</button>
          <button class="gal-btn ghost"   id="galReset">清空</button>
        </div>
      </div>
    `;
    this.el            = this.root.querySelector('#gal');
    this.elCount       = this.root.querySelector('#galCount');
    this.elRatio       = this.root.querySelector('#galRatio');
    this.elList        = this.root.querySelector('#galList');
    this.elArcheNum    = this.root.querySelector('#galArcheNum');
    this.elArcheLabel  = this.root.querySelector('#galArcheLabel');
    this.elArcheSub    = this.root.querySelector('#galArcheSub');
    this.elStats       = this.root.querySelector('#galStats');
    this.elPersonaBar  = this.root.querySelector('#galPersonaBar');

    this.root.querySelector('#galClose').addEventListener('click', ()=>this.close());
    this.root.querySelector('#galShare').addEventListener('click', ()=>this.shareWall());
    this.root.querySelector('#galReset').addEventListener('click', ()=>{
      if (confirm('清空所有解锁记录, 重新开始?')) { this.tracker.reset(); this.refresh(); }
    });
  }

  // ========= 截图: 档案本 =========
  async shareWall() {
    const s = this.tracker.state;
    const arche = getArchetype(s);
    const unlocked = ACHIEVEMENTS.filter(a => s.unlocked[a.id]);

    const W = 800, padding = 36;
    const cols = 3, gap = 14;
    const cellW = (W - padding*2 - gap*(cols-1)) / cols;
    const cellH = 138;
    const rows = Math.max(Math.ceil(unlocked.length/cols), 1);
    const H = 320 + rows*cellH + (rows-1)*gap + 80;

    const cvs = document.createElement('canvas');
    cvs.width = W; cvs.height = H;
    const g = cvs.getContext('2d');

    const bg = g.createLinearGradient(0,0,0,H);
    bg.addColorStop(0,'#1a1a26');
    bg.addColorStop(1,'#0a0a10');
    g.fillStyle = bg; g.fillRect(0,0,W,H);

    g.save();
    g.translate(padding, 56);
    g.rotate(-0.04);
    g.fillStyle = '#e8a91d';
    g.strokeStyle = '#e8a91d'; g.lineWidth = 1.5;
    roundRect(g, 0, 0, 96, 26, 3); g.stroke();
    g.font = 'bold 11px "DM Mono","JetBrains Mono",monospace';
    g.fillText('FILE · 你的档案', 10, 17);
    g.restore();

    g.fillStyle = '#f5f3ec';
    g.font = '900 38px "ZCOOL QingKe HuangYou", "Noto Serif SC", serif';
    g.fillText('互联网生存档案', padding, 132);

    g.fillStyle = '#8a8d99';
    g.font = 'italic 14px "Noto Serif SC", serif';
    g.fillText(`${new Date().toLocaleString('zh-CN')} · 已颁发 ${unlocked.length}/${ACHIEVEMENTS.length}`, padding, 156);

    g.fillStyle = 'rgba(232,169,29,.08)';
    roundRect(g, padding, 180, W-padding*2, 78, 10); g.fill();
    g.strokeStyle = 'rgba(255,255,255,.08)';
    roundRect(g, padding, 180, W-padding*2, 78, 10); g.stroke();

    g.fillStyle = '#e8a91d';
    g.font = '700 42px "ZCOOL QingKe HuangYou", serif';
    g.fillText(String(unlocked.length).padStart(2,'0'), padding+18, 232);

    g.fillStyle = '#8a8d99';
    g.font = 'bold 10px "DM Mono",monospace';
    g.fillText('YOUR ARCHETYPE', padding+92, 204);
    g.fillStyle = '#f5f3ec';
    g.font = '400 22px "ZCOOL KuaiLe", serif';
    g.fillText(arche.label, padding+92, 228);
    g.fillStyle = '#cfd0d6';
    g.font = 'italic 13px "Noto Serif SC", serif';
    g.fillText(arche.sub, padding+92, 248);

    let startY = 290;

    if (unlocked.length === 0) {
      g.fillStyle = '#8a8d99';
      g.font = '15px "Noto Serif SC", serif';
      g.fillText('档案空空, 多刷一会儿就有内容了。', padding, startY+30);
    } else {
      unlocked.forEach((a,i) => {
        const c = i % cols, r = Math.floor(i / cols);
        const x = padding + c*(cellW+gap);
        const y = startY + r*(cellH+gap);
        const meta = RARITY[a.rarity];
        const rec = s.unlocked[a.id];

        g.fillStyle = 'rgba(255,255,255,.04)';
        roundRect(g, x, y, cellW, cellH, 8); g.fill();
        g.strokeStyle = hexA(meta.color, .35);
        roundRect(g, x, y, cellW, cellH, 8); g.stroke();

        g.font = '32px sans-serif';
        g.fillText(a.icon, x+14, y+44);

        g.fillStyle = meta.color;
        g.font = 'bold 10px "DM Mono",monospace';
        const lab = meta.label.toUpperCase();
        g.fillText(lab, x+cellW-14-g.measureText(lab).width, y+22);

        g.save();
        g.translate(x+cellW-58, y+44);
        g.rotate(0.14);
        g.strokeStyle = meta.color;
        g.lineWidth = 1; g.globalAlpha = .8;
        roundRect(g, 0, 0, 46, 16, 2); g.stroke();
        g.fillStyle = meta.color;
        g.font = 'bold 9px "ZCOOL QingKe HuangYou", serif';
        g.fillText('已颁发', 8, 12);
        g.restore();
        g.globalAlpha = 1;

        g.fillStyle = '#fff';
        g.font = '16px "ZCOOL KuaiLe", "Noto Serif SC", serif';
        wrapText(g, a.name, x+14, y+74, cellW-28, 20, 1);

        // canvas 不渲染 <b>, 去掉再画
        g.fillStyle = '#aab3c6';
        g.font = '12px "Noto Serif SC", serif';
        const plainDesc = (rec?.desc || a.desc).replace(/<\/?b>/g, '');
        wrapText(g, plainDesc, x+14, y+96, cellW-28, 16, 2);
      });
    }

    g.fillStyle = '#4a4d59';
    g.font = '12px "DM Mono", monospace';
    g.fillText('互联网生存成就系统 · 截图来自不愿署名的算法', padding, H-26);

    const dataURL = cvs.toDataURL('image/png');
    if (navigator.canShare) {
      try {
        const blob = await (await fetch(dataURL)).blob();
        const file = new File([blob], '互联网生存档案.png', { type:'image/png' });
        if (navigator.canShare({ files: [file] })) {
          await navigator.share({ files: [file], title:'我的互联网生存档案' });
          return;
        }
      } catch {}
    }
    const a = document.createElement('a');
    a.href = dataURL;
    a.download = `互联网生存档案-${Date.now()}.png`;
    document.body.appendChild(a); a.click(); a.remove();
  }
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
function wrapText(g, text, x, y, maxW, lh, maxLines){
  const chars = [...text];
  let line = '', lineCount = 0;
  for (let i = 0; i < chars.length; i++){
    const test = line + chars[i];
    if (g.measureText(test).width > maxW){
      g.fillText(line, x, y);
      line = chars[i];
      y += lh;
      lineCount++;
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
