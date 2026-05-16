import * as React from "react";
import { cn } from "@/lib/utils";
import { cva, type VariantProps } from "class-variance-authority";

const headingVariants = cva("scroll-m-20 tracking-tight", {
  variants: {
    level: {
      h1: "text-4xl font-bold lg:text-5xl",
      h2: "text-3xl font-semibold mt-10 first:mt-0",
      h3: "text-2xl font-semibold mt-8",
      h4: "text-xl font-semibold mt-6",
      h5: "text-lg font-semibold mt-6",
      h6: "text-base font-semibold mt-6",
    },
  },
  defaultVariants: {
    level: "h2",
  },
});

export interface HeadingProps
  extends
    React.HTMLAttributes<HTMLHeadingElement>,
    VariantProps<typeof headingVariants> {
  as?: "h1" | "h2" | "h3" | "h4" | "h5" | "h6";
}

function slugify(text: string): string {
  return String(text)
    .toLowerCase()
    .trim()
    .replace(/\s+/g, "-")
    .replace(/[^\w-]+/g, "")
    .replace(/--+/g, "-");
}

function getTextContent(children: React.ReactNode): string {
  if (typeof children === "string") return children;
  if (typeof children === "number") return String(children);
  if (Array.isArray(children)) return children.map(getTextContent).join("");
  if (React.isValidElement<{ children?: React.ReactNode }>(children)) {
    return getTextContent(children.props.children ?? "");
  }
  return "";
}

export const Heading = React.forwardRef<HTMLHeadingElement, HeadingProps>(
  ({ as, level, className, ...props }, ref) => {
    const Comp = as || level || "h2";
    return (
      <Comp
        ref={ref}
        className={cn(headingVariants({ level: level || as }), className)}
        {...props}
      />
    );
  },
);
Heading.displayName = "Heading";

const HeadingWithAnchor = React.forwardRef<HTMLHeadingElement, HeadingProps>(
  function HeadingWithAnchor(
    { as, level, children, id, className, ...props },
    ref,
  ) {
    const slug = id ?? slugify(getTextContent(children));
    return (
      <Heading
        ref={ref}
        as={as}
        level={level}
        id={slug}
        className={cn("group relative", className)}
        {...props}
      >
        {children}
        <a
          href={`#${slug}`}
          className="ml-2 opacity-0 group-hover:opacity-60 transition-opacity text-muted-foreground no-underline font-normal"
          aria-hidden="true"
          tabIndex={-1}
        >
          #
        </a>
      </Heading>
    );
  },
);

export const H1 = React.forwardRef<
  HTMLHeadingElement,
  Omit<HeadingProps, "as" | "level">
>((props, ref) => (
  <HeadingWithAnchor ref={ref} as="h1" level="h1" {...props} />
));
H1.displayName = "H1";

export const H2 = React.forwardRef<
  HTMLHeadingElement,
  Omit<HeadingProps, "as" | "level">
>((props, ref) => (
  <HeadingWithAnchor ref={ref} as="h2" level="h2" {...props} />
));
H2.displayName = "H2";

export const H3 = React.forwardRef<
  HTMLHeadingElement,
  Omit<HeadingProps, "as" | "level">
>((props, ref) => (
  <HeadingWithAnchor ref={ref} as="h3" level="h3" {...props} />
));
H3.displayName = "H3";

export const H4 = React.forwardRef<
  HTMLHeadingElement,
  Omit<HeadingProps, "as" | "level">
>((props, ref) => (
  <HeadingWithAnchor ref={ref} as="h4" level="h4" {...props} />
));
H4.displayName = "H4";

export const H5 = React.forwardRef<
  HTMLHeadingElement,
  Omit<HeadingProps, "as" | "level">
>((props, ref) => (
  <HeadingWithAnchor ref={ref} as="h5" level="h5" {...props} />
));
H5.displayName = "H5";

export const H6 = React.forwardRef<
  HTMLHeadingElement,
  Omit<HeadingProps, "as" | "level">
>((props, ref) => (
  <HeadingWithAnchor ref={ref} as="h6" level="h6" {...props} />
));
H6.displayName = "H6";
