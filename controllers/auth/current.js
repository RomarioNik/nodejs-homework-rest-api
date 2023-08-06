import { ctrlWrapper } from "../../decorators/index.js";

const current = async (req, res) => {
  const { email, subscription } = req.user;
  res.json({ email, subscription });
};

export default ctrlWrapper(current);
