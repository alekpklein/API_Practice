// require("dotenv").config();
// const apiKey = process.env.SECRET_KEY;
// console.log(apiKey);

const spanishBtn = document.getElementById("spanish-btn");
const germanBtn = document.getElementById("german-btn");
const englishBtn = document.getElementById("english-btn");
const audioSpanish = document.getElementById("audio-spanish");
const audioGerman = document.getElementById("audio-german");
const audioEnglish = document.getElementById("audio-english");
const jokeDisplay = document.getElementById("joke-text");


const VoiceRSS = {
  speech: function (e) {
    this._validate(e), this._request(e);
  },
  _validate: function (e) {
    if (!e) throw "The settings are undefined";
    if (!e.key) throw "The API key is undefined";
    if (!e.src) throw "The text is undefined";
    if (!e.hl) throw "The language is undefined";
    if (e.c && "auto" != e.c.toLowerCase()) {
      var a = !1;
      switch (e.c.toLowerCase()) {
        case "mp3":
          a = new Audio().canPlayType("audio/mpeg").replace("no", "");
          break;
        case "wav":
          a = new Audio().canPlayType("audio/wav").replace("no", "");
          break;
        case "aac":
          a = new Audio().canPlayType("audio/aac").replace("no", "");
          break;
        case "ogg":
          a = new Audio().canPlayType("audio/ogg").replace("no", "");
          break;
        case "caf":
          a = new Audio().canPlayType("audio/x-caf").replace("no", "");
      }
      if (!a) throw "The browser does not support the audio codec " + e.c;
    }
  },
  _request: function (e) {
    var a = this._buildRequest(e),
      t = this._getXHR();
    (t.onreadystatechange = function () {
      if (4 == t.readyState && 200 == t.status) {
        if (0 == t.responseText.indexOf("ERROR")) throw t.responseText;
        (audioSpanish.src = t.responseText), audioSpanish.play();
      }
    }),
      t.open("POST", "https://api.voicerss.org/", !0),
      t.setRequestHeader(
        "Content-Type",
        "application/x-www-form-urlencoded; charset=UTF-8"
      ),
      t.send(a);
  },
  _buildRequest: function (e) {
    var a = e.c && "auto" != e.c.toLowerCase() ? e.c : this._detectCodec();
    return (
      "key=" +
      (e.key || "") +
      "&src=" +
      (e.src || "") +
      "&hl=" +
      (e.hl || "") +
      "&r=" +
      (e.r || "") +
      "&c=" +
      (a || "") +
      "&f=" +
      (e.f || "") +
      "&ssml=" +
      (e.ssml || "") +
      "&b64=true"
    );
  },
  _detectCodec: function () {
    var e = new Audio();
    return e.canPlayType("audio/mpeg").replace("no", "")
      ? "mp3"
      : e.canPlayType("audio/wav").replace("no", "")
      ? "wav"
      : e.canPlayType("audio/aac").replace("no", "")
      ? "aac"
      : e.canPlayType("audio/ogg").replace("no", "")
      ? "ogg"
      : e.canPlayType("audio/x-caf").replace("no", "")
      ? "caf"
      : "";
  },
  _getXHR: function () {
    try {
      return new XMLHttpRequest();
    } catch (e) {}
    try {
      return new ActiveXObject("Msxml3.XMLHTTP");
    } catch (e) {}
    try {
      return new ActiveXObject("Msxml2.XMLHTTP.6.0");
    } catch (e) {}
    try {
      return new ActiveXObject("Msxml2.XMLHTTP.3.0");
    } catch (e) {}
    try {
      return new ActiveXObject("Msxml2.XMLHTTP");
    } catch (e) {}
    try {
      return new ActiveXObject("Microsoft.XMLHTTP");
    } catch (e) {}
    throw "The browser does not support HTTP request";
  },
};

function toggleButton() {
  spanishBtn.disabled = !spanishBtn.disabled;
  germanBtn.disabled = !germanBtn.disabled;
  englishBtn.disabled = !englishBtn.disabled;
}

