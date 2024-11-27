let hours = 0;
let minutes = 0
let seconds = 0;

let studyTime = 45;
let funTime = 15;

let isStudying = true;


const startButton = document.getElementById("button");
const resetButton = document.createElement("button");
const buttonContainer = document.getElementById("box");

resetButton.textContent = "Reset"
resetButton.className = "button-1"
resetButton.onclick = start;


/*
function updateText(hours, minutes, seconds) {
    hours = hours.toString().padStart(2, '0');
    minutes = minutes.toString().padStart(2, '0');
    seconds = seconds.toString().padStart(2, '0');

    document.getElementById("timer").textContent = hours + ":" + minutes + ":" + seconds;
}
*/

function updateText(hours, minutes) {
    hours = hours.toString().padStart(2, '0');
    minutes = minutes.toString().padStart(2, '0');

    document.getElementById("timer").textContent = hours + ":" + minutes;
}

function tick(){
    seconds--;
    if (seconds < 0) {
        seconds = 59;
        minutes--;

        if (minutes < 0) {
        minutes = 59;
        hours--;
        }
    }
    updateText(hours, minutes)
    if (seconds == 0 && minutes == 0 && hours == 0) {
        switchMode();
    }
}

function switchMode(){
    setTime(isStudying ? funTime : studyTime);

    document.getElementById("topText").textContent = isStudying ? "Nu är det dags för paus!" : "Dags att jobba igen, men om...";
    document.getElementById("botText").textContent = isStudying ? "... ha så kul 😘" : "kan ni ha kul igen...";

    isStudying = !isStudying;


}

function setTime(time){
    hours = 0;
    seconds = 30;
    minutes = time
}

function start() {
    isStudying = true;
    setTime(studyTime);
    updateText(hours, minutes)
    setInterval(tick, 1000);
    document.getElementById("topText").textContent = "Dags att jobba, men om...";
    document.getElementById("botText").textContent = "kan ni ha kul...";

    startButton.remove()
    buttonContainer.appendChild(resetButton);
}

function reset() {
    //TODO
}