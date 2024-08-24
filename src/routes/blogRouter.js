import { Router } from "express";
import { validateToken } from '../utils/jwt_validate.js';
import { getAllBlogController, createBlogController,
         editBlogController, deleteBlogController } from '../controller/blog_Controller.js';
import upload from "../utils/image_handler.js";

const blogRouter = Router();

blogRouter.use(validateToken);

blogRouter.get('/getBlog', getAllBlogController);
blogRouter.post('/createBlog', upload.single('image'), createBlogController);
blogRouter.put('/editBlog/:id', upload.single('image'), editBlogController);
blogRouter.delete('/deleteBlog/:id', deleteBlogController);

export default blogRouter;