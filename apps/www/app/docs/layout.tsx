import { DynamicSidebar } from "@/components/dynamic-sidebar";

interface DocsLayoutProps {
  children: React.ReactNode;
}

export default function DocsLayout({ children }: DocsLayoutProps) {
  return (
    <div className="container flex-1 items-start md:grid md:grid-cols-[230px_minmax(0,1fr)] md:gap-8 lg:grid-cols-[260px_minmax(0,1fr)] lg:gap-16">
      <aside className="fixed top-14 z-30 hidden h-[calc(100vh-3.5rem)] w-full shrink-0 overflow-y-auto border-r border-border/40 md:sticky md:block">
        <div className="h-full py-8 pr-4 lg:py-10">
          <DynamicSidebar />
        </div>
      </aside>
      {children}
    </div>
  );
}
