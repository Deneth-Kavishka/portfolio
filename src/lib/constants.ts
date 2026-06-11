// ============================================================
// Portfolio Website — Constants & Portfolio Data
// ============================================================

import type {
  NavItem,
  SocialLink,
  Skill,
  Project,
  Service,
  TimelineItem,
  Testimonial,
  PersonalInfo,
  Stat,
} from "./types";

// ── Personal Information ──────────────────────────────────────
export const PERSONAL_INFO: PersonalInfo = {
  name: "Deneth Kavishka",
  firstName: "Deneth",
  lastName: "Kavishka",
  designation: "Software Engineer & Full-Stack Developer",
  roles: [
    "Software Engineer",
    "University IT Instructor",
    "Full-Stack Web Developer",
    "Robotics & IoT Developer",
    "Tech Blogger",
    "Technology Enthusiast",
  ],
  email: "denethkavishkaedu1@gmail.com",
  phone: "+94 76 914 6080",
  location: "Sri Lanka",
  bio: "Passionate Software Engineer with expertise in full-stack web development, robotics, IoT systems, and AI/ML. I build elegant, scalable digital solutions that solve real-world problems. As a university IT instructor, I bridge the gap between academic theory and industry practice, mentoring the next generation of tech innovators.",
  //  shortBio: "Building the future through code, circuits, and creativity. Transforming complex challenges into elegant digital solutions.",
  shortBio:
    "Software Engineer, Full-Stack Developer, competitive roboticist, and IT Instructor. Build scalable web applications, engineer intelligent hardware solutions, and mentor the next generation of tech innovators.",
  avatarUrl: "/avatar.png",
  cvUrl: "/cv.pdf",
};

// ── Navigation Items ──────────────────────────────────────────
export const NAV_ITEMS: NavItem[] = [
  { label: "Home", href: "hero" },
  { label: "About", href: "about" },
  { label: "Skills", href: "skills" },
  { label: "Projects", href: "projects" },
  { label: "Services", href: "services" },
  { label: "Experience", href: "experience" },
  { label: "Testimonials", href: "testimonials" },
  { label: "Contact", href: "contact" },
];

// ── Social Links ──────────────────────────────────────────────
export const SOCIAL_LINKS: SocialLink[] = [
  {
    name: "LinkedIn",
    url: "https://linkedin.com/in/deneth",
    icon: "FaLinkedinIn",
  },
  { name: "GitHub", url: "https://github.com/deneth", icon: "FaGithub" },
  { name: "Facebook", url: "https://facebook.com/deneth", icon: "FaFacebookF" },
  {
    name: "Instagram",
    url: "https://instagram.com/deneth",
    icon: "FaInstagram",
  },
  { name: "Fiverr", url: "https://fiverr.com/deneth", icon: "SiFiverr" },
  { name: "WhatsApp", url: "https://wa.me/94769146080", icon: "FaWhatsapp" },
  {
    name: "Email",
    url: "mailto:denethkavishkaedu1@gmail.com",
    icon: "FaEnvelope",
  },
];

// ── Statistics ────────────────────────────────────────────────
export const STATS: Stat[] = [
  { label: "Projects Completed", value: 10, suffix: "+" },
  { label: "Happy Clients", value: 30, suffix: "+" },
  { label: "Years Experience", value: 2, suffix: "+" },
  { label: "Technologies", value: 20, suffix: "+" },
];

