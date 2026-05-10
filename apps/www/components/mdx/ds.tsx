"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

// ─── SVG cache + dark mode ────────────────────────────────────────────────────

const svgCache = new Map<string, string>();

function useDarkMode(): boolean {
  const [isDark, setIsDark] = React.useState(false);
  React.useEffect(() => {
    const check = () =>
      document.documentElement.classList.contains("dark") ||
      window.matchMedia("(prefers-color-scheme: dark)").matches;
    setIsDark(check());
    const observer = new MutationObserver(() => setIsDark(check()));
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class"],
    });
    const mq = window.matchMedia("(prefers-color-scheme: dark)");
    const onMqChange = () => setIsDark(check());
    mq.addEventListener("change", onMqChange);
    return () => {
      observer.disconnect();
      mq.removeEventListener("change", onMqChange);
    };
  }, []);
  return isDark;
}

// ─── Shared UI primitives ─────────────────────────────────────────────────────

const inputCls =
  "h-7 rounded border bg-background px-2 text-xs focus:outline-none focus:ring-1 focus:ring-ring";
const btnPCls =
  "h-7 rounded bg-primary px-2.5 text-xs text-primary-foreground hover:bg-primary/90 disabled:opacity-40 disabled:cursor-not-allowed transition-colors";
const btnOCls =
  "h-7 rounded border px-2.5 text-xs hover:bg-muted disabled:opacity-40 disabled:cursor-not-allowed transition-colors";

function DsInput({
  placeholder,
  width = "w-24",
  value,
  onChange,
  onEnter,
}: {
  placeholder: string;
  width?: string;
  value: string;
  onChange: (v: string) => void;
  onEnter: () => void;
}) {
  return (
    <input
      value={value}
      onChange={(e) => onChange(e.target.value)}
      onKeyDown={(e) => {
        if (e.key === "Enter") onEnter();
      }}
      placeholder={placeholder}
      className={cn(inputCls, width)}
    />
  );
}

// ─── Types ────────────────────────────────────────────────────────────────────

export interface DSStep {
  chart: string;
  description?: string;
}

const SPEEDS = [
  { label: "1×", ms: 1200 },
  { label: "2×", ms: 600 },
  { label: "3×", ms: 250 },
];

// ─── Base renderer ────────────────────────────────────────────────────────────
// Handles: static (chart), animated (steps), interactive (controls + live chart)

interface DSBaseProps {
  label: string;
  chart?: string;
  steps?: DSStep[];
  controls?: React.ReactNode; // interactive controls bar
  beta?: boolean;
  className?: string;
}

function DSBase({
  label,
  chart,
  steps,
  controls,
  beta,
  className,
}: DSBaseProps) {
  const isAnimated = (steps?.length ?? 0) > 0;
  const total = isAnimated ? steps!.length : 1;
  const [stepIdx, setStepIdx] = React.useState(0);
  const [playing, setPlaying] = React.useState(false);
  const [speedIdx, setSpeedIdx] = React.useState(0);
  const [svg, setSvg] = React.useState("");
  const [error, setError] = React.useState("");
  const baseId = React.useId().replace(/:/g, "");
  const renderRef = React.useRef(0);
  const isDark = useDarkMode();

  const safeIdx = Math.min(stepIdx, total - 1);
  const currentChart = isAnimated ? steps![safeIdx].chart : (chart ?? "");
  const currentDesc = isAnimated ? steps![safeIdx].description : undefined;

  React.useEffect(() => {
    setStepIdx(0);
    setPlaying(false);
  }, [steps]);

  React.useEffect(() => {
    if (!playing || !isAnimated) return;
    const timer = setInterval(() => {
      setStepIdx((prev) => {
        if (prev >= total - 1) {
          setPlaying(false);
          return prev;
        }
        return prev + 1;
      });
    }, SPEEDS[speedIdx].ms);
    return () => clearInterval(timer);
  }, [playing, speedIdx, total, isAnimated]);

  React.useEffect(() => {
    if (!currentChart) return;
    const cacheKey = `${currentChart}:${isDark}`;
    if (svgCache.has(cacheKey)) {
      setSvg(svgCache.get(cacheKey)!);
      setError("");
      return;
    }
    const myRender = ++renderRef.current;
    let cancelled = false;
    async function render() {
      try {
        const mermaid = (await import("mermaid")).default;
        mermaid.initialize({
          startOnLoad: false,
          theme: isDark ? "dark" : "neutral",
          securityLevel: "strict",
        });
        const { svg: rendered } = await mermaid.render(
          `ds-${baseId}-${myRender}`,
          currentChart,
        );
        if (!cancelled && renderRef.current === myRender) {
          svgCache.set(cacheKey, rendered);
          setSvg(rendered);
          setError("");
        }
      } catch (e) {
        if (!cancelled)
          setError(e instanceof Error ? e.message : "Render failed");
      }
    }
    render();
    return () => {
      cancelled = true;
    };
  }, [currentChart, baseId, isDark]);

  const btn =
    "rounded px-1.5 py-0.5 text-xs hover:bg-muted disabled:opacity-30 disabled:cursor-not-allowed transition-colors";

  if (error)
    return (
      <div className="my-4 rounded-lg border border-destructive/50 bg-destructive/10 p-4 text-sm text-destructive">
        Diagram error: {error}
      </div>
    );

  return (
    <div
      className={cn(
        "my-4 overflow-hidden rounded-lg border bg-background",
        className,
      )}
    >
      {/* Header */}
      <div className="flex items-center gap-2 border-b bg-muted/40 px-3 py-1.5">
        <span className="text-xs font-medium text-muted-foreground">
          {label}
        </span>
        {beta && (
          <span className="rounded-full border border-amber-400/50 bg-amber-100/60 px-1.5 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-amber-700 dark:border-amber-400/30 dark:bg-amber-400/10 dark:text-amber-400">
            Beta
          </span>
        )}
      </div>
      {/* Interactive controls */}
      {controls && (
        <div className="flex flex-wrap items-center gap-1.5 border-b bg-muted/10 px-3 py-2">
          {controls}
        </div>
      )}
      {/* Animated playback controls */}
      {isAnimated && (
        <div className="flex items-center justify-between border-b bg-muted/20 px-3 py-1 gap-2">
          <span className="text-[11px] text-muted-foreground truncate">
            <span className="font-medium text-foreground">{safeIdx + 1}</span>/
            {total}
            {currentDesc && <span className="ml-2">{currentDesc}</span>}
          </span>
          <div className="flex items-center gap-0.5 shrink-0">
            <button
              className={btn}
              onClick={() => {
                setStepIdx(0);
                setPlaying(false);
              }}
              disabled={safeIdx === 0}
            >
              ⏮
            </button>
            <button
              className={btn}
              onClick={() => setStepIdx((i) => Math.max(0, i - 1))}
              disabled={safeIdx === 0}
            >
              ‹
            </button>
            <button
              className={cn(btn, "w-7 font-medium")}
              onClick={() => {
                if (safeIdx >= total - 1) {
                  setStepIdx(0);
                  setPlaying(true);
                } else setPlaying((p) => !p);
              }}
            >
              {playing ? "⏸" : "▶"}
            </button>
            <button
              className={btn}
              onClick={() => setStepIdx((i) => Math.min(total - 1, i + 1))}
              disabled={safeIdx === total - 1}
            >
              ›
            </button>
            <button
              className={btn}
              onClick={() => {
                setStepIdx(total - 1);
                setPlaying(false);
              }}
              disabled={safeIdx === total - 1}
            >
              ⏭
            </button>
            <button
              className={cn(btn, "ml-2 font-mono")}
              onClick={() => setSpeedIdx((s) => (s + 1) % SPEEDS.length)}
            >
              {SPEEDS[speedIdx].label}
            </button>
          </div>
        </div>
      )}
      {/* Diagram */}
      {!svg ? (
        <div className="flex h-32 items-center justify-center">
          <span className="text-sm text-muted-foreground">Rendering…</span>
        </div>
      ) : (
        <div
          className="overflow-x-auto p-4"
          dangerouslySetInnerHTML={{ __html: svg }}
        />
      )}
    </div>
  );
}

// ─── Helpers ──────────────────────────────────────────────────────────────────

const sanitize = (s: string | number) =>
  String(s).replace(/[^a-zA-Z0-9_]/g, "_");
const q = (s: string | number) => `"${String(s).replace(/"/g, "'")}"`;
const CIRCLED = [
  "①",
  "②",
  "③",
  "④",
  "⑤",
  "⑥",
  "⑦",
  "⑧",
  "⑨",
  "⑩",
  "⑪",
  "⑫",
  "⑬",
  "⑭",
  "⑮",
  "⑯",
  "⑰",
  "⑱",
  "⑲",
  "⑳",
];

type AdjMap = Map<string, string[]>;
function buildAdj(
  nodes: string[],
  edges: [string, string][],
  directed: boolean,
): AdjMap {
  const adj: AdjMap = new Map(nodes.map((n) => [n, []]));
  for (const [a, b] of edges) {
    if (!adj.has(a)) adj.set(a, []);
    if (!adj.has(b)) adj.set(b, []);
    adj.get(a)!.push(b);
    if (!directed) adj.get(b)!.push(a);
  }
  return adj;
}
function hashBucket(key: string | number, buckets: number): number {
  return (
    Math.abs(
      String(key)
        .split("")
        .reduce((a, c) => a + c.charCodeAt(0), 0),
    ) % buckets
  );
}

// ─── Chart builders ───────────────────────────────────────────────────────────

function arrayChart(
  values: (string | number)[],
  highlight: number[],
  showIndex: boolean,
): string {
  if (!values.length) return "flowchart LR\n  empty([empty])";
  const nodes = values.map(
    (v, i) => `  N${i}${highlight.includes(i) ? `["${v}"]` : `[${q(v)}]`}`,
  );
  const edges = values.slice(1).map((_, i) => `  N${i} --- N${i + 1}`);
  const idx = showIndex
    ? values.map((_, i) => [`  I${i}([${i}])`, `  N${i} -.- I${i}`]).flat()
    : [];
  return ["flowchart LR", ...nodes, ...edges, ...idx].join("\n");
}

