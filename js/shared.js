/* ═══ GULMARGONTHEGO — SHARED JS v4 ═══ */

/* ── CURSOR ── */
function initCursor(){
  if(window.matchMedia('(hover:none)').matches)return;
  const outer=document.getElementById('cursor-outer'),dot=document.getElementById('cursor-dot');
  if(!outer||!dot)return;
  let mx=0,my=0,ox=0,oy=0;
  document.addEventListener('mousemove',e=>{
    mx=e.clientX;my=e.clientY;
    dot.style.left=mx+'px';dot.style.top=my+'px';
  });
  (function loop(){ox+=(mx-ox)*.13;oy+=(my-oy)*.13;outer.style.left=ox+'px';outer.style.top=oy+'px';requestAnimationFrame(loop);})();
  document.querySelectorAll('a,button,.acard,.tc,.fq-q,.dcard-overlay,.course-card,.map-container').forEach(el=>{
    el.addEventListener('mouseenter',()=>document.body.classList.add('cursor-link'));
    el.addEventListener('mouseleave',()=>document.body.classList.remove('cursor-link'));
  });
  document.querySelectorAll('input,textarea,select').forEach(el=>{
    el.addEventListener('mouseenter',()=>document.body.classList.add('cursor-text'));
    el.addEventListener('mouseleave',()=>document.body.classList.remove('cursor-text'));
  });
}

/* ── MAGNETS ── */
function initMagnet(){
  document.querySelectorAll('.btn,.nav-bk,.mbb-book,.mbb-wa,.f-sub,.pay-btn').forEach(b=>{
    b.addEventListener('mousemove',e=>{
      const r=b.getBoundingClientRect();
      b.style.transform=`translate(${(e.clientX-r.left-r.width/2)*.15}px,${(e.clientY-r.top-r.height/2)*.15}px)`;
    });
    b.addEventListener('mouseleave',()=>{b.style.transform='';});
  });
}

/* ── NAV SCROLL SHADOW ── */
function initNavShadow(){
  const nav=document.querySelector('nav');
  if(!nav)return;
  window.addEventListener('scroll',()=>nav.classList.toggle('scrolled',window.scrollY>40),{passive:true});
}

/* ── SCROLL REVEAL ── */
function initReveal(){
  const io=new IntersectionObserver(es=>{es.forEach(e=>{if(e.isIntersecting)e.target.classList.add('in')});},{threshold:.1});
  document.querySelectorAll('.rv,.rvl,.rvr').forEach(el=>io.observe(el));
}

/* ── COUNTERS ── */
function initCounters(){
  const io=new IntersectionObserver(es=>{
    es.forEach(e=>{
      if(!e.isIntersecting)return;
      const el=e.target,target=parseInt(el.dataset.target)||0,suffix=el.dataset.suffix||'';
      let v=0;const step=target/((2000/1000)*60);
      const t=setInterval(()=>{v+=step;if(v>=target){v=target;clearInterval(t);}el.textContent=Math.floor(v).toLocaleString('en-IN')+suffix;},1000/60);
      io.unobserve(el);
    });
  },{threshold:.3});
  document.querySelectorAll('.count-up').forEach(el=>io.observe(el));
}

/* ── FAQ ── */
function initFaq(){
  document.querySelectorAll('.fq-q').forEach(q=>{
    q.addEventListener('click',()=>{
      const item=q.parentElement,was=item.classList.contains('open');
      document.querySelectorAll('.fq.open').forEach(i=>i.classList.remove('open'));
      if(!was)item.classList.add('open');
    });
  });
}

/* ── MOBILE MENU ── */
function toggleMob(){document.getElementById('mobMenu').classList.toggle('open')}
function closeMob(){document.getElementById('mobMenu').classList.remove('open')}

/* ── MAP MODAL ── */
function openMapModal(imgSrc){
  const m=document.getElementById('mapModal');
  if(!m)return;
  document.getElementById('mapModalImg').src=imgSrc;
  m.classList.add('open');
  document.body.style.overflow='hidden';
}
function closeMapModal(){
  const m=document.getElementById('mapModal');
  if(m)m.classList.remove('open');
  document.body.style.overflow='';
}
document.addEventListener('keydown',e=>{if(e.key==='Escape')closeMapModal();});

