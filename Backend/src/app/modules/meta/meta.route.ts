import { Router } from "express";
import { MetaControllers } from "./meta.controller.js";

const router = Router();

/**
 * @openapi
 * /api/meta/stats:
 *   get:
 *     tags: [Meta]
 *     summary: Get dashboard aggregate stats
 *     responses:
 *       200:
 *         description: Dashboard stats aggregated successfully
 */

router.get("/stats", MetaControllers.getStats);

export const MetaRoutes = router;
