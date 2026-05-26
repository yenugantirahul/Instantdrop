"use client";
import { useClerk } from "@clerk/nextjs";
import React, { useState, useRef } from "react";
import toast, { Toaster } from "react-hot-toast";
import { supabase } from "../lib/supabase";
const Workspace = () => {
  const { user } = useClerk();

  const success = (msg: string) => toast.success(msg);
  const errorMsg = (msg: string) => toast.error(msg);

  const [file, setFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);
  const [dragActive, setDragActive] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.[0]) {
      setFile(e.target.files[0]);
    }
  };

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files?.[0]) {
      setFile(e.dataTransfer.files[0]);
    }
  };
  const handleUpload = async () => {
    if (!file) {
      errorMsg("Please select a file 📁");
      return;
    }

    setUploading(true);

    try {
      // Generate unique storage path

      const filePath = `uploads/${Date.now()}-${file.name}`;

      // Upload file directly to Supabase Storage

      const { data, error } = await supabase.storage
        .from("instantdropfiles")
        .upload(filePath, file);

      if (error) {
        console.error("Supabase upload error:", error);

        errorMsg("Upload failed");
        return;
      }

      console.log("Storage upload success:", data);

      // Store metadata in backend/database

      const res = await fetch("http://localhost:5000/api/upload/fileupload", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userId: user?.id,
          fileName: file.name,
          filePath: filePath,
          mimeType: file.type,
          size: file.size,
        }),
      });

      if (!res.ok) {
        throw new Error(`Server error: ${res.status}`);
      }

      const result = await res.json();

      console.log("Metadata saved:", result);

      success("File uploaded successfully 🚀");
    } catch (error) {
      console.error("Upload failed:", error);

      errorMsg("Something went wrong");
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-zinc-50 via-white to-blue-50">
      <div className="mx-auto max-w-2xl px-6 py-20">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-zinc-900 to-zinc-600 bg-clip-text text-transparent mb-3">
            Upload Your File
          </h1>
          <p className="text-zinc-500 text-lg">
            Share your files securely and instantly
          </p>
        </div>

        {/* Upload Card */}
        <div
          onDragEnter={handleDrag}
          onDragLeave={handleDrag}
          onDragOver={handleDrag}
          onDrop={handleDrop}
          className={`relative p-12 rounded-2xl border-2 border-dashed transition-all duration-300 ${
            dragActive
              ? "border-blue-400 bg-blue-50 scale-105"
              : "border-zinc-300 bg-white hover:border-zinc-400"
          }`}
        >
          <div className="flex flex-col items-center justify-center">
            {/* Icon */}
            <div className="mb-4">
              <svg
                className="w-16 h-16 text-zinc-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                />
              </svg>
            </div>

            {/* Text */}
            <p className="text-lg font-semibold text-zinc-900 mb-2">
              {file ? "File Selected" : "Drag & drop your file here"}
            </p>
            <p className="text-sm text-zinc-500 mb-6">
              {file ? file.name : "or click to browse"}
            </p>

            {/* File Input */}
            <input
              ref={inputRef}
              type="file"
              onChange={handleFileChange}
              className="hidden"
              aria-label="File upload"
            />
            <button
              onClick={() => inputRef.current?.click()}
              className="px-8 py-3 mb-6 bg-zinc-900 cursor-pointer text-white font-medium rounded-lg hover:bg-black transition-colors"
            >
              Choose File
            </button>

            {/* File Info */}
            {file && (
              <div className="w-full mt-6 p-4 bg-blue-50 rounded-lg border border-blue-100">
                <div className="flex items-center gap-3">
                  <svg
                    className="w-5 h-5 text-blue-600"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M8 16.5a.5.5 0 01-.5-.5v-5a.5.5 0 01.5-.5h4a.5.5 0 01.5.5v5a.5.5 0 01-.5.5h-4z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-blue-900 truncate">
                      {file.name}
                    </p>
                    <p className="text-xs text-blue-700">
                      {(file.size / 1024 / 1024).toFixed(2)} MB
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Upload Button */}
        <div className="mt-8 flex gap-3 justify-center">
          <button
            onClick={handleUpload}
            disabled={!file || uploading}
            className="px-8 py-3 bg-gradient-to-r from-blue-600 to-blue-700 text-white font-semibold rounded-lg hover:from-blue-700 hover:to-blue-800 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 shadow-lg hover:shadow-xl disabled:shadow-none"
          >
            {uploading ? (
              <span className="flex items-center gap-2">
                <svg
                  className="w-5 h-5 animate-spin"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 2v4m0 12v4M4.22 4.22l2.83 2.83m5.9 5.9l2.83 2.83M4.22 19.78l2.83-2.83m5.9-5.9l2.83-2.83M20 12a8 8 0 11-16 0 8 8 0 0116 0z"
                  />
                </svg>
                Uploading...
              </span>
            ) : (
              <span className="flex cursor-pointer items-center gap-2">
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
                  />
                </svg>
                Upload File
              </span>
            )}
          </button>

          {file && (
            <button
              onClick={() => {
                setFile(null);
                if (inputRef.current) inputRef.current.value = "";
              }}
              className="px-6 py-3 cursor-pointer border-2 border-zinc-300 text-zinc-900 font-medium rounded-lg hover:bg-zinc-100 transition-colors"
            >
              Clear
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Workspace;
