import axios, { AxiosResponse } from "axios";
import { versionedBaseUrl } from ".";
import { IBotRating } from "../../../backend/src/models/bot-rating-series";

export interface ResponseGetRatingsByCodeId {
  botRatings: IBotRating[];
}


export const getBotRatingsByCodeId = async (id: string): Promise<AxiosResponse<ResponseGetRatingsByCodeId>> => {
  try {
    const bot: AxiosResponse<ResponseGetRatingsByCodeId> = await axios.get(
      versionedBaseUrl + "/bot-ratings/" + id
    );
    return bot;
  } catch (error) {
    throw error;
  }
}
