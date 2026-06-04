# Telemetry Reference

Anonymous usage tracking via PostHog. Fires on `init` and `add` commands.

## Checking metrics

1. Go to [app.posthog.com](https://app.posthog.com)
2. Select your **DocsUI** project

### Events to look for

| Event  | When fired              | Key properties                       |
| ------ | ----------------------- | ------------------------------------ |
| `init` | User runs `docsui init` | `framework` (react / nextjs / astro) |
| `add`  | User runs `docsui add`  | `components` (array of names added)  |

### Useful views

- **Events** tab → live stream of all pings
- **Trends** → chart `init` + `add` over time → shows growth
- **Breakdown by `framework`** → React vs Next.js vs Astro split
- **Breakdown by `components`** → which components are most added
- **Persons** → unique machines (identified by anonymous `distinct_id`)

## Opt-out (users)

Users can disable telemetry by setting an env var:

```bash
export MDX_UI_NO_TELEMETRY=1
# or
export DO_NOT_TRACK=1
```

## Excluded automatically

Your own machine is always excluded — the CLI checks if the current project's
git remote contains `suryaravikumar-space/docsui` and skips the ping silently.

## Implementation

- File: `packages/cli/src/utils/telemetry.ts`
- Called in: `packages/cli/src/commands/init.ts`, `packages/cli/src/commands/add.ts`
- PostHog project API key: stored in `telemetry.ts` (write-only key, safe to commit)
- `distinct_id`: SHA-256 hash of `hostname:username`, first 16 chars — anonymous, not reversible
