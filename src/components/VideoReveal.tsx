"use client";

import { useEffect, useRef } from "react";

export default function VideoReveal() {
  const containerRef = useRef<HTMLElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    const video = videoRef.current;
    if (!container || !video) return;

    const motionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    let isIntersecting = false;

    const updatePlayState = () => {
      if (!isIntersecting || document.hidden || motionQuery.matches) {
        video.pause();
      } else {
        video.play().catch(() => {});
      }
    };

    const observer = new IntersectionObserver(
      ([entry]) => {
        isIntersecting = entry.isIntersecting;
        updatePlayState();
      },
      { threshold: 0 }
    );

    observer.observe(container);
    document.addEventListener("visibilitychange", updatePlayState);
    motionQuery.addEventListener("change", updatePlayState);

    return () => {
      observer.disconnect();
      video.pause();
      document.removeEventListener("visibilitychange", updatePlayState);
      motionQuery.removeEventListener("change", updatePlayState);
    };
  }, []);

  return (
    <section className="video-reveal" ref={containerRef} aria-label="Sorce in action">
      <div className="video-reveal-aperture">
        <div className="video-reveal-window">
          <video
            ref={videoRef}
            muted
            loop
            playsInline
            preload="metadata"
            poster="/homepage-redesign/video/homepage-film-poster.png"
            aria-label="The original Sorce homepage film"
          >
            <source
              src="https://b4tl0n6j67mfwpvk.public.blob.vercel-storage.com/Swiping%20Video%20w%20New%20Screens.mp4"
              type="video/mp4"
            />
          </video>
        </div>
      </div>
    </section>
  );
}
