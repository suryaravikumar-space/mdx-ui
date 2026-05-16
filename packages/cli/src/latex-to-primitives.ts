// ─── LaTeX → mdx-ui Primitives Transpiler ────────────────────────────────────
//
// Converts LaTeX math strings to mdx-ui primitive component JSX deterministically.
// Pipeline: tokenize → parse (AST) → emit (JSX string)
//
// Handles:
//   \frac{a}{b}              → <Frac num="a" den="b" />
//   \int_{-\infty}^{\infty}  → <Integral from={<span>−<Inf /></span>} to={<Inf />}>
//   \sum_{i=0}^{n}           → <Sum from="i=0" to="n">
//   x^{2}                    → <Pow exp="2">x</Pow>
//   x_{n}                    → <Sub sub="n">x</Sub>
//   \alpha                   → <Alpha />
//   \vec{v}                  → <Vec>v</Vec>
//   ... and 100+ more patterns

// ─── Tokenizer ────────────────────────────────────────────────────────────────

type Token =
  | { t: "CMD"; v: string } // \frac, \alpha, \left, \,
  | { t: "LBRACE" } // {
  | { t: "RBRACE" } // }
  | { t: "LBRACKET" } // [
  | { t: "RBRACKET" } // ]
  | { t: "CARET" } // ^
  | { t: "UNDER" } // _
  | { t: "LPAREN" } // (
  | { t: "RPAREN" } // )
  | { t: "AMP" } // &
  | { t: "CHAR"; v: string } // any other character
  | { t: "EOF" };

function tokenize(src: string): Token[] {
  const tokens: Token[] = [];
  let i = 0;
  while (i < src.length) {
    const ch = src[i];
    if (ch === "\\") {
      // command: \frac, \alpha, \,  \; \! etc.
      i++;
      if (i >= src.length) break;
      if (/[a-zA-Z]/.test(src[i])) {
        let cmd = "";
        while (i < src.length && /[a-zA-Z*]/.test(src[i])) cmd += src[i++];
        tokens.push({ t: "CMD", v: cmd });
      } else {
        // single-char command: \, \; \! \| etc.
        tokens.push({ t: "CMD", v: src[i++] });
      }
    } else if (ch === "{") {
      tokens.push({ t: "LBRACE" });
      i++;
    } else if (ch === "}") {
      tokens.push({ t: "RBRACE" });
      i++;
    } else if (ch === "[") {
      tokens.push({ t: "LBRACKET" });
      i++;
    } else if (ch === "]") {
      tokens.push({ t: "RBRACKET" });
      i++;
    } else if (ch === "^") {
      tokens.push({ t: "CARET" });
      i++;
    } else if (ch === "_") {
      tokens.push({ t: "UNDER" });
      i++;
    } else if (ch === "(") {
      tokens.push({ t: "LPAREN" });
      i++;
    } else if (ch === ")") {
      tokens.push({ t: "RPAREN" });
      i++;
    } else if (ch === "&") {
      tokens.push({ t: "AMP" });
      i++;
    } else if (/\s/.test(ch)) {
      i++;
    } // skip whitespace in LaTeX
    else {
      tokens.push({ t: "CHAR", v: ch });
      i++;
    }
  }
  tokens.push({ t: "EOF" });
  return tokens;
}

// ─── AST ─────────────────────────────────────────────────────────────────────

type ASTNode =
  | { k: "text"; v: string }
  | {
      k: "comp";
      name: string;
      props?: Record<string, ASTNode[]>;
      children?: ASTNode[];
    }
  | { k: "seq"; nodes: ASTNode[] }; // sequence of nodes

// Emit helpers — determines how to render a node list as JSX
function isAllText(nodes: ASTNode[]): boolean {
  return nodes.every((n) => n.k === "text");
}

function textOf(nodes: ASTNode[]): string {
  return nodes.map((n) => (n.k === "text" ? n.v : "")).join("");
}

// Emit a prop value: plain string if all text, else JSX expression
function emitProp(nodes: ASTNode[]): string {
  if (nodes.length === 0) return '""';
  if (isAllText(nodes)) return `"${textOf(nodes)}"`;
  // single self-closing component
  if (nodes.length === 1 && nodes[0].k === "comp" && !nodes[0].children) {
    const n = nodes[0];
    const props = emitPropsStr(n.props);
    return `{<${n.name}${props} />}`;
  }
  // mixed or multiple nodes → wrap in span
  return `{<span>${emitNodes(nodes)}</span>}`;
}

function emitPropsStr(props?: Record<string, ASTNode[]>): string {
  if (!props) return "";
  return Object.entries(props)
    .map(([k, v]) => ` ${k}=${emitProp(v)}`)
    .join("");
}

function emitNode(n: ASTNode): string {
  if (n.k === "text") return n.v;
  if (n.k === "seq") return emitNodes(n.nodes);
  if (n.k === "comp") {
    const props = emitPropsStr(n.props);
    if (!n.children) return `<${n.name}${props} />`;
    return `<${n.name}${props}>${emitNodes(n.children)}</${n.name}>`;
  }
  return "";
}

function emitNodes(nodes: ASTNode[]): string {
  return nodes.map(emitNode).join("");
}

// ─── Parser ───────────────────────────────────────────────────────────────────

