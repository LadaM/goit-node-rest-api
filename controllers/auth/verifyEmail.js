import User from '../../models/user.js';

const verifyEmail = async (req, res) => {
  const { verificationToken } = req.params;
  const user = await User.findOne({ where: { verificationToken }});

  if (!user) {
    return res.status(404).json({ message: 'User not found' });
  }

  user.verify = true;
  user.verificationToken = null;
  await user.save();

  res.json({ message: 'Verification successful' });
};

export default verifyEmail;
