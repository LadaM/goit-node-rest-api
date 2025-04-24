import jwt from "jsonwebtoken";
import User from "../models/user.js";
import HttpError from "../utils/HttpError.js";

const authMiddleware = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization || "";
    const [bearer, token] = authHeader.split(" ");

    if (bearer !== "Bearer" || !token) {
      throw HttpError(401, "Not authorized");
    }

    let payload;
    try {
      payload = jwt.verify(token, process.env.JWT_SECRET);
    } catch {
      throw HttpError(401, "Not authorized");
    }

    const user = await User.findByPk(payload.id);
    if (!user || user.token !== token) {
      throw HttpError(401, "Not authorized");
    }

    req.user = user;
    next();
  } catch (err) {
    next(err);
  }
};

export default authMiddleware;
