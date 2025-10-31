import { NextFunction, Request, RequestHandler, Response } from "express";
import { HttpStatusCode } from "./HttpStatusCode";

export const TryCatch = (handlerFn: RequestHandler) => {
  return async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      await handlerFn(req, res, next);
    } catch (error: any) {
      res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).json({
        message: error.message || "Something went wrong",
      });
      return;
    }
  };
};
