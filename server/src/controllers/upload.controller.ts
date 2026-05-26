import { Request, Response } from "express";
import { supabase } from "../lib/supabase";

export const fileUpload = async (req: Request, res: Response) => {
  try {
    const { userId, filePath, fileName, mimeType, size } = req.body;

    const { data, error } = await supabase
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
  } catch (err) {
    console.error(err);

    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};
