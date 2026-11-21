"use strict";

const runStages = [
  {goal:6, speed:122, sky:["#80a6a5","#ead1a0"], far:"#769391", near:"#617d73", ground:"#94795a", road:"#ba9c72", lane:"#e7cd9d",
    en:{place:"Early worksite", upgrade:"Roads and utilities", next:"Public revenue pays for roads and utility connections."},
    zh:{place:"早期工地", upgrade:"道路与管网", next:"把公共收入投入道路和管网建设。"}},
  {goal:14, speed:174, sky:["#88b9b1","#e4ddae"], far:"#629388", near:"#3e6e70", ground:"#54646a", road:"#7a8c87", lane:"#eee1a7",
    en:{place:"Industrial district", upgrade:"Sites ready for investment", next:"Serviced land gives new businesses a place to build."},
    zh:{place:"工业片区", upgrade:"可供投资的新地块", next:"道路和管网接通后，企业有了可以投资开发的新地块。"}},
  {goal:24, speed:229, sky:["#a2b6c1","#f1c795"], far:"#6c8797", near:"#3f647c", ground:"#424f60", road:"#6e7b8a", lane:"#f1ddad",
    en:{place:"New urban district", upgrade:"Parks and public facilities", next:"Planning reserves space for facilities residents need."},
    zh:{place:"城市新区", upgrade:"公园与公共设施", next:"通过城市规划，为居民需要的公共设施留出空间。"}}
];

const runnerCanvas = document.querySelector("#runner-art");
const runCtx = runnerCanvas.getContext("2d");
const runnerPage = document.querySelector("#run");
const runnerOverlay = document.querySelector("#runner-overlay");
const overlayCopy = document.querySelector("#runner-overlay-copy");
const overlayActions = document.querySelector("#runner-overlay-actions");
const eventNote = document.querySelector("#runner-event");
const ledger = document.querySelector("#runner-ledger");
const runJump = runnerPage.querySelector('[data-run-action="jump"]');
const runPause = runnerPage.querySelector('[data-run-action="pause"]');
const runnerWidth = runnerCanvas.width;
const runnerHeight = runnerCanvas.height;
const ground = 157;
const runnerX = 66;
const stageArt = runStages.map(buildStageArt);
const avatarOptions=document.querySelector("#avatar-options");
const avatarPreview=document.querySelector("#avatar-preview");
const look={hair:0,face:0,clothes:0};
try {
  const saved=JSON.parse(localStorage.getItem("build-shenzhen-runner-look"));
  for (const part of Object.keys(look)) {
    if (Number.isInteger(saved?.[part]) && saved[part]>=0 && saved[part]<4) look[part]=saved[part];
  }
} catch {}
let spriteFrames=makeRunnerSprites(look);
const avatarNames={
  en:{hair:["Midnight bob","Slate crop","Chestnut bun","Honey fringe"],face:["Bright eyes","Glasses","Smile","Calm eyes"],clothes:["Workwear","Blue blazer","Brick jacket","Field vest"]},
  zh:{hair:["墨黑短发","石板蓝短发","栗色发髻","蜂蜜色刘海"],face:["明亮眼睛","圆框眼镜","微笑","沉静眼睛"],clothes:["青绿工装","蓝色外套","砖红夹克","勘测马甲"]}
};
const modeButtons=[...runnerPage.querySelectorAll("[data-run-mode]")];
const runFinish=runnerPage.querySelector('[data-run-action="finish"]');
const clock=document.querySelector("#runner-clock");
const clockValue=document.querySelector("#runner-clock-value");
const timedLimit=45;
const sessions={level:freshRun(),timed:freshRun(),endless:freshRun()};
let mode="level";
let run=sessions[mode];

function rect(ctx,x,y,w,h,color) {
  ctx.fillStyle = color;
  ctx.fillRect(Math.round(x),Math.round(y),Math.round(w),Math.round(h));
}

function artLayer() {
  const canvas = document.createElement("canvas");
  canvas.width = runnerWidth;
  canvas.height = runnerHeight;
  return canvas;
}

