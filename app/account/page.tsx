'use client'

import { DeleteProjectButton } from "@/components/project/DeleteProjectButton";
import { EditProjectButton, NewProjectButton } from "@/components/project/ProjectDialog";
import { useProjects } from "@/lib/contexts/ProjectContext";
import { Project, ProjectIdea, ProjectLog, ProjectTodo } from "@/lib/types";
import { format } from 'date-fns';
import { PlusCircle } from "lucide-react";
import { useState } from "react";

// Componente para renderizar um projeto em formato markdown
function ProjectMarkdown({ project }: { project: Project }) {
  return (
    <div className="max-w-6xl mx-auto px-6 py-8 bg-background rounded-xl shadow-sm">
      <div className="flex justify-between items-start mb-8">
        <div className="text-left max-w-full">
          <h1 className="text-3xl font-bold tracking-tight mb-3">{project.name}</h1>
          <p className="text-muted-foreground text-lg">{project.description}</p>
        </div>
        <div className="flex gap-1">
          <EditProjectButton project={project} />
          <DeleteProjectButton project={project} />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
        <div className="bg-card p-6 rounded-lg border border-border hover:border-primary/20 transition-colors">
          <h2 className="text-xl font-semibold mb-4 flex items-center">
            <span className="inline-block w-2 h-2 bg-primary rounded-full mr-2"></span>
            Details
          </h2>
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-muted-foreground">Status</span>
              <span className={`px-3 py-1 rounded-full text-xs font-medium ${project.status === 'completed' ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400' :
                project.status === 'in development' ? 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400' :
                  'bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-400'
                }`}>
                {project.status}
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-muted-foreground">Priority</span>
              <span className={`px-3 py-1 rounded-full text-xs font-medium ${project.priority === 'high' ? 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400' :
                project.priority === 'medium' ? 'bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-400' :
                  'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400'
                }`}>
                {project.priority}
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-muted-foreground">Started at</span>
              <span className="text-sm">{format(new Date(project.startDate), 'PPP')}</span>
            </div>
            {project.endDate && (
              <div className="flex justify-between items-center">
                <span className="text-muted-foreground">Completed at</span>
                <span className="text-sm">{format(new Date(project.endDate), 'PPP')}</span>
              </div>
            )}
          </div>
        </div>

        <div className="bg-card p-6 rounded-lg border border-border hover:border-primary/20 transition-colors">
          <h2 className="text-xl font-semibold mb-4 flex items-center">
            <span className="inline-block w-2 h-2 bg-primary rounded-full mr-2"></span>
            Links
          </h2>
          <a
            href={project.repository}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-2 p-3 bg-primary/10 hover:bg-primary/20 text-primary rounded-lg transition-colors"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4"></path>
              <path d="M9 18c-4.51 2-5-2-7-2"></path>
            </svg>
            <span className="truncate">{project.repository ? project.repository.replace('https://github.com/', '') : '-'}</span>
          </a>
        </div>
      </div>

      <div className="w-full grid grid-cols-2 gap-4">
        <div className="bg-card p-6 rounded-lg border border-border hover:border-primary/20 transition-colors mb-8">
          <h2 className="text-xl font-semibold mb-4 flex items-center">
            <span className="inline-block w-2 h-2 bg-primary rounded-full mr-2"></span>
            Tech Stack
          </h2>
          <div className="flex flex-wrap gap-2">
            {project.stack.map(tech => (
              <span key={tech} className="px-3 py-1.5 bg-secondary hover:bg-secondary/80 text-secondary-foreground rounded-full text-sm transition-colors">
                {tech}
              </span>
            ))}
          </div>
        </div>

        <div className="bg-card p-6 rounded-lg border border-border hover:border-primary/20 transition-colors mb-8">
          <h2 className="text-xl font-semibold mb-4 flex items-center">
            <span className="inline-block w-2 h-2 bg-primary rounded-full mr-2"></span>
            Tags
          </h2>
          <div className="flex flex-wrap gap-2">
            {project.tags.map(tag => (
              <span key={tag} className="px-3 py-1.5 bg-muted hover:bg-muted/80 text-muted-foreground rounded-full text-sm transition-colors">
                #{tag}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Lista de Tarefas (Todo) */}
      <div className="bg-card p-6 rounded-lg border border-border hover:border-primary/20 transition-colors mb-8">
        <h2 className="text-xl font-semibold flex items-center mb-4">
          <span className="inline-block w-2 h-2 bg-primary rounded-full mr-2"></span>
          Tasks
        </h2>

        <div className="space-y-2">
          <TodoForm project={project} />

          {project.todo && project.todo.length > 0 ? (
            project.todo.map((todo, index) => (
              <TodoItem key={index} todo={todo} index={index} project={project} />
            ))
          ) : (
            <div className="text-center py-6 text-muted-foreground">
              <p>No tasks added</p>
              <p className="text-sm">Add a task above to track project progress</p>
            </div>
          )}
        </div>
      </div>

      {/* Lista de Ideias */}
      <div className="bg-card p-6 rounded-lg border border-border hover:border-primary/20 transition-colors mb-8">
        <h2 className="text-xl font-semibold flex items-center mb-4">
          <span className="inline-block w-2 h-2 bg-primary rounded-full mr-2"></span>
          Ideas
        </h2>

        <div className="space-y-2">
          <IdeaForm project={project} />

          {project.ideas && project.ideas.length > 0 ? (
            project.ideas.map((idea, index) => (
              <IdeaItem key={index} idea={idea} index={index} project={project} />
            ))
          ) : (
            <div className="text-center py-6 text-muted-foreground">
              <p>No ideas added</p>
              <p className="text-sm">Add an idea above to track project progress</p>
            </div>
          )}
        </div>
      </div>

      {project.logs && project.logs.length > 0 && (
        <div className="bg-card p-6 rounded-lg border border-border hover:border-primary/20 transition-colors">
          <h2 className="text-xl font-semibold mb-4 flex items-center">
            <span className="inline-block w-2 h-2 bg-primary rounded-full mr-2"></span>
            Activity History
          </h2>
          <div className="space-y-4">
            {project.logs.map((log, index) => (
              <LogItem key={index} log={log} index={index} project={project} />
            ))}
          </div>
          <AddLogButton project={project} />
        </div>
      )}

      {!project.logs || project.logs.length === 0 ? (
        <div className="bg-card p-6 rounded-lg border border-border hover:border-primary/20 transition-colors">
          <h2 className="text-xl font-semibold mb-4 flex items-center">
            <span className="inline-block w-2 h-2 bg-primary rounded-full mr-2"></span>
            Activity History
          </h2>
          <div className="text-center py-6 text-muted-foreground">
            <p>No events recorded</p>
            <p className="text-sm">Add events to track activity history</p>
          </div>
          <AddLogButton project={project} />
        </div>
      ) : null}
    </div>
  );
}

// Componente para exibir um item de tarefa
function TodoItem({ todo, index, project }: { todo: ProjectTodo, index: number, project: Project }) {
  const { setSelectedProject } = useProjects();

  const toggleTodoStatus = () => {
    if (!project.todo) return;

    const updatedTodos = [...project.todo];
    updatedTodos[index] = {
      ...updatedTodos[index],
      status: !updatedTodos[index].status
    };

    const updatedProject = {
      ...project,
      todo: updatedTodos
    };

    // Atualizar o projeto no contexto
    setSelectedProject(updatedProject);
  };

  const deleteTodo = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!project.todo) return;

    const updatedTodos = project.todo.filter((_, i) => i !== index);
    const updatedProject = {
      ...project,
      todo: updatedTodos
    };

    setSelectedProject(updatedProject);
  };

  return (
    <div className="flex items-center gap-3 p-3 rounded-lg hover:bg-muted/50 transition-colors group">
      <button
        onClick={toggleTodoStatus}
        className={`flex-shrink-0 w-5 h-5 rounded-md border ${todo.status
          ? 'bg-primary border-primary text-primary-foreground'
          : 'border-muted-foreground'}`}
      >
        {todo.status && (
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="size-4 m-auto">
            <polyline points="20 6 9 17 4 12"></polyline>
          </svg>
        )}
      </button>
      <span className={`flex-1 ${todo.status ? 'line-through text-muted-foreground' : ''}`}>
        {todo.description}
      </span>
      <button
        onClick={deleteTodo}
        className="opacity-0 group-hover:opacity-100 transition-opacity text-muted-foreground hover:text-destructive"
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M3 6h18"></path>
          <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"></path>
          <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"></path>
        </svg>
      </button>
    </div>
  );
}

// Componente para adicionar novas tarefas
function TodoForm({ project }: { project: Project }) {
  const { setSelectedProject } = useProjects();
  const [newTodo, setNewTodo] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!newTodo.trim()) return;

    const updatedProject = {
      ...project,
      todo: [
        ...(project.todo || []),
        {
          description: newTodo,
          status: false,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString()
        }
      ]
    };

    // Atualizar o projeto no contexto
    setSelectedProject(updatedProject);

    // Resetar o formulário
    setNewTodo("");
  };

  return (
    <form onSubmit={handleSubmit} className="flex items-center gap-3 p-3 rounded-lg hover:bg-muted/50 transition-colors mb-4">
      <button
        type="button"
        className="flex-shrink-0 w-5 h-5 rounded-md border border-muted-foreground"
        tabIndex={-1}
      />
      <input
        type="text"
        value={newTodo}
        onChange={(e) => setNewTodo(e.target.value)}
        placeholder="Add new task..."
        className="flex-1 bg-transparent border-none outline-none focus:ring-0 placeholder-muted-foreground/70"
      />
    </form>
  );
}