function linkedListChart(
  values: (string | number)[],
  showNull: boolean,
): string {
  if (!values.length) return "flowchart LR\n  empty([empty])";
  const nodes = values.map((v, i) => `  N${i}(["${v} | →"])`);
  const edges = values.slice(1).map((_, i) => `  N${i} --> N${i + 1}`);
  const tail = showNull
    ? [`  NULL(["NULL"])`, `  N${values.length - 1} --> NULL`]
    : [];
  return ["flowchart LR", ...nodes, ...edges, ...tail].join("\n");
}
function doublyListChart(
  values: (string | number)[],
  showNull: boolean,
): string {
  if (!values.length) return "flowchart LR\n  empty([empty])";
  const nodes = values.map((v, i) => `  N${i}(["← ${v} →"])`);
  const fwd = values.slice(1).map((_, i) => `  N${i} --> N${i + 1}`);
  const bwd = values.slice(1).map((_, i) => `  N${i + 1} --> N${i}`);
  const nulls = showNull
    ? [
        `  HN(["NULL"])`,
        `  TN(["NULL"])`,
        `  HN --> N0`,
        `  N${values.length - 1} --> TN`,
      ]
    : [];
  return ["flowchart LR", ...nodes, ...fwd, ...bwd, ...nulls].join("\n");
}
function circularListChart(values: (string | number)[]): string {
  if (!values.length) return "flowchart LR\n  empty([empty])";
  const nodes = values.map((v, i) => `  N${i}(["${v} →"])`);
  const edges = values.slice(1).map((_, i) => `  N${i} --> N${i + 1}`);
  return [
    "flowchart LR",
    ...nodes,
    ...edges,
    `  N${values.length - 1} --> N0`,
  ].join("\n");
}
function stackChart(items: (string | number)[]): string {
  if (!items.length) return "flowchart TD\n  empty([empty])";
  const rev = [...items].reverse();
  const nodes = rev.map((v, i) => `  S${i}[${q(v)}]`);
  const edges = rev.slice(1).map((_, i) => `  S${i} --- S${i + 1}`);
  return [
    "flowchart TD",
    ...nodes,
    ...edges,
    `  TOP(["← TOP"])`,
    `  TOP -.- S0`,
  ].join("\n");
}
function queueChart(items: (string | number)[]): string {
  if (!items.length) return "flowchart LR\n  empty([empty])";
  const nodes = items.map((v, i) => `  Q${i}[${q(v)}]`);
  const edges = items.slice(1).map((_, i) => `  Q${i} --> Q${i + 1}`);
  return [
    "flowchart LR",
    ...nodes,
    ...edges,
    `  FRONT(["FRONT ↓"])`,
    `  BACK(["↓ BACK"])`,
    `  FRONT -.- Q0`,
    `  BACK -.- Q${items.length - 1}`,
  ].join("\n");
}
function dequeChart(items: (string | number)[]): string {
  if (!items.length) return "flowchart LR\n  empty([empty])";
  const nodes = items.map((v, i) => `  D${i}[${q(v)}]`);
  const edges = items.slice(1).map((_, i) => `  D${i} <--> D${i + 1}`);
  return [
    "flowchart LR",
    ...nodes,
    ...edges,
    `  FL(["← Front"])`,
    `  BR(["Back →"])`,
    `  FL --- D0`,
    `  D${items.length - 1} --- BR`,
  ].join("\n");
}
function heapChart(arr: number[]): string {
  const nodes = arr.map((v, i) => `  H${i}((${v}))`);
  const edges: string[] = [];
  for (let i = 0; i < arr.length; i++) {
    const l = 2 * i + 1,
      r = 2 * i + 2;
    if (l < arr.length) edges.push(`  H${i} --- H${l}`);
    if (r < arr.length) edges.push(`  H${i} --- H${r}`);
  }
  return ["flowchart TD", ...nodes, ...edges].join("\n");
}

function graphTraversalChart(
  nodes: string[],
  edges: [string, string][],
  order: string[],
  directed: boolean,
): string {
  const orderMap = new Map(order.map((n, i) => [n, i + 1]));
  const arrow = directed ? "-->" : "---";
  const nodeDefs = nodes.map((n) => {
    const idx = orderMap.get(n);
    const badge = idx != null ? (CIRCLED[idx - 1] ?? String(idx)) + " " : "";
    return `  ${sanitize(n)}(("${badge}${n}"))`;
  });
  const seen = new Set<string>();
  const edgeDefs: string[] = [];
  for (const [a, b] of edges) {
    const key = directed ? `${a}→${b}` : [a, b].sort().join("—");
    if (!seen.has(key)) {
      seen.add(key);
      edgeDefs.push(`  ${sanitize(a)} ${arrow} ${sanitize(b)}`);
    }
  }
  return ["flowchart TD", ...nodeDefs, ...edgeDefs].join("\n");
}

// BST helpers
interface BSTNode {
  value: number;
  left?: BSTNode;
  right?: BSTNode;
}
function bstInsert(root: BSTNode | null, v: number): BSTNode {
  if (!root) return { value: v };
  if (v < root.value) return { ...root, left: bstInsert(root.left ?? null, v) };
  if (v > root.value)
    return { ...root, right: bstInsert(root.right ?? null, v) };
  return root;
}
function bstToChart(root: BSTNode | null): string {
  if (!root) return "flowchart TD\n  empty([empty])";
  const nodes: string[] = [],
    edges: string[] = [];
  let c = 0;
  function t(n: BSTNode): string {
    const id = `N${c++}`;
    nodes.push(`  ${id}((${n.value}))`);
    if (n.left) {
      const l = t(n.left);
      edges.push(`  ${id} --- ${l}`);
    }
    if (n.right) {
      const r = t(n.right);
      edges.push(`  ${id} --- ${r}`);
    }
    return id;
  }
  t(root);
  return ["flowchart TD", ...nodes, ...edges].join("\n");
}

// Heap build helpers
function buildHeap(arr: number[], isMin: boolean): number[] {
  const h = [...arr];
  const heapify = (n: number, i: number) => {
    let s = i,
      l = 2 * i + 1,
      r = 2 * i + 2;
    if (l < n && (isMin ? h[l] < h[s] : h[l] > h[s])) s = l;
    if (r < n && (isMin ? h[r] < h[s] : h[r] > h[s])) s = r;
    if (s !== i) {
      [h[i], h[s]] = [h[s], h[i]];
      heapify(n, s);
    }
  };
  for (let i = Math.floor(h.length / 2) - 1; i >= 0; i--) heapify(h.length, i);
  return h;
}
function heapInsert(heap: number[], v: number, isMin: boolean): number[] {
  const h = [...heap, v];
  let i = h.length - 1;
  while (i > 0) {
    const p = Math.floor((i - 1) / 2);
    if (isMin ? h[i] < h[p] : h[i] > h[p]) {
      [h[i], h[p]] = [h[p], h[i]];
      i = p;
    } else break;
  }
  return h;
}
function heapExtract(heap: number[], isMin: boolean): number[] {
  if (!heap.length) return [];
  const h = [...heap];
  h[0] = h[h.length - 1];
  h.pop();
  let i = 0;
  const heapify = (n: number, i: number) => {
    let s = i,
      l = 2 * i + 1,
      r = 2 * i + 2;
    if (l < n && (isMin ? h[l] < h[s] : h[l] > h[s])) s = l;
    if (r < n && (isMin ? h[r] < h[s] : h[r] > h[s])) s = r;
    if (s !== i) {
      [h[i], h[s]] = [h[s], h[i]];
      heapify(n, s);
    }
  };
  heapify(h.length, 0);
  return h;
}

// Trie helpers
interface TrieNode {
  children: Record<string, TrieNode>;
  isEnd: boolean;
}
function mkTrie(): TrieNode {
  return { children: {}, isEnd: false };
}
function insertTrie(root: TrieNode, word: string): TrieNode {
  // immutable insert
  function ins(node: TrieNode, i: number): TrieNode {
    if (i === word.length) return { ...node, isEnd: true };
    const ch = word[i];
    return {
      ...node,
      children: {
        ...node.children,
        [ch]: ins(node.children[ch] ?? mkTrie(), i + 1),
      },
    };
  }
  return ins(root, 0);
}
function trieToChart(root: TrieNode): string {
  const nodes = [`  ROOT((ROOT))`],
    edges: string[] = [];
  let c = 0;
  function t(node: TrieNode, pid: string) {
    for (const [ch, child] of Object.entries(node.children)) {
      const id = `T${c++}`;
      nodes.push(`  ${id}${child.isEnd ? `["${ch} *"]` : `((${ch}))`}`);
      edges.push(`  ${pid} --- ${id}`);
      t(child, id);
    }
  }
  t(root, "ROOT");
  return ["flowchart TD", ...nodes, ...edges].join("\n");
}

// ─── Step generators (for animated mode) ──────────────────────────────────────

function genArraySteps(
  values: (string | number)[],
  highlight: number[],
  showIndex: boolean,
): DSStep[] {
  const steps: DSStep[] = [
    { chart: arrayChart([], highlight, showIndex), description: "Empty array" },
  ];
  for (let i = 0; i < values.length; i++)
    steps.push({
      chart: arrayChart(values.slice(0, i + 1), highlight, showIndex),
      description: `Append ${values[i]} at index ${i}`,
    });
  return steps;
}
function genLinkedListSteps(
  values: (string | number)[],
  showNull: boolean,
): DSStep[] {
  const steps: DSStep[] = [
    { chart: linkedListChart([], showNull), description: "Empty" },
  ];
  for (let i = 0; i < values.length; i++)
    steps.push({
      chart: linkedListChart(values.slice(0, i + 1), showNull),
      description: `Append ${values[i]}`,
    });
  return steps;
}
function genDoublySteps(
  values: (string | number)[],
  showNull: boolean,
): DSStep[] {
  const steps: DSStep[] = [
    { chart: doublyListChart([], showNull), description: "Empty" },
  ];
  for (let i = 0; i < values.length; i++)
    steps.push({
      chart: doublyListChart(values.slice(0, i + 1), showNull),
      description: `Append ${values[i]}`,
    });
  return steps;
}
function genCircularSteps(values: (string | number)[]): DSStep[] {
  const steps: DSStep[] = [
    { chart: circularListChart([]), description: "Empty" },
  ];
  for (let i = 0; i < values.length; i++)
    steps.push({
      chart: circularListChart(values.slice(0, i + 1)),
      description:
        i === values.length - 1
          ? `Append ${values[i]} → closes circle`
          : `Append ${values[i]}`,
    });
  return steps;
}
function genStackSteps(items: (string | number)[]): DSStep[] {
  const steps: DSStep[] = [{ chart: stackChart([]), description: "Empty" }];
  for (let i = 0; i < items.length; i++)
    steps.push({
      chart: stackChart(items.slice(0, i + 1)),
      description: `Push ${items[i]}`,
    });
  return steps;
}
function genQueueSteps(items: (string | number)[]): DSStep[] {
  const steps: DSStep[] = [{ chart: queueChart([]), description: "Empty" }];
  for (let i = 0; i < items.length; i++)
    steps.push({
      chart: queueChart(items.slice(0, i + 1)),
      description: `Enqueue ${items[i]}`,
    });
  return steps;
}
function genDequeSteps(items: (string | number)[]): DSStep[] {
  const steps: DSStep[] = [{ chart: dequeChart([]), description: "Empty" }];
  for (let i = 0; i < items.length; i++)
    steps.push({
      chart: dequeChart(items.slice(0, i + 1)),
      description: `Add ${items[i]}`,
    });
  return steps;
}
function genBSTSteps(values: number[]): DSStep[] {
  const steps: DSStep[] = [
    { chart: bstToChart(null), description: "Empty BST" },
  ];
  let root: BSTNode | null = null;
  for (const v of values) {
    root = bstInsert(root, v);
    steps.push({ chart: bstToChart(root), description: `Insert ${v}` });
  }
  return steps;
}
function genHeapSteps(values: number[], isMin: boolean): DSStep[] {
  const h = [...values];
  const steps: DSStep[] = [
    { chart: heapChart([...h]), description: "Initial array" },
  ];
  const heapify = (n: number, i: number) => {
    let s = i,
      l = 2 * i + 1,
      r = 2 * i + 2;
    if (l < n && (isMin ? h[l] < h[s] : h[l] > h[s])) s = l;
    if (r < n && (isMin ? h[r] < h[s] : h[r] > h[s])) s = r;
    if (s !== i) {
      const [a, b] = [h[i], h[s]];
      [h[i], h[s]] = [h[s], h[i]];
      steps.push({ chart: heapChart([...h]), description: `Swap ${a} ↔ ${b}` });
      heapify(n, s);
    }
  };
  for (let i = Math.floor(h.length / 2) - 1; i >= 0; i--) heapify(h.length, i);
  return steps;
}
function genTrieSteps(words: string[]): DSStep[] {
  let root = mkTrie();
  const steps: DSStep[] = [
    { chart: trieToChart(root), description: "Empty trie" },
  ];
  for (const w of words) {
    root = insertTrie(root, w);
    steps.push({ chart: trieToChart(root), description: `Insert "${w}"` });
  }
  return steps;
}
function genBFSSteps(
  nodes: string[],
  edges: [string, string][],
  start: string,
  directed: boolean,
): DSStep[] {
  const adj = buildAdj(nodes, edges, directed);
  const steps: DSStep[] = [
    {
      chart: graphTraversalChart(nodes, edges, [], directed),
      description: "Initial",
    },
  ];
  const order: string[] = [],
    queue = [start],
    seen = new Set([start]);
  while (queue.length) {
    const n = queue.shift()!;
    order.push(n);
    steps.push({
      chart: graphTraversalChart(nodes, edges, [...order], directed),
      description: `Visit ${n} ${CIRCLED[order.length - 1] ?? ""}`,
    });
    for (const nb of adj.get(n) ?? []) {
      if (!seen.has(nb)) {
        seen.add(nb);
        queue.push(nb);
      }
    }
  }
  return steps;
}
function genDFSSteps(
  nodes: string[],
  edges: [string, string][],
  start: string,
  directed: boolean,
): DSStep[] {
  const adj = buildAdj(nodes, edges, directed);
  const steps: DSStep[] = [
    {
      chart: graphTraversalChart(nodes, edges, [], directed),
      description: "Initial",
    },
  ];
  const order: string[] = [],
    seen = new Set<string>();
  function dfs(n: string) {
    seen.add(n);
    order.push(n);
    steps.push({
      chart: graphTraversalChart(nodes, edges, [...order], directed),
      description: `Visit ${n} ${CIRCLED[order.length - 1] ?? ""}`,
    });
    for (const nb of adj.get(n) ?? []) {
      if (!seen.has(nb)) dfs(nb);
    }
  }
  dfs(start);
  return steps;
}
function genGraphBuildSteps(
  nodes: string[],
  edges: [string, string][],
  directed: boolean,
): DSStep[] {
  const arrow = directed ? "-->" : "---";
  const steps: DSStep[] = [];
  for (let i = 1; i <= nodes.length; i++) {
    const defs = nodes.slice(0, i).map((n) => `  ${sanitize(n)}((${q(n)}))`);
    steps.push({
      chart: ["flowchart TD", ...defs].join("\n"),
      description: `Add node ${nodes[i - 1]}`,
    });
  }
  const allNodes = nodes.map((n) => `  ${sanitize(n)}((${q(n)}))`);
  const addedEdges: string[] = [];
  for (const [a, b] of edges) {
    addedEdges.push(`  ${sanitize(a)} ${arrow} ${sanitize(b)}`);
    steps.push({
      chart: ["flowchart TD", ...allNodes, ...addedEdges].join("\n"),
      description: `Edge ${a} → ${b}`,
    });
  }
  return steps;
}

