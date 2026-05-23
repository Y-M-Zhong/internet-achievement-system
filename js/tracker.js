// ===== 行为追踪 + 触发引擎 =====
// 设计：所有用户行为 → emit(event) → tracker 更新 state → 跑 ACHIEVEMENTS 规则 → 命中即 dispatch('unlock')
import { ACHIEVEMENTS } from './data.js';

const LS_KEY = 'ias_state_v1';

function newState() {
  return {
    startTs: Date.now(),
    swipes: 0,
    likes: 0,
    saves: 0,
    commentOpens: 0,
    inputFocusCount: 0,
    inputSendCount: 0,
    inputBlurFastCount: 0,        // 打开输入框后 1.5s 内关掉
    totalStayMs: 0,               // 卡片停留时长累计
    cardViews: {},                // id -> 进入次数
    catViews: {},                 // category -> 进入次数
    catSwitchLog: [],             // [{cat, t}] 最近 5 分钟内
    swipeLog: [],                 // [t] 最近 5 秒内
    unlocked: {},                 // id -> { ts, snapshot } 已解锁
  };
}

export class Tracker {
  constructor() {
    this.state = this.load() || newState();
    this.listeners = new Set();
    this.cardEnterTs = null;
    this.currentCardId = null;
    this.currentCat = null;
    this.lastInputFocusTs = 0;
  }

  on(fn) { this.listeners.add(fn); return () => this.listeners.delete(fn); }
  emit(ev) { this.listeners.forEach(fn => fn(ev)); }

  save() { try { localStorage.setItem(LS_KEY, JSON.stringify(this.state)); } catch {} }
  load() {
    try {
      const raw = localStorage.getItem(LS_KEY);
      if (!raw) return null;
      const s = JSON.parse(raw);
      // 重置会话级字段，让本次访问重新开始一些计数（但保留已解锁记录）
      s.startTs = Date.now();
      s.catSwitchLog = [];
      s.swipeLog = [];
      return s;
    } catch { return null; }
  }
  reset() { this.state = newState(); this.save(); this.emit({ type:'reset' }); }

  // ---------- 行为入口 ----------
  init()          { this.dispatch({ type:'init' }); }
  swipe()         { this.state.swipes++; this.state.swipeLog.push(Date.now()); this.trimRecent(); this.dispatch({ type:'swipe' }); }
  like()          { this.state.likes++;  this.dispatch({ type:'like' }); }
  save_()         { this.state.saves++;  this.dispatch({ type:'save' }); }
  commentOpen()   { this.state.commentOpens++; this.dispatch({ type:'comment_open' }); }
  inputFocus()    {
    this.state.inputFocusCount++;
    this.lastInputFocusTs = Date.now();
    this.dispatch({ type:'input_focus' });
  }
  inputBlur(sent) {
    if (sent) this.state.inputSendCount++;
    else if (Date.now() - this.lastInputFocusTs < 1500) this.state.inputBlurFastCount++;
    this.dispatch({ type:'input_blur', sent });
  }

  viewCard(card) {
    // 离开上一张
    if (this.currentCardId && this.cardEnterTs) {
      const stayMs = Date.now() - this.cardEnterTs;
      this.state.totalStayMs += stayMs;
      this.dispatch({
        type:'leave_card',
        cardId: this.currentCardId,
        cat: this.currentCat,
        stayMs,
      });
    }
    // 进入新卡
    this.currentCardId = card.id;
    this.currentCat = card.cat;
    this.cardEnterTs = Date.now();
    this.state.cardViews[card.id] = (this.state.cardViews[card.id]||0) + 1;
    this.state.catViews[card.cat] = (this.state.catViews[card.cat]||0) + 1;
    this.state.catSwitchLog.push({ cat: card.cat, t: Date.now() });
    this.trimRecent();
    this.dispatch({ type:'view_card', cardId: card.id, cat: card.cat });
  }

  // ---------- 维护近期窗口 ----------
  trimRecent() {
    const cut = Date.now() - 5*60_000;
    this.state.catSwitchLog = this.state.catSwitchLog.filter(x=>x.t>=cut);
    const cutSwipe = Date.now() - 5_000;
    this.state.swipeLog = this.state.swipeLog.filter(t=>t>=cutSwipe);
  }

  // ---------- 派发到规则引擎 ----------
  dispatch(ev) {
    this.emit(ev);
    for (const ach of ACHIEVEMENTS) {
      if (this.state.unlocked[ach.id]) continue;
      try {
        if (ach.check(this.state, ev)) this.unlock(ach);
      } catch (e) { /* 单条规则崩了不影响其他 */ }
    }
    this.save();
  }

  unlock(ach) {
    if (this.state.unlocked[ach.id]) return;
    this.state.unlocked[ach.id] = { ts: Date.now() };
    this.emit({ type:'unlock', ach });
    this.save();
  }

  // ---------- 周期性tick（用于"在线时长"类成就）----------
  startTicker() {
    clearInterval(this._tickIv);
    this._tickIv = setInterval(()=>{
      this.trimRecent();
      this.dispatch({ type:'tick' });
    }, 5000);
  }
}
