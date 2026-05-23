// ===== 信息流内容池 (24 张) =====
export const FEED_CARDS = [
  { id:'f01', cat:'study',      emoji:'📚', title:'5分钟搞定动态规划',     desc:'刷完这条你就是面试官的噩梦。',         tags:'#5分钟学会 #上岸',      author:'代码不打烊',  avatar:'🧑‍💻', likes:'12.4w', cmts:'3.2k' },
  { id:'f02', cat:'study',      emoji:'🧠', title:'高效背单词法 据说能背完红宝书', desc:'今天的flag已经够你立到明年了。',     tags:'#考研 #英语 #自律',   author:'学霸日常',    avatar:'📖',   likes:'10.2w', cmts:'3.8k' },
  { id:'f03', cat:'study',      emoji:'✏️', title:'笔记法 让你的字看起来很贵',   desc:'颜值即生产力, 美也是真理。',             tags:'#手帐 #学习方法',     author:'文具控',      avatar:'📝',   likes:'6.8w',  cmts:'1.9k' },
  { id:'f04', cat:'shopping',   emoji:'🛍️', title:'真的太香了 谁懂啊',         desc:'今年最划算的不踩雷好物清单。',          tags:'#好物分享 #平价',     author:'省钱小达人',  avatar:'💸',   likes:'8.7w',  cmts:'2.1k' },
  { id:'f05', cat:'shopping',   emoji:'👟', title:'球鞋圈又出新款',           desc:'看看就好, 真的不买。',                  tags:'#球鞋 #穿搭',         author:'鞋柜爆炸',    avatar:'🏃',   likes:'7.8w',  cmts:'2.3k' },
  { id:'f06', cat:'shopping',   emoji:'🪑', title:'我家终于有客厅的样子了',     desc:'10件让小户型瞬间变大的家居好物。',     tags:'#家居 #软装',         author:'家装日记',    avatar:'🏠',   likes:'5.5w',  cmts:'1.2k' },
  { id:'f07', cat:'food',       emoji:'🍜', title:'深夜放毒预警',             desc:'凌晨1点不许刷我, 不准。',               tags:'#深夜食堂 #放毒',     author:'饿货研究所',  avatar:'🍣',   likes:'24.1w', cmts:'7.8k' },
  { id:'f08', cat:'food',       emoji:'🍔', title:'打工人续命汉堡 TOP1',        desc:'外卖榜单第一名实测.',                   tags:'#外卖 #打工人',       author:'饿了么测评',  avatar:'🍟',   likes:'14.5w', cmts:'4.7k' },
  { id:'f09', cat:'food',       emoji:'🥟', title:'妈妈牌饺子的复刻版本',       desc:'今天我也是会做饭的人了。',              tags:'#家常菜 #手作',       author:'今日厨房',    avatar:'🥢',   likes:'6.3w',  cmts:'1.8k' },
  { id:'f10', cat:'philosophy', emoji:'🌌', title:'我们为什么活着',           desc:'看完整个人都静了, 不要在凌晨刷。',     tags:'#人生 #内耗',         author:'野生哲学家',  avatar:'🤔',   likes:'3.2w',  cmts:'9.4k' },
  { id:'f11', cat:'philosophy', emoji:'🌙', title:'凌晨3点的思考',            desc:'人类只是宇宙的灰尘. 但是是会发光的那种。', tags:'#emo #深夜',        author:'夜猫研究所',  avatar:'🦉',   likes:'2.8w',  cmts:'6.3k' },
  { id:'f12', cat:'philosophy', emoji:'🪞', title:'你和你, 谁更像你',          desc:'一个让心理咨询师破防的问题。',          tags:'#自我 #抽象',         author:'胡思乱想',    avatar:'🫧',   likes:'1.4w',  cmts:'4.1k' },
  { id:'f13', cat:'pet',        emoji:'🐱', title:'猫主子的下班仪式',         desc:'人类觉得可爱, 它觉得这是工作。',        tags:'#吸猫 #治愈',         author:'主子驾到',    avatar:'😼',   likes:'18.9w', cmts:'4.5k' },
  { id:'f14', cat:'pet',        emoji:'🐕', title:'狗子第一次见雪',           desc:'快乐能感染整个屏幕, 不信你看。',        tags:'#萌宠 #沙雕',         author:'铲屎官联盟',  avatar:'🐾',   likes:'19.4w', cmts:'5.6k' },
  { id:'f15', cat:'pet',        emoji:'🐢', title:'我家的乌龟比我活得明白',     desc:'今天它又躺平了, 这就是答案。',          tags:'#异宠 #躺平',         author:'佛系铲屎',    avatar:'🐢',   likes:'4.7w',  cmts:'1.3k' },
  { id:'f16', cat:'fitness',    emoji:'💪', title:'三天练出腹肌(不可能)',     desc:'但每天看看可以骗过自己, 也算成功。',   tags:'#健身 #flag',         author:'王教练',      avatar:'🏋️',   likes:'6.2w',  cmts:'1.8k' },
  { id:'f17', cat:'fitness',    emoji:'🧘', title:'10分钟瑜伽: 床上版',        desc:'起不来? 那就在床上做。',                tags:'#瑜伽 #躺着练',       author:'瑜伽小红',    avatar:'🌸',   likes:'4.9w',  cmts:'1.1k' },
  { id:'f18', cat:'game',       emoji:'🎮', title:'巅峰赛三连绝世',           desc:'剪辑只剩高光时刻, 失败已删除。',        tags:'#王者 #操作',         author:'峡谷之巅',    avatar:'⚔️',   likes:'15.6w', cmts:'5.1k' },
  { id:'f19', cat:'game',       emoji:'🕹️', title:'独立游戏黑马推荐',         desc:'通关一晚上, 后悔玩晚了。',              tags:'#独游 #推荐',         author:'游戏不眠夜',  avatar:'👾',   likes:'8.3w',  cmts:'2.9k' },
  { id:'f20', cat:'beauty',     emoji:'💄', title:'抗老黑科技曝光',           desc:'30岁的脸25岁的状态, 信我就行。',        tags:'#美妆 #抗老',         author:'仙女养成',    avatar:'✨',   likes:'9.1w',  cmts:'2.7k' },
  { id:'f21', cat:'finance',    emoji:'📈', title:'普通人如何财富自由',       desc:'10分钟讲透 但你不会做 (好诚实)。',     tags:'#理财 #搞钱',         author:'老张谈钱',    avatar:'💰',   likes:'4.7w',  cmts:'1.5k' },
  { id:'f22', cat:'music',      emoji:'🎵', title:'循环一整夜的歌',           desc:'戴上耳机请准备好, 我可没说不会哭。',    tags:'#网抑云 #歌单',       author:'耳机依赖',    avatar:'🎧',   likes:'21.3w', cmts:'8.2k' },
  { id:'f23', cat:'movie',      emoji:'🎬', title:'神级反转 3分钟解说',        desc:'看完忍不住二刷的电影, 已收藏。',        tags:'#电影解说 #反转',     author:'毒舌速看',    avatar:'🎞️',   likes:'13.8w', cmts:'4.1k' },
  { id:'f24', cat:'travel',     emoji:'🏔️', title:'周末就出发 莫干山',       desc:'山野徒步治愈一周班味。',                 tags:'#周末 #徒步',         author:'野人小K',    avatar:'🥾',   likes:'5.5w',  cmts:'1.2k' },
];

