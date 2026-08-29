const API_URL = localStorage.getItem('pti_api_url') || '';

const $ = (s) => document.querySelector(s);

document.addEventListener('DOMContentLoaded', () => {
  $('.menu')?.addEventListener('click', () => $('.nav nav')?.classList.toggle('open'));
  const year = $('#year'); if (year) year.textContent = new Date().getFullYear();
  const form = $('#admissionForm'); if (form) form.addEventListener('submit', submitAdmission);
});

async function submitAdmission(e){
  e.preventDefault();
  const f=e.target, msg=$('#formMsg');
  const data=Object.fromEntries(new FormData(f).entries());
  msg.textContent='আবেদন পাঠানো হচ্ছে...'; msg.className='notice';
  if(!API_URL){
    const apps=JSON.parse(localStorage.getItem('pti_applications')||'[]');
    apps.unshift({...data,id:Date.now().toString(),status:'Pending',createdAt:new Date().toISOString()});
    localStorage.setItem('pti_applications',JSON.stringify(apps));
    msg.textContent='আবেদন গ্রহণ করা হয়েছে। (বর্তমানে Local Demo mode)'; msg.className='notice success'; f.reset(); return;
  }
  try{
    const body=new URLSearchParams({action:'submit',...data});
    const r=await fetch(API_URL,{method:'POST',body}); const j=await r.json();
    if(!j.ok) throw new Error(j.error||'Submit failed');
    msg.textContent='আবেদন সফলভাবে জমা হয়েছে। আবেদন ID: '+j.id; msg.className='notice success'; f.reset();
  }catch(err){msg.textContent='আবেদন পাঠানো যায়নি: '+err.message; msg.className='notice error';}
}

function toggleLanguage(){alert('English version can be enabled in the next update.');}
function saveApiUrl(){const v=$('#apiUrl').value.trim(); localStorage.setItem('pti_api_url',v); alert('API URL saved.');}
function logout(){sessionStorage.removeItem('pti_token'); location.href='admin.html';}
