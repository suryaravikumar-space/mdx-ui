import {
  Frac,
  Integral,
  Pow,
  Sqrt,
  Sum,
  Matrix,
  Cases,
  Case,
  Sin,
  Theta,
  Cos,
} from "@/components/mdx/math-primitives";

export default function MathPrimitivesDefault() {
  return (
    <div className="flex flex-wrap items-center gap-x-8 gap-y-4 px-2 py-4 font-serif text-base">
      <Frac num="a + b" den="2c" />

      <Sqrt>
        <Pow exp="2">a</Pow> + <Pow exp="2">b</Pow>
      </Sqrt>

      <Integral from="0" to="∞">
        <Pow exp="−x">e</Pow> dx
      </Integral>

      <Sum from="k=1" to="n">
        <Frac num={<Pow exp="2">k</Pow>} den="2" />
      </Sum>

      <Matrix
        rows={[
          ["a", "b"],
          ["c", "d"],
        ]}
      />

      <Cases>
        <Case
          expr={
            <>
              <Sin>
                <Theta />
              </Sin>
            </>
          }
          when="x ≥ 0"
        />
        <Case
          expr={
            <>
              <Cos>
                <Theta />
              </Cos>
            </>
          }
          when="x < 0"
        />
      </Cases>
    </div>
  );
}
