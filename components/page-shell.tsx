import type { ReactNode } from "react";

type PageShellProps = {
  children: ReactNode;
  className?: string;
  as?: "div" | "article";
  /** `article` = reading column (~42rem). Default stays full hub/katalog width. */
  variant?: "wide" | "article";
};

export function PageShell({
  children,
  className,
  as: Tag = "div",
  variant = "wide",
}: PageShellProps) {
  const maxWidth = variant === "article" ? "max-w-3xl" : "max-w-[90rem]";
  return (
    <Tag
      className={["mx-auto w-full px-4 sm:px-6", maxWidth, className]
        .filter(Boolean)
        .join(" ")}
    >
      {children}
    </Tag>
  );
}
