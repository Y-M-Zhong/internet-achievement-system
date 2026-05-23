// ===== 主应用：抖音风信息流 + 行为接入 =====
import { FEED_CARDS } from './data.js';
import { Tracker } from './tracker.js';
import { AchievementPopup } from './popup.js';
import { Gallery } from './gallery.js';
import { PersonaCard } from './persona.js';

// -------- 工具 --------
const $ = sel => document.querySelector(sel);
const make = (tag, cls, html) => {
  const el = document.createElement(tag);
  if (cls) el.className = cls;
  if (html != null) el.innerHTML = html;
  return el;
};

// -------- 渲染信息流 --------
function renderFeed(container) {
  container.innerHTML = '';
  // 把卡片打乱一下，营造"刷到不同内容"的随机感（保留 f01 在首位用于"考古学家"成就）
  const head = FEED_CARDS.slice(0,1);
  const tail = [...FEED_CARDS.slice(1)].sort(()=>Math.random()-0.5);
  const cards = [...head, ...tail];

  for (const c of cards) {
    const card = make('section', 'feed-card');
    card.dataset.id = c.id;
    card.dataset.cat = c.cat;
    card.style.background = `linear-gradient(180deg, ${c.bg} 0%, #050608 100%)`;
    card.innerHTML = `
      <div class="card-bg-emoji">${c.emoji}</div>
      <div class="card-top">
        <span class="status-time" data-clock="1">--:--</span>
        <span>📶 🔋</span>
      </div>
      <div class="card-tabs"><span>关注</span><b>推荐</b><span>商城</span></div>
      <div class="card-cap">
        <h4>${c.title}</h4>
        <p>${c.desc}</p>
        <span class="card-tags">${c.tags.join(' ')}</span>
        <div class="card-author">${c.author}</div>
      </div>
      <div class="card-rail">
        <button class="rail-btn" data-act="like"><span class="ico">❤️</span><span class="lab" data-likes>${c.likes}</span></button>
        <button class="rail-btn" data-act="comment"><span class="ico">💬</span><span class="lab">${c.cmts}</span></button>
        <button class="rail-btn" data-act="save"><span class="ico">⭐</span><span class="lab">收藏</span></button>
        <button class="rail-btn" data-act="share"><span class="ico">↗</span><span class="lab">分享</span></button>
      </div>
      <div class="card-search">
        <input type="text" placeholder="说点什么…" data-input>
        <button class="send-btn" data-send>发送</button>
      </div>
      <div class="card-botnav"><b>首页</b><span>朋友</span><span class="plus"></span><span>消息</span><span>我</span></div>
    `;
    container.appendChild(card);
  }
}

// -------- 时钟 --------
function startClock() {
  const tick = () => {
    const d = new Date();
    const t = `${String(d.getHours()).padStart(2,'0')}:${String(d.getMinutes()).padStart(2,'0')}`;
    document.querySelectorAll('[data-clock]').forEach(el=>el.textContent = t);
  };
  tick();
  setInterval(tick, 30_000);
}

