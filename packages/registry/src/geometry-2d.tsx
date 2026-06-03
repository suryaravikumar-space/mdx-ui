import * as React from "react";
import { cn } from "@/lib/utils";

// ═══════════════════════════════════════════════════════════════════════════════
// GEOMETRY 2D  —  Fig* component family
// All coordinates are in "world units". FigScene owns the SVG root and
// coordinate transform; every other component uses the GeoCtx context.
//
// SECTION 1  — Context & FigScene
// SECTION 2  — Points, Basic Lines & Arrows (existing primitives)
// SECTION 3  — Engineering Line Types (10 line styles)
// SECTION 4  — Curved Shapes & Conics (11 shapes)
// SECTION 5  — Triangles (5 components)
// SECTION 6  — Quadrilaterals (11 components)
// SECTION 7  — Regular Polygons (9 components)
// SECTION 8  — Star & Non-Convex Polygons (4 components)
// SECTION 9  — Infinite & Fractal Shapes (2 components)
// SECTION 10 — Annotations & Special (5 components)
// ═══════════════════════════════════════════════════════════════════════════════

// ─── Internal utilities ───────────────────────────────────────────────────────

interface GeoCtx {
  toPixel: (x: number, y: number) => { px: number; py: number };
  /** Inverse transform — converts SVG pixel coords back to world coords. */
  fromPixel: (px: number, py: number) => [number, number];
  scaleLen: (n: number) => number;
  markerId: string;
}

const GeoContext = React.createContext<GeoCtx | null>(null);

function useGeo(): GeoCtx {
  const ctx = React.useContext(GeoContext);
  if (!ctx) throw new Error("Fig* primitives must be used inside <FigScene>");
  return ctx;
}

/** Public hook — lets sibling files (electronics.tsx, etc.) share the FigScene coordinate system. */
export function useFigScene(): GeoCtx {
  return useGeo();
}

/** Sample a parametric curve and return an SVG path string (world coords). */
function samplePath(
  toPixel: GeoCtx["toPixel"],
  fn: (t: number) => [number, number],
  tMin: number,
  tMax: number,
  steps = 120,
  closed = false,
): string {
  let fresh = true;
  const pts: string[] = [];
  for (let i = 0; i <= steps; i++) {
    const t = tMin + (i / steps) * (tMax - tMin);
    const [x, y] = fn(t);
    const { px, py } = toPixel(x, y);
    if (!isFinite(px) || !isFinite(py)) {
      fresh = true;
      continue;
    }
    pts.push(`${fresh ? "M" : "L"}${px.toFixed(1)} ${py.toFixed(1)}`);
    fresh = false;
  }
  return closed ? pts.join(" ") + " Z" : pts.join(" ");
}

/** Vertices of a regular n-gon centred at (cx,cy) with circumradius r (world units). */
function ngonPts(
  n: number,
  cx: number,
  cy: number,
  r: number,
  startDeg = -90,
): [number, number][] {
  const s = (startDeg * Math.PI) / 180;
  return Array.from({ length: n }, (_, i) => {
    const a = s + (2 * Math.PI * i) / n;
    return [cx + r * Math.cos(a), cy + r * Math.sin(a)] as [number, number];
  });
}

/** Vertices of a star polygon with alternating outer/inner radius. */
function starPts(
  n: number,
  cx: number,
  cy: number,
  r: number,
  inner: number,
): [number, number][] {
  return Array.from({ length: 2 * n }, (_, i) => {
    const a = -Math.PI / 2 + (Math.PI * i) / n;
    const rad = i % 2 === 0 ? r : inner;
    return [cx + rad * Math.cos(a), cy + rad * Math.sin(a)] as [number, number];
  });
}

/** Convert world-coord point array to SVG polygon `points` string. */
function toPoly(toPixel: GeoCtx["toPixel"], pts: [number, number][]): string {
  return pts
    .map(([x, y]) => {
      const { px, py } = toPixel(x, y);
      return `${px.toFixed(1)},${py.toFixed(1)}`;
    })
    .join(" ");
}

/** Full circle SVG path string (two arcs). Used for evenodd tricks. */
function circlePath(cx: number, cy: number, r: number): string {
  return `M ${cx - r} ${cy} A ${r} ${r} 0 1 0 ${cx + r} ${cy} A ${r} ${r} 0 1 0 ${cx - r} ${cy} Z`;
}

// ═══════════════════════════════════════════════════════════════════════════════
// SECTION 1 — Context & FigScene
// ═══════════════════════════════════════════════════════════════════════════════

interface FigSceneProps {
  width?: number;
  height?: number;
  xRange?: [number, number];
  yRange?: [number, number];
  showGrid?: boolean;
  showAxes?: boolean;
  label?: string;
  className?: string;
  children?: React.ReactNode;
}

/** SVG coordinate plane. Wrap all Fig* primitives inside this component. */
export function FigScene({
  width = 400,
  height = 300,
  xRange = [-5, 5],
  yRange = [-5, 5],
  showGrid = true,
  showAxes = true,
  label = "Geometry diagram",
  className,
  children,
}: FigSceneProps) {
  const uid = React.useId().replace(/:/g, "");
  const markerId = `${uid}a`;
  const [xMin, xMax] = xRange;
  const [yMin, yMax] = yRange;

  const toPixel = React.useCallback(
    (x: number, y: number) => ({
      px: ((x - xMin) / (xMax - xMin)) * width,
      py: height - ((y - yMin) / (yMax - yMin)) * height,
    }),
    [xMin, xMax, yMin, yMax, width, height],
  );

  const fromPixel = React.useCallback(
    (px: number, py: number): [number, number] => [
      (px / width) * (xMax - xMin) + xMin,
      ((height - py) / height) * (yMax - yMin) + yMin,
    ],
    [width, height, xMin, xMax, yMin, yMax],
  );

  const scaleLen = React.useCallback(
    (n: number) => (n * width) / (xMax - xMin),
    [width, xMin, xMax],
  );

  const grid: React.ReactNode[] = [];
  if (showGrid) {
    for (let xi = Math.ceil(xMin); xi <= Math.floor(xMax); xi++) {
      const { px } = toPixel(xi, 0);
      grid.push(
        <line
          key={`gx${xi}`}
          x1={px}
          y1={0}
          x2={px}
          y2={height}
          stroke="currentColor"
          strokeWidth={0.5}
          opacity={0.15}
        />,
      );
    }
    for (let yi = Math.ceil(yMin); yi <= Math.floor(yMax); yi++) {
      const { py } = toPixel(0, yi);
      grid.push(
        <line
          key={`gy${yi}`}
          x1={0}
          y1={py}
          x2={width}
          y2={py}
          stroke="currentColor"
          strokeWidth={0.5}
          opacity={0.15}
        />,
      );
    }
  }

  const axes: React.ReactNode[] = [];
  if (showAxes) {
    const { px: ox, py: oy } = toPixel(0, 0);
    const tk = 3;
    axes.push(
      <line
        key="ax"
        x1={0}
        y1={oy}
        x2={width}
        y2={oy}
        stroke="currentColor"
        strokeWidth={1}
        opacity={0.5}
      />,
      <line
        key="ay"
        x1={ox}
        y1={0}
        x2={ox}
        y2={height}
        stroke="currentColor"
        strokeWidth={1}
        opacity={0.5}
      />,
    );
    for (let xi = Math.ceil(xMin); xi <= Math.floor(xMax); xi++) {
      if (xi === 0) continue;
      const { px } = toPixel(xi, 0);
      axes.push(
        <line
          key={`tx${xi}`}
          x1={px}
          y1={oy - tk}
          x2={px}
          y2={oy + tk}
          stroke="currentColor"
          strokeWidth={0.75}
          opacity={0.5}
        />,
      );
    }
    for (let yi = Math.ceil(yMin); yi <= Math.floor(yMax); yi++) {
      if (yi === 0) continue;
      const { py } = toPixel(0, yi);
      axes.push(
        <line
          key={`ty${yi}`}
          x1={ox - tk}
          y1={py}
          x2={ox + tk}
          y2={py}
          stroke="currentColor"
          strokeWidth={0.75}
          opacity={0.5}
        />,
      );
    }
  }

  return (
    <GeoContext.Provider value={{ toPixel, fromPixel, scaleLen, markerId }}>
      <svg
        width={width}
        height={height}
        viewBox={`0 0 ${width} ${height}`}
        role="img"
        aria-label={label}
        className={cn("max-w-full", className)}
      >
        <defs>
          <marker
            id={markerId}
            markerWidth="8"
            markerHeight="6"
            refX="7"
            refY="3"
            orient="auto"
          >
            <polygon points="0 0, 8 3, 0 6" fill="currentColor" />
          </marker>
        </defs>
        {grid}
        {axes}
        {children}
      </svg>
    </GeoContext.Provider>
  );
}
FigScene.displayName = "FigScene";

// ═══════════════════════════════════════════════════════════════════════════════
// SECTION 2 — Points, Basic Lines & Arrows
// ═══════════════════════════════════════════════════════════════════════════════

export function FigPoint({
  x,
  y,
  label,
  labelDir = "ne",
  r = 4,
  color = "currentColor",
}: {
  x: number;
  y: number;
  label?: string;
  labelDir?: "ne" | "nw" | "se" | "sw";
  r?: number;
  color?: string;
}) {
  const { toPixel } = useGeo();
  const { px, py } = toPixel(x, y);
  const off = 8;
  const dx = labelDir === "ne" || labelDir === "se" ? off : -off;
  const dy = labelDir === "ne" || labelDir === "nw" ? -off : off;
  const anchor = labelDir === "ne" || labelDir === "se" ? "start" : "end";
  return (
    <g>
      <circle cx={px} cy={py} r={r} fill={color} />
      {label && (
        <text
          x={px + dx}
          y={py + dy}
          fill={color}
          fontSize={12}
          textAnchor={anchor}
          dominantBaseline="central"
        >
          {label}
        </text>
      )}
    </g>
  );
}
FigPoint.displayName = "FigPoint";

export function FigVector({
  fromX = 0,
  fromY = 0,
  toX,
  toY,
  label,
  color = "currentColor",
  strokeWidth = 1.5,
}: {
  fromX?: number;
  fromY?: number;
  toX: number;
  toY: number;
  label?: string;
  color?: string;
  strokeWidth?: number;
}) {
  const { toPixel, markerId } = useGeo();
  const { px: x1, py: y1 } = toPixel(fromX, fromY);
  const { px: x2, py: y2 } = toPixel(toX, toY);
  const mx = (x1 + x2) / 2,
    my = (y1 + y2) / 2;
  const dx = x2 - x1,
    dy = y2 - y1;
  const len = Math.sqrt(dx * dx + dy * dy);
  const sh = len > 0 ? 8 / len : 0;
  return (
    <g fill={color} stroke={color}>
      <line
        x1={x1}
        y1={y1}
        x2={x2 - dx * sh}
        y2={y2 - dy * sh}
        strokeWidth={strokeWidth}
        markerEnd={`url(#${markerId})`}
      />
      {label && (
        <text
          x={mx + 6}
          y={my - 6}
          fontSize={12}
          fill={color}
          stroke="none"
          textAnchor="start"
          dominantBaseline="central"
        >
          {label}
        </text>
      )}
    </g>
  );
}
FigVector.displayName = "FigVector";

