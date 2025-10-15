"use client";

import { cn } from "@/lib/utils";

interface FilmGrainOverlayProps {
  className?: string;
  intensity?: "subtle" | "medium" | "strong";
  animated?: boolean;
}

export function FilmGrainOverlay({
  className,
  intensity = "subtle",
  animated = true
}: FilmGrainOverlayProps) {
  const intensityMap = {
    subtle: "opacity-[0.04]",
    medium: "opacity-[0.06]",
    strong: "opacity-[0.08]",
  };

  return (
    <div
      className={cn(
        "fixed inset-0 pointer-events-none z-[100]",
        intensityMap[intensity],
        animated && "animate-grain",
        className
      )}
      style={{
        mixBlendMode: "overlay",
        backgroundImage: `
          repeating-linear-gradient(
            0deg,
            transparent,
            transparent 1px,
            rgba(255, 255, 255, 0.03) 1px,
            rgba(255, 255, 255, 0.03) 2px
          ),
          repeating-linear-gradient(
            90deg,
            transparent,
            transparent 1px,
            rgba(255, 255, 255, 0.03) 1px,
            rgba(255, 255, 255, 0.03) 2px
          ),
          repeating-linear-gradient(
            45deg,
            transparent,
            transparent 1.5px,
            rgba(255, 255, 255, 0.02) 1.5px,
            rgba(255, 255, 255, 0.02) 3px
          ),
          repeating-linear-gradient(
            -45deg,
            transparent,
            transparent 1.5px,
            rgba(255, 255, 255, 0.015) 1.5px,
            rgba(255, 255, 255, 0.015) 3px
          )
        `,
      }}
    />
  );
}
