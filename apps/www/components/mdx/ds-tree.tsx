"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

// ─── Public Types ─────────────────────────────────────────────────────────────

export interface TreeNodeData {
  id?: string;
  value: string | number;
  left?: TreeNodeData;
  right?: TreeNodeData;
  children?: TreeNodeData[]; // N-ary
  annotation?: string; // educator note shown near node
}

export type ValidationResult = {
  valid: boolean;
  violatedRules: string[];
  invalidNodeIds: Set<string>;
  invalidEdgeIds: Set<string>;
};

export type TreeType =
  | "binary"
  | "bst"
  | "avl"
  | "balanced"
  | "full"
  | "complete"
  | "perfect"
  | "left-skewed"
  | "right-skewed"
  | "min-heap"
  | "max-heap"
  | "nary";

export type TraversalType =
  | "bfs"
  | "inorder"
  | "preorder"
  | "postorder"
  | "dfs";

// ─── Internal Types ───────────────────────────────────────────────────────────

interface INode {
  id: string;
  value: string | number;
  left?: INode;
  right?: INode;
  children?: INode[];
  annotation?: string;
}

interface LNode extends INode {
  x: number;
  y: number;
  left?: LNode;
  right?: LNode;
  children?: LNode[];
}

interface TraversalStep {
  nodeId: string;
  edgeId?: string;
  description: string;
}

type NodeState = "normal" | "active" | "visited" | "invalid";

// ─── Validation Engine ────────────────────────────────────────────────────────

export function validateBinaryTree(root: TreeNodeData): ValidationResult {
  const invalidNodeIds = new Set<string>();
  const violatedRules: string[] = [];
  let c = 0;
  function check(node: TreeNodeData, id: string) {
    const childCount = (node.left ? 1 : 0) + (node.right ? 1 : 0);
    if (node.children && node.children.length > 2) {
      invalidNodeIds.add(id);
    }
    if (node.left) check(node.left, `${id}L`);
    if (node.right) check(node.right, `${id}R`);
  }
  check(root, "r");
  if (invalidNodeIds.size)
    violatedRules.push("Binary tree: each node may have at most 2 children");
  return {
    valid: !violatedRules.length,
    violatedRules,
    invalidNodeIds,
    invalidEdgeIds: new Set(),
  };
}

export function validateBST(root: TreeNodeData): ValidationResult {
  const invalidNodeIds = new Set<string>();
  const violatedRules: string[] = [];
  function check(node: TreeNodeData, id: string, min: number, max: number) {
    const v = Number(node.value);
    if (v <= min || v >= max) invalidNodeIds.add(id);
    if (node.left) check(node.left, `${id}L`, min, v);
    if (node.right) check(node.right, `${id}R`, v, max);
  }
  check(root, "r", -Infinity, Infinity);
  if (invalidNodeIds.size)
    violatedRules.push(
      "BST: left subtree values < node < right subtree values (recursively)",
    );
  return {
    valid: !violatedRules.length,
    violatedRules,
    invalidNodeIds,
    invalidEdgeIds: new Set(),
  };
}

function treeHeight(node: TreeNodeData | undefined): number {
  if (!node) return -1;
  return 1 + Math.max(treeHeight(node.left), treeHeight(node.right));
}

export function validateAVL(root: TreeNodeData): ValidationResult {
  const invalidNodeIds = new Set<string>();
  const violatedRules: string[] = [];
  // Also validate BST property
  const bst = validateBST(root);
  bst.invalidNodeIds.forEach((id) => invalidNodeIds.add(id));
  bst.violatedRules.forEach((r) => violatedRules.push(r));

  function check(node: TreeNodeData, id: string) {
    const bf = treeHeight(node.left) - treeHeight(node.right);
    if (Math.abs(bf) > 1) {
      invalidNodeIds.add(id);
      violatedRules.push(
        `AVL: node "${node.value}" has balance factor ${bf} (|bf| must be ≤ 1)`,
      );
    }
    if (node.left) check(node.left, `${id}L`);
    if (node.right) check(node.right, `${id}R`);
  }
  check(root, "r");
  return {
    valid: !violatedRules.length,
    violatedRules,
    invalidNodeIds,
    invalidEdgeIds: new Set(),
  };
}

export function validateBalanced(root: TreeNodeData): ValidationResult {
  const invalidNodeIds = new Set<string>();
  const violatedRules: string[] = [];
  function check(node: TreeNodeData, id: string) {
    const diff = Math.abs(treeHeight(node.left) - treeHeight(node.right));
    if (diff > 1) invalidNodeIds.add(id);
    if (node.left) check(node.left, `${id}L`);
    if (node.right) check(node.right, `${id}R`);
  }
  check(root, "r");
  if (invalidNodeIds.size)
    violatedRules.push(
      "Balanced: height difference between subtrees must be ≤ 1",
    );
  return {
    valid: !violatedRules.length,
    violatedRules,
    invalidNodeIds,
    invalidEdgeIds: new Set(),
  };
}

