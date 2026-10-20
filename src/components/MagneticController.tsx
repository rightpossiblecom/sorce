"use client";

import { useEffect } from "react";

export default function MagneticController() {
  useEffect(() => {
    const hoverMatch = window.matchMedia("(hover: hover) and (pointer: fine)");
    const motionMatch = window.matchMedia("(prefers-reduced-motion: reduce)");
    const map = new Map<HTMLElement, { x: number; y: number; targetX: number; targetY: number }>();
    let activeElem: HTMLElement | null = null;
    let animId = 0;
    let lastTime = 0;

    const isEnabled = () => hoverMatch.matches && !motionMatch.matches;

    const findTarget = (el: EventTarget | null): HTMLElement | null => {
      if (el instanceof Element) {
        return el.closest("a[href], button:not(:disabled)");
      }
      return null;
    };

    const loop = (time: number) => {
      animId = 0;
      const delta = lastTime ? Math.min(time - lastTime, 50) : 16;
      lastTime = time;
      let hasActive = false;

      map.forEach((data, elem) => {
        if (!elem.isConnected) {
          map.delete(elem);
          return;
        }
        const factor = 1 - Math.exp(-delta / (elem === activeElem ? 65 : 110));
        data.x += (data.targetX - data.x) * factor;
        data.y += (data.targetY - data.y) * factor;

        const isClose = Math.abs(data.targetX - data.x) + Math.abs(data.targetY - data.y) < 0.025;
        if (isClose) {
          data.x = data.targetX;
          data.y = data.targetY;
        }

        elem.style.setProperty("--magnetic-x", `${data.x}px`);
        elem.style.setProperty("--magnetic-y", `${data.y}px`);

        if (isClose && elem !== activeElem) {
          elem.style.removeProperty("--magnetic-x");
          elem.style.removeProperty("--magnetic-y");
          map.delete(elem);
        }
        if (!isClose) hasActive = true;
      });

      if (hasActive) {
        animId = requestAnimationFrame(loop);
      }
    };

    const triggerLoop = () => {
      if (!animId) {
        lastTime = 0;
        animId = requestAnimationFrame(loop);
      }
    };

    const resetActive = () => {
      if (!activeElem) return;
      const data = map.get(activeElem);
      if (data) {
        data.targetX = 0;
        data.targetY = 0;
      }
      activeElem = null;
      triggerLoop();
    };

    const onPointerMove = (e: PointerEvent) => {
      if (!isEnabled() || e.pointerType !== "mouse") return;
      const target = findTarget(e.target);
      if (target !== activeElem) {
        resetActive();
      }
      if (!target) return;

      activeElem = target;
      target.classList.add("magnetic-control");

      let data = map.get(target);
      if (!data) {
        data = { x: 0, y: 0, targetX: 0, targetY: 0 };
        map.set(target, data);
      }

      const rect = target.getBoundingClientRect();
      const dx = e.clientX - (rect.left + rect.width / 2 - data.x);
      const dy = e.clientY - (rect.top + rect.height / 2 - data.y);

      data.targetX = Math.max(-8, Math.min(8, 0.2 * dx));
      data.targetY = Math.max(-6, Math.min(6, 0.2 * dy));

      triggerLoop();
    };

    const onPointerOut = (e: PointerEvent) => {
      if (findTarget(e.relatedTarget) !== activeElem) {
        resetActive();
      }
    };

    const resetAll = () => {
      cancelAnimationFrame(animId);
      animId = 0;
      activeElem = null;
      map.forEach((_, elem) => {
        elem.style.removeProperty("--magnetic-x");
        elem.style.removeProperty("--magnetic-y");
      });
      map.clear();
    };

    document.addEventListener("pointermove", onPointerMove, { passive: true });
    document.addEventListener("pointerout", onPointerOut, { passive: true });
    document.addEventListener("pointercancel", resetActive);
    window.addEventListener("scroll", resetActive, { passive: true });
    window.addEventListener("blur", resetAll);
    document.addEventListener("visibilitychange", resetAll);
    hoverMatch.addEventListener("change", resetAll);
    motionMatch.addEventListener("change", resetAll);

    return () => {
      resetAll();
      document.removeEventListener("pointermove", onPointerMove);
      document.removeEventListener("pointerout", onPointerOut);
      document.removeEventListener("pointercancel", resetActive);
      window.removeEventListener("scroll", resetActive);
      window.removeEventListener("blur", resetAll);
      document.removeEventListener("visibilitychange", resetAll);
      hoverMatch.removeEventListener("change", resetAll);
      motionMatch.removeEventListener("change", resetAll);
      document.querySelectorAll(".magnetic-control").forEach(el => el.classList.remove("magnetic-control"));
    };
  }, []);

  return null;
}
