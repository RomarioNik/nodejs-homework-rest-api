import { HttpError } from "../../helpers/index.js";
import { ctrlWrapper } from "../../decorators/index.js";
import { Contact } from "../../models/contact.js";

const updateById = async (req, res) => {
  const { id } = req.params;
  const contact = await Contact.findByIdAndUpdate(id, req.body, { new: true });
  if (!contact) throw HttpError(404);
  res.json(contact);
};

export const updateContactById = ctrlWrapper(updateById);