// ─── Components ───────────────────────────────────────────────────────────────

// 1. Array ─────────────────────────────────────────────────────────────────────

export interface DSArrayProps {
  values?: (string | number)[];
  highlight?: number[];
  showIndex?: boolean;
  animated?: boolean;
  interactive?: boolean;
  className?: string;
}

/**
 * Array visualization. Add `interactive` for a live input panel; `animated` to step through insertions.
 * @example
 * <DSArray interactive />
 * <DSArray values={[10, 20, 30]} animated />
 */
export function DSArray({
  values: init = [],
  highlight = [],
  showIndex = true,
  animated = false,
  interactive = false,
  className,
}: DSArrayProps) {
  const [values, setValues] = React.useState<(string | number)[]>(init);
  const [input, setInput] = React.useState("");

  const append = () => {
    if (!input.trim()) return;
    setValues((v) => [...v, input.trim()]);
    setInput("");
  };

  const controls = interactive ? (
    <>
      <DsInput
        placeholder="value…"
        value={input}
        onChange={setInput}
        onEnter={append}
      />
      <button onClick={append} disabled={!input.trim()} className={btnPCls}>
        Append
      </button>
      <button
        onClick={() => setValues((v) => v.slice(0, -1))}
        disabled={!values.length}
        className={btnOCls}
      >
        Remove Last
      </button>
      <button
        onClick={() => setValues([])}
        disabled={!values.length}
        className={btnOCls}
      >
        Clear
      </button>
      <span className="ml-auto text-[11px] text-muted-foreground">
        length: {values.length}
      </span>
    </>
  ) : undefined;

  const src = interactive ? values : init;
  return (
    <DSBase
      label="Array"
      beta
      className={className}
      controls={controls}
      chart={!animated ? arrayChart(src, highlight, showIndex) : undefined}
      steps={
        animated && !interactive
          ? genArraySteps(src, highlight, showIndex)
          : undefined
      }
    />
  );
}

// 2. Matrix ────────────────────────────────────────────────────────────────────

export interface DSMatrixProps {
  values: (string | number)[][];
  highlight?: [number, number][];
  animated?: boolean;
  className?: string;
}

function matrixChart(
  values: (string | number)[][],
  highlight: [number, number][],
  rows: number,
): string {
  const isHL = (r: number, c: number) =>
    highlight.some(([hr, hc]) => hr === r && hc === c);
  const nodes: string[] = [],
    rowEdges: string[] = [],
    colEdges: string[] = [];
  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < values[r].length; c++) {
      const v = values[r][c];
      nodes.push(`  M${r}_${c}${isHL(r, c) ? `["${v}"]` : `[${q(v)}]`}`);
      if (c > 0) rowEdges.push(`  M${r}_${c - 1} --- M${r}_${c}`);
    }
    if (r > 0)
      for (let c = 0; c < values[r].length; c++)
        colEdges.push(`  M${r - 1}_${c} --- M${r}_${c}`);
  }
  return ["flowchart TD", ...nodes, ...rowEdges, ...colEdges].join("\n");
}

/** @example <DSMatrix values={[[1,2,3],[4,5,6],[7,8,9]]} animated /> */
export function DSMatrix({
  values,
  highlight = [],
  animated = false,
  className,
}: DSMatrixProps) {
  const steps = animated
    ? values.map((_, r) => ({
        chart: matrixChart(values, highlight, r + 1),
        description: `Add row ${r}`,
      }))
    : undefined;
  return (
    <DSBase
      label="Matrix"
      beta
      className={className}
      chart={
        !animated ? matrixChart(values, highlight, values.length) : undefined
      }
      steps={steps}
    />
  );
}

// 3. Linked List ───────────────────────────────────────────────────────────────

export interface DSLinkedListProps {
  values?: (string | number)[];
  showNull?: boolean;
  animated?: boolean;
  interactive?: boolean;
  className?: string;
}

/** @example <DSLinkedList interactive /> */
export function DSLinkedList({
  values: init = [],
  showNull = true,
  animated = false,
  interactive = false,
  className,
}: DSLinkedListProps) {
  const [values, setValues] = React.useState<(string | number)[]>(init);
  const [input, setInput] = React.useState("");
  const append = () => {
    if (!input.trim()) return;
    setValues((v) => [...v, input.trim()]);
    setInput("");
  };
  const controls = interactive ? (
    <>
      <DsInput
        placeholder="value…"
        value={input}
        onChange={setInput}
        onEnter={append}
      />
      <button onClick={append} disabled={!input.trim()} className={btnPCls}>
        Append
      </button>
      <button
        onClick={() => setValues((v) => v.slice(1))}
        disabled={!values.length}
        className={btnOCls}
      >
        Remove Head
      </button>
      <button
        onClick={() => setValues((v) => v.slice(0, -1))}
        disabled={!values.length}
        className={btnOCls}
      >
        Remove Tail
      </button>
      <button
        onClick={() => setValues([])}
        disabled={!values.length}
        className={btnOCls}
      >
        Clear
      </button>
    </>
  ) : undefined;
  const src = interactive ? values : init;
  return (
    <DSBase
      label="Singly Linked List"
      beta
      className={className}
      controls={controls}
      chart={!animated ? linkedListChart(src, showNull) : undefined}
      steps={
        animated && !interactive ? genLinkedListSteps(src, showNull) : undefined
      }
    />
  );
}

// 4. Doubly Linked List ────────────────────────────────────────────────────────

export interface DSDoublyLinkedListProps {
  values?: (string | number)[];
  showNull?: boolean;
  animated?: boolean;
  interactive?: boolean;
  className?: string;
}

/** @example <DSDoublyLinkedList interactive /> */
export function DSDoublyLinkedList({
  values: init = [],
  showNull = true,
  animated = false,
  interactive = false,
  className,
}: DSDoublyLinkedListProps) {
  const [values, setValues] = React.useState<(string | number)[]>(init);
  const [input, setInput] = React.useState("");
  const append = () => {
    if (!input.trim()) return;
    setValues((v) => [...v, input.trim()]);
    setInput("");
  };
  const controls = interactive ? (
    <>
      <DsInput
        placeholder="value…"
        value={input}
        onChange={setInput}
        onEnter={append}
      />
      <button onClick={append} disabled={!input.trim()} className={btnPCls}>
        Append
      </button>
      <button
        onClick={() => setValues((v) => v.slice(1))}
        disabled={!values.length}
        className={btnOCls}
      >
        Remove Head
      </button>
      <button
        onClick={() => setValues((v) => v.slice(0, -1))}
        disabled={!values.length}
        className={btnOCls}
      >
        Remove Tail
      </button>
      <button
        onClick={() => setValues([])}
        disabled={!values.length}
        className={btnOCls}
      >
        Clear
      </button>
    </>
  ) : undefined;
  const src = interactive ? values : init;
  return (
    <DSBase
      label="Doubly Linked List"
      beta
      className={className}
      controls={controls}
      chart={!animated ? doublyListChart(src, showNull) : undefined}
      steps={
        animated && !interactive ? genDoublySteps(src, showNull) : undefined
      }
    />
  );
}

// 5. Circular Linked List ─────────────────────────────────────────────────────

export interface DSCircularLinkedListProps {
  values?: (string | number)[];
  animated?: boolean;
  interactive?: boolean;
  className?: string;
}

