"use client";

import { useRef, useEffect, useState } from "react";

const LOGOS = [
  { name: "Substack", domain: "substack.com", logo: "/homepage-redesign/company-logos/substack.com.png" },
  { name: "Twitch", domain: "twitch.tv", logo: "/homepage-redesign/company-logos/twitch.tv.png" },
  { name: "SpaceX", domain: "spacex.com", logo: "/homepage-redesign/company-logos/spacex.com.png" },
  { name: "Pinterest", domain: "pinterest.com", logo: "/homepage-redesign/company-logos/pinterest.com.png" },
  { name: "MongoDB", domain: "mongodb.com", logo: "/homepage-redesign/company-logos/mongodb.com.png" },
  { name: "Ramp", domain: "ramp.com", logo: "/homepage-redesign/company-logos/ramp.com.png" },
  { name: "Mercury", domain: "mercury.com", logo: "/homepage-redesign/company-logos/mercury.com.png" },
  { name: "DoorDash", domain: "doordash.com", logo: "/homepage-redesign/company-logos/doordash.com.png" },
  { name: "Anduril", domain: "anduril.com", logo: "/homepage-redesign/company-logos/anduril.com.png" },
  { name: "Discord", domain: "discord.com", logo: "/homepage-redesign/company-logos/discord.com.png" },
  { name: "CloudFlare", domain: "cloudflare.com", logo: "/homepage-redesign/company-logos/cloudflare.com.png" },
  { name: "Nike", domain: "nike.com", logo: "/homepage-redesign/company-logos/nike.com.png" },
  { name: "Amazon", domain: "amazon.com", logo: "/homepage-redesign/company-logos/amazon.com.png" },
  { name: "Instacart", domain: "instacart.com", logo: "/homepage-redesign/company-logos/instacart.com.png" },
  { name: "OpenAI", domain: "openai.com", logo: "/homepage-redesign/company-logos/openai.com.png" },
  { name: "Nvidia", domain: "nvidia.com", logo: "/homepage-redesign/company-logos/nvidia.com.png" },
];

const LOGO_PAIRS = [
  ["nike.com", "amazon.com"],
  ["twitch.tv", "pinterest.com"],
  ["discord.com", "cloudflare.com"],
  ["doordash.com", "instacart.com"],
  ["ramp.com", "mercury.com"],
  ["mongodb.com", "openai.com"],
  ["substack.com", "nvidia.com"],
  ["spacex.com", "anduril.com"],
];

const TESTIMONIALS_ROW1 = [
  "/testimonials/testim-1.png",
  "/testimonials/testim-2.png",
  "/testimonials/testim-3.png",
  "/testimonials/testim-4.png",
  "/testimonials/testim-5.png",
  "/testimonials/testim-6.png",
  "/testimonials/testim-7.png",
  "/testimonials/testim-8.png",
];

const TESTIMONIALS_ROW2 = [
  "/testimonials/testim-9.png",
  "/testimonials/testim-10.jpeg",
  "/testimonials/testim-11.png",
  "/testimonials/testim-12.png",
  "/testimonials/testim-13.jpeg",
  "/testimonials/testim-14.png",
  "/testimonials/testim-15.png",
  "/testimonials/testim-16.png",
];

function CompanyLogos() {
  const containerRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    const parent = container?.parentElement;
    if (!container || !parent) return;

    const hoverQuery = matchMedia(
      "(hover: hover) and (pointer: fine) and (prefers-reduced-motion: no-preference)"
    );
    const slots = Array.from(container.querySelectorAll<HTMLElement>(".story-company-slot"));
    let rafId = 0;
    let pointerPos: { x: number; y: number } | null = null;

    const updateRepel = () => {
      rafId = 0;
      const rect = container.getBoundingClientRect();
      const radius = 0.8 * Math.max(rect.width, rect.height);

      slots.forEach((slot) => {
        let rx = 0;
        let ry = 0;
        if (pointerPos && hoverQuery.matches) {
          const dx = slot.offsetLeft - (pointerPos.x - rect.left);
          const dy = slot.offsetTop - (pointerPos.y - rect.top);
          const dist = Math.hypot(dx, dy);
          const force = 22 * (1 - Math.min(dist / Math.max(radius, 1), 0.8));
          rx = (dx / Math.max(dist, 30)) * force;
          ry = (dy / Math.max(dist, 30)) * force;
        }
        slot.style.setProperty("--repel-x", `${rx}px`);
        slot.style.setProperty("--repel-y", `${ry}px`);
      });
    };

    const schedule = () => {
      if (!rafId) {
        rafId = requestAnimationFrame(updateRepel);
      }
    };

    const onPointerMove = (e: PointerEvent) => {
      if (hoverQuery.matches && e.pointerType === "mouse") {
        pointerPos = { x: e.clientX, y: e.clientY };
        schedule();
      }
    };

    const onPointerLeave = () => {
      pointerPos = null;
      schedule();
    };

    parent.addEventListener("pointermove", onPointerMove);
    parent.addEventListener("pointerleave", onPointerLeave);
    window.addEventListener("scroll", onPointerLeave, { passive: true });
    window.addEventListener("blur", onPointerLeave);
    hoverQuery.addEventListener("change", onPointerLeave);

    return () => {
      cancelAnimationFrame(rafId);
      parent.removeEventListener("pointermove", onPointerMove);
      parent.removeEventListener("pointerleave", onPointerLeave);
      window.removeEventListener("scroll", onPointerLeave);
      window.removeEventListener("blur", onPointerLeave);
      hoverQuery.removeEventListener("change", onPointerLeave);
    };
  }, []);

  return (
    <span className="story-company-logos" ref={containerRef} aria-hidden="true">
      {LOGO_PAIRS.map((pair, slotIdx) => (
        <span key={pair[0]} className="story-company-slot" data-slot={slotIdx}>
          {pair.map((domain, itemIdx) => {
            const company = LOGOS.find((c) => c.domain === domain);
            return (
              <img
                key={domain}
                src={company?.logo ?? `/homepage-redesign/company-logos/${domain}.png`}
                alt=""
                width="56"
                height="56"
                loading="lazy"
                draggable={false}
                style={{ "--logo-delay": `${-(1.35 * slotIdx) - 7 * itemIdx}s` } as React.CSSProperties}
              />
            );
          })}
        </span>
      ))}
    </span>
  );
}

