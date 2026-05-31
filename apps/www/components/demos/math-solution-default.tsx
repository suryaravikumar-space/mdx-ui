import {
  Solution,
  SolutionAnswer,
  SolutionNote,
  SolutionStep,
} from "@/components/mdx/math-solution";
import { Frac } from "@/components/mdx/math-primitives";

export default function MathSolutionDefault() {
  return (
    <Solution title="Find: ∫(sin x + cos x) dx">
      <SolutionNote>
        Use the standard formulas: ∫sin x dx = −cos x + C and ∫cos x dx = sin x
        + C
      </SolutionNote>
      <SolutionStep reason="Split the integral">
        ∫sin x dx + ∫cos x dx
      </SolutionStep>
      <SolutionStep reason="Apply standard formulas" highlight>
        −cos x + sin x
      </SolutionStep>
      <SolutionStep reason="Add constant of integration">
        −cos x + sin x + C
      </SolutionStep>
      <SolutionAnswer>−cos x + sin x + C</SolutionAnswer>
    </Solution>
  );
}
