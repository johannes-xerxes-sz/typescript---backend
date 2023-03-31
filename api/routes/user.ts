import express, { Request, Response, Router } from "express";
import {
  getUsers,
  postUser,
  deleteUsers,
  getUser,
  updateUser,
  deleteUser,
} from "../controllers/userController";
import reqRecievedLogger from "../middlewares/reqReceivedLogger";
import { userValidator, adminValidator } from "../middlewares/utils/validators";

const router: Router = express.Router();

router.route("/")
  .get(reqRecievedLogger, adminValidator, getUsers)
  .post(reqRecievedLogger, userValidator, postUser)
  .delete(reqRecievedLogger, deleteUsers);

router.route("/:userId")
  .get(reqRecievedLogger, getUser)
  .put(reqRecievedLogger, updateUser)
  .delete(reqRecievedLogger, deleteUser);

export default router;
