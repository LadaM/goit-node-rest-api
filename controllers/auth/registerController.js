import Joi from "joi";
import bcrypt from "bcrypt";
import {nanoid} from "nanoid";
import User from "../../models/user.js";
import HttpError from "../../utils/HttpError.js";
import {sendEmail} from "../../services/emailService.js"; // adjust if your path differs

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

        const verificationToken = nanoid();

        const newUser = await User.create({
            email,
            password: hashedPassword,
            subscription: "starter", // default subscription
            verify: false,
            verificationToken,
        });

        const verifyLink = `${process.env.BASE_URL}/auth/verify/${verificationToken}`;
        await sendEmail({
            to: email,
            subject: "Verify your email",
            html: `<a target="_blank" href="${verifyLink}">Click here to verify your email</a>`,
        });

        res.status(201).json({
            message: "User registered. Please check your email to verify your account.",
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
