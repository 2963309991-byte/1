"use strict";

function pixelScene(canvas, chapter = 3) {
  const ctx = canvas.getContext("2d");
  const width = canvas.width;
  const height = canvas.height;
  ctx.scale(width / 480, height / 240);
  let seed = 28 + chapter * 71;
  const rand = () => {
    seed = (Math.imul(seed, 1664525) + 1013904223) >>> 0;
    return seed / 4294967296;
  };
  const box = (x, y, w, h, color) => {
    ctx.fillStyle = color;
    ctx.fillRect(Math.round(x), Math.round(y), Math.round(w), Math.round(h));
  };
  const skies = [
    ["#698c99","#7da5a7","#9bb9ac","#baccae","#d0ccb0","#e4c79b","#f0d49c"],
    ["#6b8b9c","#819eab","#aab3ab","#c2b6a4","#d8b9a0","#e8bd96","#f0d49c"],
    ["#658c99","#7aa4a7","#9cbbb1","#afc3aa","#c8ccb0","#e4c595","#edcf9a"],
    ["#527888","#709aa2","#8cb3b1","#a8c2af","#c3c6a8","#d9bb8b","#efce91"]
  ];
  const tones = skies[chapter];
  for (let y = 0; y < 150; y++) {
    const n = y / 150 * (tones.length - 1);
    const left = tones[Math.floor(n)].match(/\w{2}/g).map(s => parseInt(s, 16));
    const right = tones[Math.ceil(n)].match(/\w{2}/g).map(s => parseInt(s, 16));
    const color = left.map((v, i) => Math.round(v + (right[i] - v) * (n % 1)));
    box(0, y, 480, 1, 'rgb(' + color.join(',') + ')');
  }
  for (let i = 0; i < 49; i++) {
    const x = rand() * 490;
    const y = 10 + rand() * 111;
    if (i < 12) {
      box(x, y, 12 + rand() * 49, 2, "#9da99b37");
      box(x + 9, y + 2, 14 + rand() * 44, 1, "#e0cba143");
    } else {
      box(x, y, 1 + (i % 2), 1, "#ffdca657");
    }
  }
  const sunX = chapter === 3 ? 386 : 342;
  const sunY = chapter === 1 ? 70 : 80;
  for (let y = -24; y <= 24; y++) {
    const span = Math.floor(Math.sqrt(24 * 24 - y * y));
    box(sunX - span, sunY + y, span * 2 + 1, 1, y < 10 ? "#ffe2a0" : (y % 4 ? "#f8ce8f" : "#dfaa75"));
  }
  const ridge = (floor, base, fill, shift) => {
    for (let x = 0; x < 480; x += 3) {
      const y = base + Math.sin((x + shift) / 21) * 11 + Math.sin((x + shift) / 53) * 13 + Math.cos((x + shift) / 8) * 2;
      box(x, y, 3, floor - y, fill);
    }
  };
  ridge(152, 116, "#68878a", 33);
  ridge(155, 125, "#436873", 89);
  ridge(156, 135, "#325766", 160);

  const tower = (x, y, w, h, color, side, light, columns = 3) => {
    box(x, y, w, h, color);
    box(x + w, y+3, Math.max(4,w/4), h - 3, side);
    box(x, y - 2, w + 2, 2, light);
    for (let yy = y + 5; yy < y + h - 3; yy += 5) {
      for (let xx = x + 3; xx < x + w - 2; xx += Math.max(3, (w - 4) / columns)) {
        box(xx, yy, 2, 2, rand() > 0.62 ? "#e9b879" : light);
      }
    }
  };
  for (let x = -4; x < 482;) {
    const w = 5 + rand() * 14;
    const h = 5 + rand() * (chapter === 3 ? 31 : 21);
    tower(x, 151 - h, w, h, "#284856", "#31555c", "#4a6d70");
    x += w + 2;
  }
  box(0, 150, 480, 2, "#99a99a");
  for (let y = 153; y < 240; y++) {
    box(0, y, 480, 1, ["#648f91","#578584","#477577","#3d656d","#34495b"][Math.min(4, Math.floor((y-153)/16))]);
  }
  for (let i = 0; i < 525; i++) {
    const y = 154 + rand() * 87;
    const x = rand()*480;
    const inLight = Math.abs(x - sunX) < (y - 140) * .49;
    box(x, y, 2 + rand() * ((y - 150) / 5 + 5), 1, inLight && i % 2 === 0 ? "#e5b77982" : (i % 3 ? "#84aca040" : "#75c7bd75"));
  }

  // A stepped shoreline carries the foreground city and construction sites.
  const shore = chapter === 0 ? 181 : 161;
  for (let x = 118; x < 480; x += 4) {
    const bank = shore + Math.floor(Math.sin(x / 33) * 11 + Math.cos(x / 78) * 10);
    box(x, 148, 4, bank - 148 + 27, "#213d46");
    box(x, bank + 27, 4, 3, "#536565");
    box(x, bank + 30, 4, 3, "#191f29");
  }
  for (let x = 134; x < 475; x += 24) {
    const y = shore + 10 + Math.floor(Math.sin(x / 33) * 11 + Math.cos(x / 78) * 10);
    box(x, y+12, 19, 2, "#9a894f");
    box(x+6, y+6, 19, 5, "#486961");
    box(x+6, y+4, 19, 2, "#9aa273");
    box(x+8, y+7, 5, 2, "#cbbb80");
  }
  const buildings = [[216,35,25],[249,42,17],[276,24,19],[302,51,26],[331,35,17],[353,28,20],[375,83,28],[407,39,18],[429,53,24],[459,31,19]];
  buildings.forEach(([x,h,w], index) => {
    if (chapter === 0 && index % 2 === 0) return;
    if (chapter === 1 && index > 4 && index < 8) return;
    if (chapter === 2 && index === 6) return;
    const base = shore + Math.floor(Math.sin(x / 33) * 11 + Math.cos(x / 78) * 10) + 11;
    const height = chapter === 0 ? h * .68 : h;
    tower(x, base - height, w, height, index % 2 ? "#25424d" : "#314e59", "#172f42", "#537781", 4);
    if (index === 6 || index === 9) {
      box(x + 4, base - height - 7, w - 8, 5, "#315661");
      box(x + w/2, base - height - 14, 2, 8, "#a6b797");
      box(x + 6, base - height - 7, w - 11, 1, "#e7a971");
    }
  });
  const crane = (x, y, reach) => {
    box(x, y, 3, 53, "#d59a62");
    box(x - 14, y + 4, reach + 14, 3, "#efb979");
    box(x - 12, y + 8, 11, 4, "#966947");
    box(x + reach - 3, y + 7, 1, 19, "#e6b88c");
    box(x + reach - 3, y + 26, 3, 2, "#efb979");
    for (let k = 0; k < 12; k++) box(x + k, y - k + 1, 2, 1, "#e8ac70");
    for (let k = 0; k < 12; k++) box(x + k+12, y + k - 10, 2, 1, "#e8ac70");
  };
  crane(chapter === 3 ? 344 : 313, chapter === 0 ? 126 : 95, 34);
  if (chapter > 0) crane(449, 111, 24);
  const boat = (x,y,w) => {
    box(x-13,y+9,w+37,1,"#8cbaaf");
    box(x-3,y+7,w+9,2,"#162c38");
    box(x,y+3,w,4,"#b08564");
    box(x+4,y,w-9,4,"#b0b6a0");
    box(x+6,y+1,4,2,"#426771");
    box(x+w/2,y-4,1,5,"#c2cfb6");
  };
  boat(329, 215, 23);
  boat(444, 200, 16);
}

