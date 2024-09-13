import app from '../index';
import mongoose from 'mongoose';
import { MongoMemoryServer } from 'mongodb-memory-server-core';
import http from 'http';
import dotenv from 'dotenv';
import { seedDatabase } from '../seed'; 

dotenv.config();

let server: http.Server;

const mongod = new MongoMemoryServer();

const connectDB = async () => {
  await mongod.start();
  const uri = mongod.getUri() + 'testdb';
  await mongoose.connect(uri);
  await seedDatabase();
};

beforeAll(async () => {
  await connectDB();
  server = app.listen(0, () => {
    console.log(`Test server running}`);
  });
});

afterAll(async () => {
  await mongoose.disconnect();
  await mongod.stop();
  return new Promise<void>((resolve) => {
    server.close(() => resolve());
  });
});
