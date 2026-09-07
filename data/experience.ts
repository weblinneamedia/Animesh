export type ExperienceType =
  | "professional"
  | "freelance"
  | "project"
  | "learning"
  | "certification"
  | "milestone";

export interface ExperienceItem {
  id: string;
  title: string;
  organization?: string;
  location?: string;
  type: ExperienceType;
  startDate: string;
  endDate?: string;
  description: string;
  highlights?: string[];
  /** Placeholder entries are clearly labeled for easy replacement */
  isPlaceholder: boolean;
}

/**
 * Do not invent employment history.
 * Replace placeholders with verified experience when available.
 */
export const experienceItems: ExperienceItem[] = [
  {
    id: "freelance-practice",
    title: "Freelance Full-Stack Development",
    organization: "Independent",
    type: "freelance",
    startDate: "Present",
    description:
      "Building digital solutions across web, applications, business systems, AI integrations, automation, and data workflows.",
    highlights: [
      "End-to-end product thinking from idea to launch",
      "Custom solutions shaped around real business needs",
      "Modern web and application delivery",
    ],
    isPlaceholder: true,
  },
  {
    id: "digital-solutions-focus",
    title: "Digital Solutions Practice",
    type: "milestone",
    startDate: "Ongoing",
    description:
      "Developing a solutions-first approach that connects design, development, data, and automation into practical products.",
    highlights: [
      "Cross-domain delivery across web, systems, and intelligent tooling",
      "Clear communication and structured project planning",
    ],
    isPlaceholder: true,
  },
  {
    id: "continuous-learning",
    title: "Continuous Skill Development",
    type: "learning",
    startDate: "Ongoing",
    description:
      "Expanding capabilities across modern frontend/backend stacks, AI tooling, automation, and product delivery practices.",
    isPlaceholder: true,
  },
];

export const showExperienceSection = experienceItems.length > 0;
