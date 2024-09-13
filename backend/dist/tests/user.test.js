"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const supertest_1 = __importDefault(require("supertest"));
const index_1 = __importDefault(require("@/index"));
const role_model_1 = require("@/models/role.model");
describe('User API', () => {
    let token;
    let userId;
    let editorRoleId;
    let viewerRoleId;
    beforeAll(async () => {
        // Login to get the token
        const loginRes = await (0, supertest_1.default)(index_1.default)
            .post('/api/users/login')
            .send({
            email: 'admin@example.com',
            password: 'admin123',
        });
        expect(loginRes.statusCode).toEqual(200);
        expect(loginRes.body).toHaveProperty('token');
        token = loginRes.body.token;
        // Fetch existing roles from the database
        const editorRole = await role_model_1.RoleModel.findOne({ name: 'editor' });
        const viewerRole = await role_model_1.RoleModel.findOne({ name: 'viewer' });
        if (editorRole) {
            editorRoleId = editorRole._id.toString();
        }
        else {
            throw new Error('Editor role not found');
        }
        if (viewerRole) {
            viewerRoleId = viewerRole._id.toString();
        }
        else {
            throw new Error('Viewer role not found');
        }
    });
    it('should create new user', async () => {
        const res = await (0, supertest_1.default)(index_1.default)
            .post('/api/users/register')
            .send({
            username: 'sampleuser',
            email: 'sampleuser@example.com',
            password: 'password123',
            role: editorRoleId, // Use existing role ID
        });
        expect(res.statusCode).toEqual(201);
        expect(res.body).toHaveProperty('_id');
        userId = res.body._id;
    });
    it('should get all users', async () => {
        const res = await (0, supertest_1.default)(index_1.default)
            .get('/api/users')
            .set('Authorization', `Bearer ${token}`);
        expect(res.statusCode).toEqual(200);
        expect(res.body).toBeInstanceOf(Array);
    });
    it('should update user', async () => {
        const res = await (0, supertest_1.default)(index_1.default)
            .put(`/api/users/${userId}`)
            .set('Authorization', `Bearer ${token}`)
            .send({
            username: 'updateduser',
            email: 'updateduser@example.com',
            role: viewerRoleId, // Use existing role ID
            password: 'password123',
        });
        expect(res.statusCode).toEqual(200);
        expect(res.body).toHaveProperty('username', 'updateduser');
    });
    it('should delete user', async () => {
        const res = await (0, supertest_1.default)(index_1.default)
            .delete(`/api/users/${userId}`)
            .set('Authorization', `Bearer ${token}`);
        expect(res.statusCode).toEqual(204);
    });
});
