"use client";
import { useState } from "react";
import { Video } from "@/components/mdx/video";

export default function VideoDefault() {
  const [playing, setPlaying] = useState(false);

  if (playing) {
    return (
      <Video
        src="https://www.youtube.com/shorts/kMSUFHzS5rI"
        title="Damarukam"
        caption="Damarukam — YouTube Short"
      />
    );
  }

  return (
    <div
      className="relative mx-auto my-6 aspect-[9/16] w-full max-w-xs cursor-pointer overflow-hidden rounded-xl border border-blue-500/20 bg-black"
      onClick={() => setPlaying(true)}
    >
      <div className="absolute inset-0 bg-gradient-to-b from-blue-950/60 via-black/80 to-blue-950/60" />

      <div className="absolute inset-0 flex flex-col items-center justify-center gap-5">
        <button
          className="relative flex h-20 w-20 items-center justify-center"
          aria-label="Play Damarukam"
        >
          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-blue-500 opacity-20" />
          <span className="absolute inline-flex h-[85%] w-[85%] animate-ping rounded-full bg-blue-400 opacity-15 [animation-delay:200ms]" />
          <span className="absolute inline-flex h-[70%] w-[70%] animate-ping rounded-full bg-blue-300 opacity-10 [animation-delay:400ms]" />
          <span className="relative flex h-16 w-16 items-center justify-center rounded-full bg-blue-600 shadow-[0_0_32px_8px_rgba(59,130,246,0.5)]">
            <svg
              viewBox="0 0 24 24"
              fill="white"
              className="h-7 w-7 translate-x-0.5"
            >
              <path d="M8 5v14l11-7z" />
            </svg>
          </span>
        </button>

        <div className="text-center">
          <p className="text-sm font-semibold text-white">Damarukam</p>
          <p className="mt-0.5 text-xs text-white/40">Click to play</p>
        </div>
      </div>
    </div>
  );
}