function buildStageArt(stage,index) {
  const sky = artLayer();
  const skyCtx = sky.getContext("2d");
  const gradient = skyCtx.createLinearGradient(0,10,0,150);
  stage.sky.forEach((color,i)=>gradient.addColorStop(i,color));
  skyCtx.fillStyle=gradient;
  skyCtx.fillRect(0,0,runnerWidth,runnerHeight);
  for (let y=-22;y<=22;y++) {
    const half = Math.floor(Math.sqrt(22**2-y**2));
    rect(skyCtx,292-half,46+y,half*2+1,1,y>13 ? "#f0d290" : "#f8e4ab");
  }
  for (let i=0;i<10;i++) {
    const x = (i*67+18)%388;
    const y = (i*29+11)%75;
    rect(skyCtx,x,y,23+i%5*5,2,"#fbecd099");
    rect(skyCtx,x+7,y-2,14+i%4*3,2,"#fbecd068");
  }

  const hills = artLayer();
  const hr = hills.getContext("2d");
  for(let x=0;x<runnerWidth;x+=2) {
    const position=x/runnerWidth*Math.PI*2;
    const high=113+Math.sin(position*2)*11+Math.sin(position*5)*4;
    rect(hr,x,high,2,ground-high,stage.far);
  }

  const blocks = artLayer();
  const b = blocks.getContext("2d");
  for(let x=0,i=0;x<runnerWidth;x+=32,i++) {
    const height=10+(i*19+index*13)%(index===0 ? 18 : (index===1 ? 42 : 70));
    const base=ground-4;
    const top=base-height;
    const w=22+(i%3)*3;
    rect(b,x,top,w,height,stage.near);
    rect(b,x+w-3,top,3,height,"#253f4b70");
    rect(b,x-1,top-2,w+2,2,index===0 ? "#8a755d" : "#d3c49d");
    for(let y=top+5;y<base-3;y+=6) {
      for(let dx=4;dx<w-4;dx+=6) {
        rect(b,x+dx,y,2,2,(dx+y+i)%4===0 ? "#edc78d" : "#a7bbbb");
      }
    }
    if (index===0 && i%3===1) {
      rect(b,x+7,top-19,2,19,"#556963");
      rect(b,x+3,top-18,13,2,"#d3a367");
    }
    if (index===1 && i%3===0) {
      rect(b,x+10,top-16,6,17,"#567980");
      rect(b,x+9,top-17,8,2,"#bd916e");
    }
    if (index===2 && i%3===1) {
      rect(b,x+7,top-6,11,6,"#647f98");
      rect(b,x+12,top-15,1,10,"#eee0b8");
    }
    if (index===2 && i%3===0) {
      rect(b,x+29,base-10,2,12,"#6d5946");
      rect(b,x+26,base-15,8,8,"#79a480");
      rect(b,x+27,base-17,6,5,"#94b48c");
    }
  }
  return [sky,hills,blocks];
}

function freshRun() {
  return {status:"ready",stage:0,coins:0,distance:0,spawnAt:153,beat:0,objects:[],pixelY:0,velocity:0,slow:0,
    timestamp:0,elapsed:0,frame:0,flash:0,coinFlash:0,coinValue:0,noticeKey:null,noticeTime:0,hit:false};
}

function runText(index) {
  return runStages[index][language];
}

function updateClock() {
  if (mode==="level") return;
  const time=mode==="timed" ? Math.max(0,Math.ceil(timedLimit-run.elapsed)) : Math.floor(run.elapsed);
  const formatted=Math.floor(time/60)+":"+String(time%60).padStart(2,"0");
  if (clockValue.textContent!==formatted) clockValue.textContent=formatted;
}

function runnerPace() {
  return Math.min(310,runStages[run.stage].speed + run.elapsed*2.6);
}

function updatePace() {
  const display=(runnerPace()/runStages[0].speed).toFixed(1)+"×";
  const value=document.querySelector("#runner-speed");
  if (value.textContent!==display) value.textContent=display;
}

