import { NextFunction, Request, Response } from "express";
import { verifyUserToken } from "@/auth/GenerateUserToken";
import UserApiSchema from "@/schemas/UserApiSchema";
import jwt from "jsonwebtoken";

interface IJwt extends jwt.JwtPayload {
  id: string;
}

export const authentication = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { authorization } = req.headers;

    if (!authorization) {
      return res.status(401).json({
        success: false,
        message: "you are not authorized to access",
      });
    }

    const token = authorization.replace("Bearer", "").trim();

    const data = verifyUserToken(token);

    const { id } = data as IJwt;

    const user = await UserApiSchema.findById(id);

    if (!user) {
      return res.status(401).json({
        success: false,
        message: "user not found",
      });
    }

    const userId: string = String(user._id);

    if (userId !== id) {
      return res.status(401).json({
        success: false,
        message: "unauthorized user",
      });
    }

    next();
  } catch (error) {
    console.log(error);

    return res.status(401).json({
      success: false,
      message: "failed to authenticate user",
    });
  }
};
