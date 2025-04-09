'use client'

import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarGroup,
    SidebarGroupLabel,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
} from "@/components/ui/sidebar"
import { useProjects } from "@/lib/contexts/ProjectContext"
import { Code, Plus } from "lucide-react"
import { NewProjectButton } from "./project/ProjectDialog"
import { useSidebar } from "./ui/sidebar"

export function AppSidebar() {
    const { open } = useSidebar()
    const { projects, selectedProject, setSelectedProject } = useProjects()

    return (
        <Sidebar collapsible="icon">
            <SidebarHeader>
                <SidebarMenu>
                    <SidebarMenuItem>
                        <SidebarMenuButton
                            size="lg"
                            className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
                            onClick={() => setSelectedProject(null)}
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
                        <NewProjectButton />
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
                                <SidebarMenuButton 
                                    className={`text-sidebar-foreground/70 cursor-pointer ${selectedProject?.id === project.id ? 'bg-sidebar-accent text-sidebar-accent-foreground font-medium' : ''}`}
                                    onClick={() => setSelectedProject(project)}
                                >
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
