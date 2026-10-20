"use client";

import { useState, useRef, useEffect } from "react";

const FEATURES = [
  {
    title: "Let Sorce autofill every application",
    copy: "Build your profile once and let our AI fill out applications for you. Missing a detail? We’ll ask, remember your answer, and use it next time.",
    video: "sorce-application-autofill",
  },
  {
    title: "Not sure about AI? Review before we submit",
    copy: "Review what Sorce filled out before your application is submitted.",
    video: "sorce-review-before-submit",
  },
  {
    title: "An Explore algorithm personalized to you",
    copy: "Your Explore feed recommends jobs based on your preferences and learns from what you like.",
    video: "sorce-explore-personalized",
  },
  {
    title: "Search for exact jobs",
    copy: "Search for the roles you have in mind and find the jobs that match.",
    video: "sorce-exact-job-search",
  },
  {
    title: "Follow companies & get alerts when they post new jobs",
    copy: "Follow companies you like. Get notified the moment they post a new job.",
    video: "sorce-app-demo-3",
  },
  {
    title: "Scroll to see similar jobs & companies",
    copy: "Keep scrolling from a job or company you like to discover similar roles and teams.",
    video: "sorce-similar-jobs-companies",
  },
  {
    title: "Research company news, stocks & stats",
    copy: "Check company news, stock information, and key stats before you apply.",
    video: "sorce-company-research",
  },
  {
    title: "Browse every job a company lists",
    copy: "See all of a company’s listed jobs in one place and browse its current openings.",
    video: "sorce-company-jobs",
  },
];

function OfferHeading() {
  const textRef = useRef<HTMLSpanElement>(null);
  const cursorRef = useRef<HTMLSpanElement>(null);
  const [handled, setHandled] = useState(false);

  useEffect(() => {
    const textEl = textRef.current;
    const cursorEl = cursorRef.current;
    if (!textEl || !cursorEl) return;

    let cancelled = false;
    const animations: Animation[] = [];

    const observer = new IntersectionObserver(
      async ([entry]) => {
        if (!entry.isIntersecting) return;
        observer.disconnect();

        if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
          setHandled(true);
          return;
        }

        const runAnim = (keyframes: Keyframe[], options: KeyframeAnimationOptions) => {
          const anim = cursorEl.animate(keyframes, { fill: "forwards", ...options });
          animations.push(anim);
          return anim.finished;
        };

        try {
          const distance = Math.min(0.65 * window.innerWidth, 650);
          await runAnim(
            [
              { transform: `translate(${distance}px, 80px) rotate(-12deg)`, opacity: 0 },
              { transform: `translate(${0.65 * distance}px, 35px) rotate(-6deg)`, opacity: 1, offset: 0.2 },
              { transform: "translate(0, 0) rotate(0deg)", opacity: 1 },
            ],
            { duration: 850, easing: "cubic-bezier(.22,.75,.25,1)" }
          );

          if (cancelled) return;

          await runAnim(
            [{ transform: "scale(1)" }, { transform: "scale(.83)" }],
            { duration: 120, easing: "ease-in" }
          );

          if (cancelled) return;
          setHandled(true);

          await runAnim(
            [
              { transform: "scale(.83)", opacity: 1, offset: 0 },
              { transform: "scale(1)", opacity: 1, offset: 0.15 },
              { transform: "translate(0, 0)", opacity: 1, offset: 0.7 },
              { transform: "translate(12px, 10px)", opacity: 0, offset: 1 },
            ],
            { duration: 1100, easing: "ease-out" }
          );
        } catch {
          // cancelled or unsupported
        }
      },
      { rootMargin: "-80px 0px -22% 0px", threshold: 0.8 }
    );

    observer.observe(textEl);

    return () => {
      cancelled = true;
      observer.disconnect();
      animations.forEach((a) => a.cancel());
    };
  }, []);

  return (
    <div className="offer-heading">
      <h2 id="offer-title">
        Your whole job search.{" "}
        <span className="offer-handled" ref={textRef} data-handled={handled ? "true" : undefined}>
          Handled.
          <span className="offer-live-cursor" ref={cursorRef} aria-hidden="true">
            <svg width="25" height="30" viewBox="0 0 25 30" fill="none">
              <path
                d="M2 2L22 18L13 19L9 27L2 2Z"
                fill="#50c878"
                stroke="white"
                strokeWidth="2"
                strokeLinejoin="round"
              />
            </svg>
            <span>Sorce</span>
          </span>
        </span>{" "}
        <span className="offer-eyes">👀</span>
      </h2>
    </div>
  );
}

