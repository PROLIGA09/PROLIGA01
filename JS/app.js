/* 🔴 TOKEN VA CHAT ID */
const BOT_TOKEN = "8326245075:AAGaTnieB640tbfgv8s_0t0uXKUtRQ8dUjk";
const CHAT_ID  = "8074394669";

let bolim = "";

function nextPage(){
  if(!ism.value || !fam.value || !sinf.value || !harf.value){
    alert("Hamma maydonni to‘ldir!");
    return;
  }
  page1.classList.add("hide");
  page2.classList.remove("hide");
}

function openForm(b){
  bolim = b;
  bolimTitle.innerText = b + " bo‘limi";
  page2.classList.add("hide");
  page3.classList.remove("hide");
}

function send(){
  if(!taklif.value){
    alert("Taklif yoz!");
    return;
  }

  sendBtn.disabled = true;

  const text = `📝 Yangi ariza
👤 ${ism.value} ${fam.value}
🏫 ${sinf.value}-${harf.value}
📌 Bo‘lim: ${bolim}
💬 Taklif: ${taklif.value}`;

  fetch(`https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`,{
    method:"POST",
    headers:{ "Content-Type":"application/json" },
    body:JSON.stringify({ chat_id:CHAT_ID, text })
  })
  .then(response => response.json())
  .then(data => {
    if(data.ok){   
      alert("✅ Ma’lumot qabul qilindi!");
      // Sahifani tozalash
      ism.value = "";
      fam.value = "";
      sinf.value = "";
      harf.value = "";
      taklif.value = "";
      page3.classList.add("hide");
      page1.classList.remove("hide");
      sendBtn.disabled = false;
    } else {
      alert("Xatolik! Ma’lumot jo‘natilmadi.");
      sendBtn.disabled = false;
    }
  })
  .catch(()=>{
    alert("Xatolik! Internet yoki bot tokenni tekshiring.");
    sendBtn.disabled = false;
  });
}