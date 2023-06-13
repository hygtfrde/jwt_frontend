// Client-side code
const ws = new WebSocket('ws://localhost:8080');

ws.onopen = () => {
  console.log('Connected to the server');
  // Send a message to the server
  ws.send('Hello from the client!');
};

ws.onmessage = (event) => {
  console.log('Received message:', event.data);
};

ws.onclose = () => {
  console.log('Disconnected from the server');
};