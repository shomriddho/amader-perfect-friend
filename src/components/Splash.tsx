import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { SplitText } from "gsap/SplitText";
import { ScrambleTextPlugin } from "gsap/ScrambleTextPlugin";
import { Progress } from "@/components/ui/progress";

// Register the plugins
gsap.registerPlugin(SplitText, ScrambleTextPlugin);

interface SplashProps {
  onComplete?: () => void;
}

function Splash({ onComplete }: SplashProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const friendRef = useRef<HTMLSpanElement>(null);
  const [progress, setProgress] = useState(0);

  // Disable page scroll while splash screen is active
  useEffect(() => {
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = "";
    };
  }, []);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline();

      // 1. Main entrance for the text container
      tl.fromTo(
        titleRef.current,
        { opacity: 0, scale: 0.8, y: 20 },
        { opacity: 1, scale: 1, y: 0, duration: 0.8, ease: "power3.out" },
      );

      // 2. Split "Friend" into individual character spans & scramble
      if (friendRef.current) {
        const split = new SplitText(friendRef.current, { type: "chars" });

        tl.fromTo(
          split.chars,
          { opacity: 0, y: 20 },
          {
            opacity: 1,
            y: 0,
            duration: 1.2,
            stagger: 0.1,
            ease: "back.out(1.7)",
            scrambleText: {
              text: "{original}",
              chars: "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz",
              speed: 0.2,
            },
          },
          "-=0.4",
        );
      }

      // 3. Animate progress bar state from 0 to 100 over 3 seconds
      const progressObj = { value: 0 };
      tl.to(
        progressObj,
        {
          value: 100,
          duration: 3,
          ease: "power1.inOut",
          onUpdate: () => {
            setProgress(Math.round(progressObj.value));
          },
        },
        "-=2",
      );

      // 4. Smoothly fade out the splash screen before unmounting
      tl.to(containerRef.current, {
        opacity: 0,
        duration: 1,
        ease: "power1.inOut",
        onComplete: () => {
          onComplete?.();
        },
      });
    });

    return () => ctx.revert();
  }, [onComplete]);

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 z-50 flex flex-col justify-center items-center bg-black w-full px-4"
    >
      <h1 ref={titleRef} className="text-center">
        <p className="sm:text-7xl text-6xl font-semibold tracking-wide text-white md:mr-6 mb-8 md:inline">
          আমাদের
        </p>
        <span
          ref={friendRef}
          className="text-amber-500 sm:text-9xl text-8xl ms-madi-regular md:inline-block"
        >
          Friend
        </span>
      </h1>

      {/* Progress Bar Container */}
      <div className="w-full max-w-sm mt-12 space-y-2">
        <Progress value={progress} className="h-1" />
        <p className="text-center text-xs text-zinc-400">{progress}%</p>
      </div>
    </div>
  );
}

export default Splash;
