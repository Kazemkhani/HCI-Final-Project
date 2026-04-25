import type { ReactNode } from "react";
import { Sidebar } from "@/components/shell/sidebar";
import { TopNav } from "@/components/shell/top-nav";

export default function SignalLayout({ children }: { children: ReactNode }) {
  return (
    <div className="flex min-h-screen w-full">
      <Sidebar />
      <div className="flex-1 flex flex-col min-w-0">
        <TopNav />
        <main
          id="main"
          className="flex-1 px-6 lg:px-8 py-8 mx-auto w-full max-w-[1200px] xl:[@media(min-width:1600px)]:max-w-[1200px]"
        >
          {children}
        </main>
      </div>
    </div>
  );
}