function renderAvatar() {
  avatarOptions.innerHTML="";
  for (const part of Object.keys(look)) {
    const group=document.createElement("fieldset");
    const label=document.createElement("legend");
    label.textContent=t(part);
    group.append(label);
    const choices=document.createElement("div");
    choices.className="avatar-choices";
    avatarNames[language][part].forEach((name,index)=>{
      const option=document.createElement("button");
      option.type="button";
      option.dataset.avatarPart=part;
      option.dataset.avatarValue=index;
      option.title=name;
      option.setAttribute("aria-label",name);
      option.setAttribute("aria-pressed",String(look[part]===index));
      const sample=document.createElement("canvas");
      sample.width=spriteSize;
      sample.height=spriteSize;
      sample.setAttribute("aria-hidden","true");
      paintPerson(sample.getContext("2d"),{...look,[part]:index});
      option.append(sample);
      choices.append(option);
    });
    group.append(choices);
    avatarOptions.append(group);
  }
  paintPerson(avatarPreview.getContext("2d"),look);
}

function syncRunnerHud() {
  document.querySelector("#runner-phase").textContent = t("phase") + " " + (run.stage+1) + "/" + runStages.length;
  document.querySelector("#runner-place").textContent = runText(run.stage).place;
  document.querySelector("#runner-coins").textContent = String(run.coins) + (mode==="level" ? " / " + runStages[run.stage].goal : "");
  updatePace();
  clock.hidden=mode==="level";
  document.querySelector("#runner-clock-label").textContent=t(mode==="timed"?"timeLeft":"elapsed");
  updateClock();
  [...ledger.children].forEach((item,index)=>{
    const funded = run.coins >= runStages[index].goal;
    item.dataset.funded = String(funded);
    item.querySelector(".ledger-status").textContent = funded ? t("funded") : t("upcoming");
    item.querySelector(".ledger-fill").style.width = Math.min(100,run.coins / runStages[index].goal * 100) + "%";
  });
  runnerPage.dataset.stage = run.stage;
  runnerPage.dataset.status = run.status;
  runnerPage.dataset.mode = mode;
}

function runnerOverlayContent() {
  const {status} = run;
  const moving = status === "playing";
  runnerOverlay.hidden = moving;
  runJump.disabled = !moving;
  runPause.disabled = !moving;
  runFinish.hidden = mode!=="endless" || !moving;
  if (moving) return;
  const readyCopy={level:"runReadyText",timed:"readyTimed",endless:"readyEndless"};
  const finishTitle={level:"runWin",timed:"timeUp",endless:"runEnded"};
  const configuration = {
    ready:["runReady",t(readyCopy[mode]),"runStart","start"],
    paused:["runPaused",t("runPausedText"),"runResume","resume"],
    complete:[run.hit ? "hitTitle" : finishTitle[mode], mode==="level" ? t("runWinText") : (run.hit ? t("hitCopy")+" " : "")+t("resultCoins")+" · "+run.coins,"runRestart","start"]
  };
  const [title,copy,label,action] = configuration[status];
  overlayCopy.innerHTML = "<h2>" + t(title) + "</h2><p>" + copy + "</p>";
  overlayActions.innerHTML = '<button class="primary" type="button" data-run-action="' + action + '">' + t(label) + '</button>' +
    (status === "complete" ? '<button class="secondary" type="button" data-go="archive">' + t("openMap") + '</button>' : "");
}

function showRunner() {
  renderAvatar();
  document.querySelector("#runner-help").textContent=t(mode==="endless"?"runHelpEndless":"runHelp");
  modeButtons.forEach(button=>button.setAttribute("aria-pressed",String(button.dataset.runMode===mode)));
  ledger.innerHTML = runStages.map((stage,index)=>'<li><div class="ledger-title"><strong>' + runText(index).upgrade + '</strong><span>' +
    stage.goal + ' <i class="hud-coin" aria-hidden="true"></i></span></div><div class="ledger-meter" aria-hidden="true"><span class="ledger-fill"></span></div>' +
    '<div class="ledger-status"></div></li>').join("");
  syncRunnerHud();
  renderNotice();
  runnerOverlayContent();
  paintRunner();
}

