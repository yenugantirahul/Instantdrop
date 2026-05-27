"use client";

import FileUpload from "@/components/FileUpload";

const Workspace = () => {
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
        <div className="bg-white rounded-2xl shadow-xl border border-zinc-200 p-10">
          <div className="flex flex-col items-center justify-center">
            {/* Icon */}
            <div className="mb-6">
              <svg
                className="w-16 h-16 text-blue-600"
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

            <h2 className="text-2xl font-semibold text-zinc-900 mb-2">
              Upload Files
            </h2>

            <p className="text-zinc-500 mb-8 text-center">
              Upload images, PDFs, and documents securely
            </p>

            {/* UploadThing Component */}
            <FileUpload />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Workspace;