"use client";

import { useEffect, useState } from "react";

interface ConfettiParticle {
  id: number;
  x: number;
  y: number;
  color: string;
  rotation: number;
  scale: number;
  duration: number;
  delay: number;
}

interface ConfettiProps {
  trigger: boolean;
}

const COLORS = ["#47FFBF", "#286CFF", "#8376FF", "#FF48C7", "#FFD700", "#FF6B6B"];

export function Confetti({ trigger }: ConfettiProps) {
  const [particles, setParticles] = useState<ConfettiParticle[]>([]);

  useEffect(() => {
    if (trigger) {
      // Generate 40 confetti particles
      const newParticles = Array.from({ length: 40 }, (_, i) => ({
        id: i,
        x: Math.random() * 100, // Random X position (0-100%)
        y: -10, // Start above viewport
        color: COLORS[Math.floor(Math.random() * COLORS.length)],
        rotation: Math.random() * 360,
        scale: 0.5 + Math.random() * 0.5, // Random scale between 0.5 and 1
        duration: 2 + Math.random() * 2, // Fall duration 2-4 seconds
        delay: Math.random() * 0.5, // Stagger start times
      }));

      setParticles(newParticles);

      // Clean up after animation
      const timer = setTimeout(() => {
        setParticles([]);
      }, 5000);

      return () => clearTimeout(timer);
    }
  }, [trigger]);

  if (particles.length === 0) return null;

  return (
    <div className="fixed inset-0 pointer-events-none z-50 overflow-hidden">
      {particles.map((particle) => (
        <div
          key={particle.id}
          className="absolute"
          style={{
            left: `${particle.x}%`,
            top: `${particle.y}%`,
            animation: `confetti-fall ${particle.duration}s ease-in forwards`,
            animationDelay: `${particle.delay}s`,
          }}
        >
          <div
            className="w-2 h-3 rounded-sm"
            style={{
              backgroundColor: particle.color,
              transform: `rotate(${particle.rotation}deg) scale(${particle.scale})`,
              animation: `confetti-spin ${particle.duration}s linear infinite`,
              boxShadow: `0 0 8px ${particle.color}`,
            }}
          />
        </div>
      ))}
      <style jsx>{`
        @keyframes confetti-fall {
          0% {
            transform: translateY(0) translateX(0);
            opacity: 1;
          }
          100% {
            transform: translateY(100vh) translateX(${Math.random() * 200 - 100}px);
            opacity: 0;
          }
        }
        @keyframes confetti-spin {
          0% {
            transform: rotate(0deg);
          }
          100% {
            transform: rotate(720deg);
          }
        }
      `}</style>
    </div>
  );
}
