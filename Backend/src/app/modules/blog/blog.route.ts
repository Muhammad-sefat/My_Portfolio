import { Router } from "express";
import validateRequest from "../../middlewares/validateRequest";
import { BlogControllers } from "./blog.controller";
import { BlogValidations } from "./blog.validation";

const router = Router();

router.get("/", BlogControllers.getAllBlogs);
router.get("/:id", BlogControllers.getBlogById);

router.post(
  "/",
  validateRequest(BlogValidations.createBlogValidationSchema),
  BlogControllers.addBlog
);

router.put(
  "/:id",
  validateRequest(BlogValidations.updateBlogValidationSchema),
  BlogControllers.updateBlog
);

router.delete("/:id", BlogControllers.deleteBlog);

export const BlogRoutes = router;
