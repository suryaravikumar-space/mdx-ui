"use client";

import * as React from "react";
import { useFigScene } from "@/components/mdx/geometry-2d";

// ═══════════════════════════════════════════════════════════════════════════════
// ELECTRONICS — Electrical circuit symbol components
// All components must be used inside <FigScene>.
// Coordinates are world units; FigScene handles the pixel transform.
//
// Two-terminal (x1,y1 → x2,y2):
//   ElecWire · ElecResistor · ElecCapacitor · ElecInductor
//   ElecBattery · ElecSwitch · ElecVoltageSource · ElecCurrentSource
//   ElecDiode · ElecLED · ElecLamp · ElecFuse
//
// Single-point (x, y):
//   ElecNode · ElecGround · ElecVoltmeter · ElecAmmeter · ElecLabel
// ═══════════════════════════════════════════════════════════════════════════════

// ─── Internal helpers ─────────────────────────────────────────────────────────

type Pt = { px: number; py: number };

interface BodyGeom {
  a: Pt; b: Pt;
  dx: number; dy: number; len: number;
  ux: number; uy: number;   // unit direction
  nx: number; ny: number;   // unit perpendicular (left)
  bs: Pt; be: Pt;           // body start / end
  mid: Pt;                  // body midpoint
}

function bodyGeom(
  toPixel: (x: number, y: number) => Pt,
  x1: number, y1: number,
  x2: number, y2: number,
  f0 = 0.25, f1 = 0.75,
): BodyGeom {
  const a = toPixel(x1, y1);
  const b = toPixel(x2, y2);
  const dx = b.px - a.px, dy = b.py - a.py;
  const len = Math.sqrt(dx * dx + dy * dy) || 1;
  const ux = dx / len, uy = dy / len;
  const nx = -uy, ny = ux;
  const bs: Pt = { px: a.px + f0 * dx, py: a.py + f0 * dy };
  const be: Pt = { px: a.px + f1 * dx, py: a.py + f1 * dy };
  const mid: Pt = { px: (bs.px + be.px) / 2, py: (bs.py + be.py) / 2 };
  return { a, b, dx, dy, len, ux, uy, nx, ny, bs, be, mid };
}

/** Lead wires from both terminals to the component body. */
function Leads({ a, b, bs, be, color, sw }: {
  a: Pt; b: Pt; bs: Pt; be: Pt; color: string; sw: number;
}) {
  return (
    <>
      <line x1={a.px} y1={a.py} x2={bs.px} y2={bs.py} stroke={color} strokeWidth={sw} />
      <line x1={be.px} y1={be.py} x2={b.px} y2={b.py} stroke={color} strokeWidth={sw} />
    </>
  );
}

/** Value label centered above the component body. */
function ValLabel({ mid, nx, ny, text, color, side = -1 }: {
  mid: Pt; nx: number; ny: number; text: string; color: string; side?: number;
}) {
  return (
    <text
      x={mid.px + nx * 14 * side}
      y={mid.py + ny * 14 * side}
      fill={color}
      fontSize={11}
      textAnchor="middle"
      dominantBaseline="central"
    >
      {text}
    </text>
  );
}

// ─── Two-terminal base props ───────────────────────────────────────────────────

interface TwoTermProps {
  x1: number; y1: number;
  x2: number; y2: number;
  label?: string;
  color?: string;
  strokeWidth?: number;
}

// ═══════════════════════════════════════════════════════════════════════════════
// WIRES & CONNECTIONS
// ═══════════════════════════════════════════════════════════════════════════════

/** Plain conductor wire between two world points. */
export function ElecWire({ x1, y1, x2, y2, color = "currentColor", strokeWidth = 1.5 }: TwoTermProps) {
  const { toPixel } = useFigScene();
  const a = toPixel(x1, y1), b = toPixel(x2, y2);
  return <line x1={a.px} y1={a.py} x2={b.px} y2={b.py} stroke={color} strokeWidth={strokeWidth} />;
}
ElecWire.displayName = "ElecWire";

