// ===== 主应用 =====
import { FEED_CARDS, ACHIEVEMENTS, CATEGORY } from './data.js';
import { Tracker } from './tracker.js';
import { AchievementPopup } from './popup.js';
import { Gallery } from './gallery.js';
import { PersonaCard } from './persona.js';

const $ = sel => document.querySelector(sel);

// -------- 渲染信息流 (抖音风) --------
function renderFeed(container) {
  container.innerHTML = '';
  const head = FEED_CARDS.slice(0,1);
  const tail = [...FEED_CARDS.slice(1)].sort(()=>Math.random()-0.5);
  const cards = [...head, ...tail];

  for (const c of cards) {
    const meta = CATEGORY[c.cat] || {};
    const card = document.createElement('section');
    card.className = `dy-card vibe-${meta.vibe||'paper'}`;
    card.dataset.id = c.id;
    card.dataset.cat = c.cat;
    card.style.setProperty('--cat-accent', meta.accent || '#888');
    card.innerHTML = `
      <div class="dy-bg"><div class="dy-emoji">${c.emoji}</div></div>
      <div class="dy-shade"></div>

      <div class="dy-info">
        <h3 class="dy-user">@${c.author}</h3>
        <p class="dy-desc">${c.title}: ${c.desc} <span class="dy-tags">${c.tags}</span></p>
        <div class="dy-music">
          <span class="dy-music-ico">♫</span>
          <span class="dy-music-marq"><span class="dy-music-text">原声 - ${c.author} · ${c.title}</span></span>
        </div>
      </div>

      <div class="dy-rail">
        <div class="dy-avatar">
          <span class="dy-avatar-img">${c.avatar}</span>
          <span class="dy-avatar-plus">+</span>
        </div>
        <button class="dy-rail-btn" data-act="like">
          <span class="dy-rail-ico"><svg viewBox="0 0 24 24" width="34" height="34" fill="currentColor"><path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/></svg></span>
          <span class="dy-rail-lab">${c.likes}</span>
        </button>
        <button class="dy-rail-btn" data-act="comment">
          <span class="dy-rail-ico">💬</span>
          <span class="dy-rail-lab">${c.cmts}</span>
        </button>
        <button class="dy-rail-btn" data-act="save">
          <span class="dy-rail-ico">⭐</span>
          <span class="dy-rail-lab">收藏</span>
        </button>
        <button class="dy-rail-btn" data-act="share">
          <span class="dy-rail-ico">↗</span>
          <span class="dy-rail-lab">分享</span>
        </button>
        <div class="dy-disc"><div class="dy-disc-inner">${c.emoji}</div></div>
      </div>

      <div class="dy-cpop">
        <input type="text" placeholder="@${c.author} 说点什么…" data-input>
        <button class="dy-cpop-send" data-send>SEND</button>
        <button class="dy-cpop-close" data-close aria-label="关闭">×</button>
      </div>
    `;
    container.appendChild(card);
  }
}

// -------- 主流程 --------
async function main() {
  const tracker = new Tracker();
  const popup   = new AchievementPopup($('#popupRoot'), { sound:false });
  const persona = new PersonaCard($('#personaRoot'), tracker);
  const gallery = new Gallery($('#galleryRoot'), tracker, {
    onShowPersona: () => persona.showFromState(),
  });
  popup.onShare = () => gallery.shareWall();

  // unlock 事件: 入弹窗队列(用固化后的 desc/narrator)
  tracker.on(ev => {
    if (ev.type !== 'unlock') return;
    popup.enqueue({
      ach: ev.ach,
      desc: ev.materialized?.desc,
      narrator: ev.materialized?.narrator,
    });
    updateHeaderCount();
    $('#headerTrophy').classList.add('has-new');
    bumpBrandSub(ev.ach);
    updatePersonaProgress();

    // 第一个魔法时刻: 第 3 个成就解锁时, 排在弹窗之后弹出人设卡
    const got = Object.keys(tracker.state.unlocked).length;
    if (got >= 3 && !tracker.state.personaShown) {
      tracker.markPersonaShown();
      // 等 achievement popup 自动关闭后再弹
      setTimeout(()=>{ persona.showFromState(); }, 5200);
    }
  });

  // 顶部计数器
  function updateHeaderCount() {
    const got = Object.keys(tracker.state.unlocked).length;
    $('#headerCount').textContent = got;
    $('#headerTotal').textContent = ACHIEVEMENTS.length;
  }

  // 顶部副标 — 人设拼凑进度 (3 个成就 = 解锁人设卡)
  // 解锁前: 显示 1/3 2/3 进度
  // 解锁后: 显示动态副标
  function updatePersonaProgress() {
    if (tracker.state.personaShown) return;
    const got = Object.keys(tracker.state.unlocked).length;
    const need = 3;
    const cur = Math.min(got, need);
    const el = $('#brandSub');
    el.textContent = `AI 正在拼凑你的人设 · ${cur}/${need}`;
    el.style.color = '#e8a91d';
  }

  // 顶部副标(动态)
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
      if (!tracker.state.personaShown) {
        updatePersonaProgress();
      } else {
        el.textContent = SUBS[Math.floor(Math.random()*SUBS.length)];
        el.style.color = '';
      }
    }, 3500);
  }
  setInterval(()=>{
    const el = $('#brandSub');
    if (el.textContent.startsWith('最近颁发')) return;
    if (!tracker.state.personaShown) {
      updatePersonaProgress();
    } else {
      el.textContent = SUBS[Math.floor(Math.random()*SUBS.length)];
    }
  }, 9000);

  // 顶栏按钮
  $('#headerTrophy').addEventListener('click', ()=>{
    gallery.open();
    $('#headerTrophy').classList.remove('has-new');
  });

  // 渲染 feed
  renderFeed($('#feed'));

  // 卡片交互
  $('#feed').addEventListener('click', e=>{
    const btn = e.target.closest('.dy-rail-btn, [data-send], [data-close]');
    if (!btn) return;
    const card = btn.closest('.dy-card');
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
      card.classList.add('dy-cpop-show');
      const input = card.querySelector('[data-input]');
      if (input) setTimeout(()=>input.focus(), 120);
    } else if (btn.dataset.act === 'share') {
      flashToast('已复制链接 (假装)');
    } else if (btn.dataset.send !== undefined) {
      const input = card.querySelector('[data-input]');
      tracker.inputBlur(true);
      if (input) { input.value = ''; input.blur(); }
      card.classList.remove('dy-cpop-show');
      flashToast('已发出 (假装)');
    } else if (btn.dataset.close !== undefined) {
      const input = card.querySelector('[data-input]');
      if (input) input.blur();
      card.classList.remove('dy-cpop-show');
    }
  });

  // 输入框 focus/blur
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
  document.querySelectorAll('.dy-card').forEach(el => io.observe(el));

  // swipe = 卡片切换
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
  updatePersonaProgress();

  // debug
  window.__ias = { tracker, popup, gallery, persona };
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
