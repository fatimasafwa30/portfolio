"use client";

import React, { forwardRef } from "react";
import type { CursorAgentConfig } from "@/types/animation";

interface CollaborativeCursorProps {
  readonly agent: CursorAgentConfig;
  readonly isMobile?: boolean;
}

export const CollaborativeCursor = forwardRef<
  HTMLDivElement,
  CollaborativeCursorProps
>(function CollaborativeCursor({ agent, isMobile = false }, ref) {
  return (
    <div
      ref={ref}
      data-cursor-id={agent.id}
      className="absolute top-0 left-0 pointer-events-none select-none will-change-transform z-50"
      style={{ transform: "translate3d(-100px, -100px, 0)", opacity: 0 }}
      aria-hidden="true"
    >
      {/* Pointer Graphic + Name Label */}
      <div className="relative flex items-start">
        {/* SVG Pointer Arrow - Crisp, High-Contrast */}
        <svg
          width={isMobile ? "20" : "26"}
          height={isMobile ? "20" : "26"}
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="drop-shadow-[0_2px_10px_rgba(0,0,0,0.95)] shrink-0 filter"
        >
          {/* Main Pointer Polygon */}
          <path
            d="M3 2L10.5 20.5L13.5 13L21 10L3 2Z"
            fill={agent.color}
            stroke="#09090b"
            strokeWidth="1.75"
            strokeLinejoin="round"
          />
          {/* Subtle Inner Highlight */}
          <circle cx="9.5" cy="8.5" r="1.25" fill="#ffffff" opacity="0.75" />
        </svg>

        {/* Solid Agent-Colored Figma-style Pill Badge */}
        <div
          data-badge-id={agent.id}
          className="ml-1 -mt-0.5 px-1.5 py-0.5 rounded-[3px] shadow-[0_2px_8px_rgba(0,0,0,0.7)] border border-black/20 flex items-center gap-1 whitespace-nowrap font-mono transition-opacity duration-150"
          style={{
            backgroundColor: agent.color,
          }}
        >
          <span className="text-[10px] font-bold text-zinc-950 uppercase tracking-tight leading-none">
            {agent.name}
          </span>
          <span
            data-task-id={agent.id}
            className="hidden"
          >
            {agent.role}
          </span>
        </div>
      </div>
    </div>
  );
});
