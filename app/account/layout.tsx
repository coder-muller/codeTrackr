"use client"

import { AppSidebar } from "@/components/app-sidebar";
import { ModeToggle } from "@/components/theme-toggle";
import { Input } from "@/components/ui/input";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { ProjectProvider, useProjects } from "@/lib/contexts/ProjectContext";
import { Project } from "@/lib/types";
import { ChevronLeft, SearchIcon } from "lucide-react";

const databaseFake: Project[] = [
    {
        id: "21a4fa7a-3bfa-4a99-97d8-11cab956e634",
        name: "Investment App",
        description: "Aplicativo completo para gestão de investimentos pessoais com análise de rentabilidade, projeções financeiras e integração com as principais corretoras do mercado. Inclui dashboard personalizado e notificações de oportunidades de investimento.",
        stack: ["React", "Next.js", "Tailwind CSS", "TypeScript", "Node.js", "MongoDB"],
        status: "in development",
        startDate: "2024-02-15T03:00:00.000Z",
        endDate: null,
        repository: "https://github.com/code-dev-br/investment-app",
        tags: ["Finanças", "Investimentos", "Dashboard", "B2C"],
        priority: "high",
        logs: [
            {
                date: "2024-02-15T03:00:00.000Z",
                message: "Projeto iniciado com configuração inicial do Next.js e estrutura de pastas"
            },
            {
                date: "2024-02-20T03:00:00.000Z",
                message: "Componentes básicos implementados e tema configurado com Tailwind"
            },
            {
                date: "2024-03-05T03:00:00.000Z",
                message: "API de investimentos integrada com endpoints principais funcionando"
            },
            {
                date: "2024-03-18T03:00:00.000Z",
                message: "Implementação do sistema de autenticação com NextAuth concluída"
            },
            {
                date: "2024-04-02T03:00:00.000Z",
                message: "Testes de integração adicionados para os principais fluxos do usuário"
            }
        ],
        todo: [
            {
                description: "Implementar autenticação com Google e Apple",
                status: false,
                createdAt: "2024-02-16T03:00:00.000Z",
                updatedAt: "2024-02-16T03:00:00.000Z"
            },
            {
                description: "Criar dashboard principal com widgets personalizáveis",
                status: true,
                createdAt: "2024-02-18T03:00:00.000Z",
                updatedAt: "2024-03-01T03:00:00.000Z"
            },
            {
                description: "Integrar API da B3 para cotações em tempo real",
                status: false,
                createdAt: "2024-03-10T03:00:00.000Z",
                updatedAt: "2024-03-10T03:00:00.000Z"
            },
            {
                description: "Implementar sistema de notificações push",
                status: false,
                createdAt: "2024-03-25T03:00:00.000Z",
                updatedAt: "2024-03-25T03:00:00.000Z"
            }
        ],
        ideas: [
            {
                description: "Adicionar gráficos interativos de desempenho com filtros avançados",
                status: "approved",
                createdAt: "2024-02-16T03:00:00.000Z",
                updatedAt: "2024-02-17T03:00:00.000Z"
            },
            {
                description: "Implementar modo dark/light com detecção automática de preferência do sistema",
                status: "pending",
                createdAt: "2024-03-01T03:00:00.000Z",
                updatedAt: "2024-03-01T03:00:00.000Z"
            },
            {
                description: "Criar sistema de recomendações baseado em IA",
                status: "rejected",
                createdAt: "2024-03-15T03:00:00.000Z",
                updatedAt: "2024-03-20T03:00:00.000Z"
            }
        ]
    },
    {
        id: "31b5fb8b-4cfa-5b99-98d8-22dbc957f745",
        name: "EmitGo",
        description: "Sistema completo de emissão de notas fiscais eletrônicas com interface moderna e intuitiva. Integração com SEFAZ de todos os estados, geração automática de relatórios fiscais e controle de estoque integrado.",
        stack: ["React", "Node.js", "PostgreSQL", "Redis", "Docker"],
        status: "in planning",
        startDate: "2024-03-01T03:00:00.000Z",
        endDate: null,
        repository: "https://github.com/code-dev-br/emitgo",
        tags: ["Notas Fiscais", "Finanças", "B2B", "Contabilidade"],
        priority: "high",
        logs: [
            {
                date: "2024-03-01T03:00:00.000Z",
                message: "Reunião inicial com stakeholders para definição de requisitos"
            },
            {
                date: "2024-03-10T03:00:00.000Z",
                message: "Finalização do documento de especificação técnica"
            }
        ],
        todo: [
            {
                description: "Criar estrutura inicial do projeto",
                status: false,
                createdAt: "2024-03-12T03:00:00.000Z",
                updatedAt: "2024-03-12T03:00:00.000Z"
            }
        ],
        ideas: []
    },
    {
        id: "41c6gc9c-5dfb-6c99-99e9-33ecd958g856",
        name: "Shadule Pro",
        description: "Plataforma de agendamento profissional com recursos avançados de gestão para clínicas, salões e profissionais autônomos. Inclui sistema de lembretes por SMS/WhatsApp e pagamentos integrados.",
        stack: ["Vue.js", "Laravel", "MySQL", "Redis"],
        status: "in development",
        startDate: "2024-01-10T03:00:00.000Z",
        endDate: null,
        repository: "https://github.com/code-dev-br/shadule-pro",
        tags: ["Agendamento", "Gestão", "B2B", "SaaS"],
        priority: "medium"
    },
    {
        id: "51d7hd0d-6egc-7d99-00f0-44fde059h967",
        name: "Code Trackr",
        description: "Sistema de rastreamento e análise de código para equipes de desenvolvimento. Métricas de qualidade, integração com GitHub/GitLab e relatórios personalizados de produtividade.",
        stack: ["Angular", "Python", "MongoDB", "Docker", "Kubernetes"],
        status: "completed",
        startDate: "2023-11-15T03:00:00.000Z",
        endDate: "2024-02-28T03:00:00.000Z",
        repository: "https://github.com/code-dev-br/code-trackr",
        tags: ["Desenvolvimento", "Analytics", "DevTools", "Produtividade"],
        priority: "medium",
        logs: [
            {
                date: "2023-11-15T03:00:00.000Z",
                message: "Início do desenvolvimento com configuração do ambiente"
            },
            {
                date: "2023-12-10T03:00:00.000Z",
                message: "Primeira versão do backend concluída"
            },
            {
                date: "2024-01-20T03:00:00.000Z",
                message: "Interface do usuário finalizada com todos os componentes"
            },
            {
                date: "2024-02-15T03:00:00.000Z",
                message: "Testes de integração e performance concluídos"
            },
            {
                date: "2024-02-28T03:00:00.000Z",
                message: "Projeto finalizado e entregue ao cliente"
            }
        ]
    },
    {
        id: "61e8ie1e-7fhd-8e99-11g1-55gef150i078",
        name: "CGM Dashboard",
        description: "Dashboard administrativo para Controladoria Geral do Município com módulos de auditoria, ouvidoria, transparência e controle interno. Sistema completo para gestão de processos internos da administração pública.",
        stack: ["React", "Express", "Oracle", "Redux", "Material UI"],
        status: "in planning",
        startDate: "2024-04-01T03:00:00.000Z",
        endDate: null,
        repository: "https://github.com/code-dev-br/cgm-dashboard",
        tags: ["Governo", "Dashboard", "Administração", "Auditoria"],
        priority: "high"
    },
    {
        id: "71f9jf2f-8gie-9f99-22h2-66hfg261j189",
        repository: "https://github.com/code-dev-br/health-track",
        tags: ["Saúde", "Wearables", "B2C"],
        name: "HealthTrack",
        description: "Aplicativo de monitoramento de saúde e bem-estar com integração a dispositivos wearables",
        stack: ["React Native", "Firebase", "Node.js"],
        status: "in development",
        startDate: "2023-12-05T03:00:00.000Z",
        endDate: null,
        priority: "low",
        logs: [
            {
                date: "2023-12-05T03:00:00.000Z",
                message: "Projeto iniciado"
            },
            {
                date: "2024-01-15T03:00:00.000Z",
                message: "Primeiras telas desenvolvidas"
            }
        ]
    },
    {
        id: "81g0kg3g-9hjf-0g99-33i3-77igh372k290",
        name: "EduLearn",
        description: "Plataforma de ensino online com recursos de gamificação e aprendizado adaptativo baseado em IA",
        stack: ["Next.js", "Django", "PostgreSQL", "TensorFlow"],
        status: "completed",
        startDate: "2023-08-10T03:00:00.000Z",
        endDate: "2024-01-20T03:00:00.000Z",
        repository: "https://github.com/code-dev-br/edulearn",
        tags: ["Educação", "IA", "E-learning"],
        priority: "high",
        todo: [
            {
                description: "Implementar módulo de certificados",
                status: true,
                createdAt: "2023-09-15T03:00:00.000Z",
                updatedAt: "2023-10-20T03:00:00.000Z"
            },
            {
                description: "Criar sistema de recomendação de cursos",
                status: true,
                createdAt: "2023-10-05T03:00:00.000Z",
                updatedAt: "2023-12-10T03:00:00.000Z"
            }
        ]
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

function RetornarParaHome() {
    const { setSelectedProject } = useProjects();
    
    return (
        <button 
            onClick={() => setSelectedProject(null)} 
            className="flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground"
        >
            <ChevronLeft className="size-4" />
            All Projects
        </button>
    );
}

export default function AccountLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <ProjectProvider initialProjects={databaseFake}>
            <AccountContent>{children}</AccountContent>
        </ProjectProvider>
    );
}

function AccountContent({ children }: { children: React.ReactNode }) {
    const { selectedProject } = useProjects();
    
    return (
        <SidebarProvider>
            <AppSidebar />
            <main className="flex flex-col w-full h-screen">
                <div className="flex items-center justify-between w-full border-b p-2">
                    <div className="flex items-center gap-2">
                        <SidebarTrigger />
                        {selectedProject ? (
                            <RetornarParaHome />
                        ) : (
                            <SearchInput />
                        )}
                    </div>
                    <ModeToggle />
                </div>
                <div className="flex-1 p-2 w-full h-full overflow-y-auto">
                    {children}
                </div>
            </main>
        </SidebarProvider>
    );
}