export function FigLine({
  x1,
  y1,
  x2,
  y2,
  dashed = false,
  color = "currentColor",
  strokeWidth = 1.5,
}: {
  x1: number;
  y1: number;
  x2: number;
  y2: number;
  dashed?: boolean;
  color?: string;
  strokeWidth?: number;
}) {
  const { toPixel } = useGeo();
  const a = toPixel(x1, y1),
    b = toPixel(x2, y2);
  return (
    <line
      x1={a.px}
      y1={a.py}
      x2={b.px}
      y2={b.py}
      stroke={color}
      strokeWidth={strokeWidth}
      strokeDasharray={dashed ? "5 3" : undefined}
    />
  );
}
FigLine.displayName = "FigLine";

export function FigSegment({
  x1,
  y1,
  x2,
  y2,
  label,
  tickMarks = false,
  color = "currentColor",
  strokeWidth = 1.5,
}: {
  x1: number;
  y1: number;
  x2: number;
  y2: number;
  label?: string;
  tickMarks?: boolean;
  color?: string;
  strokeWidth?: number;
}) {
  const { toPixel } = useGeo();
  const a = toPixel(x1, y1),
    b = toPixel(x2, y2);
  const mx = (a.px + b.px) / 2,
    my = (a.py + b.py) / 2;
  const dx = b.px - a.px,
    dy = b.py - a.py;
  const len = Math.sqrt(dx * dx + dy * dy);
  const nx = len > 0 ? -dy / len : 0,
    ny = len > 0 ? dx / len : 1;
  return (
    <g>
      <line
        x1={a.px}
        y1={a.py}
        x2={b.px}
        y2={b.py}
        stroke={color}
        strokeWidth={strokeWidth}
      />
      {tickMarks && (
        <line
          x1={mx + nx * 5}
          y1={my + ny * 5}
          x2={mx - nx * 5}
          y2={my - ny * 5}
          stroke={color}
          strokeWidth={strokeWidth}
        />
      )}
      {label && (
        <text
          x={mx + nx * 10}
          y={my + ny * 10}
          fill={color}
          fontSize={11}
          textAnchor="middle"
          dominantBaseline="central"
        >
          {label}
        </text>
      )}
    </g>
  );
}
FigSegment.displayName = "FigSegment";

export function FigCircle({
  cx,
  cy,
  r,
  fill = "none",
  stroke = "currentColor",
  dashed = false,
  strokeWidth = 1.5,
  opacity = 1,
}: {
  cx: number;
  cy: number;
  r: number;
  fill?: string;
  stroke?: string;
  dashed?: boolean;
  strokeWidth?: number;
  opacity?: number;
}) {
  const { toPixel, scaleLen } = useGeo();
  const { px, py } = toPixel(cx, cy);
  const pr = scaleLen(r);
  return (
    <circle
      cx={px}
      cy={py}
      r={pr}
      fill={fill}
      stroke={stroke}
      strokeWidth={strokeWidth}
      opacity={opacity}
      strokeDasharray={dashed ? "5 3" : undefined}
    />
  );
}
FigCircle.displayName = "FigCircle";

export function FigArc({
  cx,
  cy,
  r,
  startDeg,
  endDeg,
  color = "currentColor",
  strokeWidth = 1.5,
}: {
  cx: number;
  cy: number;
  r: number;
  startDeg: number;
  endDeg: number;
  color?: string;
  strokeWidth?: number;
}) {
  const { toPixel, scaleLen } = useGeo();
  const { px, py } = toPixel(cx, cy);
  const pr = scaleLen(r);
  const toRad = (d: number) => (-d * Math.PI) / 180;
  const x1 = px + pr * Math.cos(toRad(startDeg));
  const y1 = py + pr * Math.sin(toRad(startDeg));
  const x2 = px + pr * Math.cos(toRad(endDeg));
  const y2 = py + pr * Math.sin(toRad(endDeg));
  const sweep = (((endDeg - startDeg) % 360) + 360) % 360;
  const d = `M ${x1} ${y1} A ${pr} ${pr} 0 ${sweep > 180 ? 1 : 0} 0 ${x2} ${y2}`;
  return <path d={d} fill="none" stroke={color} strokeWidth={strokeWidth} />;
}
FigArc.displayName = "FigArc";

export function FigAngle({
  vertex,
  from,
  to,
  label,
  radius = 0.5,
  color = "currentColor",
  strokeWidth = 1.2,
}: {
  vertex: { x: number; y: number };
  from: { x: number; y: number };
  to: { x: number; y: number };
  label?: string;
  radius?: number;
  color?: string;
  strokeWidth?: number;
}) {
  const { toPixel, scaleLen } = useGeo();
  const { px: vx, py: vy } = toPixel(vertex.x, vertex.y);
  const pr = scaleLen(radius);
  const a1 = Math.atan2(-(from.y - vertex.y), from.x - vertex.x);
  const a2 = Math.atan2(-(to.y - vertex.y), to.x - vertex.x);
  const x1 = vx + pr * Math.cos(a1),
    y1 = vy + pr * Math.sin(a1);
  const x2 = vx + pr * Math.cos(a2),
    y2 = vy + pr * Math.sin(a2);
  const diff = (((a2 - a1) % (2 * Math.PI)) + 2 * Math.PI) % (2 * Math.PI);
  const ccwSpan = 2 * Math.PI - diff;
  const d = `M ${x1} ${y1} A ${pr} ${pr} 0 ${ccwSpan > Math.PI ? 1 : 0} 0 ${x2} ${y2}`;
  const mid = a1 - ccwSpan / 2;
  return (
    <g>
      <path d={d} fill="none" stroke={color} strokeWidth={strokeWidth} />
      {label && (
        <text
          x={vx + (pr + 10) * Math.cos(mid)}
          y={vy + (pr + 10) * Math.sin(mid)}
          fill={color}
          fontSize={11}
          textAnchor="middle"
          dominantBaseline="central"
        >
          {label}
        </text>
      )}
    </g>
  );
}
FigAngle.displayName = "FigAngle";

export function FigPolygon({
  points,
  fill = "none",
  stroke = "currentColor",
  strokeWidth = 1.5,
  opacity = 1,
  label,
}: {
  points: [number, number][];
  fill?: string;
  stroke?: string;
  strokeWidth?: number;
  opacity?: number;
  label?: string;
}) {
  const { toPixel } = useGeo();
  const px = points.map(([x, y]) => toPixel(x, y));
  const cx = px.reduce((s, p) => s + p.px, 0) / px.length;
  const cy = px.reduce((s, p) => s + p.py, 0) / px.length;
  return (
    <g>
      <polygon
        points={toPoly(toPixel, points)}
        fill={fill}
        stroke={stroke}
        strokeWidth={strokeWidth}
        opacity={opacity}
      />
      {label && (
        <text
          x={cx}
          y={cy}
          fill={stroke}
          fontSize={12}
          textAnchor="middle"
          dominantBaseline="central"
        >
          {label}
        </text>
      )}
    </g>
  );
}
FigPolygon.displayName = "FigPolygon";

export function FigLabel({
  x,
  y,
  dx = 0,
  dy = 0,
  fontSize = 13,
  anchor = "middle",
  color = "currentColor",
  children,
}: {
  x: number;
  y: number;
  dx?: number;
  dy?: number;
  fontSize?: number;
  anchor?: "start" | "middle" | "end";
  color?: string;
  children: React.ReactNode;
}) {
  const { toPixel } = useGeo();
  const { px, py } = toPixel(x, y);
  return (
    <text
      x={px + dx}
      y={py + dy}
      fill={color}
      fontSize={fontSize}
      textAnchor={anchor}
      dominantBaseline="central"
    >
      {children}
    </text>
  );
}
FigLabel.displayName = "FigLabel";

// ═══════════════════════════════════════════════════════════════════════════════
// SECTION 3 — Engineering Line Types
// ═══════════════════════════════════════════════════════════════════════════════

interface ELineProps {
  x1: number;
  y1: number;
  x2: number;
  y2: number;
  color?: string;
}

/** Continuous thick line — visible outer edges. */
export function FigVisibleLine({
  x1,
  y1,
  x2,
  y2,
  color = "currentColor",
}: ELineProps) {
  const { toPixel } = useGeo();
  const a = toPixel(x1, y1),
    b = toPixel(x2, y2);
  return (
    <line
      x1={a.px}
      y1={a.py}
      x2={b.px}
      y2={b.py}
      stroke={color}
      strokeWidth={2}
    />
  );
}
FigVisibleLine.displayName = "FigVisibleLine";

/** Dashed medium line — hidden / obscured features. */
export function FigHiddenLine({
  x1,
  y1,
  x2,
  y2,
  color = "currentColor",
}: ELineProps) {
  const { toPixel } = useGeo();
  const a = toPixel(x1, y1),
    b = toPixel(x2, y2);
  return (
    <line
      x1={a.px}
      y1={a.py}
      x2={b.px}
      y2={b.py}
      stroke={color}
      strokeWidth={1}
      strokeDasharray="5 3"
    />
  );
}
FigHiddenLine.displayName = "FigHiddenLine";

/** Alternating long/short dashes — symmetry / center axes. */
export function FigCenterLine({
  x1,
  y1,
  x2,
  y2,
  color = "currentColor",
}: ELineProps) {
  const { toPixel } = useGeo();
  const a = toPixel(x1, y1),
    b = toPixel(x2, y2);
  return (
    <line
      x1={a.px}
      y1={a.py}
      x2={b.px}
      y2={b.py}
      stroke={color}
      strokeWidth={0.75}
      strokeDasharray="12 3 3 3"
    />
  );
}
FigCenterLine.displayName = "FigCenterLine";

/** One long, two short dashes — phantom / moving parts. */
export function FigPhantomLine({
  x1,
  y1,
  x2,
  y2,
  color = "currentColor",
}: ELineProps) {
  const { toPixel } = useGeo();
  const a = toPixel(x1, y1),
    b = toPixel(x2, y2);
  return (
    <line
      x1={a.px}
      y1={a.py}
      x2={b.px}
      y2={b.py}
      stroke={color}
      strokeWidth={0.75}
      strokeDasharray="12 3 3 3 3 3"
    />
  );
}
FigPhantomLine.displayName = "FigPhantomLine";

/** Very thin line — extension / boundary alongside dimension lines. */
export function FigExtensionLine({
  x1,
  y1,
  x2,
  y2,
  color = "currentColor",
}: ELineProps) {
  const { toPixel } = useGeo();
  const a = toPixel(x1, y1),
    b = toPixel(x2, y2);
  return (
    <line
      x1={a.px}
      y1={a.py}
      x2={b.px}
      y2={b.py}
      stroke={color}
      strokeWidth={0.5}
    />
  );
}
FigExtensionLine.displayName = "FigExtensionLine";

