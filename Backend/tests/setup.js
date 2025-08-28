// Test setup file
process.env.NODE_ENV = 'test';

const { MongoMemoryServer } = require('mongodb-memory-server');
const mongoose = require('mongoose');

let mongoServer;

beforeAll(async () => {
  // Start in-memory MongoDB instance
  mongoServer = await MongoMemoryServer.create();
  const mongoUri = mongoServer.getUri();
  
  // Connect to the in-memory database
  await mongoose.connect(mongoUri);
}, 60000); // Increase timeout for MongoDB Memory Server startup

afterAll(async () => {
  // Close database connection and stop MongoDB instance
  await mongoose.connection.close();
  if (mongoServer) {
    await mongoServer.stop();
  }
}, 60000);

afterEach(async () => {
  // Clean up test data after each test
  const collections = mongoose.connection.collections;
  for (const key in collections) {
    const collection = collections[key];
    await collection.deleteMany({});
  }
});
