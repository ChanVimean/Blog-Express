import { Router } from "express";
import { validateToken } from '../utils/jwt_validate.js';
import { addNewBlogController } from '../controller/blog_Controller.js';

const blogRouter = Router();

blogRouter.use(validateToken);

// Get/Show user blog
blogRouter.get('/getBlog', addNewBlogController);
// Post/Create a new blog

// Put/Update existing blog by param(/:id)

// Delete existing blog

export default blogRouter;