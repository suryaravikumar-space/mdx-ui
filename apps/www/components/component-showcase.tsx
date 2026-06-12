"use client";

import * as React from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";
import {
  Frac,
  Pow,
  Sub,
  Sqrt,
  Integral,
  ContourIntegral,
  Sum,
  Lim,
  Deriv,
  PDeriv,
  Cases,
  Case,
  Matrix,
  Psi,
  Phi,
  DoubleLeftRightArrow,
} from "@/components/mdx/math-primitives";
import {
  FigScene,
  FigPoint,
  FigEllipse,
  FigHyperbola,
  FigRect,
  FigDecagon,
  FigCuboid,
} from "@/components/mdx/geometry-2d";
import {
  ElecResistor,
  ElecCapacitor,
  ElecInductor,
} from "@/components/mdx/electronics";

type Size = "sm" | "wide" | "tall" | "big";

const SIZE_CLASSES: Record<Size, string> = {
  sm: "col-span-1 row-span-1",
  wide: "col-span-2 row-span-1",
  tall: "col-span-1 row-span-2",
  big: "col-span-2 row-span-2",
};

function useReveal<T extends HTMLElement>() {
  const ref = React.useRef<T>(null);
  const [visible, setVisible] = React.useState(false);

  React.useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.15, rootMargin: "0px 0px -60px 0px" },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return { ref, visible };
}

function ShowcaseCard({
  title,
  category,
  size,
  className,
  children,
}: {
  title: string;
  category: string;
  size: Size;
  className?: string;
  children: React.ReactNode;
}) {
  const { ref, visible } = useReveal<HTMLAnchorElement>();

  return (
    <Link
      ref={ref}
      href={`/docs/components/symbol-browser?q=${encodeURIComponent(title)}`}
      className={cn(
        "showcase-card group flex flex-col gap-2 overflow-hidden rounded-2xl border border-white/8 bg-white/[0.03] p-3 backdrop-blur-xl transition-colors duration-200 hover:border-green-500/40 hover:bg-white/[0.05] dark:border-white/5",
        SIZE_CLASSES[size],
        visible && "is-visible",
        className,
      )}
    >
      <div className="flex items-center justify-between gap-2">
        <span className="font-mono text-[10px] uppercase tracking-widest text-green-600/70 dark:text-green-400/60">
          {category}
        </span>
        <span className="font-mono text-[10px] text-muted-foreground">
          {title}
        </span>
      </div>
      <div className="flex flex-1 items-center justify-center overflow-hidden text-foreground">
        {children}
      </div>
    </Link>
  );
}

