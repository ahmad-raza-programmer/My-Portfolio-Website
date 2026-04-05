import { cn } from "@/src/lib/utils";
import React from "react";

export type ButtonProps = React.ComponentProps<"button"> & {
  variant?: "primary" | "secondary" | "outlined";
  href?: string;
};

export function Button({ variant = "primary", className, children, href, ...props }: ButtonProps) {
  const baseStyles = "inline-flex items-center justify-center px-6 py-3 font-semibold transition-all duration-200 hover:scale-105 active:scale-95";
  
  const variants = {
    primary: "bg-gradient-hero text-white rounded-xl hover:shadow-[0_0_20px_rgba(0,210,255,0.4)]",
    secondary: "bg-bg-secondary text-white rounded-xl hover:bg-bg-tertiary",
    outlined: "border-2 border-accent-primary text-accent-primary rounded-full hover:bg-accent-primary hover:text-white hover:shadow-[0_0_20px_rgba(0,210,255,0.4)]"
  };

  const classes = cn(baseStyles, variants[variant], className);

  if (href) {
    const isExternal = href.startsWith("http") || href.startsWith("//");
    const isPdf = href.split("?")[0].toLowerCase().endsWith(".pdf");
    const target = isExternal || isPdf ? "_blank" : undefined;
    const rel = target === "_blank" ? "noopener noreferrer" : undefined;

    return (
      <a href={href} className={classes} target={target} rel={rel} {...(props as any)}>
        {children}
      </a>
    );
  }

  return (
    <button className={classes} {...props}>
      {children}
    </button>
  );
}
