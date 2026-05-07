import type { MDXComponents } from "mdx/types"
import * as React from "react"
// @mdx-ui-imports-start
// @mdx-ui-imports-end

/**
 * MDX component mappings.
 * Components are auto-patched by the CLI when you run `npx @ravikumarsurya/mdx-ui add <component>`.
 *
 * @example Re-export from project root (Next.js):
 * ```tsx
 * // mdx-components.tsx (root)
 * export { useMDXComponents } from './components/mdx-ui/mdx-components'
 * ```
 */
export function useMDXComponents(components: MDXComponents = {}): MDXComponents {
  return {
    h1: (props: any) => <h1 className="scroll-m-20 text-4xl font-bold tracking-tight mt-8 first:mt-0" {...props} />,
    h2: (props: any) => <h2 className="scroll-m-20 text-3xl font-semibold tracking-tight mt-10 first:mt-0" {...props} />,
    h3: (props: any) => <h3 className="scroll-m-20 text-2xl font-semibold tracking-tight mt-8" {...props} />,
    h4: (props: any) => <h4 className="scroll-m-20 text-xl font-semibold tracking-tight mt-6" {...props} />,
    h5: (props: any) => <h5 className="scroll-m-20 text-lg font-semibold tracking-tight mt-6" {...props} />,
    h6: (props: any) => <h6 className="scroll-m-20 text-base font-semibold tracking-tight mt-6" {...props} />,
    p: (props: any) => <p className="leading-7 [&:not(:first-child)]:mt-6" {...props} />,
    a: (props: any) => <a className="font-medium underline underline-offset-4 hover:text-primary transition-colors" {...props} />,
    ul: (props: any) => <ul className="my-6 ml-6 list-disc [&>li]:mt-2" {...props} />,
    ol: (props: any) => <ol className="my-6 ml-6 list-decimal [&>li]:mt-2" {...props} />,
    li: (props: any) => <li className="mt-2" {...props} />,
    blockquote: (props: any) => <blockquote className="mt-6 border-l-4 border-primary pl-4 py-2 italic text-foreground bg-primary/5" {...props} />,
    img: (props: any) => <img className="rounded-lg border border-border my-6 w-full" alt="" {...props} />,
    hr: (props: any) => <hr className="my-8 border-border" {...props} />,
    code: (props: any) => <code className="relative rounded bg-muted px-[0.3rem] py-[0.2rem] font-mono text-sm font-semibold text-foreground" {...props} />,
    pre: (props: any) => <pre className="my-6 overflow-x-auto rounded-lg border border-border bg-muted p-4" {...props} />,
    strong: (props: any) => <strong className="font-semibold text-foreground" {...props} />,
    em: (props: any) => <em className="italic text-foreground" {...props} />,
    table: (props: any) => <div className="my-6 w-full overflow-x-auto rounded-lg border"><table className="w-full caption-bottom text-sm" {...props} /></div>,
    tr: (props: any) => <tr className="border-b transition-colors hover:bg-muted/50" {...props} />,
    th: (props: any) => <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground" {...props} />,
    td: (props: any) => <td className="px-4 py-3 align-middle" {...props} />,
    // @mdx-ui-mappings-start
    // @mdx-ui-mappings-end
    ...components,
  }
}
