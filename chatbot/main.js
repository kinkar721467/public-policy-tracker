let sendClick = document.querySelector('#send-btn');
let appHeader = document.querySelector('.app-header');
let suggCon = document.querySelector('.suggestion-container');
let maininput = document.querySelector('#main-input');
let formContainer = document.querySelector(".container-form");
let micInput = document.querySelector('#micInput');
let aiChatBtn = document.querySelector('#aiChatBtn');
let navBar = document.querySelector(".nav");
let dlMode = document.querySelector('#mode');

// recording mic

micInput.addEventListener('click',micInputFun);

function micInputFun() {
    let recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition)();
    recognition.lang = "en-US";
    recognition.start();
    micInput.style.backgroundColor = "red"; 
    recognition.onresult = function(event) {
        let transcript = event.results[0][0].transcript;
        maininput.value = transcript;
    };

    recognition.onerror = function(event) {
        console.error("Speech recognition error: ", event.error);
    };

    recognition.onend = function() {
        micInput.style.backgroundColor = ""; 
    };
}

// ai button icon change

aiChatBtn.addEventListener('click',aiChatBtnFun);

function aiChatBtnFun() {
    let icon = aiChatBtn.querySelector('i');
    if (icon.classList.contains("fa-globe")) {
        icon.classList.remove("fa-globe");
        icon.classList.add("fa-message"); // Change to message icon
    } else {
        icon.classList.remove("fa-message");
        icon.classList.add("fa-globe"); // Change back to globe icon
    }
}

// input button 

sendClick.addEventListener('click', mssageSend);

function mssageSend() {
    if (appHeader) {
        appHeader.style.display = "none";
    }
    if (suggCon) {
        suggCon.style.display = "none";
    }
    if(formContainer) {
        formContainer.style.minHeight = "420px";
    }
    if(navBar) {
        navBar.style.display = "none";
    }
}

//drak mode to light mode

dlMode.addEventListener('click', toggleMode);

function toggleMode() {
    const root = document.documentElement;
  
    if (root.style.getPropertyValue('--primary-color') === '#0f1725') {
      // Switch to light mode
      root.style.setProperty('--primary-color', '#ffffff');
      root.style.setProperty('--secondary-color', '#007bff');
      root.style.setProperty('--font-color','black');
      root.style.setProperty('--background-color', 'linear-gradient(90deg, #ffecd2 0%, #fcb69f 100%)');
      root.style.setProperty('--hover-color', 'linear-gradient(90deg, #a1c4fd 0%, #c2e9fb 100%)');
      root.style.setProperty('--border-color','#e91e63');
      root.style.setProperty('--heading-color', 'linear-gradient(90deg, #ee0979 0%, #ff6a00 100%)');
      root.style.setProperty('--sub-heading-color', 'linear-gradient(90deg, #00d2ff 0%, #928dab 100%)');
    } else {
      // Switch back to dark mode
      root.style.setProperty('--primary-color', '#0f1725');
      root.style.setProperty('--secondary-color', '#2ecc71');
      root.style.setProperty('--background-color', '#1e2a3a');
      root.style.setProperty('--font-color','white');
      root.style.setProperty('--border-color','#a1c4fd');
      root.style.setProperty('--hover-color', '#3f5efb');
      root.style.setProperty('--heading-color', 'linear-gradient(90deg, #fc466b 0%, #3f5efb 100%)');
      root.style.setProperty('--sub-heading-color', 'linear-gradient(90deg, #a1c4fd 0%, #c2e9fb 100%)');
    }
}

// Upgrade of select
const selectElement = document.getElementById("nav-select");
const pdfbutton = document.getElementById("aiToolBtn");

selectElement.addEventListener("change", function() {
  if (selectElement.value === "UltraPro") {
    pdfbutton.style.display = "block";
  } else {
    pdfbutton.style.display = "none";
  }
});

