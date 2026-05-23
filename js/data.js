// ===== feed content: 假装是抖音信息流的内容池 =====
// 每张卡片用 emoji + 渐变色伪装成视频缩略；分类(category)用于成就判定
export const FEED_CARDS = [
  { id:'f01', cat:'study',     emoji:'📚', title:'5分钟搞定动态规划',     desc:'刷完这条你就是算法大佬', tags:['#5分钟学会','#上岸'],       author:'@代码不打烊', likes:'12.4w', cmts:'3.2k', bg:'#2a3c5c' },
  { id:'f02', cat:'shopping',  emoji:'🛍️', title:'真的太香了 谁懂啊',     desc:'今年最划算的好物清单',     tags:['#好物分享','#不买亏了'],     author:'@省钱小达人', likes:'8.7w',  cmts:'2.1k', bg:'#5c2a3c' },
  { id:'f03', cat:'food',      emoji:'🍜', title:'深夜放毒预警',           desc:'凌晨1点不许刷我',          tags:['#深夜食堂','#放毒'],         author:'@饿货研究所', likes:'24.1w', cmts:'7.8k', bg:'#5c422a' },
  { id:'f04', cat:'philosophy',emoji:'🤔', title:'我们为什么活着',         desc:'看完整个人都安静了',       tags:['#人生','#内耗'],             author:'@野生哲学家', likes:'3.2w',  cmts:'9.4k', bg:'#2a2a3c' },
  { id:'f05', cat:'pet',       emoji:'🐱', title:'猫主子的下班仪式',       desc:'人类觉得可爱 它觉得这是工作', tags:['#吸猫','#治愈'],           author:'@主子驾到',   likes:'18.9w', cmts:'4.5k', bg:'#3c2a5c' },
  { id:'f06', cat:'fitness',   emoji:'💪', title:'三天练出腹肌(不可能)',   desc:'但每天看看可以骗自己',     tags:['#健身','#flag'],             author:'@王教练',     likes:'6.2w',  cmts:'1.8k', bg:'#2a5c3c' },
  { id:'f07', cat:'game',      emoji:'🎮', title:'巅峰赛三连绝世',         desc:'剪辑只剩高光时刻',         tags:['#王者','#操作'],             author:'@峡谷之巅',   likes:'15.6w', cmts:'5.1k', bg:'#5c2a2a' },
  { id:'f08', cat:'beauty',    emoji:'💄', title:'抗老黑科技曝光',         desc:'30岁的脸25岁的状态',       tags:['#美妆','#抗老'],             author:'@仙女养成',   likes:'9.1w',  cmts:'2.7k', bg:'#5c3c4c' },
  { id:'f09', cat:'finance',   emoji:'📈', title:'普通人如何财富自由',     desc:'10分钟讲透',               tags:['#理财','#搞钱'],             author:'@老张谈钱',   likes:'4.7w',  cmts:'1.5k', bg:'#3c5c2a' },
  { id:'f10', cat:'music',     emoji:'🎵', title:'循环一整夜的歌',         desc:'戴上耳机请准备好哭',       tags:['#网抑云','#歌单'],           author:'@耳机依赖',   likes:'21.3w', cmts:'8.2k', bg:'#2a3c5c' },
  { id:'f11', cat:'movie',     emoji:'🎬', title:'神级反转 3分钟解说',     desc:'看完忍不住二刷',           tags:['#电影解说','#反转'],         author:'@毒舌速看',   likes:'13.8w', cmts:'4.1k', bg:'#2a2a4c' },
  { id:'f12', cat:'travel',    emoji:'🏔️', title:'周末就出发 莫干山',     desc:'山野徒步治愈一周班味',     tags:['#周末','#徒步'],             author:'@野人小K',   likes:'5.5w',  cmts:'1.2k', bg:'#2a4c3c' },
  { id:'f13', cat:'shopping',  emoji:'👟', title:'球鞋圈又出新款',         desc:'看看就好 真的不买',       tags:['#球鞋','#穿搭'],             author:'@鞋柜爆炸',   likes:'7.8w',  cmts:'2.3k', bg:'#4c2a3c' },
  { id:'f14', cat:'study',     emoji:'🧠', title:'高效背单词法',           desc:'据说能背完整本红宝书',    tags:['#考研','#英语'],             author:'@学霸日常',   likes:'10.2w', cmts:'3.8k', bg:'#3c2a5c' },
  { id:'f15', cat:'food',      emoji:'🍔', title:'打工人续命汉堡',         desc:'外卖排行榜TOP1',          tags:['#外卖','#打工人'],           author:'@饿了么测评', likes:'14.5w', cmts:'4.7k', bg:'#5c4c2a' },
  { id:'f16', cat:'philosophy',emoji:'🌌', title:'凌晨3点的思考',         desc:'人类只是宇宙的灰尘',      tags:['#emo','#深夜'],              author:'@夜猫研究所', likes:'2.8w',  cmts:'6.3k', bg:'#1c1c2c' },
  { id:'f17', cat:'pet',       emoji:'🐕', title:'狗子第一次见雪',         desc:'快乐能感染整个屏幕',      tags:['#萌宠','#沙雕'],             author:'@铲屎官联盟', likes:'19.4w', cmts:'5.6k', bg:'#3c4c5c' },
  { id:'f18', cat:'game',      emoji:'🕹️', title:'独立游戏黑马推荐',       desc:'通关一晚上 后悔玩晚了',  tags:['#独游','#推荐'],             author:'@游戏不眠夜', likes:'8.3w',  cmts:'2.9k', bg:'#2a4c5c' },
];