export default function WhatWeOffer() {
  const [activeIndex, setActiveIndex] = useState(0);
  const containerRef = useRef<HTMLElement>(null);
  const listRef = useRef<HTMLOListElement>(null);
  const sheetRefs = useRef<(HTMLLIElement | null)[]>([]);
  const videoRefs = useRef<(HTMLVideoElement | null)[]>([]);

  useEffect(() => {
    const sectionEl = containerRef.current;
    if (!sectionEl) return;

    const motionQuery = matchMedia("(prefers-reduced-motion: reduce)");
    const mobileQuery = matchMedia("(max-width: 700px)");
    let rafId = 0;
    let isIntersecting = false;
    let topClearance = 90;
    let currentActive = -1;

    const updateStacking = () => {
      rafId = 0;
      const rects = sheetRefs.current.map((el) => el?.getBoundingClientRect());
      let visibleIdx = -1;

      rects.forEach((rect, idx) => {
        const sheetEl = sheetRefs.current[idx];
        if (!rect || !sheetEl) return;

        if (rect.top < 0.7 * window.innerHeight && rect.bottom > topClearance + 80) {
          visibleIdx = idx;
        }

        const nextRect = rects[idx + 1];
        const progress = nextRect
          ? Math.max(0, Math.min(1, (topClearance + rect.height - nextRect.top) / rect.height))
          : 0;

        sheetEl.style.setProperty(
          "--sheet-scale",
          String(motionQuery.matches ? 1 : 1 - 0.035 * progress)
        );
      });

      if (mobileQuery.matches && listRef.current) {
        const listRect = listRef.current.getBoundingClientRect();
        visibleIdx = rects.reduce((closest, curr, idx) => {
          if (!curr || !rects[closest]) return closest;
          return Math.abs(curr.left - listRect.left) < Math.abs(rects[closest]!.left - listRect.left)
            ? idx
            : closest;
        }, 0);
        setActiveIndex(visibleIdx);
      }

      const targetToPlay = !isIntersecting || motionQuery.matches || document.hidden ? -1 : visibleIdx;
      if (targetToPlay !== currentActive) {
        currentActive = targetToPlay;
        videoRefs.current.forEach((vid, idx) => {
          if (vid) {
            if (idx === currentActive) {
              vid.play().catch(() => {});
            } else {
              vid.pause();
            }
          }
        });
      }
    };

    const scheduleUpdate = () => {
      if (!rafId) {
        rafId = requestAnimationFrame(updateStacking);
      }
    };

    const updateGeometry = () => {
      const headerEl = document.querySelector(".header");
      const headerHeight = headerEl ? headerEl.getBoundingClientRect().height : 72;
      const clearance = headerHeight + 16;
      sectionEl.style.setProperty("--offer-clearance", `${clearance}px`);

      const firstSheetHeight = sheetRefs.current[0]?.offsetHeight ?? 640;
      topClearance = mobileQuery.matches
        ? clearance
        : Math.max(clearance, headerHeight + (window.innerHeight - headerHeight - firstSheetHeight) / 2);

      sectionEl.style.setProperty("--offer-top", `${topClearance}px`);

      sheetRefs.current.forEach((sheet) => {
        if (sheet) {
          sheet.dataset.fits = String(sheet.offsetHeight <= window.innerHeight - clearance - 12);
        }
      });

      scheduleUpdate();
    };

    const io = new IntersectionObserver(([entry]) => {
      isIntersecting = entry.isIntersecting;
      scheduleUpdate();
    });
    io.observe(sectionEl);

    const ro = new ResizeObserver(updateGeometry);
    const header = document.querySelector(".header");
    if (header) ro.observe(header);
    sheetRefs.current.forEach((el) => el && ro.observe(el));

    updateGeometry();

    const listEl = listRef.current;
    listEl?.addEventListener("scroll", scheduleUpdate, { passive: true });
    window.addEventListener("scroll", scheduleUpdate, { passive: true });
    window.addEventListener("resize", updateGeometry);
    document.addEventListener("visibilitychange", scheduleUpdate);
    motionQuery.addEventListener("change", scheduleUpdate);

    return () => {
      cancelAnimationFrame(rafId);
      listEl?.removeEventListener("scroll", scheduleUpdate);
      io.disconnect();
      ro.disconnect();
      window.removeEventListener("scroll", scheduleUpdate);
      window.removeEventListener("resize", updateGeometry);
      document.removeEventListener("visibilitychange", scheduleUpdate);
      motionQuery.removeEventListener("change", scheduleUpdate);
      videoRefs.current.forEach((v) => v?.pause());
    };
  }, []);

  const scrollToCard = (index: number) => {
    const target = sheetRefs.current[index];
    const container = listRef.current;
    if (target && container) {
      const offset = target.offsetLeft - (sheetRefs.current[0]?.offsetLeft ?? 0);
      container.scrollTo({
        left: offset,
        behavior: matchMedia("(prefers-reduced-motion: reduce)").matches ? "instant" : "smooth",
      });
    }
  };

  return (
    <section className="what-we-offer" ref={containerRef} aria-labelledby="offer-title">
      <OfferHeading />

      <ol className="offer-sheets" ref={listRef} aria-label="Sorce features">
        {FEATURES.map((feature, idx) => (
          <li
            key={feature.title}
            className="offer-sheet"
            ref={(el) => {
              sheetRefs.current[idx] = el;
            }}
          >
            <div className="offer-sheet-surface">
              <div className="offer-sheet-copy">
                <span className="offer-number" aria-hidden="true">
                  {String(idx + 1).padStart(2, "0")} / {FEATURES.length}
                </span>
                <div>
                  <h3>{feature.title}</h3>
                  <p>{feature.copy}</p>
                </div>
              </div>

              <div className="offer-sheet-media">
                <div className="iphone-frame offer-phone">
                  <span className="iphone-button iphone-silent" aria-hidden="true" />
                  <span className="iphone-button iphone-volume" aria-hidden="true" />
                  <span className="iphone-button iphone-power" aria-hidden="true" />
                  <div className="iphone-screen">
                    <video
                      ref={(el) => {
                        videoRefs.current[idx] = el;
                      }}
                      className="app-recording"
                      muted
                      loop
                      playsInline
                      preload="none"
                      poster={`/homepage-redesign/video/${feature.video}-poster.jpg`}
                      aria-label="Sorce app preview recording"
                    >
                      <source src={`/homepage-redesign/video/${feature.video}.mp4`} type="video/mp4" />
                    </video>
                  </div>
                </div>
              </div>
            </div>
          </li>
        ))}
      </ol>

      <div className="offer-mobile-controls">
        <span aria-live="polite">
          {String(activeIndex + 1).padStart(2, "0")} / {FEATURES.length}
          <span>Swipe to explore</span>
        </span>
        <div>
          <button
            type="button"
            onClick={() => scrollToCard(activeIndex - 1)}
            disabled={activeIndex === 0}
            aria-label="Previous feature"
          >
            ←
          </button>
          <button
            type="button"
            onClick={() => scrollToCard(activeIndex + 1)}
            disabled={activeIndex === FEATURES.length - 1}
            aria-label="Next feature"
          >
            →
          </button>
        </div>
      </div>
    </section>
  );
}
