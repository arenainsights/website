import { Router } from "express";
import { getBots } from "../controllers/bots";
import { getGames } from "../controllers/games";
import { getMeta } from "../controllers/meta";

const router: Router = Router()

router.get("/games", getGames);

router.get("/bots", getBots);

router.get("/meta", getMeta);


export default router
