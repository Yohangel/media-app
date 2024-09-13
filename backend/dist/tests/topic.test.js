"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const supertest_1 = __importDefault(require("supertest"));
const index_1 = __importDefault(require("@/index"));
const contentType_model_1 = require("@/models/contentType.model");
describe('Topic API', () => {
    let token;
    let topicId;
    let contentTypeId;
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
    });
    it('should create new topic', async () => {
        const res = await (0, supertest_1.default)(index_1.default)
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
        const res = await (0, supertest_1.default)(index_1.default)
            .get('/api/topics');
        expect(res.statusCode).toEqual(200);
        expect(res.body).toBeInstanceOf(Array);
    });
    it('should get topic by ID', async () => {
        const res = await (0, supertest_1.default)(index_1.default)
            .get(`/api/topics/${topicId}`);
        expect(res.statusCode).toEqual(200);
        expect(res.body).toHaveProperty('_id', topicId);
    });
    it('should update topic', async () => {
        const res = await (0, supertest_1.default)(index_1.default)
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
        const res = await (0, supertest_1.default)(index_1.default)
            .delete(`/api/topics/${topicId}`)
            .set('Authorization', `Bearer ${token}`);
        expect(res.statusCode).toEqual(204);
    });
});
