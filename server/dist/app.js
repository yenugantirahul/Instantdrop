"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const app = (0, express_1.default)();
const upload_routes_1 = __importDefault(require("./routes/upload.routes"));
dotenv_1.default.config();
app.use(express_1.default.json());
app.use("/api/upload", upload_routes_1.default);
exports.default = app;
//# sourceMappingURL=app.js.map