/** Junction dot — marks a connected node between wires. */
export function ElecNode({ x, y, r = 4, color = "currentColor", label, labelDir = "ne" }: {
  x: number; y: number; r?: number; color?: string; label?: string;
  labelDir?: "ne" | "nw" | "se" | "sw";
}) {
  const { toPixel } = useFigScene();
  const { px, py } = toPixel(x, y);
  const off = r + 6;
  const dx = labelDir === "ne" || labelDir === "se" ? off : -off;
  const dy = labelDir === "ne" || labelDir === "nw" ? -off : off;
  return (
    <g>
      <circle cx={px} cy={py} r={r} fill={color} />
      {label && (
        <text x={px + dx} y={py + dy} fill={color} fontSize={12}
          textAnchor={labelDir === "ne" || labelDir === "se" ? "start" : "end"}
          dominantBaseline="central" fontWeight="bold">
          {label}
        </text>
      )}
    </g>
  );
}
ElecNode.displayName = "ElecNode";

/** Ground symbol — 3 descending horizontal lines. */
export function ElecGround({ x, y, color = "currentColor", strokeWidth = 1.5 }: {
  x: number; y: number; color?: string; strokeWidth?: number;
}) {
  const { toPixel, scaleLen } = useFigScene();
  const { px, py } = toPixel(x, y);
  const w = scaleLen(0.4);
  return (
    <g stroke={color} strokeWidth={strokeWidth}>
      <line x1={px} y1={py} x2={px} y2={py + 8} />
      <line x1={px - w} y1={py + 8} x2={px + w} y2={py + 8} />
      <line x1={px - w * 0.65} y1={py + 14} x2={px + w * 0.65} y2={py + 14} />
      <line x1={px - w * 0.3} y1={py + 20} x2={px + w * 0.3} y2={py + 20} />
    </g>
  );
}
ElecGround.displayName = "ElecGround";

// ═══════════════════════════════════════════════════════════════════════════════
// PASSIVE COMPONENTS
// ═══════════════════════════════════════════════════════════════════════════════

/** Resistor — American zigzag symbol. */
export function ElecResistor({ x1, y1, x2, y2, label, color = "currentColor", strokeWidth = 1.5 }: TwoTermProps) {
  const { toPixel } = useFigScene();
  const g = bodyGeom(toPixel, x1, y1, x2, y2);
  const { a, b, bs, be, mid, nx, ny } = g;
  const bDx = be.px - bs.px, bDy = be.py - bs.py;
  const teeth = 8;
  const amp = 6;

  const pts: string[] = [`${bs.px.toFixed(1)},${bs.py.toFixed(1)}`];
  for (let i = 1; i <= teeth; i++) {
    const t = i / (teeth + 1);
    const dir = i % 2 === 1 ? 1 : -1;
    pts.push(
      `${(bs.px + t * bDx + dir * amp * nx).toFixed(1)},${(bs.py + t * bDy + dir * amp * ny).toFixed(1)}`,
    );
  }
  pts.push(`${be.px.toFixed(1)},${be.py.toFixed(1)}`);

  return (
    <g>
      <Leads a={a} b={b} bs={bs} be={be} color={color} sw={strokeWidth} />
      <polyline points={pts.join(" ")} fill="none" stroke={color} strokeWidth={strokeWidth}
        strokeLinejoin="miter" />
      {label && <ValLabel mid={mid} nx={nx} ny={ny} text={label} color={color} />}
    </g>
  );
}
ElecResistor.displayName = "ElecResistor";

