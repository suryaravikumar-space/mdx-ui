import { execSync } from "child_process";
import { createHash } from "crypto";
import os from "os";
import axios from "axios";

const POSTHOG_API_KEY = "phc_zNLMNdcFKJwLJqD6NK8uQwqSwXYYQfm6oAnga7sLQt6b";
const POSTHOG_ENDPOINT = "https://app.posthog.com/capture/";
const OWN_REPO = "suryaravikumar-space/mdx-ui";

function getDistinctId(): string {
  const raw = `${os.hostname()}:${os.userInfo().username}`;
  return createHash("sha256").update(raw).digest("hex").slice(0, 16);
}

function isOptedOut(): boolean {
  return (
    process.env.MDX_UI_NO_TELEMETRY === "1" || process.env.DO_NOT_TRACK === "1"
  );
}

function isOwnMachine(): boolean {
  try {
    const remote = execSync("git remote get-url origin 2>/dev/null", {
      timeout: 1500,
      stdio: ["pipe", "pipe", "pipe"],
    })
      .toString()
      .trim();
    return remote.includes(OWN_REPO);
  } catch {
    return false;
  }
}

export function ping(event: string, data?: Record<string, unknown>): void {
  if (isOptedOut() || isOwnMachine()) return;

  axios
    .post(
      POSTHOG_ENDPOINT,
      {
        api_key: POSTHOG_API_KEY,
        event,
        distinct_id: getDistinctId(),
        properties: { ...data, $lib: "mdx-ui-cli" },
      },
      { timeout: 3000 },
    )
    .catch(() => {
      // fire-and-forget — never surface errors to the user
    });
}
