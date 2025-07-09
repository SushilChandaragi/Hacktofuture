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
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});