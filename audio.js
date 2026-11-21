"use strict";

const gameAudio = (() => {
  // Original sixteen-note phrases over four-bar progressions.
  const tracks = {
    home: {bpm:87, lead:"triangle", roots:[48,45,41,43], chords:[[60,64,67],[57,60,64],[57,60,65],[59,62,67]],
      melody:[[72,76,79,76,74,72,null,67],[69,72,76,72,71,69,null,64],[65,69,72,76,77,76,72,69],[67,71,74,79,77,74,71,null]]},
    play: {bpm:74, lead:"sine", roots:[50,46,53,48], chords:[[62,65,69],[58,62,65],[57,60,65],[60,64,67]],
      melody:[[69,null,74,72,69,null,65,67],[65,null,62,65,70,null,69,null],[72,69,65,null,69,72,77,null],[76,null,74,72,67,null,64,null]]},
    archive: {bpm:80, lead:"sine", roots:[45,48,43,41], chords:[[57,60,64],[60,64,67],[55,59,62],[57,60,65]],
      melody:[[76,null,72,null,69,72,null,76],[79,null,76,74,72,null,67,null],[74,null,71,null,67,71,null,74],[77,null,76,72,69,null,65,null]]},
    run: {bpm:132, lead:"square", roots:[45,41,48,43], chords:[[57,60,64],[57,60,65],[60,64,67],[55,59,62]],
      melody:[[76,76,72,76,79,76,72,69],[77,77,72,77,81,77,72,69],[79,79,76,79,84,81,79,76],[74,74,71,74,79,77,74,71]]},
  };

  // Each cue has its own contour so it is recognizable while the music plays.
  const cues = {
    click: [[76,0,.054,.085,"triangle"],[81,.03,.04,.055,"square"]],
    pin: [[69,0,.073,.11,"triangle"],[76,.055,.105,.10,"triangle"]],
    choice: [[67,0,.08,.10,"triangle"],[71,.06,.09,.09,"triangle"],[76,.115,.14,.075,"sine"]],
    start: [[55,0,.09,.13,"triangle"],[62,.075,.09,.12,"square"],[67,.15,.18,.11,"triangle"]],
    pause: [[67,0,.10,.09,"triangle"],[62,.08,.13,.095,"triangle"]],
    jump: [[57,0,.115,.105,"triangle",72]],
    shift: [[60,0,.105,.14,"triangle"],[65,.07,.10,.13,"triangle"],[69,.14,.125,.13,"square"],[77,.23,.29,.125,"triangle"]],
    hit: [[47,0,.15,.20,"triangle",30],[39,.026,.13,.08,"square",29]],
    loss: [[62,.12,.15,.105,"triangle"],[57,.245,.18,.11,"triangle"],[50,.36,.31,.135,"sine"]],
    win: [[60,0,.13,.13,"square"],[64,.09,.12,.11,"triangle"],[67,.18,.14,.12,"square"],[72,.28,.30,.12,"triangle"],[64,.30,.28,.07,"sine"]],
    finish: [[69,0,.12,.115,"triangle"],[65,.105,.13,.11,"triangle"],[67,.20,.24,.13,"sine"]],
  };
  const buttons=[...document.querySelectorAll("[data-audio-channel]")];
  const audioMenu=document.querySelector("#sound-settings");
  const audioStatus=document.querySelector("#audio-status");
  const options={music:true, effects:true};
  const key="build-shenzhen-audio";
  try {
    const saved=JSON.parse(localStorage.getItem(key));
    for (const channel of Object.keys(options)) {
      if (typeof saved?.[channel]==="boolean") options[channel]=saved[channel];
    }
  } catch {}
  const AudioEngine=window.AudioContext ?? window.webkitAudioContext;
  let context, musicBus, effectsBus, musicVoice, timer;
  let unlocked=false;
  let pending=false;
  let song=null;
  let wanted="home";
  let stage=0;
  let nextBeat=0;
  let beat=0;

  function setLevel(node, volume, timeConstant=.04) {
    node.gain.cancelScheduledValues(context.currentTime);
    node.gain.setTargetAtTime(volume,context.currentTime,timeConstant);
  }

  function syncControls() {
    for (const button of buttons) {
      button.setAttribute("aria-pressed",String(options[button.dataset.audioChannel]));
    }
    audioMenu.dataset.muted=String(!options.music && !options.effects);
    audioStatus.textContent=t(!AudioEngine?"audioUnsupported":unlocked?"audioAdjust":"audioUnlock");
    if (!AudioEngine) buttons.forEach(button=>{button.disabled=true;});
  }

  function makeContext() {
    context=new AudioEngine();
    musicBus=context.createGain();
    effectsBus=context.createGain();
    const master=context.createGain();
    master.gain.value=.72;
    musicBus.gain.value=options.music ? .46 : 0;
    effectsBus.gain.value=options.effects ? .58 : 0;
    const filter=context.createBiquadFilter();
    filter.type="lowpass";
    filter.frequency.value=3000;
    musicBus.connect(filter).connect(master);
    effectsBus.connect(master);
    const limiter=context.createDynamicsCompressor();
    limiter.threshold.value=-13;
    master.connect(limiter).connect(context.destination);
  }

  function unlock(event) {
    if (!AudioEngine || unlocked || pending || event?.isTrusted===false || (!options.music && !options.effects)) return;
    pending=true;
    try {
      if (!context) makeContext();
      context.resume().then(()=>{
        unlocked=context.state==="running";
        syncControls();
        syncTrack();
      }).catch(()=>{}).finally(()=>{pending=false;});
    } catch {pending=false;}
  }

  function note(dest,midi,time,duration,volume,wave="triangle",end) {
    const oscillator=context.createOscillator();
    const envelope=context.createGain();
    const frequency=pitch=>440*2**((pitch-69)/12);
    oscillator.type=wave;
    oscillator.frequency.setValueAtTime(frequency(midi),time);
    if (end!==undefined) oscillator.frequency.exponentialRampToValueAtTime(frequency(end),time+duration*.82);
    envelope.gain.setValueAtTime(.0001,time);
    envelope.gain.linearRampToValueAtTime(volume,time+.012);
    envelope.gain.exponentialRampToValueAtTime(.0001,time+duration);
    oscillator.connect(envelope).connect(dest);
    oscillator.start(time);
    oscillator.stop(time+duration+.018);
  }

  function schedule() {
    if (!musicVoice || !song) return;
    const track=tracks[song];
    const now=context.currentTime;
    if (nextBeat<now-.22) nextBeat=now+.01;
    while (nextBeat<now+.115) {
      const eighth=30/(track.bpm+(song==="run"?stage*12:0));
      const bar=Math.floor(beat/8)%track.roots.length;
      const pos=beat%8;
      const playingRun=song==="run";
      const lead=track.melody[bar][pos];
      if (lead!==null) note(musicVoice,lead,nextBeat,eighth*(playingRun ? .74 : 1.36),playingRun ? .046 : .073,track.lead);
      if (pos===0 || pos===4 || (playingRun && pos%2===0)) {
        note(musicVoice,track.roots[bar]-(playingRun && pos===4 ? 12 : 0),nextBeat,eighth*1.55,playingRun ? .105 : .09);
      }
      if (pos%2===1 || (!playingRun && pos===2)) {
        const chord=track.chords[bar];
        note(musicVoice,chord[Math.floor(pos/2)%3],nextBeat,eighth*1.32,.044,"sine");
      }
      if (playingRun && (pos%2===0 || stage>0)) {
        note(musicVoice,pos%4===0?43:83,nextBeat,.066,pos%4===0 ? .075 : .024,pos%4===0?"sine":"triangle",pos%4===0?27:56);
      }
      beat++;
      nextBeat+=eighth;
    }
  }

  function syncTrack() {
    if (!unlocked) return;
    const next=options.music && !document.hidden ? wanted : null;
    if (song===next) return;
    if (timer!==undefined) clearInterval(timer);
    if (musicVoice) {
      const previous=musicVoice;
      setLevel(previous,0);
      window.setTimeout(()=>previous.disconnect(),230);
    }
    song=next;
    musicVoice=null;
    if (!song) return;
    musicVoice=context.createGain();
    musicVoice.gain.value=0;
    musicVoice.connect(musicBus);
    setLevel(musicVoice,1,.09);
    beat=0;
    nextBeat=context.currentTime+.055;
    timer=window.setInterval(schedule,42);
    schedule();
  }

  function route(screen, running=false, currentStage=0) {
    wanted=screen==="run" ? (running?"run":null) : screen==="play" ? "play" : screen==="archive" ? "archive" : "home";
    stage=currentStage;
    syncTrack();
  }

  function effect(name, detail=1) {
    if (!unlocked || !options.effects || document.hidden) return;
    const sequence=name==="coin"
      ? [[72+(detail-1)*2,0,.085,.15,"square"],[84+(detail-1)*2,.045,.135,.115,"triangle"]]
      : cues[name];
    if (!sequence) return;
    const now=context.currentTime+.012;
    sequence.forEach(([pitch,delay,length,volume,type,end])=>{
      const shift=name==="hit"?detail-1:0;
      note(effectsBus,pitch+shift,now+delay,length,volume,type,end===undefined?undefined:end+shift);
    });
  }

  buttons.forEach(button=>button.addEventListener("click",event=>{
    const channel=button.dataset.audioChannel;
    options[channel]=!options[channel];
    try { localStorage.setItem(key,JSON.stringify(options)); } catch {}
    unlock(event);
    if (context) setLevel(channel==="music"?musicBus:effectsBus,options[channel]?(channel==="music" ? .46 : .58):0);
    syncControls();
    syncTrack();
    if (channel==="effects" && options.effects) effect("click");
  }));

  document.addEventListener("pointerdown",unlock,{capture:true,passive:true});
  document.addEventListener("click",event=>{
    unlock(event);
    if (audioMenu.open && !audioMenu.contains(event.target)) audioMenu.open=false;
    const button=event.target.closest("button:not(:disabled), a.brand, summary");
    if (!button || button.closest("#sound-settings") || button.matches("[data-run-action], [data-record], [data-choice]")) return;
    effect("click");
  },true);
  document.addEventListener("keydown",event=>{
    if (event.key==="Enter" || event.key===" " || event.key==="ArrowUp") unlock(event);
    if (event.key==="Escape" && audioMenu.open) {
      audioMenu.open=false;
      audioMenu.querySelector("summary").focus();
    }
  },true);
  document.addEventListener("visibilitychange",syncTrack);
  syncControls();
  return {route,effect,refreshLabels:syncControls};
})();
