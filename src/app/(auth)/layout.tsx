import Logo from "@/components/Logo";
import TextAnimationHeading from "@/components/TextAnimationHeading";
import { Suspense } from "react";

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="grid lg:grid-cols-2 min-h-screen h-full bg-background text-foreground transition-colors">
      {/* Left side - Logo + Text */}
      <div className="hidden lg:flex flex-col px-10 py-8 bg-gradient-to-br from-primary/10 via-background/5 to-transparent relative overflow-hidden">
        {/* Decorative glow */}
        <div className="absolute -top-20 -left-20 w-80 h-80 bg-primary/30 rounded-full blur-3xl opacity-30" />
        <div className="absolute bottom-10 right-10 w-40 h-40 bg-purple-500/20 rounded-full blur-2xl opacity-20" />

        {/* Logo */}
        <div className="z-10">
          <Logo />
        </div>

        {/* Animated Heading */}
        <div className="flex-1 flex items-center justify-center z-10">
          <TextAnimationHeading className="text-center" />
        </div>

        {/* Optional quote / caption */}
        <p className="z-10 text-sm text-muted-foreground text-center">
          Designed for modern teams.
        </p>
      </div>

      {/* Right side - Auth Form */}
      <div className="flex items-center justify-center px-6 py-12 overflow-auto">
        <Suspense fallback={<p className="text-center text-sm">Loading...</p>}>
          <div className="w-full max-w-md">
            {children}
          </div>
        </Suspense>
      </div>
    </div>
  );
}
