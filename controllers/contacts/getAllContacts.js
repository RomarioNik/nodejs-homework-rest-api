import { ctrlWrapper } from "../../decorators/index.js";
import { Contact } from "../../models/contact.js";

const getAll = async (req, res) => {
  const contacts = await Contact.find();
  res.json(contacts);
};

export const getAllContacts = ctrlWrapper(getAll);