class Parser {
  private pos = 0;
  constructor(private tokens: Token[]) {}

  peek(): Token {
    return this.tokens[this.pos];
  }
  eat(): Token {
    return this.tokens[this.pos++];
  }
  eatIf(t: Token["t"]): boolean {
    if (this.peek().t === t) {
      this.pos++;
      return true;
    }
    return false;
  }

  // Parse a group {...} — returns the nodes inside
  parseGroup(): ASTNode[] {
    if (this.peek().t !== "LBRACE") return [this.parsePrimary()];
    this.eat(); // consume {
    const nodes = this.parseSeq(["RBRACE"]);
    this.eatIf("RBRACE");
    return nodes;
  }

  // Parse an optional group [...] — returns nodes or null
  parseOptGroup(): ASTNode[] | null {
    if (this.peek().t !== "LBRACKET") return null;
    this.eat(); // consume [
    const nodes = this.parseSeq(["RBRACKET"]);
    this.eatIf("RBRACKET");
    return nodes;
  }

  // Parse a sequence of nodes until one of the stop tokens
  parseSeq(stop: Token["t"][] = ["EOF"]): ASTNode[] {
    const nodes: ASTNode[] = [];
    while (!stop.includes(this.peek().t)) {
      if (this.peek().t === "EOF") break;
      const n = this.parseAtom();
      if (n) nodes.push(n);
    }
    return nodes;
  }

  // Parse a single atom possibly followed by ^ and/or _
  parseAtom(): ASTNode | null {
    const base = this.parsePrimary();
    if (!base) return null;
    return this.parseScripts(base);
  }

  // Attach ^ and _ to a base node
  parseScripts(base: ASTNode): ASTNode {
    const node = base;
    let sup: ASTNode[] | null = null;
    let sub: ASTNode[] | null = null;

    // consume any combination of ^ and _ in any order
    for (let i = 0; i < 2; i++) {
      if (this.peek().t === "CARET" && !sup) {
        this.eat();
        sup = this.parseGroup();
      } else if (this.peek().t === "UNDER" && !sub) {
        this.eat();
        sub = this.parseGroup();
      } else break;
    }

    if (sup && sub) {
      // both: base_{sub}^{sup} — wrap as Sub then Pow or vice versa
      const withSub: ASTNode = {
        k: "comp",
        name: "Sub",
        props: { sub },
        children: [node],
      };
      return {
        k: "comp",
        name: "Pow",
        props: { exp: sup },
        children: [withSub],
      };
    }
    if (sup)
      return { k: "comp", name: "Pow", props: { exp: sup }, children: [node] };
    if (sub)
      return { k: "comp", name: "Sub", props: { sub }, children: [node] };
    return node;
  }

  // Parse the primary token (no scripts yet)
  parsePrimary(): ASTNode {
    const tok = this.peek();

    if (tok.t === "LBRACE") {
      const children = this.parseGroup();
      // bare group — emit as a seq
      return { k: "seq", nodes: children };
    }

    if (tok.t === "LPAREN") {
      this.eat();
      const children = this.parseSeq(["RPAREN"]);
      this.eatIf("RPAREN");
      return { k: "comp", name: "Paren", children };
    }

    if (tok.t === "CHAR") {
      this.eat();
      // Greek shorthand: single char that maps to Unicode display
      const map: Record<string, string> = {
        "+": "+",
        "-": "−",
        "=": " = ",
        ",": ", ",
        ".": ".",
        "/": "/",
        ":": ":",
        ";": " ",
        "!": "!",
        "|": "|",
        "<": "<",
        ">": ">",
      };
      return { k: "text", v: map[tok.v] ?? tok.v };
    }

    if (tok.t === "CMD") {
      this.eat();
      return this.parseCommand(tok.v);
    }

    // Skip things we don't handle (AMP, brackets at top level)
    this.eat();
    return { k: "text", v: "" };
  }

