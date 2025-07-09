const express = require('express');
const path = require('path');
const app = express();

// Serve static files from the frontend directory
app.use(express.static(path.join(__dirname, '../frontend')));

// Add this route if not already handled by static middleware:
app.get('/kanishka.html', (req, res) => {
    res.sendFile(path.join(__dirname, '../frontend/kanishka.html'));
});

// ...existing code for other routes and middleware

const PORT = process.env.PORT || 3000;
const server = app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server is running on port ${PORT}`);
});
server.keepAliveTimeout = 120000;
server.headersTimeout = 120000;
