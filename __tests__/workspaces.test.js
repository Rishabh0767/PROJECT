import request from 'supertest';
import express from 'express';
import workspaceRoutes from '../routes/workspaceRoutes.js';

const app = express();
app.use(express.json());
app.use('/api/workspaces', workspaceRoutes);

const authHeader = { Authorization: `Bearer YOUR_VALID_JWT_TOKEN` };

describe('Workspaces API', () => {

  test('GET /api/workspaces - without token should fail', async () => {
    const res = await request(app).get('/api/workspaces');
    expect(res.status).toBe(401);
  });

  test('GET /api/workspaces - with valid token, returns array', async () => {
    const res = await request(app)
      .get('/api/workspaces')
      .set(authHeader);
    expect(res.status).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
  });

  test('POST /api/workspaces - create new workspace', async () => {
    const res = await request(app)
      .post('/api/workspaces')
      .set(authHeader)
      .send({ name: 'New Workspace' });
    expect(res.status).toBe(201);
    expect(res.body).toHaveProperty('id');
    expect(res.body.name).toBe('New Workspace');
  });

  test('POST /api/workspaces - fail without name', async () => {
    const res = await request(app)
      .post('/api/workspaces')
      .set(authHeader)
      .send({});
    expect(res.status).toBe(400);
  });

  test('DELETE /api/workspaces/:id - delete workspace', async () => {
    // First create a workspace then delete it
    const createRes = await request(app)
      .post('/api/workspaces')
      .set(authHeader)
      .send({ name: 'To Delete' });
    const id = createRes.body.id;
    const deleteRes = await request(app)
      .delete(`/api/workspaces/${id}`)
      .set(authHeader);
    expect(deleteRes.status).toBe(200);
    expect(deleteRes.body.success).toBe(true);
  });

});
