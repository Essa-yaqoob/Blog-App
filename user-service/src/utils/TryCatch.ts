import { NextFunction, Request, RequestHandler, Response } from "express";
import { HttpStatusCode } from "./HttpStatusCode";

export const TryCatch = (fn: RequestHandler): RequestHandler => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      await fn(req, res, next);
    } catch (error: any) {
      return res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).json({
        message: error.message || "Something went wrong",
      });
    }
  };
};
