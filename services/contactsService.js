import Contact from "../models/contact.js"; // Ensure correct path to the Contact model

export async function listContacts(ownerId) {
  return await Contact.findAll({ where: { owner: ownerId } });
}

export async function getContactById(contactId) {
  return await Contact.findByPk(contactId);
}

export async function removeContact(contactId) {
  const contact = await Contact.findByPk(contactId);
  if (!contact) return null;
  await contact.destroy();
  return contact;
}

export async function addContact({ name, email, phone }, ownerId) {
  return await Contact.create({ name, email, phone, owner: ownerId });
}

export async function updateContact(contactId, data) {
  const contact = await Contact.findByPk(contactId);
  if (!contact) return null;
  await contact.update(data);
  return contact;
}

export async function updateStatusContact(contactId, favorite) {
  const contact = await Contact.findByPk(contactId);
  if (!contact) return null;
  await contact.update({ favorite });
  return contact;
}