export function validateFull(root: TreeNodeData): ValidationResult {
  const invalidNodeIds = new Set<string>();
  const violatedRules: string[] = [];
  function check(node: TreeNodeData, id: string) {
    const hasLeft = !!node.left,
      hasRight = !!node.right;
    if (hasLeft !== hasRight) invalidNodeIds.add(id);
    if (node.left) check(node.left, `${id}L`);
    if (node.right) check(node.right, `${id}R`);
  }
  check(root, "r");
  if (invalidNodeIds.size)
    violatedRules.push(
      "Full binary tree: every node must have 0 or 2 children",
    );
  return {
    valid: !violatedRules.length,
    violatedRules,
    invalidNodeIds,
    invalidEdgeIds: new Set(),
  };
}

export function validateComplete(root: TreeNodeData): ValidationResult {
  const invalidNodeIds = new Set<string>();
  const violatedRules: string[] = [];
  // BFS: once we see a missing child, all subsequent nodes must be leaves
  const queue: { node: TreeNodeData; id: string }[] = [{ node: root, id: "r" }];
  let end = false;
  while (queue.length) {
    const { node, id } = queue.shift()!;
    if (node.left) {
      if (end) {
        invalidNodeIds.add(`${id}L`);
        violatedRules.push(
          "Complete: gap found before last level fills left-to-right",
        );
      }
      queue.push({ node: node.left, id: `${id}L` });
    } else {
      end = true;
    }
    if (node.right) {
      if (end) {
        invalidNodeIds.add(`${id}R`);
        violatedRules.push(
          "Complete: gap found before last level fills left-to-right",
        );
      }
      queue.push({ node: node.right, id: `${id}R` });
    } else {
      end = true;
    }
  }
  return {
    valid: !violatedRules.length,
    violatedRules: [...new Set(violatedRules)],
    invalidNodeIds,
    invalidEdgeIds: new Set(),
  };
}

export function validatePerfect(root: TreeNodeData): ValidationResult {
  const invalidNodeIds = new Set<string>();
  const violatedRules: string[] = [];
  const targetDepth = treeHeight(root);
  function check(node: TreeNodeData, id: string, depth: number) {
    const isLeaf = !node.left && !node.right;
    if (isLeaf && depth !== targetDepth) {
      invalidNodeIds.add(id);
    }
    if (!isLeaf && (!node.left || !node.right)) {
      invalidNodeIds.add(id);
    }
    if (node.left) check(node.left, `${id}L`, depth + 1);
    if (node.right) check(node.right, `${id}R`, depth + 1);
  }
  check(root, "r", 0);
  if (invalidNodeIds.size)
    violatedRules.push(
      "Perfect: all leaves must be at same depth; all internal nodes must have 2 children",
    );
  return {
    valid: !violatedRules.length,
    violatedRules,
    invalidNodeIds,
    invalidEdgeIds: new Set(),
  };
}

export function validateHeap(
  root: TreeNodeData,
  type: "min" | "max",
): ValidationResult {
  const invalidNodeIds = new Set<string>();
  const violatedRules: string[] = [];
  function check(node: TreeNodeData, id: string) {
    const v = Number(node.value);
    if (node.left) {
      const lv = Number(node.left.value);
      if (type === "min" ? v > lv : v < lv) invalidNodeIds.add(`${id}L`);
      check(node.left, `${id}L`);
    }
    if (node.right) {
      const rv = Number(node.right.value);
      if (type === "min" ? v > rv : v < rv) invalidNodeIds.add(`${id}R`);
      check(node.right, `${id}R`);
    }
  }
  check(root, "r");
  if (invalidNodeIds.size)
    violatedRules.push(
      type === "min"
        ? "Min-Heap: parent ≤ children"
        : "Max-Heap: parent ≥ children",
    );
  return {
    valid: !violatedRules.length,
    violatedRules,
    invalidNodeIds,
    invalidEdgeIds: new Set(),
  };
}

const VALIDATORS: Partial<
  Record<TreeType, (root: TreeNodeData) => ValidationResult>
> = {
  binary: validateBinaryTree,
  bst: validateBST,
  avl: validateAVL,
  balanced: validateBalanced,
  full: validateFull,
  complete: validateComplete,
  perfect: validatePerfect,
  "min-heap": (r) => validateHeap(r, "min"),
  "max-heap": (r) => validateHeap(r, "max"),
};

const RULES: Partial<Record<TreeType, string[]>> = {
  binary: ["Each node has at most 2 children"],
  bst: [
    "All left descendants < node",
    "All right descendants > node",
    "Both subtrees are also BSTs",
  ],
  avl: [
    "BST rules apply",
    "Balance factor (left height - right height) ≤ 1 for every node",
  ],
  balanced: [
    "Height difference between left and right subtrees ≤ 1 at every node",
  ],
  full: ["Every node has exactly 0 or 2 children"],
  complete: [
    "All levels fully filled except possibly the last",
    "Last level filled left-to-right",
  ],
  perfect: [
    "All leaves at same depth",
    "All internal nodes have exactly 2 children",
  ],
  "left-skewed": ["Every node has only a left child (or is a leaf)"],
  "right-skewed": ["Every node has only a right child (or is a leaf)"],
  "min-heap": ["Parent ≤ both children at every node", "Complete binary tree"],
  "max-heap": ["Parent ≥ both children at every node", "Complete binary tree"],
};

