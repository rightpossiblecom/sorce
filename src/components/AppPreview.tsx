"use client";

import { useEffect, useRef } from "react";

const DEMOS = [
  {
    name: "sorce-app-demo-2",
    position: "left",
    label: "Searching for jobs in the Sorce iPhone app",
  },
  {
    name: "sorce-app-demo",
    position: "center",
    label: "Swiping through jobs in the Sorce iPhone app",
  },
  {
    name: "sorce-app-demo-3",
    position: "right",
    label: "Following companies in the Sorce iPhone app",
  },
];

export default function AppPreview() {
  const containerRef = useRef<HTMLDivElement>(null);
  const videoRefs = useRef<(HTMLVideoElement | null)[]>([]);

  useEffect(() => {
    const motionQuery = matchMedia("(prefers-reduced-motion: reduce)");
    const mobileQuery = matchMedia("(max-width: 700px)");
    let isIntersecting = false;

    const updatePlayState = () => {
      videoRefs.current.forEach((video, idx) => {
        if (!video) return;
        if (!isIntersecting || document.hidden || motionQuery.matches || (mobileQuery.matches && idx !== 1)) {
          video.pause();
        } else {
          video.play().catch(() => {});
        }
      });
    };

    const observer = new IntersectionObserver(([entry]) => {
      isIntersecting = entry.isIntersecting;
      updatePlayState();
    });

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    motionQuery.addEventListener("change", updatePlayState);
    mobileQuery.addEventListener("change", updatePlayState);
    document.addEventListener("visibilitychange", updatePlayState);

    return () => {
      observer.disconnect();
      videoRefs.current.forEach((v) => v?.pause());
      motionQuery.removeEventListener("change", updatePlayState);
      mobileQuery.removeEventListener("change", updatePlayState);
      document.removeEventListener("visibilitychange", updatePlayState);
    };
  }, []);

  return (
    <div ref={containerRef} className="app-preview" role="group" aria-label="Sorce app previews">
      <div className="phone-trio">
        {DEMOS.map((demo, idx) => (
          <div key={demo.name} className={`iphone-frame iphone-${demo.position}`}>
            <span className="iphone-button iphone-silent" aria-hidden="true" />
            <span className="iphone-button iphone-volume" aria-hidden="true" />
            <span className="iphone-button iphone-power" aria-hidden="true" />
            <div className="iphone-screen">
              <video
                ref={(el) => {
                  videoRefs.current[idx] = el;
                }}
                className="app-recording"
                width="708"
                height="1534"
                muted
                loop
                playsInline
                autoPlay
                preload="metadata"
                poster={`/homepage-redesign/video/${demo.name}-poster.jpg`}
                aria-label={demo.label}
              >
                <source src={`/homepage-redesign/video/${demo.name}.mp4`} type="video/mp4" />
                Your browser does not support embedded video.
              </video>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
