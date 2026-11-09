import type {
  Project,
  ExperienceItem,
  PersonalInfo,
  EducationItem,
  EngineeringPillar,
  SkillCategory,
} from "@/types/portfolio";

export const personalInfo: PersonalInfo = {
  name: "Fatima Safwa",
  role: "Software Developer | Full-Stack & AI",
  status: "Available for Software Engineering & AI Roles",
  summary:
    "Computer Science (AI & ML) student interested in software development and applied AI. Experience building full-stack applications, backend APIs, agentic AI systems, and geospatial interfaces using React, Next.js, Node.js, Python, and Supabase.",
  bioParagraphs: [
    "Currently pursuing a Bachelor of Engineering in Computer Science (Artificial Intelligence & Machine Learning) at Anjuman Institute of Technology and Management in Bangalore, India.",
    "My engineering focus centers on building reliable full-stack applications, resilient backend architectures, and practical applied AI systems. From hackathon infrastructure with role-based access control to forensic evidence verification and satellite-derived maritime monitoring, I prioritize data integrity, deterministic outputs, and clean architecture.",
  ],
  decorativeNote: "// building reliable AI & web systems",
  primaryAction: {
    label: "View Selected Projects",
    href: "#projects",
  },
  secondaryAction: {
    label: "Download Resume (PDF)",
    href: "/resume.pdf",
  },
};

export const educationData: EducationItem = {
  institution: "Anjuman Institute of Technology and Management",
  degree: "Bachelor of Engineering (B.E.)",
  field: "Computer Science (AI & ML)",
  location: "Bangalore, India",
  period: "October 2024 – July 2028",
};

export const engineeringPillars: readonly EngineeringPillar[] = [
  {
    title: "Applied AI & Intent Classification",
    description:
      "Designing intent-driven workflows with retrieval and confidence-based abstention to handle low-evidence cases reliably.",
  },
  {
    title: "Backend Architecture & API Security",
    description:
      "Building secure Route Handlers, PostgreSQL schema models, Zod schema validation, authentication, and role-based access control.",
  },
  {
    title: "Geospatial Systems & Evidence Integrity",
    description:
      "Crafting responsive web interfaces, interactive Leaflet geospatial visualizations, and client-side cryptographic SHA-256 evidence hashing.",
  },
];

export const individualProjects: readonly Project[] = [
  {
    id: "support-intelligence-agent",
    name: "Support Intelligence Agent",
    type: "individual",
    category: "AI Customer Support",
    summary:
      "Built an AI-powered customer support agent using TF-IDF and Logistic Regression for intent classification. Integrated retrieval-based assistance, confidence and evidence gating, clarification requests, and policy-driven escalation with designated support queue assignment. Exposed analysis results and routing decisions through a validated API.",
    technologies: [
      "Python",
      "Scikit-learn",
      "TF-IDF",
      "Logistic Regression",
      "Retrieval",
    ],
    links: {
      repository: "https://github.com/fatimasafwa30/support-intelligence-agent",
      demo: "https://support-intelligence-agent.onrender.com/",
    },
  },
  {
    id: "repo-intelligence",
    name: "Repo Intelligence — REPO IQ",
    type: "individual",
    category: "Developer Tools",
    summary:
      "Full-stack GitHub repository analysis tool that examines repository structure, dependencies, and code organization using GitHub's Octokit API, with explanations powered by Groq.",
    technologies: ["React", "Vite", "Express.js", "Octokit", "Groq API"],
    links: {
      repository: "https://github.com/fatimasafwa30/repo-intelligence",
      demo: "https://repo-intelligence-three.vercel.app",
    },
  },
  {
    id: "medilink-ai",
    name: "MediLink AI",
    type: "individual",
    category: "Healthcare AI",
    summary:
      "AI-enabled healthcare application with medicine scanning, a digital health profile, and specialist discovery and dispatch interfaces.",
    technologies: [
      "React",
      "Vite",
      "Tailwind CSS",
      "Supabase",
      "PostgreSQL",
      "Gemini API",
      "OpenFDA API",
    ],
    links: {
      demo: "https://medi-link-ai-theta.vercel.app",
    },
  },
  {
    id: "hostelfix",
    name: "HostelFix",
    type: "individual",
    category: "Complaint Management",
    summary:
      "Hostel complaint management platform with student and warden workflows, including complaint submission with photo attachments, filtering, and status tracking.",
    technologies: [
      "React",
      "Node.js",
      "Express.js",
      "MongoDB",
      "Mongoose",
      "JWT",
    ],
    links: {
      demo: "https://hostelfix-dusky.vercel.app",
    },
  },
];

