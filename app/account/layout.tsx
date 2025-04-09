"use client"

import { AppSidebar } from "@/components/app-sidebar";
import { ModeToggle } from "@/components/theme-toggle";
import { Input } from "@/components/ui/input";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { ProjectProvider, useProjects } from "@/lib/contexts/ProjectContext";
import { Project } from "@/lib/types";
import { SearchIcon } from "lucide-react";

const databaseFake: Project[] = [
    {
        id: "21a4fa7a-3bfa-4a99-97d8-11cab956e634",
        name: "Investment App",
        description: "A simple investment app to help you manage your investments",
        stack: ["React", "Next.js", "Tailwind CSS"],
        status: "in development",
        startDate: "2024-02-15T03:00:00.000Z",
        endDate: null,
        repository: "https://github.com/code-dev-br/investment-app",
        tags: ["React", "Next.js", "Tailwind CSS"],
        priority: "high",
        logs: [
            {
                date: "2024-02-15T03:00:00.000Z",
                message: "Projeto iniciado"
            },
            {
                date: "2024-02-20T03:00:00.000Z",
                message: "Componentes básicos implementados"
            },
            {
                date: "2024-03-05T03:00:00.000Z",
                message: "API de investimentos integrada"
            }
        ],
        todo: [
            {
                description: "Implementar autenticação",
                status: false,
                createdAt: "2024-02-16T03:00:00.000Z",
                updatedAt: "2024-02-16T03:00:00.000Z"
            },
            {
                description: "Criar dashboard",
                status: true,
                createdAt: "2024-02-18T03:00:00.000Z",
                updatedAt: "2024-03-01T03:00:00.000Z"
            }
        ],
        ideas: [
            {
                description: "Adicionar gráficos de desempenho",
                status: "approved",
                createdAt: "2024-02-16T03:00:00.000Z",
                updatedAt: "2024-02-17T03:00:00.000Z"
            },
            {
                description: "Implementar modo dark/light",
                status: "pending",
                createdAt: "2024-03-01T03:00:00.000Z",
                updatedAt: "2024-03-01T03:00:00.000Z"
            }
        ]
    },
    {
        id: "31b5fb8b-4cfa-5b99-98d8-22dbc957f745",
        name: "EmitGo",
        description: "Sistema de emissão de notas fiscais eletrônicas com interface moderna e intuitiva",
        stack: ["React", "Node.js", "PostgreSQL"],
        status: "in planning",
        startDate: "2024-03-01T03:00:00.000Z",
        endDate: null,
        repository: "https://github.com/code-dev-br/emitgo",
        tags: ["Notas Fiscais", "Finanças", "B2B"],
        priority: "high",
        logs: []
    },
    {
        id: "41c6gc9c-5dfb-6c99-99e9-33ecd958g856",
        name: "Shadule Pro",
        description: "Plataforma de agendamento profissional com recursos avançados de gestão",
        stack: ["Vue.js", "Laravel", "MySQL"],
        status: "in development",
        startDate: "2024-01-10T03:00:00.000Z",
        endDate: null,
        repository: "https://github.com/code-dev-br/shadule-pro",
        tags: ["Agendamento", "Gestão", "B2B"],
        priority: "medium",
        logs: []
    },
    {
        id: "51d7hd0d-6egc-7d99-00f0-44fde059h967",
        name: "Code Trackr",
        description: "Sistema de rastreamento e análise de código para equipes de desenvolvimento",
        stack: ["Angular", "Python", "MongoDB"],
        status: "completed",
        startDate: "2023-11-15T03:00:00.000Z",
        endDate: "2024-02-28T03:00:00.000Z",
        repository: "https://github.com/code-dev-br/code-trackr",
        tags: ["Desenvolvimento", "Analytics", "DevTools"],
        priority: "medium",
        logs: []
    },
    {
        id: "61e8ie1e-7fhd-8e99-11g1-55gef150i078",
        name: "CGM Dashboard",
        description: "Dashboard administrativo para Controladoria Geral do Município",
        stack: ["React", "Express", "Oracle"],
        status: "in planning",
        startDate: "2024-04-01T03:00:00.000Z",
        endDate: null,
        repository: "https://github.com/code-dev-br/cgm-dashboard",
        tags: ["Governo", "Dashboard", "Administração"],
        priority: "high",
        logs: []
    }
]

function SearchInput() {
    const { searchTerm, setSearchTerm } = useProjects();

    return (
        <div className="relative">
            <Input
                type="text"
                placeholder="Search projects..."
                className="pl-8"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
            />
            <SearchIcon className="absolute left-2 top-1/2 -translate-y-1/2 text-muted-foreground size-4" />
        </div>
    );
}

export default function AccountLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <ProjectProvider initialProjects={databaseFake}>
            <SidebarProvider>
                <AppSidebar />
                <main className="flex flex-col w-full h-screen">
                    <div className="flex items-center justify-between w-full border-b p-2">
                        <div className="flex items-center gap-2">
                            <SidebarTrigger />
                            <SearchInput />
                        </div>
                        <ModeToggle />
                    </div>
                    <div className="flex-1 p-2 w-full h-full overflow-y-auto">
                        {children}
                    </div>
                </main>
            </SidebarProvider>
        </ProjectProvider>
    );
}
