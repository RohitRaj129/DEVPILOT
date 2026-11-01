"use client";
import Link from "next/link";
import Image from "next/image";
import {
  ArrowUpRight,
  GitBranch,
  MessageCircleCode,
  Sparkles,
} from "lucide-react";

import { AnimatedThemeToggler } from "@/components/ui/animated-theme-toggler";
import { buttonVariants } from "@/components/ui/button";
import { getGithubLoginUrl } from "@/lib/api";
import { cn } from "@/lib/utils";
import { useCurrentUser } from "@/hooks/use-auth";

const features = [
  {
    icon: GitBranch,
    title: "Connect GitHub",
    description:
      "Connect your GitHub account and access public or private repositories securely.",
    label: "GitHub OAuth",
  },
  {
    icon: Sparkles,
    title: "Index with RAG",
    description:
      "Chunk, embed, and index your code using PostgreSQL and pgvector.",
    label: "Smart indexing",
  },
  {
    icon: MessageCircleCode,
    title: "Ask Anything",
    description:
      "Ask questions about your code and get contextual answers with file citations.",
    label: "AI-powered chat",
  },
];

export default function LandingPage() {
  const { data: user, isLoading } = useCurrentUser();

  return (
    <main className="relative min-h-svh overflow-hidden bg-background text-foreground dark:bg-[#08080a]">
      {/* Background */}
      <div
        className="pointer-events-none absolute inset-0 overflow-hidden"
        aria-hidden="true"
      >
        <div className="absolute -top-64 left-1/2 h-96 w-96 -translate-x-1/2 rounded-full bg-teal-500/10 blur-3xl dark:bg-teal-500/10" />

        <div className="absolute left-0 top-80 h-72 w-72 rounded-full bg-fuchsia-600/5 blur-3xl" />

        <div className="absolute right-0 top-96 h-72 w-72 rounded-full bg-blue-600/5 blur-3xl" />
      </div>

      {/* Navbar */}
      <header className="relative z-10 mx-auto flex h-16 max-w-7xl items-center justify-between border-b border-border/50 px-5 sm:px-8">
        <Link
          href="/"
          className="flex items-center gap-2.5"
          aria-label="DevPilot home"
        >
          <Image
            src="/logo.png"
            alt="DevPilot"
            width={40}
            height={40}
            priority
            className="size-10 object-contain"
          />

          <span className="font-heading text-lg font-bold tracking-tight">
            Dev<span className="text-teal-500">Pilot</span>
          </span>
        </Link>

        <nav className="flex items-center gap-3">
          <AnimatedThemeToggler />

          {!isLoading &&
            (user ? (
              <Link
                href="/dashboard"
                className="flex items-center gap-2 rounded-full border border-border/70 p-1.5 pr-3 transition-colors hover:bg-muted"
              >
                <Image
                  src={user.avatarUrl ?? "/logo.png"}
                  alt={user.githubUsername || "Profile"}
                  width={32}
                  height={32}
                  className="size-8 rounded-full object-cover"
                />

                <span className="hidden text-sm font-medium sm:block">
                  {user.githubUsername || "Dashboard"}
                </span>
              </Link>
            ) : (
              <Link
                href="/login"
                className="rounded-lg px-3 py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
              >
                Sign in
              </Link>
            ))}
        </nav>
      </header>

      {/* Hero */}
      <section className="relative z-10 mx-auto flex max-w-5xl flex-col items-center px-5 pb-24 pt-20 text-center sm:px-8 sm:pt-28">
        <div className="mb-7 flex size-20 items-center justify-center rounded-3xl border border-teal-400/20 bg-teal-400/10 shadow-lg shadow-teal-500/10">
          <Image
            src="/logo.png"
            alt="DevPilot Logo"
            width={64}
            height={64}
            priority
            className="size-16 object-contain"
          />
        </div>

        <div className="mb-5 flex items-center gap-2 rounded-full border border-teal-500/20 bg-teal-500/5 px-4 py-2 text-xs font-medium text-teal-500">
          <span className="size-2 rounded-full bg-teal-400" />
          YOUR AI-POWERED CODEBASE ASSISTANT
        </div>

        <h1 className="max-w-4xl font-heading text-5xl font-bold tracking-tight sm:text-7xl">
          Understand your code.
          <span className="mt-2 block bg-linear-to-r from-teal-400 via-cyan-400 to-blue-500 bg-clip-text text-transparent">
            Faster with AI.
          </span>
        </h1>

        <p className="mt-7 max-w-2xl text-base leading-8 text-muted-foreground sm:text-lg">
          Connect GitHub, index any repository, and chat with your codebase
          using retrieval-augmented answers and citations.
        </p>

        <div className="mt-9 flex w-full flex-col items-center justify-center gap-3 sm:w-auto sm:flex-row">
          <a
            href={getGithubLoginUrl()}
            className={cn(
              buttonVariants({ size: "lg" }),
              "h-12 w-full rounded-xl bg-teal-500 px-6 font-semibold text-black shadow-lg shadow-teal-500/20 hover:bg-teal-400 sm:w-auto",
            )}
          >
            <GitBranch className="size-5" />
            Continue with GitHub
            <ArrowUpRight className="size-4" />
          </a>

          <a
            href="#features"
            className={cn(
              buttonVariants({ variant: "outline", size: "lg" }),
              "h-12 w-full rounded-xl px-6 sm:w-auto",
            )}
          >
            See how it works
          </a>
        </div>

        <p className="mt-5 text-xs text-muted-foreground">
          Connect your GitHub account to get started.
        </p>
      </section>

      {/* Features */}
      <section
        id="features"
        className="relative z-10 mx-auto max-w-7xl scroll-mt-10 px-5 pb-24 sm:px-8"
      >
        <div className="mb-9">
          <p className="text-sm font-semibold text-teal-500">HOW IT WORKS</p>

          <h2 className="mt-3 font-heading text-2xl font-bold tracking-tight sm:text-4xl">
            From repository to answer.
          </h2>

          <p className="mt-3 max-w-xl text-sm leading-6 text-muted-foreground">
            Everything you need to understand and interact with your codebase in
            one place.
          </p>
        </div>

        <div className="grid gap-4 md:grid-cols-3">
          {features.map(({ icon: Icon, title, description, label }, index) => (
            <article
              key={title}
              className="group min-h-60 rounded-2xl border border-border/70 bg-card/60 p-6 shadow-sm backdrop-blur-xl transition-all duration-300 hover:-translate-y-1 hover:border-teal-500/40 hover:bg-card"
            >
              <div className="flex items-center justify-between">
                <div className="flex size-12 items-center justify-center rounded-xl border border-teal-500/20 bg-teal-500/10 text-teal-500 transition-colors group-hover:bg-teal-500/20">
                  <Icon className="size-5" />
                </div>

                <span className="text-xs font-medium text-muted-foreground">
                  0{index + 1}
                </span>
              </div>

              <h3 className="mt-8 font-heading text-lg font-semibold">
                {title}
              </h3>

              <p className="mt-2 text-sm leading-6 text-muted-foreground">
                {description}
              </p>

              <div className="mt-6 inline-flex items-center gap-2 rounded-full border border-border/70 bg-muted/50 px-3 py-1.5 text-xs text-muted-foreground">
                <span className="size-1.5 rounded-full bg-teal-500" />
                {label}
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="relative z-10 border-t border-border/50">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-3 px-5 py-6 sm:flex-row sm:px-8">
          <Link href="/" className="flex items-center gap-2">
            <Image
              src="/logo.png"
              alt=""
              width={24}
              height={24}
              className="size-6 object-contain"
            />
            <span className="text-sm font-semibold">DevPilot</span>
          </Link>

          <p className="text-xs text-muted-foreground">
            Built for developers, powered by AI.
          </p>
        </div>
      </footer>
    </main>
  );
}