// ─── Layout Engine ────────────────────────────────────────────────────────────

function normalize(node: TreeNodeData, id = "r"): INode {
  return {
    id,
    value: node.value,
    annotation: node.annotation,
    left: node.left ? normalize(node.left, `${id}L`) : undefined,
    right: node.right ? normalize(node.right, `${id}R`) : undefined,
    children: node.children
      ? node.children.map((c, i) => normalize(c, `${id}C${i}`))
      : undefined,
  };
}

function countLeaves(node: INode | undefined): number {
  if (!node) return 0;
  if (!node.left && !node.right && !node.children?.length) return 1;
  if (node.children?.length)
    return node.children.reduce((s, c) => s + countLeaves(c), 0);
  return countLeaves(node.left) + countLeaves(node.right);
}

function layoutBinary(
  node: INode,
  depth: number,
  xMin: number,
  xMax: number,
  levelH: number,
): LNode {
  const x = (xMin + xMax) / 2;
  const y = depth * levelH + levelH;

  let left: LNode | undefined;
  let right: LNode | undefined;

  if (node.left && node.right) {
    const ll = countLeaves(node.left);
    const rl = countLeaves(node.right);
    const mid = xMin + (xMax - xMin) * (ll / (ll + rl));
    left = layoutBinary(node.left, depth + 1, xMin, mid, levelH);
    right = layoutBinary(node.right, depth + 1, mid, xMax, levelH);
  } else if (node.left) {
    left = layoutBinary(node.left, depth + 1, xMin, xMax, levelH);
  } else if (node.right) {
    right = layoutBinary(node.right, depth + 1, xMin, xMax, levelH);
  }

  return { id: node.id, value: node.value, annotation: node.annotation, x, y, left, right };
}

function layoutNary(
  node: INode,
  depth: number,
  xMin: number,
  xMax: number,
  levelH: number,
): LNode {
  const x = (xMin + xMax) / 2;
  const y = depth * levelH + levelH;
  const kids = node.children ?? [];
  if (!kids.length) return { id: node.id, value: node.value, annotation: node.annotation, x, y, children: [] };

  const leafCounts = kids.map((c) => countLeaves(c) || 1);
  const total = leafCounts.reduce((s, n) => s + n, 0);
  let cursor = xMin;
  const layoutChildren = kids.map((c, i) => {
    const share = (xMax - xMin) * (leafCounts[i] / total);
    const child = layoutNary(c, depth + 1, cursor, cursor + share, levelH);
    cursor += share;
    return child;
  });
  return { id: node.id, value: node.value, annotation: node.annotation, x, y, children: layoutChildren };
}

function getBounds(
  node: LNode,
  r: number,
): { x: number; y: number; w: number; h: number } {
  let minX = Infinity,
    maxX = -Infinity,
    minY = Infinity,
    maxY = -Infinity;
  function visit(n: LNode) {
    minX = Math.min(minX, n.x - r - 24);
    maxX = Math.max(maxX, n.x + r + 24);
    minY = Math.min(minY, n.y - r - 16);
    maxY = Math.max(maxY, n.y + r + 24);
    if (n.left) visit(n.left);
    if (n.right) visit(n.right);
    n.children?.forEach(visit);
  }
  visit(node);
  return { x: minX, y: minY, w: maxX - minX, h: maxY - minY };
}

// ─── Traversal Engine ─────────────────────────────────────────────────────────

function traverseInorder(node: LNode | undefined, steps: TraversalStep[]) {
  if (!node) return;
  traverseInorder(node.left, steps);
  steps.push({ nodeId: node.id, description: `Visit ${node.value}` });
  traverseInorder(node.right, steps);
}
function traversePreorder(node: LNode | undefined, steps: TraversalStep[]) {
  if (!node) return;
  steps.push({ nodeId: node.id, description: `Visit ${node.value}` });
  traversePreorder(node.left, steps);
  traversePreorder(node.right, steps);
}
function traversePostorder(node: LNode | undefined, steps: TraversalStep[]) {
  if (!node) return;
  traversePostorder(node.left, steps);
  traversePostorder(node.right, steps);
  steps.push({ nodeId: node.id, description: `Visit ${node.value}` });
}
function traverseBFS(root: LNode, steps: TraversalStep[]) {
  const q: LNode[] = [root];
  while (q.length) {
    const n = q.shift()!;
    steps.push({ nodeId: n.id, description: `Visit ${n.value}` });
    if (n.left) q.push(n.left);
    if (n.right) q.push(n.right);
    n.children?.forEach((c) => q.push(c));
  }
}
function traverseDFS(node: LNode | undefined, steps: TraversalStep[]) {
  if (!node) return;
  steps.push({ nodeId: node.id, description: `Visit ${node.value}` });
  traverseDFS(node.left, steps);
  traverseDFS(node.right, steps);
  node.children?.forEach((c) => traverseDFS(c, steps));
}

