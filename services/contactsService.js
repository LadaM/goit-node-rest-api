import Contact from "../models/contact.js";

export async function listContacts(ownerId) {
  return await Contact.findAll({ where: { owner: ownerId } });
}

export async function getContactById(contactId, ownerId) {
  return await Contact.findOne({where: {id: contactId, owner: ownerId}});
}

export async function removeContact(contactId, ownerId) {
  const contact = await Contact.findOne({where: {id: contactId, owner: ownerId}});
  if (!contact) return null;
  await contact.destroy();
  return contact;
}

export async function addContact({ name, email, phone }, ownerId) {
  return await Contact.create({ name, email, phone, owner: ownerId });
}

export async function updateContact(contactId, ownerId, data) {
  const contact = await Contact.findOne({where: {id: contactId, owner: ownerId}});
  if (!contact) return null;
  await contact.update(data);
  return contact;
}

export async function updateStatusContact(contactId, ownerId, favorite) {
  const contact = await Contact.findOne({where: {id: contactId, owner: ownerId}});
  if (!contact) return null;
  await contact.update({ favorite });
  return contact;
}
