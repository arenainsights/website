import { Request, Response } from "express";
import { ArenaInfo } from "../models/arena-info-model";
import { IArenaInfo } from "./games";

export const getArenas = async (req: Request, res: Response): Promise<void> => {
  try {
    const arenas: IArenaInfo[] = await ArenaInfo.find();
    res.status(200).json({ arenas });
  } catch (err) {
    throw err;
  }
}
