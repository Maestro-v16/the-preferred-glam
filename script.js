
(function(){var PAGE=12,cat='All',shown=PAGE,cards=[].slice.call(document.querySelectorAll('.card')),pills=[].slice.call(document.querySelectorAll('.pill')),more=document.getElementById('more'),box=document.getElementById('box');
function render(){var m=cards.filter(function(c){return cat==='All'||c.dataset.cat===cat});cards.forEach(function(c){c.hidden=true});m.slice(0,shown).forEach(function(c){c.hidden=false});more.hidden=shown>=m.length;pills.forEach(function(x){x.setAttribute('aria-pressed',x.dataset.filter===cat)})}
function setCat(c){cat=c;shown=PAGE;render()}
pills.forEach(function(p){p.addEventListener('click',function(){setCat(p.dataset.filter)})});
[].forEach.call(document.querySelectorAll('[data-go]'),function(a){a.addEventListener('click',function(){setCat(a.dataset.go)})});
document.getElementById('moreBtn').addEventListener('click',function(){shown+=PAGE;render()});
document.getElementById('grid').addEventListener('click',function(e){var b=e.target.closest('button');if(!b)return;var i=document.getElementById('bImg');i.src=b.dataset.src;i.alt=b.querySelector('img').alt;
document.getElementById('bTitle').textContent=b.dataset.title;document.getElementById('bCat').textContent=b.dataset.catLabel;

document.getElementById('bWa').href='https://wa.me/2348142095677?text='+encodeURIComponent('Hello, I would like this look: '+b.dataset.title);box.showModal()});
document.getElementById('bClose').addEventListener('click',function(){box.close()});box.addEventListener('click',function(e){if(e.target===box)box.close()});render()})();


(function(){var st=document.querySelector('.stage'),sl=[].slice.call(document.querySelectorAll('.slide')),i=0,rm=matchMedia('(prefers-reduced-motion:reduce)').matches;
if(!rm&&sl.length>1)setInterval(function(){if(document.hidden)return;sl[i].classList.remove('on');i=(i+1)%sl.length;sl[i].classList.add('on')},4800);
var fl=[].slice.call(document.querySelectorAll('.float'));
if(!rm&&matchMedia('(hover:hover)').matches)st.addEventListener('mousemove',function(e){var r=st.getBoundingClientRect(),x=(e.clientX-r.left)/r.width-.5,y=(e.clientY-r.top)/r.height-.5;fl.forEach(function(f,k){var d=k?-1:1;f.style.translate=(x*28*d)+'px '+(y*18*d)+'px'})});
})();
