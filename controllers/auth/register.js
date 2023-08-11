import bcrypt from "bcrypt";
import garavatar from "gravatar";
import { nanoid } from "nanoid";
import { ctrlWrapper } from "../../decorators/index.js";
import { HttpError } from "../../helpers/index.js";
import { User } from "../../models/user.js";
import { sendEmail } from "../../helpers/index.js";

const register = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.find({ email });

  if (!user) throw HttpError(409, "Email in use");

  const createHashPassword = await bcrypt.hash(password, 10);

  const avatarURL = garavatar.url(email);
  const verificationToken = nanoid();

  const newUser = await User.create({
    ...req.body,
    password: createHashPassword,
    avatarURL,
    verificationToken,
  });

  const verifyEmail = {
    to: email,
    subject: "Email verification link",
    html: `<div>
    <p><strong>Email verification link</strong></p>
    <a target="_blanc" href="${process.env.BASE_URL}/api/users/verify/${verificationToken}">Click to verify your email</a>
    </div>`,
  };

  await sendEmail(verifyEmail);

  res.status(201).json({
    user: {
      email: newUser.email,
      subscription: newUser.subscription,
    },
  });
};

export default ctrlWrapper(register);
