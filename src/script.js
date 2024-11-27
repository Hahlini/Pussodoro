let hours = 0;
let minutes = 0
let seconds = 0;

let studyTime = 45;
let funTime = 15;

let isStudying = true;


const startButton = document.getElementById("button");
const resetButton = document.createElement("button");
const buttonContainer = document.getElementById("buttonContainer");
const textBox = document.getElementById("textBox");
const text = document.getElementById("text");

resetButton.textContent = "Reset"
resetButton.className = "button-1"
resetButton.onclick = reset;


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
    if (minutes == 0 && hours == 0) {
        switchMode();
    }
}

function switchMode(){
    document.getElementById("topText").textContent = isStudying ? "Ha så kul 😘" : "Dags att jobba";

    setTime(isStudying ? funTime : studyTime);
    isStudying = !isStudying;
}

function setTime(time){
    hours = 0;
    seconds = 59;
    minutes = time
}

function start() {
    readTimes()
    isStudying = true;
    setTime(studyTime);
    updateText(hours, minutes)
    setInterval(tick, 1000);
    document.getElementById("topText").textContent = "Dags att jobba";
    //textBox.style.visibility = "visible";
    startButton.remove()
    buttonContainer.appendChild(resetButton);
}

function setFunTime(time){
    funTime = time;
}

function setStudyTime(time){
    studyTime = time;
}

function readTimes(){
    let [hours, minutes] = document.getElementById("studyTime").value.split(":");
    setStudyTime(parseInt(parseInt(minutes) + (parseInt(hours) * 60)));  //(hours * 60);

    [hours, minutes] = document.getElementById("funTime").value.split(":");
    setFunTime(parseInt(parseInt(minutes) + (parseInt(hours) * 60)));  //(hours * 60);
}

function reset() {
    readTimes()
    setTime(isStudying ? studyTime : funTime);
}