export const groupProjects: readonly Project[] = [
  {
    id: "veratrace",
    name: "VeraTrace",
    type: "group",
    category: "Women's Safety",
    event: "recHERsion’26 — Women's Safety",
    summary:
      "Digital evidence preservation and verification platform that uses SHA-256 hashing to detect changes to recorded evidence.",
    teamSize: "Team of three",
    myRole: "UI Developer",
    technologies: ["React", "Vite", "JavaScript", "Web Crypto API"],
    links: {
      repository: "https://github.com/fatimasafwa30/NITK-reHERsion",
      demo: "https://veratrace-app.vercel.app",
    },
  },
  {
    id: "samudra-sakshi",
    name: "SAMUDRA SAKSHI",
    type: "group",
    category: "Maritime Monitoring",
    event: "Smart India Hackathon 2026 — Problem Statement SIH26143",
    summary:
      "Satellite-imagery-based oil spill detection and vessel attribution platform combining satellite observations, AIS vessel data, and drift analysis.",
    myContributions: [
      "Collaborative frontend development alongside a teammate",
      "Packet Integrity",
      "Provenance",
      "Indian Validation Readiness",
    ],
    technologies: [
      "React",
      "Vite",
      "JavaScript",
      "Leaflet",
      "Satellite imagery",
      "AIS data",
    ],
  },
];

export const experienceData: readonly ExperienceItem[] = [
  {
    id: "noob-hackverse",
    organization: "Noob Hackverse — College Hackathon Platform",
    role: "Backend Developer",
    period: "2026 – Present",
    description:
      "Contributing to the backend development of a college hackathon platform.",
    responsibilities: [
      "Developed backend Route Handlers and REST API functionality.",
      "Worked with PostgreSQL data models for registrations, sessions, teams, and member operations.",
      "Implemented request validation using Zod.",
      "Worked on authentication, role-based access control, and rate limiting.",
      "Added API documentation and health-check endpoints.",
    ],
    technologies: [
      "Next.js",
      "TypeScript",
      "Supabase",
      "PostgreSQL",
      "Zod",
      "REST APIs",
    ],
  },
];

export const skillCategories: readonly SkillCategory[] = [
  {
    name: "Programming Languages",
    skills: ["Python", "JavaScript", "HTML", "CSS"],
  },
  {
    name: "Frontend Development",
    skills: [
      "React.js",
      "Next.js",
      "Vite",
      "React Router",
      "Leaflet.js",
      "React-Leaflet",
      "Responsive Design",
    ],
  },
  {
    name: "Backend Development",
    skills: [
      "Node.js",
      "Express.js",
      "Next.js Route Handlers",
      "REST APIs",
      "WebSockets",
      "CORS",
    ],
  },
  {
    name: "AI & Machine Learning",
    skills: [
      "Scikit-learn",
      "TF-IDF",
      "Logistic Regression",
      "Intent Classification",
      "Retrieval",
      "Agentic AI",
    ],
  },
  {
    name: "Databases",
    skills: ["PostgreSQL", "MongoDB", "Supabase"],
  },
  {
    name: "Security & Authentication",
    skills: ["JWT", "RBAC", "Zod", "Rate Limiting"],
  },
  {
    name: "APIs & Developer Tools",
    skills: ["Groq API", "Octokit", "Git", "GitHub", "npm", "API Testing"],
  },
  {
    name: "Cloud & Deployment",
    skills: ["Vercel", "Render", "CI/CD"],
  },
];
