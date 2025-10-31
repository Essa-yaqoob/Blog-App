// import { User } from "../model/user.model";
// import { HttpStatusCode } from "../utils/HttpStatusCode";
// import { verifyJwtToken } from "../utils/Jwt";
// import { TryCatch } from "../utils/TryCatch";

import { HttpStatusCode } from "../../utils/HttpStatusCode";
import { verifyJwtToken } from "../../utils/Jwt";
import { TryCatch } from "../../utils/TryCatch";

export const authMiddleware = TryCatch(async (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1] || req.cookies?.token;

  if (!token) {
    return res.status(HttpStatusCode.UNAUTHORIZED).json({
      message: "Unauthorized",
    });
  }

  const decodedToken = verifyJwtToken(token);

  if (!decodedToken) {
    return res.status(HttpStatusCode.UNAUTHORIZED).json({
      message: "Invalid Token",
    });
  }

  // const user = await User.findById(decodedToken.id);

  //! need to fix later
  //@ts-ignore
  req.userId = decodedToken.id;

  next();
});
