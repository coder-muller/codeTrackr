"use client"

import { AppSidebar } from "@/components/app-sidebar";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { ModeToggle } from "@/components/theme-toggle";
import { Input } from "@/components/ui/input";
import { SearchIcon } from "lucide-react";
export default function AccountLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <SidebarProvider>
            <AppSidebar />
            <main className="flex flex-col w-full h-screen">
                <div className="flex items-center justify-between w-full border-b p-2">
                    <div className="flex items-center gap-2">
                        <SidebarTrigger />
                        <div className="relative">
                            <Input type="text" placeholder="Search" className="pl-8" />
                            <SearchIcon className="absolute left-2 top-1/2 -translate-y-1/2 text-muted-foreground size-4" />
                        </div>
                    </div>
                    <ModeToggle />
                </div>
                <div className="flex-1 p-2 w-full h-full">
                    {children}
                </div>
            </main>
        </SidebarProvider>
    );
}
