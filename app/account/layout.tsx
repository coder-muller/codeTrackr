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
        name: "Investment App",
        description: "Complete application for personal investment management with profitability analysis, financial projections, and integration with major brokers. Includes customized dashboard and investment opportunity notifications.",
        stack: ["React", "Next.js", "Tailwind CSS", "TypeScript", "Node.js", "MongoDB"],
        status: "in development",
        startDate: "2024-02-15T03:00:00.000Z",
        endDate: null,
        repository: "https://github.com/code-dev-br/investment-app",
        tags: ["Finance", "Investments", "Dashboard", "B2C"],
        priority: "high",
        logs: [
            {
                date: "2024-02-15T03:00:00.000Z",
                message: "Project started with initial Next.js configuration and folder structure"
            },
            {
                date: "2024-02-20T03:00:00.000Z",
                message: "Basic components implemented and theme configured with Tailwind"
            },
            {
                date: "2024-03-05T03:00:00.000Z",
                message: "Investment API integrated with main endpoints working"
            },
            {
                date: "2024-03-18T03:00:00.000Z",
                message: "NextAuth authentication system implementation completed"
            },
            {
                date: "2024-04-02T03:00:00.000Z",
                message: "Integration tests added for main user flows"
            }
        ],
        todo: [
            {
                description: "Implement Google and Apple authentication",
                status: false,
                createdAt: "2024-02-16T03:00:00.000Z",
                updatedAt: "2024-02-16T03:00:00.000Z"
            },
            {
                description: "Create main dashboard with customizable widgets",
                status: true,
                createdAt: "2024-02-18T03:00:00.000Z",
                updatedAt: "2024-03-01T03:00:00.000Z"
            },
            {
                description: "Integrate B3 API for real-time quotes",
                status: false,
                createdAt: "2024-03-10T03:00:00.000Z",
                updatedAt: "2024-03-10T03:00:00.000Z"
            },
            {
                description: "Implement push notification system",
                status: false,
                createdAt: "2024-03-25T03:00:00.000Z",
                updatedAt: "2024-03-25T03:00:00.000Z"
            }
        ],
        ideas: [
            {
                description: "Add interactive performance charts with advanced filters",
                status: "approved",
                createdAt: "2024-02-16T03:00:00.000Z",
                updatedAt: "2024-02-17T03:00:00.000Z"
            },
            {
                description: "Implement dark/light mode with automatic system preference detection",
                status: "pending",
                createdAt: "2024-03-01T03:00:00.000Z",
                updatedAt: "2024-03-01T03:00:00.000Z"
            },
            {
                description: "Create AI-based recommendation system",
                status: "rejected",
                createdAt: "2024-03-15T03:00:00.000Z",
                updatedAt: "2024-03-20T03:00:00.000Z"
            }
        ]
    },
    {
        id: "31b5fb8b-4cfa-5b99-98d8-22dbc957f745",
        name: "EmitGo",
        description: "Complete electronic invoice issuance system with modern and intuitive interface. Integration with SEFAZ of all states, automatic generation of tax reports and integrated inventory control.",
        stack: ["React", "Node.js", "PostgreSQL", "Redis", "Docker"],
        status: "in planning",
        startDate: "2024-03-01T03:00:00.000Z",
        endDate: null,
        repository: "https://github.com/code-dev-br/emitgo",
        tags: ["Invoices", "Finance", "B2B", "Accounting"],
        priority: "high",
        logs: [
            {
                date: "2024-03-01T03:00:00.000Z",
                message: "Initial meeting with stakeholders for requirements definition"
            },
            {
                date: "2024-03-10T03:00:00.000Z",
                message: "Completion of technical specification document"
            }
        ],
        todo: [
            {
                description: "Create initial project structure",
                status: false,
                createdAt: "2024-03-12T03:00:00.000Z",
                updatedAt: "2024-03-12T03:00:00.000Z"
            }
        ],
        ideas: []
    },
    {
        id: "41c6gc9c-5dfb-6c99-99e9-33ecd958g856",
        name: "Schadule Pro",
        description: "Professional scheduling platform with advanced management features for clinics, salons, and self-employed professionals. Includes SMS/WhatsApp reminder system and integrated payments.",
        stack: ["Vue.js", "Laravel", "MySQL", "Redis"],
        status: "in development",
        startDate: "2024-01-10T03:00:00.000Z",
        endDate: null,
        repository: "https://github.com/code-dev-br/shadule-pro",
        tags: ["Scheduling", "Management", "B2B", "SaaS"],
        priority: "medium"
    },
    {
        id: "51d7hd0d-6egc-7d99-00f0-44fde059h967",
        name: "Code Trackr",
        description: "Code tracking and analysis system for development teams. Quality metrics, GitHub/GitLab integration, and customized productivity reports.",
        stack: ["Angular", "Python", "MongoDB", "Docker", "Kubernetes"],
        status: "completed",
        startDate: "2023-11-15T03:00:00.000Z",
        endDate: "2024-02-28T03:00:00.000Z",
        repository: "https://github.com/code-dev-br/code-trackr",
        tags: ["Development", "Analytics", "DevTools", "Productivity"],
        priority: "medium",
        logs: [
            {
                date: "2023-11-15T03:00:00.000Z",
                message: "Development started with environment configuration"
            },
            {
                date: "2023-12-10T03:00:00.000Z",
                message: "First version of backend completed"
            },
            {
                date: "2024-01-20T03:00:00.000Z",
                message: "User interface finalized with all components"
            },
            {
                date: "2024-02-15T03:00:00.000Z",
                message: "Integration and performance tests completed"
            },
            {
                date: "2024-02-28T03:00:00.000Z",
                message: "Project finalized and delivered to client"
            }
        ]
    },
    {
        id: "61e8ie1e-7fhd-8e99-11g1-55gef150i078",
        name: "CGM Dashboard",
        description: "Administrative dashboard for Municipal Comptroller's Office with audit, ombudsman, transparency, and internal control modules. Complete system for managing internal processes of public administration.",
        stack: ["React", "Express", "Oracle", "Redux", "Material UI"],
        status: "in planning",
        startDate: "2024-04-01T03:00:00.000Z",
        endDate: null,
        repository: "https://github.com/code-dev-br/cgm-dashboard",
        tags: ["Government", "Dashboard", "Administration", "Audit"],
        priority: "high"
    },
    {
        id: "71f9jf2f-8gie-9f99-22h2-66hfg261j189",
        repository: "https://github.com/code-dev-br/health-track",
        tags: ["Health", "Wearables", "B2C"],
        name: "HealthTrack",
        description: "Health and wellness monitoring application with wearable device integration",
        stack: ["React Native", "Firebase", "Node.js"],
        status: "in development",
        startDate: "2023-12-05T03:00:00.000Z",
        endDate: null,
        priority: "low",
        logs: [
            {
                date: "2023-12-05T03:00:00.000Z",
                message: "Project started"
            },
            {
                date: "2024-01-15T03:00:00.000Z",
                message: "First screens developed"
            }
        ]
    },
    {
        id: "81g0kg3g-9hjf-0g99-33i3-77igh372k290",
        name: "EduLearn",
        description: "Online learning platform with gamification features and AI-based adaptive learning",
        stack: ["Next.js", "Django", "PostgreSQL", "TensorFlow"],
        status: "completed",
        startDate: "2023-08-10T03:00:00.000Z",
        endDate: "2024-01-20T03:00:00.000Z",
        repository: "https://github.com/code-dev-br/edulearn",
        tags: ["Education", "AI", "E-learning"],
        priority: "high",
        todo: [
            {
                description: "Implement certificate module",
                status: true,
                createdAt: "2023-09-15T03:00:00.000Z",
                updatedAt: "2023-10-20T03:00:00.000Z"
            },
            {
                description: "Create course recommendation system",
                status: true,
                createdAt: "2023-10-05T03:00:00.000Z",
                updatedAt: "2023-12-10T03:00:00.000Z"
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
                    <div className={`flex items-center gap-1 text-xs px-2 py-1 rounded-md ${
                        activeFilter === "stack" 
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
