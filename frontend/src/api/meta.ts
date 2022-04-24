import axios, { AxiosResponse } from "axios";
import { baseUrl } from ".";
import { IMeta } from "../../../backend/src/models/meta-model";

export interface ResponseGetMeta {
  meta: IMeta
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
