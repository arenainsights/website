import axios, { AxiosResponse } from "axios";
import { baseUrl } from ".";
import { IGameInfoExtended } from "../../../backend/src/controllers/games";

export interface ResponseGetGames {
  games: IGameInfoExtended[];
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
