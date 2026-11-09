"use client";

import React, { useCallback, useEffect, useRef, useState } from "react";
import {
  CURSOR_AGENTS,
  type AssemblyBlockState,
  type AssemblyControlState,
} from "@/types/animation";
import { CollaborativeCursor } from "@/components/animation/CollaborativeCursor";
import AssemblyStatusBar from "@/components/animation/AssemblyStatusBar";

interface BlockTargetInternal {
  readonly id: string;
  readonly wave: number;
  readonly subIndex: number;
  readonly primaryAgentIndex: number;
  readonly secondaryAgentIndex?: number;
  readonly markTask: string;
  readonly roughTask: string;
  docX: number;
  docY: number;
  width: number;
  height: number;
  startMs: number;
  markMs: number;
  roughMs: number;
  doneMs: number;
  state: AssemblyBlockState;
  isDissolving: boolean;
  dissolveOpacity: number;
  element: HTMLElement | null;
}

interface CursorKinematicState {
  x: number;
  y: number;
  startX: number;
  startY: number;
  targetX: number;
  targetY: number;
  startTime: number;
  duration: number;
  task: string;
  approachingBlockId?: string;
  approachStartX?: number;
  approachStartY?: number;
}

const BLOCK_PLANS: readonly {
  id: string;
  wave: number;
  subIndex: number;
  primaryAgent: number;
  markTask: string;
  roughTask: string;
}[] = [
  // Wave 0: Header (2 blocks)
  {
    id: "header-brand",
    wave: 0,
    subIndex: 0,
    primaryAgent: 0, // Architect (#ff3b2f)
    markTask: "Scaffolding brand monogram",
    roughTask: "Setting display font",
  },
  {
    id: "header-nav",
    wave: 0,
    subIndex: 1,
    primaryAgent: 4, // DevOps (#38bdf8)
    markTask: "Routing navigation",
    roughTask: "Checking link targets",
  },

  // Wave 1: Hero (4 blocks)
  {
    id: "hero-status",
    wave: 1,
    subIndex: 0,
    primaryAgent: 5, // QA Lead (#ff3b2f)
    markTask: "Setting status beacon",
    roughTask: "Verifying live availability",
  },
  {
    id: "hero-title",
    wave: 1,
    subIndex: 1,
    primaryAgent: 2, // Copywriter (#34d399)
    markTask: "Drafting H1 display heading",
    roughTask: "Simulating title typing",
  },
  {
    id: "hero-role",
    wave: 1,
    subIndex: 2,
    primaryAgent: 3, // Designer (#34d399)
    markTask: "Styling role & narrative",
    roughTask: "Formatting color tokens",
  },
  {
    id: "hero-actions",
    wave: 1,
    subIndex: 3,
    primaryAgent: 1, // Frontend (#38bdf8)
    markTask: "Binding CTA buttons",
    roughTask: "Setting hover transitions",
  },

  // Wave 2: About (5 blocks)
  {
    id: "about-heading",
    wave: 2,
    subIndex: 0,
    primaryAgent: 6, // Typography (#38bdf8)
    markTask: "Scaffolding about layout",
    roughTask: "Aligning grid columns",
  },
  {
    id: "about-portrait",
    wave: 2,
    subIndex: 1,
    primaryAgent: 3, // Designer (#34d399)
    markTask: "Framing responsive portrait",
    roughTask: "Rendering grayscale filter",
  },
  {
    id: "about-bio",
    wave: 2,
    subIndex: 2,
    primaryAgent: 2, // Copywriter (#34d399)
    markTask: "Reviewing narrative bio",
    roughTask: "Balancing typography rhythm",
  },
  {
    id: "about-education",
    wave: 2,
    subIndex: 3,
    primaryAgent: 10, // Reviewer (#ff3b2f)
    markTask: "Verifying degree credentials",
    roughTask: "Validating course timeline",
  },
  {
    id: "about-pillars",
    wave: 2,
    subIndex: 4,
    primaryAgent: 8, // Integrator (#38bdf8)
    markTask: "Auditing engineering pillars",
    roughTask: "Structuring focus areas",
  },

  // Wave 3: Skills (9 blocks)
  {
    id: "skills-heading",
    wave: 3,
    subIndex: 0,
    primaryAgent: 0, // Architect (#ff3b2f)
    markTask: "Scaffolding skill matrix",
    roughTask: "Structuring 4-column grid",
  },
  {
    id: "skills-card-0",
    wave: 3,
    subIndex: 1,
    primaryAgent: 1, // Frontend (#38bdf8)
    markTask: "Compiling programming skills",
    roughTask: "Mounting skill pills",
  },
  {
    id: "skills-card-1",
    wave: 3,
    subIndex: 2,
    primaryAgent: 4, // DevOps (#38bdf8)
    markTask: "Configuring frontend stack",
    roughTask: "Validating React & Next.js",
  },
  {
    id: "skills-card-2",
    wave: 3,
    subIndex: 3,
    primaryAgent: 8, // Integrator (#38bdf8)
    markTask: "Wiring backend services",
    roughTask: "Connecting Node & APIs",
  },
  {
    id: "skills-card-3",
    wave: 3,
    subIndex: 4,
    primaryAgent: 9, // Security (#34d399)
    markTask: "Hardening auth & AI models",
    roughTask: "Configuring ML and security",
  },
  {
    id: "skills-card-4",
    wave: 3,
    subIndex: 5,
    primaryAgent: 5, // QA Lead (#ff3b2f)
    markTask: "Setting cloud infrastructure",
    roughTask: "Verifying cloud deployment",
  },
  {
    id: "skills-card-5",
    wave: 3,
    subIndex: 6,
    primaryAgent: 6, // Typography (#38bdf8)
    markTask: "Applying typography standards",
    roughTask: "Formatting design tokens",
  },
  {
    id: "skills-card-6",
    wave: 3,
    subIndex: 7,
    primaryAgent: 7, // Motion (#34d399)
    markTask: "Integrating motion curves",
    roughTask: "Optimizing frame transitions",
  },
  {
    id: "skills-card-7",
    wave: 3,
    subIndex: 8,
    primaryAgent: 11, // Optimizer (#ff3b2f)
    markTask: "Benchmarking performance",
    roughTask: "Auditing bundle tree shaking",
  },

  // Wave 4: Projects (3 blocks)
  {
    id: "projects-heading",
    wave: 4,
    subIndex: 0,
    primaryAgent: 0, // Architect (#ff3b2f)
    markTask: "Framing project showcase",
    roughTask: "Calculating card layout",
  },
  {
    id: "projects-individual",
    wave: 4,
    subIndex: 1,
    primaryAgent: 1, // Frontend (#38bdf8)
    markTask: "Assembling full-stack projects",
    roughTask: "Rendering project cards",
  },
  {
    id: "projects-group",
    wave: 4,
    subIndex: 2,
    primaryAgent: 7, // Motion (#34d399)
    markTask: "Validating hackathon projects",
    roughTask: "Formatting team contributions",
  },

  // Wave 5: Experience (2 blocks)
  {
    id: "experience-heading",
    wave: 5,
    subIndex: 0,
    primaryAgent: 10, // Reviewer (#ff3b2f)
    markTask: "Scaffolding experience log",
    roughTask: "Structuring timeline view",
  },
  {
    id: "experience-card-noob-hackverse",
    wave: 5,
    subIndex: 1,
    primaryAgent: 4, // DevOps (#38bdf8)
    markTask: "Mounting hackathon role",
    roughTask: "Listing API contributions",
  },

  // Wave 6: Contact & Footer (5 blocks)
  {
    id: "contact-heading",
    wave: 6,
    subIndex: 0,
    primaryAgent: 0, // Architect (#ff3b2f)
    markTask: "Scaffolding contact section",
    roughTask: "Setting container max-width",
  },
  {
    id: "contact-narrative",
    wave: 6,
    subIndex: 1,
    primaryAgent: 2, // Copywriter (#34d399)
    markTask: "Polishing contact copy",
    roughTask: "Optimizing communication intro",
  },
  {
    id: "contact-email",
    wave: 6,
    subIndex: 2,
    primaryAgent: 1, // Frontend (#38bdf8)
    markTask: "Wiring direct email card",
    roughTask: "Testing mailto link target",
  },
  {
    id: "contact-links",
    wave: 6,
    subIndex: 3,
    primaryAgent: 9, // Security (#34d399)
    markTask: "Verifying profile channels",
    roughTask: "Checking external link security",
  },
  {
    id: "footer-content",
    wave: 6,
    subIndex: 4,
    primaryAgent: 11, // Optimizer (#ff3b2f)
    markTask: "Finalizing colophon & bundle",
    roughTask: "Auditing production build",
  },
];

