import fs from "fs/promises";
import path from "path";
import { nanoid } from "nanoid";

const pathContacts = path.resolve("models", "contacts.json");

const updateContacts = (contacts) =>
  fs.writeFile(pathContacts, JSON.stringify(contacts, null, 2));

const listContacts = async () => {
  const contacts = await fs.readFile(pathContacts);
  return JSON.parse(contacts);
};

const getById = async (contactId) => {
  const contacts = await listContacts();
  const contactItem = contacts.find((item) => item.id === contactId);
  return contactItem || null;
};

const addContact = async ({ name, email, phone }) => {
  const contacts = await listContacts();
  const newContact = {
    id: nanoid(),
    name,
    email,
    phone,
  };

  contacts.push(newContact);
  await updateContacts(contacts);
  return newContact;
};

const removeContact = async (contactId) => {
  const contacts = await listContacts();
  const contactIndex = await contacts.findIndex(
    (item) => item.id === contactId
  );

  if (contactIndex === -1) return null;

  const [deletedContact] = contacts.splice(contactIndex, 1);
  await updateContacts(contacts);
  return deletedContact;
};

const updateContact = async (contactId, body) => {
  const contacts = await listContacts();
  const contactIndex = await contacts.findIndex(
    (item) => item.id === contactId
  );

  if (contactIndex === -1) return null;

  contacts[contactIndex] = { id: contactId, ...body };
  await updateContacts(contacts);
  return contacts[contactIndex];
};

export default {
  listContacts,
  getById,
  removeContact,
  addContact,
  updateContact,
};