// ===== 分类信息 =====
export const CATEGORY = {
  study:      { label:'学习',   stamp:'STUDY · 学海',     accent:'#5b87e0', vibe:'paper'   },
  shopping:   { label:'购物',   stamp:'SALES · 限时',     accent:'#e85d5d', vibe:'tabloid' },
  food:       { label:'美食',   stamp:'EAT · 深夜放毒',   accent:'#f59133', vibe:'warm'    },
  philosophy: { label:'哲学',   stamp:'EMO · 凌晨开机',   accent:'#9a8bd6', vibe:'serif'   },
  pet:        { label:'萌宠',   stamp:'PET · 治愈中',     accent:'#f48fb1', vibe:'pastel'  },
  fitness:    { label:'健身',   stamp:'FIT · 立 flag',    accent:'#2bb673', vibe:'bold'    },
  game:       { label:'游戏',   stamp:'PLAY · 操作大师',  accent:'#7a52ff', vibe:'pixel'   },
  beauty:     { label:'美妆',   stamp:'BEAUTY · 黑科技',  accent:'#e16daa', vibe:'gloss'   },
  finance:    { label:'财经',   stamp:'MONEY · 搞钱',     accent:'#3aa86b', vibe:'mono'    },
  music:      { label:'音乐',   stamp:'TUNE · 单曲循环',  accent:'#5fb7e0', vibe:'wave'    },
  movie:      { label:'电影',   stamp:'FILM · 速看',      accent:'#c84057', vibe:'cinema'  },
  travel:     { label:'旅行',   stamp:'TRIP · 周末出走',  accent:'#3da78a', vibe:'postcard'},
};

// ===== ctx 辅助 =====
// 在 unlock 瞬间被 tracker 构造并传给 descFn / narratorFn
// 让"动态文案"能拿到真实的卡片标题、时间、计数等
export function buildCtx(state) {
  return {
    card: id => FEED_CARDS.find(c => c.id === id),
    catLabel: cat => (CATEGORY[cat] || {}).label || cat,
    hm: () => {
      const d = new Date();
      return `${String(d.getHours()).padStart(2,'0')}:${String(d.getMinutes()).padStart(2,'0')}`;
    },
    sec:    ms => (ms/1000).toFixed(1),
    secInt: ms => Math.round(ms/1000),
    period: () => {
      const h = new Date().getHours();
      return h<5?'凌晨':h<8?'清晨':h<12?'上午':h<14?'中午':h<18?'下午':h<22?'晚上':'深夜';
    },
    recentCardsInCat: (cat, n=2) => {
      return (state.catSwitchLog||[])
        .filter(x => x.cat === cat)
        .slice(-n)
        .map(x => FEED_CARDS.find(c => c.id === x.cardId))
        .filter(Boolean);
    },
    minutesOnline: () => Math.floor((Date.now() - state.startTs)/60_000),
    mostViewedCat: () => {
      const entries = Object.entries(state.catViews||{});
      if (!entries.length) return null;
      return entries.sort((a,b)=>b[1]-a[1])[0];
    },
  };
}

// ===== 工具：把 desc/narrator 解析为字符串 =====
// 优先用 descFn (动态)，fallback 到 desc (静态)
export function materializeDesc(ach, state, event, ctx) {
  try { if (typeof ach.descFn === 'function') return ach.descFn(state, event, ctx) || ach.desc; }
  catch {}
  return ach.desc;
}
export function materializeNarrator(ach, state, event, ctx) {
  try { if (typeof ach.narratorFn === 'function') return ach.narratorFn(state, event, ctx) || ach.narrator; }
  catch {}
  return ach.narrator;
}

