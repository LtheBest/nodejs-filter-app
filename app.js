const express = require('express');
const app = express();

app.use(express.json());

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

if (require.main === module) {
    const PORT = process.env.PORT || 3000;
    app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
    });
}

module.exports = app;
