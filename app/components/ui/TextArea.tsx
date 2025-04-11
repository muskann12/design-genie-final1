import React from "react";
import { cn } from "@/lib/utils";

interface TextAreaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  error?: string;
}

interface TextAreaLabelProps {
  label?: string;
  description?: string;
  error?: string;
  htmlFor?: string;
}

const TextAreaLabel: React.FC<TextAreaLabelProps> = ({ label, description, error, htmlFor }) => {
  return (
    <div className="space-y-1">
      {label && (
        <label htmlFor={htmlFor} className="block text-sm font-medium text-gray-700">
          {label}
        </label>
      )}
      {description && !error && <p className="text-sm text-muted-foreground">{description}</p>}
      {error && <p className="text-sm text-red-500">{error}</p>}
    </div>
  );
};

const TextAreaInput = React.forwardRef<HTMLTextAreaElement, TextAreaProps>(({ className, error, ...props }, ref) => {
  return (
    <textarea
      ref={ref}
      className={cn("p-2 border rounded-md w-full", error && "border-red-500 focus-visible:ring-red-500", className)}
      {...props}
    />
  );
});

TextAreaInput.displayName = "TextAreaInput";

export { TextAreaLabel, TextAreaInput };