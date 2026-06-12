"use client";

import * as React from "react";
import Image from "next/image";
import { useTheme } from "next-themes";
import { cn } from "@/lib/utils";

export interface LogoProps {
  className?: string;
  height?: number;
}

export function Logo({ className, height = 24 }: LogoProps) {
  const { resolvedTheme } = useTheme();
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    setMounted(true);
  }, []);

  const src =
    mounted && resolvedTheme === "light"
      ? "/logos/logo-lite.png"
      : "/logos/logo-dark.png";

  return (
    <Image
      src={src}
      alt="DocsUI"
      width={height * 4.8}
      height={height}
      className={cn("w-auto", className)}
      style={{ height }}
      priority
    />
  );
}
