const screens = document.querySelectorAll('.screen');
const CODE = '1709'; // <-- CAMBIA AQUÍ LA CLAVE

function show(id){
  screens.forEach(s => s.classList.toggle('active', s.id === id));
  window.scrollTo({top:0,behavior:'smooth'});
}
document.querySelectorAll('[data-go]').forEach(btn=>{
  btn.addEventListener('click',()=>show(btn.dataset.go));
});

let entered='';
const display=document.getElementById('codeDisplay');
document.querySelectorAll('.keypad button').forEach(btn=>{
  btn.addEventListener('click',()=>{
    if(btn.classList.contains('clear')) entered=entered.slice(0,-1);
    else if(btn.classList.contains('enter')){
      if(entered===CODE){ entered=''; show('world'); }
      else { display.textContent='✕ ✕ ✕ ✕'; setTimeout(()=>display.textContent='_ _ _ _',700); entered=''; return; }
    }else if(entered.length<4) entered+=btn.textContent;
    display.textContent=entered.padEnd(4,'_').split('').join(' ');
  });
});

const audioFile=document.getElementById('audioFile');
document.getElementById('chooseAudio').onclick=()=>audioFile.click();
audioFile.addEventListener('change',()=>{
  if(audioFile.files[0]){
    document.getElementById('audio').src=URL.createObjectURL(audioFile.files[0]);
    document.getElementById('audio').play().catch(()=>{});
  }
});

document.querySelectorAll('.photo input').forEach(input=>{
  input.addEventListener('change',()=>{
    const file=input.files[0]; if(!file)return;
    const label=input.parentElement;
    const img=document.createElement('img');
    img.src=URL.createObjectURL(file);
    label.innerHTML='';
    label.appendChild(img);
  });
});
