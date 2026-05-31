"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { ChevronRight } from "lucide-react";
import { getSidebarByPath, type RouteItem } from "@/config/sidebars";

export function DynamicSidebar() {
  const pathname = usePathname();
  const sidebar = getSidebarByPath(pathname);

  // Determine if we're in the /components section (not /docs/components)
  const isComponentsSection =
    pathname.startsWith("/components") &&
    !pathname.startsWith("/docs/components");

  return (
    <nav className="w-full">
      <SidebarRouteTree
        routes={sidebar.routes}
        pathname={pathname}
        pathPrefix={isComponentsSection ? "/components" : "/docs"}
      />
    </nav>
  );
}

interface SidebarRouteTreeProps {
  routes: RouteItem[];
  pathname: string;
  level?: number;
  pathPrefix?: string;
}

function SidebarRouteTree({
  routes,
  pathname,
  level = 0,
  pathPrefix = "/docs",
}: SidebarRouteTreeProps) {
  return (
    <div className="space-y-1">
      {routes.map((route, index) => {
        if (route.hasSectionHeader) {
          return (
            <div
              key={`section-${route.sectionHeader}-${index}`}
              className={cn(
                "pb-1 pt-6 text-[10px] font-semibold uppercase tracking-widest text-foreground/40",
                index === 0 && "pt-2",
              )}
            >
              {route.sectionHeader}
            </div>
          );
        }

        return (
          <SidebarRoute
            key={route.path || `route-${index}`}
            route={route}
            pathname={pathname}
            level={level}
            pathPrefix={pathPrefix}
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
  pathPrefix?: string;
}

function SidebarRoute({
  route,
  pathname,
  level,
  pathPrefix = "/docs",
}: SidebarRouteProps) {
  const hasChildren = route.routes && route.routes.length > 0;

  // Transform the path based on the prefix
  const transformPath = (originalPath: string | undefined) => {
    if (!originalPath) return "#";
    // Replace /docs with the current prefix (either /docs or /components)
    return originalPath.replace(/^\/docs/, pathPrefix);
  };

  const transformedPath = transformPath(route.path);
  const isActive = pathname === transformedPath;
  const isOpen = transformedPath ? pathname.startsWith(transformedPath) : false;
  const [isExpanded, setIsExpanded] = React.useState(isOpen);

  React.useEffect(() => {
    if (isOpen) {
      setIsExpanded(true);
    }
  }, [isOpen]);

  if (hasChildren) {
    return (
      <div className="space-y-0.5">
        <div
          className={cn(
            "flex w-full items-center justify-between border-l-2 py-1.5 text-sm transition-colors",
            level > 0 && "ml-3",
            isActive
              ? "border-green-500 font-medium text-foreground"
              : "border-transparent text-muted-foreground hover:border-border hover:text-foreground",
          )}
        >
          <Link href={transformedPath} className="flex-1 pl-3 pr-2">
            {route.title}
          </Link>
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="pr-2 hover:text-foreground"
            aria-label={isExpanded ? "Collapse" : "Expand"}
          >
            <ChevronRight
              className={cn(
                "h-3.5 w-3.5 shrink-0 transition-transform duration-200",
                isExpanded && "rotate-90",
              )}
            />
          </button>
        </div>
        {isExpanded && route.routes && (
          <div className="ml-5">
            <SidebarRouteTree
              routes={route.routes}
              pathname={pathname}
              level={level + 1}
              pathPrefix={pathPrefix}
            />
          </div>
        )}
      </div>
    );
  }

  // External link
  if (route.external) {
    return (
      <a
        href={route.path}
        target="_blank"
        rel="noopener noreferrer"
        className={cn(
          "flex items-center justify-between border-l-2 border-transparent py-1.5 pl-3 pr-2 text-sm text-muted-foreground transition-colors hover:border-border hover:text-foreground",
          level > 0 && "ml-3",
        )}
      >
        <span>{route.title}</span>
        <svg
          className="h-3 w-3 shrink-0"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
          />
        </svg>
      </a>
    );
  }

  // Blog post with metadata
  if (route.date || route.author) {
    return (
      <Link
        href={transformedPath}
        className={cn(
          "block border-l-2 py-1.5 pl-3 pr-2 text-sm transition-colors",
          level > 0 && "ml-3",
          isActive
            ? "border-green-500 font-medium text-foreground"
            : "border-transparent text-muted-foreground hover:border-border hover:text-foreground",
        )}
      >
        <div>{route.title}</div>
        {(route.date || route.author) && (
          <div className="mt-0.5 text-xs text-muted-foreground/70">
            {route.date && <span>{route.date}</span>}
            {route.date && route.author && <span className="mx-1">·</span>}
            {route.author && <span>{route.author}</span>}
          </div>
        )}
      </Link>
    );
  }

  // Regular link
  return (
    <Link
      href={transformedPath}
      className={cn(
        "block border-l-2 py-1.5 pl-3 pr-2 text-sm transition-colors",
        level > 0 && "ml-3",
        isActive
          ? "border-green-500 font-medium text-foreground"
          : "border-transparent text-muted-foreground hover:border-border hover:text-foreground",
      )}
    >
      {route.title}
    </Link>
  );
}
