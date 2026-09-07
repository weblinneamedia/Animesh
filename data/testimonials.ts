export interface Testimonial {
  id: string;
  quote: string;
  name: string;
  role: string;
  company?: string;
  avatar?: string;
}

/**
 * Do NOT invent testimonials.
 * Add verified client quotes here when available.
 * The testimonials section stays hidden while this array is empty.
 */
export const testimonials: Testimonial[] = [];

export const showTestimonialsSection = testimonials.length > 0;
