import { Router } from "express";
import { getCategoriesController } from "#app/controllers/category-controller.js";

const categoryRouter = Router();

categoryRouter.get("/", getCategoriesController);

export default categoryRouter;
