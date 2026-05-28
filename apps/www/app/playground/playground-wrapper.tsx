"use client"

import dynamic from "next/dynamic"

const PlaygroundClient = dynamic(
  () => import("./playground-client").then((m) => ({ default: m.PlaygroundClient })),
  { ssr: false }
)

export function PlaygroundWrapper() {
  return <PlaygroundClient />
}
