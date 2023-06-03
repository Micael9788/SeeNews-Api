import { Request, Response } from "express";
import path from "path";

const DocsApiControllers = (req: Request, res: Response) => {
  try {
    
    
    const pathFile = path.join(__dirname, "..", "..", "html", "docs.html");
    return res.status(200).sendFile(pathFile);
    
    
  } catch (error) {
    
    
    return res.status(404).json(
      {
        success: false,
        status: 404,
        message: "error when getting the docs from the api",
      }
    );
    
    
  }
};


const PrivacidadeApiControllers = (req: Request, res: Response) => {
  try {
    
    
    const pathFile = path.join(__dirname, "..", "..", "html", "privacidade.html");
    return res.status(200).sendFile(pathFile);
    
    
  } catch (error) {
    
    
    return res.status(404).json(
      {
        success: false,
        status: 404,
        message: "error when getting the privacidade from the api",
      }
    );
  }
};


const SuporteApiControllers = (req: Request, res: Response) => {
  try {
    
    
    const pathFile = path.join(__dirname, "..", "..", "html", "suporte.html");
    return res.status(200).sendFile(pathFile);
    
    
  } catch (error) {
    
    
    return res.status(404).json(
      {
        success: false,
        status: 404,
        message: "error when getting the suporte from the api",
      }
    );
    
    
  }
};


export { DocsApiControllers, PrivacidadeApiControllers, SuporteApiControllers }