// ── Skills ────────────────────────────────────────────────────
export const SKILLS: Skill[] = [
  // Frontend
  { name: "HTML5", level: 98, icon: "FaHtml5", category: "Frontend" },
  { name: "CSS3", level: 95, icon: "FaCss3Alt", category: "Frontend" },
  { name: "JavaScript", level: 95, icon: "SiJavascript", category: "Frontend" },
  { name: "React.js", level: 95, icon: "FaReact", category: "Frontend" },
  { name: "TypeScript", level: 95, icon: "SiTypescript", category: "Frontend" },
  { name: "Next.js", level: 90, icon: "SiNextdotjs", category: "Frontend" },
  { name: "Tailwind CSS", level: 90, icon: "SiTailwindcss", category: "Frontend" },
  { name: "React-Native", level: 75, icon: "FaReact", category: "Frontend" },

  // Backend
  { name: "PHP", level: 95, icon: "FaPhp", category: "Backend" },
  { name: "Node.js", level: 92, icon: "FaNodeJs", category: "Backend" },
  { name: "Laravel", level: 90, icon: "FaLaravel", category: "Backend" },
  { name: "Express.js", level: 88, icon: "SiExpress", category: "Backend" },
  { name: "Python", level: 85, icon: "FaPython", category: "Backend" },
  { name: "R", level: 82, icon: "SiR", category: "Backend" },
  { name: "Spring Boot", level: 75, icon: "SiSpringboot", category: "Backend" },
  { name: "REST APIs", level: 85, icon: "SiFastapi", category: "Backend" },

  // Database
  { name: "MySQL", level: 95, icon: "SiMysql", category: "Database" },
  { name: "PostgreSQL", level: 90, icon: "SiPostgresql", category: "Database" },
  { name: "MongoDB", level: 85, icon: "SiMongodb", category: "Database" },
  { name: "Firebase", level: 82, icon: "SiFirebase", category: "Database" },
  { name: "Oracle DB", level: 80, icon: "FaDatabase", category: "Database" },

  // Mobile
  { name: "Kotlin", level: 85, icon: "SiKotlin", category: "Mobile" },
  { name: "React Native", level: 80, icon: "FaReact", category: "Mobile" },
  { name: "Android", level: 75, icon: "FaAndroid", category: "Mobile" },
  { name: "Flutter", level: 70, icon: "SiFlutter", category: "Mobile" },

  // Robotics & IoT
  { name: "Arduino", level: 95, icon: "SiArduino", category: "Robotics & IoT" },
  { name: "ESP32", level: 85, icon: "SiEspressif", category: "Robotics & IoT" },
  { name: "ESP8266", level: 82, icon: "SiEspressif", category: "Robotics & IoT" },
  { name: "Embedded C", level: 80, icon: "SiC", category: "Robotics & IoT" },
  { name: "Raspberry Pi", level: 75, icon: "SiRaspberrypi", category: "Robotics & IoT" },

  // AI & ML
  { name: "OpenCV", level: 85, icon: "SiOpencv", category: "AI & ML" },
  { name: "TensorFlow", level: 75, icon: "SiTensorflow", category: "AI & ML" },
  { name: "PyTorch", level: 70, icon: "SiPytorch", category: "AI & ML" },
  { name: "Scikit-learn", level: 70, icon: "SiScikitlearn", category: "AI & ML"},

  // Programming Languages
  { name: "Java", level: 95, icon: "FaJava", category: "Languages" },
  { name: "PHP", level: 95, icon: "FaPhp", category: "Languages" },
  { name: "Python", level: 90, icon: "FaPython", category: "Languages" },
  { name: "JavaScript", level: 95, icon: "SiJavascript", category: "Languages" },
  { name: "TypeScript", level: 90, icon: "SiTypescript", category: "Languages" },
  { name: "R", level: 85, icon: "SiR", category: "Languages" },
  { name: "Kotlin", level: 85, icon: "SiKotlin", category: "Languages" },
  { name: "C", level: 80, icon: "SiC", category: "Languages" },
  { name: "C++", level: 75, icon: "SiCplusplus", category: "Languages" },
  { name: "C#", level: 72, icon: "SiSharp", category: "Languages" },
  { name: "Dart", level: 68, icon: "SiDart", category: "Languages" },
];

