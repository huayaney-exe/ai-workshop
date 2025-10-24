"use client";

import { useState, useEffect } from "react";

export function CountdownTimer() {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    // Registration deadline: October 31st, 2025 at 11:59 PM (23:59) Lima time (UTC-5)
    const targetDate = new Date("2025-10-31T23:59:59-05:00").getTime();

    const updateCountdown = () => {
      const now = new Date().getTime();
      const difference = targetDate - now;

      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
          minutes: Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60)),
          seconds: Math.floor((difference % (1000 * 60)) / 1000),
        });
      } else {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
      }
    };

    updateCountdown();
    const interval = setInterval(updateCountdown, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex items-center justify-center gap-2 text-sm md:text-base">
      <span className="text-gray-300">⏰ Cupos Limitados • Cierre de aplicaciones en:</span>
      <div className="flex items-center gap-1 font-mono font-semibold text-[#47FFBF]">
        <span>{timeLeft.days}d</span>
        <span className="text-gray-500">:</span>
        <span>{String(timeLeft.hours).padStart(2, "0")}h</span>
        <span className="text-gray-500">:</span>
        <span>{String(timeLeft.minutes).padStart(2, "0")}m</span>
        <span className="text-gray-500">:</span>
        <span>{String(timeLeft.seconds).padStart(2, "0")}s</span>
      </div>
    </div>
  );
}
