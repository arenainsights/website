import mongoose, { Schema } from 'mongoose';

const UserRatingSeriesModel = new Schema({
  date: { type: Date, required: true },
  rating: { type: Number, required: true },
  rank: { type: Number, require: true },
  gamesPlayed: { type: Number, required: true },
  meta: {
    userId: { type: String, required: true, unique: true },
    arenaId: { type: String, required: true },
  }
}, {
  timeseries: {
    timeField: "date",
    metaField: "meta",
    granularity: "hours"
  }
});

export interface IUserRating {
  date: Date;
  rating: number;
  rank: number;
  gamesPlayed: number;
  meta: {
    userId: string;
    arenaId: string;
  }
}
export const UserRating = mongoose.model('UserRating', UserRatingSeriesModel);

