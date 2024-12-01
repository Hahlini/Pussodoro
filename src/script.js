let studyTime = 25;
let funTime = 5;

let isStudying = true;

const startButton = document.getElementById("button");
const resetButton = document.createElement("button");
const buttonContainer = document.getElementById("buttonContainer");
const text = document.getElementById("text");


resetButton.textContent = "Reset"
resetButton.className = "button-1"
resetButton.onclick = reset;

const workerScript = `
    let startTime = null;

    onmessage = (e) => {
        if (e.data === 'start') {
            startTime = Date.now();
            setInterval(() => {
                const elapsedTime = Math.floor((Date.now() - startTime) / 1000);
                postMessage(elapsedTime);
            }, 1000);
        }
    }
`;

const blob = new Blob([workerScript], { type: 'application/javascript' });
const workerURL = URL.createObjectURL(blob);
const worker = new Worker(workerURL);

worker.onmessage = (e) => {
    tick();
}

function updateText(hours, minutes) {
    hours = hours.toString().padStart(2, '0');
    minutes = minutes.toString().padStart(2, '0');

    let text = hours + ":" + minutes;
    
    document.getElementById("title").textContent = text;
    document.getElementById("timer").textContent = text;
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
    document.getElementById("favicon").href = isStudying ? "./img/kiss.png" : "./img/writing.gif";

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
    worker.postMessage('start');
    document.getElementById("topText").textContent = "Dags att jobba";
    document.getElementById("favicon").href ="./img/writing.gif";
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