import express from "express"
import dotenv from "dotenv"
import cors from 'cors'
import connectDB from "./config/db.js";
import userRoutes from './routes/userRoutes.js'
import authRoutes from './routes/authRoutes.js'
import productRoutes from './routes/productRoutes.js'
import categoryRoutes from './routes/categoryRoutes.js'
import reviewRoutes from "./routes/reviewRoutes.js"

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
		],
		methods: ["GET", "POST", "PUT", "DELETE"],
		credentials: true,
	}),
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
