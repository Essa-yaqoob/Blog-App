import jwt, { JwtPayload } from "jsonwebtoken";

export const generateJwtToken = (id: string) => {
  const token = jwt.sign({ id }, process.env.JWT_SECRET as string, {
    expiresIn: "1d",
  });
  return token;
};

export const verifyJwtToken = (token: string): JwtPayload | null => {
  try {
    const decodeToken = jwt.verify(token, process.env.JWT_SECRET as string);
    if (typeof decodeToken === "string") return null;
    return decodeToken as JwtPayload;
  } catch (error) {
    console.log("JWT verification has been failed", error);
    return null;
  }
};
