"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  FaEnvelope,
  FaBell,
  FaCheckCircle,
  FaTimes,
} from "react-icons/fa";

export default function FollowButton() {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [status, setStatus] = useState<
    "idle" | "loading" | "success" | "error"
  >("idle");
  const [errorMsg, setErrorMsg] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [isSubscribed, setIsSubscribed] = useState(false);

  // Check localStorage for previously subscribed email
  useEffect(() => {
    const saved = localStorage.getItem("blog_subscribed_email");
    if (saved) {
      setIsSubscribed(true);
    }
  }, []);

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) return;

    setStatus("loading");
    setErrorMsg("");

    try {
      const res = await fetch("/api/followers", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: email.trim(), name: name.trim() }),
      });

      const data = await res.json();

      if (res.ok) {
        setStatus("success");
        localStorage.setItem("blog_subscribed_email", email.trim().toLowerCase());
        if (name.trim()) localStorage.setItem("blog_subscribed_name", name.trim());
        setIsSubscribed(true);
        setEmail("");
        setName("");
        setTimeout(() => {
          setStatus("idle");
          setShowForm(false);
        }, 3000);
      } else {
        setStatus("error");
        setErrorMsg(data.error || "Something went wrong");
        setTimeout(() => setStatus("idle"), 4000);
      }
    } catch {
      setStatus("error");
      setErrorMsg("Network error. Please try again.");
      setTimeout(() => setStatus("idle"), 4000);
    }
  };

  const handleUnsubscribe = async () => {
    if (!confirm("Are you sure you want to unsubscribe from new post notifications?")) return;
    setStatus("loading");
    setErrorMsg("");

    const subscribedEmail = localStorage.getItem("blog_subscribed_email");
    
    try {
      const res = await fetch("/api/followers/unsubscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: subscribedEmail }),
      });

      if (res.ok) {
        setStatus("success");
        localStorage.removeItem("blog_subscribed_email");
        localStorage.removeItem("blog_subscribed_name");
        setIsSubscribed(false);
        setTimeout(() => setStatus("idle"), 2000);
      } else {
        const data = await res.json();
        setStatus("error");
        setErrorMsg(data.error || "Failed to unsubscribe");
        setTimeout(() => setStatus("idle"), 4000);
      }
    } catch {
      setStatus("error");
      setErrorMsg("Network error. Please try again.");
      setTimeout(() => setStatus("idle"), 4000);
    }
  };

  // Already subscribed — show unsubscribe option (YouTube style 'Subscribed' button)
  if (isSubscribed) {
    return (
      <div className="flex items-center gap-3 my-4">
        <motion.button
          onClick={handleUnsubscribe}
          disabled={status === "loading"}
          className="flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-medium bg-black/5 dark:bg-white/5 text-text-secondary hover:text-text-primary hover:bg-black/10 dark:hover:bg-white/10 border border-black/10 dark:border-white/10 transition-all cursor-pointer disabled:opacity-50"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          {status === "loading" ? (
            <span className="w-4 h-4 border-2 border-text-muted border-t-transparent rounded-full animate-spin" />
          ) : (
            <>
              <FaBell className="text-xs" />
              Subscribed
            </>
          )}
        </motion.button>
        {status === "error" && (
          <span className="text-red-400 text-xs">{errorMsg}</span>
        )}
        {status === "success" && (
          <span className="text-green-400 text-xs">Subscribed!</span>
        )}
      </div>
    );
  }

  // Not subscribed — show subscribe option
  return (
    <div className="my-4 relative">
      <AnimatePresence mode="wait">
        {!showForm ? (
          <motion.button
            key="trigger"
            onClick={() => setShowForm(true)}
            className="flex items-center gap-2 px-6 py-2.5 rounded-full text-sm font-bold bg-black text-white dark:bg-white dark:text-black hover:opacity-90 transition-all cursor-pointer"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            Subscribe
          </motion.button>
        ) : (
          <motion.div
            key="form"
            className="glass rounded-2xl p-5 shadow-xl w-full max-w-sm mt-2 origin-top-left border border-[var(--glass-border)]"
            initial={{ opacity: 0, scale: 0.95, y: -10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: -10 }}
          >
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-sm font-bold text-text-primary flex items-center gap-2">
                <FaBell className="text-primary-400" />
                Subscribe to Blog
              </h3>
              <button
                onClick={() => setShowForm(false)}
                className="p-1.5 rounded-lg hover:bg-surface-light text-text-muted hover:text-text-primary transition-colors cursor-pointer"
              >
                <FaTimes className="text-xs" />
              </button>
            </div>

            <form onSubmit={handleSubscribe} className="space-y-3">
              <div>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Your Name (Optional)"
                  className="w-full bg-surface-medium dark:bg-dark-100/50 border border-[var(--glass-border)] rounded-xl px-3 py-2 text-text-primary placeholder:text-text-muted focus:border-primary-500/50 focus:outline-none transition-colors text-sm"
                />
              </div>
              <div className="relative">
                <FaEnvelope className="absolute left-3 top-1/2 -translate-y-1/2 text-text-muted text-xs" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="your@email.com *"
                  required
                  className="w-full bg-surface-medium dark:bg-dark-100/50 border border-[var(--glass-border)] rounded-xl pl-8 pr-3 py-2 text-text-primary placeholder:text-text-muted focus:border-primary-500/50 focus:outline-none transition-colors text-sm"
                />
              </div>

              <motion.button
                type="submit"
                disabled={status === "loading"}
                className="w-full py-2.5 rounded-xl bg-gradient-to-r from-primary-500 to-primary-600 text-white font-medium hover:shadow-lg transition-all disabled:opacity-50 cursor-pointer text-sm"
                whileTap={{ scale: 0.98 }}
              >
                {status === "loading" ? "Subscribing..." : "Subscribe"}
              </motion.button>
            </form>

            <AnimatePresence>
              {status === "success" && (
                <motion.div
                  className="mt-3 flex items-center gap-1.5 text-green-400 text-xs justify-center"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                >
                  <FaCheckCircle /> Subscribed successfully!
                </motion.div>
              )}
              {status === "error" && (
                <motion.div
                  className="mt-3 text-red-400 text-xs text-center"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                >
                  {errorMsg}
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
