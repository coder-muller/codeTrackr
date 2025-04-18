'use client'

import { Project } from "@/lib/types";
import { createContext, useContext, useState } from "react";

type FilterType = "stack" | "tags" | null;

interface ProjectContextType {
    projects: Project[];
    selectedProject: Project | null;
    setSelectedProject: (project: Project | null) => void;
    searchTerm: string;
    setSearchTerm: (term: string) => void;
    searchResults: Project[];
    setProjects: (projects: Project[]) => void;
    deleteProject: (projectId: string) => void;
    activeFilter: FilterType;
    setActiveFilter: (filter: FilterType) => void;
}

const ProjectContext = createContext<ProjectContextType | undefined>(undefined);

export function ProjectProvider({ children, initialProjects }: { children: React.ReactNode, initialProjects: Project[] }) {
    const [projects, setProjectsState] = useState<Project[]>(initialProjects);
    const [selectedProject, setSelectedProject] = useState<Project | null>(null);
    const [searchTerm, setSearchTerm] = useState("");
    const [activeFilter, setActiveFilter] = useState<FilterType>(null);

    // Filtrar projetos com base no termo de busca e filtro ativo
    const searchResults = searchTerm.trim() === "" ? [] : projects.filter(project => {
        const searchLower = searchTerm.toLowerCase();

        // Se tiver um filtro ativo, pesquisar apenas no campo especificado
        if (activeFilter === "stack") {
            return project.stack.some(tech => tech.toLowerCase().includes(searchLower));
        } 
        else if (activeFilter === "tags") {
            return project.tags.some(tag => tag.toLowerCase().includes(searchLower));
        } 
        // Pesquisa padrão em todos os campos
        else {
            return (
                project.name.toLowerCase().includes(searchLower) ||
                project.description.toLowerCase().includes(searchLower) ||
                project.stack.some(tech => tech.toLowerCase().includes(searchLower)) ||
                project.tags.some(tag => tag.toLowerCase().includes(searchLower)) ||
                (project.repository && project.repository.toLowerCase().includes(searchLower)) ||
                project.logs?.some(log => log.message.toLowerCase().includes(searchLower))
            );
        }
    });

    // Função para atualizar a lista de projetos
    const setProjects = (newProjects: Project[]) => {
        setProjectsState(newProjects);
        // Se o projeto selecionado foi alterado, atualize-o
        if (selectedProject) {
            const updatedSelectedProject = newProjects.find(p => p.id === selectedProject.id);
            if (updatedSelectedProject) {
                setSelectedProject(updatedSelectedProject);
            }
        }
    };

    // Função para excluir um projeto
    const deleteProject = (projectId: string) => {
        const newProjects = projects.filter(p => p.id !== projectId);
        setProjectsState(newProjects);
        
        // Se o projeto excluído era o selecionado, limpe a seleção
        if (selectedProject && selectedProject.id === projectId) {
            setSelectedProject(null);
        }
    };

    return (
        <ProjectContext.Provider value={{ 
            projects, 
            selectedProject, 
            setSelectedProject, 
            searchTerm, 
            setSearchTerm,
            searchResults,
            setProjects,
            deleteProject,
            activeFilter,
            setActiveFilter
        }}>
            {children}
        </ProjectContext.Provider>
    );
}

export function useProjects() {
    const context = useContext(ProjectContext);
    if (context === undefined) {
        throw new Error('useProjects must be used within a ProjectProvider');
    }
    return context;
} 