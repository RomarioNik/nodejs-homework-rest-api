import { ctrlWrapper } from "../../decorators/index.js";
import { Contact } from "../../models/contact.js";

const getAll = async (req, res) => {
  const { _id: owner } = req.user;
  const { page = 1, limit = 20, favorite = { $ne: null } } = req.query;
  const skip = (page - 1) * limit;
  const contacts = await Contact.find({
    owner,
    favorite: favorite,
  })
    .skip(skip)
    .limit(limit)
    .populate("owner", "email subscription");
  console.log(owner, favorite);
  res.json(contacts);
};

export const getAllContacts = ctrlWrapper(getAll);
