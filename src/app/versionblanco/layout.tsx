import type { ReactNode } from "react";

export default function VersionBlancoLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <div className="theme-light flex-1 flex flex-col bg-background text-foreground">
      {children}
    </div>
  );
}
