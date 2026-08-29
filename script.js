document.querySelector('.menu')?.addEventListener('click',()=>document.querySelector('.nav nav').classList.toggle('open'));
document.getElementById('year').textContent=new Date().getFullYear();
function submitAdmission(e){e.preventDefault();const f=e.target;document.getElementById('formMsg').textContent='আবেদন গ্রহণ করা হয়েছে (ডেমো)।';f.reset();}
function toggleLanguage(){alert('English version can be enabled in the next update.');}