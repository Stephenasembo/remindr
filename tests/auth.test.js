const request = require('supertest');
const app = require('../app');

describe('User registration', () => {
  const mockUser = {
    username: 'Stephen',
    email: 'stephen@gmail.com',
    password: '123',
  };

  it.skip('successful', async () => {
    const res = await request(app)
      .post('/auth/register')
      .set('Accept', 'application/json')
      .set('Content-Type', 'application/json')
      .send(mockUser);
    expect(res.status).toBe(200);
    expect(res.headers['content-type']).toMatch(/json/);
    expect(res.body.data).toHaveProperty('username', 'Stephen');
    expect(res.body.message).toMatch(/created/);
  });

  it('failed', async () => {
    const res = await request(app)
      .post('/auth/register')
      .set('Accept', 'application/json')
      .set('Content-Type', 'application/json')
      .send(mockUser);
    expect(res.status).not.toBe(200);
    expect(res.headers['content-type']).toMatch(/json/);
  });

  it('rejects empty fields', async () => {
    const res = await request(app)
      .post('/auth/register')
      .set('Accept', 'application/json')
      .set('Content-Type', 'application/json')
      .send({
        username: 'Mel',
        password: '',
      });
    expect(res.status).toBe(401);
    expect(res.headers['content-type']).toMatch(/json/);
    expect(res.body.message).toMatch(/empty/);
  });
});
