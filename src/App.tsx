import { useState, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ScrollSmoother } from "gsap/ScrollSmoother";

import Splash from "@/components/Splash";
import Timer from "@/components/Timer";
import ScrollIndicator from "@/components/ScrollIndicator";

// Register plugins
gsap.registerPlugin(ScrollTrigger, ScrollSmoother);

function App() {
  const [showSplash, setShowSplash] = useState(true);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Initialize ScrollSmoother
      ScrollSmoother.create({
        wrapper: "#smooth-wrapper",
        content: "#smooth-content",
        smooth: 1, // Smooth duration in seconds
        effects: true, // Enables data-speed & data-lag attributes
      });
    });

    return () => ctx.revert();
  }, []);

  // Recalculate ScrollSmoother/ScrollTrigger layout when splash unmounts
  const handleSplashComplete = () => {
    setShowSplash(false);
    setTimeout(() => {
      ScrollTrigger.refresh();
    }, 100);
  };

  return (
    <>
      {showSplash && <Splash onComplete={handleSplashComplete} />}

      {/* ScrollSmoother Wrapper & Content Containers */}
      <div id="smooth-wrapper">
        <div id="smooth-content">
          <main className="min-h-screen bg-gradient-to-b from-sky-50 via-white to-sky-50/50 text-slate-800 flex flex-col items-center justify-center p-6 space-y-6 text-center">
            <h1 className="text-6xl sm:text-9xl font-bold ms-madi-regular text-sky-600 drop-shadow-sm">
              Ashfika
            </h1>

            <div className="space-y-2">
              <p className="sm:text-6xl text-4xl ms-madi-regular text-slate-700">
                Eta Ashfikar Birthday Gift Hobe,
              </p>
              <p className="sm:text-6xl text-4xl ms-madi-regular text-slate-500">
                Ekhono,
              </p>
            </div>

            {/* Light Sky-themed Timer */}
            <Timer />
            <ScrollIndicator />
            <section className="h-screen flex items-center justify-center">
              <p className="text-2xl text-slate-400 font-sans">
                More surprises coming soon...
              </p>
            </section>
          </main>
        </div>
      </div>
    </>
  );
}

export default App;
