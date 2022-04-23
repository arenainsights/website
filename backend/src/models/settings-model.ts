import mongoose, { Schema } from 'mongoose';

const SettingsSchema = new Schema({
  key: { type: String, required: true, unique: true },
  lastRun: { type: Date, required: true },
  lastFullRun: { type: Date, required: true }
});

export interface ISettings {
  key: string;
  lastRun: Date;
  lastFullRun: Date;
}

export const Settings = mongoose.model('Settings', SettingsSchema);
