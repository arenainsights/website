import { Request, Response } from "express";
import { Settings } from "../models/settings-model";


const SETTINGS_KEY = "01";

export const getMeta = async (req: Request, res: Response): Promise<void> => {
  try {
    const settings = await Settings.findOne({ key: SETTINGS_KEY });
    res.status(200).json({ settings });
  } catch (err) {
    throw err;
  }
}
