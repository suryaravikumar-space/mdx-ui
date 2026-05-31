"use client";

import React, { Suspense } from "react";
import dynamic from "next/dynamic";

const PlaygroundClient = dynamic(
  () =>
    import("./playground-client").then((m) => ({
      default: m.PlaygroundClient,
    })),
  { ssr: false },
);

export function PlaygroundWrapper() {
  return (
    <Suspense fallback={null}>
      <PlaygroundClient />
    </Suspense>
  );
}
