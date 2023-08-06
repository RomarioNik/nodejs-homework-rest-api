import bcrypt from "bcrypt";
import garavatar from "gravatar";
import { ctrlWrapper } from "../../decorators/index.js";
import { HttpError } from "../../helpers/index.js";
import { User } from "../../models/user.js";

const register = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.find({ email });

  if (!user) throw HttpError(409, "Email in use");

  const createHashPassword = await bcrypt.hash(password, 10);

  const avatarURL = garavatar.url(email);

  const newUser = await User.create({
    ...req.body,
    password: createHashPassword,
    avatarURL,
  });

  res.status(201).json({
    user: {
      email: newUser.email,
      subscription: newUser.subscription,
    },
  });
};

export default ctrlWrapper(register);
