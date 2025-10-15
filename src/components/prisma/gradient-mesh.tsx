"use client";

import { cn } from "@/lib/utils";

interface GradientMeshProps {
  className?: string;
}

export function GradientMesh({ className }: GradientMeshProps) {
  return (
    <div className={cn("absolute inset-0 overflow-hidden", className)}>
      {/* Animated gradient orbs - more vibrant with correct colors */}
      <div className="absolute -top-40 -right-40 h-80 w-80 rounded-full bg-gradient-to-br from-[#47FFBF] to-[#47FFBF]/30 opacity-70 blur-[80px] animate-pulse" />
      <div className="absolute -bottom-40 -left-40 h-96 w-96 rounded-full bg-gradient-to-tr from-[#286CFF] to-[#286CFF]/30 opacity-70 blur-[80px] animate-pulse animation-delay-2000" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-72 w-72 rounded-full bg-gradient-to-br from-[#FF4895] to-[#FF4895]/30 opacity-60 blur-[80px] animate-pulse animation-delay-4000" />

      {/* Additional mesh gradients - more prominent */}
      <div className="absolute top-20 right-1/4 h-96 w-96 rounded-full bg-gradient-to-bl from-[#47FFBF]/40 to-transparent blur-[60px]" />
      <div className="absolute bottom-20 left-1/4 h-96 w-96 rounded-full bg-gradient-to-tl from-[#286CFF]/40 to-transparent blur-[60px]" />

      {/* Enhanced mesh pattern overlay */}
      <div
        className="absolute inset-0 opacity-40"
        style={{
          backgroundImage: `
            radial-gradient(circle at 20% 50%, rgba(71, 255, 191, 0.4) 0%, transparent 40%),
            radial-gradient(circle at 80% 50%, rgba(40, 108, 255, 0.4) 0%, transparent 40%),
            radial-gradient(circle at 50% 90%, rgba(255, 72, 149, 0.4) 0%, transparent 40%)
          `,
        }}
      />

      {/* Add a subtle noise texture for more depth */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
        }}
      />
    </div>
  );
}
