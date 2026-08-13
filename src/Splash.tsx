import { useEffect, useRef } from "react";
import gsap from "gsap";

function Splash() {
  const titleRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        titleRef.current,
        { opacity: 0, scale: 0.8, y: 20 },
        { opacity: 1, scale: 1, y: 0, duration: 1.2, ease: "power3.out" },
      );
    });

    return () => ctx.revert();
  }, []);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black">
      <h1
        ref={titleRef}
        className="text-5xl font-semibold tracking-wide text-white "
      >
        <span>আমাদের</span>
        <span className="text-[#FFB800]">Friend</span>
      </h1>
    </div>
  );
}

export default Splash;
