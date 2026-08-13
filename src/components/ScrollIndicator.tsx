import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollSmoother } from "gsap/ScrollSmoother";
import { ChevronDown } from "lucide-react";

interface ScrollIndicatorProps {
  label?: string;
}

export default function ScrollIndicator({
  label = "Scroll Down",
}: ScrollIndicatorProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const arrowRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Continuous bounce animation
      gsap.to(arrowRef.current, {
        y: 8,
        duration: 0.8,
        repeat: -1,
        yoyo: true,
        ease: "power1.inOut",
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  const handleClick = () => {
    const smoother = ScrollSmoother.get();
    if (containerRef.current) {
      // Find the parent section or container of this indicator
      const currentSection =
        containerRef.current.closest("section") ||
        containerRef.current.parentElement;
      const nextElement =
        currentSection?.nextElementSibling as HTMLElement | null;

      if (nextElement) {
        if (smoother) {
          smoother.scrollTo(nextElement, true, "top top");
        } else {
          nextElement.scrollIntoView({ behavior: "smooth" });
        }
      } else {
        // Fallback: scroll down 1 full screen height if no next element exists
        const targetY = window.scrollY + window.innerHeight;
        if (smoother) {
          smoother.scrollTo(targetY, true);
        } else {
          window.scrollTo({ top: targetY, behavior: "smooth" });
        }
      }
    }
  };

  return (
    <div
      ref={containerRef}
      onClick={handleClick}
      className="flex flex-col items-center gap-1 text-sky-600/80 hover:text-sky-600 cursor-pointer transition-colors pt-6"
    >
      <span className="text-xs uppercase tracking-widest font-semibold font-sans select-none">
        {label}
      </span>
      <div ref={arrowRef}>
        <ChevronDown className="w-5 h-5" />
      </div>
    </div>
  );
}
