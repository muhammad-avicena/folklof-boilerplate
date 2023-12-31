import cors, { CorsOptions } from "cors";
import { Application, Request } from "express";
import StandardError from "../utils/constants/standardError";

const origin = [
  "https://week15-api-avicena-dev.cyclic.cloud",
  "https://week15.avicena.dev",
  "http://localhost:5173",
];

const corsOptionsDelegate = (
  req: Request | any,
  callback: (err: Error | null, options?: CorsOptions) => void
) => {
  const clientOrigin = origin.includes(req.header("Origin"));

  if (clientOrigin) {
    callback(null, {
      origin: true,
      methods: "GET,POST,DELETE,PUT,OPTIONS,HEAD",
    });
  } else {
    callback(
      new StandardError({
        success: false,
        message: "Not allowed by CORS",
        status: 403,
      })
    );
  }
};

const corsMiddleware = (app: Application) => {
  app.use(cors());
};

export default corsMiddleware;