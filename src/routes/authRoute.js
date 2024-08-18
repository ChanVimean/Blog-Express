import { Router } from "express";
import upload from '../utils/image_handler.js';
import { userRegisterController } from '../controller/auth_Controller.js'

const authRouter = Router();

authRouter.post('/register', upload.single('file'), userRegisterController);
// authRouter.post('/login' );


export default authRouter;