// ── Projects ──────────────────────────────────────────────────
export const PROJECTS: Project[] = [
  {
    id: "smart-campus",
    title: "Smart Campus IoT Platform",
    description:
      "An integrated IoT platform for university campus management with real-time sensor monitoring, automated climate control, and energy optimization dashboards.",
    image: "/projects/smart-campus.jpg",
    techStack: ["React", "Node.js", "MQTT", "MongoDB", "Arduino", "ESP32"],
    category: "IoT",
    liveUrl: "https://smart-campus-demo.vercel.app",
    githubUrl: "https://github.com/deneth/smart-campus",
    featured: true,
  },
  {
    id: "ecommerce-platform",
    title: "Full-Stack E-Commerce Platform",
    description:
      "A modern e-commerce platform with real-time inventory, payment processing, admin dashboard, and customer analytics built with the MERN stack.",
    image: "/projects/ecommerce.jpg",
    techStack: ["Next.js", "TypeScript", "Stripe", "MongoDB", "Tailwind CSS"],
    category: "Web",
    liveUrl: "https://ecommerce-demo.vercel.app",
    githubUrl: "https://github.com/deneth/ecommerce",
    featured: true,
  },
  {
    id: "ai-image-classifier",
    title: "AI Image Classification System",
    description:
      "Deep learning-based image classification system using CNN architecture with a web interface for real-time predictions and model visualization.",
    image: "/projects/ai-classifier.jpg",
    techStack: ["Python", "TensorFlow", "Flask", "React", "Docker"],
    category: "AI/ML",
    liveUrl: "https://ai-classifier-demo.vercel.app",
    githubUrl: "https://github.com/deneth/ai-classifier",
    featured: true,
  },
  {
    id: "task-management",
    title: "Collaborative Task Management App",
    description:
      "Real-time collaborative project management tool with drag-and-drop boards, team chat, file sharing, and automated workflow pipelines.",
    image: "/projects/task-mgmt.jpg",
    techStack: ["React", "Firebase", "Node.js", "Socket.io", "Tailwind CSS"],
    category: "Web",
    liveUrl: "https://taskflow-demo.vercel.app",
    githubUrl: "https://github.com/deneth/task-management",
    featured: false,
  },
  {
    id: "health-monitor",
    title: "IoT Health Monitoring Wearable",
    description:
      "Wearable health monitoring device with real-time heart rate, SpO2, and temperature tracking with a companion mobile app and cloud dashboard.",
    image: "/projects/health-monitor.jpg",
    techStack: ["React Native", "Arduino", "ESP32", "Firebase", "Python"],
    category: "IoT",
    liveUrl: "",
    githubUrl: "https://github.com/deneth/health-monitor",
    featured: false,
  },
  {
    id: "portfolio-website",
    title: "Developer Portfolio Website",
    description:
      "This premium portfolio website built with Next.js 15, featuring particle backgrounds, glassmorphism design, and smooth animations.",
    image: "/projects/portfolio.jpg",
    techStack: ["Next.js", "TypeScript", "Tailwind CSS", "Framer Motion"],
    category: "Web",
    liveUrl: "https://deneth.dev",
    githubUrl: "https://github.com/deneth/portfolio",
    featured: false,
  },
  {
    id: "mobile-fitness",
    title: "Fitness Tracking Mobile App",
    description:
      "Cross-platform fitness tracking application with workout plans, nutrition logging, progress analytics, and social challenges.",
    image: "/projects/fitness-app.jpg",
    techStack: ["Flutter", "Dart", "Firebase", "Google Fit API"],
    category: "Mobile",
    liveUrl: "",
    githubUrl: "https://github.com/deneth/fitness-app",
    featured: false,
  },
  {
    id: "chatbot-assistant",
    title: "AI-Powered Customer Chatbot",
    description:
      "Intelligent chatbot with NLP capabilities for customer support automation, sentiment analysis, and seamless CRM integration.",
    image: "/projects/chatbot.jpg",
    techStack: ["Python", "PyTorch", "FastAPI", "React", "PostgreSQL"],
    category: "AI/ML",
    liveUrl: "https://chatbot-demo.vercel.app",
    githubUrl: "https://github.com/deneth/chatbot",
    featured: false,
  },
];