/** @example <DSCircularLinkedList interactive /> */
export function DSCircularLinkedList({
  values: init = [],
  animated = false,
  interactive = false,
  className,
}: DSCircularLinkedListProps) {
  const [values, setValues] = React.useState<(string | number)[]>(init);
  const [input, setInput] = React.useState("");
  const append = () => {
    if (!input.trim()) return;
    setValues((v) => [...v, input.trim()]);
    setInput("");
  };
  const controls = interactive ? (
    <>
      <DsInput
        placeholder="value…"
        value={input}
        onChange={setInput}
        onEnter={append}
      />
      <button onClick={append} disabled={!input.trim()} className={btnPCls}>
        Append
      </button>
      <button
        onClick={() => setValues((v) => v.slice(0, -1))}
        disabled={!values.length}
        className={btnOCls}
      >
        Remove Tail
      </button>
      <button
        onClick={() => setValues([])}
        disabled={!values.length}
        className={btnOCls}
      >
        Clear
      </button>
    </>
  ) : undefined;
  const src = interactive ? values : init;
  return (
    <DSBase
      label="Circular Linked List"
      beta
      className={className}
      controls={controls}
      chart={!animated ? circularListChart(src) : undefined}
      steps={animated && !interactive ? genCircularSteps(src) : undefined}
    />
  );
}

// 6. Stack ─────────────────────────────────────────────────────────────────────

export interface DSStackProps {
  items?: (string | number)[];
  animated?: boolean;
  interactive?: boolean;
  className?: string;
}

/** @example <DSStack interactive /> */
export function DSStack({
  items: init = [],
  animated = false,
  interactive = false,
  className,
}: DSStackProps) {
  const [items, setItems] = React.useState<(string | number)[]>(init);
  const [input, setInput] = React.useState("");
  const push = () => {
    if (!input.trim()) return;
    setItems((v) => [...v, input.trim()]);
    setInput("");
  };
  const controls = interactive ? (
    <>
      <DsInput
        placeholder="value…"
        value={input}
        onChange={setInput}
        onEnter={push}
      />
      <button onClick={push} disabled={!input.trim()} className={btnPCls}>
        Push
      </button>
      <button
        onClick={() => setItems((v) => v.slice(0, -1))}
        disabled={!items.length}
        className={btnOCls}
      >
        Pop
      </button>
      <button
        onClick={() => setItems([])}
        disabled={!items.length}
        className={btnOCls}
      >
        Clear
      </button>
      {items.length > 0 && (
        <span className="text-[11px] text-muted-foreground">
          top: <b>{items[items.length - 1]}</b>
        </span>
      )}
    </>
  ) : undefined;
  const src = interactive ? items : init;
  return (
    <DSBase
      label="Stack"
      beta
      className={className}
      controls={controls}
      chart={!animated ? stackChart(src) : undefined}
      steps={animated && !interactive ? genStackSteps(src) : undefined}
    />
  );
}

// 7. Queue ─────────────────────────────────────────────────────────────────────

export interface DSQueueProps {
  items?: (string | number)[];
  animated?: boolean;
  interactive?: boolean;
  className?: string;
}

/** @example <DSQueue interactive /> */
export function DSQueue({
  items: init = [],
  animated = false,
  interactive = false,
  className,
}: DSQueueProps) {
  const [items, setItems] = React.useState<(string | number)[]>(init);
  const [input, setInput] = React.useState("");
  const enqueue = () => {
    if (!input.trim()) return;
    setItems((v) => [...v, input.trim()]);
    setInput("");
  };
  const controls = interactive ? (
    <>
      <DsInput
        placeholder="value…"
        value={input}
        onChange={setInput}
        onEnter={enqueue}
      />
      <button onClick={enqueue} disabled={!input.trim()} className={btnPCls}>
        Enqueue
      </button>
      <button
        onClick={() => setItems((v) => v.slice(1))}
        disabled={!items.length}
        className={btnOCls}
      >
        Dequeue
      </button>
      <button
        onClick={() => setItems([])}
        disabled={!items.length}
        className={btnOCls}
      >
        Clear
      </button>
      {items.length > 0 && (
        <span className="text-[11px] text-muted-foreground">
          front: <b>{items[0]}</b>
        </span>
      )}
    </>
  ) : undefined;
  const src = interactive ? items : init;
  return (
    <DSBase
      label="Queue"
      beta
      className={className}
      controls={controls}
      chart={!animated ? queueChart(src) : undefined}
      steps={animated && !interactive ? genQueueSteps(src) : undefined}
    />
  );
}

// 8. Deque ─────────────────────────────────────────────────────────────────────

export interface DSDequeProps {
  items?: (string | number)[];
  animated?: boolean;
  interactive?: boolean;
  className?: string;
}

/** @example <DSDeque interactive /> */
export function DSDeque({
  items: init = [],
  animated = false,
  interactive = false,
  className,
}: DSDequeProps) {
  const [items, setItems] = React.useState<(string | number)[]>(init);
  const [input, setInput] = React.useState("");
  const controls = interactive ? (
    <>
      <DsInput
        placeholder="value…"
        value={input}
        onChange={setInput}
        onEnter={() => {
          if (input.trim()) {
            setItems((v) => [...v, input.trim()]);
            setInput("");
          }
        }}
      />
      <button
        onClick={() => {
          if (input.trim()) {
            setItems((v) => [input.trim(), ...v]);
            setInput("");
          }
        }}
        disabled={!input.trim()}
        className={btnPCls}
      >
        Push Front
      </button>
      <button
        onClick={() => {
          if (input.trim()) {
            setItems((v) => [...v, input.trim()]);
            setInput("");
          }
        }}
        disabled={!input.trim()}
        className={btnPCls}
      >
        Push Back
      </button>
      <button
        onClick={() => setItems((v) => v.slice(1))}
        disabled={!items.length}
        className={btnOCls}
      >
        Pop Front
      </button>
      <button
        onClick={() => setItems((v) => v.slice(0, -1))}
        disabled={!items.length}
        className={btnOCls}
      >
        Pop Back
      </button>
      <button
        onClick={() => setItems([])}
        disabled={!items.length}
        className={btnOCls}
      >
        Clear
      </button>
    </>
  ) : undefined;
  const src = interactive ? items : init;
  return (
    <DSBase
      label="Deque"
      beta
      className={className}
      controls={controls}
      chart={!animated ? dequeChart(src) : undefined}
      steps={animated && !interactive ? genDequeSteps(src) : undefined}
    />
  );
}

// 9. Priority Queue ────────────────────────────────────────────────────────────

export interface DSPriorityQueueProps {
  items?: { value: string | number; priority: number }[];
  type?: "min" | "max";
  animated?: boolean;
  interactive?: boolean;
  className?: string;
}

function pqChart(
  items: { value: string | number; priority: number }[],
  type: "min" | "max",
): string {
  const sorted = [...items].sort((a, b) =>
    type === "min" ? a.priority - b.priority : b.priority - a.priority,
  );
  const nodes = sorted.map(
    (item, i) => `  P${i}[${q(`${item.value} [p=${item.priority}]`)}]`,
  );
  const edges = sorted.slice(1).map((_, i) => `  P${i} --> P${i + 1}`);
  return ["flowchart LR", ...nodes, ...edges].join("\n");
}

/** @example <DSPriorityQueue interactive type="min" /> */
export function DSPriorityQueue({
  items: init = [],
  type = "min",
  animated = false,
  interactive = false,
  className,
}: DSPriorityQueueProps) {
  const [items, setItems] =
    React.useState<{ value: string | number; priority: number }[]>(init);
  const [val, setVal] = React.useState("");
  const [pri, setPri] = React.useState("");
  const insert = () => {
    const p = Number(pri);
    if (!val.trim() || isNaN(p)) return;
    setItems((v) => [...v, { value: val.trim(), priority: p }]);
    setVal("");
    setPri("");
  };
  const label = type === "min" ? "Min-Priority Queue" : "Max-Priority Queue";
  const controls = interactive ? (
    <>
      <DsInput
        placeholder="value…"
        width="w-20"
        value={val}
        onChange={setVal}
        onEnter={insert}
      />
      <DsInput
        placeholder="priority…"
        width="w-20"
        value={pri}
        onChange={setPri}
        onEnter={insert}
      />
      <button
        onClick={insert}
        disabled={!val.trim() || isNaN(Number(pri))}
        className={btnPCls}
      >
        Insert
      </button>
      <button
        onClick={() => {
          const sorted = [...items].sort((a, b) =>
            type === "min" ? a.priority - b.priority : b.priority - a.priority,
          );
          setItems(sorted.slice(1));
        }}
        disabled={!items.length}
        className={btnOCls}
      >
        {type === "min" ? "Extract Min" : "Extract Max"}
      </button>
      <button
        onClick={() => setItems([])}
        disabled={!items.length}
        className={btnOCls}
      >
        Clear
      </button>
    </>
  ) : undefined;
  const src = interactive ? items : init;
  return (
    <DSBase
      label={label}
      beta
      className={className}
      controls={controls}
      chart={!animated ? pqChart(src, type) : undefined}
      steps={
        animated && !interactive
          ? src.map((_, i) => ({
              chart: pqChart(src.slice(0, i + 1), type),
              description: `Insert ${src[i].value}`,
            }))
          : undefined
      }
    />
  );
}

// 10. Binary Tree (static/animated only) ───────────────────────────────────────

export interface DSTreeNode {
  label: string | number;
  left?: DSTreeNode;
  right?: DSTreeNode;
}
export interface DSBinaryTreeProps {
  root: DSTreeNode;
  animated?: boolean;
  className?: string;
}

function btToChart(root: DSTreeNode): string {
  const nodes: string[] = [],
    edges: string[] = [];
  let c = 0;
  function t(n: DSTreeNode): string {
    const id = `BT${c++}`;
    nodes.push(`  ${id}((${q(n.label)}))`);
    if (n.left) {
      const l = t(n.left);
      edges.push(`  ${id} --- ${l}`);
    }
    if (n.right) {
      const r = t(n.right);
      edges.push(`  ${id} --- ${r}`);
    }
    return id;
  }
  t(root);
  return ["flowchart TD", ...nodes, ...edges].join("\n");
}
function genBinaryTreeSteps(root: DSTreeNode): DSStep[] {
  type Q = { node: DSTreeNode; pid: string | null };
  const all: Array<{ id: string; label: string | number; pid: string | null }> =
    [];
  let c = 0;
  const queue: Q[] = [{ node: root, pid: null }];
  while (queue.length) {
    const { node, pid } = queue.shift()!;
    const id = `BT${c++}`;
    all.push({ id, label: node.label, pid });
    if (node.left) queue.push({ node: node.left, pid: id });
    if (node.right) queue.push({ node: node.right, pid: id });
  }
  return all.map((_, i) => {
    const partial = all.slice(0, i + 1);
    const nodes = partial.map(({ id, label }) => `  ${id}((${q(label)}))`);
    const edges = partial
      .filter(({ pid }) => pid !== null)
      .map(({ id, pid }) => `  ${pid} --- ${id}`);
    return {
      chart: ["flowchart TD", ...nodes, ...edges].join("\n"),
      description: `Add node ${all[i].label}`,
    };
  });
}

/** @example <DSBinaryTree root={{ label: 1, left: { label: 2 }, right: { label: 3 } }} animated /> */
export function DSBinaryTree({
  root,
  animated = false,
  className,
}: DSBinaryTreeProps) {
  return (
    <DSBase
      label="Binary Tree"
      beta
      className={className}
      chart={!animated ? btToChart(root) : undefined}
      steps={animated ? genBinaryTreeSteps(root) : undefined}
    />
  );
}

// 11. BST ─────────────────────────────────────────────────────────────────────

export interface DSBSTProps {
  values?: number[];
  animated?: boolean;
  interactive?: boolean;
  className?: string;
}

