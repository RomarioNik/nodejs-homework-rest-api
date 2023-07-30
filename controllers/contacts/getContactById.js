import { HttpError } from "../../helpers/index.js";
import { ctrlWrapper } from "../../decorators/index.js";
import { Contact } from "../../models/contact.js";

const getContactById = async (req, res) => {
  const { id } = req.params;
  const contact = await Contact.findById(id);
  if (!contact) throw HttpError(404);
  res.json(contact);
};

export default ctrlWrapper(getContactById);
