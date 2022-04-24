import mongoose, { Schema } from 'mongoose';

const UserInfoModelSchema = new Schema({
  userId: { type: String, required: true, unique: true },
  username: { type: String },
  activeInSeasons: { type: Number },
  ratingGamesPlayed: { type: Number },
  famePoints: { type: Number }
});

export interface IUserInfo {
  _id: string;
  userId: string;
  username: string;
  activeInSeasons: number;
  ratingGamesPlayed: number;
  famePoints: number;
}

export const UserInfo = mongoose.model('UserInfo', UserInfoModelSchema);
