import { ctrlWrapper } from "../../decorators/index.js";
import { Contact } from "../../models/contact.js";

const addContact = async (req, res) => {
  const { _id } = req.user;
  const contact = await Contact.create({ ...req.body, owner: _id });
  res.status(201).json(contact);
};

export default ctrlWrapper(addContact);
