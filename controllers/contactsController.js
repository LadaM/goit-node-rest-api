import {
    addContact,
    getContactById,
    listContacts,
    removeContact,
    updateContact,
    updateStatusContact,
} from "../services/contactsService.js";

export const getAllContacts = async (req, res, next) => {
    try {
        const contacts = await listContacts();
        res.json(contacts);
    } catch (error) {
        next(error);
    }
};

export const getContact = async (req, res, next) => {
    try {
        const contact = await getContactById(req.params.contactId);
        if (!contact) {
            return res.status(404).json({message: "Not found"});
        }
        res.json(contact);
    } catch (error) {
        next(error);
    }
};

export const createContact = async (req, res, next) => {
    try {
        const {name, email, phone} = req.body;
        if (!name || !email || !phone) {
            return res.status(400).json({message: "Missing required fields"});
        }
        const newContact = await addContact({name, email, phone});
        res.status(201).json(newContact);
    } catch (error) {
        next(error);
    }
};

export const updateContactById = async (req, res, next) => {
    try {
        if (Object.keys(req.body).length === 0) {
            return res.status(400).json({message: "Request body is required"});
        }

        const updatedContact = await updateContact(req.params.contactId, req.body);
        if (!updatedContact) {
            return res.status(404).json({message: "Not found"});
        }

        res.json(updatedContact);
    } catch (error) {
        next(error);
    }
};

export const updateFavoriteStatus = async (req, res, next) => {
    try {
        if (typeof req.body.favorite !== "boolean") {
            return res.status(400).json({message: "Field 'favorite' must be a boolean"});
        }

        const updatedContact = await updateStatusContact(req.params.contactId, req.body.favorite);
        if (!updatedContact) {
            return res.status(404).json({message: "Not found"});
        }

        res.json(updatedContact);
    } catch (error) {
        next(error);
    }
};

export const deleteContact = async (req, res, next) => {
    try {
        const contact = await removeContact(req.params.contactId);
        if (!contact) {
            return res.status(404).json({message: "Not found"});
        }
        res.json({message: "Contact deleted"});
    } catch (error) {
        next(error);
    }
};
