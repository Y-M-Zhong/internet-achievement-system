// ===== 用户画像生成模块 =====
// 当前默认实现: 本地"印章人像" (SVG 自绘, 像版画印章, 颜色随 6 维)
// 接 gpt-image-2 的方式见底部 "==== 接真实 API 时改这里 ===="
//
// 输出统一为 { kind, svg, prompt, style }
//   kind   : 'stamp' (本地占位) | 'api' (调远端 API)
//   svg    : 一段 <svg>...</svg> 字符串 (kind='stamp') 或一个 <img src> 包裹 (kind='api')
//   prompt : 生成此画像用的 prompt (调 API 用; stamp 也保留, 当作"AI 看见的你")
//   style  : 当前风格 key (见 PORTRAIT_STYLES)

import { topDimension, DIMENSIONS } from './data.js';

// ---------- 风格枚举 ----------
// 每种风格 = 一个 prompt 后缀 + 一组本地占位用色 (stampPalette)
export const PORTRAIT_STYLES = [
  {
    key: 'zine',
    label: '印刷',
    promptSuffix: 'vintage zine magazine portrait, paper-stamp aesthetic, muted earthy palette, screen-print texture, slight off-register',
    stampPalette: { ink:'#1a1a26', paper:'#f5f3ec', accent:'#e8a91d', soft:'#cfd0d6' },
  },
  {
    key: 'handdraw',
    label: '手绘',
    promptSuffix: 'ink hand-drawn doodle portrait, expressive line work, sketchy, on grid paper, casual indie illustration',
    stampPalette: { ink:'#262626', paper:'#fcfaf3', accent:'#5b87e0', soft:'#aab3c6' },
  },
  {
    key: 'pixel',
    label: '像素',
    promptSuffix: '32-bit pixel art portrait, low-res, retro game palette, crisp pixels, neon highlights',
    stampPalette: { ink:'#101020', paper:'#1a2030', accent:'#3aa86b', soft:'#7a8aff' },
  },
  {
    key: 'oil',
    label: '油画',
    promptSuffix: 'oil painting portrait, thick brush strokes, baroque chiaroscuro, dramatic moody lighting',
    stampPalette: { ink:'#0d0d0d', paper:'#241a14', accent:'#c84057', soft:'#a85fff' },
  },
];

const styleByKey = (k) => PORTRAIT_STYLES.find(s => s.key === k) || PORTRAIT_STYLES[0];

