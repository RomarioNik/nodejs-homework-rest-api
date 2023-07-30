import fs from "fs/promises";
import path from "path";
import { ctrlWrapper } from "../../decorators/index.js";
import { User } from "../../models/user.js";
import { processImage } from "../../helpers/index.js";

const avatarsDir = path.resolve("public", "avatars");

const updateAvatar = async (req, res) => {
  const { _id } = req.user;
  const { path: tempUpload, originalname } = req.file;

  const fileName = `${_id}_${originalname}`;
  const resultUpload = path.join(avatarsDir, fileName);

  await fs.rename(tempUpload, resultUpload);
  processImage(resultUpload);

  const avatarURL = path.join("avatars", fileName);
  const newAvatar = await User.findByIdAndUpdate(
    _id,
    { avatarURL },
    { new: true }
  );

  res.json({
    avatarURL: newAvatar.avatarURL,
  });
};

export default ctrlWrapper(updateAvatar);
