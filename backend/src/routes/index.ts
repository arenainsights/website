import { Router } from "express";
import { getBots } from "../controllers/bots";
import { getGames } from "../controllers/games";
import { getMeta } from "../controllers/meta";
import { getUsers } from "../controllers/users";


const API_VERSION = "v1";

const router: Router = Router()

router.get(`/${API_VERSION}/games`, getGames);

router.get(`/${API_VERSION}/bots`, getBots);

router.get(`/${API_VERSION}/meta`, getMeta);

router.get(`/${API_VERSION}/users`, getUsers)


export default router
