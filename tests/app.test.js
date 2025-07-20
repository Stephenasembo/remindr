const request = require('supertest');
const app = require('../app');

describe('App setup', () => {
  test('GET requests work', (done) => {
    request(app)
      .get('/')
      .expect('Content-Type', /json/)
      .then((res) => {
        expect(res.body).toBe('App is live');
        expect(res.status).toBe(200);
        done();
      });
  });

  test('POST requests work', async () => {
    const response = await request(app)
      .post('/')
      .send({ data: 'Hello world.' })
      .set('Accept', 'application/json');

    expect(response.status).toBe(200);
    expect(response.headers['content-type']).toMatch(/json/);
    expect(response.body.data).toContain('Hello world.');
  });

  test('handles invalid URLs', async () => {
    const response = await request(app).get('/hello');
    expect(response.status).toBe(404);
    expect(response.body.error).toBe('Page does not exist.');
  });
});
