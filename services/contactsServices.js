import fs from "fs/promises";
import path from "path";
import {nanoid} from "nanoid";

const contactsPath = path.resolve("db/contacts.json");

class ContactsService {
  async listContacts() {
    try {
      const data = await fs.readFile(contactsPath, "utf-8");
      return JSON.parse(data);
    } catch (error) {
      console.error("Error reading contacts file:", error.message);
      return [];
    }
  }

  async getContactById(contactId) {
    const contacts = await this.listContacts();
    return contacts.find((c) => c.id === contactId) || null;
  }

  async addContact(name, email, phone) {
    const contacts = await this.listContacts();
    const newContact = {id: nanoid(), name, email, phone};
    contacts.push(newContact);

    await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
    return newContact;
  }

  async removeContact(contactId) {
    const contacts = await this.listContacts();
    const index = contacts.findIndex((c) => c.id === contactId);

    if (index === -1) return null;

    const [removedContact] = contacts.splice(index, 1);
    await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
    return removedContact;
  }

  async updateContact(contactId, data) {
    const contacts = await this.listContacts();
    const index = contacts.findIndex((c) => c.id === contactId);

    if (index === -1) return null;

    contacts[index] = {...contacts[index], ...data};
    await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
    return contacts[index];
  }
}

const contactsService = new ContactsService();
export default contactsService;