// ---------- prompt 构造器 ----------
// 把 (co-author 的) behavior 人格 + persona slug + 维度 + 行为证据 → 一句给 gpt-image-2 用的英文 prompt
// 优先级: behavior (主语) > slugs (细节修饰) > dims (强度) > state (彩蛋)
export function buildPrompt(persona, dims, state, styleKey, behavior = null) {
  const style = styleByKey(styleKey);

  // 0) behavior → 主语 (如果 co-author 行为人格匹配了, 用它作核心形象)
  const behaviorMap = {
    GHOST:  'a translucent figure that leaves no shadow on a phone-lit floor',
    SPIN:   'an automaton with a permanently scrolling thumb, eyes spinning',
    STASH:  'a hamster-cheeked archivist hoarding folders of unread bookmarks',
    DARK:   'a hollow-eyed philosopher under deep 3am screen glow',
    FLIP:   'a two-faced figure pulled in opposite directions, mismatched halves',
    CAGE:   'a person sitting cross-legged inside an algorithm-shaped cage',
    CLICK:  'a disembodied thumb on a pedestal, perpetually tapping',
    SKIP:   'a blur of a sprinter dashing past flipbook frames',
    MONK:   'a digital meditation monk briefly returning to a glowing screen',
    LOOP:   'a creature trapped in their own replay loop, watching the same frame',
    SPY:    'a tiny anthropologist hidden inside a comment thread, taking notes',
    SPONGE: 'a person literally absorbing emotional rays from a phone, dripping',
    FAKE:   'an actor on a tiny stage holding a fake textbook, audience of one',
    VOID:   'a featureless silhouette resisting all classification, surrounded by labels falling off',
  };

  let subject;
  if (behavior && behaviorMap[behavior.code]) {
    subject = `${behaviorMap[behavior.code]}, known as "${behavior.name}"`;
  } else {
    // fallback: 用 slug 拼接 (老逻辑)
    const slugMap = {
      '3秒大师':'speed-reading scholar with empty eyes',
      '凌晨哲学家':'late-night philosopher under blue screen glow',
      '装死浏览者':'corpse-like silent observer with vacant stare',
      '收藏不看人':'a hoarder surrounded by piles of unread bookmarks',
      '撤回大师':'a typist endlessly deleting their words',
      '撤回选手':'a hesitant typist with hovering thumbs',
      '阴间作息党':'a hollow-eyed person awake at 3am',
      'AI 投降人':'a featureless figure that resists definition',
      '考古癖':'an archaeologist of their own browser history',
      '兴趣游牧民':'a wanderer carrying many mismatched maps',
      '吸猫人':'a person being absorbed into a cat',
      '馋鬼人':'a hungry ghost staring at glowing food images',
      '哑巴人':'a person with a sewn-shut mouth holding a phone',
      '点赞机':'a hand reduced to a single tapping finger',
      '走神人':'a person whose head is leaking soap bubbles',
      '滑动机':'a thumb-shaped automaton, blank face',
      '蜻蜓人':'a dragonfly-eyed person, never landing',
      '困死人':'a sleeping figure half-melted into a sofa',
      '发呆王':'a king crowned with a void, throne made of phones',
      '真·植物人':'a person literally rooted to their couch, leaves growing',
      '屏幕植物人':'a person sprouting leaves from a phone-shaped pot',
      '回看怪':'a creature watching the same loop 100 times',
      '剁手预备役':'a person whose hand is wrapped in shopping bags',
      '电子剁手党':'a person buried under a mountain of parcels',
      '评区原住民':'a tribe of tiny people living inside a comment thread',
      '评区田野党':'an anthropologist taking notes in a comment section',
      '评区窥探员':'a single eyeball peeking through a comment thread',
      '算法克星':'a confused algorithm trying to label a shape-shifter',
      '收藏黑洞':'a black hole made of unread saved videos',
      '手快党':'a blur of two thumbs in mid-tap',
      '屏幕呆人':'a sitting figure dissolving into the screen',
      '心动派':'a person whose heart is on the surface of their phone',
      '想说党':'a person with words trapped in a thought bubble',
      '时间黑洞':'a clock face that is also a void',
      '假装不买党':'a shopper pretending not to look at the price tag',
      '仓鼠预备役':'a hamster-cheeked figure stuffing screenshots',
      '网生菜鸟':'a fresh-from-the-egg digital newborn',
    };
    const slugDesc = persona.slugs.map(s => slugMap[s] || `someone called "${s}"`).join(', also ');
    subject = `a portrait of ${slugDesc}`;
  }

  // 2) 维度 → 修饰词 (只挑前 2 高的, 避免 prompt 过长)
  const sortedDims = DIMENSIONS
    .map(d => ({ ...d, v: dims[d.key] || 0 }))
    .sort((a,b) => b.v - a.v)
    .slice(0, 2);

  const dimMods = sortedDims.map(d => {
    const intensity = d.v >= 70 ? 'extremely' : d.v >= 40 ? 'visibly' : 'subtly';
    const trait = ({
      addiction:'addicted to the screen',
      impatient:'impatient and twitchy',
      hoarder:'surrounded by hoarded items',
      nocturnal:'glowing under deep-night lighting',
      lurker:'silently lurking from the shadows',
      performer:'mouth half-open, mid-word',
    })[d.key];
    return `${intensity} ${trait}`;
  }).join(', ');

  // 3) 行为细节 (从 state 抽一句)
  let detail = '';
  if ((state.swipes||0) >= 10 && (state.likes||0) === 0) detail = 'thumb scrolling endlessly, no engagement';
  else if ((state.saves||0) >= 5) detail = `${state.saves} bookmarked videos floating around their head`;
  else if ((state.commentOpens||0) >= 3 && (state.inputSendCount||0) === 0) detail = 'a speech bubble visible but empty';
  else if ((state.inputFocusCount||0) >= 3) detail = 'a draft folder bursting with retracted messages';
  else if (state.longStays >= 1) detail = 'staring blankly for too long at a single frame';

  // 4) 拼接
  const parts = [
    subject,
    dimMods,
    detail,
    'square portrait, centered composition',
    style.promptSuffix,
  ].filter(Boolean);

  return parts.join(', ');
}

