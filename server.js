import express from "express";
import dotenv from "dotenv";
import morgan from "morgan";
import connectDB from "./config/db.js";
import authRoutes from './routes/authRoute.js';
import categoryRoutes from "./routes/categoryRoutes.js";
import productRoutes from "./routes/productRoutes.js"
import cors from "cors"
import path from "path"
dotenv.config();

connectDB();

const app = express();

//middlewares
app.use(express.json());
app.use(morgan('dev'));
app.use(cors());
app.use(express.static(path.join(__dirname, './client/build')))

//routes
app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/category", categoryRoutes);
app.use("/api/v1/product", productRoutes);

app.use("*", function (req, res) {
    res.sendFile(path.join(__dirname, './client/build/index.html'));
});

app.get('/', (req, res) => {
    res.send("<h1>WELCOME OTO ECOMMERCE APP 2023</h1>")
});

const PORT = process.env.PORT;

app.listen(PORT, () => {
    console.log(`Server Running at PORT ${PORT}`);
})