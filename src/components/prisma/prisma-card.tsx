import type { ComponentProps } from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";

interface PrismaCardProps extends ComponentProps<typeof Card> {
  variant?: "glass" | "solid" | "gradient";
  glow?: "cyan" | "purple" | "pink" | "none";
}

export function PrismaCard({
  className,
  variant = "glass",
  glow = "none",
  ...props
}: PrismaCardProps) {
  return (
    <Card
      className={cn(
        // Remove ALL default card styles
        "[&]:border-0 [&]:bg-transparent [&]:shadow-none",
        // Force remove any background or border from shadcn
        "[&]:!bg-transparent [&]:!border-transparent",
        // Apply Prisma styles based on variant with higher specificity
        variant === "glass" && "[&]:!bg-white/5 [&]:!backdrop-blur-[10px] [&]:!border [&]:!border-white/10 hover:[&]:!bg-white/[0.08] hover:[&]:!border-white/20 hover:[&]:!shadow-lg",
        variant === "gradient" && "prisma-gradient-subtle",
        variant === "solid" && "bg-card border border-border",
        // Apply glow effects
        glow === "cyan" && "prisma-glow-cyan-hover",
        glow === "purple" && "prisma-glow-purple-hover",
        glow === "pink" && "prisma-glow-pink-hover",
        // Prisma border radius and transitions
        "rounded-2xl overflow-hidden transition-all duration-200",
        className
      )}
      {...props}
    />
  );
}

// Re-export card sub-components for convenience
export {
  CardContent as PrismaCardContent,
  CardDescription as PrismaCardDescription,
  CardFooter as PrismaCardFooter,
  CardHeader as PrismaCardHeader,
  CardTitle as PrismaCardTitle,
};
