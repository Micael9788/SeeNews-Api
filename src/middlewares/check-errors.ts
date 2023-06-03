import { Request, Response, NextFunction } from "express";
import path from "path";

const errorHandlerApi = (error: any, req: Request, res: Response, next: NextFunction) => {
  if (error) {
    const pathFile = path.join(__dirname, "html", "404.html");
    return res.status(404).sendFile(pathFile);
  }
  next();
};

export default errorHandlerApi;