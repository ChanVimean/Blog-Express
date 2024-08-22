import { Router } from "express";
import { validateToken } from '../utils/jwt_validate.js';
import { GetAllBlogController, createBlogController,
         editBlogController, deleteBlogController } from '../controller/blog_Controller.js';

const blogRouter = Router();

blogRouter.use(validateToken);

// Get/Show user blog
blogRouter.get('/getBlog', GetAllBlogController);

// Post/Create a new blog
blogRouter.post('/createBlog', createBlogController);

// Put/Update existing blog by param(/:id)
blogRouter.put('/editBlog/:id', editBlogController);

// Delete existing blog
blogRouter.delete('/deleteBlog/:id', deleteBlogController);

export default blogRouter;