/** Capacitor — two parallel plates. */
export function ElecCapacitor({ x1, y1, x2, y2, label, color = "currentColor", strokeWidth = 1.5 }: TwoTermProps) {
  const { toPixel } = useFigScene();
  const g = bodyGeom(toPixel, x1, y1, x2, y2, 0.42, 0.58);
  const { a, b, bs, be, mid, nx, ny } = g;
  const pl = 10; // plate half-length

  return (
    <g>
      <Leads a={a} b={b} bs={bs} be={be} color={color} sw={strokeWidth} />
      {/* Plate 1 */}
      <line x1={bs.px - pl * nx} y1={bs.py - pl * ny}
        x2={bs.px + pl * nx} y2={bs.py + pl * ny}
        stroke={color} strokeWidth={strokeWidth + 0.5} />
      {/* Plate 2 */}
      <line x1={be.px - pl * nx} y1={be.py - pl * ny}
        x2={be.px + pl * nx} y2={be.py + pl * ny}
        stroke={color} strokeWidth={strokeWidth + 0.5} />
      {label && <ValLabel mid={mid} nx={nx} ny={ny} text={label} color={color} />}
    </g>
  );
}
ElecCapacitor.displayName = "ElecCapacitor";

/** Inductor — series of semicircular arcs (coil). */
export function ElecInductor({ x1, y1, x2, y2, label, color = "currentColor", strokeWidth = 1.5 }: TwoTermProps) {
  const { toPixel } = useFigScene();
  const g = bodyGeom(toPixel, x1, y1, x2, y2);
  const { a, b, bs, be, mid, nx, ny } = g;
  const loops = 4;
  const bDx = be.px - bs.px, bDy = be.py - bs.py;
  const loopW = bDx / loops, loopH = bDy / loops;
  const r = Math.sqrt(loopW * loopW + loopH * loopH) / 2;

  // Each loop: arc from start of loop to end of loop
  let d = `M ${bs.px.toFixed(1)} ${bs.py.toFixed(1)}`;
  for (let i = 0; i < loops; i++) {
    const ex = bs.px + (i + 1) * loopW;
    const ey = bs.py + (i + 1) * loopH;
    d += ` A ${r.toFixed(1)} ${r.toFixed(1)} 0 0 1 ${ex.toFixed(1)} ${ey.toFixed(1)}`;
  }

  return (
    <g>
      <Leads a={a} b={b} bs={bs} be={be} color={color} sw={strokeWidth} />
      <path d={d} fill="none" stroke={color} strokeWidth={strokeWidth} />
      {label && <ValLabel mid={mid} nx={nx} ny={ny} text={label} color={color} />}
    </g>
  );
}
ElecInductor.displayName = "ElecInductor";

/** Fuse — small rectangle across the wire. */
export function ElecFuse({ x1, y1, x2, y2, label, color = "currentColor", strokeWidth = 1.5 }: TwoTermProps) {
  const { toPixel } = useFigScene();
  const g = bodyGeom(toPixel, x1, y1, x2, y2);
  const { a, b, bs, be, mid, nx, ny } = g;
  const hw = 7; // half-width of box (perpendicular)
  const corners = [
    [bs.px - hw * nx, bs.py - hw * ny],
    [be.px - hw * nx, be.py - hw * ny],
    [be.px + hw * nx, be.py + hw * ny],
    [bs.px + hw * nx, bs.py + hw * ny],
  ].map(([x, y]) => `${x!.toFixed(1)},${y!.toFixed(1)}`).join(" ");

  return (
    <g>
      <Leads a={a} b={b} bs={bs} be={be} color={color} sw={strokeWidth} />
      <polygon points={corners} fill="none" stroke={color} strokeWidth={strokeWidth} />
      {label && <ValLabel mid={mid} nx={nx} ny={ny} text={label} color={color} />}
    </g>
  );
}
ElecFuse.displayName = "ElecFuse";

// ═══════════════════════════════════════════════════════════════════════════════
// SOURCES
// ═══════════════════════════════════════════════════════════════════════════════

