import { Router } from "express";
import { addHeroes, deleteHeroeById, editHeroeByName, getAllsHeroes, getHeroeByName } from "../controllers/Heroe";
import validateToken from "./validate-token";

const router = Router();

router.get('/', validateToken, getAllsHeroes)
router.post('/addHeroe', addHeroes )
router.get('/:name', getHeroeByName)
router.put('/:name', editHeroeByName);
router.delete('/:id', deleteHeroeById)

export default router;