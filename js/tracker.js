// ===== 行为追踪 + 触发引擎 =====
// 所有用户行为 → emit(event) → 更新 state → 跑 ACHIEVEMENTS 规则
// 命中 → 立刻调用 descFn / narratorFn 拿到"基于真实数据"的文案, 固化到 unlocked 记录
import { ACHIEVEMENTS, buildCtx, materializeDesc, materializeNarrator } from './data.js';

const LS_KEY = 'ias_state_v3';
const LONG_STAY_MS = 15_000;

function newState() {
  return {
    startTs: Date.now(),
    swipes: 0,
    likes: 0,
    saves: 0,
    commentOpens: 0,
    inputFocusCount: 0,
    inputSendCount: 0,
    inputBlurFastCount: 0,
    totalStayMs: 0,
    longStays: 0,
    cardViews: {},
    catViews: {},
    catSwitchLog: [],
    swipeLog: [],
    cardEnterTs: null,
    lastCommentCardId: null,
    unlocked: {},      // id -> { ts, desc, narrator }
    personaShown: false, // 第一次人设卡是否已弹出
  };
}

export class Tracker {
  constructor() {
    this.state = this.load() || newState();
    // 兼容旧版字段
    if (this.state.longStays == null) this.state.longStays = 0;
    if (this.state.cardEnterTs == null) this.state.cardEnterTs = null;
    if (this.state.personaShown == null) this.state.personaShown = false;

    this.listeners = new Set();
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
      // 会话级字段重置 (保留解锁记录)
      s.startTs = Date.now();
      s.catSwitchLog = [];
      s.swipeLog = [];
      s.cardEnterTs = null;
      return s;
    } catch { return null; }
  }
  reset() { this.state = newState(); this.save(); this.emit({ type:'reset' }); }

  // ---------- 行为入口 ----------
  init() { this.dispatch({ type:'init' }); }

  swipe() {
    this.state.swipes++;
    this.state.swipeLog.push(Date.now());
    this.trimRecent();
    this.dispatch({ type:'swipe' });
  }

  like() {
    this.state.likes++;
    this.dispatch({ type:'like', cardId: this.currentCardId, cat: this.currentCat });
  }

  save_() {
    this.state.saves++;
    this.dispatch({ type:'save', cardId: this.currentCardId, cat: this.currentCat });
  }

  commentOpen() {
    this.state.commentOpens++;
    this.state.lastCommentCardId = this.currentCardId;
    this.dispatch({ type:'comment_open', cardId: this.currentCardId, cat: this.currentCat });
  }

  inputFocus() {
    this.state.inputFocusCount++;
    this.lastInputFocusTs = Date.now();
    this.dispatch({ type:'input_focus', cardId: this.currentCardId, cat: this.currentCat });
  }

  inputBlur(sent) {
    if (sent) this.state.inputSendCount++;
    else if (Date.now() - this.lastInputFocusTs < 1500) this.state.inputBlurFastCount++;
    this.dispatch({ type:'input_blur', sent, cardId: this.currentCardId });
  }

  viewCard(card) {
    // 离开上一张
    if (this.currentCardId && this.state.cardEnterTs) {
      const stayMs = Date.now() - this.state.cardEnterTs;
      this.state.totalStayMs += stayMs;
      if (stayMs >= LONG_STAY_MS) this.state.longStays++;
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
    this.state.cardEnterTs = Date.now();
    this.state.cardViews[card.id] = (this.state.cardViews[card.id]||0) + 1;
    this.state.catViews[card.cat] = (this.state.catViews[card.cat]||0) + 1;
    this.state.catSwitchLog.push({ cat: card.cat, t: Date.now(), cardId: card.id });
    this.trimRecent();
    this.dispatch({ type:'view_card', cardId: card.id, cat: card.cat });
  }

  trimRecent() {
    const cut = Date.now() - 5*60_000;
    this.state.catSwitchLog = this.state.catSwitchLog.filter(x => x.t >= cut);
    const cutSwipe = Date.now() - 5_000;
    this.state.swipeLog = this.state.swipeLog.filter(t => t >= cutSwipe);
  }

  // ---------- 派发到规则引擎 ----------
  // 链式约束：同一个 chain 的成就只能按声明顺序解锁
  dispatch(ev) {
    this.emit(ev);
    for (let i = 0; i < ACHIEVEMENTS.length; i++) {
      const ach = ACHIEVEMENTS[i];
      if (this.state.unlocked[ach.id]) continue;
      if (ach.chain) {
        const blocked = ACHIEVEMENTS.slice(0,i).some(a => a.chain === ach.chain && !this.state.unlocked[a.id]);
        if (blocked) continue;
      }
      try {
        if (ach.check(this.state, ev)) this.unlock(ach, ev);
      } catch {}
    }
    this.save();
  }

  // 解锁的瞬间立即把"基于真实数据"的文案固化下来
  unlock(ach, ev) {
    if (this.state.unlocked[ach.id]) return;
    const ctx = buildCtx(this.state);
    const desc     = materializeDesc(ach, this.state, ev, ctx);
    const narrator = materializeNarrator(ach, this.state, ev, ctx);
    this.state.unlocked[ach.id] = {
      ts: Date.now(),
      desc,
      narrator,
    };
    this.emit({ type:'unlock', ach, materialized:{ desc, narrator } });
    this.save();
  }

  // 标记人设卡已弹出, 避免重复打扰
  markPersonaShown() {
    this.state.personaShown = true;
    this.save();
  }

  startTicker() {
    clearInterval(this._tickIv);
    this._tickIv = setInterval(()=>{
      this.trimRecent();
      this.dispatch({ type:'tick' });
    }, 5000);
  }
}
