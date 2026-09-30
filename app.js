(function(){
var syn=window.speechSynthesis,sub=document.querySelector('.sub'),bar=document.createElement('div');
bar.className='bar';
if(!syn||typeof SpeechSynthesisUtterance==='undefined'){bar.textContent='Este navegador no reproduce audio. Prueba con Chrome o Safari.';sub.after(bar);return;}
bar.innerHTML='<label>Velocidad: <select id="rate"><option value="0.65">Muy lenta</option><option value="0.8" selected>Lenta</option><option value="1">Normal</option></select></label><button id="stop" type="button">Parar</button>';
sub.after(bar);
var voice=null,token=0;
function pick(){var v=syn.getVoices().filter(function(x){return /^en/i.test(x.lang)});voice=v.find(function(x){return /en[-_]US/i.test(x.lang)})||v[0]||null}
pick();syn.onvoiceschanged=pick;
function clear(){document.querySelectorAll('.playing').forEach(function(e){e.classList.remove('playing')})}
function clean(p){var c=p.cloneNode(true);c.querySelectorAll('.cue,button').forEach(function(e){e.remove()});return c.textContent.replace(/_{2,}/g,'...').replace(/\s+/g,' ').trim()}
function say(ps,i,t){if(t!==token)return;clear();if(i>=ps.length)return;ps[i].classList.add('playing');
var u=new SpeechSynthesisUtterance(clean(ps[i]));u.lang='en-US';if(voice)u.voice=voice;u.rate=parseFloat(document.getElementById('rate').value);u.onend=function(){say(ps,i+1,t)};syn.speak(u)}
function play(ps){syn.cancel();token++;say(ps,0,token)}
document.getElementById('stop').onclick=function(){token++;syn.cancel();clear()};
document.querySelectorAll('section:not(.videos)').forEach(function(s){
var ps=Array.prototype.filter.call(s.children,function(e){return e.tagName==='P'});
ps.forEach(function(p){var b=document.createElement('button');b.type='button';b.className='pb';b.textContent='Escuchar';b.onclick=function(){play([p])};p.prepend(b)});
var all=document.createElement('button');all.type='button';all.className='listen';all.textContent='Escuchar todo el guion';all.onclick=function(){play(ps)};s.querySelector('h2').after(all);
});
})();