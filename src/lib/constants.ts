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
  location: "Kurunegala, Sri Lanka",
  bio: "Passionate Software Engineer with expertise in full-stack web development, robotics, IoT systems, and AI/ML. I build elegant, scalable digital solutions that solve real-world problems. As a university IT instructor, I bridge the gap between academic theory and industry practice, mentoring the next generation of tech innovators.",
  //  shortBio: "Building the future through code, circuits, and creativity. Transforming complex challenges into elegant digital solutions.",
  shortBio:
    "Software Engineer, Full-Stack Developer, competitive roboticist, and IT Instructor. Build scalable web applications, engineer intelligent hardware solutions, and mentor the next generation of tech innovators.",
  avatarUrl: "/profile.png",
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
  { label: "Contact", href: "contact" },
  { label: "Blog", href: "/blog" },
];

// ── Social Links ──────────────────────────────────────────────
export const SOCIAL_LINKS: SocialLink[] = [
  {
    name: "LinkedIn",
    url: "https://www.linkedin.com/in/deneth-kavishka-338288284/",
    icon: "FaLinkedinIn",
  },
  {
    name: "GitHub",
    url: "https://github.com/Deneth-Kavishka",
    icon: "FaGithub",
  },
  { name: "Twitter", url: "https://x.com/Deneth_kavish", icon: "FaTwitter" },
  {
    name: "Facebook",
    url: "https://web.facebook.com/deneth.kavishka.7",
    icon: "FaFacebookF",
  },
  {
    name: "Instagram",
    url: "https://instagram.com/deneth_kavishka_",
    icon: "FaInstagram",
  },
  // { name: "Fiverr", url: "https://fiverr.com/deneth", icon: "SiFiverr" },
  {
    name: "WhatsApp",
    url: "https://wa.me/94769146080?text=Hi%20Deneth!%20I%20saw%20your%20portfolio%20and%20would%20like%20to%20discuss%20a%20project.",
    icon: "FaWhatsapp",
  },
  {
    name: "Email",
    url: "mailto:denethkavishkaedu1@gmail.com",
    icon: "FaEnvelope",
  },
];

