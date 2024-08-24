import { Router } from 'express';
import upload from '../utils/image_handler.js';
import { userRegisterController, userLoginController } from '../controller/auth_Controller.js'

const authRouter = Router();

authRouter.post('/register', upload.single('image'), userRegisterController);
authRouter.post('/login', userLoginController);


export default authRouter;