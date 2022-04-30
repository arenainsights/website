import { Request, Response } from "express";
import { IUserFame, UserFame } from "../models/user-fame-series";

export const getAllFameInfo = async (req: Request, res: Response): Promise<void> => {
  try {
    const fameInfos: IUserFame[] = await UserFame.find();
    res.status(200).json({ fameInfos });
  } catch (err) {
    throw err;
  }
}
