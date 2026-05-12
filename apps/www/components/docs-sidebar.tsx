"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { docsNav, type RouteItem } from "@/lib/docs-nav";
import { ChevronRight } from "lucide-react";
import { useState } from "react";

export function DocsSidebar() {
  const pathname = usePathname();

  return (
    <nav className="w-full">
      <SidebarRouteTree routes={docsNav.routes} pathname={pathname} />
    </nav>
  );
}

interface SidebarRouteTreeProps {
  routes: RouteItem[];
  pathname: string;
  level?: number;
}

function SidebarRouteTree({
  routes,
  pathname,
  level = 0,
}: SidebarRouteTreeProps) {
  return (
    <div className="space-y-0.5">
      {routes.map((route, index) => {
        if (route.hasSectionHeader) {
          return (
            <div
              key={`section-${index}`}
              className={cn("mb-1 px-2 pb-1 pt-5", index === 0 && "pt-1")}
            >
              <span className="font-mono text-[10px] font-bold uppercase tracking-widest text-green-600 dark:text-green-500">
                {"// "}
                {route.sectionHeader}
              </span>
            </div>
          );
        }

        return (
          <SidebarRoute
            key={route.path || index}
            route={route}
            pathname={pathname}
            level={level}
          />
        );
      })}
    </div>
  );
}

interface SidebarRouteProps {
  route: RouteItem;
  pathname: string;
  level: number;
}

function SidebarRoute({ route, pathname, level }: SidebarRouteProps) {
  const hasChildren = route.routes && route.routes.length > 0;
  const isActive = pathname === route.path;
  const isOpen = pathname.startsWith(route.path || "");

  const [isExpanded, setIsExpanded] = useState(isOpen);

  if (hasChildren) {
    return (
      <div className="space-y-0.5">
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className={cn(
            "flex w-full items-center justify-between rounded-md px-2 py-1.5 text-sm transition-colors",
            "hover:bg-green-500/5 hover:text-green-600 dark:hover:text-green-400",
            isActive &&
              "border-l-2 border-green-500 bg-gradient-to-r from-green-500/10 via-green-500/5 to-transparent pl-[6px] font-medium text-green-600 dark:border-green-400 dark:text-green-400",
            !isActive && "text-muted-foreground",
            level > 0 && "pl-4",
          )}
        >
          <span>{route.title}</span>
          <ChevronRight
            className={cn(
              "h-4 w-4 transition-transform",
              isExpanded && "rotate-90",
            )}
          />
        </button>

        {isExpanded && route.routes && (
          <div className={cn("ml-0 space-y-0.5", level === 0 && "ml-2")}>
            <SidebarRouteTree
              routes={route.routes}
              pathname={pathname}
              level={level + 1}
            />
          </div>
        )}
      </div>
    );
  }

  return (
    <Link
      href={route.path || "#"}
      className={cn(
        "block rounded-md px-2 py-1.5 text-sm transition-all duration-150",
        isActive
          ? "border-l-2 border-green-500 bg-gradient-to-r from-green-500/10 via-green-500/5 to-transparent pl-[6px] font-medium text-green-600 shadow-[0_0_12px_rgba(34,197,94,0.15)] dark:border-green-400 dark:text-green-400"
          : "text-muted-foreground hover:bg-green-500/5 hover:text-green-600 dark:hover:text-green-400",
        level > 0 && !isActive && "pl-4",
        level > 0 && isActive && "pl-[14px]",
      )}
    >
      {route.title}
    </Link>
  );
}
