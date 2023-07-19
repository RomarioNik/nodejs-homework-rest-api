import express from "express";

import contactsControllers from "../../controllers/contacts-controllers.js";
import schemas from "../../schemas/contacts-schemas.js";
import { validateBody } from "../../decorators/index.js";

const contactsRouter = express.Router();

contactsRouter.get("/", contactsControllers.getAll);

contactsRouter.get("/:id", contactsControllers.getById);

contactsRouter.post(
  "/",
  validateBody(schemas.contactsSchema),
  contactsControllers.add
);

contactsRouter.delete("/:id", contactsControllers.deleteById);

contactsRouter.put(
  "/:id",
  validateBody(schemas.contactsSchema),
  contactsControllers.updateById
);

export default contactsRouter;
