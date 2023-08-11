import { ctrlWrapper } from "../../decorators/index.js";
import { HttpError, sendEmail } from "../../helpers/index.js";
import { User } from "../../models/user.js";

const resendVerifyToken = async (req, res) => {
  const { email } = req.body;
  const user = await User.findOne({ email });

  if (!user) throw HttpError(404, "User not found");

  if (user.verify) throw HttpError(400, "Verification has already been passed");

  const verifyEmail = {
    to: email,
    subject: "Email verification link",
    html: `<div>
    <p><strong>Email verification link</strong></p>
    <a target="_blanc" href="${process.env.BASE_URL}/api/users/verify/${user.verificationToken}">Click to verify your email</a>
    </div>`,
  };

  await sendEmail(verifyEmail);

  res.json({
    message: "Verification email sent",
  });
};

export default ctrlWrapper(resendVerifyToken);
