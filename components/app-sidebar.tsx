'use client'

import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarGroup,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuItem,
    SidebarMenuButton,
    SidebarGroupLabel,
} from "@/components/ui/sidebar"
import { Code, Plus } from "lucide-react"
import { Button } from "./ui/button"
import { useSidebar } from "./ui/sidebar"

const projects = [
    {
        name: "CGM Dashboard",
        id: "cgm-dashboard",
    },
    {
        name: "EmitGo",
        id: "emitgo",
    },
    {
        name: "Schadule Pro",
        id: "schadule-pro",
    },
    {
        name: "Code Trackr",
        id: "code-trackr",
    },
]


export function AppSidebar() {

    const { open } = useSidebar()

    return (
        <Sidebar collapsible="icon">
            <SidebarHeader>
                <SidebarMenu>
                    <SidebarMenuItem>
                        <SidebarMenuButton
                            size="lg"
                            className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
                        >
                            <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-secondary text-secondary-foreground">
                                <Code className="size-5" />
                            </div>
                            <div className="grid flex-1 text-left text-sm leading-tight">
                                <span className="truncate font-semibold text-md">
                                    Code Trackr
                                </span>
                                <span className="truncate text-xs text-muted-foreground">beta</span>
                            </div>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarHeader>
            <SidebarContent>
                <SidebarGroup>
                    {open ? (
                        <Button variant="default" size="lg">
                            <Plus className="size-5" />
                            <span>New Project</span>
                        </Button>
                    ) : (
                        <SidebarMenu>
                            <SidebarMenuItem>
                                <SidebarMenuButton
                                    size="lg"
                                    className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
                                >
                                    <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-primary text-primary-foreground cursor-pointer">
                                        <Plus className="size-5" />
                                    </div>
                                </SidebarMenuButton>
                            </SidebarMenuItem>
                        </SidebarMenu>
                    )}
                </SidebarGroup>
                <SidebarGroup>
                    <SidebarGroupLabel>Projects</SidebarGroupLabel>
                    <SidebarMenu>
                        {projects.map((project) => (
                            <SidebarMenuItem key={project.id}>
                                <SidebarMenuButton className="text-sidebar-foreground/70 cursor-pointer">
                                    <span>{project.name}</span>
                                </SidebarMenuButton>
                            </SidebarMenuItem>
                        ))}
                    </SidebarMenu>
                </SidebarGroup>
            </SidebarContent>
            <SidebarFooter />
        </Sidebar>
    )
}