function setRunState(status) {
  cancelAnimationFrame(run.frame);
  run.status = status;
  gameAudio.route("run",status==="playing",run.stage);
  run.timestamp = 0;
  runnerPage.dataset.status=status;
  runnerOverlayContent();
  if (status === "playing") run.frame = requestAnimationFrame(tick);
  else paintRunner();
}

function leaveRunner() {
  if (run.status === "playing") setRunState("paused");
}

function completeRun() {
  run.noticeKey=null;
  renderNotice();
  setRunState("complete");
  gameAudio.effect(run.hit ? "loss" : mode==="level" ? "win" : "finish");
  runnerOverlay.querySelector("button").focus({preventScroll:true});
}

function setNotice(key, seconds, funded = null) {
  run.noticeKey=key;
  run.noticeTime=seconds;
  run.lastFunded=funded;
  renderNotice();
}

function renderNotice() {
  if (!run.noticeKey) {
    eventNote.textContent="";
    return;
  }
  const label=t(run.noticeKey);
  eventNote.textContent=run.lastFunded===null ? label : label+" · "+runText(run.lastFunded).upgrade+" — "+runText(run.lastFunded).next;
}

function jumpRunner() {
  if (run.status === "playing" && run.pixelY <= 0 && run.velocity === 0) {
    run.velocity=206;
    gameAudio.effect("jump");
  }
}

function populateRun() {
  while (run.spawnAt < run.distance+runnerWidth+42) {
    const offset = run.beat%9;
    const isBarrier = offset===4 || (run.stage===2 && offset===8);
    const high=offset===5 || offset===6;
    const kind=isBarrier ? run.stage : (run.stage===0 ? 0 : (offset%3===0 || high ? run.stage : 0));
    run.objects.push({x:run.spawnAt,y:isBarrier?0:(high?34:13),isBarrier,kind,value:kind+1,used:false});
    run.beat++;
    run.spawnAt += isBarrier ? 51 : 41;
  }
}

function advanceRunStage() {
  const unlocked = Number(run.coins>=runStages[0].goal) + Number(run.coins>=runStages[1].goal);
  const elapsedStage = mode==="level" ? 0 : Number(run.elapsed>=7) + Number(run.elapsed>=16);
  const next = mode==="level" ? unlocked : elapsedStage;
  if (next===run.stage) return;
  run.stage=next;
  gameAudio.route("run",true,run.stage);
  gameAudio.effect("shift");
  run.flash=.48;
  syncRunnerHud();
  if (mode==="level") setNotice("invested",2.9,next-1);
  else setNotice("tierChange",2);
  // Refresh upcoming pickups so the new forms appear within the newly opened district.
  const advanced=run.objects.findIndex(item=>item.x-run.distance>185);
  if (advanced>=0) {
    run.spawnAt=run.objects[advanced].x;
    run.beat-=run.objects.length-advanced;
    run.objects.length=advanced;
  }
}

function collectCoin(value) {
  const previous=run.coins;
  const goal=runStages.at(-1).goal;
  run.coins = mode==="level" ? Math.min(goal,run.coins+value) : run.coins+value;
  run.coinValue=run.coins-previous;
  gameAudio.effect("coin",value);
  run.coinFlash=.36;
  syncRunnerHud();
  if (mode==="level" && run.coins===goal) completeRun();
}

