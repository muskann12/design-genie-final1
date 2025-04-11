import { motion } from "framer-motion";
import { cn } from "@/lib/utils"; // If you have a utility function for classNames

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary";
}

export const Button = ({ className, variant = "primary", ...props }: ButtonProps) => {
  return (
    <motion.button
      whileTap={{ scale: 0.95 }}
      className={cn(
        "px-4 py-2 rounded-lg font-semibold transition-all",
        variant === "primary" ? "bg-blue-600 text-white hover:bg-blue-700" : "bg-gray-200 text-gray-800 hover:bg-gray-300",
        className
      )}
      {...(props as any)} // ✅ Fix TypeScript Issue
    />
  );
};
