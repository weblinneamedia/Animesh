export type ProjectCategory =
  | "Web"
  | "Mobile"
  | "Business"
  | "AI"
  | "Automation"
  | "Data";

export interface Project {
  slug: string;
  title: string;
  description: string;
  category: ProjectCategory;
  image: string;
  technologies: string[];
  features: string[];
  problem: string;
  approach: string;
  solution: string;
  result: string;
  liveUrl?: string;
  githubUrl?: string;
  /** Placeholder projects are clearly labeled and easy to replace */
  isPlaceholder: boolean;
  featured?: boolean;
}

export const projectFilters = [
  "All",
  "Web",
  "Mobile",
  "Business",
  "AI",
  "Automation",
  "Data",
] as const;

/**
 * Replace these placeholders with real case studies.
 * Keep isPlaceholder: false once content is verified.
 */
export const projects: Project[] = [
  {
    slug: "business-operations-portal",
    title: "Business Operations Portal",
    description:
      "A modular web portal concept for managing day-to-day business operations, reporting, and team workflows.",
    category: "Business",
    image: "/images/projects/placeholder-1.svg",
    technologies: ["Next.js", "TypeScript", "Tailwind CSS", "PostgreSQL"],
    features: [
      "Role-based dashboards",
      "Operational reporting views",
      "Modular workflow modules",
      "Responsive admin interface",
    ],
    problem:
      "Many small and mid-size businesses still rely on scattered spreadsheets and disconnected tools to manage operations.",
    approach:
      "Map core workflows first, then design a modular portal architecture that can grow with the business.",
    solution:
      "A custom operations portal structure with dashboards, reporting surfaces, and extensible modules for inventory, attendance, and billing.",
    result:
      "Placeholder case study — replace with measured outcomes once the real project is documented.",
    isPlaceholder: true,
    featured: true,
  },
  {
    slug: "conversion-focused-landing-system",
    title: "Conversion-Focused Landing System",
    description:
      "A high-clarity marketing website system designed for product launches, service offers, and lead capture.",
    category: "Web",
    image: "/images/projects/placeholder-2.svg",
    technologies: ["Next.js", "React", "Tailwind CSS", "Motion"],
    features: [
      "Hero-led storytelling",
      "Accessible contact flows",
      "SEO-ready structure",
      "Performance-focused layout",
    ],
    problem:
      "Many service businesses launch with generic templates that fail to communicate positioning or convert visitors.",
    approach:
      "Start from brand positioning and one clear CTA, then build an editorial layout optimized for speed and clarity.",
    solution:
      "A reusable landing architecture with strong hierarchy, motion that supports storytelling, and conversion-ready contact paths.",
    result:
      "Placeholder case study — replace with conversion metrics and launch outcomes.",
    isPlaceholder: true,
    featured: true,
  },
  {
    slug: "ai-assisted-workflow-tool",
    title: "AI-Assisted Workflow Tool",
    description:
      "An intelligent tool concept that combines LLM assistance with structured workflows for faster decision support.",
    category: "AI",
    image: "/images/projects/placeholder-3.svg",
    technologies: ["Next.js", "TypeScript", "LLM APIs", "Node.js"],
    features: [
      "Prompt-driven assistants",
      "Structured output flows",
      "Human-in-the-loop review",
      "Exportable reports",
    ],
    problem:
      "Teams often need AI support inside real workflows — not another disconnected chatbot.",
    approach:
      "Embed AI where it reduces friction, with clear review steps and structured outputs for business use.",
    solution:
      "A workflow-aware AI interface that helps draft, summarize, and organize operational information.",
    result:
      "Placeholder case study — replace with efficiency gains and adoption notes.",
    isPlaceholder: true,
    featured: true,
  },
  {
    slug: "cross-platform-utility-app",
    title: "Cross-Platform Utility App",
    description:
      "A mobile application concept for utility and business use cases with API-connected features.",
    category: "Mobile",
    image: "/images/projects/placeholder-4.svg",
    technologies: ["React Native", "TypeScript", "REST APIs"],
    features: [
      "Cross-platform delivery",
      "API-connected screens",
      "Lightweight utility flows",
      "Clean mobile UI patterns",
    ],
    problem:
      "Businesses often need mobile access to existing systems without rebuilding everything from scratch.",
    approach:
      "Prioritize core mobile journeys and connect them cleanly to existing backend services.",
    solution:
      "A focused utility app structure designed for practical business and day-to-day use cases.",
    result:
      "Placeholder case study — replace with release notes and usage outcomes.",
    isPlaceholder: true,
  },
  {
    slug: "automation-reporting-pipeline",
    title: "Automation & Reporting Pipeline",
    description:
      "An automation concept for collecting operational data and producing recurring business reports.",
    category: "Automation",
    image: "/images/projects/placeholder-5.svg",
    technologies: ["Python", "Node.js", "Automation scripts", "Dashboards"],
    features: [
      "Scheduled workflows",
      "Data collection steps",
      "Automated report generation",
      "Exception alerts",
    ],
    problem:
      "Manual reporting consumes time and creates inconsistent operational visibility.",
    approach:
      "Identify repeatable reporting steps, automate collection, and keep humans in control of exceptions.",
    solution:
      "A pipeline-oriented automation structure for recurring reports and operational visibility.",
    result:
      "Placeholder case study — replace with time saved and reliability metrics.",
    isPlaceholder: true,
  },
  {
    slug: "dataset-preparation-system",
    title: "Dataset Preparation System",
    description:
      "A structured annotation and dataset preparation workflow for AI training and quality assurance.",
    category: "Data",
    image: "/images/projects/placeholder-6.svg",
    technologies: ["Data labeling", "QA workflows", "Python"],
    features: [
      "Image and text annotation flows",
      "Quality assurance checks",
      "Dataset categorization",
      "Export-ready packaging",
    ],
    problem:
      "AI projects stall when training data is inconsistent, poorly labeled, or hard to audit.",
    approach:
      "Define labeling guidelines, QA checkpoints, and export formats before scaling annotation volume.",
    solution:
      "A practical annotation workflow designed for consistency, reviewability, and dataset readiness.",
    result:
      "Placeholder case study — replace with dataset volume and quality outcomes.",
    isPlaceholder: true,
  },
];

export function getProjectBySlug(slug: string): Project | undefined {
  return projects.find((project) => project.slug === slug);
}

export function getFeaturedProjects(): Project[] {
  return projects.filter((project) => project.featured);
}
