import { Request, Response } from "express";


import newsPostSchema from "@/schemas/NoticiasApiSchemas";

export default async function noticiasList(req: Request, res: Response) {
    try {
      
      
      const { limit, oder, page } = req.query;

      const noticias = await newsPostSchema
        .find({})
        .limit(Number(limit) || 10)
        .sort({ createdAt: oder as "desc" | "asc" })
        .skip(Number(page) || 1)
         
         
      return res.status(200).json(
        {
          success: true,
          status: 200,
          message: "here is the list of news",
          noticias,
       }
      );
      
      
    } catch (error) {
      
      
      return res.status(404).json(
        {
          success: false,
          status: 404,
          message: "Error when fetching news",
        }
      );
      
      
    }
  }