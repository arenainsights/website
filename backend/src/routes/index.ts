import { Router } from "express";
import { getBots } from "../controllers/bots";
import { getGames } from "../controllers/games";

const router: Router = Router()

router.get("/games", getGames);

router.get("/bots", getBots);


export default router
