import { useState, useEffect } from "react";
// import { Link } from "react-router-dom";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ScrollSmoother } from "gsap/ScrollSmoother";

import Splash from "@/components/Splash";
import Timer from "@/components/Timer";
import ScrollIndicator from "@/components/ScrollIndicator";
import LetterEditor from "@/components/LetterEditor";
// import { Mail } from "lucide-react";

gsap.registerPlugin(ScrollTrigger, ScrollSmoother);

export default function HomePage() {
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
            <h1 className="text-6xl sm:text-9xl font-bold ms-madi-regular text-sky-600 drop-shadow-sm">
              Ashfika
            </h1>

            <div className="space-y-2">
              <p className="sm:text-6xl text-4xl ms-madi-regular text-slate-800">
                Eta Ashfikar Birthday Gift Hobe,
              </p>
              <p className="sm:text-6xl text-4xl ms-madi-regular text-slate-800">
                Ekhono,
              </p>
            </div>

            <Timer />
            <p className="sm:text-6xl text-4xl ms-madi-regular text-slate-800">
              Baki.
            </p>
            <ScrollIndicator />

            <section className="h-screen flex items-center justify-center flex-col">
              <p className="text-3xl text-slate-800 font-sans max-w-xl">
                Eta Ashfika Hole, Chole Jao, Ekhane Boshe Theka Lagbe Na.
              </p>
              <br />
              <p className="text-3xl text-slate-800 font-sans max-w-xl">
                Shotti E Website E Arr Kichu Nai.
              </p>
            </section>

            <section className="h-[20vh] flex items-center justify-center flex-col space-y-8">
              <p className="text-3xl text-slate-800 font-sans max-w-xl">
                Shhhh, Ashfika Ehkan Theke Chole Gese, Tumi Jodi O Ke chine
                Thako, Tahole, Orr Jonno Chithi Likho.
              </p>

              <ScrollIndicator />
            </section>

            <section className="min-h-screen flex items-center justify-center flex-col w-full max-w-3xl mx-auto py-12 px-4">
              <LetterEditor
                value={letterContent}
                onChange={(html) => setLetterContent(html)}
              />
            </section>
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
