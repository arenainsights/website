import mongoose, { Schema } from 'mongoose';

// overall games played, not arena specific
const UserGamesPlayedSeriesModel = new Schema({
  date: { type: Date, required: true },
  gamesPlayed: { type: Number, required: true },
  meta: {
    userId: { type: String, required: true, },
  }
}, {
  timeseries: {
    timeField: "date",
    metaField: "meta",
    granularity: "hours"
  }
});

export interface IUserGamesPlayed {
  date: Date;
  gamesPlayed: number;
  meta: {
    userId: string;
  };
}

export const UserGamesPlayed = mongoose.model('UserGamesPlayed', UserGamesPlayedSeriesModel);

