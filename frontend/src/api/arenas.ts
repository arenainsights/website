import axios, { AxiosResponse } from "axios";
import { versionedBaseUrl } from ".";
import { IArenaInfo } from "../../../backend/src/controllers/games";

export interface ResponseGetArenas {
  arenas: IArenaInfo[]
}

export const getAllArenas = async (): Promise<AxiosResponse<ResponseGetArenas>> => {
  try {
    const bots: AxiosResponse<ResponseGetArenas> = await axios.get(
      versionedBaseUrl + "/arenas"
    );
    return bots;
  } catch (error) {
    throw error;
  }
}
