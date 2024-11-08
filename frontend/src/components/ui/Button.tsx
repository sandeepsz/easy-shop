// Button.tsx

import { FC, ReactNode } from "react";
import { cva, VariantProps } from "class-variance-authority";
import { cn } from "./../../lib/utils";

// Define button styles with CVA
const buttonStyles = cva(
  "flex justify-center items-center font-medium transition duration-150 ease-in-out  disabled:opacity-50",
  {
    variants: {
      variant: {
        default:
          "bg-emerald-600 hover:bg-emerald-700 text-white border-transparent focus:ring-emerald-500",
        destructive:
          "bg-red-600 hover:bg-red-700 text-white border-transparent focus:ring-red-500",
        secondary:
          "bg-gray-700 hover:bg-gray-600 text-white border-transparent focus:ring-gray-500",
      },
      size: {
        sm: "px-2 py-1 text-sm",
        md: "px-4 py-2 text-base",
        lg: "px-6 py-3 text-lg",
      },
      rounded: {
        none: "rounded-none",
        sm: "rounded-sm",
        md: "rounded-md",
        full: "rounded-full",
      },
      width: {
        auto: "w-auto",
        full: "w-full",
        half: "w-1/2",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "md",
      rounded: "md",
    },
  }
);

interface ButtonProps extends VariantProps<typeof buttonStyles> {
  onClick?: () => void;
  children: ReactNode;
  icon?: ReactNode;
  type?: "button" | "submit" | "reset";
  disabled?: boolean;
  className?: string;
}

const Button: FC<ButtonProps> = ({
  onClick,
  children,
  icon,
  type = "button",
  variant,
  size,
  rounded,
  disabled,
  width,
  className,
}) => (
  <button
    className={cn(buttonStyles({ variant, size, rounded, width }), className)}
    onClick={onClick}
    type={type}
    disabled={disabled}
  >
    {icon && <span className="mr-2">{icon}</span>}
    {children}
  </button>
);

export default Button;