/** Heavy dashed line — cutting-plane / section cut. */
export function FigCuttingPlane({
  x1,
  y1,
  x2,
  y2,
  color = "currentColor",
}: ELineProps) {
  const { toPixel } = useGeo();
  const a = toPixel(x1, y1),
    b = toPixel(x2, y2);
  return (
    <line
      x1={a.px}
      y1={a.py}
      x2={b.px}
      y2={b.py}
      stroke={color}
      strokeWidth={3}
      strokeDasharray="10 5"
    />
  );
}
FigCuttingPlane.displayName = "FigCuttingPlane";

/** Thin line with double arrowheads — dimension / measurement. */
export function FigDimensionLine({
  x1,
  y1,
  x2,
  y2,
  label,
  color = "currentColor",
}: ELineProps & { label?: string }) {
  const { toPixel } = useGeo();
  const uid = React.useId().replace(/:/g, "");
  const mS = `${uid}s`,
    mE = `${uid}e`;
  const a = toPixel(x1, y1),
    b = toPixel(x2, y2);
  const mx = (a.px + b.px) / 2,
    my = (a.py + b.py) / 2;
  const dx = b.px - a.px,
    dy = b.py - a.py;
  const len = Math.sqrt(dx * dx + dy * dy);
  const nx = len > 0 ? -dy / len : 0,
    ny = len > 0 ? dx / len : 1;
  return (
    <g>
      <defs>
        <marker
          id={mE}
          markerWidth="6"
          markerHeight="6"
          refX="5"
          refY="3"
          orient="auto"
        >
          <polygon points="0 0, 6 3, 0 6" fill={color} />
        </marker>
        <marker
          id={mS}
          markerWidth="6"
          markerHeight="6"
          refX="1"
          refY="3"
          orient="auto-start-reverse"
        >
          <polygon points="0 0, 6 3, 0 6" fill={color} />
        </marker>
      </defs>
      <line
        x1={a.px}
        y1={a.py}
        x2={b.px}
        y2={b.py}
        stroke={color}
        strokeWidth={0.75}
        markerStart={`url(#${mS})`}
        markerEnd={`url(#${mE})`}
      />
      {label && (
        <text
          x={mx + nx * 8}
          y={my + ny * 8}
          fill={color}
          fontSize={11}
          textAnchor="middle"
          dominantBaseline="central"
        >
          {label}
        </text>
      )}
    </g>
  );
}
FigDimensionLine.displayName = "FigDimensionLine";

/** Thin pointer line with arrowhead and optional note — leader line. */
export function FigLeaderLine({
  x1,
  y1,
  x2,
  y2,
  note,
  color = "currentColor",
}: ELineProps & { note?: string }) {
  const { toPixel, markerId } = useGeo();
  const a = toPixel(x1, y1),
    b = toPixel(x2, y2);
  return (
    <g>
      <line
        x1={a.px}
        y1={a.py}
        x2={b.px}
        y2={b.py}
        stroke={color}
        strokeWidth={0.75}
        markerEnd={`url(#${markerId})`}
      />
      {note && (
        <text
          x={a.px}
          y={a.py - 7}
          fill={color}
          fontSize={10}
          textAnchor="middle"
        >
          {note}
        </text>
      )}
    </g>
  );
}
FigLeaderLine.displayName = "FigLeaderLine";

/** Diagonal hatching over a rectangular region — cross-section indication. */
export function FigSectionHatch({
  x,
  y,
  w,
  h,
  spacing = 0.4,
  angle = 45,
  color = "currentColor",
}: {
  x: number;
  y: number;
  w: number;
  h: number;
  spacing?: number;
  angle?: number;
  color?: string;
}) {
  const { toPixel, scaleLen } = useGeo();
  const tl = toPixel(x, y + h),
    br = toPixel(x + w, y);
  const uid = React.useId().replace(/:/g, "");
  const sp = scaleLen(spacing);
  return (
    <g>
      <defs>
        <pattern
          id={uid}
          patternUnits="userSpaceOnUse"
          width={sp}
          height={sp}
          patternTransform={`rotate(${angle})`}
        >
          <line x1={0} y1={0} x2={0} y2={sp} stroke={color} strokeWidth={0.5} />
        </pattern>
        <clipPath id={`${uid}c`}>
          <rect
            x={tl.px}
            y={tl.py}
            width={br.px - tl.px}
            height={br.py - tl.py}
          />
        </clipPath>
      </defs>
      <rect
        x={tl.px}
        y={tl.py}
        width={br.px - tl.px}
        height={br.py - tl.py}
        fill={`url(#${uid})`}
        clipPath={`url(#${uid}c)`}
      />
    </g>
  );
}
FigSectionHatch.displayName = "FigSectionHatch";

/** Wavy line — break line for shortened views. */
export function FigBreakLine({
  x1,
  y1,
  x2,
  y2,
  amplitude = 0.15,
  frequency = 3,
  color = "currentColor",
}: ELineProps & { amplitude?: number; frequency?: number }) {
  const { toPixel, scaleLen } = useGeo();
  const a = toPixel(x1, y1),
    b = toPixel(x2, y2);
  const dx = b.px - a.px,
    dy = b.py - a.py;
  const len = Math.sqrt(dx * dx + dy * dy);
  const nx = len > 0 ? -dy / len : 0,
    ny = len > 0 ? dx / len : 1;
  const amp = scaleLen(amplitude);
  const pts = Array.from({ length: 61 }, (_, i) => {
    const t = i / 60;
    const off = amp * Math.sin(frequency * t * 2 * Math.PI);
    return `${i === 0 ? "M" : "L"}${(a.px + t * dx + nx * off).toFixed(1)} ${(a.py + t * dy + ny * off).toFixed(1)}`;
  });
  return <path d={pts.join(" ")} fill="none" stroke={color} strokeWidth={1} />;
}
FigBreakLine.displayName = "FigBreakLine";

// ═══════════════════════════════════════════════════════════════════════════════
// SECTION 4 — Curved Shapes & Conics
// ═══════════════════════════════════════════════════════════════════════════════

/** Ellipse — separate x/y radii. `showAxes` draws major/minor axis lines. */
export function FigEllipse({
  cx,
  cy,
  rx,
  ry,
  fill = "none",
  stroke = "currentColor",
  dashed = false,
  strokeWidth = 1.5,
  opacity = 1,
  showAxes = false,
  label,
}: {
  cx: number;
  cy: number;
  rx: number;
  ry: number;
  fill?: string;
  stroke?: string;
  dashed?: boolean;
  strokeWidth?: number;
  opacity?: number;
  showAxes?: boolean;
  label?: string;
}) {
  const { toPixel, scaleLen } = useGeo();
  const { px, py } = toPixel(cx, cy);
  const prx = scaleLen(rx),
    pry = scaleLen(ry);
  return (
    <g>
      <ellipse
        cx={px}
        cy={py}
        rx={prx}
        ry={pry}
        fill={fill}
        stroke={stroke}
        strokeWidth={strokeWidth}
        strokeDasharray={dashed ? "5 3" : undefined}
        opacity={opacity}
      />
      {showAxes && (
        <>
          <line
            x1={px - prx}
            y1={py}
            x2={px + prx}
            y2={py}
            stroke={stroke}
            strokeWidth={0.5}
            opacity={0.4}
            strokeDasharray="4 2"
          />
          <line
            x1={px}
            y1={py - pry}
            x2={px}
            y2={py + pry}
            stroke={stroke}
            strokeWidth={0.5}
            opacity={0.4}
            strokeDasharray="4 2"
          />
        </>
      )}
      {label && (
        <text
          x={px}
          y={py}
          fill={stroke}
          fontSize={12}
          textAnchor="middle"
          dominantBaseline="central"
        >
          {label}
        </text>
      )}
    </g>
  );
}
FigEllipse.displayName = "FigEllipse";

/** Semicircle — half of a circle. `orientation` picks which half. */
export function FigSemicircle({
  cx,
  cy,
  r,
  orientation = "top",
  fill = "none",
  stroke = "currentColor",
  strokeWidth = 1.5,
}: {
  cx: number;
  cy: number;
  r: number;
  orientation?: "top" | "bottom" | "left" | "right";
  fill?: string;
  stroke?: string;
  strokeWidth?: number;
}) {
  const { toPixel, scaleLen } = useGeo();
  const { px, py } = toPixel(cx, cy);
  const pr = scaleLen(r);
  // sweep=0 (CCW in SVG) goes through the upper half in world coords (y-flip applied)
  const d: Record<string, string> = {
    top: `M ${px - pr} ${py} A ${pr} ${pr} 0 0 0 ${px + pr} ${py} Z`,
    bottom: `M ${px - pr} ${py} A ${pr} ${pr} 0 0 1 ${px + pr} ${py} Z`,
    right: `M ${px} ${py - pr} A ${pr} ${pr} 0 0 1 ${px} ${py + pr} Z`,
    left: `M ${px} ${py - pr} A ${pr} ${pr} 0 0 0 ${px} ${py + pr} Z`,
  };
  return (
    <path
      d={d[orientation]}
      fill={fill}
      stroke={stroke}
      strokeWidth={strokeWidth}
    />
  );
}
FigSemicircle.displayName = "FigSemicircle";

/** Oval — egg shape with adjustable asymmetry (0=ellipse, 1=strong taper). */
export function FigOval({
  cx,
  cy,
  rx,
  ry,
  asymmetry = 0.25,
  fill = "none",
  stroke = "currentColor",
  strokeWidth = 1.5,
  steps = 80,
}: {
  cx: number;
  cy: number;
  rx: number;
  ry: number;
  asymmetry?: number;
  fill?: string;
  stroke?: string;
  strokeWidth?: number;
  steps?: number;
}) {
  const { toPixel } = useGeo();
  const d = samplePath(
    toPixel,
    (t) => {
      const ryt = ry * (1 + asymmetry * Math.sin(t - Math.PI / 2) * 0.3);
      return [cx + rx * Math.cos(t), cy + ryt * Math.sin(t)];
    },
    0,
    2 * Math.PI,
    steps,
    true,
  );
  return <path d={d} fill={fill} stroke={stroke} strokeWidth={strokeWidth} />;
}
FigOval.displayName = "FigOval";

/** Crescent — outer circle with an inner-circle bite removed (evenodd). */
export function FigCrescent({
  cx,
  cy,
  r,
  innerR,
  offsetX = 0,
  offsetY = 0,
  fill = "currentColor",
  stroke = "currentColor",
  strokeWidth = 1.5,
  opacity = 0.15,
}: {
  cx: number;
  cy: number;
  r: number;
  innerR: number;
  offsetX?: number;
  offsetY?: number;
  fill?: string;
  stroke?: string;
  strokeWidth?: number;
  opacity?: number;
}) {
  const { toPixel, scaleLen } = useGeo();
  const { px: opx, py: opy } = toPixel(cx, cy);
  const { px: ipx, py: ipy } = toPixel(cx + offsetX, cy + offsetY);
  const opr = scaleLen(r),
    ipr = scaleLen(innerR);
  const outerD = circlePath(opx, opy, opr);
  const innerD = circlePath(ipx, ipy, ipr);
  return (
    <path
      d={`${outerD} ${innerD}`}
      fillRule="evenodd"
      fill={fill}
      stroke={stroke}
      strokeWidth={strokeWidth}
      opacity={opacity}
    />
  );
}
FigCrescent.displayName = "FigCrescent";

