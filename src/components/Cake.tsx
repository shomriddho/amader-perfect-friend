import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

interface CakeProps {
  className?: string;
  enabled?: boolean;
}

const IMAGES = ["/1.webp", "/2.webp", "/3.webp"];

export default function Cake({ className = "", enabled = true }: CakeProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLImageElement>(null);

  const [clickCount, setClickCount] = useState(0);
  const [imageIndex, setImageIndex] = useState(0);

  // Handle Scroll-triggered entrance animation
  useEffect(() => {
    if (!enabled || !containerRef.current || !imageRef.current) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        imageRef.current,
        {
          opacity: 0,
          scale: 0.85,
          y: 40,
          filter: "blur(8px)",
        },
        {
          opacity: 1,
          scale: 1,
          y: 0,
          filter: "blur(0px)",
          duration: 1,
          ease: "power2.out",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top 80%",
            end: "top 30%",
            scrub: 0.8,
          },
        },
      );
    }, containerRef);

    return () => ctx.revert();
  }, [enabled]);

  // Click handler with GSAP pop animation and stage switching logic
  const handleCakeClick = () => {
    if (!imageRef.current) return;

    // Trigger alert if already at 3.webp
    if (imageIndex === IMAGES.length - 1) {
      alert("Arr Khaoa Jabe Na, Baki Ta Shomriddho Er Jonno");
      return;
    }

    // GSAP quick scale pop animation
    gsap
      .timeline()
      .to(imageRef.current, {
        scale: 1.15,
        duration: 0.12,
        ease: "power2.out",
      })
      .to(imageRef.current, {
        scale: 1,
        duration: 0.2,
        ease: "back.out(2)",
      });

    const nextClickCount = clickCount + 1;
    setClickCount(nextClickCount);

    // Switch image every 2 clicks
    if (nextClickCount % 2 === 0) {
      const nextIndex = imageIndex + 1;
      setImageIndex(nextIndex);

      if (nextIndex === IMAGES.length - 1) {
        // Show alert immediately upon transitioning to 3.webp
        setTimeout(() => {
          alert("Arr Khaoa Jabe Na, Baki Ta Shomriddho Er Jonno");
        }, 150);
      }
    }
  };

  return (
    <section
      ref={containerRef}
      className={`w-full min-h-[80vh] flex items-center justify-center py-12 px-4 overflow-hidden ${className}`}
    >
      <div className="w-[90vw] max-w-6xl flex items-center justify-center">
        <img
          ref={imageRef}
          src={IMAGES[imageIndex]}
          alt="Birthday Cake"
          onClick={handleCakeClick}
          className="w-full h-auto max-h-[80vh] object-contain drop-shadow-2xl rounded-3xl will-change-transform cursor-pointer transition-opacity"
        />
      </div>
    </section>
  );
}
