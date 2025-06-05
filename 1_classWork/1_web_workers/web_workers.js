self.addEventListener('message', (event) => {
    const number = event.data;
    const result = number * 2;
    self.postMessage(result);
})