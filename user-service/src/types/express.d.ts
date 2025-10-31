import { IUSER } from "../model/user.model";

declare global {
  namespace Express {
    interface Request {
      user?: IUSER; // optional if user might be undefined
    }
  }
}
