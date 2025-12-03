import { Router } from "express";
import {
  createUser,
  deleteUser,
  getSingleUser,
  getUser,
  patchUser,
} from "../controllers/userController.js";
import authentication from "../utils/authentication.js";

const route = Router();

route.get("/", authentication, getUser);
route.get("/:id", getSingleUser);
route.post("/", createUser);
route.patch("/", patchUser);
route.delete("/:id", deleteUser);

export default route;