/* ── NAV INJECT ── */
function injectNav(base=''){
  document.getElementById('site-nav').innerHTML=`
<div class="topbar">
  <div class="tb-l">
    <a href="mailto:enquiry.gulmargonthego@gmail.com">✉ enquiry.gulmargonthego@gmail.com</a>
    <a href="tel:+917006303822">📞 +91 7006303822</a>
    <span>📍 Chandilora, Tangmarg, J&K — 193402</span>
  </div>
  <a href="${base}contact/" class="tb-cta">Reserve Your Spot →</a>
</div>
<nav id="mainNav">
  <div class="nav-in">
    <a href="${base}index.html" class="logo">
      <img src="${base}images/logo.png" alt="GulmargOnTheGo" onerror="this.style.display='none';this.nextElementSibling.style.display='flex'"/>
      <span style="display:none;font-family:'Poppins',sans-serif;font-size:1.1rem;font-weight:800;color:#1a3c6e">Gulmarg<span style="color:#0b8c7e">OnTheGo</span></span>
    </a>
    <ul class="nav-ul">
      <li><a href="${base}index.html">Home</a></li>
      <li><a href="${base}destinations/">Destinations ▾</a>
        <div class="dd">
          <a href="${base}destinations/#gulmarg">🏔 Gulmarg</a>
          <a href="${base}destinations/#srinagar">🌊 Srinagar</a>
          <a href="${base}destinations/#pahalgam">🌿 Pahalgam</a>
          <a href="${base}destinations/#sonamarg">❄️ Sonamarg</a>
          <a href="${base}destinations/#yusmarg">🌸 Yusmarg</a>
          <a href="${base}destinations/#doodhpathri">🌾 Doodhpathri</a>
        </div>
      </li>
      <li><a href="${base}packages/">Packages ▾</a>
        <div class="dd">
          <a href="${base}packages/#beginner">❄️ Beginner Ski</a>
          <a href="${base}packages/#powder">❄️ Powder Week</a>
          <a href="${base}packages/#heliski">⭐ Heli Skiing</a>
          <a href="${base}packages/#backcountry">🏔 Backcountry</a>
          <a href="${base}packages/#trekking">☀️ Mountain Trek</a>
          <a href="${base}packages/#camping">⛺ Meadow Camp</a>
        </div>
      </li>
      <li><a href="${base}activities/">Activities ▾</a>
        <div class="dd">
          <a href="${base}activities/#skiing">⛷ Skiing</a>
          <a href="${base}activities/#snowboarding">🏂 Snowboarding</a>
          <a href="${base}activities/#heliski">🚁 Heli Skiing</a>
          <a href="${base}activities/#trekking">🥾 Trekking</a>
          <a href="${base}activities/#camping">⛺ Camping</a>
        </div>
      </li>
      <li><a href="${base}mountain/">The Mountain ▾</a>
        <div class="dd">
          <a href="${base}mountain/#trail-map">🗺 Trail Map</a>
          <a href="${base}mountain/#stats">📊 Mountain Stats</a>
          <a href="${base}mountain/#lift-tickets">🎫 Lift Tickets</a>
          <a href="${base}slopes/">⛷ Ski Guide</a>
          <a href="${base}avalanche/" style="color:#dc2626;font-weight:600">⚠️ Avalanche</a>
        </div>
      </li>
      <li><a href="${base}team/">Team ▾</a>
        <div class="dd">
          <a href="${base}team/waseem-bhat/">Waseem Bhat</a>
          <a href="${base}team/naseer-ahmad-bhat/">Naseer Ahmad Bhat</a>
          <a href="${base}team/showket-ahmad-chopan/">Showket Ahmad Chopan</a>
          <a href="${base}team/abid-ahmad-chopan/">Abid Ahmad Chopan</a>
          <a href="${base}team/ishfaq-ahmad-bhat/">Ishfaq Ahmad Bhat</a>
          <a href="${base}team/maqsood-bhat/">Maqsood Bhat</a>
          <a href="${base}team/shahid-ahmad-khan/">Shahid Ahmad Khan</a>
        </div>
      </li>
      <li><a href="${base}getting-here/">Getting Here</a></li>
      <li><a href="${base}contact/" class="nav-bk"><span>📅 Book Now</span></a></li>
    </ul>
    <div class="hbg" onclick="toggleMob()"><span></span><span></span><span></span></div>
  </div>
</nav>
<div class="mob" id="mobMenu">
  <button class="mob-x" onclick="closeMob()">✕</button>
  <a href="${base}index.html" onclick="closeMob()">Home</a>
  <a href="${base}destinations/" onclick="closeMob()">Destinations</a>
  <a href="${base}packages/" onclick="closeMob()">Packages</a>
  <a href="${base}activities/" onclick="closeMob()">Activities</a>
  <a href="${base}mountain/" onclick="closeMob()">The Mountain</a>
  <a href="${base}team/" onclick="closeMob()">Our Team</a>
  <a href="${base}getting-here/" onclick="closeMob()">Getting Here</a>
  <a href="${base}gallery/" onclick="closeMob()">Gallery</a>
  <a href="${base}contact/" onclick="closeMob()" style="color:var(--gold2)">📅 Book Now →</a>
</div>`;
}

