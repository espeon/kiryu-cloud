import { useEffect, useRef, useState } from "react";
import Hls from "hls.js";

interface HLSPlayerProps {
  src: string;
  onPlayStart?: () => void;
}

export default function HLSPlayer({ src, onPlayStart }: HLSPlayerProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    if (Hls.isSupported()) {
      const hls = new Hls();
      hls.loadSource(src);
      hls.attachMedia(video);

      return () => {
        hls.destroy();
      };
    } else if (video.canPlayType("application/vnd.apple.mpegurl")) {
      video.src = src;
    }
  }, [src]);

  const togglePlay = async () => {
    const video = videoRef.current;
    if (!video) return;

    if (video.paused) {
      await video.play();
      setIsPlaying(true);
      onPlayStart?.();
    } else {
      video.pause();
      setIsPlaying(false);
    }
  };

  return (
    <div className="absolute w-screen h-screen bg-black">
      <video
        ref={videoRef}
        className="absolute inset-0 w-full h-full object-contain"
        autoPlay={false}
      />
      <button
        onClick={togglePlay}
        className="absolute inset-0 w-full h-full flex items-center justify-center bg-black/50 group hover:bg-black/40 transition-colors"
        aria-label={isPlaying ? "Pause" : "Play"}
      >
        <div
          className={`w-20 h-20 flex items-center justify-center rounded-full bg-white/10 group-hover:bg-white/20 transition-colors ${isPlaying ? "opacity-0" : "opacity-100"}`}
        >
          <svg
            className="w-12 h-12 text-white"
            fill="currentColor"
            viewBox="0 0 24 24"
          >
            {isPlaying ? (
              <path d="M6 4h4v16H6V4zm8 0h4v16h-4V4z" />
            ) : (
              <path d="M8 5v14l11-7z" />
            )}
          </svg>
        </div>
      </button>
    </div>
  );
}
