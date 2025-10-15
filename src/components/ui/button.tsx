import type { ComponentProps } from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-all disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive",
  {
    variants: {
      variant: {
        default:
          "bg-primary text-primary-foreground shadow-xs hover:bg-primary/90",
        destructive:
          "bg-destructive text-white shadow-xs hover:bg-destructive/90 focus-visible:ring-destructive/20 dark:focus-visible:ring-destructive/40 dark:bg-destructive/60",
        outline:
          "border bg-background shadow-xs hover:bg-accent hover:text-accent-foreground dark:bg-input/30 dark:border-input dark:hover:bg-input/50",
        secondary:
          "bg-secondary text-secondary-foreground shadow-xs hover:bg-secondary/80",
        ghost:
          "hover:bg-accent hover:text-accent-foreground dark:hover:bg-accent/50",
        link: "text-primary underline-offset-4 hover:underline",
        // Simplified Action Variants
        create:
          "bg-[hsl(var(--create))] text-[hsl(var(--create-foreground))] shadow-xs hover:bg-[hsl(var(--create))]/90 focus-visible:ring-[hsl(var(--create))]/20",
        // Prisma Design System Variants
        "prisma-primary":
          "bg-[#47FFBF] text-black hover:bg-[#6FFFCF] hover:shadow-[0_0_20px_rgba(71,255,191,0.5)] transition-all duration-200 font-semibold",
        "prisma-premium":
          "bg-[#8376FF] text-white hover:bg-[#9B8FFF] hover:shadow-[0_0_20px_rgba(131,118,255,0.5)] transition-all duration-200 font-semibold",
        "prisma-enterprise":
          "bg-[#FF48C7] text-white hover:bg-[#FF6AD5] hover:shadow-[0_0_20px_rgba(255,72,199,0.5)] transition-all duration-200 font-semibold",
        "prisma-glass":
          "prisma-glass text-white hover:bg-white/10 border-white/20 hover:border-white/30 transition-all duration-200",
        "prisma-gradient":
          "prisma-gradient text-white hover:opacity-90 transition-all duration-200 font-semibold shadow-lg",
      },
      size: {
        default: "h-9 px-4 py-2 has-[>svg]:px-3",
        sm: "h-8 rounded-md gap-1.5 px-3 has-[>svg]:px-2.5",
        lg: "h-10 rounded-md px-6 has-[>svg]:px-4",
        icon: "size-9",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
);

function Button({
  className,
  variant,
  size,
  asChild = false,
  ...props
}: ComponentProps<"button"> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean;
  }) {
  const Comp = asChild ? Slot : "button";

  return (
    <Comp
      data-slot="button"
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    />
  );
}

export { Button, buttonVariants };
