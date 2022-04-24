import { Request, Response } from "express";
import { Meta } from "../models/meta-model";


const META_KEY = "01";

export const getMeta = async (req: Request, res: Response): Promise<void> => {
  try {
    const meta = await Meta.findOne({ key: META_KEY });
    res.status(200).json({ meta });
  } catch (err) {
    throw err;
  }
}
