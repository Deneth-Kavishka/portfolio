"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  FaEnvelope,
  FaBell,
  FaCheckCircle,
  FaTimes,
} from "react-icons/fa";
import Image from "next/image";

export default function FollowButton() {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [status, setStatus] = useState<
    "idle" | "loading" | "success" | "error"
  >("idle");
  const [errorMsg, setErrorMsg] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [showUnsubscribeModal, setShowUnsubscribeModal] = useState(false);
  const [unsubscribeReason, setUnsubscribeReason] = useState("");
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
    setShowUnsubscribeModal(false);
    setStatus("loading");
    setErrorMsg("");

    const subscribedEmail = localStorage.getItem("blog_subscribed_email");
    
    try {
      const res = await fetch("/api/followers/unsubscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: subscribedEmail, reason: unsubscribeReason }),
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
        <div className="relative">
          <motion.button
            onClick={() => setShowUnsubscribeModal(true)}
            className="flex items-center gap-2 px-5 py-2.5 rounded-full bg-surface-medium border border-primary-500/20 text-primary-400 font-medium hover:bg-surface-light hover:border-primary-500/40 transition-all cursor-pointer text-sm shadow-sm"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            title="Click to unsubscribe"
          >
            <FaCheckCircle className="text-primary-500" />
            <span>Subscribed</span>
          </motion.button>
        </div>
        {status === "error" && (
          <span className="text-red-400 text-xs">{errorMsg}</span>
        )}
        {status === "success" && (
          <span className="text-green-400 text-xs">Subscribed!</span>
        )}

        {/* Unsubscribe Confirmation Modal */}
        <AnimatePresence>
          {showUnsubscribeModal && (
            <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-dark-500/80 backdrop-blur-sm">
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="glass rounded-2xl p-6 md:p-8 max-w-sm w-full border border-[var(--glass-border)] shadow-2xl relative"
              >
                <div className="w-16 h-16 rounded-full overflow-hidden mb-4 mx-auto border-2 border-primary-500/20 shadow-[0_0_15px_rgba(0,136,204,0.15)] relative">
                  <Image
                    src="/icon.png"
                    alt="Deneth Kavishka"
                    fill
                    className="object-cover"
                  />
                </div>
                <h3 className="text-lg font-bold text-text-primary text-center mb-2">
                  Unsubscribe?
                </h3>
                <p className="text-sm text-text-secondary text-center mb-4">
                  Are you sure you want to stop receiving email notifications for new blog posts?
                </p>

                <textarea
                  value={unsubscribeReason}
                  onChange={(e) => setUnsubscribeReason(e.target.value)}
                  placeholder="Optional: Please tell us why you are leaving..."
                  className="w-full bg-surface-medium dark:bg-dark-100/50 border border-[var(--glass-border)] rounded-xl px-3 py-2 text-text-primary placeholder:text-text-muted focus:border-primary-500/50 focus:outline-none transition-colors text-sm resize-none mb-6"
                  rows={2}
                />
                
                <div className="flex gap-3">
                  <button
                    onClick={() => setShowUnsubscribeModal(false)}
                    className="flex-1 py-2.5 rounded-xl bg-surface-medium text-text-primary font-medium hover:bg-surface-light transition-colors cursor-pointer text-sm"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleUnsubscribe}
                    className="flex-1 py-2.5 rounded-xl bg-red-500/20 text-red-400 font-medium hover:bg-red-500/30 transition-colors cursor-pointer text-sm"
                  >
                    Unsubscribe
                  </button>
                </div>
              </motion.div>
            </div>
          )}
        </AnimatePresence>
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
                  placeholder="Your Name"
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
