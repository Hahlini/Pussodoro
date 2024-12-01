
export const workerScript = `
    let startTime = null;

    onmessage = (e) => {
        if (e.data = 'start') {
            startTime = Date.now();
            setInterval(() => {
                const elpsedTime = Math.floor((Date.now() - startTime) / 1000);
                postMessage(elpsedTime);
            }, 10);
        }
    }
`;