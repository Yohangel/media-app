import request from 'supertest';
import app from '@/index';
import { ContentTypeModel } from '@/models/contentType.model';
import { TopicModel } from '@/models/topic.model';
import { UserModel } from '@/models/user.model';
import path from 'path';

describe('Content API', () => {
  let token: string;
  let contentId: string;
  let contentTypeId: string;
  let topicId: string;
  let authorId: string;

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

    const topicRes = await TopicModel.create({
      name: 'Tech',
      allowedContentTypes: [contentTypeId],
      createdAt: new Date(),
    });
    topicId = topicRes._id.toString();

    const authorRes = await UserModel.findOne({ email: 'admin@example.com' });
    authorId = authorRes?._id.toString() || '';
  });

  it('should create new content with file upload', async () => {
    const filePath = path.join(__dirname, 'test.png');

    const res = await request(app)
      .post('/api/content')
      .set('Authorization', `Bearer ${token}`)
      .attach('file', filePath) 
      .field('type', contentTypeId)  
      .field('topic', topicId)
      .field('author', authorId);

    expect(res.statusCode).toEqual(201);
    expect(res.body).toHaveProperty('_id');
    contentId = res.body._id;
  });

  it('should get all content', async () => {
    const res = await request(app)
      .get('/api/content')
      .set('Authorization', `Bearer ${token}`);
    expect(res.statusCode).toEqual(200);
    expect(res.body).toBeInstanceOf(Array);
  });

  it('should get content by ID', async () => {
    const res = await request(app)
      .get(`/api/content/${contentId}`)
      .set('Authorization', `Bearer ${token}`);
    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty('_id', contentId);
  });

  it('should update content with new file upload', async () => {
    const filePath = path.join(__dirname, 'test.png'); 
    const res = await request(app)
      .put(`/api/content/${contentId}`)
      .set('Authorization', `Bearer ${token}`)
      .attach('file', filePath) 
      .field('type', contentTypeId)
      .field('topic', topicId);
    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty('url');
  });

  it('should delete content', async () => {
    const res = await request(app)
      .delete(`/api/content/${contentId}`)
      .set('Authorization', `Bearer ${token}`);
    expect(res.statusCode).toEqual(204);
  });
});
