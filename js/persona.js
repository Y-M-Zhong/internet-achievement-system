// ===== 今日互联网人设卡片 =====
// 当解锁第 4 个成就后，把已解锁成就合成一个"人设标签"弹出
import { ACHIEVEMENTS, RARITY } from './data.js';

const RARITY_ORDER = { mythic: 4, epic: 3, rare: 2, common: 1 };

// 每条成就对应的人设碎片：adj 作修饰语，noun 作核心身份
const PERSONA_FRAG = {
  arrive:         { adj: '初来乍到',     noun: '新手村居民' },
  swipe5:         { adj: '手机冲浪',     noun: '滑动达人' },
  first_like:     { adj: '轻易心动',     noun: '情感丰富者' },
  first_save:     { adj: '数字囤积',     noun: '收藏癖患者' },
  quantum_learn:  { adj: '量子学习',     noun: '量子学霸' },
  just_looking:   { adj: '假装消费',     noun: '橱窗爱好者' },
  time_master:    { adj: '时间无感',     noun: '时间黑洞' },
  read_no_reply:  { adj: '已读不回',     noun: '沉默观察者' },
  dragonfly:      { adj: '蜻蜓点水',     noun: '内容游侠' },
  heart_struck:   { adj: '深度停留',     noun: '静止冥想者' },
  midnight_phil:  { adj: '深夜',         noun: '哲学家' },
  cyber_shy:      { adj: '赛博',         noun: '社恐患者' },
  collector:      { adj: '极致收藏',     noun: '收藏大师' },
  replayer:       { adj: '反复品味',     noun: '复读爱好者' },
  channel_surf:   { adj: '随机漫游',     noun: '兴趣游牧民' },
  comment_native: { adj: '评论区常驻',   noun: '评论原住民' },
  fake_busy:      { adj: '假装很忙',     noun: '演技派用户' },
  human_observer: { adj: '人类观察系',   noun: '田野调查员' },
  mind_drift:     { adj: '精神流浪',     noun: '数字游民' },
  archeologist:   { adj: '互联网考古',   noun: '考古学家' },
  collect_end:    { adj: '收藏终极',     noun: '数字囤积癖' },
  zen_blank:      { adj: '冥想入定',     noun: '禅修用户' },
  night_guard:    { adj: '深夜守护',     noun: '电子守夜人' },
  time_traveler:  { adj: '时空穿越',     noun: '时空旅人' },
  quantum_super:  { adj: '极速量子',     noun: '速读观察者' },
  ai_giveup:      { adj: 'AI无法分析的', noun: '神秘存在' },
};

// 根据解锁列表生成人设标题和参与成就
function buildPersona(unlockedIds) {
  const candidates = ACHIEVEMENTS
    .filter(a => unlockedIds.includes(a.id) && PERSONA_FRAG[a.id])
    .sort((a, b) => RARITY_ORDER[b.rarity] - RARITY_ORDER[a.rarity]);

  if (candidates.length === 0) return { title: '互联网新手', desc: '刚刚踏上旅程', achs: [] };

  const [first, second] = candidates;
  if (!second) {
    return {
      title: PERSONA_FRAG[first.id].noun,
      desc: `因 ${first.name} 得名`,
      achs: [first],
    };
  }

  return {
    title: `${PERSONA_FRAG[first.id].adj}的${PERSONA_FRAG[second.id].noun}`,
    desc: `${first.name} × ${second.name} 合成`,
    achs: [first, second],
  };
}

// 根据最高稀有度估算"全球拥有率"
const PCT_BY_RARITY = { mythic: '0.3', epic: '1.2', rare: '4.7', common: '18.5' };

// dataURL → Blob（不依赖 fetch，纯离线安全）
function dataURLtoBlob(dataURL) {
  const [head, body] = dataURL.split(',');
  const mime = head.match(/:(.*?);/)[1];
  const binary = atob(body);
  const arr = new Uint8Array(binary.length);
  for (let i = 0; i < binary.length; i++) arr[i] = binary.charCodeAt(i);
  return new Blob([arr], { type: mime });
}

function roundRect(g, x, y, w, h, r) {
  g.beginPath();
  g.moveTo(x + r, y);
  g.arcTo(x + w, y, x + w, y + h, r);
  g.arcTo(x + w, y + h, x, y + h, r);
  g.arcTo(x, y + h, x, y, r);
  g.arcTo(x, y, x + w, y, r);
  g.closePath();
}

export class PersonaCard {
  constructor(rootEl) {
    this.root = rootEl;
    this._data = null;
    this.render();
  }

  show(state) {
    const unlockedIds = Object.keys(state.unlocked);
    const count = unlockedIds.length;
    const { title, desc, achs } = buildPersona(unlockedIds);
    const topRarity = achs[0]?.rarity ?? 'common';
    const pct = PCT_BY_RARITY[topRarity];

    this._data = { title, desc, achs, count, pct };

    this.elTitle.textContent = title;
    this.elDesc.textContent = desc;
    this.elCount.textContent = `已解锁 ${count} / 27 个成就`;
    this.elPct.textContent = `全球仅 ${pct}% 的用户拥有此人设`;

    // 渲染参与成就徽章
    this.elBadges.innerHTML = '';
    for (const a of achs) {
      const meta = RARITY[a.rarity];
      const badge = document.createElement('div');
      badge.className = 'pb';
      badge.style.setProperty('--rc', meta.color);
      badge.innerHTML = `<span class="pb-icon">${a.icon}</span><span class="pb-name">${a.name}</span>`;
      this.elBadges.appendChild(badge);
    }

    this.el.classList.add('show');
  }

  hide() { this.el.classList.remove('show'); }

