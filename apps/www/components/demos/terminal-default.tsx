import { Terminal, TerminalLine } from "@/components/mdx/terminal";

export default function TerminalDefault() {
  return (
    <Terminal title="Installing mdx-ui">
      <TerminalLine cmd>npx @ravikumarsurya/mdx-ui init</TerminalLine>
      <TerminalLine>✔ Created mdx-ui.json</TerminalLine>
      <TerminalLine cmd>
        npx @ravikumarsurya/mdx-ui add accordion badge callout
      </TerminalLine>
      <TerminalLine>✔ accordion</TerminalLine>
      <TerminalLine>✔ badge</TerminalLine>
      <TerminalLine>✔ callout</TerminalLine>
      <TerminalLine>Done! 🎉</TerminalLine>
    </Terminal>
  );
}
