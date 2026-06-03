import { Terminal, TerminalLine } from "@/components/mdx/terminal";

export default function TerminalDefault() {
  return (
    <Terminal title="Installing DocsUI">
      <TerminalLine cmd>npx docsui-cli@latest init</TerminalLine>
      <TerminalLine>✔ Created docsui.json</TerminalLine>
      <TerminalLine cmd>
        npx docsui-cli@latest add accordion badge callout
      </TerminalLine>
      <TerminalLine>✔ accordion</TerminalLine>
      <TerminalLine>✔ badge</TerminalLine>
      <TerminalLine>✔ callout</TerminalLine>
      <TerminalLine>Done! 🎉</TerminalLine>
    </Terminal>
  );
}
