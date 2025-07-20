const request = require('supertest');
const app = require('../app');

describe('User registration', () => {
  const mockUser = {
    username: 'Stephen',
    email: 'stephen@gmail.com',
    password: '123',
  };

  // Automatically fails since mock user has already been registered
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

  it('fails on same user input', async () => {
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
    expect(res.status).toBe(400);
    expect(res.headers['content-type']).toMatch(/json/);
    expect(res.body.message).toMatch(/empty/);
  });
});

describe('User login', () => {
  const mockUser = {
    username: 'Mark',
    password: '123',
  };
  it('is successful', async () => {
    const res = await request(app)
      .post('/auth/login')
      .set('Accept', 'application/json')
      .set('Content-Type', 'application/json')
      .send(mockUser);
    expect(res.status).toBe(200);
    expect(res.headers['content-type']).toMatch(/json/);
    expect(res.body.message).toMatch(/success/);
    expect(res.body.data).toHaveProperty('username');
    expect(res.body).toHaveProperty('jwt');
  });

  it('fails on unregistered user', async () => {
    const res = await request(app)
      .post('/auth/login')
      .set('Accept', 'application/json')
      .set('Content-Type', 'application/json')
      .send({
        username: 'Linus',
        password: '123',
      });
    expect(res.status).toBe(401);
    expect(res.headers['content-type']).toMatch(/json/);
    expect(res.body.message).toMatch(/not found/);
  });

  it('rejects empty fields', async () => {
    const res = await request(app)
      .post('/auth/login')
      .set('Accept', 'application/json')
      .set('Content-Type', 'application/json')
      .send({
        username: 'Linus',
        password: '',
      });
    expect(res.status).toBe(400);
    expect(res.headers['content-type']).toMatch(/json/);
    expect(res.body.message).toMatch(/empty/);
  });

  it('fails on wrong password entry', async () => {
    const res = await request(app)
      .post('/auth/login')
      .set('Accept', 'application/json')
      .set('Content-Type', 'application/json')
      .send({
        username: 'Stephen',
        password: 'abc',
      });
    expect(res.status).toBe(401);
    expect(res.headers['content-type']).toMatch(/json/);
    expect(res.body.message).toMatch(/wrong password/i);
  });
});
