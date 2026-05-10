import { HardwareSpec } from "@/components/mdx/hardware-spec";

export default function HardwareSpecDefault() {
  return (
    <HardwareSpec
      name="USB 3.1 Gen 2"
      type="Universal Serial Bus"
      version="3.1 Gen 2"
      speed="10 Gbps"
      voltage="3.3V / 1.8V"
      pins={24}
      description="High-speed USB interface for peripheral connectivity and power delivery."
    />
  );
}
