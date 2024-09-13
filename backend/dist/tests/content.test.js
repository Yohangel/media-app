"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const supertest_1 = __importDefault(require("supertest"));
const index_1 = __importDefault(require("@/index"));
const contentType_model_1 = require("@/models/contentType.model");
const topic_model_1 = require("@/models/topic.model");
const user_model_1 = require("@/models/user.model");
const path_1 = __importDefault(require("path"));
describe('Content API', () => {
    let token;
    let contentId;
    let contentTypeId;
    let topicId;
    let authorId;
    beforeAll(async () => {
        const loginRes = await (0, supertest_1.default)(index_1.default)
            .post('/api/users/login')
            .send({
            email: 'admin@example.com',
            password: 'admin123',
        });
        expect(loginRes.statusCode).toEqual(200);
        expect(loginRes.body).toHaveProperty('token');
        token = loginRes.body.token;
        const contentTypeRes = await contentType_model_1.ContentTypeModel.create({
            name: 'Image',
            createdAt: new Date(),
        });
        contentTypeId = contentTypeRes._id.toString();
        const topicRes = await topic_model_1.TopicModel.create({
            name: 'Tech',
            allowedContentTypes: [contentTypeId],
            createdAt: new Date(),
        });
        topicId = topicRes._id.toString();
        const authorRes = await user_model_1.UserModel.findOne({ email: 'admin@example.com' });
        authorId = authorRes?._id.toString() || '';
    });
    it('should create new content with file upload', async () => {
        const filePath = path_1.default.join(__dirname, 'test.png');
        const res = await (0, supertest_1.default)(index_1.default)
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
        const res = await (0, supertest_1.default)(index_1.default)
            .get('/api/content')
            .set('Authorization', `Bearer ${token}`);
        expect(res.statusCode).toEqual(200);
        expect(res.body).toBeInstanceOf(Array);
    });
    it('should get content by ID', async () => {
        const res = await (0, supertest_1.default)(index_1.default)
            .get(`/api/content/${contentId}`)
            .set('Authorization', `Bearer ${token}`);
        expect(res.statusCode).toEqual(200);
        expect(res.body).toHaveProperty('_id', contentId);
    });
    it('should update content with new file upload', async () => {
        const filePath = path_1.default.join(__dirname, 'test.png');
        const res = await (0, supertest_1.default)(index_1.default)
            .put(`/api/content/${contentId}`)
            .set('Authorization', `Bearer ${token}`)
            .attach('file', filePath)
            .field('type', contentTypeId)
            .field('topic', topicId);
        expect(res.statusCode).toEqual(200);
        expect(res.body).toHaveProperty('url');
    });
    it('should delete content', async () => {
        const res = await (0, supertest_1.default)(index_1.default)
            .delete(`/api/content/${contentId}`)
            .set('Authorization', `Bearer ${token}`);
        expect(res.statusCode).toEqual(204);
    });
});