function getTraversal(root: LNode, type: TraversalType): TraversalStep[] {
  const steps: TraversalStep[] = [];
  if (type === "bfs") traverseBFS(root, steps);
  else if (type === "inorder") traverseInorder(root, steps);
  else if (type === "preorder") traversePreorder(root, steps);
  else if (type === "postorder") traversePostorder(root, steps);
  else if (type === "dfs") traverseDFS(root, steps);
  return steps;
}

// ─── Animation Engine ─────────────────────────────────────────────────────────

const SPEEDS = [
  { label: "1×", ms: 1000 },
  { label: "2×", ms: 500 },
  { label: "3×", ms: 200 },
];

function useTraversal(steps: TraversalStep[]) {
  const [idx, setIdx] = React.useState(-1);
  const [playing, setPlaying] = React.useState(false);
  const [speedIdx, setSpeedIdx] = React.useState(0);

  React.useEffect(() => {
    setIdx(-1);
    setPlaying(false);
  }, [steps]);

  React.useEffect(() => {
    if (!playing) return;
    const t = setInterval(() => {
      setIdx((prev) => {
        if (prev >= steps.length - 1) {
          setPlaying(false);
          return prev;
        }
        return prev + 1;
      });
    }, SPEEDS[speedIdx].ms);
    return () => clearInterval(t);
  }, [playing, speedIdx, steps.length]);

  const activeId = idx >= 0 ? steps[idx].nodeId : null;
  const visitedIds = new Set(steps.slice(0, idx + 1).map((s) => s.nodeId));
  const description = idx >= 0 ? steps[idx].description : null;

  return {
    idx,
    setIdx,
    playing,
    setPlaying,
    speedIdx,
    setSpeedIdx,
    activeId,
    visitedIds,
    description,
    total: steps.length,
  };
}

// ─── Rendering Engine ─────────────────────────────────────────────────────────

const PALETTE = {
  normal: {
    fill: "var(--ds-bg, hsl(var(--background)))",
    stroke: "var(--ds-border, hsl(var(--border)))",
    text: "var(--ds-fg, hsl(var(--foreground)))",
  },
  active: {
    fill: "var(--ds-primary-bg, hsl(var(--primary)/0.12))",
    stroke: "var(--ds-primary, hsl(var(--primary)))",
    text: "var(--ds-primary, hsl(var(--primary)))",
  },
  visited: {
    fill: "var(--ds-muted, hsl(var(--muted)))",
    stroke: "var(--ds-muted-fg, hsl(var(--muted-foreground)/0.4))",
    text: "var(--ds-muted-fg, hsl(var(--muted-foreground)))",
  },
  invalid: {
    fill: "var(--ds-err-bg, hsl(var(--destructive)/0.08))",
    stroke: "var(--ds-err, hsl(var(--destructive)))",
    text: "var(--ds-err, hsl(var(--destructive)))",
  },
};
const EDGE_COLOR = {
  normal: "var(--ds-border, hsl(var(--border)))",
  active: "var(--ds-primary, hsl(var(--primary)))",
  invalid: "var(--ds-err, hsl(var(--destructive)))",
};

function EdgeSvg({
  from,
  to,
  r,
  state,
  avlBf,
}: {
  from: LNode;
  to: LNode;
  r: number;
  state: "normal" | "active" | "invalid";
  avlBf?: number;
}) {
  const dx = to.x - from.x,
    dy = to.y - from.y;
  const d = Math.sqrt(dx * dx + dy * dy) || 1;
  const x1 = from.x + (dx / d) * r,
    y1 = from.y + (dy / d) * r;
  const x2 = to.x - (dx / d) * r,
    y2 = to.y - (dy / d) * r;
  const mx = (x1 + x2) / 2,
    my = (y1 + y2) / 2;
  return (
    <g>
      <line
        x1={x1}
        y1={y1}
        x2={x2}
        y2={y2}
        style={{
          stroke: EDGE_COLOR[state],
          strokeWidth: state === "active" ? 2.5 : 1.5,
          transition: "stroke 0.3s",
        }}
      />
    </g>
  );
}

function NodeSvg({
  node,
  r,
  state,
  showBF,
  balanceFactor,
  prefersReducedMotion,
}: {
  node: LNode;
  r: number;
  state: NodeState;
  showBF?: boolean;
  balanceFactor?: number;
  prefersReducedMotion?: boolean;
}) {
  const c = PALETTE[state];
  const isActive = state === "active";
  return (
    <g
      role="treeitem"
      aria-label={`Node ${node.value}${node.annotation ? `, annotation: ${node.annotation}` : ""}`}
    >
      {showBF && balanceFactor !== undefined && (
        <text
          x={node.x + r + 4}
          y={node.y - r - 2}
          style={{
            fontSize: 10,
            fill: EDGE_COLOR[
              Math.abs(balanceFactor) > 1 ? "invalid" : "normal"
            ],
          }}
          aria-hidden="true"
        >
          bf={balanceFactor}
        </text>
      )}
      <circle
        cx={node.x}
        cy={node.y}
        r={r}
        style={{
          fill: c.fill,
          stroke: c.stroke,
          strokeWidth: isActive ? 2.5 : 1.5,
          transition: prefersReducedMotion ? "none" : "fill 0.3s, stroke 0.3s",
        }}
      />
      <text
        x={node.x}
        y={node.y}
        textAnchor="middle"
        dominantBaseline="central"
        style={{
          fontSize: Math.max(10, r * 0.75),
          fontWeight: isActive ? "700" : "400",
          fill: c.text,
          userSelect: "none",
          transition: prefersReducedMotion ? "none" : "fill 0.3s",
        }}
      >
        {node.value}
      </text>
      {node.annotation && (
        <text
          x={node.x}
          y={node.y + r + 14}
          textAnchor="middle"
          style={{
            fontSize: 10,
            fill: "var(--ds-muted-fg, hsl(var(--muted-foreground)))",
            fontStyle: "italic",
          }}
        >
          {node.annotation}
        </text>
      )}
    </g>
  );
}

