"use client";

import { useEffect, useState } from "react";

import { useUser } from "@clerk/nextjs";

import { supabase } from "@/app/lib/supabase";

type FileType = {
  id: string;

  filename: string;

  file_url: string;

  mime_type: string;

  size: number;

  created_at: string;
};

export default function FilesDashboard() {
  const { user } = useUser();

  const [files, setFiles] = useState<FileType[]>([]);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFiles = async () => {
      if (!user) return;

      const { data, error } = await supabase
        .from("files")
        .select("*")
        .eq("user_id", user.id)
        .order("created_at", { ascending: false });

      if (error) {
        console.error(error);

        return;
      }

      setFiles(data);

      setLoading(false);
    };

    fetchFiles();
  }, [user]);

  if (loading) {
    return <div>Loading files...</div>;
  }

  return (
    <div className="grid gap-4">
      {files.map((file) => (
        <div
          key={file.id}
          className="p-4 border rounded-xl bg-white shadow-sm"
        >
          <h2 className="font-semibold text-lg">
            {file.filename}
          </h2>

          <p className="text-sm text-zinc-500">
            {file.mime_type}
          </p>

          <p className="text-sm text-zinc-500">
            {(file.size / 1024 / 1024).toFixed(2)} MB
          </p>

          <a
            href={file.file_url}
            target="_blank"
            className="text-blue-600 mt-2 inline-block"
          >
            Open File
          </a>
        </div>
      ))}
    </div>
  );
}