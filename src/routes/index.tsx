import { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import HLSPlayer from "@/components/HLSPlayer";

export const Route = createFileRoute("/")({
  component: App,
});

function App() {
  const [showText, setShowText] = useState(true);

  const handlePlayStart = () => {
    setTimeout(() => {
      setShowText(false);
    }, 10000);
  };

  return (
    <main className="relative w-full h-screen bg-green aspect-video">
      <a
        href="https://www.youtube.com/watch?v=3UtoMcOFruY"
        className={`absolute bottom-0 z-20 hover:underline transition-color duration-1000 ml-4 ${showText ? "text-white/50" : "text-transparent"}`}
      >
        Like A Dragon series © SEGA. This is a fan site. No affiliation
        whatsoever with SEGA.
      </a>
      <HLSPlayer src="/10/main.m3u8" onPlayStart={handlePlayStart} />
    </main>
  );
}