// Base start times per wave in milliseconds
const WAVE_BASE_STARTS: Record<number, number> = {
  0: 400, // Wave 0: Header (400ms - 2000ms)
  1: 1600, // Wave 1: Hero (1600ms - 4400ms)
  2: 4400, // Wave 2: About (4400ms - 7800ms)
  3: 8000, // Wave 3: Skills (8000ms - 13400ms)
  4: 13600, // Wave 4: Projects (13600ms - 16800ms)
  5: 16900, // Wave 5: Experience (16900ms - 19300ms)
  6: 19500, // Wave 6: Contact & Footer (19500ms - 24000ms)
};

// Timing durations (in milliseconds)
const APPROACH_DURATION_MS = 300; // Pre-targeting duration for cursor to approach block origin smoothly
const STAGGER_STEP_MS = 200; // Stagger offset between blocks in same wave
const MARK_DURATION_MS = 550; // Duration for cursor to arrive & trace marquee
const ROUGH_DURATION_MS = 1150; // Duration for wireframe skeleton and content assembly
const HERO_TITLE_ROUGH_DURATION_MS = 1100; // Dedicated duration for character typewriter reveal
const DISSOLVE_DURATION_MS = 380; // Crossfade duration from skeleton to real content
const TOTAL_ANIMATION_MS = 24600;

const HERO_TITLE_FULL = "FATIMA SAFWA";

function easeInOutCubic(u: number): number {
  return u < 0.5 ? 4 * u * u * u : 1 - Math.pow(-2 * u + 2, 3) / 2;
}

function getBlockComponentTag(id: string): string {
  const map: Record<string, string> = {
    // Wave 0: Header
    "header-brand": "<HeaderBrand />",
    "header-nav": "<Navigation />",

    // Wave 1: Hero
    "hero-status": "<StatusBeacon />",
    "hero-title": "<HeroTitle />",
    "hero-role": "<RoleNarrative />",
    "hero-actions": "<ActionButtons />",

    // Wave 2: About
    "about-heading": "<SectionHeading title='About' />",
    "about-portrait": "<PortraitFrame />",
    "about-bio": "<Biography />",
    "about-education": "<EducationCard />",
    "about-pillars": "<CorePillars />",

    // Wave 3: Skills
    "skills-heading": "<SectionHeading title='Skills' />",
    "skills-card-0": "<SkillMatrix category='languages' />",
    "skills-card-1": "<SkillMatrix category='frontend' />",
    "skills-card-2": "<SkillMatrix category='backend' />",
    "skills-card-3": "<SkillMatrix category='tools' />",
    "skills-card-4": "<SkillMatrix category='cloud' />",
    "skills-card-5": "<SkillMatrix category='design' />",
    "skills-card-6": "<SkillMatrix category='animation' />",
    "skills-card-7": "<SkillMatrix category='performance' />",

    // Wave 4: Projects
    "projects-heading": "<SectionHeading title='Projects' />",
    "projects-individual": "<ProjectsGrid type='individual' />",
    "projects-group": "<ProjectsGrid type='team' />",

    // Wave 5: Experience
    "experience-heading": "<SectionHeading title='Experience' />",
    "experience-card-noob-hackverse": "<ExperienceCard org='Noob Hackverse' />",

    // Wave 6: Contact & Footer
    "contact-heading": "<SectionHeading title='Contact' />",
    "contact-narrative": "<ContactNarrative />",
    "contact-email": "<DirectEmailCard />",
    "contact-links": "<ProfileChannels />",
    "footer-content": "<FooterContent />",
  };
  return map[id] ?? `<${id} />`;
}