function pixelMap(canvas) {
  const ctx = canvas.getContext("2d");
  const width = canvas.width;
  const height = canvas.height;
  let seed = 88;
  const random = () => {
    seed = (Math.imul(seed, 1664525) + 1013904223) >>> 0;
    return seed / 4294967296;
  };
  const mainland = [[0,0],[420,0],[420,139],[388,132],[366,117],[332,111],[317,103],[292,113],[274,125],[249,131],[233,141],[204,137],[192,147],[175,150],[151,143],[139,149],[132,166],[111,174],[86,145],[58,139],[38,122],[0,116]];
  const hk = [[420,160],[397,164],[373,152],[345,142],[319,134],[303,145],[282,154],[255,157],[229,171],[199,165],[173,176],[158,197],[180,220],[191,245],[229,248],[251,261],[274,248],[315,257],[337,246],[369,259],[393,250],[420,262]];
  const hkIsland = [[327,270],[346,267],[365,275],[388,269],[408,276],[402,289],[381,303],[357,292],[335,294],[321,284]];
  const islands = [mainland,hk,hkIsland,[[92,229],[119,228],[137,241],[148,257],[141,272],[104,277],[76,266],[64,247]],[[43,178],[60,184],[64,206],[47,214],[34,204]]];
  const path = (points, close = false) => {
    ctx.beginPath();
    points.forEach(([x,y],i)=> i ? ctx.lineTo(x,y) : ctx.moveTo(x,y));
    if (close) ctx.closePath();
  };
  ctx.fillStyle = "#729ba4";
  ctx.fillRect(0,0,width,height);
  ctx.fillStyle = "#8aafb0";
  for (let i=0;i<510;i++) ctx.fillRect(random()*420|0,random()*306|0,2+random()*8|0,1);

  islands.forEach((land,index) => {
    path(land,true);
    ctx.fillStyle = index === 0 ? "#75b9a7" : "#9ac0a9";
    ctx.fill();
    ctx.strokeStyle="#f3e8d4";
    ctx.lineWidth=2;
    ctx.stroke();
    ctx.save();
    ctx.clip();
    const shades=["#75ac95","#639d90","#8bbda5","#82ac96"];
    for(let i=0;i<380;i++){
      ctx.fillStyle=shades[i%4];
      ctx.fillRect(random()*420|0,random()*306|0,3+random()*12|0,2+random()*8|0);
    }
    const roads=index===0?[
      [[9,92],[97,102],[158,94],[195,100],[237,87],[300,91],[349,66],[420,64]],
      [[48,41],[99,57],[157,56],[204,68],[244,56],[330,47],[389,55]],
      [[131,141],[161,95],[154,54],[185,28],[290,24],[357,34],[394,0]],
      [[262,132],[276,104],[276,68],[297,53],[299,0]],
      [[39,5],[40,37],[73,57],[84,101],[116,127]]
    ]:[
      [[183,195],[233,196],[264,176],[313,176],[353,188],[389,181],[420,192]],
      [[208,223],[260,222],[317,199],[362,210],[415,211]],
      [[329,153],[311,175],[310,208],[339,243],[369,248]],
      [[255,183],[275,209],[278,240]]
    ];
    roads.forEach((road,i)=>{
      path(road);
      ctx.strokeStyle=i===0?"#f3e8d4":"#a7cfb7";
      ctx.lineWidth=i===0?2:1;
      ctx.stroke();
    });
    ctx.restore();
  });
  const route=[[23,38],[42,45],[78,75],[72,34],[58,21],[41,24]].map(([x,y])=>[x/100*width,y/100*height]);
  path(route);
  ctx.strokeStyle="#765630";
  ctx.lineWidth=1.2;
  ctx.setLineDash([4,5]);
  ctx.stroke();
  ctx.setLineDash([]);
}

pixelScene(document.querySelector("#hero-art"));
pixelMap(document.querySelector("#map-art"));
