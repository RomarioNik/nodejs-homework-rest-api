import { ctrlWrapper } from "../../decorators/index.js";
import { Contact } from "../../models/contact.js";

const add = async (req, res) => {
  const contact = await Contact.create(req.body);
  res.status(201).json(contact);
};

export const addContact = ctrlWrapper(add);