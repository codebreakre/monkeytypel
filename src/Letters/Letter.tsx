export function Letter({
  color,
  children,
}: {
  color: string;
  children: React.ReactNode;
}) {
  return (
    <span className={`text-${color}}-500 font-bold text-2xl`}>{children}</span>
  );
}
