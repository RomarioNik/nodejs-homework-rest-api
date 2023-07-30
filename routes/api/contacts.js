import express from "express";
import { schemas } from "../../models/contact.js";
import { validateBody } from "../../decorators/index.js";
import { isValidId } from "../../middlewares/index.js";
import { authenticate } from "../../middlewares/index.js";
import {
  getAllContacts,
  getContactById,
  addContact,
  deleteContactById,
  updateContactById,
  updateStatusContact,
} from "../../controllers/contacts/index.js";

const contactsRouter = express.Router();
contactsRouter.use(authenticate);

contactsRouter.get("/", getAllContacts);

contactsRouter.get("/:id", isValidId, getContactById);

contactsRouter.post("/", validateBody(schemas.addSchema), addContact);

contactsRouter.delete("/:id", isValidId, deleteContactById);

contactsRouter.put(
  "/:id",
  isValidId,
  validateBody(schemas.addSchema),
  updateContactById
);

contactsRouter.patch(
  "/:id/favorite",
  isValidId,
  validateBody(schemas.updateStatusContactSchema),
  updateStatusContact
);

export default contactsRouter;
