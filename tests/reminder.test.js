const request = require('supertest');
const app = require('../app');

describe('Reminder CRUD', () => {
  const date = new Date('2025-09-01T10:30');
  const mockReminder = {
    title: 'Test',
    dueDate: date,
    senderId: '77816efa-838d-49bb-a92f-7541a3e7365f',
  };

  const jwtToken =
    'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJmOWE5ZjJhYy1jOGI1LTQyZjAtYWU0Ni03MmM3OTFmZDY2ODUiLCJpYXQiOjE3NTQxNDQ4NjIsImV4cCI6MTc1NDIzMTI2Mn0.bNUTJ1EZ5zW1unwiHEt3v2PQlhkTyW35Ol_tyoXrlk0';

  const reminderId = 'ae46cf7c-dbf7-4a24-a474-8b5da106cd3c';

  it.skip('creates a reminder', async () => {
    const res = await request(app)
      .post('/reminders')
      .set('Accept', 'application/json')
      .set('Content-Type', 'application/json')
      .set('Authorization', jwtToken)
      .send(mockReminder);
    expect(res.status).toBe(200);
    expect(res.headers['content-type']).toMatch(/json/);
    expect(res.body.data).toHaveProperty('title');
    expect(res.body.message).toMatch(/created/);
  });

  it.skip('fetches one reminder', async () => {
    const res = await request(app)
      .get(`/reminders/${reminderId}`)
      .set('Accept', 'application/json')
      .set('Content-Type', 'application/json')
      .set('Authorization', jwtToken);
    expect(res.status).toBe(200);
    expect(res.headers['content-type']).toMatch(/json/);
    expect(res.body.data).toHaveProperty('title');
    expect(res.body.message).toMatch(/fetched successfully/);
  });

  it(`fetches user's reminders`, async () => {
    const res = await request(app)
      .get('/user/reminders')
      .set('Accept', 'application/json')
      .set('Content-Type', 'application/json')
      .set('Authorization', jwtToken);
    expect(res.status).toBe(200);
    expect(res.headers['content-type']).toMatch(/json/);
    expect(res.body.data[0]).toHaveProperty('title');
    expect(res.body.message).toMatch(/fetched successfully/);
  });

  it.skip('updates a reminder', async () => {
    const res = await request(app)
      .put(`/reminders/${reminderId}`)
      .set('Accept', 'application/json')
      .set('Content-Type', 'application/json')
      .set('Authorization', jwtToken)
      .send({
        title: 'Success',
      });
    expect(res.status).toBe(200);
    expect(res.headers['content-type']).toMatch(/json/);
    expect(res.body.data.title).toBe('Success');
    expect(res.body.message).toMatch(/updated successfully/);
  });

  it.skip('deletes a reminder', async () => {
    const res = await request(app)
      .delete(`/reminders/${reminderId}`)
      .set('Accept', 'application/json')
      .set('Content-Type', 'application/json')
      .set('Authorization', jwtToken);
    expect(res.status).toBe(200);
    expect(res.headers['content-type']).toMatch(/json/);
    expect(res.body.message).toMatch(/deleted successfully/);
  });

  it.skip(`deletes all user's reminders`, async () => {
    const res = await request(app)
      .delete('/user/reminders')
      .set('Accept', 'application/json')
      .set('Content-Type', 'application/json')
      .set('Authorization', jwtToken);
    expect(res.status).toBe(200);
    expect(res.headers['content-type']).toMatch(/json/);
    expect(res.body.message).toMatch(/deleted successfully/);
  });
});