/** Lens — intersection region of two equal overlapping circles. */
export function FigLens({
  cx,
  cy,
  spread,
  r,
  fill = "currentColor",
  stroke = "currentColor",
  strokeWidth = 1.5,
  opacity = 0.15,
  label,
}: {
  cx: number;
  cy: number;
  spread: number;
  r: number;
  fill?: string;
  stroke?: string;
  strokeWidth?: number;
  opacity?: number;
  label?: string;
}) {
  const { toPixel, scaleLen } = useGeo();
  const { px, py } = toPixel(cx, cy);
  const sp = scaleLen(spread);
  const rp = scaleLen(r);
  const h = Math.sqrt(Math.max(0, rp * rp - sp * sp));
  const topY = py - h,
    botY = py + h;
  const d = `M ${px} ${topY} A ${rp} ${rp} 0 0 1 ${px} ${botY} A ${rp} ${rp} 0 0 1 ${px} ${topY} Z`;
  return (
    <g>
      <path
        d={d}
        fill={fill}
        stroke={stroke}
        strokeWidth={strokeWidth}
        opacity={opacity}
      />
      {label && (
        <text
          x={px}
          y={py}
          fill={stroke}
          fontSize={12}
          textAnchor="middle"
          dominantBaseline="central"
        >
          {label}
        </text>
      )}
    </g>
  );
}
FigLens.displayName = "FigLens";

/** Lune — region inside a large circle but outside an offset smaller circle. */
export function FigLune({
  cx,
  cy,
  r,
  innerR,
  offsetX = 0,
  offsetY = 0,
  fill = "currentColor",
  stroke = "currentColor",
  strokeWidth = 1.5,
  opacity = 0.2,
}: {
  cx: number;
  cy: number;
  r: number;
  innerR: number;
  offsetX?: number;
  offsetY?: number;
  fill?: string;
  stroke?: string;
  strokeWidth?: number;
  opacity?: number;
}) {
  const { toPixel, scaleLen } = useGeo();
  const { px: opx, py: opy } = toPixel(cx, cy);
  const { px: ipx, py: ipy } = toPixel(cx + offsetX, cy + offsetY);
  const opr = scaleLen(r),
    ipr = scaleLen(innerR);
  const outerD = circlePath(opx, opy, opr);
  const innerD = circlePath(ipx, ipy, ipr);
  return (
    <path
      d={`${outerD} ${innerD}`}
      fillRule="evenodd"
      fill={fill}
      stroke={stroke}
      strokeWidth={strokeWidth}
      opacity={opacity}
    />
  );
}
FigLune.displayName = "FigLune";

/** Parabola — vertex form y = a*(x-h)² + k. `xDomain` controls visible range. */
export function FigParabola({
  h = 0,
  k = 0,
  a = 1,
  xDomain,
  color = "currentColor",
  strokeWidth = 1.5,
  steps = 100,
}: {
  h?: number;
  k?: number;
  a?: number;
  xDomain?: [number, number];
  color?: string;
  strokeWidth?: number;
  steps?: number;
}) {
  const { toPixel } = useGeo();
  const d = samplePath(
    toPixel,
    (x) => [x, a * (x - h) * (x - h) + k],
    xDomain ? xDomain[0] : h - 4,
    xDomain ? xDomain[1] : h + 4,
    steps,
  );
  return <path d={d} fill="none" stroke={color} strokeWidth={strokeWidth} />;
}
FigParabola.displayName = "FigParabola";

/** Hyperbola — standard form (x-h)²/a² - (y-k)²/b² = 1, both branches. */
export function FigHyperbola({
  h = 0,
  k = 0,
  a = 1,
  b = 1,
  color = "currentColor",
  strokeWidth = 1.5,
  tRange = 3,
  steps = 80,
}: {
  h?: number;
  k?: number;
  a?: number;
  b?: number;
  color?: string;
  strokeWidth?: number;
  tRange?: number;
  steps?: number;
}) {
  const { toPixel } = useGeo();
  const right = samplePath(
    toPixel,
    (t) => [h + a * Math.cosh(t), k + b * Math.sinh(t)],
    -tRange,
    tRange,
    steps,
  );
  const left = samplePath(
    toPixel,
    (t) => [h - a * Math.cosh(t), k + b * Math.sinh(t)],
    -tRange,
    tRange,
    steps,
  );
  return (
    <g>
      <path d={right} fill="none" stroke={color} strokeWidth={strokeWidth} />
      <path d={left} fill="none" stroke={color} strokeWidth={strokeWidth} />
    </g>
  );
}
FigHyperbola.displayName = "FigHyperbola";

/** Cardioid — polar r = a*(1 + cosθ). */
export function FigCardioid({
  cx = 0,
  cy = 0,
  a = 1,
  rotation = 0,
  fill = "none",
  stroke = "currentColor",
  strokeWidth = 1.5,
}: {
  cx?: number;
  cy?: number;
  a?: number;
  rotation?: number;
  fill?: string;
  stroke?: string;
  strokeWidth?: number;
}) {
  const { toPixel } = useGeo();
  const rot = (rotation * Math.PI) / 180;
  const d = samplePath(
    toPixel,
    (t) => {
      const r = a * (1 + Math.cos(t));
      return [cx + r * Math.cos(t + rot), cy + r * Math.sin(t + rot)];
    },
    0,
    2 * Math.PI,
    120,
    true,
  );
  return <path d={d} fill={fill} stroke={stroke} strokeWidth={strokeWidth} />;
}
FigCardioid.displayName = "FigCardioid";

/** Limaçon — polar r = a + b*cosθ. Shows inner loop when b > a. */
export function FigLimacon({
  cx = 0,
  cy = 0,
  a = 1,
  b = 1.5,
  fill = "none",
  stroke = "currentColor",
  strokeWidth = 1.5,
}: {
  cx?: number;
  cy?: number;
  a?: number;
  b?: number;
  fill?: string;
  stroke?: string;
  strokeWidth?: number;
}) {
  const { toPixel } = useGeo();
  const d = samplePath(
    toPixel,
    (t) => {
      const r = a + b * Math.cos(t);
      return [cx + r * Math.cos(t), cy + r * Math.sin(t)];
    },
    0,
    2 * Math.PI,
    120,
    true,
  );
  return <path d={d} fill={fill} stroke={stroke} strokeWidth={strokeWidth} />;
}
FigLimacon.displayName = "FigLimacon";

/** Lemniscate — figure-eight, polar r² = a²*cos(2θ). */
export function FigLemniscate({
  cx = 0,
  cy = 0,
  a = 2,
  stroke = "currentColor",
  strokeWidth = 1.5,
}: {
  cx?: number;
  cy?: number;
  a?: number;
  stroke?: string;
  strokeWidth?: number;
}) {
  const { toPixel } = useGeo();
  const pts: string[] = [];
  // Right lobe: θ ∈ [-π/4, π/4]
  for (let i = 0; i <= 60; i++) {
    const t = -Math.PI / 4 + (i / 60) * (Math.PI / 2);
    const r = a * Math.sqrt(Math.cos(2 * t));
    const { px, py } = toPixel(cx + r * Math.cos(t), cy + r * Math.sin(t));
    pts.push(`${i === 0 ? "M" : "L"}${px.toFixed(1)} ${py.toFixed(1)}`);
  }
  pts.push("Z");
  // Left lobe: θ ∈ [3π/4, 5π/4]
  for (let i = 0; i <= 60; i++) {
    const t = (3 * Math.PI) / 4 + (i / 60) * (Math.PI / 2);
    const r = a * Math.sqrt(Math.cos(2 * t));
    const { px, py } = toPixel(cx + r * Math.cos(t), cy + r * Math.sin(t));
    pts.push(`${i === 0 ? "M" : "L"}${px.toFixed(1)} ${py.toFixed(1)}`);
  }
  pts.push("Z");
  return (
    <path
      d={pts.join(" ")}
      fill="none"
      stroke={stroke}
      strokeWidth={strokeWidth}
    />
  );
}
FigLemniscate.displayName = "FigLemniscate";

// ═══════════════════════════════════════════════════════════════════════════════
// SECTION 5 — Triangles
// ═══════════════════════════════════════════════════════════════════════════════

/** Small square marker indicating a 90° angle at `vertex`. */
export function FigRightAngleMarker({
  vertex,
  leg1,
  leg2,
  size = 0.3,
  color = "currentColor",
  strokeWidth = 1,
}: {
  vertex: { x: number; y: number };
  leg1: { x: number; y: number };
  leg2: { x: number; y: number };
  size?: number;
  color?: string;
  strokeWidth?: number;
}) {
  const { toPixel } = useGeo();
  const d1x = leg1.x - vertex.x,
    d1y = leg1.y - vertex.y;
  const d1l = Math.sqrt(d1x * d1x + d1y * d1y);
  const u1x = d1l > 0 ? d1x / d1l : 1,
    u1y = d1l > 0 ? d1y / d1l : 0;
  const d2x = leg2.x - vertex.x,
    d2y = leg2.y - vertex.y;
  const d2l = Math.sqrt(d2x * d2x + d2y * d2y);
  const u2x = d2l > 0 ? d2x / d2l : 0,
    u2y = d2l > 0 ? d2y / d2l : 1;
  const p1 = toPixel(vertex.x + u1x * size, vertex.y + u1y * size);
  const p2 = toPixel(vertex.x + u2x * size, vertex.y + u2y * size);
  const p3 = toPixel(
    vertex.x + (u1x + u2x) * size,
    vertex.y + (u1y + u2y) * size,
  );
  const d = `M ${p1.px} ${p1.py} L ${p3.px} ${p3.py} L ${p2.px} ${p2.py}`;
  return <path d={d} fill="none" stroke={color} strokeWidth={strokeWidth} />;
}
FigRightAngleMarker.displayName = "FigRightAngleMarker";

/** Equilateral triangle — all sides equal. `cx,cy` = center, `r` = circumradius. */
export function FigEquilateralTriangle({
  cx,
  cy,
  r,
  fill = "none",
  stroke = "currentColor",
  strokeWidth = 1.5,
  opacity = 1,
  label,
  showTicks = false,
}: {
  cx: number;
  cy: number;
  r: number;
  fill?: string;
  stroke?: string;
  strokeWidth?: number;
  opacity?: number;
  label?: string;
  showTicks?: boolean;
}) {
  const { toPixel } = useGeo();
  const pts = ngonPts(3, cx, cy, r);
  return (
    <g>
      <polygon
        points={toPoly(toPixel, pts)}
        fill={fill}
        stroke={stroke}
        strokeWidth={strokeWidth}
        opacity={opacity}
      />
      {showTicks &&
        pts.map((p, i) => {
          const q = pts[(i + 1) % 3];
          return (
            <FigSegment
              key={i}
              x1={p[0]}
              y1={p[1]}
              x2={q[0]}
              y2={q[1]}
              tickMarks
              color={stroke}
              strokeWidth={0}
            />
          );
        })}
      {label && (
        <FigLabel x={cx} y={cy}>
          {label}
        </FigLabel>
      )}
    </g>
  );
}
FigEquilateralTriangle.displayName = "FigEquilateralTriangle";

