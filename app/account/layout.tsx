"use client"

import { AppSidebar } from "@/components/app-sidebar";
import { ModeToggle } from "@/components/theme-toggle";
import { Input } from "@/components/ui/input";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { ProjectProvider, useProjects } from "@/lib/contexts/ProjectContext";
import { Project } from "@/lib/types";
import { ChevronLeft, Layers, SearchIcon, Tag, X } from "lucide-react";
import { KeyboardEvent, useEffect, useRef } from "react";

const databaseFake: Project[] = [
    {
        id: "21a4fa7a-3bfa-4a99-97d8-11cab956e634",
        name: "GestãoFácil",
        description: "Sistema completo para gestão empresarial com módulos de finanças, estoque, vendas e recursos humanos. Interface intuitiva e relatórios personalizados para pequenas e médias empresas.",
        stack: ["React", "Node.js", "PostgreSQL", "TypeScript", "Redis", "Docker"],
        status: "in development",
        startDate: "2024-02-10T03:00:00.000Z",
        endDate: null,
        repository: "https://github.com/code-dev-br/gestao-facil",
        tags: ["Gestão", "ERP", "Finanças", "B2B"],
        priority: "high",
        logs: [
            {
                date: "2024-02-10T03:00:00.000Z",
                message: "Início do projeto com configuração da arquitetura base"
            },
            {
                date: "2024-02-25T03:00:00.000Z",
                message: "Implementação dos componentes principais e estrutura de banco de dados"
            },
            {
                date: "2024-03-12T03:00:00.000Z",
                message: "Módulo financeiro concluído com integração bancária"
            },
            {
                date: "2024-03-30T03:00:00.000Z",
                message: "Sistema de autenticação e permissões implementado"
            },
            {
                date: "2024-04-15T03:00:00.000Z",
                message: "Testes de integração adicionados para fluxos principais"
            }
        ],
        todo: [
            {
                description: "Implementar integração com sistemas de pagamento",
                status: false,
                createdAt: "2024-02-12T03:00:00.000Z",
                updatedAt: "2024-02-12T03:00:00.000Z"
            },
            {
                description: "Criar dashboard principal com widgets personalizáveis",
                status: true,
                createdAt: "2024-02-20T03:00:00.000Z",
                updatedAt: "2024-03-05T03:00:00.000Z"
            },
            {
                description: "Desenvolver módulo de controle de estoque",
                status: false,
                createdAt: "2024-03-15T03:00:00.000Z",
                updatedAt: "2024-03-15T03:00:00.000Z"
            },
            {
                description: "Implementar sistema de notificações em tempo real",
                status: false,
                createdAt: "2024-03-28T03:00:00.000Z",
                updatedAt: "2024-03-28T03:00:00.000Z"
            }
        ],
        ideas: [
            {
                description: "Adicionar análise preditiva para vendas com IA",
                status: "approved",
                createdAt: "2024-02-18T03:00:00.000Z",
                updatedAt: "2024-02-20T03:00:00.000Z"
            },
            {
                description: "Implementar modo escuro/claro com detecção automática",
                status: "pending",
                createdAt: "2024-03-05T03:00:00.000Z",
                updatedAt: "2024-03-05T03:00:00.000Z"
            },
            {
                description: "Criar aplicativo móvel complementar",
                status: "rejected",
                createdAt: "2024-03-18T03:00:00.000Z",
                updatedAt: "2024-03-25T03:00:00.000Z"
            }
        ]
    },
    {
        id: "31b5fb8b-4cfa-5b99-98d8-22dbc957f745",
        name: "DeliveryJá",
        description: "Plataforma completa para delivery de alimentos com aplicativo para clientes, restaurantes e entregadores. Sistema de rastreamento em tempo real e integração com meios de pagamento.",
        stack: ["React Native", "Node.js", "MongoDB", "Socket.io", "AWS"],
        status: "in planning",
        startDate: "2024-03-05T03:00:00.000Z",
        endDate: null,
        repository: "https://github.com/code-dev-br/deliveryja",
        tags: ["Delivery", "Food", "Mobile", "B2C"],
        priority: "high",
        logs: [
            {
                date: "2024-03-05T03:00:00.000Z",
                message: "Reunião inicial com stakeholders para definição de requisitos"
            },
            {
                date: "2024-03-15T03:00:00.000Z",
                message: "Conclusão do documento de especificação técnica"
            }
        ],
        todo: [
            {
                description: "Criar estrutura inicial do projeto",
                status: false,
                createdAt: "2024-03-18T03:00:00.000Z",
                updatedAt: "2024-03-18T03:00:00.000Z"
            }
        ],
        ideas: []
    },
    {
        id: "41c6gc9c-5dfb-6c99-99e9-33ecd958g856",
        name: "ClinicaCloud",
        description: "Sistema de gestão para clínicas médicas com agendamento online, prontuário eletrônico e faturamento integrado. Inclui aplicativo para pacientes e integração com planos de saúde.",
        stack: ["Vue.js", "Laravel", "MySQL", "Redis", "Flutter"],
        status: "in development",
        startDate: "2024-01-15T03:00:00.000Z",
        endDate: null,
        repository: "https://github.com/code-dev-br/clinica-cloud",
        tags: ["Saúde", "Gestão", "B2B", "SaaS"],
        priority: "medium"
    },
    {
        id: "51d7hd0d-6egc-7d99-00f0-44fde059h967",
        name: "EcoTrack",
        description: "Aplicativo para monitoramento e redução da pegada de carbono pessoal e empresarial. Inclui calculadora de emissões, sugestões personalizadas e certificados de compensação.",
        stack: ["React", "Python", "Django", "PostgreSQL", "TensorFlow"],
        status: "completed",
        startDate: "2023-11-10T03:00:00.000Z",
        endDate: "2024-02-25T03:00:00.000Z",
        repository: "https://github.com/code-dev-br/ecotrack",
        tags: ["Sustentabilidade", "Meio Ambiente", "ESG", "B2C"],
        priority: "medium",
        logs: [
            {
                date: "2023-11-10T03:00:00.000Z",
                message: "Início do desenvolvimento com configuração do ambiente"
            },
            {
                date: "2023-12-05T03:00:00.000Z",
                message: "Primeira versão do backend concluída"
            },
            {
                date: "2024-01-15T03:00:00.000Z",
                message: "Interface do usuário finalizada com todos os componentes"
            },
            {
                date: "2024-02-10T03:00:00.000Z",
                message: "Testes de integração e desempenho concluídos"
            },
            {
                date: "2024-02-25T03:00:00.000Z",
                message: "Projeto finalizado e entregue ao cliente"
            }
        ]
    },
    {
        id: "61e8ie1e-7fhd-8e99-11g1-55gef150i078",
        name: "PortalTransparência",
        description: "Portal de transparência para órgãos públicos com visualização de dados orçamentários, licitações e contratos. Sistema completo com painéis interativos e exportação de relatórios.",
        stack: ["React", "Express", "Oracle", "D3.js", "Material UI"],
        status: "in planning",
        startDate: "2024-04-05T03:00:00.000Z",
        endDate: null,
        repository: "https://github.com/code-dev-br/portal-transparencia",
        tags: ["Governo", "Transparência", "Dados Públicos", "Cidadania"],
        priority: "high"
    },
    {
        id: "71f9jf2f-8gie-9f99-22h2-66hfg261j189",
        repository: "https://github.com/code-dev-br/fit-connect",
        tags: ["Saúde", "Fitness", "Mobile", "B2C"],
        name: "FitConnect",
        description: "Aplicativo de fitness com planos de treino personalizados, monitoramento de progresso e integração com dispositivos wearable",
        stack: ["React Native", "Firebase", "Node.js", "TensorFlow Lite"],
        status: "in development",
        startDate: "2023-12-10T03:00:00.000Z",
        endDate: null,
        priority: "low",
        logs: [
            {
                date: "2023-12-10T03:00:00.000Z",
                message: "Início do projeto"
            },
            {
                date: "2024-01-20T03:00:00.000Z",
                message: "Primeiras telas desenvolvidas"
            }
        ]
    },
    {
        id: "81g0kg3g-9hjf-0g99-33i3-77igh372k290",
        name: "EduBrasil",
        description: "Plataforma de ensino online com recursos de gamificação e aprendizado adaptativo baseado em IA para escolas públicas brasileiras",
        stack: ["Next.js", "Python", "PostgreSQL", "TensorFlow", "AWS"],
        status: "completed",
        startDate: "2023-08-15T03:00:00.000Z",
        endDate: "2024-01-25T03:00:00.000Z",
        repository: "https://github.com/code-dev-br/edubrasil",
        tags: ["Educação", "IA", "Ensino", "Impacto Social"],
        priority: "high",
        todo: [
            {
                description: "Implementar módulo de certificados",
                status: true,
                createdAt: "2023-09-20T03:00:00.000Z",
                updatedAt: "2023-10-25T03:00:00.000Z"
            },
            {
                description: "Criar sistema de recomendação de cursos",
                status: true,
                createdAt: "2023-10-10T03:00:00.000Z",
                updatedAt: "2023-12-15T03:00:00.000Z"
            }
        ]
    }
]

