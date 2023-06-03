import express, { Request, Response, Application, NextFunction } from "express";
import { config } from "dotenv";
import morgan from "morgan";
import helmet from "helmet";
import cors from "cors";
import path from "path";

import mongooseHandlerApi from "@/database/mongo-conect";
import errorHandlerApi from "@/middlewares/check-errors";
import router from "@/router/router";

config();

const app: Application = express();

if (process.env.DEBUG) {
  app.use(morgan("dev"));
}

app.use(express.static(path.resolve(__dirname, "public")));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(helmet());
app.use(
  cors({
    origin: "*",
  })
);

app.use(errorHandlerApi);
app.use(router);

app.use((req: Request, res: Response, next: NextFunction) => {
  
  const pathFile = path.join(__dirname, "html", "404.html");
  return res.status(404).sendFile(pathFile);
  
});

const port = Number(process.env.PORT || 3333);

const startServer = async () => {
  try {
    
    
    await mongooseHandlerApi();
    app.emit("connected");
    
    
  } catch (error) {
    
    
    console.log(error);
    
    
  }
};

app.listen(port, startServer);

app.on("connected", () => {
  
  
  console.log(`Server running on port ${port}`);
  
  
});
