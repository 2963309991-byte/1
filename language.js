"use strict";

const interfaceText = {
  en: {
    homeLabel:"Build Shenzhen home", navLabel:"Main navigation", language:"Language", play:"Historical Origins", map:"Story Map", sources:"Sources",
    location:"Shenzhen, China", economic:"LAND RIGHTS. PUBLIC REVENUE. CITY BUILDING.",
    lede:"How did Shenzhen turn land-use rights into funds for building a city? Meet the characters, check the historical evidence, then try a simulation.",
    start:"Start the conversation", explore:"Explore Story Map", heroCaption:"Shenzhen River · Pixel illustration",
    stageLabel:"Game stages", borrow:"Borrow", adapt:"Adapt", transform:"Transform", borrowAbout:"Learn how land can raise revenue", adaptAbout:"Auction the right to use a site", transformAbout:"Put public revenue to work",
    archiveDates:"1980–1998 · Six historical stops", archive:"Pixel Archive",
    archiveAbout:"Follow Shenzhen’s land reforms. Select a pin or a year to see what happened and why it mattered.",
    mapViewport:"Interactive map of Shenzhen and Hong Kong", shenzhen:"Shenzhen", hongKong:"Hong Kong", bay:"Shenzhen Bay", mapStops:"Map stops",
    mapControls:"Map controls", zoomOut:"Zoom out", zoomIn:"Zoom in", zoomLevel:"Zoom level", reset:"Reset", resetMap:"Reset map view",
    mapHelp:"Use + / − to zoom. Drag to move when zoomed in. Pins show approximate locations.", timeline:"Historical timeline", selectedRecord:"Selected archive record",
    argumentTitle:"How land rights helped finance urban growth",
    argumentBody:"A developer could pay for time-limited use of a site while the state kept ownership. That payment created public revenue that could help fund infrastructure and prepare more sites for investment. Planning still mattered. The highest bid could set a price, but it could not tell the city where schools, parks or roads were needed.",
    viewSources:"View sources", why:"Economic significance",
    gazette:"Document heading and chapter title from the 1998 Shenzhen Government Gazette", resized:"(resized)", regulation:"Read the regulation (PDF)",
    sourcesAbout:"Historical records, research and image credits for the Pixel Archive.", photos:"Photographs and illustrations", photosAbout:"Photo credits appear on the individual archive panels. Game scenes and fictional characters are original pixel illustrations. The Story Map is schematic.",
    process:"How the work was made", processBody:"AI supported topic selection, the first prototype and later revisions, including the fictional characters, bilingual interface, interactive map and coin run. Historical events are linked to their sources.",
    backToMap:"Back to Story Map", briefing:"Historical Origins", briefingDate:"SHENZHEN · 1980", progress:"Game progress", answerPrompt:"How do you reply?",
    reply:"Your choice", evidence:"What actually happened", finish:"Finish mission", next:"Continue", begin:"Talk to the first character",
    complete:"Mission complete", open:"Trace the decisions in the archive", decisions:"Your decisions", summary:"The 1987 auction shows how a land-use right became public revenue. Open the archive to see what was auctioned, how much it raised and what that made possible.",
    openMap:"Open Story Map", replay:"Play again", scene:"Pixel illustration",
    run:"City Building Lab", runTitle:"City Building Lab", runIntro:"In this coin run, each coin represents public revenue. Collect it to fund the roads and services a growing city needs.",
    auctionRevenue:"Winning bid", auctionValue:"¥5.25 million", auctionTerm:"Original use term", auctionYears:"50 years",
    coins:"Coins collected", speed:"Pace", runHelp:"Space, ↑ or tap Jump. Jump over barriers to keep your speed.", pause:"Pause", jump:"Jump", runHelpEndless:"Space, ↑ or tap Jump. One collision ends the run.",
    runStart:"Start run", runResume:"Resume", runRestart:"Run again", runReady:"Build as you run", runReadyText:"Collect 6 and 14 coins to upgrade the city. The run ends at 24.",
    runPaused:"Run paused", runPausedText:"Your coins are safe.", runWin:"District complete", runWinText:"You’ve collected 24 coins. The city has funded roads and utilities, opened new sites for investment and set aside space for public facilities.",
    runModel:"Coins and upgrades are a game model of public revenue and investment. The archive shows the historical evidence.",
    guide:"Choose where to start", guideJump:"See the guide", guideAbout:"Follow the story in order or jump to any section.",
    guideHistory:"Talk to three characters and make Shenzhen’s land reform decisions.",
    guideMap:"Explore six historical stops and check the photographs and documents.",
    guideRun:"Collect coins in three modes and see what the city can fund.",
    bridgeTitle:"From auction revenue to city building", bridgeBody:"The auction brought in revenue. The next question was where to invest it. Try a pixel simulation of turning public funds into roads, serviced sites and public facilities.", bridgeAction:"Try the building experiment",
    selectMode:"Choose a running mode", modeLevel:"Level", modeLevelAbout:"Reach 24 coins to finish", modeTimed:"Timed", modeTimedAbout:"Collect as much as you can in 45 seconds", modeEndless:"Endless", modeEndlessAbout:"One hit ends the run",
    readyTimed:"You have 45 seconds of running time. Look out for higher-value coins as the city changes.", readyEndless:"One hit ends your run. Jump over every barrier and see how far you can get.",
    timeLeft:"Time left", elapsed:"Time run", endRound:"Finish run", timeUp:"Time’s up", runEnded:"Run finished", resultCoins:"Coins collected", tierChange:"The route changed",
    audioTitle:"Sound", audioMusic:"Music", audioEffects:"Sound effects", audioUnlock:"Click or tap to start audio.", audioAdjust:"Settings are saved on this device.", audioUnsupported:"Audio is unavailable in this browser.",
    avatar:"Customize runner", avatarPreview:"Live character preview", hair:"Hair", face:"Face", clothes:"Outfit",
    hitTitle:"Run over", hitCopy:"You hit a barrier.", tourLabel:"Welcome tour", tourStep:"Step", tourSkip:"Skip tour", tourOpen:"Open this section", tourFinish:"Open sources",
    tourPlay:"Click Historical Origins to meet the characters and make three decisions about Shenzhen’s land reform.",
    tourMap:"Click Story Map to open real photographs, records and laws at six stops.",
    tourRun:"Click City Building Lab to create a runner and try turning public revenue into city upgrades.",
    tourSources:"Open Sources to see where the historical claims, photographs and laws came from.",
    ledger:"City investment milestones", phase:"Stage", gain:"Coin collected", slow:"Barrier hit · pace slowed", invested:"Upgrade funded", upcoming:"To fund", funded:"Funded"
  },
  zh: {
    homeLabel:"返回建设深圳首页", navLabel:"主导航", language:"语言", play:"历史溯源", map:"故事地图", sources:"史料来源",
    location:"中国深圳", economic:"土地使用权 · 公共收入 · 城市建设",
    lede:"深圳怎样靠土地使用权筹措城市建设资金？从角色对话出发，在地图里查证，再到建设实验里试一试。",
    start:"开始对话", explore:"探索故事地图", heroCaption:"深圳河 · 像素插画",
    stageLabel:"游戏关卡", borrow:"借鉴", adapt:"调整", transform:"转化", borrowAbout:"看看怎样从用地取得收入", adaptAbout:"拍卖土地使用权", transformAbout:"把公共收入投入建设",
    archiveDates:"1980–1998 · 六个历史节点", archive:"像素档案馆",
    archiveAbout:"沿着地图或时间线回顾深圳土地改革。点选一个地点或年份，看看发生了什么，以及为什么重要。",
    mapViewport:"深圳与香港互动地图", shenzhen:"深圳", hongKong:"香港", bay:"深圳湾", mapStops:"地图节点",
    mapControls:"地图操作", zoomOut:"缩小地图", zoomIn:"放大地图", zoomLevel:"缩放比例", reset:"复位", resetMap:"恢复地图初始视图",
    mapHelp:"用＋／－缩放，放大后可拖动。标记为历史地点的大致位置。", timeline:"历史时间线", selectedRecord:"当前档案",
    argumentTitle:"土地使用权如何为城市建设筹资",
    argumentBody:"开发商付费取得一定年限的土地使用权，土地仍归国家所有。这笔公共收入可以用于道路和配套设施，也能为更多地块吸引投资。出价能反映开发商愿意付多少钱，学校、公园和道路建在哪里，还需要城市规划。",
    viewSources:"查看史料来源", why:"经济意义",
    gazette:"1998 年《深圳市政府公报》刊载的文件标题与章节名称", resized:"（已调整尺寸）", regulation:"阅读法规（PDF）",
    sourcesAbout:"像素档案馆使用的历史档案、研究资料与图片来源。", photos:"照片和插画", photosAbout:"照片来源见各个档案卡片。游戏场景和虚构人物均为原创像素插画。故事地图为示意图。",
    process:"作品制作过程", processBody:"AI 协助了选题、原型和后续迭代，包括角色对话、中英切换、互动地图和金币跑酷。历史事件附有对应史料。",
    backToMap:"返回故事地图", briefing:"历史溯源", briefingDate:"深圳 · 1980", progress:"游戏进度", answerPrompt:"你会怎么回答？",
    reply:"你的选择", evidence:"历史上发生了什么", finish:"完成任务", next:"继续", begin:"和第一位角色对话",
    complete:"任务完成", open:"去档案里核对这些决定", decisions:"你的三个决定", summary:"1987 年的土地拍卖把使用权变成了公共收入。去档案里看看，当时拍卖了什么、筹到多少钱、带来了哪些建设机会。",
    openMap:"打开故事地图", replay:"再玩一次", scene:"像素插画",
    run:"城市建设实验", runTitle:"城市建设实验", runIntro:"在金币跑酷里，金币代表公共收入。收集金币，为城市需要的道路和公共设施筹资。",
    auctionRevenue:"拍卖成交价", auctionValue:"525 万元", auctionTerm:"原定使用期限", auctionYears:"50 年",
    coins:"累计金币", speed:"速度", runHelp:"按空格键、↑ 或点「跳跃」。跳过路障可以保持速度。", pause:"暂停", jump:"跳跃", runHelpEndless:"按空格键、↑ 或点「跳跃」。撞到障碍就结束。",
    runStart:"开始跑酷", runResume:"继续跑", runRestart:"再跑一次", runReady:"边跑边建设", runReadyText:"累计 6 枚、14 枚时升级城市，满 24 枚通关。",
    runPaused:"已暂停", runPausedText:"金币已保留。", runWin:"城区建成", runWinText:"你已收集 24 枚金币。城市建成了道路和管网，推出了可供投资开发的新地块，也为公共设施留出了空间。",
    runModel:"金币和升级是对公共收入与投资的游戏模拟。真实史料可在故事地图查看。",
    guide:"从哪里开始？", guideJump:"查看游玩指引", guideAbout:"可以按顺序体验，也可以点开感兴趣的板块。",
    guideHistory:"和角色对话，做出三次深圳土地改革决策。",
    guideMap:"探索六个历史节点，查看照片和法规档案。",
    guideRun:"任选三种跑酷模式，用金币模拟城市建设。",
    bridgeTitle:"从拍卖收入到城市建设", bridgeBody:"拍卖筹到了钱，下一步是决定怎么投。去做个像素实验，看看公共收入怎样变成道路、可开发用地和公共设施。", bridgeAction:"试试城市建设实验",
    selectMode:"选择跑酷模式", modeLevel:"关卡模式", modeLevelAbout:"收集 24 枚金币后通关", modeTimed:"计时模式", modeTimedAbout:"45 秒内尽量多收集金币", modeEndless:"无限模式", modeEndlessAbout:"无时间上限，撞到即结束",
    readyTimed:"你有 45 秒的实际跑动时间。街景变化后，留意面值更高的金币。", readyEndless:"撞到障碍，本轮立即结束。跳过每个障碍，看看你能跑多远。",
    timeLeft:"剩余时间", elapsed:"跑动时间", endRound:"结束本轮", timeUp:"时间到", runEnded:"本轮结束", resultCoins:"累计金币", tierChange:"赛道已变化",
    audioTitle:"声音", audioMusic:"背景音乐", audioEffects:"音效", audioUnlock:"点击或轻触页面即可启用声音。", audioAdjust:"设置会保存在此设备上。", audioUnsupported:"当前浏览器无法播放声音。",
    avatar:"自选跑酷角色", avatarPreview:"角色实时预览", hair:"发型", face:"面部", clothes:"服装",
    hitTitle:"挑战结束", hitCopy:"你撞到了障碍。", tourLabel:"新手引导", tourStep:"第", tourSkip:"跳过引导", tourOpen:"打开这个板块", tourFinish:"打开史料来源",
    tourPlay:"点击亮框里的「历史溯源」，和角色对话，做三次深圳土地改革决策。",
    tourMap:"点击亮框里的「故事地图」，在六个节点查看历史照片、拍卖档案和法规。",
    tourRun:"点击亮框里的「城市建设实验」，自选角色，跑酷收集金币，体验公共收入怎样投入建设。",
    tourSources:"打开「史料来源」，查看历史说法、照片和法规各自来自哪里。",
    ledger:"城市投资进度", phase:"阶段", gain:"收集金币", slow:"撞到路障 · 暂时减速", invested:"已筹足资金", upcoming:"待筹资", funded:"已筹资"
  }
};