// ── Services ──────────────────────────────────────────────────
export const SERVICES: Service[] = [
  {
    title: "Web Development",
    description:
      "End-to-end web application development with modern frameworks, responsive design, and optimized performance.",
    icon: "HiGlobeAlt",
    features: [
      "Custom web applications",
      "Progressive Web Apps (PWA)",
      "E-commerce solutions",
      "Content management systems",
    ],
  },
  {
    title: "Frontend Development",
    description:
      "Pixel-perfect, interactive user interfaces with modern JavaScript frameworks and cutting-edge CSS techniques.",
    icon: "HiCode",
    features: [
      "React & Next.js applications",
      "Responsive UI/UX implementation",
      "Animation & interaction design",
      "Performance optimization",
    ],
  },
  {
    title: "Full Stack Development",
    description:
      "Complete application development from database architecture to polished frontend, delivered as a unified solution.",
    icon: "HiServerStack",
    features: [
      "MERN/MEAN stack development",
      "Database design & optimization",
      "Authentication & authorization",
      "Cloud deployment & DevOps",
    ],
  },
  {
    title: "API Development",
    description:
      "Robust, scalable RESTful and GraphQL APIs with comprehensive documentation and security best practices.",
    icon: "HiCpuChip",
    features: [
      "RESTful API design",
      "GraphQL implementations",
      "Third-party API integrations",
      "API documentation & testing",
    ],
  },
  {
    title: "UI/UX Implementation",
    description:
      "Translating design mockups into functional, accessible, and performant web interfaces with pixel-perfect accuracy.",
    icon: "HiPaintBrush",
    features: [
      "Figma/Adobe XD to code",
      "Design system development",
      "Accessibility compliance",
      "Cross-browser compatibility",
    ],
  },
  {
    title: "Robotics & IoT Solutions",
    description:
      "Custom IoT systems and robotics solutions with sensor integration, real-time monitoring, and cloud connectivity.",
    icon: "HiWrenchScrewdriver",
    features: [
      "Embedded system programming",
      "Sensor integration & monitoring",
      "IoT dashboard development",
      "Hardware-software integration",
    ],
  },
  {
    title: "Custom Software Development",
    description:
      "Tailored software solutions designed to address unique business challenges with scalable, maintainable architecture.",
    icon: "HiCommandLine",
    features: [
      "Business process automation",
      "Desktop applications",
      "System integration",
      "Legacy system modernization",
    ],
  },
];

// ── Timeline ──────────────────────────────────────────────────
export const TIMELINE: TimelineItem[] = [
  {
    year: "2024 - Present",
    title: "University IT Instructor",
    subtitle: "University of Technology",
    description:
      "Teaching web development, data structures, and IoT systems. Mentoring students in research projects and guiding them through industry-level practices.",
    type: "experience",
  },
  {
    year: "2023 - Present",
    title: "Freelance Full-Stack Developer",
    subtitle: "Self-Employed",
    description:
      "Delivering custom web applications, e-commerce platforms, and IoT solutions for clients worldwide through Fiverr and direct contracts.",
    type: "experience",
  },
  {
    year: "2023",
    title: "AWS Cloud Practitioner",
    subtitle: "Amazon Web Services",
    description:
      "Certified in cloud fundamentals, AWS services, security, architecture, and pricing models.",
    type: "certification",
  },
  {
    year: "2022 - 2024",
    title: "Software Engineer",
    subtitle: "Tech Solutions Ltd.",
    description:
      "Led full-stack development of enterprise applications. Built microservice architectures, CI/CD pipelines, and mentored junior developers.",
    type: "experience",
  },
  {
    year: "2022",
    title: "Meta Front-End Developer Certificate",
    subtitle: "Meta (Coursera)",
    description:
      "Advanced React, JavaScript, UX/UI design principles, and front-end testing methodologies.",
    type: "certification",
  },
  {
    year: "2020 - 2024",
    title: "BSc (Hons) in Information Technology",
    subtitle: "University of Technology",
    description:
      "Specialized in software engineering with focus on web technologies, IoT systems, and artificial intelligence. First Class Honours.",
    type: "education",
  },
  {
    year: "2018 - 2020",
    title: "Diploma in IT",
    subtitle: "National Institute of Technology",
    description:
      "Foundation studies in programming, networking, database management, and web development technologies.",
    type: "education",
  },
];

