// ===== 主应用 =====
import { FEED_CARDS, ACHIEVEMENTS, CATEGORY } from './data.js';
import { Tracker } from './tracker.js';
import { AchievementPopup } from './popup.js';
import { Gallery } from './gallery.js';

const $ = sel => document.querySelector(sel);

// -------- 渲染信息流 --------
function renderFeed(container) {
  container.innerHTML = '';
  // 保持 f01 在头, 其余打乱
  const head = FEED_CARDS.slice(0,1);
  const tail = [...FEED_CARDS.slice(1)].sort(()=>Math.random()-0.5);
  const cards = [...head, ...tail];

  for (const c of cards) {
    const meta = CATEGORY[c.cat] || {};
    const card = document.createElement('section');
    card.className = `feed-card vibe-${meta.vibe||'paper'}`;
    card.dataset.id = c.id;
    card.dataset.cat = c.cat;
    card.style.setProperty('--cat-accent', meta.accent || '#888');
    card.innerHTML = `
      <div class="card-art">${c.emoji}</div>
      <div class="card-stamp">
        <span>${meta.stamp || c.cat.toUpperCase()}</span>
        <span class="cs-id">${c.id.toUpperCase()} · ${idx(c.id)}/24</span>
      </div>
      <div class="card-cap">
        <h3>${c.title}</h3>
        <p>${c.desc}</p>
        <div class="tags">${c.tags}</div>
        <div class="card-author">
          <span class="av">${c.avatar}</span>
          <span class="name">${c.author}</span>
        </div>
      </div>
      <div class="card-rail">
        <button class="rail-btn" data-act="like"><span class="ico">❤</span><span class="lab">${c.likes}</span></button>
        <button class="rail-btn" data-act="comment"><span class="ico">💬</span><span class="lab">${c.cmts}</span></button>
        <button class="rail-btn" data-act="save"><span class="ico">⭐</span><span class="lab">收藏</span></button>
        <button class="rail-btn" data-act="share"><span class="ico">↗</span><span class="lab">分享</span></button>
      </div>
      <div class="card-search">
        <input type="text" placeholder="说点什么…" data-input>
        <button class="send-btn" data-send>SEND</button>
      </div>
      <div class="card-botnav"><b>首页</b><span>朋友</span><span class="plus"></span><span>消息</span><span>我</span></div>
    `;
    container.appendChild(card);
  }
}

const idx = id => String(parseInt(id.slice(1), 10)).padStart(2,'0');

// -------- 主流程 --------
async function main() {
  const tracker = new Tracker();
  const popup   = new AchievementPopup($('#popupRoot'), { sound:false });
  const gallery = new Gallery($('#galleryRoot'), tracker);
  popup.onShare = () => gallery.shareWall();

  // unlock -> 入弹窗 + 更新计数
  tracker.on(ev => {
    if (ev.type === 'unlock') {
      popup.enqueue(ev.ach);
      updateHeaderCount();
      bumpBrandSub(ev.ach);
    }
  });

  // 顶部计数器
  function updateHeaderCount() {
    const got = Object.keys(tracker.state.unlocked).length;
    $('#headerCount').textContent = got;
    $('#headerTotal').textContent = ACHIEVEMENTS.length;
  }

  // 顶部副标(动态文案)
  const SUBS = [
    '系统正在偷看你',
    '档案: 持续记录中',
    '不要慌, 我什么都没看到',
    '它在数你的每一次滑动',
    '你的草稿箱我也看到了',
  ];
  function bumpBrandSub(ach) {
    const el = $('#brandSub');
    el.textContent = `最近颁发: ${ach.name}`;
    el.style.color = '#e8a91d';
    clearTimeout(el._iv);
    el._iv = setTimeout(()=>{
      const txt = SUBS[Math.floor(Math.random()*SUBS.length)];
      el.textContent = txt;
      el.style.color = '';
    }, 3500);
  }
  setInterval(()=>{
    const el = $('#brandSub');
    if (!el.textContent.startsWith('最近颁发')) {
      el.textContent = SUBS[Math.floor(Math.random()*SUBS.length)];
    }
  }, 9000);

  // 顶栏按钮
  $('#headerTrophy').addEventListener('click', ()=>gallery.open());
  $('#headerSound').addEventListener('click', e=>{
    const on = !e.currentTarget.classList.contains('on');
    e.currentTarget.classList.toggle('on', on);
    e.currentTarget.textContent = on ? '🔊' : '🔇';
    popup.setSound(on);
  });

  // 渲染
  renderFeed($('#feed'));

  // 卡片交互
  $('#feed').addEventListener('click', e=>{
    const btn = e.target.closest('.rail-btn, [data-send]');
    if (!btn) return;
    const card = btn.closest('.feed-card');
    if (btn.dataset.act === 'like') {
      btn.classList.add('liked');
      const pop = document.createElement('span');
      pop.className = 'plus-one'; pop.textContent = '+1';
      btn.appendChild(pop); setTimeout(()=>pop.remove(), 700);
      tracker.like();
    } else if (btn.dataset.act === 'save') {
      btn.classList.add('saved');
      tracker.save_();
    } else if (btn.dataset.act === 'comment') {
      tracker.commentOpen();
      const input = card.querySelector('[data-input]');
      if (input) input.focus();
    } else if (btn.dataset.act === 'share') {
      flashToast('已复制链接 (假装)');
    } else if (btn.dataset.send !== undefined) {
      const input = card.querySelector('[data-input]');
      tracker.inputBlur(true);
      if (input) { input.value = ''; input.blur(); }
      flashToast('已发出 (假装)');
    }
  });

  // 输入框
  $('#feed').addEventListener('focusin', e=>{
    if (e.target.matches('[data-input]')) tracker.inputFocus();
  });
  $('#feed').addEventListener('focusout', e=>{
    if (e.target.matches('[data-input]')) tracker.inputBlur(false);
  });

  // IO 追踪可见卡片
  const io = new IntersectionObserver((entries) => {
    let best = null;
    for (const en of entries) {
      if (en.isIntersecting && (!best || en.intersectionRatio > best.intersectionRatio)) best = en;
    }
    if (!best) return;
    const id = best.target.dataset.id;
    const cat = best.target.dataset.cat;
    if (id !== tracker.currentCardId) tracker.viewCard({ id, cat });
  }, { root: $('#feed'), threshold:[0.6, 0.85] });
  document.querySelectorAll('.feed-card').forEach(el => io.observe(el));

  // swipe = 卡片换了就 +1; 同时用 scroll 大幅滚动也兜底
  let lastViewedId = null;
  tracker.on(ev => {
    if (ev.type === 'view_card' && ev.cardId !== lastViewedId) {
      if (lastViewedId !== null) tracker.swipe();
      lastViewedId = ev.cardId;
    }
  });

  // 启动
  tracker.startTicker();
  tracker.init();
  updateHeaderCount();

  // debug
  window.__ias = { tracker, popup, gallery };
}

// -------- toast --------
function flashToast(text) {
  let t = document.querySelector('#toast');
  if (!t) {
    t = document.createElement('div');
    t.id = 'toast'; t.className = 'toast';
    document.body.appendChild(t);
  }
  t.textContent = text;
  t.classList.add('show');
  clearTimeout(t._iv);
  t._iv = setTimeout(()=>t.classList.remove('show'), 1400);
}

main();
