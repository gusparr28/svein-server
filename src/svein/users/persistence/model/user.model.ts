import { model, Schema } from 'mongoose';
import { User } from '../entities/user.entity';

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
    required: true,
    unique: true,
    lowercase: true,
    trim: true,
  },
  password: {
    type: String,
    required: true,
  },
}, { timestamps: true });

const UserModel = model<User>('User', userSchema);

export default UserModel;