// ===== 成就池 (41 条, 全部动态化) =====
// 字段: id / rarity / icon / name / rate / chain?
//      desc (静态 fallback) / descFn(state,event,ctx)
//      narrator (静态 fallback) / narratorFn(state,event,ctx)
//      personaSlug (人设标签) / personaWeight (越高越具识别度, 0 = 不参与组合)
//      check(state, event) (规则)
export const ACHIEVEMENTS = [
  // ============ 普通 ============
  { id:'arrive', rarity:'common', icon:'👋', name:'《抵达现场》',
    rate:'99.7%', personaSlug:'互联网新人', personaWeight:0,
    desc:'成功打开这个不知道是什么的东西。',
    narrator:'又一个进来的, 记一笔。',
    descFn:(s,e,ctx)=>`你在 <b>${ctx.hm()}</b> 的${ctx.period()}抵达。系统已为你建立档案。`,
    narratorFn:(s,e,ctx)=>`档案编号 #${Math.floor((s.startTs%900000)+100000)}`,
    check:(s,e)=> e.type==='init' },

  { id:'swipe5', rarity:'common', icon:'👆', name:'《滑动小能手》',
    rate:'92.4%', personaSlug:'滑动选手', personaWeight:1,
    desc:'5 次滑动起步, 你已是合格的电子游民。',
    narrator:'数据已记录。',
    descFn:(s,e,ctx)=>{
      const avg = s.swipes > 0 ? (s.totalStayMs/s.swipes/1000).toFixed(1) : '0';
      return `你已滑动 <b>${s.swipes}</b> 次, 平均每张停留 <b>${avg}</b> 秒。`;
    },
    narratorFn:(s)=> `${s.swipes} 次, 才刚起步。`,
    check:(s,e)=> s.swipes>=5 },

  { id:'first_like', rarity:'common', icon:'❤️', name:'《今天的第一颗心》',
    rate:'88.1%', personaSlug:'心动派', personaWeight:1,
    desc:'你的第一次点赞已正式归档。',
    narrator:'就这? 行吧。',
    descFn:(s,e,ctx)=>{
      const card = ctx.card(e.cardId);
      return card
        ? `你给《${card.title}》点了第一颗心。系统已截图存证。`
        : `你的第一次点赞已正式归档。`;
    },
    narratorFn:(s,e,ctx)=> `${ctx.hm()}, 心意收到。`,
    check:(s,e)=> e.type==='like' && s.likes===1 },

  { id:'first_save', rarity:'common', icon:'⭐', name:'《下次一定会看》',
    rate:'79.3%', personaSlug:'收藏初学者', personaWeight:1,
    desc:'下次的具体时间是什么时候。',
    narrator:'懂得都懂。',
    descFn:(s,e,ctx)=>{
      const card = ctx.card(e.cardId);
      return card
        ? `《${card.title}》进了你的收藏夹。下次的时间未定。`
        : `你按了收藏。"下次一定" 的下次到底是哪一次。`;
    },
    narratorFn:()=>`下次, 别骗自己。`,
    check:(s,e)=> e.type==='save' && s.saves===1 },

  { id:'quantum_learn', rarity:'common', icon:'⚡', name:'《量子学习》',
    rate:'76.2%', personaSlug:'量子学习者', personaWeight:3,
    desc:'在学习视频停留不到 3 秒, 默认已经掌握。',
    narrator:'3 秒学完, 行业天花板。',
    descFn:(s,e,ctx)=>{
      const card = ctx.card(e.cardId);
      const sec = ctx.sec(e.stayMs);
      return `你在《${card?.title || '学习内容'}》只停了 <b>${sec} 秒</b> 就划走。系统默认你已精通${ctx.catLabel(e.cat)}。`;
    },
    narratorFn:(s,e,ctx)=> `<b>${ctx.sec(e.stayMs)}</b> 秒成大师, 行业新天花板。`,
    check:(s,e)=> e.type==='leave_card' && e.cat==='study' && e.stayMs<3000 },

  { id:'shopping_2', rarity:'common', icon:'🛒', name:'《看看就好》', chain:'shopping',
    rate:'65.6%', personaSlug:'假装不剁手', personaWeight:2,
    desc:'连续看了 3 条购物内容, 钱包暂时安全。',
    narrator:'钱包: 谢谢。',
    descFn:(s,e,ctx)=>{
      const n = s.catViews.shopping || 0;
      const recent = ctx.recentCardsInCat('shopping', 2).map(c=>c.title);
      const ex = recent.length ? ` (包括《${recent.join('》、《')}》)` : '';
      return `你看了 <b>${n}</b> 条购物内容${ex}, 但还没有"购买"任何东西。`;
    },
    narratorFn:()=>`钱包: 谢谢, 但下次还想看。`,
    check:(s,e)=> (s.catViews.shopping||0)>=3 },

  { id:'time_master', rarity:'common', icon:'⏳', name:'《本来想刷5分钟》',
    rate:'67.9%', personaSlug:'时间幻觉派', personaWeight:1,
    desc:'你已在线 1 分钟, 这才刚开始。',
    narrator:'温馨提示: 才一分钟。',
    descFn:(s,e,ctx)=>{
      const min = ctx.minutesOnline();
      return `你已经在线 <b>${min}</b> 分钟, 滑了 <b>${s.swipes}</b> 次。"再看一会儿"是哲学命题。`;
    },
    narratorFn:(s,e,ctx)=> `${ctx.minutesOnline()} 分钟过去, 时间不复存在。`,
    check:(s,e)=> (Date.now()-s.startTs)>=60_000 },

  { id:'read_no_reply', rarity:'common', icon:'💬', name:'《已读不回艺术家》',
    rate:'55.4%', personaSlug:'已读不回家', personaWeight:2,
    desc:'打开评论 ≠ 想要发言, 这很合理。',
    narrator:'评论区不是发言区。',
    descFn:(s,e,ctx)=>{
      const card = ctx.card(s.lastCommentCardId || e.cardId);
      const where = card ? ` 在《${card.title}》` : '';
      return `你${where}打开了评论区, 但什么也没说。看, 不一定要回。`;
    },
    narratorFn:()=>`评论区是用来看的, 不是用来发言的。`,
    check:(s,e)=> e.type==='comment_open' && s.commentOpens>=1 },

  { id:'multi_like', rarity:'common', icon:'💖', name:'《点赞流水线》',
    rate:'41.7%', personaSlug:'点赞工厂主', personaWeight:2,
    desc:'10 个赞: 你今天心情应该不错。',
    narrator:'心意收下。',
    descFn:(s,e,ctx)=>`${ctx.hm()} 之前, 你已经点了 <b>${s.likes}</b> 个赞。算法已为你打上"易满足"标签。`,
    narratorFn:(s)=> `${s.likes} 颗心, 全部收到。`,
    check:(s,e)=> s.likes>=10 },

  { id:'pet_lover', rarity:'common', icon:'🐱', name:'《又点开吸猫了》',
    rate:'44.2%', personaSlug:'电子吸猫党', personaWeight:3,
    desc:'看 3 条萌宠, 你的多巴胺已被预订。',
    narrator:'懂的。',
    descFn:(s,e,ctx)=>{
      const n = s.catViews.pet || 0;
      const recent = ctx.recentCardsInCat('pet', 2).map(c=>c.title);
      const ex = recent.length ? ` (《${recent.join('》、《')}》)` : '';
      return `你已经看过 <b>${n}</b> 条萌宠${ex}。今天的多巴胺已由它们供应。`;
    },
    narratorFn:()=>`懂的, 谁能拒绝。`,
    check:(s,e)=> (s.catViews.pet||0)>=3 },

  { id:'side_eye', rarity:'common', icon:'💨', name:'《没看完就划了》',
    rate:'48.2%', personaSlug:'蜻蜓点水派', personaWeight:2,
    desc:'10 次滑动平均停留不到 2 秒, 该叫醒算法了。',
    narrator:'下一条更好? 拭目以待。',
    descFn:(s)=>{
      const avg = (s.totalStayMs/Math.max(s.swipes,1)/1000).toFixed(1);
      return `<b>${s.swipes}</b> 次滑动, 平均每张只看 <b>${avg}</b> 秒。下一条更好? 拭目以待。`;
    },
    narratorFn:(s)=> `${(s.totalStayMs/Math.max(s.swipes,1)/1000).toFixed(1)} 秒/张, 算法跟不上你。`,
    check:(s,e)=> s.swipes>=10 && (s.totalStayMs/s.swipes)<2000 },

  { id:'food_night', rarity:'common', icon:'🌃', name:'《半夜想吃东西》',
    rate:'38.4%', personaSlug:'深夜放毒受害者', personaWeight:3,
    desc:'夜里 10 点之后看美食, 这种事还是少做。',
    narrator:'饿了就睡, 别折磨自己。',
    descFn:(s,e,ctx)=>{
      const card = ctx.card(e.cardId);
      return `<b>${ctx.hm()}</b> 看到《${card?.title || '某条美食'}》。饿了就睡, 别再划了。`;
    },
    narratorFn:(s,e,ctx)=> `${ctx.hm()} 不应该刷美食。`,
    check:(s,e)=> { const h=new Date().getHours(); return e.type==='view_card' && e.cat==='food' && (h>=22||h<=4); } },

  { id:'heart_struck', rarity:'common', icon:'💘', name:'《心动了》',
    rate:'31.5%', personaSlug:'电子心动派', personaWeight:2,
    desc:'同一条视频停留超过 12 秒, 已截图存证。',
    narrator:'你的偶像剧已收件。',
    descFn:(s,e,ctx)=>{
      const card = ctx.card(e.cardId);
      const sec = ctx.secInt(e.stayMs);
      return `《${card?.title || '某条视频'}》留住你 <b>${sec} 秒</b>。系统判定: 疑似心动现场。`;
    },
    narratorFn:(s,e,ctx)=> `${ctx.secInt(e.stayMs)} 秒, 你的目光出卖了你。`,
    check:(s,e)=> e.type==='leave_card' && e.stayMs>=12_000 },

  { id:'comment_open', rarity:'common', icon:'👀', name:'《想看评论》',
    rate:'58.0%', personaSlug:'评论区好奇宝宝', personaWeight:1,
    desc:'你也好奇别人怎么说? 你不是一个人。',
    narrator:'底下藏着真世界。',
    descFn:(s,e,ctx)=>{
      const card = ctx.card(e.cardId);
      return `你打开了《${card?.title || '某条视频'}》的评论区。别人怎么想, 比内容更重要。`;
    },
    narratorFn:()=>`底下藏着真世界。`,
    check:(s,e)=> e.type==='comment_open' },

  { id:'first_search', rarity:'common', icon:'🔍', name:'《打开了搜索框》',
    rate:'47.1%', personaSlug:'搜索犹豫人', personaWeight:1,
    desc:'你想说点什么, 然后大概率不会说出来。',
    narrator:'—',
    descFn:(s,e,ctx)=>{
      const card = ctx.card(e.cardId);
      const where = card ? `在《${card.title}》` : '';
      return `你${where}点开了输入框 <b>第 1 次</b>。打字 ≠ 发出去。`;
    },
    check:(s,e)=> e.type==='input_focus' && s.inputFocusCount===1 },

  // ============ 稀有 ============
  { id:'midnight_phil', rarity:'rare', icon:'🌙', name:'《深夜哲学家》',
    rate:'8.7%', personaSlug:'深夜哲学家', personaWeight:4,
    desc:'凌晨 2 点开始思考人生, 请节哀。',
    narrator:'我陪着你, 别一个人扛。',
    descFn:(s,e,ctx)=>{
      const card = ctx.card(e.cardId);
      return `<b>${ctx.hm()}</b>, 你打开《${card?.title || '一段哲学'}》。深夜的脑回路, 自带哲学滤镜。`;
    },
    narratorFn:(s,e,ctx)=> `${ctx.hm()}, 一起失眠。`,
    check:(s,e)=> { const h=new Date().getHours(); return e.type==='view_card' && e.cat==='philosophy' && (h>=23||h<=5); } },

  { id:'cyber_shy', rarity:'rare', icon:'⌨️', name:'《赛博社恐》', chain:'shy',
    rate:'5.2%', personaSlug:'赛博社恐', personaWeight:4,
    desc:'输入框打开 5 次, 一个字也没发出去。',
    narrator:'打完字又撤回的人, 看到这条就懂了。',
    descFn:(s)=>`你打开输入框 <b>${s.inputFocusCount}</b> 次, 发出 <b>0</b> 个字。打字 → 撤回 → 再打字, 现代人的诚实。`,
    narratorFn:(s)=> `<b>${s.inputFocusCount}</b> 次开框 - <b>${s.inputBlurFastCount}</b> 次秒退。`,
    check:(s,e)=> s.inputFocusCount>=5 && s.inputSendCount===0 },

  { id:'collector', rarity:'rare', icon:'⭐', name:'《收藏家》',
    rate:'11.4%', personaSlug:'收藏夹守门人', personaWeight:3,
    desc:'已收藏 8 条视频, 没有回看任何一条。',
    narrator:'档案: 已塞满。',
    descFn:(s)=>`你已收藏 <b>${s.saves}</b> 条, 回看过 <b>0</b> 条。"下次一定" 的下次还没来。`,
    narratorFn:(s)=> `${s.saves} 条 + 0 次回看。`,
    check:(s,e)=> s.saves>=8 },

  { id:'replayer', rarity:'rare', icon:'🔁', name:'《复读机》',
    rate:'9.6%', personaSlug:'回看研究员', personaWeight:3,
    desc:'同一条视频回看 3 次, 你在找彩蛋吗。',
    narrator:'二刷的人 品出新东西了吗?',
    descFn:(s,e,ctx)=>{
      const top = Object.entries(s.cardViews||{}).sort((a,b)=>b[1]-a[1])[0];
      if (!top) return `你回看了某条视频 3 次以上。系统都开始好奇。`;
      const card = ctx.card(top[0]);
      return `你已经第 <b>${top[1]}</b> 次刷到《${card?.title || '同一条'}》。在找什么彩蛋?`;
    },
    narratorFn:(s)=> `这是第${Math.max(...Object.values(s.cardViews||{0:1}))}次了。`,
    check:(s,e)=> Object.values(s.cardViews||{}).some(v=>v>=3) },

  { id:'channel_surf', rarity:'rare', icon:'🎚️', name:'《切换大师》',
    rate:'13.1%', personaSlug:'分类游牧民', personaWeight:3,
    desc:'60 秒内切换 5 种不同兴趣, 算法已晕。',
    narrator:'你刚才在搜什么?',
    descFn:(s,e,ctx)=>{
      const cut = Date.now()-60_000;
      const recent = [...new Set(s.catSwitchLog.filter(x=>x.t>=cut).map(x=>x.cat))];
      const labels = recent.map(c=>ctx.catLabel(c)).join(' → ');
      return `60 秒内你横穿了 <b>${recent.length}</b> 个分类: ${labels}。算法跟不上你的频率。`;
    },
    narratorFn:(s,e,ctx)=>{
      const cut = Date.now()-60_000;
      const n = new Set(s.catSwitchLog.filter(x=>x.t>=cut).map(x=>x.cat)).size;
      return `60 秒切了 ${n} 次。`;
    },
    check:(s,e)=> {
      const cut = Date.now()-60_000;
      const recent = s.catSwitchLog.filter(x=>x.t>=cut);
      return new Set(recent.map(x=>x.cat)).size>=5;
    } },

  { id:'comment_native', rarity:'rare', icon:'👥', name:'《评论区原住民》',
    rate:'14.8%', personaSlug:'评论区原住民', personaWeight:3,
    desc:'4 次打开评论区, 怀疑你认为这才是主战场。',
    narrator:'知音 ✋',
    descFn:(s)=> `你已经打开评论区 <b>${s.commentOpens}</b> 次。视频只是开胃, 评论才是正餐。`,
    narratorFn:(s)=> `${s.commentOpens} 次打开评论。`,
    check:(s,e)=> s.commentOpens>=4 },

  { id:'fake_busy', rarity:'rare', icon:'🎭', name:'《打字 删除 再打字》',
    rate:'7.3%', personaSlug:'草稿箱常驻', personaWeight:3,
    desc:'3 次打开输入框又快速关掉。',
    narrator:'你的草稿箱已超载。',
    descFn:(s)=> `打开输入框 <b>${s.inputFocusCount}</b> 次, <b>${s.inputBlurFastCount}</b> 次没到 1.5 秒就关掉。你想说什么呢?`,
    narratorFn:()=>`想说没说, 这才是创作。`,
    check:(s,e)=> s.inputFocusCount>=3 && s.inputBlurFastCount>=3 },

  { id:'tired_1', rarity:'rare', icon:'🥱', name:'《今天有点累》', chain:'tired',
    rate:'17.4%', personaSlug:'电子困倦者', personaWeight:2,
    desc:'你在某条视频上停了很久, 没动。',
    narrator:'—',
    descFn:(s,e,ctx)=>{
      const card = ctx.card(e.cardId);
      const sec = ctx.secInt(e.stayMs);
      return `你在《${card?.title || '某条视频'}》上发了 <b>${sec} 秒</b>呆。今天有点累。`;
    },
    narratorFn:(s,e,ctx)=> `屏幕亮着, 你不动。`,
    check:(s,e)=> s.longStays===1 },

  { id:'impulse_like', rarity:'rare', icon:'⚡', name:'《手滑双击》',
    rate:'22.3%', personaSlug:'手指诚实党', personaWeight:3,
    desc:'看到一半就点赞, 你的手指比你诚实。',
    narrator:'记一笔, 不点评。',
    descFn:(s,e,ctx)=>{
      const card = ctx.card(e.cardId);
      const elapsed = ((Date.now()-(s.cardEnterTs||Date.now()))/1000).toFixed(1);
      return `《${card?.title || '某条视频'}》才刷出来 <b>${elapsed} 秒</b>, 你就点了赞。手指诚实。`;
    },
    narratorFn:(s,e,ctx)=> `手快一点没什么不好。`,
    check:(s,e)=> e.type==='like' && (Date.now()-(s.cardEnterTs||0))<2500 },

  { id:'shopping_4', rarity:'rare', icon:'🧾', name:'《又看了》', chain:'shopping',
    rate:'15.8%', personaSlug:'钱包警告型', personaWeight:3,
    desc:'5 条购物内容, 我数着的。',
    narrator:'—',
    descFn:(s,e,ctx)=>{
      const n = s.catViews.shopping || 0;
      const recent = ctx.recentCardsInCat('shopping', 3).map(c=>c.title);
      const ex = recent.length ? `: ${recent.map(t=>`《${t}》`).join(', ')}` : '';
      return `第 <b>${n}</b> 条了${ex}。我数着的。`;
    },
    narratorFn:(s)=>`${s.catViews.shopping||0} 条, 还要看吗。`,
    check:(s,e)=> (s.catViews.shopping||0)>=5 },

  { id:'stay_zen', rarity:'rare', icon:'🪷', name:'《停下来想想》',
    rate:'9.2%', personaSlug:'屏幕禅修人', personaWeight:3,
    desc:'同一条视频停留超过 20 秒, 稀有: 出现思考。',
    narrator:'罕见镜头, 已记录。',
    descFn:(s,e,ctx)=>{
      const card = ctx.card(e.cardId);
      const sec = ctx.secInt(e.stayMs);
      return `《${card?.title || '某条视频'}》上你呆了 <b>${sec} 秒</b>。屏幕里是什么, 屏幕外是你。`;
    },
    narratorFn:(s,e,ctx)=> `${ctx.secInt(e.stayMs)} 秒, 在想什么。`,
    check:(s,e)=> e.type==='leave_card' && e.stayMs>=20_000 },

  { id:'meta_swipe', rarity:'rare', icon:'🧷', name:'《算法揭秘》',
    rate:'6.5%', personaSlug:'算法揭秘人', personaWeight:2,
    desc:'你已切换 7 个分类, 算法档案 +1。',
    narrator:'你已被打上标签 (假的)。',
    descFn:(s,e,ctx)=>{
      const cats = Object.keys(s.catViews).map(c=>ctx.catLabel(c));
      return `你已经切过 <b>${cats.length}</b> 个分类: ${cats.join('、')}。算法给你的画像 +1 个困惑。`;
    },
    narratorFn:(s)=>`画像更新中..."所有"是个标签。`,
    check:(s,e)=> Object.keys(s.catViews).length>=7 },

  // ============ 史诗 ============
  { id:'human_observer', rarity:'epic', icon:'👁️', name:'《人类观察者》',
    rate:'1.9%', personaSlug:'评论区学者', personaWeight:4,
    desc:'打开评论区 6 次, 点赞却很克制。AI 决定颁发学位。',
    narrator:'毕业证书已寄出。',
    descFn:(s)=> `<b>${s.commentOpens}</b> 次打开评论区, 只点了 <b>${s.likes}</b> 个赞。你在做田野调查吗?`,
    narratorFn:(s)=> `${s.commentOpens} 评论 / ${s.likes} 赞, 你是研究员。`,
    check:(s,e)=> s.commentOpens>=6 && s.likes<=2 },

  { id:'mind_drift', rarity:'epic', icon:'🧭', name:'《精神流浪》',
    rate:'2.4%', personaSlug:'精神流浪者', personaWeight:4,
    desc:'连续切换 10 个不同兴趣领域, 已迷路。',
    narrator:'你究竟想看什么。',
    descFn:(s,e,ctx)=>{
      const cats = Object.keys(s.catViews).map(c=>ctx.catLabel(c));
      return `${cats.length} 个分类你都点开过: ${cats.join('、')}。算法给你的画像已撕到第三版。`;
    },
    narratorFn:(s)=>`${Object.keys(s.catViews).length} 个标签, 没一个稳。`,
    check:(s,e)=> Object.keys(s.catViews).length>=10 },

  { id:'collect_end', rarity:'epic', icon:'📦', name:'《收藏夹的尽头》',
    rate:'1.4%', personaSlug:'收藏夹尽头人', personaWeight:4,
    desc:'15 条收藏 + 0 次回看, 系统已为你预约清理日。',
    narrator:'我替你清空 也不会通知你。',
    descFn:(s)=> `你的收藏夹: <b>${s.saves}</b> 条进入, <b>0</b> 条回看。它在变成第二个浏览器收藏夹。`,
    narratorFn:()=>`收藏夹是文物保存室。`,
    check:(s,e)=> s.saves>=15 },

  { id:'zen_blank', rarity:'epic', icon:'🧘', name:'《沉浸式发呆》',
    rate:'3.6%', personaSlug:'沉浸发呆派', personaWeight:3,
    desc:'在同一条视频呆了 25 秒以上, 不敢打扰。',
    narrator:'屏住呼吸的人是我。',
    descFn:(s,e,ctx)=>{
      const card = ctx.card(e.cardId);
      return `《${card?.title || '某条视频'}》上你停了 <b>${ctx.secInt(e.stayMs)} 秒</b>。我屏住呼吸, 没敢打扰。`;
    },
    narratorFn:(s,e,ctx)=> `${ctx.secInt(e.stayMs)} 秒, 时间被你按了暂停。`,
    check:(s,e)=> e.type==='leave_card' && e.stayMs>=25_000 },

  { id:'tired_2', rarity:'epic', icon:'😶‍🌫️', name:'《真的有点累》', chain:'tired',
    rate:'2.1%', personaSlug:'真·困倦者', personaWeight:3,
    desc:'又一次长时间发呆, 第二次了。',
    narrator:'—',
    descFn:(s)=> `这是你 <b>第 ${s.longStays} 次</b> 长时间停在屏幕上。要不要起来走走?`,
    narratorFn:()=>`眼皮重了吧。`,
    check:(s,e)=> s.longStays===3 },

  { id:'shopping_8', rarity:'epic', icon:'💸', name:'《钱包警告》', chain:'shopping',
    rate:'1.8%', personaSlug:'电子剁手党', personaWeight:4,
    desc:'你已经看了 8 条购物内容, 我们不互删了吧。',
    narrator:'—',
    descFn:(s,e,ctx)=>{
      const n = s.catViews.shopping||0;
      const cards = ctx.recentCardsInCat('shopping', 3).map(c=>c.title);
      return `第 <b>${n}</b> 条购物了 (最近: ${cards.map(t=>`《${t}》`).join(', ')})。系统已转告你的钱包。`;
    },
    narratorFn:()=>`钱包: 我先告辞。`,
    check:(s,e)=> (s.catViews.shopping||0)>=8 },

  { id:'only_consume', rarity:'epic', icon:'🪐', name:'《沉默观察员》',
    rate:'2.9%', personaSlug:'沉默观察员', personaWeight:4,
    desc:'12 次滑动 + 0 点赞 + 0 收藏, 你在练隐身。',
    narrator:'你以为没人看你, 我看着呢。',
    descFn:(s)=> `<b>${s.swipes}</b> 次滑动, <b>0</b> 赞, <b>0</b> 收藏。你以为是隐身, 其实更显眼。`,
    narratorFn:(s)=> `${s.swipes} 滑动 / 0 互动。`,
    check:(s,e)=> s.swipes>=12 && s.likes===0 && s.saves===0 },

  { id:'shy_chain', rarity:'epic', icon:'🫥', name:'《字打完了又撤》', chain:'shy',
    rate:'1.2%', personaSlug:'撤回大师', personaWeight:4,
    desc:'输入框开 8 次, 仍然 0 字发出。',
    narrator:'—',
    descFn:(s)=> `输入框开 <b>${s.inputFocusCount}</b> 次, 秒退 <b>${s.inputBlurFastCount}</b> 次, 发出 <b>0</b> 字。诚实程度: 满分。`,
    narratorFn:()=>`输入是表达, 撤回是态度。`,
    check:(s,e)=> s.inputFocusCount>=8 && s.inputSendCount===0 },

  // ============ 神话 ============
  { id:'night_guard', rarity:'mythic', icon:'🔋', name:'《电子守夜人》',
    rate:'0.4%', personaSlug:'电子守夜人', personaWeight:5,
    desc:'凌晨 3 点仍在线, 在线超过 5 分钟。',
    narrator:'你赢, 我先睡。',
    descFn:(s,e,ctx)=>`<b>${ctx.hm()}</b>, 你已经盯着屏幕 <b>${ctx.minutesOnline()}</b> 分钟。我先睡, 你赢。`,
    narratorFn:(s,e,ctx)=> `${ctx.hm()}, 唯一在线的还有你。`,
    check:(s,e)=> { const h=new Date().getHours(); return (h>=2&&h<=5) && (Date.now()-s.startTs)>=5*60_000; } },

  { id:'time_traveler', rarity:'mythic', icon:'🛸', name:'《时空旅人》',
    rate:'0.7%', personaSlug:'时空旅人', personaWeight:5,
    desc:'凌晨 4–6 点仍在认真刷, 时间已查不到记录。',
    narrator:'天快亮了, 你呢。',
    descFn:(s,e,ctx)=> `<b>${ctx.hm()}</b>, 天就快亮了, 你的瞳孔倒影里全是屏幕。`,
    narratorFn:(s,e,ctx)=> `${ctx.hm()}, 跳过了凌晨, 跳到了清晨。`,
    check:(s,e)=> { const h=new Date().getHours(); return (h>=4&&h<=6); } },

  { id:'quantum_super', rarity:'mythic', icon:'⚛️', name:'《量子叠加态》',
    rate:'0.3%', personaSlug:'量子叠加态', personaWeight:5,
    desc:'1 秒内 3 次滑动, 你在测试设备?',
    narrator:'断网中。',
    descFn:(s)=>`你在 <b>1 秒内</b> 连续滑动 <b>${Math.max(s.swipeLog?.length||3, 3)}</b> 次。系统决定为你保留半秒空白。`,
    narratorFn:()=>`检测中... 检测中... 算了。`,
    check:(s,e)=> {
      if (e.type!=='swipe') return false;
      const cut = Date.now()-1000;
      return s.swipeLog.filter(t=>t>=cut).length>=3;
    } },

  { id:'ai_giveup', rarity:'mythic', icon:'🤖', name:'《看不懂你》',
    rate:'0.2%', personaSlug:'无法被画像者', personaWeight:5,
    desc:'在线 8 分钟, 任何标签都套不上你。',
    narrator:'我放弃理解了, 你赢。',
    descFn:(s,e,ctx)=> `<b>${ctx.minutesOnline()}</b> 分钟, <b>${s.swipes}</b> 次滑动, <b>0</b> 赞, <b>0</b> 收藏。任何标签都套不上你。`,
    narratorFn:()=>`画像数据: null。`,
    check:(s,e)=> (Date.now()-s.startTs)>=8*60_000 && s.likes===0 && s.saves===0 },

  { id:'tired_3', rarity:'mythic', icon:'🌙', name:'《建议休眠》', chain:'tired',
    rate:'0.5%', personaSlug:'已预约就寝', personaWeight:5,
    desc:'第 5 次长时间停留. 已为你预约就寝。',
    narrator:'—',
    descFn:(s,e,ctx)=> `已经是 <b>第 ${s.longStays} 次</b> 你不动了。${ctx.hm()}, 系统替你点了"就寝"。`,
    narratorFn:()=>`晚安, 我替你关灯。`,
    check:(s,e)=> s.longStays===5 },

  { id:'archeologist', rarity:'mythic', icon:'🗿', name:'《互联网考古学家》',
    rate:'0.8%', personaSlug:'互联网考古学家', personaWeight:5,
    desc:'看完 12 条又回到第一条, 你在做学术?',
    narrator:'摘下眼镜, 向你致敬。',
    descFn:(s,e,ctx)=>{
      const card = ctx.card('f01');
      return `刷了 <b>${s.swipes}</b> 条后, 你又回到了《${card?.title || '第一条'}》。这是在做田野考古吗?`;
    },
    narratorFn:(s)=>`原点 = 你出发的地方。`,
    check:(s,e)=> s.swipes>=12 && e.type==='view_card' && e.cardId==='f01' && s.cardViews['f01']>=2 },
];

