// routes/productRoutes.js
import express from "express";
import { addProduct, getCategoryProducts, getFeaturedProducts, getProduct, getProducts, addToFavorites, removeFromFavorites, getFavoriteProducts, filterProducts, updateProduct, deleteProduct } from "../controllers/productController.js";
import { verifyRole, verifyToken } from "../controllers/authController.js";

const router = express.Router();

router.post("/add", verifyRole(["vendor", "admin"]), addProduct);
router.get("/delete/:id", verifyToken, deleteProduct);
router.post("/update/:id", verifyToken, updateProduct);
router.get("/featured", getFeaturedProducts);
router.get("/favorites/:id", verifyToken, getFavoriteProducts);
router.post("/favorites/add", verifyToken, addToFavorites)
router.post("/favorites/remove", verifyToken, removeFromFavorites)
router.get("/category/:category", getCategoryProducts);
router.get("/search", filterProducts);
router.get("/:id", getProduct);
router.get("/", getProducts);


export default router;
