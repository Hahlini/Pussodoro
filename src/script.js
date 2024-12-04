let isStudying = true;

const startButton = document.getElementById("button");
const resetButton = document.createElement("button");
const buttonContainer = document.getElementById("buttonContainer");
resetButton.textContent = "Reset"
resetButton.className = "button"
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

function updateText(minutes, seconds) {
    minutes = minutes.toString().padStart(2, '0');
    seconds = seconds.toString().padStart(2, '0');

    let text = minutes + ":" + seconds;
    
    document.getElementById("title").textContent = text;
    document.getElementById("timer").textContent = text;
}

function tick(){
    seconds--;
    if (seconds < 0) {
        seconds = 59;
        minutes--;
    }
    updateText(minutes, seconds);
    if (minutes == 0 && seconds == 0) {
        switchMode();
    }
}

function switchMode(){
    isStudying = !isStudying;
    
    setTimer(minutes, seconds);
    document.getElementById("topText").textContent = isStudying ? "Dags att jobba" : "Ha så kul 😘";
    document.getElementById("favicon").href = isStudying ? "./img/writing.gif" : "./img/kiss.png";
    notifyUser(isStudying ? "Sluta upp med stolleriet! Dags att jobba." : "Dags att ta en rast 😘");
}

function start() {
    isStudying = true;
    setTimer();
    document.getElementById("topText").textContent = "Dags att jobba";
    document.getElementById("favicon").href ="./img/writing.gif";
    startButton.remove();
    buttonContainer.appendChild(resetButton);
    worker.postMessage('start');
}

function setTimer(){
    if (isStudying) {
        minutes = document.getElementById("studyMinutes").value; 
        seconds = document.getElementById("studySeconds").value;
    } else {
        minutes = document.getElementById("funMinutes").value; 
        seconds = document.getElementById("funSeconds").value;
    } 
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