// ── Statistics ────────────────────────────────────────────────
export const STATS: Stat[] = [
  { label: "Projects Completed", value: 10, suffix: "+" },
  { label: "Certifications", value: 10, suffix: "+" },
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
  { name: "Bootstrap", level: 90, icon: "FaBootstrap", category: "Frontend" },
  {
    name: "Tailwind CSS",
    level: 90,
    icon: "SiTailwindcss",
    category: "Frontend",
  },
  { name: "React-Native", level: 75, icon: "FaReact", category: "Frontend" },

  // Backend
  { name: "PHP", level: 95, icon: "FaPhp", category: "Backend" },
  { name: "Node.js", level: 92, icon: "FaNodeJs", category: "Backend" },
  { name: "Laravel", level: 90, icon: "FaLaravel", category: "Backend" },
  { name: "Express.js", level: 88, icon: "SiExpress", category: "Backend" },
  { name: "Python", level: 85, icon: "FaPython", category: "Backend" },
  { name: "Java", level: 85, icon: "FaJava", category: "Backend" },
  { name: "R", level: 85, icon: "SiR", category: "Backend" },
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
  {
    name: "Motor Control",
    level: 90,
    icon: "FaCogs",
    category: "Robotics & IoT",
  },
  {
    name: "RFID Systems",
    level: 90,
    icon: "FaIdBadge",
    category: "Robotics & IoT",
  },
  {
    name: "Computer Vision",
    level: 85,
    icon: "SiOpencv",
    category: "Robotics & IoT",
  },
  {
    name: "AI Intelligence Chess",
    level: 85,
    icon: "FaChess",
    category: "Robotics & IoT",
  },
  { name: "ESP32", level: 85, icon: "SiEspressif", category: "Robotics & IoT" },
  {
    name: "ESP8266",
    level: 85,
    icon: "SiEspressif",
    category: "Robotics & IoT",
  },
  {
    name: "Face Recognition",
    level: 85,
    icon: "SiOpencv",
    category: "Robotics & IoT",
  },
  {
    name: "Robotic arm control",
    level: 80,
    icon: "FaCogs",
    category: "Robotics & IoT",
  },
  { name: "Embedded C", level: 80, icon: "SiC", category: "Robotics & IoT" },
  {
    name: "Raspberry Pi",
    level: 75,
    icon: "SiRaspberrypi",
    category: "Robotics & IoT",
  },

  // AI & ML
  { name: "Python", level: 85, icon: "FaPython", category: "AI & ML" },
  { name: "R", level: 85, icon: "SiR", category: "AI & ML" },
  { name: "OpenCV", level: 85, icon: "SiOpencv", category: "AI & ML" },
  { name: "TensorFlow", level: 75, icon: "SiTensorflow", category: "AI & ML" },
  { name: "PyTorch", level: 70, icon: "SiPytorch", category: "AI & ML" },
  {
    name: "Scikit-learn",
    level: 70,
    icon: "SiScikitlearn",
    category: "AI & ML",
  },

  // Programming Languages
  { name: "Java", level: 95, icon: "FaJava", category: "Languages" },
  { name: "PHP", level: 95, icon: "FaPhp", category: "Languages" },
  {
    name: "JavaScript",
    level: 95,
    icon: "SiJavascript",
    category: "Languages",
  },
  { name: "SQL", level: 92, icon: "FaDatabase", category: "Languages" },
  { name: "Python", level: 90, icon: "FaPython", category: "Languages" },
  {
    name: "TypeScript",
    level: 90,
    icon: "SiTypescript",
    category: "Languages",
  },
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
    id: "medivault",
    title: "MediVault - All Your Care, One Secure Place",
    description:
      "A comprehensive, modern healthcare management system for Sri Lanka, featuring electronic health records (EHR), role-based access control, QR-code prescriptions, and secure nationwide patient data management.",
    image: "/projects/medivault.png",
    techStack: [
      "React",
      "ExpressJS",
      "Node.js",
      "PostgreSQL",
      "IOT(RFID)",
      "ESP32",
    ],
    category: "Web",
    liveUrl: "",
    githubUrl: "https://github.com/Deneth-Kavishka/MediVault",
    featured: true,
  },
  {
    id: "chess-playing-robot",
    title: "Alpha Autonomous - Automated Chess-Playing Robotic Arm",
    description:
      "AI-driven robotic arm capable of playing chess against human opponents. Integrated computer vision for board state recognition and machine learning algorithms for move optimization. ",
    image: "/projects/chess-robot.png",
    techStack: ["Python", "OpenCV", "Arduino", "ESP32-cam", "pychess"],
    category: "IoT/Robotics",
    liveUrl:
      "https://www.linkedin.com/posts/deneth-kavishka-338288284_robotics-ai-chessrobot-activity-7299040595333758976-0FBb?utm_source=share&utm_medium=member_desktop&rcm=ACoAAEUYl9wByrxD3V4_V9pZkM9a-ZQEhBoaFfA",
    githubUrl: "https://github.com/Deneth-Kavishka/RoboArm-Testing",
    featured: true,
  },
  {
    id: "digital-tresurehunt-platform",
    title: "Q-Hunt - Digital Tresure Hunt Platform",
    description:
      "Q-Hunt is a premium, interactive, real-time QR Code Treasure Hunt platform built with Laravel. It allows administrators to orchestrate physical treasure hunts where teams scan hidden QR codes to unlock stages, solve mind-bending puzzles, and race against the clock to top the live leaderboard.",
    image: "/projects/Q-Hunt.png",
    techStack: [
      "Laravel 11",
      "Blade Templates",
      "TailwindCSS v4",
      "Alpine.js",
      "Vite",
      "Node.js",
      "Html5-Qrcode library",
    ],
    category: "Web",
    liveUrl: "",
    githubUrl: "https://github.com/Deneth-Kavishka/Q-Hunt",
    featured: true,
  },
  {
    id: "smart-attendance-system",
    title: "Attendify - Smart Attendance management System",
    description:
      "Engineered a computer vision application utilizing face recognition to automate attendance tracking. Improved processing efficiency and accuracy compared to traditional manual logging methods.",
    image: "/projects/attendify.png",
    techStack: [
      "React",
      "ExpressJS",
      "Node.js",
      "Python",
      "OpenCV",
      "TensorFlow",
    ],
    category: "AI/ML",
    liveUrl: "",
    githubUrl:
      "https://github.com/Deneth-Kavishka/Attendify-WebApplication/tree/dev_stage",
    featured: false,
  },
  {
    id: "quanticore-solutions-corporate-website",
    title: "Quanticore Solutions LLC - Corporate Website",
    description:
      "A premium, highly responsive corporate website for an IT Quality Assurance provider. The platform features cinematic scroll animations, custom overlapping section transitions, and a secure serverless contact system, all optimized for lightning-fast global edge delivery.",
    image: "/projects/Quanticore.png",
    techStack: [
      "Next.js (App Router)",
      "React",
      "TypeScript",
      "Tailwind CSS",
      "EmailJS",
      "Vercel",
      "Cloudflare"
    ],
    category: "Web",
    liveUrl: "https://quanticoresolutions.com",
    githubUrl: "https://github.com/Deneth-Kavishka/Quanticore-Solutions", // Make sure this matches your repo name!
    featured: false,
  },
  {
    id: "portfolio-website",
    title: "Developer Portfolio Website",
    description:
      "This premium portfolio website built with Next.js 15, featuring particle backgrounds, glassmorphism design, and smooth animations.",
    image: "/projects/portfolioNew.png",
    techStack: ["Next.js", "TypeScript", "Tailwind CSS", "Framer Motion"],
    category: "Web",
    liveUrl: "https://denethkavishka.vercel.app/",
    githubUrl: "https://github.com/Deneth-Kavishka/portfolio",
    featured: false,
  },
  {
    id: "task-scheduler",
    title: "TaskScheduler - AI Powered Task Management System",
    description:
      "TaskScheduler is an intelligent task scheduling application that leverages advanced data structures and algorithms to optimize task management.",
    image: "/projects/task.png",
    techStack: ["React", "ExpressJS", "Node.js", "PostgreSQL"],
    category: "Web",
    liveUrl: "",
    githubUrl: "https://github.com/Deneth-Kavishka/TaskScheduler",
    featured: false,
  },
  {
    id: "academix",
    title: "ACADEMIX - Tuition Management App",
    description:
      "A comprehensive tuition management mobile app for students and educators, featuring course scheduling, progress tracking, and communication tools.",
    image: "/projects/academix.png",
    techStack: [
      "Kotlin",
      "sqlite",
      "Firebase",
      "Android Studio",
      "Material Design",
    ],
    category: "Mobile",
    liveUrl: "",
    githubUrl:
      "https://github.com/Deneth-Kavishka/TutionManagementApp/tree/Final-Development",
    featured: false,
  },
  {
    id: "e-commerce-platform",
    title: "CafeYC - Full automated POS + E - Commerce system for Cafe Y C",
    description:
      "A comprehensive e-commerce platform for Cafe Y C, featuring a full automated POS system, order management, inventory management, and customer engagement tools.",
    image: "/projects/cafeyc.png",
    techStack: ["HTML", "CSS", "JavaScript", "MySQL", "PHP"],
    category: "Web",
    liveUrl: "",
    githubUrl: "https://github.com/Deneth-Kavishka/CafeYC",
    featured: false,
  },
  {
    id: "heritage-tourism-app",
    title: "HeritaGo - All in one Tourist Guide web Application",
    description:
      "HeritaGo is an all-in-one tourist guide web application that provides comprehensive information about tourist attractions, hotels, restaurants, and local experiences. It features an AI-powered chatbot assistant that offers personalized recommendations and travel tips based on user preferences.",
    image: "/projects/heritago.png",
    techStack: ["React", "ExpressJS", "Node.js", "PostgreSQL"],
    category: "AI/ML",
    liveUrl: "",
    githubUrl: "https://github.com/HeritaGo/HeritaGo_Version1",
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
      "MERN stack development",
      "Laravel applications",
      "Spring Boot/Java applications",
      "Database design & optimization",
      "Authentication & authorization",
      "Cloud deployment",
    ],
  },
  {
    title: "API Development",
    description:
      "Robust, scalable RESTful APIs with comprehensive documentation and security best practices.",
    icon: "HiCpuChip",
    features: [
      "RESTful API design",
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
      "Figma to code",
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
    year: "Undergraduate (2023 - Present)",
    title: "BSc (Hons) Computer Science with data Science",
    subtitle: "NIBM",
    description:
      "Pursuing a comprehensive computer science degree with a focus on data science, machine learning, and software engineering. Engaging in advanced coursework and research projects to deepen technical expertise.",
    type: "education",
  },
  {
    year: "2023 - 2025",
    title: "Higher National Diploma in Software Engineering",
    subtitle: "NIBM | GPA: 3.93",
    description:
      "Comprehensive software engineering curriculum covering programming, databases, web development, Robotics, IoT and software design principles.",
    type: "education",
  },
  {
    year: "2026 JAN - Present",
    title: "University IT Instructor",
    subtitle: "NIBM",
    description:
      "Guiding IT undergraduates through software engineering, modern web technologies, IOT Systems, Robotics development and system design. Mentoring students in research projects and guiding them through industry-level practices.",
    type: "experience",
  },
  {
    year: "2025",
    title: "IEEE Student Branch Chairperson",
    subtitle: "IEEE Student Branch - Kurunegala Chapter",
    description:
      "Leading the IEEE student branch, organizing technical workshops, hackathons, and industry talks to foster innovation and professional development among students.",
    type: "experience",
  },
  {
    year: "2024 - Present",
    title: "Freelance Full-Stack Developer",
    subtitle: "Self-Employed",
    description:
      "Delivering custom web applications, e-commerce platforms, and IoT solutions for clients worldwide through direct contracts.",
    type: "experience",
  },
  {
    year: "2026",
    title: "1st Runner-Up: Line Following Racing Robot Competition",
    subtitle: "ESOFT Innovate Expo",
    description:
      "Designed and built a line-following robot using Arduino and computer vision, achieving 1st runner-up position in a competitive robotics challenge.",
    type: "achievement",
  },
  {
    year: "2026",
    title: " AI/ML Engineer - Stage 1",
    subtitle: "SLIIT",
    description:
      "Completed the first stage of the AI/ML Engineer certification, gaining foundational knowledge in machine learning algorithms, data preprocessing, and model evaluation techniques.",
    type: "certification",
  },
  {
    year: "2025",
    title: "Postman API Fundamentals Student Expert",
    subtitle: "Postman",
    description:
      "Earned the Postman API Fundamentals Student Expert certification by demonstrating proficiency in API design, testing, and documentation using the Postman platform.",
    type: "certification",
  },
  {
    year: "2025",
    title: "Get started with GitHub and GitHub Copilot.",
    subtitle: "Microsoft Learn",
    description:
      "Completed the 'Get started with GitHub and GitHub Copilot' learning path, acquiring skills in version control, collaborative coding, and leveraging AI-powered code suggestions for enhanced development productivity.",
    type: "certification",
  },
  {
    year: "2025",
    title:
      "Microsoft Certified: Discover Microsoft AI for leaders in sustainability.",
    subtitle: "Microsoft Learn",
    description:
      "Achieved the 'Microsoft Certified: Discover Microsoft AI for leaders in sustainability' certification, demonstrating knowledge of AI applications in sustainability initiatives and understanding how to leverage Microsoft AI technologies for environmental impact.",
    type: "certification",
  },
];

/*// ── Testimonials ──────────────────────────────────────────────
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
]; */

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
  url: "https://deneth-kavishka",
  ogImage: "/og-image.png",
  twitterHandle: "@deneth",
};
