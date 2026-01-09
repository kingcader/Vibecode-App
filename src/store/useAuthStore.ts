import { create } from 'zustand';
import { User } from '../types';

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;

  // Actions
  setUser: (user: User | null) => void;
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
  login: (email: string, password: string) => Promise<void>;
  signup: (email: string, password: string, name: string) => Promise<void>;
  logout: () => Promise<void>;
  refreshUser: () => Promise<void>;
}

export const useAuthStore = create<AuthState>((set, get) => ({
  user: null,
  isAuthenticated: false,
  isLoading: true,
  error: null,

  setUser: (user) => set({ user, isAuthenticated: !!user }),
  setLoading: (isLoading) => set({ isLoading }),
  setError: (error) => set({ error }),

  login: async (email, password) => {
    set({ isLoading: true, error: null });
    try {
      // TODO: Implement Supabase login
      // const { data, error } = await supabase.auth.signInWithPassword({ email, password });
      // if (error) throw error;
      // const user = await fetchUserProfile(data.user.id);
      // set({ user, isAuthenticated: true });

      // Mock for now
      console.log('Login:', email);
      set({ error: 'Authentication not yet implemented' });
    } catch (error: any) {
      set({ error: error.message });
    } finally {
      set({ isLoading: false });
    }
  },

  signup: async (email, password, name) => {
    set({ isLoading: true, error: null });
    try {
      // TODO: Implement Supabase signup
      console.log('Signup:', email, name);
      set({ error: 'Authentication not yet implemented' });
    } catch (error: any) {
      set({ error: error.message });
    } finally {
      set({ isLoading: false });
    }
  },

  logout: async () => {
    set({ isLoading: true, error: null });
    try {
      // TODO: Implement Supabase logout
      set({ user: null, isAuthenticated: false });
    } catch (error: any) {
      set({ error: error.message });
    } finally {
      set({ isLoading: false });
    }
  },

  refreshUser: async () => {
    set({ isLoading: true });
    try {
      // TODO: Implement user refresh
      // const { data } = await supabase.auth.getUser();
      // if (data.user) {
      //   const user = await fetchUserProfile(data.user.id);
      //   set({ user, isAuthenticated: true });
      // }
    } catch (error: any) {
      set({ error: error.message });
    } finally {
      set({ isLoading: false });
    }
  },
}));
