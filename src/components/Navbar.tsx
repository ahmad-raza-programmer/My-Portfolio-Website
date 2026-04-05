import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import { useScrollPosition } from "@/src/hooks/useScrollPosition";
import { cn } from "@/src/lib/utils";
import { Button } from "./shared/Button";
import { personalInfo } from "@/src/data/personalInfo";

const NAV_LINKS = [
  { name: "About", href: "#about" },
  { name: "Skills", href: "#skills" },
  { name: "Experience", href: "#experience" },
  { name: "Projects", href: "#projects" },
  { name: "Contact", href: "#contact" },
];

export function Navbar() {
  const scrollPosition = useScrollPosition();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("");

  const isScrolled = scrollPosition > 80;

  useEffect(() => {
    const handleScroll = () => {
      const sections = NAV_LINKS.map(link => link.href.substring(1));
      let current = "";
      for (const section of sections) {
        const element = document.getElementById(section);
        if (element && window.scrollY >= element.offsetTop - 100) {
          current = section;
        }
      }
      setActiveSection(current);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
        isScrolled ? "bg-bg-primary/95 backdrop-blur-md py-4 shadow-lg border-b border-white/5" : "bg-transparent py-6"
      )}
    >
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
        <a href="#" className="text-xl md:text-2xl font-display font-bold text-gradient tracking-tight whitespace-nowrap truncate mr-4">
          {personalInfo.name}
        </a>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-8">
          <ul className="flex items-center gap-8">
            {NAV_LINKS.map((link) => (
              <li key={link.name}>
                <a
                  href={link.href}
                  className={cn(
                    "text-sm font-medium transition-colors hover:text-accent-primary relative group",
                    activeSection === link.href.substring(1) ? "text-accent-primary drop-shadow-[0_0_8px_rgba(0,210,255,0.5)]" : "text-text-primary"
                  )}
                >
                  {link.name}
                  <span className={cn(
                    "absolute -bottom-1 left-0 w-full h-0.5 bg-accent-primary transform origin-center transition-transform duration-300 shadow-[0_0_8px_rgba(0,210,255,0.5)]",
                    activeSection === link.href.substring(1) ? "scale-x-100" : "scale-x-0 group-hover:scale-x-100"
                  )} />
                </a>
              </li>
            ))}
          </ul>
          <Button variant="outlined" href={personalInfo.resumeUrl} className="px-6 py-2 text-sm">
            Resume
          </Button>
        </div>

        {/* Mobile Menu Toggle */}
        <button
          className="md:hidden text-text-primary relative z-50"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          aria-label="Toggle menu"
        >
          {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Nav Overlay */}
      <div
        className={cn(
          "fixed inset-0 bg-bg-primary/98 backdrop-blur-xl z-40 flex flex-col overflow-y-auto transition-all duration-300 md:hidden",
          isMobileMenuOpen ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-full pointer-events-none"
        )}
      >
        <div className="flex flex-col items-center justify-center min-h-full py-24 px-6">
          <ul className="flex flex-col items-center gap-8">
            {NAV_LINKS.map((link) => (
              <li key={link.name}>
                <a
                  href={link.href}
                  className="text-2xl font-medium text-text-primary hover:text-accent-primary transition-colors"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {link.name}
                </a>
              </li>
            ))}
            <li>
              <Button variant="outlined" href={personalInfo.resumeUrl} className="mt-4" onClick={() => setIsMobileMenuOpen(false)}>
                Resume
              </Button>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}
