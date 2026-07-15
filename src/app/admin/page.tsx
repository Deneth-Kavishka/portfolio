"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  FaLock,
  FaUsers,
  FaComments,
  FaPaperPlane,
  FaTrash,
  FaSignOutAlt,
  FaArrowLeft,
  FaCheckCircle,
  FaExclamationCircle,
  FaReply,
  FaEye,
  FaEyeSlash,
  FaShieldAlt,
} from "react-icons/fa";
import Link from "next/link";
import type { Follower, Comment, ReactionType } from "@/lib/types";
import { getAllBlogPosts } from "@/lib/blog";

const REACTIONS: ReactionType[] = ["👍", "❤️", "🔥", "💡", "👏"];

// ── Login Screen ──────────────────────────────────────────────
function LoginScreen({ onLogin }: { onLogin: (token: string) => void }) {
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const res = await fetch("/api/admin", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
      });
      const data = await res.json();

      if (res.ok) {
        onLogin(data.token);
      } else {
        setError(data.error || "Invalid password");
      }
    } catch {
      setError("Network error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-6">
      <motion.div
        className="glass rounded-2xl p-8 md:p-10 w-full max-w-md"
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
      >
        <div className="text-center mb-8">
          <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-primary-500/20 to-accent-500/20 flex items-center justify-center text-primary-400 mx-auto mb-4">
            <FaLock className="text-2xl" />
          </div>
          <h1 className="text-2xl font-bold text-text-primary">Blog Admin</h1>
          <p className="text-sm text-text-secondary mt-1">
            Enter your admin password to continue
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Admin password"
            required
            className="w-full bg-surface-medium dark:bg-dark-100/50 border border-[var(--glass-border)] rounded-xl px-4 py-3 text-text-primary placeholder:text-text-muted focus:border-primary-500/50 focus:outline-none"
          />
          {error && (
            <p className="text-red-400 text-sm text-center">{error}</p>
          )}
          <motion.button
            type="submit"
            disabled={loading}
            className="w-full py-3 rounded-xl bg-gradient-to-r from-primary-500 to-primary-600 text-white font-medium hover:shadow-[0_0_20px_rgba(0,136,204,0.4)] transition-all disabled:opacity-50 cursor-pointer"
            whileHover={{ scale: 1.01 }}
            whileTap={{ scale: 0.99 }}
          >
            {loading ? "Authenticating..." : "Login"}
          </motion.button>
        </form>

        <Link
          href="/blog"
          className="flex items-center justify-center gap-2 mt-6 text-sm text-text-muted hover:text-primary-400 transition-colors"
        >
          <FaArrowLeft className="text-xs" />
          Back to Blog
        </Link>
      </motion.div>
    </div>
  );
}

