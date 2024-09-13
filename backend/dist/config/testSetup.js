"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const index_1 = __importDefault(require("../index"));
const mongoose_1 = __importDefault(require("mongoose"));
const mongodb_memory_server_core_1 = require("mongodb-memory-server-core");
const dotenv_1 = __importDefault(require("dotenv"));
const seed_1 = require("../seed");
dotenv_1.default.config();
let server;
const mongod = new mongodb_memory_server_core_1.MongoMemoryServer();
const connectDB = async () => {
    await mongod.start();
    const uri = mongod.getUri() + 'testdb';
    await mongoose_1.default.connect(uri);
    await (0, seed_1.seedDatabase)();
};
beforeAll(async () => {
    await connectDB();
    server = index_1.default.listen(0, () => {
        console.log(`Test server running}`);
    });
});
afterAll(async () => {
    await mongoose_1.default.disconnect();
    await mongod.stop();
    return new Promise((resolve) => {
        server.close(() => resolve());
    });
});
