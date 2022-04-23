import axios, { AxiosResponse } from "axios";
import { baseUrl } from ".";

export interface IBotInfo {
  codeId: string;
  userId: string;
  arenaId: string;
  rating: number;
  version: number;
}

export interface ResponseGetBots {
  bots: IBotInfo[];
}

export interface IBotArenaInfo {
  arenaId: string;
  name: string;
  advanced: boolean;
  active: boolean;
}

export interface IBotUserInfo {
  userId: string;
  username: string;
}

export interface IBotInfoExtended extends IBotInfo {
  arena: IBotArenaInfo;
  user: IBotUserInfo;
}

export const getAllBots = async (): Promise<AxiosResponse<ResponseGetBots>> => {
  try {
    const bots: AxiosResponse<ResponseGetBots> = await axios.get(
      baseUrl + "/bots"
    );
    return bots;
  } catch (error) {
    throw error;
  }
}
