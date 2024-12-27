import { Router } from "express";
import { UserController } from "../controllers/user.controller.js";
import { verifyAdmin, verifyToken } from "../middlewares/jwt.middleware.js";


const router = Router()

router.post('/register', UserController.register)
router.post('/login', UserController.login)
//Ruta ,middleware(se ejecuta antes de ir al controller), controller
router.get('/profile', verifyToken ,UserController.profile)


//admin


router.get('/', verifyToken, verifyAdmin, UserController.findAll)
router.put('/update-role-vet/:uid',verifyToken,verifyAdmin,UserController.updateRoleVet )


export default router;