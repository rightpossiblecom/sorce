"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const headerRef = useRef<HTMLElement>(null);
  const toggleRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && menuOpen) {
        setMenuOpen(false);
        toggleRef.current?.focus();
      }
    };
    const handlePointerDown = (e: PointerEvent) => {
      if (headerRef.current && !headerRef.current.contains(e.target as Node)) {
        setMenuOpen(false);
      }
    };
    const mediaQuery = matchMedia("(min-width: 741px)");
    const handleMediaChange = () => {
      if (mediaQuery.matches) {
        setMenuOpen(false);
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    document.addEventListener("pointerdown", handlePointerDown);
    mediaQuery.addEventListener("change", handleMediaChange);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.removeEventListener("pointerdown", handlePointerDown);
      mediaQuery.removeEventListener("change", handleMediaChange);
    };
  }, [menuOpen]);

  return (
    <header className="header" ref={headerRef} data-menu-open={menuOpen ? "true" : undefined}>
      <div className="header-inner">
        <Link className="brand-logo" href="/" aria-label="Sorce home">
          <img
            src="/homepage-redesign/sorce-logo.svg"
            width="100"
            height="28"
            alt="Sorce"
            style={{ width: "auto", height: "28px" }}
          />
        </Link>
        <nav id="site-navigation" aria-label="Main navigation" onClick={() => setMenuOpen(false)}>
          <a href="https://www.sorce.jobs/employer">Employers</a>
          <a href="https://www.sorce.jobs/blog">Blog</a>
        </nav>
        <a
          className="app-store-badge plain-download"
          aria-label="Download Sorce"
          href="https://apps.apple.com/app/id6504584959"
          target="_blank"
          rel="noopener noreferrer"
        >
          Download
        </a>
        <button
          className="mobile-menu-toggle"
          ref={toggleRef}
          type="button"
          aria-label={menuOpen ? "Close navigation" : "Open navigation"}
          aria-expanded={menuOpen}
          aria-controls="site-navigation"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          <span />
          <span />
        </button>
      </div>
    </header>
  );
}
