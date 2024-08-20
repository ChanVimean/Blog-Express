import { Router } from "express";
import validateToken from '../utils/jwt_validate.js';
import { getAuthUserController } from '../controller/user_Controller.js';
import upload from '../utils/image_handler.js';

const userRouter = Router();

userRouter.use(validateToken);

// Authenticated user
userRouter.get('/getAuthUser', getAuthUserController);


export default userRouter;