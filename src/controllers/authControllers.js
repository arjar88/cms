const User = require("../models/User");
const jwt = require("jsonwebtoken");

const maxAge = 3 * 24 * 60 * 60;
const createToken = (id) => {
  return jwt.sign({ id }, "super secret string", { expiresIn: maxAge });
};

const handleErrors = (err) => {
  let errors = { email: "", password: "" };
  // duplicate email error
  if (err.code === 11000) {
    errors.email = "that email is already registered";
    return errors;
  }

  // validation errors
  if (err.message.includes("user validation failed")) {
    Object.values(err.errors).forEach(({ properties }) => {
      errors[properties.path] = properties.message;
    });
  }

  return errors;
};

const signUp = async (req, res) => {
  try {
    const { email, password, role } = req.body;

    const user = await User.create({ email, password, role });
    await user.save();
    const token = createToken(user._id);

    res.cookie("jwt", token, { httpOnly: true, maxAge: maxAge });
    res.status(200).json({ user: user._id });
  } catch (error) {
    const errors = handleErrors(error);
    res.status(400).json({ errors });
  }
};

module.exports = {
  signUp,
};
