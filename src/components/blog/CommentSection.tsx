"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  FaUser,
  FaReply,
  FaPaperPlane,
  FaTimes,
  FaComment,
  FaShieldAlt,
} from "react-icons/fa";
import type { Comment, ReactionType } from "@/lib/types";
import Image from "next/image";

const REACTIONS: ReactionType[] = ["👍", "❤️", "🔥", "💡", "👏"];

function timeAgo(dateStr: string): string {
  const seconds = Math.floor(
    (Date.now() - new Date(dateStr).getTime()) / 1000
  );
  if (seconds < 60) return "just now";
  const minutes = Math.floor(seconds / 60);
  if (minutes < 60) return `${minutes}m ago`;
  const hours = Math.floor(minutes / 60);
  if (hours < 24) return `${hours}h ago`;
  const days = Math.floor(hours / 24);
  if (days < 30) return `${days}d ago`;
  const months = Math.floor(days / 30);
  return `${months}mo ago`;
}

interface CommentItemProps {
  comment: Comment;
  onReply: (commentId: string) => void;
  replyingTo: string | null;
  onSubmitReply: (parentId: string, data: CommentFormData) => Promise<void>;
  onCancelReply: () => void;
  onReact: (commentId: string, reaction: ReactionType) => void;
  depth?: number;
}

interface CommentFormData {
  author: string;
  email: string;
  content: string;
}

