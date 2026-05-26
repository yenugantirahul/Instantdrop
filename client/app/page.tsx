"use client";

import { useUser } from "@clerk/nextjs";
import Link from "next/link";

const features = [
  {
    title: "Instant delivery",
    description:
      "Drop a file and share it in seconds with a clean, no-friction flow.",
  },
  {
    title: "Secure access",
    description:
      "Clerk handles sign-in and sign-up so your sharing flow stays protected.",
  },
  {
    title: "Simple tracking",
    description:
      "Keep uploads organized and know exactly what has been sent or received.",
  },
];

export default function Hero() {
  const { user } = useUser();

  return (
    <main className="min-h-screen bg-[radial-gradient(circle_at_top,#f8fafc_0%,#ffffff_40%,#eef2ff_100%)] text-zinc-900">
      <section className="mx-auto flex min-h-screen max-w-6xl flex-col justify-center px-6 py-20 lg:px-8">
        <div className="grid items-center gap-12 lg:grid-cols-[1.1fr_0.9fr]">
          <div>
            <div className="inline-flex items-center rounded-full border border-zinc-200 bg-white px-4 py-1 text-sm text-zinc-600 shadow-sm">
              Secure file sharing for teams and quick handoffs
            </div>

            <h1 className="mt-6 max-w-3xl text-5xl font-semibold tracking-tight text-zinc-950 sm:text-6xl lg:text-7xl">
              Upload, share, and receive files without the usual friction.
            </h1>

            <p className="mt-6 max-w-2xl text-lg leading-8 text-zinc-600 sm:text-xl">
              Instantdrop makes file sharing feel lightweight and modern. Sign
              in with Clerk, create your workspace, and send files through a
              responsive interface that stays fast on desktop and mobile.
            </p>

            <div className="mt-10 flex flex-col gap-4 sm:flex-row">
              <Link
                href={user ? "/workspace" : "/auth/signup"}
                className="inline-flex items-center justify-center rounded-full bg-zinc-950 px-6 py-3 text-sm font-medium text-white transition hover:bg-zinc-800"
              >
                Start Sharing
              </Link>
              {!user?.id ? (
                <Link
                  href="/auth/login"
                  className="inline-flex items-center justify-center rounded-full border border-zinc-200 bg-white px-6 py-3 text-sm font-medium text-zinc-700 transition hover:border-zinc-300 hover:bg-zinc-50"
                >
                  Sign In
                </Link>
              ) : (
                ""
              )}
            </div>

            <div className="mt-12 grid gap-4 sm:grid-cols-3">
              {features.map((feature) => (
                <article
                  key={feature.title}
                  className="rounded-2xl border border-zinc-200 bg-white/85 p-5 shadow-sm backdrop-blur"
                >
                  <h2 className="text-base font-semibold text-zinc-950">
                    {feature.title}
                  </h2>
                  <p className="mt-2 text-sm leading-6 text-zinc-600">
                    {feature.description}
                  </p>
                </article>
              ))}
            </div>
          </div>

          <div className="relative">
            <div className="absolute inset-0 -z-10 rounded-4xl bg-linear-to-br from-zinc-200 via-white to-indigo-100 blur-3xl" />
            <div className="rounded-4xl border border-zinc-200 bg-white p-6 shadow-2xl shadow-zinc-200/60">
              <div className="rounded-3xl border border-dashed border-zinc-200 bg-zinc-50 p-6">
                <p className="text-sm font-medium uppercase tracking-[0.2em] text-zinc-500">
                  About Instantdrop
                </p>
                <h2 className="mt-4 text-2xl font-semibold text-zinc-950">
                  A focused file-sharing experience built for speed.
                </h2>
                <p className="mt-4 text-sm leading-7 text-zinc-600">
                  The app combines Clerk authentication with a simple
                  upload-and-share flow so people can move files quickly, stay
                  signed in, and keep the interface easy to navigate.
                </p>

                <dl className="mt-8 grid gap-4 sm:grid-cols-2">
                  <div className="rounded-2xl bg-white p-4 shadow-sm">
                    <dt className="text-sm text-zinc-500">Fast setup</dt>
                    <dd className="mt-1 text-lg font-semibold text-zinc-950">
                      Sign in and go
                    </dd>
                  </div>
                  <div className="rounded-2xl bg-white p-4 shadow-sm">
                    <dt className="text-sm text-zinc-500">Responsive UI</dt>
                    <dd className="mt-1 text-lg font-semibold text-zinc-950">
                      Works on every screen
                    </dd>
                  </div>
                </dl>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
