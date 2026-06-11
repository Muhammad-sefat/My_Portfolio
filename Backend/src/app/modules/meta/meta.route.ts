import { Router } from "express";
import { MetaControllers } from "./meta.controller";

const router = Router();

router.get("/stats", MetaControllers.getStats);

export const MetaRoutes = router;
