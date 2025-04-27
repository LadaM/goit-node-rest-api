import express from "express";
import registerController from "../controllers/auth/registerController.js";
import loginController from "../controllers/auth/loginController.js";
import logoutController from "../controllers/auth/logoutController.js";
import authMiddleware from "../middlewares/authMiddleware.js";
import currentUserController from "../controllers/auth/currentUserController.js";
import upload from '../middlewares/uploadMiddleware.js';
import {updateAvatar} from '../controllers/user/updateAvatar.js'

const router = express.Router();

router.post("/register", registerController);
router.post("/login", loginController);
router.post("/logout", authMiddleware, logoutController);
router.get("/current", authMiddleware, currentUserController);
router.patch('/avatars', authMiddleware, upload.single('avatar'), updateAvatar);

export default router;
