export interface SkillItem {
  name: string;
  note?: string;
}

export interface SkillCategory {
  id: string;
  label: string;
  skills: SkillItem[];
}

/**
 * Keep this list honest.
 * Only include technologies you actually use, then update project data to match.
 * Current entries align with the placeholder project stack and this codebase.
 */
export const skillCategories: SkillCategory[] = [
  {
    id: "frontend",
    label: "Frontend",
    skills: [
      { name: "HTML" },
      { name: "CSS" },
      { name: "JavaScript" },
      { name: "TypeScript" },
      { name: "React" },
      { name: "Next.js" },
      { name: "Tailwind CSS" },
      { name: "Motion" },
    ],
  },
  {
    id: "backend",
    label: "Backend",
    skills: [
      { name: "Node.js" },
      { name: "REST APIs" },
      { name: "Authentication" },
      { name: "Server Actions" },
    ],
  },
  {
    id: "database",
    label: "Database",
    skills: [{ name: "PostgreSQL" }, { name: "Structured data modeling" }],
  },
  {
    id: "programming",
    label: "Programming",
    skills: [{ name: "JavaScript" }, { name: "TypeScript" }, { name: "Python" }],
  },
  {
    id: "mobile",
    label: "Mobile",
    skills: [{ name: "React Native" }, { name: "Cross-platform apps" }],
  },
  {
    id: "ai",
    label: "AI",
    skills: [
      { name: "LLM integrations" },
      { name: "AI-powered features" },
      { name: "Prompt engineering" },
    ],
  },
  {
    id: "automation",
    label: "Automation",
    skills: [
      { name: "Workflow automation" },
      { name: "Scripting" },
      { name: "Automated reporting" },
    ],
  },
  {
    id: "data",
    label: "Data",
    skills: [
      { name: "Data annotation" },
      { name: "Dataset preparation" },
      { name: "Quality assurance" },
    ],
  },
  {
    id: "tools",
    label: "Tools",
    skills: [{ name: "Git" }, { name: "GitHub" }, { name: "Vercel" }, { name: "Cursor / VS Code" }],
  },
];
