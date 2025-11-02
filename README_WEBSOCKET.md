# WebSocket Support

This POS system now supports WebSocket for real-time updates across multiple browser tabs and clients.

## Features

- **Real-time cart synchronization** across browser tabs
- **Multi-client support** - updates appear instantly on all connected clients
- **Automatic reconnection** - reconnects if connection is lost
- **Graceful fallback** - works without WebSocket server (uses localStorage)

## Setup

### Option 1: Use with WebSocket Server (Recommended for Multi-Client)

1. Set up a WebSocket server (Node.js example):
```javascript
const WebSocket = require('ws');
const wss = new WebSocket.Server({ port: 3001 });

const clients = new Set();

wss.on('connection', (ws) => {
  console.log('Client connected');
  clients.add(ws);

  ws.on('message', (message) => {
    try {
      const data = JSON.parse(message);
      
      // Broadcast to all clients except sender
      clients.forEach((client) => {
        if (client !== ws && client.readyState === WebSocket.OPEN) {
          client.send(JSON.stringify(data));
        }
      });
    } catch (error) {
      console.error('Error processing message:', error);
    }
  });

  ws.on('close', () => {
    console.log('Client disconnected');
    clients.delete(ws);
  });
});
```

2. Set environment variable (optional):
```env
NEXT_PUBLIC_WS_URL=ws://localhost:3001
```

### Option 2: Without WebSocket Server (Single Tab)

The system works fine without a WebSocket server. It will:
- Use localStorage for persistence
- Update UI in real-time within the same tab
- Show "WebSocket Connected" status when server is available

## How It Works

1. **Cart Updates**: When you add/remove items, changes sync across all tabs
2. **Order Submission**: When orders are submitted, all clients are notified
3. **Automatic Sync**: Cart state syncs automatically when WebSocket is connected

## Connection Status

The connection status is shown in the API status indicator:
- ✓ WebSocket Connected - Real-time updates enabled
- (No indicator) - Using localStorage only (single tab)

## Troubleshooting

- **WebSocket not connecting**: Check if server is running on port 3001
- **No real-time updates**: Ensure WebSocket server is broadcasting messages
- **Connection drops**: System automatically reconnects up to 5 times

