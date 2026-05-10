import { Link } from "@/components/mdx/link"

export default function LinkDefault() {
  return (
    <div className="space-y-3 text-sm leading-7">
      <p>
        Read the{" "}
        <Link href="/docs/getting-started">getting started guide</Link>{" "}
        before installing components.
      </p>
      <p>
        Source code is available on{" "}
        <Link href="https://github.com/suryaravikumar-space/mdx-ui">
          GitHub
        </Link>
        .
      </p>
    </div>
  )
}
