import express from "express";
import dotenv from "dotenv";
const app = express();
import uploadRoutes from "./routes/upload.routes";
dotenv.config();

app.use(express.json());
app.use("/api/upload", uploadRoutes);
export default app;