// ===== 稀有度 =====
export const RARITY = {
  common: { label:'普通',   color:'#4f7be8', flash:0     },
  rare:   { label:'稀有',   color:'#a85fff', flash:0.06  },
  epic:   { label:'史诗',   color:'#26c277', flash:0.10  },
  mythic: { label:'神话级', color:'#e8a91d', flash:0.16  },
};

// ===== 档案"原型"标签 =====
export function getArchetype(s) {
  const t = s.catViews || {};
  const topCat = Object.entries(t).sort((a,b)=>b[1]-a[1])[0];
  const h = new Date().getHours();

  if (s.commentOpens>=4 && s.likes<=2)    return { label:'评论区学者', sub:'从来不发言, 但什么都看' };
  if ((t.shopping||0)>=5)                 return { label:'电子假装不买', sub:'打开 = 想买; 不买 = 假装' };
  if ((t.philosophy||0)>=2 && (h>=23||h<=5)) return { label:'凌晨三点的智者', sub:'白天不思考, 夜里全开机' };
  if ((t.pet||0)>=3)                      return { label:'电子吸猫党', sub:'多巴胺由它们供给' };
  if (s.saves>=8 && s.likes<=2)           return { label:'收藏夹堆积者', sub:'下次一定看 (不会)' };
  if (s.inputFocusCount>=4 && s.inputSendCount===0) return { label:'草稿箱常驻', sub:'打完字, 撤回, 重打' };
  if (s.swipes>=15 && s.likes===0)        return { label:'纯滑党', sub:'眼睛上工, 拇指代班' };
  if (Object.keys(t).length>=8)           return { label:'兴趣广博型', sub:'每个都看一点, 每个都不深' };
  if (topCat)                             return { label:`${(CATEGORY[topCat[0]]||{}).label||'神秘'}爱好者`, sub:'数据这么说的' };
  return { label:'还在观察中', sub:'再刷一会儿, 才知道你是谁' };
}