/** Isosceles triangle — two equal sides. `showTicks` marks equal legs. */
export function FigIsoscelesTriangle({
  cx,
  baseY,
  base,
  height,
  fill = "none",
  stroke = "currentColor",
  strokeWidth = 1.5,
  opacity = 1,
  label,
  showTicks = true,
}: {
  cx: number;
  baseY: number;
  base: number;
  height: number;
  fill?: string;
  stroke?: string;
  strokeWidth?: number;
  opacity?: number;
  label?: string;
  showTicks?: boolean;
}) {
  const { toPixel } = useGeo();
  const pts: [number, number][] = [
    [cx - base / 2, baseY],
    [cx + base / 2, baseY],
    [cx, baseY + height],
  ];
  const cy = baseY + height / 3;
  return (
    <g>
      <polygon
        points={toPoly(toPixel, pts)}
        fill={fill}
        stroke={stroke}
        strokeWidth={strokeWidth}
        opacity={opacity}
      />
      {showTicks && (
        <>
          <FigSegment
            x1={pts[0][0]}
            y1={pts[0][1]}
            x2={pts[2][0]}
            y2={pts[2][1]}
            tickMarks
            color={stroke}
            strokeWidth={0}
          />
          <FigSegment
            x1={pts[1][0]}
            y1={pts[1][1]}
            x2={pts[2][0]}
            y2={pts[2][1]}
            tickMarks
            color={stroke}
            strokeWidth={0}
          />
        </>
      )}
      {label && (
        <FigLabel x={cx} y={cy}>
          {label}
        </FigLabel>
      )}
    </g>
  );
}
FigIsoscelesTriangle.displayName = "FigIsoscelesTriangle";

/** Scalene triangle — all sides different, vertices explicitly specified. */
export function FigScaleneTriangle({
  x1,
  y1,
  x2,
  y2,
  x3,
  y3,
  fill = "none",
  stroke = "currentColor",
  strokeWidth = 1.5,
  opacity = 1,
  label,
}: {
  x1: number;
  y1: number;
  x2: number;
  y2: number;
  x3: number;
  y3: number;
  fill?: string;
  stroke?: string;
  strokeWidth?: number;
  opacity?: number;
  label?: string;
}) {
  const { toPixel } = useGeo();
  const pts: [number, number][] = [
    [x1, y1],
    [x2, y2],
    [x3, y3],
  ];
  const cx = (x1 + x2 + x3) / 3,
    cy = (y1 + y2 + y3) / 3;
  return (
    <g>
      <polygon
        points={toPoly(toPixel, pts)}
        fill={fill}
        stroke={stroke}
        strokeWidth={strokeWidth}
        opacity={opacity}
      />
      {label && (
        <FigLabel x={cx} y={cy}>
          {label}
        </FigLabel>
      )}
    </g>
  );
}
FigScaleneTriangle.displayName = "FigScaleneTriangle";

/** Right triangle — right angle at (x,y), horizontal base, vertical height. */
export function FigRightTriangle({
  x,
  y,
  base,
  height,
  fill = "none",
  stroke = "currentColor",
  strokeWidth = 1.5,
  opacity = 1,
  labelA,
  labelB,
  labelC,
  label,
}: {
  x: number;
  y: number;
  base: number;
  height: number;
  fill?: string;
  stroke?: string;
  strokeWidth?: number;
  opacity?: number;
  labelA?: string;
  labelB?: string;
  labelC?: string;
  label?: string;
}) {
  const { toPixel } = useGeo();
  const pts: [number, number][] = [
    [x, y],
    [x + base, y],
    [x, y + height],
  ];
  const cx = (x + x + base + x) / 3,
    cy = (y + y + y + height) / 3;
  return (
    <g>
      <polygon
        points={toPoly(toPixel, pts)}
        fill={fill}
        stroke={stroke}
        strokeWidth={strokeWidth}
        opacity={opacity}
      />
      <FigRightAngleMarker
        vertex={{ x, y }}
        leg1={{ x: x + 1, y }}
        leg2={{ x, y: y + 1 }}
        color={stroke}
      />
      {labelA && (
        <FigSegment
          x1={x}
          y1={y}
          x2={x + base}
          y2={y}
          label={labelA}
          color={stroke}
          strokeWidth={0}
        />
      )}
      {labelB && (
        <FigSegment
          x1={x}
          y1={y}
          x2={x}
          y2={y + height}
          label={labelB}
          color={stroke}
          strokeWidth={0}
        />
      )}
      {labelC && (
        <FigSegment
          x1={x + base}
          y1={y}
          x2={x}
          y2={y + height}
          label={labelC}
          color={stroke}
          strokeWidth={0}
        />
      )}
      {label && (
        <FigLabel x={cx} y={cy}>
          {label}
        </FigLabel>
      )}
    </g>
  );
}
FigRightTriangle.displayName = "FigRightTriangle";

// ═══════════════════════════════════════════════════════════════════════════════
// SECTION 6 — Quadrilaterals
// ═══════════════════════════════════════════════════════════════════════════════

/** Rectangle — bottom-left corner + width + height (world units). */
export function FigRect({
  x,
  y,
  w,
  h,
  fill = "none",
  stroke = "currentColor",
  strokeWidth = 1.5,
  opacity = 1,
  rx = 0,
  label,
}: {
  x: number;
  y: number;
  w: number;
  h: number;
  fill?: string;
  stroke?: string;
  strokeWidth?: number;
  opacity?: number;
  rx?: number;
  label?: string;
}) {
  const { toPixel, scaleLen } = useGeo();
  const tl = toPixel(x, y + h),
    br = toPixel(x + w, y);
  return (
    <g>
      <rect
        x={tl.px}
        y={tl.py}
        width={br.px - tl.px}
        height={br.py - tl.py}
        fill={fill}
        stroke={stroke}
        strokeWidth={strokeWidth}
        opacity={opacity}
        rx={scaleLen(rx)}
      />
      {label && (
        <text
          x={(tl.px + br.px) / 2}
          y={(tl.py + br.py) / 2}
          fill={stroke}
          fontSize={12}
          textAnchor="middle"
          dominantBaseline="central"
        >
          {label}
        </text>
      )}
    </g>
  );
}
FigRect.displayName = "FigRect";

/** Square — centre + side length. */
export function FigSquare({
  cx,
  cy,
  side,
  fill = "none",
  stroke = "currentColor",
  strokeWidth = 1.5,
  opacity = 1,
  label,
}: {
  cx: number;
  cy: number;
  side: number;
  fill?: string;
  stroke?: string;
  strokeWidth?: number;
  opacity?: number;
  label?: string;
}) {
  const h = side / 2;
  return (
    <FigRect
      x={cx - h}
      y={cy - h}
      w={side}
      h={side}
      fill={fill}
      stroke={stroke}
      strokeWidth={strokeWidth}
      opacity={opacity}
      label={label}
    />
  );
}
FigSquare.displayName = "FigSquare";

/** Rhombus — centre + half diagonals dx, dy (world units). */
export function FigRhombus({
  cx,
  cy,
  dx,
  dy,
  fill = "none",
  stroke = "currentColor",
  strokeWidth = 1.5,
  opacity = 1,
  label,
  showDiagonals = false,
}: {
  cx: number;
  cy: number;
  dx: number;
  dy: number;
  fill?: string;
  stroke?: string;
  strokeWidth?: number;
  opacity?: number;
  label?: string;
  showDiagonals?: boolean;
}) {
  const { toPixel } = useGeo();
  const pts: [number, number][] = [
    [cx, cy + dy],
    [cx + dx, cy],
    [cx, cy - dy],
    [cx - dx, cy],
  ];
  return (
    <g>
      <polygon
        points={toPoly(toPixel, pts)}
        fill={fill}
        stroke={stroke}
        strokeWidth={strokeWidth}
        opacity={opacity}
      />
      {showDiagonals && (
        <>
          <FigLine
            x1={cx - dx}
            y1={cy}
            x2={cx + dx}
            y2={cy}
            color={stroke}
            strokeWidth={0.5}
            dashed
          />
          <FigLine
            x1={cx}
            y1={cy - dy}
            x2={cx}
            y2={cy + dy}
            color={stroke}
            strokeWidth={0.5}
            dashed
          />
        </>
      )}
      {label && (
        <FigLabel x={cx} y={cy}>
          {label}
        </FigLabel>
      )}
    </g>
  );
}
FigRhombus.displayName = "FigRhombus";

/** Parallelogram — bottom-left + width + height + horizontal skew. */
export function FigParallelogram({
  x,
  y,
  w,
  h,
  skew = 1,
  fill = "none",
  stroke = "currentColor",
  strokeWidth = 1.5,
  opacity = 1,
  label,
}: {
  x: number;
  y: number;
  w: number;
  h: number;
  skew?: number;
  fill?: string;
  stroke?: string;
  strokeWidth?: number;
  opacity?: number;
  label?: string;
}) {
  const { toPixel } = useGeo();
  const pts: [number, number][] = [
    [x, y],
    [x + w, y],
    [x + w + skew, y + h],
    [x + skew, y + h],
  ];
  const cx = x + w / 2 + skew / 2,
    cy = y + h / 2;
  return (
    <g>
      <polygon
        points={toPoly(toPixel, pts)}
        fill={fill}
        stroke={stroke}
        strokeWidth={strokeWidth}
        opacity={opacity}
      />
      {label && (
        <FigLabel x={cx} y={cy}>
          {label}
        </FigLabel>
      )}
    </g>
  );
}
FigParallelogram.displayName = "FigParallelogram";

/** Trapezoid — symmetric about cx, different top and bottom widths. */
export function FigTrapezoid({
  cx,
  y,
  topW,
  bottomW,
  h,
  fill = "none",
  stroke = "currentColor",
  strokeWidth = 1.5,
  opacity = 1,
  label,
}: {
  cx: number;
  y: number;
  topW: number;
  bottomW: number;
  h: number;
  fill?: string;
  stroke?: string;
  strokeWidth?: number;
  opacity?: number;
  label?: string;
}) {
  const { toPixel } = useGeo();
  const pts: [number, number][] = [
    [cx - bottomW / 2, y],
    [cx + bottomW / 2, y],
    [cx + topW / 2, y + h],
    [cx - topW / 2, y + h],
  ];
  return (
    <g>
      <polygon
        points={toPoly(toPixel, pts)}
        fill={fill}
        stroke={stroke}
        strokeWidth={strokeWidth}
        opacity={opacity}
      />
      {label && (
        <FigLabel x={cx} y={y + h / 2}>
          {label}
        </FigLabel>
      )}
    </g>
  );
}
FigTrapezoid.displayName = "FigTrapezoid";

