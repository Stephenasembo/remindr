const request = require('supertest');
const app = require('../app');

describe('Recipient logic', () => {
  const mockRecipient = {
    name: 'George',
    email: 'george1@gmail.com',
    phone: '123-456-7890',
  };

  const recipientId = '3e50c8f7-390a-4511-aa5b-40929e726fdf';
  const jwtToken =
    'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJmOWE5ZjJhYy1jOGI1LTQyZjAtYWU0Ni03MmM3OTFmZDY2ODUiLCJpYXQiOjE3NTQxNDQ4NjIsImV4cCI6MTc1NDIzMTI2Mn0.bNUTJ1EZ5zW1unwiHEt3v2PQlhkTyW35Ol_tyoXrlk0';

  // Recipient gets duplicated if test is not skipped
  it('creates recipient successfully', async () => {
    const res = await request(app)
      .post(`/user/recipients`)
      .set('Accept', 'application/json')
      .set('Content-Type', 'application/json')
      .set('Authorization', jwtToken)
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
      .set('Content-Type', 'application/json')
      .set('Authorization', jwtToken);
    expect(res.status).toBe(200);
    expect(res.headers['content-type']).toMatch(/json/);
    expect(res.body.data[0]).toHaveProperty('email');
    expect(res.body.message).toMatch(/fetched successfully/);
  });

  it(`fetches one recipient`, async () => {
    const res = await request(app)
      .get(`/user/recipients/${recipientId}`)
      .set('Accept', 'application/json')
      .set('Content-Type', 'application/json')
      .set('Authorization', jwtToken);
    expect(res.status).toBe(200);
    expect(res.headers['content-type']).toMatch(/json/);
    expect(res.body.data).toHaveProperty('name');
    expect(res.body.message).toMatch(/fetched successfully/);
  });

  it('updates recipient information', async () => {
    const res = await request(app)
      .put(`/user/recipients/${recipientId}`)
      .set('Accept', 'application/json')
      .set('Content-Type', 'application/json')
      .set('Authorization', jwtToken)
      .send({
        name: 'Mercy',
      });
    expect(res.status).toBe(200);
    expect(res.headers['content-type']).toMatch(/json/);
    expect(res.body.data.name).toBe('Mercy');
    expect(res.body.message).toMatch(/updated successfully/);
  });

  // It will throw an error on the second run after record is deleted
  it.skip('deletes recipient', async () => {
    const res = await request(app)
      .delete(`/user/recipients/${recipientId}`)
      .set('Accept', 'application/json')
      .set('Content-Type', 'application/json')
      .set('Authorization', jwtToken);
    expect(res.status).toBe(200);
    expect(res.headers['content-type']).toMatch(/json/);
    expect(res.body.data.name).toBe('Mercy');
    expect(res.body.message).toMatch(/deleted successfully/);
  });

  it.skip(`deletes all user's recipients`, async () => {
    const res = await request(app)
      .delete(`/user/recipients`)
      .set('Accept', 'application/json')
      .set('Content-Type', 'application/json')
      .set('Authorization', jwtToken);
    expect(res.status).toBe(200);
    expect(res.headers['content-type']).toMatch(/json/);
    expect(res.body.message).toMatch(/deleted successfully/);
  });
});
