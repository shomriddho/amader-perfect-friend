import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ChevronDown } from "lucide-react";

export default function ScrollIndicator() {
  const containerRef = useRef<HTMLDivElement>(null);
  const arrowRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // 1. Continuous bounce animation for the arrow
      gsap.to(arrowRef.current, {
        y: 8,
        duration: 0.8,
        repeat: -1,
        yoyo: true,
        ease: "power1.inOut",
      });

      // 2. Hide indicator smoothly on scroll
      const handleScroll = () => {
        if (window.scrollY > 50) {
          gsap.to(containerRef.current, {
            opacity: 0,
            y: 15,
            duration: 0.4,
            ease: "power2.out",
            pointerEvents: "none",
          });
        } else {
          gsap.to(containerRef.current, {
            opacity: 1,
            y: 0,
            duration: 0.4,
            ease: "power2.out",
            pointerEvents: "auto",
          });
        }
      };

      window.addEventListener("scroll", handleScroll);

      return () => {
        window.removeEventListener("scroll", handleScroll);
      };
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div
      ref={containerRef}
      className="flex flex-col items-center gap-1 text-sky-600/80 hover:text-sky-600 cursor-pointer transition-colors pt-4"
      onClick={() => {
        window.scrollTo({
          top: window.innerHeight * 0.8,
          behavior: "smooth",
        });
      }}
    >
      <span className="text-xs uppercase tracking-widest font-semibold font-sans">
        Scroll Down
      </span>
      <div ref={arrowRef}>
        <ChevronDown className="w-5 h-5" />
      </div>
    </div>
  );
}
