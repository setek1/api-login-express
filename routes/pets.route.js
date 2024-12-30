import {Router} from "express"
import { PetsController } from "../controllers/pets.controller.js";
import { verifyToken, verifyVet } from "../middlewares/jwt.middleware.js";

const router=Router()

//  /api/v1/pets

router.get('/',verifyToken, verifyVet,PetsController.findAll)


export default router;