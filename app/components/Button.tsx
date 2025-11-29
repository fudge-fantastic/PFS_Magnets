import { forwardRef } from "react";
import { clsx } from "clsx";
import { cva, type VariantProps } from "class-variance-authority";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 rounded-full font-medium transition-all duration-300 transform-gpu focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-rose-400 focus-visible:ring-offset-2 focus-visible:ring-offset-beige-50 disabled:opacity-50 disabled:cursor-not-allowed disabled:pointer-events-none hover:scale-[1.02] shadow-soft hover:shadow-soft-lg",
  {
    variants: {
      variant: {
        primary: "bg-gradient-to-r from-rose-400 to-rose-500 text-white hover:from-rose-500 hover:to-rose-600",
        secondary: "bg-white/80 text-neutral-700 border border-beige-200 hover:border-rose-200 hover:bg-beige-50",
        outline: "border-2 border-neutral-300 text-neutral-700 hover:border-rose-400 hover:bg-rose-50/50",
        ghost: "hover:bg-rose-50/50 text-neutral-700",
        destructive: "bg-gradient-to-r from-red-400 to-red-500 text-white hover:from-red-500 hover:to-red-600",
      },
      size: {
        sm: "px-4 py-2 text-sm",
        md: "px-6 py-3 text-base",
        lg: "px-8 py-4 text-lg",
        xl: "px-10 py-5 text-xl",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "md",
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    return (
      <button
        className={clsx(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    );
  }
);

Button.displayName = "Button";

export { Button, buttonVariants };