/** @example <DSBST interactive /> */
export function DSBST({
  values: init = [],
  animated = false,
  interactive = false,
  className,
}: DSBSTProps) {
  const [values, setValues] = React.useState<number[]>(init);
  const [input, setInput] = React.useState("");
  const insert = () => {
    const n = Number(input);
    if (isNaN(n) || !input.trim()) return;
    setValues((v) => [...v, n]);
    setInput("");
  };
  const controls = interactive ? (
    <>
      <DsInput
        placeholder="number…"
        value={input}
        onChange={setInput}
        onEnter={insert}
      />
      <button
        onClick={insert}
        disabled={!input.trim() || isNaN(Number(input))}
        className={btnPCls}
      >
        Insert
      </button>
      <button
        onClick={() => setValues((v) => v.slice(0, -1))}
        disabled={!values.length}
        className={btnOCls}
      >
        Undo Last
      </button>
      <button
        onClick={() => setValues([])}
        disabled={!values.length}
        className={btnOCls}
      >
        Clear
      </button>
      <span className="text-[11px] text-muted-foreground">
        nodes: {values.length}
      </span>
    </>
  ) : undefined;
  const src = interactive ? values : init;
  const root = src.reduce<BSTNode | null>((r, v) => bstInsert(r, v), null);
  return (
    <DSBase
      label="Binary Search Tree"
      beta
      className={className}
      controls={controls}
      chart={!animated ? bstToChart(root) : undefined}
      steps={animated && !interactive ? genBSTSteps(src) : undefined}
    />
  );
}

// 12. Min Heap ─────────────────────────────────────────────────────────────────

export interface DSMinHeapProps {
  values?: number[];
  animated?: boolean;
  interactive?: boolean;
  className?: string;
}

/** @example <DSMinHeap interactive /> */
export function DSMinHeap({
  values: init = [],
  animated = false,
  interactive = false,
  className,
}: DSMinHeapProps) {
  const [heap, setHeap] = React.useState<number[]>(() => buildHeap(init, true));
  const [input, setInput] = React.useState("");
  const insert = () => {
    const n = Number(input);
    if (isNaN(n) || !input.trim()) return;
    setHeap((h) => heapInsert(h, n, true));
    setInput("");
  };
  const controls = interactive ? (
    <>
      <DsInput
        placeholder="number…"
        value={input}
        onChange={setInput}
        onEnter={insert}
      />
      <button
        onClick={insert}
        disabled={!input.trim() || isNaN(Number(input))}
        className={btnPCls}
      >
        Insert
      </button>
      <button
        onClick={() => setHeap((h) => heapExtract(h, true))}
        disabled={!heap.length}
        className={btnOCls}
      >
        Extract Min
      </button>
      <button
        onClick={() => setHeap([])}
        disabled={!heap.length}
        className={btnOCls}
      >
        Clear
      </button>
      {heap.length > 0 && (
        <span className="text-[11px] text-muted-foreground">
          min: <b>{heap[0]}</b>
        </span>
      )}
    </>
  ) : undefined;
  return (
    <DSBase
      label="Min Heap"
      beta
      className={className}
      controls={controls}
      chart={
        interactive
          ? heapChart(heap)
          : !animated
            ? heapChart(buildHeap(init, true))
            : undefined
      }
      steps={animated && !interactive ? genHeapSteps(init, true) : undefined}
    />
  );
}

// 13. Max Heap ─────────────────────────────────────────────────────────────────

export interface DSMaxHeapProps {
  values?: number[];
  animated?: boolean;
  interactive?: boolean;
  className?: string;
}

/** @example <DSMaxHeap interactive /> */
export function DSMaxHeap({
  values: init = [],
  animated = false,
  interactive = false,
  className,
}: DSMaxHeapProps) {
  const [heap, setHeap] = React.useState<number[]>(() =>
    buildHeap(init, false),
  );
  const [input, setInput] = React.useState("");
  const insert = () => {
    const n = Number(input);
    if (isNaN(n) || !input.trim()) return;
    setHeap((h) => heapInsert(h, n, false));
    setInput("");
  };
  const controls = interactive ? (
    <>
      <DsInput
        placeholder="number…"
        value={input}
        onChange={setInput}
        onEnter={insert}
      />
      <button
        onClick={insert}
        disabled={!input.trim() || isNaN(Number(input))}
        className={btnPCls}
      >
        Insert
      </button>
      <button
        onClick={() => setHeap((h) => heapExtract(h, false))}
        disabled={!heap.length}
        className={btnOCls}
      >
        Extract Max
      </button>
      <button
        onClick={() => setHeap([])}
        disabled={!heap.length}
        className={btnOCls}
      >
        Clear
      </button>
      {heap.length > 0 && (
        <span className="text-[11px] text-muted-foreground">
          max: <b>{heap[0]}</b>
        </span>
      )}
    </>
  ) : undefined;
  return (
    <DSBase
      label="Max Heap"
      beta
      className={className}
      controls={controls}
      chart={
        interactive
          ? heapChart(heap)
          : !animated
            ? heapChart(buildHeap(init, false))
            : undefined
      }
      steps={animated && !interactive ? genHeapSteps(init, false) : undefined}
    />
  );
}

// 14. Trie ─────────────────────────────────────────────────────────────────────

export interface DSTrieProps {
  words?: string[];
  animated?: boolean;
  interactive?: boolean;
  className?: string;
}

/** @example <DSTrie interactive /> */
export function DSTrie({
  words: init = [],
  animated = false,
  interactive = false,
  className,
}: DSTrieProps) {
  const [root, setRoot] = React.useState<TrieNode>(() => {
    let r = mkTrie();
    init.forEach((w) => {
      r = insertTrie(r, w);
    });
    return r;
  });
  const [input, setInput] = React.useState("");
  const insert = () => {
    if (!input.trim()) return;
    setRoot((r) => insertTrie(r, input.trim()));
    setInput("");
  };
  const controls = interactive ? (
    <>
      <DsInput
        placeholder="word…"
        width="w-28"
        value={input}
        onChange={setInput}
        onEnter={insert}
      />
      <button onClick={insert} disabled={!input.trim()} className={btnPCls}>
        Insert Word
      </button>
      <button onClick={() => setRoot(mkTrie())} className={btnOCls}>
        Clear
      </button>
    </>
  ) : undefined;
  const staticRoot = React.useMemo(() => {
    let r = mkTrie();
    init.forEach((w) => {
      r = insertTrie(r, w);
    });
    return r;
  }, [init]);
  return (
    <DSBase
      label="Trie"
      beta
      className={className}
      controls={controls}
      chart={
        interactive
          ? trieToChart(root)
          : !animated
            ? trieToChart(staticRoot)
            : undefined
      }
      steps={animated && !interactive ? genTrieSteps(init) : undefined}
    />
  );
}

// 15. Graph (Undirected) ────────────────────────────────────────────────────────

export interface DSGraphProps {
  nodes?: string[];
  edges?: [string, string][];
  highlight?: string[];
  animated?: boolean;
  interactive?: boolean;
  className?: string;
}

function undirectedChart(
  nodes: string[],
  edges: [string, string][],
  highlight: string[],
): string {
  const nodeDefs = nodes.map(
    (n) =>
      `  ${sanitize(n)}${highlight.includes(n) ? `["${n}"]` : `((${q(n)}))`}`,
  );
  const seen = new Set<string>();
  const edgeDefs: string[] = [];
  for (const [a, b] of edges) {
    const key = [a, b].sort().join("—");
    if (!seen.has(key)) {
      seen.add(key);
      edgeDefs.push(`  ${sanitize(a)} --- ${sanitize(b)}`);
    }
  }
  return nodes.length
    ? ["flowchart TD", ...nodeDefs, ...edgeDefs].join("\n")
    : "flowchart TD\n  empty([empty])";
}

/** @example <DSGraph interactive /> */
export function DSGraph({
  nodes: initN = [],
  edges: initE = [],
  highlight = [],
  animated = false,
  interactive = false,
  className,
}: DSGraphProps) {
  const [nodes, setNodes] = React.useState<string[]>(initN);
  const [edges, setEdges] = React.useState<[string, string][]>(initE);
  const [nodeIn, setNodeIn] = React.useState("");
  const [fromIn, setFromIn] = React.useState("");
  const [toIn, setToIn] = React.useState("");
  const addNode = () => {
    if (!nodeIn.trim() || nodes.includes(nodeIn.trim())) return;
    setNodes((v) => [...v, nodeIn.trim()]);
    setNodeIn("");
  };
  const addEdge = () => {
    if (!fromIn.trim() || !toIn.trim()) return;
    setEdges((v) => [...v, [fromIn.trim(), toIn.trim()]]);
    setFromIn("");
    setToIn("");
  };
  const controls = interactive ? (
    <>
      <DsInput
        placeholder="node…"
        width="w-20"
        value={nodeIn}
        onChange={setNodeIn}
        onEnter={addNode}
      />
      <button onClick={addNode} disabled={!nodeIn.trim()} className={btnPCls}>
        Add Node
      </button>
      <span className="text-muted-foreground text-xs">|</span>
      <DsInput
        placeholder="from…"
        width="w-16"
        value={fromIn}
        onChange={setFromIn}
        onEnter={addEdge}
      />
      <DsInput
        placeholder="to…"
        width="w-16"
        value={toIn}
        onChange={setToIn}
        onEnter={addEdge}
      />
      <button
        onClick={addEdge}
        disabled={!fromIn.trim() || !toIn.trim()}
        className={btnPCls}
      >
        Add Edge
      </button>
      <button
        onClick={() => {
          setNodes([]);
          setEdges([]);
        }}
        className={btnOCls}
      >
        Clear
      </button>
    </>
  ) : undefined;
  const n = interactive ? nodes : initN;
  const e = interactive ? edges : initE;
  return (
    <DSBase
      label="Graph (Undirected)"
      beta
      className={className}
      controls={controls}
      chart={
        interactive || !animated ? undirectedChart(n, e, highlight) : undefined
      }
      steps={
        animated && !interactive ? genGraphBuildSteps(n, e, false) : undefined
      }
    />
  );
}

// 16. Directed Graph ───────────────────────────────────────────────────────────

export interface DSDigraphProps {
  nodes?: string[];
  edges?: [string, string][];
  edgeLabels?: Record<string, string>;
  animated?: boolean;
  interactive?: boolean;
  className?: string;
}

function digraphChart(
  nodes: string[],
  edges: [string, string][],
  edgeLabels: Record<string, string>,
): string {
  if (!nodes.length) return "flowchart TD\n  empty([empty])";
  const nodeDefs = nodes.map((n) => `  ${sanitize(n)}((${q(n)}))`);
  const edgeDefs = edges.map(([a, b]) => {
    const lbl = edgeLabels[`${a}→${b}`];
    return lbl
      ? `  ${sanitize(a)} -->|${lbl}| ${sanitize(b)}`
      : `  ${sanitize(a)} --> ${sanitize(b)}`;
  });
  return ["flowchart TD", ...nodeDefs, ...edgeDefs].join("\n");
}

