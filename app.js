import express from 'express';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const app = express();

app.use(express.json());

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const logFilePath = path.join(__dirname, 'app.log');

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
        fs.appendFileSync(logFilePath, JSON.stringify(log) + '\n');
    });
    next();
});

const items = [
    { id: 1, name: 'item1' },
    { id: 2, name: 'item2' },
    { id: 3, name: 'item3' }
];

app.get('/search', (req, res) => {
    const query = req.query.q;
    const result = items.filter(item => item.name.includes(query));
    res.json(result);
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

export default app;
