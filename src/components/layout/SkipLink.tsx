export function SkipLink({ label }: { label: string }) {
  return (
    <a
      href="#main"
      className="sr-only focus:not-sr-only focus:absolute focus:z-[100] focus:m-3 focus:rounded-control focus:bg-navy focus:px-4 focus:py-2 focus:text-white"
    >
      {label}
    </a>
  );
}