/** @example <DSDigraph interactive /> */
export function DSDigraph({
  nodes: initN = [],
  edges: initE = [],
  edgeLabels = {},
  animated = false,
  interactive = false,
  className,
}: DSDigraphProps) {
  const [nodes, setNodes] = React.useState<string[]>(initN);
  const [edges, setEdges] = React.useState<[string, string][]>(initE);
  const [nodeIn, setNodeIn] = React.useState("");
  const [fromIn, setFromIn] = React.useState("");
  const [toIn, setToIn] = React.useState("");
  const addNode = () => {
    if (!nodeIn.trim() || nodes.includes(nodeIn.trim())) return;
    setNodes((v) => [...v, nodeIn.trim()]);
    setNodeIn("");
  };
  const addEdge = () => {
    if (!fromIn.trim() || !toIn.trim()) return;
    setEdges((v) => [...v, [fromIn.trim(), toIn.trim()]]);
    setFromIn("");
    setToIn("");
  };
  const controls = interactive ? (
    <>
      <DsInput
        placeholder="node…"
        width="w-20"
        value={nodeIn}
        onChange={setNodeIn}
        onEnter={addNode}
      />
      <button onClick={addNode} disabled={!nodeIn.trim()} className={btnPCls}>
        Add Node
      </button>
      <span className="text-muted-foreground text-xs">|</span>
      <DsInput
        placeholder="from…"
        width="w-16"
        value={fromIn}
        onChange={setFromIn}
        onEnter={addEdge}
      />
      <DsInput
        placeholder="to…"
        width="w-16"
        value={toIn}
        onChange={setToIn}
        onEnter={addEdge}
      />
      <button
        onClick={addEdge}
        disabled={!fromIn.trim() || !toIn.trim()}
        className={btnPCls}
      >
        Add Edge →
      </button>
      <button
        onClick={() => {
          setNodes([]);
          setEdges([]);
        }}
        className={btnOCls}
      >
        Clear
      </button>
    </>
  ) : undefined;
  const n = interactive ? nodes : initN;
  const e = interactive ? edges : initE;
  return (
    <DSBase
      label="Directed Graph"
      beta
      className={className}
      controls={controls}
      chart={
        interactive || !animated ? digraphChart(n, e, edgeLabels) : undefined
      }
      steps={
        animated && !interactive ? genGraphBuildSteps(n, e, true) : undefined
      }
    />
  );
}

// 17. Weighted Graph ───────────────────────────────────────────────────────────

export interface DSWeightedGraphProps {
  nodes?: string[];
  edges?: [string, string, number][];
  directed?: boolean;
  animated?: boolean;
  interactive?: boolean;
  className?: string;
}

function weightedChart(
  nodes: string[],
  edges: [string, string, number][],
  directed: boolean,
): string {
  if (!nodes.length) return "flowchart TD\n  empty([empty])";
  const arrow = directed ? "-->" : "---";
  const nodeDefs = nodes.map((n) => `  ${sanitize(n)}((${q(n)}))`);
  const edgeDefs = edges.map(
    ([a, b, w]) => `  ${sanitize(a)} ${arrow}|${w}| ${sanitize(b)}`,
  );
  return ["flowchart TD", ...nodeDefs, ...edgeDefs].join("\n");
}

/** @example <DSWeightedGraph interactive /> */
export function DSWeightedGraph({
  nodes: initN = [],
  edges: initE = [],
  directed = false,
  animated = false,
  interactive = false,
  className,
}: DSWeightedGraphProps) {
  const [nodes, setNodes] = React.useState<string[]>(initN);
  const [edges, setEdges] = React.useState<[string, string, number][]>(initE);
  const [nodeIn, setNodeIn] = React.useState("");
  const [fromIn, setFromIn] = React.useState("");
  const [toIn, setToIn] = React.useState("");
  const [wtIn, setWtIn] = React.useState("");
  const addNode = () => {
    if (!nodeIn.trim()) return;
    setNodes((v) => [...v, nodeIn.trim()]);
    setNodeIn("");
  };
  const addEdge = () => {
    const w = Number(wtIn);
    if (!fromIn.trim() || !toIn.trim() || isNaN(w)) return;
    setEdges((v) => [...v, [fromIn.trim(), toIn.trim(), w]]);
    setFromIn("");
    setToIn("");
    setWtIn("");
  };
  const label = directed ? "Weighted Directed Graph" : "Weighted Graph";
  const controls = interactive ? (
    <>
      <DsInput
        placeholder="node…"
        width="w-16"
        value={nodeIn}
        onChange={setNodeIn}
        onEnter={addNode}
      />
      <button onClick={addNode} disabled={!nodeIn.trim()} className={btnPCls}>
        Add Node
      </button>
      <span className="text-muted-foreground text-xs">|</span>
      <DsInput
        placeholder="from…"
        width="w-14"
        value={fromIn}
        onChange={setFromIn}
        onEnter={addEdge}
      />
      <DsInput
        placeholder="to…"
        width="w-14"
        value={toIn}
        onChange={setToIn}
        onEnter={addEdge}
      />
      <DsInput
        placeholder="wt…"
        width="w-12"
        value={wtIn}
        onChange={setWtIn}
        onEnter={addEdge}
      />
      <button
        onClick={addEdge}
        disabled={!fromIn.trim() || !toIn.trim() || isNaN(Number(wtIn))}
        className={btnPCls}
      >
        Add Edge
      </button>
      <button
        onClick={() => {
          setNodes([]);
          setEdges([]);
        }}
        className={btnOCls}
      >
        Clear
      </button>
    </>
  ) : undefined;
  const n = interactive ? nodes : initN;
  const e = interactive ? edges : initE;
  return (
    <DSBase
      label={label}
      beta
      className={className}
      controls={controls}
      chart={
        interactive || !animated ? weightedChart(n, e, directed) : undefined
      }
      steps={
        animated && !interactive
          ? genGraphBuildSteps(
              n,
              e.map(([a, b]) => [a, b]),
              directed,
            )
          : undefined
      }
    />
  );
}

// 18. DAG ─────────────────────────────────────────────────────────────────────

export interface DSDAGProps {
  nodes?: string[];
  edges?: [string, string][];
  edgeLabels?: Record<string, string>;
  animated?: boolean;
  interactive?: boolean;
  className?: string;
}

function dagChart(
  nodes: string[],
  edges: [string, string][],
  edgeLabels: Record<string, string>,
): string {
  if (!nodes.length) return "flowchart TD\n  empty([empty])";
  const nodeDefs = nodes.map((n) => `  ${sanitize(n)}[${q(n)}]`);
  const edgeDefs = edges.map(([a, b]) => {
    const lbl = edgeLabels[`${a}→${b}`];
    return lbl
      ? `  ${sanitize(a)} -->|${lbl}| ${sanitize(b)}`
      : `  ${sanitize(a)} --> ${sanitize(b)}`;
  });
  return ["flowchart TD", ...nodeDefs, ...edgeDefs].join("\n");
}

/** @example <DSDAG interactive /> */
export function DSDAG({
  nodes: initN = [],
  edges: initE = [],
  edgeLabels = {},
  animated = false,
  interactive = false,
  className,
}: DSDAGProps) {
  const [nodes, setNodes] = React.useState<string[]>(initN);
  const [edges, setEdges] = React.useState<[string, string][]>(initE);
  const [nodeIn, setNodeIn] = React.useState("");
  const [fromIn, setFromIn] = React.useState("");
  const [toIn, setToIn] = React.useState("");
  const addNode = () => {
    if (!nodeIn.trim()) return;
    setNodes((v) => [...v, nodeIn.trim()]);
    setNodeIn("");
  };
  const addEdge = () => {
    if (!fromIn.trim() || !toIn.trim()) return;
    setEdges((v) => [...v, [fromIn.trim(), toIn.trim()]]);
    setFromIn("");
    setToIn("");
  };
  const controls = interactive ? (
    <>
      <DsInput
        placeholder="node…"
        width="w-20"
        value={nodeIn}
        onChange={setNodeIn}
        onEnter={addNode}
      />
      <button onClick={addNode} disabled={!nodeIn.trim()} className={btnPCls}>
        Add Node
      </button>
      <span className="text-muted-foreground text-xs">|</span>
      <DsInput
        placeholder="from…"
        width="w-16"
        value={fromIn}
        onChange={setFromIn}
        onEnter={addEdge}
      />
      <DsInput
        placeholder="to…"
        width="w-16"
        value={toIn}
        onChange={setToIn}
        onEnter={addEdge}
      />
      <button
        onClick={addEdge}
        disabled={!fromIn.trim() || !toIn.trim()}
        className={btnPCls}
      >
        Add Edge →
      </button>
      <button
        onClick={() => {
          setNodes([]);
          setEdges([]);
        }}
        className={btnOCls}
      >
        Clear
      </button>
    </>
  ) : undefined;
  const n = interactive ? nodes : initN;
  const e = interactive ? edges : initE;
  return (
    <DSBase
      label="DAG"
      beta
      className={className}
      controls={controls}
      chart={interactive || !animated ? dagChart(n, e, edgeLabels) : undefined}
      steps={
        animated && !interactive ? genGraphBuildSteps(n, e, true) : undefined
      }
    />
  );
}

// 19. HashMap ─────────────────────────────────────────────────────────────────

export interface DSHashMapProps {
  entries?: { key: string | number; value: string | number }[];
  buckets?: number;
  animated?: boolean;
  interactive?: boolean;
  className?: string;
}

function hashMapChart(
  entries: { key: string | number; value: string | number }[],
  buckets: number,
): string {
  const bucketDefs = Array.from(
    { length: buckets },
    (_, b) => `  BUCKET${b}[["Bucket ${b}"]]`,
  );
  const kvNodes = entries.map(
    (e, i) => `  KV${i}[${q(`${e.key} → ${e.value}`)}]`,
  );
  const kvEdges = entries.map(
    (e, i) => `  BUCKET${hashBucket(e.key, buckets)} --- KV${i}`,
  );
  return ["flowchart TD", ...bucketDefs, ...kvNodes, ...kvEdges].join("\n");
}

/** @example <DSHashMap interactive buckets={4} /> */
export function DSHashMap({
  entries: init = [],
  buckets = 4,
  animated = false,
  interactive = false,
  className,
}: DSHashMapProps) {
  const [entries, setEntries] =
    React.useState<{ key: string | number; value: string | number }[]>(init);
  const [keyIn, setKeyIn] = React.useState("");
  const [valIn, setValIn] = React.useState("");
  const insert = () => {
    if (!keyIn.trim() || !valIn.trim()) return;
    setEntries((v) => [...v, { key: keyIn.trim(), value: valIn.trim() }]);
    setKeyIn("");
    setValIn("");
  };
  const controls = interactive ? (
    <>
      <DsInput
        placeholder="key…"
        width="w-20"
        value={keyIn}
        onChange={setKeyIn}
        onEnter={insert}
      />
      <DsInput
        placeholder="value…"
        width="w-20"
        value={valIn}
        onChange={setValIn}
        onEnter={insert}
      />
      <button
        onClick={insert}
        disabled={!keyIn.trim() || !valIn.trim()}
        className={btnPCls}
      >
        Insert
      </button>
      <button
        onClick={() => setEntries((v) => v.slice(0, -1))}
        disabled={!entries.length}
        className={btnOCls}
      >
        Remove Last
      </button>
      <button
        onClick={() => setEntries([])}
        disabled={!entries.length}
        className={btnOCls}
      >
        Clear
      </button>
    </>
  ) : undefined;
  const src = interactive ? entries : init;
  const steps =
    animated && !interactive
      ? [
          { chart: hashMapChart([], buckets), description: "Empty HashMap" },
          ...src.map((_, i) => ({
            chart: hashMapChart(src.slice(0, i + 1), buckets),
            description: `Insert ${src[i].key} → bucket ${hashBucket(src[i].key, buckets)}`,
          })),
        ]
      : undefined;
  return (
    <DSBase
      label="HashMap"
      beta
      className={className}
      controls={controls}
      chart={interactive || !animated ? hashMapChart(src, buckets) : undefined}
      steps={steps}
    />
  );
}

