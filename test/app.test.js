const request = require('supertest');
const app = require('../app');
const server = app.listen(3000); 

describe('GET /search', () => {
    afterAll(done => {
        server.close(done);
    });

    it('should return filtered items based on query', async () => {
        const response = await request(app).get('/search?q=item1');
        expect(response.status).toBe(200);
        expect(response.body).toEqual([{ id: 1, name: 'item1' }]);
    });
});
