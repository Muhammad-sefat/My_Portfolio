import { Router } from "express";
import validateRequest from "../../middlewares/validateRequest";
import { ProjectControllers } from "./project.controller";
import { ProjectValidations } from "./project.validation";

const router = Router();

router.get("/", ProjectControllers.getAllProjects);

router.post(
  "/",
  validateRequest(ProjectValidations.createProjectValidationSchema),
  ProjectControllers.addProject
);

router.put(
  "/:id",
  validateRequest(ProjectValidations.updateProjectValidationSchema),
  ProjectControllers.updateProject
);

router.delete("/:id", ProjectControllers.deleteProject);

export const ProjectRoutes = router;
