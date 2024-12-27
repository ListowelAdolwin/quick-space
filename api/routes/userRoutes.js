const express = require("express");
const { 
    userProfile, 
    updateProfile, 
    getVendors, 
    verifyUnverifyVendor, 
    makeAdmin, 
    makePro,
    deleteVendor,
    getProRequests
} = require("../controllers/userController.js");
const { verifyRole, verifyToken } = require("../controllers/authController.js");

const router = express.Router();

router.get('/profile/:id', userProfile);
router.post('/update-profile/:id', verifyToken, updateProfile);
router.get("/verify-unverify/:id", verifyRole(['admin']), verifyUnverifyVendor);
router.get("/make-admin/:email", verifyRole(['admin']), makeAdmin);
router.get("/pro-requests", verifyRole(['admin']), getProRequests)
router.post("/make-pro/:id", verifyRole(['admin']), makePro)
router.delete("/delete/:id", verifyRole(['admin']), deleteVendor)
router.get("/", verifyRole(['admin']), getVendors);

module.exports = router;
