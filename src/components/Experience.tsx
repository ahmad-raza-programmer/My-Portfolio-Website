import { motion } from "motion/react";
import { SectionTitle } from "./shared/SectionTitle";
import { experience } from "@/src/data/experience";
import { Briefcase } from "lucide-react";
import { cn } from "@/src/lib/utils";

export function Experience() {
  return (
    <section id="experience" className="py-24 max-w-7xl mx-auto px-6">
      <SectionTitle title="Work Experience" subtitle="My Professional Journey" />

      <div className="relative mt-12">
        {/* Timeline bar */}
        <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-accent-primary to-accent-secondary -translate-x-1/2" />

        <div className="space-y-12">
          {experience.map((exp, index) => {
            const isEven = index % 2 === 0;
            return (
              <div key={exp.id} className="relative flex flex-col md:flex-row items-center justify-between w-full">
                {/* Timeline node */}
                <div className="absolute left-4 md:left-1/2 w-4 h-4 rounded-full bg-accent-primary border-2 border-bg-primary -translate-x-1/2 z-10 shadow-[0_0_10px_rgba(0,210,255,0.8)]" />

                {/* Content Card */}
                <motion.div
                  initial={{ opacity: 0, x: isEven ? -50 : 50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className={cn(
                    "w-full md:w-[calc(50%-2rem)] pl-12 md:pl-0",
                    isEven ? "md:pr-12 md:text-right" : "md:ml-auto md:pl-12 text-left"
                  )}
                >
                  <div className="glass-card p-4 sm:p-6 rounded-2xl hover:shadow-[0_16px_48px_rgba(0,210,255,0.15)] hover:-translate-y-1 hover:border-accent-primary/30 transition-all duration-300 group">
                    <div className={cn("flex items-center gap-3 sm:gap-4 mb-4", isEven ? "md:flex-row-reverse" : "")}>
                      <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-bg-tertiary flex items-center justify-center shrink-0">
                        <Briefcase className="w-5 h-5 sm:w-6 sm:h-6 text-accent-primary" />
                      </div>
                      <div>
                        <h3 className="text-[15px] font-bold text-text-primary">{exp.company}</h3>
                        <p className="text-accent-primary font-medium text-[12px]">{exp.role}</p>
                      </div>
                    </div>
                    
                    <div className={cn("flex flex-col sm:flex-row items-start sm:items-center gap-2 sm:gap-4 text-[13px] text-text-muted mb-4", isEven ? "md:justify-end" : "justify-start")}>
                      <span>{exp.duration}</span>
                      <span className="hidden sm:block">•</span>
                      <span>{exp.location}</span>
                    </div>

                    <ul className={cn("space-y-2 text-text-secondary text-sm mb-6 list-disc pl-5 text-justify", isEven ? "md:pl-0 md:list-none" : "")}>
                      {exp.description.map((desc, i) => (
                        <li key={i} className={cn(isEven ? "md:relative md:pr-4" : "")}>
                          {isEven && <span className="hidden md:block absolute right-0 top-2 w-1.5 h-1.5 rounded-full bg-accent-primary" />}
                          {desc}
                        </li>
                      ))}
                    </ul>

                    <div className={cn("flex flex-wrap gap-2", isEven ? "md:justify-end" : "justify-start")}>
                      {exp.tech.map((tech) => (
                        <span key={tech} className="px-3 py-1 text-xs font-medium rounded-full bg-bg-tertiary text-text-primary border border-border-color">
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                </motion.div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
