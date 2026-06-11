"use client";

import { useState } from "react";
import { motion } from "motion/react";
import {
  FaEnvelope,
  FaPhone,
  FaMapMarkerAlt,
  FaPaperPlane,
  FaCheckCircle,
  FaExclamationCircle,
  FaGithub,
  FaLinkedinIn,
  FaWhatsapp,
} from "react-icons/fa";
import emailjs from "@emailjs/browser";
import { PERSONAL_INFO, EMAILJS_CONFIG, SOCIAL_LINKS } from "@/lib/constants";
import { isValidEmail } from "@/lib/utils";
import type { ContactFormData, FormStatus } from "@/lib/types";
import SectionHeading from "@/components/ui/SectionHeading";
import GlassCard from "@/components/ui/GlassCard";
import Button from "@/components/ui/Button";
import ScrollReveal from "@/components/effects/ScrollReveal";

export default function Contact() {
  const [formData, setFormData] = useState<ContactFormData>({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [errors, setErrors] = useState<Partial<ContactFormData>>({});
  const [status, setStatus] = useState<FormStatus>("idle");

  const validate = (): boolean => {
    const newErrors: Partial<ContactFormData> = {};
    if (!formData.name.trim()) newErrors.name = "Name is required";
    if (!formData.email.trim()) newErrors.email = "Email is required";
    else if (!isValidEmail(formData.email))
      newErrors.email = "Invalid email format";
    if (!formData.subject.trim()) newErrors.subject = "Subject is required";
    if (!formData.message.trim()) newErrors.message = "Message is required";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    setStatus("sending");

    try {
      if (EMAILJS_CONFIG.serviceId) {
        await emailjs.send(
          EMAILJS_CONFIG.serviceId,
          EMAILJS_CONFIG.templateId,
          {
            from_name: formData.name,
            from_email: formData.email,
            subject: formData.subject,
            message: formData.message,
          },
          EMAILJS_CONFIG.publicKey
        );
      }
      setStatus("sent");
      setFormData({ name: "", email: "", subject: "", message: "" });
      setTimeout(() => setStatus("idle"), 5000);
    } catch {
      setStatus("error");
      setTimeout(() => setStatus("idle"), 5000);
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name as keyof ContactFormData]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  const contactInfo = [
    { icon: <FaEnvelope />, label: "Email", value: PERSONAL_INFO.email, href: `mailto:${PERSONAL_INFO.email}` },
    { icon: <FaPhone />, label: "Phone", value: PERSONAL_INFO.phone, href: `tel:${PERSONAL_INFO.phone}` },
    { icon: <FaMapMarkerAlt />, label: "Location", value: PERSONAL_INFO.location, href: undefined },
  ];

  const inputClasses =
    "w-full bg-dark-100/50 border border-white/5 rounded-xl px-4 py-3 text-text-primary placeholder:text-text-muted focus:border-primary-500/50 focus:outline-none transition-colors";

  return (
    <section id="contact" className="relative">
      <div className="absolute top-1/3 -right-40 w-80 h-80 bg-primary-500/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="section-container">
        <SectionHeading
          badge="Get In Touch"
          title="Contact Me"
          subtitle="Have a project in mind? Let's work together"
        />

        <div className="grid lg:grid-cols-5 gap-10 max-w-6xl mx-auto">
          {/* Form */}
          <ScrollReveal direction="left" className="lg:col-span-3">
            <GlassCard padding="lg" hover={false}>
              <motion.form
                onSubmit={handleSubmit}
                className="space-y-5"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
              >
                <div className="grid md:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-sm font-medium text-text-secondary mb-2">
                      Your Name
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="John Doe"
                      className={inputClasses}
                    />
                    {errors.name && (
                      <p className="text-red-400 text-xs mt-1">{errors.name}</p>
                    )}
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-text-secondary mb-2">
                      Your Email
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="john@example.com"
                      className={inputClasses}
                    />
                    {errors.email && (
                      <p className="text-red-400 text-xs mt-1">
                        {errors.email}
                      </p>
                    )}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-text-secondary mb-2">
                    Subject
                  </label>
                  <input
                    type="text"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    placeholder="Project Inquiry"
                    className={inputClasses}
                  />
                  {errors.subject && (
                    <p className="text-red-400 text-xs mt-1">
                      {errors.subject}
                    </p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-text-secondary mb-2">
                    Message
                  </label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Tell me about your project..."
                    rows={5}
                    className={`${inputClasses} resize-none`}
                  />
                  {errors.message && (
                    <p className="text-red-400 text-xs mt-1">
                      {errors.message}
                    </p>
                  )}
                </div>

                <Button
                  type="submit"
                  variant="primary"
                  size="lg"
                  loading={status === "sending"}
                  icon={<FaPaperPlane />}
                  className="w-full"
                >
                  {status === "sending" ? "Sending..." : "Send Message"}
                </Button>

                {/* Status messages */}
                {status === "sent" && (
                  <motion.div
                    className="flex items-center gap-2 text-green-400 text-sm justify-center"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                  >
                    <FaCheckCircle />
                    Message sent successfully! I&apos;ll get back to you soon.
                  </motion.div>
                )}
                {status === "error" && (
                  <motion.div
                    className="flex items-center gap-2 text-red-400 text-sm justify-center"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                  >
                    <FaExclamationCircle />
                    Failed to send. Please try again or email directly.
                  </motion.div>
                )}
              </motion.form>
            </GlassCard>
          </ScrollReveal>

          {/* Contact Info */}
          <ScrollReveal direction="right" className="lg:col-span-2">
            <div className="space-y-6 h-full flex flex-col">
              <GlassCard padding="lg" hover={false} className="flex-1">
                <h3 className="text-xl font-bold text-text-primary mb-2">
                  Let&apos;s discuss your project
                </h3>
                <p className="text-sm text-text-secondary mb-8 leading-relaxed">
                  I&apos;m always open to discussing new projects, creative
                  ideas, or opportunities to be part of your vision.
                </p>

                <div className="space-y-5">
                  {contactInfo.map((info) => (
                    <div key={info.label} className="flex items-center gap-4">
                      <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-primary-500/20 to-accent-500/20 flex items-center justify-center text-primary-400 shrink-0">
                        {info.icon}
                      </div>
                      <div>
                        <p className="text-xs text-text-muted uppercase tracking-wider">
                          {info.label}
                        </p>
                        {info.href ? (
                          <a
                            href={info.href}
                            className="text-sm text-text-secondary hover:text-primary-400 transition-colors"
                          >
                            {info.value}
                          </a>
                        ) : (
                          <p className="text-sm text-text-secondary">
                            {info.value}
                          </p>
                        )}
                      </div>
                    </div>
                  ))}
                </div>

                {/* Social Links */}
                <div className="mt-10">
                  <p className="text-sm text-text-muted uppercase tracking-wider mb-4">
                    Follow Me
                  </p>
                  <div className="flex gap-3">
                    {[
                      { icon: <FaGithub />, url: SOCIAL_LINKS[1]?.url },
                      { icon: <FaLinkedinIn />, url: SOCIAL_LINKS[0]?.url },
                      { icon: <FaWhatsapp />, url: SOCIAL_LINKS[5]?.url },
                      { icon: <FaEnvelope />, url: SOCIAL_LINKS[6]?.url },
                    ].map((item, i) => (
                      <motion.a
                        key={i}
                        href={item.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-2.5 rounded-xl glass text-text-secondary hover:text-primary-400 hover:bg-primary-500/10 transition-all"
                        whileHover={{ scale: 1.1, y: -2 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        {item.icon}
                      </motion.a>
                    ))}
                  </div>
                </div>
              </GlassCard>
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}
