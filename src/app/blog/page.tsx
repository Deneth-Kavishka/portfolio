import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Blog",
  description:
    "Articles and insights on web development, IoT, robotics, and technology by Deneth Kavishka.",
};

export default function BlogPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-dark-500 px-6">
      <div className="text-center max-w-lg">
        <div className="inline-block glass rounded-full px-4 py-1.5 text-xs uppercase tracking-widest text-primary-400 font-medium mb-6">
          Coming Soon
        </div>

        <h1 className="text-4xl md:text-5xl font-bold gradient-text mb-4">
          Blog
        </h1>

        <p className="text-text-secondary mb-8 leading-relaxed">
          I&apos;m working on sharing my knowledge and experiences in software
          engineering, web development, IoT, and robotics. Stay tuned for
          insightful articles!
        </p>

        <Link
          href="/"
          className="inline-flex items-center gap-2 px-8 py-3 rounded-xl bg-gradient-to-r from-primary-500 to-primary-600 text-white font-medium hover:from-primary-400 hover:to-primary-500 transition-all hover:shadow-[0_0_30px_rgba(99,102,241,0.4)]"
        >
          ← Back to Home
        </Link>
      </div>
    </div>
  );
}
