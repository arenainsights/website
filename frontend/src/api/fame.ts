import axios, { AxiosResponse } from "axios";
import { versionedBaseUrl } from ".";
import { IUserFame } from "../../../backend/src/models/user-fame-series";

export interface ResponseGetFameAll {
  fameInfos: IUserFame[]
}

export const getAllFameInfos = async (): Promise<AxiosResponse<ResponseGetFameAll>> => {
  try {
    const fameInfos: AxiosResponse<ResponseGetFameAll> = await axios.get(
      versionedBaseUrl + "/fame/all"
    );
    return fameInfos;
  } catch (error) {
    throw error;
  }
}
