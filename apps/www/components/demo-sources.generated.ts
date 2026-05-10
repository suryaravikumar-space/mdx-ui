// THIS FILE IS AUTO-GENERATED. DO NOT EDIT MANUALLY.
// Run `tsx scripts/build-previews.ts` to regenerate.
// NOTE: This file is generated but committed to the repository.

export const DEMO_SOURCES: Record<
  string,
  { source: string; highlighted: string }
> = {
  "accordion-default": {
    source: `"use client"
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/mdx/accordion"

export default function AccordionDefault() {
  return (
    <Accordion defaultValue="item-1" className="w-full max-w-lg">
      <AccordionItem value="item-1">
        <AccordionTrigger>What is mdx-ui?</AccordionTrigger>
        <AccordionContent>
          mdx-ui is a collection of copy-paste MDX components built with Tailwind CSS. Add only
          what you need.
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="item-2">
        <AccordionTrigger>Does it work with Next.js?</AccordionTrigger>
        <AccordionContent>
          Yes. mdx-ui works with Next.js, Astro, Vite React, and any framework that supports MDX.
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="item-3">
        <AccordionTrigger>Is it accessible?</AccordionTrigger>
        <AccordionContent>
          Yes. The accordion uses proper ARIA attributes — aria-expanded on the trigger and
          keyboard focus management.
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  )
}
`,
    highlighted: `<pre class="shiki shiki-themes github-dark github-light" style="--shiki-dark:#e1e4e8;--shiki-light:#24292e;--shiki-dark-bg:#24292e;--shiki-light-bg:#fff" tabindex="0"><code><span class="line"><span style="--shiki-dark:#9ECBFF;--shiki-light:#032F62">"use client"</span></span>
<span class="line"><span style="--shiki-dark:#F97583;--shiki-light:#D73A49">import</span><span style="--shiki-dark:#E1E4E8;--shiki-light:#24292E"> {</span></span>
<span class="line"><span style="--shiki-dark:#E1E4E8;--shiki-light:#24292E">  Accordion,</span></span>
<span class="line"><span style="--shiki-dark:#E1E4E8;--shiki-light:#24292E">  AccordionItem,</span></span>
<span class="line"><span style="--shiki-dark:#E1E4E8;--shiki-light:#24292E">  AccordionTrigger,</span></span>
<span class="line"><span style="--shiki-dark:#E1E4E8;--shiki-light:#24292E">  AccordionContent,</span></span>
<span class="line"><span style="--shiki-dark:#E1E4E8;--shiki-light:#24292E">} </span><span style="--shiki-dark:#F97583;--shiki-light:#D73A49">from</span><span style="--shiki-dark:#9ECBFF;--shiki-light:#032F62"> "@/components/mdx/accordion"</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-dark:#F97583;--shiki-light:#D73A49">export</span><span style="--shiki-dark:#F97583;--shiki-light:#D73A49"> default</span><span style="--shiki-dark:#F97583;--shiki-light:#D73A49"> function</span><span style="--shiki-dark:#B392F0;--shiki-light:#6F42C1"> AccordionDefault</span><span style="--shiki-dark:#E1E4E8;--shiki-light:#24292E">() {</span></span>
<span class="line"><span style="--shiki-dark:#F97583;--shiki-light:#D73A49">  return</span><span style="--shiki-dark:#E1E4E8;--shiki-light:#24292E"> (</span></span>
<span class="line"><span style="--shiki-dark:#E1E4E8;--shiki-light:#24292E">    &#x3C;</span><span style="--shiki-dark:#79B8FF;--shiki-light:#005CC5">Accordion</span><span style="--shiki-dark:#B392F0;--shiki-light:#6F42C1"> defaultValue</span><span style="--shiki-dark:#F97583;--shiki-light:#D73A49">=</span><span style="--shiki-dark:#9ECBFF;--shiki-light:#032F62">"item-1"</span><span style="--shiki-dark:#B392F0;--shiki-light:#6F42C1"> className</span><span style="--shiki-dark:#F97583;--shiki-light:#D73A49">=</span><span style="--shiki-dark:#9ECBFF;--shiki-light:#032F62">"w-full max-w-lg"</span><span style="--shiki-dark:#E1E4E8;--shiki-light:#24292E">></span></span>
<span class="line"><span style="--shiki-dark:#E1E4E8;--shiki-light:#24292E">      &#x3C;</span><span style="--shiki-dark:#79B8FF;--shiki-light:#005CC5">AccordionItem</span><span style="--shiki-dark:#B392F0;--shiki-light:#6F42C1"> value</span><span style="--shiki-dark:#F97583;--shiki-light:#D73A49">=</span><span style="--shiki-dark:#9ECBFF;--shiki-light:#032F62">"item-1"</span><span style="--shiki-dark:#E1E4E8;--shiki-light:#24292E">></span></span>
<span class="line"><span style="--shiki-dark:#E1E4E8;--shiki-light:#24292E">        &#x3C;</span><span style="--shiki-dark:#79B8FF;--shiki-light:#005CC5">AccordionTrigger</span><span style="--shiki-dark:#E1E4E8;--shiki-light:#24292E">>What is mdx-ui?&#x3C;/</span><span style="--shiki-dark:#79B8FF;--shiki-light:#005CC5">AccordionTrigger</span><span style="--shiki-dark:#E1E4E8;--shiki-light:#24292E">></span></span>
<span class="line"><span style="--shiki-dark:#E1E4E8;--shiki-light:#24292E">        &#x3C;</span><span style="--shiki-dark:#79B8FF;--shiki-light:#005CC5">AccordionContent</span><span style="--shiki-dark:#E1E4E8;--shiki-light:#24292E">></span></span>
<span class="line"><span style="--shiki-dark:#E1E4E8;--shiki-light:#24292E">          mdx-ui is a collection of copy-paste MDX components built with Tailwind CSS. Add only</span></span>
<span class="line"><span style="--shiki-dark:#E1E4E8;--shiki-light:#24292E">          what you need.</span></span>
<span class="line"><span style="--shiki-dark:#E1E4E8;--shiki-light:#24292E">        &#x3C;/</span><span style="--shiki-dark:#79B8FF;--shiki-light:#005CC5">AccordionContent</span><span style="--shiki-dark:#E1E4E8;--shiki-light:#24292E">></span></span>
<span class="line"><span style="--shiki-dark:#E1E4E8;--shiki-light:#24292E">      &#x3C;/</span><span style="--shiki-dark:#79B8FF;--shiki-light:#005CC5">AccordionItem</span><span style="--shiki-dark:#E1E4E8;--shiki-light:#24292E">></span></span>
<span class="line"><span style="--shiki-dark:#E1E4E8;--shiki-light:#24292E">      &#x3C;</span><span style="--shiki-dark:#79B8FF;--shiki-light:#005CC5">AccordionItem</span><span style="--shiki-dark:#B392F0;--shiki-light:#6F42C1"> value</span><span style="--shiki-dark:#F97583;--shiki-light:#D73A49">=</span><span style="--shiki-dark:#9ECBFF;--shiki-light:#032F62">"item-2"</span><span style="--shiki-dark:#E1E4E8;--shiki-light:#24292E">></span></span>
<span class="line"><span style="--shiki-dark:#E1E4E8;--shiki-light:#24292E">        &#x3C;</span><span style="--shiki-dark:#79B8FF;--shiki-light:#005CC5">AccordionTrigger</span><span style="--shiki-dark:#E1E4E8;--shiki-light:#24292E">>Does it work with Next.js?&#x3C;/</span><span style="--shiki-dark:#79B8FF;--shiki-light:#005CC5">AccordionTrigger</span><span style="--shiki-dark:#E1E4E8;--shiki-light:#24292E">></span></span>
<span class="line"><span style="--shiki-dark:#E1E4E8;--shiki-light:#24292E">        &#x3C;</span><span style="--shiki-dark:#79B8FF;--shiki-light:#005CC5">AccordionContent</span><span style="--shiki-dark:#E1E4E8;--shiki-light:#24292E">></span></span>
<span class="line"><span style="--shiki-dark:#E1E4E8;--shiki-light:#24292E">          Yes. mdx-ui works with Next.js, Astro, Vite React, and any framework that supports MDX.</span></span>
<span class="line"><span style="--shiki-dark:#E1E4E8;--shiki-light:#24292E">        &#x3C;/</span><span style="--shiki-dark:#79B8FF;--shiki-light:#005CC5">AccordionContent</span><span style="--shiki-dark:#E1E4E8;--shiki-light:#24292E">></span></span>
<span class="line"><span style="--shiki-dark:#E1E4E8;--shiki-light:#24292E">      &#x3C;/</span><span style="--shiki-dark:#79B8FF;--shiki-light:#005CC5">AccordionItem</span><span style="--shiki-dark:#E1E4E8;--shiki-light:#24292E">></span></span>
<span class="line"><span style="--shiki-dark:#E1E4E8;--shiki-light:#24292E">      &#x3C;</span><span style="--shiki-dark:#79B8FF;--shiki-light:#005CC5">AccordionItem</span><span style="--shiki-dark:#B392F0;--shiki-light:#6F42C1"> value</span><span style="--shiki-dark:#F97583;--shiki-light:#D73A49">=</span><span style="--shiki-dark:#9ECBFF;--shiki-light:#032F62">"item-3"</span><span style="--shiki-dark:#E1E4E8;--shiki-light:#24292E">></span></span>
<span class="line"><span style="--shiki-dark:#E1E4E8;--shiki-light:#24292E">        &#x3C;</span><span style="--shiki-dark:#79B8FF;--shiki-light:#005CC5">AccordionTrigger</span><span style="--shiki-dark:#E1E4E8;--shiki-light:#24292E">>Is it accessible?&#x3C;/</span><span style="--shiki-dark:#79B8FF;--shiki-light:#005CC5">AccordionTrigger</span><span style="--shiki-dark:#E1E4E8;--shiki-light:#24292E">></span></span>
<span class="line"><span style="--shiki-dark:#E1E4E8;--shiki-light:#24292E">        &#x3C;</span><span style="--shiki-dark:#79B8FF;--shiki-light:#005CC5">AccordionContent</span><span style="--shiki-dark:#E1E4E8;--shiki-light:#24292E">></span></span>
<span class="line"><span style="--shiki-dark:#E1E4E8;--shiki-light:#24292E">          Yes. The accordion uses proper ARIA attributes — aria-expanded on the trigger and</span></span>
<span class="line"><span style="--shiki-dark:#E1E4E8;--shiki-light:#24292E">          keyboard focus management.</span></span>
<span class="line"><span style="--shiki-dark:#E1E4E8;--shiki-light:#24292E">        &#x3C;/</span><span style="--shiki-dark:#79B8FF;--shiki-light:#005CC5">AccordionContent</span><span style="--shiki-dark:#E1E4E8;--shiki-light:#24292E">></span></span>
<span class="line"><span style="--shiki-dark:#E1E4E8;--shiki-light:#24292E">      &#x3C;/</span><span style="--shiki-dark:#79B8FF;--shiki-light:#005CC5">AccordionItem</span><span style="--shiki-dark:#E1E4E8;--shiki-light:#24292E">></span></span>
<span class="line"><span style="--shiki-dark:#E1E4E8;--shiki-light:#24292E">    &#x3C;/</span><span style="--shiki-dark:#79B8FF;--shiki-light:#005CC5">Accordion</span><span style="--shiki-dark:#E1E4E8;--shiki-light:#24292E">></span></span>
<span class="line"><span style="--shiki-dark:#E1E4E8;--shiki-light:#24292E">  )</span></span>
<span class="line"><span style="--shiki-dark:#E1E4E8;--shiki-light:#24292E">}</span></span>
<span class="line"></span></code></pre>`,
  },
  "alert-default": {
    source: `import { Alert, AlertTitle, AlertDescription } from "@/components/mdx/alert"

export default function AlertDefault() {
  return (
    <div className="w-full space-y-3">
      <Alert variant="info">
        <AlertTitle>New version available</AlertTitle>
        <AlertDescription>Run npm update to get the latest features and fixes.</AlertDescription>
      </Alert>
      <Alert variant="warning">
        <AlertTitle>Deprecation notice</AlertTitle>
        <AlertDescription>
          This API will be removed in the next major version. Please migrate to the new one.
        </AlertDescription>
      </Alert>
      <Alert variant="destructive">
        <AlertTitle>Build failed</AlertTitle>
        <AlertDescription>
          There were 3 errors during compilation. Check the logs for details.
        </AlertDescription>
      </Alert>
      <Alert variant="success">
        <AlertTitle>Deployed successfully</AlertTitle>
        <AlertDescription>Your changes are live at production.</AlertDescription>
      </Alert>
    </div>
  )
}
`,
    highlighted: `<pre class="shiki shiki-themes github-dark github-light" style="--shiki-dark:#e1e4e8;--shiki-light:#24292e;--shiki-dark-bg:#24292e;--shiki-light-bg:#fff" tabindex="0"><code><span class="line"><span style="--shiki-dark:#F97583;--shiki-light:#D73A49">import</span><span style="--shiki-dark:#E1E4E8;--shiki-light:#24292E"> { Alert, AlertTitle, AlertDescription } </span><span style="--shiki-dark:#F97583;--shiki-light:#D73A49">from</span><span style="--shiki-dark:#9ECBFF;--shiki-light:#032F62"> "@/components/mdx/alert"</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-dark:#F97583;--shiki-light:#D73A49">export</span><span style="--shiki-dark:#F97583;--shiki-light:#D73A49"> default</span><span style="--shiki-dark:#F97583;--shiki-light:#D73A49"> function</span><span style="--shiki-dark:#B392F0;--shiki-light:#6F42C1"> AlertDefault</span><span style="--shiki-dark:#E1E4E8;--shiki-light:#24292E">() {</span></span>
<span class="line"><span style="--shiki-dark:#F97583;--shiki-light:#D73A49">  return</span><span style="--shiki-dark:#E1E4E8;--shiki-light:#24292E"> (</span></span>
<span class="line"><span style="--shiki-dark:#E1E4E8;--shiki-light:#24292E">    &#x3C;</span><span style="--shiki-dark:#85E89D;--shiki-light:#22863A">div</span><span style="--shiki-dark:#B392F0;--shiki-light:#6F42C1"> className</span><span style="--shiki-dark:#F97583;--shiki-light:#D73A49">=</span><span style="--shiki-dark:#9ECBFF;--shiki-light:#032F62">"w-full space-y-3"</span><span style="--shiki-dark:#E1E4E8;--shiki-light:#24292E">></span></span>
<span class="line"><span style="--shiki-dark:#E1E4E8;--shiki-light:#24292E">      &#x3C;</span><span style="--shiki-dark:#79B8FF;--shiki-light:#005CC5">Alert</span><span style="--shiki-dark:#B392F0;--shiki-light:#6F42C1"> variant</span><span style="--shiki-dark:#F97583;--shiki-light:#D73A49">=</span><span style="--shiki-dark:#9ECBFF;--shiki-light:#032F62">"info"</span><span style="--shiki-dark:#E1E4E8;--shiki-light:#24292E">></span></span>
<span class="line"><span style="--shiki-dark:#E1E4E8;--shiki-light:#24292E">        &#x3C;</span><span style="--shiki-dark:#79B8FF;--shiki-light:#005CC5">AlertTitle</span><span style="--shiki-dark:#E1E4E8;--shiki-light:#24292E">>New version available&#x3C;/</span><span style="--shiki-dark:#79B8FF;--shiki-light:#005CC5">AlertTitle</span><span style="--shiki-dark:#E1E4E8;--shiki-light:#24292E">></span></span>
<span class="line"><span style="--shiki-dark:#E1E4E8;--shiki-light:#24292E">        &#x3C;</span><span style="--shiki-dark:#79B8FF;--shiki-light:#005CC5">AlertDescription</span><span style="--shiki-dark:#E1E4E8;--shiki-light:#24292E">>Run npm update to get the latest features and fixes.&#x3C;/</span><span style="--shiki-dark:#79B8FF;--shiki-light:#005CC5">AlertDescription</span><span style="--shiki-dark:#E1E4E8;--shiki-light:#24292E">></span></span>
<span class="line"><span style="--shiki-dark:#E1E4E8;--shiki-light:#24292E">      &#x3C;/</span><span style="--shiki-dark:#79B8FF;--shiki-light:#005CC5">Alert</span><span style="--shiki-dark:#E1E4E8;--shiki-light:#24292E">></span></span>
<span class="line"><span style="--shiki-dark:#E1E4E8;--shiki-light:#24292E">      &#x3C;</span><span style="--shiki-dark:#79B8FF;--shiki-light:#005CC5">Alert</span><span style="--shiki-dark:#B392F0;--shiki-light:#6F42C1"> variant</span><span style="--shiki-dark:#F97583;--shiki-light:#D73A49">=</span><span style="--shiki-dark:#9ECBFF;--shiki-light:#032F62">"warning"</span><span style="--shiki-dark:#E1E4E8;--shiki-light:#24292E">></span></span>
<span class="line"><span style="--shiki-dark:#E1E4E8;--shiki-light:#24292E">        &#x3C;</span><span style="--shiki-dark:#79B8FF;--shiki-light:#005CC5">AlertTitle</span><span style="--shiki-dark:#E1E4E8;--shiki-light:#24292E">>Deprecation notice&#x3C;/</span><span style="--shiki-dark:#79B8FF;--shiki-light:#005CC5">AlertTitle</span><span style="--shiki-dark:#E1E4E8;--shiki-light:#24292E">></span></span>
<span class="line"><span style="--shiki-dark:#E1E4E8;--shiki-light:#24292E">        &#x3C;</span><span style="--shiki-dark:#79B8FF;--shiki-light:#005CC5">AlertDescription</span><span style="--shiki-dark:#E1E4E8;--shiki-light:#24292E">></span></span>
<span class="line"><span style="--shiki-dark:#E1E4E8;--shiki-light:#24292E">          This API will be removed in the next major version. Please migrate to the new one.</span></span>
<span class="line"><span style="--shiki-dark:#E1E4E8;--shiki-light:#24292E">        &#x3C;/</span><span style="--shiki-dark:#79B8FF;--shiki-light:#005CC5">AlertDescription</span><span style="--shiki-dark:#E1E4E8;--shiki-light:#24292E">></span></span>
<span class="line"><span style="--shiki-dark:#E1E4E8;--shiki-light:#24292E">      &#x3C;/</span><span style="--shiki-dark:#79B8FF;--shiki-light:#005CC5">Alert</span><span style="--shiki-dark:#E1E4E8;--shiki-light:#24292E">></span></span>
<span class="line"><span style="--shiki-dark:#E1E4E8;--shiki-light:#24292E">      &#x3C;</span><span style="--shiki-dark:#79B8FF;--shiki-light:#005CC5">Alert</span><span style="--shiki-dark:#B392F0;--shiki-light:#6F42C1"> variant</span><span style="--shiki-dark:#F97583;--shiki-light:#D73A49">=</span><span style="--shiki-dark:#9ECBFF;--shiki-light:#032F62">"destructive"</span><span style="--shiki-dark:#E1E4E8;--shiki-light:#24292E">></span></span>
<span class="line"><span style="--shiki-dark:#E1E4E8;--shiki-light:#24292E">        &#x3C;</span><span style="--shiki-dark:#79B8FF;--shiki-light:#005CC5">AlertTitle</span><span style="--shiki-dark:#E1E4E8;--shiki-light:#24292E">>Build failed&#x3C;/</span><span style="--shiki-dark:#79B8FF;--shiki-light:#005CC5">AlertTitle</span><span style="--shiki-dark:#E1E4E8;--shiki-light:#24292E">></span></span>
<span class="line"><span style="--shiki-dark:#E1E4E8;--shiki-light:#24292E">        &#x3C;</span><span style="--shiki-dark:#79B8FF;--shiki-light:#005CC5">AlertDescription</span><span style="--shiki-dark:#E1E4E8;--shiki-light:#24292E">></span></span>
<span class="line"><span style="--shiki-dark:#E1E4E8;--shiki-light:#24292E">          There were 3 errors during compilation. Check the logs for details.</span></span>
<span class="line"><span style="--shiki-dark:#E1E4E8;--shiki-light:#24292E">        &#x3C;/</span><span style="--shiki-dark:#79B8FF;--shiki-light:#005CC5">AlertDescription</span><span style="--shiki-dark:#E1E4E8;--shiki-light:#24292E">></span></span>
<span class="line"><span style="--shiki-dark:#E1E4E8;--shiki-light:#24292E">      &#x3C;/</span><span style="--shiki-dark:#79B8FF;--shiki-light:#005CC5">Alert</span><span style="--shiki-dark:#E1E4E8;--shiki-light:#24292E">></span></span>
<span class="line"><span style="--shiki-dark:#E1E4E8;--shiki-light:#24292E">      &#x3C;</span><span style="--shiki-dark:#79B8FF;--shiki-light:#005CC5">Alert</span><span style="--shiki-dark:#B392F0;--shiki-light:#6F42C1"> variant</span><span style="--shiki-dark:#F97583;--shiki-light:#D73A49">=</span><span style="--shiki-dark:#9ECBFF;--shiki-light:#032F62">"success"</span><span style="--shiki-dark:#E1E4E8;--shiki-light:#24292E">></span></span>
<span class="line"><span style="--shiki-dark:#E1E4E8;--shiki-light:#24292E">        &#x3C;</span><span style="--shiki-dark:#79B8FF;--shiki-light:#005CC5">AlertTitle</span><span style="--shiki-dark:#E1E4E8;--shiki-light:#24292E">>Deployed successfully&#x3C;/</span><span style="--shiki-dark:#79B8FF;--shiki-light:#005CC5">AlertTitle</span><span style="--shiki-dark:#E1E4E8;--shiki-light:#24292E">></span></span>
<span class="line"><span style="--shiki-dark:#E1E4E8;--shiki-light:#24292E">        &#x3C;</span><span style="--shiki-dark:#79B8FF;--shiki-light:#005CC5">AlertDescription</span><span style="--shiki-dark:#E1E4E8;--shiki-light:#24292E">>Your changes are live at production.&#x3C;/</span><span style="--shiki-dark:#79B8FF;--shiki-light:#005CC5">AlertDescription</span><span style="--shiki-dark:#E1E4E8;--shiki-light:#24292E">></span></span>
<span class="line"><span style="--shiki-dark:#E1E4E8;--shiki-light:#24292E">      &#x3C;/</span><span style="--shiki-dark:#79B8FF;--shiki-light:#005CC5">Alert</span><span style="--shiki-dark:#E1E4E8;--shiki-light:#24292E">></span></span>
<span class="line"><span style="--shiki-dark:#E1E4E8;--shiki-light:#24292E">    &#x3C;/</span><span style="--shiki-dark:#85E89D;--shiki-light:#22863A">div</span><span style="--shiki-dark:#E1E4E8;--shiki-light:#24292E">></span></span>
<span class="line"><span style="--shiki-dark:#E1E4E8;--shiki-light:#24292E">  )</span></span>
<span class="line"><span style="--shiki-dark:#E1E4E8;--shiki-light:#24292E">}</span></span>
<span class="line"></span></code></pre>`,
  },
  "badge-variants": {
    source: `import { Badge } from "@/components/mdx/badge"

export default function BadgeVariants() {
  return (
    <div className="flex flex-wrap gap-2">
      <Badge>Default</Badge>
      <Badge variant="secondary">Secondary</Badge>
      <Badge variant="outline">Outline</Badge>
      <Badge variant="destructive">Destructive</Badge>
      <Badge variant="success">Success</Badge>
      <Badge variant="warning">Warning</Badge>
      <Badge variant="info">Info</Badge>
    </div>
  )
}
`,
    highlighted: `<pre class="shiki shiki-themes github-dark github-light" style="--shiki-dark:#e1e4e8;--shiki-light:#24292e;--shiki-dark-bg:#24292e;--shiki-light-bg:#fff" tabindex="0"><code><span class="line"><span style="--shiki-dark:#F97583;--shiki-light:#D73A49">import</span><span style="--shiki-dark:#E1E4E8;--shiki-light:#24292E"> { Badge } </span><span style="--shiki-dark:#F97583;--shiki-light:#D73A49">from</span><span style="--shiki-dark:#9ECBFF;--shiki-light:#032F62"> "@/components/mdx/badge"</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-dark:#F97583;--shiki-light:#D73A49">export</span><span style="--shiki-dark:#F97583;--shiki-light:#D73A49"> default</span><span style="--shiki-dark:#F97583;--shiki-light:#D73A49"> function</span><span style="--shiki-dark:#B392F0;--shiki-light:#6F42C1"> BadgeVariants</span><span style="--shiki-dark:#E1E4E8;--shiki-light:#24292E">() {</span></span>
<span class="line"><span style="--shiki-dark:#F97583;--shiki-light:#D73A49">  return</span><span style="--shiki-dark:#E1E4E8;--shiki-light:#24292E"> (</span></span>
<span class="line"><span style="--shiki-dark:#E1E4E8;--shiki-light:#24292E">    &#x3C;</span><span style="--shiki-dark:#85E89D;--shiki-light:#22863A">div</span><span style="--shiki-dark:#B392F0;--shiki-light:#6F42C1"> className</span><span style="--shiki-dark:#F97583;--shiki-light:#D73A49">=</span><span style="--shiki-dark:#9ECBFF;--shiki-light:#032F62">"flex flex-wrap gap-2"</span><span style="--shiki-dark:#E1E4E8;--shiki-light:#24292E">></span></span>
<span class="line"><span style="--shiki-dark:#E1E4E8;--shiki-light:#24292E">      &#x3C;</span><span style="--shiki-dark:#79B8FF;--shiki-light:#005CC5">Badge</span><span style="--shiki-dark:#E1E4E8;--shiki-light:#24292E">>Default&#x3C;/</span><span style="--shiki-dark:#79B8FF;--shiki-light:#005CC5">Badge</span><span style="--shiki-dark:#E1E4E8;--shiki-light:#24292E">></span></span>
<span class="line"><span style="--shiki-dark:#E1E4E8;--shiki-light:#24292E">      &#x3C;</span><span style="--shiki-dark:#79B8FF;--shiki-light:#005CC5">Badge</span><span style="--shiki-dark:#B392F0;--shiki-light:#6F42C1"> variant</span><span style="--shiki-dark:#F97583;--shiki-light:#D73A49">=</span><span style="--shiki-dark:#9ECBFF;--shiki-light:#032F62">"secondary"</span><span style="--shiki-dark:#E1E4E8;--shiki-light:#24292E">>Secondary&#x3C;/</span><span style="--shiki-dark:#79B8FF;--shiki-light:#005CC5">Badge</span><span style="--shiki-dark:#E1E4E8;--shiki-light:#24292E">></span></span>
<span class="line"><span style="--shiki-dark:#E1E4E8;--shiki-light:#24292E">      &#x3C;</span><span style="--shiki-dark:#79B8FF;--shiki-light:#005CC5">Badge</span><span style="--shiki-dark:#B392F0;--shiki-light:#6F42C1"> variant</span><span style="--shiki-dark:#F97583;--shiki-light:#D73A49">=</span><span style="--shiki-dark:#9ECBFF;--shiki-light:#032F62">"outline"</span><span style="--shiki-dark:#E1E4E8;--shiki-light:#24292E">>Outline&#x3C;/</span><span style="--shiki-dark:#79B8FF;--shiki-light:#005CC5">Badge</span><span style="--shiki-dark:#E1E4E8;--shiki-light:#24292E">></span></span>
<span class="line"><span style="--shiki-dark:#E1E4E8;--shiki-light:#24292E">      &#x3C;</span><span style="--shiki-dark:#79B8FF;--shiki-light:#005CC5">Badge</span><span style="--shiki-dark:#B392F0;--shiki-light:#6F42C1"> variant</span><span style="--shiki-dark:#F97583;--shiki-light:#D73A49">=</span><span style="--shiki-dark:#9ECBFF;--shiki-light:#032F62">"destructive"</span><span style="--shiki-dark:#E1E4E8;--shiki-light:#24292E">>Destructive&#x3C;/</span><span style="--shiki-dark:#79B8FF;--shiki-light:#005CC5">Badge</span><span style="--shiki-dark:#E1E4E8;--shiki-light:#24292E">></span></span>
<span class="line"><span style="--shiki-dark:#E1E4E8;--shiki-light:#24292E">      &#x3C;</span><span style="--shiki-dark:#79B8FF;--shiki-light:#005CC5">Badge</span><span style="--shiki-dark:#B392F0;--shiki-light:#6F42C1"> variant</span><span style="--shiki-dark:#F97583;--shiki-light:#D73A49">=</span><span style="--shiki-dark:#9ECBFF;--shiki-light:#032F62">"success"</span><span style="--shiki-dark:#E1E4E8;--shiki-light:#24292E">>Success&#x3C;/</span><span style="--shiki-dark:#79B8FF;--shiki-light:#005CC5">Badge</span><span style="--shiki-dark:#E1E4E8;--shiki-light:#24292E">></span></span>
<span class="line"><span style="--shiki-dark:#E1E4E8;--shiki-light:#24292E">      &#x3C;</span><span style="--shiki-dark:#79B8FF;--shiki-light:#005CC5">Badge</span><span style="--shiki-dark:#B392F0;--shiki-light:#6F42C1"> variant</span><span style="--shiki-dark:#F97583;--shiki-light:#D73A49">=</span><span style="--shiki-dark:#9ECBFF;--shiki-light:#032F62">"warning"</span><span style="--shiki-dark:#E1E4E8;--shiki-light:#24292E">>Warning&#x3C;/</span><span style="--shiki-dark:#79B8FF;--shiki-light:#005CC5">Badge</span><span style="--shiki-dark:#E1E4E8;--shiki-light:#24292E">></span></span>
<span class="line"><span style="--shiki-dark:#E1E4E8;--shiki-light:#24292E">      &#x3C;</span><span style="--shiki-dark:#79B8FF;--shiki-light:#005CC5">Badge</span><span style="--shiki-dark:#B392F0;--shiki-light:#6F42C1"> variant</span><span style="--shiki-dark:#F97583;--shiki-light:#D73A49">=</span><span style="--shiki-dark:#9ECBFF;--shiki-light:#032F62">"info"</span><span style="--shiki-dark:#E1E4E8;--shiki-light:#24292E">>Info&#x3C;/</span><span style="--shiki-dark:#79B8FF;--shiki-light:#005CC5">Badge</span><span style="--shiki-dark:#E1E4E8;--shiki-light:#24292E">></span></span>
<span class="line"><span style="--shiki-dark:#E1E4E8;--shiki-light:#24292E">    &#x3C;/</span><span style="--shiki-dark:#85E89D;--shiki-light:#22863A">div</span><span style="--shiki-dark:#E1E4E8;--shiki-light:#24292E">></span></span>
<span class="line"><span style="--shiki-dark:#E1E4E8;--shiki-light:#24292E">  )</span></span>
<span class="line"><span style="--shiki-dark:#E1E4E8;--shiki-light:#24292E">}</span></span>
<span class="line"></span></code></pre>`,
  },
  "callout-default": {
    source: `import { Callout } from "@/components/mdx/callout"

export default function CalloutDefault() {
  return (
    <div className="w-full space-y-0">
      <Callout variant="info">This is an informational message to help guide users.</Callout>
      <Callout variant="warning">
        Warning: This action cannot be undone. Please proceed with caution.
      </Callout>
      <Callout variant="danger">
        Error: This is a critical error that needs immediate attention.
      </Callout>
      <Callout variant="success">Success! Your changes have been saved.</Callout>
    </div>
  )
}
`,
    highlighted: `<pre class="shiki shiki-themes github-dark github-light" style="--shiki-dark:#e1e4e8;--shiki-light:#24292e;--shiki-dark-bg:#24292e;--shiki-light-bg:#fff" tabindex="0"><code><span class="line"><span style="--shiki-dark:#F97583;--shiki-light:#D73A49">import</span><span style="--shiki-dark:#E1E4E8;--shiki-light:#24292E"> { Callout } </span><span style="--shiki-dark:#F97583;--shiki-light:#D73A49">from</span><span style="--shiki-dark:#9ECBFF;--shiki-light:#032F62"> "@/components/mdx/callout"</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-dark:#F97583;--shiki-light:#D73A49">export</span><span style="--shiki-dark:#F97583;--shiki-light:#D73A49"> default</span><span style="--shiki-dark:#F97583;--shiki-light:#D73A49"> function</span><span style="--shiki-dark:#B392F0;--shiki-light:#6F42C1"> CalloutDefault</span><span style="--shiki-dark:#E1E4E8;--shiki-light:#24292E">() {</span></span>
<span class="line"><span style="--shiki-dark:#F97583;--shiki-light:#D73A49">  return</span><span style="--shiki-dark:#E1E4E8;--shiki-light:#24292E"> (</span></span>
<span class="line"><span style="--shiki-dark:#E1E4E8;--shiki-light:#24292E">    &#x3C;</span><span style="--shiki-dark:#85E89D;--shiki-light:#22863A">div</span><span style="--shiki-dark:#B392F0;--shiki-light:#6F42C1"> className</span><span style="--shiki-dark:#F97583;--shiki-light:#D73A49">=</span><span style="--shiki-dark:#9ECBFF;--shiki-light:#032F62">"w-full space-y-0"</span><span style="--shiki-dark:#E1E4E8;--shiki-light:#24292E">></span></span>
<span class="line"><span style="--shiki-dark:#E1E4E8;--shiki-light:#24292E">      &#x3C;</span><span style="--shiki-dark:#79B8FF;--shiki-light:#005CC5">Callout</span><span style="--shiki-dark:#B392F0;--shiki-light:#6F42C1"> variant</span><span style="--shiki-dark:#F97583;--shiki-light:#D73A49">=</span><span style="--shiki-dark:#9ECBFF;--shiki-light:#032F62">"info"</span><span style="--shiki-dark:#E1E4E8;--shiki-light:#24292E">>This is an informational message to help guide users.&#x3C;/</span><span style="--shiki-dark:#79B8FF;--shiki-light:#005CC5">Callout</span><span style="--shiki-dark:#E1E4E8;--shiki-light:#24292E">></span></span>
<span class="line"><span style="--shiki-dark:#E1E4E8;--shiki-light:#24292E">      &#x3C;</span><span style="--shiki-dark:#79B8FF;--shiki-light:#005CC5">Callout</span><span style="--shiki-dark:#B392F0;--shiki-light:#6F42C1"> variant</span><span style="--shiki-dark:#F97583;--shiki-light:#D73A49">=</span><span style="--shiki-dark:#9ECBFF;--shiki-light:#032F62">"warning"</span><span style="--shiki-dark:#E1E4E8;--shiki-light:#24292E">></span></span>
<span class="line"><span style="--shiki-dark:#E1E4E8;--shiki-light:#24292E">        Warning: This action cannot be undone. Please proceed with caution.</span></span>
<span class="line"><span style="--shiki-dark:#E1E4E8;--shiki-light:#24292E">      &#x3C;/</span><span style="--shiki-dark:#79B8FF;--shiki-light:#005CC5">Callout</span><span style="--shiki-dark:#E1E4E8;--shiki-light:#24292E">></span></span>
<span class="line"><span style="--shiki-dark:#E1E4E8;--shiki-light:#24292E">      &#x3C;</span><span style="--shiki-dark:#79B8FF;--shiki-light:#005CC5">Callout</span><span style="--shiki-dark:#B392F0;--shiki-light:#6F42C1"> variant</span><span style="--shiki-dark:#F97583;--shiki-light:#D73A49">=</span><span style="--shiki-dark:#9ECBFF;--shiki-light:#032F62">"danger"</span><span style="--shiki-dark:#E1E4E8;--shiki-light:#24292E">></span></span>
<span class="line"><span style="--shiki-dark:#E1E4E8;--shiki-light:#24292E">        Error: This is a critical error that needs immediate attention.</span></span>
<span class="line"><span style="--shiki-dark:#E1E4E8;--shiki-light:#24292E">      &#x3C;/</span><span style="--shiki-dark:#79B8FF;--shiki-light:#005CC5">Callout</span><span style="--shiki-dark:#E1E4E8;--shiki-light:#24292E">></span></span>
<span class="line"><span style="--shiki-dark:#E1E4E8;--shiki-light:#24292E">      &#x3C;</span><span style="--shiki-dark:#79B8FF;--shiki-light:#005CC5">Callout</span><span style="--shiki-dark:#B392F0;--shiki-light:#6F42C1"> variant</span><span style="--shiki-dark:#F97583;--shiki-light:#D73A49">=</span><span style="--shiki-dark:#9ECBFF;--shiki-light:#032F62">"success"</span><span style="--shiki-dark:#E1E4E8;--shiki-light:#24292E">>Success! Your changes have been saved.&#x3C;/</span><span style="--shiki-dark:#79B8FF;--shiki-light:#005CC5">Callout</span><span style="--shiki-dark:#E1E4E8;--shiki-light:#24292E">></span></span>
<span class="line"><span style="--shiki-dark:#E1E4E8;--shiki-light:#24292E">    &#x3C;/</span><span style="--shiki-dark:#85E89D;--shiki-light:#22863A">div</span><span style="--shiki-dark:#E1E4E8;--shiki-light:#24292E">></span></span>
<span class="line"><span style="--shiki-dark:#E1E4E8;--shiki-light:#24292E">  )</span></span>
<span class="line"><span style="--shiki-dark:#E1E4E8;--shiki-light:#24292E">}</span></span>
<span class="line"></span></code></pre>`,
  },
  "card-default": {
    source: `import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/mdx/card"

export default function CardDefault() {
  return (
    <Card className="w-full max-w-sm">
      <CardHeader>
        <CardTitle>Getting started</CardTitle>
        <CardDescription>Install and configure mdx-ui in minutes.</CardDescription>
      </CardHeader>
      <CardContent>Run the CLI and pick your components.</CardContent>
      <CardFooter className="text-sm text-muted-foreground">Free and open source.</CardFooter>
    </Card>
  )
}
`,
    highlighted: `<pre class="shiki shiki-themes github-dark github-light" style="--shiki-dark:#e1e4e8;--shiki-light:#24292e;--shiki-dark-bg:#24292e;--shiki-light-bg:#fff" tabindex="0"><code><span class="line"><span style="--shiki-dark:#F97583;--shiki-light:#D73A49">import</span><span style="--shiki-dark:#E1E4E8;--shiki-light:#24292E"> {</span></span>
<span class="line"><span style="--shiki-dark:#E1E4E8;--shiki-light:#24292E">  Card,</span></span>
<span class="line"><span style="--shiki-dark:#E1E4E8;--shiki-light:#24292E">  CardHeader,</span></span>
<span class="line"><span style="--shiki-dark:#E1E4E8;--shiki-light:#24292E">  CardTitle,</span></span>
<span class="line"><span style="--shiki-dark:#E1E4E8;--shiki-light:#24292E">  CardDescription,</span></span>
<span class="line"><span style="--shiki-dark:#E1E4E8;--shiki-light:#24292E">  CardContent,</span></span>
<span class="line"><span style="--shiki-dark:#E1E4E8;--shiki-light:#24292E">  CardFooter,</span></span>
<span class="line"><span style="--shiki-dark:#E1E4E8;--shiki-light:#24292E">} </span><span style="--shiki-dark:#F97583;--shiki-light:#D73A49">from</span><span style="--shiki-dark:#9ECBFF;--shiki-light:#032F62"> "@/components/mdx/card"</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-dark:#F97583;--shiki-light:#D73A49">export</span><span style="--shiki-dark:#F97583;--shiki-light:#D73A49"> default</span><span style="--shiki-dark:#F97583;--shiki-light:#D73A49"> function</span><span style="--shiki-dark:#B392F0;--shiki-light:#6F42C1"> CardDefault</span><span style="--shiki-dark:#E1E4E8;--shiki-light:#24292E">() {</span></span>
<span class="line"><span style="--shiki-dark:#F97583;--shiki-light:#D73A49">  return</span><span style="--shiki-dark:#E1E4E8;--shiki-light:#24292E"> (</span></span>
<span class="line"><span style="--shiki-dark:#E1E4E8;--shiki-light:#24292E">    &#x3C;</span><span style="--shiki-dark:#79B8FF;--shiki-light:#005CC5">Card</span><span style="--shiki-dark:#B392F0;--shiki-light:#6F42C1"> className</span><span style="--shiki-dark:#F97583;--shiki-light:#D73A49">=</span><span style="--shiki-dark:#9ECBFF;--shiki-light:#032F62">"w-full max-w-sm"</span><span style="--shiki-dark:#E1E4E8;--shiki-light:#24292E">></span></span>
<span class="line"><span style="--shiki-dark:#E1E4E8;--shiki-light:#24292E">      &#x3C;</span><span style="--shiki-dark:#79B8FF;--shiki-light:#005CC5">CardHeader</span><span style="--shiki-dark:#E1E4E8;--shiki-light:#24292E">></span></span>
<span class="line"><span style="--shiki-dark:#E1E4E8;--shiki-light:#24292E">        &#x3C;</span><span style="--shiki-dark:#79B8FF;--shiki-light:#005CC5">CardTitle</span><span style="--shiki-dark:#E1E4E8;--shiki-light:#24292E">>Getting started&#x3C;/</span><span style="--shiki-dark:#79B8FF;--shiki-light:#005CC5">CardTitle</span><span style="--shiki-dark:#E1E4E8;--shiki-light:#24292E">></span></span>
<span class="line"><span style="--shiki-dark:#E1E4E8;--shiki-light:#24292E">        &#x3C;</span><span style="--shiki-dark:#79B8FF;--shiki-light:#005CC5">CardDescription</span><span style="--shiki-dark:#E1E4E8;--shiki-light:#24292E">>Install and configure mdx-ui in minutes.&#x3C;/</span><span style="--shiki-dark:#79B8FF;--shiki-light:#005CC5">CardDescription</span><span style="--shiki-dark:#E1E4E8;--shiki-light:#24292E">></span></span>
<span class="line"><span style="--shiki-dark:#E1E4E8;--shiki-light:#24292E">      &#x3C;/</span><span style="--shiki-dark:#79B8FF;--shiki-light:#005CC5">CardHeader</span><span style="--shiki-dark:#E1E4E8;--shiki-light:#24292E">></span></span>
<span class="line"><span style="--shiki-dark:#E1E4E8;--shiki-light:#24292E">      &#x3C;</span><span style="--shiki-dark:#79B8FF;--shiki-light:#005CC5">CardContent</span><span style="--shiki-dark:#E1E4E8;--shiki-light:#24292E">>Run the CLI and pick your components.&#x3C;/</span><span style="--shiki-dark:#79B8FF;--shiki-light:#005CC5">CardContent</span><span style="--shiki-dark:#E1E4E8;--shiki-light:#24292E">></span></span>
<span class="line"><span style="--shiki-dark:#E1E4E8;--shiki-light:#24292E">      &#x3C;</span><span style="--shiki-dark:#79B8FF;--shiki-light:#005CC5">CardFooter</span><span style="--shiki-dark:#B392F0;--shiki-light:#6F42C1"> className</span><span style="--shiki-dark:#F97583;--shiki-light:#D73A49">=</span><span style="--shiki-dark:#9ECBFF;--shiki-light:#032F62">"text-sm text-muted-foreground"</span><span style="--shiki-dark:#E1E4E8;--shiki-light:#24292E">>Free and open source.&#x3C;/</span><span style="--shiki-dark:#79B8FF;--shiki-light:#005CC5">CardFooter</span><span style="--shiki-dark:#E1E4E8;--shiki-light:#24292E">></span></span>
<span class="line"><span style="--shiki-dark:#E1E4E8;--shiki-light:#24292E">    &#x3C;/</span><span style="--shiki-dark:#79B8FF;--shiki-light:#005CC5">Card</span><span style="--shiki-dark:#E1E4E8;--shiki-light:#24292E">></span></span>
<span class="line"><span style="--shiki-dark:#E1E4E8;--shiki-light:#24292E">  )</span></span>
<span class="line"><span style="--shiki-dark:#E1E4E8;--shiki-light:#24292E">}</span></span>
<span class="line"></span></code></pre>`,
  },
  "spoiler-default": {
    source: `import { Spoiler } from "@/components/mdx/spoiler"

export default function SpoilerDefault() {
  return (
    <div className="w-full space-y-2">
      <Spoiler summary="Show answer">The answer is 42.</Spoiler>
      <Spoiler summary="Implementation details" open>
        This section is expanded on load.
      </Spoiler>
    </div>
  )
}
`,
    highlighted: `<pre class="shiki shiki-themes github-dark github-light" style="--shiki-dark:#e1e4e8;--shiki-light:#24292e;--shiki-dark-bg:#24292e;--shiki-light-bg:#fff" tabindex="0"><code><span class="line"><span style="--shiki-dark:#F97583;--shiki-light:#D73A49">import</span><span style="--shiki-dark:#E1E4E8;--shiki-light:#24292E"> { Spoiler } </span><span style="--shiki-dark:#F97583;--shiki-light:#D73A49">from</span><span style="--shiki-dark:#9ECBFF;--shiki-light:#032F62"> "@/components/mdx/spoiler"</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-dark:#F97583;--shiki-light:#D73A49">export</span><span style="--shiki-dark:#F97583;--shiki-light:#D73A49"> default</span><span style="--shiki-dark:#F97583;--shiki-light:#D73A49"> function</span><span style="--shiki-dark:#B392F0;--shiki-light:#6F42C1"> SpoilerDefault</span><span style="--shiki-dark:#E1E4E8;--shiki-light:#24292E">() {</span></span>
<span class="line"><span style="--shiki-dark:#F97583;--shiki-light:#D73A49">  return</span><span style="--shiki-dark:#E1E4E8;--shiki-light:#24292E"> (</span></span>
<span class="line"><span style="--shiki-dark:#E1E4E8;--shiki-light:#24292E">    &#x3C;</span><span style="--shiki-dark:#85E89D;--shiki-light:#22863A">div</span><span style="--shiki-dark:#B392F0;--shiki-light:#6F42C1"> className</span><span style="--shiki-dark:#F97583;--shiki-light:#D73A49">=</span><span style="--shiki-dark:#9ECBFF;--shiki-light:#032F62">"w-full space-y-2"</span><span style="--shiki-dark:#E1E4E8;--shiki-light:#24292E">></span></span>
<span class="line"><span style="--shiki-dark:#E1E4E8;--shiki-light:#24292E">      &#x3C;</span><span style="--shiki-dark:#79B8FF;--shiki-light:#005CC5">Spoiler</span><span style="--shiki-dark:#B392F0;--shiki-light:#6F42C1"> summary</span><span style="--shiki-dark:#F97583;--shiki-light:#D73A49">=</span><span style="--shiki-dark:#9ECBFF;--shiki-light:#032F62">"Show answer"</span><span style="--shiki-dark:#E1E4E8;--shiki-light:#24292E">>The answer is 42.&#x3C;/</span><span style="--shiki-dark:#79B8FF;--shiki-light:#005CC5">Spoiler</span><span style="--shiki-dark:#E1E4E8;--shiki-light:#24292E">></span></span>
<span class="line"><span style="--shiki-dark:#E1E4E8;--shiki-light:#24292E">      &#x3C;</span><span style="--shiki-dark:#79B8FF;--shiki-light:#005CC5">Spoiler</span><span style="--shiki-dark:#B392F0;--shiki-light:#6F42C1"> summary</span><span style="--shiki-dark:#F97583;--shiki-light:#D73A49">=</span><span style="--shiki-dark:#9ECBFF;--shiki-light:#032F62">"Implementation details"</span><span style="--shiki-dark:#B392F0;--shiki-light:#6F42C1"> open</span><span style="--shiki-dark:#E1E4E8;--shiki-light:#24292E">></span></span>
<span class="line"><span style="--shiki-dark:#E1E4E8;--shiki-light:#24292E">        This section is expanded on load.</span></span>
<span class="line"><span style="--shiki-dark:#E1E4E8;--shiki-light:#24292E">      &#x3C;/</span><span style="--shiki-dark:#79B8FF;--shiki-light:#005CC5">Spoiler</span><span style="--shiki-dark:#E1E4E8;--shiki-light:#24292E">></span></span>
<span class="line"><span style="--shiki-dark:#E1E4E8;--shiki-light:#24292E">    &#x3C;/</span><span style="--shiki-dark:#85E89D;--shiki-light:#22863A">div</span><span style="--shiki-dark:#E1E4E8;--shiki-light:#24292E">></span></span>
<span class="line"><span style="--shiki-dark:#E1E4E8;--shiki-light:#24292E">  )</span></span>
<span class="line"><span style="--shiki-dark:#E1E4E8;--shiki-light:#24292E">}</span></span>
<span class="line"></span></code></pre>`,
  },
  "steps-default": {
    source: `import { Steps, Step } from "@/components/mdx/steps"

export default function StepsDefault() {
  return (
    <Steps>
      <Step>Create a new Next.js project</Step>
      <Step>Install the required dependencies</Step>
      <Step>Configure your tailwind.config.ts</Step>
      <Step>Start building!</Step>
    </Steps>
  )
}
`,
    highlighted: `<pre class="shiki shiki-themes github-dark github-light" style="--shiki-dark:#e1e4e8;--shiki-light:#24292e;--shiki-dark-bg:#24292e;--shiki-light-bg:#fff" tabindex="0"><code><span class="line"><span style="--shiki-dark:#F97583;--shiki-light:#D73A49">import</span><span style="--shiki-dark:#E1E4E8;--shiki-light:#24292E"> { Steps, Step } </span><span style="--shiki-dark:#F97583;--shiki-light:#D73A49">from</span><span style="--shiki-dark:#9ECBFF;--shiki-light:#032F62"> "@/components/mdx/steps"</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-dark:#F97583;--shiki-light:#D73A49">export</span><span style="--shiki-dark:#F97583;--shiki-light:#D73A49"> default</span><span style="--shiki-dark:#F97583;--shiki-light:#D73A49"> function</span><span style="--shiki-dark:#B392F0;--shiki-light:#6F42C1"> StepsDefault</span><span style="--shiki-dark:#E1E4E8;--shiki-light:#24292E">() {</span></span>
<span class="line"><span style="--shiki-dark:#F97583;--shiki-light:#D73A49">  return</span><span style="--shiki-dark:#E1E4E8;--shiki-light:#24292E"> (</span></span>
<span class="line"><span style="--shiki-dark:#E1E4E8;--shiki-light:#24292E">    &#x3C;</span><span style="--shiki-dark:#79B8FF;--shiki-light:#005CC5">Steps</span><span style="--shiki-dark:#E1E4E8;--shiki-light:#24292E">></span></span>
<span class="line"><span style="--shiki-dark:#E1E4E8;--shiki-light:#24292E">      &#x3C;</span><span style="--shiki-dark:#79B8FF;--shiki-light:#005CC5">Step</span><span style="--shiki-dark:#E1E4E8;--shiki-light:#24292E">>Create a new Next.js project&#x3C;/</span><span style="--shiki-dark:#79B8FF;--shiki-light:#005CC5">Step</span><span style="--shiki-dark:#E1E4E8;--shiki-light:#24292E">></span></span>
<span class="line"><span style="--shiki-dark:#E1E4E8;--shiki-light:#24292E">      &#x3C;</span><span style="--shiki-dark:#79B8FF;--shiki-light:#005CC5">Step</span><span style="--shiki-dark:#E1E4E8;--shiki-light:#24292E">>Install the required dependencies&#x3C;/</span><span style="--shiki-dark:#79B8FF;--shiki-light:#005CC5">Step</span><span style="--shiki-dark:#E1E4E8;--shiki-light:#24292E">></span></span>
<span class="line"><span style="--shiki-dark:#E1E4E8;--shiki-light:#24292E">      &#x3C;</span><span style="--shiki-dark:#79B8FF;--shiki-light:#005CC5">Step</span><span style="--shiki-dark:#E1E4E8;--shiki-light:#24292E">>Configure your tailwind.config.ts&#x3C;/</span><span style="--shiki-dark:#79B8FF;--shiki-light:#005CC5">Step</span><span style="--shiki-dark:#E1E4E8;--shiki-light:#24292E">></span></span>
<span class="line"><span style="--shiki-dark:#E1E4E8;--shiki-light:#24292E">      &#x3C;</span><span style="--shiki-dark:#79B8FF;--shiki-light:#005CC5">Step</span><span style="--shiki-dark:#E1E4E8;--shiki-light:#24292E">>Start building!&#x3C;/</span><span style="--shiki-dark:#79B8FF;--shiki-light:#005CC5">Step</span><span style="--shiki-dark:#E1E4E8;--shiki-light:#24292E">></span></span>
<span class="line"><span style="--shiki-dark:#E1E4E8;--shiki-light:#24292E">    &#x3C;/</span><span style="--shiki-dark:#79B8FF;--shiki-light:#005CC5">Steps</span><span style="--shiki-dark:#E1E4E8;--shiki-light:#24292E">></span></span>
<span class="line"><span style="--shiki-dark:#E1E4E8;--shiki-light:#24292E">  )</span></span>
<span class="line"><span style="--shiki-dark:#E1E4E8;--shiki-light:#24292E">}</span></span>
<span class="line"></span></code></pre>`,
  },
  "tabs-default": {
    source: `"use client"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/mdx/tabs"

export default function TabsDefault() {
  return (
    <Tabs defaultValue="npm">
      <TabsList>
        <TabsTrigger value="npm">npm</TabsTrigger>
        <TabsTrigger value="pnpm">pnpm</TabsTrigger>
        <TabsTrigger value="yarn">yarn</TabsTrigger>
      </TabsList>
      <TabsContent value="npm">
        <code className="block rounded bg-muted px-4 py-2 font-mono text-sm">
          npm install @mdx-ui/components
        </code>
      </TabsContent>
      <TabsContent value="pnpm">
        <code className="block rounded bg-muted px-4 py-2 font-mono text-sm">
          pnpm add @mdx-ui/components
        </code>
      </TabsContent>
      <TabsContent value="yarn">
        <code className="block rounded bg-muted px-4 py-2 font-mono text-sm">
          yarn add @mdx-ui/components
        </code>
      </TabsContent>
    </Tabs>
  )
}
`,
    highlighted: `<pre class="shiki shiki-themes github-dark github-light" style="--shiki-dark:#e1e4e8;--shiki-light:#24292e;--shiki-dark-bg:#24292e;--shiki-light-bg:#fff" tabindex="0"><code><span class="line"><span style="--shiki-dark:#9ECBFF;--shiki-light:#032F62">"use client"</span></span>
<span class="line"><span style="--shiki-dark:#F97583;--shiki-light:#D73A49">import</span><span style="--shiki-dark:#E1E4E8;--shiki-light:#24292E"> { Tabs, TabsList, TabsTrigger, TabsContent } </span><span style="--shiki-dark:#F97583;--shiki-light:#D73A49">from</span><span style="--shiki-dark:#9ECBFF;--shiki-light:#032F62"> "@/components/mdx/tabs"</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-dark:#F97583;--shiki-light:#D73A49">export</span><span style="--shiki-dark:#F97583;--shiki-light:#D73A49"> default</span><span style="--shiki-dark:#F97583;--shiki-light:#D73A49"> function</span><span style="--shiki-dark:#B392F0;--shiki-light:#6F42C1"> TabsDefault</span><span style="--shiki-dark:#E1E4E8;--shiki-light:#24292E">() {</span></span>
<span class="line"><span style="--shiki-dark:#F97583;--shiki-light:#D73A49">  return</span><span style="--shiki-dark:#E1E4E8;--shiki-light:#24292E"> (</span></span>
<span class="line"><span style="--shiki-dark:#E1E4E8;--shiki-light:#24292E">    &#x3C;</span><span style="--shiki-dark:#79B8FF;--shiki-light:#005CC5">Tabs</span><span style="--shiki-dark:#B392F0;--shiki-light:#6F42C1"> defaultValue</span><span style="--shiki-dark:#F97583;--shiki-light:#D73A49">=</span><span style="--shiki-dark:#9ECBFF;--shiki-light:#032F62">"npm"</span><span style="--shiki-dark:#E1E4E8;--shiki-light:#24292E">></span></span>
<span class="line"><span style="--shiki-dark:#E1E4E8;--shiki-light:#24292E">      &#x3C;</span><span style="--shiki-dark:#79B8FF;--shiki-light:#005CC5">TabsList</span><span style="--shiki-dark:#E1E4E8;--shiki-light:#24292E">></span></span>
<span class="line"><span style="--shiki-dark:#E1E4E8;--shiki-light:#24292E">        &#x3C;</span><span style="--shiki-dark:#79B8FF;--shiki-light:#005CC5">TabsTrigger</span><span style="--shiki-dark:#B392F0;--shiki-light:#6F42C1"> value</span><span style="--shiki-dark:#F97583;--shiki-light:#D73A49">=</span><span style="--shiki-dark:#9ECBFF;--shiki-light:#032F62">"npm"</span><span style="--shiki-dark:#E1E4E8;--shiki-light:#24292E">>npm&#x3C;/</span><span style="--shiki-dark:#79B8FF;--shiki-light:#005CC5">TabsTrigger</span><span style="--shiki-dark:#E1E4E8;--shiki-light:#24292E">></span></span>
<span class="line"><span style="--shiki-dark:#E1E4E8;--shiki-light:#24292E">        &#x3C;</span><span style="--shiki-dark:#79B8FF;--shiki-light:#005CC5">TabsTrigger</span><span style="--shiki-dark:#B392F0;--shiki-light:#6F42C1"> value</span><span style="--shiki-dark:#F97583;--shiki-light:#D73A49">=</span><span style="--shiki-dark:#9ECBFF;--shiki-light:#032F62">"pnpm"</span><span style="--shiki-dark:#E1E4E8;--shiki-light:#24292E">>pnpm&#x3C;/</span><span style="--shiki-dark:#79B8FF;--shiki-light:#005CC5">TabsTrigger</span><span style="--shiki-dark:#E1E4E8;--shiki-light:#24292E">></span></span>
<span class="line"><span style="--shiki-dark:#E1E4E8;--shiki-light:#24292E">        &#x3C;</span><span style="--shiki-dark:#79B8FF;--shiki-light:#005CC5">TabsTrigger</span><span style="--shiki-dark:#B392F0;--shiki-light:#6F42C1"> value</span><span style="--shiki-dark:#F97583;--shiki-light:#D73A49">=</span><span style="--shiki-dark:#9ECBFF;--shiki-light:#032F62">"yarn"</span><span style="--shiki-dark:#E1E4E8;--shiki-light:#24292E">>yarn&#x3C;/</span><span style="--shiki-dark:#79B8FF;--shiki-light:#005CC5">TabsTrigger</span><span style="--shiki-dark:#E1E4E8;--shiki-light:#24292E">></span></span>
<span class="line"><span style="--shiki-dark:#E1E4E8;--shiki-light:#24292E">      &#x3C;/</span><span style="--shiki-dark:#79B8FF;--shiki-light:#005CC5">TabsList</span><span style="--shiki-dark:#E1E4E8;--shiki-light:#24292E">></span></span>
<span class="line"><span style="--shiki-dark:#E1E4E8;--shiki-light:#24292E">      &#x3C;</span><span style="--shiki-dark:#79B8FF;--shiki-light:#005CC5">TabsContent</span><span style="--shiki-dark:#B392F0;--shiki-light:#6F42C1"> value</span><span style="--shiki-dark:#F97583;--shiki-light:#D73A49">=</span><span style="--shiki-dark:#9ECBFF;--shiki-light:#032F62">"npm"</span><span style="--shiki-dark:#E1E4E8;--shiki-light:#24292E">></span></span>
<span class="line"><span style="--shiki-dark:#E1E4E8;--shiki-light:#24292E">        &#x3C;</span><span style="--shiki-dark:#85E89D;--shiki-light:#22863A">code</span><span style="--shiki-dark:#B392F0;--shiki-light:#6F42C1"> className</span><span style="--shiki-dark:#F97583;--shiki-light:#D73A49">=</span><span style="--shiki-dark:#9ECBFF;--shiki-light:#032F62">"block rounded bg-muted px-4 py-2 font-mono text-sm"</span><span style="--shiki-dark:#E1E4E8;--shiki-light:#24292E">></span></span>
<span class="line"><span style="--shiki-dark:#E1E4E8;--shiki-light:#24292E">          npm install @mdx-ui/components</span></span>
<span class="line"><span style="--shiki-dark:#E1E4E8;--shiki-light:#24292E">        &#x3C;/</span><span style="--shiki-dark:#85E89D;--shiki-light:#22863A">code</span><span style="--shiki-dark:#E1E4E8;--shiki-light:#24292E">></span></span>
<span class="line"><span style="--shiki-dark:#E1E4E8;--shiki-light:#24292E">      &#x3C;/</span><span style="--shiki-dark:#79B8FF;--shiki-light:#005CC5">TabsContent</span><span style="--shiki-dark:#E1E4E8;--shiki-light:#24292E">></span></span>
<span class="line"><span style="--shiki-dark:#E1E4E8;--shiki-light:#24292E">      &#x3C;</span><span style="--shiki-dark:#79B8FF;--shiki-light:#005CC5">TabsContent</span><span style="--shiki-dark:#B392F0;--shiki-light:#6F42C1"> value</span><span style="--shiki-dark:#F97583;--shiki-light:#D73A49">=</span><span style="--shiki-dark:#9ECBFF;--shiki-light:#032F62">"pnpm"</span><span style="--shiki-dark:#E1E4E8;--shiki-light:#24292E">></span></span>
<span class="line"><span style="--shiki-dark:#E1E4E8;--shiki-light:#24292E">        &#x3C;</span><span style="--shiki-dark:#85E89D;--shiki-light:#22863A">code</span><span style="--shiki-dark:#B392F0;--shiki-light:#6F42C1"> className</span><span style="--shiki-dark:#F97583;--shiki-light:#D73A49">=</span><span style="--shiki-dark:#9ECBFF;--shiki-light:#032F62">"block rounded bg-muted px-4 py-2 font-mono text-sm"</span><span style="--shiki-dark:#E1E4E8;--shiki-light:#24292E">></span></span>
<span class="line"><span style="--shiki-dark:#E1E4E8;--shiki-light:#24292E">          pnpm add @mdx-ui/components</span></span>
<span class="line"><span style="--shiki-dark:#E1E4E8;--shiki-light:#24292E">        &#x3C;/</span><span style="--shiki-dark:#85E89D;--shiki-light:#22863A">code</span><span style="--shiki-dark:#E1E4E8;--shiki-light:#24292E">></span></span>
<span class="line"><span style="--shiki-dark:#E1E4E8;--shiki-light:#24292E">      &#x3C;/</span><span style="--shiki-dark:#79B8FF;--shiki-light:#005CC5">TabsContent</span><span style="--shiki-dark:#E1E4E8;--shiki-light:#24292E">></span></span>
<span class="line"><span style="--shiki-dark:#E1E4E8;--shiki-light:#24292E">      &#x3C;</span><span style="--shiki-dark:#79B8FF;--shiki-light:#005CC5">TabsContent</span><span style="--shiki-dark:#B392F0;--shiki-light:#6F42C1"> value</span><span style="--shiki-dark:#F97583;--shiki-light:#D73A49">=</span><span style="--shiki-dark:#9ECBFF;--shiki-light:#032F62">"yarn"</span><span style="--shiki-dark:#E1E4E8;--shiki-light:#24292E">></span></span>
<span class="line"><span style="--shiki-dark:#E1E4E8;--shiki-light:#24292E">        &#x3C;</span><span style="--shiki-dark:#85E89D;--shiki-light:#22863A">code</span><span style="--shiki-dark:#B392F0;--shiki-light:#6F42C1"> className</span><span style="--shiki-dark:#F97583;--shiki-light:#D73A49">=</span><span style="--shiki-dark:#9ECBFF;--shiki-light:#032F62">"block rounded bg-muted px-4 py-2 font-mono text-sm"</span><span style="--shiki-dark:#E1E4E8;--shiki-light:#24292E">></span></span>
<span class="line"><span style="--shiki-dark:#E1E4E8;--shiki-light:#24292E">          yarn add @mdx-ui/components</span></span>
<span class="line"><span style="--shiki-dark:#E1E4E8;--shiki-light:#24292E">        &#x3C;/</span><span style="--shiki-dark:#85E89D;--shiki-light:#22863A">code</span><span style="--shiki-dark:#E1E4E8;--shiki-light:#24292E">></span></span>
<span class="line"><span style="--shiki-dark:#E1E4E8;--shiki-light:#24292E">      &#x3C;/</span><span style="--shiki-dark:#79B8FF;--shiki-light:#005CC5">TabsContent</span><span style="--shiki-dark:#E1E4E8;--shiki-light:#24292E">></span></span>
<span class="line"><span style="--shiki-dark:#E1E4E8;--shiki-light:#24292E">    &#x3C;/</span><span style="--shiki-dark:#79B8FF;--shiki-light:#005CC5">Tabs</span><span style="--shiki-dark:#E1E4E8;--shiki-light:#24292E">></span></span>
<span class="line"><span style="--shiki-dark:#E1E4E8;--shiki-light:#24292E">  )</span></span>
<span class="line"><span style="--shiki-dark:#E1E4E8;--shiki-light:#24292E">}</span></span>
<span class="line"></span></code></pre>`,
  },
};