// -------- 主流程 --------
async function main() {
  const tracker = new Tracker();
  const popup   = new AchievementPopup($('#popupRoot'), { sound:false });
  const gallery = new Gallery($('#galleryRoot'), tracker);
  const persona = new PersonaCard($('#personaRoot'));

  // 人设卡片触发状态
  const PERSONA_THRESHOLD = 4;
  let personaShown   = false;
  let personaPending = false;

  // 队列清空时检查是否弹人设
  popup.onDrained = () => {
    if (personaPending && !personaShown) {
      personaShown = true;
      personaPending = false;
      setTimeout(() => persona.show(tracker.state), 600);
    }
  };

  // 连接：tracker 解锁事件 -> 弹窗 + 人设检测
  tracker.on(ev => {
    if (ev.type !== 'unlock') return;
    popup.enqueue(ev.ach);
    updateCounter();
    const count = Object.keys(tracker.state.unlocked).length;
    if (!personaShown && count >= PERSONA_THRESHOLD) personaPending = true;
  });

  // 顶部计数器
  function updateCounter() {
    const got = Object.keys(tracker.state.unlocked).length;
    const total = (window.__ACH_TOTAL ||= 0) || (window.__ACH_TOTAL = 27);
    $('#headerCount').textContent = got;
  }

  // 头部"奖杯"按钮 -> 打开成就馆
  $('#headerTrophy').addEventListener('click', ()=>gallery.open());

  // 顶部静音切换
  $('#headerSound').addEventListener('click', e=>{
    const on = !e.currentTarget.classList.contains('on');
    e.currentTarget.classList.toggle('on', on);
    e.currentTarget.textContent = on ? '🔊' : '🔇';
    popup.setSound(on);
  });

  // 渲染 feed
  renderFeed($('#feed'));
  startClock();

  // 卡片交互：点赞/收藏/评论/输入框
  $('#feed').addEventListener('click', e=>{
    const btn = e.target.closest('.rail-btn, [data-send]');
    if (!btn) return;
    const card = btn.closest('.feed-card');
    if (btn.dataset.act === 'like') {
      btn.classList.add('liked');
      const lab = btn.querySelector('[data-likes]');
      // 视觉反馈：+1 短暂动画
      const pop = make('span', 'plus-one', '+1');
      btn.appendChild(pop); setTimeout(()=>pop.remove(), 700);
      tracker.like();
    } else if (btn.dataset.act === 'save') {
      btn.classList.add('saved');
      tracker.save_();
    } else if (btn.dataset.act === 'comment') {
      tracker.commentOpen();
      // 模拟：聚焦输入框
      const input = card.querySelector('[data-input]');
      if (input) input.focus();
    } else if (btn.dataset.act === 'share') {
      // 简单提示 + 触发分享相关行为（暂不做完整流程）
      flashToast('已复制链接 (假装)');
    } else if (btn.dataset.send) {
      const input = card.querySelector('[data-input]');
      tracker.inputBlur(true);
      if (input) { input.value=''; input.blur(); }
      flashToast('已发出 (假装)');
    }
  });

  // 输入框焦点
  $('#feed').addEventListener('focusin', e=>{
    if (e.target.matches('[data-input]')) tracker.inputFocus();
  });
  $('#feed').addEventListener('focusout', e=>{
    if (e.target.matches('[data-input]')) {
      // sent=false: 离焦时若 input 仍有值，可视为放弃发送
      tracker.inputBlur(false);
    }
  });

  // -------- 滚动 = 滑动 --------
  // 使用 IntersectionObserver 探测当前可见卡片
  const io = new IntersectionObserver((entries) => {
    // 取相交比例最高的
    let best = null;
    for (const en of entries) if (en.isIntersecting && (!best || en.intersectionRatio > best.intersectionRatio)) best = en;
    if (!best) return;
    const id = best.target.dataset.id;
    const cat = best.target.dataset.cat;
    if (id !== tracker.currentCardId) tracker.viewCard({ id, cat });
  }, { root: $('#feed'), threshold: [0.6, 0.85] });

  document.querySelectorAll('.feed-card').forEach(el => io.observe(el));

  // 把滚动节流为"swipe"事件
  let lastScrollTop = $('#feed').scrollTop;
  let swipeAccumulator = 0;
  $('#feed').addEventListener('scroll', () => {
    const cur = $('#feed').scrollTop;
    const dy = Math.abs(cur - lastScrollTop);
    swipeAccumulator += dy;
    lastScrollTop = cur;
    if (swipeAccumulator > 200) { // 大约一屏的 30%
      swipeAccumulator = 0;
      tracker.swipe();
    }
  });

  // 启动
  tracker.startTicker();
  tracker.init();
  updateCounter();

  // 把 tracker / popup 挂到全局，方便控制台 debug
  window.__ias = { tracker, popup, gallery, persona };
}

// -------- toast --------
function flashToast(text) {
  let t = document.querySelector('#toast');
  if (!t) {
    t = document.createElement('div');
    t.id = 'toast'; t.className='toast';
    document.body.appendChild(t);
  }
  t.textContent = text;
  t.classList.add('show');
  clearTimeout(t._iv);
  t._iv = setTimeout(()=>t.classList.remove('show'), 1400);
}

main();
