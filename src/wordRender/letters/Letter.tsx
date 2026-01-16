import type { PropsWithChildren } from "react";

interface LetterProps extends PropsWithChildren {
  className?: string;
}

export function Letter({
  className = '',
  children,
}: LetterProps) {
  return (
    <span className={` ${className}`}>
      {children}
    </span>
  )
}
