const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const connectDB = require("./config/db.js");
const userRoutes = require("./routes/userRoutes.js");
const authRoutes = require("./routes/authRoutes.js");
const productRoutes = require("./routes/productRoutes.js");
const categoryRoutes = require("./routes/categoryRoutes.js");
const reviewRoutes = require("./routes/reviewRoutes.js");


dotenv.config();

const app = express()

app.use(express.json())

app.use(
	cors({
		origin: [
			"http://127.0.0.1:5173",
      "https://127.0.0.1:5173",
			'http://localhost:3000',
			'http://127.0.0.1:3000',
      "http://quick-space-xyz.onrender.com",
      "https://quick-space-xyz.onrender.com",
      "https://quickspace.tertiaryguide.com",
      "https://quickspacegh.com",
      "http://quickspacegh.com",
		],
		methods: ["GET", "POST", "PUT", "DELETE"],
		credentials: true,
	})
);

app.use('/api/auth', authRoutes)
app.use('/api/users', userRoutes)
app.use('/api/products', productRoutes)
app.use('/api/categories', categoryRoutes)
app.use('/api/reviews', reviewRoutes)

connectDB()

app.listen(3000, () => {
  console.log("App started!")
})
