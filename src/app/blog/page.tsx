import type { Metadata } from "next";
import Link from "next/link";
import { getAllBlogPosts } from "@/lib/blog";

export const metadata: Metadata = {
  title: "Blog",
  description:
    "Articles and insights on web development, IoT, robotics, and technology by Deneth Kavishka.",
};

export default function BlogPage() {
  const posts = getAllBlogPosts();

  return (
    <div className="min-h-screen bg-dark-500">
      {/* Header */}
      <div className="pt-24 pb-12 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-text-secondary hover:text-primary-400 transition-colors mb-8"
          >
            ← Back to Home
          </Link>

          <div className="inline-block glass rounded-full px-4 py-1.5 text-xs uppercase tracking-widest text-primary-400 font-medium mb-6">
            Blog
          </div>

          <h1 className="text-4xl md:text-5xl font-bold gradient-text mb-4">
            Articles & Insights
          </h1>

          <p className="text-text-secondary max-w-2xl mx-auto leading-relaxed">
            Sharing my knowledge and experiences in software engineering, web
            development, IoT, and robotics.
          </p>
        </div>
      </div>

      {/* Blog Posts Grid */}
      <div className="max-w-4xl mx-auto px-6 pb-24">
        <div className="grid gap-8">
          {posts.map((post) => (
            <Link key={post.slug} href={`/blog/${post.slug}`}>
              <article className="glass rounded-2xl p-6 md:p-8 transition-all duration-300 hover:border-primary-500/30 hover:shadow-[0_0_30px_rgba(99,102,241,0.1)] group">
                <div className="flex flex-wrap gap-2 mb-4">
                  {post.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-3 py-1 rounded-full text-xs bg-primary-500/10 text-primary-400 border border-primary-500/20"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                <h2 className="text-xl md:text-2xl font-bold text-text-primary group-hover:text-primary-400 transition-colors mb-3">
                  {post.title}
                </h2>

                <p className="text-text-secondary leading-relaxed mb-4">
                  {post.excerpt}
                </p>

                <div className="flex items-center justify-between text-sm text-text-muted">
                  <span>
                    {new Date(post.date).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                  </span>
                  <span>{post.readTime}</span>
                </div>
              </article>
            </Link>
          ))}
        </div>

        {posts.length === 0 && (
          <div className="text-center py-20">
            <p className="text-text-secondary text-lg">
              No posts yet. Check back soon!
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
