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

if (Notification.permission !== "granted") {
    Notification.requestPermission().then((permission) => {
        if (permission === "granted") {
            console.log("Notification permission granted.");
        } else {
            console.log("Notification permission denied.");
        }
    });
}

function updateText(hours, minutes) {
    hours = hours.toString().padStart(2, '0');
    minutes = minutes.toString().padStart(2, '0');

    let text = hours + ":" + minutes;
    
    document.getElementById("title").textContent = text;
    document.getElementById("timer").textContent = text;
}

function tick(){
    if (minutes == 0 && hours == 0) {
        switchMode();
    }
    seconds--;
    if (seconds < 0) {
        seconds = 59;
        minutes--;

        if (minutes < 0) {
        minutes = 59;
        hours--;
        }
    }
    updateText(hours, minutes);
}

function switchMode(){
    isStudying = !isStudying;

    setTimer();
    document.getElementById("topText").textContent = isStudying ? "Dags att jobba" : "Ha så kul 😘";
    document.getElementById("favicon").href = isStudying ? "./img/writing.gif" : "./img/kiss.png";
    notifyUser(isStudying ? "Dags att ta en rast 😘" : "Sluta upp med stolleriet! Dags att jobba.");
}

function start() {
    isStudying = true;
    setTimer();
    updateText(hours, minutes);
    worker.postMessage('start');
    document.getElementById("topText").textContent = "Dags att jobba";
    document.getElementById("favicon").href ="./img/writing.gif";
    startButton.remove();
    buttonContainer.appendChild(resetButton);
}

function setTimer(){
    if (isStudying) {
        [hours, minutes] = document.getElementById("studyTime").value.split(":"); 
    } else {
        [hours, minutes] = document.getElementById("funTime").value.split(":");
    } 
    seconds = 59;
}

function reset() {
    setTimer();
}

function notifyUser(message) {
    if (Notification.permission === "granted") {
        new Notification(message);
    } else {
        alert(message);
    }
}