// Componente para exibir uma ideia
function IdeaItem({ idea, index, project }: { idea: ProjectIdea, index: number, project: Project }) {
  const { setSelectedProject } = useProjects();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const updateIdeaStatus = (status: 'pending' | 'approved' | 'rejected') => {
    if (!project.ideas) return;

    const now = new Date().toISOString();
    const updatedIdeas = [...project.ideas];
    updatedIdeas[index] = {
      ...updatedIdeas[index],
      status,
      updatedAt: now
    };

    const updatedProject = {
      ...project,
      ideas: updatedIdeas
    };

    // Atualizar o projeto no contexto
    setSelectedProject(updatedProject);
    setIsMenuOpen(false);
  };

  const deleteIdea = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!project.ideas) return;

    const updatedIdeas = project.ideas.filter((_, i) => i !== index);
    const updatedProject = {
      ...project,
      ideas: updatedIdeas
    };

    setSelectedProject(updatedProject);
  };

  return (
    <div className="flex items-center gap-3 p-3 rounded-lg hover:bg-muted/50 transition-colors group relative">
      <div className={`flex-shrink-0 w-2 h-2 rounded-full ${idea.status === 'approved' ? 'bg-green-500' :
        idea.status === 'rejected' ? 'bg-red-500' : 'bg-amber-500'
        }`} />

      <div className="flex-1">
        <p className={`${idea.status === 'rejected' ? 'line-through text-muted-foreground' : ''
          }`}>
          {idea.description}
        </p>
        <p className="text-xs text-muted-foreground mt-1">
          {format(new Date(idea.createdAt), 'dd MMM yyyy, HH:mm')}
        </p>
      </div>

      <div className="flex items-center">
        <button
          onClick={deleteIdea}
          className="opacity-0 group-hover:opacity-100 transition-opacity text-muted-foreground hover:text-destructive mr-2"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M3 6h18"></path>
            <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"></path>
            <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"></path>
          </svg>
        </button>

        <button
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="opacity-0 group-hover:opacity-100 transition-opacity p-1 rounded-md hover:bg-muted"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="12" cy="12" r="1" />
            <circle cx="12" cy="5" r="1" />
            <circle cx="12" cy="19" r="1" />
          </svg>
        </button>

        {isMenuOpen && (
          <div className="absolute right-0 top-full mt-1 bg-popover shadow-md rounded-md border border-border p-1 z-10 min-w-32">
            <button
              onClick={() => updateIdeaStatus('pending')}
              className="w-full text-left px-2 py-1 text-sm rounded-sm hover:bg-muted flex items-center gap-2"
            >
              <div className="w-2 h-2 rounded-full bg-amber-500" />
              Pending
            </button>
            <button
              onClick={() => updateIdeaStatus('approved')}
              className="w-full text-left px-2 py-1 text-sm rounded-sm hover:bg-muted flex items-center gap-2"
            >
              <div className="w-2 h-2 rounded-full bg-green-500" />
              Approve
            </button>
            <button
              onClick={() => updateIdeaStatus('rejected')}
              className="w-full text-left px-2 py-1 text-sm rounded-sm hover:bg-muted flex items-center gap-2"
            >
              <div className="w-2 h-2 rounded-full bg-red-500" />
              Reject
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

// Componente para adicionar novas ideias
function IdeaForm({ project }: { project: Project }) {
  const { setSelectedProject } = useProjects();
  const [newIdea, setNewIdea] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!newIdea.trim()) return;

    const now = new Date().toISOString();
    const updatedProject = {
      ...project,
      ideas: [
        ...(project.ideas || []),
        {
          description: newIdea,
          status: 'pending' as const,
          createdAt: now,
          updatedAt: now
        }
      ]
    };

    // Atualizar o projeto no contexto
    setSelectedProject(updatedProject);

    // Resetar o formulário
    setNewIdea("");
  };

  return (
    <form onSubmit={handleSubmit} className="flex items-center gap-3 p-3 rounded-lg hover:bg-muted/50 transition-colors mb-4">
      <div className="flex-shrink-0 w-5 h-5 flex items-center justify-center text-primary">
        <PlusCircle className="size-5" />
      </div>
      <input
        type="text"
        value={newIdea}
        onChange={(e) => setNewIdea(e.target.value)}
        placeholder="Add new idea..."
        className="flex-1 bg-transparent border-none outline-none focus:ring-0 placeholder-muted-foreground/70"
      />
    </form>
  );
}

// Componente para adicionar logs manualmente
function AddLogButton({ project }: { project: Project }) {
  const { setSelectedProject } = useProjects();
  const [isOpen, setIsOpen] = useState(false);
  const [logMessage, setLogMessage] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!logMessage.trim()) return;

    const now = new Date().toISOString();
    const updatedProject = {
      ...project,
      logs: [
        ...(project.logs || []),
        {
          date: now,
          message: logMessage
        }
      ]
    };

    // Atualizar o projeto no contexto
    setSelectedProject(updatedProject);

    // Resetar o formulário
    setLogMessage("");
    setIsOpen(false);
  };

  return (
    <div className="mt-4">
      {isOpen ? (
        <form onSubmit={handleSubmit} className="flex flex-col gap-2">
          <textarea
            value={logMessage}
            onChange={(e) => setLogMessage(e.target.value)}
            placeholder="Describe the event or activity..."
            className="w-full px-3 py-2 text-sm rounded-md border border-border bg-background focus:outline-none focus:ring-2 focus:ring-primary/30 min-h-20"
            autoFocus
          />
          <div className="flex justify-end gap-2">
            <button
              type="button"
              onClick={() => setIsOpen(false)}
              className="px-3 py-1 text-sm rounded-md bg-muted hover:bg-muted/80 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-3 py-1 text-sm rounded-md bg-primary text-primary-foreground hover:bg-primary/90 transition-colors"
            >
              Add
            </button>
          </div>
        </form>
      ) : (
        <button
          onClick={() => setIsOpen(true)}
          className="flex items-center gap-1 px-3 py-1.5 text-sm rounded-md bg-primary/10 hover:bg-primary/20 text-primary transition-colors w-full justify-center"
        >
          <PlusCircle className="size-4" />
          Add event
        </button>
      )}
    </div>
  );
}

