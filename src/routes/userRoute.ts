import { Router } from "express";
import { getUser } from "../controllers/userController.js";

const route = Router();

route.post("/", getUser);

export default route;
