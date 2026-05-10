import { Spoiler } from "@/components/mdx/spoiler";

export default function SpoilerDefault() {
  return (
    <div className="w-full space-y-2">
      <Spoiler summary="Show answer">The answer is 42.</Spoiler>
      <Spoiler summary="Implementation details" open>
        This section is expanded on load.
      </Spoiler>
    </div>
  );
}
