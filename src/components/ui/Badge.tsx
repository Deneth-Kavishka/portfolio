import { cn } from "@/lib/utils";

interface BadgeProps {
  children: React.ReactNode;
  variant?: "default" | "gradient" | "outline";
  className?: string;
}

export default function Badge({
  children,
  variant = "default",
  className,
}: BadgeProps) {
  const variantClasses = {
    default: "bg-white/5 text-text-secondary border border-white/5",
    gradient:
      "bg-gradient-to-r from-primary-500/20 to-accent-500/20 text-primary-300 border border-primary-500/20",
    outline: "bg-transparent border border-primary-500/30 text-primary-400",
  };

  return (
    <span
      className={cn(
        "inline-flex items-center px-3 py-1 rounded-full text-xs font-medium",
        variantClasses[variant],
        className
      )}
    >
      {children}
    </span>
  );
}
