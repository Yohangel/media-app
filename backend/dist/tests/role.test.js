"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const supertest_1 = __importDefault(require("supertest"));
const index_1 = __importDefault(require("@/index"));
describe('Role API', () => {
    let token;
    let roleId;
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
    });
    it('should create new role', async () => {
        const res = await (0, supertest_1.default)(index_1.default)
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
        const res = await (0, supertest_1.default)(index_1.default)
            .get('/api/roles')
            .set('Authorization', `Bearer ${token}`);
        expect(res.statusCode).toEqual(200);
        expect(res.body).toBeInstanceOf(Array);
    });
});
