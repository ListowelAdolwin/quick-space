// routes/productRoutes.js
import express from "express";
import { addProduct, getCategoryProducts, getFeaturedProducts, getProduct, getProducts, addToFavorites, removeFromFavorites, getFavoriteProducts } from "../controllers/productController.js";
import { verifyToken } from "../controllers/authController.js";

const router = express.Router();

// Route to add a new product
router.post("/add", verifyToken, addProduct);
router.get("/featured", getFeaturedProducts);
router.get("/favorites/:id", verifyToken, getFavoriteProducts);
router.post("/favorites/add", verifyToken, addToFavorites)
router.post("/favorites/remove", verifyToken, removeFromFavorites)
router.get("/category/:category", getCategoryProducts);
router.get("/:id", getProduct);
router.get("/", getProducts);


export default router;
