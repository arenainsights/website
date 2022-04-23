import axios, { AxiosResponse } from "axios";
import { baseUrl } from ".";
import { ISettings } from "../../../backend/src/models/settings-model";

export interface ResponseGetMeta {
  meta: ISettings
}

export const getCrawlerMeta = async (): Promise<AxiosResponse<ResponseGetMeta>> => {
  try {
    const meta: AxiosResponse<ResponseGetMeta> = await axios.get(
      baseUrl + "/meta"
    );
    return meta;
  } catch (error) {
    throw error;
  }
}
