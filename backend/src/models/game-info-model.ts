import mongoose, { Schema } from 'mongoose';

const GameInfoSchema = new Schema({
  gameId: { type: String, required: true, unique: true },
  arenaId: { type: String, required: true },
  gameCode: { type: String },
  ticks: { type: Number, required: true },
  users: { type: [String], required: true },
  usersCode: { type: [String], required: true },
  creatorId: { type: String, required: true },
  gameStatus: { type: String, required: true },
  gameCreated: { type: String, required: true },
  gameResultStatus: { type: String, required: true },
  gameResultWinner: { type: Number, required: true },
  playerColors: { type: [String], required: true },
  firstPlayerIndex: { type: Number, required: true },
  shared: { type: Boolean, required: true }
});

export interface IGameInfo {
  gameId: string;
  arenaId: string;
  gameCode?: string;
  ticks: number;
  users: string[];
  usersCode: string[];
  creatorId: string;
  gameStatus: string;
  gameCreated: string;
  gameResultStatus: string;
  gameResultWinner: number;
  playerColors: string[];
  firstPlayerIndex: number;
  shared: boolean;
}

export const GameInfo = mongoose.model('GameInfo', GameInfoSchema);
