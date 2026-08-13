import { useState, useEffect } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ScrollSmoother } from "gsap/ScrollSmoother";

import Splash from "@/components/Splash";
import Timer from "@/components/Timer";
import ScrollIndicator from "@/components/ScrollIndicator";
import LetterEditor from "@/components/LetterEditor";

gsap.registerPlugin(ScrollTrigger, ScrollSmoother);

const queryClient = new QueryClient();

function AppContent() {
  const [showSplash, setShowSplash] = useState(true);
  const [letterContent, setLetterContent] = useState("");

  useEffect(() => {
    const ctx = gsap.context(() => {
      ScrollSmoother.create({
        wrapper: "#smooth-wrapper",
        content: "#smooth-content",
        smooth: 1,
        effects: true,
      });
    });

    return () => ctx.revert();
  }, []);

  const handleSplashComplete = () => {
    setShowSplash(false);
    setTimeout(() => {
      ScrollTrigger.refresh();
    }, 100);
  };

  return (
    <>
      {showSplash && <Splash onComplete={handleSplashComplete} />}

      <div id="smooth-wrapper">
        <div id="smooth-content">
          <main className="min-h-screen bg-linear-to-b from-sky-50 via-white to-sky-50/50 text-slate-800 flex flex-col items-center justify-center p-6 space-y-6 text-center">
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

            <Timer />
            <ScrollIndicator />

            <section className="h-screen flex items-center justify-center flex-col">
              <p className="text-3xl text-slate-400 font-sans max-w-xl">
                Eta Ashfika Hole, Chole Jao, Ekhane Boshe Theka Lagbe Na.
              </p>
              <br />
              <p className="text-3xl text-slate-400 font-sans max-w-xl">
                Shotti E Website E Arr Kichu Nai.
              </p>
            </section>

            <section className="h-screen flex items-center justify-center flex-col space-y-8">
              <p className="text-3xl text-slate-400 font-sans max-w-xl">
                Shhhh, Ashfika Ehkan Theke Chole Gese, Tumi Jodi O Ke chine
                Thako, Tahole, Orr Jonno Chithi Likho.
              </p>

              <ScrollIndicator />
            </section>

            <section className="min-h-screen flex items-center justify-center flex-col space-y-8 w-full max-w-3xl mx-auto py-12 px-4">
              <LetterEditor
                value={letterContent}
                onChange={(html) => setLetterContent(html)}
              />
            </section>
          </main>
        </div>
      </div>
    </>
  );
}

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AppContent />
    </QueryClientProvider>
  );
}
