// ===== 信息流内容池 (24 张) =====
// 每张卡片打了 category 标签用于成就匹配；hue/accent 用于 CSS 主题色
export const FEED_CARDS = [
  // ---- 学习 ----
  { id:'f01', cat:'study',      emoji:'📚', title:'5分钟搞定动态规划',     desc:'刷完这条你就是面试官的噩梦。',         tags:'#5分钟学会 #上岸',      author:'代码不打烊',  avatar:'🧑‍💻', likes:'12.4w', cmts:'3.2k' },
  { id:'f02', cat:'study',      emoji:'🧠', title:'高效背单词法 据说能背完红宝书', desc:'今天的flag已经够你立到明年了。',     tags:'#考研 #英语 #自律',   author:'学霸日常',    avatar:'📖',   likes:'10.2w', cmts:'3.8k' },
  { id:'f03', cat:'study',      emoji:'✏️', title:'笔记法 让你的字看起来很贵',   desc:'颜值即生产力, 美也是真理。',             tags:'#手帐 #学习方法',     author:'文具控',      avatar:'📝',   likes:'6.8w',  cmts:'1.9k' },
  // ---- 购物 ----
  { id:'f04', cat:'shopping',   emoji:'🛍️', title:'真的太香了 谁懂啊',         desc:'今年最划算的不踩雷好物清单。',          tags:'#好物分享 #平价',     author:'省钱小达人',  avatar:'💸',   likes:'8.7w',  cmts:'2.1k' },
  { id:'f05', cat:'shopping',   emoji:'👟', title:'球鞋圈又出新款',           desc:'看看就好, 真的不买。',                  tags:'#球鞋 #穿搭',         author:'鞋柜爆炸',    avatar:'🏃',   likes:'7.8w',  cmts:'2.3k' },
  { id:'f06', cat:'shopping',   emoji:'🪑', title:'我家终于有客厅的样子了',     desc:'10件让小户型瞬间变大的家居好物。',     tags:'#家居 #软装',         author:'家装日记',    avatar:'🏠',   likes:'5.5w',  cmts:'1.2k' },
  // ---- 美食 ----
  { id:'f07', cat:'food',       emoji:'🍜', title:'深夜放毒预警',             desc:'凌晨1点不许刷我, 不准。',               tags:'#深夜食堂 #放毒',     author:'饿货研究所',  avatar:'🍣',   likes:'24.1w', cmts:'7.8k' },
  { id:'f08', cat:'food',       emoji:'🍔', title:'打工人续命汉堡 TOP1',        desc:'外卖榜单第一名实测.',                   tags:'#外卖 #打工人',       author:'饿了么测评',  avatar:'🍟',   likes:'14.5w', cmts:'4.7k' },
  { id:'f09', cat:'food',       emoji:'🥟', title:'妈妈牌饺子的复刻版本',       desc:'今天我也是会做饭的人了。',              tags:'#家常菜 #手作',       author:'今日厨房',    avatar:'🥢',   likes:'6.3w',  cmts:'1.8k' },
  // ---- 哲学 / emo ----
  { id:'f10', cat:'philosophy', emoji:'🌌', title:'我们为什么活着',           desc:'看完整个人都静了, 不要在凌晨刷。',     tags:'#人生 #内耗',         author:'野生哲学家',  avatar:'🤔',   likes:'3.2w',  cmts:'9.4k' },
  { id:'f11', cat:'philosophy', emoji:'🌙', title:'凌晨3点的思考',            desc:'人类只是宇宙的灰尘. 但是是会发光的那种。', tags:'#emo #深夜',        author:'夜猫研究所',  avatar:'🦉',   likes:'2.8w',  cmts:'6.3k' },
  { id:'f12', cat:'philosophy', emoji:'🪞', title:'你和你, 谁更像你',          desc:'一个让心理咨询师破防的问题。',          tags:'#自我 #抽象',         author:'胡思乱想',    avatar:'🫧',   likes:'1.4w',  cmts:'4.1k' },
  // ---- 萌宠 ----
  { id:'f13', cat:'pet',        emoji:'🐱', title:'猫主子的下班仪式',         desc:'人类觉得可爱, 它觉得这是工作。',        tags:'#吸猫 #治愈',         author:'主子驾到',    avatar:'😼',   likes:'18.9w', cmts:'4.5k' },
  { id:'f14', cat:'pet',        emoji:'🐕', title:'狗子第一次见雪',           desc:'快乐能感染整个屏幕, 不信你看。',        tags:'#萌宠 #沙雕',         author:'铲屎官联盟',  avatar:'🐾',   likes:'19.4w', cmts:'5.6k' },
  { id:'f15', cat:'pet',        emoji:'🐢', title:'我家的乌龟比我活得明白',     desc:'今天它又躺平了, 这就是答案。',          tags:'#异宠 #躺平',         author:'佛系铲屎',    avatar:'🐢',   likes:'4.7w',  cmts:'1.3k' },
  // ---- 健身 ----
  { id:'f16', cat:'fitness',    emoji:'💪', title:'三天练出腹肌(不可能)',     desc:'但每天看看可以骗过自己, 也算成功。',   tags:'#健身 #flag',         author:'王教练',      avatar:'🏋️',   likes:'6.2w',  cmts:'1.8k' },
  { id:'f17', cat:'fitness',    emoji:'🧘', title:'10分钟瑜伽: 床上版',        desc:'起不来? 那就在床上做。',                tags:'#瑜伽 #躺着练',       author:'瑜伽小红',    avatar:'🌸',   likes:'4.9w',  cmts:'1.1k' },
  // ---- 游戏 ----
  { id:'f18', cat:'game',       emoji:'🎮', title:'巅峰赛三连绝世',           desc:'剪辑只剩高光时刻, 失败已删除。',        tags:'#王者 #操作',         author:'峡谷之巅',    avatar:'⚔️',   likes:'15.6w', cmts:'5.1k' },
  { id:'f19', cat:'game',       emoji:'🕹️', title:'独立游戏黑马推荐',         desc:'通关一晚上, 后悔玩晚了。',              tags:'#独游 #推荐',         author:'游戏不眠夜',  avatar:'👾',   likes:'8.3w',  cmts:'2.9k' },
  // ---- 美妆 / 穿搭 ----
  { id:'f20', cat:'beauty',     emoji:'💄', title:'抗老黑科技曝光',           desc:'30岁的脸25岁的状态, 信我就行。',        tags:'#美妆 #抗老',         author:'仙女养成',    avatar:'✨',   likes:'9.1w',  cmts:'2.7k' },
  // ---- 财经 ----
  { id:'f21', cat:'finance',    emoji:'📈', title:'普通人如何财富自由',       desc:'10分钟讲透 但你不会做 (好诚实)。',     tags:'#理财 #搞钱',         author:'老张谈钱',    avatar:'💰',   likes:'4.7w',  cmts:'1.5k' },
  // ---- 音乐 ----
  { id:'f22', cat:'music',      emoji:'🎵', title:'循环一整夜的歌',           desc:'戴上耳机请准备好, 我可没说不会哭。',    tags:'#网抑云 #歌单',       author:'耳机依赖',    avatar:'🎧',   likes:'21.3w', cmts:'8.2k' },
  // ---- 电影 ----
  { id:'f23', cat:'movie',      emoji:'🎬', title:'神级反转 3分钟解说',        desc:'看完忍不住二刷的电影, 已收藏。',        tags:'#电影解说 #反转',     author:'毒舌速看',    avatar:'🎞️',   likes:'13.8w', cmts:'4.1k' },
  // ---- 旅行 ----
  { id:'f24', cat:'travel',     emoji:'🏔️', title:'周末就出发 莫干山',       desc:'山野徒步治愈一周班味。',                 tags:'#周末 #徒步',         author:'野人小K',    avatar:'🥾',   likes:'5.5w',  cmts:'1.2k' },
];