// ===== 互联网行为人格 · 14种 =====
export const BEHAVIOR_PERSONAS = {
  GHOST:  { name:'数字幽灵',   tagline:'我来过，但算法对此一无所知',            icon:'👻', rate:'14.2%', rarity:'epic'   },
  SPIN:   { name:'永动机',     tagline:'我不是在刷视频，我是在给手指散步',      icon:'⚙️', rate:'22.7%', rarity:'rare'   },
  STASH:  { name:'仓鼠党',     tagline:'收藏=已学会，这是一种自欺欺人的艺术',   icon:'🐹', rate:'31.4%', rarity:'rare'   },
  DARK:   { name:'深渊哲学家', tagline:'白天是打工人，深夜是思想家',            icon:'🌑', rate:'8.7%',  rarity:'rare'   },
  FLIP:   { name:'精神分裂者', tagline:'我的主页是一个自相矛盾的宇宙',          icon:'🔀', rate:'19.3%', rarity:'rare'   },
  CAGE:   { name:'算法囚徒',   tagline:'我以为是我在选内容',                    icon:'🔒', rate:'28.6%', rarity:'common' },
  CLICK:  { name:'无情点赞机', tagline:'我的大拇指不经过大脑',                  icon:'👍', rate:'34.1%', rarity:'common' },
  SKIP:   { name:'五秒侠',     tagline:'不合我意，消失',                        icon:'💨', rate:'26.9%', rarity:'common' },
  MONK:   { name:'间歇出家人', tagline:'我回来了，宽宏大量地原谅算法吧',        icon:'🧘', rate:'11.8%', rarity:'rare'   },
  LOOP:   { name:'复读强迫症', tagline:'第18遍了，这次一定看出新东西',          icon:'🔁', rate:'9.6%',  rarity:'rare'   },
  SPY:    { name:'评论区卧底', tagline:'我在评论区里，但你找不到我',            icon:'🕵️', rate:'17.4%', rarity:'rare'   },
  SPONGE: { name:'情绪海绵',   tagline:'每条视频都在精准狙击我',                icon:'🌊', rate:'13.5%', rarity:'epic'   },
  FAKE:   { name:'学习表演家', tagline:'收藏了=学了，逻辑上没有问题',           icon:'🎭', rate:'24.8%', rarity:'rare'   },
  VOID:   { name:'数字黑洞',   tagline:'系统已放弃为我建立画像',                icon:'🕳️', rate:'3.2%',  rarity:'mythic' },
};

