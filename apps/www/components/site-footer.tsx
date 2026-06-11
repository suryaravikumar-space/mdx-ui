export function SiteFooter() {
  return (
    <footer className="border-t py-6 md:py-0">
      <div className="container flex flex-col items-center justify-between gap-4 md:h-24 md:flex-row">
        <p className="text-center text-sm leading-loose text-muted-foreground md:text-left">
          Built with ❤️ using Next.js and Tailwind CSS
        </p>
        <a
          href="mailto:suryaravikumar@docsui.io"
          className="text-sm text-muted-foreground underline-offset-4 hover:text-foreground hover:underline"
        >
          suryaravikumar@docsui.io
        </a>
      </div>
    </footer>
  );
}