// ==== 真接口规约 (后续接 gpt-image-2 时改这里) ====
// 推荐: 前端调你自己的后端 /api/portrait, 后端再调 OpenAI 防止 key 泄露
//
//   const res = await fetch('/api/portrait', {
//     method: 'POST',
//     headers: { 'Content-Type': 'application/json' },
//     body: JSON.stringify({ prompt, size:'1024x1024', model:'gpt-image-2' }),
//   });
//   if (!res.ok) throw new Error('portrait api failed');
//   const { url } = await res.json();
//   return { kind:'api', svg: `<img src="${url}" class="pe-portrait-img" alt="" />`, prompt, style: styleKey };
//
// 切换开关:
const USE_REAL_API = false;

// 预生成的 gpt-image-2 画像 (zine 风格)
// 行为人格命中时优先展示真图, 没命中 / 切到其他风格 → 回落到本地 SVG 印章
const PRESET_PORTRAITS = {
  DARK:  'asserts/portraits/dark.png',
  SPY:   'asserts/portraits/spy.png',
  GHOST: 'asserts/portraits/ghost.png',
  SPIN:  'asserts/portraits/spin.png',
  STASH: 'asserts/portraits/stash.png',
  VOID:  'asserts/portraits/void.png',
};

// ---------- 入口: 生成画像 ----------
export async function generatePortrait({ persona, dims, state, style: styleKey = 'zine', seed = Math.random(), behavior = null } = {}) {
  const beh = behavior || persona?.behavior || null;
  const prompt = buildPrompt(persona, dims, state, styleKey, beh);

  // 1) zine 风格 + 命中预生成的人格 → 用真图 (gpt-image-2 离线产物)
  const presetUrl = (styleKey === 'zine' && beh && PRESET_PORTRAITS[beh.code]) || null;
  if (presetUrl) {
    return {
      kind: 'api',
      svg: `<img src="${presetUrl}" class="pe-portrait-img" alt="${beh.code} persona portrait" loading="eager" />`,
      prompt,
      style: styleKey,
    };
  }

  // 2) 真接口路径 (未来切到在线 gpt-image-2 时启用)
  if (USE_REAL_API) {
    // const res = await fetch('/api/portrait', {
    //   method:'POST', headers:{'Content-Type':'application/json'},
    //   body: JSON.stringify({ prompt, size:'1024x1024' }),
    // });
    // const { url } = await res.json();
    // return { kind:'api', svg:`<img src="${url}" class="pe-portrait-img" alt="" />`, prompt, style: styleKey };
    throw new Error('Real API not wired yet');
  }

  // 3) fallback: 本地"印章人像" (其他风格 / 未命中预生成集合)
  const svg = buildStampPortrait(persona, dims, state, styleKey, seed);
  return { kind:'stamp', svg, prompt, style: styleKey };
}

