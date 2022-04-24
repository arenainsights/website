import mongoose, { Schema } from 'mongoose';

const MetaSchema = new Schema({
  key: { type: String, required: true, unique: true },
  lastRun: { type: Date, required: true },
  lastFullRun: { type: Date, required: true },
  userCount: { type: Number, required: true },
  gameCount: { type: Number, required: true },
  botCount: { type: Number, required: true }
});

export interface IMeta {
  key: string;
  lastRun: string;
  lastFullRun: string;
  userCount: number;
  gameCount: number;
  botCount: number;
}

export const Meta = mongoose.model('Meta', MetaSchema);
