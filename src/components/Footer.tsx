import { personalInfo } from "@/src/data/personalInfo";
import { SocialLinks } from "./shared/SocialLinks";

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-[#080808] border-t border-border-color py-12">
      <div className="max-w-7xl mx-auto px-6 flex flex-col items-center justify-center gap-6">
        <a href="#" className="text-xl md:text-2xl font-display font-bold text-gradient tracking-tight text-center drop-shadow-[0_0_8px_rgba(0,210,255,0.3)]">
          {personalInfo.name}
        </a>
        
        <SocialLinks links={personalInfo} />
        
        <p className="text-text-muted text-sm text-center">
          © {currentYear} {personalInfo.name} - All Rights Reserved.
        </p>
      </div>
    </footer>
  );
}