/** Kite — two pairs of adjacent equal sides. */
export function FigKite({
  cx,
  cy,
  topH,
  bottomH,
  halfW,
  fill = "none",
  stroke = "currentColor",
  strokeWidth = 1.5,
  opacity = 1,
  label,
}: {
  cx: number;
  cy: number;
  topH: number;
  bottomH: number;
  halfW: number;
  fill?: string;
  stroke?: string;
  strokeWidth?: number;
  opacity?: number;
  label?: string;
}) {
  const { toPixel } = useGeo();
  const pts: [number, number][] = [
    [cx, cy + topH],
    [cx + halfW, cy],
    [cx, cy - bottomH],
    [cx - halfW, cy],
  ];
  return (
    <g>
      <polygon
        points={toPoly(toPixel, pts)}
        fill={fill}
        stroke={stroke}
        strokeWidth={strokeWidth}
        opacity={opacity}
      />
      {label && (
        <FigLabel x={cx} y={cy + (topH - bottomH) / 4}>
          {label}
        </FigLabel>
      )}
    </g>
  );
}
FigKite.displayName = "FigKite";

/** Dart (arrowhead / chevron) — concave kite pointing upward. */
export function FigDart({
  cx,
  cy,
  topH,
  concaveDepth,
  halfW,
  fill = "none",
  stroke = "currentColor",
  strokeWidth = 1.5,
  opacity = 1,
}: {
  cx: number;
  cy: number;
  topH: number;
  concaveDepth: number;
  halfW: number;
  fill?: string;
  stroke?: string;
  strokeWidth?: number;
  opacity?: number;
}) {
  const { toPixel } = useGeo();
  const pts: [number, number][] = [
    [cx, cy + topH],
    [cx + halfW, cy - topH * 0.3],
    [cx, cy - concaveDepth],
    [cx - halfW, cy - topH * 0.3],
  ];
  return (
    <polygon
      points={toPoly(toPixel, pts)}
      fill={fill}
      stroke={stroke}
      strokeWidth={strokeWidth}
      opacity={opacity}
    />
  );
}
FigDart.displayName = "FigDart";

/** Cross-quadrilateral — self-intersecting (butterfly / bowtie). */
export function FigCrossQuad({
  x1,
  y1,
  x2,
  y2,
  x3,
  y3,
  x4,
  y4,
  fill = "none",
  stroke = "currentColor",
  strokeWidth = 1.5,
}: {
  x1: number;
  y1: number;
  x2: number;
  y2: number;
  x3: number;
  y3: number;
  x4: number;
  y4: number;
  fill?: string;
  stroke?: string;
  strokeWidth?: number;
}) {
  const { toPixel } = useGeo();
  // Draw as two triangles (self-intersecting effect)
  const pts: [number, number][] = [
    [x1, y1],
    [x3, y3],
    [x2, y2],
    [x4, y4],
  ];
  return (
    <polygon
      points={toPoly(toPixel, pts)}
      fill={fill}
      stroke={stroke}
      strokeWidth={strokeWidth}
    />
  );
}
FigCrossQuad.displayName = "FigCrossQuad";

/** Antiparallelogram — like a parallelogram but opposite sides cross. */
export function FigAntiparallelogram({
  x,
  y,
  w,
  h,
  skew = 1,
  fill = "none",
  stroke = "currentColor",
  strokeWidth = 1.5,
}: {
  x: number;
  y: number;
  w: number;
  h: number;
  skew?: number;
  fill?: string;
  stroke?: string;
  strokeWidth?: number;
}) {
  const { toPixel } = useGeo();
  // Vertices ordered so sides cross (antiparallel)
  const pts: [number, number][] = [
    [x, y],
    [x + w, y],
    [x + skew, y + h],
    [x + w + skew, y + h],
  ];
  return (
    <polygon
      points={toPoly(toPixel, pts)}
      fill={fill}
      stroke={stroke}
      strokeWidth={strokeWidth}
    />
  );
}
FigAntiparallelogram.displayName = "FigAntiparallelogram";

/** Cyclic quadrilateral — 4 vertices at specified angles on a circle. */
export function FigCyclicQuad({
  cx,
  cy,
  r,
  angles,
  fill = "none",
  stroke = "currentColor",
  strokeWidth = 1.5,
  opacity = 1,
  showCircle = true,
}: {
  cx: number;
  cy: number;
  r: number;
  angles: [number, number, number, number];
  fill?: string;
  stroke?: string;
  strokeWidth?: number;
  opacity?: number;
  showCircle?: boolean;
}) {
  const { toPixel } = useGeo();
  const pts = angles.map((a) => {
    const rad = (a * Math.PI) / 180;
    return [cx + r * Math.cos(rad), cy + r * Math.sin(rad)] as [number, number];
  });
  return (
    <g>
      {showCircle && (
        <FigCircle
          cx={cx}
          cy={cy}
          r={r}
          stroke={stroke}
          strokeWidth={0.5}
          dashed
        />
      )}
      <polygon
        points={toPoly(toPixel, pts)}
        fill={fill}
        stroke={stroke}
        strokeWidth={strokeWidth}
        opacity={opacity}
      />
    </g>
  );
}
FigCyclicQuad.displayName = "FigCyclicQuad";

/** Tangential quadrilateral — 4 vertices with an inscribed circle shown. */
export function FigTangentialQuad({
  points,
  inCx,
  inCy,
  inR,
  fill = "none",
  stroke = "currentColor",
  strokeWidth = 1.5,
  opacity = 1,
  showCircle = true,
}: {
  points: [
    [number, number],
    [number, number],
    [number, number],
    [number, number],
  ];
  inCx: number;
  inCy: number;
  inR: number;
  fill?: string;
  stroke?: string;
  strokeWidth?: number;
  opacity?: number;
  showCircle?: boolean;
}) {
  const { toPixel } = useGeo();
  return (
    <g>
      <polygon
        points={toPoly(toPixel, points)}
        fill={fill}
        stroke={stroke}
        strokeWidth={strokeWidth}
        opacity={opacity}
      />
      {showCircle && (
        <FigCircle
          cx={inCx}
          cy={inCy}
          r={inR}
          stroke={stroke}
          strokeWidth={0.5}
          dashed
        />
      )}
    </g>
  );
}
FigTangentialQuad.displayName = "FigTangentialQuad";

// ═══════════════════════════════════════════════════════════════════════════════
// SECTION 7 — Regular Polygons (n-gons)
// ═══════════════════════════════════════════════════════════════════════════════

interface RegPolyProps {
  cx: number;
  cy: number;
  r: number;
  sides: number;
  fill?: string;
  stroke?: string;
  strokeWidth?: number;
  opacity?: number;
  label?: string;
  startDeg?: number;
}

/** Regular n-gon — `sides` controls the number of sides. */
export function FigRegularPolygon({
  cx,
  cy,
  r,
  sides,
  fill = "none",
  stroke = "currentColor",
  strokeWidth = 1.5,
  opacity = 1,
  label,
  startDeg = -90,
}: RegPolyProps) {
  const { toPixel } = useGeo();
  const pts = ngonPts(sides, cx, cy, r, startDeg);
  return (
    <g>
      <polygon
        points={toPoly(toPixel, pts)}
        fill={fill}
        stroke={stroke}
        strokeWidth={strokeWidth}
        opacity={opacity}
      />
      {label && (
        <FigLabel x={cx} y={cy}>
          {label}
        </FigLabel>
      )}
    </g>
  );
}
FigRegularPolygon.displayName = "FigRegularPolygon";

const mkPoly = (sides: number, name: string) => {
  const C = (props: Omit<RegPolyProps, "sides">) => (
    <FigRegularPolygon {...props} sides={sides} />
  );
  C.displayName = name;
  return C;
};

export const FigPentagon = mkPoly(5, "FigPentagon");
export const FigHexagon = mkPoly(6, "FigHexagon");
export const FigHeptagon = mkPoly(7, "FigHeptagon");
export const FigOctagon = mkPoly(8, "FigOctagon");
export const FigNonagon = mkPoly(9, "FigNonagon");
export const FigDecagon = mkPoly(10, "FigDecagon");
export const FigHendecagon = mkPoly(11, "FigHendecagon");
export const FigDodecagon = mkPoly(12, "FigDodecagon");

// ═══════════════════════════════════════════════════════════════════════════════
// SECTION 8 — Star & Non-Convex Polygons
// ═══════════════════════════════════════════════════════════════════════════════

interface StarPolyProps {
  cx: number;
  cy: number;
  r: number;
  points: number;
  innerRatio?: number;
  fill?: string;
  stroke?: string;
  strokeWidth?: number;
  opacity?: number;
}

/** Star polygon — `points` is the number of outer points, `innerRatio` controls inner radius. */
export function FigStarPolygon({
  cx,
  cy,
  r,
  points,
  innerRatio = 0.382,
  fill = "none",
  stroke = "currentColor",
  strokeWidth = 1.5,
  opacity = 1,
}: StarPolyProps) {
  const { toPixel } = useGeo();
  const pts = starPts(points, cx, cy, r, r * innerRatio);
  return (
    <polygon
      points={toPoly(toPixel, pts)}
      fill={fill}
      stroke={stroke}
      strokeWidth={strokeWidth}
      opacity={opacity}
    />
  );
}
FigStarPolygon.displayName = "FigStarPolygon";

const mkStar = (n: number, inner: number, name: string) => {
  const C = (props: Omit<StarPolyProps, "points" | "innerRatio">) => (
    <FigStarPolygon {...props} points={n} innerRatio={inner} />
  );
  C.displayName = name;
  return C;
};

export const FigPentagram = mkStar(5, 0.382, "FigPentagram");
export const FigHexagram = mkStar(6, 0.577, "FigHexagram");
export const FigOctagram = mkStar(8, 0.414, "FigOctagram");

// ═══════════════════════════════════════════════════════════════════════════════
// SECTION 9 — Infinite & Fractal Shapes
// ═══════════════════════════════════════════════════════════════════════════════

function kochSubdivide(pts: [number, number][]): [number, number][] {
  const out: [number, number][] = [];
  for (let i = 0; i < pts.length; i++) {
    const [x1, y1] = pts[i];
    const [x2, y2] = pts[(i + 1) % pts.length];
    const dx = x2 - x1,
      dy = y2 - y1;
    const ax = x1 + dx / 3,
      ay = y1 + dy / 3;
    const bx = x2 - dx / 3,
      by = y2 - dy / 3;
    const peakX = (ax + bx) / 2 + ((by - ay) * Math.sqrt(3)) / 2;
    const peakY = (ay + by) / 2 - ((bx - ax) * Math.sqrt(3)) / 2;
    out.push([x1, y1], [ax, ay], [peakX, peakY], [bx, by]);
  }
  return out;
}

