const WEBSOCKET_URL = "ws://localhost:3000";

let socket;

export const connectWebSocket = (onMessage) => {
  console.log("Connecting to WebSocket...");
  socket = new WebSocket(WEBSOCKET_URL);

  socket.onopen = () => {
    console.log("WebSocket connection established");
  };

  socket.onmessage = (event) => {
    const data = JSON.parse(event.data);
    console.log("Message received from WebSocket:", data);
    onMessage(data);
  };

  socket.onclose = () => {
    console.log("WebSocket connection closed");
  };

  socket.onerror = (error) => {
    console.error("WebSocket error:", error);
  };
};

export const disconnectWebSocket = () => {
  if (socket) {
    socket.close();
  }
};