import bcrypt from "bcrypt";
import Joi from "joi";
import User from "../../models/user.js";
import HttpError from "../../utils/HttpError.js";

const registerSchema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().min(6).required(),
});

const registerController = async (req, res, next) => {
    try {
        const {error} = registerSchema.validate(req.body);
        if (error) throw HttpError(400, error.message);

        const {email, password} = req.body;
        const userExists = await User.findOne({where: {email}});
        if (userExists) throw HttpError(409, "Email in use");

        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = await User.create({email, password: hashedPassword});

        res.status(201).json({
            user: {
                email: newUser.email,
                subscription: newUser.subscription,
            },
        });
    } catch (err) {
        console.error("Registration error:", err);
        next(err);
    }
};

export default registerController;
