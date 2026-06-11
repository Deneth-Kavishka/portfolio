// ============================================================
// Portfolio Website — TypeScript Interfaces & Types
// ============================================================

export interface NavItem {
  label: string;
  href: string;
}

export interface SocialLink {
  name: string;
  url: string;
  icon: string; // react-icons component name identifier
}

export interface Skill {
  name: string;
  level: number; // 0–100
  icon: string;
  category: SkillCategory;
}

export type SkillCategory =
  | "Frontend"
  | "Backend"
  | "Database"
  | "Mobile"
  | "Robotics & IoT"
  | "AI & ML"
  | "Languages";

export interface Project {
  id: string;
  title: string;
  description: string;
  longDescription?: string;
  image: string;
  techStack: string[];
  category: ProjectCategory;
  liveUrl?: string;
  githubUrl?: string;
  featured: boolean;
}

export type ProjectCategory = "All" | "Web" | "Mobile" | "IoT/Robotics" | "AI/ML";

export interface Service {
  title: string;
  description: string;
  icon: string;
  features: string[];
}

export interface TimelineItem {
  year: string;
  title: string;
  subtitle: string;
  description: string;
  type: "education" | "experience" | "certification";
}

export interface Testimonial {
  id: string;
  name: string;
  role: string;
  company: string;
  content: string;
  avatar: string;
  rating: number; // 1–5
}

export interface PersonalInfo {
  name: string;
  firstName: string;
  lastName: string;
  designation: string;
  roles: string[];
  email: string;
  phone: string;
  location: string;
  bio: string;
  shortBio: string;
  avatarUrl: string;
  cvUrl: string;
}

export interface Stat {
  label: string;
  value: number;
  suffix: string;
}

export interface ContactFormData {
  name: string;
  email: string;
  subject: string;
  message: string;
}

export type FormStatus = "idle" | "sending" | "sent" | "error";

export type ThemeMode = "dark" | "light";
