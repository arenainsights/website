import { Request, Response } from "express";
import { BotInfo, IBotInfo } from "../models/bot-info-model";

export interface IBotArenaInfo {
  arenaId: string;
  name: string;
  advanced: boolean;
  active: boolean;
}

export interface IBotUserInfo {
  userId: string;
  username: string;
}

export interface IBotInfoExtended extends IBotInfo {
  arena: IBotArenaInfo;
  user: IBotUserInfo;
}

export const getBots = async (req: Request, res: Response): Promise<void> => {
  try {
    const bots: IBotInfoExtended[] = await BotInfo.aggregate([
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

export const getBotById = async (req: Request, res: Response): Promise<void> => {
  try {
    let bots: IBotInfoExtended[] = await BotInfo.aggregate([
      {
        $match: { codeId: req.params.id },
      }, {
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
    if (bots.length === 0) {
      res.status(404).json(`bot not found, id: ${req.params.id}`);
      return;
    }
    if (bots.length > 1) {
      res.status(500).json(`something went wrong getting bot data, id: ${req.params.id}`);
      return;
    }
    const bot = bots[0];
    res.status(200).json({ bot });
  } catch (err) {
    throw err;
  }
}
