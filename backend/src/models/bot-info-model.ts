import mongoose, { Schema } from 'mongoose';

const BotInfoModelSchema = new Schema({
  codeId: { type: String, required: true, unique: true },
  userId: { type: String, required: true },
  arenaId: { type: String, required: true },
  version: { type: Number },
  rating: { type: Number, required: true }
});

export interface IBotInfo {
  _id: string;
  codeId: string;
  userId: string;
  arenaId: string;
  rating: number;
  version: number;
}

export const BotInfo = mongoose.model('BotInfo', BotInfoModelSchema);
