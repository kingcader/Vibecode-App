// User Types
export interface User {
  id: string;
  email: string;
  name?: string;
  avatar?: string;
  createdAt: string;
  subscription: Subscription;
}

export interface Subscription {
  id: string;
  tier: SubscriptionTier;
  status: SubscriptionStatus;
  currentPeriodStart: string;
  currentPeriodEnd: string;
  aiRequestsUsed: number;
  aiRequestsLimit: number;
}

export enum SubscriptionTier {
  FREE = 'FREE',
  PRO = 'PRO',
  TEAM = 'TEAM',
  ENTERPRISE = 'ENTERPRISE',
}

export enum SubscriptionStatus {
  ACTIVE = 'ACTIVE',
  CANCELED = 'CANCELED',
  PAST_DUE = 'PAST_DUE',
  TRIALING = 'TRIALING',
}

// Project Types
export interface Project {
  id: string;
  name: string;
  description?: string;
  language: string;
  framework?: string;
  userId: string;
  files: ProjectFile[];
  createdAt: string;
  updatedAt: string;
}

export interface ProjectFile {
  id: string;
  projectId: string;
  path: string;
  content: string;
  language: string;
  createdAt: string;
  updatedAt: string;
}

// AI Types
export interface AIMessage {
  id: string;
  role: MessageRole;
  content: string;
  timestamp: string;
  model?: string;
  tokens?: number;
}

export enum MessageRole {
  USER = 'USER',
  ASSISTANT = 'ASSISTANT',
  SYSTEM = 'SYSTEM',
}

export interface AIProvider {
  id: string;
  name: string;
  models: AIModel[];
}

export interface AIModel {
  id: string;
  name: string;
  description: string;
  contextWindow: number;
  costPer1kTokens: number;
}

export interface CodeCompletion {
  text: string;
  position: Position;
  language: string;
}

export interface Position {
  line: number;
  column: number;
}

// Chat Types
export interface Conversation {
  id: string;
  projectId?: string;
  messages: AIMessage[];
  createdAt: string;
  updatedAt: string;
}

// Usage Types
export interface Usage {
  id: string;
  userId: string;
  type: UsageType;
  model?: string;
  tokens?: number;
  cost?: number;
  timestamp: string;
}

export enum UsageType {
  AI_REQUEST = 'AI_REQUEST',
  CODE_COMPLETION = 'CODE_COMPLETION',
  CODE_GENERATION = 'CODE_GENERATION',
  CHAT_MESSAGE = 'CHAT_MESSAGE',
  CODE_EXECUTION = 'CODE_EXECUTION',
}

// API Response Types
export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: ApiError;
}

export interface ApiError {
  code: string;
  message: string;
  details?: any;
}

// Editor Types
export interface EditorState {
  content: string;
  cursorPosition: Position;
  selection?: {
    start: Position;
    end: Position;
  };
  language: string;
}

export interface CodeSuggestion {
  text: string;
  position: Position;
  confidence: number;
}

// Settings Types
export interface UserSettings {
  theme: 'light' | 'dark' | 'auto';
  fontSize: number;
  tabSize: number;
  autoSave: boolean;
  aiModel: string;
  aiProvider: string;
  notifications: NotificationSettings;
}

export interface NotificationSettings {
  aiResponses: boolean;
  projectUpdates: boolean;
  subscriptionAlerts: boolean;
  marketing: boolean;
}

// Subscription Plans
export interface SubscriptionPlan {
  id: string;
  tier: SubscriptionTier;
  name: string;
  price: number;
  billingPeriod: 'monthly' | 'yearly';
  features: string[];
  aiRequestsLimit: number;
  projectsLimit: number;
  storageLimit: number; // in MB
}
