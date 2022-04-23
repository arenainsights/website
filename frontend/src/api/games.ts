import axios, { AxiosResponse } from "axios";
import { baseUrl } from ".";
import { IBotInfo } from "../../../backend/src/models/bot-info-model";


export interface ResponseGetGames {
  games: IGameInfo[];
}

export interface IArenaInfo {
  id?: string;
  arenaId: string;
  name: string;
  advanced: boolean;
  active: boolean;
  ranks: number;
  descriptionHtml: string;
}

export interface IUserInfo {
  userId: string;
  username: string;
  activeInSeasons: number;
  ratingGamesPlayed: number;
  famePoints: number;
}

export interface IGameInfoExtended extends Omit<IGameInfo, "users"> {
  arena: IArenaInfo;
  creator: IUserInfo;
  users: IUserInfo[];
  bots: IBotInfo[];
}

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

export const getValidGamesWithCode = async (): Promise<AxiosResponse<ResponseGetGames>> => {
  try {
    const games: AxiosResponse<ResponseGetGames> = await axios.get(
      baseUrl + "/games"
    );
    games.data.games = games.data.games
      .filter(g => g.gameCode !== undefined && g.shared);
    return games;
  } catch (error) {
    throw error;
  }
}
