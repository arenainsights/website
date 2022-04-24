import axios, { AxiosResponse } from "axios";
import { versionedBaseUrl } from ".";
import { IUserInfo } from "../../../backend/src/controllers/games";

export interface ResponseGetUsers {
  users: IUserInfo[];
}

export const getAllUsers = async (): Promise<AxiosResponse<ResponseGetUsers>> => {
  try {
    const users: AxiosResponse<ResponseGetUsers> = await axios.get(
      versionedBaseUrl + "/users"
    );
    return users;
  } catch (error) {
    throw error;
  }
}
