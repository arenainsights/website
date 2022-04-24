import axios, { AxiosResponse } from "axios";
import { baseUrl } from ".";
import { IUserInfo } from "../../../backend/src/controllers/games";

export interface ResponseGetUsers {
  users: IUserInfo[];
}

export const getAllUsers = async (): Promise<AxiosResponse<ResponseGetUsers>> => {
  try {
    const users: AxiosResponse<ResponseGetUsers> = await axios.get(
      baseUrl + "/users"
    );
    return users;
  } catch (error) {
    throw error;
  }
}