/* ── FOOTER INJECT ── */
function injectFooter(base=''){
  document.getElementById('site-footer').innerHTML=`
<div class="mbb">
  <div class="mbb-inner">
    <a href="${base}contact/" class="mbb-book">📅 Book Now</a>
    <a href="https://wa.me/917006303822" target="_blank" class="mbb-wa">💬 WhatsApp</a>
  </div>
</div>
<footer>
  <div class="ft-g">
    <div>
      <div class="ft-logo">
        <img src="${base}images/logo.png" alt="GulmargOnTheGo" onerror="this.style.display='none'"/>
      </div>
      <p class="ft-desc">Born and raised in Gulmarg. Two decades of skiing, trekking and unforgettable Kashmir experiences shared with guests from around the world.</p>
      <div class="ft-social">
        <a href="#" class="fsi" title="Facebook">f</a>
        <a href="#" class="fsi" title="Instagram">in</a>
        <a href="https://wa.me/917006303822" class="fsi" target="_blank" title="WhatsApp">W</a>
        <a href="#" class="fsi" title="YouTube">▶</a>
      </div>
    </div>
    <div>
      <h5>Explore</h5>
      <ul>
        <li><a href="${base}activities/">Activities</a></li>
        <li><a href="${base}packages/">Packages</a></li>
        <li><a href="${base}destinations/">Destinations</a></li>
        <li><a href="${base}accommodation/">Where to Stay</a></li>
        <li><a href="${base}slopes/">Ski Guide</a></li>
        <li><a href="${base}gallery/">Gallery</a></li>
        <li><a href="${base}team/">Our Team</a></li>
      </ul>
    </div>
    <div>
      <h5>Information</h5>
      <ul>
        <li><a href="${base}mountain/">The Mountain</a></li>
        <li><a href="${base}avalanche/" style="color:#fca5a5">⚠️ Avalanche</a></li>
        <li><a href="${base}getting-here/">Getting Here</a></li>
        <li><a href="${base}weather/">Weather Guide</a></li>
        <li><a href="${base}faq/">FAQs</a></li>
        <li><a href="https://gulmargac.in/advisory" target="_blank">Avalanche Center</a></li>
        <li><a href="https://tourism.jk.gov.in/" target="_blank">JK Tourism</a></li>
      </ul>
    </div>
    <div>
      <h5>Contact Us</h5>
      <div class="fc-r"><span class="ico">📍</span><span>Chandilora, Tangmarg, J&K — 193402</span></div>
      <div class="fc-r"><span class="ico">✉</span><span><a href="mailto:enquiry.gulmargonthego@gmail.com">enquiry.gulmargonthego@gmail.com</a></span></div>
      <div class="fc-r"><span class="ico">📞</span><span><a href="tel:+917006303822">+91 7006303822</a></span></div>
      <div class="fc-r"><span class="ico">💬</span><span><a href="https://wa.me/917006303822" target="_blank">WhatsApp — anytime</a></span></div>
    </div>
  </div>
  <div class="ft-bot">
    <span>© 2025 GulmargOnTheGo. All rights reserved.</span>
    <span>Made with ❤️ in Gulmarg, Kashmir</span>
  </div>
</footer>
<a href="https://wa.me/917006303822" class="wa" target="_blank" title="WhatsApp">
  <svg viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
</a>
<!-- MAP MODAL -->
<div class="map-modal" id="mapModal" onclick="closeMapModal()">
  <button class="map-close" onclick="closeMapModal()">✕</button>
  <div class="map-modal-inner" onclick="event.stopPropagation()">
    <img id="mapModalImg" src="" alt="Gulmarg Trail Map"/>
  </div>
</div>`;
}

/* ── INIT ── */
document.addEventListener('DOMContentLoaded',()=>{
  initCursor();
  initMagnet();
  initNavShadow();
  initReveal();
  initFaq();
  initCounters();
});
