import { useState, useEffect, useRef } from "react";
import gsap from "gsap";
import { Clock } from "lucide-react";

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

export default function Timer() {
  const targetDate = new Date("2026-08-15T00:00:00").getTime();
  const timerCardRef = useRef<HTMLDivElement>(null);

  const calculateTimeLeft = (): TimeLeft => {
    const now = new Date().getTime();
    const difference = targetDate - now;

    if (difference <= 0) {
      return { days: 0, hours: 0, minutes: 0, seconds: 0 };
    }

    return {
      days: Math.floor(difference / (1000 * 60 * 60 * 24)),
      hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
      minutes: Math.floor((difference / 1000 / 60) % 60),
      seconds: Math.floor((difference / 1000) % 60),
    };
  };

  const [timeLeft, setTimeLeft] = useState<TimeLeft>(calculateTimeLeft());

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  // Entrance animation for cards
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".timer-card", {
        opacity: 0,
        y: 30,
        scale: 0.9,
        duration: 0.8,
        stagger: 0.1,
        ease: "back.out(1.7)",
      });
    }, timerCardRef);

    return () => ctx.revert();
  }, []);

  return (
    <div
      ref={timerCardRef}
      className="w-full max-w-4xl mx-auto my-8 p-6 rounded-3xl bg-white/70 border border-sky-100 shadow-xl shadow-sky-100/50 backdrop-blur-md"
    >
      <div className="flex items-center justify-center gap-2 mb-6 text-sky-600">
        <Clock className="w-5 h-5 animate-pulse" />
        <span className="text-xs uppercase tracking-widest font-semibold text-sky-800/70">
          Birthday Countdown
        </span>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <TimeUnit value={timeLeft.days} label="Days" />
        <TimeUnit value={timeLeft.hours} label="Hours" />
        <TimeUnit value={timeLeft.minutes} label="Minutes" />
        <TimeUnit value={timeLeft.seconds} label="Seconds" />
      </div>
    </div>
  );
}

function TimeUnit({ value, label }: { value: number; label: string }) {
  const formattedValue = String(value).padStart(2, "0");
  const numRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    if (numRef.current) {
      gsap.fromTo(
        numRef.current,
        { y: -12, opacity: 0, scale: 0.85 },
        { y: 0, opacity: 1, scale: 1, duration: 0.4, ease: "back.out(2)" },
      );
    }
  }, [formattedValue]);

  return (
    <div className="timer-card flex flex-col items-center">
      <div className="relative w-full h-24 sm:h-28 bg-gradient-to-b from-sky-50 to-white rounded-2xl border border-sky-100 flex items-center justify-center shadow-md shadow-sky-100 overflow-hidden">
        {/* Top Highlight Bar */}
        <div className="absolute inset-x-0 top-0 h-[2px] bg-gradient-to-r from-transparent via-sky-400 to-transparent" />
        <div className="absolute inset-x-0 top-1/2 h-[1px] bg-sky-100/60" />

        {/* GSAP Animated Digit */}
        <span
          ref={numRef}
          className="text-4xl sm:text-6xl font-bold tracking-wider text-sky-600 font-mono"
        >
          {formattedValue}
        </span>
      </div>
      <span className="mt-3 text-xs font-semibold uppercase tracking-widest text-slate-500">
        {label}
      </span>
    </div>
  );
}
