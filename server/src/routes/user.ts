import { Router } from "express";
import { forgotPassword, loginUser, newUser } from "../controllers/user";


const router = Router();

router.post('/', newUser);
router.post('/login', loginUser);
router.post('/findByEmail', forgotPassword)

export default router;
