import { useState, useEffect, lazy, Suspense } from "react";
import { useNavigate } from "react-router-dom";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ScrollSmoother } from "gsap/ScrollSmoother";

import Splash from "@/components/Splash";
import Timer from "@/components/Timer";
import ScrollIndicator from "@/components/ScrollIndicator";
import {
  LetterLoadReveal,
  WordLoadReveal,
  ScrollRevealText,
} from "@/components/TextAnimations";
import Footer from "#components/Footer";

const LetterEditor = lazy(() => import("@/components/LetterEditor"));

gsap.registerPlugin(ScrollTrigger, ScrollSmoother);

export default function HomePage() {
  const [showSplash, setShowSplash] = useState(true);
  const [letterContent, setLetterContent] = useState("");
  const navigate = useNavigate();

  const handleTimerComplete = () => {
    navigate("/main");
  };

  useEffect(() => {
    if (showSplash) return;

    const ctx = gsap.context(() => {
      ScrollSmoother.create({
        wrapper: "#smooth-wrapper",
        content: "#smooth-content",
        smooth: 1,
        effects: true,
      });

      setTimeout(() => {
        ScrollTrigger.refresh();
      }, 100);
    });

    return () => ctx.revert();
  }, [showSplash]);

  const handleSplashComplete = () => {
    setShowSplash(false);
  };

  return (
    <>
      {showSplash && <Splash onComplete={handleSplashComplete} />}

      <div id="smooth-wrapper">
        <div id="smooth-content">
          <main className="min-h-screen bg-linear-to-b from-sky-50 via-white to-sky-50/50 text-slate-800 flex flex-col items-center justify-center p-6 space-y-6 text-center">
            {/* Title */}
            <LetterLoadReveal
              text="Ashfika"
              className="text-6xl sm:text-9xl font-bold ms-madi-regular text-sky-600 drop-shadow-sm"
              delay={0.1}
              enabled={!showSplash}
            />

            {/* Subtitles */}
            <div className="space-y-2">
              <WordLoadReveal
                text="Eta Ashfikar Birthday Gift Hobe,"
                className="sm:text-6xl text-4xl ms-madi-regular text-slate-800"
                delay={0.6}
                enabled={!showSplash}
              />
              <WordLoadReveal
                text="Ekhono,"
                className="sm:text-6xl text-4xl ms-madi-regular text-slate-800"
                delay={1.3}
                enabled={!showSplash}
              />
            </div>

            <Timer onComplete={handleTimerComplete} />

            <WordLoadReveal
              text="Baki."
              className="sm:text-6xl text-4xl ms-madi-regular text-slate-800"
              delay={1.8}
              enabled={!showSplash}
            />

            <ScrollIndicator />

            {/* Scroll-driven word-by-word sections */}
            <section className="h-[130vh] flex items-center justify-center flex-col space-y-8">
              <ScrollRevealText
                text="Eta Ashfika Hole, Chole Jao, Ekhane Boshe Theka Lagbe Na."
                className="text-3xl text-slate-800 font-sans max-w-xl leading-relaxed"
                enabled={!showSplash}
              />
              <ScrollRevealText
                text="Shotti E Website E Arr Kichu Nai."
                className="text-3xl text-slate-800 font-sans max-w-xl leading-relaxed"
                enabled={!showSplash}
              />
            </section>

            <section className="h-[40vh] flex items-center justify-center flex-col space-y-8">
              <ScrollRevealText
                text="Shhhh, Ashfika Ehkan Theke Chole Gese, Tumi Jodi O Ke chine Thako, Tahole, Orr Jonno Chithi Likho."
                className="text-3xl text-slate-800 font-sans max-w-xl leading-relaxed"
                enabled={!showSplash}
              />

              <ScrollIndicator />
            </section>

            {/* Editor Section */}
            <section className="min-h-screen flex items-center justify-center flex-col w-full max-w-3xl mx-auto py-12 px-4">
              <Suspense
                fallback={
                  <div className="h-64 flex items-center justify-center">
                    Loading editor...
                  </div>
                }
              >
                <LetterEditor
                  value={letterContent}
                  onChange={(html) => setLetterContent(html)}
                />
              </Suspense>
            </section>

            {/* Final static non-animated section */}
            <section className="h-screen flex items-center justify-center flex-col space-y-8 w-full">
              <p className="text-3xl text-slate-800 font-sans max-w-xl">
                Ok, tahole tomar kag shesh.
              </p>
              <Timer />
              <p className="text-3xl text-slate-800 font-sans max-w-xl">
                Pore ashben 😊
              </p>
            </section>
          </main>
          <Footer enabled={!showSplash} />
        </div>
      </div>
    </>
  );
}