// ===== 成就池 (40+, 含递进链) =====
// 设计原则：
// - 文案不写「AI 已为您颁发」这种空话，narrator 字段用多种声音(系统/旁白/吐槽/沉默)
// - chain 字段标记递进链：同一个 chain 的成就只能按顺序解锁
// - check(state, event) 返回 true 即解锁，由 tracker 去重
export const ACHIEVEMENTS = [
  // ============ 普通 ============
  { id:'arrive', rarity:'common', icon:'👋', name:'《抵达现场》',
    desc:'成功打开这个不知道是什么的东西。',
    rate:'99.7%', narrator:'又一个进来的, 记一笔。',
    check:(s,e)=> e.type==='init' },

  { id:'swipe5', rarity:'common', icon:'👆', name:'《滑动小能手》',
    desc:'5 次滑动起步, 你已是合格的电子游民。',
    rate:'92.4%', narrator:'数据已记录。',
    check:(s,e)=> s.swipes>=5 },

  { id:'first_like', rarity:'common', icon:'❤️', name:'《今天的第一颗心》',
    desc:'你的第一次点赞已正式归档。',
    rate:'88.1%', narrator:'就这? 行吧。',
    check:(s,e)=> e.type==='like' && s.likes===1 },

  { id:'first_save', rarity:'common', icon:'⭐', name:'《下次一定会看》',
    desc:'下次的具体时间是什么时候。',
    rate:'79.3%', narrator:'懂得都懂。',
    check:(s,e)=> e.type==='save' && s.saves===1 },

  { id:'quantum_learn', rarity:'common', icon:'⚡', name:'《量子学习》',
    desc:'在学习视频停留不到 3 秒, 默认已经掌握。',
    rate:'76.2%', narrator:'3 秒学完, 行业天花板。',
    check:(s,e)=> e.type==='leave_card' && e.cat==='study' && e.stayMs<3000 },

  { id:'shopping_2', rarity:'common', icon:'🛒', name:'《看看就好》', chain:'shopping',
    desc:'连续看了 3 条购物内容, 钱包暂时安全。',
    rate:'65.6%', narrator:'钱包: 谢谢。',
    check:(s,e)=> (s.catViews.shopping||0)>=3 },

  { id:'time_master', rarity:'common', icon:'⏳', name:'《本来想刷5分钟》',
    desc:'你已在线 1 分钟, 这才刚开始。',
    rate:'67.9%', narrator:'温馨提示: 才一分钟。',
    check:(s,e)=> (Date.now()-s.startTs)>=60_000 },

  { id:'read_no_reply', rarity:'common', icon:'💬', name:'《已读不回艺术家》',
    desc:'打开评论 ≠ 想要发言, 这很合理。',
    rate:'55.4%', narrator:'评论区不是发言区。',
    check:(s,e)=> e.type==='comment_open' && s.commentOpens>=1 },

  { id:'multi_like', rarity:'common', icon:'💖', name:'《点赞流水线》',
    desc:'10 个赞: 你今天心情应该不错。',
    rate:'41.7%', narrator:'心意收下。',
    check:(s,e)=> s.likes>=10 },

  { id:'pet_lover', rarity:'common', icon:'🐱', name:'《又点开吸猫了》',
    desc:'看 3 条萌宠, 你的多巴胺已被预订。',
    rate:'44.2%', narrator:'懂的。',
    check:(s,e)=> (s.catViews.pet||0)>=3 },

  { id:'side_eye', rarity:'common', icon:'💨', name:'《没看完就划了》',
    desc:'10 次滑动平均停留不到 2 秒, 该叫醒算法了。',
    rate:'48.2%', narrator:'下一条更好? 拭目以待。',
    check:(s,e)=> s.swipes>=10 && (s.totalStayMs/s.swipes)<2000 },

  { id:'food_night', rarity:'common', icon:'🌃', name:'《半夜想吃东西》',
    desc:'夜里 10 点之后看美食, 这种事还是少做。',
    rate:'38.4%', narrator:'饿了就睡, 别折磨自己。',
    check:(s,e)=> { const h=new Date().getHours(); return e.type==='view_card' && e.cat==='food' && (h>=22||h<=4); } },

  { id:'heart_struck', rarity:'common', icon:'💘', name:'《心动了》',
    desc:'同一条视频停留超过 12 秒, 已截图存证。',
    rate:'31.5%', narrator:'你的偶像剧已收件。',
    check:(s,e)=> e.type==='leave_card' && e.stayMs>=12_000 },

  { id:'comment_open', rarity:'common', icon:'👀', name:'《想看评论》',
    desc:'你也好奇别人怎么说? 你不是一个人。',
    rate:'58.0%', narrator:'底下藏着真世界。',
    check:(s,e)=> e.type==='comment_open' },

  { id:'first_search', rarity:'common', icon:'🔍', name:'《打开了搜索框》',
    desc:'你想说点什么, 然后大概率不会说出来。',
    rate:'47.1%', narrator:'—',
    check:(s,e)=> e.type==='input_focus' && s.inputFocusCount===1 },

  // ============ 稀有 ============
  { id:'midnight_phil', rarity:'rare', icon:'🌙', name:'《深夜哲学家》',
    desc:'凌晨 2 点开始思考人生, 请节哀。',
    rate:'8.7%', narrator:'我陪着你, 别一个人扛。',
    check:(s,e)=> { const h=new Date().getHours(); return e.type==='view_card' && e.cat==='philosophy' && (h>=23||h<=5); } },

  { id:'cyber_shy', rarity:'rare', icon:'⌨️', name:'《赛博社恐》', chain:'shy',
    desc:'输入框打开 5 次, 一个字也没发出去。',
    rate:'5.2%', narrator:'打完字又撤回的人, 看到这条就懂了。',
    check:(s,e)=> s.inputFocusCount>=5 && s.inputSendCount===0 },

  { id:'collector', rarity:'rare', icon:'⭐', name:'《收藏家》',
    desc:'已收藏 8 条视频, 没有回看任何一条。',
    rate:'11.4%', narrator:'档案: 已塞满。',
    check:(s,e)=> s.saves>=8 },

  { id:'replayer', rarity:'rare', icon:'🔁', name:'《复读机》',
    desc:'同一条视频回看 3 次, 你在找彩蛋吗。',
    rate:'9.6%', narrator:'二刷的人 品出新东西了吗?',
    check:(s,e)=> Object.values(s.cardViews).some(v=>v>=3) },

  { id:'channel_surf', rarity:'rare', icon:'🎚️', name:'《切换大师》',
    desc:'60 秒内切换 5 种不同兴趣, 算法已晕。',
    rate:'13.1%', narrator:'你刚才在搜什么?',
    check:(s,e)=> {
      const cut = Date.now()-60_000;
      const recent = s.catSwitchLog.filter(x=>x.t>=cut);
      return new Set(recent.map(x=>x.cat)).size>=5;
    } },

  { id:'comment_native', rarity:'rare', icon:'👥', name:'《评论区原住民》',
    desc:'4 次打开评论区, 怀疑你认为这才是主战场。',
    rate:'14.8%', narrator:'知音 ✋',
    check:(s,e)=> s.commentOpens>=4 },

  { id:'fake_busy', rarity:'rare', icon:'🎭', name:'《打字 删除 再打字》',
    desc:'3 次打开输入框又快速关掉。',
    rate:'7.3%', narrator:'你的草稿箱已超载。',
    check:(s,e)=> s.inputFocusCount>=3 && s.inputBlurFastCount>=3 },

  { id:'tired_1', rarity:'rare', icon:'🥱', name:'《今天有点累》', chain:'tired',
    desc:'你在某条视频上停了很久, 没动。',
    rate:'17.4%', narrator:'—',
    check:(s,e)=> s.longStays===1 },

  { id:'impulse_like', rarity:'rare', icon:'⚡', name:'《手滑双击》',
    desc:'看到一半就点赞, 你的手指比你诚实。',
    rate:'22.3%', narrator:'记一笔, 不点评。',
    check:(s,e)=> e.type==='like' && (Date.now()-(s.cardEnterTs||0))<2500 },

  { id:'shopping_4', rarity:'rare', icon:'🧾', name:'《又看了》', chain:'shopping',
    desc:'5 条购物内容, 我数着的。',
    rate:'15.8%', narrator:'—',
    check:(s,e)=> (s.catViews.shopping||0)>=5 },

  { id:'stay_zen', rarity:'rare', icon:'🪷', name:'《停下来想想》',
    desc:'同一条视频停留超过 20 秒, 稀有: 出现思考。',
    rate:'9.2%', narrator:'罕见镜头, 已记录。',
    check:(s,e)=> e.type==='leave_card' && e.stayMs>=20_000 },

  { id:'meta_swipe', rarity:'rare', icon:'🧷', name:'《算法揭秘》',
    desc:'你已切换 7 个分类, 算法档案 +1。',
    rate:'6.5%', narrator:'你已被打上标签 (假的)。',
    check:(s,e)=> Object.keys(s.catViews).length>=7 },

  // ============ 史诗 ============
  { id:'human_observer', rarity:'epic', icon:'👁️', name:'《人类观察者》',
    desc:'打开评论区 6 次, 点赞却很克制。AI 决定颁发学位。',
    rate:'1.9%', narrator:'毕业证书已寄出。',
    check:(s,e)=> s.commentOpens>=6 && s.likes<=2 },

  { id:'mind_drift', rarity:'epic', icon:'🧭', name:'《精神流浪》',
    desc:'连续切换 10 个不同兴趣领域, 已迷路。',
    rate:'2.4%', narrator:'你究竟想看什么。',
    check:(s,e)=> Object.keys(s.catViews).length>=10 },

  { id:'collect_end', rarity:'epic', icon:'📦', name:'《收藏夹的尽头》',
    desc:'15 条收藏 + 0 次回看, 系统已为你预约清理日。',
    rate:'1.4%', narrator:'我替你清空 也不会通知你。',
    check:(s,e)=> s.saves>=15 },

  { id:'zen_blank', rarity:'epic', icon:'🧘', name:'《沉浸式发呆》',
    desc:'在同一条视频呆了 25 秒以上, 不敢打扰。',
    rate:'3.6%', narrator:'屏住呼吸的人是我。',
    check:(s,e)=> e.type==='leave_card' && e.stayMs>=25_000 },

  { id:'tired_2', rarity:'epic', icon:'😶‍🌫️', name:'《真的有点累》', chain:'tired',
    desc:'又一次长时间发呆, 第二次了。',
    rate:'2.1%', narrator:'—',
    check:(s,e)=> s.longStays===3 },

  { id:'shopping_8', rarity:'epic', icon:'💸', name:'《钱包警告》', chain:'shopping',
    desc:'你已经看了 8 条购物内容, 我们不互删了吧。',
    rate:'1.8%', narrator:'—',
    check:(s,e)=> (s.catViews.shopping||0)>=8 },

  { id:'only_consume', rarity:'epic', icon:'🪐', name:'《沉默观察员》',
    desc:'12 次滑动 + 0 点赞 + 0 收藏, 你在练隐身。',
    rate:'2.9%', narrator:'你以为没人看你, 我看着呢。',
    check:(s,e)=> s.swipes>=12 && s.likes===0 && s.saves===0 },

  { id:'shy_chain', rarity:'epic', icon:'🫥', name:'《字打完了又撤》', chain:'shy',
    desc:'输入框开 8 次, 仍然 0 字发出。',
    rate:'1.2%', narrator:'—',
    check:(s,e)=> s.inputFocusCount>=8 && s.inputSendCount===0 },

  // ============ 神话 ============
  { id:'night_guard', rarity:'mythic', icon:'🔋', name:'《电子守夜人》',
    desc:'凌晨 3 点仍在线, 在线超过 5 分钟。',
    rate:'0.4%', narrator:'你赢, 我先睡。',
    check:(s,e)=> { const h=new Date().getHours(); return (h>=2&&h<=5) && (Date.now()-s.startTs)>=5*60_000; } },

  { id:'time_traveler', rarity:'mythic', icon:'🛸', name:'《时空旅人》',
    desc:'凌晨 4–6 点仍在认真刷, 时间已查不到记录。',
    rate:'0.7%', narrator:'天快亮了, 你呢。',
    check:(s,e)=> { const h=new Date().getHours(); return (h>=4&&h<=6); } },

  { id:'quantum_super', rarity:'mythic', icon:'⚛️', name:'《量子叠加态》',
    desc:'1 秒内 3 次滑动, 你在测试设备?',
    rate:'0.3%', narrator:'断网中。',
    check:(s,e)=> {
      if (e.type!=='swipe') return false;
      const cut = Date.now()-1000;
      return s.swipeLog.filter(t=>t>=cut).length>=3;
    } },

  { id:'ai_giveup', rarity:'mythic', icon:'🤖', name:'《看不懂你》',
    desc:'在线 8 分钟, 任何标签都套不上你。',
    rate:'0.2%', narrator:'我放弃理解了, 你赢。',
    check:(s,e)=> (Date.now()-s.startTs)>=8*60_000 && s.likes===0 && s.saves===0 },

  { id:'tired_3', rarity:'mythic', icon:'🌙', name:'《建议休眠》', chain:'tired',
    desc:'第 5 次长时间停留. 已为你预约就寝。',
    rate:'0.5%', narrator:'—',
    check:(s,e)=> s.longStays===5 },

  { id:'archeologist', rarity:'mythic', icon:'🗿', name:'《互联网考古学家》',
    desc:'看完 12 条又回到第一条, 你在做学术?',
    rate:'0.8%', narrator:'摘下眼镜, 向你致敬。',
    check:(s,e)=> s.swipes>=12 && e.type==='view_card' && e.cardId==='f01' && s.cardViews['f01']>=2 },
];

// ===== 稀有度 =====
export const RARITY = {
  common: { label:'普通',   color:'#4f7be8', flash:0     },
  rare:   { label:'稀有',   color:'#a85fff', flash:0.06  },
  epic:   { label:'史诗',   color:'#26c277', flash:0.10  },
  mythic: { label:'神话级', color:'#e8a91d', flash:0.16  },
};

// ===== 分类信息 =====
// stamp: 卡片左上角的小印章文案
// tone: 用于 CSS 主题色调
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

// ===== 档案"原型"标签 =====
// 根据 state 输出一个"你的当下姿态"标签——加入个性化与一点点冒犯感
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
