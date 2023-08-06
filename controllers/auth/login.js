import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { HttpError } from "../../helpers/index.js";
import { User } from "../../models/user.js";
import { ctrlWrapper } from "../../decorators/index.js";

const { SECRET_KEY } = process.env;

const login = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });

  if (!user) throw HttpError(401, "Email or password is not valid");

  const isPasswordValid = await bcrypt.compare(password, user.password);
  if (!isPasswordValid) throw HttpError(401, "Email or password is not valid");

  const payload = {
    id: user._id,
  };

  const token = jwt.sign(payload, SECRET_KEY, { expiresIn: "23h" });
  await User.findByIdAndUpdate(user._id, { token });
  res.json({
    token,
    user: {
      email: user.email,
      subscription: user.subscription,
    },
  });
};

export default ctrlWrapper(login);
