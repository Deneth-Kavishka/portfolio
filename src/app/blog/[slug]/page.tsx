import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { getBlogPost, getAllBlogPosts } from "@/lib/blog";
import CommentSection from "@/components/blog/CommentSection";
import FollowButton from "@/components/blog/FollowButton";
import FloatingCommentButton from "@/components/blog/FloatingCommentButton";

interface BlogPostPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const posts = getAllBlogPosts();
  return posts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({
  params,
}: BlogPostPageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = getBlogPost(slug);
  if (!post) return { title: "Post Not Found" };

  return {
    title: post.title,
    description: post.excerpt,
    openGraph: {
      title: post.title,
      description: post.excerpt,
      type: "article",
      publishedTime: post.date,
    },
  };
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { slug } = await params;
  const post = getBlogPost(slug);
  if (!post) notFound();

  // Enhanced markdown-like rendering
  const renderContent = (content: string) => {
    const formatInline = (text: string, isQuote = false) => {
      return text
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(
          /\*\*(.*?)\*\*/g,
          `<strong class="text-text-primary font-semibold ${isQuote ? "not-italic" : ""} ">$1</strong>`
        )
        .replace(
          /`([^`]+)`/g,
          `<code class="px-1.5 py-0.5 bg-dark-300 rounded text-primary-400 text-sm ${isQuote ? "not-italic" : ""} ">$1</code>`
        );
    };

    return content
      .split("\n\n")
      .map((block) => block.trim())
      .filter(Boolean)
      .map((block, i) => {
        // Headings
        if (block.startsWith("## ")) {
          return (
            <h2
              key={i}
              className="text-2xl font-bold text-text-primary mt-10 mb-4"
            >
              {block.replace("## ", "")}
            </h2>
          );
        }
        if (block.startsWith("### ")) {
          return (
            <h3
              key={i}
              className="text-xl font-semibold text-text-primary mt-8 mb-3"
            >
              {block.replace("### ", "")}
            </h3>
          );
        }
        if (block.startsWith("#### ")) {
          return (
            <h4
              key={i}
              className="text-lg font-semibold text-text-primary mt-6 mb-2"
            >
              {block.replace("#### ", "")}
            </h4>
          );
        }

        // Horizontal rules
        if (block === "---" || block === "***" || block === "___") {
          return (
            <div
              key={i}
              className="h-px bg-gradient-to-r from-transparent via-primary-500/30 to-transparent my-8"
            />
          );
        }

        // Code blocks
        if (block.startsWith("```")) {
          const lines = block.split("\n");
          const lang = lines[0].replace("```", "").trim();
          const code = lines.slice(1, -1).join("\n");
          return (
            <div key={i} className="my-6">
              {lang && (
                <div className="bg-dark-200 text-xs text-text-muted px-4 py-2 rounded-t-xl border border-b-0 border-[var(--glass-border)]">
                  {lang}
                </div>
              )}
              <pre
                className={`bg-dark-300/50 p-4 overflow-x-auto text-sm text-text-secondary border border-[var(--glass-border)] ${lang ? "rounded-b-xl" : "rounded-xl"}`}
              >
                <code>{code}</code>
              </pre>
            </div>
          );
        }

        // Blockquotes
        if (block.startsWith("> ")) {
          const quoteContent = block
            .split("\n")
            .map((l) => l.replace(/^>\s?/, ""))
            .join("\n");
          return (
            <blockquote
              key={i}
              className="my-6 pl-4 border-l-2 border-primary-500/50 text-text-secondary italic"
              dangerouslySetInnerHTML={{
                __html: formatInline(quoteContent, true),
              }}
            />
          );
        }

        // Tables
        if (block.includes("|") && block.includes("---")) {
          const rows = block
            .split("\n")
            .filter((r) => r.trim())
            .map((r) =>
              r
                .split("|")
                .filter((c) => c.trim())
                .map((c) => c.trim())
            );
          const headerRow = rows[0];
          const dataRows = rows.slice(2); // skip header and separator
          return (
            <div key={i} className="my-6 overflow-x-auto">
              <table className="w-full border-collapse text-sm">
                <thead>
                  <tr>
                    {headerRow.map((cell, j) => (
                      <th
                        key={j}
                        className="px-4 py-3 text-left text-text-primary font-semibold border-b border-[var(--glass-border)] bg-dark-300/50"
                      >
                        {cell}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {dataRows.map((row, ri) => (
                    <tr
                      key={ri}
                      className="border-b border-[var(--glass-border)] hover:bg-surface-light"
                    >
                      {row.map((cell, ci) => (
                        <td
                          key={ci}
                          className="px-4 py-3 text-text-secondary"
                          dangerouslySetInnerHTML={{
                            __html: formatInline(cell),
                          }}
                        />
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          );
        }

        // Bullet lists
        if (block.startsWith("- ")) {
          const items = block.split("\n").filter((l) => l.startsWith("- "));
          return (
            <ul key={i} className="my-4 space-y-2">
              {items.map((item, j) => (
                <li
                  key={j}
                  className="text-text-secondary leading-relaxed flex items-start gap-2"
                >
                  <span className="text-primary-400 mt-1.5 text-xs">●</span>
                  <span
                    dangerouslySetInnerHTML={{
                      __html: formatInline(item.replace("- ", "")),
                    }}
                  />
                </li>
              ))}
            </ul>
          );
        }

        // Numbered lists
        if (/^\d+\. /.test(block)) {
          const items = block.split("\n").filter((l) => /^\d+\. /.test(l));
          return (
            <ol key={i} className="my-4 space-y-2 list-decimal list-inside">
              {items.map((item, j) => (
                <li
                  key={j}
                  className="text-text-secondary leading-relaxed"
                  dangerouslySetInnerHTML={{
                    __html: formatInline(item.replace(/^\d+\.\s/, "")),
                  }}
                />
              ))}
            </ol>
          );
        }

        // Paragraphs with inline formatting
        return (
          <p
            key={i}
            className="text-text-secondary leading-relaxed my-4"
            dangerouslySetInnerHTML={{
              __html: formatInline(block),
            }}
          />
        );
      });
  };

  return (
    <div className="min-h-screen">
      <div className="max-w-3xl mx-auto px-6 pt-28 pb-24">
        {/* Back to blog */}
        <Link
          href="/blog"
          className="inline-flex items-center gap-2 text-text-secondary hover:text-primary-400 transition-colors mb-10"
        >
          ← All Posts
        </Link>

        {/* Cover Image */}
        {post.coverImage && (
          <div className="relative w-full h-48 md:h-64 lg:h-72 rounded-2xl overflow-hidden mb-10">
            <Image
              src={post.coverImage}
              alt={post.title}
              fill
              sizes="(max-width: 1024px) 100vw, 1024px"
              className="object-cover"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-t from-dark-500/60 to-transparent" />
          </div>
        )}

        {/* Author Card */}
        <div className="flex flex-col items-center text-center gap-4 mb-10">
          <a
            href="https://www.linkedin.com/in/deneth-kavishka"
            target="_blank"
            rel="noopener noreferrer"
            className="shrink-0 block"
          >
            <div className="w-16 h-16 rounded-full bg-gradient-to-br from-primary-500 to-accent-500 flex items-center justify-center text-white font-bold text-lg overflow-hidden ring-2 ring-primary-500/30">
              <Image
                src="/icon.png"
                alt="Deneth Kavishka"
                width={64}
                height={64}
                className="object-cover"
              />
            </div>
          </a>
          <div>
            <a
              href="https://www.linkedin.com/in/deneth-kavishka"
              target="_blank"
              rel="noopener noreferrer"
              className="text-lg font-bold text-text-primary hover:text-primary-400 transition-colors block mb-1"
            >
              Deneth Kavishka
            </a>
            <p className="text-sm text-text-muted max-w-md mx-auto leading-relaxed mb-4">
              Software Engineer | Tech Enthusiast | Full-Stack Developer | IoT & Robotics | AI & ML
            </p>
            <div className="flex justify-center">
              <FollowButton />
            </div>
          </div>
        </div>

        {/* Post header */}
        <div className="mb-10">
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

          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold gradient-text mb-4 leading-tight">
            {post.title}
          </h1>

          <div className="flex items-center gap-4 text-sm text-text-muted">
            <span>
              {new Date(post.date).toLocaleDateString("en-US", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </span>
            <span>•</span>
            <span>{post.readTime}</span>
          </div>
        </div>

        {/* Divider */}
        <div className="h-px bg-gradient-to-r from-transparent via-primary-500/30 to-transparent mb-10" />

        {/* Content */}
        <article>{renderContent(post.content)}</article>

        {/* Bottom Author & Follow Section */}
        <div className="mt-16 pt-10 border-t border-[var(--glass-border)] flex flex-col items-center text-center pb-12">
          <span className="px-3 py-1 rounded-full text-[10px] font-bold bg-gradient-to-r from-primary-500/20 to-accent-500/20 text-primary-400 border border-primary-500/20 uppercase tracking-widest mb-2">
            Author
          </span>
          <div className="w-16 h-16 rounded-full bg-gradient-to-br from-primary-500 to-accent-500 flex items-center justify-center text-white font-bold overflow-hidden ring-2 ring-primary-500/30 mb-4">
            <Image
              src="/icon.png"
              alt="Deneth Kavishka"
              width={64}
              height={64}
              className="object-cover"
            />
          </div>
          <h3 className="text-xl font-bold text-text-primary mb-1">Deneth Kavishka</h3>
          <p className="text-sm text-text-muted mb-6 max-w-md mx-auto leading-relaxed">
            Software Engineer & Tech Enthusiast. Exploring the intersections of Full-Stack Web Development, AI & ML, IOT and Robotics.
          </p>
          <FollowButton />
        </div>

        {/* Comments Section */}
        <div id="comments-section" className="mt-8 border-t border-[var(--glass-border)] pt-12">
          <CommentSection postSlug={slug} />
        </div>

        {/* Floating Comment Button */}
        <FloatingCommentButton />

        {/* Footer nav */}
        <div className="flex justify-between items-center mt-20">
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl glass text-text-secondary hover:text-primary-400 transition-all"
          >
            All Posts
          </Link>
          <Link
            href="/"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-[#0088cc] text-white font-medium hover:bg-[#0077b6] transition-all hover:shadow-[0_0_20px_rgba(0,136,204,0.4)]"
          >
            Home
          </Link>
        </div>
      </div>
    </div>
  );
}
