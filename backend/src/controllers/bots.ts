import { Request, Response } from "express";
import { BotInfo, IBotInfo } from "../models/bot-info-model";

export const getBots = async (req: Request, res: Response): Promise<void> => {
  try {
    const bots: IBotInfo[] = await BotInfo.aggregate([
      {
        $lookup: {
          from: "userinfos",
          localField: "userId",
          foreignField: "userId",
          as: "user"
        }
      }, {
        $lookup: {
          from: "arenainfos",
          localField: "arenaId",
          foreignField: "arenaId",
          as: "arena"
        }
      },
      { $unwind: "$arena" },
      { $unwind: "$user" },
      {
        $project: {
          "arena.descriptionHtml": 0,
          "arena.ranks": 0,
          "user.activeInSeasons": 0,
          "user.famePoints": 0,
          "user.ratingGamesPlayed": 0,
        }
      }
    ]);
    res.status(200).json({ bots });
  } catch (err) {
    throw err;
  }
}
