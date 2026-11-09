"use client";

import React, { createContext, useContext, useEffect, useState } from "react";

interface AgentAnimationContextType {
  readonly isReducedMotion: boolean;
  readonly isEnabled: boolean;
  readonly toggleAnimation: () => void;
}

const AgentAnimationContext =
  createContext<AgentAnimationContextType | null>(null);

export function useAgentAnimation() {
  const context = useContext(AgentAnimationContext);
  if (!context) {
    throw new Error(
      "useAgentAnimation must be used within an AgentAnimationProvider"
    );
  }
  return context;
}

interface AgentAnimationProviderProps {
  readonly children: React.ReactNode;
}

/**
 * AgentAnimationProvider
 * - Tracks user motion preferences (prefers-reduced-motion)
 * - Guarantees hydration consistency between server and client
 * - Enforces zero animation execution when reduced-motion is requested
 */
export default function AgentAnimationProvider({
  children,
}: AgentAnimationProviderProps) {
  const [isHydrated, setIsHydrated] = useState(false);
  const [isReducedMotion, setIsReducedMotion] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;

    try {
      const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
      setIsReducedMotion(mediaQuery.matches);
      setIsHydrated(true);

      const handleChange = (e: MediaQueryListEvent) => {
        setIsReducedMotion(e.matches);
      };

      mediaQuery.addEventListener("change", handleChange);
      return () => mediaQuery.removeEventListener("change", handleChange);
    } catch {
      setIsReducedMotion(true);
      setIsHydrated(true);
    }
  }, []);

  const toggleAnimation = () => {
    // Kept for backward compatibility
  };

  // Pure derived state: enabled only when hydrated on the client and reduced motion is false
  const isEnabled = isHydrated && !isReducedMotion;

  return (
    <AgentAnimationContext.Provider
      value={{
        isReducedMotion,
        isEnabled,
        toggleAnimation,
      }}
    >
      {children}
    </AgentAnimationContext.Provider>
  );
}
