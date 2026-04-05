import { motion } from "motion/react";
import { SectionTitle } from "./shared/SectionTitle";
import { personalInfo } from "@/src/data/personalInfo";
import { Button } from "./shared/Button";
import { Download, Mail, Briefcase } from "lucide-react";

export function About() {
  return (
    <section id="about" className="py-24 max-w-7xl mx-auto px-6">
      <SectionTitle title="About Me" subtitle="Get To Know Me!" />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.7 }}
          className="relative flex justify-center"
        >
          <div className="relative w-72 h-72 md:w-96 md:h-96 rounded-2xl p-2 bg-gradient-hero shadow-[0_0_30px_rgba(0,210,255,0.2)] hover:shadow-[0_0_40px_rgba(0,210,255,0.4)] transition-shadow duration-500">
            <div className="w-full h-full rounded-xl overflow-hidden bg-bg-secondary">
              <img
                src="/profile.png"
                alt={personalInfo.name}
                className="w-full h-full object-cover object-top"
                referrerPolicy="no-referrer"
              />
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.7 }}
          className="text-[15px]"
        >
          <h3 className="text-2xl font-bold text-text-primary mb-4">
            Who am I?
          </h3>
          <p className="text-text-secondary mb-6 leading-relaxed text-justify">
            {personalInfo.bio}
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
            <div className="flex items-center gap-3 text-text-secondary">
              <Mail className="w-5 h-5 text-accent-primary" />
              <a href={`mailto:${personalInfo.email}`} className="hover:text-accent-primary transition-colors">
                {personalInfo.email}
              </a>
            </div>
            <div className="flex items-center gap-3 text-text-secondary">
              <Briefcase className="w-5 h-5 text-accent-primary" />
              <span>{personalInfo.availability}</span>
            </div>
          </div>

          <Button href={personalInfo.resumeUrl} variant="outlined" className="gap-2">
            <Download className="w-4 h-4" />
            Download Resume
          </Button>
        </motion.div>
      </div>
    </section>
  );
}
