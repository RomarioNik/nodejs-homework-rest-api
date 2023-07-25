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

contactsRouter.get("/", authenticate, getAllContacts);

contactsRouter.get("/:id", authenticate, isValidId, getContactById);

contactsRouter.post(
  "/",
  authenticate,
  validateBody(schemas.addSchema),
  addContact
);

contactsRouter.delete("/:id", authenticate, isValidId, deleteContactById);

contactsRouter.put(
  "/:id",
  authenticate,
  isValidId,
  validateBody(schemas.addSchema),
  updateContactById
);

contactsRouter.patch(
  "/:id/favorite",
  authenticate,
  isValidId,
  validateBody(schemas.updateStatusContactSchema),
  updateStatusContact
);

export default contactsRouter;
