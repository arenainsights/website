import axios, { AxiosResponse } from "axios";
import { baseUrl } from ".";
import { IBotInfoExtended } from "../../../backend/src/controllers/bots";

export interface ResponseGetBots {
  bots: IBotInfoExtended[];
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
