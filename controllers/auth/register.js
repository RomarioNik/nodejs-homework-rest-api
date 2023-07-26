import bcrypt from "bcrypt";
import { ctrlWrapper } from "../../decorators/index.js";
import { HttpError } from "../../helpers/index.js";
import { User } from "../../models/user.js";

const signUp = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.find({ email });

  if (!user) throw HttpError(409, "Email in use");

  const createHashPassword = await bcrypt.hash(password, 10);

  const newUser = await User.create({
    ...req.body,
    password: createHashPassword,
  });

  res.status(201).json({
    user: {
      email: newUser.email,
      subscription: newUser.subscription,
    },
  });
};

export const register = ctrlWrapper(signUp);
