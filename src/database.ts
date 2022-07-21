import mongoose from 'mongoose';

const {
  NODE_ENV, LOCAL_MONGODB_URI, PROD_MONGODB_URI, STAG_MONGODB_URI,
} = process.env;

(async (uri: string): Promise<void> => {
  try {
    const { port, name } = (await mongoose.connect(uri)).connections[0];
    console.log(`${name} database running on port ${port}`);
  } catch (e) {
    console.log(e);
  }
})(NODE_ENV === 'development'
  ? LOCAL_MONGODB_URI!
  : NODE_ENV === 'staging'
    ? STAG_MONGODB_URI! : PROD_MONGODB_URI!);