/** Koch Snowflake — fractal based on equilateral triangle. `iterations` 1–5. */
export function FigKochSnowflake({
  cx = 0,
  cy = 0,
  r = 2,
  iterations = 3,
  fill = "none",
  stroke = "currentColor",
  strokeWidth = 1,
}: {
  cx?: number;
  cy?: number;
  r?: number;
  iterations?: number;
  fill?: string;
  stroke?: string;
  strokeWidth?: number;
}) {
  const { toPixel } = useGeo();
  let pts = ngonPts(3, cx, cy, r);
  const n = Math.min(Math.max(iterations, 0), 5);
  for (let i = 0; i < n; i++) pts = kochSubdivide(pts);
  return (
    <polygon
      points={toPoly(toPixel, pts)}
      fill={fill}
      stroke={stroke}
      strokeWidth={strokeWidth}
    />
  );
}
FigKochSnowflake.displayName = "FigKochSnowflake";

function sierpinskiTris(
  v1: [number, number],
  v2: [number, number],
  v3: [number, number],
  depth: number,
): [number, number][][] {
  if (depth === 0) return [[v1, v2, v3]];
  const m12: [number, number] = [(v1[0] + v2[0]) / 2, (v1[1] + v2[1]) / 2];
  const m23: [number, number] = [(v2[0] + v3[0]) / 2, (v2[1] + v3[1]) / 2];
  const m13: [number, number] = [(v1[0] + v3[0]) / 2, (v1[1] + v3[1]) / 2];
  return [
    ...sierpinskiTris(v1, m12, m13, depth - 1),
    ...sierpinskiTris(m12, v2, m23, depth - 1),
    ...sierpinskiTris(m13, m23, v3, depth - 1),
  ];
}

/** Sierpinski Triangle — fractal triangle. `iterations` 1–6. */
export function FigSierpinskiTriangle({
  cx = 0,
  cy = 0,
  r = 2,
  iterations = 4,
  fill = "currentColor",
  stroke = "currentColor",
  strokeWidth = 0.5,
  opacity = 0.8,
}: {
  cx?: number;
  cy?: number;
  r?: number;
  iterations?: number;
  fill?: string;
  stroke?: string;
  strokeWidth?: number;
  opacity?: number;
}) {
  const { toPixel } = useGeo();
  const base = ngonPts(3, cx, cy, r);
  const n = Math.min(Math.max(iterations, 0), 6);
  const tris = sierpinskiTris(base[0], base[1], base[2], n);
  return (
    <g>
      {tris.map((pts, i) => (
        <polygon
          key={i}
          points={toPoly(toPixel, pts)}
          fill={fill}
          stroke={stroke}
          strokeWidth={strokeWidth}
          opacity={opacity}
        />
      ))}
    </g>
  );
}
FigSierpinskiTriangle.displayName = "FigSierpinskiTriangle";

// ═══════════════════════════════════════════════════════════════════════════════
// SECTION 10 — Annotations & Special Shapes
// ═══════════════════════════════════════════════════════════════════════════════

/** Double-headed measurement arrow between two world points. */
export function FigMeasure({
  x1,
  y1,
  x2,
  y2,
  label,
  color = "currentColor",
}: {
  x1: number;
  y1: number;
  x2: number;
  y2: number;
  label?: string;
  color?: string;
}) {
  return (
    <FigDimensionLine
      x1={x1}
      y1={y1}
      x2={x2}
      y2={y2}
      label={label}
      color={color}
    />
  );
}
FigMeasure.displayName = "FigMeasure";

/** Circle with π annotations (radius, diameter, circumference formula). */
export function FigCirclePi({
  cx,
  cy,
  r,
  stroke = "currentColor",
  strokeWidth = 1.5,
}: {
  cx: number;
  cy: number;
  r: number;
  stroke?: string;
  strokeWidth?: number;
}) {
  const { toPixel, scaleLen } = useGeo();
  const { px, py } = toPixel(cx, cy);
  const pr = scaleLen(r);
  const { px: ex } = toPixel(cx + r, cy);
  return (
    <g>
      <circle
        cx={px}
        cy={py}
        r={pr}
        fill="none"
        stroke={stroke}
        strokeWidth={strokeWidth}
      />
      {/* Radius line */}
      <line x1={px} y1={py} x2={ex} y2={py} stroke={stroke} strokeWidth={1} />
      <text
        x={(px + ex) / 2}
        y={py - 6}
        fill={stroke}
        fontSize={11}
        textAnchor="middle"
      >
        r
      </text>
      {/* Diameter line */}
      <line
        x1={px - pr}
        y1={py + pr * 0.6}
        x2={px + pr}
        y2={py + pr * 0.6}
        stroke={stroke}
        strokeWidth={0.75}
        strokeDasharray="3 2"
      />
      <text
        x={px}
        y={py + pr * 0.6 + 10}
        fill={stroke}
        fontSize={10}
        textAnchor="middle"
      >
        d = 2r
      </text>
      {/* Pi formula */}
      <text
        x={px}
        y={py + pr + 18}
        fill={stroke}
        fontSize={11}
        textAnchor="middle"
      >
        C = 2πr ≈ ²²⁄₇ · d
      </text>
    </g>
  );
}
FigCirclePi.displayName = "FigCirclePi";

/** Concentric contour curves (level curves / topographic style). */
export function FigContour({
  cx,
  cy,
  levels,
  ratioY = 0.6,
  stroke = "currentColor",
  strokeWidth = 1,
  labels,
}: {
  cx: number;
  cy: number;
  levels: number[];
  ratioY?: number;
  stroke?: string;
  strokeWidth?: number;
  labels?: string[];
}) {
  const { toPixel, scaleLen } = useGeo();
  const { px, py } = toPixel(cx, cy);
  return (
    <g>
      {levels.map((lv, i) => {
        const rx = scaleLen(lv);
        const ry = rx * ratioY;
        return (
          <g key={i}>
            <ellipse
              cx={px}
              cy={py}
              rx={rx}
              ry={ry}
              fill="none"
              stroke={stroke}
              strokeWidth={strokeWidth}
              opacity={0.7}
            />
            {labels?.[i] && (
              <text
                x={px + rx + 4}
                y={py}
                fill={stroke}
                fontSize={9}
                dominantBaseline="central"
              >
                {labels[i]}
              </text>
            )}
          </g>
        );
      })}
    </g>
  );
}
FigContour.displayName = "FigContour";

/** Funnel / trapezoid — wide at top, narrow at bottom. */
export function FigFunnel({
  cx,
  topY,
  topW,
  bottomW,
  h,
  fill = "none",
  stroke = "currentColor",
  strokeWidth = 1.5,
  opacity = 1,
}: {
  cx: number;
  topY: number;
  topW: number;
  bottomW: number;
  h: number;
  fill?: string;
  stroke?: string;
  strokeWidth?: number;
  opacity?: number;
}) {
  const { toPixel } = useGeo();
  const pts: [number, number][] = [
    [cx - topW / 2, topY + h],
    [cx + topW / 2, topY + h],
    [cx + bottomW / 2, topY],
    [cx - bottomW / 2, topY],
  ];
  return (
    <polygon
      points={toPoly(toPixel, pts)}
      fill={fill}
      stroke={stroke}
      strokeWidth={strokeWidth}
      opacity={opacity}
    />
  );
}
FigFunnel.displayName = "FigFunnel";

/** Cuboid — isometric 3D box drawn in 2D (3 visible faces). */
export function FigCuboid({
  x,
  y,
  w,
  h,
  d = 1,
  angle = 30,
  frontFill = "none",
  topFill = "none",
  sideFill = "none",
  stroke = "currentColor",
  strokeWidth = 1.5,
}: {
  x: number;
  y: number;
  w: number;
  h: number;
  d?: number;
  angle?: number;
  frontFill?: string;
  topFill?: string;
  sideFill?: string;
  stroke?: string;
  strokeWidth?: number;
}) {
  const { toPixel } = useGeo();
  const rad = (angle * Math.PI) / 180;
  const dx = d * Math.cos(rad),
    dy = d * Math.sin(rad);
  // 8 corners
  const fl = [x, y] as [number, number];
  const fr = [x + w, y] as [number, number];
  const ftr = [x + w, y + h] as [number, number];
  const ftl = [x, y + h] as [number, number];
  const br: [number, number] = [x + w + dx, y + dy];
  const btr: [number, number] = [x + w + dx, y + h + dy];
  const btl: [number, number] = [x + dx, y + h + dy];
  const front = [fl, fr, ftr, ftl];
  const top = [ftl, ftr, btr, btl];
  const right = [fr, br, btr, ftr];
  return (
    <g stroke={stroke} strokeWidth={strokeWidth}>
      <polygon points={toPoly(toPixel, front)} fill={frontFill} />
      <polygon points={toPoly(toPixel, top)} fill={topFill} />
      <polygon points={toPoly(toPixel, right)} fill={sideFill} />
    </g>
  );
}
FigCuboid.displayName = "FigCuboid";

// ═══════════════════════════════════════════════════════════════════════════════
// SECTION 11 — Interactive & Function Plotting
// FigFunction · FigDraggablePoint
// ═══════════════════════════════════════════════════════════════════════════════

/**
 * Plot any function y = fn(x) across a domain.
 * `domain` defaults to the scene's full x range if omitted — pass a tighter
 * range to clip the curve (e.g. hyperbola needs separate positive/negative domains).
 */
export function FigFunction({
  fn,
  domain,
  steps = 200,
  color = "currentColor",
  strokeWidth = 1.5,
  dashed = false,
}: {
  fn: (x: number) => number;
  domain?: [number, number];
  steps?: number;
  color?: string;
  strokeWidth?: number;
  dashed?: boolean;
}) {
  const { toPixel } = useGeo();
  const [x0, x1] = domain ?? [-20, 20];
  const d = samplePath(toPixel, (x) => [x, fn(x)], x0, x1, steps);
  return (
    <path
      d={d}
      fill="none"
      stroke={color}
      strokeWidth={strokeWidth}
      strokeDasharray={dashed ? "5 3" : undefined}
    />
  );
}
FigFunction.displayName = "FigFunction";

/**
 * A point that can be dragged with mouse or touch.
 * `onDrag(x, y)` fires with world coordinates as the user drags.
 * Pair with `useState` in your MDX to make diagrams interactive.
 *
 * @example
 * ```mdx
 * export const [pt, setPt] = React.useState({ x: 1, y: 1 });
 * <FigScene ...>
 *   <FigFunction fn={(x) => pt.x * x} />
 *   <FigDraggablePoint x={pt.x} y={pt.y} onDrag={(x,y) => setPt({x,y})} label="drag me" />
 * </FigScene>
 * ```
 */