/** Battery — alternating long/short lines. Positive terminal at (x2,y2). */
export function ElecBattery({ x1, y1, x2, y2, label, color = "currentColor", strokeWidth = 1.5, cells = 2 }: TwoTermProps & { cells?: number }) {
  const { toPixel } = useFigScene();
  const g = bodyGeom(toPixel, x1, y1, x2, y2);
  const { a, b, bs, be, mid, nx, ny } = g;
  const bDx = be.px - bs.px, bDy = be.py - bs.py;
  const lines: React.ReactNode[] = [];

  for (let i = 0; i < cells; i++) {
    const t = i / cells;
    const t2 = (i + 0.5) / cells;
    // Short line (negative)
    const cx = bs.px + t * bDx, cy = bs.py + t * bDy;
    // Long line (positive)
    const cx2 = bs.px + t2 * bDx, cy2 = bs.py + t2 * bDy;
    lines.push(
      <line key={`s${i}`} x1={cx - 5 * nx} y1={cy - 5 * ny} x2={cx + 5 * nx} y2={cy + 5 * ny}
        stroke={color} strokeWidth={strokeWidth + 1} />,
      <line key={`l${i}`} x1={cx2 - 9 * nx} y1={cy2 - 9 * ny} x2={cx2 + 9 * nx} y2={cy2 + 9 * ny}
        stroke={color} strokeWidth={strokeWidth - 0.5} />,
    );
  }

  return (
    <g>
      <Leads a={a} b={b} bs={bs} be={be} color={color} sw={strokeWidth} />
      {lines}
      {/* + / - labels */}
      <text x={be.px + 6 * nx} y={be.py + 6 * ny} fill={color} fontSize={10} textAnchor="middle">+</text>
      <text x={bs.px - 6 * nx} y={bs.py - 6 * ny} fill={color} fontSize={10} textAnchor="middle">−</text>
      {label && <ValLabel mid={mid} nx={nx} ny={ny} text={label} color={color} />}
    </g>
  );
}
ElecBattery.displayName = "ElecBattery";

/** DC Voltage Source — circle with ± inside. */
export function ElecVoltageSource({ x1, y1, x2, y2, label, color = "currentColor", strokeWidth = 1.5 }: TwoTermProps) {
  const { toPixel } = useFigScene();
  const g = bodyGeom(toPixel, x1, y1, x2, y2, 0.3, 0.7);
  const { a, b, bs, be, mid, nx, ny, ux, uy } = g;
  const r = Math.sqrt((be.px - bs.px) ** 2 + (be.py - bs.py) ** 2) / 2;
  return (
    <g>
      <Leads a={a} b={b} bs={bs} be={be} color={color} sw={strokeWidth} />
      <circle cx={mid.px} cy={mid.py} r={r} fill="none" stroke={color} strokeWidth={strokeWidth} />
      <text x={mid.px + ux * r * 0.45} y={mid.py + uy * r * 0.45} fill={color} fontSize={10} textAnchor="middle">+</text>
      <text x={mid.px - ux * r * 0.45} y={mid.py - uy * r * 0.45} fill={color} fontSize={10} textAnchor="middle">−</text>
      {label && <ValLabel mid={mid} nx={nx} ny={ny} text={label} color={color} />}
    </g>
  );
}
ElecVoltageSource.displayName = "ElecVoltageSource";

/** AC Voltage Source — circle with ~ inside. */
export function ElecACSource({ x1, y1, x2, y2, label, color = "currentColor", strokeWidth = 1.5 }: TwoTermProps) {
  const { toPixel } = useFigScene();
  const g = bodyGeom(toPixel, x1, y1, x2, y2, 0.3, 0.7);
  const { a, b, bs, be, mid, nx, ny } = g;
  const r = Math.sqrt((be.px - bs.px) ** 2 + (be.py - bs.py) ** 2) / 2;
  return (
    <g>
      <Leads a={a} b={b} bs={bs} be={be} color={color} sw={strokeWidth} />
      <circle cx={mid.px} cy={mid.py} r={r} fill="none" stroke={color} strokeWidth={strokeWidth} />
      <text x={mid.px} y={mid.py} fill={color} fontSize={13} textAnchor="middle" dominantBaseline="central">~</text>
      {label && <ValLabel mid={mid} nx={nx} ny={ny} text={label} color={color} />}
    </g>
  );
}
ElecACSource.displayName = "ElecACSource";

