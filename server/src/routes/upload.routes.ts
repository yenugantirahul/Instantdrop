import express from "express";
import { fileUpload } from "../controllers/upload.controller";

const router = express.Router();

// POST endpoint for file upload
router.post("/fileupload", fileUpload);


export default router;