// ── Testimonials ──────────────────────────────────────────────
export const TESTIMONIALS: Testimonial[] = [
  {
    id: "t1",
    name: "Sarah Mitchell",
    role: "CEO",
    company: "DigitalVista Agency",
    content:
      "Deneth delivered an exceptional e-commerce platform that exceeded our expectations. His attention to detail, clean code, and ability to understand our business needs made the entire process seamless. The platform has increased our online sales by 40%.",
    avatar: "/testimonials/sarah.jpg",
    rating: 5,
  },
  {
    id: "t2",
    name: "James Chen",
    role: "CTO",
    company: "SmartHome Innovations",
    content:
      "Working with Deneth on our IoT dashboard was a game-changer. His expertise in both hardware and software integration is rare. He built a real-time monitoring system that handles thousands of sensor data points flawlessly.",
    avatar: "/testimonials/james.jpg",
    rating: 5,
  },
  {
    id: "t3",
    name: "Amanda Roberts",
    role: "Product Manager",
    company: "EduTech Solutions",
    content:
      "Deneth's work on our learning management system was outstanding. He implemented complex features like real-time collaboration and AI-powered assessments with remarkable efficiency. Highly recommended for any tech project.",
    avatar: "/testimonials/amanda.jpg",
    rating: 5,
  },
  {
    id: "t4",
    name: "Michael Torres",
    role: "Founder",
    company: "FitLife App",
    content:
      "The mobile fitness app Deneth built for us is beautifully designed and performs flawlessly. His understanding of UX principles and cross-platform development resulted in a product our users love. 5-star developer!",
    avatar: "/testimonials/michael.jpg",
    rating: 5,
  },
  {
    id: "t5",
    name: "Dr. Lisa Wang",
    role: "Research Director",
    company: "AI Research Lab",
    content:
      "Deneth's contribution to our AI image classification project was invaluable. His ability to implement complex ML models and create intuitive web interfaces for non-technical users is impressive. A true full-stack talent.",
    avatar: "/testimonials/lisa.jpg",
    rating: 5,
  },
];

// ── Skill Categories for filtering ───────────────────────────
export const SKILL_CATEGORIES = [
  "Frontend",
  "Backend",
  "Database",
  "Mobile",
  "Robotics & IoT",
  "AI & ML",
  "Languages",
] as const;

// ── Project Categories for filtering ─────────────────────────
export const PROJECT_CATEGORIES = [
  "All",
  "Web",
  "Mobile",
  "IoT",
  "AI/ML",
] as const;

// ── EmailJS Config ────────────────────────────────────────────
export const EMAILJS_CONFIG = {
  serviceId: process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID || "",
  templateId: process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID || "",
  publicKey: process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY || "",
};

// ── Site Metadata ─────────────────────────────────────────────
export const SITE_CONFIG = {
  title: "Deneth Kavishka | Software Engineer & Full-Stack Developer",
  description:
    "Portfolio of Deneth Kavishka — Software Engineer, Full-Stack Web Developer, Robotics & IoT Developer, University IT Instructor. Building elegant digital solutions.",
  url: "https://deneth.dev",
  ogImage: "/og-image.png",
  twitterHandle: "@deneth",
};
