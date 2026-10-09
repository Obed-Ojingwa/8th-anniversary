import type { Category, Course } from "../types";

/** Site-wide settings. Change these freely. */
export const SITE = {
  name: "The $8 Masterclass Shelf",
  price: "$8",
};

const PAY = "https://paystack.shop/pay/";

const c = (
  id: number,
  category: Category,
  title: string,
  code: string
): Course => ({ id, category, title, url: PAY + code });

/**
 * NOTE: the payment codes below were read from a cropped screenshot.
 * Several were cut off at the edge (marked CHECK). Paste the full code
 * from your source sheet before launching.
 */
export const COURSES: Course[] = [
  c(1, "Business Analysis", "Business Analysis Masterclass", "ziceq0zmf4"),
  c(2, "Business Analysis", "Strategic Business Analysis Masterclass", "esomfznqoc"), // CHECK
  c(3, "Business Analysis", "The 3 Ps of Business Analysis", "y5kt3hzc86"),
  c(4, "Business Analysis", "Practical Strategies To Land A 6-Figure Business Analysis Job", "tye8nr75uz"),
  c(5, "Business Analysis", "Land Your Business Analysis Job", "nlaqdukf1n"),
  c(6, "Business Analysis", "Getting Hired as a Business Analyst Without Any Experience or Degree", "jjcj7xoae1"),
  c(7, "Business Analysis", "How To Land Your Business Analysis Job With Any Experience", "uutxzhfk73"),
  c(8, "Business Analysis", "Land Your 6-Figure Business Analysis Job", "div4ojc56r"),
  c(9, "Business Analysis", "Unlock Your Career Potential: Master Business Analysis Skills", "f7qwdi3zuo"),
  c(10, "Business Analysis", "Unlocking Global Career Opportunities with Business Analysis Skills", "unvj5tkxf3"),
  c(11, "Business Analysis", "The 6-Figure Business Analyst Blueprint", "s0k2synxd5"),
  c(12, "Career", "Career Accelerator Masterclass", "cv63ndazrn"),
  c(13, "Career", "Resume & LinkedIn Optimization", "os618rfe1d"),
  c(14, "Product & Data", "Practical Business Analysis and Project Management", "yvzv8rwriu"),
  c(15, "Product & Data", "Unlock Your Career with Business Analysis & Project Management", "sos7cya5r6"),
  c(16, "Product & Data", "Unlock Your Career with Business Analysis & Product Management", "3hepv-m7cc"), // CHECK
  c(17, "Product & Data", "The 12 Steps In Product Management", "48mrpe2745"), // CHECK
  c(18, "Product & Data", "Master Business Analysis & Data Analysis", "bwuqyod4vx"), // CHECK
  c(19, "Product & Data", "How To Land 6-Figure Jobs in BA, Data & Product in an AI-Driven World", "c19ctonq2o"),
  c(20, "Product & Data", "Your 6-Figure Career as a Business Analyst, Product Manager or Data Analyst", "v901msuj4p"),
  c(21, "AI & Consulting", "Become an AI & Automation Business Analyst", "7iwlhklf2p"),
  c(22, "AI & Consulting", "Become a Certified Business Strategist", "2uyq-lftuw"),
  c(23, "AI & Consulting", "Grow Your Income To 6 Figures As An AI Business Consultant", "5hlys6ofy6"),
  c(24, "AI & Consulting", "From Business Analyst To 6-Figure AI Business Consultant", "-udpvpskd0"),
  c(25, "Business Growth", "7-Figure Consulting & Thought Leadership Masterclass", "2lme1-voqn"), // CHECK
  c(26, "Business Growth", "Scale Your Business", "req6oyqu9x"), // CHECK
  c(27, "Business Growth", "From Accountant to a Multi-Million Dollar Global Consulting and Education Company", "fct01a86f5"),
];

export const CATEGORIES: Category[] = [
  "Business Analysis",
  "Career",
  "Product & Data",
  "AI & Consulting",
  "Business Growth",
];
