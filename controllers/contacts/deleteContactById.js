import { HttpError } from "../../helpers/index.js";
import { ctrlWrapper } from "../../decorators/index.js";
import { Contact } from "../../models/contact.js";

const deleteById = async (req, res) => {
  const { id } = req.params;
  const contact = await Contact.findByIdAndRemove(id);
  if (!contact) throw HttpError(404);

  res.status(200).json({
    message: "contact deleted",
  });
};

export const deleteContactById = ctrlWrapper(deleteById);