export function ComponentShowcase() {
  return (
    <section className="container border-t border-green-500/10 py-12 md:py-16">
      <p className="mb-3 text-center font-mono text-xs font-medium uppercase tracking-widest text-green-600 dark:text-green-500">
        {"// "} components, ready to drop in
      </p>
      <h2 className="mb-8 text-center text-2xl font-bold tracking-tighter md:text-3xl">
        Math, geometry, circuits, and more —{" "}
        <span className="gradient-text">all rendered live.</span>
      </h2>

      <div className="mx-auto grid grid-cols-2 gap-3 [grid-auto-flow:dense] auto-rows-[110px] sm:grid-cols-3 sm:auto-rows-[120px] md:grid-cols-4 lg:grid-cols-6">
        {/* ── Math primitives ─────────────────────────────────────────────── */}
        <ShowcaseCard title="Frac" category="primitive" size="sm">
          <div className="font-serif text-2xl">
            <Frac num="a + b" den="2c" />
          </div>
        </ShowcaseCard>

        <ShowcaseCard title="Pow" category="primitive" size="sm">
          <div className="font-serif text-3xl">
            <Pow exp="2">x</Pow>
          </div>
        </ShowcaseCard>

        <ShowcaseCard title="Sub" category="primitive" size="sm">
          <div className="font-serif text-3xl">
            <Sub sub="i">x</Sub>
          </div>
        </ShowcaseCard>

        <ShowcaseCard title="Sqrt" category="primitive" size="sm">
          <div className="font-serif text-2xl">
            <Sqrt>
              <Pow exp="2">a</Pow> + <Pow exp="2">b</Pow>
            </Sqrt>
          </div>
        </ShowcaseCard>

        {/* ── Calculus ─────────────────────────────────────────────────────── */}
        <ShowcaseCard title="Integral" category="calculus" size="sm">
          <div className="font-serif text-xl">
            <Integral from="0" to="∞">
              <Pow exp="−x">e</Pow> dx
            </Integral>
          </div>
        </ShowcaseCard>

        <ShowcaseCard title="ContourIntegral" category="calculus" size="sm">
          <div className="font-serif text-xl">
            <ContourIntegral from="C">F · dr</ContourIntegral>
          </div>
        </ShowcaseCard>

        <ShowcaseCard title="Sum" category="calculus" size="sm">
          <div className="font-serif text-xl">
            <Sum from="i=1" to="n">
              i
            </Sum>
          </div>
        </ShowcaseCard>

        <ShowcaseCard title="Lim" category="calculus" size="sm">
          <div className="font-serif text-base">
            <Lim sub="x→0">
              <Frac num="sin x" den="x" />
            </Lim>
          </div>
        </ShowcaseCard>

        <ShowcaseCard title="Deriv" category="calculus" size="sm">
          <div className="font-serif text-base">
            <Deriv of="x">f(x)</Deriv>
          </div>
        </ShowcaseCard>

        <ShowcaseCard title="PDeriv" category="calculus" size="sm">
          <div className="font-serif text-base">
            <PDeriv of="x">f</PDeriv>
          </div>
        </ShowcaseCard>

        {/* ── Logic & linear algebra ───────────────────────────────────────── */}
        <ShowcaseCard title="Cases" category="logic" size="wide">
          <div className="font-serif text-base">
            <Cases>
              <Case expr={<Pow exp="2">x</Pow>} when="x ≥ 0" />
              <Case expr="−x" when="x < 0" />
            </Cases>
          </div>
        </ShowcaseCard>

        <ShowcaseCard title="Matrix" category="linear algebra" size="tall">
          <div className="font-serif text-lg">
            <Matrix
              rows={[
                ["1", "0", "0"],
                ["0", "1", "0"],
                ["0", "0", "1"],
              ]}
            />
          </div>
        </ShowcaseCard>

        {/* ── Symbols & arrows ──────────────────────────────────────────────── */}
        <ShowcaseCard title="Psi" category="symbol" size="sm">
          <div className="font-serif text-4xl">
            <Psi />
          </div>
        </ShowcaseCard>

        <ShowcaseCard title="Phi" category="symbol" size="sm">
          <div className="font-serif text-4xl">
            <Phi />
          </div>
        </ShowcaseCard>

        <ShowcaseCard title="DoubleLeftRightArrow" category="arrow" size="sm">
          <div className="flex items-center gap-2 font-serif text-2xl">
            <span>A</span>
            <DoubleLeftRightArrow />
            <span>B</span>
          </div>
        </ShowcaseCard>

        {/* ── 2D geometry ───────────────────────────────────────────────────── */}
        <ShowcaseCard title="FigScene" category="geometry 2d" size="big">
          <FigScene
            width={300}
            height={260}
            xRange={[-4, 4]}
            yRange={[-3, 3]}
            label="Coordinate plane"
            className="h-full w-full"
          />
        </ShowcaseCard>

        <ShowcaseCard title="FigPoint" category="geometry 2d" size="sm">
          <FigScene
            width={140}
            height={120}
            xRange={[-3, 3]}
            yRange={[-3, 3]}
            showGrid={false}
            className="h-full w-full"
          >
            <FigPoint x={1} y={1.4} label="P" labelDir="ne" />
            <FigPoint x={-1.4} y={-1} label="Q" labelDir="sw" />
          </FigScene>
        </ShowcaseCard>

        <ShowcaseCard title="FigEllipse" category="geometry 2d" size="wide">
          <FigScene
            width={260}
            height={120}
            xRange={[-4, 4]}
            yRange={[-2.5, 2.5]}
            showGrid={false}
            className="h-full w-full"
          >
            <FigEllipse
              cx={0}
              cy={0}
              rx={3}
              ry={1.5}
              fill="currentColor"
              opacity={0.1}
            />
          </FigScene>
        </ShowcaseCard>

        <ShowcaseCard title="FigHyperbola" category="geometry 2d" size="wide">
          <FigScene
            width={260}
            height={120}
            xRange={[-4, 4]}
            yRange={[-3, 3]}
            showGrid={false}
            className="h-full w-full"
          >
            <FigHyperbola a={1.2} b={1.2} tRange={1.6} />
          </FigScene>
        </ShowcaseCard>

        <ShowcaseCard title="FigRect" category="geometry 2d" size="sm">
          <FigScene
            width={140}
            height={120}
            xRange={[-3, 3]}
            yRange={[-3, 3]}
            showGrid={false}
            className="h-full w-full"
          >
            <FigRect
              x={-1.5}
              y={-1}
              w={3}
              h={2}
              fill="currentColor"
              opacity={0.1}
            />
          </FigScene>
        </ShowcaseCard>

        <ShowcaseCard title="FigDecagon" category="geometry 2d" size="sm">
          <FigScene
            width={140}
            height={120}
            xRange={[-3, 3]}
            yRange={[-3, 3]}
            showGrid={false}
            className="h-full w-full"
          >
            <FigDecagon cx={0} cy={0} r={2} fill="currentColor" opacity={0.1} />
          </FigScene>
        </ShowcaseCard>

        <ShowcaseCard title="FigCuboid" category="geometry 2d" size="wide">
          <FigScene
            width={260}
            height={120}
            xRange={[-3, 4]}
            yRange={[-2, 3]}
            showGrid={false}
            className="h-full w-full"
          >
            <FigCuboid x={-1.5} y={-1} w={2.5} h={2} d={1.5} angle={30} />
          </FigScene>
        </ShowcaseCard>

        {/* ── Electronics ───────────────────────────────────────────────────── */}
        <ShowcaseCard title="ElecResistor" category="electronics" size="wide">
          <FigScene
            width={260}
            height={120}
            xRange={[-3, 3]}
            yRange={[-2, 2]}
            showGrid={false}
            showAxes={false}
            className="h-full w-full"
          >
            <ElecResistor x1={-2} y1={0} x2={2} y2={0} label="R" />
          </FigScene>
        </ShowcaseCard>

        <ShowcaseCard title="ElecCapacitor" category="electronics" size="wide">
          <FigScene
            width={260}
            height={120}
            xRange={[-3, 3]}
            yRange={[-2, 2]}
            showGrid={false}
            showAxes={false}
            className="h-full w-full"
          >
            <ElecCapacitor x1={-2} y1={0} x2={2} y2={0} label="C" />
          </FigScene>
        </ShowcaseCard>

        <ShowcaseCard title="ElecInductor" category="electronics" size="wide">
          <FigScene
            width={260}
            height={120}
            xRange={[-3, 3]}
            yRange={[-2, 2]}
            showGrid={false}
            showAxes={false}
            className="h-full w-full"
          >
            <ElecInductor x1={-2} y1={0} x2={2} y2={0} label="L" />
          </FigScene>
        </ShowcaseCard>
      </div>

      <div className="mt-8 flex justify-center">
        <Link
          href="/components"
          className="inline-flex h-10 items-center justify-center gap-2 rounded-lg border border-green-500/20 bg-green-500/5 px-6 font-mono text-sm font-semibold text-green-600 backdrop-blur-sm transition-all hover:border-green-500/40 hover:bg-green-500/10 dark:text-green-400"
        >
          Browse all components <ArrowRight className="h-3.5 w-3.5" />
        </Link>
      </div>
    </section>
  );
}
