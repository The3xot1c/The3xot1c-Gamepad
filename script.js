const status=document.getElementById('status');
const buttons=[...document.querySelectorAll('[data-b]')];
const axes=[...document.querySelectorAll('[data-a]')];
let active=null;
function loop(){
 const pads=navigator.getGamepads?navigator.getGamepads():[];
 const p=[...pads].find(Boolean);
 if(!p){status.textContent='DualSense • Controller wird gesucht…';requestAnimationFrame(loop);return}
 active=p;status.textContent=`DualSense • ${p.id.slice(0,58)}`;
 buttons.forEach(el=>{const i=+el.dataset.b;const b=p.buttons[i];el.classList.toggle('pressed',!!(b&&b.pressed));});
 axes.forEach(el=>{const [x,y]=el.dataset.a.split(',').map(Number);const stick=el.querySelector('circle.cap');if(!stick)return;const cx=+stick.getAttribute('cx'),cy=+stick.getAttribute('cy');const dx=(p.axes[x]||0)*17,dy=(p.axes[y]||0)*17;stick.setAttribute('transform',`translate(${dx} ${dy})`);});
 requestAnimationFrame(loop)
}
window.addEventListener('gamepadconnected',e=>{status.textContent='DualSense • verbunden';});
window.addEventListener('gamepaddisconnected',()=>{status.textContent='DualSense • Controller wird gesucht…';});
loop();
