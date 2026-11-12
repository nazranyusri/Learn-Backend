import { Router } from "express";
import {
  getAccountsController,
  getAccountByIdController,
  createAccountController,
  updateAccountController,
  deleteAccountController,
} from "#app/controllers/index.js";

const accountRouter = Router();

accountRouter.get("/", getAccountsController);
accountRouter.get("/:accountId", getAccountByIdController);
accountRouter.post("/", createAccountController);
accountRouter.patch("/:accountId", updateAccountController);
accountRouter.delete("/:accountId", deleteAccountController);

export default accountRouter;
