import { Response, Request } from "express";
import crypto from "crypto";
import { z } from "zod";

import userSchema from "@/schemas/UserApiSchema";


const userValidation = z.object(
  {
    
    
    user: z.string({
       required_error: "username is mandatory",
       invalid_type_error: "username must be a string"
    }).trim().min(5).max(45),
  
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


export default async function register(req: Request, res: Response) {
  try {
    
    const { user, email, password } = await userValidation.parseAsync(req.body);

    const userExist = await userSchema.findOne({ email: email });

    if (userExist) {
      
      return res.status(400).json(
        {
         success: false,
         status: 400,
         message: 'An account already exists for that email address',
        }
     );
     
    }

    const cryptoPass = hashPassword(password);

    const usuario = {
      user,
      email,
      password: cryptoPass
    };

    await userSchema.create(usuario);

    return res.status(200).json(
      {
       success: true,
       message: "successfully", 
       email: usuario?.email
      }
    );
    
    
  } catch (error) {
    
    
    if (error instanceof z.ZodError) {
       return res.status(400).json(
        {
          success: false,
          message: error.issues.map(issue => issue.message),
        }
      )
    }
    
    return res.status(400).json(
      {
      success: false,
      status: 400,
      message: 'error when registering user',
     }
    );
    
    
  }
}


function hashPassword(password: string): string {
  
  const salt = crypto.randomBytes(16).toString('hex');
  const hash = crypto.scryptSync(password, salt, 64).toString('hex');
  return salt + ':' + hash;
  
}