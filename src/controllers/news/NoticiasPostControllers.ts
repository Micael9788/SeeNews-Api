import { Request, Response } from "express";

import newsPostValidation from "@/validations/NoticiasApiValidation";
import newsPostSchema from "@/schemas/NoticiasApiSchemas";

export default async function noticiasPost(req: Request, res: Response) {
    try {
      
      
      const { 
       title, 
       description,
       creator,
       liked, 
       date, 
       url,
       share,
       image
       } = await newsPostValidation.parseAsync(req.body);

      const noticia = {
       title, 
       description,
       creator,
       liked, 
       date, 
       url,
       share,
       image
      }

      await newsPostSchema.create(noticia)

      return res.status(200).json(
        {
           success: true,
           status: 200,
           message: "successfully",
           noticia,
        }
      );
      
      
    } catch (error) {
      
      
      return res.status(404).json(
        {
          success: false,
          status: 404,
          message: "error when posting news",
        }
      );
    }
    
    
  }