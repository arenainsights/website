import { Router } from "express";
import { getArenas } from "../controllers/arenas";
import { getBotRatings } from "../controllers/botratings";
import { getBotById, getBots } from "../controllers/bots";
import { getAllFameInfo } from "../controllers/fame";
import { getGameByCode, getGames } from "../controllers/games";
import { getMeta } from "../controllers/meta";
import { getUserById, getUsers } from "../controllers/users";


const API_VERSION = "v1";

const router: Router = Router()

router.get(`/${API_VERSION}/games`, getGames);
router.get(`/${API_VERSION}/games/:code`, getGameByCode);

router.get(`/${API_VERSION}/bots`, getBots);

router.get(`/${API_VERSION}/meta`, getMeta);

router.get(`/${API_VERSION}/users`, getUsers);
router.get(`/${API_VERSION}/users/:id`, getUserById);

router.get(`/${API_VERSION}/bots/:id`, getBotById);
router.get(`/${API_VERSION}/bot-ratings/:id`, getBotRatings);

router.get(`/${API_VERSION}/arenas`, getArenas);

router.get(`/${API_VERSION}/fame/all`, getAllFameInfo);


export default router
