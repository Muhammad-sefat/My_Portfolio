import { Router } from "express";
import { ProjectRoutes } from "../modules/project/project.route";
import { BlogRoutes } from "../modules/blog/blog.route";
import { ContactRoutes } from "../modules/contact/contact.route";
import { MetaRoutes } from "../modules/meta/meta.route";

const router = Router();

const moduleRoutes = [
  { path: "/projects", route: ProjectRoutes },
  { path: "/blogs", route: BlogRoutes },
  { path: "/contacts", route: ContactRoutes },
  { path: "/meta", route: MetaRoutes },
];

moduleRoutes.forEach((route) => router.use(route.path, route.route));

export default router;
