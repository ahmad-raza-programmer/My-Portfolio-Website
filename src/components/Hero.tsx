import { useCallback, useEffect, useState } from "react";
import Particles from "react-tsparticles";
import { loadSlim } from "tsparticles-slim";
import type { Engine } from "tsparticles-engine";
import { TypeAnimation } from "react-type-animation";
import { motion } from "motion/react";
import { ChevronDown } from "lucide-react";
import { personalInfo } from "@/src/data/personalInfo";
import { Button } from "./shared/Button";
import { SocialLinks } from "./shared/SocialLinks";
import { useScrollPosition } from "@/src/hooks/useScrollPosition";

export function Hero() {
  const scrollPosition = useScrollPosition();
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const particlesInit = useCallback(async (engine: Engine) => {
    await loadSlim(engine);
  }, []);

  const typeSequence = personalInfo.roles.flatMap((role) => [role, 2000]);

  return (
    <section id="home" className="relative h-screen flex items-center justify-center overflow-hidden">
      <Particles
        id="tsparticles"
        init={particlesInit}
        options={{
          background: { color: { value: "transparent" } },
          fpsLimit: 60,
          interactivity: {
            events: {
              onHover: { enable: true, mode: "repulse" },
              resize: true,
            },
            modes: {
              repulse: { distance: 100, duration: 0.4 },
            },
          },
          particles: {
            color: { value: ["#00d2ff", "#7928ca"] },
            links: {
              color: "#ffffff",
              distance: 150,
              enable: true,
              opacity: 0.2,
              width: 1,
            },
            move: {
              direction: "none",
              enable: true,
              outModes: { default: "bounce" },
              random: false,
              speed: 1,
              straight: false,
            },
            number: {
              density: { enable: true, area: 800 },
              value: isMobile ? 30 : 60,
            },
            opacity: { value: 0.5 },
            shape: { type: "circle" },
            size: { value: { min: 1, max: 3 } },
          },
          detectRetina: true,
        }}
        className="absolute inset-0 z-0"
      />

      <div className="relative z-10 max-w-7xl mx-auto px-6 w-full flex flex-col items-center md:items-start text-center md:text-left pt-2 md:pt-6">
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-text-muted text-[17px] md:text-lg mb-2"
        >
          Hi There, I Am
        </motion.p>
        
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="text-[34px] sm:text-5xl md:text-7xl lg:text-8xl font-bold text-gradient mb-4 drop-shadow-[0_0_15px_rgba(0,210,255,0.3)]"
        >
          {personalInfo.name}
        </motion.h1>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="text-[19px] sm:text-2xl md:text-3xl lg:text-4xl font-semibold text-text-primary mb-6 min-h-[3rem] md:min-h-[4rem]"
        >
          <TypeAnimation
            sequence={typeSequence}
            wrapper="span"
            speed={50}
            repeat={Infinity}
            cursor={true}
            className="text-accent-primary"
          />
        </motion.div>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.6 }}
          className="text-text-secondary max-w-2xl text-[13px] md:text-lg mb-10 text-justify"
        >
          {personalInfo.bio}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.8 }}
          className="flex flex-wrap items-center justify-center md:justify-start gap-4 mb-10"
        >
          <Button href="#projects" variant="primary" className="text-[15px] hover:shadow-[0_0_20px_rgba(0,210,255,0.4)] transition-shadow duration-300">
            View Projects
          </Button>
          <Button href="#contact" variant="outlined" className="text-[15px] hover:shadow-[0_0_20px_rgba(121,40,202,0.4)] transition-shadow duration-300">
            Contact Me
          </Button>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 1 }}
        >
          <SocialLinks links={personalInfo} />
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: scrollPosition < 100 ? 1 : 0 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center text-text-muted animate-bounce leading-[22px] mt-0 pt-0"
      >
        <span className="text-sm mb-2">Scroll Down</span>
        <ChevronDown className="w-5 h-5" />
      </motion.div>
    </section>
  );
}
