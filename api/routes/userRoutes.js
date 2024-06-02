import express from "express"
import { userProfile, updateProfile, getVendors, verifyUnverifyVendor, makeAdmin } from "../controllers/userController.js";
import { verifyRole, verifyToken } from "../controllers/authController.js";

const router = express.Router();

router.get('/profile/:id', userProfile);
router.post('/update-profile/:id', verifyToken, updateProfile);
router.get("/verify-unverify/:id", verifyRole(['admin']), verifyUnverifyVendor)
router.get("/make-admin/:email", verifyRole(['admin']), makeAdmin)
router.get("/", verifyRole(['admin']), getVendors)

export default router;