// 20. HashSet ─────────────────────────────────────────────────────────────────

export interface DSHashSetProps {
  values?: (string | number)[];
  buckets?: number;
  animated?: boolean;
  interactive?: boolean;
  className?: string;
}

function hashSetChart(values: (string | number)[], buckets: number): string {
  const bucketDefs = Array.from(
    { length: buckets },
    (_, b) => `  BUCKET${b}[["Bucket ${b}"]]`,
  );
  const vNodes = values.map((v, i) => `  V${i}((${q(v)}))`);
  const vEdges = values.map(
    (v, i) => `  BUCKET${hashBucket(v, buckets)} --- V${i}`,
  );
  return ["flowchart TD", ...bucketDefs, ...vNodes, ...vEdges].join("\n");
}

/** @example <DSHashSet interactive buckets={4} /> */
export function DSHashSet({
  values: init = [],
  buckets = 4,
  animated = false,
  interactive = false,
  className,
}: DSHashSetProps) {
  const [values, setValues] = React.useState<(string | number)[]>(init);
  const [input, setInput] = React.useState("");
  const insert = () => {
    if (!input.trim()) return;
    setValues((v) => [...v, input.trim()]);
    setInput("");
  };
  const controls = interactive ? (
    <>
      <DsInput
        placeholder="value…"
        value={input}
        onChange={setInput}
        onEnter={insert}
      />
      <button onClick={insert} disabled={!input.trim()} className={btnPCls}>
        Insert
      </button>
      <button
        onClick={() => setValues((v) => v.slice(0, -1))}
        disabled={!values.length}
        className={btnOCls}
      >
        Remove Last
      </button>
      <button
        onClick={() => setValues([])}
        disabled={!values.length}
        className={btnOCls}
      >
        Clear
      </button>
    </>
  ) : undefined;
  const src = interactive ? values : init;
  const steps =
    animated && !interactive
      ? [
          { chart: hashSetChart([], buckets), description: "Empty HashSet" },
          ...src.map((_, i) => ({
            chart: hashSetChart(src.slice(0, i + 1), buckets),
            description: `Insert ${src[i]} → bucket ${hashBucket(src[i], buckets)}`,
          })),
        ]
      : undefined;
  return (
    <DSBase
      label="HashSet"
      beta
      className={className}
      controls={controls}
      chart={interactive || !animated ? hashSetChart(src, buckets) : undefined}
      steps={steps}
    />
  );
}

// 21. N-ary Tree ───────────────────────────────────────────────────────────────

export interface DSNaryTreeNode {
  label: string | number;
  children?: DSNaryTreeNode[];
}
export interface DSNaryTreeProps {
  root: DSNaryTreeNode;
  direction?: "TD" | "LR";
  animated?: boolean;
  className?: string;
}

function naryToChart(root: DSNaryTreeNode, direction: "TD" | "LR"): string {
  const nodes: string[] = [],
    edges: string[] = [];
  let c = 0;
  function t(node: DSNaryTreeNode): string {
    const id = `NT${c++}`;
    nodes.push(`  ${id}((${q(node.label)}))`);
    for (const child of node.children ?? []) {
      const cid = t(child);
      edges.push(`  ${id} --- ${cid}`);
    }
    return id;
  }
  t(root);
  return [`flowchart ${direction}`, ...nodes, ...edges].join("\n");
}
function genNarySteps(root: DSNaryTreeNode, direction: "TD" | "LR"): DSStep[] {
  type Q = { node: DSNaryTreeNode; pid: string | null };
  const all: Array<{ id: string; label: string | number; pid: string | null }> =
    [];
  let c = 0;
  const queue: Q[] = [{ node: root, pid: null }];
  while (queue.length) {
    const { node, pid } = queue.shift()!;
    const id = `NT${c++}`;
    all.push({ id, label: node.label, pid });
    for (const child of node.children ?? [])
      queue.push({ node: child, pid: id });
  }
  return all.map((_, i) => {
    const partial = all.slice(0, i + 1);
    const nodes = partial.map(({ id, label }) => `  ${id}((${q(label)}))`);
    const edges = partial
      .filter(({ pid }) => pid !== null)
      .map(({ id, pid }) => `  ${pid} --- ${id}`);
    return {
      chart: [`flowchart ${direction}`, ...nodes, ...edges].join("\n"),
      description: `Add node ${all[i].label}`,
    };
  });
}

/** @example <DSNaryTree root={{ label: "root", children: [{ label: "A" }, { label: "B" }] }} animated /> */
export function DSNaryTree({
  root,
  direction = "TD",
  animated = false,
  className,
}: DSNaryTreeProps) {
  return (
    <DSBase
      label="N-ary Tree"
      beta
      className={className}
      chart={!animated ? naryToChart(root, direction) : undefined}
      steps={animated ? genNarySteps(root, direction) : undefined}
    />
  );
}

// 22. Segment Tree ─────────────────────────────────────────────────────────────

export interface DSSegmentTreeProps {
  values?: number[];
  operation?: "sum" | "min" | "max";
  animated?: boolean;
  interactive?: boolean;
  className?: string;
}

function buildSegTree(arr: number[], op: "sum" | "min" | "max"): number[] {
  const n = arr.length;
  const tree = new Array(4 * n).fill(0);
  function build(node: number, s: number, e: number) {
    if (s === e) {
      tree[node] = arr[s];
      return;
    }
    const mid = Math.floor((s + e) / 2);
    build(2 * node, s, mid);
    build(2 * node + 1, mid + 1, e);
    tree[node] =
      op === "sum"
        ? tree[2 * node] + tree[2 * node + 1]
        : op === "min"
          ? Math.min(tree[2 * node], tree[2 * node + 1])
          : Math.max(tree[2 * node], tree[2 * node + 1]);
  }
  if (n) build(1, 0, n - 1);
  return tree;
}
function segTreeChart(tree: number[], n: number): string {
  const size = Math.min(tree.length, 4 * n);
  const nodes: string[] = [],
    edges: string[] = [];
  for (let i = 1; i < size; i++) {
    if (tree[i] === 0 && i > n) continue;
    nodes.push(`  ST${i}((${tree[i]}))`);
    const l = 2 * i,
      r = 2 * i + 1;
    if (l < size) edges.push(`  ST${i} --- ST${l}`);
    if (r < size) edges.push(`  ST${i} --- ST${r}`);
  }
  return ["flowchart TD", ...nodes, ...edges].join("\n");
}

/** @example <DSSegmentTree interactive operation="sum" /> */
export function DSSegmentTree({
  values: init = [],
  operation = "sum",
  animated = false,
  interactive = false,
  className,
}: DSSegmentTreeProps) {
  const [values, setValues] = React.useState<number[]>(init);
  const [input, setInput] = React.useState("");
  const insert = () => {
    const n = Number(input);
    if (isNaN(n) || !input.trim()) return;
    setValues((v) => [...v, n]);
    setInput("");
  };
  const controls = interactive ? (
    <>
      <DsInput
        placeholder="number…"
        value={input}
        onChange={setInput}
        onEnter={insert}
      />
      <button
        onClick={insert}
        disabled={!input.trim() || isNaN(Number(input))}
        className={btnPCls}
      >
        Insert
      </button>
      <button
        onClick={() => setValues((v) => v.slice(0, -1))}
        disabled={!values.length}
        className={btnOCls}
      >
        Remove Last
      </button>
      <button
        onClick={() => setValues([])}
        disabled={!values.length}
        className={btnOCls}
      >
        Clear
      </button>
    </>
  ) : undefined;
  const src = interactive ? values : init;
  const tree = buildSegTree(src, operation);
  const label = `Segment Tree (${operation})`;
  return (
    <DSBase
      label={label}
      beta
      className={className}
      controls={controls}
      chart={
        interactive || !animated
          ? src.length
            ? segTreeChart(tree, src.length)
            : "flowchart TD\n  empty([empty])"
          : undefined
      }
      steps={
        animated && !interactive
          ? src.map((_, i) => ({
              chart: segTreeChart(
                buildSegTree(src.slice(0, i + 1), operation),
                i + 1,
              ),
              description: `Build with ${i + 1} element${i > 0 ? "s" : ""}`,
            }))
          : undefined
      }
    />
  );
}

// 23. BFS Traversal ───────────────────────────────────────────────────────────

export interface DSBFSProps {
  nodes?: string[];
  edges?: [string, string][];
  start?: string;
  directed?: boolean;
  animated?: boolean;
  interactive?: boolean;
  className?: string;
}

/** @example <DSBFS nodes={["A","B","C","D"]} edges={[["A","B"],["A","C"],["B","D"]]} start="A" interactive /> */
export function DSBFS({
  nodes: initN = [],
  edges: initE = [],
  start: initStart,
  directed = false,
  animated = false,
  interactive = false,
  className,
}: DSBFSProps) {
  const [nodes, setNodes] = React.useState<string[]>(initN);
  const [edges, setEdges] = React.useState<[string, string][]>(initE);
  const [start, setStart] = React.useState<string>(initStart ?? initN[0] ?? "");
  const [nodeIn, setNodeIn] = React.useState("");
  const [fromIn, setFromIn] = React.useState("");
  const [toIn, setToIn] = React.useState("");

  const order = React.useMemo(() => {
    if (!start || !nodes.includes(start)) return [];
    const a = buildAdj(nodes, edges, directed);
    const o: string[] = [],
      q = [start],
      seen = new Set([start]);
    while (q.length) {
      const n = q.shift()!;
      o.push(n);
      for (const nb of a.get(n) ?? []) {
        if (!seen.has(nb)) {
          seen.add(nb);
          q.push(nb);
        }
      }
    }
    return o;
  }, [nodes, edges, start, directed]);

  const addNode = () => {
    if (!nodeIn.trim()) return;
    setNodes((v) => [...v, nodeIn.trim()]);
    if (!start) setStart(nodeIn.trim());
    setNodeIn("");
  };
  const addEdge = () => {
    if (!fromIn.trim() || !toIn.trim()) return;
    setEdges((v) => [...v, [fromIn.trim(), toIn.trim()]]);
    setFromIn("");
    setToIn("");
  };

  const controls = interactive ? (
    <>
      <DsInput
        placeholder="node…"
        width="w-16"
        value={nodeIn}
        onChange={setNodeIn}
        onEnter={addNode}
      />
      <button onClick={addNode} disabled={!nodeIn.trim()} className={btnPCls}>
        Add Node
      </button>
      <DsInput
        placeholder="from…"
        width="w-14"
        value={fromIn}
        onChange={setFromIn}
        onEnter={addEdge}
      />
      <DsInput
        placeholder="to…"
        width="w-14"
        value={toIn}
        onChange={setToIn}
        onEnter={addEdge}
      />
      <button
        onClick={addEdge}
        disabled={!fromIn.trim() || !toIn.trim()}
        className={btnPCls}
      >
        Add Edge
      </button>
      <span className="text-muted-foreground text-xs">|</span>
      <span className="text-[11px] text-muted-foreground">start:</span>
      <select
        value={start}
        onChange={(e) => setStart(e.target.value)}
        className="h-7 rounded border bg-background px-1.5 text-xs focus:outline-none"
      >
        {nodes.map((n) => (
          <option key={n} value={n}>
            {n}
          </option>
        ))}
      </select>
      <button
        onClick={() => {
          setNodes([]);
          setEdges([]);
          setStart("");
        }}
        className={btnOCls}
      >
        Clear
      </button>
    </>
  ) : undefined;

  const n = interactive ? nodes : initN;
  const e = interactive ? edges : initE;
  const s = interactive ? start : (initStart ?? initN[0] ?? "");
  const finalOrder = interactive
    ? order
    : (() => {
        const a = buildAdj(n, e, directed);
        const o: string[] = [],
          q2 = [s],
          seen = new Set([s]);
        while (q2.length) {
          const nd = q2.shift()!;
          o.push(nd);
          for (const nb of a.get(nd) ?? []) {
            if (!seen.has(nb)) {
              seen.add(nb);
              q2.push(nb);
            }
          }
        }
        return o;
      })();

  return (
    <DSBase
      label="BFS Traversal"
      beta
      className={className}
      controls={controls}
      chart={
        interactive || !animated
          ? graphTraversalChart(n, e, finalOrder, directed)
          : undefined
      }
      steps={
        animated && !interactive ? genBFSSteps(n, e, s, directed) : undefined
      }
    />
  );
}

