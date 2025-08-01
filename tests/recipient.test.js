const request = require('supertest');
const app = require('../app');

describe('Recipient logic', () => {
  const mockRecipient = {
    name: 'George',
    email: 'george1@gmail.com',
    phone: '123-456-7890',
  };

  it('creates recipient successfully', async () => {
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
});
