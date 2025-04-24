import Joi from "joi";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../../models/user.js";
import HttpError from "../../utils/HttpError.js";

const loginSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().required(),
});

const loginController = async (req, res, next) => {
  try {
    const { error } = loginSchema.validate(req.body);
    if (error) throw HttpError(400, error.message);

    const { email, password } = req.body;
    const user = await User.findOne({ where: { email } });
    if (!user) throw HttpError(401, "Email or password is wrong");

    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) throw HttpError(401, "Email or password is wrong");

    const payload = { id: user.id };
    const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: "24h" });

    user.token = token;
    await user.save();

    res.json({
      token,
      user: {
        email: user.email,
        subscription: user.subscription,
      },
    });
  } catch (err) {
    next(err);
  }
};

export default loginController;
