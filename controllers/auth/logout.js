import { ctrlWrapper } from "../../decorators/index.js";
import { User } from "../../models/user.js";

const logout = async (req, res) => {
  await User.findByIdAndUpdate(req.user._id, { token: null });
  res.status(204).json({ message: "No content" });
};

export default ctrlWrapper(logout);
