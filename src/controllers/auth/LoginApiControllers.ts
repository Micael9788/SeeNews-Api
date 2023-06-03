import { Request, Response } from "express";
import crypto from "crypto";
import { z } from "zod";

import { generateUserToken } from "@/auth/GenerateUserToken";
import userSchema from "@/schemas/UserApiSchema";


const userValidation = z.object(
  {
    
    
   email: z.string({
      required_error: "email is mandatory",
      invalid_type_error: "email must be a string"
   }).trim().min(5).max(45),
   
  password: z.string({
     required_error: "password is mandatory",
     invalid_type_error: "password must be a string"
  }).trim().min(5).max(14)
  
  
 }
);


export default async function login(req: Request, res: Response) {
  try {
    
    const { email, password } = await userValidation.parseAsync(req.body);

    const usuario = await userSchema.findOne({ email: email });

    if (!usuario) {
      
      return res.status(400).json(
        {
          success: false,
          status: 400,
          message: "user does not exist in our database",
        }
      );
      
    }

    const passInvalid = verifyPassword(password, usuario.password);

    if (!passInvalid) {
      
      return res.status(401).json(
        {
          success: false,
          status: 401,
          message: "Your password is incorrect",
        }
      );
    }

    const token = generateUserToken({ id: usuario._id, expiresIn: "30d" });

    if (!token) {
      throw new Error("failed to make access token");
    }

    return res.status(200).json(
      {
        authenticated: true,
        success: true,
        status: 200,
        message: "login successful",
        email: usuario?.email,
        token
      }
    );
    
    
  } catch (error) {
  
  
    return res.status(400).json(
      {
        success: false,
        status: 400,
        message: "user login failure",
      }
    );
  }
  
  
}

function verifyPassword(password: string, original: string): boolean {
  
  const parts = original.split(":");
  const salt = parts[0];
  const hash = crypto.scryptSync(password, salt, 64).toString("hex");
  return hash === parts[1];
  
}
