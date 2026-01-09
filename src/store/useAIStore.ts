import { create } from 'zustand';
import { AIMessage, Conversation, AIModel } from '../types';

interface AIState {
  conversations: Conversation[];
  currentConversation: Conversation | null;
  isGenerating: boolean;
  error: string | null;
  selectedModel: string;
  availableModels: AIModel[];

  // Actions
  setCurrentConversation: (conversation: Conversation | null) => void;
  sendMessage: (content: string, projectId?: string) => Promise<void>;
  generateCode: (prompt: string, context?: any) => Promise<string>;
  getCompletion: (code: string, cursor: { line: number; column: number }) => Promise<string>;
  setSelectedModel: (modelId: string) => void;
  fetchAvailableModels: () => Promise<void>;
}

export const useAIStore = create<AIState>((set, get) => ({
  conversations: [],
  currentConversation: null,
  isGenerating: false,
  error: null,
  selectedModel: 'claude-3.5-sonnet',
  availableModels: [],

  setCurrentConversation: (currentConversation) => set({ currentConversation }),

  sendMessage: async (content, projectId) => {
    set({ isGenerating: true, error: null });
    try {
      // TODO: Send message to API
      // const response = await api.post('/ai/chat', { content, projectId });

      // Mock response for now
      const userMessage: AIMessage = {
        id: Math.random().toString(),
        role: 'USER' as any,
        content,
        timestamp: new Date().toISOString(),
      };

      const assistantMessage: AIMessage = {
        id: Math.random().toString(),
        role: 'ASSISTANT' as any,
        content: 'This is a mock response. AI integration coming soon!',
        timestamp: new Date().toISOString(),
        model: get().selectedModel,
      };

      const currentConv = get().currentConversation;
      if (currentConv) {
        const updated: Conversation = {
          ...currentConv,
          messages: [...currentConv.messages, userMessage, assistantMessage],
          updatedAt: new Date().toISOString(),
        };
        set({ currentConversation: updated });
      } else {
        const newConv: Conversation = {
          id: Math.random().toString(),
          projectId,
          messages: [userMessage, assistantMessage],
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        };
        set({
          currentConversation: newConv,
          conversations: [...get().conversations, newConv],
        });
      }
    } catch (error: any) {
      set({ error: error.message });
    } finally {
      set({ isGenerating: false });
    }
  },

  generateCode: async (prompt, context) => {
    set({ isGenerating: true, error: null });
    try {
      // TODO: Generate code via API
      // const response = await api.post('/ai/generate', { prompt, context });
      // return response.data.code;

      // Mock for now
      return `// Generated code for: ${prompt}\nfunction example() {\n  console.log("Hello, World!");\n}`;
    } catch (error: any) {
      set({ error: error.message });
      throw error;
    } finally {
      set({ isGenerating: false });
    }
  },

  getCompletion: async (code, cursor) => {
    try {
      // TODO: Get code completion via API
      // const response = await api.post('/ai/complete', { code, cursor });
      // return response.data.completion;

      // Mock for now
      return 'completion';
    } catch (error: any) {
      set({ error: error.message });
      throw error;
    }
  },

  setSelectedModel: (selectedModel) => set({ selectedModel }),

  fetchAvailableModels: async () => {
    try {
      // TODO: Fetch models from API
      const mockModels: AIModel[] = [
        {
          id: 'claude-3.5-sonnet',
          name: 'Claude 3.5 Sonnet',
          description: 'Most capable model for coding',
          contextWindow: 200000,
          costPer1kTokens: 0.003,
        },
        {
          id: 'gpt-4-turbo',
          name: 'GPT-4 Turbo',
          description: 'OpenAI\'s most capable model',
          contextWindow: 128000,
          costPer1kTokens: 0.01,
        },
      ];
      set({ availableModels: mockModels });
    } catch (error: any) {
      set({ error: error.message });
    }
  },
}));
