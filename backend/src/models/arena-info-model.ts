import mongoose, { Schema } from 'mongoose';

const ArenaInfoModelSchema = new Schema({
  arenaId: { type: String, required: true, unique: true },
  name: { type: String },
  advanced: { type: Boolean },
  active: { type: Boolean },
  ranks: { type: Number },
  descriptionHtml: { type: String }
});

export interface IArenaInfo {
  _id: string;
  arenaId: string;
  name: string;
  advanced: boolean;
  active: boolean;
  ranks: number;
  descriptionHtml: string;
}

export const ArenaInfo = mongoose.model('ArenaInfo', ArenaInfoModelSchema);
