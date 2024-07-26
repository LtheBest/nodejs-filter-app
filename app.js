const express = require('express');
const fs = require('fs');
const path = require('path');

const app = express();

app.use(express.json());

const items = [
    { id: 1, name: 'item1' },
    { id: 2, name: 'item2' },
    { id: 3, name: 'item3' }
];

app.use((req, res, next) => {
    const start = Date.now();
    res.on('finish', () => {
        const duration = Date.now() - start;
        const log = {
            method: req.method,
            url: req.url,
            status: res.statusCode,
            duration: duration,
            timestamp: new Date().toISOString(),
            clientIp: req.ip || req.connection.remoteAddress,
            userAgent: req.headers['user-agent'],
            requestBody: req.body,
            queryParams: req.query
        };
        fs.appendFileSync(path.join(__dirname, 'app.log'), JSON.stringify(log) + '\n');
    });
    next();
});

app.get('/search', (req, res) => {
    const query = req.query.q;
    const result = items.filter(item => item.name.includes(query));
    res.json(result);
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

module.exports = app;
