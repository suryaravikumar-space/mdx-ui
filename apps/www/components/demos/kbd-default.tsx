import { Kbd } from "@/components/mdx/kbd";

export default function KbdDefault() {
  return (
    <div className="space-y-3 text-sm">
      <p>
        Save file: <Kbd>Ctrl</Kbd> + <Kbd>S</Kbd>
      </p>
      <p>
        Copy: <Kbd>⌘</Kbd> + <Kbd>C</Kbd> &nbsp; Paste: <Kbd>⌘</Kbd> +{" "}
        <Kbd>V</Kbd>
      </p>
      <p>
        Open command palette: <Kbd>⌘</Kbd> + <Kbd>Shift</Kbd> + <Kbd>P</Kbd>
      </p>
    </div>
  );
}
