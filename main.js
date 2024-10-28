// 8 Ball Answers List

const synth = window.speechSynthesis;
const answers = [
  // Positive
  { text: "Magic Orb says yes.", type: "positive" },
  { text: "Decidedly so!", type: "positive" },
  { text: "Aye, even the scrolls confirm it!", type: "positive" },
  { text: "Yes.", type: "positive" }
,

  // Negative
  { text: "Not in a hundred moons!", type: "negative" },
  { text: "Orb says no.", type: "negative" },
  { text: "Nay!", type: "negative" },
  { text: "The spirits are silent...it’s a no.", type: "negative" },


  // Neutral
  { text: "The mists obscure the answer.", type: "neutral" },
  { text: "Unclear... consult me at dawn.", type: "neutral" },
  { text: "Too soon to tell, patience!", type: "neutral" },
  { text: "The answer floats in mystery.", type: "neutral" }
];


let lastAnswer = null;

function getAnswer() {
  const randomIndex = Math.floor(Math.random() * answers.length);
  return answers[randomIndex];
}

async function handleQuestion() {
  const answerElement = document.getElementById("answer");
  const questionInput = document.getElementById("question");
  const iconElement = document.getElementById("icon");
  iconElement.className = "fade";
  iconElement.opacity = 1;
  const question = questionInput.value.trim();
  if (question === "") {
    answerElement.innerText = "Please ask a question.";
    answerElement.className = "negative"; 
    return;
  }
  let answer;

  
  do {
    answer = getAnswer();
  } while (answer === lastAnswer);

  
  await PlaySpeech(answer.text);
  answerElement.innerText = answer.text;
  answerElement.className = ""; 
  answerElement.classList.add(answer.type);
  lastAnswer = answer;
  
  // Wait for speech to start 
  iconElement.className = "icon";
}

async function PlaySpeech(text) {
  let spacedText = text.split("").join(" ");
  let utterance = new SpeechSynthesisUtterance(spacedText);
  utterance.pitch = 0.2;
  utterance.rate = 2 + Math.random() * 0.25;
  synth.speak(utterance);
  await getPromiseFromEvent(utterance, "start")
  console.log("Speech started: " + text);
}

function getPromiseFromEvent(item, event) {
  return new Promise((resolve) => {
    const listener = () => {
      item.removeEventListener(event, listener);
      resolve();
    }
    item.addEventListener(event, listener);
  })
}