/** Current Source — circle with arrow inside. */
export function ElecCurrentSource({ x1, y1, x2, y2, label, color = "currentColor", strokeWidth = 1.5 }: TwoTermProps) {
  const { toPixel } = useFigScene();
  const g = bodyGeom(toPixel, x1, y1, x2, y2, 0.3, 0.7);
  const { a, b, bs, be, mid, nx, ny, ux, uy } = g;
  const r = Math.sqrt((be.px - bs.px) ** 2 + (be.py - bs.py) ** 2) / 2;
  // Arrow inside circle pointing in direction of current
  const ax1 = mid.px - ux * r * 0.5, ay1 = mid.py - uy * r * 0.5;
  const ax2 = mid.px + ux * r * 0.5, ay2 = mid.py + uy * r * 0.5;
  return (
    <g>
      <Leads a={a} b={b} bs={bs} be={be} color={color} sw={strokeWidth} />
      <circle cx={mid.px} cy={mid.py} r={r} fill="none" stroke={color} strokeWidth={strokeWidth} />
      <line x1={ax1} y1={ay1} x2={ax2} y2={ay2} stroke={color} strokeWidth={strokeWidth} />
      {/* Simple arrowhead */}
      <polygon
        points={`${ax2},${ay2} ${ax2 - 5 * ux + 4 * nx},${ay2 - 5 * uy + 4 * ny} ${ax2 - 5 * ux - 4 * nx},${ay2 - 5 * uy - 4 * ny}`}
        fill={color}
      />
      {label && <ValLabel mid={mid} nx={nx} ny={ny} text={label} color={color} />}
    </g>
  );
}
ElecCurrentSource.displayName = "ElecCurrentSource";

// ═══════════════════════════════════════════════════════════════════════════════
// SWITCHES
// ═══════════════════════════════════════════════════════════════════════════════

/** Switch — open (default) or closed. */
export function ElecSwitch({ x1, y1, x2, y2, closed = false, label, color = "currentColor", strokeWidth = 1.5 }: TwoTermProps & { closed?: boolean }) {
  const { toPixel } = useFigScene();
  const g = bodyGeom(toPixel, x1, y1, x2, y2);
  const { a, b, bs, be, mid, nx, ny } = g;
  const dotR = 3;

  return (
    <g>
      <Leads a={a} b={b} bs={bs} be={be} color={color} sw={strokeWidth} />
      <circle cx={bs.px} cy={bs.py} r={dotR} fill={color} />
      <circle cx={be.px} cy={be.py} r={dotR} fill={color} />
      {closed ? (
        // Closed: straight line between contacts
        <line x1={bs.px} y1={bs.py} x2={be.px} y2={be.py} stroke={color} strokeWidth={strokeWidth} />
      ) : (
        // Open: angled line up from bs toward be but not reaching
        <line x1={bs.px} y1={bs.py}
          x2={bs.px + (be.px - bs.px) * 0.7 + nx * 8}
          y2={bs.py + (be.py - bs.py) * 0.7 + ny * 8}
          stroke={color} strokeWidth={strokeWidth} />
      )}
      {label && <ValLabel mid={mid} nx={nx} ny={ny} text={label} color={color} />}
    </g>
  );
}
ElecSwitch.displayName = "ElecSwitch";

// ═══════════════════════════════════════════════════════════════════════════════
// SEMICONDUCTOR & OUTPUT DEVICES
// ═══════════════════════════════════════════════════════════════════════════════

