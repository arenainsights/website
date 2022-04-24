import { Request, Response } from "express";
import { BotRating, IBotRating } from "../models/bot-rating-series";

export const getBotRatings = async (req: Request, res: Response): Promise<void> => {
  try {
    const botRatings: IBotRating[] = await BotRating.aggregate([
      {
        $match: { "meta.codeId": req.params.id }
      },

    ]);
    res.status(200).json({ botRatings });
  } catch (err) {
    throw err;
  }
}
