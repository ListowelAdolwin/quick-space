const express = require("express");
const { 
    userProfile, 
    updateProfile, 
    getVendors, 
    verifyUnverifyVendor, 
    makeAdmin 
} = require("../controllers/userController.js");
const { verifyRole, verifyToken } = require("../controllers/authController.js");

const router = express.Router();

router.get('/profile/:id', userProfile);
router.post('/update-profile/:id', verifyToken, updateProfile);
router.get("/verify-unverify/:id", verifyRole(['admin']), verifyUnverifyVendor);
router.get("/make-admin/:email", verifyRole(['admin']), makeAdmin);
router.get("/", verifyRole(['admin']), getVendors);

module.exports = router;
