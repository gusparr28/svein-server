import { model, Schema } from 'mongoose';
import { User } from '../../entities/users/UserEntity';

const userSchema = new Schema<User>({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  username: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
});

const UserModel = model<User>('User', userSchema);

export default UserModel;
