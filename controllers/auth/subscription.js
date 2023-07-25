import { ctrlWrapper } from "../../decorators/index.js";
import { HttpError } from "../../helpers/index.js";
import { User } from "../../models/user.js";

const subs = async (req, res) => {
  const { _id } = req.user;
  const result = await User.findByIdAndUpdate(_id, req.body, {
    new: true,
  });
  if (!result) throw HttpError(400);
  res.json(result);
};

export const subscription = ctrlWrapper(subs);
