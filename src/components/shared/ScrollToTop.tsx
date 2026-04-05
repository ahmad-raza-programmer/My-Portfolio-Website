import { ArrowUp } from "lucide-react";
import { useScrollPosition } from "@/src/hooks/useScrollPosition";
import { cn } from "@/src/lib/utils";

export function ScrollToTop() {
  const scrollPosition = useScrollPosition();
  const isVisible = scrollPosition > 300;

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <button
      onClick={scrollToTop}
      className={cn(
        "fixed bottom-4 right-4 md:bottom-8 md:right-8 w-10 h-10 md:w-12 md:h-12 bg-accent-primary text-white rounded-full flex items-center justify-center shadow-[0_0_20px_rgba(0,210,255,0.4)] transition-all duration-300 z-50 hover:scale-110",
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10 pointer-events-none"
      )}
      aria-label="Scroll to top"
    >
      <ArrowUp className="w-6 h-6" />
    </button>
  );
}
