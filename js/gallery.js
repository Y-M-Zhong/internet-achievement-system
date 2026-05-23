// ===== 成就馆 =====
// 全屏弹层，展示所有成就（已解锁/未解锁分组），可"分享我的成就墙"
import { ACHIEVEMENTS, RARITY } from './data.js';

export class Gallery {
  constructor(rootEl, tracker) {
    this.root = rootEl;
    this.tracker = tracker;
    this.render();
  }

  open() {
    this.refresh();
    this.el.classList.add('show');
  }
  close() { this.el.classList.remove('show'); }

  refresh() {
    const unlocked = this.tracker.state.unlocked;
    const total = ACHIEVEMENTS.length;
    const got = Object.keys(unlocked).length;
    this.elCount.textContent = `${got}/${total}`;
    this.elRatio.style.width = `${(got/total*100).toFixed(1)}%`;

    // 分组
    const groups = ['mythic','epic','rare','common'];
    let html = '';
    for (const g of groups) {
      const items = ACHIEVEMENTS.filter(a=>a.rarity===g);
      const meta = RARITY[g];
      html += `<div class="gp-head" style="color:${meta.color}">${meta.label} <span class="gp-sep">·</span> <span class="gp-mute">${items.filter(a=>unlocked[a.id]).length}/${items.length}</span></div>`;
      html += '<div class="gp-grid">';
      for (const a of items) {
        const ok = !!unlocked[a.id];
        html += `
          <div class="gp-card ${ok?'ok':''}" style="--rc:${meta.color}">
            <div class="gp-icon">${ok ? a.icon : '🔒'}</div>
            <div class="gp-name">${ok ? a.name : '???'}</div>
            <div class="gp-desc">${ok ? a.desc : '尚未触发，继续刷'}</div>
            <div class="gp-foot">
              <span class="gp-rate">${a.rate}</span>
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
          <div>
            <div class="gal-title">互联网生存成就</div>
            <div class="gal-sub">AI 一边偷看你，一边给你颁奖</div>
          </div>
          <button class="gal-close" id="galClose">×</button>
        </div>
        <div class="gal-progress">
          <div class="gal-progress-row">
            <span>本局已解锁</span>
            <b id="galCount">0/0</b>
          </div>
          <div class="gal-bar"><div class="gal-bar-fill" id="galRatio"></div></div>
        </div>
        <div class="gal-list" id="galList"></div>
        <div class="gal-foot">
          <button class="gal-btn primary" id="galShare">截图分享我的成就墙 📸</button>
          <button class="gal-btn ghost"   id="galReset">清空记录</button>
        </div>
      </div>
    `;
    this.el       = this.root.querySelector('#gal');
    this.elCount  = this.root.querySelector('#galCount');
    this.elRatio  = this.root.querySelector('#galRatio');
    this.elList   = this.root.querySelector('#galList');

    this.root.querySelector('#galClose').addEventListener('click', ()=>this.close());
    this.root.querySelector('#galShare').addEventListener('click', ()=>this.shareWall());
    this.root.querySelector('#galReset').addEventListener('click', ()=>{
      if (confirm('清空所有解锁记录，重新开始？')) { this.tracker.reset(); this.refresh(); }
    });
  }

  // 简易"分享"：把成就墙渲到 canvas，下载或调用 Web Share API
  async shareWall() {
    const unlocked = ACHIEVEMENTS.filter(a => this.tracker.state.unlocked[a.id]);
    const total = ACHIEVEMENTS.length;

    const W = 800, padding = 32;
    const cols = 3, gap = 16;
    const cellW = (W - padding*2 - gap*(cols-1)) / cols;
    const cellH = 140;
    const rows = Math.ceil(Math.max(unlocked.length,1)/cols);
    const H = 220 + rows*cellH + (rows-1)*gap + 100;

    const cvs = document.createElement('canvas');
    cvs.width = W; cvs.height = H;
    const g = cvs.getContext('2d');

    // 背景
    const bg = g.createLinearGradient(0,0,0,H);
    bg.addColorStop(0,'#0c0f1a'); bg.addColorStop(1,'#05060a');
    g.fillStyle = bg; g.fillRect(0,0,W,H);

    g.fillStyle = '#fff';
    g.font = 'bold 36px "Noto Sans SC",sans-serif';
    g.fillText('我的互联网生存成就', padding, 70);

    g.fillStyle = '#8a93a6';
    g.font = '16px "Noto Sans SC",sans-serif';
    g.fillText(`AI 已为你颁发 ${unlocked.length} 个荒诞成就 · ${new Date().toLocaleString('zh-CN')}`, padding, 100);

    g.strokeStyle = 'rgba(255,255,255,.08)';
    g.beginPath(); g.moveTo(padding,120); g.lineTo(W-padding,120); g.stroke();

    if (unlocked.length === 0) {
      g.fillStyle = '#8a93a6';
      g.font = '18px "Noto Sans SC",sans-serif';
      g.fillText('还没解锁任何成就 · 多刷一会儿 ;)', padding, 180);
    } else {
      unlocked.forEach((a,i)=>{
        const c = i % cols, r = Math.floor(i/cols);
        const x = padding + c*(cellW+gap);
        const y = 160 + r*(cellH+gap);
        const meta = RARITY[a.rarity];

        // 卡片背景
        g.fillStyle = 'rgba(255,255,255,.04)';
        roundRect(g, x, y, cellW, cellH, 14); g.fill();
        g.strokeStyle = meta.color + '55';
        roundRect(g, x, y, cellW, cellH, 14); g.stroke();

        // icon
        g.font = '32px sans-serif';
        g.fillText(a.icon, x+16, y+44);

        // 稀有度
        g.fillStyle = meta.color;
        g.font = 'bold 11px "JetBrains Mono",monospace';
        g.fillText(meta.label.toUpperCase(), x+cellW-16-g.measureText(meta.label.toUpperCase()).width, y+24);

        // 标题
        g.fillStyle = '#fff';
        g.font = 'bold 16px "Noto Sans SC",sans-serif';
        wrapText(g, a.name, x+16, y+74, cellW-32, 20, 1);

        // desc
        g.fillStyle = '#aab3c6';
        g.font = '12px "Noto Sans SC",sans-serif';
        wrapText(g, a.desc, x+16, y+100, cellW-32, 16, 2);
      });
    }

    // 水印
    g.fillStyle = '#4a5163';
    g.font = '13px "Noto Sans SC",sans-serif';
    g.fillText('互联网生存成就系统 · 截图请@AI', padding, H-32);

    const dataURL = cvs.toDataURL('image/png');
    // 优先用 Web Share API（手机端）
    if (navigator.canShare) {
      try {
        const blob = await (await fetch(dataURL)).blob();
        const file = new File([blob], 'achievements.png', { type:'image/png' });
        if (navigator.canShare({ files: [file] })) {
          await navigator.share({ files: [file], title:'我的互联网生存成就' });
          return;
        }
      } catch {}
    }
    // 退化：直接下载
    const a = document.createElement('a');
    a.href = dataURL; a.download = `我的互联网生存成就-${Date.now()}.png`;
    document.body.appendChild(a); a.click(); a.remove();
  }
}

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
  for (let i=0;i<chars.length;i++){
    const test = line + chars[i];
    if (g.measureText(test).width > maxW){
      g.fillText(line, x, y);
      line = chars[i];
      y += lh;
      lineCount++;
      if (lineCount >= maxLines-1){
        // 剩余直接画完（可能溢出）
        const rest = chars.slice(i).join('');
        let trimmed = rest;
        while (g.measureText(trimmed + '…').width > maxW && trimmed.length>0) trimmed = trimmed.slice(0,-1);
        g.fillText(trimmed + (trimmed.length < rest.length ? '…' : ''), x, y);
        return;
      }
    } else line = test;
  }
  g.fillText(line, x, y);
}
