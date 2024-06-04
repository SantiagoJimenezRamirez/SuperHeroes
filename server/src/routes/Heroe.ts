import { Router } from "express";
import { addHeroes, deleteHeroeById, editHeroe, getAllsHeroes } from "../controllers/Heroe";
import validateToken from "./validate-token";

const router = Router();

router.get('/', validateToken, getAllsHeroes)
router.post('/addHeroe', addHeroes )
router.put('/:id', editHeroe)
router.delete('/:id', deleteHeroeById)

export default router;