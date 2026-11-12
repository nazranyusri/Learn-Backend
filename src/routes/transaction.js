import { Router } from "express";
import { getTransactionsController } from "#app/controllers/transaction-controller.js";

const transactionRouter = Router();

transactionRouter.get("/", getTransactionsController);

export default transactionRouter;
