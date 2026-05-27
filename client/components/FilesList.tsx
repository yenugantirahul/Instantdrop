"use client";

import { useEffect, useState } from "react";

import { useUser } from "@clerk/nextjs";

import toast from "react-hot-toast";

import { supabase } from "@/app/lib/supabase";

type FileType = {
  id: string;

  filename: string;

  file_url: string;

  mime_type: string;

  size: number;

  created_at: string;

  user_id: string;
};

export default function FilesDashboard() {
  const { user } = useUser();

  const [shareFileId, setShareFileId] = useState<string | null>(null);

  const [email, setEmail] = useState<string>("");

  const [files, setFiles] = useState<FileType[]>([]);

  const [loading, setLoading] = useState(true);

  const handleShare = (file: FileType) => {
    setShareFileId(file.id);
    setEmail("");
  };

  const handleCloseModal = () => {
    setShareFileId(null);
    setEmail("");
  };

  const handleShareFile = async () => {
    if (!email.trim()) {
      toast.error("Please enter an email address");
      return;
    }

    try {
      const { error } = await supabase.from("shares").insert({
        file_id: shareFileId,
        shared_with: email,
        user_id: user?.id
      });

      if (error) {
        console.error("Error sharing file:", error.message);
        toast.error("Failed to share file");
        return;
      }

      toast.success("File shared successfully!");
      handleCloseModal();
    } catch (err) {
      console.error(err);
      toast.error("Error sharing file");
    }
  };

  useEffect(() => {
    const fetchFiles = async () => {
      if (!user) return;

      try {
        // Fetch files uploaded by current user
        const { data: ownedFiles, error: ownedError } = await supabase
          .from("files")
          .select("*")
          .eq("user_id", user.id)
          .order("created_at", { ascending: false });

        if (ownedError) {
          console.error("Error fetching owned files:", ownedError);
          setLoading(false);
          return;
        }

        // Fetch files shared with current user
        const userEmail =
          user?.primaryEmailAddress?.emailAddress ||
          user?.emailAddresses?.[0]?.emailAddress;

        let sharedFiles: FileType[] = [];
        if (userEmail) {
          const { data: shares, error: sharesError } = await supabase
            .from("shares")
            .select("file_id")
            .eq("shared_with", userEmail);

          if (!sharesError && shares && shares.length > 0) {
            const fileIds = shares.map((s) => s.file_id);
            const { data: files, error: filesError } = await supabase
              .from("files")
              .select("*")
              .in("id", fileIds)
              .order("created_at", { ascending: false });

            if (!filesError && files) {
              sharedFiles = files;
            }
          }
        }

        // Combine both arrays and remove duplicates
        const allFiles = [...(ownedFiles || []), ...sharedFiles];
        const uniqueFiles = Array.from(
          new Map(allFiles.map((f) => [f.id, f])).values()
        );

        setFiles(uniqueFiles);
        setLoading(false);
      } catch (err) {
        console.error("Error fetching files:", err);
        setLoading(false);
      }
    };

    fetchFiles();
  }, [user]);

  if (loading) {
    return <div>Loading files...</div>;
  }

  return (
    <div className="space-y-6">
      <div className="grid gap-4">
        {files.map((file) => (
          <div
            key={file.id}
            className="p-4 border rounded-xl bg-white shadow-sm"
          >
            <h2 className="font-semibold text-black text-lg">
              {file.filename}
            </h2>

            <p className="text-sm text-zinc-500">{file.mime_type}</p>

            <p className="text-sm text-zinc-500">
              {(file.size / 1024 / 1024).toFixed(2)} MB
            </p>

            <div className="flex gap-2 mt-4">
              <a
                href={file.file_url}
                target="_blank"
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                Open File
              </a>
              {file.user_id === user?.id && (
                <button
                  onClick={() => handleShare(file)}
                  className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
                >
                  Share
                </button>
              )}
            </div>
          </div>
        ))}
      </div>

      {shareFileId && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl shadow-lg p-6 max-w-sm w-full mx-4">
            <h2 className="text-xl font-semibold text-black mb-4">
              Share File
            </h2>

            <div className="space-y-4">
              <input
                type="email"
                placeholder="Enter email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 text-black py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />

              <div className="flex gap-2">
                <button
                  onClick={handleShareFile}
                  className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
                >
                  Share
                </button>
                <button
                  onClick={handleCloseModal}
                  className="flex-1 px-4 py-2 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300 transition-colors font-medium"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
