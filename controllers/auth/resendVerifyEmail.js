import User from '../../models/user.js';
import {sendEmail} from '../../services/emailService.js';

export const resendVerifyEmail = async (req, res) => {
    const {email} = req.body;
    if (!email) {
        return res.status(400).json({message: 'missing required field email'});
    }

    const user = await User.findOne({email});
    if (!user) {
        return res.status(404).json({message: 'User not found'});
    }

    if (user.verify) {
        return res.status(400).json({message: 'Verification has already been passed'});
    }

    const verifyLink = `${process.env.BASE_URL}/auth/verify/${user.verificationToken}`;

    await sendEmail({
        to: email,
        subject: 'Verify your email',
        html: `<a target="_blank" href="${verifyLink}">Click to verify</a>`,
    });

    res.json({message: 'Verification email sent'});
};