export default function SuccessStories() {
  const [selectedImg, setSelectedImg] = useState<string | null>(null);
  const trackRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    let animId = 0;
    let lastTime = 0;
    const offsets = [0, 180];
    const speeds = [24, -24];

    const step = (time: number) => {
      const delta = lastTime ? Math.min(time - lastTime, 50) : 16;
      lastTime = time;

      trackRefs.current.forEach((track, idx) => {
        if (!track) return;
        const totalWidth = track.scrollWidth / 2;
        offsets[idx] = (offsets[idx] + (speeds[idx] * delta) / 1000) % totalWidth;
        if (offsets[idx] < 0) offsets[idx] += totalWidth;
        track.style.transform = `translate3d(${-offsets[idx]}px, 0, 0)`;
      });

      animId = requestAnimationFrame(step);
    };

    animId = requestAnimationFrame(step);

    return () => cancelAnimationFrame(animId);
  }, []);

  return (
    <section className="success-stories" aria-labelledby="success-title">
      <div className="stories-heading">
        <CompanyLogos />

        <h2 id="success-title">
          Just swipe right.
          <br />
          It&apos;s that easy.
        </h2>

        <p className="stories-stats">
          <span>
            <strong>1000+</strong> interviews and offers daily
          </span>
          <span>
            <strong>4,000,000+</strong> jobs
          </span>
        </p>

        <a
          className="hero-app-store plain-download"
          aria-label="Download Sorce on the App Store"
          href="https://apps.apple.com/app/id6504584959"
          target="_blank"
          rel="noopener noreferrer"
        >
          Download
        </a>
      </div>

      {/* Testimonials Ticker Rows */}
      <div className="testimonials-ticker-container" style={{ overflow: "hidden", padding: "40px 0 60px" }}>
        {/* Row 1 */}
        <div
          ref={(el) => {
            trackRefs.current[0] = el;
          }}
          style={{
            display: "flex",
            gap: "16px",
            width: "max-content",
            willChange: "transform",
            marginBottom: "16px",
          }}
        >
          {[...TESTIMONIALS_ROW1, ...TESTIMONIALS_ROW1].map((src, i) => (
            <div
              key={`r1-${i}`}
              className="story-tile"
              onClick={() => setSelectedImg(src)}
              style={{
                cursor: "pointer",
                flexShrink: 0,
                width: "300px",
                height: "190px",
                borderRadius: "14px",
                border: "1px solid #e8e8e1",
                background: "#fff",
                overflow: "hidden",
                boxShadow: "0 4px 14px rgba(0,0,0,0.03)",
                transition: "transform 0.2s ease",
              }}
            >
              <img
                src={src}
                alt="User Feedback"
                style={{ width: "100%", height: "100%", objectFit: "cover" }}
                loading="lazy"
              />
            </div>
          ))}
        </div>

        {/* Row 2 */}
        <div
          ref={(el) => {
            trackRefs.current[1] = el;
          }}
          style={{
            display: "flex",
            gap: "16px",
            width: "max-content",
            willChange: "transform",
          }}
        >
          {[...TESTIMONIALS_ROW2, ...TESTIMONIALS_ROW2].map((src, i) => (
            <div
              key={`r2-${i}`}
              className="story-tile"
              onClick={() => setSelectedImg(src)}
              style={{
                cursor: "pointer",
                flexShrink: 0,
                width: "300px",
                height: "190px",
                borderRadius: "14px",
                border: "1px solid #e8e8e1",
                background: "#fff",
                overflow: "hidden",
                boxShadow: "0 4px 14px rgba(0,0,0,0.03)",
                transition: "transform 0.2s ease",
              }}
            >
              <img
                src={src}
                alt="User Feedback"
                style={{ width: "100%", height: "100%", objectFit: "cover" }}
                loading="lazy"
              />
            </div>
          ))}
        </div>
      </div>

      {/* Lightbox Dialog */}
      {selectedImg && (
        <div
          style={{
            position: "fixed",
            inset: 0,
            zIndex: 100,
            background: "rgba(15, 20, 17, 0.72)",
            backdropFilter: "blur(4px)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: "20px",
          }}
          onClick={() => setSelectedImg(null)}
        >
          <div
            style={{
              position: "relative",
              maxWidth: "520px",
              width: "100%",
              borderRadius: "16px",
              background: "#fff",
              padding: "12px",
              boxShadow: "0 20px 40px rgba(0,0,0,0.3)",
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setSelectedImg(null)}
              style={{
                position: "absolute",
                right: "12px",
                top: "12px",
                width: "32px",
                height: "32px",
                borderRadius: "50%",
                background: "#000",
                color: "#fff",
                border: "none",
                display: "grid",
                placeItems: "center",
                cursor: "pointer",
              }}
            >
              ✕
            </button>
            <img
              src={selectedImg}
              alt="Enlarged review"
              style={{ width: "100%", height: "auto", borderRadius: "10px" }}
            />
          </div>
        </div>
      )}
    </section>
  );
}
