const currentUserController = async (req, res, next) => {
  try {
    const { email, subscription } = req.user;

    res.json({ email, subscription });
  } catch (err) {
    next(err);
  }
};

export default currentUserController;
