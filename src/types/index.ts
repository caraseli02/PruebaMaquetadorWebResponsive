/**
 * Core domain types and interfaces.
 */

export interface CardData {
  id: string;
  title: string;
  location: string;
  region: string;
  durationDays: number;
  tag: string;
  price: string;
  imageUrl: string;
  imageAlt: string;
  rating: number;
}