const chineseRecords = [
  {title:"经济特区成立", place:"深圳 · 蛇口", alt:"一位骑车人经过蛇口的「时间就是金钱，效率就是生命」标语牌", caption:"改革初期的蛇口",
    history:"1980 年 8 月，深圳成为中国首批经济特区之一。随着投资者进入，工业用地、住房和基础设施的需求随之增长。在原有行政划拨制度下，地方政府很难收回土地开发前期的投入。",
    meaning:"特区为基础设施和投资政策试验提供了空间，也促使深圳研究邻近的香港如何供应开发用地、为建设筹资。"},
  {title:"土地开始有偿使用", place:"深圳经济特区 · 罗湖", alt:"罗湖 1984 年与 2020 年的两张全景对比照片", caption:"1984 年与 2020 年的罗湖。照片展示的是相关地区后来的发展。",
    history:"1981 年，深圳经济特区的土地管理规定确立了土地使用收费制度。次年，深圳开始向外商和合资企业收取相关费用。这让政府可以收回一部分土地开发和配套投入。",
    meaning:"有偿使用让土地使用权逐渐成为一项有独立价值的经济权利。后来，深圳在进一步试验的基础上引入了公开拍卖。"},
  {title:"向香港学习", place:"香港 · 考察地点", alt:"1980 年从太平山顶俯瞰香港和维多利亚港", caption:"从太平山顶俯瞰香港，1980 年 8 月",
    history:"1986 年，深圳成立土地改革工作小组。小组调研本地市场，邀请香港地产专家分享经验，还派出团队赴港考察。",
    meaning:"深圳看到，政府可以限期出让土地开发使用权，也可以用竞争的方式决定谁取得这项权利。怎样把这套做法放进内地制度，要由深圳自己决定。"},
  {title:"首次公开拍卖土地使用权", place:"罗湖 · 地块位于深圳水库附近", alt:"1987 年深圳首次土地使用权公开拍卖的现场照片", caption:"深圳会堂的公开拍卖现场，1987 年 12 月 1 日",
    history:"1987 年 12 月 1 日，深圳公开拍卖了水库附近一块 8,588 平方米住宅用地的使用权。原定使用期限为 50 年，成交价为 525 万元人民币。",
    meaning:"竞价为有期限的土地使用权确定了价格，土地仍归国家所有。政府可以用土地收入支持城市建设，开发商也有了取得用地的新渠道。"},
  {title:"从地方试验到全国规则", place:"深圳经济特区 · 改革随后纳入全国规则", alt:"国务院 1990 年关于城镇国有土地使用权暂行条例的第一页", caption:"1990 年国务院暂行条例，第一页",
    history:"1988 年宪法修正案允许土地使用权依法转让。1990 年，国务院进一步明确城镇国有土地使用权的出让和转让规则。",
    meaning:"深圳试行的做法逐渐纳入全国法规。土地所有权和使用权的区分，使这套制度可以应用于其他城市。"},
  {title:"以法规落实城市规划", place:"深圳 · 全市规划",
    history:"1998 年《深圳市城市规划条例》正式确立了法定图则在开发管理中的地位。条例涵盖土地用途、开发强度、配套设施和法定图则草案的公众参与程序。",
    meaning:"土地市场改变了供地与筹资方式。面对快速增长的开发需求，法定图则让城市可以引导建设，并为公共需求预留空间。"}
];