// ====================================================
// 印章人像 — 本地 SVG 自绘
// 形状/眼/嘴/装饰物按 6 维变化, 颜色按风格的 stampPalette
// ====================================================
function buildStampPortrait(persona, dims, state, styleKey, seed) {
  const style = styleByKey(styleKey);
  const pal = style.stampPalette;
  const top = topDimension(dims);

  // 用 seed 决定一点随机性 (再来一张时变化)
  const rand = mulberry32(Math.floor(seed * 1e9));

  // 头型: addiction 高 = 圆胖, lurker 高 = 椭圆瘦
  const headW = 110 - (dims.lurker||0) * 0.15 + (dims.addiction||0) * 0.1;
  const headH = 130 + (dims.lurker||0) * 0.1 - (dims.addiction||0) * 0.05;

  // 眼睛
  const eyes = renderEyes(dims, pal, rand);
  // 嘴
  const mouth = renderMouth(dims, pal);
  // 头顶装饰物 (icon 飘浮)
  const orbits = renderOrbits(dims, state, rand);
  // 边框印章效果
  const bg = pal.paper;
  const ink = pal.ink;
  const accent = pal.accent;

  // 标签盖章 (slug)
  const slugStamp = persona.slugs[0] || '???';

  // 印章式日期编号
  const stampId = `№${String(Math.floor(seed*9000)+1000)}`;

  return `
    <svg viewBox="0 0 300 300" class="pe-portrait-svg" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid meet">
      <defs>
        <filter id="grain-${seed}" x="0" y="0">
          <feTurbulence type="fractalNoise" baseFrequency="0.85" numOctaves="2" seed="${Math.floor(seed*99)}" />
          <feColorMatrix values="0 0 0 0 0  0 0 0 0 0  0 0 0 0 0  0 0 0 0.13 0" />
          <feComposite in2="SourceGraphic" operator="in" />
        </filter>
        <pattern id="dots-${seed}" patternUnits="userSpaceOnUse" width="6" height="6">
          <circle cx="3" cy="3" r="0.8" fill="${ink}" opacity="0.12" />
        </pattern>
      </defs>

      <!-- 纸底 -->
      <rect width="300" height="300" fill="${bg}" />
      <rect width="300" height="300" fill="url(#dots-${seed})" />

      <!-- 印章外框 -->
      <rect x="14" y="14" width="272" height="272" fill="none" stroke="${ink}" stroke-width="2" rx="6" />
      <rect x="20" y="20" width="260" height="260" fill="none" stroke="${ink}" stroke-width="0.5" rx="4" opacity="0.4" />

      <!-- 顶部标签 -->
      <g transform="translate(150, 38)">
        <rect x="-58" y="-12" width="116" height="22" fill="${ink}" rx="2" />
        <text text-anchor="middle" y="4" fill="${bg}" font-family="DM Mono, monospace" font-size="11" font-weight="700" letter-spacing="2">PERSONA · ${stampId}</text>
      </g>

      <!-- 头像本体 -->
      <g transform="translate(150, 158)">
        <!-- 头 -->
        <ellipse cx="0" cy="0" rx="${headW/2}" ry="${headH/2}" fill="${bg}" stroke="${ink}" stroke-width="2.5" />
        <!-- 线条阴影 -->
        <path d="M ${-headW/2.4} ${headH/4} Q 0 ${headH/2.6} ${headW/2.4} ${headH/4}"
              fill="none" stroke="${ink}" stroke-width="1" opacity="0.35" />
        <!-- 眼睛 -->
        ${eyes}
        <!-- 嘴 -->
        ${mouth}
      </g>

      <!-- 轨道装饰物 -->
      ${orbits}

      <!-- 底部 slug 印章 -->
      <g transform="translate(150, 262)">
        <rect x="-78" y="-13" width="156" height="26" fill="none" stroke="${accent}" stroke-width="2" rx="3" transform="rotate(-1.2)" />
        <text text-anchor="middle" y="5" fill="${accent}" font-family="ZCOOL KuaiLe, Noto Serif SC, serif" font-size="17" font-weight="700" transform="rotate(-1.2)">${escapeXml(slugStamp)}</text>
      </g>

      <!-- 维度签名 -->
      <g transform="translate(24, 286)">
        <text fill="${ink}" font-family="DM Mono, monospace" font-size="8" opacity="0.55" letter-spacing="1">${escapeXml(top.label)} · ${top.value}%</text>
      </g>

      <!-- 颗粒纹理覆盖 -->
      <rect width="300" height="300" filter="url(#grain-${seed})" pointer-events="none" />
    </svg>
  `;
}

// 眼睛: 根据 lurker / nocturnal / impatient 变
function renderEyes(dims, pal, rand) {
  const ink = pal.ink;
  const eyeY = -8;
  // lurker 高 = 眯眼; nocturnal 高 = 眼下黑圈; impatient 高 = 散瞳
  const lurker = dims.lurker || 0;
  const nocturnal = dims.nocturnal || 0;
  const impatient = dims.impatient || 0;

  if (lurker > 65) {
    // 眯成一条线
    return `
      <line x1="-22" y1="${eyeY}" x2="-8" y2="${eyeY}" stroke="${ink}" stroke-width="2.5" stroke-linecap="round" />
      <line x1="8" y1="${eyeY}" x2="22" y2="${eyeY}" stroke="${ink}" stroke-width="2.5" stroke-linecap="round" />
    `;
  }
  if (impatient > 60) {
    // 散瞳: 两个眼珠子偏向不同方向
    return `
      <circle cx="-15" cy="${eyeY}" r="6" fill="${pal.paper}" stroke="${ink}" stroke-width="2" />
      <circle cx="-12" cy="${eyeY-1}" r="2.4" fill="${ink}" />
      <circle cx="15" cy="${eyeY}" r="6" fill="${pal.paper}" stroke="${ink}" stroke-width="2" />
      <circle cx="18" cy="${eyeY+1}" r="2.4" fill="${ink}" />
    `;
  }
  if (nocturnal > 55) {
    // 黑眼圈
    return `
      <ellipse cx="-15" cy="${eyeY+5}" rx="9" ry="3" fill="${ink}" opacity="0.25" />
      <ellipse cx="15" cy="${eyeY+5}" rx="9" ry="3" fill="${ink}" opacity="0.25" />
      <circle cx="-15" cy="${eyeY}" r="5" fill="${pal.paper}" stroke="${ink}" stroke-width="2" />
      <circle cx="-15" cy="${eyeY}" r="2" fill="${ink}" />
      <circle cx="15" cy="${eyeY}" r="5" fill="${pal.paper}" stroke="${ink}" stroke-width="2" />
      <circle cx="15" cy="${eyeY}" r="2" fill="${ink}" />
    `;
  }
  // 默认: 空洞圆眼
  return `
    <circle cx="-15" cy="${eyeY}" r="5" fill="${pal.paper}" stroke="${ink}" stroke-width="2" />
    <circle cx="-15" cy="${eyeY}" r="2" fill="${ink}" />
    <circle cx="15" cy="${eyeY}" r="5" fill="${pal.paper}" stroke="${ink}" stroke-width="2" />
    <circle cx="15" cy="${eyeY}" r="2" fill="${ink}" />
  `;
}