// Componente para excluir um log
function LogItem({ log, index, project }: { log: ProjectLog, index: number, project: Project }) {
  const { setSelectedProject } = useProjects();

  const deleteLog = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!project.logs) return;

    const updatedLogs = project.logs.filter((_, i) => i !== index);
    const updatedProject = {
      ...project,
      logs: updatedLogs
    };

    setSelectedProject(updatedProject);
  };

  return (
    <div className="flex gap-4 items-start p-3 rounded-lg hover:bg-muted/50 transition-colors group">
      <div className="w-2 h-2 bg-primary rounded-full mt-2"></div>
      <div className="flex-1">
        <p className="text-sm text-muted-foreground mb-1">{format(new Date(log.date), 'Pp')}</p>
        <p>{log.message}</p>
      </div>
      <button
        onClick={deleteLog}
        className="opacity-0 group-hover:opacity-100 transition-opacity text-muted-foreground hover:text-destructive mt-1"
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M3 6h18"></path>
          <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"></path>
          <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"></path>
        </svg>
      </button>
    </div>
  );
}

// Componente de card para preview de projeto
function ProjectPreviewCard({ project, onClick }: { project: Project, onClick: () => void }) {
  return (
    <div
      className="p-4 border rounded-lg hover:bg-muted/50 cursor-pointer transition-colors"
      onClick={onClick}
    >
      <h3 className="text-lg font-medium">{project.name}</h3>
      <p className="text-sm text-muted-foreground line-clamp-2 mt-1">{project.description}</p>

      <div className="flex flex-wrap gap-1 mt-2">
        {project.stack.slice(0, 3).map(tech => (
          <span key={tech} className="px-1.5 py-0.5 bg-secondary text-secondary-foreground rounded text-xs">
            {tech}
          </span>
        ))}
        {project.stack.length > 3 && (
          <span className="px-1.5 py-0.5 bg-secondary text-secondary-foreground rounded text-xs">
            +{project.stack.length - 3}
          </span>
        )}
      </div>
    </div>
  );
}