/** Diode — triangle + bar. Current flows from (x1,y1) to (x2,y2). */
export function ElecDiode({ x1, y1, x2, y2, label, color = "currentColor", strokeWidth = 1.5 }: TwoTermProps) {
  const { toPixel } = useFigScene();
  const g = bodyGeom(toPixel, x1, y1, x2, y2);
  const { a, b, bs, be, mid, nx, ny } = g;
  const bLen = Math.sqrt((be.px - bs.px) ** 2 + (be.py - bs.py) ** 2);
  const hw = bLen / 2; // half-width of triangle
  const barH = 9; // half-height of bar

  // Triangle: tip at be, base at bs
  const tri = [
    `${be.px.toFixed(1)},${be.py.toFixed(1)}`,
    `${(bs.px + hw * nx).toFixed(1)},${(bs.py + hw * ny).toFixed(1)}`,
    `${(bs.px - hw * nx).toFixed(1)},${(bs.py - hw * ny).toFixed(1)}`,
  ].join(" ");

  return (
    <g>
      <Leads a={a} b={b} bs={bs} be={be} color={color} sw={strokeWidth} />
      <polygon points={tri} fill={color} stroke={color} strokeWidth={1} />
      {/* Bar at be */}
      <line x1={be.px - barH * nx} y1={be.py - barH * ny}
        x2={be.px + barH * nx} y2={be.py + barH * ny}
        stroke={color} strokeWidth={strokeWidth + 1} />
      {label && <ValLabel mid={mid} nx={nx} ny={ny} text={label} color={color} />}
    </g>
  );
}
ElecDiode.displayName = "ElecDiode";

/** LED — diode with two emission arrows. */
export function ElecLED({ x1, y1, x2, y2, label, color = "currentColor", strokeWidth = 1.5 }: TwoTermProps) {
  const { toPixel } = useFigScene();
  const g = bodyGeom(toPixel, x1, y1, x2, y2);
  const { a, b, bs, be, mid, nx, ny, ux, uy } = g;
  const bLen = Math.sqrt((be.px - bs.px) ** 2 + (be.py - bs.py) ** 2);
  const hw = bLen / 2;
  const barH = 9;
  const tri = [
    `${be.px.toFixed(1)},${be.py.toFixed(1)}`,
    `${(bs.px + hw * nx).toFixed(1)},${(bs.py + hw * ny).toFixed(1)}`,
    `${(bs.px - hw * nx).toFixed(1)},${(bs.py - hw * ny).toFixed(1)}`,
  ].join(" ");
  // Emission arrows (two short diagonal arrows from the body)
  const arrowBase = { px: mid.px + nx * 8, py: mid.py + ny * 8 };
  return (
    <g>
      <Leads a={a} b={b} bs={bs} be={be} color={color} sw={strokeWidth} />
      <polygon points={tri} fill={color} stroke={color} strokeWidth={1} />
      <line x1={be.px - barH * nx} y1={be.py - barH * ny}
        x2={be.px + barH * nx} y2={be.py + barH * ny}
        stroke={color} strokeWidth={strokeWidth + 1} />
      {/* Arrow 1 */}
      <line x1={arrowBase.px} y1={arrowBase.py}
        x2={arrowBase.px + (nx + ux) * 10} y2={arrowBase.py + (ny + uy) * 10}
        stroke={color} strokeWidth={1} />
      {/* Arrow 2 */}
      <line x1={arrowBase.px + nx * 5} y1={arrowBase.py + ny * 5}
        x2={arrowBase.px + nx * 5 + (nx + ux) * 10} y2={arrowBase.py + ny * 5 + (ny + uy) * 10}
        stroke={color} strokeWidth={1} />
      {label && <ValLabel mid={mid} nx={nx} ny={ny} text={label} color={color} />}
    </g>
  );
}
ElecLED.displayName = "ElecLED";

