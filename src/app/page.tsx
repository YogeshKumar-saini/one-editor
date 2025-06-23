"use client";

import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import Logo from "@/components/Logo";
import TextAnimationHeading from "@/components/TextAnimationHeading";
import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

export default function Home() {
  const router = useRouter();

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-white via-neutral-50 to-blue-50 dark:from-black dark:via-neutral-950 dark:to-neutral-900 text-neutral-900 dark:text-neutral-100 transition-colors">
      {/* Header */}
      <header className="w-full h-20 sticky top-0 z-50 backdrop-blur-md border-b border-neutral-200 dark:border-neutral-800 bg-white/60 dark:bg-black/30">
        <div className="container mx-auto px-6 flex items-center justify-between h-full">
          <Logo />
          <nav>
            <Button
              onClick={() => router.push("/login")}
              className="gap-2 px-5 py-2 text-sm hover:scale-105 transition"
            >
              Login
              <ArrowRight size={16} />
            </Button>
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <main className="flex-1 flex flex-col justify-center items-center px-6 py-20 gap-10 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-5xl"
        >
          <TextAnimationHeading />
          <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
            Empower your team with an elegant workspace. Collaborate, manage, and build everything in one beautiful place.
          </p>
        </motion.div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.6 }}
          className="flex justify-center"
        >
          <Button
            size="lg"
            className="text-base px-6 py-3 font-semibold rounded-xl shadow-lg hover:scale-105 transition-transform"
            onClick={() => router.push("/login")}
          >
            Get Started
          </Button>
        </motion.div>

        {/* Banner Image */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.7, duration: 0.6 }}
          className="mt-12 max-w-6xl w-full rounded-3xl overflow-hidden shadow-2xl ring-1 ring-neutral-200 dark:ring-neutral-800"
        >
          <Image
            src="/banner-animate.gif"
            alt="Preview"
            width={1280}
            height={500}
            className="w-full object-cover"
            unoptimized
          />
        </motion.div>
      </main>

      {/* Footer */}
      <footer className="w-full border-t border-neutral-200 dark:border-neutral-800 py-6 text-center text-sm text-muted-foreground">
        Made with ❤️ by <span className="text-primary font-semibold">Yogesh</span>
      </footer>
    </div>
  );
}
