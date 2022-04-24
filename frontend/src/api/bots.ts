import axios, { AxiosResponse } from "axios";
import { versionedBaseUrl } from ".";
import { IBotInfoExtended } from "../../../backend/src/controllers/bots";

export interface ResponseGetBots {
  bots: IBotInfoExtended[];
}

export interface ResponseGetBotById {
  bot: IBotInfoExtended;
}

export const getAllBots = async (): Promise<AxiosResponse<ResponseGetBots>> => {
  try {
    const bots: AxiosResponse<ResponseGetBots> = await axios.get(
      versionedBaseUrl + "/bots"
    );
    return bots;
  } catch (error) {
    throw error;
  }
}

export const getBotById = async (id: string): Promise<AxiosResponse<ResponseGetBotById>> => {
  try {
    const bot: AxiosResponse<ResponseGetBotById> = await axios.get(
      versionedBaseUrl + "/bots/" + id
    );
    return bot;
  } catch (error) {
    throw error;
  }
}
