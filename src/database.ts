import mongoose from 'mongoose';
import { environmentVariables } from './utils/loadEnvVariables';

const { MONGODB_URI } = environmentVariables;

(async (uri: string): Promise<void> => {
  try {
    const { port, name } = (await mongoose.connect(uri)).connections[0];
    console.log(`${name} database running on port ${port}`);
  } catch (e) {
    console.log(e);
  }
})(MONGODB_URI!);
