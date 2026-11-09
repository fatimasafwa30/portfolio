export type AssemblyBlockState = "EMPTY" | "MARK" | "ROUGH" | "DONE";

export interface CursorAgentConfig {
  readonly id: string;
  readonly name: string;
  readonly role: string;
  readonly color: string;
}

export interface BlockTargetInfo {
  readonly id: string;
  readonly sectionId: string;
  readonly selector: string;
  readonly label: string;
  readonly roughLabel: string;
  readonly primaryAgentId: string;
  readonly secondaryAgentId?: string;
  docX: number;
  docY: number;
  width: number;
  height: number;
  state: AssemblyBlockState;
}

export interface CursorKinematics {
  x: number;
  y: number;
  targetX: number;
  targetY: number;
  vx: number;
  vy: number;
  state: "idle" | "traveling" | "marking" | "roughing" | "completing";
  taskLabel: string;
  targetBlockId: string | null;
  active: boolean;
}

export interface AssemblyControlState {
  readonly isAssemblyActive: boolean;
  readonly isPaused: boolean;
  readonly isSkipped: boolean;
  readonly isComplete: boolean;
  readonly activeCount: number;
  readonly totalAgents: number;
  readonly statusMessage: string;
  readonly isManualScroll: boolean;
}

export const CURSOR_AGENTS: readonly CursorAgentConfig[] = [
  // 3-Color Consistent Brand Palette: Red (#ff3b2f), Sky (#38bdf8), Mint (#34d399)
  { id: "agent-1", name: "Architect", role: "Layout & Scaffolding", color: "#ff3b2f" },
  { id: "agent-2", name: "Frontend", role: "UI & Component Assembly", color: "#38bdf8" },
  { id: "agent-3", name: "Copywriter", role: "Content & Typography", color: "#34d399" },
  { id: "agent-4", name: "Designer", role: "Color & Visual Hierarchy", color: "#34d399" },
  { id: "agent-5", name: "DevOps", role: "Infrastructure & Routing", color: "#38bdf8" },
  { id: "agent-6", name: "QA Lead", role: "Validation & Testing", color: "#ff3b2f" },
  { id: "agent-7", name: "Typography", role: "Font Scale & Metrics", color: "#38bdf8" },
  { id: "agent-8", name: "Motion", role: "Transitions & Easing", color: "#34d399" },
  { id: "agent-9", name: "Integrator", role: "API & Data Wiring", color: "#38bdf8" },
  { id: "agent-10", name: "Security", role: "Access & Gating", color: "#34d399" },
  { id: "agent-11", name: "Reviewer", role: "Code Review & Standards", color: "#ff3b2f" },
  { id: "agent-12", name: "Optimizer", role: "Performance & Bundles", color: "#ff3b2f" },
];