function renderTree(
  node: LNode,
  r: number,
  invalidIds: Set<string>,
  activeId: string | null,
  visitedIds: Set<string>,
  highlightInvalid: boolean,
  showBF: boolean,
  prefersReducedMotion: boolean,
  selectedId: string | null,
  onNodeClick?: (id: string) => void,
  parentId?: string,
) {
  const edges: React.ReactNode[] = [];
  const nodes: React.ReactNode[] = [];

  function walk(n: LNode, parentNode?: LNode) {
    if (parentNode) {
      const edgeState: "normal" | "active" | "invalid" =
        highlightInvalid && invalidIds.has(n.id)
          ? "invalid"
          : (activeId === n.id || activeId === parentNode.id) &&
              visitedIds.has(n.id)
            ? "active"
            : "normal";
      edges.push(
        <EdgeSvg
          key={`e-${n.id}`}
          from={parentNode}
          to={n}
          r={r}
          state={edgeState}
        />,
      );
    }

    const state: NodeState =
      highlightInvalid && invalidIds.has(n.id)
        ? "invalid"
        : n.id === activeId
          ? "active"
          : visitedIds.has(n.id)
            ? "visited"
            : "normal";

    const bf = showBF ? treeHeight(n.left) - treeHeight(n.right) : undefined;

    nodes.push(
      <g
        key={`n-${n.id}`}
        style={{ cursor: onNodeClick ? "pointer" : "default" }}
        onClick={() => onNodeClick?.(n.id)}
      >
        <NodeSvg
          node={n}
          r={r}
          state={n.id === selectedId && state !== "invalid" ? "active" : state}
          showBF={showBF}
          balanceFactor={bf}
          prefersReducedMotion={prefersReducedMotion}
        />
      </g>,
    );

    if (n.left) walk(n.left, n);
    if (n.right) walk(n.right, n);
    n.children?.forEach((c) => walk(c, n));
  }

  walk(node);
  return { edges, nodes };
}

// ─── Traversal Controls ───────────────────────────────────────────────────────

function TraversalPanel({
  traversal,
  onTypeChange,
  currentType,
}: {
  traversal: ReturnType<typeof useTraversal>;
  onTypeChange: (t: TraversalType | null) => void;
  currentType: TraversalType | null;
}) {
  const types: { value: TraversalType; label: string }[] = [
    { value: "bfs", label: "BFS" },
    { value: "inorder", label: "Inorder" },
    { value: "preorder", label: "Preorder" },
    { value: "postorder", label: "Postorder" },
    { value: "dfs", label: "DFS" },
  ];
  const btn =
    "h-6 rounded px-2 text-[11px] hover:bg-muted disabled:opacity-30 disabled:cursor-not-allowed transition-colors";
  const tbtn = (active: boolean) =>
    cn(
      "h-6 rounded px-2 text-[11px] border transition-colors",
      active
        ? "bg-primary text-primary-foreground border-primary"
        : "hover:bg-muted",
    );

  return (
    <div className="flex flex-wrap items-center gap-1.5 border-b bg-muted/10 px-3 py-1.5">
      {types.map((t) => (
        <button
          key={t.value}
          className={tbtn(currentType === t.value)}
          onClick={() => onTypeChange(currentType === t.value ? null : t.value)}
        >
          {t.label}
        </button>
      ))}
      {currentType && (
        <>
          <span className="text-muted-foreground text-xs">|</span>
          <button
            className={btn}
            onClick={() => {
              traversal.setIdx(-1);
              traversal.setPlaying(false);
            }}
            disabled={traversal.idx < 0}
          >
            ⏮
          </button>
          <button
            className={btn}
            onClick={() => traversal.setIdx((i) => Math.max(-1, i - 1))}
            disabled={traversal.idx < 0}
          >
            ‹
          </button>
          <button
            className={cn(btn, "w-7 font-medium")}
            onClick={() => {
              if (traversal.idx >= traversal.total - 1) {
                traversal.setIdx(-1);
                traversal.setPlaying(true);
              } else traversal.setPlaying((p) => !p);
            }}
          >
            {traversal.playing ? "⏸" : "▶"}
          </button>
          <button
            className={btn}
            onClick={() =>
              traversal.setIdx((i) => Math.min(traversal.total - 1, i + 1))
            }
            disabled={traversal.idx >= traversal.total - 1}
          >
            ›
          </button>
          <button
            className={btn}
            onClick={() => {
              traversal.setIdx(traversal.total - 1);
              traversal.setPlaying(false);
            }}
            disabled={traversal.idx >= traversal.total - 1}
          >
            ⏭
          </button>
          <button
            className={cn(btn, "font-mono ml-1")}
            onClick={() =>
              traversal.setSpeedIdx((s) => (s + 1) % SPEEDS.length)
            }
          >
            {SPEEDS[traversal.speedIdx].label}
          </button>
          {traversal.description && (
            <span className="text-[11px] text-muted-foreground ml-1">
              <span className="font-medium text-foreground">
                {traversal.idx + 1}
              </span>
              /{traversal.total} · {traversal.description}
            </span>
          )}
        </>
      )}
    </div>
  );
}

