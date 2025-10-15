"use client";

import { useEffect, useState } from "react";

interface Sparkle {
  id: number;
  angle: number;
  delay: number;
}

interface SparkleBurstProps {
  trigger: boolean;
  onComplete?: () => void;
}

export function SparkleBurst({ trigger, onComplete }: SparkleBurstProps) {
  const [sparkles, setSparkles] = useState<Sparkle[]>([]);

  useEffect(() => {
    if (trigger) {
      // Generate 12 sparkles in a circle
      const newSparkles = Array.from({ length: 12 }, (_, i) => ({
        id: i,
        angle: (i * 360) / 12,
        delay: i * 30, // Stagger the animation
      }));

      setSparkles(newSparkles);

      // Clean up after animation completes
      const timer = setTimeout(() => {
        setSparkles([]);
        onComplete?.();
      }, 1000);

      return () => clearTimeout(timer);
    }
  }, [trigger, onComplete]);

  if (sparkles.length === 0) return null;

  return (
    <div className="absolute inset-0 pointer-events-none overflow-visible">
      {sparkles.map((sparkle) => (
        <div
          key={sparkle.id}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
          style={{
            animation: `sparkle-burst 0.8s ease-out forwards`,
            animationDelay: `${sparkle.delay}ms`,
            transform: `rotate(${sparkle.angle}deg)`,
          }}
        >
          <div className="relative w-3 h-3">
            {/* Main sparkle */}
            <svg
              viewBox="0 0 24 24"
              fill="none"
              className="w-full h-full text-[#47FFBF]"
              style={{
                filter: "drop-shadow(0 0 4px #47FFBF)",
              }}
            >
              <path
                d="M12 0L13.5 8.5L22 10L13.5 11.5L12 20L10.5 11.5L2 10L10.5 8.5L12 0Z"
                fill="currentColor"
              />
            </svg>
          </div>
        </div>
      ))}
      <style jsx>{`
        @keyframes sparkle-burst {
          0% {
            transform: rotate(${sparkles[0]?.angle || 0}deg) translateY(0) scale(0);
            opacity: 1;
          }
          50% {
            opacity: 1;
          }
          100% {
            transform: rotate(${sparkles[0]?.angle || 0}deg) translateY(-60px) scale(1);
            opacity: 0;
          }
        }
      `}</style>
    </div>
  );
}