/** Lamp — circle with X cross inside. */
export function ElecLamp({ x1, y1, x2, y2, label, color = "currentColor", strokeWidth = 1.5 }: TwoTermProps) {
  const { toPixel } = useFigScene();
  const g = bodyGeom(toPixel, x1, y1, x2, y2, 0.3, 0.7);
  const { a, b, bs, be, mid, nx, ny } = g;
  const r = Math.sqrt((be.px - bs.px) ** 2 + (be.py - bs.py) ** 2) / 2;
  const xr = r * 0.65;
  return (
    <g>
      <Leads a={a} b={b} bs={bs} be={be} color={color} sw={strokeWidth} />
      <circle cx={mid.px} cy={mid.py} r={r} fill="none" stroke={color} strokeWidth={strokeWidth} />
      <line x1={mid.px - xr} y1={mid.py - xr} x2={mid.px + xr} y2={mid.py + xr} stroke={color} strokeWidth={strokeWidth} />
      <line x1={mid.px + xr} y1={mid.py - xr} x2={mid.px - xr} y2={mid.py + xr} stroke={color} strokeWidth={strokeWidth} />
      {label && <ValLabel mid={mid} nx={nx} ny={ny} text={label} color={color} />}
    </g>
  );
}
ElecLamp.displayName = "ElecLamp";

// ═══════════════════════════════════════════════════════════════════════════════
// MEASUREMENT INSTRUMENTS
// ═══════════════════════════════════════════════════════════════════════════════

/** Voltmeter — circle with V. Connect in parallel. */
export function ElecVoltmeter({ x1, y1, x2, y2, color = "currentColor", strokeWidth = 1.5 }: TwoTermProps) {
  const { toPixel } = useFigScene();
  const g = bodyGeom(toPixel, x1, y1, x2, y2, 0.3, 0.7);
  const { a, b, bs, be, mid } = g;
  const r = Math.sqrt((be.px - bs.px) ** 2 + (be.py - bs.py) ** 2) / 2;
  return (
    <g>
      <Leads a={a} b={b} bs={bs} be={be} color={color} sw={strokeWidth} />
      <circle cx={mid.px} cy={mid.py} r={r} fill="none" stroke={color} strokeWidth={strokeWidth} />
      <text x={mid.px} y={mid.py} fill={color} fontSize={r * 0.9} fontWeight="bold"
        textAnchor="middle" dominantBaseline="central">V</text>
    </g>
  );
}
ElecVoltmeter.displayName = "ElecVoltmeter";

/** Ammeter — circle with A. Connect in series. */
export function ElecAmmeter({ x1, y1, x2, y2, color = "currentColor", strokeWidth = 1.5 }: TwoTermProps) {
  const { toPixel } = useFigScene();
  const g = bodyGeom(toPixel, x1, y1, x2, y2, 0.3, 0.7);
  const { a, b, bs, be, mid } = g;
  const r = Math.sqrt((be.px - bs.px) ** 2 + (be.py - bs.py) ** 2) / 2;
  return (
    <g>
      <Leads a={a} b={b} bs={bs} be={be} color={color} sw={strokeWidth} />
      <circle cx={mid.px} cy={mid.py} r={r} fill="none" stroke={color} strokeWidth={strokeWidth} />
      <text x={mid.px} y={mid.py} fill={color} fontSize={r * 0.9} fontWeight="bold"
        textAnchor="middle" dominantBaseline="central">A</text>
    </g>
  );
}
ElecAmmeter.displayName = "ElecAmmeter";

/** Standalone value or node label at a world coordinate. */
export function ElecLabel({ x, y, children, color = "currentColor", fontSize = 12 }: {
  x: number; y: number; children: React.ReactNode;
  color?: string; fontSize?: number;
}) {
  const { toPixel } = useFigScene();
  const { px, py } = toPixel(x, y);
  return (
    <text x={px} y={py} fill={color} fontSize={fontSize}
      textAnchor="middle" dominantBaseline="central">{children}</text>
  );
}
ElecLabel.displayName = "ElecLabel";
