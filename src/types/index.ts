/**
 * Core domain types and interfaces.
 */

export interface CardData {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  tags: string[];      // Categories used for filtering (e.g. Frontend, UX/UI, a11y)
  rating: number;      // Float representation of rating (e.g. 4.9, 4.2)
  isFeatured?: boolean;
}
