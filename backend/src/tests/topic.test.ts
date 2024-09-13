import request from 'supertest';
import app from '@/index'; 
import { ContentTypeModel } from '@/models/contentType.model';

describe('Topic API', () => {
  let token: string;
  let topicId: string;
  let contentTypeId: string;

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

    const contentTypeRes = await ContentTypeModel.create({
      name: 'Image',
      createdAt: new Date(),
    });
    contentTypeId = contentTypeRes._id.toString();
  });

  it('should create new topic', async () => {
    const res = await request(app)
      .post('/api/topics')
      .set('Authorization', `Bearer ${token}`) 
      .send({
        name: 'Sample Topic',
        allowedContentTypes: [contentTypeId],
      });
    expect(res.statusCode).toEqual(201);
    expect(res.body).toHaveProperty('_id');
    topicId = res.body._id;
  });

  it('should get all topics', async () => {
    const res = await request(app)
      .get('/api/topics')
    expect(res.statusCode).toEqual(200);
    expect(res.body).toBeInstanceOf(Array);
  });

  it('should get topic by ID', async () => {
    const res = await request(app)
      .get(`/api/topics/${topicId}`)
    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty('_id', topicId);
  });

  it('should update topic', async () => {
    const res = await request(app)
      .put(`/api/topics/${topicId}`)
      .set('Authorization', `Bearer ${token}`)  
      .send({
        name: 'Updated Topic',
        allowedContentTypes: [contentTypeId],
      });
    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty('name', 'Updated Topic');
  });

  it('should delete topic', async () => {
    const res = await request(app)
      .delete(`/api/topics/${topicId}`)
      .set('Authorization', `Bearer ${token}`);
    expect(res.statusCode).toEqual(204);
  });
});
