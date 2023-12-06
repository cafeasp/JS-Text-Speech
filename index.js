let synth = window.speechSynthesis;
let textInput = document.getElementById("textInput");
let voicesSelect = document.getElementById("voices");
let rateInput = document.getElementById("rate");
let pitchInput = document.getElementById("pitch");
let speakButton = document.getElementById("speakBtn");
let stopButton = document.getElementById("stopBtn");
let utterance = new SpeechSynthesisUtterance();

// Populate the voices dropdown with available voices
function populateVoices() {
  let voices = synth.getVoices();
  voicesSelect.innerHTML = "";
  voices.forEach((voice, index) => {
    let option = document.createElement("option");
    option.value = index;
    option.textContent = `${voice.name} (${voice.lang})`;
    voicesSelect.appendChild(option);
  });
}

populateVoices();

if (speechSynthesis.onvoiceschanged !== undefined) {
  speechSynthesis.onvoiceschanged = populateVoices;
}

speakButton.addEventListener("click", () => {
  utterance.text = textInput.value || "Please enter some text.";
  utterance.voice = synth.getVoices()[voicesSelect.value];
  utterance.rate = parseFloat(rateInput.value);
  utterance.pitch = parseFloat(pitchInput.value);
  synth.speak(utterance);
});

stopButton.addEventListener("click", () => {
  synth.cancel();
});
