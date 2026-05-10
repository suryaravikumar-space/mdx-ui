// THIS FILE IS AUTO-GENERATED. DO NOT EDIT MANUALLY.
// Run `tsx scripts/build-previews.ts` to regenerate.
// NOTE: This file is generated but committed to the repository.

export const DEMO_SOURCES: Record<string, { source: string; highlighted: string }> = {
  "accordion-default": {
    source: `"use client";
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/mdx/accordion";

export default function AccordionDefault() {
  return (
    <Accordion defaultValue="item-1" className="w-full max-w-lg">
      <AccordionItem value="item-1">
        <AccordionTrigger>What is mdx-ui?</AccordionTrigger>
        <AccordionContent>
          mdx-ui is a collection of copy-paste MDX components built with
          Tailwind CSS. Add only what you need.
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="item-2">
        <AccordionTrigger>Does it work with Next.js?</AccordionTrigger>
        <AccordionContent>
          Yes. mdx-ui works with Next.js, Astro, Vite React, and any framework
          that supports MDX.
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="item-3">
        <AccordionTrigger>Is it accessible?</AccordionTrigger>
        <AccordionContent>
          Yes. The accordion uses proper ARIA attributes — aria-expanded on the
          trigger and keyboard focus management.
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
}
`,
    highlighted: `<pre class="shiki shiki-themes github-dark github-light" style="--shiki-dark:#e1e4e8;--shiki-light:#24292e;--shiki-dark-bg:#24292e;--shiki-light-bg:#fff" tabindex="0"><code><span class="line"><span style="--shiki-dark:#9ECBFF;--shiki-light:#032F62">"use client"</span><span style="--shiki-dark:#E1E4E8;--shiki-light:#24292E">;</span></span>
<span class="line"><span style="--shiki-dark:#F97583;--shiki-light:#D73A49">import</span><span style="--shiki-dark:#E1E4E8;--shiki-light:#24292E"> {</span></span>
<span class="line"><span style="--shiki-dark:#E1E4E8;--shiki-light:#24292E">  Accordion,</span></span>
<span class="line"><span style="--shiki-dark:#E1E4E8;--shiki-light:#24292E">  AccordionItem,</span></span>
<span class="line"><span style="--shiki-dark:#E1E4E8;--shiki-light:#24292E">  AccordionTrigger,</span></span>
<span class="line"><span style="--shiki-dark:#E1E4E8;--shiki-light:#24292E">  AccordionContent,</span></span>
<span class="line"><span style="--shiki-dark:#E1E4E8;--shiki-light:#24292E">} </span><span style="--shiki-dark:#F97583;--shiki-light:#D73A49">from</span><span style="--shiki-dark:#9ECBFF;--shiki-light:#032F62"> "@/components/mdx/accordion"</span><span style="--shiki-dark:#E1E4E8;--shiki-light:#24292E">;</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-dark:#F97583;--shiki-light:#D73A49">export</span><span style="--shiki-dark:#F97583;--shiki-light:#D73A49"> default</span><span style="--shiki-dark:#F97583;--shiki-light:#D73A49"> function</span><span style="--shiki-dark:#B392F0;--shiki-light:#6F42C1"> AccordionDefault</span><span style="--shiki-dark:#E1E4E8;--shiki-light:#24292E">() {</span></span>
<span class="line"><span style="--shiki-dark:#F97583;--shiki-light:#D73A49">  return</span><span style="--shiki-dark:#E1E4E8;--shiki-light:#24292E"> (</span></span>
<span class="line"><span style="--shiki-dark:#E1E4E8;--shiki-light:#24292E">    &#x3C;</span><span style="--shiki-dark:#79B8FF;--shiki-light:#005CC5">Accordion</span><span style="--shiki-dark:#B392F0;--shiki-light:#6F42C1"> defaultValue</span><span style="--shiki-dark:#F97583;--shiki-light:#D73A49">=</span><span style="--shiki-dark:#9ECBFF;--shiki-light:#032F62">"item-1"</span><span style="--shiki-dark:#B392F0;--shiki-light:#6F42C1"> className</span><span style="--shiki-dark:#F97583;--shiki-light:#D73A49">=</span><span style="--shiki-dark:#9ECBFF;--shiki-light:#032F62">"w-full max-w-lg"</span><span style="--shiki-dark:#E1E4E8;--shiki-light:#24292E">></span></span>
<span class="line"><span style="--shiki-dark:#E1E4E8;--shiki-light:#24292E">      &#x3C;</span><span style="--shiki-dark:#79B8FF;--shiki-light:#005CC5">AccordionItem</span><span style="--shiki-dark:#B392F0;--shiki-light:#6F42C1"> value</span><span style="--shiki-dark:#F97583;--shiki-light:#D73A49">=</span><span style="--shiki-dark:#9ECBFF;--shiki-light:#032F62">"item-1"</span><span style="--shiki-dark:#E1E4E8;--shiki-light:#24292E">></span></span>
<span class="line"><span style="--shiki-dark:#E1E4E8;--shiki-light:#24292E">        &#x3C;</span><span style="--shiki-dark:#79B8FF;--shiki-light:#005CC5">AccordionTrigger</span><span style="--shiki-dark:#E1E4E8;--shiki-light:#24292E">>What is mdx-ui?&#x3C;/</span><span style="--shiki-dark:#79B8FF;--shiki-light:#005CC5">AccordionTrigger</span><span style="--shiki-dark:#E1E4E8;--shiki-light:#24292E">></span></span>
<span class="line"><span style="--shiki-dark:#E1E4E8;--shiki-light:#24292E">        &#x3C;</span><span style="--shiki-dark:#79B8FF;--shiki-light:#005CC5">AccordionContent</span><span style="--shiki-dark:#E1E4E8;--shiki-light:#24292E">></span></span>
<span class="line"><span style="--shiki-dark:#E1E4E8;--shiki-light:#24292E">          mdx-ui is a collection of copy-paste MDX components built with</span></span>
<span class="line"><span style="--shiki-dark:#E1E4E8;--shiki-light:#24292E">          Tailwind CSS. Add only what you need.</span></span>
<span class="line"><span style="--shiki-dark:#E1E4E8;--shiki-light:#24292E">        &#x3C;/</span><span style="--shiki-dark:#79B8FF;--shiki-light:#005CC5">AccordionContent</span><span style="--shiki-dark:#E1E4E8;--shiki-light:#24292E">></span></span>
<span class="line"><span style="--shiki-dark:#E1E4E8;--shiki-light:#24292E">      &#x3C;/</span><span style="--shiki-dark:#79B8FF;--shiki-light:#005CC5">AccordionItem</span><span style="--shiki-dark:#E1E4E8;--shiki-light:#24292E">></span></span>
<span class="line"><span style="--shiki-dark:#E1E4E8;--shiki-light:#24292E">      &#x3C;</span><span style="--shiki-dark:#79B8FF;--shiki-light:#005CC5">AccordionItem</span><span style="--shiki-dark:#B392F0;--shiki-light:#6F42C1"> value</span><span style="--shiki-dark:#F97583;--shiki-light:#D73A49">=</span><span style="--shiki-dark:#9ECBFF;--shiki-light:#032F62">"item-2"</span><span style="--shiki-dark:#E1E4E8;--shiki-light:#24292E">></span></span>
<span class="line"><span style="--shiki-dark:#E1E4E8;--shiki-light:#24292E">        &#x3C;</span><span style="--shiki-dark:#79B8FF;--shiki-light:#005CC5">AccordionTrigger</span><span style="--shiki-dark:#E1E4E8;--shiki-light:#24292E">>Does it work with Next.js?&#x3C;/</span><span style="--shiki-dark:#79B8FF;--shiki-light:#005CC5">AccordionTrigger</span><span style="--shiki-dark:#E1E4E8;--shiki-light:#24292E">></span></span>
<span class="line"><span style="--shiki-dark:#E1E4E8;--shiki-light:#24292E">        &#x3C;</span><span style="--shiki-dark:#79B8FF;--shiki-light:#005CC5">AccordionContent</span><span style="--shiki-dark:#E1E4E8;--shiki-light:#24292E">></span></span>
<span class="line"><span style="--shiki-dark:#E1E4E8;--shiki-light:#24292E">          Yes. mdx-ui works with Next.js, Astro, Vite React, and any framework</span></span>
<span class="line"><span style="--shiki-dark:#E1E4E8;--shiki-light:#24292E">          that supports MDX.</span></span>
<span class="line"><span style="--shiki-dark:#E1E4E8;--shiki-light:#24292E">        &#x3C;/</span><span style="--shiki-dark:#79B8FF;--shiki-light:#005CC5">AccordionContent</span><span style="--shiki-dark:#E1E4E8;--shiki-light:#24292E">></span></span>
<span class="line"><span style="--shiki-dark:#E1E4E8;--shiki-light:#24292E">      &#x3C;/</span><span style="--shiki-dark:#79B8FF;--shiki-light:#005CC5">AccordionItem</span><span style="--shiki-dark:#E1E4E8;--shiki-light:#24292E">></span></span>
<span class="line"><span style="--shiki-dark:#E1E4E8;--shiki-light:#24292E">      &#x3C;</span><span style="--shiki-dark:#79B8FF;--shiki-light:#005CC5">AccordionItem</span><span style="--shiki-dark:#B392F0;--shiki-light:#6F42C1"> value</span><span style="--shiki-dark:#F97583;--shiki-light:#D73A49">=</span><span style="--shiki-dark:#9ECBFF;--shiki-light:#032F62">"item-3"</span><span style="--shiki-dark:#E1E4E8;--shiki-light:#24292E">></span></span>
<span class="line"><span style="--shiki-dark:#E1E4E8;--shiki-light:#24292E">        &#x3C;</span><span style="--shiki-dark:#79B8FF;--shiki-light:#005CC5">AccordionTrigger</span><span style="--shiki-dark:#E1E4E8;--shiki-light:#24292E">>Is it accessible?&#x3C;/</span><span style="--shiki-dark:#79B8FF;--shiki-light:#005CC5">AccordionTrigger</span><span style="--shiki-dark:#E1E4E8;--shiki-light:#24292E">></span></span>
<span class="line"><span style="--shiki-dark:#E1E4E8;--shiki-light:#24292E">        &#x3C;</span><span style="--shiki-dark:#79B8FF;--shiki-light:#005CC5">AccordionContent</span><span style="--shiki-dark:#E1E4E8;--shiki-light:#24292E">></span></span>
<span class="line"><span style="--shiki-dark:#E1E4E8;--shiki-light:#24292E">          Yes. The accordion uses proper ARIA attributes — aria-expanded on the</span></span>
<span class="line"><span style="--shiki-dark:#E1E4E8;--shiki-light:#24292E">          trigger and keyboard focus management.</span></span>
<span class="line"><span style="--shiki-dark:#E1E4E8;--shiki-light:#24292E">        &#x3C;/</span><span style="--shiki-dark:#79B8FF;--shiki-light:#005CC5">AccordionContent</span><span style="--shiki-dark:#E1E4E8;--shiki-light:#24292E">></span></span>
<span class="line"><span style="--shiki-dark:#E1E4E8;--shiki-light:#24292E">      &#x3C;/</span><span style="--shiki-dark:#79B8FF;--shiki-light:#005CC5">AccordionItem</span><span style="--shiki-dark:#E1E4E8;--shiki-light:#24292E">></span></span>
<span class="line"><span style="--shiki-dark:#E1E4E8;--shiki-light:#24292E">    &#x3C;/</span><span style="--shiki-dark:#79B8FF;--shiki-light:#005CC5">Accordion</span><span style="--shiki-dark:#E1E4E8;--shiki-light:#24292E">></span></span>
<span class="line"><span style="--shiki-dark:#E1E4E8;--shiki-light:#24292E">  );</span></span>
<span class="line"><span style="--shiki-dark:#E1E4E8;--shiki-light:#24292E">}</span></span>
<span class="line"></span></code></pre>`,
  },
  "alert-default": {
    source: `import { Alert, AlertTitle, AlertDescription } from "@/components/mdx/alert";

export default function AlertDefault() {
  return (
    <div className="w-full space-y-3">
      <Alert variant="info">
        <AlertTitle>New version available</AlertTitle>
        <AlertDescription>
          Run npm update to get the latest features and fixes.
        </AlertDescription>
      </Alert>
      <Alert variant="warning">
        <AlertTitle>Deprecation notice</AlertTitle>
        <AlertDescription>
          This API will be removed in the next major version. Please migrate to
          the new one.
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
        <AlertDescription>
          Your changes are live at production.
        </AlertDescription>
      </Alert>
    </div>
  );
}
`,
    highlighted: `<pre class="shiki shiki-themes github-dark github-light" style="--shiki-dark:#e1e4e8;--shiki-light:#24292e;--shiki-dark-bg:#24292e;--shiki-light-bg:#fff" tabindex="0"><code><span class="line"><span style="--shiki-dark:#F97583;--shiki-light:#D73A49">import</span><span style="--shiki-dark:#E1E4E8;--shiki-light:#24292E"> { Alert, AlertTitle, AlertDescription } </span><span style="--shiki-dark:#F97583;--shiki-light:#D73A49">from</span><span style="--shiki-dark:#9ECBFF;--shiki-light:#032F62"> "@/components/mdx/alert"</span><span style="--shiki-dark:#E1E4E8;--shiki-light:#24292E">;</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-dark:#F97583;--shiki-light:#D73A49">export</span><span style="--shiki-dark:#F97583;--shiki-light:#D73A49"> default</span><span style="--shiki-dark:#F97583;--shiki-light:#D73A49"> function</span><span style="--shiki-dark:#B392F0;--shiki-light:#6F42C1"> AlertDefault</span><span style="--shiki-dark:#E1E4E8;--shiki-light:#24292E">() {</span></span>
<span class="line"><span style="--shiki-dark:#F97583;--shiki-light:#D73A49">  return</span><span style="--shiki-dark:#E1E4E8;--shiki-light:#24292E"> (</span></span>
<span class="line"><span style="--shiki-dark:#E1E4E8;--shiki-light:#24292E">    &#x3C;</span><span style="--shiki-dark:#85E89D;--shiki-light:#22863A">div</span><span style="--shiki-dark:#B392F0;--shiki-light:#6F42C1"> className</span><span style="--shiki-dark:#F97583;--shiki-light:#D73A49">=</span><span style="--shiki-dark:#9ECBFF;--shiki-light:#032F62">"w-full space-y-3"</span><span style="--shiki-dark:#E1E4E8;--shiki-light:#24292E">></span></span>
<span class="line"><span style="--shiki-dark:#E1E4E8;--shiki-light:#24292E">      &#x3C;</span><span style="--shiki-dark:#79B8FF;--shiki-light:#005CC5">Alert</span><span style="--shiki-dark:#B392F0;--shiki-light:#6F42C1"> variant</span><span style="--shiki-dark:#F97583;--shiki-light:#D73A49">=</span><span style="--shiki-dark:#9ECBFF;--shiki-light:#032F62">"info"</span><span style="--shiki-dark:#E1E4E8;--shiki-light:#24292E">></span></span>
<span class="line"><span style="--shiki-dark:#E1E4E8;--shiki-light:#24292E">        &#x3C;</span><span style="--shiki-dark:#79B8FF;--shiki-light:#005CC5">AlertTitle</span><span style="--shiki-dark:#E1E4E8;--shiki-light:#24292E">>New version available&#x3C;/</span><span style="--shiki-dark:#79B8FF;--shiki-light:#005CC5">AlertTitle</span><span style="--shiki-dark:#E1E4E8;--shiki-light:#24292E">></span></span>
<span class="line"><span style="--shiki-dark:#E1E4E8;--shiki-light:#24292E">        &#x3C;</span><span style="--shiki-dark:#79B8FF;--shiki-light:#005CC5">AlertDescription</span><span style="--shiki-dark:#E1E4E8;--shiki-light:#24292E">></span></span>
<span class="line"><span style="--shiki-dark:#E1E4E8;--shiki-light:#24292E">          Run npm update to get the latest features and fixes.</span></span>
<span class="line"><span style="--shiki-dark:#E1E4E8;--shiki-light:#24292E">        &#x3C;/</span><span style="--shiki-dark:#79B8FF;--shiki-light:#005CC5">AlertDescription</span><span style="--shiki-dark:#E1E4E8;--shiki-light:#24292E">></span></span>
<span class="line"><span style="--shiki-dark:#E1E4E8;--shiki-light:#24292E">      &#x3C;/</span><span style="--shiki-dark:#79B8FF;--shiki-light:#005CC5">Alert</span><span style="--shiki-dark:#E1E4E8;--shiki-light:#24292E">></span></span>
<span class="line"><span style="--shiki-dark:#E1E4E8;--shiki-light:#24292E">      &#x3C;</span><span style="--shiki-dark:#79B8FF;--shiki-light:#005CC5">Alert</span><span style="--shiki-dark:#B392F0;--shiki-light:#6F42C1"> variant</span><span style="--shiki-dark:#F97583;--shiki-light:#D73A49">=</span><span style="--shiki-dark:#9ECBFF;--shiki-light:#032F62">"warning"</span><span style="--shiki-dark:#E1E4E8;--shiki-light:#24292E">></span></span>
<span class="line"><span style="--shiki-dark:#E1E4E8;--shiki-light:#24292E">        &#x3C;</span><span style="--shiki-dark:#79B8FF;--shiki-light:#005CC5">AlertTitle</span><span style="--shiki-dark:#E1E4E8;--shiki-light:#24292E">>Deprecation notice&#x3C;/</span><span style="--shiki-dark:#79B8FF;--shiki-light:#005CC5">AlertTitle</span><span style="--shiki-dark:#E1E4E8;--shiki-light:#24292E">></span></span>
<span class="line"><span style="--shiki-dark:#E1E4E8;--shiki-light:#24292E">        &#x3C;</span><span style="--shiki-dark:#79B8FF;--shiki-light:#005CC5">AlertDescription</span><span style="--shiki-dark:#E1E4E8;--shiki-light:#24292E">></span></span>
<span class="line"><span style="--shiki-dark:#E1E4E8;--shiki-light:#24292E">          This API will be removed in the next major version. Please migrate to</span></span>
<span class="line"><span style="--shiki-dark:#E1E4E8;--shiki-light:#24292E">          the new one.</span></span>
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
<span class="line"><span style="--shiki-dark:#E1E4E8;--shiki-light:#24292E">        &#x3C;</span><span style="--shiki-dark:#79B8FF;--shiki-light:#005CC5">AlertDescription</span><span style="--shiki-dark:#E1E4E8;--shiki-light:#24292E">></span></span>
<span class="line"><span style="--shiki-dark:#E1E4E8;--shiki-light:#24292E">          Your changes are live at production.</span></span>
<span class="line"><span style="--shiki-dark:#E1E4E8;--shiki-light:#24292E">        &#x3C;/</span><span style="--shiki-dark:#79B8FF;--shiki-light:#005CC5">AlertDescription</span><span style="--shiki-dark:#E1E4E8;--shiki-light:#24292E">></span></span>
<span class="line"><span style="--shiki-dark:#E1E4E8;--shiki-light:#24292E">      &#x3C;/</span><span style="--shiki-dark:#79B8FF;--shiki-light:#005CC5">Alert</span><span style="--shiki-dark:#E1E4E8;--shiki-light:#24292E">></span></span>
<span class="line"><span style="--shiki-dark:#E1E4E8;--shiki-light:#24292E">    &#x3C;/</span><span style="--shiki-dark:#85E89D;--shiki-light:#22863A">div</span><span style="--shiki-dark:#E1E4E8;--shiki-light:#24292E">></span></span>
<span class="line"><span style="--shiki-dark:#E1E4E8;--shiki-light:#24292E">  );</span></span>
<span class="line"><span style="--shiki-dark:#E1E4E8;--shiki-light:#24292E">}</span></span>
<span class="line"></span></code></pre>`,
  },
  "annotation-default": {
    source: `"use client"
import { Annotation } from "@/components/mdx/annotation"

export default function AnnotationDefault() {
  return (
    <p className="text-sm leading-7">
      This algorithm runs in{" "}
      <Annotation note="For each of n elements, we compare against all others — n × n operations.">
        O(n²) time
      </Annotation>{" "}
      and{" "}
      <Annotation note="We only use a fixed number of extra variables regardless of input size.">
        O(1) space
      </Annotation>
      . Click the underlined terms to learn more.
    </p>
  )
}
`,
    highlighted: `<pre class="shiki shiki-themes github-dark github-light" style="--shiki-dark:#e1e4e8;--shiki-light:#24292e;--shiki-dark-bg:#24292e;--shiki-light-bg:#fff" tabindex="0"><code><span class="line"><span style="--shiki-dark:#9ECBFF;--shiki-light:#032F62">"use client"</span></span>
<span class="line"><span style="--shiki-dark:#F97583;--shiki-light:#D73A49">import</span><span style="--shiki-dark:#E1E4E8;--shiki-light:#24292E"> { Annotation } </span><span style="--shiki-dark:#F97583;--shiki-light:#D73A49">from</span><span style="--shiki-dark:#9ECBFF;--shiki-light:#032F62"> "@/components/mdx/annotation"</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-dark:#F97583;--shiki-light:#D73A49">export</span><span style="--shiki-dark:#F97583;--shiki-light:#D73A49"> default</span><span style="--shiki-dark:#F97583;--shiki-light:#D73A49"> function</span><span style="--shiki-dark:#B392F0;--shiki-light:#6F42C1"> AnnotationDefault</span><span style="--shiki-dark:#E1E4E8;--shiki-light:#24292E">() {</span></span>
<span class="line"><span style="--shiki-dark:#F97583;--shiki-light:#D73A49">  return</span><span style="--shiki-dark:#E1E4E8;--shiki-light:#24292E"> (</span></span>
<span class="line"><span style="--shiki-dark:#E1E4E8;--shiki-light:#24292E">    &#x3C;</span><span style="--shiki-dark:#85E89D;--shiki-light:#22863A">p</span><span style="--shiki-dark:#B392F0;--shiki-light:#6F42C1"> className</span><span style="--shiki-dark:#F97583;--shiki-light:#D73A49">=</span><span style="--shiki-dark:#9ECBFF;--shiki-light:#032F62">"text-sm leading-7"</span><span style="--shiki-dark:#E1E4E8;--shiki-light:#24292E">></span></span>
<span class="line"><span style="--shiki-dark:#E1E4E8;--shiki-light:#24292E">      This algorithm runs in{</span><span style="--shiki-dark:#9ECBFF;--shiki-light:#032F62">" "</span><span style="--shiki-dark:#E1E4E8;--shiki-light:#24292E">}</span></span>
<span class="line"><span style="--shiki-dark:#E1E4E8;--shiki-light:#24292E">      &#x3C;</span><span style="--shiki-dark:#79B8FF;--shiki-light:#005CC5">Annotation</span><span style="--shiki-dark:#B392F0;--shiki-light:#6F42C1"> note</span><span style="--shiki-dark:#F97583;--shiki-light:#D73A49">=</span><span style="--shiki-dark:#9ECBFF;--shiki-light:#032F62">"For each of n elements, we compare against all others — n × n operations."</span><span style="--shiki-dark:#E1E4E8;--shiki-light:#24292E">></span></span>
<span class="line"><span style="--shiki-dark:#E1E4E8;--shiki-light:#24292E">        O(n²) time</span></span>
<span class="line"><span style="--shiki-dark:#E1E4E8;--shiki-light:#24292E">      &#x3C;/</span><span style="--shiki-dark:#79B8FF;--shiki-light:#005CC5">Annotation</span><span style="--shiki-dark:#E1E4E8;--shiki-light:#24292E">>{</span><span style="--shiki-dark:#9ECBFF;--shiki-light:#032F62">" "</span><span style="--shiki-dark:#E1E4E8;--shiki-light:#24292E">}</span></span>
<span class="line"><span style="--shiki-dark:#E1E4E8;--shiki-light:#24292E">      and{</span><span style="--shiki-dark:#9ECBFF;--shiki-light:#032F62">" "</span><span style="--shiki-dark:#E1E4E8;--shiki-light:#24292E">}</span></span>
<span class="line"><span style="--shiki-dark:#E1E4E8;--shiki-light:#24292E">      &#x3C;</span><span style="--shiki-dark:#79B8FF;--shiki-light:#005CC5">Annotation</span><span style="--shiki-dark:#B392F0;--shiki-light:#6F42C1"> note</span><span style="--shiki-dark:#F97583;--shiki-light:#D73A49">=</span><span style="--shiki-dark:#9ECBFF;--shiki-light:#032F62">"We only use a fixed number of extra variables regardless of input size."</span><span style="--shiki-dark:#E1E4E8;--shiki-light:#24292E">></span></span>
<span class="line"><span style="--shiki-dark:#E1E4E8;--shiki-light:#24292E">        O(1) space</span></span>
<span class="line"><span style="--shiki-dark:#E1E4E8;--shiki-light:#24292E">      &#x3C;/</span><span style="--shiki-dark:#79B8FF;--shiki-light:#005CC5">Annotation</span><span style="--shiki-dark:#E1E4E8;--shiki-light:#24292E">></span></span>
<span class="line"><span style="--shiki-dark:#E1E4E8;--shiki-light:#24292E">      . Click the underlined terms to learn more.</span></span>
<span class="line"><span style="--shiki-dark:#E1E4E8;--shiki-light:#24292E">    &#x3C;/</span><span style="--shiki-dark:#85E89D;--shiki-light:#22863A">p</span><span style="--shiki-dark:#E1E4E8;--shiki-light:#24292E">></span></span>
<span class="line"><span style="--shiki-dark:#E1E4E8;--shiki-light:#24292E">  )</span></span>
<span class="line"><span style="--shiki-dark:#E1E4E8;--shiki-light:#24292E">}</span></span>
<span class="line"></span></code></pre>`,
  },
  "badge-variants": {
    source: `import { Badge } from "@/components/mdx/badge";

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
  );
}
`,
    highlighted: `<pre class="shiki shiki-themes github-dark github-light" style="--shiki-dark:#e1e4e8;--shiki-light:#24292e;--shiki-dark-bg:#24292e;--shiki-light-bg:#fff" tabindex="0"><code><span class="line"><span style="--shiki-dark:#F97583;--shiki-light:#D73A49">import</span><span style="--shiki-dark:#E1E4E8;--shiki-light:#24292E"> { Badge } </span><span style="--shiki-dark:#F97583;--shiki-light:#D73A49">from</span><span style="--shiki-dark:#9ECBFF;--shiki-light:#032F62"> "@/components/mdx/badge"</span><span style="--shiki-dark:#E1E4E8;--shiki-light:#24292E">;</span></span>
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
<span class="line"><span style="--shiki-dark:#E1E4E8;--shiki-light:#24292E">  );</span></span>
<span class="line"><span style="--shiki-dark:#E1E4E8;--shiki-light:#24292E">}</span></span>
<span class="line"></span></code></pre>`,
  },
  "blockquote-default": {
    source: `import { Blockquote } from "@/components/mdx/blockquote"

export default function BlockquoteDefault() {
  return (
    <div className="w-full space-y-4">
      <Blockquote>
        Make it work, make it right, make it fast.
      </Blockquote>
      <Blockquote cite="Donald Knuth">
        Premature optimization is the root of all evil.
      </Blockquote>
    </div>
  )
}
`,
    highlighted: `<pre class="shiki shiki-themes github-dark github-light" style="--shiki-dark:#e1e4e8;--shiki-light:#24292e;--shiki-dark-bg:#24292e;--shiki-light-bg:#fff" tabindex="0"><code><span class="line"><span style="--shiki-dark:#F97583;--shiki-light:#D73A49">import</span><span style="--shiki-dark:#E1E4E8;--shiki-light:#24292E"> { Blockquote } </span><span style="--shiki-dark:#F97583;--shiki-light:#D73A49">from</span><span style="--shiki-dark:#9ECBFF;--shiki-light:#032F62"> "@/components/mdx/blockquote"</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-dark:#F97583;--shiki-light:#D73A49">export</span><span style="--shiki-dark:#F97583;--shiki-light:#D73A49"> default</span><span style="--shiki-dark:#F97583;--shiki-light:#D73A49"> function</span><span style="--shiki-dark:#B392F0;--shiki-light:#6F42C1"> BlockquoteDefault</span><span style="--shiki-dark:#E1E4E8;--shiki-light:#24292E">() {</span></span>
<span class="line"><span style="--shiki-dark:#F97583;--shiki-light:#D73A49">  return</span><span style="--shiki-dark:#E1E4E8;--shiki-light:#24292E"> (</span></span>
<span class="line"><span style="--shiki-dark:#E1E4E8;--shiki-light:#24292E">    &#x3C;</span><span style="--shiki-dark:#85E89D;--shiki-light:#22863A">div</span><span style="--shiki-dark:#B392F0;--shiki-light:#6F42C1"> className</span><span style="--shiki-dark:#F97583;--shiki-light:#D73A49">=</span><span style="--shiki-dark:#9ECBFF;--shiki-light:#032F62">"w-full space-y-4"</span><span style="--shiki-dark:#E1E4E8;--shiki-light:#24292E">></span></span>
<span class="line"><span style="--shiki-dark:#E1E4E8;--shiki-light:#24292E">      &#x3C;</span><span style="--shiki-dark:#79B8FF;--shiki-light:#005CC5">Blockquote</span><span style="--shiki-dark:#E1E4E8;--shiki-light:#24292E">></span></span>
<span class="line"><span style="--shiki-dark:#E1E4E8;--shiki-light:#24292E">        Make it work, make it right, make it fast.</span></span>
<span class="line"><span style="--shiki-dark:#E1E4E8;--shiki-light:#24292E">      &#x3C;/</span><span style="--shiki-dark:#79B8FF;--shiki-light:#005CC5">Blockquote</span><span style="--shiki-dark:#E1E4E8;--shiki-light:#24292E">></span></span>
<span class="line"><span style="--shiki-dark:#E1E4E8;--shiki-light:#24292E">      &#x3C;</span><span style="--shiki-dark:#79B8FF;--shiki-light:#005CC5">Blockquote</span><span style="--shiki-dark:#B392F0;--shiki-light:#6F42C1"> cite</span><span style="--shiki-dark:#F97583;--shiki-light:#D73A49">=</span><span style="--shiki-dark:#9ECBFF;--shiki-light:#032F62">"Donald Knuth"</span><span style="--shiki-dark:#E1E4E8;--shiki-light:#24292E">></span></span>
<span class="line"><span style="--shiki-dark:#E1E4E8;--shiki-light:#24292E">        Premature optimization is the root of all evil.</span></span>
<span class="line"><span style="--shiki-dark:#E1E4E8;--shiki-light:#24292E">      &#x3C;/</span><span style="--shiki-dark:#79B8FF;--shiki-light:#005CC5">Blockquote</span><span style="--shiki-dark:#E1E4E8;--shiki-light:#24292E">></span></span>
<span class="line"><span style="--shiki-dark:#E1E4E8;--shiki-light:#24292E">    &#x3C;/</span><span style="--shiki-dark:#85E89D;--shiki-light:#22863A">div</span><span style="--shiki-dark:#E1E4E8;--shiki-light:#24292E">></span></span>
<span class="line"><span style="--shiki-dark:#E1E4E8;--shiki-light:#24292E">  )</span></span>
<span class="line"><span style="--shiki-dark:#E1E4E8;--shiki-light:#24292E">}</span></span>
<span class="line"></span></code></pre>`,
  },
  "callout-default": {
    source: `import { Callout } from "@/components/mdx/callout";

export default function CalloutDefault() {
  return (
    <div className="w-full space-y-0">
      <Callout variant="info">
        This is an informational message to help guide users.
      </Callout>
      <Callout variant="warning">
        Warning: This action cannot be undone. Please proceed with caution.
      </Callout>
      <Callout variant="danger">
        Error: This is a critical error that needs immediate attention.
      </Callout>
      <Callout variant="success">
        Success! Your changes have been saved.
      </Callout>
    </div>
  );
}
`,
    highlighted: `<pre class="shiki shiki-themes github-dark github-light" style="--shiki-dark:#e1e4e8;--shiki-light:#24292e;--shiki-dark-bg:#24292e;--shiki-light-bg:#fff" tabindex="0"><code><span class="line"><span style="--shiki-dark:#F97583;--shiki-light:#D73A49">import</span><span style="--shiki-dark:#E1E4E8;--shiki-light:#24292E"> { Callout } </span><span style="--shiki-dark:#F97583;--shiki-light:#D73A49">from</span><span style="--shiki-dark:#9ECBFF;--shiki-light:#032F62"> "@/components/mdx/callout"</span><span style="--shiki-dark:#E1E4E8;--shiki-light:#24292E">;</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-dark:#F97583;--shiki-light:#D73A49">export</span><span style="--shiki-dark:#F97583;--shiki-light:#D73A49"> default</span><span style="--shiki-dark:#F97583;--shiki-light:#D73A49"> function</span><span style="--shiki-dark:#B392F0;--shiki-light:#6F42C1"> CalloutDefault</span><span style="--shiki-dark:#E1E4E8;--shiki-light:#24292E">() {</span></span>
<span class="line"><span style="--shiki-dark:#F97583;--shiki-light:#D73A49">  return</span><span style="--shiki-dark:#E1E4E8;--shiki-light:#24292E"> (</span></span>
<span class="line"><span style="--shiki-dark:#E1E4E8;--shiki-light:#24292E">    &#x3C;</span><span style="--shiki-dark:#85E89D;--shiki-light:#22863A">div</span><span style="--shiki-dark:#B392F0;--shiki-light:#6F42C1"> className</span><span style="--shiki-dark:#F97583;--shiki-light:#D73A49">=</span><span style="--shiki-dark:#9ECBFF;--shiki-light:#032F62">"w-full space-y-0"</span><span style="--shiki-dark:#E1E4E8;--shiki-light:#24292E">></span></span>
<span class="line"><span style="--shiki-dark:#E1E4E8;--shiki-light:#24292E">      &#x3C;</span><span style="--shiki-dark:#79B8FF;--shiki-light:#005CC5">Callout</span><span style="--shiki-dark:#B392F0;--shiki-light:#6F42C1"> variant</span><span style="--shiki-dark:#F97583;--shiki-light:#D73A49">=</span><span style="--shiki-dark:#9ECBFF;--shiki-light:#032F62">"info"</span><span style="--shiki-dark:#E1E4E8;--shiki-light:#24292E">></span></span>
<span class="line"><span style="--shiki-dark:#E1E4E8;--shiki-light:#24292E">        This is an informational message to help guide users.</span></span>
<span class="line"><span style="--shiki-dark:#E1E4E8;--shiki-light:#24292E">      &#x3C;/</span><span style="--shiki-dark:#79B8FF;--shiki-light:#005CC5">Callout</span><span style="--shiki-dark:#E1E4E8;--shiki-light:#24292E">></span></span>
<span class="line"><span style="--shiki-dark:#E1E4E8;--shiki-light:#24292E">      &#x3C;</span><span style="--shiki-dark:#79B8FF;--shiki-light:#005CC5">Callout</span><span style="--shiki-dark:#B392F0;--shiki-light:#6F42C1"> variant</span><span style="--shiki-dark:#F97583;--shiki-light:#D73A49">=</span><span style="--shiki-dark:#9ECBFF;--shiki-light:#032F62">"warning"</span><span style="--shiki-dark:#E1E4E8;--shiki-light:#24292E">></span></span>
<span class="line"><span style="--shiki-dark:#E1E4E8;--shiki-light:#24292E">        Warning: This action cannot be undone. Please proceed with caution.</span></span>
<span class="line"><span style="--shiki-dark:#E1E4E8;--shiki-light:#24292E">      &#x3C;/</span><span style="--shiki-dark:#79B8FF;--shiki-light:#005CC5">Callout</span><span style="--shiki-dark:#E1E4E8;--shiki-light:#24292E">></span></span>
<span class="line"><span style="--shiki-dark:#E1E4E8;--shiki-light:#24292E">      &#x3C;</span><span style="--shiki-dark:#79B8FF;--shiki-light:#005CC5">Callout</span><span style="--shiki-dark:#B392F0;--shiki-light:#6F42C1"> variant</span><span style="--shiki-dark:#F97583;--shiki-light:#D73A49">=</span><span style="--shiki-dark:#9ECBFF;--shiki-light:#032F62">"danger"</span><span style="--shiki-dark:#E1E4E8;--shiki-light:#24292E">></span></span>
<span class="line"><span style="--shiki-dark:#E1E4E8;--shiki-light:#24292E">        Error: This is a critical error that needs immediate attention.</span></span>
<span class="line"><span style="--shiki-dark:#E1E4E8;--shiki-light:#24292E">      &#x3C;/</span><span style="--shiki-dark:#79B8FF;--shiki-light:#005CC5">Callout</span><span style="--shiki-dark:#E1E4E8;--shiki-light:#24292E">></span></span>
<span class="line"><span style="--shiki-dark:#E1E4E8;--shiki-light:#24292E">      &#x3C;</span><span style="--shiki-dark:#79B8FF;--shiki-light:#005CC5">Callout</span><span style="--shiki-dark:#B392F0;--shiki-light:#6F42C1"> variant</span><span style="--shiki-dark:#F97583;--shiki-light:#D73A49">=</span><span style="--shiki-dark:#9ECBFF;--shiki-light:#032F62">"success"</span><span style="--shiki-dark:#E1E4E8;--shiki-light:#24292E">></span></span>
<span class="line"><span style="--shiki-dark:#E1E4E8;--shiki-light:#24292E">        Success! Your changes have been saved.</span></span>
<span class="line"><span style="--shiki-dark:#E1E4E8;--shiki-light:#24292E">      &#x3C;/</span><span style="--shiki-dark:#79B8FF;--shiki-light:#005CC5">Callout</span><span style="--shiki-dark:#E1E4E8;--shiki-light:#24292E">></span></span>
<span class="line"><span style="--shiki-dark:#E1E4E8;--shiki-light:#24292E">    &#x3C;/</span><span style="--shiki-dark:#85E89D;--shiki-light:#22863A">div</span><span style="--shiki-dark:#E1E4E8;--shiki-light:#24292E">></span></span>
<span class="line"><span style="--shiki-dark:#E1E4E8;--shiki-light:#24292E">  );</span></span>
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
} from "@/components/mdx/card";

export default function CardDefault() {
  return (
    <Card className="w-full max-w-sm">
      <CardHeader>
        <CardTitle>Getting started</CardTitle>
        <CardDescription>
          Install and configure mdx-ui in minutes.
        </CardDescription>
      </CardHeader>
      <CardContent>Run the CLI and pick your components.</CardContent>
      <CardFooter className="text-sm text-muted-foreground">
        Free and open source.
      </CardFooter>
    </Card>
  );
}
`,
    highlighted: `<pre class="shiki shiki-themes github-dark github-light" style="--shiki-dark:#e1e4e8;--shiki-light:#24292e;--shiki-dark-bg:#24292e;--shiki-light-bg:#fff" tabindex="0"><code><span class="line"><span style="--shiki-dark:#F97583;--shiki-light:#D73A49">import</span><span style="--shiki-dark:#E1E4E8;--shiki-light:#24292E"> {</span></span>
<span class="line"><span style="--shiki-dark:#E1E4E8;--shiki-light:#24292E">  Card,</span></span>
<span class="line"><span style="--shiki-dark:#E1E4E8;--shiki-light:#24292E">  CardHeader,</span></span>
<span class="line"><span style="--shiki-dark:#E1E4E8;--shiki-light:#24292E">  CardTitle,</span></span>
<span class="line"><span style="--shiki-dark:#E1E4E8;--shiki-light:#24292E">  CardDescription,</span></span>
<span class="line"><span style="--shiki-dark:#E1E4E8;--shiki-light:#24292E">  CardContent,</span></span>
<span class="line"><span style="--shiki-dark:#E1E4E8;--shiki-light:#24292E">  CardFooter,</span></span>
<span class="line"><span style="--shiki-dark:#E1E4E8;--shiki-light:#24292E">} </span><span style="--shiki-dark:#F97583;--shiki-light:#D73A49">from</span><span style="--shiki-dark:#9ECBFF;--shiki-light:#032F62"> "@/components/mdx/card"</span><span style="--shiki-dark:#E1E4E8;--shiki-light:#24292E">;</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-dark:#F97583;--shiki-light:#D73A49">export</span><span style="--shiki-dark:#F97583;--shiki-light:#D73A49"> default</span><span style="--shiki-dark:#F97583;--shiki-light:#D73A49"> function</span><span style="--shiki-dark:#B392F0;--shiki-light:#6F42C1"> CardDefault</span><span style="--shiki-dark:#E1E4E8;--shiki-light:#24292E">() {</span></span>
<span class="line"><span style="--shiki-dark:#F97583;--shiki-light:#D73A49">  return</span><span style="--shiki-dark:#E1E4E8;--shiki-light:#24292E"> (</span></span>
<span class="line"><span style="--shiki-dark:#E1E4E8;--shiki-light:#24292E">    &#x3C;</span><span style="--shiki-dark:#79B8FF;--shiki-light:#005CC5">Card</span><span style="--shiki-dark:#B392F0;--shiki-light:#6F42C1"> className</span><span style="--shiki-dark:#F97583;--shiki-light:#D73A49">=</span><span style="--shiki-dark:#9ECBFF;--shiki-light:#032F62">"w-full max-w-sm"</span><span style="--shiki-dark:#E1E4E8;--shiki-light:#24292E">></span></span>
<span class="line"><span style="--shiki-dark:#E1E4E8;--shiki-light:#24292E">      &#x3C;</span><span style="--shiki-dark:#79B8FF;--shiki-light:#005CC5">CardHeader</span><span style="--shiki-dark:#E1E4E8;--shiki-light:#24292E">></span></span>
<span class="line"><span style="--shiki-dark:#E1E4E8;--shiki-light:#24292E">        &#x3C;</span><span style="--shiki-dark:#79B8FF;--shiki-light:#005CC5">CardTitle</span><span style="--shiki-dark:#E1E4E8;--shiki-light:#24292E">>Getting started&#x3C;/</span><span style="--shiki-dark:#79B8FF;--shiki-light:#005CC5">CardTitle</span><span style="--shiki-dark:#E1E4E8;--shiki-light:#24292E">></span></span>
<span class="line"><span style="--shiki-dark:#E1E4E8;--shiki-light:#24292E">        &#x3C;</span><span style="--shiki-dark:#79B8FF;--shiki-light:#005CC5">CardDescription</span><span style="--shiki-dark:#E1E4E8;--shiki-light:#24292E">></span></span>
<span class="line"><span style="--shiki-dark:#E1E4E8;--shiki-light:#24292E">          Install and configure mdx-ui in minutes.</span></span>
<span class="line"><span style="--shiki-dark:#E1E4E8;--shiki-light:#24292E">        &#x3C;/</span><span style="--shiki-dark:#79B8FF;--shiki-light:#005CC5">CardDescription</span><span style="--shiki-dark:#E1E4E8;--shiki-light:#24292E">></span></span>
<span class="line"><span style="--shiki-dark:#E1E4E8;--shiki-light:#24292E">      &#x3C;/</span><span style="--shiki-dark:#79B8FF;--shiki-light:#005CC5">CardHeader</span><span style="--shiki-dark:#E1E4E8;--shiki-light:#24292E">></span></span>
<span class="line"><span style="--shiki-dark:#E1E4E8;--shiki-light:#24292E">      &#x3C;</span><span style="--shiki-dark:#79B8FF;--shiki-light:#005CC5">CardContent</span><span style="--shiki-dark:#E1E4E8;--shiki-light:#24292E">>Run the CLI and pick your components.&#x3C;/</span><span style="--shiki-dark:#79B8FF;--shiki-light:#005CC5">CardContent</span><span style="--shiki-dark:#E1E4E8;--shiki-light:#24292E">></span></span>
<span class="line"><span style="--shiki-dark:#E1E4E8;--shiki-light:#24292E">      &#x3C;</span><span style="--shiki-dark:#79B8FF;--shiki-light:#005CC5">CardFooter</span><span style="--shiki-dark:#B392F0;--shiki-light:#6F42C1"> className</span><span style="--shiki-dark:#F97583;--shiki-light:#D73A49">=</span><span style="--shiki-dark:#9ECBFF;--shiki-light:#032F62">"text-sm text-muted-foreground"</span><span style="--shiki-dark:#E1E4E8;--shiki-light:#24292E">></span></span>
<span class="line"><span style="--shiki-dark:#E1E4E8;--shiki-light:#24292E">        Free and open source.</span></span>
<span class="line"><span style="--shiki-dark:#E1E4E8;--shiki-light:#24292E">      &#x3C;/</span><span style="--shiki-dark:#79B8FF;--shiki-light:#005CC5">CardFooter</span><span style="--shiki-dark:#E1E4E8;--shiki-light:#24292E">></span></span>
<span class="line"><span style="--shiki-dark:#E1E4E8;--shiki-light:#24292E">    &#x3C;/</span><span style="--shiki-dark:#79B8FF;--shiki-light:#005CC5">Card</span><span style="--shiki-dark:#E1E4E8;--shiki-light:#24292E">></span></span>
<span class="line"><span style="--shiki-dark:#E1E4E8;--shiki-light:#24292E">  );</span></span>
<span class="line"><span style="--shiki-dark:#E1E4E8;--shiki-light:#24292E">}</span></span>
<span class="line"></span></code></pre>`,
  },
  "certification-badge-default": {
    source: `import { CertificationBadge } from "@/components/mdx/certification-badge"

export default function CertificationBadgeDefault() {
  return (
    <CertificationBadge
      certs={[
        { name: "ISO 27001:2022", scope: "Information Security Management", year: 2023, status: "active" },
        { name: "SOC 2 Type II", scope: "Trust Services Criteria", status: "pending" },
        { name: "GDPR", scope: "Data Protection Compliance", year: 2021, status: "expired" },
      ]}
    />
  )
}
`,
    highlighted: `<pre class="shiki shiki-themes github-dark github-light" style="--shiki-dark:#e1e4e8;--shiki-light:#24292e;--shiki-dark-bg:#24292e;--shiki-light-bg:#fff" tabindex="0"><code><span class="line"><span style="--shiki-dark:#F97583;--shiki-light:#D73A49">import</span><span style="--shiki-dark:#E1E4E8;--shiki-light:#24292E"> { CertificationBadge } </span><span style="--shiki-dark:#F97583;--shiki-light:#D73A49">from</span><span style="--shiki-dark:#9ECBFF;--shiki-light:#032F62"> "@/components/mdx/certification-badge"</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-dark:#F97583;--shiki-light:#D73A49">export</span><span style="--shiki-dark:#F97583;--shiki-light:#D73A49"> default</span><span style="--shiki-dark:#F97583;--shiki-light:#D73A49"> function</span><span style="--shiki-dark:#B392F0;--shiki-light:#6F42C1"> CertificationBadgeDefault</span><span style="--shiki-dark:#E1E4E8;--shiki-light:#24292E">() {</span></span>
<span class="line"><span style="--shiki-dark:#F97583;--shiki-light:#D73A49">  return</span><span style="--shiki-dark:#E1E4E8;--shiki-light:#24292E"> (</span></span>
<span class="line"><span style="--shiki-dark:#E1E4E8;--shiki-light:#24292E">    &#x3C;</span><span style="--shiki-dark:#79B8FF;--shiki-light:#005CC5">CertificationBadge</span></span>
<span class="line"><span style="--shiki-dark:#B392F0;--shiki-light:#6F42C1">      certs</span><span style="--shiki-dark:#F97583;--shiki-light:#D73A49">=</span><span style="--shiki-dark:#E1E4E8;--shiki-light:#24292E">{[</span></span>
<span class="line"><span style="--shiki-dark:#E1E4E8;--shiki-light:#24292E">        { name: </span><span style="--shiki-dark:#9ECBFF;--shiki-light:#032F62">"ISO 27001:2022"</span><span style="--shiki-dark:#E1E4E8;--shiki-light:#24292E">, scope: </span><span style="--shiki-dark:#9ECBFF;--shiki-light:#032F62">"Information Security Management"</span><span style="--shiki-dark:#E1E4E8;--shiki-light:#24292E">, year: </span><span style="--shiki-dark:#79B8FF;--shiki-light:#005CC5">2023</span><span style="--shiki-dark:#E1E4E8;--shiki-light:#24292E">, status: </span><span style="--shiki-dark:#9ECBFF;--shiki-light:#032F62">"active"</span><span style="--shiki-dark:#E1E4E8;--shiki-light:#24292E"> },</span></span>
<span class="line"><span style="--shiki-dark:#E1E4E8;--shiki-light:#24292E">        { name: </span><span style="--shiki-dark:#9ECBFF;--shiki-light:#032F62">"SOC 2 Type II"</span><span style="--shiki-dark:#E1E4E8;--shiki-light:#24292E">, scope: </span><span style="--shiki-dark:#9ECBFF;--shiki-light:#032F62">"Trust Services Criteria"</span><span style="--shiki-dark:#E1E4E8;--shiki-light:#24292E">, status: </span><span style="--shiki-dark:#9ECBFF;--shiki-light:#032F62">"pending"</span><span style="--shiki-dark:#E1E4E8;--shiki-light:#24292E"> },</span></span>
<span class="line"><span style="--shiki-dark:#E1E4E8;--shiki-light:#24292E">        { name: </span><span style="--shiki-dark:#9ECBFF;--shiki-light:#032F62">"GDPR"</span><span style="--shiki-dark:#E1E4E8;--shiki-light:#24292E">, scope: </span><span style="--shiki-dark:#9ECBFF;--shiki-light:#032F62">"Data Protection Compliance"</span><span style="--shiki-dark:#E1E4E8;--shiki-light:#24292E">, year: </span><span style="--shiki-dark:#79B8FF;--shiki-light:#005CC5">2021</span><span style="--shiki-dark:#E1E4E8;--shiki-light:#24292E">, status: </span><span style="--shiki-dark:#9ECBFF;--shiki-light:#032F62">"expired"</span><span style="--shiki-dark:#E1E4E8;--shiki-light:#24292E"> },</span></span>
<span class="line"><span style="--shiki-dark:#E1E4E8;--shiki-light:#24292E">      ]}</span></span>
<span class="line"><span style="--shiki-dark:#E1E4E8;--shiki-light:#24292E">    /></span></span>
<span class="line"><span style="--shiki-dark:#E1E4E8;--shiki-light:#24292E">  )</span></span>
<span class="line"><span style="--shiki-dark:#E1E4E8;--shiki-light:#24292E">}</span></span>
<span class="line"></span></code></pre>`,
  },
  "changelog-default": {
    source: `import { Changelog, ChangelogEntry, ChangelogItem } from "@/components/mdx/changelog"

export default function ChangelogDefault() {
  return (
    <Changelog>
      <ChangelogEntry version="v1.2.0" date="2025-04-10">
        <ChangelogItem type="added">New ComponentPreview with shiki dual-theme highlighting</ChangelogItem>
        <ChangelogItem type="added">Spoiler and Reveal components</ChangelogItem>
        <ChangelogItem type="fixed">Accordion keyboard navigation on Safari</ChangelogItem>
      </ChangelogEntry>
      <ChangelogEntry version="v1.1.0" date="2025-03-01">
        <ChangelogItem type="added">SecurityNote component with severity levels</ChangelogItem>
        <ChangelogItem type="changed">Badge now uses CVA for variant management</ChangelogItem>
        <ChangelogItem type="removed">Legacy ColorSwatch component</ChangelogItem>
      </ChangelogEntry>
    </Changelog>
  )
}
`,
    highlighted: `<pre class="shiki shiki-themes github-dark github-light" style="--shiki-dark:#e1e4e8;--shiki-light:#24292e;--shiki-dark-bg:#24292e;--shiki-light-bg:#fff" tabindex="0"><code><span class="line"><span style="--shiki-dark:#F97583;--shiki-light:#D73A49">import</span><span style="--shiki-dark:#E1E4E8;--shiki-light:#24292E"> { Changelog, ChangelogEntry, ChangelogItem } </span><span style="--shiki-dark:#F97583;--shiki-light:#D73A49">from</span><span style="--shiki-dark:#9ECBFF;--shiki-light:#032F62"> "@/components/mdx/changelog"</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-dark:#F97583;--shiki-light:#D73A49">export</span><span style="--shiki-dark:#F97583;--shiki-light:#D73A49"> default</span><span style="--shiki-dark:#F97583;--shiki-light:#D73A49"> function</span><span style="--shiki-dark:#B392F0;--shiki-light:#6F42C1"> ChangelogDefault</span><span style="--shiki-dark:#E1E4E8;--shiki-light:#24292E">() {</span></span>
<span class="line"><span style="--shiki-dark:#F97583;--shiki-light:#D73A49">  return</span><span style="--shiki-dark:#E1E4E8;--shiki-light:#24292E"> (</span></span>
<span class="line"><span style="--shiki-dark:#E1E4E8;--shiki-light:#24292E">    &#x3C;</span><span style="--shiki-dark:#79B8FF;--shiki-light:#005CC5">Changelog</span><span style="--shiki-dark:#E1E4E8;--shiki-light:#24292E">></span></span>
<span class="line"><span style="--shiki-dark:#E1E4E8;--shiki-light:#24292E">      &#x3C;</span><span style="--shiki-dark:#79B8FF;--shiki-light:#005CC5">ChangelogEntry</span><span style="--shiki-dark:#B392F0;--shiki-light:#6F42C1"> version</span><span style="--shiki-dark:#F97583;--shiki-light:#D73A49">=</span><span style="--shiki-dark:#9ECBFF;--shiki-light:#032F62">"v1.2.0"</span><span style="--shiki-dark:#B392F0;--shiki-light:#6F42C1"> date</span><span style="--shiki-dark:#F97583;--shiki-light:#D73A49">=</span><span style="--shiki-dark:#9ECBFF;--shiki-light:#032F62">"2025-04-10"</span><span style="--shiki-dark:#E1E4E8;--shiki-light:#24292E">></span></span>
<span class="line"><span style="--shiki-dark:#E1E4E8;--shiki-light:#24292E">        &#x3C;</span><span style="--shiki-dark:#79B8FF;--shiki-light:#005CC5">ChangelogItem</span><span style="--shiki-dark:#B392F0;--shiki-light:#6F42C1"> type</span><span style="--shiki-dark:#F97583;--shiki-light:#D73A49">=</span><span style="--shiki-dark:#9ECBFF;--shiki-light:#032F62">"added"</span><span style="--shiki-dark:#E1E4E8;--shiki-light:#24292E">>New ComponentPreview with shiki dual-theme highlighting&#x3C;/</span><span style="--shiki-dark:#79B8FF;--shiki-light:#005CC5">ChangelogItem</span><span style="--shiki-dark:#E1E4E8;--shiki-light:#24292E">></span></span>
<span class="line"><span style="--shiki-dark:#E1E4E8;--shiki-light:#24292E">        &#x3C;</span><span style="--shiki-dark:#79B8FF;--shiki-light:#005CC5">ChangelogItem</span><span style="--shiki-dark:#B392F0;--shiki-light:#6F42C1"> type</span><span style="--shiki-dark:#F97583;--shiki-light:#D73A49">=</span><span style="--shiki-dark:#9ECBFF;--shiki-light:#032F62">"added"</span><span style="--shiki-dark:#E1E4E8;--shiki-light:#24292E">>Spoiler and Reveal components&#x3C;/</span><span style="--shiki-dark:#79B8FF;--shiki-light:#005CC5">ChangelogItem</span><span style="--shiki-dark:#E1E4E8;--shiki-light:#24292E">></span></span>
<span class="line"><span style="--shiki-dark:#E1E4E8;--shiki-light:#24292E">        &#x3C;</span><span style="--shiki-dark:#79B8FF;--shiki-light:#005CC5">ChangelogItem</span><span style="--shiki-dark:#B392F0;--shiki-light:#6F42C1"> type</span><span style="--shiki-dark:#F97583;--shiki-light:#D73A49">=</span><span style="--shiki-dark:#9ECBFF;--shiki-light:#032F62">"fixed"</span><span style="--shiki-dark:#E1E4E8;--shiki-light:#24292E">>Accordion keyboard navigation on Safari&#x3C;/</span><span style="--shiki-dark:#79B8FF;--shiki-light:#005CC5">ChangelogItem</span><span style="--shiki-dark:#E1E4E8;--shiki-light:#24292E">></span></span>
<span class="line"><span style="--shiki-dark:#E1E4E8;--shiki-light:#24292E">      &#x3C;/</span><span style="--shiki-dark:#79B8FF;--shiki-light:#005CC5">ChangelogEntry</span><span style="--shiki-dark:#E1E4E8;--shiki-light:#24292E">></span></span>
<span class="line"><span style="--shiki-dark:#E1E4E8;--shiki-light:#24292E">      &#x3C;</span><span style="--shiki-dark:#79B8FF;--shiki-light:#005CC5">ChangelogEntry</span><span style="--shiki-dark:#B392F0;--shiki-light:#6F42C1"> version</span><span style="--shiki-dark:#F97583;--shiki-light:#D73A49">=</span><span style="--shiki-dark:#9ECBFF;--shiki-light:#032F62">"v1.1.0"</span><span style="--shiki-dark:#B392F0;--shiki-light:#6F42C1"> date</span><span style="--shiki-dark:#F97583;--shiki-light:#D73A49">=</span><span style="--shiki-dark:#9ECBFF;--shiki-light:#032F62">"2025-03-01"</span><span style="--shiki-dark:#E1E4E8;--shiki-light:#24292E">></span></span>
<span class="line"><span style="--shiki-dark:#E1E4E8;--shiki-light:#24292E">        &#x3C;</span><span style="--shiki-dark:#79B8FF;--shiki-light:#005CC5">ChangelogItem</span><span style="--shiki-dark:#B392F0;--shiki-light:#6F42C1"> type</span><span style="--shiki-dark:#F97583;--shiki-light:#D73A49">=</span><span style="--shiki-dark:#9ECBFF;--shiki-light:#032F62">"added"</span><span style="--shiki-dark:#E1E4E8;--shiki-light:#24292E">>SecurityNote component with severity levels&#x3C;/</span><span style="--shiki-dark:#79B8FF;--shiki-light:#005CC5">ChangelogItem</span><span style="--shiki-dark:#E1E4E8;--shiki-light:#24292E">></span></span>
<span class="line"><span style="--shiki-dark:#E1E4E8;--shiki-light:#24292E">        &#x3C;</span><span style="--shiki-dark:#79B8FF;--shiki-light:#005CC5">ChangelogItem</span><span style="--shiki-dark:#B392F0;--shiki-light:#6F42C1"> type</span><span style="--shiki-dark:#F97583;--shiki-light:#D73A49">=</span><span style="--shiki-dark:#9ECBFF;--shiki-light:#032F62">"changed"</span><span style="--shiki-dark:#E1E4E8;--shiki-light:#24292E">>Badge now uses CVA for variant management&#x3C;/</span><span style="--shiki-dark:#79B8FF;--shiki-light:#005CC5">ChangelogItem</span><span style="--shiki-dark:#E1E4E8;--shiki-light:#24292E">></span></span>
<span class="line"><span style="--shiki-dark:#E1E4E8;--shiki-light:#24292E">        &#x3C;</span><span style="--shiki-dark:#79B8FF;--shiki-light:#005CC5">ChangelogItem</span><span style="--shiki-dark:#B392F0;--shiki-light:#6F42C1"> type</span><span style="--shiki-dark:#F97583;--shiki-light:#D73A49">=</span><span style="--shiki-dark:#9ECBFF;--shiki-light:#032F62">"removed"</span><span style="--shiki-dark:#E1E4E8;--shiki-light:#24292E">>Legacy ColorSwatch component&#x3C;/</span><span style="--shiki-dark:#79B8FF;--shiki-light:#005CC5">ChangelogItem</span><span style="--shiki-dark:#E1E4E8;--shiki-light:#24292E">></span></span>
<span class="line"><span style="--shiki-dark:#E1E4E8;--shiki-light:#24292E">      &#x3C;/</span><span style="--shiki-dark:#79B8FF;--shiki-light:#005CC5">ChangelogEntry</span><span style="--shiki-dark:#E1E4E8;--shiki-light:#24292E">></span></span>
<span class="line"><span style="--shiki-dark:#E1E4E8;--shiki-light:#24292E">    &#x3C;/</span><span style="--shiki-dark:#79B8FF;--shiki-light:#005CC5">Changelog</span><span style="--shiki-dark:#E1E4E8;--shiki-light:#24292E">></span></span>
<span class="line"><span style="--shiki-dark:#E1E4E8;--shiki-light:#24292E">  )</span></span>
<span class="line"><span style="--shiki-dark:#E1E4E8;--shiki-light:#24292E">}</span></span>
<span class="line"></span></code></pre>`,
  },
  "code-block-default": {
    source: `import { CodeBlock } from "@/components/mdx/code-block"

export default function CodeBlockDefault() {
  return (
    <CodeBlock title="components/mdx/badge.tsx" data-language="tsx">
      <code>{\`import { Badge } from "@/components/mdx/badge"

export function StatusBadge({ status }: { status: string }) {
  return <Badge variant="success">{status}</Badge>
}\`}</code>
    </CodeBlock>
  )
}
`,
    highlighted: `<pre class="shiki shiki-themes github-dark github-light" style="--shiki-dark:#e1e4e8;--shiki-light:#24292e;--shiki-dark-bg:#24292e;--shiki-light-bg:#fff" tabindex="0"><code><span class="line"><span style="--shiki-dark:#F97583;--shiki-light:#D73A49">import</span><span style="--shiki-dark:#E1E4E8;--shiki-light:#24292E"> { CodeBlock } </span><span style="--shiki-dark:#F97583;--shiki-light:#D73A49">from</span><span style="--shiki-dark:#9ECBFF;--shiki-light:#032F62"> "@/components/mdx/code-block"</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-dark:#F97583;--shiki-light:#D73A49">export</span><span style="--shiki-dark:#F97583;--shiki-light:#D73A49"> default</span><span style="--shiki-dark:#F97583;--shiki-light:#D73A49"> function</span><span style="--shiki-dark:#B392F0;--shiki-light:#6F42C1"> CodeBlockDefault</span><span style="--shiki-dark:#E1E4E8;--shiki-light:#24292E">() {</span></span>
<span class="line"><span style="--shiki-dark:#F97583;--shiki-light:#D73A49">  return</span><span style="--shiki-dark:#E1E4E8;--shiki-light:#24292E"> (</span></span>
<span class="line"><span style="--shiki-dark:#E1E4E8;--shiki-light:#24292E">    &#x3C;</span><span style="--shiki-dark:#79B8FF;--shiki-light:#005CC5">CodeBlock</span><span style="--shiki-dark:#B392F0;--shiki-light:#6F42C1"> title</span><span style="--shiki-dark:#F97583;--shiki-light:#D73A49">=</span><span style="--shiki-dark:#9ECBFF;--shiki-light:#032F62">"components/mdx/badge.tsx"</span><span style="--shiki-dark:#B392F0;--shiki-light:#6F42C1"> data-language</span><span style="--shiki-dark:#F97583;--shiki-light:#D73A49">=</span><span style="--shiki-dark:#9ECBFF;--shiki-light:#032F62">"tsx"</span><span style="--shiki-dark:#E1E4E8;--shiki-light:#24292E">></span></span>
<span class="line"><span style="--shiki-dark:#E1E4E8;--shiki-light:#24292E">      &#x3C;</span><span style="--shiki-dark:#85E89D;--shiki-light:#22863A">code</span><span style="--shiki-dark:#E1E4E8;--shiki-light:#24292E">>{</span><span style="--shiki-dark:#9ECBFF;--shiki-light:#032F62">\`import { Badge } from "@/components/mdx/badge"</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-dark:#9ECBFF;--shiki-light:#032F62">export function StatusBadge({ status }: { status: string }) {</span></span>
<span class="line"><span style="--shiki-dark:#9ECBFF;--shiki-light:#032F62">  return &#x3C;Badge variant="success">{status}&#x3C;/Badge></span></span>
<span class="line"><span style="--shiki-dark:#9ECBFF;--shiki-light:#032F62">}\`</span><span style="--shiki-dark:#E1E4E8;--shiki-light:#24292E">}&#x3C;/</span><span style="--shiki-dark:#85E89D;--shiki-light:#22863A">code</span><span style="--shiki-dark:#E1E4E8;--shiki-light:#24292E">></span></span>
<span class="line"><span style="--shiki-dark:#E1E4E8;--shiki-light:#24292E">    &#x3C;/</span><span style="--shiki-dark:#79B8FF;--shiki-light:#005CC5">CodeBlock</span><span style="--shiki-dark:#E1E4E8;--shiki-light:#24292E">></span></span>
<span class="line"><span style="--shiki-dark:#E1E4E8;--shiki-light:#24292E">  )</span></span>
<span class="line"><span style="--shiki-dark:#E1E4E8;--shiki-light:#24292E">}</span></span>
<span class="line"></span></code></pre>`,
  },
  "code-group-default": {
    source: `"use client"
import { CodeGroup } from "@/components/mdx/code-group"

export default function CodeGroupDefault() {
  return (
    <div className="w-full">
      <CodeGroup>
        <pre data-language="npm" data-title="npm">
          <code>npm install @ravikumarsurya/mdx-ui</code>
        </pre>
        <pre data-language="pnpm" data-title="pnpm">
          <code>pnpm add @ravikumarsurya/mdx-ui</code>
        </pre>
        <pre data-language="yarn" data-title="yarn">
          <code>yarn add @ravikumarsurya/mdx-ui</code>
        </pre>
      </CodeGroup>
    </div>
  )
}
`,
    highlighted: `<pre class="shiki shiki-themes github-dark github-light" style="--shiki-dark:#e1e4e8;--shiki-light:#24292e;--shiki-dark-bg:#24292e;--shiki-light-bg:#fff" tabindex="0"><code><span class="line"><span style="--shiki-dark:#9ECBFF;--shiki-light:#032F62">"use client"</span></span>
<span class="line"><span style="--shiki-dark:#F97583;--shiki-light:#D73A49">import</span><span style="--shiki-dark:#E1E4E8;--shiki-light:#24292E"> { CodeGroup } </span><span style="--shiki-dark:#F97583;--shiki-light:#D73A49">from</span><span style="--shiki-dark:#9ECBFF;--shiki-light:#032F62"> "@/components/mdx/code-group"</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-dark:#F97583;--shiki-light:#D73A49">export</span><span style="--shiki-dark:#F97583;--shiki-light:#D73A49"> default</span><span style="--shiki-dark:#F97583;--shiki-light:#D73A49"> function</span><span style="--shiki-dark:#B392F0;--shiki-light:#6F42C1"> CodeGroupDefault</span><span style="--shiki-dark:#E1E4E8;--shiki-light:#24292E">() {</span></span>
<span class="line"><span style="--shiki-dark:#F97583;--shiki-light:#D73A49">  return</span><span style="--shiki-dark:#E1E4E8;--shiki-light:#24292E"> (</span></span>
<span class="line"><span style="--shiki-dark:#E1E4E8;--shiki-light:#24292E">    &#x3C;</span><span style="--shiki-dark:#85E89D;--shiki-light:#22863A">div</span><span style="--shiki-dark:#B392F0;--shiki-light:#6F42C1"> className</span><span style="--shiki-dark:#F97583;--shiki-light:#D73A49">=</span><span style="--shiki-dark:#9ECBFF;--shiki-light:#032F62">"w-full"</span><span style="--shiki-dark:#E1E4E8;--shiki-light:#24292E">></span></span>
<span class="line"><span style="--shiki-dark:#E1E4E8;--shiki-light:#24292E">      &#x3C;</span><span style="--shiki-dark:#79B8FF;--shiki-light:#005CC5">CodeGroup</span><span style="--shiki-dark:#E1E4E8;--shiki-light:#24292E">></span></span>
<span class="line"><span style="--shiki-dark:#E1E4E8;--shiki-light:#24292E">        &#x3C;</span><span style="--shiki-dark:#85E89D;--shiki-light:#22863A">pre</span><span style="--shiki-dark:#B392F0;--shiki-light:#6F42C1"> data-language</span><span style="--shiki-dark:#F97583;--shiki-light:#D73A49">=</span><span style="--shiki-dark:#9ECBFF;--shiki-light:#032F62">"npm"</span><span style="--shiki-dark:#B392F0;--shiki-light:#6F42C1"> data-title</span><span style="--shiki-dark:#F97583;--shiki-light:#D73A49">=</span><span style="--shiki-dark:#9ECBFF;--shiki-light:#032F62">"npm"</span><span style="--shiki-dark:#E1E4E8;--shiki-light:#24292E">></span></span>
<span class="line"><span style="--shiki-dark:#E1E4E8;--shiki-light:#24292E">          &#x3C;</span><span style="--shiki-dark:#85E89D;--shiki-light:#22863A">code</span><span style="--shiki-dark:#E1E4E8;--shiki-light:#24292E">>npm install @ravikumarsurya/mdx-ui&#x3C;/</span><span style="--shiki-dark:#85E89D;--shiki-light:#22863A">code</span><span style="--shiki-dark:#E1E4E8;--shiki-light:#24292E">></span></span>
<span class="line"><span style="--shiki-dark:#E1E4E8;--shiki-light:#24292E">        &#x3C;/</span><span style="--shiki-dark:#85E89D;--shiki-light:#22863A">pre</span><span style="--shiki-dark:#E1E4E8;--shiki-light:#24292E">></span></span>
<span class="line"><span style="--shiki-dark:#E1E4E8;--shiki-light:#24292E">        &#x3C;</span><span style="--shiki-dark:#85E89D;--shiki-light:#22863A">pre</span><span style="--shiki-dark:#B392F0;--shiki-light:#6F42C1"> data-language</span><span style="--shiki-dark:#F97583;--shiki-light:#D73A49">=</span><span style="--shiki-dark:#9ECBFF;--shiki-light:#032F62">"pnpm"</span><span style="--shiki-dark:#B392F0;--shiki-light:#6F42C1"> data-title</span><span style="--shiki-dark:#F97583;--shiki-light:#D73A49">=</span><span style="--shiki-dark:#9ECBFF;--shiki-light:#032F62">"pnpm"</span><span style="--shiki-dark:#E1E4E8;--shiki-light:#24292E">></span></span>
<span class="line"><span style="--shiki-dark:#E1E4E8;--shiki-light:#24292E">          &#x3C;</span><span style="--shiki-dark:#85E89D;--shiki-light:#22863A">code</span><span style="--shiki-dark:#E1E4E8;--shiki-light:#24292E">>pnpm add @ravikumarsurya/mdx-ui&#x3C;/</span><span style="--shiki-dark:#85E89D;--shiki-light:#22863A">code</span><span style="--shiki-dark:#E1E4E8;--shiki-light:#24292E">></span></span>
<span class="line"><span style="--shiki-dark:#E1E4E8;--shiki-light:#24292E">        &#x3C;/</span><span style="--shiki-dark:#85E89D;--shiki-light:#22863A">pre</span><span style="--shiki-dark:#E1E4E8;--shiki-light:#24292E">></span></span>
<span class="line"><span style="--shiki-dark:#E1E4E8;--shiki-light:#24292E">        &#x3C;</span><span style="--shiki-dark:#85E89D;--shiki-light:#22863A">pre</span><span style="--shiki-dark:#B392F0;--shiki-light:#6F42C1"> data-language</span><span style="--shiki-dark:#F97583;--shiki-light:#D73A49">=</span><span style="--shiki-dark:#9ECBFF;--shiki-light:#032F62">"yarn"</span><span style="--shiki-dark:#B392F0;--shiki-light:#6F42C1"> data-title</span><span style="--shiki-dark:#F97583;--shiki-light:#D73A49">=</span><span style="--shiki-dark:#9ECBFF;--shiki-light:#032F62">"yarn"</span><span style="--shiki-dark:#E1E4E8;--shiki-light:#24292E">></span></span>
<span class="line"><span style="--shiki-dark:#E1E4E8;--shiki-light:#24292E">          &#x3C;</span><span style="--shiki-dark:#85E89D;--shiki-light:#22863A">code</span><span style="--shiki-dark:#E1E4E8;--shiki-light:#24292E">>yarn add @ravikumarsurya/mdx-ui&#x3C;/</span><span style="--shiki-dark:#85E89D;--shiki-light:#22863A">code</span><span style="--shiki-dark:#E1E4E8;--shiki-light:#24292E">></span></span>
<span class="line"><span style="--shiki-dark:#E1E4E8;--shiki-light:#24292E">        &#x3C;/</span><span style="--shiki-dark:#85E89D;--shiki-light:#22863A">pre</span><span style="--shiki-dark:#E1E4E8;--shiki-light:#24292E">></span></span>
<span class="line"><span style="--shiki-dark:#E1E4E8;--shiki-light:#24292E">      &#x3C;/</span><span style="--shiki-dark:#79B8FF;--shiki-light:#005CC5">CodeGroup</span><span style="--shiki-dark:#E1E4E8;--shiki-light:#24292E">></span></span>
<span class="line"><span style="--shiki-dark:#E1E4E8;--shiki-light:#24292E">    &#x3C;/</span><span style="--shiki-dark:#85E89D;--shiki-light:#22863A">div</span><span style="--shiki-dark:#E1E4E8;--shiki-light:#24292E">></span></span>
<span class="line"><span style="--shiki-dark:#E1E4E8;--shiki-light:#24292E">  )</span></span>
<span class="line"><span style="--shiki-dark:#E1E4E8;--shiki-light:#24292E">}</span></span>
<span class="line"></span></code></pre>`,
  },
  "complexity-table-default": {
    source: `import { ComplexityTable } from "@/components/mdx/complexity-table"

export default function ComplexityTableDefault() {
  return (
    <ComplexityTable
      caption="Binary Search Tree — time and space complexity"
      rows={[
        { operation: "Search",  best: "O(1)", average: "O(log n)", worst: "O(n)", space: "O(1)" },
        { operation: "Insert",  best: "O(1)", average: "O(log n)", worst: "O(n)", space: "O(1)" },
        { operation: "Delete",  best: "O(1)", average: "O(log n)", worst: "O(n)", space: "O(1)" },
        { operation: "Traverse", best: "O(n)", average: "O(n)", worst: "O(n)", space: "O(n)" },
      ]}
    />
  )
}
`,
    highlighted: `<pre class="shiki shiki-themes github-dark github-light" style="--shiki-dark:#e1e4e8;--shiki-light:#24292e;--shiki-dark-bg:#24292e;--shiki-light-bg:#fff" tabindex="0"><code><span class="line"><span style="--shiki-dark:#F97583;--shiki-light:#D73A49">import</span><span style="--shiki-dark:#E1E4E8;--shiki-light:#24292E"> { ComplexityTable } </span><span style="--shiki-dark:#F97583;--shiki-light:#D73A49">from</span><span style="--shiki-dark:#9ECBFF;--shiki-light:#032F62"> "@/components/mdx/complexity-table"</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-dark:#F97583;--shiki-light:#D73A49">export</span><span style="--shiki-dark:#F97583;--shiki-light:#D73A49"> default</span><span style="--shiki-dark:#F97583;--shiki-light:#D73A49"> function</span><span style="--shiki-dark:#B392F0;--shiki-light:#6F42C1"> ComplexityTableDefault</span><span style="--shiki-dark:#E1E4E8;--shiki-light:#24292E">() {</span></span>
<span class="line"><span style="--shiki-dark:#F97583;--shiki-light:#D73A49">  return</span><span style="--shiki-dark:#E1E4E8;--shiki-light:#24292E"> (</span></span>
<span class="line"><span style="--shiki-dark:#E1E4E8;--shiki-light:#24292E">    &#x3C;</span><span style="--shiki-dark:#79B8FF;--shiki-light:#005CC5">ComplexityTable</span></span>
<span class="line"><span style="--shiki-dark:#B392F0;--shiki-light:#6F42C1">      caption</span><span style="--shiki-dark:#F97583;--shiki-light:#D73A49">=</span><span style="--shiki-dark:#9ECBFF;--shiki-light:#032F62">"Binary Search Tree — time and space complexity"</span></span>
<span class="line"><span style="--shiki-dark:#B392F0;--shiki-light:#6F42C1">      rows</span><span style="--shiki-dark:#F97583;--shiki-light:#D73A49">=</span><span style="--shiki-dark:#E1E4E8;--shiki-light:#24292E">{[</span></span>
<span class="line"><span style="--shiki-dark:#E1E4E8;--shiki-light:#24292E">        { operation: </span><span style="--shiki-dark:#9ECBFF;--shiki-light:#032F62">"Search"</span><span style="--shiki-dark:#E1E4E8;--shiki-light:#24292E">,  best: </span><span style="--shiki-dark:#9ECBFF;--shiki-light:#032F62">"O(1)"</span><span style="--shiki-dark:#E1E4E8;--shiki-light:#24292E">, average: </span><span style="--shiki-dark:#9ECBFF;--shiki-light:#032F62">"O(log n)"</span><span style="--shiki-dark:#E1E4E8;--shiki-light:#24292E">, worst: </span><span style="--shiki-dark:#9ECBFF;--shiki-light:#032F62">"O(n)"</span><span style="--shiki-dark:#E1E4E8;--shiki-light:#24292E">, space: </span><span style="--shiki-dark:#9ECBFF;--shiki-light:#032F62">"O(1)"</span><span style="--shiki-dark:#E1E4E8;--shiki-light:#24292E"> },</span></span>
<span class="line"><span style="--shiki-dark:#E1E4E8;--shiki-light:#24292E">        { operation: </span><span style="--shiki-dark:#9ECBFF;--shiki-light:#032F62">"Insert"</span><span style="--shiki-dark:#E1E4E8;--shiki-light:#24292E">,  best: </span><span style="--shiki-dark:#9ECBFF;--shiki-light:#032F62">"O(1)"</span><span style="--shiki-dark:#E1E4E8;--shiki-light:#24292E">, average: </span><span style="--shiki-dark:#9ECBFF;--shiki-light:#032F62">"O(log n)"</span><span style="--shiki-dark:#E1E4E8;--shiki-light:#24292E">, worst: </span><span style="--shiki-dark:#9ECBFF;--shiki-light:#032F62">"O(n)"</span><span style="--shiki-dark:#E1E4E8;--shiki-light:#24292E">, space: </span><span style="--shiki-dark:#9ECBFF;--shiki-light:#032F62">"O(1)"</span><span style="--shiki-dark:#E1E4E8;--shiki-light:#24292E"> },</span></span>
<span class="line"><span style="--shiki-dark:#E1E4E8;--shiki-light:#24292E">        { operation: </span><span style="--shiki-dark:#9ECBFF;--shiki-light:#032F62">"Delete"</span><span style="--shiki-dark:#E1E4E8;--shiki-light:#24292E">,  best: </span><span style="--shiki-dark:#9ECBFF;--shiki-light:#032F62">"O(1)"</span><span style="--shiki-dark:#E1E4E8;--shiki-light:#24292E">, average: </span><span style="--shiki-dark:#9ECBFF;--shiki-light:#032F62">"O(log n)"</span><span style="--shiki-dark:#E1E4E8;--shiki-light:#24292E">, worst: </span><span style="--shiki-dark:#9ECBFF;--shiki-light:#032F62">"O(n)"</span><span style="--shiki-dark:#E1E4E8;--shiki-light:#24292E">, space: </span><span style="--shiki-dark:#9ECBFF;--shiki-light:#032F62">"O(1)"</span><span style="--shiki-dark:#E1E4E8;--shiki-light:#24292E"> },</span></span>
<span class="line"><span style="--shiki-dark:#E1E4E8;--shiki-light:#24292E">        { operation: </span><span style="--shiki-dark:#9ECBFF;--shiki-light:#032F62">"Traverse"</span><span style="--shiki-dark:#E1E4E8;--shiki-light:#24292E">, best: </span><span style="--shiki-dark:#9ECBFF;--shiki-light:#032F62">"O(n)"</span><span style="--shiki-dark:#E1E4E8;--shiki-light:#24292E">, average: </span><span style="--shiki-dark:#9ECBFF;--shiki-light:#032F62">"O(n)"</span><span style="--shiki-dark:#E1E4E8;--shiki-light:#24292E">, worst: </span><span style="--shiki-dark:#9ECBFF;--shiki-light:#032F62">"O(n)"</span><span style="--shiki-dark:#E1E4E8;--shiki-light:#24292E">, space: </span><span style="--shiki-dark:#9ECBFF;--shiki-light:#032F62">"O(n)"</span><span style="--shiki-dark:#E1E4E8;--shiki-light:#24292E"> },</span></span>
<span class="line"><span style="--shiki-dark:#E1E4E8;--shiki-light:#24292E">      ]}</span></span>
<span class="line"><span style="--shiki-dark:#E1E4E8;--shiki-light:#24292E">    /></span></span>
<span class="line"><span style="--shiki-dark:#E1E4E8;--shiki-light:#24292E">  )</span></span>
<span class="line"><span style="--shiki-dark:#E1E4E8;--shiki-light:#24292E">}</span></span>
<span class="line"></span></code></pre>`,
  },
  "data-table-default": {
    source: `"use client"
import { DataTable } from "@/components/mdx/data-table"

export default function DataTableDefault() {
  return (
    <DataTable
      searchable
      sortable
      headers={["Component", "Type", "Version"]}
      rows={[
        ["Accordion",   "Interactive",  "0.0.35"],
        ["Badge",       "Display",      "0.0.35"],
        ["Callout",     "Display",      "0.0.35"],
        ["Code Block",  "Display",      "0.0.35"],
        ["Data Table",  "Interactive",  "0.0.35"],
        ["Steps",       "Display",      "0.0.35"],
        ["Tabs",        "Interactive",  "0.0.35"],
      ]}
      caption="mdx-ui component registry"
    />
  )
}
`,
    highlighted: `<pre class="shiki shiki-themes github-dark github-light" style="--shiki-dark:#e1e4e8;--shiki-light:#24292e;--shiki-dark-bg:#24292e;--shiki-light-bg:#fff" tabindex="0"><code><span class="line"><span style="--shiki-dark:#9ECBFF;--shiki-light:#032F62">"use client"</span></span>
<span class="line"><span style="--shiki-dark:#F97583;--shiki-light:#D73A49">import</span><span style="--shiki-dark:#E1E4E8;--shiki-light:#24292E"> { DataTable } </span><span style="--shiki-dark:#F97583;--shiki-light:#D73A49">from</span><span style="--shiki-dark:#9ECBFF;--shiki-light:#032F62"> "@/components/mdx/data-table"</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-dark:#F97583;--shiki-light:#D73A49">export</span><span style="--shiki-dark:#F97583;--shiki-light:#D73A49"> default</span><span style="--shiki-dark:#F97583;--shiki-light:#D73A49"> function</span><span style="--shiki-dark:#B392F0;--shiki-light:#6F42C1"> DataTableDefault</span><span style="--shiki-dark:#E1E4E8;--shiki-light:#24292E">() {</span></span>
<span class="line"><span style="--shiki-dark:#F97583;--shiki-light:#D73A49">  return</span><span style="--shiki-dark:#E1E4E8;--shiki-light:#24292E"> (</span></span>
<span class="line"><span style="--shiki-dark:#E1E4E8;--shiki-light:#24292E">    &#x3C;</span><span style="--shiki-dark:#79B8FF;--shiki-light:#005CC5">DataTable</span></span>
<span class="line"><span style="--shiki-dark:#B392F0;--shiki-light:#6F42C1">      searchable</span></span>
<span class="line"><span style="--shiki-dark:#B392F0;--shiki-light:#6F42C1">      sortable</span></span>
<span class="line"><span style="--shiki-dark:#B392F0;--shiki-light:#6F42C1">      headers</span><span style="--shiki-dark:#F97583;--shiki-light:#D73A49">=</span><span style="--shiki-dark:#E1E4E8;--shiki-light:#24292E">{[</span><span style="--shiki-dark:#9ECBFF;--shiki-light:#032F62">"Component"</span><span style="--shiki-dark:#E1E4E8;--shiki-light:#24292E">, </span><span style="--shiki-dark:#9ECBFF;--shiki-light:#032F62">"Type"</span><span style="--shiki-dark:#E1E4E8;--shiki-light:#24292E">, </span><span style="--shiki-dark:#9ECBFF;--shiki-light:#032F62">"Version"</span><span style="--shiki-dark:#E1E4E8;--shiki-light:#24292E">]}</span></span>
<span class="line"><span style="--shiki-dark:#B392F0;--shiki-light:#6F42C1">      rows</span><span style="--shiki-dark:#F97583;--shiki-light:#D73A49">=</span><span style="--shiki-dark:#E1E4E8;--shiki-light:#24292E">{[</span></span>
<span class="line"><span style="--shiki-dark:#E1E4E8;--shiki-light:#24292E">        [</span><span style="--shiki-dark:#9ECBFF;--shiki-light:#032F62">"Accordion"</span><span style="--shiki-dark:#E1E4E8;--shiki-light:#24292E">,   </span><span style="--shiki-dark:#9ECBFF;--shiki-light:#032F62">"Interactive"</span><span style="--shiki-dark:#E1E4E8;--shiki-light:#24292E">,  </span><span style="--shiki-dark:#9ECBFF;--shiki-light:#032F62">"0.0.35"</span><span style="--shiki-dark:#E1E4E8;--shiki-light:#24292E">],</span></span>
<span class="line"><span style="--shiki-dark:#E1E4E8;--shiki-light:#24292E">        [</span><span style="--shiki-dark:#9ECBFF;--shiki-light:#032F62">"Badge"</span><span style="--shiki-dark:#E1E4E8;--shiki-light:#24292E">,       </span><span style="--shiki-dark:#9ECBFF;--shiki-light:#032F62">"Display"</span><span style="--shiki-dark:#E1E4E8;--shiki-light:#24292E">,      </span><span style="--shiki-dark:#9ECBFF;--shiki-light:#032F62">"0.0.35"</span><span style="--shiki-dark:#E1E4E8;--shiki-light:#24292E">],</span></span>
<span class="line"><span style="--shiki-dark:#E1E4E8;--shiki-light:#24292E">        [</span><span style="--shiki-dark:#9ECBFF;--shiki-light:#032F62">"Callout"</span><span style="--shiki-dark:#E1E4E8;--shiki-light:#24292E">,     </span><span style="--shiki-dark:#9ECBFF;--shiki-light:#032F62">"Display"</span><span style="--shiki-dark:#E1E4E8;--shiki-light:#24292E">,      </span><span style="--shiki-dark:#9ECBFF;--shiki-light:#032F62">"0.0.35"</span><span style="--shiki-dark:#E1E4E8;--shiki-light:#24292E">],</span></span>
<span class="line"><span style="--shiki-dark:#E1E4E8;--shiki-light:#24292E">        [</span><span style="--shiki-dark:#9ECBFF;--shiki-light:#032F62">"Code Block"</span><span style="--shiki-dark:#E1E4E8;--shiki-light:#24292E">,  </span><span style="--shiki-dark:#9ECBFF;--shiki-light:#032F62">"Display"</span><span style="--shiki-dark:#E1E4E8;--shiki-light:#24292E">,      </span><span style="--shiki-dark:#9ECBFF;--shiki-light:#032F62">"0.0.35"</span><span style="--shiki-dark:#E1E4E8;--shiki-light:#24292E">],</span></span>
<span class="line"><span style="--shiki-dark:#E1E4E8;--shiki-light:#24292E">        [</span><span style="--shiki-dark:#9ECBFF;--shiki-light:#032F62">"Data Table"</span><span style="--shiki-dark:#E1E4E8;--shiki-light:#24292E">,  </span><span style="--shiki-dark:#9ECBFF;--shiki-light:#032F62">"Interactive"</span><span style="--shiki-dark:#E1E4E8;--shiki-light:#24292E">,  </span><span style="--shiki-dark:#9ECBFF;--shiki-light:#032F62">"0.0.35"</span><span style="--shiki-dark:#E1E4E8;--shiki-light:#24292E">],</span></span>
<span class="line"><span style="--shiki-dark:#E1E4E8;--shiki-light:#24292E">        [</span><span style="--shiki-dark:#9ECBFF;--shiki-light:#032F62">"Steps"</span><span style="--shiki-dark:#E1E4E8;--shiki-light:#24292E">,       </span><span style="--shiki-dark:#9ECBFF;--shiki-light:#032F62">"Display"</span><span style="--shiki-dark:#E1E4E8;--shiki-light:#24292E">,      </span><span style="--shiki-dark:#9ECBFF;--shiki-light:#032F62">"0.0.35"</span><span style="--shiki-dark:#E1E4E8;--shiki-light:#24292E">],</span></span>
<span class="line"><span style="--shiki-dark:#E1E4E8;--shiki-light:#24292E">        [</span><span style="--shiki-dark:#9ECBFF;--shiki-light:#032F62">"Tabs"</span><span style="--shiki-dark:#E1E4E8;--shiki-light:#24292E">,        </span><span style="--shiki-dark:#9ECBFF;--shiki-light:#032F62">"Interactive"</span><span style="--shiki-dark:#E1E4E8;--shiki-light:#24292E">,  </span><span style="--shiki-dark:#9ECBFF;--shiki-light:#032F62">"0.0.35"</span><span style="--shiki-dark:#E1E4E8;--shiki-light:#24292E">],</span></span>
<span class="line"><span style="--shiki-dark:#E1E4E8;--shiki-light:#24292E">      ]}</span></span>
<span class="line"><span style="--shiki-dark:#B392F0;--shiki-light:#6F42C1">      caption</span><span style="--shiki-dark:#F97583;--shiki-light:#D73A49">=</span><span style="--shiki-dark:#9ECBFF;--shiki-light:#032F62">"mdx-ui component registry"</span></span>
<span class="line"><span style="--shiki-dark:#E1E4E8;--shiki-light:#24292E">    /></span></span>
<span class="line"><span style="--shiki-dark:#E1E4E8;--shiki-light:#24292E">  )</span></span>
<span class="line"><span style="--shiki-dark:#E1E4E8;--shiki-light:#24292E">}</span></span>
<span class="line"></span></code></pre>`,
  },
  "data-type-table-default": {
    source: `import { DataTypeTable } from "@/components/mdx/data-type-table"

export default function DataTypeTableDefault() {
  return (
    <DataTypeTable
      caption="Common AI/ML numeric data types"
      rows={[
        { type: "INT8",  bits: 8,  range: "-128 to 127",   quantized: true,  description: "Inference-optimised integer" },
        { type: "FP16",  bits: 16, range: "±65504",         quantized: false, description: "Half-precision float" },
        { type: "BF16",  bits: 16, range: "±3.39 × 10³⁸",  quantized: false, description: "Brain float 16" },
        { type: "FP32",  bits: 32, range: "±3.4 × 10³⁸",   quantized: false, description: "Full-precision float" },
      ]}
    />
  )
}
`,
    highlighted: `<pre class="shiki shiki-themes github-dark github-light" style="--shiki-dark:#e1e4e8;--shiki-light:#24292e;--shiki-dark-bg:#24292e;--shiki-light-bg:#fff" tabindex="0"><code><span class="line"><span style="--shiki-dark:#F97583;--shiki-light:#D73A49">import</span><span style="--shiki-dark:#E1E4E8;--shiki-light:#24292E"> { DataTypeTable } </span><span style="--shiki-dark:#F97583;--shiki-light:#D73A49">from</span><span style="--shiki-dark:#9ECBFF;--shiki-light:#032F62"> "@/components/mdx/data-type-table"</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-dark:#F97583;--shiki-light:#D73A49">export</span><span style="--shiki-dark:#F97583;--shiki-light:#D73A49"> default</span><span style="--shiki-dark:#F97583;--shiki-light:#D73A49"> function</span><span style="--shiki-dark:#B392F0;--shiki-light:#6F42C1"> DataTypeTableDefault</span><span style="--shiki-dark:#E1E4E8;--shiki-light:#24292E">() {</span></span>
<span class="line"><span style="--shiki-dark:#F97583;--shiki-light:#D73A49">  return</span><span style="--shiki-dark:#E1E4E8;--shiki-light:#24292E"> (</span></span>
<span class="line"><span style="--shiki-dark:#E1E4E8;--shiki-light:#24292E">    &#x3C;</span><span style="--shiki-dark:#79B8FF;--shiki-light:#005CC5">DataTypeTable</span></span>
<span class="line"><span style="--shiki-dark:#B392F0;--shiki-light:#6F42C1">      caption</span><span style="--shiki-dark:#F97583;--shiki-light:#D73A49">=</span><span style="--shiki-dark:#9ECBFF;--shiki-light:#032F62">"Common AI/ML numeric data types"</span></span>
<span class="line"><span style="--shiki-dark:#B392F0;--shiki-light:#6F42C1">      rows</span><span style="--shiki-dark:#F97583;--shiki-light:#D73A49">=</span><span style="--shiki-dark:#E1E4E8;--shiki-light:#24292E">{[</span></span>
<span class="line"><span style="--shiki-dark:#E1E4E8;--shiki-light:#24292E">        { type: </span><span style="--shiki-dark:#9ECBFF;--shiki-light:#032F62">"INT8"</span><span style="--shiki-dark:#E1E4E8;--shiki-light:#24292E">,  bits: </span><span style="--shiki-dark:#79B8FF;--shiki-light:#005CC5">8</span><span style="--shiki-dark:#E1E4E8;--shiki-light:#24292E">,  range: </span><span style="--shiki-dark:#9ECBFF;--shiki-light:#032F62">"-128 to 127"</span><span style="--shiki-dark:#E1E4E8;--shiki-light:#24292E">,   quantized: </span><span style="--shiki-dark:#79B8FF;--shiki-light:#005CC5">true</span><span style="--shiki-dark:#E1E4E8;--shiki-light:#24292E">,  description: </span><span style="--shiki-dark:#9ECBFF;--shiki-light:#032F62">"Inference-optimised integer"</span><span style="--shiki-dark:#E1E4E8;--shiki-light:#24292E"> },</span></span>
<span class="line"><span style="--shiki-dark:#E1E4E8;--shiki-light:#24292E">        { type: </span><span style="--shiki-dark:#9ECBFF;--shiki-light:#032F62">"FP16"</span><span style="--shiki-dark:#E1E4E8;--shiki-light:#24292E">,  bits: </span><span style="--shiki-dark:#79B8FF;--shiki-light:#005CC5">16</span><span style="--shiki-dark:#E1E4E8;--shiki-light:#24292E">, range: </span><span style="--shiki-dark:#9ECBFF;--shiki-light:#032F62">"±65504"</span><span style="--shiki-dark:#E1E4E8;--shiki-light:#24292E">,         quantized: </span><span style="--shiki-dark:#79B8FF;--shiki-light:#005CC5">false</span><span style="--shiki-dark:#E1E4E8;--shiki-light:#24292E">, description: </span><span style="--shiki-dark:#9ECBFF;--shiki-light:#032F62">"Half-precision float"</span><span style="--shiki-dark:#E1E4E8;--shiki-light:#24292E"> },</span></span>
<span class="line"><span style="--shiki-dark:#E1E4E8;--shiki-light:#24292E">        { type: </span><span style="--shiki-dark:#9ECBFF;--shiki-light:#032F62">"BF16"</span><span style="--shiki-dark:#E1E4E8;--shiki-light:#24292E">,  bits: </span><span style="--shiki-dark:#79B8FF;--shiki-light:#005CC5">16</span><span style="--shiki-dark:#E1E4E8;--shiki-light:#24292E">, range: </span><span style="--shiki-dark:#9ECBFF;--shiki-light:#032F62">"±3.39 × 10³⁸"</span><span style="--shiki-dark:#E1E4E8;--shiki-light:#24292E">,  quantized: </span><span style="--shiki-dark:#79B8FF;--shiki-light:#005CC5">false</span><span style="--shiki-dark:#E1E4E8;--shiki-light:#24292E">, description: </span><span style="--shiki-dark:#9ECBFF;--shiki-light:#032F62">"Brain float 16"</span><span style="--shiki-dark:#E1E4E8;--shiki-light:#24292E"> },</span></span>
<span class="line"><span style="--shiki-dark:#E1E4E8;--shiki-light:#24292E">        { type: </span><span style="--shiki-dark:#9ECBFF;--shiki-light:#032F62">"FP32"</span><span style="--shiki-dark:#E1E4E8;--shiki-light:#24292E">,  bits: </span><span style="--shiki-dark:#79B8FF;--shiki-light:#005CC5">32</span><span style="--shiki-dark:#E1E4E8;--shiki-light:#24292E">, range: </span><span style="--shiki-dark:#9ECBFF;--shiki-light:#032F62">"±3.4 × 10³⁸"</span><span style="--shiki-dark:#E1E4E8;--shiki-light:#24292E">,   quantized: </span><span style="--shiki-dark:#79B8FF;--shiki-light:#005CC5">false</span><span style="--shiki-dark:#E1E4E8;--shiki-light:#24292E">, description: </span><span style="--shiki-dark:#9ECBFF;--shiki-light:#032F62">"Full-precision float"</span><span style="--shiki-dark:#E1E4E8;--shiki-light:#24292E"> },</span></span>
<span class="line"><span style="--shiki-dark:#E1E4E8;--shiki-light:#24292E">      ]}</span></span>
<span class="line"><span style="--shiki-dark:#E1E4E8;--shiki-light:#24292E">    /></span></span>
<span class="line"><span style="--shiki-dark:#E1E4E8;--shiki-light:#24292E">  )</span></span>
<span class="line"><span style="--shiki-dark:#E1E4E8;--shiki-light:#24292E">}</span></span>
<span class="line"></span></code></pre>`,
  },
  "definition-default": {
    source: `import { Definition } from "@/components/mdx/definition"

export default function DefinitionDefault() {
  return (
    <div className="w-full space-y-4">
      <Definition term="Invariant">
        A condition that holds true before and after every operation on a data structure or algorithm.
      </Definition>
      <Definition term="Big-O Notation">
        A mathematical notation describing the upper bound of an algorithm&apos;s time or space complexity as the input size grows.
      </Definition>
    </div>
  )
}
`,
    highlighted: `<pre class="shiki shiki-themes github-dark github-light" style="--shiki-dark:#e1e4e8;--shiki-light:#24292e;--shiki-dark-bg:#24292e;--shiki-light-bg:#fff" tabindex="0"><code><span class="line"><span style="--shiki-dark:#F97583;--shiki-light:#D73A49">import</span><span style="--shiki-dark:#E1E4E8;--shiki-light:#24292E"> { Definition } </span><span style="--shiki-dark:#F97583;--shiki-light:#D73A49">from</span><span style="--shiki-dark:#9ECBFF;--shiki-light:#032F62"> "@/components/mdx/definition"</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-dark:#F97583;--shiki-light:#D73A49">export</span><span style="--shiki-dark:#F97583;--shiki-light:#D73A49"> default</span><span style="--shiki-dark:#F97583;--shiki-light:#D73A49"> function</span><span style="--shiki-dark:#B392F0;--shiki-light:#6F42C1"> DefinitionDefault</span><span style="--shiki-dark:#E1E4E8;--shiki-light:#24292E">() {</span></span>
<span class="line"><span style="--shiki-dark:#F97583;--shiki-light:#D73A49">  return</span><span style="--shiki-dark:#E1E4E8;--shiki-light:#24292E"> (</span></span>
<span class="line"><span style="--shiki-dark:#E1E4E8;--shiki-light:#24292E">    &#x3C;</span><span style="--shiki-dark:#85E89D;--shiki-light:#22863A">div</span><span style="--shiki-dark:#B392F0;--shiki-light:#6F42C1"> className</span><span style="--shiki-dark:#F97583;--shiki-light:#D73A49">=</span><span style="--shiki-dark:#9ECBFF;--shiki-light:#032F62">"w-full space-y-4"</span><span style="--shiki-dark:#E1E4E8;--shiki-light:#24292E">></span></span>
<span class="line"><span style="--shiki-dark:#E1E4E8;--shiki-light:#24292E">      &#x3C;</span><span style="--shiki-dark:#79B8FF;--shiki-light:#005CC5">Definition</span><span style="--shiki-dark:#B392F0;--shiki-light:#6F42C1"> term</span><span style="--shiki-dark:#F97583;--shiki-light:#D73A49">=</span><span style="--shiki-dark:#9ECBFF;--shiki-light:#032F62">"Invariant"</span><span style="--shiki-dark:#E1E4E8;--shiki-light:#24292E">></span></span>
<span class="line"><span style="--shiki-dark:#E1E4E8;--shiki-light:#24292E">        A condition that holds true before and after every operation on a data structure or algorithm.</span></span>
<span class="line"><span style="--shiki-dark:#E1E4E8;--shiki-light:#24292E">      &#x3C;/</span><span style="--shiki-dark:#79B8FF;--shiki-light:#005CC5">Definition</span><span style="--shiki-dark:#E1E4E8;--shiki-light:#24292E">></span></span>
<span class="line"><span style="--shiki-dark:#E1E4E8;--shiki-light:#24292E">      &#x3C;</span><span style="--shiki-dark:#79B8FF;--shiki-light:#005CC5">Definition</span><span style="--shiki-dark:#B392F0;--shiki-light:#6F42C1"> term</span><span style="--shiki-dark:#F97583;--shiki-light:#D73A49">=</span><span style="--shiki-dark:#9ECBFF;--shiki-light:#032F62">"Big-O Notation"</span><span style="--shiki-dark:#E1E4E8;--shiki-light:#24292E">></span></span>
<span class="line"><span style="--shiki-dark:#E1E4E8;--shiki-light:#24292E">        A mathematical notation describing the upper bound of an algorithm</span><span style="--shiki-dark:#79B8FF;--shiki-light:#005CC5">&#x26;apos;</span><span style="--shiki-dark:#E1E4E8;--shiki-light:#24292E">s time or space complexity as the input size grows.</span></span>
<span class="line"><span style="--shiki-dark:#E1E4E8;--shiki-light:#24292E">      &#x3C;/</span><span style="--shiki-dark:#79B8FF;--shiki-light:#005CC5">Definition</span><span style="--shiki-dark:#E1E4E8;--shiki-light:#24292E">></span></span>
<span class="line"><span style="--shiki-dark:#E1E4E8;--shiki-light:#24292E">    &#x3C;/</span><span style="--shiki-dark:#85E89D;--shiki-light:#22863A">div</span><span style="--shiki-dark:#E1E4E8;--shiki-light:#24292E">></span></span>
<span class="line"><span style="--shiki-dark:#E1E4E8;--shiki-light:#24292E">  )</span></span>
<span class="line"><span style="--shiki-dark:#E1E4E8;--shiki-light:#24292E">}</span></span>
<span class="line"></span></code></pre>`,
  },
  "diff-block-default": {
    source: `import { DiffBlock } from "@/components/mdx/diff-block"

export default function DiffBlockDefault() {
  return (
    <DiffBlock title="preview.tsx">
      {\` export interface PreviewProps {
   code: string
   lang?: string
   children: React.ReactNode
+  highlightedCode?: string
 }

-<pre className="overflow-x-auto p-4 text-sm">
-  <code>{code}</code>
-</pre>
+{highlightedCode ? (
+  <div dangerouslySetInnerHTML={{ __html: highlightedCode }} />
+) : (
+  <pre className="overflow-x-auto p-4 text-sm">
+    <code>{code}</code>
+  </pre>
+)}\`}
    </DiffBlock>
  )
}
`,
    highlighted: `<pre class="shiki shiki-themes github-dark github-light" style="--shiki-dark:#e1e4e8;--shiki-light:#24292e;--shiki-dark-bg:#24292e;--shiki-light-bg:#fff" tabindex="0"><code><span class="line"><span style="--shiki-dark:#F97583;--shiki-light:#D73A49">import</span><span style="--shiki-dark:#E1E4E8;--shiki-light:#24292E"> { DiffBlock } </span><span style="--shiki-dark:#F97583;--shiki-light:#D73A49">from</span><span style="--shiki-dark:#9ECBFF;--shiki-light:#032F62"> "@/components/mdx/diff-block"</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-dark:#F97583;--shiki-light:#D73A49">export</span><span style="--shiki-dark:#F97583;--shiki-light:#D73A49"> default</span><span style="--shiki-dark:#F97583;--shiki-light:#D73A49"> function</span><span style="--shiki-dark:#B392F0;--shiki-light:#6F42C1"> DiffBlockDefault</span><span style="--shiki-dark:#E1E4E8;--shiki-light:#24292E">() {</span></span>
<span class="line"><span style="--shiki-dark:#F97583;--shiki-light:#D73A49">  return</span><span style="--shiki-dark:#E1E4E8;--shiki-light:#24292E"> (</span></span>
<span class="line"><span style="--shiki-dark:#E1E4E8;--shiki-light:#24292E">    &#x3C;</span><span style="--shiki-dark:#79B8FF;--shiki-light:#005CC5">DiffBlock</span><span style="--shiki-dark:#B392F0;--shiki-light:#6F42C1"> title</span><span style="--shiki-dark:#F97583;--shiki-light:#D73A49">=</span><span style="--shiki-dark:#9ECBFF;--shiki-light:#032F62">"preview.tsx"</span><span style="--shiki-dark:#E1E4E8;--shiki-light:#24292E">></span></span>
<span class="line"><span style="--shiki-dark:#E1E4E8;--shiki-light:#24292E">      {</span><span style="--shiki-dark:#9ECBFF;--shiki-light:#032F62">\` export interface PreviewProps {</span></span>
<span class="line"><span style="--shiki-dark:#9ECBFF;--shiki-light:#032F62">   code: string</span></span>
<span class="line"><span style="--shiki-dark:#9ECBFF;--shiki-light:#032F62">   lang?: string</span></span>
<span class="line"><span style="--shiki-dark:#9ECBFF;--shiki-light:#032F62">   children: React.ReactNode</span></span>
<span class="line"><span style="--shiki-dark:#9ECBFF;--shiki-light:#032F62">+  highlightedCode?: string</span></span>
<span class="line"><span style="--shiki-dark:#9ECBFF;--shiki-light:#032F62"> }</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-dark:#9ECBFF;--shiki-light:#032F62">-&#x3C;pre className="overflow-x-auto p-4 text-sm"></span></span>
<span class="line"><span style="--shiki-dark:#9ECBFF;--shiki-light:#032F62">-  &#x3C;code>{code}&#x3C;/code></span></span>
<span class="line"><span style="--shiki-dark:#9ECBFF;--shiki-light:#032F62">-&#x3C;/pre></span></span>
<span class="line"><span style="--shiki-dark:#9ECBFF;--shiki-light:#032F62">+{highlightedCode ? (</span></span>
<span class="line"><span style="--shiki-dark:#9ECBFF;--shiki-light:#032F62">+  &#x3C;div dangerouslySetInnerHTML={{ __html: highlightedCode }} /></span></span>
<span class="line"><span style="--shiki-dark:#9ECBFF;--shiki-light:#032F62">+) : (</span></span>
<span class="line"><span style="--shiki-dark:#9ECBFF;--shiki-light:#032F62">+  &#x3C;pre className="overflow-x-auto p-4 text-sm"></span></span>
<span class="line"><span style="--shiki-dark:#9ECBFF;--shiki-light:#032F62">+    &#x3C;code>{code}&#x3C;/code></span></span>
<span class="line"><span style="--shiki-dark:#9ECBFF;--shiki-light:#032F62">+  &#x3C;/pre></span></span>
<span class="line"><span style="--shiki-dark:#9ECBFF;--shiki-light:#032F62">+)}\`</span><span style="--shiki-dark:#E1E4E8;--shiki-light:#24292E">}</span></span>
<span class="line"><span style="--shiki-dark:#E1E4E8;--shiki-light:#24292E">    &#x3C;/</span><span style="--shiki-dark:#79B8FF;--shiki-light:#005CC5">DiffBlock</span><span style="--shiki-dark:#E1E4E8;--shiki-light:#24292E">></span></span>
<span class="line"><span style="--shiki-dark:#E1E4E8;--shiki-light:#24292E">  )</span></span>
<span class="line"><span style="--shiki-dark:#E1E4E8;--shiki-light:#24292E">}</span></span>
<span class="line"></span></code></pre>`,
  },
  "emphasis-default": {
    source: `import { Strong, Em } from "@/components/mdx/emphasis"

export default function EmphasisDefault() {
  return (
    <p className="text-base leading-7">
      Use <Strong>bold text</Strong> for key terms and critical warnings.
      Use <Em>italic text</Em> for titles, foreign words, or gentle stress.
      Combine them for <Strong><Em>maximum emphasis</Em></Strong> when needed.
    </p>
  )
}
`,
    highlighted: `<pre class="shiki shiki-themes github-dark github-light" style="--shiki-dark:#e1e4e8;--shiki-light:#24292e;--shiki-dark-bg:#24292e;--shiki-light-bg:#fff" tabindex="0"><code><span class="line"><span style="--shiki-dark:#F97583;--shiki-light:#D73A49">import</span><span style="--shiki-dark:#E1E4E8;--shiki-light:#24292E"> { Strong, Em } </span><span style="--shiki-dark:#F97583;--shiki-light:#D73A49">from</span><span style="--shiki-dark:#9ECBFF;--shiki-light:#032F62"> "@/components/mdx/emphasis"</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-dark:#F97583;--shiki-light:#D73A49">export</span><span style="--shiki-dark:#F97583;--shiki-light:#D73A49"> default</span><span style="--shiki-dark:#F97583;--shiki-light:#D73A49"> function</span><span style="--shiki-dark:#B392F0;--shiki-light:#6F42C1"> EmphasisDefault</span><span style="--shiki-dark:#E1E4E8;--shiki-light:#24292E">() {</span></span>
<span class="line"><span style="--shiki-dark:#F97583;--shiki-light:#D73A49">  return</span><span style="--shiki-dark:#E1E4E8;--shiki-light:#24292E"> (</span></span>
<span class="line"><span style="--shiki-dark:#E1E4E8;--shiki-light:#24292E">    &#x3C;</span><span style="--shiki-dark:#85E89D;--shiki-light:#22863A">p</span><span style="--shiki-dark:#B392F0;--shiki-light:#6F42C1"> className</span><span style="--shiki-dark:#F97583;--shiki-light:#D73A49">=</span><span style="--shiki-dark:#9ECBFF;--shiki-light:#032F62">"text-base leading-7"</span><span style="--shiki-dark:#E1E4E8;--shiki-light:#24292E">></span></span>
<span class="line"><span style="--shiki-dark:#E1E4E8;--shiki-light:#24292E">      Use &#x3C;</span><span style="--shiki-dark:#79B8FF;--shiki-light:#005CC5">Strong</span><span style="--shiki-dark:#E1E4E8;--shiki-light:#24292E">>bold text&#x3C;/</span><span style="--shiki-dark:#79B8FF;--shiki-light:#005CC5">Strong</span><span style="--shiki-dark:#E1E4E8;--shiki-light:#24292E">> for key terms and critical warnings.</span></span>
<span class="line"><span style="--shiki-dark:#E1E4E8;--shiki-light:#24292E">      Use &#x3C;</span><span style="--shiki-dark:#79B8FF;--shiki-light:#005CC5">Em</span><span style="--shiki-dark:#E1E4E8;--shiki-light:#24292E">>italic text&#x3C;/</span><span style="--shiki-dark:#79B8FF;--shiki-light:#005CC5">Em</span><span style="--shiki-dark:#E1E4E8;--shiki-light:#24292E">> for titles, foreign words, or gentle stress.</span></span>
<span class="line"><span style="--shiki-dark:#E1E4E8;--shiki-light:#24292E">      Combine them for &#x3C;</span><span style="--shiki-dark:#79B8FF;--shiki-light:#005CC5">Strong</span><span style="--shiki-dark:#E1E4E8;--shiki-light:#24292E">>&#x3C;</span><span style="--shiki-dark:#79B8FF;--shiki-light:#005CC5">Em</span><span style="--shiki-dark:#E1E4E8;--shiki-light:#24292E">>maximum emphasis&#x3C;/</span><span style="--shiki-dark:#79B8FF;--shiki-light:#005CC5">Em</span><span style="--shiki-dark:#E1E4E8;--shiki-light:#24292E">>&#x3C;/</span><span style="--shiki-dark:#79B8FF;--shiki-light:#005CC5">Strong</span><span style="--shiki-dark:#E1E4E8;--shiki-light:#24292E">> when needed.</span></span>
<span class="line"><span style="--shiki-dark:#E1E4E8;--shiki-light:#24292E">    &#x3C;/</span><span style="--shiki-dark:#85E89D;--shiki-light:#22863A">p</span><span style="--shiki-dark:#E1E4E8;--shiki-light:#24292E">></span></span>
<span class="line"><span style="--shiki-dark:#E1E4E8;--shiki-light:#24292E">  )</span></span>
<span class="line"><span style="--shiki-dark:#E1E4E8;--shiki-light:#24292E">}</span></span>
<span class="line"></span></code></pre>`,
  },
  "file-tree-default": {
    source: `import { FileTree } from "@/components/mdx/file-tree"

export default function FileTreeDefault() {
  return (
    <FileTree>{\`app*/
  layout.tsx
  page.tsx
  globals.css
components*/
  mdx/
    accordion.tsx
    badge.tsx
    callout.tsx
  mdx-components.tsx
public/
  favicon.ico\`}</FileTree>
  )
}
`,
    highlighted: `<pre class="shiki shiki-themes github-dark github-light" style="--shiki-dark:#e1e4e8;--shiki-light:#24292e;--shiki-dark-bg:#24292e;--shiki-light-bg:#fff" tabindex="0"><code><span class="line"><span style="--shiki-dark:#F97583;--shiki-light:#D73A49">import</span><span style="--shiki-dark:#E1E4E8;--shiki-light:#24292E"> { FileTree } </span><span style="--shiki-dark:#F97583;--shiki-light:#D73A49">from</span><span style="--shiki-dark:#9ECBFF;--shiki-light:#032F62"> "@/components/mdx/file-tree"</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-dark:#F97583;--shiki-light:#D73A49">export</span><span style="--shiki-dark:#F97583;--shiki-light:#D73A49"> default</span><span style="--shiki-dark:#F97583;--shiki-light:#D73A49"> function</span><span style="--shiki-dark:#B392F0;--shiki-light:#6F42C1"> FileTreeDefault</span><span style="--shiki-dark:#E1E4E8;--shiki-light:#24292E">() {</span></span>
<span class="line"><span style="--shiki-dark:#F97583;--shiki-light:#D73A49">  return</span><span style="--shiki-dark:#E1E4E8;--shiki-light:#24292E"> (</span></span>
<span class="line"><span style="--shiki-dark:#E1E4E8;--shiki-light:#24292E">    &#x3C;</span><span style="--shiki-dark:#79B8FF;--shiki-light:#005CC5">FileTree</span><span style="--shiki-dark:#E1E4E8;--shiki-light:#24292E">>{</span><span style="--shiki-dark:#9ECBFF;--shiki-light:#032F62">\`app*/</span></span>
<span class="line"><span style="--shiki-dark:#9ECBFF;--shiki-light:#032F62">  layout.tsx</span></span>
<span class="line"><span style="--shiki-dark:#9ECBFF;--shiki-light:#032F62">  page.tsx</span></span>
<span class="line"><span style="--shiki-dark:#9ECBFF;--shiki-light:#032F62">  globals.css</span></span>
<span class="line"><span style="--shiki-dark:#9ECBFF;--shiki-light:#032F62">components*/</span></span>
<span class="line"><span style="--shiki-dark:#9ECBFF;--shiki-light:#032F62">  mdx/</span></span>
<span class="line"><span style="--shiki-dark:#9ECBFF;--shiki-light:#032F62">    accordion.tsx</span></span>
<span class="line"><span style="--shiki-dark:#9ECBFF;--shiki-light:#032F62">    badge.tsx</span></span>
<span class="line"><span style="--shiki-dark:#9ECBFF;--shiki-light:#032F62">    callout.tsx</span></span>
<span class="line"><span style="--shiki-dark:#9ECBFF;--shiki-light:#032F62">  mdx-components.tsx</span></span>
<span class="line"><span style="--shiki-dark:#9ECBFF;--shiki-light:#032F62">public/</span></span>
<span class="line"><span style="--shiki-dark:#9ECBFF;--shiki-light:#032F62">  favicon.ico\`</span><span style="--shiki-dark:#E1E4E8;--shiki-light:#24292E">}&#x3C;/</span><span style="--shiki-dark:#79B8FF;--shiki-light:#005CC5">FileTree</span><span style="--shiki-dark:#E1E4E8;--shiki-light:#24292E">></span></span>
<span class="line"><span style="--shiki-dark:#E1E4E8;--shiki-light:#24292E">  )</span></span>
<span class="line"><span style="--shiki-dark:#E1E4E8;--shiki-light:#24292E">}</span></span>
<span class="line"></span></code></pre>`,
  },
  "glossary-default": {
    source: `"use client"
import { GlossaryProvider, Term } from "@/components/mdx/glossary"

const terms = {
  bfs: {
    label: "BFS",
    definition:
      "Breadth-First Search — explores all nodes at the current depth level before moving to the next. Uses a queue internally. Time: O(V + E).",
  },
  dfs: {
    label: "DFS",
    definition:
      "Depth-First Search — explores as far as possible along each branch before backtracking. Uses a stack (or recursion). Time: O(V + E).",
  },
}

export default function GlossaryDefault() {
  return (
    <GlossaryProvider terms={terms}>
      <p className="text-sm leading-7">
        Graph traversal can be performed using either{" "}
        <Term id="bfs" /> or{" "}
        <Term id="dfs" />.{" "}
        Click either term to view its definition.
      </p>
    </GlossaryProvider>
  )
}
`,
    highlighted: `<pre class="shiki shiki-themes github-dark github-light" style="--shiki-dark:#e1e4e8;--shiki-light:#24292e;--shiki-dark-bg:#24292e;--shiki-light-bg:#fff" tabindex="0"><code><span class="line"><span style="--shiki-dark:#9ECBFF;--shiki-light:#032F62">"use client"</span></span>
<span class="line"><span style="--shiki-dark:#F97583;--shiki-light:#D73A49">import</span><span style="--shiki-dark:#E1E4E8;--shiki-light:#24292E"> { GlossaryProvider, Term } </span><span style="--shiki-dark:#F97583;--shiki-light:#D73A49">from</span><span style="--shiki-dark:#9ECBFF;--shiki-light:#032F62"> "@/components/mdx/glossary"</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-dark:#F97583;--shiki-light:#D73A49">const</span><span style="--shiki-dark:#79B8FF;--shiki-light:#005CC5"> terms</span><span style="--shiki-dark:#F97583;--shiki-light:#D73A49"> =</span><span style="--shiki-dark:#E1E4E8;--shiki-light:#24292E"> {</span></span>
<span class="line"><span style="--shiki-dark:#E1E4E8;--shiki-light:#24292E">  bfs: {</span></span>
<span class="line"><span style="--shiki-dark:#E1E4E8;--shiki-light:#24292E">    label: </span><span style="--shiki-dark:#9ECBFF;--shiki-light:#032F62">"BFS"</span><span style="--shiki-dark:#E1E4E8;--shiki-light:#24292E">,</span></span>
<span class="line"><span style="--shiki-dark:#E1E4E8;--shiki-light:#24292E">    definition:</span></span>
<span class="line"><span style="--shiki-dark:#9ECBFF;--shiki-light:#032F62">      "Breadth-First Search — explores all nodes at the current depth level before moving to the next. Uses a queue internally. Time: O(V + E)."</span><span style="--shiki-dark:#E1E4E8;--shiki-light:#24292E">,</span></span>
<span class="line"><span style="--shiki-dark:#E1E4E8;--shiki-light:#24292E">  },</span></span>
<span class="line"><span style="--shiki-dark:#E1E4E8;--shiki-light:#24292E">  dfs: {</span></span>
<span class="line"><span style="--shiki-dark:#E1E4E8;--shiki-light:#24292E">    label: </span><span style="--shiki-dark:#9ECBFF;--shiki-light:#032F62">"DFS"</span><span style="--shiki-dark:#E1E4E8;--shiki-light:#24292E">,</span></span>
<span class="line"><span style="--shiki-dark:#E1E4E8;--shiki-light:#24292E">    definition:</span></span>
<span class="line"><span style="--shiki-dark:#9ECBFF;--shiki-light:#032F62">      "Depth-First Search — explores as far as possible along each branch before backtracking. Uses a stack (or recursion). Time: O(V + E)."</span><span style="--shiki-dark:#E1E4E8;--shiki-light:#24292E">,</span></span>
<span class="line"><span style="--shiki-dark:#E1E4E8;--shiki-light:#24292E">  },</span></span>
<span class="line"><span style="--shiki-dark:#E1E4E8;--shiki-light:#24292E">}</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-dark:#F97583;--shiki-light:#D73A49">export</span><span style="--shiki-dark:#F97583;--shiki-light:#D73A49"> default</span><span style="--shiki-dark:#F97583;--shiki-light:#D73A49"> function</span><span style="--shiki-dark:#B392F0;--shiki-light:#6F42C1"> GlossaryDefault</span><span style="--shiki-dark:#E1E4E8;--shiki-light:#24292E">() {</span></span>
<span class="line"><span style="--shiki-dark:#F97583;--shiki-light:#D73A49">  return</span><span style="--shiki-dark:#E1E4E8;--shiki-light:#24292E"> (</span></span>
<span class="line"><span style="--shiki-dark:#E1E4E8;--shiki-light:#24292E">    &#x3C;</span><span style="--shiki-dark:#79B8FF;--shiki-light:#005CC5">GlossaryProvider</span><span style="--shiki-dark:#B392F0;--shiki-light:#6F42C1"> terms</span><span style="--shiki-dark:#F97583;--shiki-light:#D73A49">=</span><span style="--shiki-dark:#E1E4E8;--shiki-light:#24292E">{terms}></span></span>
<span class="line"><span style="--shiki-dark:#E1E4E8;--shiki-light:#24292E">      &#x3C;</span><span style="--shiki-dark:#85E89D;--shiki-light:#22863A">p</span><span style="--shiki-dark:#B392F0;--shiki-light:#6F42C1"> className</span><span style="--shiki-dark:#F97583;--shiki-light:#D73A49">=</span><span style="--shiki-dark:#9ECBFF;--shiki-light:#032F62">"text-sm leading-7"</span><span style="--shiki-dark:#E1E4E8;--shiki-light:#24292E">></span></span>
<span class="line"><span style="--shiki-dark:#E1E4E8;--shiki-light:#24292E">        Graph traversal can be performed using either{</span><span style="--shiki-dark:#9ECBFF;--shiki-light:#032F62">" "</span><span style="--shiki-dark:#E1E4E8;--shiki-light:#24292E">}</span></span>
<span class="line"><span style="--shiki-dark:#E1E4E8;--shiki-light:#24292E">        &#x3C;</span><span style="--shiki-dark:#79B8FF;--shiki-light:#005CC5">Term</span><span style="--shiki-dark:#B392F0;--shiki-light:#6F42C1"> id</span><span style="--shiki-dark:#F97583;--shiki-light:#D73A49">=</span><span style="--shiki-dark:#9ECBFF;--shiki-light:#032F62">"bfs"</span><span style="--shiki-dark:#E1E4E8;--shiki-light:#24292E"> /> or{</span><span style="--shiki-dark:#9ECBFF;--shiki-light:#032F62">" "</span><span style="--shiki-dark:#E1E4E8;--shiki-light:#24292E">}</span></span>
<span class="line"><span style="--shiki-dark:#E1E4E8;--shiki-light:#24292E">        &#x3C;</span><span style="--shiki-dark:#79B8FF;--shiki-light:#005CC5">Term</span><span style="--shiki-dark:#B392F0;--shiki-light:#6F42C1"> id</span><span style="--shiki-dark:#F97583;--shiki-light:#D73A49">=</span><span style="--shiki-dark:#9ECBFF;--shiki-light:#032F62">"dfs"</span><span style="--shiki-dark:#E1E4E8;--shiki-light:#24292E"> />.{</span><span style="--shiki-dark:#9ECBFF;--shiki-light:#032F62">" "</span><span style="--shiki-dark:#E1E4E8;--shiki-light:#24292E">}</span></span>
<span class="line"><span style="--shiki-dark:#E1E4E8;--shiki-light:#24292E">        Click either term to view its definition.</span></span>
<span class="line"><span style="--shiki-dark:#E1E4E8;--shiki-light:#24292E">      &#x3C;/</span><span style="--shiki-dark:#85E89D;--shiki-light:#22863A">p</span><span style="--shiki-dark:#E1E4E8;--shiki-light:#24292E">></span></span>
<span class="line"><span style="--shiki-dark:#E1E4E8;--shiki-light:#24292E">    &#x3C;/</span><span style="--shiki-dark:#79B8FF;--shiki-light:#005CC5">GlossaryProvider</span><span style="--shiki-dark:#E1E4E8;--shiki-light:#24292E">></span></span>
<span class="line"><span style="--shiki-dark:#E1E4E8;--shiki-light:#24292E">  )</span></span>
<span class="line"><span style="--shiki-dark:#E1E4E8;--shiki-light:#24292E">}</span></span>
<span class="line"></span></code></pre>`,
  },
  "hardware-spec-default": {
    source: `import { HardwareSpec } from "@/components/mdx/hardware-spec"

export default function HardwareSpecDefault() {
  return (
    <HardwareSpec
      name="USB 3.1 Gen 2"
      type="Universal Serial Bus"
      version="3.1 Gen 2"
      speed="10 Gbps"
      voltage="3.3V / 1.8V"
      pins={24}
      description="High-speed USB interface for peripheral connectivity and power delivery."
    />
  )
}
`,
    highlighted: `<pre class="shiki shiki-themes github-dark github-light" style="--shiki-dark:#e1e4e8;--shiki-light:#24292e;--shiki-dark-bg:#24292e;--shiki-light-bg:#fff" tabindex="0"><code><span class="line"><span style="--shiki-dark:#F97583;--shiki-light:#D73A49">import</span><span style="--shiki-dark:#E1E4E8;--shiki-light:#24292E"> { HardwareSpec } </span><span style="--shiki-dark:#F97583;--shiki-light:#D73A49">from</span><span style="--shiki-dark:#9ECBFF;--shiki-light:#032F62"> "@/components/mdx/hardware-spec"</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-dark:#F97583;--shiki-light:#D73A49">export</span><span style="--shiki-dark:#F97583;--shiki-light:#D73A49"> default</span><span style="--shiki-dark:#F97583;--shiki-light:#D73A49"> function</span><span style="--shiki-dark:#B392F0;--shiki-light:#6F42C1"> HardwareSpecDefault</span><span style="--shiki-dark:#E1E4E8;--shiki-light:#24292E">() {</span></span>
<span class="line"><span style="--shiki-dark:#F97583;--shiki-light:#D73A49">  return</span><span style="--shiki-dark:#E1E4E8;--shiki-light:#24292E"> (</span></span>
<span class="line"><span style="--shiki-dark:#E1E4E8;--shiki-light:#24292E">    &#x3C;</span><span style="--shiki-dark:#79B8FF;--shiki-light:#005CC5">HardwareSpec</span></span>
<span class="line"><span style="--shiki-dark:#B392F0;--shiki-light:#6F42C1">      name</span><span style="--shiki-dark:#F97583;--shiki-light:#D73A49">=</span><span style="--shiki-dark:#9ECBFF;--shiki-light:#032F62">"USB 3.1 Gen 2"</span></span>
<span class="line"><span style="--shiki-dark:#B392F0;--shiki-light:#6F42C1">      type</span><span style="--shiki-dark:#F97583;--shiki-light:#D73A49">=</span><span style="--shiki-dark:#9ECBFF;--shiki-light:#032F62">"Universal Serial Bus"</span></span>
<span class="line"><span style="--shiki-dark:#B392F0;--shiki-light:#6F42C1">      version</span><span style="--shiki-dark:#F97583;--shiki-light:#D73A49">=</span><span style="--shiki-dark:#9ECBFF;--shiki-light:#032F62">"3.1 Gen 2"</span></span>
<span class="line"><span style="--shiki-dark:#B392F0;--shiki-light:#6F42C1">      speed</span><span style="--shiki-dark:#F97583;--shiki-light:#D73A49">=</span><span style="--shiki-dark:#9ECBFF;--shiki-light:#032F62">"10 Gbps"</span></span>
<span class="line"><span style="--shiki-dark:#B392F0;--shiki-light:#6F42C1">      voltage</span><span style="--shiki-dark:#F97583;--shiki-light:#D73A49">=</span><span style="--shiki-dark:#9ECBFF;--shiki-light:#032F62">"3.3V / 1.8V"</span></span>
<span class="line"><span style="--shiki-dark:#B392F0;--shiki-light:#6F42C1">      pins</span><span style="--shiki-dark:#F97583;--shiki-light:#D73A49">=</span><span style="--shiki-dark:#E1E4E8;--shiki-light:#24292E">{</span><span style="--shiki-dark:#79B8FF;--shiki-light:#005CC5">24</span><span style="--shiki-dark:#E1E4E8;--shiki-light:#24292E">}</span></span>
<span class="line"><span style="--shiki-dark:#B392F0;--shiki-light:#6F42C1">      description</span><span style="--shiki-dark:#F97583;--shiki-light:#D73A49">=</span><span style="--shiki-dark:#9ECBFF;--shiki-light:#032F62">"High-speed USB interface for peripheral connectivity and power delivery."</span></span>
<span class="line"><span style="--shiki-dark:#E1E4E8;--shiki-light:#24292E">    /></span></span>
<span class="line"><span style="--shiki-dark:#E1E4E8;--shiki-light:#24292E">  )</span></span>
<span class="line"><span style="--shiki-dark:#E1E4E8;--shiki-light:#24292E">}</span></span>
<span class="line"></span></code></pre>`,
  },
  "heading-default": {
    source: `import { H2, H3, H4, H5 } from "@/components/mdx/heading"

export default function HeadingDefault() {
  return (
    <div className="w-full space-y-2">
      <H2>Heading level 2</H2>
      <H3>Heading level 3</H3>
      <H4>Heading level 4</H4>
      <H5>Heading level 5</H5>
    </div>
  )
}
`,
    highlighted: `<pre class="shiki shiki-themes github-dark github-light" style="--shiki-dark:#e1e4e8;--shiki-light:#24292e;--shiki-dark-bg:#24292e;--shiki-light-bg:#fff" tabindex="0"><code><span class="line"><span style="--shiki-dark:#F97583;--shiki-light:#D73A49">import</span><span style="--shiki-dark:#E1E4E8;--shiki-light:#24292E"> { H2, H3, H4, H5 } </span><span style="--shiki-dark:#F97583;--shiki-light:#D73A49">from</span><span style="--shiki-dark:#9ECBFF;--shiki-light:#032F62"> "@/components/mdx/heading"</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-dark:#F97583;--shiki-light:#D73A49">export</span><span style="--shiki-dark:#F97583;--shiki-light:#D73A49"> default</span><span style="--shiki-dark:#F97583;--shiki-light:#D73A49"> function</span><span style="--shiki-dark:#B392F0;--shiki-light:#6F42C1"> HeadingDefault</span><span style="--shiki-dark:#E1E4E8;--shiki-light:#24292E">() {</span></span>
<span class="line"><span style="--shiki-dark:#F97583;--shiki-light:#D73A49">  return</span><span style="--shiki-dark:#E1E4E8;--shiki-light:#24292E"> (</span></span>
<span class="line"><span style="--shiki-dark:#E1E4E8;--shiki-light:#24292E">    &#x3C;</span><span style="--shiki-dark:#85E89D;--shiki-light:#22863A">div</span><span style="--shiki-dark:#B392F0;--shiki-light:#6F42C1"> className</span><span style="--shiki-dark:#F97583;--shiki-light:#D73A49">=</span><span style="--shiki-dark:#9ECBFF;--shiki-light:#032F62">"w-full space-y-2"</span><span style="--shiki-dark:#E1E4E8;--shiki-light:#24292E">></span></span>
<span class="line"><span style="--shiki-dark:#E1E4E8;--shiki-light:#24292E">      &#x3C;</span><span style="--shiki-dark:#79B8FF;--shiki-light:#005CC5">H2</span><span style="--shiki-dark:#E1E4E8;--shiki-light:#24292E">>Heading level 2&#x3C;/</span><span style="--shiki-dark:#79B8FF;--shiki-light:#005CC5">H2</span><span style="--shiki-dark:#E1E4E8;--shiki-light:#24292E">></span></span>
<span class="line"><span style="--shiki-dark:#E1E4E8;--shiki-light:#24292E">      &#x3C;</span><span style="--shiki-dark:#79B8FF;--shiki-light:#005CC5">H3</span><span style="--shiki-dark:#E1E4E8;--shiki-light:#24292E">>Heading level 3&#x3C;/</span><span style="--shiki-dark:#79B8FF;--shiki-light:#005CC5">H3</span><span style="--shiki-dark:#E1E4E8;--shiki-light:#24292E">></span></span>
<span class="line"><span style="--shiki-dark:#E1E4E8;--shiki-light:#24292E">      &#x3C;</span><span style="--shiki-dark:#79B8FF;--shiki-light:#005CC5">H4</span><span style="--shiki-dark:#E1E4E8;--shiki-light:#24292E">>Heading level 4&#x3C;/</span><span style="--shiki-dark:#79B8FF;--shiki-light:#005CC5">H4</span><span style="--shiki-dark:#E1E4E8;--shiki-light:#24292E">></span></span>
<span class="line"><span style="--shiki-dark:#E1E4E8;--shiki-light:#24292E">      &#x3C;</span><span style="--shiki-dark:#79B8FF;--shiki-light:#005CC5">H5</span><span style="--shiki-dark:#E1E4E8;--shiki-light:#24292E">>Heading level 5&#x3C;/</span><span style="--shiki-dark:#79B8FF;--shiki-light:#005CC5">H5</span><span style="--shiki-dark:#E1E4E8;--shiki-light:#24292E">></span></span>
<span class="line"><span style="--shiki-dark:#E1E4E8;--shiki-light:#24292E">    &#x3C;/</span><span style="--shiki-dark:#85E89D;--shiki-light:#22863A">div</span><span style="--shiki-dark:#E1E4E8;--shiki-light:#24292E">></span></span>
<span class="line"><span style="--shiki-dark:#E1E4E8;--shiki-light:#24292E">  )</span></span>
<span class="line"><span style="--shiki-dark:#E1E4E8;--shiki-light:#24292E">}</span></span>
<span class="line"></span></code></pre>`,
  },
  "headings-default": {
    source: `import { Headings } from "@/components/mdx/headings"

export default function HeadingsDefault() {
  return <Headings />
}
`,
    highlighted: `<pre class="shiki shiki-themes github-dark github-light" style="--shiki-dark:#e1e4e8;--shiki-light:#24292e;--shiki-dark-bg:#24292e;--shiki-light-bg:#fff" tabindex="0"><code><span class="line"><span style="--shiki-dark:#F97583;--shiki-light:#D73A49">import</span><span style="--shiki-dark:#E1E4E8;--shiki-light:#24292E"> { Headings } </span><span style="--shiki-dark:#F97583;--shiki-light:#D73A49">from</span><span style="--shiki-dark:#9ECBFF;--shiki-light:#032F62"> "@/components/mdx/headings"</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-dark:#F97583;--shiki-light:#D73A49">export</span><span style="--shiki-dark:#F97583;--shiki-light:#D73A49"> default</span><span style="--shiki-dark:#F97583;--shiki-light:#D73A49"> function</span><span style="--shiki-dark:#B392F0;--shiki-light:#6F42C1"> HeadingsDefault</span><span style="--shiki-dark:#E1E4E8;--shiki-light:#24292E">() {</span></span>
<span class="line"><span style="--shiki-dark:#F97583;--shiki-light:#D73A49">  return</span><span style="--shiki-dark:#E1E4E8;--shiki-light:#24292E"> &#x3C;</span><span style="--shiki-dark:#79B8FF;--shiki-light:#005CC5">Headings</span><span style="--shiki-dark:#E1E4E8;--shiki-light:#24292E"> /></span></span>
<span class="line"><span style="--shiki-dark:#E1E4E8;--shiki-light:#24292E">}</span></span>
<span class="line"></span></code></pre>`,
  },
  "highlight-default": {
    source: `import { Highlight } from "@/components/mdx/highlight"

export default function HighlightDefault() {
  return (
    <p className="text-base leading-8">
      Use <Highlight color="yellow">yellow</Highlight> for general emphasis,{" "}
      <Highlight color="blue">blue</Highlight> for technical terms,{" "}
      <Highlight color="green">green</Highlight> for positive outcomes,{" "}
      <Highlight color="pink">pink</Highlight> for warnings, and{" "}
      <Highlight color="purple">purple</Highlight> for special concepts.
    </p>
  )
}
`,
    highlighted: `<pre class="shiki shiki-themes github-dark github-light" style="--shiki-dark:#e1e4e8;--shiki-light:#24292e;--shiki-dark-bg:#24292e;--shiki-light-bg:#fff" tabindex="0"><code><span class="line"><span style="--shiki-dark:#F97583;--shiki-light:#D73A49">import</span><span style="--shiki-dark:#E1E4E8;--shiki-light:#24292E"> { Highlight } </span><span style="--shiki-dark:#F97583;--shiki-light:#D73A49">from</span><span style="--shiki-dark:#9ECBFF;--shiki-light:#032F62"> "@/components/mdx/highlight"</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-dark:#F97583;--shiki-light:#D73A49">export</span><span style="--shiki-dark:#F97583;--shiki-light:#D73A49"> default</span><span style="--shiki-dark:#F97583;--shiki-light:#D73A49"> function</span><span style="--shiki-dark:#B392F0;--shiki-light:#6F42C1"> HighlightDefault</span><span style="--shiki-dark:#E1E4E8;--shiki-light:#24292E">() {</span></span>
<span class="line"><span style="--shiki-dark:#F97583;--shiki-light:#D73A49">  return</span><span style="--shiki-dark:#E1E4E8;--shiki-light:#24292E"> (</span></span>
<span class="line"><span style="--shiki-dark:#E1E4E8;--shiki-light:#24292E">    &#x3C;</span><span style="--shiki-dark:#85E89D;--shiki-light:#22863A">p</span><span style="--shiki-dark:#B392F0;--shiki-light:#6F42C1"> className</span><span style="--shiki-dark:#F97583;--shiki-light:#D73A49">=</span><span style="--shiki-dark:#9ECBFF;--shiki-light:#032F62">"text-base leading-8"</span><span style="--shiki-dark:#E1E4E8;--shiki-light:#24292E">></span></span>
<span class="line"><span style="--shiki-dark:#E1E4E8;--shiki-light:#24292E">      Use &#x3C;</span><span style="--shiki-dark:#79B8FF;--shiki-light:#005CC5">Highlight</span><span style="--shiki-dark:#B392F0;--shiki-light:#6F42C1"> color</span><span style="--shiki-dark:#F97583;--shiki-light:#D73A49">=</span><span style="--shiki-dark:#9ECBFF;--shiki-light:#032F62">"yellow"</span><span style="--shiki-dark:#E1E4E8;--shiki-light:#24292E">>yellow&#x3C;/</span><span style="--shiki-dark:#79B8FF;--shiki-light:#005CC5">Highlight</span><span style="--shiki-dark:#E1E4E8;--shiki-light:#24292E">> for general emphasis,{</span><span style="--shiki-dark:#9ECBFF;--shiki-light:#032F62">" "</span><span style="--shiki-dark:#E1E4E8;--shiki-light:#24292E">}</span></span>
<span class="line"><span style="--shiki-dark:#E1E4E8;--shiki-light:#24292E">      &#x3C;</span><span style="--shiki-dark:#79B8FF;--shiki-light:#005CC5">Highlight</span><span style="--shiki-dark:#B392F0;--shiki-light:#6F42C1"> color</span><span style="--shiki-dark:#F97583;--shiki-light:#D73A49">=</span><span style="--shiki-dark:#9ECBFF;--shiki-light:#032F62">"blue"</span><span style="--shiki-dark:#E1E4E8;--shiki-light:#24292E">>blue&#x3C;/</span><span style="--shiki-dark:#79B8FF;--shiki-light:#005CC5">Highlight</span><span style="--shiki-dark:#E1E4E8;--shiki-light:#24292E">> for technical terms,{</span><span style="--shiki-dark:#9ECBFF;--shiki-light:#032F62">" "</span><span style="--shiki-dark:#E1E4E8;--shiki-light:#24292E">}</span></span>
<span class="line"><span style="--shiki-dark:#E1E4E8;--shiki-light:#24292E">      &#x3C;</span><span style="--shiki-dark:#79B8FF;--shiki-light:#005CC5">Highlight</span><span style="--shiki-dark:#B392F0;--shiki-light:#6F42C1"> color</span><span style="--shiki-dark:#F97583;--shiki-light:#D73A49">=</span><span style="--shiki-dark:#9ECBFF;--shiki-light:#032F62">"green"</span><span style="--shiki-dark:#E1E4E8;--shiki-light:#24292E">>green&#x3C;/</span><span style="--shiki-dark:#79B8FF;--shiki-light:#005CC5">Highlight</span><span style="--shiki-dark:#E1E4E8;--shiki-light:#24292E">> for positive outcomes,{</span><span style="--shiki-dark:#9ECBFF;--shiki-light:#032F62">" "</span><span style="--shiki-dark:#E1E4E8;--shiki-light:#24292E">}</span></span>
<span class="line"><span style="--shiki-dark:#E1E4E8;--shiki-light:#24292E">      &#x3C;</span><span style="--shiki-dark:#79B8FF;--shiki-light:#005CC5">Highlight</span><span style="--shiki-dark:#B392F0;--shiki-light:#6F42C1"> color</span><span style="--shiki-dark:#F97583;--shiki-light:#D73A49">=</span><span style="--shiki-dark:#9ECBFF;--shiki-light:#032F62">"pink"</span><span style="--shiki-dark:#E1E4E8;--shiki-light:#24292E">>pink&#x3C;/</span><span style="--shiki-dark:#79B8FF;--shiki-light:#005CC5">Highlight</span><span style="--shiki-dark:#E1E4E8;--shiki-light:#24292E">> for warnings, and{</span><span style="--shiki-dark:#9ECBFF;--shiki-light:#032F62">" "</span><span style="--shiki-dark:#E1E4E8;--shiki-light:#24292E">}</span></span>
<span class="line"><span style="--shiki-dark:#E1E4E8;--shiki-light:#24292E">      &#x3C;</span><span style="--shiki-dark:#79B8FF;--shiki-light:#005CC5">Highlight</span><span style="--shiki-dark:#B392F0;--shiki-light:#6F42C1"> color</span><span style="--shiki-dark:#F97583;--shiki-light:#D73A49">=</span><span style="--shiki-dark:#9ECBFF;--shiki-light:#032F62">"purple"</span><span style="--shiki-dark:#E1E4E8;--shiki-light:#24292E">>purple&#x3C;/</span><span style="--shiki-dark:#79B8FF;--shiki-light:#005CC5">Highlight</span><span style="--shiki-dark:#E1E4E8;--shiki-light:#24292E">> for special concepts.</span></span>
<span class="line"><span style="--shiki-dark:#E1E4E8;--shiki-light:#24292E">    &#x3C;/</span><span style="--shiki-dark:#85E89D;--shiki-light:#22863A">p</span><span style="--shiki-dark:#E1E4E8;--shiki-light:#24292E">></span></span>
<span class="line"><span style="--shiki-dark:#E1E4E8;--shiki-light:#24292E">  )</span></span>
<span class="line"><span style="--shiki-dark:#E1E4E8;--shiki-light:#24292E">}</span></span>
<span class="line"></span></code></pre>`,
  },
  "horizontal-rule-default": {
    source: `import { HorizontalRule } from "@/components/mdx/horizontal-rule"

export default function HorizontalRuleDefault() {
  return (
    <div className="w-full space-y-2">
      <p className="text-xs text-muted-foreground">default</p>
      <HorizontalRule />
      <p className="text-xs text-muted-foreground">dashed</p>
      <HorizontalRule variant="dashed" />
      <p className="text-xs text-muted-foreground">dotted</p>
      <HorizontalRule variant="dotted" />
      <p className="text-xs text-muted-foreground">gradient</p>
      <HorizontalRule variant="gradient" />
    </div>
  )
}
`,
    highlighted: `<pre class="shiki shiki-themes github-dark github-light" style="--shiki-dark:#e1e4e8;--shiki-light:#24292e;--shiki-dark-bg:#24292e;--shiki-light-bg:#fff" tabindex="0"><code><span class="line"><span style="--shiki-dark:#F97583;--shiki-light:#D73A49">import</span><span style="--shiki-dark:#E1E4E8;--shiki-light:#24292E"> { HorizontalRule } </span><span style="--shiki-dark:#F97583;--shiki-light:#D73A49">from</span><span style="--shiki-dark:#9ECBFF;--shiki-light:#032F62"> "@/components/mdx/horizontal-rule"</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-dark:#F97583;--shiki-light:#D73A49">export</span><span style="--shiki-dark:#F97583;--shiki-light:#D73A49"> default</span><span style="--shiki-dark:#F97583;--shiki-light:#D73A49"> function</span><span style="--shiki-dark:#B392F0;--shiki-light:#6F42C1"> HorizontalRuleDefault</span><span style="--shiki-dark:#E1E4E8;--shiki-light:#24292E">() {</span></span>
<span class="line"><span style="--shiki-dark:#F97583;--shiki-light:#D73A49">  return</span><span style="--shiki-dark:#E1E4E8;--shiki-light:#24292E"> (</span></span>
<span class="line"><span style="--shiki-dark:#E1E4E8;--shiki-light:#24292E">    &#x3C;</span><span style="--shiki-dark:#85E89D;--shiki-light:#22863A">div</span><span style="--shiki-dark:#B392F0;--shiki-light:#6F42C1"> className</span><span style="--shiki-dark:#F97583;--shiki-light:#D73A49">=</span><span style="--shiki-dark:#9ECBFF;--shiki-light:#032F62">"w-full space-y-2"</span><span style="--shiki-dark:#E1E4E8;--shiki-light:#24292E">></span></span>
<span class="line"><span style="--shiki-dark:#E1E4E8;--shiki-light:#24292E">      &#x3C;</span><span style="--shiki-dark:#85E89D;--shiki-light:#22863A">p</span><span style="--shiki-dark:#B392F0;--shiki-light:#6F42C1"> className</span><span style="--shiki-dark:#F97583;--shiki-light:#D73A49">=</span><span style="--shiki-dark:#9ECBFF;--shiki-light:#032F62">"text-xs text-muted-foreground"</span><span style="--shiki-dark:#E1E4E8;--shiki-light:#24292E">>default&#x3C;/</span><span style="--shiki-dark:#85E89D;--shiki-light:#22863A">p</span><span style="--shiki-dark:#E1E4E8;--shiki-light:#24292E">></span></span>
<span class="line"><span style="--shiki-dark:#E1E4E8;--shiki-light:#24292E">      &#x3C;</span><span style="--shiki-dark:#79B8FF;--shiki-light:#005CC5">HorizontalRule</span><span style="--shiki-dark:#E1E4E8;--shiki-light:#24292E"> /></span></span>
<span class="line"><span style="--shiki-dark:#E1E4E8;--shiki-light:#24292E">      &#x3C;</span><span style="--shiki-dark:#85E89D;--shiki-light:#22863A">p</span><span style="--shiki-dark:#B392F0;--shiki-light:#6F42C1"> className</span><span style="--shiki-dark:#F97583;--shiki-light:#D73A49">=</span><span style="--shiki-dark:#9ECBFF;--shiki-light:#032F62">"text-xs text-muted-foreground"</span><span style="--shiki-dark:#E1E4E8;--shiki-light:#24292E">>dashed&#x3C;/</span><span style="--shiki-dark:#85E89D;--shiki-light:#22863A">p</span><span style="--shiki-dark:#E1E4E8;--shiki-light:#24292E">></span></span>
<span class="line"><span style="--shiki-dark:#E1E4E8;--shiki-light:#24292E">      &#x3C;</span><span style="--shiki-dark:#79B8FF;--shiki-light:#005CC5">HorizontalRule</span><span style="--shiki-dark:#B392F0;--shiki-light:#6F42C1"> variant</span><span style="--shiki-dark:#F97583;--shiki-light:#D73A49">=</span><span style="--shiki-dark:#9ECBFF;--shiki-light:#032F62">"dashed"</span><span style="--shiki-dark:#E1E4E8;--shiki-light:#24292E"> /></span></span>
<span class="line"><span style="--shiki-dark:#E1E4E8;--shiki-light:#24292E">      &#x3C;</span><span style="--shiki-dark:#85E89D;--shiki-light:#22863A">p</span><span style="--shiki-dark:#B392F0;--shiki-light:#6F42C1"> className</span><span style="--shiki-dark:#F97583;--shiki-light:#D73A49">=</span><span style="--shiki-dark:#9ECBFF;--shiki-light:#032F62">"text-xs text-muted-foreground"</span><span style="--shiki-dark:#E1E4E8;--shiki-light:#24292E">>dotted&#x3C;/</span><span style="--shiki-dark:#85E89D;--shiki-light:#22863A">p</span><span style="--shiki-dark:#E1E4E8;--shiki-light:#24292E">></span></span>
<span class="line"><span style="--shiki-dark:#E1E4E8;--shiki-light:#24292E">      &#x3C;</span><span style="--shiki-dark:#79B8FF;--shiki-light:#005CC5">HorizontalRule</span><span style="--shiki-dark:#B392F0;--shiki-light:#6F42C1"> variant</span><span style="--shiki-dark:#F97583;--shiki-light:#D73A49">=</span><span style="--shiki-dark:#9ECBFF;--shiki-light:#032F62">"dotted"</span><span style="--shiki-dark:#E1E4E8;--shiki-light:#24292E"> /></span></span>
<span class="line"><span style="--shiki-dark:#E1E4E8;--shiki-light:#24292E">      &#x3C;</span><span style="--shiki-dark:#85E89D;--shiki-light:#22863A">p</span><span style="--shiki-dark:#B392F0;--shiki-light:#6F42C1"> className</span><span style="--shiki-dark:#F97583;--shiki-light:#D73A49">=</span><span style="--shiki-dark:#9ECBFF;--shiki-light:#032F62">"text-xs text-muted-foreground"</span><span style="--shiki-dark:#E1E4E8;--shiki-light:#24292E">>gradient&#x3C;/</span><span style="--shiki-dark:#85E89D;--shiki-light:#22863A">p</span><span style="--shiki-dark:#E1E4E8;--shiki-light:#24292E">></span></span>
<span class="line"><span style="--shiki-dark:#E1E4E8;--shiki-light:#24292E">      &#x3C;</span><span style="--shiki-dark:#79B8FF;--shiki-light:#005CC5">HorizontalRule</span><span style="--shiki-dark:#B392F0;--shiki-light:#6F42C1"> variant</span><span style="--shiki-dark:#F97583;--shiki-light:#D73A49">=</span><span style="--shiki-dark:#9ECBFF;--shiki-light:#032F62">"gradient"</span><span style="--shiki-dark:#E1E4E8;--shiki-light:#24292E"> /></span></span>
<span class="line"><span style="--shiki-dark:#E1E4E8;--shiki-light:#24292E">    &#x3C;/</span><span style="--shiki-dark:#85E89D;--shiki-light:#22863A">div</span><span style="--shiki-dark:#E1E4E8;--shiki-light:#24292E">></span></span>
<span class="line"><span style="--shiki-dark:#E1E4E8;--shiki-light:#24292E">  )</span></span>
<span class="line"><span style="--shiki-dark:#E1E4E8;--shiki-light:#24292E">}</span></span>
<span class="line"></span></code></pre>`,
  },
  "inline-code-default": {
    source: `import { Code } from "@/components/mdx/inline-code"

export default function InlineCodeDefault() {
  return (
    <div className="space-y-3 text-sm leading-7">
      <p>
        Import the component: <Code>import {"{"} Badge {"}"} from &quot;@/components/mdx/badge&quot;</Code>
      </p>
      <p>
        Run the CLI: <Code>npx @ravikumarsurya/mdx-ui add accordion</Code>
      </p>
      <p>
        Use the <Code>variant</Code> prop to switch between <Code>&quot;success&quot;</Code>,{" "}
        <Code>&quot;warning&quot;</Code>, and <Code>&quot;destructive&quot;</Code> styles.
      </p>
    </div>
  )
}
`,
    highlighted: `<pre class="shiki shiki-themes github-dark github-light" style="--shiki-dark:#e1e4e8;--shiki-light:#24292e;--shiki-dark-bg:#24292e;--shiki-light-bg:#fff" tabindex="0"><code><span class="line"><span style="--shiki-dark:#F97583;--shiki-light:#D73A49">import</span><span style="--shiki-dark:#E1E4E8;--shiki-light:#24292E"> { Code } </span><span style="--shiki-dark:#F97583;--shiki-light:#D73A49">from</span><span style="--shiki-dark:#9ECBFF;--shiki-light:#032F62"> "@/components/mdx/inline-code"</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-dark:#F97583;--shiki-light:#D73A49">export</span><span style="--shiki-dark:#F97583;--shiki-light:#D73A49"> default</span><span style="--shiki-dark:#F97583;--shiki-light:#D73A49"> function</span><span style="--shiki-dark:#B392F0;--shiki-light:#6F42C1"> InlineCodeDefault</span><span style="--shiki-dark:#E1E4E8;--shiki-light:#24292E">() {</span></span>
<span class="line"><span style="--shiki-dark:#F97583;--shiki-light:#D73A49">  return</span><span style="--shiki-dark:#E1E4E8;--shiki-light:#24292E"> (</span></span>
<span class="line"><span style="--shiki-dark:#E1E4E8;--shiki-light:#24292E">    &#x3C;</span><span style="--shiki-dark:#85E89D;--shiki-light:#22863A">div</span><span style="--shiki-dark:#B392F0;--shiki-light:#6F42C1"> className</span><span style="--shiki-dark:#F97583;--shiki-light:#D73A49">=</span><span style="--shiki-dark:#9ECBFF;--shiki-light:#032F62">"space-y-3 text-sm leading-7"</span><span style="--shiki-dark:#E1E4E8;--shiki-light:#24292E">></span></span>
<span class="line"><span style="--shiki-dark:#E1E4E8;--shiki-light:#24292E">      &#x3C;</span><span style="--shiki-dark:#85E89D;--shiki-light:#22863A">p</span><span style="--shiki-dark:#E1E4E8;--shiki-light:#24292E">></span></span>
<span class="line"><span style="--shiki-dark:#E1E4E8;--shiki-light:#24292E">        Import the component: &#x3C;</span><span style="--shiki-dark:#79B8FF;--shiki-light:#005CC5">Code</span><span style="--shiki-dark:#E1E4E8;--shiki-light:#24292E">>import {</span><span style="--shiki-dark:#9ECBFF;--shiki-light:#032F62">"{"</span><span style="--shiki-dark:#E1E4E8;--shiki-light:#24292E">} Badge {</span><span style="--shiki-dark:#9ECBFF;--shiki-light:#032F62">"}"</span><span style="--shiki-dark:#E1E4E8;--shiki-light:#24292E">} from </span><span style="--shiki-dark:#79B8FF;--shiki-light:#005CC5">&#x26;quot;</span><span style="--shiki-dark:#E1E4E8;--shiki-light:#24292E">@/components/mdx/badge</span><span style="--shiki-dark:#79B8FF;--shiki-light:#005CC5">&#x26;quot;</span><span style="--shiki-dark:#E1E4E8;--shiki-light:#24292E">&#x3C;/</span><span style="--shiki-dark:#79B8FF;--shiki-light:#005CC5">Code</span><span style="--shiki-dark:#E1E4E8;--shiki-light:#24292E">></span></span>
<span class="line"><span style="--shiki-dark:#E1E4E8;--shiki-light:#24292E">      &#x3C;/</span><span style="--shiki-dark:#85E89D;--shiki-light:#22863A">p</span><span style="--shiki-dark:#E1E4E8;--shiki-light:#24292E">></span></span>
<span class="line"><span style="--shiki-dark:#E1E4E8;--shiki-light:#24292E">      &#x3C;</span><span style="--shiki-dark:#85E89D;--shiki-light:#22863A">p</span><span style="--shiki-dark:#E1E4E8;--shiki-light:#24292E">></span></span>
<span class="line"><span style="--shiki-dark:#E1E4E8;--shiki-light:#24292E">        Run the CLI: &#x3C;</span><span style="--shiki-dark:#79B8FF;--shiki-light:#005CC5">Code</span><span style="--shiki-dark:#E1E4E8;--shiki-light:#24292E">>npx @ravikumarsurya/mdx-ui add accordion&#x3C;/</span><span style="--shiki-dark:#79B8FF;--shiki-light:#005CC5">Code</span><span style="--shiki-dark:#E1E4E8;--shiki-light:#24292E">></span></span>
<span class="line"><span style="--shiki-dark:#E1E4E8;--shiki-light:#24292E">      &#x3C;/</span><span style="--shiki-dark:#85E89D;--shiki-light:#22863A">p</span><span style="--shiki-dark:#E1E4E8;--shiki-light:#24292E">></span></span>
<span class="line"><span style="--shiki-dark:#E1E4E8;--shiki-light:#24292E">      &#x3C;</span><span style="--shiki-dark:#85E89D;--shiki-light:#22863A">p</span><span style="--shiki-dark:#E1E4E8;--shiki-light:#24292E">></span></span>
<span class="line"><span style="--shiki-dark:#E1E4E8;--shiki-light:#24292E">        Use the &#x3C;</span><span style="--shiki-dark:#79B8FF;--shiki-light:#005CC5">Code</span><span style="--shiki-dark:#E1E4E8;--shiki-light:#24292E">>variant&#x3C;/</span><span style="--shiki-dark:#79B8FF;--shiki-light:#005CC5">Code</span><span style="--shiki-dark:#E1E4E8;--shiki-light:#24292E">> prop to switch between &#x3C;</span><span style="--shiki-dark:#79B8FF;--shiki-light:#005CC5">Code</span><span style="--shiki-dark:#E1E4E8;--shiki-light:#24292E">></span><span style="--shiki-dark:#79B8FF;--shiki-light:#005CC5">&#x26;quot;</span><span style="--shiki-dark:#E1E4E8;--shiki-light:#24292E">success</span><span style="--shiki-dark:#79B8FF;--shiki-light:#005CC5">&#x26;quot;</span><span style="--shiki-dark:#E1E4E8;--shiki-light:#24292E">&#x3C;/</span><span style="--shiki-dark:#79B8FF;--shiki-light:#005CC5">Code</span><span style="--shiki-dark:#E1E4E8;--shiki-light:#24292E">>,{</span><span style="--shiki-dark:#9ECBFF;--shiki-light:#032F62">" "</span><span style="--shiki-dark:#E1E4E8;--shiki-light:#24292E">}</span></span>
<span class="line"><span style="--shiki-dark:#E1E4E8;--shiki-light:#24292E">        &#x3C;</span><span style="--shiki-dark:#79B8FF;--shiki-light:#005CC5">Code</span><span style="--shiki-dark:#E1E4E8;--shiki-light:#24292E">></span><span style="--shiki-dark:#79B8FF;--shiki-light:#005CC5">&#x26;quot;</span><span style="--shiki-dark:#E1E4E8;--shiki-light:#24292E">warning</span><span style="--shiki-dark:#79B8FF;--shiki-light:#005CC5">&#x26;quot;</span><span style="--shiki-dark:#E1E4E8;--shiki-light:#24292E">&#x3C;/</span><span style="--shiki-dark:#79B8FF;--shiki-light:#005CC5">Code</span><span style="--shiki-dark:#E1E4E8;--shiki-light:#24292E">>, and &#x3C;</span><span style="--shiki-dark:#79B8FF;--shiki-light:#005CC5">Code</span><span style="--shiki-dark:#E1E4E8;--shiki-light:#24292E">></span><span style="--shiki-dark:#79B8FF;--shiki-light:#005CC5">&#x26;quot;</span><span style="--shiki-dark:#E1E4E8;--shiki-light:#24292E">destructive</span><span style="--shiki-dark:#79B8FF;--shiki-light:#005CC5">&#x26;quot;</span><span style="--shiki-dark:#E1E4E8;--shiki-light:#24292E">&#x3C;/</span><span style="--shiki-dark:#79B8FF;--shiki-light:#005CC5">Code</span><span style="--shiki-dark:#E1E4E8;--shiki-light:#24292E">> styles.</span></span>
<span class="line"><span style="--shiki-dark:#E1E4E8;--shiki-light:#24292E">      &#x3C;/</span><span style="--shiki-dark:#85E89D;--shiki-light:#22863A">p</span><span style="--shiki-dark:#E1E4E8;--shiki-light:#24292E">></span></span>
<span class="line"><span style="--shiki-dark:#E1E4E8;--shiki-light:#24292E">    &#x3C;/</span><span style="--shiki-dark:#85E89D;--shiki-light:#22863A">div</span><span style="--shiki-dark:#E1E4E8;--shiki-light:#24292E">></span></span>
<span class="line"><span style="--shiki-dark:#E1E4E8;--shiki-light:#24292E">  )</span></span>
<span class="line"><span style="--shiki-dark:#E1E4E8;--shiki-light:#24292E">}</span></span>
<span class="line"></span></code></pre>`,
  },
  "invariant-default": {
    source: `import { Invariant } from "@/components/mdx/invariant"

export default function InvariantDefault() {
  return (
    <div className="w-full space-y-4">
      <Invariant complexity="O(log n)">
        An AVL tree remains height-balanced after every insertion and deletion — the height difference between left and right subtrees is at most 1.
      </Invariant>
      <Invariant>
        A max-heap always satisfies the heap property: every parent node is greater than or equal to its children.
      </Invariant>
    </div>
  )
}
`,
    highlighted: `<pre class="shiki shiki-themes github-dark github-light" style="--shiki-dark:#e1e4e8;--shiki-light:#24292e;--shiki-dark-bg:#24292e;--shiki-light-bg:#fff" tabindex="0"><code><span class="line"><span style="--shiki-dark:#F97583;--shiki-light:#D73A49">import</span><span style="--shiki-dark:#E1E4E8;--shiki-light:#24292E"> { Invariant } </span><span style="--shiki-dark:#F97583;--shiki-light:#D73A49">from</span><span style="--shiki-dark:#9ECBFF;--shiki-light:#032F62"> "@/components/mdx/invariant"</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-dark:#F97583;--shiki-light:#D73A49">export</span><span style="--shiki-dark:#F97583;--shiki-light:#D73A49"> default</span><span style="--shiki-dark:#F97583;--shiki-light:#D73A49"> function</span><span style="--shiki-dark:#B392F0;--shiki-light:#6F42C1"> InvariantDefault</span><span style="--shiki-dark:#E1E4E8;--shiki-light:#24292E">() {</span></span>
<span class="line"><span style="--shiki-dark:#F97583;--shiki-light:#D73A49">  return</span><span style="--shiki-dark:#E1E4E8;--shiki-light:#24292E"> (</span></span>
<span class="line"><span style="--shiki-dark:#E1E4E8;--shiki-light:#24292E">    &#x3C;</span><span style="--shiki-dark:#85E89D;--shiki-light:#22863A">div</span><span style="--shiki-dark:#B392F0;--shiki-light:#6F42C1"> className</span><span style="--shiki-dark:#F97583;--shiki-light:#D73A49">=</span><span style="--shiki-dark:#9ECBFF;--shiki-light:#032F62">"w-full space-y-4"</span><span style="--shiki-dark:#E1E4E8;--shiki-light:#24292E">></span></span>
<span class="line"><span style="--shiki-dark:#E1E4E8;--shiki-light:#24292E">      &#x3C;</span><span style="--shiki-dark:#79B8FF;--shiki-light:#005CC5">Invariant</span><span style="--shiki-dark:#B392F0;--shiki-light:#6F42C1"> complexity</span><span style="--shiki-dark:#F97583;--shiki-light:#D73A49">=</span><span style="--shiki-dark:#9ECBFF;--shiki-light:#032F62">"O(log n)"</span><span style="--shiki-dark:#E1E4E8;--shiki-light:#24292E">></span></span>
<span class="line"><span style="--shiki-dark:#E1E4E8;--shiki-light:#24292E">        An AVL tree remains height-balanced after every insertion and deletion — the height difference between left and right subtrees is at most 1.</span></span>
<span class="line"><span style="--shiki-dark:#E1E4E8;--shiki-light:#24292E">      &#x3C;/</span><span style="--shiki-dark:#79B8FF;--shiki-light:#005CC5">Invariant</span><span style="--shiki-dark:#E1E4E8;--shiki-light:#24292E">></span></span>
<span class="line"><span style="--shiki-dark:#E1E4E8;--shiki-light:#24292E">      &#x3C;</span><span style="--shiki-dark:#79B8FF;--shiki-light:#005CC5">Invariant</span><span style="--shiki-dark:#E1E4E8;--shiki-light:#24292E">></span></span>
<span class="line"><span style="--shiki-dark:#E1E4E8;--shiki-light:#24292E">        A max-heap always satisfies the heap property: every parent node is greater than or equal to its children.</span></span>
<span class="line"><span style="--shiki-dark:#E1E4E8;--shiki-light:#24292E">      &#x3C;/</span><span style="--shiki-dark:#79B8FF;--shiki-light:#005CC5">Invariant</span><span style="--shiki-dark:#E1E4E8;--shiki-light:#24292E">></span></span>
<span class="line"><span style="--shiki-dark:#E1E4E8;--shiki-light:#24292E">    &#x3C;/</span><span style="--shiki-dark:#85E89D;--shiki-light:#22863A">div</span><span style="--shiki-dark:#E1E4E8;--shiki-light:#24292E">></span></span>
<span class="line"><span style="--shiki-dark:#E1E4E8;--shiki-light:#24292E">  )</span></span>
<span class="line"><span style="--shiki-dark:#E1E4E8;--shiki-light:#24292E">}</span></span>
<span class="line"></span></code></pre>`,
  },
  "kbd-default": {
    source: `import { Kbd } from "@/components/mdx/kbd"

export default function KbdDefault() {
  return (
    <div className="space-y-3 text-sm">
      <p>
        Save file: <Kbd>Ctrl</Kbd> + <Kbd>S</Kbd>
      </p>
      <p>
        Copy: <Kbd>⌘</Kbd> + <Kbd>C</Kbd> &nbsp; Paste: <Kbd>⌘</Kbd> + <Kbd>V</Kbd>
      </p>
      <p>
        Open command palette: <Kbd>⌘</Kbd> + <Kbd>Shift</Kbd> + <Kbd>P</Kbd>
      </p>
    </div>
  )
}
`,
    highlighted: `<pre class="shiki shiki-themes github-dark github-light" style="--shiki-dark:#e1e4e8;--shiki-light:#24292e;--shiki-dark-bg:#24292e;--shiki-light-bg:#fff" tabindex="0"><code><span class="line"><span style="--shiki-dark:#F97583;--shiki-light:#D73A49">import</span><span style="--shiki-dark:#E1E4E8;--shiki-light:#24292E"> { Kbd } </span><span style="--shiki-dark:#F97583;--shiki-light:#D73A49">from</span><span style="--shiki-dark:#9ECBFF;--shiki-light:#032F62"> "@/components/mdx/kbd"</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-dark:#F97583;--shiki-light:#D73A49">export</span><span style="--shiki-dark:#F97583;--shiki-light:#D73A49"> default</span><span style="--shiki-dark:#F97583;--shiki-light:#D73A49"> function</span><span style="--shiki-dark:#B392F0;--shiki-light:#6F42C1"> KbdDefault</span><span style="--shiki-dark:#E1E4E8;--shiki-light:#24292E">() {</span></span>
<span class="line"><span style="--shiki-dark:#F97583;--shiki-light:#D73A49">  return</span><span style="--shiki-dark:#E1E4E8;--shiki-light:#24292E"> (</span></span>
<span class="line"><span style="--shiki-dark:#E1E4E8;--shiki-light:#24292E">    &#x3C;</span><span style="--shiki-dark:#85E89D;--shiki-light:#22863A">div</span><span style="--shiki-dark:#B392F0;--shiki-light:#6F42C1"> className</span><span style="--shiki-dark:#F97583;--shiki-light:#D73A49">=</span><span style="--shiki-dark:#9ECBFF;--shiki-light:#032F62">"space-y-3 text-sm"</span><span style="--shiki-dark:#E1E4E8;--shiki-light:#24292E">></span></span>
<span class="line"><span style="--shiki-dark:#E1E4E8;--shiki-light:#24292E">      &#x3C;</span><span style="--shiki-dark:#85E89D;--shiki-light:#22863A">p</span><span style="--shiki-dark:#E1E4E8;--shiki-light:#24292E">></span></span>
<span class="line"><span style="--shiki-dark:#E1E4E8;--shiki-light:#24292E">        Save file: &#x3C;</span><span style="--shiki-dark:#79B8FF;--shiki-light:#005CC5">Kbd</span><span style="--shiki-dark:#E1E4E8;--shiki-light:#24292E">>Ctrl&#x3C;/</span><span style="--shiki-dark:#79B8FF;--shiki-light:#005CC5">Kbd</span><span style="--shiki-dark:#E1E4E8;--shiki-light:#24292E">> + &#x3C;</span><span style="--shiki-dark:#79B8FF;--shiki-light:#005CC5">Kbd</span><span style="--shiki-dark:#E1E4E8;--shiki-light:#24292E">>S&#x3C;/</span><span style="--shiki-dark:#79B8FF;--shiki-light:#005CC5">Kbd</span><span style="--shiki-dark:#E1E4E8;--shiki-light:#24292E">></span></span>
<span class="line"><span style="--shiki-dark:#E1E4E8;--shiki-light:#24292E">      &#x3C;/</span><span style="--shiki-dark:#85E89D;--shiki-light:#22863A">p</span><span style="--shiki-dark:#E1E4E8;--shiki-light:#24292E">></span></span>
<span class="line"><span style="--shiki-dark:#E1E4E8;--shiki-light:#24292E">      &#x3C;</span><span style="--shiki-dark:#85E89D;--shiki-light:#22863A">p</span><span style="--shiki-dark:#E1E4E8;--shiki-light:#24292E">></span></span>
<span class="line"><span style="--shiki-dark:#E1E4E8;--shiki-light:#24292E">        Copy: &#x3C;</span><span style="--shiki-dark:#79B8FF;--shiki-light:#005CC5">Kbd</span><span style="--shiki-dark:#E1E4E8;--shiki-light:#24292E">>⌘&#x3C;/</span><span style="--shiki-dark:#79B8FF;--shiki-light:#005CC5">Kbd</span><span style="--shiki-dark:#E1E4E8;--shiki-light:#24292E">> + &#x3C;</span><span style="--shiki-dark:#79B8FF;--shiki-light:#005CC5">Kbd</span><span style="--shiki-dark:#E1E4E8;--shiki-light:#24292E">>C&#x3C;/</span><span style="--shiki-dark:#79B8FF;--shiki-light:#005CC5">Kbd</span><span style="--shiki-dark:#E1E4E8;--shiki-light:#24292E">> </span><span style="--shiki-dark:#79B8FF;--shiki-light:#005CC5">&#x26;nbsp;</span><span style="--shiki-dark:#E1E4E8;--shiki-light:#24292E"> Paste: &#x3C;</span><span style="--shiki-dark:#79B8FF;--shiki-light:#005CC5">Kbd</span><span style="--shiki-dark:#E1E4E8;--shiki-light:#24292E">>⌘&#x3C;/</span><span style="--shiki-dark:#79B8FF;--shiki-light:#005CC5">Kbd</span><span style="--shiki-dark:#E1E4E8;--shiki-light:#24292E">> + &#x3C;</span><span style="--shiki-dark:#79B8FF;--shiki-light:#005CC5">Kbd</span><span style="--shiki-dark:#E1E4E8;--shiki-light:#24292E">>V&#x3C;/</span><span style="--shiki-dark:#79B8FF;--shiki-light:#005CC5">Kbd</span><span style="--shiki-dark:#E1E4E8;--shiki-light:#24292E">></span></span>
<span class="line"><span style="--shiki-dark:#E1E4E8;--shiki-light:#24292E">      &#x3C;/</span><span style="--shiki-dark:#85E89D;--shiki-light:#22863A">p</span><span style="--shiki-dark:#E1E4E8;--shiki-light:#24292E">></span></span>
<span class="line"><span style="--shiki-dark:#E1E4E8;--shiki-light:#24292E">      &#x3C;</span><span style="--shiki-dark:#85E89D;--shiki-light:#22863A">p</span><span style="--shiki-dark:#E1E4E8;--shiki-light:#24292E">></span></span>
<span class="line"><span style="--shiki-dark:#E1E4E8;--shiki-light:#24292E">        Open command palette: &#x3C;</span><span style="--shiki-dark:#79B8FF;--shiki-light:#005CC5">Kbd</span><span style="--shiki-dark:#E1E4E8;--shiki-light:#24292E">>⌘&#x3C;/</span><span style="--shiki-dark:#79B8FF;--shiki-light:#005CC5">Kbd</span><span style="--shiki-dark:#E1E4E8;--shiki-light:#24292E">> + &#x3C;</span><span style="--shiki-dark:#79B8FF;--shiki-light:#005CC5">Kbd</span><span style="--shiki-dark:#E1E4E8;--shiki-light:#24292E">>Shift&#x3C;/</span><span style="--shiki-dark:#79B8FF;--shiki-light:#005CC5">Kbd</span><span style="--shiki-dark:#E1E4E8;--shiki-light:#24292E">> + &#x3C;</span><span style="--shiki-dark:#79B8FF;--shiki-light:#005CC5">Kbd</span><span style="--shiki-dark:#E1E4E8;--shiki-light:#24292E">>P&#x3C;/</span><span style="--shiki-dark:#79B8FF;--shiki-light:#005CC5">Kbd</span><span style="--shiki-dark:#E1E4E8;--shiki-light:#24292E">></span></span>
<span class="line"><span style="--shiki-dark:#E1E4E8;--shiki-light:#24292E">      &#x3C;/</span><span style="--shiki-dark:#85E89D;--shiki-light:#22863A">p</span><span style="--shiki-dark:#E1E4E8;--shiki-light:#24292E">></span></span>
<span class="line"><span style="--shiki-dark:#E1E4E8;--shiki-light:#24292E">    &#x3C;/</span><span style="--shiki-dark:#85E89D;--shiki-light:#22863A">div</span><span style="--shiki-dark:#E1E4E8;--shiki-light:#24292E">></span></span>
<span class="line"><span style="--shiki-dark:#E1E4E8;--shiki-light:#24292E">  )</span></span>
<span class="line"><span style="--shiki-dark:#E1E4E8;--shiki-light:#24292E">}</span></span>
<span class="line"></span></code></pre>`,
  },
  "link-default": {
    source: `import { Link } from "@/components/mdx/link"

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
`,
    highlighted: `<pre class="shiki shiki-themes github-dark github-light" style="--shiki-dark:#e1e4e8;--shiki-light:#24292e;--shiki-dark-bg:#24292e;--shiki-light-bg:#fff" tabindex="0"><code><span class="line"><span style="--shiki-dark:#F97583;--shiki-light:#D73A49">import</span><span style="--shiki-dark:#E1E4E8;--shiki-light:#24292E"> { Link } </span><span style="--shiki-dark:#F97583;--shiki-light:#D73A49">from</span><span style="--shiki-dark:#9ECBFF;--shiki-light:#032F62"> "@/components/mdx/link"</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-dark:#F97583;--shiki-light:#D73A49">export</span><span style="--shiki-dark:#F97583;--shiki-light:#D73A49"> default</span><span style="--shiki-dark:#F97583;--shiki-light:#D73A49"> function</span><span style="--shiki-dark:#B392F0;--shiki-light:#6F42C1"> LinkDefault</span><span style="--shiki-dark:#E1E4E8;--shiki-light:#24292E">() {</span></span>
<span class="line"><span style="--shiki-dark:#F97583;--shiki-light:#D73A49">  return</span><span style="--shiki-dark:#E1E4E8;--shiki-light:#24292E"> (</span></span>
<span class="line"><span style="--shiki-dark:#E1E4E8;--shiki-light:#24292E">    &#x3C;</span><span style="--shiki-dark:#85E89D;--shiki-light:#22863A">div</span><span style="--shiki-dark:#B392F0;--shiki-light:#6F42C1"> className</span><span style="--shiki-dark:#F97583;--shiki-light:#D73A49">=</span><span style="--shiki-dark:#9ECBFF;--shiki-light:#032F62">"space-y-3 text-sm leading-7"</span><span style="--shiki-dark:#E1E4E8;--shiki-light:#24292E">></span></span>
<span class="line"><span style="--shiki-dark:#E1E4E8;--shiki-light:#24292E">      &#x3C;</span><span style="--shiki-dark:#85E89D;--shiki-light:#22863A">p</span><span style="--shiki-dark:#E1E4E8;--shiki-light:#24292E">></span></span>
<span class="line"><span style="--shiki-dark:#E1E4E8;--shiki-light:#24292E">        Read the{</span><span style="--shiki-dark:#9ECBFF;--shiki-light:#032F62">" "</span><span style="--shiki-dark:#E1E4E8;--shiki-light:#24292E">}</span></span>
<span class="line"><span style="--shiki-dark:#E1E4E8;--shiki-light:#24292E">        &#x3C;</span><span style="--shiki-dark:#79B8FF;--shiki-light:#005CC5">Link</span><span style="--shiki-dark:#B392F0;--shiki-light:#6F42C1"> href</span><span style="--shiki-dark:#F97583;--shiki-light:#D73A49">=</span><span style="--shiki-dark:#9ECBFF;--shiki-light:#032F62">"/docs/getting-started"</span><span style="--shiki-dark:#E1E4E8;--shiki-light:#24292E">>getting started guide&#x3C;/</span><span style="--shiki-dark:#79B8FF;--shiki-light:#005CC5">Link</span><span style="--shiki-dark:#E1E4E8;--shiki-light:#24292E">>{</span><span style="--shiki-dark:#9ECBFF;--shiki-light:#032F62">" "</span><span style="--shiki-dark:#E1E4E8;--shiki-light:#24292E">}</span></span>
<span class="line"><span style="--shiki-dark:#E1E4E8;--shiki-light:#24292E">        before installing components.</span></span>
<span class="line"><span style="--shiki-dark:#E1E4E8;--shiki-light:#24292E">      &#x3C;/</span><span style="--shiki-dark:#85E89D;--shiki-light:#22863A">p</span><span style="--shiki-dark:#E1E4E8;--shiki-light:#24292E">></span></span>
<span class="line"><span style="--shiki-dark:#E1E4E8;--shiki-light:#24292E">      &#x3C;</span><span style="--shiki-dark:#85E89D;--shiki-light:#22863A">p</span><span style="--shiki-dark:#E1E4E8;--shiki-light:#24292E">></span></span>
<span class="line"><span style="--shiki-dark:#E1E4E8;--shiki-light:#24292E">        Source code is available on{</span><span style="--shiki-dark:#9ECBFF;--shiki-light:#032F62">" "</span><span style="--shiki-dark:#E1E4E8;--shiki-light:#24292E">}</span></span>
<span class="line"><span style="--shiki-dark:#E1E4E8;--shiki-light:#24292E">        &#x3C;</span><span style="--shiki-dark:#79B8FF;--shiki-light:#005CC5">Link</span><span style="--shiki-dark:#B392F0;--shiki-light:#6F42C1"> href</span><span style="--shiki-dark:#F97583;--shiki-light:#D73A49">=</span><span style="--shiki-dark:#9ECBFF;--shiki-light:#032F62">"https://github.com/suryaravikumar-space/mdx-ui"</span><span style="--shiki-dark:#E1E4E8;--shiki-light:#24292E">></span></span>
<span class="line"><span style="--shiki-dark:#E1E4E8;--shiki-light:#24292E">          GitHub</span></span>
<span class="line"><span style="--shiki-dark:#E1E4E8;--shiki-light:#24292E">        &#x3C;/</span><span style="--shiki-dark:#79B8FF;--shiki-light:#005CC5">Link</span><span style="--shiki-dark:#E1E4E8;--shiki-light:#24292E">></span></span>
<span class="line"><span style="--shiki-dark:#E1E4E8;--shiki-light:#24292E">        .</span></span>
<span class="line"><span style="--shiki-dark:#E1E4E8;--shiki-light:#24292E">      &#x3C;/</span><span style="--shiki-dark:#85E89D;--shiki-light:#22863A">p</span><span style="--shiki-dark:#E1E4E8;--shiki-light:#24292E">></span></span>
<span class="line"><span style="--shiki-dark:#E1E4E8;--shiki-light:#24292E">    &#x3C;/</span><span style="--shiki-dark:#85E89D;--shiki-light:#22863A">div</span><span style="--shiki-dark:#E1E4E8;--shiki-light:#24292E">></span></span>
<span class="line"><span style="--shiki-dark:#E1E4E8;--shiki-light:#24292E">  )</span></span>
<span class="line"><span style="--shiki-dark:#E1E4E8;--shiki-light:#24292E">}</span></span>
<span class="line"></span></code></pre>`,
  },
  "list-default": {
    source: `import { UnorderedList, OrderedList, ListItem } from "@/components/mdx/list"

export default function ListDefault() {
  return (
    <div className="w-full space-y-4">
      <UnorderedList>
        <ListItem>Install the CLI with <code>npx @ravikumarsurya/mdx-ui init</code></ListItem>
        <ListItem>Add components with <code>npx @ravikumarsurya/mdx-ui add accordion</code></ListItem>
        <ListItem>Import and use in your MDX files</ListItem>
      </UnorderedList>
      <OrderedList>
        <ListItem>Clone the repository</ListItem>
        <ListItem>Install dependencies with <code>pnpm install</code></ListItem>
        <ListItem>Start the dev server with <code>pnpm dev</code></ListItem>
      </OrderedList>
    </div>
  )
}
`,
    highlighted: `<pre class="shiki shiki-themes github-dark github-light" style="--shiki-dark:#e1e4e8;--shiki-light:#24292e;--shiki-dark-bg:#24292e;--shiki-light-bg:#fff" tabindex="0"><code><span class="line"><span style="--shiki-dark:#F97583;--shiki-light:#D73A49">import</span><span style="--shiki-dark:#E1E4E8;--shiki-light:#24292E"> { UnorderedList, OrderedList, ListItem } </span><span style="--shiki-dark:#F97583;--shiki-light:#D73A49">from</span><span style="--shiki-dark:#9ECBFF;--shiki-light:#032F62"> "@/components/mdx/list"</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-dark:#F97583;--shiki-light:#D73A49">export</span><span style="--shiki-dark:#F97583;--shiki-light:#D73A49"> default</span><span style="--shiki-dark:#F97583;--shiki-light:#D73A49"> function</span><span style="--shiki-dark:#B392F0;--shiki-light:#6F42C1"> ListDefault</span><span style="--shiki-dark:#E1E4E8;--shiki-light:#24292E">() {</span></span>
<span class="line"><span style="--shiki-dark:#F97583;--shiki-light:#D73A49">  return</span><span style="--shiki-dark:#E1E4E8;--shiki-light:#24292E"> (</span></span>
<span class="line"><span style="--shiki-dark:#E1E4E8;--shiki-light:#24292E">    &#x3C;</span><span style="--shiki-dark:#85E89D;--shiki-light:#22863A">div</span><span style="--shiki-dark:#B392F0;--shiki-light:#6F42C1"> className</span><span style="--shiki-dark:#F97583;--shiki-light:#D73A49">=</span><span style="--shiki-dark:#9ECBFF;--shiki-light:#032F62">"w-full space-y-4"</span><span style="--shiki-dark:#E1E4E8;--shiki-light:#24292E">></span></span>
<span class="line"><span style="--shiki-dark:#E1E4E8;--shiki-light:#24292E">      &#x3C;</span><span style="--shiki-dark:#79B8FF;--shiki-light:#005CC5">UnorderedList</span><span style="--shiki-dark:#E1E4E8;--shiki-light:#24292E">></span></span>
<span class="line"><span style="--shiki-dark:#E1E4E8;--shiki-light:#24292E">        &#x3C;</span><span style="--shiki-dark:#79B8FF;--shiki-light:#005CC5">ListItem</span><span style="--shiki-dark:#E1E4E8;--shiki-light:#24292E">>Install the CLI with &#x3C;</span><span style="--shiki-dark:#85E89D;--shiki-light:#22863A">code</span><span style="--shiki-dark:#E1E4E8;--shiki-light:#24292E">>npx @ravikumarsurya/mdx-ui init&#x3C;/</span><span style="--shiki-dark:#85E89D;--shiki-light:#22863A">code</span><span style="--shiki-dark:#E1E4E8;--shiki-light:#24292E">>&#x3C;/</span><span style="--shiki-dark:#79B8FF;--shiki-light:#005CC5">ListItem</span><span style="--shiki-dark:#E1E4E8;--shiki-light:#24292E">></span></span>
<span class="line"><span style="--shiki-dark:#E1E4E8;--shiki-light:#24292E">        &#x3C;</span><span style="--shiki-dark:#79B8FF;--shiki-light:#005CC5">ListItem</span><span style="--shiki-dark:#E1E4E8;--shiki-light:#24292E">>Add components with &#x3C;</span><span style="--shiki-dark:#85E89D;--shiki-light:#22863A">code</span><span style="--shiki-dark:#E1E4E8;--shiki-light:#24292E">>npx @ravikumarsurya/mdx-ui add accordion&#x3C;/</span><span style="--shiki-dark:#85E89D;--shiki-light:#22863A">code</span><span style="--shiki-dark:#E1E4E8;--shiki-light:#24292E">>&#x3C;/</span><span style="--shiki-dark:#79B8FF;--shiki-light:#005CC5">ListItem</span><span style="--shiki-dark:#E1E4E8;--shiki-light:#24292E">></span></span>
<span class="line"><span style="--shiki-dark:#E1E4E8;--shiki-light:#24292E">        &#x3C;</span><span style="--shiki-dark:#79B8FF;--shiki-light:#005CC5">ListItem</span><span style="--shiki-dark:#E1E4E8;--shiki-light:#24292E">>Import and use in your MDX files&#x3C;/</span><span style="--shiki-dark:#79B8FF;--shiki-light:#005CC5">ListItem</span><span style="--shiki-dark:#E1E4E8;--shiki-light:#24292E">></span></span>
<span class="line"><span style="--shiki-dark:#E1E4E8;--shiki-light:#24292E">      &#x3C;/</span><span style="--shiki-dark:#79B8FF;--shiki-light:#005CC5">UnorderedList</span><span style="--shiki-dark:#E1E4E8;--shiki-light:#24292E">></span></span>
<span class="line"><span style="--shiki-dark:#E1E4E8;--shiki-light:#24292E">      &#x3C;</span><span style="--shiki-dark:#79B8FF;--shiki-light:#005CC5">OrderedList</span><span style="--shiki-dark:#E1E4E8;--shiki-light:#24292E">></span></span>
<span class="line"><span style="--shiki-dark:#E1E4E8;--shiki-light:#24292E">        &#x3C;</span><span style="--shiki-dark:#79B8FF;--shiki-light:#005CC5">ListItem</span><span style="--shiki-dark:#E1E4E8;--shiki-light:#24292E">>Clone the repository&#x3C;/</span><span style="--shiki-dark:#79B8FF;--shiki-light:#005CC5">ListItem</span><span style="--shiki-dark:#E1E4E8;--shiki-light:#24292E">></span></span>
<span class="line"><span style="--shiki-dark:#E1E4E8;--shiki-light:#24292E">        &#x3C;</span><span style="--shiki-dark:#79B8FF;--shiki-light:#005CC5">ListItem</span><span style="--shiki-dark:#E1E4E8;--shiki-light:#24292E">>Install dependencies with &#x3C;</span><span style="--shiki-dark:#85E89D;--shiki-light:#22863A">code</span><span style="--shiki-dark:#E1E4E8;--shiki-light:#24292E">>pnpm install&#x3C;/</span><span style="--shiki-dark:#85E89D;--shiki-light:#22863A">code</span><span style="--shiki-dark:#E1E4E8;--shiki-light:#24292E">>&#x3C;/</span><span style="--shiki-dark:#79B8FF;--shiki-light:#005CC5">ListItem</span><span style="--shiki-dark:#E1E4E8;--shiki-light:#24292E">></span></span>
<span class="line"><span style="--shiki-dark:#E1E4E8;--shiki-light:#24292E">        &#x3C;</span><span style="--shiki-dark:#79B8FF;--shiki-light:#005CC5">ListItem</span><span style="--shiki-dark:#E1E4E8;--shiki-light:#24292E">>Start the dev server with &#x3C;</span><span style="--shiki-dark:#85E89D;--shiki-light:#22863A">code</span><span style="--shiki-dark:#E1E4E8;--shiki-light:#24292E">>pnpm dev&#x3C;/</span><span style="--shiki-dark:#85E89D;--shiki-light:#22863A">code</span><span style="--shiki-dark:#E1E4E8;--shiki-light:#24292E">>&#x3C;/</span><span style="--shiki-dark:#79B8FF;--shiki-light:#005CC5">ListItem</span><span style="--shiki-dark:#E1E4E8;--shiki-light:#24292E">></span></span>
<span class="line"><span style="--shiki-dark:#E1E4E8;--shiki-light:#24292E">      &#x3C;/</span><span style="--shiki-dark:#79B8FF;--shiki-light:#005CC5">OrderedList</span><span style="--shiki-dark:#E1E4E8;--shiki-light:#24292E">></span></span>
<span class="line"><span style="--shiki-dark:#E1E4E8;--shiki-light:#24292E">    &#x3C;/</span><span style="--shiki-dark:#85E89D;--shiki-light:#22863A">div</span><span style="--shiki-dark:#E1E4E8;--shiki-light:#24292E">></span></span>
<span class="line"><span style="--shiki-dark:#E1E4E8;--shiki-light:#24292E">  )</span></span>
<span class="line"><span style="--shiki-dark:#E1E4E8;--shiki-light:#24292E">}</span></span>
<span class="line"></span></code></pre>`,
  },
  "paragraph-default": {
    source: `import { Lead, Intro, Large, Small, Muted, Paragraph } from "@/components/mdx/paragraph"

export default function ParagraphDefault() {
  return (
    <div className="w-full space-y-4">
      <Lead>Lead — large introductory text used below a page title.</Lead>
      <Intro>Intro — slightly smaller lead, ideal for section introductions.</Intro>
      <Paragraph>Default — body copy at base size with comfortable line height.</Paragraph>
      <Large>Large — semibold text for emphasis without a heading.</Large>
      <Small>Small — compact label or metadata text.</Small>
      <Muted>Muted — de-emphasised helper text or captions.</Muted>
    </div>
  )
}
`,
    highlighted: `<pre class="shiki shiki-themes github-dark github-light" style="--shiki-dark:#e1e4e8;--shiki-light:#24292e;--shiki-dark-bg:#24292e;--shiki-light-bg:#fff" tabindex="0"><code><span class="line"><span style="--shiki-dark:#F97583;--shiki-light:#D73A49">import</span><span style="--shiki-dark:#E1E4E8;--shiki-light:#24292E"> { Lead, Intro, Large, Small, Muted, Paragraph } </span><span style="--shiki-dark:#F97583;--shiki-light:#D73A49">from</span><span style="--shiki-dark:#9ECBFF;--shiki-light:#032F62"> "@/components/mdx/paragraph"</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-dark:#F97583;--shiki-light:#D73A49">export</span><span style="--shiki-dark:#F97583;--shiki-light:#D73A49"> default</span><span style="--shiki-dark:#F97583;--shiki-light:#D73A49"> function</span><span style="--shiki-dark:#B392F0;--shiki-light:#6F42C1"> ParagraphDefault</span><span style="--shiki-dark:#E1E4E8;--shiki-light:#24292E">() {</span></span>
<span class="line"><span style="--shiki-dark:#F97583;--shiki-light:#D73A49">  return</span><span style="--shiki-dark:#E1E4E8;--shiki-light:#24292E"> (</span></span>
<span class="line"><span style="--shiki-dark:#E1E4E8;--shiki-light:#24292E">    &#x3C;</span><span style="--shiki-dark:#85E89D;--shiki-light:#22863A">div</span><span style="--shiki-dark:#B392F0;--shiki-light:#6F42C1"> className</span><span style="--shiki-dark:#F97583;--shiki-light:#D73A49">=</span><span style="--shiki-dark:#9ECBFF;--shiki-light:#032F62">"w-full space-y-4"</span><span style="--shiki-dark:#E1E4E8;--shiki-light:#24292E">></span></span>
<span class="line"><span style="--shiki-dark:#E1E4E8;--shiki-light:#24292E">      &#x3C;</span><span style="--shiki-dark:#79B8FF;--shiki-light:#005CC5">Lead</span><span style="--shiki-dark:#E1E4E8;--shiki-light:#24292E">>Lead — large introductory text used below a page title.&#x3C;/</span><span style="--shiki-dark:#79B8FF;--shiki-light:#005CC5">Lead</span><span style="--shiki-dark:#E1E4E8;--shiki-light:#24292E">></span></span>
<span class="line"><span style="--shiki-dark:#E1E4E8;--shiki-light:#24292E">      &#x3C;</span><span style="--shiki-dark:#79B8FF;--shiki-light:#005CC5">Intro</span><span style="--shiki-dark:#E1E4E8;--shiki-light:#24292E">>Intro — slightly smaller lead, ideal for section introductions.&#x3C;/</span><span style="--shiki-dark:#79B8FF;--shiki-light:#005CC5">Intro</span><span style="--shiki-dark:#E1E4E8;--shiki-light:#24292E">></span></span>
<span class="line"><span style="--shiki-dark:#E1E4E8;--shiki-light:#24292E">      &#x3C;</span><span style="--shiki-dark:#79B8FF;--shiki-light:#005CC5">Paragraph</span><span style="--shiki-dark:#E1E4E8;--shiki-light:#24292E">>Default — body copy at base size with comfortable line height.&#x3C;/</span><span style="--shiki-dark:#79B8FF;--shiki-light:#005CC5">Paragraph</span><span style="--shiki-dark:#E1E4E8;--shiki-light:#24292E">></span></span>
<span class="line"><span style="--shiki-dark:#E1E4E8;--shiki-light:#24292E">      &#x3C;</span><span style="--shiki-dark:#79B8FF;--shiki-light:#005CC5">Large</span><span style="--shiki-dark:#E1E4E8;--shiki-light:#24292E">>Large — semibold text for emphasis without a heading.&#x3C;/</span><span style="--shiki-dark:#79B8FF;--shiki-light:#005CC5">Large</span><span style="--shiki-dark:#E1E4E8;--shiki-light:#24292E">></span></span>
<span class="line"><span style="--shiki-dark:#E1E4E8;--shiki-light:#24292E">      &#x3C;</span><span style="--shiki-dark:#79B8FF;--shiki-light:#005CC5">Small</span><span style="--shiki-dark:#E1E4E8;--shiki-light:#24292E">>Small — compact label or metadata text.&#x3C;/</span><span style="--shiki-dark:#79B8FF;--shiki-light:#005CC5">Small</span><span style="--shiki-dark:#E1E4E8;--shiki-light:#24292E">></span></span>
<span class="line"><span style="--shiki-dark:#E1E4E8;--shiki-light:#24292E">      &#x3C;</span><span style="--shiki-dark:#79B8FF;--shiki-light:#005CC5">Muted</span><span style="--shiki-dark:#E1E4E8;--shiki-light:#24292E">>Muted — de-emphasised helper text or captions.&#x3C;/</span><span style="--shiki-dark:#79B8FF;--shiki-light:#005CC5">Muted</span><span style="--shiki-dark:#E1E4E8;--shiki-light:#24292E">></span></span>
<span class="line"><span style="--shiki-dark:#E1E4E8;--shiki-light:#24292E">    &#x3C;/</span><span style="--shiki-dark:#85E89D;--shiki-light:#22863A">div</span><span style="--shiki-dark:#E1E4E8;--shiki-light:#24292E">></span></span>
<span class="line"><span style="--shiki-dark:#E1E4E8;--shiki-light:#24292E">  )</span></span>
<span class="line"><span style="--shiki-dark:#E1E4E8;--shiki-light:#24292E">}</span></span>
<span class="line"></span></code></pre>`,
  },
  "preview-default": {
    source: `import { Preview } from "@/components/mdx/preview"
import { Badge } from "@/components/mdx/badge"

export default function PreviewDefault() {
  return (
    <Preview lang="tsx" code={\`<Badge variant="success">Stable</Badge>\`}>
      <Badge variant="success">Stable</Badge>
    </Preview>
  )
}
`,
    highlighted: `<pre class="shiki shiki-themes github-dark github-light" style="--shiki-dark:#e1e4e8;--shiki-light:#24292e;--shiki-dark-bg:#24292e;--shiki-light-bg:#fff" tabindex="0"><code><span class="line"><span style="--shiki-dark:#F97583;--shiki-light:#D73A49">import</span><span style="--shiki-dark:#E1E4E8;--shiki-light:#24292E"> { Preview } </span><span style="--shiki-dark:#F97583;--shiki-light:#D73A49">from</span><span style="--shiki-dark:#9ECBFF;--shiki-light:#032F62"> "@/components/mdx/preview"</span></span>
<span class="line"><span style="--shiki-dark:#F97583;--shiki-light:#D73A49">import</span><span style="--shiki-dark:#E1E4E8;--shiki-light:#24292E"> { Badge } </span><span style="--shiki-dark:#F97583;--shiki-light:#D73A49">from</span><span style="--shiki-dark:#9ECBFF;--shiki-light:#032F62"> "@/components/mdx/badge"</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-dark:#F97583;--shiki-light:#D73A49">export</span><span style="--shiki-dark:#F97583;--shiki-light:#D73A49"> default</span><span style="--shiki-dark:#F97583;--shiki-light:#D73A49"> function</span><span style="--shiki-dark:#B392F0;--shiki-light:#6F42C1"> PreviewDefault</span><span style="--shiki-dark:#E1E4E8;--shiki-light:#24292E">() {</span></span>
<span class="line"><span style="--shiki-dark:#F97583;--shiki-light:#D73A49">  return</span><span style="--shiki-dark:#E1E4E8;--shiki-light:#24292E"> (</span></span>
<span class="line"><span style="--shiki-dark:#E1E4E8;--shiki-light:#24292E">    &#x3C;</span><span style="--shiki-dark:#79B8FF;--shiki-light:#005CC5">Preview</span><span style="--shiki-dark:#B392F0;--shiki-light:#6F42C1"> lang</span><span style="--shiki-dark:#F97583;--shiki-light:#D73A49">=</span><span style="--shiki-dark:#9ECBFF;--shiki-light:#032F62">"tsx"</span><span style="--shiki-dark:#B392F0;--shiki-light:#6F42C1"> code</span><span style="--shiki-dark:#F97583;--shiki-light:#D73A49">=</span><span style="--shiki-dark:#E1E4E8;--shiki-light:#24292E">{</span><span style="--shiki-dark:#9ECBFF;--shiki-light:#032F62">\`&#x3C;Badge variant="success">Stable&#x3C;/Badge>\`</span><span style="--shiki-dark:#E1E4E8;--shiki-light:#24292E">}></span></span>
<span class="line"><span style="--shiki-dark:#E1E4E8;--shiki-light:#24292E">      &#x3C;</span><span style="--shiki-dark:#79B8FF;--shiki-light:#005CC5">Badge</span><span style="--shiki-dark:#B392F0;--shiki-light:#6F42C1"> variant</span><span style="--shiki-dark:#F97583;--shiki-light:#D73A49">=</span><span style="--shiki-dark:#9ECBFF;--shiki-light:#032F62">"success"</span><span style="--shiki-dark:#E1E4E8;--shiki-light:#24292E">>Stable&#x3C;/</span><span style="--shiki-dark:#79B8FF;--shiki-light:#005CC5">Badge</span><span style="--shiki-dark:#E1E4E8;--shiki-light:#24292E">></span></span>
<span class="line"><span style="--shiki-dark:#E1E4E8;--shiki-light:#24292E">    &#x3C;/</span><span style="--shiki-dark:#79B8FF;--shiki-light:#005CC5">Preview</span><span style="--shiki-dark:#E1E4E8;--shiki-light:#24292E">></span></span>
<span class="line"><span style="--shiki-dark:#E1E4E8;--shiki-light:#24292E">  )</span></span>
<span class="line"><span style="--shiki-dark:#E1E4E8;--shiki-light:#24292E">}</span></span>
<span class="line"></span></code></pre>`,
  },
  "privacy-table-default": {
    source: `import { PrivacyTable } from "@/components/mdx/privacy-table"

export default function PrivacyTableDefault() {
  return (
    <PrivacyTable
      caption="Data collected in accordance with privacy policy"
      rows={[
        {
          dataType: "Email Address",
          purpose: "Account authentication and notifications",
          legalBasis: "Consent",
          retention: "Until account deletion",
          shared: false,
        },
        {
          dataType: "Usage Analytics",
          purpose: "Product improvement and performance monitoring",
          legalBasis: "Legitimate Interest",
          retention: "90 days",
          shared: true,
        },
        {
          dataType: "Device ID",
          purpose: "Session tracking and security",
          legalBasis: "Contract",
          retention: "1 year",
          shared: false,
        },
      ]}
    />
  )
}
`,
    highlighted: `<pre class="shiki shiki-themes github-dark github-light" style="--shiki-dark:#e1e4e8;--shiki-light:#24292e;--shiki-dark-bg:#24292e;--shiki-light-bg:#fff" tabindex="0"><code><span class="line"><span style="--shiki-dark:#F97583;--shiki-light:#D73A49">import</span><span style="--shiki-dark:#E1E4E8;--shiki-light:#24292E"> { PrivacyTable } </span><span style="--shiki-dark:#F97583;--shiki-light:#D73A49">from</span><span style="--shiki-dark:#9ECBFF;--shiki-light:#032F62"> "@/components/mdx/privacy-table"</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-dark:#F97583;--shiki-light:#D73A49">export</span><span style="--shiki-dark:#F97583;--shiki-light:#D73A49"> default</span><span style="--shiki-dark:#F97583;--shiki-light:#D73A49"> function</span><span style="--shiki-dark:#B392F0;--shiki-light:#6F42C1"> PrivacyTableDefault</span><span style="--shiki-dark:#E1E4E8;--shiki-light:#24292E">() {</span></span>
<span class="line"><span style="--shiki-dark:#F97583;--shiki-light:#D73A49">  return</span><span style="--shiki-dark:#E1E4E8;--shiki-light:#24292E"> (</span></span>
<span class="line"><span style="--shiki-dark:#E1E4E8;--shiki-light:#24292E">    &#x3C;</span><span style="--shiki-dark:#79B8FF;--shiki-light:#005CC5">PrivacyTable</span></span>
<span class="line"><span style="--shiki-dark:#B392F0;--shiki-light:#6F42C1">      caption</span><span style="--shiki-dark:#F97583;--shiki-light:#D73A49">=</span><span style="--shiki-dark:#9ECBFF;--shiki-light:#032F62">"Data collected in accordance with privacy policy"</span></span>
<span class="line"><span style="--shiki-dark:#B392F0;--shiki-light:#6F42C1">      rows</span><span style="--shiki-dark:#F97583;--shiki-light:#D73A49">=</span><span style="--shiki-dark:#E1E4E8;--shiki-light:#24292E">{[</span></span>
<span class="line"><span style="--shiki-dark:#E1E4E8;--shiki-light:#24292E">        {</span></span>
<span class="line"><span style="--shiki-dark:#E1E4E8;--shiki-light:#24292E">          dataType: </span><span style="--shiki-dark:#9ECBFF;--shiki-light:#032F62">"Email Address"</span><span style="--shiki-dark:#E1E4E8;--shiki-light:#24292E">,</span></span>
<span class="line"><span style="--shiki-dark:#E1E4E8;--shiki-light:#24292E">          purpose: </span><span style="--shiki-dark:#9ECBFF;--shiki-light:#032F62">"Account authentication and notifications"</span><span style="--shiki-dark:#E1E4E8;--shiki-light:#24292E">,</span></span>
<span class="line"><span style="--shiki-dark:#E1E4E8;--shiki-light:#24292E">          legalBasis: </span><span style="--shiki-dark:#9ECBFF;--shiki-light:#032F62">"Consent"</span><span style="--shiki-dark:#E1E4E8;--shiki-light:#24292E">,</span></span>
<span class="line"><span style="--shiki-dark:#E1E4E8;--shiki-light:#24292E">          retention: </span><span style="--shiki-dark:#9ECBFF;--shiki-light:#032F62">"Until account deletion"</span><span style="--shiki-dark:#E1E4E8;--shiki-light:#24292E">,</span></span>
<span class="line"><span style="--shiki-dark:#E1E4E8;--shiki-light:#24292E">          shared: </span><span style="--shiki-dark:#79B8FF;--shiki-light:#005CC5">false</span><span style="--shiki-dark:#E1E4E8;--shiki-light:#24292E">,</span></span>
<span class="line"><span style="--shiki-dark:#E1E4E8;--shiki-light:#24292E">        },</span></span>
<span class="line"><span style="--shiki-dark:#E1E4E8;--shiki-light:#24292E">        {</span></span>
<span class="line"><span style="--shiki-dark:#E1E4E8;--shiki-light:#24292E">          dataType: </span><span style="--shiki-dark:#9ECBFF;--shiki-light:#032F62">"Usage Analytics"</span><span style="--shiki-dark:#E1E4E8;--shiki-light:#24292E">,</span></span>
<span class="line"><span style="--shiki-dark:#E1E4E8;--shiki-light:#24292E">          purpose: </span><span style="--shiki-dark:#9ECBFF;--shiki-light:#032F62">"Product improvement and performance monitoring"</span><span style="--shiki-dark:#E1E4E8;--shiki-light:#24292E">,</span></span>
<span class="line"><span style="--shiki-dark:#E1E4E8;--shiki-light:#24292E">          legalBasis: </span><span style="--shiki-dark:#9ECBFF;--shiki-light:#032F62">"Legitimate Interest"</span><span style="--shiki-dark:#E1E4E8;--shiki-light:#24292E">,</span></span>
<span class="line"><span style="--shiki-dark:#E1E4E8;--shiki-light:#24292E">          retention: </span><span style="--shiki-dark:#9ECBFF;--shiki-light:#032F62">"90 days"</span><span style="--shiki-dark:#E1E4E8;--shiki-light:#24292E">,</span></span>
<span class="line"><span style="--shiki-dark:#E1E4E8;--shiki-light:#24292E">          shared: </span><span style="--shiki-dark:#79B8FF;--shiki-light:#005CC5">true</span><span style="--shiki-dark:#E1E4E8;--shiki-light:#24292E">,</span></span>
<span class="line"><span style="--shiki-dark:#E1E4E8;--shiki-light:#24292E">        },</span></span>
<span class="line"><span style="--shiki-dark:#E1E4E8;--shiki-light:#24292E">        {</span></span>
<span class="line"><span style="--shiki-dark:#E1E4E8;--shiki-light:#24292E">          dataType: </span><span style="--shiki-dark:#9ECBFF;--shiki-light:#032F62">"Device ID"</span><span style="--shiki-dark:#E1E4E8;--shiki-light:#24292E">,</span></span>
<span class="line"><span style="--shiki-dark:#E1E4E8;--shiki-light:#24292E">          purpose: </span><span style="--shiki-dark:#9ECBFF;--shiki-light:#032F62">"Session tracking and security"</span><span style="--shiki-dark:#E1E4E8;--shiki-light:#24292E">,</span></span>
<span class="line"><span style="--shiki-dark:#E1E4E8;--shiki-light:#24292E">          legalBasis: </span><span style="--shiki-dark:#9ECBFF;--shiki-light:#032F62">"Contract"</span><span style="--shiki-dark:#E1E4E8;--shiki-light:#24292E">,</span></span>
<span class="line"><span style="--shiki-dark:#E1E4E8;--shiki-light:#24292E">          retention: </span><span style="--shiki-dark:#9ECBFF;--shiki-light:#032F62">"1 year"</span><span style="--shiki-dark:#E1E4E8;--shiki-light:#24292E">,</span></span>
<span class="line"><span style="--shiki-dark:#E1E4E8;--shiki-light:#24292E">          shared: </span><span style="--shiki-dark:#79B8FF;--shiki-light:#005CC5">false</span><span style="--shiki-dark:#E1E4E8;--shiki-light:#24292E">,</span></span>
<span class="line"><span style="--shiki-dark:#E1E4E8;--shiki-light:#24292E">        },</span></span>
<span class="line"><span style="--shiki-dark:#E1E4E8;--shiki-light:#24292E">      ]}</span></span>
<span class="line"><span style="--shiki-dark:#E1E4E8;--shiki-light:#24292E">    /></span></span>
<span class="line"><span style="--shiki-dark:#E1E4E8;--shiki-light:#24292E">  )</span></span>
<span class="line"><span style="--shiki-dark:#E1E4E8;--shiki-light:#24292E">}</span></span>
<span class="line"></span></code></pre>`,
  },
  "register-map-default": {
    source: `import { RegisterMap } from "@/components/mdx/register-map"

export default function RegisterMapDefault() {
  return (
    <RegisterMap
      title="Security Control Registers"
      rows={[
        { address: "0x00780000", name: "QFPROM_CORR_RD_WR_PERM_LSB", bits: "31:0", access: "OTP", reset: "0x00000000", description: "Read/write permissions for fuse rows." },
        { address: "0x00780008", name: "QFPROM_CORR_JTAG_ID",        bits: "31:0", access: "RO",  reset: "0x009600E1", description: "JTAG identification register." },
        { address: "0x00780018", name: "USB_PHY_CFG0",                bits: "7:0",  access: "RW",  reset: "0x80",       description: "PHY configuration register 0." },
      ]}
    />
  )
}
`,
    highlighted: `<pre class="shiki shiki-themes github-dark github-light" style="--shiki-dark:#e1e4e8;--shiki-light:#24292e;--shiki-dark-bg:#24292e;--shiki-light-bg:#fff" tabindex="0"><code><span class="line"><span style="--shiki-dark:#F97583;--shiki-light:#D73A49">import</span><span style="--shiki-dark:#E1E4E8;--shiki-light:#24292E"> { RegisterMap } </span><span style="--shiki-dark:#F97583;--shiki-light:#D73A49">from</span><span style="--shiki-dark:#9ECBFF;--shiki-light:#032F62"> "@/components/mdx/register-map"</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-dark:#F97583;--shiki-light:#D73A49">export</span><span style="--shiki-dark:#F97583;--shiki-light:#D73A49"> default</span><span style="--shiki-dark:#F97583;--shiki-light:#D73A49"> function</span><span style="--shiki-dark:#B392F0;--shiki-light:#6F42C1"> RegisterMapDefault</span><span style="--shiki-dark:#E1E4E8;--shiki-light:#24292E">() {</span></span>
<span class="line"><span style="--shiki-dark:#F97583;--shiki-light:#D73A49">  return</span><span style="--shiki-dark:#E1E4E8;--shiki-light:#24292E"> (</span></span>
<span class="line"><span style="--shiki-dark:#E1E4E8;--shiki-light:#24292E">    &#x3C;</span><span style="--shiki-dark:#79B8FF;--shiki-light:#005CC5">RegisterMap</span></span>
<span class="line"><span style="--shiki-dark:#B392F0;--shiki-light:#6F42C1">      title</span><span style="--shiki-dark:#F97583;--shiki-light:#D73A49">=</span><span style="--shiki-dark:#9ECBFF;--shiki-light:#032F62">"Security Control Registers"</span></span>
<span class="line"><span style="--shiki-dark:#B392F0;--shiki-light:#6F42C1">      rows</span><span style="--shiki-dark:#F97583;--shiki-light:#D73A49">=</span><span style="--shiki-dark:#E1E4E8;--shiki-light:#24292E">{[</span></span>
<span class="line"><span style="--shiki-dark:#E1E4E8;--shiki-light:#24292E">        { address: </span><span style="--shiki-dark:#9ECBFF;--shiki-light:#032F62">"0x00780000"</span><span style="--shiki-dark:#E1E4E8;--shiki-light:#24292E">, name: </span><span style="--shiki-dark:#9ECBFF;--shiki-light:#032F62">"QFPROM_CORR_RD_WR_PERM_LSB"</span><span style="--shiki-dark:#E1E4E8;--shiki-light:#24292E">, bits: </span><span style="--shiki-dark:#9ECBFF;--shiki-light:#032F62">"31:0"</span><span style="--shiki-dark:#E1E4E8;--shiki-light:#24292E">, access: </span><span style="--shiki-dark:#9ECBFF;--shiki-light:#032F62">"OTP"</span><span style="--shiki-dark:#E1E4E8;--shiki-light:#24292E">, reset: </span><span style="--shiki-dark:#9ECBFF;--shiki-light:#032F62">"0x00000000"</span><span style="--shiki-dark:#E1E4E8;--shiki-light:#24292E">, description: </span><span style="--shiki-dark:#9ECBFF;--shiki-light:#032F62">"Read/write permissions for fuse rows."</span><span style="--shiki-dark:#E1E4E8;--shiki-light:#24292E"> },</span></span>
<span class="line"><span style="--shiki-dark:#E1E4E8;--shiki-light:#24292E">        { address: </span><span style="--shiki-dark:#9ECBFF;--shiki-light:#032F62">"0x00780008"</span><span style="--shiki-dark:#E1E4E8;--shiki-light:#24292E">, name: </span><span style="--shiki-dark:#9ECBFF;--shiki-light:#032F62">"QFPROM_CORR_JTAG_ID"</span><span style="--shiki-dark:#E1E4E8;--shiki-light:#24292E">,        bits: </span><span style="--shiki-dark:#9ECBFF;--shiki-light:#032F62">"31:0"</span><span style="--shiki-dark:#E1E4E8;--shiki-light:#24292E">, access: </span><span style="--shiki-dark:#9ECBFF;--shiki-light:#032F62">"RO"</span><span style="--shiki-dark:#E1E4E8;--shiki-light:#24292E">,  reset: </span><span style="--shiki-dark:#9ECBFF;--shiki-light:#032F62">"0x009600E1"</span><span style="--shiki-dark:#E1E4E8;--shiki-light:#24292E">, description: </span><span style="--shiki-dark:#9ECBFF;--shiki-light:#032F62">"JTAG identification register."</span><span style="--shiki-dark:#E1E4E8;--shiki-light:#24292E"> },</span></span>
<span class="line"><span style="--shiki-dark:#E1E4E8;--shiki-light:#24292E">        { address: </span><span style="--shiki-dark:#9ECBFF;--shiki-light:#032F62">"0x00780018"</span><span style="--shiki-dark:#E1E4E8;--shiki-light:#24292E">, name: </span><span style="--shiki-dark:#9ECBFF;--shiki-light:#032F62">"USB_PHY_CFG0"</span><span style="--shiki-dark:#E1E4E8;--shiki-light:#24292E">,                bits: </span><span style="--shiki-dark:#9ECBFF;--shiki-light:#032F62">"7:0"</span><span style="--shiki-dark:#E1E4E8;--shiki-light:#24292E">,  access: </span><span style="--shiki-dark:#9ECBFF;--shiki-light:#032F62">"RW"</span><span style="--shiki-dark:#E1E4E8;--shiki-light:#24292E">,  reset: </span><span style="--shiki-dark:#9ECBFF;--shiki-light:#032F62">"0x80"</span><span style="--shiki-dark:#E1E4E8;--shiki-light:#24292E">,       description: </span><span style="--shiki-dark:#9ECBFF;--shiki-light:#032F62">"PHY configuration register 0."</span><span style="--shiki-dark:#E1E4E8;--shiki-light:#24292E"> },</span></span>
<span class="line"><span style="--shiki-dark:#E1E4E8;--shiki-light:#24292E">      ]}</span></span>
<span class="line"><span style="--shiki-dark:#E1E4E8;--shiki-light:#24292E">    /></span></span>
<span class="line"><span style="--shiki-dark:#E1E4E8;--shiki-light:#24292E">  )</span></span>
<span class="line"><span style="--shiki-dark:#E1E4E8;--shiki-light:#24292E">}</span></span>
<span class="line"></span></code></pre>`,
  },
  "reveal-default": {
    source: `"use client"
import { Reveal } from "@/components/mdx/reveal"

export default function RevealDefault() {
  return (
    <div className="w-full space-y-2">
      <Reveal label="Show solution">
        The optimal solution uses a hash map for O(1) lookups, reducing time complexity from O(n²) to O(n).
      </Reveal>
      <Reveal label="Show hint" defaultOpen>
        Think about what data structure gives you O(1) average-case lookup.
      </Reveal>
    </div>
  )
}
`,
    highlighted: `<pre class="shiki shiki-themes github-dark github-light" style="--shiki-dark:#e1e4e8;--shiki-light:#24292e;--shiki-dark-bg:#24292e;--shiki-light-bg:#fff" tabindex="0"><code><span class="line"><span style="--shiki-dark:#9ECBFF;--shiki-light:#032F62">"use client"</span></span>
<span class="line"><span style="--shiki-dark:#F97583;--shiki-light:#D73A49">import</span><span style="--shiki-dark:#E1E4E8;--shiki-light:#24292E"> { Reveal } </span><span style="--shiki-dark:#F97583;--shiki-light:#D73A49">from</span><span style="--shiki-dark:#9ECBFF;--shiki-light:#032F62"> "@/components/mdx/reveal"</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-dark:#F97583;--shiki-light:#D73A49">export</span><span style="--shiki-dark:#F97583;--shiki-light:#D73A49"> default</span><span style="--shiki-dark:#F97583;--shiki-light:#D73A49"> function</span><span style="--shiki-dark:#B392F0;--shiki-light:#6F42C1"> RevealDefault</span><span style="--shiki-dark:#E1E4E8;--shiki-light:#24292E">() {</span></span>
<span class="line"><span style="--shiki-dark:#F97583;--shiki-light:#D73A49">  return</span><span style="--shiki-dark:#E1E4E8;--shiki-light:#24292E"> (</span></span>
<span class="line"><span style="--shiki-dark:#E1E4E8;--shiki-light:#24292E">    &#x3C;</span><span style="--shiki-dark:#85E89D;--shiki-light:#22863A">div</span><span style="--shiki-dark:#B392F0;--shiki-light:#6F42C1"> className</span><span style="--shiki-dark:#F97583;--shiki-light:#D73A49">=</span><span style="--shiki-dark:#9ECBFF;--shiki-light:#032F62">"w-full space-y-2"</span><span style="--shiki-dark:#E1E4E8;--shiki-light:#24292E">></span></span>
<span class="line"><span style="--shiki-dark:#E1E4E8;--shiki-light:#24292E">      &#x3C;</span><span style="--shiki-dark:#79B8FF;--shiki-light:#005CC5">Reveal</span><span style="--shiki-dark:#B392F0;--shiki-light:#6F42C1"> label</span><span style="--shiki-dark:#F97583;--shiki-light:#D73A49">=</span><span style="--shiki-dark:#9ECBFF;--shiki-light:#032F62">"Show solution"</span><span style="--shiki-dark:#E1E4E8;--shiki-light:#24292E">></span></span>
<span class="line"><span style="--shiki-dark:#E1E4E8;--shiki-light:#24292E">        The optimal solution uses a hash map for O(1) lookups, reducing time complexity from O(n²) to O(n).</span></span>
<span class="line"><span style="--shiki-dark:#E1E4E8;--shiki-light:#24292E">      &#x3C;/</span><span style="--shiki-dark:#79B8FF;--shiki-light:#005CC5">Reveal</span><span style="--shiki-dark:#E1E4E8;--shiki-light:#24292E">></span></span>
<span class="line"><span style="--shiki-dark:#E1E4E8;--shiki-light:#24292E">      &#x3C;</span><span style="--shiki-dark:#79B8FF;--shiki-light:#005CC5">Reveal</span><span style="--shiki-dark:#B392F0;--shiki-light:#6F42C1"> label</span><span style="--shiki-dark:#F97583;--shiki-light:#D73A49">=</span><span style="--shiki-dark:#9ECBFF;--shiki-light:#032F62">"Show hint"</span><span style="--shiki-dark:#B392F0;--shiki-light:#6F42C1"> defaultOpen</span><span style="--shiki-dark:#E1E4E8;--shiki-light:#24292E">></span></span>
<span class="line"><span style="--shiki-dark:#E1E4E8;--shiki-light:#24292E">        Think about what data structure gives you O(1) average-case lookup.</span></span>
<span class="line"><span style="--shiki-dark:#E1E4E8;--shiki-light:#24292E">      &#x3C;/</span><span style="--shiki-dark:#79B8FF;--shiki-light:#005CC5">Reveal</span><span style="--shiki-dark:#E1E4E8;--shiki-light:#24292E">></span></span>
<span class="line"><span style="--shiki-dark:#E1E4E8;--shiki-light:#24292E">    &#x3C;/</span><span style="--shiki-dark:#85E89D;--shiki-light:#22863A">div</span><span style="--shiki-dark:#E1E4E8;--shiki-light:#24292E">></span></span>
<span class="line"><span style="--shiki-dark:#E1E4E8;--shiki-light:#24292E">  )</span></span>
<span class="line"><span style="--shiki-dark:#E1E4E8;--shiki-light:#24292E">}</span></span>
<span class="line"></span></code></pre>`,
  },
  "security-note-default": {
    source: `import { SecurityNote } from "@/components/mdx/security-note"

export default function SecurityNoteDefault() {
  return (
    <div className="w-full space-y-0">
      <SecurityNote severity="info">
        API keys are scoped to your workspace. Rotate them every 90 days.
      </SecurityNote>
      <SecurityNote severity="warning" title="Token Storage">
        Never store access tokens in localStorage. Use httpOnly cookies or a secure server-side session.
      </SecurityNote>
      <SecurityNote severity="critical" title="Private Key Handling">
        Never commit private keys to version control. Revoke and rotate immediately if exposed.
      </SecurityNote>
    </div>
  )
}
`,
    highlighted: `<pre class="shiki shiki-themes github-dark github-light" style="--shiki-dark:#e1e4e8;--shiki-light:#24292e;--shiki-dark-bg:#24292e;--shiki-light-bg:#fff" tabindex="0"><code><span class="line"><span style="--shiki-dark:#F97583;--shiki-light:#D73A49">import</span><span style="--shiki-dark:#E1E4E8;--shiki-light:#24292E"> { SecurityNote } </span><span style="--shiki-dark:#F97583;--shiki-light:#D73A49">from</span><span style="--shiki-dark:#9ECBFF;--shiki-light:#032F62"> "@/components/mdx/security-note"</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-dark:#F97583;--shiki-light:#D73A49">export</span><span style="--shiki-dark:#F97583;--shiki-light:#D73A49"> default</span><span style="--shiki-dark:#F97583;--shiki-light:#D73A49"> function</span><span style="--shiki-dark:#B392F0;--shiki-light:#6F42C1"> SecurityNoteDefault</span><span style="--shiki-dark:#E1E4E8;--shiki-light:#24292E">() {</span></span>
<span class="line"><span style="--shiki-dark:#F97583;--shiki-light:#D73A49">  return</span><span style="--shiki-dark:#E1E4E8;--shiki-light:#24292E"> (</span></span>
<span class="line"><span style="--shiki-dark:#E1E4E8;--shiki-light:#24292E">    &#x3C;</span><span style="--shiki-dark:#85E89D;--shiki-light:#22863A">div</span><span style="--shiki-dark:#B392F0;--shiki-light:#6F42C1"> className</span><span style="--shiki-dark:#F97583;--shiki-light:#D73A49">=</span><span style="--shiki-dark:#9ECBFF;--shiki-light:#032F62">"w-full space-y-0"</span><span style="--shiki-dark:#E1E4E8;--shiki-light:#24292E">></span></span>
<span class="line"><span style="--shiki-dark:#E1E4E8;--shiki-light:#24292E">      &#x3C;</span><span style="--shiki-dark:#79B8FF;--shiki-light:#005CC5">SecurityNote</span><span style="--shiki-dark:#B392F0;--shiki-light:#6F42C1"> severity</span><span style="--shiki-dark:#F97583;--shiki-light:#D73A49">=</span><span style="--shiki-dark:#9ECBFF;--shiki-light:#032F62">"info"</span><span style="--shiki-dark:#E1E4E8;--shiki-light:#24292E">></span></span>
<span class="line"><span style="--shiki-dark:#E1E4E8;--shiki-light:#24292E">        API keys are scoped to your workspace. Rotate them every 90 days.</span></span>
<span class="line"><span style="--shiki-dark:#E1E4E8;--shiki-light:#24292E">      &#x3C;/</span><span style="--shiki-dark:#79B8FF;--shiki-light:#005CC5">SecurityNote</span><span style="--shiki-dark:#E1E4E8;--shiki-light:#24292E">></span></span>
<span class="line"><span style="--shiki-dark:#E1E4E8;--shiki-light:#24292E">      &#x3C;</span><span style="--shiki-dark:#79B8FF;--shiki-light:#005CC5">SecurityNote</span><span style="--shiki-dark:#B392F0;--shiki-light:#6F42C1"> severity</span><span style="--shiki-dark:#F97583;--shiki-light:#D73A49">=</span><span style="--shiki-dark:#9ECBFF;--shiki-light:#032F62">"warning"</span><span style="--shiki-dark:#B392F0;--shiki-light:#6F42C1"> title</span><span style="--shiki-dark:#F97583;--shiki-light:#D73A49">=</span><span style="--shiki-dark:#9ECBFF;--shiki-light:#032F62">"Token Storage"</span><span style="--shiki-dark:#E1E4E8;--shiki-light:#24292E">></span></span>
<span class="line"><span style="--shiki-dark:#E1E4E8;--shiki-light:#24292E">        Never store access tokens in localStorage. Use httpOnly cookies or a secure server-side session.</span></span>
<span class="line"><span style="--shiki-dark:#E1E4E8;--shiki-light:#24292E">      &#x3C;/</span><span style="--shiki-dark:#79B8FF;--shiki-light:#005CC5">SecurityNote</span><span style="--shiki-dark:#E1E4E8;--shiki-light:#24292E">></span></span>
<span class="line"><span style="--shiki-dark:#E1E4E8;--shiki-light:#24292E">      &#x3C;</span><span style="--shiki-dark:#79B8FF;--shiki-light:#005CC5">SecurityNote</span><span style="--shiki-dark:#B392F0;--shiki-light:#6F42C1"> severity</span><span style="--shiki-dark:#F97583;--shiki-light:#D73A49">=</span><span style="--shiki-dark:#9ECBFF;--shiki-light:#032F62">"critical"</span><span style="--shiki-dark:#B392F0;--shiki-light:#6F42C1"> title</span><span style="--shiki-dark:#F97583;--shiki-light:#D73A49">=</span><span style="--shiki-dark:#9ECBFF;--shiki-light:#032F62">"Private Key Handling"</span><span style="--shiki-dark:#E1E4E8;--shiki-light:#24292E">></span></span>
<span class="line"><span style="--shiki-dark:#E1E4E8;--shiki-light:#24292E">        Never commit private keys to version control. Revoke and rotate immediately if exposed.</span></span>
<span class="line"><span style="--shiki-dark:#E1E4E8;--shiki-light:#24292E">      &#x3C;/</span><span style="--shiki-dark:#79B8FF;--shiki-light:#005CC5">SecurityNote</span><span style="--shiki-dark:#E1E4E8;--shiki-light:#24292E">></span></span>
<span class="line"><span style="--shiki-dark:#E1E4E8;--shiki-light:#24292E">    &#x3C;/</span><span style="--shiki-dark:#85E89D;--shiki-light:#22863A">div</span><span style="--shiki-dark:#E1E4E8;--shiki-light:#24292E">></span></span>
<span class="line"><span style="--shiki-dark:#E1E4E8;--shiki-light:#24292E">  )</span></span>
<span class="line"><span style="--shiki-dark:#E1E4E8;--shiki-light:#24292E">}</span></span>
<span class="line"></span></code></pre>`,
  },
  "spoiler-default": {
    source: `import { Spoiler } from "@/components/mdx/spoiler";

export default function SpoilerDefault() {
  return (
    <div className="w-full space-y-2">
      <Spoiler summary="Show answer">The answer is 42.</Spoiler>
      <Spoiler summary="Implementation details" open>
        This section is expanded on load.
      </Spoiler>
    </div>
  );
}
`,
    highlighted: `<pre class="shiki shiki-themes github-dark github-light" style="--shiki-dark:#e1e4e8;--shiki-light:#24292e;--shiki-dark-bg:#24292e;--shiki-light-bg:#fff" tabindex="0"><code><span class="line"><span style="--shiki-dark:#F97583;--shiki-light:#D73A49">import</span><span style="--shiki-dark:#E1E4E8;--shiki-light:#24292E"> { Spoiler } </span><span style="--shiki-dark:#F97583;--shiki-light:#D73A49">from</span><span style="--shiki-dark:#9ECBFF;--shiki-light:#032F62"> "@/components/mdx/spoiler"</span><span style="--shiki-dark:#E1E4E8;--shiki-light:#24292E">;</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-dark:#F97583;--shiki-light:#D73A49">export</span><span style="--shiki-dark:#F97583;--shiki-light:#D73A49"> default</span><span style="--shiki-dark:#F97583;--shiki-light:#D73A49"> function</span><span style="--shiki-dark:#B392F0;--shiki-light:#6F42C1"> SpoilerDefault</span><span style="--shiki-dark:#E1E4E8;--shiki-light:#24292E">() {</span></span>
<span class="line"><span style="--shiki-dark:#F97583;--shiki-light:#D73A49">  return</span><span style="--shiki-dark:#E1E4E8;--shiki-light:#24292E"> (</span></span>
<span class="line"><span style="--shiki-dark:#E1E4E8;--shiki-light:#24292E">    &#x3C;</span><span style="--shiki-dark:#85E89D;--shiki-light:#22863A">div</span><span style="--shiki-dark:#B392F0;--shiki-light:#6F42C1"> className</span><span style="--shiki-dark:#F97583;--shiki-light:#D73A49">=</span><span style="--shiki-dark:#9ECBFF;--shiki-light:#032F62">"w-full space-y-2"</span><span style="--shiki-dark:#E1E4E8;--shiki-light:#24292E">></span></span>
<span class="line"><span style="--shiki-dark:#E1E4E8;--shiki-light:#24292E">      &#x3C;</span><span style="--shiki-dark:#79B8FF;--shiki-light:#005CC5">Spoiler</span><span style="--shiki-dark:#B392F0;--shiki-light:#6F42C1"> summary</span><span style="--shiki-dark:#F97583;--shiki-light:#D73A49">=</span><span style="--shiki-dark:#9ECBFF;--shiki-light:#032F62">"Show answer"</span><span style="--shiki-dark:#E1E4E8;--shiki-light:#24292E">>The answer is 42.&#x3C;/</span><span style="--shiki-dark:#79B8FF;--shiki-light:#005CC5">Spoiler</span><span style="--shiki-dark:#E1E4E8;--shiki-light:#24292E">></span></span>
<span class="line"><span style="--shiki-dark:#E1E4E8;--shiki-light:#24292E">      &#x3C;</span><span style="--shiki-dark:#79B8FF;--shiki-light:#005CC5">Spoiler</span><span style="--shiki-dark:#B392F0;--shiki-light:#6F42C1"> summary</span><span style="--shiki-dark:#F97583;--shiki-light:#D73A49">=</span><span style="--shiki-dark:#9ECBFF;--shiki-light:#032F62">"Implementation details"</span><span style="--shiki-dark:#B392F0;--shiki-light:#6F42C1"> open</span><span style="--shiki-dark:#E1E4E8;--shiki-light:#24292E">></span></span>
<span class="line"><span style="--shiki-dark:#E1E4E8;--shiki-light:#24292E">        This section is expanded on load.</span></span>
<span class="line"><span style="--shiki-dark:#E1E4E8;--shiki-light:#24292E">      &#x3C;/</span><span style="--shiki-dark:#79B8FF;--shiki-light:#005CC5">Spoiler</span><span style="--shiki-dark:#E1E4E8;--shiki-light:#24292E">></span></span>
<span class="line"><span style="--shiki-dark:#E1E4E8;--shiki-light:#24292E">    &#x3C;/</span><span style="--shiki-dark:#85E89D;--shiki-light:#22863A">div</span><span style="--shiki-dark:#E1E4E8;--shiki-light:#24292E">></span></span>
<span class="line"><span style="--shiki-dark:#E1E4E8;--shiki-light:#24292E">  );</span></span>
<span class="line"><span style="--shiki-dark:#E1E4E8;--shiki-light:#24292E">}</span></span>
<span class="line"></span></code></pre>`,
  },
  "steps-default": {
    source: `import { Steps, Step } from "@/components/mdx/steps";

export default function StepsDefault() {
  return (
    <Steps>
      <Step>Create a new Next.js project</Step>
      <Step>Install the required dependencies</Step>
      <Step>Configure your tailwind.config.ts</Step>
      <Step>Start building!</Step>
    </Steps>
  );
}
`,
    highlighted: `<pre class="shiki shiki-themes github-dark github-light" style="--shiki-dark:#e1e4e8;--shiki-light:#24292e;--shiki-dark-bg:#24292e;--shiki-light-bg:#fff" tabindex="0"><code><span class="line"><span style="--shiki-dark:#F97583;--shiki-light:#D73A49">import</span><span style="--shiki-dark:#E1E4E8;--shiki-light:#24292E"> { Steps, Step } </span><span style="--shiki-dark:#F97583;--shiki-light:#D73A49">from</span><span style="--shiki-dark:#9ECBFF;--shiki-light:#032F62"> "@/components/mdx/steps"</span><span style="--shiki-dark:#E1E4E8;--shiki-light:#24292E">;</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-dark:#F97583;--shiki-light:#D73A49">export</span><span style="--shiki-dark:#F97583;--shiki-light:#D73A49"> default</span><span style="--shiki-dark:#F97583;--shiki-light:#D73A49"> function</span><span style="--shiki-dark:#B392F0;--shiki-light:#6F42C1"> StepsDefault</span><span style="--shiki-dark:#E1E4E8;--shiki-light:#24292E">() {</span></span>
<span class="line"><span style="--shiki-dark:#F97583;--shiki-light:#D73A49">  return</span><span style="--shiki-dark:#E1E4E8;--shiki-light:#24292E"> (</span></span>
<span class="line"><span style="--shiki-dark:#E1E4E8;--shiki-light:#24292E">    &#x3C;</span><span style="--shiki-dark:#79B8FF;--shiki-light:#005CC5">Steps</span><span style="--shiki-dark:#E1E4E8;--shiki-light:#24292E">></span></span>
<span class="line"><span style="--shiki-dark:#E1E4E8;--shiki-light:#24292E">      &#x3C;</span><span style="--shiki-dark:#79B8FF;--shiki-light:#005CC5">Step</span><span style="--shiki-dark:#E1E4E8;--shiki-light:#24292E">>Create a new Next.js project&#x3C;/</span><span style="--shiki-dark:#79B8FF;--shiki-light:#005CC5">Step</span><span style="--shiki-dark:#E1E4E8;--shiki-light:#24292E">></span></span>
<span class="line"><span style="--shiki-dark:#E1E4E8;--shiki-light:#24292E">      &#x3C;</span><span style="--shiki-dark:#79B8FF;--shiki-light:#005CC5">Step</span><span style="--shiki-dark:#E1E4E8;--shiki-light:#24292E">>Install the required dependencies&#x3C;/</span><span style="--shiki-dark:#79B8FF;--shiki-light:#005CC5">Step</span><span style="--shiki-dark:#E1E4E8;--shiki-light:#24292E">></span></span>
<span class="line"><span style="--shiki-dark:#E1E4E8;--shiki-light:#24292E">      &#x3C;</span><span style="--shiki-dark:#79B8FF;--shiki-light:#005CC5">Step</span><span style="--shiki-dark:#E1E4E8;--shiki-light:#24292E">>Configure your tailwind.config.ts&#x3C;/</span><span style="--shiki-dark:#79B8FF;--shiki-light:#005CC5">Step</span><span style="--shiki-dark:#E1E4E8;--shiki-light:#24292E">></span></span>
<span class="line"><span style="--shiki-dark:#E1E4E8;--shiki-light:#24292E">      &#x3C;</span><span style="--shiki-dark:#79B8FF;--shiki-light:#005CC5">Step</span><span style="--shiki-dark:#E1E4E8;--shiki-light:#24292E">>Start building!&#x3C;/</span><span style="--shiki-dark:#79B8FF;--shiki-light:#005CC5">Step</span><span style="--shiki-dark:#E1E4E8;--shiki-light:#24292E">></span></span>
<span class="line"><span style="--shiki-dark:#E1E4E8;--shiki-light:#24292E">    &#x3C;/</span><span style="--shiki-dark:#79B8FF;--shiki-light:#005CC5">Steps</span><span style="--shiki-dark:#E1E4E8;--shiki-light:#24292E">></span></span>
<span class="line"><span style="--shiki-dark:#E1E4E8;--shiki-light:#24292E">  );</span></span>
<span class="line"><span style="--shiki-dark:#E1E4E8;--shiki-light:#24292E">}</span></span>
<span class="line"></span></code></pre>`,
  },
  "table-default": {
    source: `import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
  TableCaption,
} from "@/components/mdx/table"

export default function TableDefault() {
  return (
    <div className="w-full overflow-x-auto">
      <Table>
        <TableCaption>mdx-ui component install sizes</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>Component</TableHead>
            <TableHead>Dependencies</TableHead>
            <TableHead>Size</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          <TableRow>
            <TableCell>Accordion</TableCell>
            <TableCell>utils</TableCell>
            <TableCell>4.2 kB</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Badge</TableCell>
            <TableCell>cva, utils</TableCell>
            <TableCell>1.8 kB</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Callout</TableCell>
            <TableCell>cva, utils</TableCell>
            <TableCell>2.1 kB</TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </div>
  )
}
`,
    highlighted: `<pre class="shiki shiki-themes github-dark github-light" style="--shiki-dark:#e1e4e8;--shiki-light:#24292e;--shiki-dark-bg:#24292e;--shiki-light-bg:#fff" tabindex="0"><code><span class="line"><span style="--shiki-dark:#F97583;--shiki-light:#D73A49">import</span><span style="--shiki-dark:#E1E4E8;--shiki-light:#24292E"> {</span></span>
<span class="line"><span style="--shiki-dark:#E1E4E8;--shiki-light:#24292E">  Table,</span></span>
<span class="line"><span style="--shiki-dark:#E1E4E8;--shiki-light:#24292E">  TableHeader,</span></span>
<span class="line"><span style="--shiki-dark:#E1E4E8;--shiki-light:#24292E">  TableBody,</span></span>
<span class="line"><span style="--shiki-dark:#E1E4E8;--shiki-light:#24292E">  TableRow,</span></span>
<span class="line"><span style="--shiki-dark:#E1E4E8;--shiki-light:#24292E">  TableHead,</span></span>
<span class="line"><span style="--shiki-dark:#E1E4E8;--shiki-light:#24292E">  TableCell,</span></span>
<span class="line"><span style="--shiki-dark:#E1E4E8;--shiki-light:#24292E">  TableCaption,</span></span>
<span class="line"><span style="--shiki-dark:#E1E4E8;--shiki-light:#24292E">} </span><span style="--shiki-dark:#F97583;--shiki-light:#D73A49">from</span><span style="--shiki-dark:#9ECBFF;--shiki-light:#032F62"> "@/components/mdx/table"</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-dark:#F97583;--shiki-light:#D73A49">export</span><span style="--shiki-dark:#F97583;--shiki-light:#D73A49"> default</span><span style="--shiki-dark:#F97583;--shiki-light:#D73A49"> function</span><span style="--shiki-dark:#B392F0;--shiki-light:#6F42C1"> TableDefault</span><span style="--shiki-dark:#E1E4E8;--shiki-light:#24292E">() {</span></span>
<span class="line"><span style="--shiki-dark:#F97583;--shiki-light:#D73A49">  return</span><span style="--shiki-dark:#E1E4E8;--shiki-light:#24292E"> (</span></span>
<span class="line"><span style="--shiki-dark:#E1E4E8;--shiki-light:#24292E">    &#x3C;</span><span style="--shiki-dark:#85E89D;--shiki-light:#22863A">div</span><span style="--shiki-dark:#B392F0;--shiki-light:#6F42C1"> className</span><span style="--shiki-dark:#F97583;--shiki-light:#D73A49">=</span><span style="--shiki-dark:#9ECBFF;--shiki-light:#032F62">"w-full overflow-x-auto"</span><span style="--shiki-dark:#E1E4E8;--shiki-light:#24292E">></span></span>
<span class="line"><span style="--shiki-dark:#E1E4E8;--shiki-light:#24292E">      &#x3C;</span><span style="--shiki-dark:#79B8FF;--shiki-light:#005CC5">Table</span><span style="--shiki-dark:#E1E4E8;--shiki-light:#24292E">></span></span>
<span class="line"><span style="--shiki-dark:#E1E4E8;--shiki-light:#24292E">        &#x3C;</span><span style="--shiki-dark:#79B8FF;--shiki-light:#005CC5">TableCaption</span><span style="--shiki-dark:#E1E4E8;--shiki-light:#24292E">>mdx-ui component install sizes&#x3C;/</span><span style="--shiki-dark:#79B8FF;--shiki-light:#005CC5">TableCaption</span><span style="--shiki-dark:#E1E4E8;--shiki-light:#24292E">></span></span>
<span class="line"><span style="--shiki-dark:#E1E4E8;--shiki-light:#24292E">        &#x3C;</span><span style="--shiki-dark:#79B8FF;--shiki-light:#005CC5">TableHeader</span><span style="--shiki-dark:#E1E4E8;--shiki-light:#24292E">></span></span>
<span class="line"><span style="--shiki-dark:#E1E4E8;--shiki-light:#24292E">          &#x3C;</span><span style="--shiki-dark:#79B8FF;--shiki-light:#005CC5">TableRow</span><span style="--shiki-dark:#E1E4E8;--shiki-light:#24292E">></span></span>
<span class="line"><span style="--shiki-dark:#E1E4E8;--shiki-light:#24292E">            &#x3C;</span><span style="--shiki-dark:#79B8FF;--shiki-light:#005CC5">TableHead</span><span style="--shiki-dark:#E1E4E8;--shiki-light:#24292E">>Component&#x3C;/</span><span style="--shiki-dark:#79B8FF;--shiki-light:#005CC5">TableHead</span><span style="--shiki-dark:#E1E4E8;--shiki-light:#24292E">></span></span>
<span class="line"><span style="--shiki-dark:#E1E4E8;--shiki-light:#24292E">            &#x3C;</span><span style="--shiki-dark:#79B8FF;--shiki-light:#005CC5">TableHead</span><span style="--shiki-dark:#E1E4E8;--shiki-light:#24292E">>Dependencies&#x3C;/</span><span style="--shiki-dark:#79B8FF;--shiki-light:#005CC5">TableHead</span><span style="--shiki-dark:#E1E4E8;--shiki-light:#24292E">></span></span>
<span class="line"><span style="--shiki-dark:#E1E4E8;--shiki-light:#24292E">            &#x3C;</span><span style="--shiki-dark:#79B8FF;--shiki-light:#005CC5">TableHead</span><span style="--shiki-dark:#E1E4E8;--shiki-light:#24292E">>Size&#x3C;/</span><span style="--shiki-dark:#79B8FF;--shiki-light:#005CC5">TableHead</span><span style="--shiki-dark:#E1E4E8;--shiki-light:#24292E">></span></span>
<span class="line"><span style="--shiki-dark:#E1E4E8;--shiki-light:#24292E">          &#x3C;/</span><span style="--shiki-dark:#79B8FF;--shiki-light:#005CC5">TableRow</span><span style="--shiki-dark:#E1E4E8;--shiki-light:#24292E">></span></span>
<span class="line"><span style="--shiki-dark:#E1E4E8;--shiki-light:#24292E">        &#x3C;/</span><span style="--shiki-dark:#79B8FF;--shiki-light:#005CC5">TableHeader</span><span style="--shiki-dark:#E1E4E8;--shiki-light:#24292E">></span></span>
<span class="line"><span style="--shiki-dark:#E1E4E8;--shiki-light:#24292E">        &#x3C;</span><span style="--shiki-dark:#79B8FF;--shiki-light:#005CC5">TableBody</span><span style="--shiki-dark:#E1E4E8;--shiki-light:#24292E">></span></span>
<span class="line"><span style="--shiki-dark:#E1E4E8;--shiki-light:#24292E">          &#x3C;</span><span style="--shiki-dark:#79B8FF;--shiki-light:#005CC5">TableRow</span><span style="--shiki-dark:#E1E4E8;--shiki-light:#24292E">></span></span>
<span class="line"><span style="--shiki-dark:#E1E4E8;--shiki-light:#24292E">            &#x3C;</span><span style="--shiki-dark:#79B8FF;--shiki-light:#005CC5">TableCell</span><span style="--shiki-dark:#E1E4E8;--shiki-light:#24292E">>Accordion&#x3C;/</span><span style="--shiki-dark:#79B8FF;--shiki-light:#005CC5">TableCell</span><span style="--shiki-dark:#E1E4E8;--shiki-light:#24292E">></span></span>
<span class="line"><span style="--shiki-dark:#E1E4E8;--shiki-light:#24292E">            &#x3C;</span><span style="--shiki-dark:#79B8FF;--shiki-light:#005CC5">TableCell</span><span style="--shiki-dark:#E1E4E8;--shiki-light:#24292E">>utils&#x3C;/</span><span style="--shiki-dark:#79B8FF;--shiki-light:#005CC5">TableCell</span><span style="--shiki-dark:#E1E4E8;--shiki-light:#24292E">></span></span>
<span class="line"><span style="--shiki-dark:#E1E4E8;--shiki-light:#24292E">            &#x3C;</span><span style="--shiki-dark:#79B8FF;--shiki-light:#005CC5">TableCell</span><span style="--shiki-dark:#E1E4E8;--shiki-light:#24292E">>4.2 kB&#x3C;/</span><span style="--shiki-dark:#79B8FF;--shiki-light:#005CC5">TableCell</span><span style="--shiki-dark:#E1E4E8;--shiki-light:#24292E">></span></span>
<span class="line"><span style="--shiki-dark:#E1E4E8;--shiki-light:#24292E">          &#x3C;/</span><span style="--shiki-dark:#79B8FF;--shiki-light:#005CC5">TableRow</span><span style="--shiki-dark:#E1E4E8;--shiki-light:#24292E">></span></span>
<span class="line"><span style="--shiki-dark:#E1E4E8;--shiki-light:#24292E">          &#x3C;</span><span style="--shiki-dark:#79B8FF;--shiki-light:#005CC5">TableRow</span><span style="--shiki-dark:#E1E4E8;--shiki-light:#24292E">></span></span>
<span class="line"><span style="--shiki-dark:#E1E4E8;--shiki-light:#24292E">            &#x3C;</span><span style="--shiki-dark:#79B8FF;--shiki-light:#005CC5">TableCell</span><span style="--shiki-dark:#E1E4E8;--shiki-light:#24292E">>Badge&#x3C;/</span><span style="--shiki-dark:#79B8FF;--shiki-light:#005CC5">TableCell</span><span style="--shiki-dark:#E1E4E8;--shiki-light:#24292E">></span></span>
<span class="line"><span style="--shiki-dark:#E1E4E8;--shiki-light:#24292E">            &#x3C;</span><span style="--shiki-dark:#79B8FF;--shiki-light:#005CC5">TableCell</span><span style="--shiki-dark:#E1E4E8;--shiki-light:#24292E">>cva, utils&#x3C;/</span><span style="--shiki-dark:#79B8FF;--shiki-light:#005CC5">TableCell</span><span style="--shiki-dark:#E1E4E8;--shiki-light:#24292E">></span></span>
<span class="line"><span style="--shiki-dark:#E1E4E8;--shiki-light:#24292E">            &#x3C;</span><span style="--shiki-dark:#79B8FF;--shiki-light:#005CC5">TableCell</span><span style="--shiki-dark:#E1E4E8;--shiki-light:#24292E">>1.8 kB&#x3C;/</span><span style="--shiki-dark:#79B8FF;--shiki-light:#005CC5">TableCell</span><span style="--shiki-dark:#E1E4E8;--shiki-light:#24292E">></span></span>
<span class="line"><span style="--shiki-dark:#E1E4E8;--shiki-light:#24292E">          &#x3C;/</span><span style="--shiki-dark:#79B8FF;--shiki-light:#005CC5">TableRow</span><span style="--shiki-dark:#E1E4E8;--shiki-light:#24292E">></span></span>
<span class="line"><span style="--shiki-dark:#E1E4E8;--shiki-light:#24292E">          &#x3C;</span><span style="--shiki-dark:#79B8FF;--shiki-light:#005CC5">TableRow</span><span style="--shiki-dark:#E1E4E8;--shiki-light:#24292E">></span></span>
<span class="line"><span style="--shiki-dark:#E1E4E8;--shiki-light:#24292E">            &#x3C;</span><span style="--shiki-dark:#79B8FF;--shiki-light:#005CC5">TableCell</span><span style="--shiki-dark:#E1E4E8;--shiki-light:#24292E">>Callout&#x3C;/</span><span style="--shiki-dark:#79B8FF;--shiki-light:#005CC5">TableCell</span><span style="--shiki-dark:#E1E4E8;--shiki-light:#24292E">></span></span>
<span class="line"><span style="--shiki-dark:#E1E4E8;--shiki-light:#24292E">            &#x3C;</span><span style="--shiki-dark:#79B8FF;--shiki-light:#005CC5">TableCell</span><span style="--shiki-dark:#E1E4E8;--shiki-light:#24292E">>cva, utils&#x3C;/</span><span style="--shiki-dark:#79B8FF;--shiki-light:#005CC5">TableCell</span><span style="--shiki-dark:#E1E4E8;--shiki-light:#24292E">></span></span>
<span class="line"><span style="--shiki-dark:#E1E4E8;--shiki-light:#24292E">            &#x3C;</span><span style="--shiki-dark:#79B8FF;--shiki-light:#005CC5">TableCell</span><span style="--shiki-dark:#E1E4E8;--shiki-light:#24292E">>2.1 kB&#x3C;/</span><span style="--shiki-dark:#79B8FF;--shiki-light:#005CC5">TableCell</span><span style="--shiki-dark:#E1E4E8;--shiki-light:#24292E">></span></span>
<span class="line"><span style="--shiki-dark:#E1E4E8;--shiki-light:#24292E">          &#x3C;/</span><span style="--shiki-dark:#79B8FF;--shiki-light:#005CC5">TableRow</span><span style="--shiki-dark:#E1E4E8;--shiki-light:#24292E">></span></span>
<span class="line"><span style="--shiki-dark:#E1E4E8;--shiki-light:#24292E">        &#x3C;/</span><span style="--shiki-dark:#79B8FF;--shiki-light:#005CC5">TableBody</span><span style="--shiki-dark:#E1E4E8;--shiki-light:#24292E">></span></span>
<span class="line"><span style="--shiki-dark:#E1E4E8;--shiki-light:#24292E">      &#x3C;/</span><span style="--shiki-dark:#79B8FF;--shiki-light:#005CC5">Table</span><span style="--shiki-dark:#E1E4E8;--shiki-light:#24292E">></span></span>
<span class="line"><span style="--shiki-dark:#E1E4E8;--shiki-light:#24292E">    &#x3C;/</span><span style="--shiki-dark:#85E89D;--shiki-light:#22863A">div</span><span style="--shiki-dark:#E1E4E8;--shiki-light:#24292E">></span></span>
<span class="line"><span style="--shiki-dark:#E1E4E8;--shiki-light:#24292E">  )</span></span>
<span class="line"><span style="--shiki-dark:#E1E4E8;--shiki-light:#24292E">}</span></span>
<span class="line"></span></code></pre>`,
  },
  "tabs-default": {
    source: `"use client";
import {
  Tabs,
  TabsList,
  TabsTrigger,
  TabsContent,
} from "@/components/mdx/tabs";

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
  );
}
`,
    highlighted: `<pre class="shiki shiki-themes github-dark github-light" style="--shiki-dark:#e1e4e8;--shiki-light:#24292e;--shiki-dark-bg:#24292e;--shiki-light-bg:#fff" tabindex="0"><code><span class="line"><span style="--shiki-dark:#9ECBFF;--shiki-light:#032F62">"use client"</span><span style="--shiki-dark:#E1E4E8;--shiki-light:#24292E">;</span></span>
<span class="line"><span style="--shiki-dark:#F97583;--shiki-light:#D73A49">import</span><span style="--shiki-dark:#E1E4E8;--shiki-light:#24292E"> {</span></span>
<span class="line"><span style="--shiki-dark:#E1E4E8;--shiki-light:#24292E">  Tabs,</span></span>
<span class="line"><span style="--shiki-dark:#E1E4E8;--shiki-light:#24292E">  TabsList,</span></span>
<span class="line"><span style="--shiki-dark:#E1E4E8;--shiki-light:#24292E">  TabsTrigger,</span></span>
<span class="line"><span style="--shiki-dark:#E1E4E8;--shiki-light:#24292E">  TabsContent,</span></span>
<span class="line"><span style="--shiki-dark:#E1E4E8;--shiki-light:#24292E">} </span><span style="--shiki-dark:#F97583;--shiki-light:#D73A49">from</span><span style="--shiki-dark:#9ECBFF;--shiki-light:#032F62"> "@/components/mdx/tabs"</span><span style="--shiki-dark:#E1E4E8;--shiki-light:#24292E">;</span></span>
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
<span class="line"><span style="--shiki-dark:#E1E4E8;--shiki-light:#24292E">  );</span></span>
<span class="line"><span style="--shiki-dark:#E1E4E8;--shiki-light:#24292E">}</span></span>
<span class="line"></span></code></pre>`,
  },
  "terminal-default": {
    source: `import { Terminal, TerminalLine } from "@/components/mdx/terminal"

export default function TerminalDefault() {
  return (
    <Terminal title="Installing mdx-ui">
      <TerminalLine cmd>npx @ravikumarsurya/mdx-ui init</TerminalLine>
      <TerminalLine>✔ Created mdx-ui.json</TerminalLine>
      <TerminalLine cmd>npx @ravikumarsurya/mdx-ui add accordion badge callout</TerminalLine>
      <TerminalLine>✔ accordion</TerminalLine>
      <TerminalLine>✔ badge</TerminalLine>
      <TerminalLine>✔ callout</TerminalLine>
      <TerminalLine>Done! 🎉</TerminalLine>
    </Terminal>
  )
}
`,
    highlighted: `<pre class="shiki shiki-themes github-dark github-light" style="--shiki-dark:#e1e4e8;--shiki-light:#24292e;--shiki-dark-bg:#24292e;--shiki-light-bg:#fff" tabindex="0"><code><span class="line"><span style="--shiki-dark:#F97583;--shiki-light:#D73A49">import</span><span style="--shiki-dark:#E1E4E8;--shiki-light:#24292E"> { Terminal, TerminalLine } </span><span style="--shiki-dark:#F97583;--shiki-light:#D73A49">from</span><span style="--shiki-dark:#9ECBFF;--shiki-light:#032F62"> "@/components/mdx/terminal"</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-dark:#F97583;--shiki-light:#D73A49">export</span><span style="--shiki-dark:#F97583;--shiki-light:#D73A49"> default</span><span style="--shiki-dark:#F97583;--shiki-light:#D73A49"> function</span><span style="--shiki-dark:#B392F0;--shiki-light:#6F42C1"> TerminalDefault</span><span style="--shiki-dark:#E1E4E8;--shiki-light:#24292E">() {</span></span>
<span class="line"><span style="--shiki-dark:#F97583;--shiki-light:#D73A49">  return</span><span style="--shiki-dark:#E1E4E8;--shiki-light:#24292E"> (</span></span>
<span class="line"><span style="--shiki-dark:#E1E4E8;--shiki-light:#24292E">    &#x3C;</span><span style="--shiki-dark:#79B8FF;--shiki-light:#005CC5">Terminal</span><span style="--shiki-dark:#B392F0;--shiki-light:#6F42C1"> title</span><span style="--shiki-dark:#F97583;--shiki-light:#D73A49">=</span><span style="--shiki-dark:#9ECBFF;--shiki-light:#032F62">"Installing mdx-ui"</span><span style="--shiki-dark:#E1E4E8;--shiki-light:#24292E">></span></span>
<span class="line"><span style="--shiki-dark:#E1E4E8;--shiki-light:#24292E">      &#x3C;</span><span style="--shiki-dark:#79B8FF;--shiki-light:#005CC5">TerminalLine</span><span style="--shiki-dark:#B392F0;--shiki-light:#6F42C1"> cmd</span><span style="--shiki-dark:#E1E4E8;--shiki-light:#24292E">>npx @ravikumarsurya/mdx-ui init&#x3C;/</span><span style="--shiki-dark:#79B8FF;--shiki-light:#005CC5">TerminalLine</span><span style="--shiki-dark:#E1E4E8;--shiki-light:#24292E">></span></span>
<span class="line"><span style="--shiki-dark:#E1E4E8;--shiki-light:#24292E">      &#x3C;</span><span style="--shiki-dark:#79B8FF;--shiki-light:#005CC5">TerminalLine</span><span style="--shiki-dark:#E1E4E8;--shiki-light:#24292E">>✔ Created mdx-ui.json&#x3C;/</span><span style="--shiki-dark:#79B8FF;--shiki-light:#005CC5">TerminalLine</span><span style="--shiki-dark:#E1E4E8;--shiki-light:#24292E">></span></span>
<span class="line"><span style="--shiki-dark:#E1E4E8;--shiki-light:#24292E">      &#x3C;</span><span style="--shiki-dark:#79B8FF;--shiki-light:#005CC5">TerminalLine</span><span style="--shiki-dark:#B392F0;--shiki-light:#6F42C1"> cmd</span><span style="--shiki-dark:#E1E4E8;--shiki-light:#24292E">>npx @ravikumarsurya/mdx-ui add accordion badge callout&#x3C;/</span><span style="--shiki-dark:#79B8FF;--shiki-light:#005CC5">TerminalLine</span><span style="--shiki-dark:#E1E4E8;--shiki-light:#24292E">></span></span>
<span class="line"><span style="--shiki-dark:#E1E4E8;--shiki-light:#24292E">      &#x3C;</span><span style="--shiki-dark:#79B8FF;--shiki-light:#005CC5">TerminalLine</span><span style="--shiki-dark:#E1E4E8;--shiki-light:#24292E">>✔ accordion&#x3C;/</span><span style="--shiki-dark:#79B8FF;--shiki-light:#005CC5">TerminalLine</span><span style="--shiki-dark:#E1E4E8;--shiki-light:#24292E">></span></span>
<span class="line"><span style="--shiki-dark:#E1E4E8;--shiki-light:#24292E">      &#x3C;</span><span style="--shiki-dark:#79B8FF;--shiki-light:#005CC5">TerminalLine</span><span style="--shiki-dark:#E1E4E8;--shiki-light:#24292E">>✔ badge&#x3C;/</span><span style="--shiki-dark:#79B8FF;--shiki-light:#005CC5">TerminalLine</span><span style="--shiki-dark:#E1E4E8;--shiki-light:#24292E">></span></span>
<span class="line"><span style="--shiki-dark:#E1E4E8;--shiki-light:#24292E">      &#x3C;</span><span style="--shiki-dark:#79B8FF;--shiki-light:#005CC5">TerminalLine</span><span style="--shiki-dark:#E1E4E8;--shiki-light:#24292E">>✔ callout&#x3C;/</span><span style="--shiki-dark:#79B8FF;--shiki-light:#005CC5">TerminalLine</span><span style="--shiki-dark:#E1E4E8;--shiki-light:#24292E">></span></span>
<span class="line"><span style="--shiki-dark:#E1E4E8;--shiki-light:#24292E">      &#x3C;</span><span style="--shiki-dark:#79B8FF;--shiki-light:#005CC5">TerminalLine</span><span style="--shiki-dark:#E1E4E8;--shiki-light:#24292E">>Done! 🎉&#x3C;/</span><span style="--shiki-dark:#79B8FF;--shiki-light:#005CC5">TerminalLine</span><span style="--shiki-dark:#E1E4E8;--shiki-light:#24292E">></span></span>
<span class="line"><span style="--shiki-dark:#E1E4E8;--shiki-light:#24292E">    &#x3C;/</span><span style="--shiki-dark:#79B8FF;--shiki-light:#005CC5">Terminal</span><span style="--shiki-dark:#E1E4E8;--shiki-light:#24292E">></span></span>
<span class="line"><span style="--shiki-dark:#E1E4E8;--shiki-light:#24292E">  )</span></span>
<span class="line"><span style="--shiki-dark:#E1E4E8;--shiki-light:#24292E">}</span></span>
<span class="line"></span></code></pre>`,
  },
  "tree-default": {
    source: `"use client"
import { Tree, TreeItem } from "@/components/mdx/tree"

export default function TreeDefault() {
  return (
    <Tree>
      <TreeItem name="apps" isFolder defaultOpen>
        <TreeItem name="www" isFolder defaultOpen>
          <TreeItem name="components" isFolder defaultOpen>
            <TreeItem name="mdx-components.tsx" />
            <TreeItem name="component-preview.tsx" />
          </TreeItem>
          <TreeItem name="app" isFolder>
            <TreeItem name="page.tsx" />
            <TreeItem name="layout.tsx" />
          </TreeItem>
        </TreeItem>
      </TreeItem>
      <TreeItem name="packages" isFolder>
        <TreeItem name="cli" isFolder />
        <TreeItem name="registry" isFolder />
      </TreeItem>
    </Tree>
  )
}
`,
    highlighted: `<pre class="shiki shiki-themes github-dark github-light" style="--shiki-dark:#e1e4e8;--shiki-light:#24292e;--shiki-dark-bg:#24292e;--shiki-light-bg:#fff" tabindex="0"><code><span class="line"><span style="--shiki-dark:#9ECBFF;--shiki-light:#032F62">"use client"</span></span>
<span class="line"><span style="--shiki-dark:#F97583;--shiki-light:#D73A49">import</span><span style="--shiki-dark:#E1E4E8;--shiki-light:#24292E"> { Tree, TreeItem } </span><span style="--shiki-dark:#F97583;--shiki-light:#D73A49">from</span><span style="--shiki-dark:#9ECBFF;--shiki-light:#032F62"> "@/components/mdx/tree"</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-dark:#F97583;--shiki-light:#D73A49">export</span><span style="--shiki-dark:#F97583;--shiki-light:#D73A49"> default</span><span style="--shiki-dark:#F97583;--shiki-light:#D73A49"> function</span><span style="--shiki-dark:#B392F0;--shiki-light:#6F42C1"> TreeDefault</span><span style="--shiki-dark:#E1E4E8;--shiki-light:#24292E">() {</span></span>
<span class="line"><span style="--shiki-dark:#F97583;--shiki-light:#D73A49">  return</span><span style="--shiki-dark:#E1E4E8;--shiki-light:#24292E"> (</span></span>
<span class="line"><span style="--shiki-dark:#E1E4E8;--shiki-light:#24292E">    &#x3C;</span><span style="--shiki-dark:#79B8FF;--shiki-light:#005CC5">Tree</span><span style="--shiki-dark:#E1E4E8;--shiki-light:#24292E">></span></span>
<span class="line"><span style="--shiki-dark:#E1E4E8;--shiki-light:#24292E">      &#x3C;</span><span style="--shiki-dark:#79B8FF;--shiki-light:#005CC5">TreeItem</span><span style="--shiki-dark:#B392F0;--shiki-light:#6F42C1"> name</span><span style="--shiki-dark:#F97583;--shiki-light:#D73A49">=</span><span style="--shiki-dark:#9ECBFF;--shiki-light:#032F62">"apps"</span><span style="--shiki-dark:#B392F0;--shiki-light:#6F42C1"> isFolder</span><span style="--shiki-dark:#B392F0;--shiki-light:#6F42C1"> defaultOpen</span><span style="--shiki-dark:#E1E4E8;--shiki-light:#24292E">></span></span>
<span class="line"><span style="--shiki-dark:#E1E4E8;--shiki-light:#24292E">        &#x3C;</span><span style="--shiki-dark:#79B8FF;--shiki-light:#005CC5">TreeItem</span><span style="--shiki-dark:#B392F0;--shiki-light:#6F42C1"> name</span><span style="--shiki-dark:#F97583;--shiki-light:#D73A49">=</span><span style="--shiki-dark:#9ECBFF;--shiki-light:#032F62">"www"</span><span style="--shiki-dark:#B392F0;--shiki-light:#6F42C1"> isFolder</span><span style="--shiki-dark:#B392F0;--shiki-light:#6F42C1"> defaultOpen</span><span style="--shiki-dark:#E1E4E8;--shiki-light:#24292E">></span></span>
<span class="line"><span style="--shiki-dark:#E1E4E8;--shiki-light:#24292E">          &#x3C;</span><span style="--shiki-dark:#79B8FF;--shiki-light:#005CC5">TreeItem</span><span style="--shiki-dark:#B392F0;--shiki-light:#6F42C1"> name</span><span style="--shiki-dark:#F97583;--shiki-light:#D73A49">=</span><span style="--shiki-dark:#9ECBFF;--shiki-light:#032F62">"components"</span><span style="--shiki-dark:#B392F0;--shiki-light:#6F42C1"> isFolder</span><span style="--shiki-dark:#B392F0;--shiki-light:#6F42C1"> defaultOpen</span><span style="--shiki-dark:#E1E4E8;--shiki-light:#24292E">></span></span>
<span class="line"><span style="--shiki-dark:#E1E4E8;--shiki-light:#24292E">            &#x3C;</span><span style="--shiki-dark:#79B8FF;--shiki-light:#005CC5">TreeItem</span><span style="--shiki-dark:#B392F0;--shiki-light:#6F42C1"> name</span><span style="--shiki-dark:#F97583;--shiki-light:#D73A49">=</span><span style="--shiki-dark:#9ECBFF;--shiki-light:#032F62">"mdx-components.tsx"</span><span style="--shiki-dark:#E1E4E8;--shiki-light:#24292E"> /></span></span>
<span class="line"><span style="--shiki-dark:#E1E4E8;--shiki-light:#24292E">            &#x3C;</span><span style="--shiki-dark:#79B8FF;--shiki-light:#005CC5">TreeItem</span><span style="--shiki-dark:#B392F0;--shiki-light:#6F42C1"> name</span><span style="--shiki-dark:#F97583;--shiki-light:#D73A49">=</span><span style="--shiki-dark:#9ECBFF;--shiki-light:#032F62">"component-preview.tsx"</span><span style="--shiki-dark:#E1E4E8;--shiki-light:#24292E"> /></span></span>
<span class="line"><span style="--shiki-dark:#E1E4E8;--shiki-light:#24292E">          &#x3C;/</span><span style="--shiki-dark:#79B8FF;--shiki-light:#005CC5">TreeItem</span><span style="--shiki-dark:#E1E4E8;--shiki-light:#24292E">></span></span>
<span class="line"><span style="--shiki-dark:#E1E4E8;--shiki-light:#24292E">          &#x3C;</span><span style="--shiki-dark:#79B8FF;--shiki-light:#005CC5">TreeItem</span><span style="--shiki-dark:#B392F0;--shiki-light:#6F42C1"> name</span><span style="--shiki-dark:#F97583;--shiki-light:#D73A49">=</span><span style="--shiki-dark:#9ECBFF;--shiki-light:#032F62">"app"</span><span style="--shiki-dark:#B392F0;--shiki-light:#6F42C1"> isFolder</span><span style="--shiki-dark:#E1E4E8;--shiki-light:#24292E">></span></span>
<span class="line"><span style="--shiki-dark:#E1E4E8;--shiki-light:#24292E">            &#x3C;</span><span style="--shiki-dark:#79B8FF;--shiki-light:#005CC5">TreeItem</span><span style="--shiki-dark:#B392F0;--shiki-light:#6F42C1"> name</span><span style="--shiki-dark:#F97583;--shiki-light:#D73A49">=</span><span style="--shiki-dark:#9ECBFF;--shiki-light:#032F62">"page.tsx"</span><span style="--shiki-dark:#E1E4E8;--shiki-light:#24292E"> /></span></span>
<span class="line"><span style="--shiki-dark:#E1E4E8;--shiki-light:#24292E">            &#x3C;</span><span style="--shiki-dark:#79B8FF;--shiki-light:#005CC5">TreeItem</span><span style="--shiki-dark:#B392F0;--shiki-light:#6F42C1"> name</span><span style="--shiki-dark:#F97583;--shiki-light:#D73A49">=</span><span style="--shiki-dark:#9ECBFF;--shiki-light:#032F62">"layout.tsx"</span><span style="--shiki-dark:#E1E4E8;--shiki-light:#24292E"> /></span></span>
<span class="line"><span style="--shiki-dark:#E1E4E8;--shiki-light:#24292E">          &#x3C;/</span><span style="--shiki-dark:#79B8FF;--shiki-light:#005CC5">TreeItem</span><span style="--shiki-dark:#E1E4E8;--shiki-light:#24292E">></span></span>
<span class="line"><span style="--shiki-dark:#E1E4E8;--shiki-light:#24292E">        &#x3C;/</span><span style="--shiki-dark:#79B8FF;--shiki-light:#005CC5">TreeItem</span><span style="--shiki-dark:#E1E4E8;--shiki-light:#24292E">></span></span>
<span class="line"><span style="--shiki-dark:#E1E4E8;--shiki-light:#24292E">      &#x3C;/</span><span style="--shiki-dark:#79B8FF;--shiki-light:#005CC5">TreeItem</span><span style="--shiki-dark:#E1E4E8;--shiki-light:#24292E">></span></span>
<span class="line"><span style="--shiki-dark:#E1E4E8;--shiki-light:#24292E">      &#x3C;</span><span style="--shiki-dark:#79B8FF;--shiki-light:#005CC5">TreeItem</span><span style="--shiki-dark:#B392F0;--shiki-light:#6F42C1"> name</span><span style="--shiki-dark:#F97583;--shiki-light:#D73A49">=</span><span style="--shiki-dark:#9ECBFF;--shiki-light:#032F62">"packages"</span><span style="--shiki-dark:#B392F0;--shiki-light:#6F42C1"> isFolder</span><span style="--shiki-dark:#E1E4E8;--shiki-light:#24292E">></span></span>
<span class="line"><span style="--shiki-dark:#E1E4E8;--shiki-light:#24292E">        &#x3C;</span><span style="--shiki-dark:#79B8FF;--shiki-light:#005CC5">TreeItem</span><span style="--shiki-dark:#B392F0;--shiki-light:#6F42C1"> name</span><span style="--shiki-dark:#F97583;--shiki-light:#D73A49">=</span><span style="--shiki-dark:#9ECBFF;--shiki-light:#032F62">"cli"</span><span style="--shiki-dark:#B392F0;--shiki-light:#6F42C1"> isFolder</span><span style="--shiki-dark:#E1E4E8;--shiki-light:#24292E"> /></span></span>
<span class="line"><span style="--shiki-dark:#E1E4E8;--shiki-light:#24292E">        &#x3C;</span><span style="--shiki-dark:#79B8FF;--shiki-light:#005CC5">TreeItem</span><span style="--shiki-dark:#B392F0;--shiki-light:#6F42C1"> name</span><span style="--shiki-dark:#F97583;--shiki-light:#D73A49">=</span><span style="--shiki-dark:#9ECBFF;--shiki-light:#032F62">"registry"</span><span style="--shiki-dark:#B392F0;--shiki-light:#6F42C1"> isFolder</span><span style="--shiki-dark:#E1E4E8;--shiki-light:#24292E"> /></span></span>
<span class="line"><span style="--shiki-dark:#E1E4E8;--shiki-light:#24292E">      &#x3C;/</span><span style="--shiki-dark:#79B8FF;--shiki-light:#005CC5">TreeItem</span><span style="--shiki-dark:#E1E4E8;--shiki-light:#24292E">></span></span>
<span class="line"><span style="--shiki-dark:#E1E4E8;--shiki-light:#24292E">    &#x3C;/</span><span style="--shiki-dark:#79B8FF;--shiki-light:#005CC5">Tree</span><span style="--shiki-dark:#E1E4E8;--shiki-light:#24292E">></span></span>
<span class="line"><span style="--shiki-dark:#E1E4E8;--shiki-light:#24292E">  )</span></span>
<span class="line"><span style="--shiki-dark:#E1E4E8;--shiki-light:#24292E">}</span></span>
<span class="line"></span></code></pre>`,
  },
}
