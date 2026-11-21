"use strict";

const tour=document.querySelector("#tour");
const tourCard=document.querySelector("#tour-card");
const tourSpotlight=document.querySelector("#tour-spotlight");
const tourSkip=document.querySelector("#tour-skip");
const tourNext=document.querySelector("#tour-next");
const guideButton=document.querySelector("#guide-jump");
const tourStops=[
  {route:"play",title:"play",copy:"tourPlay"},
  {route:"archive",title:"map",copy:"tourMap"},
  {route:"run",title:"run",copy:"tourRun"},
  {route:"sources",title:"sources",copy:"tourSources"}
];
const tourStorage="build-shenzhen-tour-v1";
let tourIndex=0;
let tourTarget=null;
let restoreTourFocus=null;

function positionTour() {
  if (!tourTarget) return;
  const bounds=tourTarget.getBoundingClientRect();
  const pad=5;
  Object.assign(tourSpotlight.style,{
    left:bounds.left-pad+"px",top:bounds.top-pad+"px",
    width:bounds.width+pad*2+"px",height:bounds.height+pad*2+"px"
  });
  const width=tourCard.offsetWidth;
  const left=Math.min(innerWidth-width-12,Math.max(12,bounds.left+bounds.width/2-width/2));
  Object.assign(tourCard.style,{left:left+"px",top:bounds.bottom+16+"px"});
}

function renderTour() {
  tourTarget?.classList.remove("tour-target");
  const stop=tourStops[tourIndex];
  tourTarget=document.querySelector('nav [data-go="'+stop.route+'"]');
  tourTarget.classList.add("tour-target");
  tourCard.setAttribute("aria-label",t("tourLabel"));
  document.querySelector("#tour-step").textContent=language==="zh"
    ? "第 "+(tourIndex+1)+" 步 / 共 "+tourStops.length+" 步"
    : "Step "+(tourIndex+1)+" of "+tourStops.length;
  document.querySelector("#tour-title").textContent=t(stop.title);
  document.querySelector("#tour-copy").textContent=t(stop.copy);
  tourNext.textContent=t(tourIndex===tourStops.length-1?"tourFinish":"tourOpen");
  positionTour();
  tourNext.focus({preventScroll:true});
}

function startTour() {
  restoreTourFocus=document.activeElement;
  tourIndex=0;
  window.scrollTo(0,0);
  document.body.classList.add("tour-active");
  tour.hidden=false;
  renderTour();
}

function closeTour(restore=true) {
  tour.hidden=true;
  document.body.classList.remove("tour-active");
  tourTarget?.classList.remove("tour-target");
  tourTarget=null;
  try { localStorage.setItem(tourStorage,"seen"); } catch {}
  if (restore) {
    const previous=restoreTourFocus?.closest("button,a");
    const fallback=page==="home" ? guideButton : pages[page].querySelector("h1");
    (previous?.getClientRects().length ? previous : fallback).focus({preventScroll:true});
  }
}

function enterTourStop() {
  const stop=tourStops[tourIndex];
  if (tourIndex===tourStops.length-1) {
    closeTour(false);
    go(stop.route);
    return;
  }
  go(stop.route);
  tourIndex+=1;
  renderTour();
}

guideButton.addEventListener("click",startTour);
tourSkip.addEventListener("click",()=>closeTour());
tourNext.addEventListener("click",enterTourStop);
tour.addEventListener("wheel",event=>{
  if (!tourCard.contains(event.target)) event.preventDefault();
},{passive:false});
document.addEventListener("click",event=>{
  if (tour.hidden || tourCard.contains(event.target)) return;
  event.preventDefault();
  event.stopImmediatePropagation();
  if (tourTarget.contains(event.target)) enterTourStop();
},true);

document.addEventListener("keydown",event=>{
  if (tour.hidden) return;
  if (event.key==="Escape") {
    event.preventDefault();
    closeTour();
  }
  if (event.key==="Tab") {
    event.preventDefault();
    const items=[tourTarget,tourSkip,tourNext];
    const current=items.indexOf(document.activeElement);
    items[(current+(event.shiftKey?-1:1)+items.length)%items.length].focus({preventScroll:true});
  }
});
window.addEventListener("resize",positionTour);
window.addEventListener("scroll",positionTour,{passive:true});
window.addEventListener("popstate",()=>{if (!tour.hidden) closeTour(false);});
let seenTour=false;
try { seenTour=localStorage.getItem(tourStorage)==="seen"; } catch {}
if (!seenTour && page==="home") startTour();
