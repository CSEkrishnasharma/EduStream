import React, { useState } from "react";
import { cn } from "@/lib/utils";

interface BackgroundGlowProps {
  children: React.ReactNode;
  className?: string;
}

export const BackgroundGlow = ({ children, className }: BackgroundGlowProps) => {
  // Kept from the original snippet
  const [count, setCount] = useState(0);

  return (
    <div className={cn("min-h-screen w-full relative bg-background overflow-hidden", className)}>
      {/* Soft Yellow Glow (from background-components.tsx) */}
      <div
        className="absolute inset-0 z-0 pointer-events-none"
        style={{
          backgroundImage: `
            radial-gradient(circle at 30% 40%, rgba(255, 249, 145, 0.15) 0%, transparent 70%)
          `,
          mixBlendMode: "multiply",
        }}
      />
      
      {/* Teal Glow Right (from demo.tsx) */}
      <div
        className="absolute inset-0 z-0 pointer-events-none"
        style={{
          backgroundImage: `
            radial-gradient(
              circle at top right,
              rgba(56, 193, 182, 0.25),
              transparent 70%
            )
          `,
          filter: "blur(80px)",
          backgroundRepeat: "no-repeat",
        }}
      />
      
      {/* Your Content/Components */}
      <div className="relative z-10 w-full h-full">
        {children}
      </div>
    </div>
  );
};

export default BackgroundGlow;
