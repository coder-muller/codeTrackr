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
        name: "EasyManage",
        description: "Complete system for business management with modules for finance, stock, sales and human resources. Intuitive interface and personalized reports for small and medium-sized companies.",
        stack: ["React", "Node.js", "PostgreSQL", "TypeScript", "Redis", "Docker"],
        status: "in development",
        startDate: "2024-02-10T03:00:00.000Z",
        endDate: null,
        repository: "https://github.com/code-dev-br/gestao-facil",
        tags: ["Management", "ERP", "Finance", "B2B"],
        priority: "high",
        logs: [
            {
                date: "2024-02-10T03:00:00.000Z",
                message: "Project started with base architecture configuration"
            },
            {
                date: "2024-02-25T03:00:00.000Z",
                message: "Implementation of main components and database structure"
            },
            {
                date: "2024-03-12T03:00:00.000Z",
                message: "Financial module completed with bank integration"
            },
            {
                date: "2024-03-30T03:00:00.000Z",
                message: "Authentication and permission system implemented"
            },
            {
                date: "2024-04-15T03:00:00.000Z",
                message: "Integration tests added for main flows"
            }
        ],
        todo: [
            {
                description: "Implement integration with payment systems",
                status: false,
                createdAt: "2024-02-12T03:00:00.000Z",
                updatedAt: "2024-02-12T03:00:00.000Z"
            },
            {
                description: "Create main dashboard with customizable widgets",
                status: true,
                createdAt: "2024-02-20T03:00:00.000Z",
                updatedAt: "2024-03-05T03:00:00.000Z"
            },
            {
                description: "Develop stock control module",
                status: false,
                createdAt: "2024-03-15T03:00:00.000Z",
                updatedAt: "2024-03-15T03:00:00.000Z"
            },
            {
                description: "Implement real-time notification system",
                status: false,
                createdAt: "2024-03-28T03:00:00.000Z",
                updatedAt: "2024-03-28T03:00:00.000Z"
            }
        ],
        ideas: [
            {
                description: "Add predictive analysis for sales with AI",
                status: "approved",
                createdAt: "2024-02-18T03:00:00.000Z",
                updatedAt: "2024-02-20T03:00:00.000Z"
            },
            {
                description: "Implement dark/light mode with automatic detection",
                status: "pending",
                createdAt: "2024-03-05T03:00:00.000Z",
                updatedAt: "2024-03-05T03:00:00.000Z"
            },
            {
                description: "Create complementary mobile application",
                status: "rejected",
                createdAt: "2024-03-18T03:00:00.000Z",
                updatedAt: "2024-03-25T03:00:00.000Z"
            }
        ]
    },
    {
        id: "31b5fb8b-4cfa-5b99-98d8-22dbc957f745",
        name: "DeliveryNow",
        description: "Complete platform for food delivery with application for customers, restaurants and delivery people. Real-time tracking system and integration with payment methods.",
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
                message: "Initial meeting with stakeholders to define requirements"
            },
            {
                date: "2024-03-15T03:00:00.000Z",
                message: "Conclusion of the technical specification document"
            }
        ],
        todo: [
            {
                description: "Create initial project structure",
                status: false,
                createdAt: "2024-03-18T03:00:00.000Z",
                updatedAt: "2024-03-18T03:00:00.000Z"
            }
        ],
        ideas: []
    },
    {
        id: "41c6gc9c-5dfb-6c99-99e9-33ecd958g856",
        name: "ClinicCloud",
        description: "Management system for medical clinics with online scheduling, electronic medical records and integrated billing. Includes patient application and integration with health plans.",
        stack: ["Vue.js", "Laravel", "MySQL", "Redis", "Flutter"],
        status: "in development",
        startDate: "2024-01-15T03:00:00.000Z",
        endDate: null,
        repository: "https://github.com/code-dev-br/clinica-cloud",
        tags: ["Health", "Management", "B2B", "SaaS"],
        priority: "medium"
    },
    {
        id: "51d7hd0d-6egc-7d99-00f0-44fde059h967",
        name: "EcoTrack",
        description: "Application for monitoring and reducing personal and business carbon footprint. Includes emissions calculator, personalized suggestions and compensation certificates.",
        stack: ["React", "Python", "Django", "PostgreSQL", "TensorFlow"],
        status: "completed",
        startDate: "2023-11-10T03:00:00.000Z",
        endDate: "2024-02-25T03:00:00.000Z",
        repository: "https://github.com/code-dev-br/ecotrack",
        tags: ["Sustainability", "Environment", "ESG", "B2C"],
        priority: "medium",
        logs: [
            {
                date: "2023-11-10T03:00:00.000Z",
                message: "Start of development with environment configuration"
            },
            {
                date: "2023-12-05T03:00:00.000Z",
                message: "First version of the backend completed"
            },
            {
                date: "2024-01-15T03:00:00.000Z",
                message: "User interface finalized with all components"
            },
            {
                date: "2024-02-10T03:00:00.000Z",
                message: "Integration and performance tests completed"
            },
            {
                date: "2024-02-25T03:00:00.000Z",
                message: "Project completed and delivered to the client"
            }
        ]
    },
    {
        id: "61e8ie1e-7fhd-8e99-11g1-55gef150i078",
        name: "TransparencyPortal",
        description: "Transparency portal for public bodies with visualization of budgetary data, tenders and contracts. Complete system with interactive panels and report export.",
        stack: ["React", "Express", "Oracle", "D3.js", "Material UI"],
        status: "in planning",
        startDate: "2024-04-05T03:00:00.000Z",
        endDate: null,
        repository: "https://github.com/code-dev-br/portal-transparencia",
        tags: ["Government", "Transparency", "Public Data", "Citizenship"],
        priority: "high"
    },
    {
        id: "71f9jf2f-8gie-9f99-22h2-66hfg261j189",
        repository: "https://github.com/code-dev-br/fit-connect",
        tags: ["Health", "Fitness", "Mobile", "B2C"],
        name: "FitConnect",
        description: "Fitness app with personalized workout plans, progress tracking and integration with wearable devices",
        stack: ["React Native", "Firebase", "Node.js", "TensorFlow Lite"],
        status: "in development",
        startDate: "2023-12-10T03:00:00.000Z",
        endDate: null,
        priority: "low",
        logs: [
            {
                date: "2023-12-10T03:00:00.000Z",
                message: "Project start"
            },
            {
                date: "2024-01-20T03:00:00.000Z",
                message: "First screens developed"
            }
        ]
    },
    {
        id: "81g0kg3g-9hjf-0g99-33i3-77igh372k290",
        name: "EduBrasil",
        description: "Online teaching platform with gamification resources and adaptive learning based on AI for Brazilian public schools",
        stack: ["Next.js", "Python", "PostgreSQL", "TensorFlow", "AWS"],
        status: "completed",
        startDate: "2023-08-15T03:00:00.000Z",
        endDate: "2024-01-25T03:00:00.000Z",
        repository: "https://github.com/code-dev-br/edubrasil",
        tags: ["Education", "AI", "Teaching", "Social Impact"],
        priority: "high",
        todo: [
            {
                description: "Implement certificates module",
                status: true,
                createdAt: "2023-09-20T03:00:00.000Z",
                updatedAt: "2023-10-25T03:00:00.000Z"
            },
            {
                description: "Create course recommendation system",
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
