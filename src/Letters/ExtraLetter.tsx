export function ExtraLetter({ children }: { children: React.ReactNode }) {
  return (
    <span className="text-red-300 underline font-bold text-2xl">
      {children}
    </span>
  );
}
