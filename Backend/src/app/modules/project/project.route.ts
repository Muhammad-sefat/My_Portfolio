import { Router } from "express";
import validateRequest from "../../middlewares/validateRequest";
import { ProjectControllers } from "./project.controller";
import { ProjectValidations } from "./project.validation";

const router = Router();

/**
 * @openapi
 * /api/projects:
 *   get:
 *     tags: [Projects]
 *     summary: Get all projects
 *     responses:
 *       200:
 *         description: Projects retrieved successfully
 */

router.get("/", ProjectControllers.getAllProjects);

/**
 * @openapi
 * /api/projects:
 *   post:
 *     tags: [Projects]
 *     summary: Create a new project
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *                 example: "E-Commerce Platform"
 *               description:
 *                 type: string
 *                 example: "Full-featured shopping app"
 *               image:
 *                 type: string
 *                 example: "https://picsum.photos/seed/ecommerce/800/600"
 *               liveUrl:
 *                 type: string
 *                 example: "https://example.com"
 *               githubUrl:
 *                 type: string
 *                 example: "https://github.com"
 *               tags:
 *                 type: array
 *                 items:
 *                   type: string
 *                 example: ["React", "Node.js", "MongoDB"]
 *     responses:
 *       201:
 *         description: Project uploaded successfully
 */

router.post(
  "/",
  validateRequest(ProjectValidations.createProjectValidationSchema),
  ProjectControllers.addProject
);

/**
 * @openapi
 * /api/projects/{id}:
 *   put:
 *     tags: [Projects]
 *     summary: Update a project by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema: { type: string }
 *         description: Project ID
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
 *               description:
 *                 type: string
 *                 example: "Updated description"
 *               image:
 *                 type: string
 *                 example: "https://picsum.photos/seed/new/800/600"
 *               liveUrl:
 *                 type: string
 *                 example: "https://example.com"
 *               githubUrl:
 *                 type: string
 *                 example: "https://github.com"
 *               tags:
 *                 type: array
 *                 items:
 *                   type: string
 *                 example: ["React", "TypeScript"]
 *     responses:
 *       200:
 *         description: Project updated successfully
 */

router.put(
  "/:id",
  validateRequest(ProjectValidations.updateProjectValidationSchema),
  ProjectControllers.updateProject
);

/**
 * @openapi
 * /api/projects/{id}:
 *   delete:
 *     tags: [Projects]
 *     summary: Delete a project by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema: { type: string }
 *         description: Project ID
 *     responses:
 *       200:
 *         description: Project deleted successfully
 */

router.delete("/:id", ProjectControllers.deleteProject);

export const ProjectRoutes = router;