function CommentItem({
  comment,
  onReply,
  replyingTo,
  onSubmitReply,
  onCancelReply,
  onReact,
  depth = 0,
}: CommentItemProps) {
  const [replyForm, setReplyForm] = useState<CommentFormData>({
    author: "",
    email: "",
    content: "",
  });
  const [submitting, setSubmitting] = useState(false);
  const isReplying = replyingTo === comment._id;
  const maxDepth = 3;

  const handleReplySubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!replyForm.author.trim() || !replyForm.content.trim()) return;
    setSubmitting(true);
    await onSubmitReply(comment._id!, replyForm);
    setReplyForm({ author: "", email: "", content: "" });
    setSubmitting(false);
  };

  const initials = comment.author
    .split(" ")
    .map((n: string) => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);

  return (
    <motion.div
      className={`${depth > 0 ? "ml-6 md:ml-10 pl-4 border-l border-[var(--glass-border)]" : ""}`}
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
    >
      <div className="glass rounded-xl p-4 md:p-5 mb-3">
        {/* Author info */}
        <div className="flex items-center gap-3 mb-3">
          <div
            className={`w-9 h-9 rounded-full flex items-center justify-center text-xs font-bold shrink-0 relative overflow-hidden ${
              comment.isAdmin
                ? "bg-gradient-to-br from-primary-500 to-accent-500 text-white ring-1 ring-primary-500/30"
                : "bg-gradient-to-br from-primary-500/30 to-accent-500/30 text-primary-400"
            }`}
          >
            {comment.isAdmin ? (
              <Image src="/icon.png" alt="Deneth Kavishka" fill className="object-cover" />
            ) : (
              <img src={`https://unavatar.io/${comment.email}?fallback=${encodeURIComponent(`https://ui-avatars.com/api/?name=${encodeURIComponent(comment.author)}&background=random&color=fff`)}`} alt={comment.author} className="w-full h-full object-cover" />
            )}
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2">
              <p className="text-sm font-semibold text-text-primary truncate">
                {comment.isAdmin ? "Deneth Kavishka" : comment.author}
              </p>
              {comment.isAdmin && (
                <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-gradient-to-r from-primary-500/20 to-accent-500/20 text-primary-400 border border-primary-500/20 uppercase tracking-wider">
                  Author
                </span>
              )}
            </div>
            <p className="text-xs text-text-muted">
              {timeAgo(comment.createdAt)}
            </p>
          </div>
        </div>

        {/* Content */}
        <p className="text-sm text-text-secondary leading-relaxed mb-3 whitespace-pre-wrap">
          {comment.content}
        </p>

        {/* Actions row */}
        <div className="flex items-center justify-between flex-wrap gap-2">
          {/* Reactions */}
          <div className="flex items-center gap-1">
            {comment.reactions?.map((r) => (
              <motion.button
                key={r.type}
                onClick={() => onReact(comment._id!, r.type)}
                className={`inline-flex items-center gap-1 px-2 py-1 rounded-lg text-xs transition-all cursor-pointer ${
                  r.count > 0
                    ? "bg-primary-500/10 border border-primary-500/20"
                    : "hover:bg-surface-light"
                }`}
                whileTap={{ scale: 0.9 }}
              >
                <span>{r.type}</span>
                {r.count > 0 && (
                  <span className="text-text-muted">{r.count}</span>
                )}
              </motion.button>
            ))}
          </div>

          {/* Reply button */}
          {depth < maxDepth && (
            <motion.button
              onClick={() => onReply(comment._id!)}
              className="flex items-center gap-1.5 text-xs text-text-muted hover:text-primary-400 transition-colors cursor-pointer"
              whileTap={{ scale: 0.95 }}
            >
              <FaReply className="text-[10px]" />
              Reply
            </motion.button>
          )}
        </div>

        {/* Reply form */}
        <AnimatePresence>
          {isReplying && (
            <motion.form
              onSubmit={handleReplySubmit}
              className="mt-4 space-y-3"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
            >
              <div className="grid grid-cols-2 gap-3">
                <input
                  type="text"
                  value={replyForm.author}
                  onChange={(e) =>
                    setReplyForm((p) => ({ ...p, author: e.target.value }))
                  }
                  placeholder="Your name *"
                  required
                  className="bg-surface-medium dark:bg-dark-100/50 border border-[var(--glass-border)] rounded-lg px-3 py-2 text-sm text-text-primary placeholder:text-text-muted focus:border-primary-500/50 focus:outline-none"
                />
                <input
                  type="email"
                  value={replyForm.email}
                  onChange={(e) =>
                    setReplyForm((p) => ({ ...p, email: e.target.value }))
                  }
                  placeholder="Email (optional)"
                  className="bg-surface-medium dark:bg-dark-100/50 border border-[var(--glass-border)] rounded-lg px-3 py-2 text-sm text-text-primary placeholder:text-text-muted focus:border-primary-500/50 focus:outline-none"
                />
              </div>
              <textarea
                value={replyForm.content}
                onChange={(e) =>
                  setReplyForm((p) => ({ ...p, content: e.target.value }))
                }
                placeholder="Write your reply..."
                required
                rows={2}
                className="w-full bg-surface-medium dark:bg-dark-100/50 border border-[var(--glass-border)] rounded-lg px-3 py-2 text-sm text-text-primary placeholder:text-text-muted focus:border-primary-500/50 focus:outline-none resize-none"
              />
              <div className="flex items-center gap-2 justify-end">
                <button
                  type="button"
                  onClick={onCancelReply}
                  className="px-3 py-1.5 rounded-lg text-xs text-text-muted hover:text-text-primary transition-colors cursor-pointer"
                >
                  Cancel
                </button>
                <motion.button
                  type="submit"
                  disabled={submitting}
                  className="flex items-center gap-1.5 px-4 py-1.5 rounded-lg bg-primary-500 text-white text-xs font-medium hover:bg-primary-600 transition-colors disabled:opacity-50 cursor-pointer"
                  whileTap={{ scale: 0.95 }}
                >
                  <FaPaperPlane className="text-[10px]" />
                  {submitting ? "Posting..." : "Reply"}
                </motion.button>
              </div>
            </motion.form>
          )}
        </AnimatePresence>
      </div>

      {/* Nested replies */}
      {comment.replies?.map((reply) => (
        <CommentItem
          key={reply._id}
          comment={reply}
          onReply={onReply}
          replyingTo={replyingTo}
          onSubmitReply={onSubmitReply}
          onCancelReply={onCancelReply}
          onReact={onReact}
          depth={depth + 1}
        />
      ))}
    </motion.div>
  );
}

// ── Main Comment Section ──────────────────────────────────────

interface CommentSectionProps {
  postSlug: string;
}

