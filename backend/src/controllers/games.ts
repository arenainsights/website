import { Request, Response } from "express";
import { IBotInfo } from "../models/bot-info-model";
import { GameInfo, IGameInfo } from "../models/game-info-model";

export interface IArenaInfo {
  id?: string;
  arenaId: string;
  name: string;
  advanced: boolean;
  active: boolean;
  ranks: number;
  descriptionHtml: string;
}

export interface IUserInfo {
  userId: string;
  username: string;
  activeInSeasons: number;
  ratingGamesPlayed: number;
  famePoints: number;
}

export interface IGameInfoExtended extends Omit<IGameInfo, "users"> {
  arena: IArenaInfo;
  creator: IUserInfo;
  users: IUserInfo[];
  bots: IBotInfo[];
}

export const getGames = async (req: Request, res: Response): Promise<void> => {
  try {
    const games: IGameInfoExtended[] = await GameInfo.aggregate([
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



export const getGameByCode = async (req: Request, res: Response): Promise<void> => {
  try {
    const games: IGameInfoExtended[] = await GameInfo.aggregate([
      {
        $match: { gameCode: req.params.code }
      },
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
    if (games.length === 0) {
      res.status(404).json(`game not found, code: ${req.params.code}`);
      return;
    }
    if (games.length > 1) {
      res.status(500).json(`something went wrong getting game data, id: ${req.params.code}`);
      return;
    }
    const game = games[0];
    res.status(200).json({ game });
  } catch (err) {
    throw err;
  }
}

