const watch = (element) => {
    element.addEventListener('input', () => {
        const cursorPosition = element.selectionStart;
        let value = element.value; 
        value = value.replace(/\D/g, '');
        value = value.slice(0, cursorPosition);
        value = value.padEnd(2, '0');
        value = value.slice(-2);
        if (value > 60) {
            value = "60";
        }
        element.value = value;
        element.selectionStart = element.selectionEnd = cursorPosition;
        
    })
}

watch(document.getElementById("funMinutes"));
watch(document.getElementById("funSeconds"));
watch(document.getElementById("studyMinutes"));
watch(document.getElementById("studySeconds"));