export default function CommentSection({ postSlug }: CommentSectionProps) {
  const [comments, setComments] = useState<Comment[]>([]);
  const [loading, setLoading] = useState(true);
  const [replyingTo, setReplyingTo] = useState<string | null>(null);
  const [form, setForm] = useState<CommentFormData>({
    author: "",
    email: "",
    content: "",
  });
  const [submitting, setSubmitting] = useState(false);
  const [autoFilled, setAutoFilled] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<
    "idle" | "success" | "error"
  >("idle");

  const fetchComments = useCallback(async () => {
    try {
      const res = await fetch(`/api/comments?slug=${postSlug}`);
      const data = await res.json();
      setComments(data.comments || []);
    } catch {
      console.error("Failed to load comments");
    } finally {
      setLoading(false);
    }
  }, [postSlug]);

  useEffect(() => {
    fetchComments();
    const savedEmail = localStorage.getItem("blog_subscribed_email");
    if (savedEmail) {
      fetch(`/api/followers/check?email=${encodeURIComponent(savedEmail)}`)
        .then((res) => res.json())
        .then((data) => {
          if (data.subscribed) {
            setForm((p) => ({ ...p, email: data.email, author: data.name }));
            setAutoFilled(true);
            localStorage.setItem("blog_subscribed_name", data.name);
          } else {
            // User might have unsubscribed from another device
            localStorage.removeItem("blog_subscribed_email");
            localStorage.removeItem("blog_subscribed_name");
          }
        })
        .catch(console.error);
    }
  }, [fetchComments]);

  const handleSubmitComment = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.author.trim() || !form.content.trim()) return;

    setSubmitting(true);
    try {
      const res = await fetch("/api/comments", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          postSlug,
          author: form.author.trim(),
          email: form.email.trim(),
          content: form.content.trim(),
        }),
      });

      if (res.ok) {
        setForm({ author: "", email: "", content: "" });
        setSubmitStatus("success");
        await fetchComments();
        setTimeout(() => setSubmitStatus("idle"), 3000);
      } else {
        setSubmitStatus("error");
        setTimeout(() => setSubmitStatus("idle"), 3000);
      }
    } catch {
      setSubmitStatus("error");
      setTimeout(() => setSubmitStatus("idle"), 3000);
    } finally {
      setSubmitting(false);
    }
  };

  const handleSubmitReply = async (
    parentId: string,
    data: CommentFormData
  ) => {
    await fetch("/api/comments", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        postSlug,
        author: data.author.trim(),
        email: data.email.trim(),
        content: data.content.trim(),
        parentId,
      }),
    });
    setReplyingTo(null);
    await fetchComments();
  };

  const handleReact = async (commentId: string, reaction: ReactionType) => {
    await fetch("/api/comments/react", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ commentId, reaction }),
    });
    await fetchComments();
  };

  const totalCount = comments.reduce(
    (acc, c) => acc + 1 + (c.replies?.length || 0),
    0
  );

  return (
    <div className="mt-12">
      {/* Header */}
      <div className="flex items-center gap-3 mb-8">
        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary-500/20 to-accent-500/20 flex items-center justify-center text-primary-400">
          <FaComment />
        </div>
        <div>
          <h3 className="text-xl font-bold text-text-primary">Comments</h3>
          <p className="text-xs text-text-muted">
            {totalCount} {totalCount === 1 ? "comment" : "comments"}
          </p>
        </div>
      </div>

      {/* New comment form */}
      <div className="glass rounded-2xl p-5 md:p-6 mb-8">
        <h4 className="text-sm font-semibold text-text-primary mb-4">
          Leave a Comment
        </h4>
        <form onSubmit={handleSubmitComment} className="space-y-4">
          {autoFilled ? (
            <div className="flex items-center gap-3 mb-4 bg-surface-medium dark:bg-dark-100/50 p-3 rounded-xl border border-[var(--glass-border)]">
              <div className="w-9 h-9 rounded-full overflow-hidden shrink-0 bg-gradient-to-br from-primary-500/30 to-accent-500/30">
                <img src={`https://unavatar.io/${form.email}?fallback=${encodeURIComponent(`https://ui-avatars.com/api/?name=${encodeURIComponent(form.author)}&background=random&color=fff`)}`} alt="Avatar" className="w-full h-full object-cover" />
              </div>
              <div className="text-sm flex-1">
                <p className="text-text-primary font-medium">Commenting as {form.author}</p>
                <p className="text-xs text-text-muted">{form.email}</p>
              </div>
              <button 
                type="button" 
                onClick={() => setAutoFilled(false)}
                className="text-xs text-text-muted hover:text-primary-400 transition-colors cursor-pointer px-2"
              >
                Change
              </button>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-medium text-text-secondary mb-1.5">
                  Name <span className="text-red-400">*</span>
                </label>
                <div className="relative">
                  <FaUser className="absolute left-3 top-1/2 -translate-y-1/2 text-text-muted text-xs" />
                  <input
                    type="text"
                    value={form.author}
                    onChange={(e) =>
                      setForm((p) => ({ ...p, author: e.target.value }))
                    }
                    placeholder="Your name"
                    required
                    className="w-full bg-surface-medium dark:bg-dark-100/50 border border-[var(--glass-border)] rounded-xl pl-9 pr-4 py-2.5 text-text-primary placeholder:text-text-muted focus:border-primary-500/50 focus:outline-none text-sm"
                  />
                </div>
              </div>
              <div>
                <label className="block text-xs font-medium text-text-secondary mb-1.5">
                  Email{" "}
                  <span className="text-text-muted text-xs">(optional)</span>
                </label>
                <input
                  type="email"
                  value={form.email}
                  onChange={(e) =>
                    setForm((p) => ({ ...p, email: e.target.value }))
                  }
                  placeholder="your@email.com"
                  className="w-full bg-surface-medium dark:bg-dark-100/50 border border-[var(--glass-border)] rounded-xl px-4 py-2.5 text-text-primary placeholder:text-text-muted focus:border-primary-500/50 focus:outline-none text-sm"
                />
              </div>
            </div>
          )}

          <div>
            <label className="block text-xs font-medium text-text-secondary mb-1.5">
              Comment <span className="text-red-400">*</span>
            </label>
            <textarea
              value={form.content}
              onChange={(e) =>
                setForm((p) => ({ ...p, content: e.target.value }))
              }
              placeholder="Share your thoughts..."
              required
              rows={3}
              className="w-full bg-surface-medium dark:bg-dark-100/50 border border-[var(--glass-border)] rounded-xl px-4 py-2.5 text-text-primary placeholder:text-text-muted focus:border-primary-500/50 focus:outline-none resize-none text-sm"
            />
          </div>

          <div className="flex items-center justify-between">
            <p className="text-xs text-text-muted">
              Be respectful and constructive.
            </p>
            <motion.button
              type="submit"
              disabled={submitting}
              className="flex items-center gap-2 px-6 py-2.5 rounded-xl bg-gradient-to-r from-primary-500 to-primary-600 text-white text-sm font-medium hover:shadow-[0_0_20px_rgba(0,136,204,0.4)] transition-all disabled:opacity-50 cursor-pointer"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <FaPaperPlane className="text-xs" />
              {submitting ? "Posting..." : "Post Comment"}
            </motion.button>
          </div>

          <AnimatePresence>
            {submitStatus === "success" && (
              <motion.p
                className="text-green-400 text-sm text-center"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                Comment posted successfully!
              </motion.p>
            )}
            {submitStatus === "error" && (
              <motion.p
                className="text-red-400 text-sm text-center"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                Failed to post comment. Please try again.
              </motion.p>
            )}
          </AnimatePresence>
        </form>
      </div>

      {/* Comments list */}
      {loading ? (
        <div className="space-y-4">
          {[1, 2, 3].map((n) => (
            <div
              key={n}
              className="glass rounded-xl p-5 animate-pulse space-y-3"
            >
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-full bg-dark-300" />
                <div className="space-y-1.5">
                  <div className="w-24 h-3 bg-dark-300 rounded" />
                  <div className="w-16 h-2 bg-dark-300 rounded" />
                </div>
              </div>
              <div className="w-full h-3 bg-dark-300 rounded" />
              <div className="w-2/3 h-3 bg-dark-300 rounded" />
            </div>
          ))}
        </div>
      ) : comments.length === 0 ? (
        <div className="text-center py-12 glass rounded-2xl">
          <FaComment className="text-3xl text-text-muted mx-auto mb-3" />
          <p className="text-text-secondary">No comments yet.</p>
          <p className="text-sm text-text-muted">
            Be the first to share your thoughts!
          </p>
        </div>
      ) : (
        <div className="space-y-2">
          {comments.map((comment) => (
            <CommentItem
              key={comment._id}
              comment={comment}
              onReply={(id) =>
                setReplyingTo((prev) => (prev === id ? null : id))
              }
              replyingTo={replyingTo}
              onSubmitReply={handleSubmitReply}
              onCancelReply={() => setReplyingTo(null)}
              onReact={handleReact}
            />
          ))}
        </div>
      )}
    </div>
  );
}
