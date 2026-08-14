import { useState, useEffect, useRef, Suspense } from "react";
import gsap from "gsap";
import Splash from "@/components/Splash";
import {
  LetterLoadReveal,
  ScrollRevealText,
} from "@/components/TextAnimations";
import Cake from "@/components/Cake";
import Footer from "@/components/Footer";
import ScrollIndicator from "#components/ScrollIndicator";
import LetterEditor from "#components/LetterEditor";

export default function Main() {
  const [showSplash, setShowSplash] = useState(true);
  const leftIconRef = useRef<HTMLImageElement>(null);
  const rightIconRef = useRef<HTMLImageElement>(null);

  const handleSplashComplete = () => {
    setShowSplash(false);
  };

  useEffect(() => {
    if (showSplash) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        leftIconRef.current,
        { autoAlpha: 0, x: -140, y: -100, scale: 0.3, rotation: -30 },
        {
          autoAlpha: 1,
          x: 0,
          y: 0,
          scale: 1,
          rotation: -12,
          duration: 1,
          delay: 0.8,
          ease: "back.out(1.7)",
        },
      );

      gsap.fromTo(
        rightIconRef.current,
        { autoAlpha: 0, x: 140, y: -100, scale: 0.3, rotation: 30 },
        {
          autoAlpha: 1,
          x: 0,
          y: 0,
          scale: 1,
          rotation: 12,
          duration: 1,
          delay: 1.0,
          ease: "back.out(1.7)",
        },
      );
    });

    return () => ctx.revert();
  }, [showSplash]);
  const [letterContent, setLetterContent] = useState("");
  return (
    <>
      {showSplash && <Splash onComplete={handleSplashComplete} />}

      <div className="min-h-screen bg-linear-to-b from-sky-50 via-white to-sky-50/50 text-slate-800 flex flex-col justify-between">
        {/* Main Hero Section */}
        <main className="min-h-screen flex flex-col items-center justify-center p-6 text-center overflow-hidden">
          <div className="relative inline-block px-8 py-4">
            <img
              ref={leftIconRef}
              src="/art/1.webp"
              alt="Decoration Left"
              className="absolute -top-16 -left-12 sm:-top-28 sm:-left-32 w-28 sm:w-48 h-auto object-contain pointer-events-none drop-shadow-lg z-10 opacity-0"
            />

            <img
              ref={rightIconRef}
              src="/art/2.webp"
              alt="Decoration Right"
              className="absolute -top-16 -right-12 sm:-top-28 sm:-right-32 w-28 sm:w-48 h-auto object-contain pointer-events-none drop-shadow-lg z-10 opacity-0"
            />

            <LetterLoadReveal
              text="Happy Birthday!"
              className="text-6xl sm:text-9xl font-bold ms-madi-regular text-sky-600 drop-shadow-sm leading-tight"
              delay={0.1}
              enabled={!showSplash}
            />
            <LetterLoadReveal
              text="Ashfika"
              className="text-6xl sm:text-9xl font-bold ms-madi-regular text-sky-600 drop-shadow-sm leading-tight"
              delay={0.6}
              enabled={!showSplash}
            />
          </div>
        </main>
        <section className="h-[50vh] flex items-center justify-center flex-col space-y-8">
          <ScrollRevealText
            text="Eta Ashfikar Birthday Cake, Click Kore Khao. [ Shob Khaoa Jabe Na, Amar Jonno Ektu Thakbe. ]"
            className="text-3xl text-slate-800 font-sans max-w-xl leading-relaxed"
            enabled={!showSplash}
          />
          <ScrollIndicator />
        </section>

        {/* Cake Section - Placed directly after main */}
        <Cake enabled={!showSplash} />
        <section className="h-[80vh] flex items-center justify-center flex-col space-y-8 my-12 text-slate-800 p-4">
          <ScrollRevealText
            text="Cake Ta Bhalo Chilo Na? Shaown Baniyechilo, And Ami Iceing Korechhi."
            className="text-3xl text-slate-700 font-sans max-w-xl leading-relaxed"
            enabled={!showSplash}
          />
          <ScrollRevealText
            text="Ekhon Tahole Arr Ki Baki Thaklo? "
            className="text-3xl text-slate-700 font-sans max-w-xl leading-relaxed"
            enabled={!showSplash}
          />
          <ScrollRevealText
            text="Birthday Party ✅"
            className="text-3xl text-slate-700 font-sans max-w-xl leading-relaxed"
            enabled={!showSplash}
          />
          <ScrollRevealText
            text="Cake ✅"
            className="text-3xl text-slate-700 font-sans max-w-xl leading-relaxed"
            enabled={!showSplash}
          />
          <ScrollRevealText
            text="Chithi ✅"
            className="text-3xl text-slate-700 font-sans max-w-xl leading-relaxed"
            enabled={!showSplash}
          />
          <ScrollRevealText
            text="Wait, Tomra Shobai Chiti Lekhecho Na?"
            className="text-3xl text-slate-700 font-sans max-w-xl leading-relaxed"
            enabled={!showSplash}
          />
          <ScrollIndicator />
        </section>
        <section className="min-h-screen flex items-center justify-center flex-col w-full max-w-3xl mx-auto py-12 px-4">
          <Suspense
            fallback={
              <div className="h-64 flex items-center justify-center">
                Loading editor...
              </div>
            }
          >
            <ScrollRevealText
              text="Second Chance Dilam,,, Lekho"
              className="text-3xl text-slate-700 font-sans max-w-xl leading-relaxed"
              enabled={!showSplash}
            />
            <LetterEditor
              value={letterContent}
              onChange={(html) => setLetterContent(html)}
            />
          </Suspense>
        </section>
        {/* Footer Section */}
        <Footer enabled={!showSplash} />
      </div>
    </>
  );
}
