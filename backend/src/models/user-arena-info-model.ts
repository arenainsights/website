// best rating
// rating
// rank
// games played

import mongoose, { Schema } from 'mongoose';

const UserArenaInfoModelSchema = new Schema({
  userId: { type: String, required: true },
  arenaId: { type: String, required: true },
  rating: { type: Number },
  rank: { type: Number },
  bestRating: { type: Number },
  bestRatingDate: { type: Date },
  ratingGamesPlayed: { type: Number },
  currentCodeVersion: { type: Number }
});

export interface IUserArenaInfo {
  userId: string;
  arenaId: string;
  rating: number;
  rank: number;
  bestRating?: number;
  bestRatingDate?: Date;
  ratingGamesPlayed: number;
  currentCodeVersion: number;
}

// user and arena ids are the index
UserArenaInfoModelSchema.index({ userId: 1, arenaId: 1 }, { unique: true });
export const UserArenaInfo = mongoose.model('UserArenaInfo', UserArenaInfoModelSchema);