// ─── Main DSTree Component ────────────────────────────────────────────────────

export interface DSTreeProps {
  data: TreeNodeData;
  type?: TreeType;
  /** Layout width for the internal coordinate space */
  width?: number;
  /** Height per level */
  levelHeight?: number;
  /** Node radius */
  nodeRadius?: number;
  animated?: boolean;
  interactive?: boolean;
  showValidation?: boolean;
  showRules?: boolean;
  highlightInvalid?: boolean;
  showTraversal?: boolean;
  defaultTraversal?: TraversalType;
  /** Show AVL balance factors */
  showBalanceFactor?: boolean;
  theme?: "system" | "light" | "dark";
  className?: string;
}

export function DSTree({
  data,
  type = "binary",
  width = 600,
  levelHeight = 80,
  nodeRadius = 22,
  animated = false,
  interactive = false,
  showValidation = false,
  showRules = false,
  highlightInvalid = true,
  showTraversal = false,
  defaultTraversal,
  showBalanceFactor = false,
  theme = "system",
  className,
}: DSTreeProps) {
  const prefersReduced = React.useMemo(
    () =>
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches,
    [],
  );

  // Normalize + layout
  const iNode = React.useMemo(() => normalize(data), [data]);
  const lNode = React.useMemo(() => {
    if (type === "nary") return layoutNary(iNode, 0, 0, width, levelHeight);
    return layoutBinary(iNode, 0, 0, width, levelHeight);
  }, [iNode, width, levelHeight, type]);

  // Validation
  const validation = React.useMemo<ValidationResult | null>(() => {
    const fn = VALIDATORS[type];
    return fn ? fn(data) : null;
  }, [data, type]);

  const invalidIds =
    showValidation || highlightInvalid
      ? (validation?.invalidNodeIds ?? new Set())
      : new Set<string>();

  // Traversal
  const [activeTraversal, setActiveTraversal] =
    React.useState<TraversalType | null>(defaultTraversal ?? null);
  const traversalSteps = React.useMemo(() => {
    if (!activeTraversal) return [];
    return getTraversal(lNode, activeTraversal);
  }, [lNode, activeTraversal]);
  const trav = useTraversal(traversalSteps);

  // Interaction
  const [selectedId, setSelectedId] = React.useState<string | null>(null);

  // SVG bounds
  const bounds = React.useMemo(
    () => getBounds(lNode, nodeRadius),
    [lNode, nodeRadius],
  );

  const { edges, nodes } = renderTree(
    lNode,
    nodeRadius,
    invalidIds,
    trav.activeId,
    trav.visitedIds,
    highlightInvalid && (showValidation || true), // always highlight invalid when data is wrong
    showBalanceFactor || type === "avl",
    prefersReduced,
    selectedId,
    interactive ? setSelectedId : undefined,
  );

  const isValid = validation?.valid ?? true;
  const rules = RULES[type] ?? [];

  // Selected node info
  const findNode = React.useCallback((n: LNode, id: string): LNode | null => {
    if (n.id === id) return n;
    if (n.left) {
      const l = findNode(n.left, id);
      if (l) return l;
    }
    if (n.right) {
      const r = findNode(n.right, id);
      if (r) return r;
    }
    for (const c of n.children ?? []) {
      const r = findNode(c, id);
      if (r) return r;
    }
    return null;
  }, []);

  const selectedNode = selectedId ? findNode(lNode, selectedId) : null;

  return (
    <div
      className={cn(
        "my-4 overflow-hidden rounded-lg border bg-background",
        theme === "light" && "ds-light",
        theme === "dark" && "ds-dark",
        className,
      )}
      role="tree"
      aria-label={`${type} visualization`}
    >
      {/* Header */}
      <div className="flex items-center gap-2 border-b bg-muted/40 px-3 py-1.5">
        <span className="text-xs font-medium text-muted-foreground capitalize">
          {type === "bst"
            ? "BST"
            : type === "avl"
              ? "AVL Tree"
              : type === "nary"
                ? "N-ary Tree"
                : type.replace("-", " ")}
        </span>
        {showValidation && validation && (
          <span
            className={cn(
              "rounded-full px-1.5 py-0.5 text-[10px] font-semibold",
              isValid
                ? "bg-emerald-100 text-emerald-700 dark:bg-emerald-400/10 dark:text-emerald-400"
                : "bg-destructive/10 text-destructive",
            )}
          >
            {isValid ? "✓ Valid" : "✗ Invalid"}
          </span>
        )}
        <span className="rounded-full border border-amber-400/50 bg-amber-100/60 px-1.5 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-amber-700 dark:border-amber-400/30 dark:bg-amber-400/10 dark:text-amber-400 ml-auto">
          Beta
        </span>
      </div>

      {/* Traversal controls */}
      {showTraversal && (
        <TraversalPanel
          traversal={trav}
          currentType={activeTraversal}
          onTypeChange={setActiveTraversal}
        />
      )}

      {/* SVG diagram */}
      <div className="overflow-x-auto p-2">
        <svg
          viewBox={`${bounds.x} ${bounds.y} ${bounds.w} ${bounds.h}`}
          width="100%"
          style={{ maxHeight: 480 }}
          aria-hidden="false"
          role="img"
          aria-describedby={`ds-tree-desc-${iNode.id}`}
        >
          <desc id={`ds-tree-desc-${iNode.id}`}>
            {type} visualization with root value {data.value}
          </desc>
          <g className="edges">{edges}</g>
          <g className="nodes">{nodes}</g>
        </svg>
      </div>

      {/* Validation panel */}
      {showValidation && validation && !isValid && (
        <div className="border-t bg-destructive/5 px-3 py-2">
          <p className="text-[11px] font-semibold text-destructive mb-1">
            Violated Rules:
          </p>
          <ul className="space-y-0.5">
            {validation.violatedRules.map((r, i) => (
              <li key={i} className="text-[11px] text-destructive flex gap-1.5">
                <span>✗</span>
                <span>{r}</span>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Rules panel */}
      {showRules && rules.length > 0 && (
        <div className="border-t bg-muted/20 px-3 py-2">
          <p className="text-[11px] font-semibold text-muted-foreground mb-1">
            Rules:
          </p>
          <ul className="space-y-0.5">
            {rules.map((r, i) => (
              <li
                key={i}
                className="text-[11px] text-muted-foreground flex gap-1.5"
              >
                <span className="text-emerald-600">✓</span>
                <span>{r}</span>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Selected node info */}
      {interactive && selectedNode && (
        <div className="border-t bg-muted/10 px-3 py-2 flex flex-wrap gap-3">
          <div className="text-[11px]">
            <span className="text-muted-foreground">Value: </span>
            <span className="font-semibold">{selectedNode.value}</span>
          </div>
          <div className="text-[11px]">
            <span className="text-muted-foreground">Height: </span>
            <span className="font-semibold">{treeHeight(selectedNode)}</span>
          </div>
          {(showBalanceFactor || type === "avl") && (
            <div className="text-[11px]">
              <span className="text-muted-foreground">Balance factor: </span>
              <span
                className={cn(
                  "font-semibold",
                  Math.abs(
                    treeHeight(selectedNode.left) -
                      treeHeight(selectedNode.right),
                  ) > 1
                    ? "text-destructive"
                    : "",
                )}
              >
                {treeHeight(selectedNode.left) - treeHeight(selectedNode.right)}
              </span>
            </div>
          )}
          {selectedNode.annotation && (
            <div className="text-[11px] text-muted-foreground italic">
              {selectedNode.annotation}
            </div>
          )}
          <button
            className="text-[11px] text-muted-foreground hover:text-foreground ml-auto"
            onClick={() => setSelectedId(null)}
          >
            ✕
          </button>
        </div>
      )}
    </div>
  );
}

// ─── Convenience components ────────────────────────────────────────────────────

type BaseProps = Omit<DSTreeProps, "data" | "type">;

export function DSBinaryTree(props: { data: TreeNodeData } & BaseProps) {
  return <DSTree {...props} type="binary" />;
}

export function DSBST(props: { data: TreeNodeData } & BaseProps) {
  return (
    <DSTree {...props} type="bst" showValidation showRules highlightInvalid />
  );
}

export function DSAVLTree(props: { data: TreeNodeData } & BaseProps) {
  return (
    <DSTree
      {...props}
      type="avl"
      showValidation
      showRules
      highlightInvalid
      showBalanceFactor
    />
  );
}

export function DSBalancedTree(props: { data: TreeNodeData } & BaseProps) {
  return (
    <DSTree
      {...props}
      type="balanced"
      showValidation
      showRules
      highlightInvalid
    />
  );
}

export function DSFullTree(props: { data: TreeNodeData } & BaseProps) {
  return (
    <DSTree {...props} type="full" showValidation showRules highlightInvalid />
  );
}

export function DSCompleteTree(props: { data: TreeNodeData } & BaseProps) {
  return (
    <DSTree
      {...props}
      type="complete"
      showValidation
      showRules
      highlightInvalid
    />
  );
}

export function DSPerfectTree(props: { data: TreeNodeData } & BaseProps) {
  return (
    <DSTree
      {...props}
      type="perfect"
      showValidation
      showRules
      highlightInvalid
    />
  );
}

// Heap helpers

function buildHeapArr(arr: number[], isMin: boolean): number[] {
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

function arrToTreeData(arr: number[], i = 0): TreeNodeData | undefined {
  if (i >= arr.length) return undefined;
  return {
    id: `h${i}`,
    value: arr[i],
    left: arrToTreeData(arr, 2 * i + 1),
    right: arrToTreeData(arr, 2 * i + 2),
  };
}

export interface DSHeapProps extends BaseProps {
  values: number[];
}

/**
 * Min-Heap: visualizes a heapified array as a complete binary tree.
 * Shows heap property violations when values don't satisfy parent ≤ children.
 * @example
 * <DSMinHeap values={[9, 4, 7, 1, 3, 6]} showTraversal />
 */
export function DSMinHeap({ values, ...props }: DSHeapProps) {
  const heap = React.useMemo(() => buildHeapArr(values, true), [values]);
  const data = React.useMemo(
    () => arrToTreeData(heap) ?? { value: "empty" },
    [heap],
  );
  return (
    <DSTree
      data={data}
      type="min-heap"
      showValidation
      showRules
      highlightInvalid
      {...props}
    />
  );
}

/**
 * Max-Heap: visualizes a heapified array as a complete binary tree.
 * @example
 * <DSMaxHeap values={[1, 4, 7, 9, 3, 6]} showTraversal />
 */
export function DSMaxHeap({ values, ...props }: DSHeapProps) {
  const heap = React.useMemo(() => buildHeapArr(values, false), [values]);
  const data = React.useMemo(
    () => arrToTreeData(heap) ?? { value: "empty" },
    [heap],
  );
  return (
    <DSTree
      data={data}
      type="max-heap"
      showValidation
      showRules
      highlightInvalid
      {...props}
    />
  );
}

export interface DSNaryTreeProps extends BaseProps {
  data: TreeNodeData;
}

/**
 * N-ary tree: each node can have any number of children.
 * Use the `children` array in TreeNodeData instead of `left`/`right`.
 * @example
 * <DSNaryTree data={{ value: "root", children: [{ value: "A" }, { value: "B" }] }} />
 */
export function DSNaryTree({ data, ...props }: DSNaryTreeProps) {
  return <DSTree data={data} type="nary" {...props} />;
}

// ─── Interactive playground ───────────────────────────────────────────────────

export interface DSBSTPlaygroundProps extends BaseProps {
  initialValues?: number[];
}

/**
 * Interactive BST playground — insert numbers and see the tree validate itself.
 * @example
 * <DSBSTPlayground initialValues={[5, 3, 7]} showTraversal />
 */
export function DSBSTPlayground({
  initialValues = [],
  ...props
}: DSBSTPlaygroundProps) {
  const [values, setValues] = React.useState<number[]>(initialValues);
  const [input, setInput] = React.useState("");

  const root = React.useMemo(
    () =>
      values.reduce<TreeNodeData | null>((r, v) => {
        function ins(n: TreeNodeData | null, val: number): TreeNodeData {
          if (!n) return { value: val };
          if (val < Number(n.value))
            return { ...n, left: ins(n.left ?? null, val) };
          if (val > Number(n.value))
            return { ...n, right: ins(n.right ?? null, val) };
          return n;
        }
        return ins(r, v);
      }, null),
    [values],
  );

  const insert = () => {
    const n = Number(input);
    if (!input.trim() || isNaN(n)) return;
    setValues((v) => [...v, n]);
    setInput("");
  };

  const btnP =
    "h-7 rounded bg-primary px-2.5 text-xs text-primary-foreground hover:bg-primary/90 disabled:opacity-40 disabled:cursor-not-allowed transition-colors";
  const btnO =
    "h-7 rounded border px-2.5 text-xs hover:bg-muted disabled:opacity-40 disabled:cursor-not-allowed transition-colors";
  const inp =
    "h-7 w-24 rounded border bg-background px-2 text-xs focus:outline-none focus:ring-1 focus:ring-ring";

  return (
    <div
      className={cn(
        "my-4 overflow-hidden rounded-lg border bg-background",
        props.className,
      )}
    >
      <div className="flex flex-wrap items-center gap-1.5 border-b bg-muted/10 px-3 py-2">
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") insert();
          }}
          placeholder="number…"
          className={inp}
        />
        <button
          onClick={insert}
          disabled={!input.trim() || isNaN(Number(input))}
          className={btnP}
        >
          Insert
        </button>
        <button
          onClick={() => setValues((v) => v.slice(0, -1))}
          disabled={!values.length}
          className={btnO}
        >
          Undo Last
        </button>
        <button
          onClick={() => setValues([])}
          disabled={!values.length}
          className={btnO}
        >
          Clear
        </button>
        <span className="text-[11px] text-muted-foreground ml-auto">
          nodes: {values.length}
        </span>
      </div>
      {root ? (
        <DSTree
          data={root}
          type="bst"
          showValidation
          showRules
          highlightInvalid
          interactive
          className="my-0 rounded-none border-0"
          {...props}
        />
      ) : (
        <div className="flex h-32 items-center justify-center text-sm text-muted-foreground">
          Insert numbers to build the BST
        </div>
      )}
    </div>
  );
}
