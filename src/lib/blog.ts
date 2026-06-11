export interface BlogPost {
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  date: string;
  readTime: string;
  tags: string[];
  coverImage?: string;
}

// Add your blog posts here. Each post has markdown-style content.
export const BLOG_POSTS: BlogPost[] = [
  {
    slug: "getting-started-with-nextjs-15",
    title: "Getting Started with Next.js 15 — What's New?",
    excerpt:
      "Explore the latest features in Next.js 15 including the improved App Router, React Server Components, and performance enhancements.",
    content: `
Next.js 15 brings several exciting improvements to the framework. Let's explore what's new and how you can leverage these features in your projects.

## Key Features

### Improved App Router
The App Router is now more stable and performant, with better support for layouts, loading states, and error boundaries.

### React Server Components
Server Components are now the default, allowing you to build faster applications with less client-side JavaScript.

### Turbopack (Stable)
Turbopack is now the default bundler in development, offering significantly faster build times compared to Webpack.

## Getting Started

To create a new Next.js 15 project:

\`\`\`bash
npx create-next-app@latest my-app
\`\`\`

This will scaffold a project with TypeScript, Tailwind CSS, and the App Router by default.

## Conclusion

Next.js 15 is a solid release that focuses on developer experience and performance. If you're starting a new project, I highly recommend using it!
    `.trim(),
    date: "2025-01-15",
    readTime: "5 min read",
    tags: ["Next.js", "React", "Web Development"],
  },
  {
    slug: "building-iot-projects-with-esp32",
    title: "Building IoT Projects with ESP32 and Arduino",
    excerpt:
      "A practical guide to getting started with ESP32 microcontrollers for IoT projects — from setup to cloud connectivity.",
    content: `
The ESP32 is one of the most versatile microcontrollers for IoT projects. With built-in Wi-Fi and Bluetooth, it's perfect for connected devices.

## Why ESP32?

- **Dual-core processor** — Handle multiple tasks simultaneously
- **Built-in Wi-Fi & Bluetooth** — No extra modules needed
- **Low power consumption** — Ideal for battery-powered devices
- **Rich GPIO pins** — Connect sensors, actuators, and displays

## Setting Up the Arduino IDE

1. Install Arduino IDE from arduino.cc
2. Add ESP32 board support via Board Manager
3. Select your ESP32 board and COM port
4. Upload your first sketch!

## Example: Temperature Monitoring

Here's a simple example using a DHT22 sensor to monitor temperature and humidity, then sending data to a cloud dashboard.

\`\`\`cpp
#include <WiFi.h>
#include <DHT.h>

#define DHTPIN 4
#define DHTTYPE DHT22

DHT dht(DHTPIN, DHTTYPE);

void setup() {
  Serial.begin(115200);
  dht.begin();
  WiFi.begin("your-ssid", "your-password");
}

void loop() {
  float temp = dht.readTemperature();
  float humidity = dht.readHumidity();
  Serial.printf("Temp: %.1f°C, Humidity: %.1f%%\\n", temp, humidity);
  delay(2000);
}
\`\`\`

## Conclusion

ESP32 makes IoT development accessible and affordable. Combined with platforms like Firebase or AWS IoT, you can build production-ready connected devices.
    `.trim(),
    date: "2025-02-20",
    readTime: "7 min read",
    tags: ["IoT", "ESP32", "Arduino", "Embedded"],
  },
  {
    slug: "fullstack-developer-roadmap-2025",
    title: "Full-Stack Developer Roadmap for 2025",
    excerpt:
      "A comprehensive roadmap covering the technologies, tools, and skills you need to become a full-stack developer in 2025.",
    content: `
Becoming a full-stack developer in 2025 requires mastering both frontend and backend technologies. Here's my recommended roadmap based on industry trends.

## Frontend

### Must Learn
- **HTML5 & CSS3** — The foundation
- **JavaScript (ES6+)** — The language of the web
- **TypeScript** — Type safety for large projects
- **React or Next.js** — The most in-demand framework

### Good to Know
- Tailwind CSS for rapid styling
- Framer Motion for animations
- State management (Zustand, Redux Toolkit)

## Backend

### Must Learn
- **Node.js & Express** — JavaScript on the server
- **REST API design** — Industry standard
- **Database (PostgreSQL or MongoDB)** — Data persistence
- **Authentication (JWT, OAuth)** — Security

### Good to Know
- GraphQL for flexible APIs
- Docker for containerization
- Cloud services (AWS, Vercel, Firebase)

## DevOps & Tools

- Git & GitHub
- CI/CD pipelines
- Linux basics
- Testing (Jest, Cypress)

## Conclusion

Focus on building real projects as you learn. A portfolio of quality projects speaks louder than certificates. Start with one stack, master it, then expand.
    `.trim(),
    date: "2025-03-10",
    readTime: "6 min read",
    tags: ["Career", "Web Development", "Guide"],
  },
];

export function getBlogPost(slug: string): BlogPost | undefined {
  return BLOG_POSTS.find((post) => post.slug === slug);
}

export function getAllBlogPosts(): BlogPost[] {
  return BLOG_POSTS.sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );
}
