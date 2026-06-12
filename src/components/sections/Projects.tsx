"use client";

// NOTE: Category filter is kept in the codebase for future use.
// Uncomment the filter section below when you want to enable category filtering.
// Categories are defined in constants.ts as PROJECT_CATEGORIES.

import { motion } from "motion/react";
import Image from "next/image";
import { FaGithub, FaExternalLinkAlt, FaStar } from "react-icons/fa";
import { PROJECTS } from "@/lib/constants";
// import { PROJECT_CATEGORIES } from "@/lib/constants"; // Uncomment for category filter
import SectionHeading from "@/components/ui/SectionHeading";
import GlassCard from "@/components/ui/GlassCard";
import Badge from "@/components/ui/Badge";
import ScrollReveal from "@/components/effects/ScrollReveal";

export default function Projects() {
  // To enable category filter in the future:
  // const [activeCategory, setActiveCategory] = useState<string>("All");
  // const filtered = activeCategory === "All"
  //   ? PROJECTS
  //   : PROJECTS.filter((p) => p.category === activeCategory);

  return (
    <section id="projects" className="relative">
      {/* Background orbs */}
      <div className="absolute top-1/2 -left-40 w-80 h-80 bg-primary-500/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="section-container">
        <SectionHeading
          badge="My Work"
          title="Featured Projects"
          subtitle="Showcasing my best work across different domains"
        />

        {/* Category Filter — uncomment when needed in the future
        <ScrollReveal direction="up">
          <div className="flex flex-wrap justify-center gap-2 mb-12">
            {PROJECT_CATEGORIES.map((cat) => (
              <motion.button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-5 py-2 rounded-full text-sm font-medium transition-all cursor-pointer ${
                  activeCategory === cat
                    ? "bg-gradient-to-r from-primary-500 to-primary-600 text-white shadow-[0_0_20px_rgba(99,102,241,0.3)]"
                    : "glass text-text-secondary hover:text-text-primary"
                }`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {cat}
              </motion.button>
            ))}
          </div>
        </ScrollReveal>
        */}

        {/* Projects Grid */}
        <ScrollReveal direction="up">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {PROJECTS.map((project, i) => (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.07 }}
              >
                <GlassCard hover glow padding="none" className="group overflow-hidden">
                  {/* Image area */}
                  <div className="relative h-48 overflow-hidden bg-dark-300">
                    {project.image ? (
                      <Image
                        src={project.image}
                        alt={project.title}
                        fill
                        className="object-cover transition-transform duration-500 group-hover:scale-110"
                      />
                    ) : (
                      <div className="w-full h-full bg-gradient-to-br from-primary-500/10 via-dark-200 to-accent-500/10 flex items-center justify-center">
                        <span className="text-5xl opacity-20 gradient-text font-bold">
                          {project.title.split(" ").map(w => w[0]).join("").slice(0, 3)}
                        </span>
                      </div>
                    )}

                    {/* Hover overlay */}
                    <div className="absolute inset-0 bg-dark-500/80 flex items-center justify-center gap-3 opacity-0 group-hover:opacity-100 transition-all duration-300">
                      {project.liveUrl && (
                        <motion.a
                          href={project.liveUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="p-3 rounded-full glass text-text-primary hover:text-primary-400 transition-colors"
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.95 }}
                        >
                          <FaExternalLinkAlt />
                        </motion.a>
                      )}
                      {project.githubUrl && (
                        <motion.a
                          href={project.githubUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="p-3 rounded-full glass text-text-primary hover:text-primary-400 transition-colors"
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.95 }}
                        >
                          <FaGithub />
                        </motion.a>
                      )}
                    </div>

                    {/* Featured badge */}
                    {project.featured && (
                      <div className="absolute top-3 right-3">
                        <Badge variant="gradient" className="gap-1">
                          <FaStar className="text-yellow-400 text-[10px]" />
                          Featured
                        </Badge>
                      </div>
                    )}
                  </div>

                  {/* Content */}
                  <div className="p-5">
                    <h3 className="text-lg font-bold text-text-primary mb-2 group-hover:text-primary-400 transition-colors">
                      {project.title}
                    </h3>
                    <p className="text-sm text-text-secondary line-clamp-2 mb-4">
                      {project.description}
                    </p>
                    <div className="flex flex-wrap gap-1.5">
                      {project.techStack.map((tech) => (
                        <Badge key={tech} variant="outline">
                          {tech}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </GlassCard>
              </motion.div>
            ))}
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
