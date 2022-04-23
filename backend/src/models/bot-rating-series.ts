import mongoose, { Schema } from 'mongoose';

const BotRatingSeriesModelSchema = new Schema(
  {
    date: { type: Date, required: true },
    rating: { type: Number, required: true },
    meta: {
      codeId: { type: String, required: true },
      arenaId: { type: String, required: true },
      userId: { type: String, required: true },
      version: { type: Number, required: true }
    }
  }, {
  timeseries: {
    timeField: "date",
    metaField: "meta",
    granularity: "hours"
  }
});

export interface IBotRating {
  date: Date;
  rating: number;
  meta: {
    codeId: string;
    arenaId: string;
    userId: string;
    version: number;
  }
}

export const BotRating = mongoose.model('BotRating', BotRatingSeriesModelSchema);
