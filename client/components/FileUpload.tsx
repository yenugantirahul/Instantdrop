"use client";

import { UploadButton } from "@uploadthing/react";
import toast, { Toaster } from "react-hot-toast";

import type { OurFileRouter } from "@/app/api/uploadthing/core";

import { useUser } from "@clerk/nextjs";

import { supabase } from "@/app/lib/supabase";

export default function FileUpload() {
  const { user } = useUser();

  return (
    <>
      <Toaster position="top-right" />

      <UploadButton<OurFileRouter, "fileUploader">
        endpoint="fileUploader"
        
        appearance={{
          button:
            "bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-semibold transition-all",

          container:
            "flex flex-col items-center justify-center gap-4",

          allowedContent: "text-zinc-500 text-sm",
        }}
        content={{
          button({ ready }) {
            if (ready) return "Upload Any File";

            return "Loading...";
          },

          allowedContent() {
            return "Any file type • Max 256MB • Up to 10 files";
          },
        }}
        onClientUploadComplete={async (res) => {
          try {
            console.log("Upload complete:", res);

            const uploadedFile = res?.[0];

            if (!uploadedFile) {
              toast.error("Upload failed");

              return;
            }

            console.log("File URL:", uploadedFile.url);

            const { error } = await supabase.from("files").insert({
              user_id: user?.id,

              filename: uploadedFile.name,

              file_url: uploadedFile.ufsUrl,

              storage_key: uploadedFile.key,

              mime_type: uploadedFile.type,

              size: uploadedFile.size,
            });

            if (error) {
              console.error("Database insert failed:", error);

              toast.error("Failed to save file metadata");

              return;
            }

            toast.success("File uploaded successfully 🚀");
          } catch (error) {
            console.error(error);

            toast.error("Something went wrong");
          }
        }}
        onUploadError={(error: Error) => {
          console.error("Upload error:", error);

          toast.error(error.message);
        }}
      />
    </>
  );
}