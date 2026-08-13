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
    <div className="fixed inset-0 z-50 flex  justify-center items-center   bg-black w-full">
      <h1 ref={titleRef}>
        <p className="sm:text-7xl text-6xl font-semibold tracking-wide text-white md:mr-6 mb-8 md:inline">
          আমাদের
        </p>
        <span className="text-amber-500 sm:text-9xl text-8xl ms-madi-regular md:inline">
          Friend
        </span>
      </h1>
    </div>
  );
}

export default Splash;
