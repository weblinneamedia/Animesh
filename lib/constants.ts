export const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://animeshhazra.vercel.app";

export const SITE_NAME = "Animesh Hazra";

export const SITE_TITLE =
  "Animesh Hazra | Freelance Full-Stack Developer & Digital Solutions Specialist";

export const SITE_DESCRIPTION =
  "Freelance full-stack developer building websites, web applications, mobile apps, business management systems, AI solutions, automation workflows, and data annotation services. Ideas in. Digital solutions out.";

export const SITE_TAGLINE = "I Build Digital Solutions That Turn Ideas Into Reality.";

export const NAV_LINKS = [
  { href: "#about", label: "About" },
  { href: "#services", label: "Services" },
  { href: "#skills", label: "Skills" },
  { href: "#projects", label: "Projects" },
  { href: "#contact", label: "Contact" },
] as const;

export const PROJECT_TYPES = [
  "Website",
  "Web Application",
  "Mobile App",
  "Business Management System",
  "AI / Automation",
  "Data Annotation",
  "UI/UX",
  "Other",
] as const;

export const BUDGET_RANGES = [
  "Not sure yet",
  "Under $1,000",
  "$1,000 – $5,000",
  "$5,000 – $10,000",
  "$10,000+",
] as const;
