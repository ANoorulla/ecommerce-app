import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import clsx from "clsx";
import { ButtonHTMLAttributes, forwardRef } from "react";
import styles from "./button.module.scss";

const buttonVariants = cva(styles.base, {
  variants: {
    variant: {
      default: styles.variant__default,
      destructive: styles.variant__destructive,
      outline: styles.variant__outline,
      secondary: styles.variant__secondary,
      ghost: styles.variant__ghost,
      link: styles.variant__link,
    },
    size: {
      default: styles.size__default,
      sm: styles.size__small,
      lg: styles.size__large,
      icon: styles.size__icon,
    },
  },
  defaultVariants: {
    variant: "default",
    size: "default",
  },
});

export interface ButtonProps
  extends ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return (
      <Comp
        className={clsx(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    );
  }
);
Button.displayName = "Button";

export { Button, buttonVariants };
