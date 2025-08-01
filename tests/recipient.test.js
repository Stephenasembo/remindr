const request = require('supertest');
const app = require('../app');

describe('Recipient logic', () => {
  const mockRecipient = {
    name: 'George',
    email: 'george1@gmail.com',
    phone: '123-456-7890',
  };

  const recipientId = '28a34f68-4e26-4308-972d-84c23acc08ac';

  // Recipient gets duplicated if test is not skipped
  it.skip('creates recipient successfully', async () => {
    const res = await request(app)
      .post(`/user/recipients`)
      .set('Accept', 'application/json')
      .set('Content-Type', 'application/json')
      .send(mockRecipient);
    expect(res.status).toBe(200);
    expect(res.headers['content-type']).toMatch(/json/);
    expect(res.body.data).toHaveProperty('name');
    expect(res.body.message).toMatch(/created/);
  });

  it(`fetches user's recipients`, async () => {
    const res = await request(app)
      .get('/user/recipients')
      .set('Accept', 'application/json')
      .set('Content-Type', 'application/json');
    expect(res.status).toBe(200);
    expect(res.headers['content-type']).toMatch(/json/);
    expect(res.body.data[0]).toHaveProperty('email');
    expect(res.body.message).toMatch(/fetched successfully/);
  });

  it(`fetches one recipient`, async () => {
    const res = await request(app)
      .get(`/user/recipients/${recipientId}`)
      .set('Accept', 'application/json')
      .set('Content-Type', 'application/json');
    expect(res.status).toBe(200);
    expect(res.headers['content-type']).toMatch(/json/);
    expect(res.body.data).toHaveProperty('name');
    expect(res.body.message).toMatch(/fetched successfully/);
  });

  it.only('updates recipient information', async () => {
    const res = await request(app)
      .put(`/user/recipients/${recipientId}`)
      .set('Accept', 'application/json')
      .set('Content-Type', 'application/json')
      .send({
        name: 'Mercy',
      });
    expect(res.status).toBe(200);
    expect(res.headers['content-type']).toMatch(/json/);
    expect(res.body.data.name).toBe('Mercy');
    expect(res.body.message).toMatch(/updated successfully/);
  });
});
