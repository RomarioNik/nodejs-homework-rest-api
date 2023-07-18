import contactsService from "../models/contacts.js";
import { HttpError } from "../helpers/index.js";
import { ctrlWrapper } from "../decorators/index.js";

const getAll = async (req, res) => {
  const contacts = await contactsService.listContacts();
  res.json(contacts);
};

const getById = async (req, res) => {
  const { id } = req.params;
  const contact = await contactsService.getById(id);
  if (!contact) throw HttpError(404);
  res.json(contact);
};

const add = async (req, res) => {
  const contact = await contactsService.addContact(req.body);
  res.status(201).json(contact);
};

const deleteById = async (req, res) => {
  const { id } = req.params;
  const contact = await contactsService.removeContact(id);
  if (!contact) throw HttpError(404);

  res.status(200).json({
    message: "contact deleted",
  });
};

const updateById = async (req, res) => {
  const { id } = req.params;
  const contact = await contactsService.updateContact(id, req.body);
  if (!contact) throw HttpError(404);
  res.json(contact);
};

export default {
  getAll: ctrlWrapper(getAll),
  getById: ctrlWrapper(getById),
  add: ctrlWrapper(add),
  deleteById: ctrlWrapper(deleteById),
  updateById: ctrlWrapper(updateById),
};
