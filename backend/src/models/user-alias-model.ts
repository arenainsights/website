import mongoose, { Schema } from 'mongoose';

const UserAliasModelSchema = new Schema({
  userId: { type: String, required: true, unique: true },
  username: { type: String, required: true },
  combined: { type: String, required: true, unique: true }
});

export interface IUserAlias {
  userId: string;
  username: string;
  combined: string;
}

export const UserAlias = mongoose.model('UserAlias', UserAliasModelSchema);
