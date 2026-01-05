import request from 'supertest';
import express from 'express';
import collectionRoutes from '../routes/collectionRoutes.js';

const app = express();
app.use(express.json());
app.use('/api/collections', collectionRoutes);

const authHeader = { Authorization: `Bearer YOUR_VALID_JWT_TOKEN` };
const testWorkspaceId = 1; // Replace with actual workspace ID for tests

describe('Collections API', () => {

  test('GET /api/collections - without workspace_id should fail', async () => {
    const res = await request(app)
      .get('/api/collections')
      .set(authHeader);
    expect(res.status).toBe(400);
  });

  test('GET /api/collections - without auth should fail', async () => {
    const res = await request(app)
      .get(`/api/collections?workspace_id=${testWorkspaceId}`);
    expect(res.status).toBe(401);
  });

  test('POST /api/collections - create new collection', async () => {
    const res = await request(app)
      .post('/api/collections')
      .set(authHeader)
      .send({ name: 'Test Collection', workspace_id: testWorkspaceId });
    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty('id');
    expect(res.body.name).toBe('Test Collection');
  });

  test('POST /api/collections - fail without name', async () => {
    const res = await request(app)
      .post('/api/collections')
      .set(authHeader)
      .send({ workspace_id: testWorkspaceId });
    expect(res.status).toBe(400);
  });

  test('DELETE /api/collections/:id - delete collection', async () => {
    // Create a collection first to delete
    const createRes = await request(app)
      .post('/api/collections')
      .set(authHeader)
      .send({ name: 'To Delete', workspace_id: testWorkspaceId });
    const id = createRes.body.id;
    const deleteRes = await request(app)
      .delete(`/api/collections/${id}`)
      .set(authHeader);
    expect(deleteRes.status).toBe(200);
    expect(deleteRes.body.success).toBe(true);
  });

});
