import { Router, type IRouter } from "express";
import brandRouter from "./brand";
import healthRouter from "./health";

const router: IRouter = Router();

router.use(healthRouter);
router.use(brandRouter);

export default router;
