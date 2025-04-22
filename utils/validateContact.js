export const validateCreateContact = (req, res, next) => {
  const {name, email, phone} = req.body;
  if (!name || !email || !phone) {
    return res.status(400).json({message: "Missing required fields"});
  }
  next();
};


export const validateUpdateContact = (req, res, next) => {
  const {name, email, phone} = req.body;

  if (!name && !email && !phone) {
    return res.status(400).json({message: "At least one field (name, email, phone) is required"});
  }

  if (email && !/^\S+@\S+\.\S+$/.test(email)) {
    return res.status(400).json({message: "Invalid email format"});
  }

  next();
};

