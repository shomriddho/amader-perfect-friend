import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

interface FooterProps {
  className?: string;
  enabled?: boolean;
}

export default function Footer({
  className = "",
  enabled = true,
}: FooterProps) {
  const footerRef = useRef<HTMLElement>(null);
  const imageRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    if (!enabled || !footerRef.current || !imageRef.current) return;

    const ctx = gsap.context(() => {
      // Animates 3.webp entering from far right to its resting position on scroll
      gsap.fromTo(
        imageRef.current,
        {
          x: "100vw", // Start off-screen to the right
          opacity: 0,
          rotate: 15,
        },
        {
          x: 0,
          opacity: 1,
          rotate: 0,
          ease: "power2.out",
          scrollTrigger: {
            trigger: footerRef.current,
            start: "top 100%", // Trigger when footer approaches viewport
            end: "bottom 100%",
            scrub: 1, // Smooth scrub linked to scroll position
          },
        },
      );
    }, footerRef);

    return () => ctx.revert();
  }, [enabled]);

  return (
    <footer
      ref={footerRef}
      className={`relative w-full py-12 flex flex-col items-center justify-center overflow-hidden from-sky-50 via-white to-sky-50/50 ${className}`}
    >
      <div className="container mx-auto px-6 flex flex-col sm:flex-row items-center justify-between gap-6">
        {/* Left Side Content */}
        <p className="text-sm font-medium text-slate-500 font-sans">
          Made with ❤️ for Ashfika's Special Day
        </p>

        {/* Right Side / Animated Art (3.webp) */}
        <div className="relative w-full h-auto flex items-center justify-center">
          <img
            ref={imageRef}
            src="/art/3.webp"
            alt="Footer Decoration"
            className="w-full h-auto object-contain drop-shadow-md will-change-transform"
          />
        </div>
      </div>
    </footer>
  );
}
