export type ProjectPriority = 'high' | 'medium' | 'low';
export type ProjectStatus = 'completed' | 'in development' | 'in planning';

export interface ProjectLog {
    date: string;
    message: string;
}

export interface ProjectTodo {
    description: string;
    status: boolean;
    createdAt: string;
    updatedAt: string;
}

export interface ProjectIdea {
    description: string;
    status: 'pending' | 'approved' | 'rejected';
    createdAt: string;
    updatedAt: string;
}

export interface Project {
    id: string;
    name: string;
    description: string;
    stack: string[];
    status: ProjectStatus;
    startDate: string;
    endDate: string | null;
    repository: string;
    tags: string[];
    priority?: ProjectPriority;
    logs?: ProjectLog[];
    todo?: ProjectTodo[];
    ideas?: ProjectIdea[];
}