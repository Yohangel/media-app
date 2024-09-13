import { Schema, model, Types } from 'mongoose';
import bcrypt from 'bcrypt';

interface User {
  _id: Schema.Types.ObjectId;
  username: string;
  email: string;
  password: string;
  role: Types.ObjectId; 
  createdAt: Date;
  comparePassword(candidatePassword: string): Promise<boolean>;
}
const userSchema = new Schema<User>({
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: Schema.Types.ObjectId, ref: 'Role', required: true },
  createdAt: { type: Date, default: Date.now }
});


userSchema.set('toJSON', {
  transform: function (doc, ret, options) {
    delete ret.password; 
    return ret;
  }
});

userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

userSchema.methods.comparePassword = async function (candidatePassword: string) {
  return bcrypt.compare(candidatePassword, this.password);
};

const UserModel = model<User>('User', userSchema);

export { UserModel, User };
