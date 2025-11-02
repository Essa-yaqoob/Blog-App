import { NextFunction, Request, RequestHandler, Response } from "express";
import { HttpStatusCode } from "./HttpStatusCode";

export const TryCatch = (handlerFn: RequestHandler): RequestHandler => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      await handlerFn(req, res, next);
    } catch (error) {
      return res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).json({
        message:
          error instanceof Error ? error.message : "Something went wrong",
      });
    }
  };
};
