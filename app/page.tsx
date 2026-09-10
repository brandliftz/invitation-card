"use client";
import {useEffect,useState} from "react";

const event={date:"2026-11-15T19:00:00+05:00",map:"https://www.google.com/maps/search/?api=1&query=The+Coconut+Garden+Gulistan+e+Johar+Karachi"};
function pad(n:number){return String(n).padStart(2,"0")}
export default function Page(){
 const [days,setDays]=useState(0),[hours,setHours]=useState(0),[mins,setMins]=useState(0),[secs,setSecs]=useState(0),[music,setMusic]=useState(false);
 useEffect(()=>{const tick=()=>{const x=Math.max(0,new Date(event.date).getTime()-Date.now());setDays(Math.floor(x/86400000));setHours(Math.floor(x/3600000)%24);setMins(Math.floor(x/60000)%60);setSecs(Math.floor(x/1000)%60)};tick();const t=setInterval(tick,1000);return()=>clearInterval(t)},[]);
 const share=async()=>{const text="You are warmly invited to the Nikah reception of Mariam Faisal & Rayyan Ahmed Siddiqui — Sunday, 15 November 2026 at 7:00 PM, The Coconut Garden, Karachi.";if(navigator.share)await navigator.share({title:"Rayyan & Mariam",text,url:location.href});else navigator.clipboard.writeText(location.href)};
 return <main>
  <div className="grain"/>
  <section className="hero">
   <div className="mandala">✦</div>
   <p className="bismillah">بِسْمِ اللهِ الرَّحْمٰنِ الرَّحِيمِ</p>
   <p className="kicker">WITH THE BLESSINGS</p>
   <p className="parents">Mr & Mrs Syed Faisal Riasat</p>
   <p className="small">REQUEST YOUR GRACIOUS PRESENCE<br/>AT THE NIKKAH RECEPTION OF THEIR BELOVED DAUGHTER</p>
   <h1>Mariam <i>&</i> Rayyan</h1>
   <p className="names">MARIAM FAISAL <span>WITH</span> RAYYAN AHMED SIDDIQUI</p>
   <p className="father">S/O OF NAUMAN AHMED SIDDIQUI</p>
   <div className="goldline"/>
   <p className="date">SUNDAY · 15 NOVEMBER 2026</p>
   <p className="time">7:00 PM</p>
   <button className="outline" onClick={()=>document.getElementById("details")?.scrollIntoView({behavior:"smooth"})}>VIEW INVITATION ↓</button>
  </section>

  <section className="countdown">
   <p className="kicker">UNTIL WE GATHER</p>
   <div className="timer"><div><b>{pad(days)}</b><span>DAYS</span></div><em>:</em><div><b>{pad(hours)}</b><span>HOURS</span></div><em>:</em><div><b>{pad(mins)}</b><span>MINUTES</span></div><em>:</em><div><b>{pad(secs)}</b><span>SECONDS</span></div></div>
  </section>

  <section id="details" className="details">
   <p className="bismillah">بِسْمِ اللهِ الرَّحْمٰنِ الرَّحِيمِ</p>
   <h2>With love & duas</h2>
   <p className="body">We warmly look forward to welcoming you.<br/>Kindly grace us with your presence on time.</p>
   <div className="eventgrid">
    <div><span>THE DAY</span><strong>Sunday</strong><p>15 November 2026</p></div>
    <div><span>THE TIME</span><strong>7:00 PM</strong><p>Gathering begins</p></div>
    <div><span>THE VENUE</span><strong>The Coconut Garden</strong><p>Gulistan e Johar Block 2<br/>near Shadi Qila Banquet, Karachi</p><a href={event.map} target="_blank">OPEN IN MAPS ↗</a></div>
   </div>
  </section>

  <section className="schedule">
   <p className="kicker">THE EVENING</p><h2>A celebration in moments</h2>
   <div className="timeline"><Item time="7:00 PM" title="Gathering"/><Item time="8:00 PM" title="Dinner"/><Item time="9:00 PM" title="Qawali"/></div>
  </section>

  <section className="rsvp">
   <p className="kicker">RSVP</p><h2>We'd love to have you with us.</h2>
   <div className="contacts"><Contact n="Syed Faisal Riasat" p="0300-2209489"/><Contact n="Syed Hassan Faisal" p="0304 2526590"/><Contact n="Syed Shaheer Faisal" p="0305 2448120"/></div>
   <div className="buttons"><button onClick={share}>SHARE INVITATION</button><button className="dark" onClick={()=>setMusic(!music)}>{music?"PAUSE MUSIC":"♪ PLAY MUSIC"}</button></div>
  </section>

  <footer><div className="mandala">✦</div><p>RAYYAN & MARIAM</p><small>15 · 11 · 2026</small></footer>
 </main>
}
function Item({time,title}:{time:string,title:string}){return <div className="item"><span>{time}</span><div><b>{title}</b><i>•</i></div></div>}
function Contact({n,p}:{n:string,p:string}){return <div className="contact"><span>{n}</span><a href={"tel:"+p.replace(/\s/g,"")}>{p}</a></div>}