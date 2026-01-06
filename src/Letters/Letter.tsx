
export function Letter({
  color,
  children,
}: {
  color: string;
  children: React.ReactNode;
}) {
  return <span style={{color}} className={`font-bold text-2xl`}>{children}</span>

}
