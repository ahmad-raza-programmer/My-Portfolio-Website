import { motion } from "motion/react";
import { SectionTitle } from "./shared/SectionTitle";
import { skills } from "@/src/data/skills";

export function Skills() {
  return (
    <section id="skills" className="py-24 bg-bg-secondary/50">
      <div className="max-w-7xl mx-auto px-6">
        <SectionTitle title="My Skills" subtitle="Technologies I Work With" />

        <div className="space-y-12">
          {skills.map((category, categoryIndex) => (
            <div key={category.category}>
              <motion.h3
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
                className="text-xl font-semibold text-text-primary mb-6"
              >
                {category.category}
              </motion.h3>
              <div className="flex flex-wrap gap-4">
                {category.items.map((skill, index) => (
                  <motion.div
                    key={skill.name}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: index * 0.05 }}
                    className="glass-card px-5 py-3 rounded-xl flex items-center gap-3 hover:border-accent-primary hover:shadow-[0_0_20px_rgba(0,210,255,0.3)] hover:-translate-y-1 transition-all duration-300 cursor-default bg-bg-tertiary/20 hover:bg-bg-tertiary/40"
                  >
                    <span className="text-sm font-medium text-text-primary group-hover:text-accent-primary transition-colors">{skill.name}</span>
                  </motion.div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
