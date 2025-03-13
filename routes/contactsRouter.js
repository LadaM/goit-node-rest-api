import express from "express";
import {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
  updateStatusContact,
} from "../services/contactsService.js";

import  validateBody from "../helpers/validateBody.js";
import HttpError from "../helpers/HttpError.js";

const router = express.Router();

// GET all contacts
router.get("/", async (req, res, next) => {
  try {
    const contacts = await listContacts();
    res.json(contacts);
  } catch (error) {
    next(error);
  }
});

// GET contact by ID
router.get("/:contactId", async (req, res, next) => {
  try {
    const contact = await getContactById(req.params.contactId);
    if (!contact) {
      throw new HttpError(404, "Not found");
    }
    res.json(contact);
  } catch (error) {
    next(error);
  }
});

// POST a new contact
router.post("/", validateBody, async (req, res, next) => {
  try {
    const { name, email, phone } = req.body;
    if (!name || !email || !phone) {
      throw new HttpError(400, "Missing required fields");
    }
    const newContact = await addContact({ name, email, phone });
    res.status(201).json(newContact);
  } catch (error) {
    next(error);
  }
});

// DELETE a contact by ID
router.delete("/:contactId", async (req, res, next) => {
  try {
    const contact = await removeContact(req.params.contactId);
    if (!contact) {
      throw new HttpError(404, "Not found");
    }
    res.json({ message: "Contact deleted" });
  } catch (error) {
    next(error);
  }
});

// PUT - update an existing contact by ID
router.put("/:contactId", async (req, res, next) => {
  try {
    const updatedContact = await updateContact(req.params.contactId, req.body);
    if (!updatedContact) {
      throw new HttpError(404, "Not found");
    }
    res.json(updatedContact);
  } catch (error) {
    next(error);
  }
});

// PATCH - update the favorite status of a contact
router.patch("/:contactId/favorite", async (req, res, next) => {
  try {
    const { favorite } = req.body;
    if (typeof favorite !== "boolean") {
      throw new HttpError(400, "Missing required field favorite");
    }
    const updatedContact = await updateStatusContact(req.params.contactId, favorite);
    if (!updatedContact) {
      throw new HttpError(404, "Not found");
    }
    res.json(updatedContact);
  } catch (error) {
    next(error);
  }
});

export default router;
