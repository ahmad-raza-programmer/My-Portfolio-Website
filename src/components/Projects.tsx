import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "motion/react";
import { SectionTitle } from "./shared/SectionTitle";
import { projects } from "@/src/data/projects";
import { Github, ExternalLink, Search } from "lucide-react";
import { cn } from "@/src/lib/utils";

export function Projects() {
  const [activeFilter, setActiveFilter] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [visibleCount, setVisibleCount] = useState(6);

  const uniqueCategories = Array.from(new Set(projects.map((p) => p.category)));
  const categoriesWithoutOther = uniqueCategories.filter(c => c !== "Other");
  const hasOther = uniqueCategories.includes("Other");
  const categories = ["All", ...categoriesWithoutOther, ...(hasOther ? ["Other"] : [])];

  const filteredProjects = useMemo(() => {
    return projects.filter((project) => {
      const matchesFilter = activeFilter === "All" || project.category === activeFilter;
      const matchesSearch = project.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                            project.tech.some(t => t.toLowerCase().includes(searchQuery.toLowerCase()));
      return matchesFilter && matchesSearch;
    });
  }, [activeFilter, searchQuery]);

  const visibleProjects = filteredProjects.slice(0, visibleCount);

  return (
    <section id="projects" className="py-24 bg-bg-secondary/30">
      <div className="max-w-7xl mx-auto px-6">
        <SectionTitle title="My Projects" subtitle="Some Projects I've Built" />

        {/* Search and Filter Section */}
        <div className="flex flex-col items-center gap-8 mb-12">
          {/* Search Bar */}
          <div className="relative w-full max-w-md group">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
              <Search className="h-5 w-5 text-text-muted group-focus-within:text-accent-primary transition-colors" />
            </div>
            <input
              type="text"
              placeholder="Search projects by name or tech..."
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                setVisibleCount(6);
              }}
              className="w-full pl-11 pr-4 py-3 rounded-xl bg-bg-tertiary/30 border border-white/10 text-text-primary text-sm focus:outline-none focus:border-accent-primary focus:ring-2 focus:ring-accent-primary/50 focus:shadow-[0_0_15px_rgba(0,210,255,0.2)] transition-all duration-300 placeholder:text-text-muted"
            />
          </div>

          {/* Filter Tabs */}
          <div className="flex flex-wrap items-center justify-center gap-3">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => {
                  setActiveFilter(category);
                  setVisibleCount(6);
                }}
                className={cn(
                  "relative px-6 py-2 rounded-full text-sm font-medium transition-all duration-300 border border-transparent",
                  activeFilter === category ? "text-white" : "bg-bg-tertiary/30 text-text-secondary border-white/5 hover:text-white hover:bg-bg-tertiary/60"
                )}
              >
                {activeFilter === category && (
                  <motion.div
                    layoutId="activeTab"
                    className="absolute inset-0 bg-gradient-hero rounded-full shadow-[0_0_15px_rgba(0,210,255,0.3)]"
                    initial={false}
                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                  />
                )}
                <span className="relative z-10">{category}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Empty State */}
        {filteredProjects.length === 0 && (
          <motion.div 
            initial={{ opacity: 0, y: 20 }} 
            animate={{ opacity: 1, y: 0 }} 
            className="flex flex-col items-center justify-center py-16 text-center"
          >
            <div className="w-20 h-20 rounded-full bg-bg-tertiary/30 border border-white/5 flex items-center justify-center mb-6">
              <Search className="w-8 h-8 text-text-muted" />
            </div>
            <h3 className="text-2xl font-bold text-text-primary mb-3">No projects found</h3>
            <p className="text-text-secondary max-w-md mx-auto">
              We couldn't find any projects matching "{searchQuery}". Try adjusting your search or filter to find what you're looking for.
            </p>
            <button 
              onClick={() => {
                setSearchQuery("");
                setActiveFilter("All");
              }}
              className="mt-8 px-6 py-2 rounded-full bg-bg-tertiary/50 border border-white/10 text-text-primary hover:bg-accent-primary/20 hover:border-accent-primary/50 hover:text-accent-primary transition-all duration-300"
            >
              Clear all filters
            </button>
          </motion.div>
        )}

        {/* Project Grid */}
        <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <AnimatePresence mode="popLayout">
            {visibleProjects.map((project) => (
              <motion.div
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.3 }}
                key={project.id}
                className="glass-card rounded-2xl overflow-hidden group hover:-translate-y-2 hover:shadow-[0_8px_30px_rgba(0,210,255,0.12)] border border-white/5 hover:border-accent-primary/30 transition-all duration-500 flex flex-col h-full relative z-10"
              >
                <div className="relative h-56 overflow-hidden bg-bg-tertiary/30 flex items-center justify-center p-4">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-contain transition-transform duration-700 group-hover:scale-105 relative z-0"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-bg-primary/60 opacity-0 group-hover:opacity-100 transition-all duration-500 flex items-center justify-center gap-6 backdrop-blur-sm z-20">
                    <a
                      href={project.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-12 h-12 rounded-full bg-white/10 border border-white/20 flex items-center justify-center text-white hover:bg-accent-primary hover:border-accent-primary hover:scale-110 hover:shadow-[0_0_20px_rgba(0,210,255,0.4)] transition-all duration-300"
                      aria-label="GitHub Repository"
                    >
                      <Github className="w-5 h-5" />
                    </a>
                    <a
                      href={project.demo}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-12 h-12 rounded-full bg-white/10 border border-white/20 flex items-center justify-center text-white hover:bg-accent-primary hover:border-accent-primary hover:scale-110 hover:shadow-[0_0_20px_rgba(0,210,255,0.4)] transition-all duration-300"
                      aria-label="Live Demo"
                    >
                      <ExternalLink className="w-5 h-5" />
                    </a>
                  </div>
                </div>
                <div className="p-6 flex flex-col flex-grow relative z-20 bg-gradient-to-b from-transparent to-bg-tertiary/20">
                  <h3 className="text-xl font-bold text-text-primary mb-3 group-hover:text-accent-primary transition-colors duration-300">{project.title}</h3>
                  <p className="text-text-secondary text-sm mb-6 flex-grow leading-relaxed text-justify">{project.description}</p>
                  <div className="flex flex-wrap gap-2 mt-auto pt-4 border-t border-white/5">
                    {project.tech.map((tech) => (
                      <span key={tech} className="px-3 py-1 text-[11px] uppercase tracking-wider font-semibold rounded-full bg-accent-primary/5 text-accent-primary border border-accent-primary/20 hover:bg-accent-primary/15 hover:border-accent-primary/50 hover:shadow-[0_0_10px_rgba(0,210,255,0.2)] hover:-translate-y-0.5 transition-all duration-300 cursor-default">
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {/* View More Button */}
        {filteredProjects.length > visibleCount && (
          <div className="mt-12 flex justify-center">
            <button
              onClick={() => setVisibleCount((prev) => prev + 6)}
              className="group relative px-8 py-3 rounded-full font-semibold text-white overflow-hidden transition-all duration-300 hover:scale-105 hover:shadow-[0_0_20px_rgba(0,210,255,0.3)]"
            >
              <div className="absolute inset-0 bg-gradient-hero opacity-80 group-hover:opacity-100 transition-opacity duration-300"></div>
              <div className="absolute inset-[2px] bg-bg-primary rounded-full group-hover:bg-opacity-0 transition-all duration-300"></div>
              <span className="relative z-10 group-hover:text-white transition-colors duration-300">View More</span>
            </button>
          </div>
        )}
      </div>
    </section>
  );
}