// ── Admin Dashboard ───────────────────────────────────────────
function Dashboard({ token }: { token: string }) {
  const [followers, setFollowers] = useState<Follower[]>([]);
  const [recentComments, setRecentComments] = useState<Comment[]>([]);
  const [followerCount, setFollowerCount] = useState(0);
  const [commentCount, setCommentCount] = useState(0);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<
    "overview" | "followers" | "comments" | "notify"
  >("overview");

  // Notify state
  const [selectedPost, setSelectedPost] = useState("");
  const [notifyStatus, setNotifyStatus] = useState<
    "idle" | "sending" | "sent" | "error"
  >("idle");
  const [notifyMessage, setNotifyMessage] = useState("");

  // Admin reply state
  const [replyingTo, setReplyingTo] = useState<string | null>(null);
  const [replyContent, setReplyContent] = useState("");
  const [replySubmitting, setReplySubmitting] = useState(false);

  const posts = getAllBlogPosts();

  const fetchData = useCallback(async () => {
    try {
      const res = await fetch("/api/admin", {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();
      setFollowers(data.followers || []);
      setFollowerCount(data.followerCount || 0);
      setCommentCount(data.commentCount || 0);
      setRecentComments(data.recentComments || []);
    } catch {
      console.error("Failed to fetch admin data");
    } finally {
      setLoading(false);
    }
  }, [token]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const handleDeleteFollower = async (email: string) => {
    if (!confirm(`Remove ${email} from followers?`)) return;
    await fetch("/api/followers", {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ email }),
    });
    await fetchData();
  };

  const handleDeleteComment = async (commentId: string) => {
    if (!confirm("Delete this comment permanently?")) return;
    await fetch("/api/comments", {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ commentId }),
    });
    await fetchData();
  };

  const handleToggleHide = async (commentId: string, currentHidden: boolean) => {
    await fetch("/api/comments", {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ commentId, hidden: !currentHidden }),
    });
    await fetchData();
  };

  const handleAdminReply = async (comment: Comment) => {
    if (!replyContent.trim()) return;
    setReplySubmitting(true);

    await fetch("/api/comments", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        postSlug: comment.postSlug,
        author: "Deneth Kavishka",
        email: "admin",
        content: replyContent.trim(),
        parentId: comment._id,
        isAdmin: true,
      }),
    });

    setReplyContent("");
    setReplyingTo(null);
    setReplySubmitting(false);
    await fetchData();
  };

  const handleAdminReact = async (commentId: string, reaction: ReactionType) => {
    await fetch("/api/comments/react", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ commentId, reaction }),
    });
    await fetchData();
  };

  const handleSendNotification = async () => {
    if (!selectedPost) return;
    const post = posts.find((p) => p.slug === selectedPost);
    if (!post) return;

    setNotifyStatus("sending");
    try {
      const res = await fetch("/api/notify", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          postTitle: post.title,
          postSlug: post.slug,
          postExcerpt: post.excerpt,
          postCoverImage: post.coverImage,
        }),
      });
      const data = await res.json();

      if (res.ok) {
        setNotifyStatus("sent");
        setNotifyMessage(
          `Email sent to ${data.sentCount} follower${data.sentCount !== 1 ? "s" : ""}!`
        );
      } else {
        setNotifyStatus("error");
        setNotifyMessage(data.error || "Failed to send");
      }
    } catch {
      setNotifyStatus("error");
      setNotifyMessage("Network error");
    }
    setTimeout(() => {
      setNotifyStatus("idle");
      setNotifyMessage("");
    }, 5000);
  };

  const handleLogout = () => {
    sessionStorage.removeItem("admin_token");
    window.location.reload();
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-primary-500/30 border-t-primary-500 rounded-full animate-spin" />
      </div>
    );
  }

  const tabs = [
    { id: "overview" as const, label: "Overview", icon: <FaUsers /> },
    { id: "followers" as const, label: "Followers", icon: <FaUsers /> },
    { id: "comments" as const, label: "Comments", icon: <FaComments /> },
    { id: "notify" as const, label: "Notify", icon: <FaPaperPlane /> },
  ];

  return (
    <div className="min-h-screen pt-8 pb-24 px-6">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-2xl font-bold gradient-text">Blog Admin</h1>
            <p className="text-sm text-text-muted">
              Manage followers, comments & notifications
            </p>
          </div>
          <div className="flex items-center gap-3">
            <Link
              href="/blog"
              className="flex items-center gap-2 px-4 py-2 rounded-xl glass text-sm text-text-secondary hover:text-primary-400 transition-colors"
            >
              <FaArrowLeft className="text-xs" />
              Blog
            </Link>
            <button
              onClick={handleLogout}
              className="flex items-center gap-2 px-4 py-2 rounded-xl glass text-sm text-red-400 hover:bg-red-500/10 transition-colors cursor-pointer"
            >
              <FaSignOutAlt className="text-xs" />
              Logout
            </button>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex gap-2 mb-8 overflow-x-auto pb-2">
          {tabs.map((tab) => (
            <motion.button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-medium whitespace-nowrap transition-all cursor-pointer ${
                activeTab === tab.id
                  ? "bg-gradient-to-r from-primary-500 to-primary-600 text-white shadow-[0_0_20px_rgba(0,136,204,0.3)]"
                  : "glass text-text-secondary hover:text-text-primary"
              }`}
              whileTap={{ scale: 0.97 }}
            >
              {tab.icon}
              {tab.label}
            </motion.button>
          ))}
        </div>

        {/* Overview Tab */}
        {activeTab === "overview" && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="grid md:grid-cols-3 gap-6"
          >
            <div className="glass rounded-2xl p-6 text-center">
              <FaUsers className="text-3xl text-primary-400 mx-auto mb-3" />
              <p className="text-3xl font-bold text-text-primary">
                {followerCount}
              </p>
              <p className="text-sm text-text-muted">Followers</p>
            </div>
            <div className="glass rounded-2xl p-6 text-center">
              <FaComments className="text-3xl text-accent-400 mx-auto mb-3" />
              <p className="text-3xl font-bold text-text-primary">
                {commentCount}
              </p>
              <p className="text-sm text-text-muted">Comments</p>
            </div>
            <div className="glass rounded-2xl p-6 text-center">
              <FaPaperPlane className="text-3xl text-green-400 mx-auto mb-3" />
              <p className="text-3xl font-bold text-text-primary">
                {posts.length}
              </p>
              <p className="text-sm text-text-muted">Blog Posts</p>
            </div>
          </motion.div>
        )}

        {/* Followers Tab */}
        {activeTab === "followers" && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            <div className="glass rounded-2xl overflow-hidden">
              <div className="p-4 border-b border-[var(--glass-border)]">
                <p className="text-sm font-semibold text-text-primary">
                  {followerCount} subscriber
                  {followerCount !== 1 ? "s" : ""}
                </p>
              </div>
              {followers.length === 0 ? (
                <p className="p-8 text-center text-text-muted text-sm">
                  No followers yet
                </p>
              ) : (
                <div className="divide-y divide-[var(--glass-border)]">
                  {followers.map((f) => (
                    <div
                      key={f.email}
                      className="flex items-center justify-between p-4 hover:bg-surface-light transition-colors"
                    >
                      <div>
                        <p className="text-sm text-text-primary font-medium">
                          {f.name || "Anonymous"}
                        </p>
                        <p className="text-xs text-text-muted">{f.email}</p>
                        <p className="text-xs text-text-muted">
                          Joined:{" "}
                          {new Date(f.subscribedAt).toLocaleDateString()}
                        </p>
                      </div>
                      <button
                        onClick={() => handleDeleteFollower(f.email)}
                        className="p-2 rounded-lg text-text-muted hover:text-red-400 hover:bg-red-500/10 transition-colors cursor-pointer"
                      >
                        <FaTrash className="text-xs" />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </motion.div>
        )}

        {/* Comments Tab */}
        {activeTab === "comments" && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="space-y-3"
          >
            <p className="text-sm text-text-muted mb-4">
              {recentComments.length} recent comments (including hidden)
            </p>
            {recentComments.length === 0 ? (
              <div className="glass rounded-2xl p-8 text-center text-text-muted text-sm">
                No comments yet
              </div>
            ) : (
              recentComments.map((c) => (
                <div
                  key={c._id}
                  className={`glass rounded-xl p-4 transition-colors ${c.hidden ? "opacity-50 border-l-2 border-yellow-500/50" : ""}`}
                >
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1 flex-wrap">
                        <p className="text-sm font-semibold text-text-primary flex items-center gap-1.5">
                          {c.isAdmin && (
                            <FaShieldAlt className="text-primary-400 text-xs" />
                          )}
                          {c.author}
                        </p>
                        {c.isAdmin && (
                          <span className="px-1.5 py-0.5 rounded text-[9px] font-bold bg-primary-500/20 text-primary-400 uppercase">
                            Author
                          </span>
                        )}
                        {c.hidden && (
                          <span className="px-1.5 py-0.5 rounded text-[9px] font-bold bg-yellow-500/20 text-yellow-400 uppercase">
                            Hidden
                          </span>
                        )}
                        {c.parentId && (
                          <span className="px-1.5 py-0.5 rounded text-[9px] font-bold bg-purple-500/20 text-purple-400 uppercase flex items-center gap-1">
                            <FaReply className="text-[8px]" /> Reply
                          </span>
                        )}
                        <span className="text-xs text-text-muted">
                          on{" "}
                          <span className="text-primary-400">
                            {c.postSlug}
                          </span>
                        </span>
                      </div>
                      <p className="text-sm text-text-secondary mb-1">
                        {c.content}
                      </p>
                      <div className="flex flex-wrap items-center gap-3 mt-2">
                        <p className="text-xs text-text-muted">
                          {new Date(c.createdAt).toLocaleString()}
                          {c.email && c.email !== "admin" && (
                            <span> · {c.email}</span>
                          )}
                        </p>
                        
                        {/* Admin Reactions Row */}
                        <div className="flex items-center gap-1 border-l border-[var(--glass-border)] pl-3 ml-1">
                          {REACTIONS.map((reaction) => {
                            const currentReaction = c.reactions?.find(r => r.type === reaction);
                            const count = currentReaction?.count || 0;
                            return (
                              <button
                                key={reaction}
                                onClick={() => handleAdminReact(c._id!, reaction)}
                                className={`inline-flex items-center gap-1 px-1.5 py-0.5 rounded text-[10px] transition-colors cursor-pointer ${
                                  count > 0
                                    ? "bg-primary-500/10 text-primary-400 border border-primary-500/20"
                                    : "text-text-muted hover:bg-surface-light"
                                }`}
                                title={`React with ${reaction}`}
                              >
                                <span>{reaction}</span>
                                {count > 0 && <span>{count}</span>}
                              </button>
                            );
                          })}
                        </div>
                      </div>
                    </div>

                    {/* Action buttons */}
                    <div className="flex items-center gap-1 shrink-0">
                      {/* Reply */}
                      <button
                        onClick={() =>
                          setReplyingTo(
                            replyingTo === c._id ? null : c._id!
                          )
                        }
                        className="p-2 rounded-lg text-text-muted hover:text-primary-400 hover:bg-primary-500/10 transition-colors cursor-pointer"
                        title="Reply as Admin"
                      >
                        <FaReply className="text-xs" />
                      </button>
                      {/* Hide/Unhide */}
                      <button
                        onClick={() => handleToggleHide(c._id!, !!c.hidden)}
                        className={`p-2 rounded-lg transition-colors cursor-pointer ${
                          c.hidden
                            ? "text-yellow-400 hover:bg-yellow-500/10"
                            : "text-text-muted hover:text-yellow-400 hover:bg-yellow-500/10"
                        }`}
                        title={c.hidden ? "Unhide comment" : "Hide comment"}
                      >
                        {c.hidden ? (
                          <FaEye className="text-xs" />
                        ) : (
                          <FaEyeSlash className="text-xs" />
                        )}
                      </button>
                      {/* Delete */}
                      <button
                        onClick={() => handleDeleteComment(c._id!)}
                        className="p-2 rounded-lg text-text-muted hover:text-red-400 hover:bg-red-500/10 transition-colors cursor-pointer"
                        title="Delete comment"
                      >
                        <FaTrash className="text-xs" />
                      </button>
                    </div>
                  </div>

                  {/* Admin reply form */}
                  <AnimatePresence>
                    {replyingTo === c._id && (
                      <motion.div
                        className="mt-3 flex gap-2"
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                      >
                        <div className="w-7 h-7 rounded-full bg-gradient-to-br from-primary-500 to-accent-500 flex items-center justify-center shrink-0 mt-1">
                          <FaShieldAlt className="text-white text-[10px]" />
                        </div>
                        <div className="flex-1 space-y-2">
                          <textarea
                            value={replyContent}
                            onChange={(e) => setReplyContent(e.target.value)}
                            placeholder="Reply as Blog Admin..."
                            rows={2}
                            className="w-full bg-surface-medium dark:bg-dark-100/50 border border-[var(--glass-border)] rounded-lg px-3 py-2 text-sm text-text-primary placeholder:text-text-muted focus:border-primary-500/50 focus:outline-none resize-none"
                          />
                          <div className="flex gap-2 justify-end">
                            <button
                              onClick={() => {
                                setReplyingTo(null);
                                setReplyContent("");
                              }}
                              className="px-3 py-1 rounded text-xs text-text-muted hover:text-text-primary cursor-pointer"
                            >
                              Cancel
                            </button>
                            <motion.button
                              onClick={() => handleAdminReply(c)}
                              disabled={replySubmitting || !replyContent.trim()}
                              className="flex items-center gap-1.5 px-4 py-1.5 rounded-lg bg-primary-500 text-white text-xs font-medium disabled:opacity-50 cursor-pointer"
                              whileTap={{ scale: 0.95 }}
                            >
                              <FaPaperPlane className="text-[10px]" />
                              {replySubmitting ? "Sending..." : "Reply as Admin"}
                            </motion.button>
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ))
            )}
          </motion.div>
        )}

        {/* Notify Tab */}
        {activeTab === "notify" && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="glass rounded-2xl p-6 md:p-8 max-w-2xl"
          >
            <h3 className="text-lg font-bold text-text-primary mb-2">
              Send Blog Notification
            </h3>
            <p className="text-sm text-text-secondary mb-6">
              Notify all {followerCount} follower
              {followerCount !== 1 ? "s" : ""} about a new blog post.
            </p>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-text-secondary mb-2">
                  Select Blog Post
                </label>
                <select
                  value={selectedPost}
                  onChange={(e) => setSelectedPost(e.target.value)}
                  className="w-full bg-surface-medium dark:bg-dark-100/50 border border-[var(--glass-border)] rounded-xl px-4 py-3 text-text-primary focus:border-primary-500/50 focus:outline-none"
                >
                  <option value="">— Choose a post —</option>
                  {posts.map((p) => (
                    <option key={p.slug} value={p.slug}>
                      {p.title}
                    </option>
                  ))}
                </select>
              </div>

              <motion.button
                onClick={handleSendNotification}
                disabled={
                  !selectedPost ||
                  notifyStatus === "sending" ||
                  followerCount === 0
                }
                className="w-full flex items-center justify-center gap-2 py-3 rounded-xl bg-gradient-to-r from-primary-500 to-primary-600 text-white font-medium hover:shadow-[0_0_20px_rgba(0,136,204,0.4)] transition-all disabled:opacity-50 cursor-pointer"
                whileHover={{ scale: 1.01 }}
                whileTap={{ scale: 0.99 }}
              >
                <FaPaperPlane />
                {notifyStatus === "sending"
                  ? "Sending..."
                  : `Send to ${followerCount} Follower${followerCount !== 1 ? "s" : ""}`}
              </motion.button>

              <AnimatePresence>
                {notifyStatus === "sent" && (
                  <motion.p
                    className="flex items-center justify-center gap-2 text-green-400 text-sm"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                  >
                    <FaCheckCircle />
                    {notifyMessage}
                  </motion.p>
                )}
                {notifyStatus === "error" && (
                  <motion.p
                    className="flex items-center justify-center gap-2 text-red-400 text-sm"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                  >
                    <FaExclamationCircle />
                    {notifyMessage}
                  </motion.p>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
}

// ── Main Admin Page ───────────────────────────────────────────
export default function AdminPage() {
  const [token, setToken] = useState<string | null>(null);

  useEffect(() => {
    const saved = sessionStorage.getItem("admin_token");
    if (saved) setToken(saved);
  }, []);

  const handleLogin = (t: string) => {
    sessionStorage.setItem("admin_token", t);
    setToken(t);
  };

  if (!token) return <LoginScreen onLogin={handleLogin} />;
  return <Dashboard token={token} />;
}
