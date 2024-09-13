"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("tsconfig-paths/register");
const express_1 = __importDefault(require("express"));
const db_1 = __importDefault(require("@/config/db"));
const topic_routes_1 = __importDefault(require("@/routes/topic.routes"));
const user_routes_1 = __importDefault(require("@/routes/user.routes"));
const content_routes_1 = __importDefault(require("@/routes/content.routes"));
const role_routes_1 = __importDefault(require("@/routes/role.routes"));
const swagger_1 = require("@/swagger");
const dotenv_1 = __importDefault(require("dotenv"));
const cors_1 = __importDefault(require("cors"));
dotenv_1.default.config();
const app = (0, express_1.default)();
app.use((0, cors_1.default)());
app.use(express_1.default.json());
if (process.env.NODE_ENV !== 'test') {
    (0, db_1.default)();
}
app.use('/api/users', user_routes_1.default);
app.use('/api/content', content_routes_1.default);
app.use('/api/topics', topic_routes_1.default);
app.use('/api/roles', role_routes_1.default);
(0, swagger_1.setupSwagger)(app);
const PORT = process.env.PORT || 5002;
if (process.env.NODE_ENV !== 'test') {
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
}
exports.default = app;
