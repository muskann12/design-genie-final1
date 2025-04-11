// components/ui/CardContent.tsx
import { ReactNode } from "react";

interface CardContentProps {
  children: ReactNode;
}

export function CardContent({ children }: CardContentProps) {
  return <div className="p-4">{children}</div>;
}
