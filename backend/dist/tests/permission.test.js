"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const supertest_1 = __importDefault(require("supertest"));
const index_1 = __importDefault(require("@/index"));
describe('Permission API', () => {
    let permissionId;
    it('should create new permission', async () => {
        const res = await (0, supertest_1.default)(index_1.default)
            .post('/api/permissions')
            .send({
            name: 'read',
            description: 'Read permission',
        });
        expect(res.statusCode).toEqual(201);
        expect(res.body).toHaveProperty('_id');
        permissionId = res.body._id;
    });
    it('should get all permissions', async () => {
        const res = await (0, supertest_1.default)(index_1.default).get('/api/permissions');
        expect(res.statusCode).toEqual(200);
        expect(res.body).toBeInstanceOf(Array);
    });
});
