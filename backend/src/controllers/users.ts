import { Request, Response } from "express";
import { IUserInfo, UserInfo } from "../models/user-info-model";

export const getUsers = async (req: Request, res: Response): Promise<void> => {
  try {
    const users: IUserInfo[] = await UserInfo.find();
    res.status(200).json({ users });
  } catch (err) {
    throw err;
  }
}
