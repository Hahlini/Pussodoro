const watch = (element) => {
    element.addEventListener('input', () => {
        const cursorPosition = element.selectionStart;
        let value = element.value; 
        value = value.replace(/\D/g, '');
        value = value.padStart(2, '0');
        value = value.slice(-2);
        if (value > 60) {
            value = "60";
        }
        element.value = value;
        element.selectionStart = element.selectionEnd = cursorPosition;
        
    })
}

watch(document.getElementById("funHour"));
watch(document.getElementById("funMinute"));
watch(document.getElementById("studyHour"));
watch(document.getElementById("studyMinute"));