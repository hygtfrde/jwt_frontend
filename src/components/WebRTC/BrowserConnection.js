// Establish a WebRTC connection between two browsers
const peerConnection = new RTCPeerConnection();

// Create a data channel for communication
const dataChannel = peerConnection.createDataChannel('myChannel');

// Send data
dataChannel.send('Hello from the sender!');

// Receive data
dataChannel.onmessage = (event) => {
  console.log('Received message:', event.data);
};

// Set up event handlers for the peer connection
peerConnection.onicecandidate = (event) => {
  // Handle ICE candidates
};

peerConnection.ondatachannel = (event) => {
  // Handle incoming data channel
  const receivedDataChannel = event.channel;
  receivedDataChannel.onmessage = (event) => {
    console.log('Received message:', event.data);
  };
};