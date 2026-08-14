"use client";

import { useState, useRef, useEffect } from "react";
import { Play, XIcon } from "lucide-react";
import gsap from "gsap";
import { cn } from "@/lib/utils";

type AnimationStyle =
  | "from-bottom"
  | "from-center"
  | "from-top"
  | "from-left"
  | "from-right"
  | "fade"
  | "top-in-bottom-out"
  | "left-in-right-out";

interface HeroVideoProps {
  animationStyle?: AnimationStyle;
  videoSrc?: string;
  youtubeId?: string; // Optional: Pass YouTube ID to auto-generate embed & thumbnail
  thumbnailSrc?: string;
  thumbnailAlt?: string;
  className?: string;
}

export function HeroVideoDialog({
  animationStyle = "from-center",
  videoSrc,
  youtubeId,
  thumbnailSrc,
  thumbnailAlt = "Video thumbnail",
  className,
}: HeroVideoProps) {
  const [isVideoOpen, setIsVideoOpen] = useState(false);

  // Refs for GSAP target elements
  const backdropRef = useRef<HTMLDivElement>(null);
  const modalRef = useRef<HTMLDivElement>(null);

  // Auto-generate embed link and thumbnail if youtubeId is passed
  const finalVideoSrc = youtubeId
    ? `https://www.youtube.com/embed/${youtubeId}?autoplay=1`
    : videoSrc;

  const finalThumbnailSrc = youtubeId
    ? thumbnailSrc ||
      `https://img.youtube.com/vi/${youtubeId}/maxresdefault.jpg`
    : thumbnailSrc;

  // Function to return initial GSAP state based on selected style
  const getInitialState = (style: AnimationStyle) => {
    switch (style) {
      case "from-bottom":
        return { y: "100%", opacity: 0, scale: 1, x: 0 };
      case "from-top":
        return { y: "-100%", opacity: 0, scale: 1, x: 0 };
      case "from-left":
        return { x: "-100%", opacity: 0, scale: 1, y: 0 };
      case "from-right":
        return { x: "100%", opacity: 0, scale: 1, y: 0 };
      case "fade":
        return { opacity: 0, scale: 1, x: 0, y: 0 };
      case "top-in-bottom-out":
        return { y: "-100%", opacity: 0, scale: 1, x: 0 };
      case "left-in-right-out":
        return { x: "-100%", opacity: 0, scale: 1, y: 0 };
      case "from-center":
      default:
        return { scale: 0.5, opacity: 0, x: 0, y: 0 };
    }
  };

  // Function to return exit GSAP state based on selected style
  const getExitState = (style: AnimationStyle) => {
    switch (style) {
      case "top-in-bottom-out":
        return { y: "100%", opacity: 0 };
      case "left-in-right-out":
        return { x: "100%", opacity: 0 };
      default:
        return getInitialState(style);
    }
  };

  // Handle Opening GSAP Animation
  useEffect(() => {
    if (!isVideoOpen || !backdropRef.current || !modalRef.current) return;

    const ctx = gsap.context(() => {
      const initialState = getInitialState(animationStyle);

      // Fade in backdrop
      gsap.fromTo(
        backdropRef.current,
        { opacity: 0 },
        { opacity: 1, duration: 0.3, ease: "power2.out" },
      );

      // Animate modal container with spring-like physics
      gsap.fromTo(modalRef.current, initialState, {
        x: 0,
        y: 0,
        scale: 1,
        opacity: 1,
        duration: 0.5,
        ease: "back.out(1.2)",
      });
    });

    return () => ctx.revert();
  }, [isVideoOpen, animationStyle]);

  // Handle Closing GSAP Animation smoothly before state unmount
  const handleClose = () => {
    if (!backdropRef.current || !modalRef.current) {
      setIsVideoOpen(false);
      return;
    }

    const exitState = getExitState(animationStyle);

    // Fade out backdrop
    gsap.to(backdropRef.current, {
      opacity: 0,
      duration: 0.25,
      ease: "power2.in",
    });

    // Exit animation for modal box
    gsap.to(modalRef.current, {
      ...exitState,
      duration: 0.3,
      ease: "power2.in",
      onComplete: () => {
        setIsVideoOpen(false);
      },
    });
  };

  return (
    <div className={cn("relative", className)}>
      {/* Thumbnail Trigger Button */}
      <button
        type="button"
        aria-label="Play video"
        className="group relative cursor-pointer border-0 bg-transparent p-0 w-full"
        onClick={() => setIsVideoOpen(true)}
      >
        <img
          src={finalThumbnailSrc}
          alt={thumbnailAlt}
          width={1920}
          height={1080}
          className="w-full rounded-md border shadow-lg transition-all duration-200 ease-out group-hover:brightness-[0.8]"
        />
        <div className="absolute inset-0 flex scale-[0.9] items-center justify-center rounded-2xl transition-all duration-200 ease-out group-hover:scale-100">
          <div className="bg-primary/10 flex size-28 items-center justify-center rounded-full backdrop-blur-md">
            <div className="from-primary/30 to-primary relative flex size-20 scale-100 items-center justify-center rounded-full bg-gradient-to-b shadow-md transition-all duration-200 ease-out group-hover:scale-[1.2]">
              <Play
                className="size-8 scale-100 fill-white text-white transition-transform duration-200 ease-out group-hover:scale-105"
                style={{
                  filter:
                    "drop-shadow(0 4px 3px rgb(0 0 0 / 0.07)) drop-shadow(0 2px 2px rgb(0 0 0 / 0.06))",
                }}
              />
            </div>
          </div>
        </div>
      </button>

      {/* Video Modal Dialog */}
      {isVideoOpen && (
        <div
          ref={backdropRef}
          role="button"
          tabIndex={0}
          onKeyDown={(e) => {
            if (e.key === "Escape") {
              handleClose();
            }
          }}
          onClick={handleClose}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-md p-4"
        >
          <div
            ref={modalRef}
            onClick={(e) => e.stopPropagation()} // Prevents clicks inside video from closing modal
            className="relative mx-4 aspect-video w-full max-w-4xl md:mx-0"
          >
            {/* Close Button */}
            <button
              type="button"
              aria-label="Close modal"
              onClick={handleClose}
              className="absolute -top-12 right-0 rounded-full bg-neutral-900/60 p-2 text-xl text-white ring-1 ring-white/20 backdrop-blur-md hover:bg-neutral-800 transition-colors cursor-pointer"
            >
              <XIcon className="size-5" />
            </button>

            {/* YouTube Iframe Container */}
            <div className="relative isolate z-1 size-full overflow-hidden rounded-2xl border-2 border-white/20 shadow-2xl bg-black">
              <iframe
                src={finalVideoSrc}
                title="Hero Video player"
                className="size-full rounded-2xl border-0"
                allowFullScreen
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              ></iframe>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
