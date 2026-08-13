import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ScrollSmoother } from "gsap/ScrollSmoother";

import Splash from "@/components/Splash";
import Timer from "@/components/Timer";
import ScrollIndicator from "@/components/ScrollIndicator";
import LetterEditor from "@/components/LetterEditor";
import { Mail } from "lucide-react";

gsap.registerPlugin(ScrollTrigger, ScrollSmoother);

// 1. Letter-by-Letter On-Load Animation Component (Waits for splash)
function LetterLoadReveal({
  text,
  className = "",
  delay = 0,
  enabled = true,
}: {
  text: string;
  className?: string;
  delay?: number;
  enabled?: boolean;
}) {
  const textRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    if (!enabled || !textRef.current) return;

    const letters = textRef.current.querySelectorAll(".letter-item");

    const ctx = gsap.context(() => {
      gsap.fromTo(
        letters,
        {
          autoAlpha: 0,
          y: 24,
          scale: 0.8,
          filter: "blur(6px)",
        },
        {
          autoAlpha: 1,
          y: 0,
          scale: 1,
          filter: "blur(0px)",
          stagger: 0.08,
          duration: 0.7,
          delay: delay,
          ease: "back.out(1.7)",
        },
      );
    }, textRef);

    return () => ctx.revert();
  }, [text, delay, enabled]);

  const letters = text.split("");

  return (
    <h1 ref={textRef} className={className}>
      {letters.map((char, i) => (
        <span
          key={i}
          className="letter-item inline-block opacity-0 will-change-transform"
        >
          {char === " " ? "\u00A0" : char}
        </span>
      ))}
    </h1>
  );
}

// 2. Word-by-Word On-Load Animation Component (Waits for splash)
function WordLoadReveal({
  text,
  className = "",
  delay = 0,
  enabled = true,
}: {
  text: string;
  className?: string;
  delay?: number;
  enabled?: boolean;
}) {
  const textRef = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    if (!enabled || !textRef.current) return;

    const words = textRef.current.querySelectorAll(".word-load-item");

    const ctx = gsap.context(() => {
      gsap.fromTo(
        words,
        {
          autoAlpha: 0,
          y: 16,
          filter: "blur(4px)",
        },
        {
          autoAlpha: 1,
          y: 0,
          filter: "blur(0px)",
          stagger: 0.12,
          duration: 0.6,
          delay: delay,
          ease: "power2.out",
        },
      );
    }, textRef);

    return () => ctx.revert();
  }, [text, delay, enabled]);

  const words = text.split(" ");

  return (
    <p ref={textRef} className={className}>
      {words.map((word, i) => (
        <span
          key={i}
          className="word-load-item inline-block mr-[0.25em] opacity-0 will-change-transform"
        >
          {word}
        </span>
      ))}
    </p>
  );
}

// 3. Word-by-Word Scroll Reveal Component (Adjusted ScrollTrigger Boundaries)
function ScrollRevealText({
  text,
  className = "",
  enabled = true,
}: {
  text: string;
  className?: string;
  enabled?: boolean;
}) {
  const textRef = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    if (!enabled || !textRef.current) return;

    const words = textRef.current.querySelectorAll(".word-scroll-item");

    const ctx = gsap.context(() => {
      gsap.fromTo(
        words,
        {
          autoAlpha: 0,
          y: 20,
          filter: "blur(6px)",
        },
        {
          autoAlpha: 1,
          y: 0,
          filter: "blur(0px)",
          stagger: 0.1,
          ease: "power2.out",
          scrollTrigger: {
            trigger: textRef.current,
            start: "top 85%", // Starts animation when top of text is 85% from top of viewport
            end: "bottom 45%", // Finishes animation near the middle of screen
            scrub: 0.8,
          },
        },
      );
    }, textRef);

    return () => ctx.revert();
  }, [text, enabled]);

  const words = text.split(" ");

  return (
    <p ref={textRef} className={className}>
      {words.map((word, i) => (
        <span
          key={i}
          className="word-scroll-item inline-block mr-[0.25em] opacity-0 will-change-transform"
        >
          {word}
        </span>
      ))}
    </p>
  );
}

export default function HomePage() {
  const [showSplash, setShowSplash] = useState(true);
  const [letterContent, setLetterContent] = useState("");

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

      {/* Floating navigation button to view letters */}
      {/* <div className="fixed top-5 right-5 z-50">
        <Link
          to="/letters"
          className="flex items-center gap-2 px-4 py-2 bg-white/80 backdrop-blur-md border border-sky-100 shadow-sm rounded-xl text-sky-700 text-sm font-medium hover:bg-sky-50 transition-all"
        >
          <Mail className="w-4 h-4" />
          <span>All Chithis</span>
        </Link>
      </div> */}

      <div id="smooth-wrapper">
        <div id="smooth-content">
          <main className="min-h-screen bg-linear-to-b from-sky-50 via-white to-sky-50/50 text-slate-800 flex flex-col items-center justify-center p-6 space-y-6 text-center">
            {/* Title: Letter-by-letter on load (starts after splash) */}
            <LetterLoadReveal
              text="Ashfika"
              className="text-6xl sm:text-9xl font-bold ms-madi-regular text-sky-600 drop-shadow-sm"
              delay={0.1}
              enabled={!showSplash}
            />

            {/* Subtitles: Word-by-word on load */}
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

            <Timer />

            {/* Animated "Baki." */}
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
              <LetterEditor
                value={letterContent}
                onChange={(html) => setLetterContent(html)}
              />
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
        </div>
      </div>
    </>
  );
}
