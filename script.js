const $=(q,c=document)=>c.querySelector(q);const $$=(q,c=document)=>[...c.querySelectorAll(q)];

// active link on scroll
const secs=['home','about','timeline','values','location','contact'].map(id=>document.getElementById(id)).filter(Boolean);
const links=$$('.nav-links a');const setActive=()=>{if(!secs.length)return;const y=scrollY+innerHeight/2;let cur=secs[0].id;secs.forEach(s=>{if(y>=s.offsetTop)cur=s.id});links.forEach(a=>a.classList.toggle('active', a.getAttribute('href')===`#${cur}`))};addEventListener('scroll',setActive);setActive();

// reveal
const io=new IntersectionObserver(es=>{es.forEach(e=>{if(e.isIntersecting){e.target.classList.add('show');io.unobserve(e.target)}})},{threshold:.12});
$$('.glow,.cards .card,.timeline .t-item,.values .v-card,.gallery .gallery-item,.lead,.section-title').forEach(el=>io.observe(el));

// lightbox
const lb=$('.lightbox'),lbImg=$('.lightbox-img'),lbClose=$('.lightbox-close');
$$('.gallery-item img').forEach(img=> img.addEventListener('click',()=>{if(!lb||!lbImg)return;lbImg.src=img.src;lb.classList.add('open')}));
if(lbClose&&lb){lbClose.addEventListener('click',()=>lb.classList.remove('open'));lb.addEventListener('click',e=>{if(e.target===lb)lb.classList.remove('open')});}

// back to top
const toTop=$('.to-top');if(toTop){addEventListener('scroll',()=>{toTop.classList.toggle('show', scrollY>600)});toTop.addEventListener('click',()=>scrollTo({top:0,behavior:'smooth'}));}

// parallax
$$('[data-parallax]').forEach(sec=> addEventListener('scroll',()=>{ const y=(scrollY-sec.offsetTop)*0.3; sec.style.backgroundPosition=`center calc(50% + ${y}px)`; }));

// REACTIVE SMOKE + DOT (globale)
let tx=50, ty=50, cx=50, cy=50;
const dot=$('.cursor-dot');
addEventListener('mousemove', e=>{
  tx=(e.clientX/innerWidth)*100; ty=(e.clientY/innerHeight)*100;
  if(dot){ dot.style.left=e.clientX+'px'; dot.style.top=e.clientY+'px'; }
});
(function loop(){
  cx += (tx-cx)*0.12; cy += (ty-cy)*0.12;
  document.body.style.setProperty('--smokeX', cx+'%');
  document.body.style.setProperty('--smokeY', cy+'%');
  requestAnimationFrame(loop);
})();
