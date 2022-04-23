import { Request, Response } from "express";
import { GameInfo, IGameInfo } from "../models/game-info-model";

export const getGames = async (req: Request, res: Response): Promise<void> => {
  try {
    const games: IGameInfo[] = await GameInfo.aggregate([
      {
        $lookup: {
          from: "userinfos",
          localField: "users",
          foreignField: "userId",
          as: "users"
        }
      }, {
        $lookup: {
          from: "arenainfos",
          localField: "arenaId",
          foreignField: "arenaId",
          as: "arena"
        }
      }, {
        $lookup: {
          from: "userinfos",
          localField: "creatorId",
          foreignField: "userId",
          as: "creator"
        }
      }, {
        $lookup: {
          from: "botinfos",
          localField: "usersCode",
          foreignField: "codeId",
          as: "bots"
        }
      },
      { $unwind: "$arena" },
      { $unwind: "$creator" },
    ]);
    res.status(200).json({ games });
  } catch (err) {
    throw err;
  }
}
