import { ctrlWrapper } from "../../decorators/index.js";
import { HttpError } from "../../helpers/index.js";
import { User } from "../../models/user.js";

const verifyEmail = async (req, res) => {
  const { verificationToken } = req.params;
  console.log(verificationToken);
  const user = await User.findOne({ verificationToken });
  console.log(user);

  if (!user) throw HttpError(404, "User not found");
  await User.findByIdAndUpdate(user._id, {
    verify: true,
    verificationToken: "",
  });

  res.json({
    message: "Verification successful",
  });
};

export default ctrlWrapper(verifyEmail);
