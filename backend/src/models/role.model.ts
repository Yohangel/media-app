import { Schema, model } from 'mongoose';

interface Role {
  name: string;
  createdAt: Date;
}

const roleSchema = new Schema<Role>({
  name: { type: String, required: true },
  createdAt: { type: Date, default: Date.now }
});

const RoleModel = model<Role>('Role', roleSchema);

export { RoleModel, Role };