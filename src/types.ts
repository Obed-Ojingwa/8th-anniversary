export type Category =
  | "Business Analysis"
  | "Career"
  | "Product & Data"
  | "AI & Consulting"
  | "Business Growth";

export interface Course {
  id: number;
  title: string;
  category: Category;
  /** Optional image filename in public/thumbnails/. */
  thumbnail?: string;
  /** Full Paystack payment link */
  url: string;
}
