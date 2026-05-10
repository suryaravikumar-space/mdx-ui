import { SecurityNote } from "@/components/mdx/security-note";

export default function SecurityNoteDefault() {
  return (
    <div className="w-full space-y-0">
      <SecurityNote severity="info">
        API keys are scoped to your workspace. Rotate them every 90 days.
      </SecurityNote>
      <SecurityNote severity="warning" title="Token Storage">
        Never store access tokens in localStorage. Use httpOnly cookies or a
        secure server-side session.
      </SecurityNote>
      <SecurityNote severity="critical" title="Private Key Handling">
        Never commit private keys to version control. Revoke and rotate
        immediately if exposed.
      </SecurityNote>
    </div>
  );
}
