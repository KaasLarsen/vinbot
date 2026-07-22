import type { ReactNode } from "react";

/** Content column max width in rem — keep in sync with skyscraper rail math. */
export const CONTENT_MAX_REM = 90;

type PageShellProps = {
  children: ReactNode;
  className?: string;
  as?: "div" | "article";
};

export function PageShell({ children, className, as: Tag = "div" }: PageShellProps) {
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
