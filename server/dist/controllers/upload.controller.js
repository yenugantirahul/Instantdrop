"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.fileUpload = void 0;
const supabase_1 = require("../lib/supabase");
const fileUpload = async (req, res) => {
    try {
        const { userId, filePath, fileName, mimeType, size } = req.body;
        const { data, error } = await supabase_1.supabase
            .from("files")
            .insert({
            uploaded_by: userId,
            storage_key: filePath,
            name: fileName,
            mime_type: mimeType,
            size,
        })
            .select();
        if (error) {
            return res.status(500).json({
                success: false,
                error: error.message,
            });
        }
        return res.status(200).json({
            success: true,
            file: data,
        });
    }
    catch (err) {
        console.error(err);
        return res.status(500).json({
            success: false,
            message: "Internal server error",
        });
    }
};
exports.fileUpload = fileUpload;
//# sourceMappingURL=upload.controller.js.map