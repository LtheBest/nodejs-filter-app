import request from 'supertest';
import app from '../app';

let server;

beforeAll(done => {
    server = app.listen(() => {
        console.log(`Test server running on port ${server.address().port}`);
        done();
    });
}, 10000);

afterAll(done => {
    server.close(done);
});

describe('GET /search', () => {
    it('should return filtered items based on query', async () => {
        const response = await request(app).get('/search?q=item1');
        expect(response.status).toBe(200);
        expect(response.body).toEqual([{ id: 1, name: 'item1' }]);
    });
});