function updateRun(delta) {
  run.distance += runnerPace() * (run.slow>0 ? .44 : 1) * delta;
  run.flash = Math.max(0,run.flash-delta);
  run.coinFlash = Math.max(0,run.coinFlash-delta);
  run.slow = Math.max(0,run.slow-delta);
  if (run.noticeTime>0) {
    run.noticeTime-=delta;
    if (run.noticeTime<=0) {
      run.noticeKey=null;
      renderNotice();
    }
  }
  if (run.velocity!==0 || run.pixelY>0) {
    run.pixelY+=run.velocity*delta;
    run.velocity-=595*delta;
    if (run.pixelY<=0) {
      run.pixelY=0;
      run.velocity=0;
    }
  }
  populateRun();
  for (const item of run.objects) {
    const distanceToPlayer = Math.abs(item.x-run.distance-runnerX);
    if (item.used || distanceToPlayer>(item.isBarrier && item.kind===2?15:10)) continue;
    if (item.isBarrier) {
      if (run.pixelY<[11,13,17][item.kind]) {
        item.used=true;
        gameAudio.effect("hit",item.kind+1);
        if (mode==="endless") {
          run.hit=true;
          completeRun();
          break;
        }
        run.slow=.5;
        if (run.noticeKey!=="invested" && run.noticeKey!=="tierChange") setNotice("slow",1);
      }
    } else if (Math.abs(item.y-(run.pixelY+12))<13) {
      item.used=true;
      collectCoin(item.value);
      if (run.status!=="playing") break;
    }
  }
  run.objects = run.objects.filter(item=>!item.used && item.x-run.distance>-20);
}

function drawRunCharacter() {
  const movingPose=Math.floor(run.distance/8)%2===0 ? 0 : 2;
  const frame=run.status==="ready" || run.pixelY>1 ? 1 : movingPose;
  const sprite=spriteFrames[run.stage][frame];
  runCtx.imageSmoothingEnabled=false;
  runCtx.drawImage(sprite,runnerX-17,Math.round(ground-32-run.pixelY),34,34);
}

function drawRunObject(item) {
  const x=item.x-run.distance;
  const paint=(dx,y,w,h,fill)=>rect(runCtx,x+dx,y,w,h,fill);
  if (item.isBarrier) {
    if (item.kind===0) {
      paint(-7,ground-12,14,12,"#8d5841");
      paint(-8,ground-12,16,7,"#e3b477");
      paint(-6,ground-12,3,7,"#906044");paint(1,ground-12,3,7,"#906044");
    } else if (item.kind===1) {
      paint(-7,ground-3,14,3,"#453f47");paint(-5,ground-7,10,5,"#ed9a68");
      paint(-3,ground-12,6,5,"#edcfa2");paint(-2,ground-15,4,4,"#c46f4c");
    } else {
      paint(-11,ground-16,22,11,"#415064");paint(-10,ground-15,20,7,"#e4d1a4");
      paint(-8,ground-15,4,7,"#9c6b59");paint(1,ground-15,4,7,"#9c6b59");
      [-9,7].forEach(dx=>paint(dx,ground-6,3,6,"#374355"));
    }
    return;
  }
  const y=ground-item.y;
  if (item.kind===0) {
    paint(-3,y-5,6,10,"#a76a42");paint(-5,y-3,10,6,"#a76a42");
    paint(-3,y-4,6,8,"#ffd17a");paint(-4,y-2,8,4,"#ffd17a");paint(-1,y-3,2,6,"#fff0ae");
  } else if (item.kind===1) {
    paint(-5,y-6,10,12,"#3d6078");paint(-7,y-4,14,8,"#3d6078");
    paint(-5,y-4,10,8,"#b4dfdb");paint(-3,y-3,6,6,"#f3e9c9");paint(-1,y-1,2,2,"#527d92");
  } else {
    paint(-2,y-7,4,14,"#935940");paint(-5,y-4,10,8,"#b87555");paint(-7,y-2,14,4,"#935940");
    paint(-2,y-5,4,10,"#ffcf82");paint(-5,y-2,10,4,"#ffcf82");paint(-2,y-2,4,4,"#fff1b8");
  }
}

