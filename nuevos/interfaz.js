// Adaptador del catálogo de nuevos a la identidad y las animaciones de Andrés Orozco.
(() => {
  'use strict';
  const $=(s,el=document)=>el.querySelector(s), $$=(s,el=document)=>[...el.querySelectorAll(s)];
  const reduced=matchMedia('(prefers-reduced-motion: reduce)').matches;
  const esc=v=>String(v??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
  let timer,lastTrigger;
  const toast=text=>{const el=$('#toast');el.textContent=text;el.classList.add('show');clearTimeout(timer);timer=setTimeout(()=>el.classList.remove('show'),3200)};
  const showModal=dialog=>{lastTrigger=document.activeElement;dialog.showModal();document.body.style.overflow='hidden'};
  const moveInk=tab=>{const ink=tab?.parentElement.querySelector('.tab-ink');if(ink){ink.style.width=tab.offsetWidth+'px';ink.style.transform=`translateX(${tab.offsetLeft}px)`}};
  $$('dialog').forEach(dialog=>{
    dialog.addEventListener('click',e=>{if(e.target.closest('[data-close]'))dialog.close();if(e.target===dialog){const r=dialog.getBoundingClientRect();if(e.clientX<r.left||e.clientX>r.right||e.clientY<r.top||e.clientY>r.bottom)dialog.close()}});
    dialog.addEventListener('close',()=>{document.body.style.overflow='';lastTrigger?.focus({preventScroll:true})});
  });
  // Mismo acercamiento y aparición suave de la página principal, con modelos nuevos.
  function heroCarousel(items){
    const image=$('.editorial-car'),stage=$('.editorial-car-stage');let current=0;
    const set=i=>{current=(i+items.length)%items.length;const item=items[current];image.classList.remove('ready');image.src=item.src;image.alt=item.alt;image.onload=()=>image.classList.add('ready');stage.dataset.scene='road';$('#heroModel').textContent=item.title;$('#heroPosition').textContent=`${current+1} / ${items.length}`;$('#heroFicha').onclick=item.onOpen};
    $('#heroPrev').onclick=()=>set(current-1);$('#heroNext').onclick=()=>set(current+1);set(0);
  }
  const observer=new IntersectionObserver(entries=>entries.forEach(e=>{if(e.isIntersecting){e.target.classList.add('visible');observer.unobserve(e.target)}}),{threshold:.1});
  $$('.reveal').forEach(el=>observer.observe(el));
  let displayed=0,target=0,frame=0;
  function animate(){displayed+=(target-displayed)*.14;if(Math.abs(target-displayed)<.0005)displayed=target;document.documentElement.style.setProperty('--p',displayed.toFixed(4));frame=displayed!==target?requestAnimationFrame(animate):0}
  function update(){target=reduced?0:Math.min(1,Math.max(0,scrollY/Math.max(1,$('.hero-track').offsetHeight-innerHeight)));if(!frame)frame=requestAnimationFrame(animate)}
  addEventListener('scroll',update,{passive:true});addEventListener('resize',update,{passive:true});update();
  $('#year').textContent=new Date().getFullYear();
  window.FX={$, $$,esc,toast,showModal,moveInk,reduced,heroCarousel};
})();