// ===== 组合人格 · 4种稀有彩蛋 =====
export const BEHAVIOR_PERSONA_COMBOS = [
  { codes:['DARK','GHOST'],  code:'DARK·GHOST',  name:'深夜幽灵',          tagline:'凌晨的隐形人，来过却无迹可寻',           icon:'🌙', rate:'1.8%', rarity:'mythic' },
  { codes:['STASH','FAKE'],  code:'STASH·FAKE',  name:'收藏大师·纸上谈兵', tagline:'全收藏但全没看完，学习届最强幻觉',         icon:'📦', rate:'2.3%', rarity:'mythic' },
  { codes:['SPIN','CLICK'],  code:'SPIN·CLICK',  name:'无差别点赞机',      tagline:'快滑+乱赞，算法已放弃判断你的品味',        icon:'⚡', rate:'1.4%', rarity:'mythic' },
  { codes:['CAGE','LOOP'],   code:'CAGE·LOOP',   name:'算法深渊居民',      tagline:'同一个坑，掉了又掉，算法给你盖章了',        icon:'🕳️', rate:'0.9%', rarity:'mythic' },
];

// ===== 行为人格检测 =====
export function detectBehaviorPersonas(state) {
  const s = state;
  const h = new Date().getHours();
  const isDark = h >= 23 || h <= 4;
  const cv = s.catViews || {};
  const catKeys = Object.keys(cv);
  const totalViews = catKeys.reduce((sum, k) => sum + (cv[k] || 0), 0);

  const topCatEntry = catKeys
    .map(k => [k, cv[k] || 0])
    .sort((a, b) => b[1] - a[1])[0];
  const topCatRatio = totalViews > 0 && topCatEntry ? topCatEntry[1] / totalViews : 0;

  const avgStay    = (s.swipes || 0) > 0 ? s.totalStayMs / s.swipes : 0;
  const totalInter = (s.likes || 0) + (s.saves || 0) + (s.commentOpens || 0);
  const cardVals   = Object.values(s.cardViews || {});
  const maxViews   = cardVals.length > 0 ? Math.max(...cardVals) : 0;

  const matched = [];

  // GHOST: 刷了但零互动
  if ((s.swipes || 0) >= 6 && totalInter === 0)
    matched.push('GHOST');

  // SPIN: 高速刷动，停留极短
  if ((s.swipes || 0) >= 12 && avgStay > 0 && avgStay < 3000)
    matched.push('SPIN');

  // STASH: 收藏远多于点赞
  if ((s.saves || 0) >= 3 && (s.saves || 0) > (s.likes || 0) * 2)
    matched.push('STASH');

  // DARK: 深夜 + 看哲学/情感内容
  if (isDark && (cv.philosophy || 0) >= 1)
    matched.push('DARK');

  // FLIP: 内容品类矛盾共存
  const hasContradiction =
    ((cv.food || 0) >= 1     && (cv.fitness || 0) >= 1) ||
    ((cv.philosophy || 0) >= 1 && (cv.fitness || 0) >= 1) ||
    ((cv.philosophy || 0) >= 1 && (cv.shopping || 0) >= 1) ||
    ((cv.study || 0) >= 1    && (cv.game || 0) >= 1) ||
    ((cv.finance || 0) >= 1  && (cv.game || 0) >= 1);
  if (hasContradiction && catKeys.length >= 4)
    matched.push('FLIP');

  // CAGE: 一个品类高度集中
  if ((s.swipes || 0) >= 5 && topCatRatio >= 0.65 && catKeys.length >= 2)
    matched.push('CAGE');

  // CLICK: 高点赞率，几乎不收藏
  if ((s.likes || 0) >= 4 && (s.saves || 0) <= 1)
    matched.push('CLICK');

  // SKIP: 滑得快，停留短
  if ((s.swipes || 0) >= 10 && avgStay > 0 && avgStay < 2500)
    matched.push('SKIP');

  // LOOP: 同一内容反复看
  if (maxViews >= 3)
    matched.push('LOOP');

  // SPY: 长时间刷但从不开评论
  if ((s.swipes || 0) >= 8 && (s.commentOpens || 0) === 0 && s.totalStayMs >= 20_000)
    matched.push('SPY');

  // SPONGE: 情感内容 + 多收藏
  const emotionViews = (cv.philosophy || 0) + (cv.music || 0);
  if (emotionViews >= 2 && (s.saves || 0) >= 2)
    matched.push('SPONGE');

  // FAKE: 收藏了学习内容但停留极短（没看完）
  const studyViews = (cv.study || 0) + (cv.finance || 0);
  if ((s.saves || 0) >= 2 && studyViews >= 1 && avgStay > 0 && avgStay < 6000)
    matched.push('FAKE');

  // VOID: 品类分散到无法归类
  if (catKeys.length >= 8)
    matched.push('VOID');

  // 按趣味度/稀有度排序，优先展示最有代表性的类型
  const PRIORITY = {
    VOID:10, GHOST:9, SPONGE:8, DARK:8,
    LOOP:7,  SKIP:7,  FLIP:6,   SPIN:5,
    STASH:5, SPY:5,   FAKE:5,   CLICK:4,
    CAGE:3,  MONK:2,
  };
  matched.sort((a, b) => (PRIORITY[b] || 0) - (PRIORITY[a] || 0));

  return matched;
}

