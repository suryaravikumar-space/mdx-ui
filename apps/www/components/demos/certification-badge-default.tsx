import { CertificationBadge } from "@/components/mdx/certification-badge"

export default function CertificationBadgeDefault() {
  return (
    <CertificationBadge
      certs={[
        { name: "ISO 27001:2022", scope: "Information Security Management", year: 2023, status: "active" },
        { name: "SOC 2 Type II", scope: "Trust Services Criteria", status: "pending" },
        { name: "GDPR", scope: "Data Protection Compliance", year: 2021, status: "expired" },
      ]}
    />
  )
}
