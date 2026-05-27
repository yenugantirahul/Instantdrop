"use client";

import { useUser } from "@clerk/nextjs";
import Link from "next/link";
import FilesList from "@/components/FilesList";

export default function Dashboard() {
  const { user } = useUser();

  return (
    <main className="min-h-screen bg-gradient-to-br from-zinc-50 via-white to-blue-50">
      {/* Header */}
      <div className="border-b border-zinc-200 bg-white sticky top-0 z-10">
        <div className="mx-auto max-w-6xl px-6 py-4 flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-zinc-900">Dashboard</h1>
            <p className="text-sm text-zinc-500 mt-1">
              Welcome back, {user?.firstName || "User"}
            </p>
          </div>
          <Link
            href="/workspace"
            className="inline-flex items-center justify-center rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-blue-700"
          >
            + Upload File
          </Link>
        </div>
      </div>

      {/* Main Content */}
      <div className="mx-auto max-w-6xl px-6 py-12">
        <div className="space-y-8">
          {/* Stats Section */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-white rounded-lg border border-zinc-200 p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-zinc-600">
                    Total Files
                  </p>
                  <p className="text-3xl font-bold text-zinc-900 mt-2">0</p>
                </div>
                <div className="text-4xl">📁</div>
              </div>
            </div>

            <div className="bg-white rounded-lg border border-zinc-200 p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-zinc-600">
                    Total Size
                  </p>
                  <p className="text-3xl font-bold text-zinc-900 mt-2">0 MB</p>
                </div>
                <div className="text-4xl">💾</div>
              </div>
            </div>

            <div className="bg-white rounded-lg border border-zinc-200 p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-zinc-600">
                    This Month
                  </p>
                  <p className="text-3xl font-bold text-zinc-900 mt-2">0</p>
                </div>
                <div className="text-4xl">📈</div>
              </div>
            </div>
          </div>

          {/* Files Section */}
          <div className="space-y-4">
            <div>
              <h2 className="text-xl font-bold text-zinc-900">Your Files</h2>
              <p className="text-sm text-zinc-500 mt-1">
                Manage and track all your uploaded files
              </p>
            </div>

            <div className="bg-white rounded-lg border border-zinc-200 p-6">
              <FilesList />
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
