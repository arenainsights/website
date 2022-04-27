import { Request, Response } from "express";
import { IUserArenaInfo } from "../models/user-arena-info-model";
import { IUserFame } from "../models/user-fame-series";
import { IUserGamesPlayed } from "../models/user-games-played-series";
import { IUserInfo, UserInfo } from "../models/user-info-model";
import { IUserRating } from "../models/user-rating-series";

export const getUsers = async (req: Request, res: Response): Promise<void> => {
  try {
    const users: IUserInfo[] = await UserInfo.find();
    res.status(200).json({ users });
  } catch (err) {
    throw err;
  }
}

export interface IUserInfoExtended extends IUserInfo {
  arenas: IUserArenaInfo[];
  ratings: IUserRating[];
  fames: IUserFame[];
  globalGamesPlayed: IUserGamesPlayed[]
}


export const getUserById = async (req: Request, res: Response): Promise<void> => {
  try {
    let users: IUserInfoExtended[] = await UserInfo.aggregate([
      {
        $match: { userId: req.params.id },
      }, {
        $lookup: {
          from: "userarenainfos",
          localField: "userId",
          foreignField: "userId",
          as: "arenas"
        }
      },
      {
        $lookup: {
          from: "userfames",
          localField: "userId",
          foreignField: "meta.userId",
          as: "fames"
        }
      },
      {
        $lookup: {
          from: "usergamesplayeds",
          localField: "userId",
          foreignField: "meta.userId",
          as: "globalGamesPlayed"
        }
      },
      {
        $lookup: {
          from: "userratings",
          localField: "userId",
          foreignField: "meta.userId",
          as: "ratings"
        }
      }
    ]);
    if (users.length === 0) {
      res.status(404).json(`User not found, id: ${req.params.id}`);
      return;
    }
    const user = users[0];
    res.status(200).json({ user });
  } catch (err) {
    throw err;
  }
}
