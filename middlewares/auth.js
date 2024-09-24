import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import { HttpError } from "../helpers/HttpError.js";
import User from "../models/User.js";

dotenv.config();
const { JWT_SECRET } = process.env;

export const auth = async (req, res, next) => {
  const { authorization = "" } = req.headers;
  const [bearer, token] = authorization.split(" ");
  if (bearer !== "Bearer") {
    throw HttpError(401);
  }

  try {
    const { id } = jwt.verify(token, JWT_SECRET);
    const user = await User.findById(id);
    if (!user || !user.token) {
      return next(HttpError(401, `User not found`));
    }

    req.user = user;
    next();
  } catch (error) {
    return next(HttpError(401, error.message));
  }
};