function paintRunner() {
  const stage = runStages[run.stage];
  const [sky,hills,blocks]=stageArt[run.stage];
  runCtx.drawImage(sky,0,0);
  [[hills,.15],[blocks,.5]].forEach(([layer,pace])=>{
    const offset=Math.round(run.distance*pace)%runnerWidth;
    runCtx.drawImage(layer,-offset,0);
    runCtx.drawImage(layer,runnerWidth-offset,0);
  });
  rect(runCtx,0,ground,runnerWidth,40,stage.ground);
  rect(runCtx,0,ground+3,runnerWidth,22,stage.road);
  for(let x=-(Math.round(run.distance)%29);x<runnerWidth;x+=29) {
    rect(runCtx,x,ground+16,13,2,stage.lane);
    rect(runCtx,x+7,ground+28,8,2,"#1c304426");
  }
  run.objects.forEach(drawRunObject);
  drawRunCharacter();
  if (run.coinFlash>0) {
    runCtx.font="bold 10px monospace";
    runCtx.fillStyle="#20354a";
    runCtx.fillText("+"+run.coinValue,runnerX+13,ground-33-run.pixelY);
  }
  if(run.flash>0 && !matchMedia("(prefers-reduced-motion: reduce)").matches) {
    rect(runCtx,0,0,runnerWidth,runnerHeight,"rgba(255,235,174,"+(run.flash*.34)+")");
  }
}

function tick(timestamp) {
  if (run.status!=="playing") return;
  const realTime=run.timestamp ? Math.max(0,(timestamp-run.timestamp)/1000) : 0;
  const remaining=mode==="timed"?timedLimit-run.elapsed:Infinity;
  let elapsed=Math.min(.3,realTime,remaining);
  run.timestamp=timestamp;
  run.elapsed+=Math.min(realTime,remaining);
  while (elapsed>0 && run.status==="playing") {
    const delta=Math.min(.025,elapsed);
    updateRun(delta);
    elapsed-=delta;
  }
  if (run.status==="playing") {
    advanceRunStage();
    updateClock();
    updatePace();
    if (mode==="timed" && run.elapsed>=timedLimit) completeRun();
    else run.frame=requestAnimationFrame(tick);
  }
  paintRunner();
}

avatarOptions.addEventListener("click",event=>{
  const option=event.target.closest("[data-avatar-part]");
  if (!option) return;
  const part=option.dataset.avatarPart;
  look[part]=Number(option.dataset.avatarValue);
  try { localStorage.setItem("build-shenzhen-runner-look",JSON.stringify(look)); } catch {}
  spriteFrames=makeRunnerSprites(look);
  renderAvatar();
  avatarOptions.querySelector('[data-avatar-part="'+part+'"][data-avatar-value="'+look[part]+'"]').focus({preventScroll:true});
  paintRunner();
});

runnerPage.addEventListener("click",event=>{
  const option=event.target.closest("[data-run-mode]");
  if (option) {
    const selected=option.dataset.runMode;
    if (selected!==mode) {
      leaveRunner();
      mode=selected;
      run=sessions[mode];
      showRunner();
    }
    return;
  }
  const button=event.target.closest("[data-run-action]");
  if (!button) return;
  const action=button.dataset.runAction;
  if (action==="jump") {
    jumpRunner();
  } else if (action==="finish") {
    completeRun();
  } else if (action==="pause") {
    setRunState("paused");
    gameAudio.effect("pause");
    runnerOverlay.querySelector("button").focus({preventScroll:true});
  } else {
    if (action==="start") {
      run=sessions[mode]=freshRun();
      showRunner();
    }
    runnerPage.querySelector(".runner-avatar").open=false;
    setRunState("playing");
    gameAudio.effect("start");
    runnerPage.querySelector("h1").focus({preventScroll:true});
    const frame=runnerPage.querySelector(".runner-frame");
    if (frame.getBoundingClientRect().bottom>innerHeight) frame.scrollIntoView({block:"start"});
  }
});

document.addEventListener("keydown",event=>{
  if (runnerPage.hidden || run.status!=="playing" || event.repeat || event.altKey || event.ctrlKey || event.metaKey) return;
  if (event.key!==" " && event.key!=="ArrowUp") return;
  if (event.key===" " && event.target.closest("a,button")) return;
  event.preventDefault();
  jumpRunner();
});

document.addEventListener("visibilitychange",()=>{
  if (document.hidden) leaveRunner();
});