  parseCommand(cmd: string): ASTNode {
    switch (cmd) {
      // ── Structural ────────────────────────────────────────────────────────
      case "frac": {
        const num = this.parseGroup();
        const den = this.parseGroup();
        // detect \frac{\partial^n f}{\partial x^n} → PDeriv
        const numStr = textOf(num);
        const denStr = textOf(den);
        if (
          (numStr.startsWith("∂") || isPartial(num)) &&
          (denStr.startsWith("∂") || isPartial(den))
        ) {
          // extract 'of' and 'by' — best effort
          const ofNodes = extractAfterPartial(num);
          const byNodes = extractAfterPartial(den);
          return {
            k: "comp",
            name: "PDeriv",
            props: {
              of: ofNodes.length ? ofNodes : [{ k: "text", v: "f" }],
              by: byNodes.length ? byNodes : [{ k: "text", v: "x" }],
            },
          };
        }
        // detect \frac{df}{dx} or \frac{dy}{dx} → Deriv
        if (/^d[a-zA-Z]$/.test(numStr) && /^d[a-zA-Z]$/.test(denStr)) {
          return {
            k: "comp",
            name: "Deriv",
            props: {
              of: [{ k: "text", v: numStr[1] }],
              by: [{ k: "text", v: denStr[1] }],
            },
          };
        }
        return { k: "comp", name: "Frac", props: { num, den } };
      }

      case "sqrt": {
        const optN = this.parseOptGroup();
        const body = this.parseGroup();
        const props: Record<string, ASTNode[]> = {};
        if (optN) props["n"] = optN;
        return {
          k: "comp",
          name: "Sqrt",
          props: Object.keys(props).length ? props : undefined,
          children: body,
        };
      }

      // ── Calculus ──────────────────────────────────────────────────────────
      case "int":
      case "intop": {
        const { from, to } = this.parseSubSup();
        const body = this.parseSeq(["RBRACE", "EOF"]);
        return {
          k: "comp",
          name: "Integral",
          props: buildBounds(from, to),
          children: body,
        };
      }

      case "oint": {
        const { from, to } = this.parseSubSup();
        const body = this.parseSeq(["RBRACE", "EOF"]);
        return {
          k: "comp",
          name: "ContourIntegral",
          props: buildBounds(from, to),
          children: body,
        };
      }

      case "iint":
        return { k: "comp", name: "DoubleInt" };
      case "iiint":
        return { k: "comp", name: "TripleInt" };

      case "sum": {
        const { from, to } = this.parseSubSup();
        const body = this.parseSeq(["RBRACE", "EOF"]);
        return {
          k: "comp",
          name: "Sum",
          props: buildBounds(from, to),
          children: body,
        };
      }

      case "prod": {
        const { from, to } = this.parseSubSup();
        const body = this.parseSeq(["RBRACE", "EOF"]);
        return {
          k: "comp",
          name: "Prod",
          props: buildBounds(from, to),
          children: body,
        };
      }

      case "lim": {
        const subNodes = this.parseUnder();
        const body = this.parseSeq(["RBRACE", "EOF"]);
        const props = subNodes ? { sub: subNodes } : undefined;
        return { k: "comp", name: "Lim", props, children: body };
      }

      case "partial":
        return { k: "comp", name: "PartialDiff" };
      case "nabla":
        return { k: "comp", name: "Nabla" };

      // Limits
      case "limsup": {
        const subNodes = this.parseUnder();
        return {
          k: "comp",
          name: "Limsup",
          props: subNodes ? { sub: subNodes } : undefined,
        };
      }
      case "liminf": {
        const subNodes = this.parseUnder();
        return {
          k: "comp",
          name: "Liminf",
          props: subNodes ? { sub: subNodes } : undefined,
        };
      }

      // ── Accents ───────────────────────────────────────────────────────────
      case "vec":
        return { k: "comp", name: "Vec", children: this.parseGroup() };
      case "hat":
        return { k: "comp", name: "Hat", children: this.parseGroup() };
      case "bar":
      case "overline":
        return { k: "comp", name: "Bar", children: this.parseGroup() };
      case "tilde":
      case "widetilde":
        return { k: "comp", name: "Tilde", children: this.parseGroup() };
      case "dot":
        return { k: "comp", name: "DotAccent", children: this.parseGroup() };
      case "ddot":
        return { k: "comp", name: "DDot", children: this.parseGroup() };
      case "overbrace":
        return { k: "comp", name: "Overbrace", children: this.parseGroup() };
      case "underbrace":
        return { k: "comp", name: "Underbrace", children: this.parseGroup() };
      case "widehat":
        return { k: "comp", name: "Hat", children: this.parseGroup() };
      case "underline":
        return { k: "comp", name: "Bar", children: this.parseGroup() }; // closest approximation

      // ── Left/Right delimiters ──────────────────────────────────────────────
      case "left": {
        const delim = this.peek();
        this.eat();
        let compName = "Paren";
        if (delim.t === "LBRACKET")
          compName = "group"; // [...]
        else if (delim.t === "CMD" && delim.v === "langle")
          compName = "AngleBracket";
        else if (delim.t === "CMD" && delim.v === "lfloor") compName = "Floor";
        else if (delim.t === "CMD" && delim.v === "lceil") compName = "Ceil";
        else if (delim.t === "CMD" && delim.v === "lVert") compName = "Norm";
        else if (delim.t === "CMD" && delim.v === "vert") compName = "Abs";

        const children = this.parseUntilRight();
        if (compName === "group") {
          return {
            k: "seq",
            nodes: [{ k: "text", v: "[" }, ...children, { k: "text", v: "]" }],
          };
        }
        return { k: "comp", name: compName, children };
      }

      case "right": {
        this.eat();
        return { k: "text", v: "" };
      } // consumed by left

      // ── Brackets standalone ───────────────────────────────────────────────
      case "langle": {
        const children = this.parseSeq(["CMD"]);
        return { k: "comp", name: "AngleBracket", children };
      }
      case "rangle":
        return { k: "text", v: "" };
      case "lfloor": {
        const children = this.parseSeq(["CMD"]);
        return { k: "comp", name: "Floor", children };
      }
      case "rfloor":
        return { k: "text", v: "" };
      case "lceil": {
        const children = this.parseSeq(["CMD"]);
        return { k: "comp", name: "Ceil", children };
      }
      case "rceil":
        return { k: "text", v: "" };

      // ── Text ──────────────────────────────────────────────────────────────
      case "text":
      case "textrm":
      case "textit":
      case "textbf":
      case "mathrm":
      case "mathit":
      case "mathbf": {
        const g = this.parseGroup();
        return { k: "seq", nodes: g };
      }

      // ── Mathbb / Mathcal ──────────────────────────────────────────────────
      case "mathbb": {
        const g = this.parseGroup();
        const letter = textOf(g).trim().toUpperCase();
        const bbMap: Record<string, string> = {
          N: "NN",
          Z: "ZZ",
          Q: "QQ",
          R: "RR",
          C: "CC",
          P: "PP",
          F: "FF",
          E: "EulerE",
        };
        return { k: "comp", name: bbMap[letter] ?? `BB${letter}` };
      }

      case "mathcal": {
        const g = this.parseGroup();
        const letter = textOf(g).trim();
        return { k: "comp", name: `Script${letter.toUpperCase()}` };
      }

      case "mathscr": {
        const g = this.parseGroup();
        const letter = textOf(g).trim();
        return { k: "comp", name: `Script${letter.toUpperCase()}` };
      }

      case "ell":
        return { k: "comp", name: "ScriptEll" };

      // ── Greek letters ─────────────────────────────────────────────────────
      case "alpha":
        return { k: "comp", name: "Alpha" };
      case "beta":
        return { k: "comp", name: "Beta" };
      case "gamma":
        return { k: "comp", name: "Gamma" };
      case "delta":
        return { k: "comp", name: "GDelta" };
      case "epsilon":
        return { k: "comp", name: "Epsilon" };
      case "varepsilon":
        return { k: "comp", name: "Varepsilon" };
      case "zeta":
        return { k: "comp", name: "Zeta" };
      case "eta":
        return { k: "comp", name: "Eta" };
      case "theta":
        return { k: "comp", name: "Theta" };
      case "vartheta":
        return { k: "comp", name: "Vartheta" };
      case "iota":
        return { k: "comp", name: "Iota" };
      case "kappa":
        return { k: "comp", name: "Kappa" };
      case "lambda":
        return { k: "comp", name: "Lambda" };
      case "mu":
        return { k: "comp", name: "Mu" };
      case "nu":
        return { k: "comp", name: "Nu" };
      case "xi":
        return { k: "comp", name: "Xi" };
      case "pi":
        return { k: "comp", name: "PiSym" };
      case "varpi":
        return { k: "comp", name: "Varpi" };
      case "rho":
        return { k: "comp", name: "Rho" };
      case "varrho":
        return { k: "comp", name: "Varrho" };
      case "sigma":
        return { k: "comp", name: "SigmaSym" };
      case "varsigma":
        return { k: "comp", name: "Varsigma" };
      case "tau":
        return { k: "comp", name: "Tau" };
      case "upsilon":
        return { k: "comp", name: "Upsilon" };
      case "phi":
        return { k: "comp", name: "Phi" };
      case "varphi":
        return { k: "comp", name: "Varphi" };
      case "chi":
        return { k: "comp", name: "Chi" };
      case "psi":
        return { k: "comp", name: "Psi" };
      case "omega":
        return { k: "comp", name: "Omega" };
      // uppercase
      case "Gamma":
        return { k: "comp", name: "GammaU" };
      case "Delta":
        return { k: "comp", name: "DeltaU" };
      case "Theta":
        return { k: "comp", name: "ThetaU" };
      case "Lambda":
        return { k: "comp", name: "LambdaU" };
      case "Xi":
        return { k: "comp", name: "XiU" };
      case "Pi":
        return { k: "comp", name: "PiU" };
      case "Sigma":
        return { k: "comp", name: "SigmaU" };
      case "Phi":
        return { k: "comp", name: "PhiU" };
      case "Psi":
        return { k: "comp", name: "PsiU" };
      case "Omega":
        return { k: "comp", name: "OmegaU" };

      // ── Symbols ───────────────────────────────────────────────────────────
      case "infty":
      case "infinity":
        return { k: "comp", name: "Inf" };
      case "pm":
        return { k: "comp", name: "PlusMinus" };
      case "mp":
        return { k: "comp", name: "MinusPlus" };
      case "times":
        return { k: "comp", name: "Times" };
      case "div":
        return { k: "comp", name: "Division" };
      case "cdot":
        return { k: "comp", name: "Dot" };

      // Relations
      case "leq":
      case "le":
        return { k: "comp", name: "Leq" };
      case "geq":
      case "ge":
        return { k: "comp", name: "Geq" };
      case "neq":
      case "ne":
        return { k: "comp", name: "Neq" };
      case "approx":
        return { k: "comp", name: "Approx" };
      case "equiv":
        return { k: "comp", name: "Equiv" };
      case "cong":
        return { k: "comp", name: "Cong" };
      case "sim":
        return { k: "comp", name: "Sim" };
      case "ll":
        return { k: "comp", name: "Ll" };
      case "gg":
        return { k: "comp", name: "Gg" };
      case "propto":
        return { k: "comp", name: "Propto" };
      case "doteq":
        return { k: "comp", name: "Approaches" };
      case "triangleq":
        return { k: "comp", name: "DefinedAs" };

      // Sets
      case "in":
        return { k: "comp", name: "In" };
      case "notin":
        return { k: "comp", name: "NotIn" };
      case "subset":
        return { k: "comp", name: "Subset" };
      case "subseteq":
        return { k: "comp", name: "SubsetEq" };
      case "subsetneq":
        return { k: "comp", name: "ProperSubset" };
      case "supset":
        return { k: "comp", name: "Supset" };
      case "supseteq":
        return { k: "comp", name: "SupsetEq" };
      case "cup":
        return { k: "comp", name: "Union" };
      case "cap":
        return { k: "comp", name: "Intersect" };
      case "bigcup":
        return { k: "comp", name: "BigUnion" };
      case "bigcap":
        return { k: "comp", name: "BigIntersect" };
      case "emptyset":
      case "varnothing":
        return { k: "comp", name: "Empty" };
      case "setminus":
        return { k: "comp", name: "SetMinus" };

      // Logic
      case "land":
      case "wedge":
        return { k: "comp", name: "And" };
      case "lor":
      case "vee":
        return { k: "comp", name: "Or" };
      case "lnot":
      case "neg":
        return { k: "comp", name: "Not" };
      case "forall":
        return { k: "comp", name: "ForAll" };
      case "exists":
        return { k: "comp", name: "Exists" };
      case "nexists":
        return { k: "comp", name: "NotExists" };
      case "therefore":
        return { k: "comp", name: "Therefore" };
      case "because":
        return { k: "comp", name: "Because" };
      case "vdash":
        return { k: "comp", name: "Turnstile" };
      case "models":
        return { k: "comp", name: "Models" };
      case "top":
        return { k: "comp", name: "Top" };
      case "bot":
        return { k: "comp", name: "Bot" };
      case "oplus":
        return { k: "comp", name: "DirectSum" };
      case "otimes":
        return { k: "comp", name: "OTimes" };
      case "odot":
        return { k: "comp", name: "Hadamard" };

      // Arrows
      case "to":
      case "rightarrow":
        return { k: "comp", name: "Arrow" };
      case "leftarrow":
      case "gets":
        return { k: "comp", name: "LeftArrow" };
      case "leftrightarrow":
        return { k: "comp", name: "LeftRightArrow" };
      case "Rightarrow":
      case "implies":
        return { k: "comp", name: "DoubleRightArrow" };
      case "Leftarrow":
        return { k: "comp", name: "DoubleLeftArrow" };
      case "Leftrightarrow":
      case "iff":
        return { k: "comp", name: "DoubleLeftRightArrow" };
      case "longrightarrow":
        return { k: "comp", name: "LongRightArrow" };
      case "longleftarrow":
        return { k: "comp", name: "LongLeftArrow" };
      case "longleftrightarrow":
        return { k: "comp", name: "LongLeftRightArrow" };
      case "mapsto":
        return { k: "comp", name: "MapsTo" };
      case "longmapsto":
        return { k: "comp", name: "LongMapsTo" };
      case "nearrow":
        return { k: "comp", name: "NearArrow" };
      case "searrow":
        return { k: "comp", name: "SeArrow" };
      case "uparrow":
        return { k: "comp", name: "UpArrow" };
      case "downarrow":
        return { k: "comp", name: "DownArrow" };
      case "updownarrow":
        return { k: "comp", name: "UpDownArrow" };
      case "rightharpoonup":
        return { k: "comp", name: "RightHarpoonUp" };
      case "leftharpoonup":
        return { k: "comp", name: "LeftHarpoonUp" };
      case "rightleftharpoons":
        return { k: "comp", name: "EquilibriumArrow" };
      case "hookleftarrow":
        return { k: "comp", name: "HookLeftArrow" };
      case "hookrightarrow":
        return { k: "comp", name: "HookRightArrow" };

      // Linear algebra
      case "det":
        return { k: "comp", name: "Det", children: this.parseMaybeArg() };
      case "ker":
        return { k: "comp", name: "Ker", children: this.parseMaybeArg() };
      case "dim":
        return { k: "comp", name: "Dim", children: this.parseMaybeArg() };
      case "rank":
        return { k: "comp", name: "Rank", children: this.parseMaybeArg() };
      case "tr":
      case "trace":
        return { k: "comp", name: "Trace", children: this.parseMaybeArg() };

      // Operator names
      case "operatorname": {
        const g = this.parseGroup();
        const name = textOf(g).trim();
        const opMap: Record<string, string> = {
          span: "SpanOp",
          rank: "Rank",
          ker: "Ker",
          dim: "Dim",
          null: "NullOp",
          img: "Img",
          tr: "Trace",
          det: "Det",
          Re: "Re",
          Im: "Im",
          Res: "Res",
          sgn: "Sgn",
          arg: "Arg",
          max: "Max",
          min: "Min",
          sup: "Sup",
          inf: "Inf2",
          gcd: "Gcd",
          lcm: "Lcm",
          ord: "Ord",
        };
        return {
          k: "comp",
          name: opMap[name] ?? name,
          children: this.parseMaybeArg(),
        };
      }

      // Functions (trig etc.)
      case "sin":
        return { k: "comp", name: "Sin", children: this.parseMaybeArg() };
      case "cos":
        return { k: "comp", name: "Cos", children: this.parseMaybeArg() };
      case "tan":
        return { k: "comp", name: "Tan", children: this.parseMaybeArg() };
      case "cot":
        return { k: "comp", name: "Cot", children: this.parseMaybeArg() };
      case "sec":
        return { k: "comp", name: "Sec", children: this.parseMaybeArg() };
      case "csc":
        return { k: "comp", name: "Csc", children: this.parseMaybeArg() };
      case "arcsin":
        return { k: "comp", name: "ArcSin", children: this.parseMaybeArg() };
      case "arccos":
        return { k: "comp", name: "ArcCos", children: this.parseMaybeArg() };
      case "arctan":
        return { k: "comp", name: "ArcTan", children: this.parseMaybeArg() };
      case "sinh":
        return { k: "comp", name: "Sinh", children: this.parseMaybeArg() };
      case "cosh":
        return { k: "comp", name: "Cosh", children: this.parseMaybeArg() };
      case "tanh":
        return { k: "comp", name: "Tanh", children: this.parseMaybeArg() };
      case "log":
        return { k: "comp", name: "Log", children: this.parseMaybeArg() };
      case "ln":
        return { k: "comp", name: "Ln", children: this.parseMaybeArg() };
      case "exp":
        return { k: "comp", name: "Exp", children: this.parseMaybeArg() };

      // Combinatorics
      case "binom": {
        const n = this.parseGroup();
        const k = this.parseGroup();
        return { k: "comp", name: "Choose", props: { n, k } };
      }

      case "pmod": {
        const m = this.parseGroup();
        return { k: "comp", name: "Mod", children: m };
      }

      // Probability / stats
      case "Pr":
        return { k: "comp", name: "Prob", children: this.parseMaybeArg() };

      // Dots
      case "cdots":
      case "hdots":
        return { k: "comp", name: "CDots" };
      case "vdots":
        return { k: "comp", name: "VDots" };
      case "ddots":
        return { k: "comp", name: "DDots" };
      case "ldots":
      case "dots":
        return { k: "comp", name: "LDots" };

      // Spacing — just emit a thin space
      case ",":
      case ";":
      case ":":
      case "!":
      case " ":
      case "quad":
      case "qquad":
        return { k: "text", v: " " };

      // Misc
      case "prime":
        return { k: "comp", name: "Prime" };
      case "circ":
        return { k: "comp", name: "Compose" };
      case "ast":
        return { k: "comp", name: "Star" };
      case "star":
        return { k: "comp", name: "Star" };
      case "dagger":
        return { k: "comp", name: "Dagger" };
      case "ddagger":
        return { k: "comp", name: "DoubleDagger" };
      case "aleph":
        return { k: "comp", name: "Aleph" };
      case "perp":
        return { k: "comp", name: "Perpendicular" };
      case "parallel":
        return { k: "comp", name: "Parallel" };
      case "angle":
        return { k: "comp", name: "Angle" };
      case "triangle":
        return { k: "comp", name: "Triangle" };
      case "square":
        return { k: "comp", name: "Square" };
      case "diamond":
        return { k: "comp", name: "Diamond" };
      case "not": {
        // \not\in → NotIn, \not= → Neq, etc.
        const next = this.peek();
        if (next.t === "CMD") {
          this.eat();
          const notMap: Record<string, string> = {
            in: "NotIn",
            subset: "NotSubset",
            sim: "NotSim",
            cong: "NotCong",
            "=": "Neq",
            equiv: "Neq",
          };
          return { k: "comp", name: notMap[next.v] ?? "Neq" };
        }
        return { k: "comp", name: "Not" };
      }

      case "qed":
      case "blacksquare":
        return { k: "comp", name: "QED" };

      default:
        // Unknown command — emit the LaTeX as fallback text
        return { k: "text", v: `\\${cmd}` };
    }
  }

