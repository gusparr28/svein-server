import { app } from './src/app';

beforeAll(async () => {
  await app.ready();
});

afterAll(async () => {
  await app.close();
});
