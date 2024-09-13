import request from 'supertest';
import app from '@/index'; 

describe('Role API', () => {
  let token: string;
  let roleId: string;

  beforeAll(async () => {
    const loginRes = await request(app)
      .post('/api/users/login')
      .send({
        email: 'admin@example.com',
        password: 'admin123',
      });
    expect(loginRes.statusCode).toEqual(200);
    expect(loginRes.body).toHaveProperty('token');
    token = loginRes.body.token;
  });

  it('should create new role', async () => {
    const res = await request(app)
      .post('/api/roles')
      .set('Authorization', `Bearer ${token}`)  
      .send({
        name: 'admin',
      });
    expect(res.statusCode).toEqual(201);
    expect(res.body).toHaveProperty('_id');
    roleId = res.body._id;
  });

  it('should get all roles', async () => {
    const res = await request(app)
      .get('/api/roles')
      .set('Authorization', `Bearer ${token}`);
    expect(res.statusCode).toEqual(200);
    expect(res.body).toBeInstanceOf(Array);
  });
});