  // Parse _ immediately (without CARET) — for \lim_{...}
  parseUnder(): ASTNode[] | null {
    if (this.peek().t !== "UNDER") return null;
    this.eat();
    return this.parseGroup();
  }

  // Parse _lower ^upper (or ^upper _lower) — for \int, \sum
  parseSubSup(): { from: ASTNode[] | null; to: ASTNode[] | null } {
    let from: ASTNode[] | null = null;
    let to: ASTNode[] | null = null;
    for (let i = 0; i < 2; i++) {
      if (this.peek().t === "UNDER" && !from) {
        this.eat();
        from = this.parseGroup();
      } else if (this.peek().t === "CARET" && !to) {
        this.eat();
        to = this.parseGroup();
      } else break;
    }
    return { from, to };
  }

  // Parse content until \right
  parseUntilRight(): ASTNode[] {
    const nodes: ASTNode[] = [];
    while (true) {
      const tok = this.peek();
      if (tok.t === "EOF") break;
      if (tok.t === "CMD" && tok.v === "right") {
        this.eat(); // consume \right
        this.eat(); // consume the delimiter char/cmd
        break;
      }
      const n = this.parseAtom();
      if (n) nodes.push(n);
    }
    return nodes;
  }

  // Optionally parse a following group (for function args like \sin{x})
  parseMaybeArg(): ASTNode[] | undefined {
    if (this.peek().t === "LBRACE") return this.parseGroup();
    return undefined;
  }
}

