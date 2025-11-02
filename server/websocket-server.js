// Example WebSocket Server for POS System
// Run with: node server/websocket-server.js

const WebSocket = require('ws');

const PORT = process.env.WS_PORT || 3001;
const wss = new WebSocket.Server({ port: PORT });

const clients = new Set();

console.log(`WebSocket Server starting on ws://localhost:${PORT}`);

wss.on('connection', (ws) => {
  console.log('Client connected');
  clients.add(ws);

  // Send welcome message
  ws.send(JSON.stringify({
    type: 'connected',
    payload: { message: 'Connected to POS WebSocket Server' }
  }));

  ws.on('message', (message) => {
    try {
      const data = JSON.parse(message);
      const { type, payload } = data;
      
      console.log(`Received: ${type}`, payload);

      // Broadcast to all clients except sender
      clients.forEach((client) => {
        if (client !== ws && client.readyState === WebSocket.OPEN) {
          client.send(JSON.stringify({ type, payload }));
        }
      });

      // Handle specific message types
      switch (type) {
        case 'item_added':
          console.log(`Item added: ${payload.name}`);
          break;
        case 'cart_cleared':
          console.log('Cart cleared');
          break;
        case 'order_submitted':
          console.log('Order submitted:', payload);
          break;
        default:
          console.log(`Unknown message type: ${type}`);
      }
    } catch (error) {
      console.error('Error processing message:', error);
    }
  });

  ws.on('error', (error) => {
    console.error('WebSocket error:', error);
  });

  ws.on('close', () => {
    console.log('Client disconnected');
    clients.delete(ws);
  });
});

wss.on('error', (error) => {
  console.error('WebSocket Server error:', error);
});

console.log(`WebSocket Server running on ws://localhost:${PORT}`);
console.log(`Waiting for connections...`);

