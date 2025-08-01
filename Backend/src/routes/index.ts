import { Router } from "express";
import userRouter from "./user";
import { listRouter } from "./list";

const rootRouter = Router();

rootRouter.use("/user", userRouter);
rootRouter.use("/user/list",listRouter);

export default rootRouter;
