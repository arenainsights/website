import axios, { AxiosResponse } from "axios";
import { versionedBaseUrl } from ".";
import { IUserInfoExtended } from "../../../backend/src/controllers/users";
import { IUserInfo } from "../../../backend/src/models/user-info-model";

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

export interface ResponseGetUserById {
  user: IUserInfoExtended;
}

export const getUserById = async (id: string): Promise<AxiosResponse<ResponseGetUserById>> => {
  try {
    const bot: AxiosResponse<ResponseGetUserById> = await axios.get(
      versionedBaseUrl + "/users/" + id
    );
    return bot;
  } catch (error) {
    throw error;
  }
}
