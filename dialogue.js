"use strict";

const chapters = [
  {
    tag:"borrow", date:"1986",
    en:{title:"A trip to Hong Kong", name:"Lin", role:"Research officer", prompt:"Shenzhen needs money to build roads. Hong Kong charges for the right to use land for a set time. What should we study?",
      choices:["How Hong Kong designs its tall buildings.","How Hong Kong raises money from land-use rights.","Keep things as they are and skip the trip."],
      results:["We’d get design ideas. We’d still need to figure out how to give builders access to land.","Good place to start. We can see how builders get a site and how the government is paid.","That keeps things familiar. We’d miss a chance to see a different way of paying for new sites."],
      history:"In 1986, Shenzhen consulted Hong Kong property experts and sent a team to Hong Kong to study its land system."},
    zh:{title:"去香港看看", name:"小林", role:"调研员", prompt:"深圳修路需要钱。香港会对有期限的土地使用权收费。我们去考察时该重点看什么？",
      choices:["看看香港的高楼是怎么设计的。","看看香港怎样通过土地使用权筹资。","照原来的办法做，这趟考察先不去了。"],
      results:["我们能带回一些设计灵感，但怎么让开发商取得用地，还是得另外想办法。","可以从这里入手。我们能看看开发商怎么取得用地，政府又怎么收取费用。","老办法用得熟，但也会错过了解另一种供地方式的机会。"],
      history:"1986 年，深圳向香港地产专家请教，并派团队赴港考察土地制度。"}
  },
  {
    tag:"adapt", date:"1987",
    en:{title:"A site by the reservoir", name:"Chen", role:"Land officer", prompt:"The state owns a site by the reservoir. How can the city raise money from it while keeping ownership?",
      choices:["Use exactly the same rules as Hong Kong.","Keep the land public and auction the right to use it for a set time.","Give the site to a builder for free."],
      results:["That gives us rules to start with, but some may not fit the law here.","Builders bid for the right to use the site. The state keeps ownership, and the winning payment becomes public revenue.","That keeps the old system going, but the city would collect no payment for the site."],
      history:"On December 1, 1987, Shenzhen auctioned a 50-year right to use a housing site for 5.25 million yuan."},
    zh:{title:"水库旁的一块地", name:"陈工", role:"土地管理人员", prompt:"水库旁有一块国有住宅用地。深圳怎样保留土地所有权，又能从这块地筹到建设资金？",
      choices:["把香港的规定原样照搬过来。","土地仍归国家，拍卖一定年限的使用权。","按老办法免费分给一家开发商。"],
      results:["这样有现成的规则可以用，但有些规定可能和这里的法律不太合适。","开发商可以出价争取使用土地的权利。土地仍归国家，政府也能获得收入。","这种办法大家都熟悉，但政府不会从这块地获得用地收入。"],
      history:"1987 年 12 月 1 日，深圳公开拍卖一块住宅用地 50 年的使用权，成交价为 525 万元。"}
  },
  {
    tag:"transform", date:"1988–1998",
    en:{title:"Room for a growing city", name:"Mei", role:"City planner", prompt:"Land payments bring in money. The city needs roads, schools and parks, too. How should we use the revenue and plan new sites?",
      choices:["Prioritize sites with the highest bids.","Invest in roads and utilities, and reserve space for schools and parks.","Decide on every project separately as it comes in."],
      results:["That can raise money. High bids won’t tell us where people need a school or a park.","Roads and utilities make more sites ready for investment. Planning also makes space for facilities that matter to residents.","It gives us flexibility. It also makes it harder to plan a road or school across several sites."],
      history:"China recognized transferable land-use rights in 1988 and set out national rules in 1990. In 1998, Shenzhen made detailed land-use plans part of its local planning rules."},
    zh:{title:"给城市留下公共空间", name:"小梅", role:"城市规划师", prompt:"土地使用权带来了收入，居民也需要道路、学校和公园。我们该怎么花这笔钱？",
      choices:["优先开发出价最高的地块。","投资道路和管网，也为学校和公园留出空间。","一个项目来了，再单独决定怎么建。"],
      results:["这能增加收入，但地价高低不能告诉我们哪里最需要学校或公园。","道路和管网能让更多地块具备开发条件。学校和公园也能提前纳入规划。","这样处理比较灵活，但要跨地块一起安排道路或学校，就会比较难。"],
      history:"1988 年，土地使用权可以依法转让，1990 年又有了全国性的具体规则。1998 年，深圳以条例明确法定图则在城市规划中的作用。"}
  }
];

const introduction = {
  en:{title:"Welcome to Shenzhen", name:"Auntie Zhou", role:"Planning office lead", prompt:"Shenzhen needs roads, homes and space for businesses. Where can the city find the money to build them? Help three colleagues decide."},
  zh:{title:"欢迎来到深圳", name:"周主任", role:"规划办公室负责人", prompt:"深圳要修路、建房，还要给新来的企业找地方。建设的钱从哪里来？和三位同事一起做决定吧。"}
};

function dialogueScene(guide, guideIndex, caption) {
  return '<figure class="visual-card dialogue-scene"><div class="scene-window">' +
    '<canvas class="game-art" width="480" height="240" aria-hidden="true"></canvas>' +
    '<div class="scene-motion" aria-hidden="true"><i class="pixel-cloud cloud-one"></i><i class="pixel-cloud cloud-two"></i><i class="pixel-boat"></i><i class="water-light"></i></div>' +
    '<div class="npc-in-scene" aria-hidden="true"><canvas class="npc-sprite" data-guide="' + guideIndex + '" width="28" height="28"></canvas></div>' +
    '</div><figcaption>' + caption + '</figcaption></figure>';
}
