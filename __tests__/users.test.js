import request from 'supertest';
import express from 'express';
import userRoutes from '../routes/userRoutes.js';

const app = express();
app.use(express.json());
app.use('/api/users', userRoutes);

const authHeader = { Authorization: `Bearer YOUR_VALID_JWT_TOKEN` };

describe('Users API', () => {

  test('GET /api/users/profile - without token should fail', async () => {
    const res = await request(app).get('/api/users/profile');
    expect(res.status).toBe(401);
  });

  test('GET /api/users/profile - with valid token returns profile', async () => {
    const res = await request(app)
      .get('/api/users/profile')
      .set(authHeader);
    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty('user');
    expect(res.body.user).not.toHaveProperty('password');
  });

  test('PUT /api/users/profile - updates profile', async () => {
    const res = await request(app)
      .put('/api/users/profile')
      .set(authHeader)
      .send({ email: 'updated@test.com' });
    expect(res.status).toBe(200);
    expect(res.body.success).toBe(true);
  });

  test('PUT /api/users/profile - without token should fail', async () => {
    const res = await request(app)
      .put('/api/users/profile')
      .send({ email: 'fail@test.com' });
    expect(res.status).toBe(401);
  });

  test('GET /api/users/profile - with invalid token should fail', async () => {
    const res = await request(app)
      .get('/api/users/profile')
      .set('Authorization', 'Bearer invalidToken');
    expect(res.status).toBe(401);
  });

});