const chineseSources = {
  reform:["《改革投资环境》· 世界银行","报告中的专栏 2 介绍了早期土地使用收费，以及经济特区在土地改革中的作用。"],
  exchange:["《作为政策改革试验场的深圳经济特区》· Shen 与 Xu，世界银行","该章节记录了 1986 年深圳工作小组、赴港考察和公开拍卖的准备过程。"],
  auction:["《新中国土地拍卖“第一槌”》· 深圳市档案馆","地方档案记录了拍卖日期、地块面积、最初的使用期限和成交价。"],
  lease:["《中华人民共和国城镇国有土地使用权出让和转让暂行条例》· 国务院","1990 年条例规定了城镇国有土地使用权的出让和转让方式。"],
  legal:["《绿色城市治理：深圳案例》· Journal of Urban Affairs","文章分析土地改革如何改变城市开发和规划，以及由此产生的环境治理问题。"],
  planning:["《深圳市城市规划条例》· 深圳市政府公报","1998 年原始条例规定了法定图则、开发管理与公众参与程序。"]
};

const chineseCredits = {shekou:"人民政协网", luohu:"深圳市档案馆，经《当代中国》转载", hk:"Ion Tichy，维基共享资源", auction:"《当代中国》"};

let language = "en";
try {
  if (localStorage.getItem("build-shenzhen-language") === "zh") language = "zh";
} catch {}
const t = key => interfaceText[language][key];

function updateInterfaceLanguage() {
  document.documentElement.lang = language === "zh" ? "zh-CN" : "en";
  document.querySelectorAll("[data-text]").forEach(element => { element.textContent = t(element.dataset.text); });
  document.querySelectorAll("[data-label]").forEach(element => {
    const label = t(element.dataset.label);
    element.setAttribute("aria-label", label);
    if (element.hasAttribute("data-map-action")) element.title = label;
  });
  document.querySelectorAll("[data-lang]").forEach(button => {
    button.setAttribute("aria-pressed", String(button.dataset.lang === language));
  });
}
