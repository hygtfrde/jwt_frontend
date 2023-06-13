export default {
    createBuffer: (data) => {
      return Buffer.from(data);
    },
  
    readBufferAsString: (buffer) => {
      return buffer.toString();
    },
  
    readBufferAsJSON: (buffer) => {
      return JSON.parse(buffer.toString());
    },
  
    readBufferAsArrayBuffer: (buffer) => {
      return Uint8Array.from(buffer).buffer;
    }
};