// ===== achievement pool =====
// rarity: common(60%+) / rare(15-60%) / epic(2-15%) / mythic(<2%)
// check(state, event): 返回 true 即解锁，会自动去重
export const ACHIEVEMENTS = [
  // ---------- 普通 ----------
  { id:'arrive',         rarity:'common', icon:'👋', name:'《抵达现场》',     desc:'成功打开这个不知道是什么的东西。',         rate:'98.7%', aiNote:'AI 看到你了',
    check: (s,e) => e.type==='init' },

  { id:'swipe5',         rarity:'common', icon:'👆', name:'《滑动小能手》',   desc:'5 次滑动，已正式进入电子游民状态。',       rate:'92.4%', aiNote:'AI 默默记下',
    check: (s,e) => s.swipes >= 5 },

  { id:'first_like',     rarity:'common', icon:'❤️', name:'《心动初体验》',   desc:'今天的第一次点赞，恭喜你贡献了一次数据。', rate:'88.1%', aiNote:'AI 觉得你太容易满足',
    check: (s,e) => e.type==='like' && s.likes===1 },

  { id:'first_save',     rarity:'common', icon:'⭐', name:'《收藏夹刺客》',   desc:'收藏 = 永远不会再看，AI 已替你立下flag。', rate:'71.3%', aiNote:'AI 已不抱期待',
    check: (s,e) => e.type==='save' && s.saves===1 },

  { id:'quantum_learn',  rarity:'common', icon:'⚡', name:'《量子学习》',     desc:'在学习视频停留不到 3 秒，默认已经学会。',  rate:'76.2%', aiNote:'AI 已替你掌握知识',
    check: (s,e) => e.type==='leave_card' && e.cat==='study' && e.stayMs < 3000 },

  { id:'just_looking',   rarity:'common', icon:'🛒', name:'《假装只是看看》', desc:'连续打开购物内容但没下单，AI 知道你的钱包在哀嚎。', rate:'62.6%', aiNote:'AI 偷笑',
    check: (s,e) => (s.catViews.shopping||0) >= 3 },

  { id:'time_master',    rarity:'common', icon:'⏳', name:'《时间管理大师》', desc:'本来想刷 5 分钟，AI 已经数到 2 小时。',    rate:'67.9%', aiNote:'AI 替你记了时',
    check: (s,e) => (Date.now()-s.startTs) >= 60_000 }, // demo: 1分钟即触发

  { id:'read_no_reply',  rarity:'common', icon:'💬', name:'《已读不回艺术家》', desc:'打开评论 ≠ 想要发言，AI 表示理解。',     rate:'55.4%', aiNote:'AI 替你打哈欠',
    check: (s,e) => e.type==='comment_open' && s.commentOpens >= 1 },

  { id:'dragonfly',      rarity:'common', icon:'💨', name:'《蜻蜓点水》',     desc:'10 次滑动平均停留 < 2 秒，AI 怀疑你只是在巡山。', rate:'48.2%', aiNote:'AI 也跟不上',
    check: (s,e) => s.swipes >= 10 && (s.totalStayMs / s.swipes) < 2000 },

  { id:'heart_struck',   rarity:'common', icon:'💘', name:'《心动了》',       desc:'同一条视频停留超过 12 秒，AI 决定通知你的偶像剧。', rate:'31.5%', aiNote:'AI 已截图存证',
    check: (s,e) => e.type==='leave_card' && e.stayMs >= 12_000 },

  // ---------- 稀有 ----------
  { id:'midnight_phil',  rarity:'rare',   icon:'🌙', name:'《深夜哲学家》',   desc:'凌晨 2 点开始思考人生，AI 也没睡。',       rate:'8.7%',  aiNote:'AI 陪你失眠',
    check: (s,e) => { const h=new Date().getHours(); return e.type==='view_card' && e.cat==='philosophy' && (h>=23 || h<=5); } },

  { id:'cyber_shy',      rarity:'rare',   icon:'⌨️', name:'《赛博社恐》',     desc:'输入框打开 5 次但一个字也没发出去。',     rate:'5.2%',  aiNote:'AI 替你紧张',
    check: (s,e) => s.inputFocusCount >= 5 && s.inputSendCount === 0 },

  { id:'collector',      rarity:'rare',   icon:'⭐', name:'《收藏家》',       desc:'已收藏 8 条视频且没有回看任何一条。',     rate:'11.4%', aiNote:'AI 已不抱期待',
    check: (s,e) => s.saves >= 8 },

  { id:'replayer',       rarity:'rare',   icon:'🔁', name:'《复读机》',       desc:'同一条视频回看 3 次，AI 怀疑你在找彩蛋。', rate:'9.6%',  aiNote:'AI 也想再看',
    check: (s,e) => Object.values(s.cardViews).some(v=>v>=3) },

  { id:'channel_surf',   rarity:'rare',   icon:'🎚️', name:'《切换大师》',     desc:'60 秒内切换 5 种不同兴趣，AI 已晕。',     rate:'13.1%', aiNote:'AI 失去焦点',
    check: (s,e) => {
      const cut = Date.now() - 60_000;
      const recent = s.catSwitchLog.filter(x=>x.t>=cut);
      return new Set(recent.map(x=>x.cat)).size >= 5;
    } },

  { id:'comment_native', rarity:'rare',   icon:'👥', name:'《评论区原住民》', desc:'4 次打开评论区，AI 怀疑这才是主战场。',   rate:'14.8%', aiNote:'AI 也想吃瓜',
    check: (s,e) => s.commentOpens >= 4 },

  { id:'fake_busy',      rarity:'rare',   icon:'🎭', name:'《假装很忙》',     desc:'打开输入框又快速关掉，3 次起步。',         rate:'7.3%',  aiNote:'AI 看穿了一切',
    check: (s,e) => s.inputFocusCount >= 3 && s.inputBlurFastCount >= 3 },

  // ---------- 史诗 ----------
  { id:'human_observer', rarity:'epic',   icon:'👁️', name:'《人类观察者》',   desc:'打开评论区比视频还认真，AI 决定颁发最高荣誉。', rate:'1.9%',  aiNote:'AI 决定让你毕业',
    check: (s,e) => s.commentOpens >= 6 && s.likes <= 2 },

  { id:'mind_drift',     rarity:'epic',   icon:'🧭', name:'《精神流浪》',     desc:'连续切换 10 个不同兴趣领域，AI 已迷路。', rate:'2.4%',  aiNote:'AI 已跟不上你',
    check: (s,e) => Object.keys(s.catViews).length >= 10 },

  { id:'archeologist',   rarity:'epic',   icon:'🗿', name:'《互联网考古学家》', desc:'看完 12 条后又回到第一条，AI 怀疑你在做学术。', rate:'0.8%', aiNote:'AI 摘下眼镜',
    check: (s,e) => s.swipes >= 12 && e.type==='view_card' && e.cardId === 'f01' && s.cardViews['f01']>=2 },

  { id:'collect_end',    rarity:'epic',   icon:'📦', name:'《收藏夹的尽头》', desc:'15 条收藏 + 0 次回看，AI 已为你预约清理日。', rate:'1.4%', aiNote:'AI 流下一滴清空键',
    check: (s,e) => s.saves >= 15 },

  { id:'zen_blank',      rarity:'epic',   icon:'🧘', name:'《沉浸式发呆》',   desc:'在同一条视频呆了 25 秒以上，AI 不敢打扰。', rate:'3.6%', aiNote:'AI 屏住呼吸',
    check: (s,e) => e.type==='leave_card' && e.stayMs >= 25_000 },

  // ---------- 神话 ----------
  { id:'night_guard',    rarity:'mythic', icon:'🔋', name:'《电子守夜人》',   desc:'凌晨 3 点仍在线 + 在线超过 5 分钟。AI 向你致敬。', rate:'0.4%', aiNote:'AI 行注目礼',
    check: (s,e) => { const h=new Date().getHours(); return (h>=2 && h<=5) && (Date.now()-s.startTs)>=5*60_000; } },

  { id:'time_traveler',  rarity:'mythic', icon:'🛸', name:'《时空旅人》',     desc:'凌晨 4 点到 6 点之间仍在认真刷。',         rate:'0.7%',  aiNote:'AI 已查不到记录',
    check: (s,e) => { const h=new Date().getHours(); return (h>=4 && h<=6); } },

  { id:'quantum_super',  rarity:'mythic', icon:'⚛️', name:'《量子叠加态》',   desc:'1 秒内完成 3 次滑动，AI 怀疑你在测试设备。', rate:'0.3%', aiNote:'AI 短暂宕机',
    check: (s,e) => {
      if (e.type!=='swipe') return false;
      const cut = Date.now() - 1000;
      return s.swipeLog.filter(t=>t>=cut).length >= 3;
    } },

  { id:'ai_giveup',      rarity:'mythic', icon:'🤖', name:'《AI 已放弃》',     desc:'在线 8 分钟，AI 没找到任何能说明你喜好的迹象。', rate:'0.2%', aiNote:'AI 关掉了你这一页',
    check: (s,e) => (Date.now()-s.startTs)>=8*60_000 && s.likes===0 && s.saves===0 },
];

// 稀有度展示信息
export const RARITY = {
  common: { label:'普通',   color:'#5b8def', flash:0    },
  rare:   { label:'稀有',   color:'#b76bff', flash:0.06 },
  epic:   { label:'史诗',   color:'#46e08a', flash:0.10 },
  mythic: { label:'神话级', color:'#ffc24b', flash:0.16 },
};

// 分类的中文名（成就馆里展示用）
export const CATEGORY_LABEL = {
  study:'学习', shopping:'购物', food:'美食', game:'游戏',
  philosophy:'哲学', pet:'萌宠', fitness:'健身', beauty:'美妆',
  finance:'财经', music:'音乐', movie:'电影', travel:'旅行',
};