// ===== 组合检测 =====
export function detectPersonaCombo(codes) {
  for (const combo of BEHAVIOR_PERSONA_COMBOS) {
    if (combo.codes.every(c => codes.includes(c))) return combo;
  }
  return null;
}

// ===== 人设组合 =====
// 输入: 已解锁的 ach 列表 + 当前 state (可选)
// 输出: { slugs, label, rate, sources, behavior? }
export function buildPersona(unlockedList, state = null) {
  const eligible = unlockedList
    .filter(a => (a.personaWeight||0) > 0 && a.personaSlug)
    .sort((a,b)=> (b.personaWeight - a.personaWeight) || (parseFloat(a.rate) - parseFloat(b.rate)));
  const picks = eligible.slice(0, Math.min(2, eligible.length));
  const slugs = picks.map(p => p.personaSlug);
  const label = slugs.join(' · ');
  const rate = comboRate(picks);

  // 行为人格检测
  let behavior = null;
  if (state) {
    const codes  = detectBehaviorPersonas(state);
    const combo  = detectPersonaCombo(codes);
    if (combo) {
      behavior = { code: combo.code, name: combo.name, tagline: combo.tagline,
                   icon: combo.icon, rate: combo.rate, rarity: combo.rarity, isCombo: true };
    } else if (codes.length > 0) {
      const meta = BEHAVIOR_PERSONAS[codes[0]];
      behavior = { code: codes[0], name: meta?.name, tagline: meta?.tagline,
                   icon: meta?.icon, rate: meta?.rate, rarity: meta?.rarity, isCombo: false };
    }
  }

  if (picks.length === 0 && !behavior) return null;

  return { slugs, label, rate, sources: picks, behavior };
}

function comboRate(picks) {
  if (picks.length === 0) return '—';
  if (picks.length === 1) return picks[0].rate;
  const r1 = parseFloat(picks[0].rate);
  const r2 = parseFloat(picks[1].rate);
  // sqrt 几何均值 × 0.5 ——既反映稀有度组合, 又不会被极端值压成 0
  const combo = Math.sqrt(r1 * r2) * 0.5;
  return (combo < 1 ? combo.toFixed(2) : combo.toFixed(1)) + '%';
}
