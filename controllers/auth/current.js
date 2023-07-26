import { ctrlWrapper } from "../../decorators/index.js";

const getCurrent = async (req, res) => {
  const { email, subscription } = req.user;
  res.json({ email, subscription });
};

export const current = ctrlWrapper(getCurrent);
