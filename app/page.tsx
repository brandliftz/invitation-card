"use client";
import {useEffect,useRef,useState} from "react";

const contacts=[
  ["Syed Faisal Riasat","0300 2209489"],
  ["Syed Hassan Faisal","0304 2526590"],
  ["Syed Shaheer Faisal","0305 2448120"]
];
const maps="https://www.google.com/maps/search/?api=1&query=The+Coconut+Garden+Gulistan+e+Johar+Karachi";
const target=new Date("2026-11-15T19:00:00+05:00").getTime();
const fmt=(n:number)=>String(n).padStart(2,"0");

export default function Page(){
 const audio=useRef<HTMLAudioElement>(null);
 const [playing,setPlaying]=useState(false);
 const [loading,setLoading]=useState(true);
 const [opened,setOpened]=useState(false);
 const [days,setDays]=useState({d:0,h:0,m:0,s:0});

 useEffect(()=>{
   const t=setTimeout(()=>setLoading(false),2400);
   return()=>clearTimeout(t);
 },[]);

 useEffect(()=>{
   if(loading)return;
   const reveal=()=>{
     document.querySelectorAll(".reveal").forEach(el=>{
       const r=el.getBoundingClientRect();
       if(r.top < window.innerHeight*.88) el.classList.add("visible");
     });
   };
   reveal(); window.addEventListener("scroll",reveal,{passive:true});
   return()=>window.removeEventListener("scroll",reveal);
 },[loading]);

 useEffect(()=>{
   const tick=()=>{
    const diff=Math.max(0,target-Date.now());
    setDays({d:Math.floor(diff/86400000),h:Math.floor(diff/3600000)%24,m:Math.floor(diff/60000)%60,s:Math.floor(diff/1000)%60});
   };
   tick(); const id=setInterval(tick,1000); return()=>clearInterval(id);
 },[]);

 useEffect(()=>{
   const a=audio.current;
   if(!a)return;
   a.volume=.42;
   // Best-effort autoplay. Browsers may block audible autoplay.
   a.play().then(()=>setPlaying(true)).catch(()=>{});
   const unlock=async()=>{
     try{a.muted=false; await a.play(); setPlaying(true)}catch{}
   };
   window.addEventListener("pointerdown",unlock,{once:true});
   return()=>window.removeEventListener("pointerdown",unlock);
 },[]);

 async function toggle(){
  const a=audio.current;if(!a)return;
  if(a.paused){try{await a.play();setPlaying(true)}catch{}}
  else{a.pause();setPlaying(false)}
 }
 async function openInvitation(){
   setOpened(true);
   const a=audio.current;
   if(a){
     a.volume=.42;
     try{await a.play();setPlaying(true)}catch{}
   }
   setTimeout(()=>document.getElementById("invitation")?.scrollIntoView({behavior:"smooth"}),250);
 }
 async function share(){
  const text="Rayyan & Mariam — Nikah, Sunday 15 November 2026 at 7:00 PM, The Coconut Garden, Karachi.";
  if(navigator.share) await navigator.share({title:"Rayyan & Mariam",text,url:location.href});
  else {await navigator.clipboard.writeText(location.href); alert("Invitation link copied.");}
 }

 return <main>
  <div className={"preloader "+(!loading?"preloader-hide":"")}>
    <div className="loader-petals">{Array.from({length:12}).map((_,i)=><i key={i} style={{"--i":i} as React.CSSProperties}>✦</i>)}</div>
    <div className="loader-monogram">R <span>&</span> M</div>
    <div className="loader-line"><span/></div>
    <div className="loader-text">A BEAUTIFUL BEGINNING</div>
  </div>

  {!opened && !loading && <section className="cover">
    <div className="cover-glow"/>
    <div className="cover-ornament">✦</div>
    <div className="cover-content">
      <div className="eyebrow">WITH THE BLESSINGS OF ALLAH</div>
      <div className="cover-bismillah">بِسْمِ اللهِ الرَّحْمٰنِ الرَّحِيمِ</div>
      <div className="cover-line"/>
      <p className="cover-small">YOU ARE WARMLY INVITED TO CELEBRATE</p>
      <h1><span>Rayyan</span><small>&</small><span>Mariam</span></h1>
      <p className="cover-date">15 · 11 · 2026 &nbsp; | &nbsp; 7:00 PM</p>
      <button className="open-btn" onClick={openInvitation}><span>OPEN INVITATION</span><b>✦</b></button>
      <p className="tap-note">TAP TO ENTER · SOUND WILL BEGIN</p>
    </div>
  </section>}

  <audio ref={audio} src="/nikah-wedding-ambience.wav" loop preload="auto" playsInline/>
  <button className="music" onClick={toggle}><span className={playing?"bars active":"bars"}><i/><i/><i/><i/></span>{playing?"MUSIC ON":"PLAY MUSIC"}</button>

  <section className="hero" id="invitation">
   <div className="petal-field">{Array.from({length:18}).map((_,i)=><i key={i} style={{"--i":i} as React.CSSProperties}>❧</i>)}</div>
   <div className="grain"/>
   <div className="glow g1"/><div className="glow g2"/>
   <div className="mandala m1">✦</div><div className="mandala m2">✦</div>
   <div className="stars">{Array.from({length:24}).map((_,i)=><i key={i} style={{"--i":i} as React.CSSProperties}>✦</i>)}</div>
   <div className="hero-inner">
    <div className="bismillah">بِسْمِ اللهِ الرَّحْمٰنِ الرَّحِيمِ</div>
    <div className="eyebrow">WITH THE BLESSINGS OF ALLAH</div>
    <div className="rule"/>
    <div className="parents">Mr & Mrs Syed Faisal Riasat</div>
    <p className="request">REQUEST THE HONOUR OF YOUR PRESENCE<br/>AT THE NIKKAH RECEPTION OF THEIR BELOVED DAUGHTER</p>
    <h1><span>Mariam</span><small>&</small><span>Rayyan</span></h1>
    <div className="fullnames">MARIAM FAISAL <b>WITH</b> RAYYAN AHMED SIDDIQUI</div>
    <div className="son">S/O OF NAUMAN AHMED SIDDIQUI</div>
    <div className="date">SUNDAY <b>·</b> 15 NOVEMBER 2026</div>
    <div className="hero-time">7:00 PM</div>
    <button className="discover" onClick={()=>document.getElementById("memory")?.scrollIntoView({behavior:"smooth"})}>DISCOVER OUR STORY <span>↓</span></button>
   </div>
   <div className="bottom-note">A DAY OF DUAS · FAMILY · LOVE</div>
  </section>

  <section className="memory reveal" id="memory">
   <div className="memory-copy">
    <div className="eyebrow">A LITTLE MEMORY</div>
    <h2>Before the <em>forever.</em></h2>
    <p>Some beautiful stories begin long before we know what they will become.</p>
    <div className="memory-line"/>
   </div>
   <div className="photo">
    <img src="/rayyan-mariam-childhood.png" alt="Childhood memory of Rayyan and Mariam"/>
    <div className="photo-shine"/>
    <div className="photo-tag">R & M · THEN</div>
   </div>
  </section>

  <section className="verse reveal">
   <div className="ornament">❈</div>
   <div className="arabic">وَمِنْ آيَاتِهِ أَنْ خَلَقَ لَكُم مِّنْ أَنفُسِكُمْ أَزْوَاجًا</div>
   <p>“And among His signs is that He created for you spouses from among yourselves.”</p>
   <small>SURAH AR-RUM · 30:21</small>
  </section>

  <section className="count reveal">
   <div className="eyebrow">COUNTING THE MOMENTS</div>
   <h2>Until we gather.</h2>
   <div className="clock">
    <div><b>{fmt(days.d)}</b><span>DAYS</span></div><i>:</i>
    <div><b>{fmt(days.h)}</b><span>HOURS</span></div><i>:</i>
    <div><b>{fmt(days.m)}</b><span>MINUTES</span></div><i>:</i>
    <div><b>{fmt(days.s)}</b><span>SECONDS</span></div>
   </div>
  </section>

  <section className="details reveal">
   <div className="eyebrow">THE NIKKAH RECEPTION</div>
   <h2>Come celebrate<br/><em>with us.</em></h2>
   <p className="intro">We warmly look forward to welcoming you.<br/>Kindly grace us with your presence on time.</p>
   <div className="info-grid">
    <article><span>WHEN</span><b>Sunday</b><p>15 November 2026<br/>7:00 PM</p></article>
    <article><span>WHERE</span><b>The Coconut Garden</b><p>Gulistan e Johar Block 2<br/>near Shadi Qila Banquet, Karachi</p><a href={maps} target="_blank">OPEN IN MAPS ↗</a></article>
   </div>
  </section>

  <section className="evening reveal">
   <div className="eyebrow">THE EVENING</div><h2>A celebration in three acts.</h2>
   <div className="timeline">
    <div><strong>07:00</strong><section><b>Gathering</b><p>Arrive, settle in & share the joy.</p></section></div>
    <div><strong>08:00</strong><section><b>Dinner</b><p>An evening meal with family & friends.</p></section></div>
    <div><strong>09:00</strong><section><b>Qawali</b><p>Music, memories & celebration.</p></section></div>
   </div>
  </section>

  <section className="rsvp reveal">
   <div className="eyebrow">RSVP</div><h2>Your presence<br/><em>is our blessing.</em></h2>
   <div className="contacts">{contacts.map(([n,p])=><div key={p}><span>{n}</span><a href={"tel:"+p.replaceAll(" ","")}>{p}</a></div>)}</div>
   <button className="share" onClick={share}>SHARE INVITATION ↗</button>
  </section>
  <footer><div>✦</div><b>RAYYAN & MARIAM</b><span>15 · 11 · 2026</span></footer>
 </main>
}
