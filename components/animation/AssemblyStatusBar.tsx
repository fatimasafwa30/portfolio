"use client";

import React from "react";
import type { AssemblyControlState } from "@/types/animation";

interface AssemblyStatusBarProps {
  readonly state: AssemblyControlState;
  readonly onTogglePause: () => void;
  readonly onSkip: () => void;
  readonly onReplay: () => void;
  readonly onResumeAutoScroll: () => void;
}

export default function AssemblyStatusBar({
  state,
  onTogglePause,
  onSkip,
  onReplay,
  onResumeAutoScroll,
}: AssemblyStatusBarProps) {
  // If animation is skipped and complete, show a minimal subtle replay pill
  if (state.isSkipped || state.isComplete) {
    return (
      <aside
        aria-label="Animation Controls"
        className="fixed bottom-4 right-4 z-40 pointer-events-auto select-none"
      >
        <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-zinc-950/90 border border-zinc-800/90 shadow-2xl backdrop-blur-md">
          <span className="flex h-2 w-2 relative">
            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
          </span>
          <span className="font-mono text-[11px] text-zinc-300 font-medium">
            Assembly Complete
          </span>
          <button
            onClick={onReplay}
            className="ml-2 font-mono text-[10px] uppercase tracking-wider px-2 py-0.5 rounded bg-zinc-900 border border-zinc-700 hover:border-zinc-500 hover:bg-zinc-800 text-zinc-200 transition-colors focus-visible:outline-2 focus-visible:outline-[#ff3b2f]"
            title="Replay website assembly animation (Shortcut: R)"
            aria-label="Replay assembly animation"
          >
            Replay [R]
          </button>
        </div>
      </aside>
    );
  }

  return (
    <aside
      aria-label="Agent Assembly Status Bar"
      className="fixed bottom-4 right-4 z-40 pointer-events-auto select-none max-w-[calc(100vw-2rem)]"
    >
      <div className="flex flex-wrap items-center gap-2.5 sm:gap-3.5 px-3.5 py-2 sm:px-4 sm:py-2.5 rounded-xl bg-zinc-950/90 border border-zinc-800/90 shadow-2xl backdrop-blur-md">
        {/* Pulsing Active Agent Indicator */}
        <div className="flex items-center gap-2">
          <span className="relative flex h-2 w-2">
            {!state.isPaused && (
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#ff3b2f] opacity-75" />
            )}
            <span
              className={`relative inline-flex rounded-full h-2 w-2 ${
                state.isPaused ? "bg-amber-400" : "bg-[#ff3b2f]"
              }`}
            />
          </span>
          <span className="font-mono text-[11px] font-semibold text-zinc-200 whitespace-nowrap">
            {state.activeCount}/{state.totalAgents} Agents
          </span>
        </div>

        {/* Activity Status Message */}
        <div className="hidden sm:flex items-center border-l border-zinc-800 pl-3">
          <span className="font-mono text-[11px] text-zinc-300 truncate max-w-[200px] lg:max-w-[260px]">
            {state.statusMessage}
          </span>
        </div>

        {/* Manual Scroll Handoff Pill */}
        {state.isManualScroll && (
          <button
            onClick={onResumeAutoScroll}
            className="font-mono text-[10px] px-2 py-0.5 rounded bg-zinc-900/80 border border-zinc-700 hover:border-[#ff3b2f] text-zinc-300 transition-colors"
            title="Resume automatic scrolling"
            aria-label="Resume auto-scroll"
          >
            Follow Work ↘
          </button>
        )}

        {/* Action Controls: Pause, Skip */}
        <div className="flex items-center gap-1.5 border-l border-zinc-800 pl-2 sm:pl-3">
          <button
            onClick={onTogglePause}
            className="font-mono text-[10px] uppercase tracking-wider px-2 py-1 rounded bg-zinc-900 hover:bg-zinc-800 border border-zinc-700 text-zinc-200 transition-colors focus-visible:outline-2 focus-visible:outline-[#ff3b2f]"
            title={state.isPaused ? "Resume animation (P)" : "Pause animation (P)"}
            aria-label={state.isPaused ? "Resume animation" : "Pause animation"}
          >
            {state.isPaused ? "Resume [P]" : "Pause [P]"}
          </button>

          <button
            onClick={onSkip}
            className="font-mono text-[10px] uppercase tracking-wider px-2 py-1 rounded bg-zinc-900 hover:bg-zinc-800 border border-zinc-700 text-zinc-200 transition-colors focus-visible:outline-2 focus-visible:outline-[#ff3b2f]"
            title="Skip animation to complete site (S or Escape)"
            aria-label="Skip assembly animation"
          >
            Skip [S]
          </button>
        </div>
      </div>
    </aside>
  );
}

