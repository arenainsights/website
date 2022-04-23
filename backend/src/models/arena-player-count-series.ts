import mongoose, { Schema } from 'mongoose';

const ArenaPlayerCountSeriesModel = new Schema({
  date: { type: Date, required: true },
  ranks: { type: Number, required: true },
  meta: {
    arenaId: { type: String, required: true }
  }
}, {
  timeseries: {
    timeField: "date",
    metaField: "meta",
    granularity: "hours"
  }
});

export interface IArenaPlayerCount {
  date: Date;
  ranks: number;
  meta: {
    arenaId: string;
  }
}

export const ArenaPlayerCount = mongoose.model('ArenaPlayerCount', ArenaPlayerCountSeriesModel);
