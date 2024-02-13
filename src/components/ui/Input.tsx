import * as React from "react";
import { cn } from "@/lib/utils";

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
}

interface IconWrapperProps extends React.HTMLAttributes<HTMLDivElement> {
  side?: "left" | "right";
  children: React.ReactNode;
}

const IconWrapper: React.FC<IconWrapperProps> = ({
  side = "left",
  children,
  className,
  ...props
}) => {
  return (
    <div
      className={cn(
        className,
        side === "left" ? "left-3" : "right-3",
        "absolute top-0 flex items-center justify-center h-full pointer-events-none",
      )}
      {...props}
    >
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
    disabled,
    ...props
  }, ref) => {
    return (
      <div className={cn("relative", disabled && "cursor-not-allowed [&>*]:!cursor-not-allowed [&>*]:!pointer-events-none")}>
        {
          leftIcon
            ? <IconWrapper className={cn(disabled && "opacity-50")}>
                {leftIcon}
              </IconWrapper>
            : null
        }
        <input
          type={type}
          className={cn(
            "flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50",
            leftIcon && "pl-10",
            rightIcon && "pr-10",
            className,
          )}
          disabled={disabled}
          ref={ref}
          {...props}
        />
        {
          rightIcon
            ? <IconWrapper side="right" className={cn(disabled && "opacity-50")}>
                {rightIcon}
              </IconWrapper>
            : null
        }
      </div>
    );
  }
);

Input.displayName = "Input";

export { Input };
