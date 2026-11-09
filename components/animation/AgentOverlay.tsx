"use client";

import { useAgentAnimation } from "@/components/animation/AgentAnimationProvider";
import CollaborativeAssemblyOverlay from "@/components/animation/CollaborativeAssemblyOverlay";

export default function AgentOverlay() {
  const { isEnabled, isReducedMotion } = useAgentAnimation();

  // If animations are disabled, uninitialized, or user prefers reduced motion, render nothing
  if (!isEnabled || isReducedMotion) {
    return null;
  }

  return <CollaborativeAssemblyOverlay />;
}
