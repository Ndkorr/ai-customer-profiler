// filepath: c:\Users\Mathew\Desktop\Cirqit\Cirqit\cirqit-api\src\index.js
const { app } = require('@azure/functions');

require('./functions/HttpExample');
require('./functions/auth/login');
require('./functions/auth/testConnection');

app.setup({
    enableHttpStream: true,
    cors: {
        allowedOrigins: ['http://localhost:3000'], // Frontend dev server
        allowedMethods: ['GET', 'POST']
    }
});