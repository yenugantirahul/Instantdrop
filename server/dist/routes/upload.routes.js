"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const upload_controller_1 = require("../controllers/upload.controller");
const router = express_1.default.Router();
// POST endpoint for file upload
router.post("/fileupload", upload_controller_1.fileUpload);
exports.default = router;
//# sourceMappingURL=upload.routes.js.map