// ─── Helpers ─────────────────────────────────────────────────────────────────

function buildBounds(
  from: ASTNode[] | null,
  to: ASTNode[] | null,
): Record<string, ASTNode[]> | undefined {
  const props: Record<string, ASTNode[]> = {};
  if (from) props["from"] = from;
  if (to) props["to"] = to;
  return Object.keys(props).length ? props : undefined;
}

function isPartial(nodes: ASTNode[]): boolean {
  return nodes.some(
    (n) =>
      (n.k === "comp" && n.name === "PartialDiff") ||
      (n.k === "text" && n.v === "∂"),
  );
}

function extractAfterPartial(nodes: ASTNode[]): ASTNode[] {
  const idx = nodes.findIndex(
    (n) =>
      (n.k === "comp" && n.name === "PartialDiff") ||
      (n.k === "text" && n.v === "∂"),
  );
  if (idx === -1) return nodes;
  return nodes.slice(idx + 1).filter((n) => !(n.k === "text" && n.v === " "));
}

// ─── Public API ───────────────────────────────────────────────────────────────

/**
 * Convert a LaTeX math string to mdx-ui primitive component JSX.
 *
 * @param latex - Raw LaTeX string (without $ delimiters)
 * @param block - If true, wraps in <Equation>; if false, emits inline
 * @returns MDX JSX string using primitive components
 *
 * @example
 * latexToPrimitives("\\frac{a}{b}")
 * // → '<Frac num="a" den="b" />'
 *
 * latexToPrimitives("\\int_{-\\infty}^{\\infty} f(x)\\,dx")
 * // → '<Integral from={<span>−<Inf /></span>} to={<Inf />}>f(x) dx</Integral>'
 */
