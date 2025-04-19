const cors = require('cors');
const express = require('express');
const app = express();

// Gebruik CORS-middleware
app.use(cors({
    origin: 'https://example.com', // Vervang door de toegestane origin(s)
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'], // Sta specifieke methoden toe
    allowedHeaders: ['Content-Type', 'Authorization'] // Specificeer toegestane headers
}));

// Jouw routes...
