import express from "express";
import Joi from "joi";

import contactsService from "../../models/contacts.js";

const contactsSchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().required(),
  phone: Joi.string().required(),
});

const contactsRouter = express.Router();

contactsRouter.get("/", async (req, res, next) => {
  try {
    const contacts = await contactsService.listContacts();
    res.json(contacts);
  } catch (error) {
    res.status(500).json({
      message: "Server error",
    });
  }
});

contactsRouter.get("/:id", async (req, res, next) => {
  try {
    const { id } = req.params;
    const contact = await contactsService.getById(id);
    if (!contact) throw error;
    res.json(contact);
  } catch (error) {
    res.status(404).json({
      message: "Not found",
    });
  }
});

contactsRouter.post("/", async (req, res, next) => {
  try {
    const { error } = contactsSchema.validate(req.body);
    if (error) throw error;
    const contact = await contactsService.addContact(req.body);
    res.status(201).json(contact);
  } catch (error) {
    res.status(400).json({
      message: "missing required name field",
    });
  }
});

contactsRouter.delete("/:id", async (req, res, next) => {
  try {
    const { id } = req.params;
    const contact = await contactsService.removeContact(id);
    if (!contact) throw error;
    res.status(200).json({
      message: "contact deleted",
    });
  } catch (error) {
    res.status(404).json({
      message: "NOt found",
    });
  }
});

contactsRouter.put("/:id", async (req, res, next) => {
  try {
    const { id } = req.params;
    const { error } = contactsSchema.validate(req.body);
    if (error)
      throw res.status(400).json({
        message: "missing fields",
      });
    const contact = await contactsService.updateContact(id, req.body);
    if (!contact) throw error;
    res.json(contact);
  } catch (error) {
    res.status(404).json({
      message: "Not found",
    });
  }
});

export default contactsRouter;
