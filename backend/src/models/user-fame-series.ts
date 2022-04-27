import mongoose, { Schema } from 'mongoose';

const UserFameSeriesModel = new Schema({
  date: { type: Date, required: true },
  fame: { type: Number, required: true },
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

export interface IUserFame {
  date: Date;
  fame: number;
  meta: {
    userId: string;
  };
}

export const UserFame = mongoose.model('UserFame', UserFameSeriesModel);

