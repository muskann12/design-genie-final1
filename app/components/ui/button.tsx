import { ReactNode } from "react";

type CustomButtonProps = {
  children: ReactNode;
  onClick?: () => void;
  className?: string;
};

export default function CustomButton({ children, onClick, className }: CustomButtonProps) {
  return (
    <button
      onClick={onClick}
      className={`p-2 rounded text-white ${className}`}
    >
      {children}
    </button>
  );
}
