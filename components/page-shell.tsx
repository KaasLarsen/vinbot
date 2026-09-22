import type { ReactNode } from "react";

/** Wide content max width in rem — keep in sync with skyscraper rail math. */
export const CONTENT_MAX_REM = 90;

type PageShellProps = {
  children: ReactNode;
  className?: string;
  as?: "div" | "article";
  /**
   * Kept for call-site compatibility. Both variants use the same content width
   * so navigating hubs → articles (e.g. regioner → dybdeguides) does not jump.
   */
  variant?: "wide" | "article";
};

export function PageShell({
  children,
  className,
  as: Tag = "div",
  variant: _variant = "wide",
}: PageShellProps) {
  void _variant;
  return (
    <Tag
      className={["mx-auto w-full max-w-[90rem] px-4 sm:px-6", className]
        .filter(Boolean)
        .join(" ")}
    >
      {children}
    </Tag>
  );
}
