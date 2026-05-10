import { Steps, Step } from "@/components/mdx/steps";

export default function StepsDefault() {
  return (
    <Steps>
      <Step>Create a new Next.js project</Step>
      <Step>Install the required dependencies</Step>
      <Step>Configure your tailwind.config.ts</Step>
      <Step>Start building!</Step>
    </Steps>
  );
}
