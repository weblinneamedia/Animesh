export interface SocialLink {
  id: string;
  label: string;
  href: string;
  /** Set to true when the URL is a real destination */
  enabled: boolean;
}

/**
 * Replace placeholder hrefs with real URLs and set enabled: true.
 * Disabled links are hidden from the UI.
 */
export const socialLinks: SocialLink[] = [
  {
    id: "linkedin",
    label: "LinkedIn",
    href: "https://linkedin.com/in/YOUR_USERNAME",
    enabled: false,
  },
  {
    id: "github",
    label: "GitHub",
    href: "https://github.com/Animesh0001",
    enabled: true,
  },
  {
    id: "instagram",
    label: "Instagram",
    href: "https://instagram.com/YOUR_USERNAME",
    enabled: false,
  },
  {
    id: "email",
    label: "Email",
    href: "mailto:animeshh393@gmail.com",
    enabled: true,
  },
];

export const activeSocialLinks = socialLinks.filter((link) => link.enabled);
