import HttpError from "../../utils/HttpError.js";

const logoutController = async (req, res, next) => {
  try {
    const user = req.user;

    if (!user) throw HttpError(401, "Not authorized");

    user.token = null;
    await user.save();

    res.status(204).send();
  } catch (err) {
    next(err);
  }
};

export default logoutController;