export function latexToPrimitives(latex: string, block = false): string {
  try {
    const tokens = tokenize(latex.trim());
    const parser = new Parser(tokens);
    const nodes = parser.parseSeq(["EOF"]);
    const jsx = emitNodes(nodes).trim();
    if (block) return `<Equation>\n  ${jsx}\n</Equation>`;
    return jsx;
  } catch {
    // Graceful fallback — return the LaTeX as a code span
    return `\`${latex}\``;
  }
}

/**
 * Convert a full MDX/Markdown string — replaces all $...$ and $$...$$ with primitives.
 * Leaves all other content untouched.
 */
export function convertMarkdownMath(mdx: string): string {
  // block math $$...$$ first (must come before inline)
  let result = mdx.replace(/\$\$([^$]+)\$\$/gs, (_, latex: string) =>
    latexToPrimitives(latex.trim(), true),
  );
  // inline math $...$
  result = result.replace(
    /(?<!\$)\$(?!\$)([^$\n]+)\$(?!\$)/g,
    (_, latex: string) => latexToPrimitives(latex.trim(), false),
  );
  return result;
}

/**
 * Check if a string contains any LaTeX that should be converted.
 */
export function hasLatex(content: string): boolean {
  return (
    /\$/.test(content) ||
    /\\(?:frac|int|sum|prod|sqrt|alpha|beta|gamma|infty)\b/.test(content)
  );
}

