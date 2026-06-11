import type { Metadata } from "next";
import Link from "next/link";
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

  // Simple markdown-like rendering
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