export default function CollaborativeAssemblyOverlay() {
  const [isMobile, setIsMobile] = useState(false);
  const [docHeight, setDocHeight] = useState(2000);
  const [activeBlocks, setActiveBlocks] = useState<BlockTargetInternal[]>([]);
  const [typedHeroTitle, setTypedHeroTitle] = useState("");
  const [controlState, setControlState] = useState<AssemblyControlState>({
    isAssemblyActive: true,
    isPaused: false,
    isSkipped: false,
    isComplete: false,
    activeCount: 12,
    totalAgents: 12,
    statusMessage: "Initializing Collaborative Agent Assembly...",
    isManualScroll: false,
  });

  // Cursor element refs for 60fps direct transform updates
  const cursorRefs = useRef<Record<string, HTMLDivElement | null>>({});
  const taskTextRefs = useRef<Record<string, HTMLSpanElement | null>>({});

  // Marquee and dimension label element refs for 60fps direct bounds updates
  const marqueeRefs = useRef<Record<string, HTMLDivElement | null>>({});
  const dimRefs = useRef<Record<string, HTMLDivElement | null>>({});
  const prevActiveKeyRef = useRef<string>("");

  // Kinematic state per cursor (smooth cubic easing with distance-based duration)
  const kinematicsRef = useRef<Record<string, CursorKinematicState>>({});

  // Animation timeline control refs
  const rafIdRef = useRef<number | null>(null);
  const tickRef = useRef<(now: number) => void>(() => {});
  const startTimeRef = useRef<number | null>(null);
  const lastTimeRef = useRef<number>(performance.now());
  const pausedAtRef = useRef<number | null>(null);
  const totalPausedDurationRef = useRef<number>(0);
  const isPausedRef = useRef<boolean>(false);
  const isManualScrollRef = useRef<boolean>(false);
  const blocksInternalRef = useRef<BlockTargetInternal[]>([]);

  // Measure all [data-assembly-block] DOM targets in document coordinates
  const measureAllBlocks = useCallback(() => {
    if (typeof window === "undefined") return;

    const scrollX = window.scrollX;
    const scrollY = window.scrollY;
    const fullHeight = Math.max(
      document.documentElement.scrollHeight,
      document.body.scrollHeight,
      window.innerHeight
    );
    setDocHeight(fullHeight);

    const measured: BlockTargetInternal[] = [];
    const elements = document.querySelectorAll<HTMLElement>("[data-assembly-block]");

    elements.forEach((el, index) => {
      const id = el.getAttribute("data-assembly-block");
      if (!id) return;

      const rect = el.getBoundingClientRect();
      const plan = BLOCK_PLANS.find((p) => p.id === id) ?? {
        id,
        wave: Math.min(6, Math.floor(index / 4)),
        subIndex: index % 4,
        primaryAgent: index % CURSOR_AGENTS.length,
        markTask: "Assembling content block",
        roughTask: "Styling and rendering",
      };

      const waveStart = WAVE_BASE_STARTS[plan.wave] ?? 200;
      let startMs = waveStart + plan.subIndex * STAGGER_STEP_MS;
      let markDur = MARK_DURATION_MS;
      let roughDur =
        plan.id === "hero-title"
          ? HERO_TITLE_ROUGH_DURATION_MS
          : ROUGH_DURATION_MS;

      if (plan.wave === 0) {
        // Wave 0: Header (brand at 400ms, nav at 600ms)
        startMs = 400 + plan.subIndex * 200;
        markDur = 550;
        roughDur = 950;
      } else if (plan.wave === 1) {
        // Wave 1: Hero
        if (plan.id === "hero-status") {
          startMs = 1600;
          markDur = 500;
          roughDur = 850;
        } else if (plan.id === "hero-title") {
          startMs = 1900;
          markDur = 600;
          roughDur = HERO_TITLE_ROUGH_DURATION_MS;
        } else if (plan.id === "hero-role") {
          startMs = 2200;
          markDur = 550;
          roughDur = 850;
        } else if (plan.id === "hero-actions") {
          startMs = 2600;
          markDur = 500;
          roughDur = 850;
        }
      } else if (plan.wave === 2) {
        // Wave 2: About (heading, portrait, bio, education, pillars)
        startMs = 4400 + plan.subIndex * 400;
        markDur = 550;
        roughDur = 900;
      } else if (plan.wave === 3) {
        // Wave 3: Skills (heading, cards 0-3 row 1, cards 4-7 row 2)
        if (plan.id === "skills-heading") {
          startMs = 8000;
          markDur = 500;
          roughDur = 800;
        } else if (plan.subIndex <= 4) {
          startMs = 8300 + (plan.subIndex - 1) * 380;
          markDur = 500;
          roughDur = 850;
        } else {
          startMs = 10100 + (plan.subIndex - 5) * 380;
          markDur = 500;
          roughDur = 850;
        }
      } else if (plan.wave === 4) {
        // Wave 4: Projects (heading, individual, group)
        startMs = 13600 + plan.subIndex * 600;
        markDur = 550;
        roughDur = 1000;
      } else if (plan.wave === 5) {
        // Wave 5: Experience (heading, card)
        startMs = 16900 + plan.subIndex * 600;
        markDur = 550;
        roughDur = 1000;
      } else if (plan.wave === 6) {
        // Wave 6: Contact & Footer
        startMs = 19500 + plan.subIndex * 550;
        markDur = 550;
        roughDur = 950;
      }

      const markMs = startMs + markDur;
      const roughMs = markMs + roughDur;
      const doneMs = roughMs + DISSOLVE_DURATION_MS;

      const existing = blocksInternalRef.current.find((b) => b.id === id);
      const state = existing ? existing.state : "EMPTY";
      const isDissolving = existing ? existing.isDissolving : false;
      const dissolveOpacity = existing ? existing.dissolveOpacity : 1;

      measured.push({
        id,
        wave: plan.wave,
        subIndex: plan.subIndex,
        primaryAgentIndex: isMobile ? (plan.primaryAgent % 4) : plan.primaryAgent,
        markTask: plan.markTask,
        roughTask: plan.roughTask,
        docX: Math.round(rect.left + scrollX),
        docY: Math.round(rect.top + scrollY),
        width: Math.round(rect.width),
        height: Math.round(rect.height),
        startMs,
        markMs,
        roughMs,
        doneMs,
        state,
        isDissolving,
        dissolveOpacity,
        element: el,
      });
    });

    blocksInternalRef.current = measured;
  }, [isMobile]);

  // Complete and reveal all blocks immediately (for skip or finish)
  const completeAllBlocks = useCallback(() => {
    document.documentElement.removeAttribute("data-assembly-active");
    blocksInternalRef.current.forEach((b) => {
      b.state = "DONE";
      b.isDissolving = false;
      b.dissolveOpacity = 0;
      if (b.element) {
        b.element.setAttribute("data-assembly-done", "true");
        b.element.classList.remove("assembly-block-completed");
        b.element.style.removeProperty("--flash-color");
      }
    });
    prevActiveKeyRef.current = "";
    setActiveBlocks([]);
    setTypedHeroTitle("");
    setControlState((prev) => ({
      ...prev,
      isAssemblyActive: false,
      isComplete: true,
      activeCount: 0,
      statusMessage: "Assembly Complete",
    }));
  }, []);

  // Skip animation handler
  const handleSkip = useCallback(() => {
    if (rafIdRef.current) {
      cancelAnimationFrame(rafIdRef.current);
      rafIdRef.current = null;
    }
    completeAllBlocks();
    setControlState((prev) => ({
      ...prev,
      isSkipped: true,
      isComplete: true,
    }));
  }, [completeAllBlocks]);

  // Toggle pause handler
  const handleTogglePause = useCallback(() => {
    const nextPaused = !isPausedRef.current;
    isPausedRef.current = nextPaused;

    if (nextPaused) {
      pausedAtRef.current = performance.now();
      setControlState((prev) => ({
        ...prev,
        isPaused: true,
        statusMessage: "Assembly Paused",
      }));
    } else {
      if (pausedAtRef.current !== null) {
        totalPausedDurationRef.current += performance.now() - pausedAtRef.current;
        pausedAtRef.current = null;
      }
      setControlState((prev) => ({
        ...prev,
        isPaused: false,
        statusMessage: "Collaborative Assembly Resumed",
      }));
    }
  }, []);

  // Initialize deterministic cursor staging positions in upper hero corridor (below header)
  const initializeStagingPositions = useCallback((now: number) => {
    const winW = typeof window !== "undefined" ? window.innerWidth : 1440;
    const isMob = winW < 768;

    if (isMob) {
      // Mobile layout: 4 cursors spaced across screen width in corridor (y=88 and y=118)
      const slotW = (winW - 48) / 4;
      CURSOR_AGENTS.slice(0, 4).forEach((agent, i) => {
        const initX = Math.round(24 + i * slotW);
        const initY = 88 + (i % 2) * 30;

        kinematicsRef.current[agent.id] = {
          x: initX,
          y: initY,
          startX: initX,
          startY: initY,
          targetX: initX,
          targetY: initY,
          startTime: now,
          duration: 350,
          task: agent.role,
        };

        const el = cursorRefs.current[agent.id];
        if (el) {
          el.style.transform = `translate3d(${initX}px, ${initY}px, 0)`;
          el.style.opacity = "1";
        }
      });
      return;
    }

    // Desktop: 12 agents staged across upper hero corridor (y=88 and y=120) with >= 100px separation
    // Completely clear of sticky header (ends at y=64)
    const leftMargin = 60;
    const rightMargin = 80;
    const usableW = Math.max(800, winW - leftMargin - rightMargin);
    const stepX = usableW / (CURSOR_AGENTS.length - 1);

    CURSOR_AGENTS.forEach((agent, i) => {
      const initX = Math.round(leftMargin + i * stepX);
      const initY = 88 + (i % 2) * 32;

      kinematicsRef.current[agent.id] = {
        x: initX,
        y: initY,
        startX: initX,
        startY: initY,
        targetX: initX,
        targetY: initY,
        startTime: now,
        duration: 350,
        task: agent.role,
      };

      const el = cursorRefs.current[agent.id];
      if (el) {
        el.style.transform = `translate3d(${initX}px, ${initY}px, 0)`;
        el.style.opacity = "1";
      }
    });
  }, []);

  // Replay animation handler
  const handleReplay = useCallback(() => {
    if (rafIdRef.current) {
      cancelAnimationFrame(rafIdRef.current);
      rafIdRef.current = null;
    }

    // Reset all DOM targets
    document.documentElement.setAttribute("data-assembly-active", "true");
    const elements = document.querySelectorAll<HTMLElement>("[data-assembly-block]");
    elements.forEach((el) => {
      el.removeAttribute("data-assembly-done");
      el.classList.remove("assembly-block-completed");
      el.style.removeProperty("--flash-color");
    });
    prevActiveKeyRef.current = "";

    // Set scroll position to top immediately (instant, not smooth) before measuring
    window.scrollTo({ top: 0, behavior: "instant" });
    window.scrollTo(0, 0);

    // Reset timing and control state
    const now = performance.now();
    startTimeRef.current = now;
    lastTimeRef.current = now;
    pausedAtRef.current = null;
    totalPausedDurationRef.current = 0;
    isPausedRef.current = false;
    isManualScrollRef.current = false;

    measureAllBlocks();
    initializeStagingPositions(now);

    setControlState({
      isAssemblyActive: true,
      isPaused: false,
      isSkipped: false,
      isComplete: false,
      activeCount: isMobile ? 4 : 12,
      totalAgents: isMobile ? 4 : 12,
      statusMessage: "Starting Assembly...",
      isManualScroll: false,
    });

    rafIdRef.current = requestAnimationFrame((n) => tickRef.current(n));
  }, [initializeStagingPositions, isMobile, measureAllBlocks]);

  // Resume auto-scroll handler
  const handleResumeAutoScroll = useCallback(() => {
    isManualScrollRef.current = false;
    setControlState((prev) => ({ ...prev, isManualScroll: false }));
  }, []);

  // Initial setup: mobile check, DOM measurement, font readiness, event listeners
  useEffect(() => {
    if (typeof window === "undefined") return;

    const mobileCheck = window.innerWidth < 768;
    setIsMobile(mobileCheck);
    const agentCount = mobileCheck ? 4 : 12;

    // Check user reduced motion preference
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (mediaQuery.matches) {
      completeAllBlocks();
      return;
    }

    // Ensure scroll position is at the very top immediately on start
    window.scrollTo({ top: 0, behavior: "instant" });
    window.scrollTo(0, 0);

    // Set active assembly mode attribute on <html>
    document.documentElement.setAttribute("data-assembly-active", "true");

    measureAllBlocks();

    const now = performance.now();
    lastTimeRef.current = now;

    // Initialize deterministic cursor start coordinates along top header
    initializeStagingPositions(now);

    setControlState((prev) => ({
      ...prev,
      activeCount: agentCount,
      totalAgents: agentCount,
    }));

    // Re-measure after web fonts have finished downloading and swapped in (without resetting cursor positions)
    let isMounted = true;
    if (typeof document !== "undefined" && document.fonts) {
      document.fonts.ready.then(() => {
        if (isMounted) {
          measureAllBlocks();
        }
      });
    }

    // Controlled ResizeObserver on main container to catch real layout shifts (width and height) without resets
    let lastObservedWidth = 0;
    let lastObservedHeight = 0;
    let resizeTimer: ReturnType<typeof setTimeout> | null = null;
    const ro = new ResizeObserver((entries) => {
      for (const entry of entries) {
        const currentW = Math.round(entry.contentRect.width);
        const currentH = Math.round(entry.contentRect.height);
        const widthChanged = Math.abs(currentW - lastObservedWidth) > 4;
        const heightChanged = Math.abs(currentH - lastObservedHeight) > 4;

        if (widthChanged || heightChanged) {
          lastObservedWidth = currentW;
          lastObservedHeight = currentH;
          if (resizeTimer) clearTimeout(resizeTimer);
          resizeTimer = setTimeout(() => {
            if (isMounted) {
              measureAllBlocks();
            }
          }, 100);
        }
      }
    });

    const mainContainer = document.querySelector("main") ?? document.body;
    ro.observe(mainContainer);

    // Manual scroll listeners - disengage auto-scroll without fighting user
    const handleUserScroll = () => {
      if (!isManualScrollRef.current) {
        isManualScrollRef.current = true;
        setControlState((prev) => ({ ...prev, isManualScroll: true }));
      }
    };

    const handleKeyShortcut = (e: KeyboardEvent) => {
      const tag = (e.target as HTMLElement)?.tagName?.toLowerCase();
      if (
        tag === "input" ||
        tag === "textarea" ||
        tag === "select" ||
        (e.target as HTMLElement)?.isContentEditable
      ) {
        return;
      }

      if (e.key === "p" || e.key === "P") {
        handleTogglePause();
      } else if (e.key === "s" || e.key === "S" || e.key === "Escape") {
        handleSkip();
      } else if (e.key === "r" || e.key === "R") {
        handleReplay();
      } else if (
        ["ArrowUp", "ArrowDown", "PageUp", "PageDown", "Home", "End", " "].includes(
          e.key
        )
      ) {
        handleUserScroll();
      }
    };

    const handleResize = () => {
      measureAllBlocks();
    };

    window.addEventListener("wheel", handleUserScroll, { passive: true });
    window.addEventListener("touchmove", handleUserScroll, { passive: true });
    window.addEventListener("keydown", handleKeyShortcut);
    window.addEventListener("resize", handleResize);

    return () => {
      isMounted = false;
      if (resizeTimer) clearTimeout(resizeTimer);
      ro.disconnect();
      window.removeEventListener("wheel", handleUserScroll);
      window.removeEventListener("touchmove", handleUserScroll);
      window.removeEventListener("keydown", handleKeyShortcut);
      window.removeEventListener("resize", handleResize);
      document.documentElement.removeAttribute("data-assembly-active");
    };
  }, [completeAllBlocks, handleReplay, handleSkip, handleTogglePause, initializeStagingPositions, measureAllBlocks]);

  // Main 60fps RequestAnimationFrame Animation Loop
  useEffect(() => {
    let isCancelled = false;

    startTimeRef.current = performance.now();
    lastTimeRef.current = performance.now();

    const tick = (now: number) => {
      tickRef.current = tick;
      if (isCancelled) return;

      if (!startTimeRef.current) {
        startTimeRef.current = now;
      }

      const dt = Math.min((now - lastTimeRef.current) / 1000, 0.1);
      lastTimeRef.current = now;

      // If paused, keep subtle organic micro-movements on active cursors
      if (isPausedRef.current) {
        const activeAgents = isMobile
          ? CURSOR_AGENTS.slice(0, 4)
          : CURSOR_AGENTS;

        activeAgents.forEach((agent, idx) => {
          const kin = kinematicsRef.current[agent.id];
          const ref = cursorRefs.current[agent.id];
          if (kin && ref) {
            const wobbleX = Math.sin(now * 0.003 + idx * 1.5) * 1.5;
            const wobbleY = Math.cos(now * 0.003 + idx * 1.5) * 1.5;
            ref.style.transform = `translate3d(${Math.round(kin.x + wobbleX)}px, ${Math.round(kin.y + wobbleY)}px, 0)`;
          }
        });

        rafIdRef.current = requestAnimationFrame(tick);
        return;
      }

      // Calculate elapsed active animation time
      const elapsed = now - startTimeRef.current - totalPausedDurationRef.current;

      // Completion check
      if (elapsed >= TOTAL_ANIMATION_MS) {
        completeAllBlocks();
        return;
      }

      // PHASE 1: State Machine Progression with MARK, ROUGH, DISSOLVE, and DONE
      // Priority 2: Enforce hard limit of <= 4 actively working blocks (MARK or ROUGH)
      let activeWorkingCount = 0;
      blocksInternalRef.current.forEach((b) => {
        if (b.state === "MARK" || b.state === "ROUGH") activeWorkingCount++;
      });

      const activeBlocksList: BlockTargetInternal[] = [];
      let currentStatusMsg = "Collaborative Agents Assembling Portfolio...";

      blocksInternalRef.current.forEach((block) => {
        if (block.state === "EMPTY") {
          if (elapsed >= block.startMs) {
            if (activeWorkingCount < 4) {
              block.state = "MARK";
              activeWorkingCount++;
            } else {
              // Defer block start to maintain max 4 working cursors
              block.startMs = elapsed + 60;
              block.markMs = block.startMs + MARK_DURATION_MS;
              block.roughMs =
                block.markMs +
                (block.id === "hero-title"
                  ? HERO_TITLE_ROUGH_DURATION_MS
                  : ROUGH_DURATION_MS);
              block.doneMs = block.roughMs + DISSOLVE_DURATION_MS;
            }
          }
        } else if (block.state === "MARK") {
          if (elapsed >= block.markMs) {
            block.state = "ROUGH";
          }
        } else if (block.state === "ROUGH") {
          if (elapsed >= block.doneMs) {
            block.state = "DONE";
            block.isDissolving = false;
            block.dissolveOpacity = 0;
            if (
              block.element &&
              !block.element.hasAttribute("data-assembly-done")
            ) {
              const pAgent =
                CURSOR_AGENTS[block.primaryAgentIndex] ?? CURSOR_AGENTS[0];
              block.element.style.setProperty("--flash-color", pAgent.color);
              block.element.setAttribute("data-assembly-done", "true");
              block.element.classList.add("assembly-block-completed");
              setTimeout(() => {
                block.element?.classList.remove("assembly-block-completed");
              }, 750);
            }
          } else if (elapsed >= block.roughMs) {
            block.isDissolving = true;
            const dissolveProgress =
              (elapsed - block.roughMs) / (block.doneMs - block.roughMs);
            block.dissolveOpacity =
              1 - Math.min(1, Math.max(0, dissolveProgress));
            if (
              block.element &&
              !block.element.hasAttribute("data-assembly-done")
            ) {
              const pAgent =
                CURSOR_AGENTS[block.primaryAgentIndex] ?? CURSOR_AGENTS[0];
              block.element.style.setProperty("--flash-color", pAgent.color);
              block.element.setAttribute("data-assembly-done", "true");
              block.element.classList.add("assembly-block-completed");
              setTimeout(() => {
                block.element?.classList.remove("assembly-block-completed");
              }, 750);
            }
          }
        }

        if (block.state === "MARK" || block.state === "ROUGH") {
          activeBlocksList.push(block);
          currentStatusMsg = `${block.markTask}...`;
        }
      });

      const activeKey = activeBlocksList
        .map((b) => `${b.id}:${b.state}:${b.isDissolving}`)
        .join("|");
      if (activeKey !== prevActiveKeyRef.current) {
        prevActiveKeyRef.current = activeKey;
        setActiveBlocks([...activeBlocksList]);
      }

      // Update marquee DOM dimensions, live W x H labels, and dissolve opacity at 60fps
      activeBlocksList.forEach((block) => {
        const mEl = marqueeRefs.current[block.id];
        if (!mEl) return;

        if (block.state === "MARK") {
          const rawP =
            (elapsed - block.startMs) / (block.markMs - block.startMs);
          const markP = Math.min(1, Math.max(0, rawP));
          const easeP =
            markP < 0.5 ? 2 * markP * markP : -1 + (4 - 2 * markP) * markP;

          const curW = Math.max(0, Math.round(block.width * easeP));
          const curH = Math.max(0, Math.round(block.height * easeP));

          mEl.style.width = `${curW + 6}px`;
          mEl.style.height = `${curH + 6}px`;

          const dimEl = dimRefs.current[block.id];
          if (dimEl) {
            dimEl.textContent = `${curW} × ${curH}px`;
          }
        } else {
          // ROUGH or DISSOLVE: full target dimensions
          mEl.style.width = `${block.width + 6}px`;
          mEl.style.height = `${block.height + 6}px`;
        }

        mEl.style.opacity = `${block.isDissolving ? block.dissolveOpacity : 1}`;
      });

      // PHASE 1: Hero Title Typewriter simulation during ROUGH
      const heroTitleBlock = blocksInternalRef.current.find(
        (b) => b.id === "hero-title"
      );
      if (
        heroTitleBlock &&
        (heroTitleBlock.state === "ROUGH" || heroTitleBlock.isDissolving)
      ) {
        const rawProgress =
          (elapsed - heroTitleBlock.markMs) /
          (heroTitleBlock.roughMs - heroTitleBlock.markMs);
        const progress = Math.min(1, Math.max(0, rawProgress));
        const charsToShow = Math.floor(progress * HERO_TITLE_FULL.length);
        setTypedHeroTitle(HERO_TITLE_FULL.slice(0, charsToShow));
      } else if (heroTitleBlock && heroTitleBlock.state === "DONE") {
        setTypedHeroTitle("");
      }

      // PHASE 4: Continuous Camera Tracking (Priority 1: Zero lag, track active section)
      if (!isManualScrollRef.current) {
        const workingBlocks = blocksInternalRef.current.filter(
          (b) => b.state === "MARK" || b.state === "ROUGH"
        );

        let targetScrollY = window.scrollY;

        if (workingBlocks.length > 0) {
          const avgY =
            workingBlocks.reduce(
              (acc, b) => acc + (b.docY + b.height * 0.5),
              0
            ) / workingBlocks.length;
          targetScrollY = Math.max(0, avgY - window.innerHeight * 0.38);
        } else {
          const upcoming = blocksInternalRef.current.find(
            (b) => b.state === "EMPTY"
          );
          if (upcoming) {
            targetScrollY = Math.max(0, upcoming.docY - window.innerHeight * 0.38);
          }
        }

        const maxScroll = Math.max(
          0,
          document.documentElement.scrollHeight - window.innerHeight
        );
        targetScrollY = Math.min(maxScroll, Math.max(0, targetScrollY));

        const scrollDiff = targetScrollY - window.scrollY;
        if (Math.abs(scrollDiff) > 0.5) {
          const scrollSpeed = 4.2;
          const step = scrollDiff * (1 - Math.exp(-scrollSpeed * dt));
          window.scrollTo(0, window.scrollY + step);
        }
      }

      // Active agent selection (12 desktop / 4 mobile)
      const activeAgents = isMobile
        ? CURSOR_AGENTS.slice(0, 4)
        : CURSOR_AGENTS;

      // Identify currently assigned agents vs idle agents (1:1 primary agent per block)
      const assignedAgentIds = new Set<string>();
      activeBlocksList.forEach((b) => {
        const pAgent = activeAgents[b.primaryAgentIndex];
        if (pAgent) assignedAgentIds.add(pAgent.id);
      });

      const idleAgents = activeAgents.filter((a) => !assignedAgentIds.has(a.id));

      // SVG pointer arrow tip offset relative to cursor div (viewBox 0 0 24 24, tip at 3,2)
      // 26px pointer on desktop (tip at 3.25, 2.167), 20px pointer on mobile (tip at 2.5, 1.667)
      const tipOffsetX = isMobile ? 2.5 : 3.25;
      const tipOffsetY = isMobile ? 1.667 : 2.167;

      // PHASE 3: Update Cursor Kinematics with Cubic Easing & Marquee Tracing
      activeAgents.forEach((agent, agentIdx) => {
        const kin = kinematicsRef.current[agent.id];
        if (!kin) return;

        let nextTx = kin.targetX;
        let nextTy = kin.targetY;
        let nextTask = kin.task;

        // Check if assigned to a currently active block (MARK, ROUGH, or DISSOLVING)
        const assignedBlock = activeBlocksList.find(
          (b) => b.primaryAgentIndex === agentIdx
        );

        // Check if approaching an upcoming block in pre-targeting window (300ms before startMs)
        const approachingBlock = !assignedBlock
          ? blocksInternalRef.current.find(
              (b) =>
                b.state === "EMPTY" &&
                b.primaryAgentIndex === agentIdx &&
                elapsed >= b.startMs - APPROACH_DURATION_MS &&
                elapsed < b.startMs
            )
          : undefined;

        if (assignedBlock) {
          // Reset approaching tracking
          kin.approachingBlockId = undefined;

          if (assignedBlock.state === "MARK") {
            // Cursors visibly trace the marquee corner handle from (0,0) to (width, height)
            const rawP =
              (elapsed - assignedBlock.startMs) /
              (assignedBlock.markMs - assignedBlock.startMs);
            const markP = Math.min(1, Math.max(0, rawP));
            const easeP =
              markP < 0.5 ? 2 * markP * markP : -1 + (4 - 2 * markP) * markP;

            const curW = Math.max(0, Math.round(assignedBlock.width * easeP));
            const curH = Math.max(0, Math.round(assignedBlock.height * easeP));

            // Pin pointer tip directly to bottom-right corner handle of marquee
            nextTx = assignedBlock.docX + curW + 3 - tipOffsetX;
            nextTy = assignedBlock.docY + curH + 3 - tipOffsetY;
            nextTask = assignedBlock.markTask;
          } else {
            // ROUGH or DISSOLVE phase
            if (assignedBlock.id === "hero-title") {
              // Synchronize Copywriter cursor with character typewriter reveal
              const rawProgress =
                (elapsed - assignedBlock.markMs) /
                (assignedBlock.roughMs - assignedBlock.markMs);
              const prog = Math.min(1, Math.max(0, rawProgress));
              const chars = Math.floor(prog * HERO_TITLE_FULL.length);
              const charWidth = Math.min(
                assignedBlock.width / HERO_TITLE_FULL.length,
                38
              );
              nextTx = assignedBlock.docX + chars * charWidth + 14 - tipOffsetX;
              nextTy = assignedBlock.docY + 36 - tipOffsetY;
            } else {
              nextTx = assignedBlock.docX + 8 - tipOffsetX;
              nextTy = assignedBlock.docY - 8 - tipOffsetY;
            }
            nextTask = assignedBlock.roughTask;
          }
        } else if (approachingBlock) {
          // Pre-targeting approach phase: bring assigned cursor smoothly to marquee top-left starting point
          const targetApproachX = approachingBlock.docX + 3 - tipOffsetX;
          const targetApproachY = approachingBlock.docY + 3 - tipOffsetY;

          if (kin.approachingBlockId !== approachingBlock.id) {
            kin.approachingBlockId = approachingBlock.id;
            kin.approachStartX = kin.x;
            kin.approachStartY = kin.y;
          }

          const approachP = Math.min(
            1,
            Math.max(
              0,
              (elapsed - (approachingBlock.startMs - APPROACH_DURATION_MS)) /
                APPROACH_DURATION_MS
            )
          );
          const easeApproach = easeInOutCubic(approachP);

          const appStartX = kin.approachStartX ?? kin.startX;
          const appStartY = kin.approachStartY ?? kin.startY;

          nextTx = appStartX + (targetApproachX - appStartX) * easeApproach;
          nextTy = appStartY + (targetApproachY - appStartY) * easeApproach;
          nextTask = "Targeting";
        } else {
          kin.approachingBlockId = undefined;

          if (elapsed < 400) {
            // Pre-Wave 0: Stay deterministically at staged position in hero corridor
            nextTx = kin.startX;
            nextTy = kin.startY;
            nextTask = agent.role;
          } else {
            // Priority 2: Distributed formation for idle agents in visible screen flanks
            const idleIdx = idleAgents.findIndex((a) => a.id === agent.id);
            const totalIdle = Math.max(1, idleAgents.length);

            if (isMobile) {
              const slotW = (window.innerWidth - 48) / Math.max(1, totalIdle);
              nextTx = Math.round(24 + idleIdx * slotW);
              nextTy = window.scrollY + 88;
            } else {
              const isLeftFlank = idleIdx % 2 === 0;
              const slot = Math.floor(idleIdx / 2);
              const flankX = isLeftFlank
                ? 36 + (slot % 2) * 20
                : window.innerWidth - 145 - (slot % 2) * 20;

              const usableHeight = Math.max(260, window.innerHeight - 220);
              const maxSlots = Math.max(1, Math.ceil(totalIdle / 2));
              const slotSpacing = usableHeight / maxSlots;
              const flankY = window.scrollY + 100 + slot * slotSpacing;

              nextTx = Math.max(20, Math.min(window.innerWidth - 120, flankX));
              nextTy = flankY;
            }
            nextTask = agent.role;
          }
        }

        const isMarkTracing =
          assignedBlock !== undefined && assignedBlock.state === "MARK";
        const isApproaching = approachingBlock !== undefined;

        if (isMarkTracing || isApproaching) {
          kin.x = nextTx;
          kin.y = nextTy;
          kin.startX = nextTx;
          kin.startY = nextTy;
          kin.targetX = nextTx;
          kin.targetY = nextTy;
        } else if (elapsed < 400) {
          // Pre-Wave 0: Keep stably at initial staging position
          kin.x = kin.startX;
          kin.y = kin.startY;
          kin.targetX = kin.startX;
          kin.targetY = kin.startY;
        } else {
          // Detect target change and initiate smooth distance-aware cubic transition
          const dist = Math.hypot(nextTx - kin.targetX, nextTy - kin.targetY);
          if (dist > 8) {
            kin.startX = kin.x;
            kin.startY = kin.y;
            kin.targetX = nextTx;
            kin.targetY = nextTy;
            kin.startTime = now;
            kin.duration = Math.min(600, Math.max(350, Math.sqrt(dist) * 18));
          }

          // Apply cubic easing over calculated travel duration
          const elapsedMove = now - kin.startTime;
          const u = Math.min(1, Math.max(0, elapsedMove / kin.duration));
          const ease = easeInOutCubic(u);

          kin.x = kin.startX + (kin.targetX - kin.startX) * ease;
          kin.y = kin.startY + (kin.targetY - kin.startY) * ease;
        }

        kin.task = nextTask;

        // Subtle organic float to avoid mechanical stillness (disabled during precision mark drag, approach, and pre-start)
        const isLocked = isMarkTracing || isApproaching || elapsed < 400;
        const wobbleX = isLocked
          ? 0
          : Math.sin(now * 0.0025 + agentIdx * 1.5) * 1.4;
        const wobbleY = isLocked
          ? 0
          : Math.cos(now * 0.003 + agentIdx * 1.5) * 1.4;

        const el = cursorRefs.current[agent.id];
        if (el) {
          el.style.transform = `translate3d(${Math.round(
            kin.x + wobbleX
          )}px, ${Math.round(kin.y + wobbleY)}px, 0)`;
        }

        // Direct task badge text update
        const taskTextEl = taskTextRefs.current[agent.id];
        if (taskTextEl && taskTextEl.textContent !== kin.task) {
          taskTextEl.textContent = kin.task;
        }
      });

      // Periodic throttled status update for the status bar
      if (Math.floor(now / 500) % 2 === 0) {
        setControlState((prev) => ({
          ...prev,
          statusMessage: currentStatusMsg,
          activeCount: activeAgents.length,
        }));
      }

      rafIdRef.current = requestAnimationFrame(tick);
    };

    rafIdRef.current = requestAnimationFrame(tick);

    return () => {
      isCancelled = true;
      if (rafIdRef.current) {
        cancelAnimationFrame(rafIdRef.current);
        rafIdRef.current = null;
      }
    };
  }, [completeAllBlocks, isMobile]);

  const activeAgents = isMobile
    ? CURSOR_AGENTS.slice(0, 4)
    : CURSOR_AGENTS;

  return (
    <>
      {/* Screen Reader Live Announcement */}
      <div className="sr-only" aria-live="polite">
        {controlState.isComplete
          ? "Website assembly completed. All portfolio sections are fully rendered and interactive."
          : `Website assembly in progress: ${controlState.statusMessage}`}
      </div>

      {/* Full-Document Absolute Overlay Container */}
      <div
        className="absolute top-0 left-0 w-full pointer-events-none select-none z-30 overflow-hidden"
        style={{ height: `${docHeight}px` }}
        aria-hidden="true"
      >
        {/* Render Active Selection Marquees & Wireframe Skeletons */}
        {activeBlocks.map((block) => {
          const agent =
            CURSOR_AGENTS[block.primaryAgentIndex] ?? CURSOR_AGENTS[0];
          const isMark = block.state === "MARK";
          const isRough = block.state === "ROUGH";
          const dissolveOpacity = block.isDissolving
            ? block.dissolveOpacity
            : 1;

          return (
            <div
              key={block.id}
              className="absolute pointer-events-none"
              style={{
                left: `${block.docX - 3}px`,
                top: `${block.docY - 3}px`,
              }}
            >
              {/* Marquee Border Container */}
              <div
                ref={(el) => {
                  marqueeRefs.current[block.id] = el;
                }}
                className="assembly-marquee relative rounded-xs transition-colors duration-150 overflow-visible"
                style={{
                  width: `${isMark ? 6 : block.width + 6}px`,
                  height: `${isMark ? 6 : block.height + 6}px`,
                  border: isRough
                    ? `1.5px solid ${agent.color}dd`
                    : `1.5px dashed ${agent.color}99`,
                  backgroundColor: isRough
                    ? "rgba(18, 18, 21, 0.65)"
                    : "rgba(18, 18, 21, 0.2)",
                  boxShadow: isRough
                    ? `0 0 16px ${agent.color}25`
                    : `0 0 10px ${agent.color}15`,
                  opacity: dissolveOpacity,
                }}
              >
                {/* 4 Corner Square Drag Handles */}
                <span
                  className="absolute -top-1 -left-1 w-2 h-2 rounded-[1px] shadow-xs"
                  style={{ backgroundColor: agent.color }}
                />
                <span
                  className="absolute -top-1 -right-1 w-2 h-2 rounded-[1px] shadow-xs"
                  style={{ backgroundColor: agent.color }}
                />
                <span
                  className="absolute -bottom-1 -left-1 w-2 h-2 rounded-[1px] shadow-xs"
                  style={{ backgroundColor: agent.color }}
                />
                <span
                  className="absolute -bottom-1 -right-1 w-2 h-2 rounded-[1px] shadow-xs"
                  style={{ backgroundColor: agent.color }}
                />

                {/* MARK State: Compact Agent Tag + Live Leading Corner Dimension Badge */}
                {isMark && (
                  <>
                    <div
                      className="absolute -top-5 left-0 px-1.5 py-0.5 rounded-xs text-[8.5px] font-mono font-semibold text-zinc-950 uppercase tracking-wider flex items-center gap-1 shadow-sm"
                      style={{ backgroundColor: agent.color }}
                    >
                      <span>{agent.name}</span>
                      <span className="opacity-75 font-normal">· Tracing</span>
                    </div>

                    <div
                      ref={(el) => {
                        dimRefs.current[block.id] = el;
                      }}
                      className="absolute -bottom-6 right-0 translate-x-2 px-1.5 py-0.5 rounded-xs bg-zinc-950/95 border border-zinc-700/80 font-mono text-[8.5px] text-zinc-300 font-semibold tracking-tight shadow-md whitespace-nowrap pointer-events-none z-30"
                    >
                      0 × 0px
                    </div>
                  </>
                )}

                {/* ROUGH State: Compact Dark JSX Tooltip with Arrow Indicator (Priority 3: Opaque, clear of header) */}
                {isRough && !block.isDissolving && (
                  <div
                    className={`absolute left-2 flex flex-col items-start z-20 pointer-events-none select-none ${
                      block.docY - (typeof window !== "undefined" ? window.scrollY : 0) < 90
                        ? "-bottom-6"
                        : "-top-6"
                    }`}
                  >
                    {block.docY - (typeof window !== "undefined" ? window.scrollY : 0) >= 90 ? (
                      <>
                        <div className="flex items-center gap-1.5 px-2 py-0.5 rounded-xs bg-[#09090b] border border-zinc-800 shadow-xl">
                          <span
                            className="w-1.5 h-1.5 rounded-full shrink-0"
                            style={{ backgroundColor: agent.color }}
                          />
                          <span className="font-mono text-[9px] font-semibold text-zinc-100">
                            {getBlockComponentTag(block.id)}
                          </span>
                          <span className="font-mono text-[8px] text-zinc-400 border-l border-zinc-800/80 pl-1 hidden sm:inline">
                            {agent.name}
                          </span>
                        </div>
                        <div className="w-0 h-0 ml-3 border-x-[3.5px] border-x-transparent border-t-[4px] border-t-zinc-800" />
                      </>
                    ) : (
                      <>
                        <div className="w-0 h-0 ml-3 border-x-[3.5px] border-x-transparent border-b-[4px] border-b-zinc-800" />
                        <div className="flex items-center gap-1.5 px-2 py-0.5 rounded-xs bg-[#09090b] border border-zinc-800 shadow-xl">
                          <span
                            className="w-1.5 h-1.5 rounded-full shrink-0"
                            style={{ backgroundColor: agent.color }}
                          />
                          <span className="font-mono text-[9px] font-semibold text-zinc-100">
                            {getBlockComponentTag(block.id)}
                          </span>
                          <span className="font-mono text-[8px] text-zinc-400 border-l border-zinc-800/80 pl-1 hidden sm:inline">
                            {agent.name}
                          </span>
                        </div>
                      </>
                    )}
                  </div>
                )}

                {/* Wireframe Skeleton Content inside Roughing Marquee with Gradient Shimmer */}
                {isRough && (
                  <div className="w-full h-full p-3 flex flex-col justify-center gap-2 overflow-hidden opacity-90">
                    {block.id === "about-portrait" ? (
                      <div className="w-full h-full border border-zinc-700/60 rounded-xs flex flex-col items-center justify-center gap-2 bg-zinc-900/60 p-3">
                        <div className="w-12 h-12 sm:w-16 sm:h-16 rounded-full skeleton-shimmer" />
                        <span className="font-mono text-[8.5px] text-zinc-400">
                          &lt;PortraitImage /&gt;
                        </span>
                      </div>
                    ) : block.id === "hero-title" ? (
                      <div className="flex items-center">
                        <span className="font-display uppercase text-4xl sm:text-6xl lg:text-7xl tracking-tight text-zinc-200">
                          {typedHeroTitle}
                        </span>
                        <span
                          className="inline-block w-2.5 h-9 sm:h-14 ml-1.5 animate-pulse"
                          style={{ backgroundColor: agent.color }}
                        />
                      </div>
                    ) : (
                      <>
                        <div
                          className="h-3 rounded-xs skeleton-shimmer"
                          style={{
                            width: `${Math.min(90, Math.max(45, block.width * 0.45))}%`,
                          }}
                        />
                        {block.height > 55 && (
                          <div
                            className="h-2.5 rounded-xs skeleton-shimmer"
                            style={{
                              width: `${Math.min(95, Math.max(60, block.width * 0.75))}%`,
                            }}
                          />
                        )}
                        {block.height > 95 && (
                          <div className="h-2 rounded-xs skeleton-shimmer w-3/4" />
                        )}
                      </>
                    )}
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Layer 2: 12 Collaborative Cursors (z-50: clearly visible above sticky header z-40, pointer-events: none) */}
      <div
        className="absolute top-0 left-0 w-full pointer-events-none select-none z-50 overflow-hidden"
        style={{ height: `${docHeight}px` }}
        aria-hidden="true"
      >
        {!controlState.isComplete &&
          activeAgents.map((agent) => (
            <CollaborativeCursor
              key={agent.id}
              agent={agent}
              isMobile={isMobile}
              ref={(el) => {
                cursorRefs.current[agent.id] = el;
                if (el) {
                  const taskSpan = el.querySelector<HTMLSpanElement>(
                    `[data-task-id="${agent.id}"]`
                  );
                  taskTextRefs.current[agent.id] = taskSpan;
                }
              }}
            />
          ))}
      </div>

      {/* Floating Status and Control Bar */}
      <AssemblyStatusBar
        state={controlState}
        onTogglePause={handleTogglePause}
        onSkip={handleSkip}
        onReplay={handleReplay}
        onResumeAutoScroll={handleResumeAutoScroll}
      />
    </>
  );
}