// 24. DFS Traversal ───────────────────────────────────────────────────────────

export interface DSDFSProps {
  nodes?: string[];
  edges?: [string, string][];
  start?: string;
  directed?: boolean;
  animated?: boolean;
  interactive?: boolean;
  className?: string;
}

/** @example <DSDFS nodes={["A","B","C","D"]} edges={[["A","B"],["A","C"],["B","D"]]} start="A" interactive /> */
export function DSDFS({
  nodes: initN = [],
  edges: initE = [],
  start: initStart,
  directed = false,
  animated = false,
  interactive = false,
  className,
}: DSDFSProps) {
  const [nodes, setNodes] = React.useState<string[]>(initN);
  const [edges, setEdges] = React.useState<[string, string][]>(initE);
  const [start, setStart] = React.useState<string>(initStart ?? initN[0] ?? "");
  const [nodeIn, setNodeIn] = React.useState("");
  const [fromIn, setFromIn] = React.useState("");
  const [toIn, setToIn] = React.useState("");

  const order = React.useMemo(() => {
    const a = buildAdj(nodes, edges, directed);
    const o: string[] = [],
      seen = new Set<string>();
    function dfs(n: string) {
      seen.add(n);
      o.push(n);
      for (const nb of a.get(n) ?? []) {
        if (!seen.has(nb)) dfs(nb);
      }
    }
    if (start && nodes.includes(start)) dfs(start);
    return o;
  }, [nodes, edges, start, directed]);

  const addNode = () => {
    if (!nodeIn.trim()) return;
    setNodes((v) => [...v, nodeIn.trim()]);
    if (!start) setStart(nodeIn.trim());
    setNodeIn("");
  };
  const addEdge = () => {
    if (!fromIn.trim() || !toIn.trim()) return;
    setEdges((v) => [...v, [fromIn.trim(), toIn.trim()]]);
    setFromIn("");
    setToIn("");
  };

  const controls = interactive ? (
    <>
      <DsInput
        placeholder="node…"
        width="w-16"
        value={nodeIn}
        onChange={setNodeIn}
        onEnter={addNode}
      />
      <button onClick={addNode} disabled={!nodeIn.trim()} className={btnPCls}>
        Add Node
      </button>
      <DsInput
        placeholder="from…"
        width="w-14"
        value={fromIn}
        onChange={setFromIn}
        onEnter={addEdge}
      />
      <DsInput
        placeholder="to…"
        width="w-14"
        value={toIn}
        onChange={setToIn}
        onEnter={addEdge}
      />
      <button
        onClick={addEdge}
        disabled={!fromIn.trim() || !toIn.trim()}
        className={btnPCls}
      >
        Add Edge
      </button>
      <span className="text-muted-foreground text-xs">|</span>
      <span className="text-[11px] text-muted-foreground">start:</span>
      <select
        value={start}
        onChange={(e) => setStart(e.target.value)}
        className="h-7 rounded border bg-background px-1.5 text-xs focus:outline-none"
      >
        {nodes.map((n) => (
          <option key={n} value={n}>
            {n}
          </option>
        ))}
      </select>
      <button
        onClick={() => {
          setNodes([]);
          setEdges([]);
          setStart("");
        }}
        className={btnOCls}
      >
        Clear
      </button>
    </>
  ) : undefined;

  const n = interactive ? nodes : initN;
  const e = interactive ? edges : initE;
  const s = interactive ? start : (initStart ?? initN[0] ?? "");
  const finalOrder = interactive
    ? order
    : (() => {
        const a = buildAdj(n, e, directed);
        const o: string[] = [],
          seen = new Set<string>();
        function dfs(nd: string) {
          seen.add(nd);
          o.push(nd);
          for (const nb of a.get(nd) ?? []) {
            if (!seen.has(nb)) dfs(nb);
          }
        }
        if (s && n.includes(s)) dfs(s);
        return o;
      })();

  return (
    <DSBase
      label="DFS Traversal"
      beta
      className={className}
      controls={controls}
      chart={
        interactive || !animated
          ? graphTraversalChart(n, e, finalOrder, directed)
          : undefined
      }
      steps={
        animated && !interactive ? genDFSSteps(n, e, s, directed) : undefined
      }
    />
  );
}

// 25. Agent Flow ───────────────────────────────────────────────────────────────

export interface AgentNode {
  id: string;
  label: string;
  type?: "agent" | "tool" | "decision" | "start" | "end" | "human";
}
export interface AgentEdge {
  from: string;
  to: string;
  label?: string;
}
export interface DSAgentFlowProps {
  agents?: AgentNode[];
  edges?: AgentEdge[];
  animated?: boolean;
  interactive?: boolean;
  className?: string;
}

const AGENT_SHAPE: Record<
  NonNullable<AgentNode["type"]>,
  (label: string) => string
> = {
  start: (l) => `([${q(l)}])`,
  end: (l) => `([${q(l)}])`,
  agent: (l) => `[${q(l)}]`,
  tool: (l) => `[(${q(l)})]`,
  decision: (l) => `{${q(l)}}`,
  human: (l) => `((${q(l)}))`,
};
function agentFlowChart(agents: AgentNode[], edges: AgentEdge[]): string {
  if (!agents.length) return "flowchart TD\n  empty([empty])";
  const nodeDefs = agents.map(
    (a) => `  ${sanitize(a.id)}${AGENT_SHAPE[a.type ?? "agent"](a.label)}`,
  );
  const edgeDefs = edges.map((e) =>
    e.label
      ? `  ${sanitize(e.from)} -->|${e.label}| ${sanitize(e.to)}`
      : `  ${sanitize(e.from)} --> ${sanitize(e.to)}`,
  );
  return ["flowchart TD", ...nodeDefs, ...edgeDefs].join("\n");
}

/** @example <DSAgentFlow interactive /> */
export function DSAgentFlow({
  agents: initA = [],
  edges: initE = [],
  animated = false,
  interactive = false,
  className,
}: DSAgentFlowProps) {
  const [agents, setAgents] = React.useState<AgentNode[]>(initA);
  const [edges, setEdges] = React.useState<AgentEdge[]>(initE);
  const [idIn, setIdIn] = React.useState("");
  const [lblIn, setLblIn] = React.useState("");
  const [typeIn, setTypeIn] = React.useState<AgentNode["type"]>("agent");
  const [fromIn, setFromIn] = React.useState("");
  const [toIn, setToIn] = React.useState("");
  const [edgeLbl, setEdgeLbl] = React.useState("");
  const addAgent = () => {
    if (!idIn.trim()) return;
    setAgents((v) => [
      ...v,
      { id: idIn.trim(), label: lblIn.trim() || idIn.trim(), type: typeIn },
    ]);
    setIdIn("");
    setLblIn("");
  };
  const addEdge = () => {
    if (!fromIn.trim() || !toIn.trim()) return;
    setEdges((v) => [
      ...v,
      {
        from: fromIn.trim(),
        to: toIn.trim(),
        label: edgeLbl.trim() || undefined,
      },
    ]);
    setFromIn("");
    setToIn("");
    setEdgeLbl("");
  };
  const controls = interactive ? (
    <>
      <DsInput
        placeholder="id…"
        width="w-16"
        value={idIn}
        onChange={setIdIn}
        onEnter={addAgent}
      />
      <DsInput
        placeholder="label…"
        width="w-20"
        value={lblIn}
        onChange={setLblIn}
        onEnter={addAgent}
      />
      <select
        value={typeIn}
        onChange={(e) => setTypeIn(e.target.value as AgentNode["type"])}
        className="h-7 rounded border bg-background px-1.5 text-xs focus:outline-none"
      >
        {(["agent", "tool", "decision", "start", "end", "human"] as const).map(
          (t) => (
            <option key={t} value={t}>
              {t}
            </option>
          ),
        )}
      </select>
      <button onClick={addAgent} disabled={!idIn.trim()} className={btnPCls}>
        Add Agent
      </button>
      <span className="text-muted-foreground text-xs">|</span>
      <DsInput
        placeholder="from…"
        width="w-14"
        value={fromIn}
        onChange={setFromIn}
        onEnter={addEdge}
      />
      <DsInput
        placeholder="to…"
        width="w-14"
        value={toIn}
        onChange={setToIn}
        onEnter={addEdge}
      />
      <DsInput
        placeholder="label…"
        width="w-16"
        value={edgeLbl}
        onChange={setEdgeLbl}
        onEnter={addEdge}
      />
      <button
        onClick={addEdge}
        disabled={!fromIn.trim() || !toIn.trim()}
        className={btnPCls}
      >
        Connect
      </button>
      <button
        onClick={() => {
          setAgents([]);
          setEdges([]);
        }}
        className={btnOCls}
      >
        Clear
      </button>
    </>
  ) : undefined;

  const a = interactive ? agents : initA;
  const e = interactive ? edges : initE;
  const animSteps =
    animated && !interactive
      ? [
          ...a.map((_, i) => ({
            chart: agentFlowChart(a.slice(0, i + 1), []),
            description: `Add ${a[i].type ?? "agent"}: ${a[i].label}`,
          })),
          ...e.map((_, i) => ({
            chart: agentFlowChart(a, e.slice(0, i + 1)),
            description: `Connect ${e[i].from} → ${e[i].to}`,
          })),
        ]
      : undefined;

  return (
    <DSBase
      label="Agent Flow"
      beta
      className={className}
      controls={controls}
      chart={interactive || !animated ? agentFlowChart(a, e) : undefined}
      steps={animSteps}
    />
  );
}
