export function Slash({ className = "mb-7" }: { className?: string }) {
  return (
    <div className={`flex gap-1 ${className}`} aria-hidden="true">
      <i className="h-2.5 w-7 -skew-x-14 bg-green" />
      <i className="h-2.5 w-7 -skew-x-14 bg-green/30" />
    </div>
  );
}
