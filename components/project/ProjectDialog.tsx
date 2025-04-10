'use client'

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { useProjects } from "@/lib/contexts/ProjectContext";
import { Project } from "@/lib/types";
import { Edit2, Plus, PlusCircle } from "lucide-react";
import { useState } from "react";
import { v4 as uuidv4 } from 'uuid';
import { SidebarMenuButton } from "../ui/sidebar";
import { SidebarMenuItem } from "../ui/sidebar";
import { SidebarMenu } from "../ui/sidebar";

type ProjectFormProps = {
  project?: Project;
  onOpenChange: (open: boolean) => void;
}

const defaultProject: Partial<Project> = {
  name: "",
  description: "",
  stack: [],
  status: "in planning",
  startDate: new Date().toISOString(),
  endDate: null,
  repository: "",
  tags: [],
  priority: "medium",
  logs: [],
  todo: [],
  ideas: []
};

function ProjectForm({ project, onOpenChange }: ProjectFormProps) {
  const { projects, setProjects } = useProjects();
  const [formData, setFormData] = useState<Partial<Project>>(
    project || defaultProject
  );
  const [tagInput, setTagInput] = useState("");
  const [stackInput, setStackInput] = useState("");

  const isEditing = !!project;

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSelectChange = (name: string, value: string) => {
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const addTag = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && tagInput.trim()) {
      e.preventDefault();
      setFormData({
        ...formData,
        tags: [...(formData.tags || []), tagInput.trim()]
      });
      setTagInput("");
    }
  };

  const removeTag = (tag: string) => {
    setFormData({
      ...formData,
      tags: (formData.tags || []).filter(t => t !== tag)
    });
  };

  const addStackItem = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && stackInput.trim()) {
      e.preventDefault();
      setFormData({
        ...formData,
        stack: [...(formData.stack || []), stackInput.trim()]
      });
      setStackInput("");
    }
  };

  const removeStackItem = (item: string) => {
    setFormData({
      ...formData,
      stack: (formData.stack || []).filter(t => t !== item)
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.name?.trim()) return;

    if (isEditing && project) {
      // Update existing project
      const updatedProjects = projects.map(p =>
        p.id === project.id ? { ...formData as Project } : p
      );
      setProjects(updatedProjects);
    } else {
      // Create new project
      const newProject = {
        ...formData,
        id: uuidv4()
      } as Project;

      setProjects([...projects, newProject]);
    }

    onOpenChange(false);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="space-y-4">
        <div className="grid gap-2">
          <Label htmlFor="name">Project Name</Label>
          <Input
            id="name"
            name="name"
            value={formData.name || ""}
            onChange={handleInputChange}
            placeholder="Enter project name"
            required
          />
        </div>

        <div className="grid gap-2">
          <Label htmlFor="description">Description</Label>
          <Textarea
            id="description"
            name="description"
            value={formData.description || ""}
            onChange={handleInputChange}
            placeholder="Describe your project"
            className="min-h-[80px]"
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="grid gap-2">
            <Label htmlFor="status">Status</Label>
            <Select
              value={formData.status}
              onValueChange={(value) => handleSelectChange("status", value)}
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="in planning">In Planning</SelectItem>
                <SelectItem value="in development">In Development</SelectItem>
                <SelectItem value="completed">Completed</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="grid gap-2">
            <Label htmlFor="priority">Priority</Label>
            <Select
              value={formData.priority}
              onValueChange={(value) => handleSelectChange("priority", value)}
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select priority" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="low">Low</SelectItem>
                <SelectItem value="medium">Medium</SelectItem>
                <SelectItem value="high">High</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="grid gap-2">
          <Label htmlFor="repository">Repository URL</Label>
          <Input
            id="repository"
            name="repository"
            value={formData.repository || ""}
            onChange={handleInputChange}
            placeholder="https://github.com/username/repo"
          />
        </div>

        <div className="grid gap-2">
          <Label htmlFor="stack">Tech Stack (press Enter to add)</Label>
          <Input
            id="stack"
            value={stackInput}
            onChange={(e) => setStackInput(e.target.value)}
            onKeyDown={addStackItem}
            placeholder="Add technology"
          />
          {(formData.stack || []).length > 0 && (
            <div className="flex flex-wrap gap-2 mt-2">
              {(formData.stack || []).map((tech, i) => (
                <div
                  key={i}
                  className="px-2 py-1 bg-secondary text-secondary-foreground rounded-md text-sm flex items-center gap-1"
                >
                  {tech}
                  <button
                    type="button"
                    onClick={() => removeStackItem(tech)}
                    className="text-muted-foreground hover:text-destructive ml-1"
                  >
                    &times;
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="grid gap-2">
          <Label htmlFor="tags">Tags (press Enter to add)</Label>
          <Input
            id="tags"
            value={tagInput}
            onChange={(e) => setTagInput(e.target.value)}
            onKeyDown={addTag}
            placeholder="Add tag"
          />
          {(formData.tags || []).length > 0 && (
            <div className="flex flex-wrap gap-2 mt-2">
              {(formData.tags || []).map((tag, i) => (
                <div
                  key={i}
                  className="px-2 py-1 bg-muted text-muted-foreground rounded-md text-sm flex items-center gap-1"
                >
                  #{tag}
                  <button
                    type="button"
                    onClick={() => removeTag(tag)}
                    className="text-muted-foreground hover:text-destructive ml-1"
                  >
                    &times;
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      <DialogFooter>
        <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
          Cancel
        </Button>
        <Button type="submit">
          {isEditing ? 'Update Project' : 'Create Project'}
        </Button>
      </DialogFooter>
    </form>
  );
}

interface ProjectDialogProps {
  project?: Project;
  trigger: React.ReactNode;
}

export function ProjectDialog({ project, trigger }: ProjectDialogProps) {
  const [open, setOpen] = useState(false);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {trigger}
      </DialogTrigger>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>
            {project ? 'Edit Project' : 'Create New Project'}
          </DialogTitle>
          <DialogDescription>
            {project
              ? 'Update project details and settings.'
              : 'Fill in the information to create a new project.'}
          </DialogDescription>
        </DialogHeader>
        <ProjectForm project={project} onOpenChange={setOpen} />
      </DialogContent>
    </Dialog>
  );
}

export function NewProjectButton() {
  return (
    <ProjectDialog
      trigger={
        <Button className="gap-2 w-full sm:w-auto">
          <PlusCircle className="size-4" />
          New Project
        </Button>
      }
    />
  );
}

export function NewProjectSmallButton() {
  return (
    <ProjectDialog
      trigger={
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
      }
    />
  );
}

export function EditProjectButton({ project }: { project: Project }) {
  return (
    <ProjectDialog
      project={project}
      trigger={
        <Button variant="ghost" size="icon" className="h-8 w-8">
          <Edit2 className="size-4" />
        </Button>
      }
    />
  );
} 