function SearchInput() {
    const { searchTerm, setSearchTerm, activeFilter, setActiveFilter } = useProjects();
    const inputRef = useRef<HTMLInputElement>(null);

    // Manipulador de eventos de teclado
    const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
        // CTRL+Enter para adicionar filtros
        if (e.ctrlKey && e.key === "Enter") {
            const term = searchTerm.trim().toLowerCase();

            if (term.startsWith("stk")) {
                setActiveFilter("stack");
                setSearchTerm(term.replace("stk", "").trim());
                e.preventDefault();
            } else if (term.startsWith("tag")) {
                setActiveFilter("tags");
                setSearchTerm(term.replace("tag", "").trim());
                e.preventDefault();
            }
        }
    };

    // Limpar o filtro ativo
    const clearFilter = () => {
        setActiveFilter(null);
    };

    // Focar no input quando CTRL+Espaço é pressionado
    useEffect(() => {
        const handleGlobalKeyDown = (e: globalThis.KeyboardEvent) => {
            if (e.ctrlKey && e.code === "Space") {
                e.preventDefault();
                if (inputRef.current) {
                    inputRef.current.focus();
                }
            }
        };

        window.addEventListener("keydown", handleGlobalKeyDown);
        return () => window.removeEventListener("keydown", handleGlobalKeyDown);
    }, []);

    return (
        <div className="relative flex items-center gap-2">
            <Input
                ref={inputRef}
                type="text"
                placeholder={activeFilter
                    ? `Searching in ${activeFilter === "stack" ? "Tech Stack" : "Tags"}...`
                    : "Search projects..."
                }
                className="pl-8 w-full pr-32"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                onKeyDown={handleKeyDown}
            />
            <SearchIcon className="absolute left-2 top-1/2 -translate-y-1/2 text-muted-foreground size-4" />

            {activeFilter && (
                <div className="absolute right-2 flex items-center gap-1 z-10">
                    <div className={`flex items-center gap-1 text-xs px-2 py-1 rounded-md ${activeFilter === "stack"
                            ? "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400"
                            : "bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-400"
                        }`}>
                        {activeFilter === "stack" ? (
                            <Layers className="h-3 w-3" />
                        ) : (
                            <Tag className="h-3 w-3" />
                        )}
                        <span>{activeFilter === "stack" ? "Tech Stack" : "Tags"}</span>
                        <button
                            onClick={clearFilter}
                            className="hover:text-foreground ml-1"
                        >
                            <X className="h-3 w-3" />
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}

function RetornarParaHome() {
    const { setSelectedProject, setSearchTerm } = useProjects();

    return (
        <button
            onClick={() => {
                setSearchTerm("");
                setSelectedProject(null);
            }}
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
                <div className="flex items-center w-full border-b p-2 gap-2">
                    <SidebarTrigger />

                    <div className="flex-1">
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
