import { create } from 'zustand';
import { Project, ProjectFile } from '../types';

interface ProjectState {
  projects: Project[];
  currentProject: Project | null;
  isLoading: boolean;
  error: string | null;

  // Actions
  setProjects: (projects: Project[]) => void;
  setCurrentProject: (project: Project | null) => void;
  fetchProjects: () => Promise<void>;
  createProject: (name: string, language: string) => Promise<void>;
  updateProject: (id: string, updates: Partial<Project>) => Promise<void>;
  deleteProject: (id: string) => Promise<void>;

  // File operations
  createFile: (projectId: string, path: string, content: string, language: string) => Promise<void>;
  updateFile: (projectId: string, fileId: string, content: string) => Promise<void>;
  deleteFile: (projectId: string, fileId: string) => Promise<void>;
}

export const useProjectStore = create<ProjectState>((set, get) => ({
  projects: [],
  currentProject: null,
  isLoading: false,
  error: null,

  setProjects: (projects) => set({ projects }),
  setCurrentProject: (currentProject) => set({ currentProject }),

  fetchProjects: async () => {
    set({ isLoading: true, error: null });
    try {
      // TODO: Fetch from API
      // const response = await api.get('/projects');
      // set({ projects: response.data });

      // Mock data for now
      const mockProjects: Project[] = [
        {
          id: '1',
          name: 'My First App',
          description: 'A simple React Native app',
          language: 'typescript',
          framework: 'react-native',
          userId: 'user1',
          files: [],
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        },
      ];
      set({ projects: mockProjects });
    } catch (error: any) {
      set({ error: error.message });
    } finally {
      set({ isLoading: false });
    }
  },

  createProject: async (name, language) => {
    set({ isLoading: true, error: null });
    try {
      // TODO: Create via API
      console.log('Creating project:', name, language);
    } catch (error: any) {
      set({ error: error.message });
    } finally {
      set({ isLoading: false });
    }
  },

  updateProject: async (id, updates) => {
    set({ isLoading: true, error: null });
    try {
      // TODO: Update via API
      console.log('Updating project:', id, updates);
    } catch (error: any) {
      set({ error: error.message });
    } finally {
      set({ isLoading: false });
    }
  },

  deleteProject: async (id) => {
    set({ isLoading: true, error: null });
    try {
      // TODO: Delete via API
      console.log('Deleting project:', id);
      const projects = get().projects.filter(p => p.id !== id);
      set({ projects });
    } catch (error: any) {
      set({ error: error.message });
    } finally {
      set({ isLoading: false });
    }
  },

  createFile: async (projectId, path, content, language) => {
    try {
      // TODO: Create file via API
      console.log('Creating file:', projectId, path);
    } catch (error: any) {
      set({ error: error.message });
    }
  },

  updateFile: async (projectId, fileId, content) => {
    try {
      // TODO: Update file via API
      console.log('Updating file:', projectId, fileId);
    } catch (error: any) {
      set({ error: error.message });
    }
  },

  deleteFile: async (projectId, fileId) => {
    try {
      // TODO: Delete file via API
      console.log('Deleting file:', projectId, fileId);
    } catch (error: any) {
      set({ error: error.message });
    }
  },
}));
