import { HttpError } from "../helpers/HttpError.js";

export const isEmptyBody = async (req, res, next) => {
  const keys = Object.keys(req.body);
  if (keys.length === 0) {
    return next(HttpError(400, "Body must be field"));
  }
};
