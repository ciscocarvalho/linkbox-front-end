import * as React from "react";
import { cn } from "@/lib/utils";

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
}

interface IconWrapperProps {
  side?: "left" | "right";
  children: React.ReactNode;
}

const IconWrapper: React.FC<IconWrapperProps> = ({
  side = "left",
  children,
}) => {
  return (
    <div className={cn(
      side === "left" ? "left-3" : "right-3",
      "absolute top-0 flex items-center justify-center h-full pointer-events-none"
    )}>
      {children}
    </div>
  );
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({
    className,
    type,
    leftIcon,
    rightIcon,
    ...props
  }, ref) => {
    return (
      <div className={cn("relative")}>
        {leftIcon && <IconWrapper>{leftIcon}</IconWrapper>}
        <input
          type={type}
          className={cn(
            "flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50",
            leftIcon && "pl-10",
            rightIcon && "pr-10",
            className,
          )}
          ref={ref}
          {...props}
        />
        {rightIcon && <IconWrapper side="right">{rightIcon}</IconWrapper>}
      </div>
    );
  }
);

Input.displayName = "Input";

export { Input };
