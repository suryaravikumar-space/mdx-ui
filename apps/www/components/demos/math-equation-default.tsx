import { Equation, EqSystem } from "@/components/mdx/math-equation";
import { Frac, Pow, Sqrt } from "@/components/mdx/math-primitives";

export default function MathEquationDefault() {
  return (
    <div className="space-y-2">
      <Equation label="1">
        E = m<Pow exp="2">c</Pow>
      </Equation>

      <Equation label="2">
        x ={" "}
        <Frac
          num={
            <>
              −b ± <Sqrt>b² − 4ac</Sqrt>
            </>
          }
          den="2a"
        />
      </Equation>

      <EqSystem>
        <div>2x + 3y = 7</div>
        <div>x − y = 1</div>
      </EqSystem>
    </div>
  );
}
