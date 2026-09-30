export function SkipLink() {
  return (
    <a
      href="#main"
      className="sr-only rounded-full bg-primary px-5 py-3 font-medium text-primary-foreground focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-[100] focus:ring-2 focus:ring-ring focus:ring-offset-2 focus:ring-offset-background focus:outline-none"
    >
      Skip to content
    </a>
  );
}
