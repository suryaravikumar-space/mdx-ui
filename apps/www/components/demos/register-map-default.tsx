import { RegisterMap } from "@/components/mdx/register-map";

export default function RegisterMapDefault() {
  return (
    <RegisterMap
      title="Security Control Registers"
      rows={[
        {
          address: "0x00780000",
          name: "QFPROM_CORR_RD_WR_PERM_LSB",
          bits: "31:0",
          access: "OTP",
          reset: "0x00000000",
          description: "Read/write permissions for fuse rows.",
        },
        {
          address: "0x00780008",
          name: "QFPROM_CORR_JTAG_ID",
          bits: "31:0",
          access: "RO",
          reset: "0x009600E1",
          description: "JTAG identification register.",
        },
        {
          address: "0x00780018",
          name: "USB_PHY_CFG0",
          bits: "7:0",
          access: "RW",
          reset: "0x80",
          description: "PHY configuration register 0.",
        },
      ]}
    />
  );
}