// ─── Solution Parser ──────────────────────────────────────────────────────────
//
// Converts a plain-text step-by-step math solution into <Solution> MDX.
//
// Input format (flexible — handles all of these):
//   8x/3 - 3/x = 2
//   Solution:
//   ⇒ 8x/3 - 3/x = 2/1
//   ⇒ 8x - 3 = 2 × 3x   (Cross-multiplication)
//   ⇒ 2x = 3
//   ⇒ x = 3/2
//
// Output: <Solution><SolutionStep ...>...</SolutionStep>...</Solution>

// Convert plain-text inline math expressions to primitives
// Handles: a/b fractions, x^n powers, common symbols
function convertInlineMath(expr: string): string {
  let s = expr.trim();

  // Replace Unicode arrows/symbols with component versions
  s = s.replace(/⇒/g, "<DoubleRightArrow />");
  s = s.replace(/→/g, "<Arrow />");
  s = s.replace(/±/g, "<PlusMinus />");
  s = s.replace(/∓/g, "<MinusPlus />");
  s = s.replace(/×/g, "<Times />");
  s = s.replace(/÷/g, "<Division />");
  s = s.replace(/≤/g, "<Leq />");
  s = s.replace(/≥/g, "<Geq />");
  s = s.replace(/≠/g, "<Neq />");
  s = s.replace(/≈/g, "<Approx />");
  s = s.replace(/∞/g, "<Inf />");
  s = s.replace(/∈/g, "<In />");
  s = s.replace(/∀/g, "<ForAll />");
  s = s.replace(/∃/g, "<Exists />");
  s = s.replace(/∴/g, "<Therefore />");
  s = s.replace(/∵/g, "<Because />");
  s = s.replace(/√/g, () => "<Sqrt>");

  // Convert fractions: num/den — must be careful not to break plain "a/b" text
  // Pattern: (simple_expr)/(simple_expr) where both sides are short and well-defined
  // Strategy: find X/Y where X and Y are algebraic tokens (no spaces, or parenthesised)
  s = s.replace(
    /(\([^)]+\)|[0-9]+[a-zA-Z]*[0-9]*|[a-zA-Z][0-9a-zA-Z]*)\/(\([^)]+\)|[0-9]+[a-zA-Z]*[0-9]*|[a-zA-Z][0-9a-zA-Z]*)/g,
    (_, num, den) => `<Frac num="${num}" den="${den}" />`,
  );

  // Convert x^n powers: base^exp
  s = s.replace(
    /([a-zA-Z0-9]+)\^([0-9]+|[a-zA-Z])/g,
    (_, base, exp) => `<Pow exp="${exp}">${base}</Pow>`,
  );

  return s;
}

