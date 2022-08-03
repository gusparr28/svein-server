import { model, Schema } from 'mongoose';
import { User } from '../../domain/model/User';

const userSchema = new Schema<User>({
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true,
  },
  username: {
    type: String,
    lowercase: true,
    trim: true,
    index: {
      unique: true,
      partialFilterExpression: {
        username: {
          $type: 'string',
        },
      },
    },
  },
  password: {
    type: String,
  },
  context: {
    type: String,
    enum: ['svein', 'oauth', 'both'],
    required: false,
  },
}, { timestamps: true });

const UserModel = model<User>('User', userSchema);

export default UserModel;
