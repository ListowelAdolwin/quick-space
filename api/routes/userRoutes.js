import express from "express"
import { userProfile, updateProfile } from "../controllers/userController.js";
import { verifyToken } from "../controllers/authController.js";

const router = express.Router();

router.get('/profile/:id', userProfile);
router.post('/update-profile/:id', verifyToken, updateProfile);

export default router;
