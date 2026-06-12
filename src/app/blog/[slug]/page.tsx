import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { getBlogPost, getAllBlogPosts } from "@/lib/blog";

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
                <div className="bg-dark-200 text-xs text-text-muted px-4 py-2 rounded-t-xl border border-b-0 border-white/5">
                  {lang}
                </div>
              )}
              <pre
                className={`bg-dark-300/50 p-4 overflow-x-auto text-sm text-text-secondary border border-white/5 ${lang ? "rounded-b-xl" : "rounded-xl"}`}
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
                __html: quoteContent
                  .replace(
                    /\*\*(.*?)\*\*/g,
                    '<strong class="text-text-primary font-semibold not-italic">$1</strong>'
                  )
                  .replace(
                    /`([^`]+)`/g,
                    '<code class="px-1.5 py-0.5 bg-dark-300 rounded text-primary-400 text-sm not-italic">$1</code>'
                  ),
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
                        className="px-4 py-3 text-left text-text-primary font-semibold border-b border-white/10 bg-dark-300/50"
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
                      className="border-b border-white/5 hover:bg-white/[0.02]"
                    >
                      {row.map((cell, ci) => (
                        <td
                          key={ci}
                          className="px-4 py-3 text-text-secondary"
                          dangerouslySetInnerHTML={{
                            __html: cell
                              .replace(
                                /\*\*(.*?)\*\*/g,
                                '<strong class="text-text-primary font-semibold">$1</strong>'
                              )
                              .replace(
                                /`([^`]+)`/g,
                                '<code class="px-1.5 py-0.5 bg-dark-300 rounded text-primary-400 text-sm">$1</code>'
                              ),
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
                      __html: item
                        .replace("- ", "")
                        .replace(
                          /\*\*(.*?)\*\*/g,
                          '<strong class="text-text-primary font-semibold">$1</strong>'
                        )
                        .replace(
                          /`([^`]+)`/g,
                          '<code class="px-1.5 py-0.5 bg-dark-300 rounded text-primary-400 text-sm">$1</code>'
                        ),
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
                    __html: item
                      .replace(/^\d+\.\s/, "")
                      .replace(
                        /\*\*(.*?)\*\*/g,
                        '<strong class="text-text-primary font-semibold">$1</strong>'
                      )
                      .replace(
                        /`([^`]+)`/g,
                        '<code class="px-1.5 py-0.5 bg-dark-300 rounded text-primary-400 text-sm">$1</code>'
                      ),
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
              __html: block
                .replace(
                  /\*\*(.*?)\*\*/g,
                  '<strong class="text-text-primary font-semibold">$1</strong>'
                )
                .replace(
                  /`([^`]+)`/g,
                  '<code class="px-1.5 py-0.5 bg-dark-300 rounded text-primary-400 text-sm">$1</code>'
                ),
            }}
          />
        );
      });
  };

  return (
    <div className="min-h-screen bg-dark-500">
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
              className="object-cover"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-t from-dark-500/60 to-transparent" />
          </div>
        )}

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

        {/* Bottom divider */}
        <div className="h-px bg-gradient-to-r from-transparent via-primary-500/30 to-transparent my-12" />

        {/* Footer nav */}
        <div className="flex justify-between items-center">
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl glass text-text-secondary hover:text-primary-400 transition-all"
          >
            ← All Posts
          </Link>
          <Link
            href="/"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-primary-500 to-primary-600 text-white font-medium hover:from-primary-400 hover:to-primary-500 transition-all hover:shadow-[0_0_30px_rgba(99,102,241,0.4)]"
          >
            Home →
          </Link>
        </div>
      </div>
    </div>
  );
}
