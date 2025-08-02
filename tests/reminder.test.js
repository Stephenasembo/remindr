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

  it('creates a reminder', async () => {
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
});
