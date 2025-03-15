import express from "express";
import {
  createContact,
  deleteContact,
  getAllContacts,
  getContact,
  updateContactById,
  updateFavoriteStatus,
} from "../controllers/contactsController.js";
import {validateCreateContact, validateUpdateContact} from "../utils/validateContact.js";

const router = express.Router();

router.get("/", getAllContacts);
router.get("/:contactId", getContact);
router.post("/", validateCreateContact, createContact);
router.put("/:contactId", validateUpdateContact, updateContactById);
router.patch("/:contactId/favorite", updateFavoriteStatus);
router.delete("/:contactId", deleteContact);

export default router;
