export type Category =
  | "Business Analysis"
  | "Career"
  | "Product & Data"
  | "AI & Consulting"
  | "Business Growth";

export interface Course {
  /** Also the thumbnail file name: public/thumbnails/<id>.jpg */
  id: number;
  title: string;
  category: Category;
  /** Full Paystack payment link */
  url: string;
}
