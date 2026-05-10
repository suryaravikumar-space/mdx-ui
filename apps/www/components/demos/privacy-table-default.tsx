import { PrivacyTable } from "@/components/mdx/privacy-table";

export default function PrivacyTableDefault() {
  return (
    <PrivacyTable
      caption="Data collected in accordance with privacy policy"
      rows={[
        {
          dataType: "Email Address",
          purpose: "Account authentication and notifications",
          legalBasis: "Consent",
          retention: "Until account deletion",
          shared: false,
        },
        {
          dataType: "Usage Analytics",
          purpose: "Product improvement and performance monitoring",
          legalBasis: "Legitimate Interest",
          retention: "90 days",
          shared: true,
        },
        {
          dataType: "Device ID",
          purpose: "Session tracking and security",
          legalBasis: "Contract",
          retention: "1 year",
          shared: false,
        },
      ]}
    />
  );
}
