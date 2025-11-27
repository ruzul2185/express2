import { Router } from "express";
import { getUser } from "../controllers/userController.js";

const route = Router();

route.get("/", getUser);

export default route;