// function saySpanish(spanishJoke) {
//   console.log("tell me:", spanishJoke);
//   displayText(spanishJoke);
//   VoiceRSS.speech({
//     key: apiKey,
//     src: spanishJoke,
//     hl: "es-es",
//     r: 0,
//     c: "mp3",
//     f: "44khz_16bit_stereo",
//     ssml: false,
//   });
// }
function saySpanish(spanishJoke) {
  console.log("tell me:", spanishJoke);
  displayText(spanishJoke);
  VoiceRSS.speech({
    key: "23f25a57f64c461fbda94f4fcd3687cd",
    src: spanishJoke,
    hl: "es-es",
    r: 0,
    c: "mp3",
    f: "44khz_16bit_stereo",
    ssml: false,
  });
}
function sayGerman(germanJoke) {
  console.log("tell me:", germanJoke);
  VoiceRSS.speech({
    key: "23f25a57f64c461fbda94f4fcd3687cd",
    src: germanJoke,
    hl: "de-de",
    r: 0,
    c: "mp3",
    f: "44khz_16bit_stereo",
    ssml: false,
  });
}
function sayEnglish(englishJoke) {
  console.log("tell me:", englishJoke);
  VoiceRSS.speech({
    key: "23f25a57f64c461fbda94f4fcd3687cd",
    src: englishJoke,
    hl: "en-ie",
    r: 0,
    c: "mp3",
    f: "44khz_16bit_stereo",
    ssml: false,
  });
}

async function spanishJokes() {
  let spanishJoke = "";
  const apiUrl = "https://v2.jokeapi.dev/joke/Any?lang=es";
  try {
    const response = await fetch(apiUrl);
    const data = await response.json();
    if (data.setup) {
      const setup = data.setup;
      const delivery = data.delivery;
      displayText(setup);
      displayText(delivery);
      spanishJoke = `${setup} ...${delivery}`;
    } else {
      const joke = data.joke;
      displayText(joke);
      spanishJoke = joke;
    }
    saySpanish(spanishJoke);
    displayText(spanishJoke);
    toggleButton();
  } catch (error) {
    console.log("Whoops", error);
  }
}
async function germanJokes() {
  let germanJoke = "";
  const apiUrl = "https://v2.jokeapi.dev/joke/Any?lang=de";
  try {
    const response = await fetch(apiUrl);
    const data = await response.json();
    if (data.setup) {
      const setup = data.setup;
      const delivery = data.delivery;
      displayText(setup);
      displayText(delivery);
      germanJoke = `${setup} ...${delivery}`;
    } else {
      const joke = data.joke;
      displayText(joke);
      germanJoke = joke;
    }
    sayGerman(germanJoke);
    displayText(germanJoke);
    toggleButton();
  } catch (error) {
    console.log("Whoops", error);
  }
}
async function englishJokes() {
  let englishJoke = "";
  const apiUrl = "https://v2.jokeapi.dev/joke/Dark";
  try {
    const response = await fetch(apiUrl);
    const data = await response.json();
    if (data.setup) {
      const setup = data.setup;
      const delivery = data.delivery;
      englishJoke = `${setup} ...${delivery}`;
    } else {
      const joke = data.joke;
      englishJoke = joke;
    }
    sayEnglish(englishJoke);
    displayText(englishJoke);
    toggleButton();
  } catch (error) {
    console.log("Whoops", error);
  }
}

function displayText(text) {
  const outputElement = document.getElementById("joke-text");
  outputElement.innerHTML = "<p>" + text + "</p>";
}

spanishBtn.addEventListener("click", spanishJokes);
audioSpanish.addEventListener("ended", toggleButton);
germanBtn.addEventListener("click", germanJokes);
audioGerman.addEventListener("ended", toggleButton);
englishBtn.addEventListener("click", englishJokes);
audioEnglish.addEventListener("ended", toggleButton);
