document.documentElement.classList.add('js');

/* sticky header shadow */
var topbar = document.querySelector('.ovr-top');
function onScrollTop(){ if(!topbar) return; topbar.classList.toggle('is-stuck', window.scrollY > 6); }
document.addEventListener('scroll', onScrollTop, {passive:true});
onScrollTop();

/* mobile menu */
var opener = document.querySelector('.ovr-opener');
var overlay = document.querySelector('.ovr-overlay');
if(opener && overlay){
  opener.addEventListener('click', function(){
    document.body.classList.toggle('menu-open');
  });
  overlay.querySelectorAll('a').forEach(function(a){
    a.addEventListener('click', function(){ document.body.classList.remove('menu-open'); });
  });
}

/* hero viz draw-on trigger */
var vizSvgs = document.querySelectorAll('.ovr-vizsvg');
if(vizSvgs.length){
  if('IntersectionObserver' in window){
    var vio = new IntersectionObserver(function(entries){
      entries.forEach(function(e){ if(e.isIntersecting){ e.target.classList.add('on'); } });
    }, {threshold:0.3});
    vizSvgs.forEach(function(s){ vio.observe(s); });
  } else {
    vizSvgs.forEach(function(s){ s.classList.add('on'); });
  }
  setTimeout(function(){ vizSvgs.forEach(function(s){ s.classList.add('on'); }); }, 3500);
}

/* reveal on scroll */
var revealEls = document.querySelectorAll('.ovr-reveal');
if('IntersectionObserver' in window){
  var io = new IntersectionObserver(function(entries){
    entries.forEach(function(e){ if(e.isIntersecting){ e.target.classList.add('is-in'); } });
  }, {root:null, rootMargin:'200px 0px -5% 0px', threshold:0});
  revealEls.forEach(function(el){ io.observe(el); });
}
function sweepRevealed(){
  var vh = window.innerHeight;
  revealEls.forEach(function(el){
    var r = el.getBoundingClientRect();
    if(r.top < vh*0.92){ el.classList.add('is-in'); }
  });
}
window.addEventListener('scroll', sweepRevealed, {passive:true});
window.addEventListener('load', sweepRevealed);
[600,1200,2000,2800].forEach(function(t){ setTimeout(sweepRevealed, t); });
setTimeout(function(){ revealEls.forEach(function(el){ el.classList.add('is-in'); }); }, 3500);

/* sticky cta hide near footer */
var sticky = document.querySelector('.ovr-sticky');
var foot = document.querySelector('.ovr-foot');
if(sticky && foot && 'IntersectionObserver' in window){
  var fio = new IntersectionObserver(function(entries){
    entries.forEach(function(e){ sticky.classList.toggle('ovr-hide', e.isIntersecting); });
  }, {threshold:0});
  fio.observe(foot);
}

/* guides dropdown (touch/click) */
document.querySelectorAll('.ovr-ddb').forEach(function(b){
  b.addEventListener('click',function(e){e.stopPropagation();var d=b.parentNode;d.classList.toggle('open');b.setAttribute('aria-expanded',d.classList.contains('open'));});
});
document.addEventListener('click',function(){document.querySelectorAll('.ovr-dd.open').forEach(function(d){d.classList.remove('open')});});

/* faq search */
var fs=document.getElementById('faqsearch');if(fs){fs.addEventListener('input',function(){var q=fs.value.toLowerCase(),n=0;document.querySelectorAll('.ovr-faq details, .ovr-prose details').forEach(function(d){var m=d.textContent.toLowerCase().indexOf(q)>-1;d.style.display=m?'':'none';if(m)n++;});var none=document.getElementById('faqnone');if(none)none.style.display=n?'none':'block';});}