export default function Account() {
  const { selectedProject, searchResults, setSelectedProject, searchTerm, projects } = useProjects();

  // Se tiver um projeto selecionado, mostrar os detalhes
  if (selectedProject) {
    return <ProjectMarkdown project={selectedProject} />;
  }

  if (searchTerm && searchResults.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center h-full text-center space-y-4">
        <h1 className="text-2xl font-bold">No results found for &quot;{searchTerm}&quot;</h1>
      </div>
    );
  }

  // Se tiver resultados de busca, mostrar lista de previews
  if (searchResults.length > 0) {
    return (
      <div className="space-y-4">
        <h2 className="text-xl font-semibold">Search Results for &quot;{searchTerm}&quot;</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {searchResults.map(project => (
            <ProjectPreviewCard
              key={project.id}
              project={project}
              onClick={() => setSelectedProject(project)}
            />
          ))}
        </div>
      </div>
    );
  }

  // Estado inicial ou sem resultado de busca
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-center">Welcome to Project Dashboard</h2>
        <NewProjectButton />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-7xl mx-auto">
        {projects.map(project => (
          <div
            key={project.id}
            className="border rounded-lg shadow-sm hover:shadow-md transition-all p-4 cursor-pointer group"
            onClick={() => setSelectedProject(project)}
          >
            <div className="flex justify-between items-start">
              <h3 className="text-xl font-semibold">{project.name}</h3>
              <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                <EditProjectButton project={project} />
                <DeleteProjectButton project={project} />
              </div>
            </div>

            <p className="text-muted-foreground mt-2 mb-3 line-clamp-2">{project.description}</p>

            <div className="flex flex-wrap gap-2 mt-3">
              {project.stack.map(tech => {
                return (
                  <span key={tech} className={`px-2 py-1 rounded-md text-xs font-medium border border-border`}>
                    {tech}
                  </span>
                );
              })}
            </div>

            <div className="flex justify-between items-center mt-4 text-xs text-muted-foreground">
              <div>
                Priority: <span className={`font-medium ${project.priority === 'high' ? 'text-red-500 dark:text-red-400' : ''
                  }`}>
                  {project.priority === 'high' ? 'High' :
                    project.priority === 'medium' ? 'Medium' :
                      'Low'}
                </span>
              </div>
              <div>
                {new Date(project.startDate).toLocaleDateString('pt-BR')}
                {project.endDate && ` - ${new Date(project.endDate).toLocaleDateString('pt-BR')}`}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
