import type { Metadata } from "next";
import { Inter, Outfit, JetBrains_Mono } from "next/font/google";
import localFont from "next/font/local";
import { Analytics } from "@vercel/analytics/next";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains",
  subsets: ["latin"],
  display: "swap",
});

const dealorasFont = localFont({
  src: "../../public/fonts/Dealoras.ttf",
  variable: "--font-dealoras",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://deneth.dev"),
  title: {
    default: "Deneth Kavishka | Software Engineer & Full-Stack Developer",
    template: "%s | Deneth Kavishka",
  },
  description:
    "Portfolio of Deneth Kavishka — Software Engineer, Full-Stack Web Developer, Robotics & IoT Developer, University IT Instructor. Building elegant digital solutions with modern technologies.",
  keywords: [
    "software engineer",
    "full-stack developer",
    "web developer",
    "IoT developer",
    "robotics",
    "React",
    "Next.js",
    "TypeScript",
    "portfolio",
    "Deneth Kavishka",
  ],
  authors: [{ name: "Deneth Kavishka" }],
  creator: "Deneth Kavishka",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://deneth.dev",
    siteName: "Deneth Kavishka Portfolio",
    title: "Deneth Kavishka | Software Engineer & Full-Stack Developer",
    description:
      "Portfolio of Deneth Kavishka — Software Engineer, Full-Stack Web Developer, Robotics & IoT Developer, University IT Instructor.",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Deneth Kavishka — Portfolio",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Deneth Kavishka | Software Engineer & Full-Stack Developer",
    description:
      "Portfolio of Deneth Kavishka — Software Engineer, Full-Stack Web Developer, Robotics & IoT Developer.",
    images: ["/og-image.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      data-theme="dark"
      className={`${inter.variable} ${outfit.variable} ${jetbrainsMono.variable} ${dealorasFont.variable} dark`}
    >
      <head>
        {/* JSON-LD Structured Data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Person",
              name: "Deneth Kavishka",
              url: "https://deneth.dev",
              jobTitle: "Software Engineer",
              worksFor: {
                "@type": "Organization",
                name: "Freelance",
              },
              sameAs: [
                "https://github.com/deneth",
                "https://linkedin.com/in/deneth",
              ],
              knowsAbout: [
                "Software Engineering",
                "Web Development",
                "IoT",
                "Robotics",
                "Machine Learning",
              ],
            }),
          }}
        />
      </head>
      <body className="min-h-screen bg-dark-500 text-text-primary antialiased overflow-x-hidden">
        {children}
        <Analytics />
      </body>
    </html>
  );
}
