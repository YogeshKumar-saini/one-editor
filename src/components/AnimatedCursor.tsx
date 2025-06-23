"use client";

import React, { useEffect, useRef } from "react";

const Cursor = () => {
  const mainRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const cursor = mainRef.current!;
    const ring = ringRef.current!;

    let mouseX = 0,
      mouseY = 0;
    let ringX = 0,
      ringY = 0;

    const update = () => {
      ringX += (mouseX - ringX) * 0.15;
      ringY += (mouseY - ringY) * 0.15;

      cursor.style.transform = `translate3d(${mouseX}px, ${mouseY}px, 0)`;
      ring.style.transform = `translate3d(${ringX}px, ${ringY}px, 0)`;

      requestAnimationFrame(update);
    };

    const onMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
    };

    const onHover = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (
        target.closest("button") ||
        target.closest("a") ||
        target.closest("input") ||
        target.closest("textarea")
      ) {
        ring.classList.add("cursor-hover");
      } else {
        ring.classList.remove("cursor-hover");
      }
    };

    window.addEventListener("mousemove", onMove);
    window.addEventListener("mouseover", onHover);
    update();

    return () => {
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseover", onHover);
    };
  }, []);

  return (
    <>
      <div
        ref={ringRef}
        className="pointer-events-none fixed top-0 left-0 z-[9999] w-10 h-10 rounded-full border border-cyan-400 opacity-70 backdrop-blur-sm transition-all duration-200"
        style={{
          transition: "transform 0.2s ease-out",
        }}
      />
      <div
        ref={mainRef}
        className="pointer-events-none fixed top-0 left-0 z-[9999] w-[6px] h-[6px] rounded-full bg-cyan-400 mix-blend-difference"
      />
    </>
  );
};

export default Cursor;