export function FigDraggablePoint({
  x,
  y,
  onDrag,
  label,
  labelDir = "ne",
  r = 7,
  color = "currentColor",
}: {
  x: number;
  y: number;
  onDrag?: (x: number, y: number) => void;
  label?: string;
  labelDir?: "ne" | "nw" | "se" | "sw";
  r?: number;
  color?: string;
}) {
  const { toPixel, fromPixel } = useGeo();
  const { px, py } = toPixel(x, y);
  const off = r + 4;
  const dx = labelDir === "ne" || labelDir === "se" ? off : -off;
  const dy = labelDir === "ne" || labelDir === "nw" ? -off : off;
  const anchor = labelDir === "ne" || labelDir === "se" ? "start" : "end";

  const startDrag = React.useCallback(
    (clientX: number, clientY: number, svgEl: SVGSVGElement) => {
      const move = (cx: number, cy: number) => {
        const rect = svgEl.getBoundingClientRect();
        // Account for CSS scaling (max-w-full shrinks SVG on narrow screens).
        // SVG viewBox is in SVG pixels; rect is in CSS pixels — they differ when scaled.
        const scaleX = svgEl.viewBox.baseVal.width / rect.width;
        const scaleY = svgEl.viewBox.baseVal.height / rect.height;
        const [wx, wy] = fromPixel(
          (cx - rect.left) * scaleX,
          (cy - rect.top) * scaleY,
        );
        onDrag?.(+wx.toFixed(3), +wy.toFixed(3));
      };
      const onMove = (e: MouseEvent) => move(e.clientX, e.clientY);
      const onTouch = (e: TouchEvent) => {
        e.preventDefault();
        move(e.touches[0].clientX, e.touches[0].clientY);
      };
      const stop = () => {
        document.removeEventListener("mousemove", onMove);
        document.removeEventListener("mouseup", stop);
        document.removeEventListener("touchmove", onTouch);
        document.removeEventListener("touchend", stop);
      };
      document.addEventListener("mousemove", onMove);
      document.addEventListener("mouseup", stop);
      document.addEventListener("touchmove", onTouch, { passive: false });
      document.addEventListener("touchend", stop);
    },
    [fromPixel, onDrag],
  );

  return (
    <g style={{ cursor: onDrag ? "grab" : "default" }}>
      {/* Larger invisible hit area */}
      <circle
        cx={px}
        cy={py}
        r={r + 6}
        fill="transparent"
        onMouseDown={(e) => {
          e.preventDefault();
          startDrag(
            e.clientX,
            e.clientY,
            e.currentTarget.closest("svg") as SVGSVGElement,
          );
        }}
        onTouchStart={(e) => {
          e.preventDefault();
          startDrag(
            e.touches[0].clientX,
            e.touches[0].clientY,
            e.currentTarget.closest("svg") as SVGSVGElement,
          );
        }}
      />
      <circle cx={px} cy={py} r={r} fill={color} />
      {label && (
        <text
          x={px + dx}
          y={py + dy}
          fill={color}
          fontSize={12}
          textAnchor={anchor}
          dominantBaseline="central"
          style={{ pointerEvents: "none", userSelect: "none" }}
        >
          {label}
        </text>
      )}
    </g>
  );
}
FigDraggablePoint.displayName = "FigDraggablePoint";

// ═══════════════════════════════════════════════════════════════════════════════
// SECTION 12 — Interactive Explorers  (self-contained — no state in MDX)
// MDX usage:  <FigParabolaExplorer />   <FigLineExplorer />
//             <FigTangentExplorer />    <FigSineExplorer />
//             <FigCircleExplorer />
// ═══════════════════════════════════════════════════════════════════════════════

/** Interactive y = a·x² parabola. Drag the control point to change a. */
export function FigParabolaExplorer({
  width = 400,
  height = 320,
  xRange = [-5, 5] as [number, number],
  yRange = [-1, 8] as [number, number],
  initialA = 1,
  color = "currentColor",
}: {
  width?: number;
  height?: number;
  xRange?: [number, number];
  yRange?: [number, number];
  initialA?: number;
  color?: string;
}) {
  const [a, setA] = React.useState(initialA);
  const snap = (v: number) => Math.round(v * 10) / 10;
  return (
    <FigScene width={width} height={height} xRange={xRange} yRange={yRange}>
      <FigFunction fn={(x) => a * x * x} color={color} strokeWidth={2} />
      <FigDraggablePoint
        x={1}
        y={a}
        onDrag={(_, y) => setA(snap(y))}
        label={`a = ${a.toFixed(1)}`}
        color="#007700"
        r={7}
      />
    </FigScene>
  );
}
FigParabolaExplorer.displayName = "FigParabolaExplorer";

/** Interactive y = mx + b line. Drag the blue point (y-intercept) or green point (slope). */
export function FigLineExplorer({
  width = 400,
  height = 320,
  xRange = [-5, 5] as [number, number],
  yRange = [-6, 6] as [number, number],
  initialM = 1,
  initialB = 0,
}: {
  width?: number;
  height?: number;
  xRange?: [number, number];
  yRange?: [number, number];
  initialM?: number;
  initialB?: number;
}) {
  const [m, setM] = React.useState(initialM);
  const [b, setB] = React.useState(initialB);
  const snap = (v: number) => Math.round(v * 10) / 10;
  return (
    <FigScene width={width} height={height} xRange={xRange} yRange={yRange}>
      <FigFunction fn={(x) => m * x + b} strokeWidth={2} />
      {/* y-intercept control */}
      <FigDraggablePoint
        x={0}
        y={b}
        onDrag={(_, y) => setB(snap(y))}
        label={`b = ${b.toFixed(1)}`}
        labelDir="nw"
        color="#4477cc"
        r={7}
      />
      {/* slope control — fixed at x=3, y = m*3+b */}
      <FigDraggablePoint
        x={3}
        y={m * 3 + b}
        onDrag={(x, y) => x !== 0 && setM(snap((y - b) / x))}
        label={`m = ${m.toFixed(1)}`}
        labelDir="ne"
        color="#007700"
        r={7}
      />
    </FigScene>
  );
}
FigLineExplorer.displayName = "FigLineExplorer";

/** Parabola y = x² with a draggable tangent line. Drag the point to explore f′. */
export function FigTangentExplorer({
  width = 400,
  height = 320,
  xRange = [-5, 5] as [number, number],
  yRange = [-1, 8] as [number, number],
  initialX = 1,
  curveColor = "#c8006e",
  tangentColor = "#4477cc",
}: {
  width?: number;
  height?: number;
  xRange?: [number, number];
  yRange?: [number, number];
  initialX?: number;
  curveColor?: string;
  tangentColor?: string;
}) {
  const [t, setT] = React.useState(initialX);
  const slope = 2 * t;
  // tangent: y = slope*(x - t) + t²
  const [x0, x1] = xRange;
  const ty0 = slope * (x0 - t) + t * t;
  const ty1 = slope * (x1 - t) + t * t;
  return (
    <FigScene width={width} height={height} xRange={xRange} yRange={yRange}>
      <FigFunction fn={(x) => x * x} color={curveColor} strokeWidth={2} />
      <FigLine x1={x0} y1={ty0} x2={x1} y2={ty1} color={tangentColor} dashed />
      <FigDraggablePoint
        x={t}
        y={t * t}
        onDrag={(x) => setT(Math.round(x * 10) / 10)}
        label={`f'(${t.toFixed(1)}) = ${slope.toFixed(1)}`}
        color="#007700"
        r={7}
      />
    </FigScene>
  );
}
FigTangentExplorer.displayName = "FigTangentExplorer";

/** Interactive A·sin(x). Drag the peak point to change amplitude. */
export function FigSineExplorer({
  width = 420,
  height = 280,
  xRange = [-7, 7] as [number, number],
  yRange = [-4, 4] as [number, number],
  initialA = 1,
  color = "currentColor",
}: {
  width?: number;
  height?: number;
  xRange?: [number, number];
  yRange?: [number, number];
  initialA?: number;
  color?: string;
}) {
  const [A, setA] = React.useState(initialA);
  return (
    <FigScene width={width} height={height} xRange={xRange} yRange={yRange}>
      <FigFunction fn={(x) => A * Math.sin(x)} color={color} strokeWidth={2} />
      <FigDraggablePoint
        x={Math.PI / 2}
        y={A}
        onDrag={(_, y) => setA(Math.round(y * 10) / 10)}
        label={`A = ${A.toFixed(1)}`}
        color="#007700"
        r={7}
      />
    </FigScene>
  );
}
FigSineExplorer.displayName = "FigSineExplorer";

/** Interactive circle — drag the edge point to resize. Shows area and circumference. */
export function FigCircleExplorer({
  width = 320,
  height = 320,
  xRange = [-5, 5] as [number, number],
  yRange = [-5, 5] as [number, number],
  initialR = 2,
}: {
  width?: number;
  height?: number;
  xRange?: [number, number];
  yRange?: [number, number];
  initialR?: number;
}) {
  const [r, setR] = React.useState(initialR);
  const area = (Math.PI * r * r).toFixed(2);
  const circ = (2 * Math.PI * r).toFixed(2);
  return (
    <FigScene width={width} height={height} xRange={xRange} yRange={yRange}>
      <FigCircle cx={0} cy={0} r={r} fill="currentColor" opacity={0.06} />
      <FigCircle cx={0} cy={0} r={r} strokeWidth={1.5} />
      <FigSegment x1={0} y1={0} x2={r} y2={0} />
      <FigLabel
        x={r / 2}
        y={0.3}
        fontSize={11}
      >{`r = ${r.toFixed(1)}`}</FigLabel>
      <FigLabel x={0} y={r + 0.4} fontSize={11}>{`A = ${area}`}</FigLabel>
      <FigLabel x={0} y={-(r + 0.4)} fontSize={11}>{`C = ${circ}`}</FigLabel>
      <FigDraggablePoint
        x={r}
        y={0}
        onDrag={(x) => setR(Math.max(0.3, Math.round(Math.abs(x) * 10) / 10))}
        label=""
        color="#007700"
        r={7}
      />
    </FigScene>
  );
}
FigCircleExplorer.displayName = "FigCircleExplorer";

/** y = 1/x with a draggable tangent line — shows f′(a) = −1/a² live. */
export function FigHyperbolicTangentExplorer({
  width = 340,
  height = 340,
  xRange = [0.1, 4] as [number, number],
  yRange = [0, 4] as [number, number],
  initialX = 1,
}: {
  width?: number;
  height?: number;
  xRange?: [number, number];
  yRange?: [number, number];
  initialX?: number;
}) {
  const [t, setT] = React.useState(initialX);
  const snap = (v: number) => Math.round(v * 10) / 10;
  const slope = -1 / (t * t);
  const [x0, x1] = xRange;
  // tangent: y - 1/t = slope*(x - t)  →  y = slope*x - slope*t + 1/t = slope*x + 2/t
  const ty0 = slope * x0 + 2 / t;
  const ty1 = slope * x1 + 2 / t;
  return (
    <FigScene width={width} height={height} xRange={xRange} yRange={yRange}>
      <FigFunction
        fn={(x) => 1 / x}
        domain={[0.15, x1 - 0.1]}
        color="#c8006e"
        strokeWidth={2}
      />
      <FigLine
        x1={x0}
        y1={Math.min(ty0, yRange[1])}
        x2={x1}
        y2={Math.max(ty1, yRange[0])}
        color="#4477cc"
        dashed
      />
      <FigDraggablePoint
        x={t}
        y={1 / t}
        onDrag={(x) => setT(Math.max(0.2, Math.min(x1 - 0.2, snap(x))))}
        label={`f'(${t.toFixed(1)}) = ${slope.toFixed(2)}`}
        color="#007700"
        r={7}
      />
    </FigScene>
  );
}
FigHyperbolicTangentExplorer.displayName = "FigHyperbolicTangentExplorer";
