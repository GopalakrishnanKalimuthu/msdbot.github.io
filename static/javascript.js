
const msgerForm = get(".msger-inputarea");
const msgerInput = get(".msger-input");
const msgerChat = get(".msger-chat");


// Icons made by Freepik from www.flaticon.com
const BOT_IMG = 'bot.gif';
const PERSON_IMG = "{{ url_for('static', filename='user.png') }}";
const BOT_NAME = "Carrey";
const PERSON_NAME = "You";
const reg=window.SpeechRecognition||window.webkitSpeechRecognition;
const speech=new reg();


msgerForm.addEventListener("submit", event => {
  event.preventDefault();

  const msgText = msgerInput.value;
  if (!msgText) return;

  appendMessage(PERSON_NAME, PERSON_IMG, "right", msgText);
  msgerInput.value = "";
  botResponse(msgText);
});

function sspeech(){
  var synth = speechSynthesis;
  if (synth.speaking) {
    flag= false;
    synth.cancel();
  }
  speech.start()
speech.onresult=function(e){
  var msgText=(e.results[e.resultIndex][0].transcript);
  appendMessage(PERSON_NAME, PERSON_IMG, "right", msgText);
  botResponse(msgText);
}
}

function msdgk(name, img, side) {
      //   Simple solution for small apps
      const msgHTMLL = `
<div class="msg ${side}-msg">
<div class="msg-img" style="background-image: url(${img})"></div>

<div class="msg-bubble">
<div class="msg-info">
  <div class="msg-info-name">${name}</div>
</div>

<div class="msg-text">
I can answer the following question
<br>

<br>
<ul>
<li class="msg-texts" onclick="javascript:quickchat('policy')">Policy</li>
<li class="msg-texts" onclick="javascript:quickchat('company')">About Company</li>
<li class="msg-texts" onclick="javascript:quickchat('comp-off')">comp-off</li>
<li class="msg-texts" onclick="javascript:quickchat('business hours')">business hours</li>
<li class="msg-texts" onclick="javascript:quickchat('weekend')">weekend</li>
<li class="msg-texts" onclick="javascript:quickchat('loss of pay')">loss of pay</li>
<li class="msg-texts" onclick="javascript:quickchat('paid')">Paid leave</li>
<li class="msg-texts" onclick="javascript:quickchat('benefits')">Empolyee benefits</li>
<li class="msg-texts" onclick="javascript:quickchat('insurance')">insurance</li>
<li class="msg-texts" onclick="javascript:quickchat('query')">general query</li>
<li class="msg-texts" onclick="javascript:quickchat('attendance policy')">attendance policy</li>

</ul>
</div>
</div>
</div>
`;

      msgerChat.insertAdjacentHTML("beforeend", msgHTMLL);
      msgerChat.scrollTop += 500;
}
  
function quickchat(msgText) {
  appendMessage(PERSON_NAME, PERSON_IMG,"right", msgText);
  botResponse(msgText);
}

function appendMessage(name, img, side, text) {
  //   Simple solution for small apps
  const msgHTML = `
<div class="msg ${side}-msg">
<div class="msg-img" style="background-image: url(${img})"></div>

<div class="msg-bubble">
<div class="msg-info">
  <div class="msg-info-name">${name}</div>
</div>

<div class="msg-text">${text}</div>
</div>
</div>
`;

  msgerChat.insertAdjacentHTML("beforeend", msgHTML);
  msgerChat.scrollTop += 500;
}
  botspeak('Hi! I am Carrey, your HR assistant to help you with HR related queries');
function botResponse(rawText) {

  // Bot Response
  $.get("/get", { msg: rawText }).done(function (data) {
    console.log(rawText);
    console.log(data);
    const msgText = data;
    appendMessage(BOT_NAME, BOT_IMG, "left", msgText);
    botspeak(msgText);


  });
}






function botspeak(msgText){
  var synth = speechSynthesis;
  if (synth.speaking) {
    flag= false;
    synth.cancel();
  }
  const bspeech=new SpeechSynthesisUtterance();
  bspeech.lang="en-UK";
  
  bspeech.pitch=1.5;
  bspeech.volume=2;
  bspeech.rate=0.9;
  bspeech.text=msgText;
  window.speechSynthesis.speak(bspeech);

}



// Utils
function get(selector, root = document) {
  return root.querySelector(selector);
}
