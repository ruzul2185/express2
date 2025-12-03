import type { Request, Response, NextFunction } from "express";
import jsonwebtoken from "jsonwebtoken";

const authentication = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const auth = req.headers.authorization;
    const token = auth?.split(" ")[1];
    if (!token) {
      return res.status(403).json({ success: false, error: "Unauthorized" });
    }

    jsonwebtoken.verify(token, process.env.JWT_SECRET!);

    next();
  } catch (error) {
    console.log(error);
    return res.status(400).json({ success: false, error });
  }
};

export default authentication;
