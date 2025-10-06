const express = require('express');
const http = require('http');
const { WebSocketServer } = require('ws');

const app = express();
const server = http.createServer(app);
const wss = new WebSocketServer({ server });

// Middleware to parse JSON
app.use(express.json());

// Sample HTTP route
app.get('/', (req, res) => {
    res.send('Welcome to the WebSocket and HTTP Server!');
});

// WebSocket event handler
wss.on('connection', function connection(ws) {
    console.log('A new client connected');

    // Send welcome message
    ws.send('Hi, welcome to the server!');

    // Send simulated price updates every 500ms
    const interval = setInterval(() => {
        ws.send(`The Reliance price: ${Math.random().toFixed(2)}`);
    }, 500);

    // Handle incoming messages
    ws.on('message', function message(data) {
        console.log('Received message:', data.toString());
        // Echo back the message
        ws.send(`Echo: ${data.toString()}`);
    });

    // Handle client disconnect
    ws.on('close', () => {
        console.log('Client disconnected');
        clearInterval(interval);
    });
});

// Start the server
const PORT = 8015;
server.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});


