export default function read() {
  return new Promise((resolve) => {
    // эмуляция чтения файла
    setTimeout(() => {
      const data =
        '{"id":9,"created":1546300800,"userInfo":{"id":1,"name":"Hitman","level":10,"points":2000}}';
      return ((input) => {
        const buffer = new ArrayBuffer(input.length * 2);
        const bufferView = new Uint16Array(buffer);
        for (let i = 0; i < input.length; i++) {
          bufferView[i] = input.charCodeAt(i);
        }
        resolve(buffer);
      })(data);
    }, 1000);
  });
}

read().then((buffer) => {
  const view = new Uint16Array(buffer);
  let result = "";
  for (let i = 0; i < view.length; i++) {
    result += String.fromCharCode(view[i]);
  }
  console.log("Декодированная строка:", result);
  console.log("JSON:", JSON.parse(result));
});