// 嘴: 根据 performer / hoarder / addiction 变
function renderMouth(dims, pal) {
  const ink = pal.ink;
  const my = 18;
  const performer = dims.performer || 0;
  const hoarder = dims.hoarder || 0;
  const addiction = dims.addiction || 0;

  if (performer > 55) {
    // 嘴大张, 半圈带牙齿
    return `<path d="M -12 ${my} Q 0 ${my+10} 12 ${my} L 8 ${my+1} L 0 ${my+2} L -8 ${my+1} Z" fill="${ink}" />`;
  }
  if (hoarder > 55) {
    // 嘴鼓鼓的 (仓鼠脸): 两个小腮
    return `
      <line x1="-10" y1="${my}" x2="10" y2="${my}" stroke="${ink}" stroke-width="2" stroke-linecap="round" />
      <ellipse cx="-20" cy="${my+1}" rx="4" ry="3" fill="${ink}" opacity="0.15" />
      <ellipse cx="20" cy="${my+1}" rx="4" ry="3" fill="${ink}" opacity="0.15" />
    `;
  }
  if (addiction > 65) {
    // zZZ
    return `
      <text x="0" y="${my+4}" text-anchor="middle" font-family="DM Mono,monospace" font-size="13" fill="${ink}" opacity="0.7">~</text>
    `;
  }
  // 默认: 平嘴
  return `<line x1="-10" y1="${my}" x2="10" y2="${my}" stroke="${ink}" stroke-width="2" stroke-linecap="round" />`;
}

// 头顶飘浮装饰: 根据行为状态选 emoji + 摆位
function renderOrbits(dims, state, rand) {
  const items = [];
  if ((state.saves||0) >= 3)            items.push({ ch:'⭐', kind:'save' });
  if ((state.commentOpens||0) >= 2)     items.push({ ch:'💬', kind:'comment' });
  if ((dims.nocturnal||0) >= 50)        items.push({ ch:'🌙', kind:'moon' });
  if ((state.swipes||0) >= 8)           items.push({ ch:'👆', kind:'swipe' });
  if ((state.likes||0) >= 5)            items.push({ ch:'❤', kind:'like' });
  if (items.length === 0)               items.push({ ch:'?', kind:'q' });

  // 最多 4 个, 围绕头部上半圈
  const N = Math.min(items.length, 4);
  const used = items.slice(0, N);
  const cx = 150, cy = 158, R = 100;

  return used.map((it, i) => {
    const a = -Math.PI*0.95 + (i / Math.max(N-1,1)) * Math.PI*0.9 + (rand()-0.5)*0.18;
    const x = cx + Math.cos(a)*R;
    const y = cy + Math.sin(a)*R;
    const rot = (rand()-0.5)*16;
    const sz = it.ch === '?' ? 22 : 18;
    return `
      <g transform="translate(${x.toFixed(1)} ${y.toFixed(1)}) rotate(${rot.toFixed(1)})">
        <text text-anchor="middle" dominant-baseline="middle" font-size="${sz}">${it.ch}</text>
      </g>
    `;
  }).join('');
}

// ---------- utils ----------
function mulberry32(a) {
  return function() {
    a |= 0; a = a + 0x6D2B79F5 | 0;
    let t = a;
    t = Math.imul(t ^ t >>> 15, t | 1);
    t ^= t + Math.imul(t ^ t >>> 7, t | 61);
    return ((t ^ t >>> 14) >>> 0) / 4294967296;
  };
}

function escapeXml(s) {
  return String(s).replace(/[<>&'"]/g, c => ({'<':'&lt;','>':'&gt;','&':'&amp;',"'":'&apos;','"':'&quot;'})[c]);
}
