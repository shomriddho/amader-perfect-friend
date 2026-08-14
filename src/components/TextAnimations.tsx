import { useEffect, useRef } from "react";
import gsap from "gsap";

// 1. Letter-by-Letter On-Load Animation
export function LetterLoadReveal({
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

// 2. Word-by-Word On-Load Animation
export function WordLoadReveal({
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

// 3. Word-by-Word Scroll Reveal Component
export function ScrollRevealText({
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
            start: "top 85%",
            end: "bottom 45%",
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
