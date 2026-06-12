import { Github } from "lucide-react";

function DiscordIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden="true"
    >
      <path d="M20.317 4.3698a19.7913 19.7913 0 00-4.8851-1.5152.0741.0741 0 00-.0785.0371c-.211.3753-.4447.8648-.6083 1.2495-1.8447-.2762-3.68-.2762-5.4868 0-.1636-.3933-.4058-.8742-.6177-1.2495a.077.077 0 00-.0785-.037 19.7363 19.7363 0 00-4.8852 1.515.0699.0699 0 00-.0321.0277C.5334 9.0458-.319 13.5799.0992 18.0578a.0824.0824 0 00.0312.0561c1.7223 1.2752 3.3877 2.0594 5.0316 2.5905a.0775.0775 0 00.0839-.0276c.388-.5279.7387-1.0857 1.0287-1.6622a.076.076 0 00-.0416-.1057c-.5429-.2066-1.0604-.4571-1.5604-.7423a.077.077 0 01-.0076-.1277c.1052-.0788.2103-.1605.3104-.2429a.0742.0742 0 01.0776-.0105c3.2748 1.4969 6.8205 1.4969 10.0993 0a.0739.0739 0 01.0785.0095c.1001.0824.2052.1645.3105.2439a.077.077 0 01-.0065.1276 12.2986 12.2986 0 01-1.5605.7424.0766.0766 0 00-.0407.1067c.2999.5759.6505 1.1335 1.0288 1.6614a.0772.0772 0 00.0839.0286c1.6553-.5311 3.3206-1.3153 5.0429-2.5905a.0785.0785 0 00.0312-.0552c.5004-5.177-.8382-9.6739-3.5485-13.6604a.0612.0612 0 00-.0312-.0286zM8.02 15.3312c-.9886 0-1.8023-.9078-1.8023-2.0233 0-1.1155.7965-2.0234 1.8023-2.0234 1.0148 0 1.8221.9233 1.8023 2.0234 0 1.1155-.7965 2.0233-1.8023 2.0233zm7.9747 0c-.9886 0-1.8023-.9078-1.8023-2.0233 0-1.1155.7965-2.0234 1.8023-2.0234 1.0148 0 1.8221.9233 1.8023 2.0234 0 1.1155-.7965 2.0233-1.8023 2.0233z" />
    </svg>
  );
}

export default function CommunityPage() {
  return (
    <main className="relative py-6 lg:gap-10 lg:py-8 xl:grid xl:grid-cols-[1fr_300px]">
      <div className="mx-auto w-full min-w-0">
        <div className="space-y-2">
          <h1 className="scroll-m-20 text-4xl font-bold tracking-tight">
            Community
          </h1>
          <p className="text-lg text-muted-foreground">
            Join our growing community of developers building with DocsUI.
          </p>
        </div>

        <div className="mt-8 space-y-6">
          <section>
            <h2 className="mb-4 scroll-m-20 border-b pb-2 text-2xl font-semibold tracking-tight">
              Get Involved
            </h2>
            <p className="leading-7">
              DocsUI is an open source project that welcomes contributions from
              everyone. Whether you want to fix a bug, add a feature, or improve
              documentation, we&rsquo;d love your help.
            </p>
          </section>

          <section>
            <h2 className="mb-4 scroll-m-20 border-b pb-2 text-2xl font-semibold tracking-tight">
              Ways to Contribute
            </h2>
            <ul className="ml-6 list-disc space-y-2">
              <li>Report bugs and request features on GitHub</li>
              <li>Contribute code through pull requests</li>
              <li>Improve documentation and examples</li>
              <li>Help others in GitHub Discussions</li>
              <li>Share your projects built with DocsUI</li>
            </ul>
          </section>

          <section>
            <h2 className="mb-4 scroll-m-20 border-b pb-2 text-2xl font-semibold tracking-tight">
              Community Resources
            </h2>
            <div className="grid gap-4 sm:grid-cols-2">
              <a
                href="https://github.com/suryaravikumar-space/docsui/discussions"
                target="_blank"
                rel="noreferrer noopener"
                className="group flex flex-col gap-3 rounded-lg border p-4 transition-colors hover:bg-accent"
              >
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-foreground/5 text-foreground transition-colors group-hover:bg-foreground/10">
                  <Github className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="mb-1 font-semibold">GitHub Discussions</h3>
                  <p className="text-sm text-muted-foreground">
                    Ask questions and share ideas with the community.
                  </p>
                </div>
              </a>
              <a
                href="https://discord.gg"
                target="_blank"
                rel="noreferrer noopener"
                className="group flex flex-col gap-3 rounded-lg border p-4 transition-colors hover:bg-accent"
              >
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-[#5865F2]/10 text-[#5865F2] transition-colors group-hover:bg-[#5865F2]/15">
                  <DiscordIcon className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="mb-1 font-semibold">Discord Server</h3>
                  <p className="text-sm text-muted-foreground">
                    Chat with other developers in real-time.
                  </p>
                </div>
              </a>
            </div>
          </section>
        </div>
      </div>
    </main>
  );
}
