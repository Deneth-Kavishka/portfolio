import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { getAllBlogPosts } from "@/lib/blog";
import FollowButton from "@/components/blog/FollowButton";

export const metadata: Metadata = {
  title: "Blog",
  description:
    "Articles and insights on web development, IoT, robotics, and technology by Deneth Kavishka.",
};

export default function BlogPage() {
  const posts = getAllBlogPosts();

  return (
    <div className="min-h-screen">
      {/* Header */}
      <div className="pt-28 pb-12 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-block glass rounded-full px-4 py-1.5 text-xs uppercase tracking-widest text-primary-400 font-medium mb-6">
            Blog
          </div>

          <h1 className="text-4xl md:text-5xl font-bold gradient-text mb-4">
            Articles & Insights
          </h1>

          <p className="text-text-secondary max-w-2xl mx-auto leading-relaxed mb-8">
            Sharing my knowledge and experiences in Data Science, Computer Science, Software Engineering, Full-Stack Development, IoT & Robotics and AI & ML.
          </p>

          <div className="flex flex-col items-center justify-center text-center mt-8 pt-8 border-t border-[var(--glass-border)]">
            <a
              href="https://www.linkedin.com/in/deneth-kavishka"
              target="_blank"
              rel="noopener noreferrer"
              className="shrink-0 mb-3"
            >
              <div className="w-14 h-14 rounded-full bg-gradient-to-br from-primary-500 to-accent-500 flex items-center justify-center text-white font-bold text-sm overflow-hidden ring-2 ring-primary-500/30">
                <Image
                  src="/icon.png"
                  alt="Deneth Kavishka"
                  width={56}
                  height={56}
                  className="object-cover"
                />
              </div>
            </a>
            <div>
              <a
                href="https://www.linkedin.com/in/deneth-kavishka"
                target="_blank"
                rel="noopener noreferrer"
                className="text-base font-bold text-text-primary hover:text-primary-400 transition-colors block mb-1"
              >
                Deneth Kavishka
              </a>
              <p className="text-sm text-text-muted mb-4">
                Blog Author | Tech Enthusiast 
              </p>
              <div className="flex justify-center">
                <FollowButton />
              </div>
            </div>
          </div>
        </div>
      </div>



      {/* Blog Posts Grid */}
      <div className="max-w-4xl mx-auto px-6 pb-24">
        <div className="grid gap-8">
          {posts.map((post) => (
            <Link key={post.slug} href={`/blog/${post.slug}`}>
              <article className="glass rounded-2xl overflow-hidden transition-all duration-300 hover:border-primary-500/30 hover:shadow-[0_0_30px_rgba(0,136,204,0.15)] group">
                {/* Cover Image */}
                {post.coverImage && (
                  <div className="relative h-48 md:h-56 overflow-hidden">
                    <Image
                      src={post.coverImage}
                      alt={post.title}
                      fill
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-dark-500/80 via-dark-500/20 to-transparent" />
                  </div>
                )}

                <div className="p-6 md:p-8">
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
