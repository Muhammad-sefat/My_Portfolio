import { Router } from "express";
import { ProjectRoutes } from "../modules/project/project.route.js";
import { BlogRoutes } from "../modules/blog/blog.route.js";
import { ContactRoutes } from "../modules/contact/contact.route.js";
import { MetaRoutes } from "../modules/meta/meta.route.js";

const router = Router();

const moduleRoutes = [
  { path: "/projects", route: ProjectRoutes },
  { path: "/blogs", route: BlogRoutes },
  { path: "/contacts", route: ContactRoutes },
  { path: "/meta", route: MetaRoutes },
];

moduleRoutes.forEach((route) => router.use(route.path, route.route));

export default router;
