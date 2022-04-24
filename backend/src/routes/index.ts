import { Router } from "express";
import { getBotRatings } from "../controllers/botratings";
import { getBotById, getBots } from "../controllers/bots";
import { getGames } from "../controllers/games";
import { getMeta } from "../controllers/meta";
import { getUsers } from "../controllers/users";


const API_VERSION = "v1";

const router: Router = Router()

router.get(`/${API_VERSION}/games`, getGames);

router.get(`/${API_VERSION}/bots`, getBots);

router.get(`/${API_VERSION}/meta`, getMeta);

router.get(`/${API_VERSION}/users`, getUsers)

router.get(`/${API_VERSION}/bots/:id`, getBotById);
router.get(`/${API_VERSION}/bot-ratings/:id`, getBotRatings);


export default router
