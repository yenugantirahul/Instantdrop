// components/Navbar.tsx
"use client";
import { useClerk } from "@clerk/nextjs";
import Link from "next/link";

export default function Navbar() {
  const { user, signOut } = useClerk();
  return (
    <header className="w-full border-b border-zinc-200 bg-white/80 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-6">
        {/* Logo */}
        <Link
          href="/"
          className="text-lg font-semibold tracking-tight text-zinc-900"
        >
          IDrop
        </Link>

        {/* Nav Links */}
        <nav className="hidden items-center gap-8 md:flex">
          {user?.id && (
            <Link
              href="/dashboard"
              className="text-sm text-zinc-600 transition hover:text-zinc-900"
            >
              Dashboard
            </Link>
          )}

          <Link
            href="#features"
            className="text-sm text-zinc-600 transition hover:text-zinc-900"
          >
            Features
          </Link>

          <Link
            href="/workspace"
            className="text-sm text-zinc-600 transition hover:text-zinc-900"
          >
            Workspace
          </Link>

          <Link
            href="#about"
            className="text-sm text-zinc-600 transition hover:text-zinc-900"
          >
            About
          </Link>
        </nav>

        {/* Actions */}
        {!user?.id ? (
          <div className="flex items-center gap-3">
            <Link
                href="/auth/login"
              className="text-sm text-zinc-700 transition hover:text-black"
            >
              Login
            </Link>

            <Link
                href="/auth/signup"
              className="rounded-xl bg-zinc-900 px-4 py-2 text-sm font-medium text-white transition hover:bg-black"
            >
              Get Started
            </Link>
          </div>
        ) : (
          <div className="flex items-center gap-3">
            <Link href="/" className="text-sm text-zinc-700 transition hover:text-black">
             Hello <b>{user.firstName}</b> 👋
            </Link>

            <button
              onClick={() => signOut()}
              className="rounded-xl cursor-pointer bg-zinc-900 px-4 py-2 text-sm font-medium text-white transition hover:bg-black"
            >
              Logout
            </button>
          </div>
        )}
      </div>
    </header>
  );
}
