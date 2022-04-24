import { Router } from "express";
import { getBots } from "../controllers/bots";
import { getGames } from "../controllers/games";
import { getMeta } from "../controllers/meta";
import { getUsers } from "../controllers/users";

const router: Router = Router()

router.get("/games", getGames);

router.get("/bots", getBots);

router.get("/meta", getMeta);

router.get("/users", getUsers)


export default router
