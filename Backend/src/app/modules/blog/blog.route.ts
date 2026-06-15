import { Router } from "express";
import validateRequest from "../../middlewares/validateRequest.js";
import { BlogControllers } from "./blog.controller.js";
import { BlogValidations } from "./blog.validation.js";

const router = Router();

/**
 * @openapi
 * /api/blogs:
 *   get:
 *     tags: [Blogs]
 *     summary: Get all blog posts
 *     responses:
 *       200:
 *         description: Blogs retrieved successfully
 */

router.get("/", BlogControllers.getAllBlogs);

/**
 * @openapi
 * /api/blogs/{id}:
 *   get:
 *     tags: [Blogs]
 *     summary: Get a single blog post by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema: { type: string }
 *         description: Blog ID
 *     responses:
 *       200:
 *         description: Blog post retrieved successfully
 *       404:
 *         description: Blog post not found
 */

router.get("/:id", BlogControllers.getBlogById);

/**
 * @openapi
 * /api/blogs:
 *   post:
 *     tags: [Blogs]
 *     summary: Create a new blog post
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *                 example: "Why I Chose Next.js"
 *               excerpt:
 *                 type: string
 *                 example: "After working with both, here's why Next.js has become my go-to."
 *               content:
 *                 type: string
 *                 example: "Next.js provides SSR, SSG..."
 *               category:
 *                 type: string
 *                 example: "Next.js"
 *               image:
 *                 type: string
 *                 example: "https://picsum.photos/seed/nextjsblog/800/400"
 *               readTime:
 *                 type: string
 *                 example: "4 min read"
 *               date:
 *                 type: string
 *                 example: "2025-01-15"
 *     responses:
 *       201:
 *         description: Blog post published successfully
 */

router.post(
  "/",
  validateRequest(BlogValidations.createBlogValidationSchema),
  BlogControllers.addBlog
);

/**
 * @openapi
 * /api/blogs/{id}:
 *   put:
 *     tags: [Blogs]
 *     summary: Update a blog post by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema: { type: string }
 *         description: Blog ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *                 example: "Updated Title"
 *               excerpt:
 *                 type: string
 *                 example: "Updated excerpt"
 *               content:
 *                 type: string
 *                 example: "Updated content..."
 *               category:
 *                 type: string
 *                 example: "React"
 *               image:
 *                 type: string
 *                 example: "https://picsum.photos/seed/new/800/400"
 *               readTime:
 *                 type: string
 *                 example: "5 min read"
 *               date:
 *                 type: string
 *                 example: "2025-02-01"
 *     responses:
 *       200:
 *         description: Blog post updated successfully
 */

router.put(
  "/:id",
  validateRequest(BlogValidations.updateBlogValidationSchema),
  BlogControllers.updateBlog
);

/**
 * @openapi
 * /api/blogs/{id}:
 *   delete:
 *     tags: [Blogs]
 *     summary: Delete a blog post by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema: { type: string }
 *         description: Blog ID
 *     responses:
 *       200:
 *         description: Blog post deleted successfully
 */

router.delete("/:id", BlogControllers.deleteBlog);

export const BlogRoutes = router;