// Extract the reason from a step: "expr (reason)" → { expr, reason }
function extractReason(step: string): { expr: string; reason: string | null } {
  const match = step.match(/^([\s\S]*?)\s*\(([^)]+)\)\s*$/);
  if (match) return { expr: match[1].trim(), reason: match[2].trim() };
  return { expr: step.trim(), reason: null };
}

// Detect if a step looks like the final answer: x = value, value = x, etc.
function isFinalAnswer(step: string): boolean {
  // heuristic: short step with single variable assignment
  const s = step.trim();
  return (
    /^[a-zA-Z]\s*=\s*/.test(s) && s.split("=").length === 2 && s.length < 40
  );
}

export interface ParsedSolution {
  title: string;
  steps: Array<{ expr: string; reason: string | null; highlight?: boolean }>;
  answer: string;
}

/**
 * Parse a plain-text step-by-step math solution into structured data.
 *
 * Handles both ⇒-separated and line-by-line formats.
 */
export function parseSolutionText(text: string): ParsedSolution {
  const lines = text
    .split(/\n/)
    .map((l) => l.trim())
    .filter(Boolean);

  // Find the "Solution:" marker
  const solutionIdx = lines.findIndex(
    (l) => /^solution[:\s]/i.test(l) || l.toLowerCase() === "solution",
  );

  // Problem title: everything before "Solution:" or the first line
  const titleLine =
    solutionIdx > 0
      ? lines.slice(0, solutionIdx).join(" ")
      : (lines[0] ?? "Solve");

  const title = `Solve: ${titleLine.replace(/^(solve\s*[:：]?\s*)/i, "").trim()}`;

  // Collect step lines: everything after "Solution:" header
  const stepLines =
    solutionIdx >= 0 ? lines.slice(solutionIdx + 1) : lines.slice(1);

  // Split steps on ⇒ or => (may be inline or line-starting)
  const rawSteps: string[] = [];
  for (const line of stepLines) {
    if (/^[⇒=]>/.test(line) || line.startsWith("⇒") || line.startsWith("=>")) {
      rawSteps.push(line.replace(/^[⇒=>\s]+/, "").trim());
    } else if (line.includes("⇒")) {
      // inline arrows: split on them
      const parts = line.split(/\s*⇒\s*/);
      rawSteps.push(...parts.filter(Boolean).map((p) => p.trim()));
    } else if (rawSteps.length > 0) {
      // continuation of previous step
      rawSteps[rawSteps.length - 1] += " " + line;
    } else {
      rawSteps.push(line);
    }
  }

  // Filter empty and build steps
  const validSteps = rawSteps.filter((s) => s.length > 0);

  // Last step is the answer, everything else is a step
  const steps: ParsedSolution["steps"] = [];
  let answer = "";

  for (let i = 0; i < validSteps.length; i++) {
    const { expr, reason } = extractReason(validSteps[i]);
    const isLast = i === validSteps.length - 1;

    if (isLast && isFinalAnswer(expr)) {
      answer = expr;
    } else {
      // Mark steps with "key" words as highlighted
      const highlight = reason
        ? /cross.?multipl|key|main|therefore|hence|substitut/i.test(reason)
        : false;
      steps.push({ expr, reason, highlight });
    }
  }

  // If no answer detected, use last step
  if (!answer && steps.length > 0) {
    const last = steps.pop()!;
    answer = last.expr;
  }

  return { title, steps, answer };
}

/**
 * Convert a parsed solution to MDX using Solution/SolutionStep/SolutionAnswer components.
 */
export function solutionToMdx(
  parsed: ParsedSolution,
  convertMath = true,
): string {
  const cvt = convertMath ? convertInlineMath : (s: string) => s;

  const stepLines = parsed.steps.map((s) => {
    const reason = s.reason ? ` reason="${s.reason}"` : "";
    const highlight = s.highlight ? " highlight" : "";
    return `  <SolutionStep${reason}${highlight}>\n    ${cvt(s.expr)}\n  </SolutionStep>`;
  });

  const answerLine = `  <SolutionAnswer>\n    ${cvt(parsed.answer)}\n  </SolutionAnswer>`;

  return [
    `<Solution title="${parsed.title}">`,
    ...stepLines,
    answerLine,
    `</Solution>`,
  ].join("\n");
}

/**
 * One-shot: parse plain-text solution and emit MDX.
 *
 * @example
 * parseSolution(`
 *   8x/3 - 3/x = 2
 *   Solution:
 *   ⇒ 8x/3 - 3/x = 2/1
 *   ⇒ 8x - 3 = 2 × 3x  (Cross-multiplication)
 *   ⇒ 2x = 3
 *   ⇒ x = 3/2
 * `)
 */
export function parseSolution(text: string): string {
  return solutionToMdx(parseSolutionText(text));
}
