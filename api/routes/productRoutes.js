const express = require("express");
const { 
    addProduct, 
    getCategoryProducts, 
    getFeaturedProducts, 
    getProduct, 
    getProducts, 
    addToFavorites, 
    removeFromFavorites, 
    getFavoriteProducts, 
    filterProducts, 
    updateProduct, 
    deleteProduct, 
    featureProduct, 
    unfeatureProduct 
} = require("../controllers/productController.js");
const { verifyRole, verifyToken } = require("../controllers/authController.js");

const router = express.Router();

router.post("/add", verifyRole(["vendor", "admin"]), addProduct);
router.get("/delete/:id", verifyToken, deleteProduct);
router.post("/update/:id", verifyToken, updateProduct);
router.get("/feature/:id", featureProduct);
router.get("/unfeature/:id", unfeatureProduct);
router.get("/featured", getFeaturedProducts);
router.get("/favorites/:id", verifyToken, getFavoriteProducts);
router.post("/favorites/add", verifyToken, addToFavorites);
router.post("/favorites/remove", verifyToken, removeFromFavorites);
router.get("/category/:category", getCategoryProducts);
router.get("/search", filterProducts);
router.get("/:id", getProduct);
router.get("/", getProducts);

module.exports = router;
