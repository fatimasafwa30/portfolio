export type ProjectType = "individual" | "group";

export interface Project {
  readonly id: string;
  readonly name: string;
  readonly type: ProjectType;
  readonly category: string;
  readonly summary: string;
  readonly event?: string;
  readonly evaluation?: string;
  readonly teamSize?: string;
  readonly myRole?: string;
  readonly myContributions?: readonly string[];
  readonly technologies: readonly string[];
  readonly links?: {
    readonly repository?: string;
    readonly demo?: string;
  };
}

export interface ExperienceItem {
  readonly id: string;
  readonly organization: string;
  readonly role: string;
  readonly period: string;
  readonly description: string;
  readonly responsibilities: readonly string[];
  readonly technologies: readonly string[];
}

export interface PersonalInfo {
  readonly name: string;
  readonly role: string;
  readonly status: string;
  readonly summary: string;
  readonly bioParagraphs: readonly string[];
  readonly decorativeNote: string;
  readonly primaryAction: {
    readonly label: string;
    readonly href: string;
  };
  readonly secondaryAction: {
    readonly label: string;
    readonly href: string;
  };
}

export interface EducationItem {
  readonly institution: string;
  readonly degree: string;
  readonly field: string;
  readonly location: string;
  readonly period: string;
}

export interface EngineeringPillar {
  readonly title: string;
  readonly description: string;
}

export interface SkillCategory {
  readonly name: string;
  readonly skills: readonly string[];
}

export interface SocialLink {
  readonly platform: string;
  readonly url: string;
  readonly label: string;
}
