import Joi from "joi";
import bcrypt from "bcrypt";
import User from "../../models/user.js";
import HttpError from "../../utils/HttpError.js";

const registerSchema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().required(),
});

const registerController = async (req, res, next) => {
    try {
        const {error} = registerSchema.validate(req.body);
        if (error) throw HttpError(400, error.message);

        const {email, password} = req.body;

        const existingUser = await User.findOne({where: {email}});
        if (existingUser) throw HttpError(409, "Email in use");

        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = await User.create({
            email,
            password: hashedPassword,
            subscription: "starter", // default subscription
        });

        res.status(201).json({
            user: {
                email: newUser.email,
                subscription: newUser.subscription,
            },
        });
    } catch (err) {
        next(err);
    }
};

export default registerController;
