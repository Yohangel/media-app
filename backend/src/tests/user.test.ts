import request from 'supertest';
import app from '@/index';
import { RoleModel } from '@/models/role.model'; 

describe('User API', () => {
  let token: string;
  let userId: string;
  let editorRoleId: string;
  let viewerRoleId: string;

  beforeAll(async () => {
    // Login to get the token
    const loginRes = await request(app)
      .post('/api/users/login')
      .send({
        email: 'admin@example.com',
        password: 'admin123',
      });
    expect(loginRes.statusCode).toEqual(200);
    expect(loginRes.body).toHaveProperty('token');
    token = loginRes.body.token;

    // Fetch existing roles from the database
    const editorRole = await RoleModel.findOne({ name: 'editor' });
    const viewerRole = await RoleModel.findOne({ name: 'viewer' });

    if (editorRole) {
      editorRoleId = editorRole._id.toString();
    } else {
      throw new Error('Editor role not found');
    }

    if (viewerRole) {
      viewerRoleId = viewerRole._id.toString();
    } else {
      throw new Error('Viewer role not found');
    }
  });

  it('should create new user', async () => {
    const res = await request(app)
      .post('/api/users/register')
      .send({
        username: 'sampleuser',
        email: 'sampleuser@example.com',
        password: 'password123',
        role: editorRoleId,  // Use existing role ID
      });
    expect(res.statusCode).toEqual(201);
    expect(res.body).toHaveProperty('_id');
    userId = res.body._id;
  });

  it('should get all users', async () => {
    const res = await request(app)
      .get('/api/users')
      .set('Authorization', `Bearer ${token}`);
    expect(res.statusCode).toEqual(200);
    expect(res.body).toBeInstanceOf(Array);
  });

  it('should update user', async () => {
    const res = await request(app)
      .put(`/api/users/${userId}`)
      .set('Authorization', `Bearer ${token}`) 
      .send({
        username: 'updateduser',
        email: 'updateduser@example.com',
        role: viewerRoleId,  // Use existing role ID
        password: 'password123',
      });
    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty('username', 'updateduser');
  });

  it('should delete user', async () => {
    const res = await request(app)
      .delete(`/api/users/${userId}`)
      .set('Authorization', `Bearer ${token}`);
    expect(res.statusCode).toEqual(204);
  });
});
