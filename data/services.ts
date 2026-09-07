export interface ServiceItem {
  id: string;
  title: string;
  summary: string;
  offerings: string[];
  icon: "globe" | "layers" | "smartphone" | "building" | "sparkles" | "database" | "palette" | "compass";
}

export const services: ServiceItem[] = [
  {
    id: "web-development",
    title: "Web Development",
    summary:
      "Business websites, portfolios, landing pages, and custom web applications built for clarity and conversion.",
    offerings: [
      "Business websites",
      "Portfolio websites",
      "Landing pages",
      "E-commerce",
      "Web applications",
      "Dashboards",
      "Admin panels",
      "Booking systems",
      "Custom portals",
    ],
    icon: "globe",
  },
  {
    id: "full-stack",
    title: "Full-Stack Development",
    summary:
      "End-to-end product development spanning frontend, backend, APIs, auth, databases, and deployment.",
    offerings: [
      "Frontend",
      "Backend",
      "APIs",
      "Authentication",
      "Databases",
      "Payment integrations",
      "Third-party integrations",
      "Deployment",
    ],
    icon: "layers",
  },
  {
    id: "mobile",
    title: "Mobile Applications",
    summary:
      "Cross-platform and Android-focused applications connected to real business workflows and APIs.",
    offerings: [
      "Android applications",
      "Cross-platform apps",
      "Business applications",
      "Utility applications",
      "API-connected applications",
    ],
    icon: "smartphone",
  },
  {
    id: "business-systems",
    title: "Business Management Systems",
    summary:
      "Custom operational systems that digitize CRM, inventory, attendance, billing, and reporting.",
    offerings: [
      "CRM",
      "Employee management",
      "Inventory",
      "Attendance",
      "Sales",
      "Billing",
      "Appointment management",
      "Reporting",
      "Business dashboards",
    ],
    icon: "building",
  },
  {
    id: "ai-automation",
    title: "AI & Automation",
    summary:
      "Practical AI integrations and automation workflows that reduce manual work and unlock smarter tools.",
    offerings: [
      "AI integrations",
      "AI-powered applications",
      "LLM integrations",
      "Workflow automation",
      "Intelligent tools",
      "Automated reporting",
      "Data processing",
    ],
    icon: "sparkles",
  },
  {
    id: "data-annotation",
    title: "Data Annotation",
    summary:
      "Structured labeling and dataset preparation for machine learning and AI training pipelines.",
    offerings: [
      "Image annotation",
      "Text annotation",
      "Data labeling",
      "Dataset preparation",
      "Data categorization",
      "Quality assurance",
    ],
    icon: "database",
  },
  {
    id: "ui-ux",
    title: "UI/UX",
    summary:
      "Clean interfaces and interactive experiences designed for usability, hierarchy, and brand clarity.",
    offerings: [
      "Website interfaces",
      "Dashboard interfaces",
      "Landing pages",
      "Responsive design",
      "Interactive experiences",
    ],
    icon: "palette",
  },
  {
    id: "consulting",
    title: "Digital Consulting",
    summary:
      "Product and technical planning that helps turn ideas into practical, buildable digital solutions.",
    offerings: [
      "Product planning",
      "Technical planning",
      "Digital transformation",
      "Business digitization",
      "Solution architecture",
    ],
    icon: "compass",
  },
];