  async share() {
    if (!this._data) return;
    const { title, desc, achs, count, pct } = this._data;

    const W = 600, H = 400;
    const cvs = document.createElement('canvas');
    cvs.width = W; cvs.height = H;
    const g = cvs.getContext('2d');

    // 背景
    const bg = g.createLinearGradient(0, 0, W, H);
    bg.addColorStop(0, '#111828');
    bg.addColorStop(1, '#050608');
    g.fillStyle = bg;
    g.fillRect(0, 0, W, H);

    // 稀有度光晕
    if (achs[0]) {
      const color = RARITY[achs[0].rarity].color;
      const glow = g.createRadialGradient(W * 0.5, H * 0.35, 0, W * 0.5, H * 0.35, W * 0.55);
      glow.addColorStop(0, color + '22');
      glow.addColorStop(1, 'transparent');
      g.fillStyle = glow;
      g.fillRect(0, 0, W, H);
    }

    // 边框
    g.strokeStyle = 'rgba(255,255,255,0.08)';
    g.lineWidth = 1;
    roundRect(g, 1, 1, W - 2, H - 2, 24);
    g.stroke();

    // 顶部标签
    g.fillStyle = '#46e08a';
    g.font = '13px sans-serif';
    g.textAlign = 'left';
    g.fillText('🤖  AI 已为你生成今日人设', 36, 52);

    // 分割线
    g.strokeStyle = 'rgba(255,255,255,0.07)';
    g.beginPath(); g.moveTo(36, 68); g.lineTo(W - 36, 68); g.stroke();

    // 主标题
    g.fillStyle = '#ffffff';
    g.font = `bold 44px "Noto Sans SC", sans-serif`;
    g.textAlign = 'center';
    g.fillText(title, W / 2, 138);

    // 副文案
    g.fillStyle = '#6a7389';
    g.font = '15px "Noto Sans SC", sans-serif';
    g.fillText(desc, W / 2, 172);

    // 成就徽章
    if (achs.length > 0) {
      const bW = 200, bH = 46, gap = 16;
      const totalW = achs.length * bW + (achs.length - 1) * gap;
      let bx = (W - totalW) / 2;
      const by = 198;
      for (const a of achs) {
        const meta = RARITY[a.rarity];
        g.fillStyle = 'rgba(255,255,255,0.05)';
        roundRect(g, bx, by, bW, bH, 10); g.fill();
        g.strokeStyle = meta.color + '66';
        roundRect(g, bx, by, bW, bH, 10); g.stroke();
        g.fillStyle = meta.color;
        g.font = '14px "Noto Sans SC", sans-serif';
        g.textAlign = 'center';
        g.fillText(`${a.icon}  ${a.name}`, bx + bW / 2, by + 28);
        bx += bW + gap;
      }
    }

    // 统计数字
    g.fillStyle = '#d4dae8';
    g.font = '15px "Noto Sans SC", sans-serif';
    g.textAlign = 'center';
    g.fillText(`已解锁 ${count} / 27 个成就`, W / 2, 284);
    g.fillStyle = '#4a5163';
    g.font = '12px "Noto Sans SC", sans-serif';
    g.fillText(`全球仅 ${pct}% 的用户拥有此人设`, W / 2, 308);

    // 分割线
    g.strokeStyle = 'rgba(255,255,255,0.05)';
    g.beginPath(); g.moveTo(36, 332); g.lineTo(W - 36, 332); g.stroke();

    // 水印
    g.fillStyle = '#2a3040';
    g.font = '11px "Noto Sans SC", sans-serif';
    g.textAlign = 'center';
    g.fillText('互联网生存成就系统 · AI 出品', W / 2, H - 22);

    // 分享
    const dataURL = cvs.toDataURL('image/png');
    if (navigator.canShare) {
      try {
        const file = new File([dataURLtoBlob(dataURL)], '我的互联网人设.png', { type: 'image/png' });
        if (navigator.canShare({ files: [file] })) {
          await navigator.share({ files: [file], title: `我的互联网人设：${title}` });
          return;
        }
      } catch {}
    }
    const a = document.createElement('a');
    a.href = dataURL;
    a.download = `互联网人设-${title}.png`;
    document.body.appendChild(a); a.click(); a.remove();
  }

  render() {
    this.root.innerHTML = `
      <div class="persona-wrap" id="personaWrap">
        <div class="persona-scrim" id="personaScrim"></div>
        <div class="persona-sheet" id="personaSheet">
          <div class="persona-handle"></div>
          <div class="persona-ai-tag">🤖 AI 已为你生成今日人设</div>
          <div class="persona-title" id="personaTitle">—</div>
          <div class="persona-desc"  id="personaDesc">—</div>
          <div class="persona-badges" id="personaBadges"></div>
          <div class="persona-stats">
            <div class="ps-count" id="personaCount">—</div>
            <div class="ps-pct"   id="personaPct">—</div>
          </div>
          <div class="persona-actions">
            <button class="pa-btn primary" id="personaShare">截图分享 ↗</button>
            <button class="pa-btn ghost"   id="personaDismiss">继续刷</button>
          </div>
          <div class="persona-wm">互联网生存成就系统 · AI 出品</div>
        </div>
      </div>
    `;

    this.el       = this.root.querySelector('#personaWrap');
    this.elTitle  = this.root.querySelector('#personaTitle');
    this.elDesc   = this.root.querySelector('#personaDesc');
    this.elBadges = this.root.querySelector('#personaBadges');
    this.elCount  = this.root.querySelector('#personaCount');
    this.elPct    = this.root.querySelector('#personaPct');

    this.root.querySelector('#personaScrim').addEventListener('click', () => this.hide());
    this.root.querySelector('#personaDismiss').addEventListener('click', () => this.hide());
    this.root.querySelector('#personaShare').addEventListener('click', () => this.share());
  }
}
