# Vibecode App - Technical Architecture

## 🏗️ System Architecture

### High-Level Overview

```
┌─────────────────────────────────────────────────────────────┐
│                     Mobile App (React Native)                │
├─────────────────────────────────────────────────────────────┤
│  ┌─────────────┐  ┌──────────────┐  ┌──────────────────┐   │
│  │   Editor    │  │  Chat UI     │  │  Project Mgmt    │   │
│  │  Component  │  │              │  │                  │   │
│  └─────────────┘  └──────────────┘  └──────────────────┘   │
│                                                              │
│  ┌──────────────────────────────────────────────────────┐   │
│  │         State Management (Zustand/Redux)             │   │
│  └──────────────────────────────────────────────────────┘   │
└─────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────┐
│                    Backend API (Node.js/Express)             │
├─────────────────────────────────────────────────────────────┤
│  ┌──────────┐  ┌──────────┐  ┌──────────┐  ┌──────────┐   │
│  │   Auth   │  │  Agent   │  │ Project  │  │ Payments │   │
│  │ Service  │  │ Service  │  │ Service  │  │ Service  │   │
│  └──────────┘  └──────────┘  └──────────┘  └──────────┘   │
└─────────────────────────────────────────────────────────────┘
                              │
                ┌─────────────┼─────────────┐
                ▼             ▼             ▼
┌──────────────────┐  ┌──────────────┐  ┌──────────────┐
│   PostgreSQL     │  │  AI APIs     │  │   Stripe     │
│   (Supabase)     │  │  (Claude,    │  │   RevenueCat │
│                  │  │   OpenAI)    │  │              │
└──────────────────┘  └──────────────┘  └──────────────┘
```

## 📱 Frontend Architecture (React Native)

### Tech Stack
- **Framework**: React Native with Expo
- **Language**: TypeScript
- **State Management**: Zustand (lightweight, scalable)
- **Navigation**: React Navigation v6
- **UI Components**: React Native Paper + Custom components
- **Code Editor**: react-native-code-editor (Monaco-based)
- **Syntax Highlighting**: Prism.js for React Native
- **API Client**: Axios with interceptors
- **Real-time**: Socket.io-client
- **Storage**: AsyncStorage + react-native-mmkv (fast)
- **Authentication**: Supabase Auth SDK
- **Payments**: react-native-purchases (RevenueCat)

### Project Structure
```
/src
  /components
    /Editor          # Code editor components
    /Chat            # Chat interface
    /Project         # Project management
    /Common          # Shared components
  /screens
    /Auth            # Login, signup
    /Home            # Main dashboard
    /Editor          # Code editing screen
    /Projects        # Project list
    /Settings        # User settings
  /services
    /api             # API client
    /ai              # AI agent service
    /storage         # Local storage
  /store             # Zustand stores
  /types             # TypeScript types
  /utils             # Utility functions
  /hooks             # Custom React hooks
  /navigation        # Navigation config
  /theme             # Theme & styling
```

### Key Components

#### 1. Code Editor Component
```typescript
<CodeEditor
  code={code}
  language="javascript"
  theme="dracula"
  onCodeChange={handleCodeChange}
  aiSuggestions={suggestions}
  autoComplete={true}
/>
```

#### 2. AI Chat Component
```typescript
<AIChat
  messages={messages}
  onSendMessage={handleSend}
  model="claude-3.5-sonnet"
  context={currentFile}
/>
```

#### 3. Project Manager
```typescript
<ProjectManager
  projects={projects}
  onSelectProject={handleSelect}
  onCreateProject={handleCreate}
/>
```

## 🔧 Backend Architecture

### Tech Stack
- **Runtime**: Node.js 20+ with TypeScript
- **Framework**: Express.js
- **Database**: PostgreSQL (via Supabase)
- **ORM**: Prisma
- **Authentication**: Supabase Auth
- **Real-time**: Socket.io
- **Queue**: Bull (Redis-based)
- **Cache**: Redis
- **File Storage**: Supabase Storage / AWS S3
- **API Documentation**: OpenAPI/Swagger

### Project Structure
```
/backend
  /src
    /controllers      # Route handlers
    /services         # Business logic
    /models           # Database models
    /middleware       # Express middleware
    /routes           # API routes
    /workers          # Background jobs
    /utils            # Utilities
    /config           # Configuration
  /prisma             # Database schema
  /tests              # Unit & integration tests
```

### API Structure

#### Core Endpoints
```
/api/v1
  /auth
    POST   /signup
    POST   /login
    POST   /logout
    POST   /refresh

  /users
    GET    /me
    PATCH  /me
    DELETE /me

  /projects
    GET    /
    POST   /
    GET    /:id
    PATCH  /:id
    DELETE /:id

  /files
    GET    /:projectId
    POST   /:projectId
    GET    /:projectId/:fileId
    PATCH  /:projectId/:fileId
    DELETE /:projectId/:fileId

  /ai
    POST   /chat
    POST   /complete
    POST   /generate
    GET    /models

  /subscriptions
    GET    /plans
    POST   /subscribe
    GET    /status
    POST   /cancel

  /usage
    GET    /stats
    GET    /limits
```

## 🤖 AI Agent Service Architecture

### Multi-Model Support
```typescript
interface AIProvider {
  name: string;
  models: string[];
  generateCode(prompt: string, context: Context): Promise<string>;
  chat(messages: Message[]): Promise<string>;
  complete(code: string, cursor: Position): Promise<string>;
}

// Supported providers
- Anthropic (Claude)
- OpenAI (GPT-4)
- Google (Gemini)
- Mistral
- Ollama (self-hosted)
```

### AI Agent Types

1. **Code Completion Agent**
   - Inline suggestions
   - Multi-line completions
   - Context-aware

2. **Chat Agent**
   - Conversational coding assistant
   - Explain code
   - Debug assistance

3. **Generation Agent**
   - Generate full functions/classes
   - Create projects from descriptions
   - Refactor code

4. **Review Agent**
   - Code review
   - Bug detection
   - Security scanning

### Context Management
```typescript
interface CodeContext {
  currentFile: File;
  openFiles: File[];
  projectStructure: FileTree;
  recentChanges: Change[];
  dependencies: Package[];
  language: string;
  framework?: string;
}
```

## 💾 Database Schema (Prisma)

```prisma
// User Management
model User {
  id            String    @id @default(uuid())
  email         String    @unique
  name          String?
  avatar        String?
  createdAt     DateTime  @default(now())
  updatedAt     DateTime  @updatedAt

  subscription  Subscription?
  projects      Project[]
  usage         Usage[]
}

model Subscription {
  id            String    @id @default(uuid())
  userId        String    @unique
  user          User      @relation(fields: [userId], references: [id])

  tier          SubscriptionTier
  status        SubscriptionStatus
  currentPeriodStart DateTime
  currentPeriodEnd   DateTime

  stripeCustomerId     String?
  stripeSubscriptionId String?

  createdAt     DateTime  @default(now())
  updatedAt     DateTime  @updatedAt
}

enum SubscriptionTier {
  FREE
  PRO
  TEAM
  ENTERPRISE
}

enum SubscriptionStatus {
  ACTIVE
  CANCELED
  PAST_DUE
  TRIALING
}

// Project Management
model Project {
  id            String    @id @default(uuid())
  name          String
  description   String?
  userId        String
  user          User      @relation(fields: [userId], references: [id])

  files         File[]
  createdAt     DateTime  @default(now())
  updatedAt     DateTime  @updatedAt
}

model File {
  id            String    @id @default(uuid())
  projectId     String
  project       Project   @relation(fields: [projectId], references: [id])

  path          String
  content       String    @db.Text
  language      String

  createdAt     DateTime  @default(now())
  updatedAt     DateTime  @updatedAt

  @@unique([projectId, path])
}

// Usage Tracking
model Usage {
  id            String    @id @default(uuid())
  userId        String
  user          User      @relation(fields: [userId], references: [id])

  type          UsageType
  model         String?
  tokens        Int?
  cost          Float?

  timestamp     DateTime  @default(now())
}

enum UsageType {
  AI_REQUEST
  CODE_COMPLETION
  CODE_GENERATION
  CHAT_MESSAGE
  CODE_EXECUTION
}

// AI Conversations
model Conversation {
  id            String    @id @default(uuid())
  userId        String
  projectId     String?

  messages      Message[]

  createdAt     DateTime  @default(now())
  updatedAt     DateTime  @updatedAt
}

model Message {
  id              String        @id @default(uuid())
  conversationId  String
  conversation    Conversation  @relation(fields: [conversationId], references: [id])

  role            MessageRole
  content         String        @db.Text
  model           String?

  createdAt       DateTime      @default(now())
}

enum MessageRole {
  USER
  ASSISTANT
  SYSTEM
}
```

## 🔐 Security Architecture

### Authentication Flow
1. User signs up/logs in via Supabase Auth
2. Receives JWT access token (1 hour expiry)
3. Receives refresh token (30 days expiry)
4. Access token sent with each API request
5. Middleware validates token
6. Refresh token used to get new access token

### API Security
- Rate limiting (express-rate-limit)
- CORS configured for mobile app
- Input validation (Zod)
- SQL injection prevention (Prisma)
- XSS protection (helmet.js)
- HTTPS only in production

### Data Protection
- Passwords hashed (bcrypt)
- API keys encrypted (AES-256)
- Sensitive data encrypted at rest
- PII anonymization in logs

## 📊 Usage Tracking & Rate Limiting

### Rate Limits by Tier

| Tier | AI Requests/Month | Requests/Minute | Projects | Storage |
|------|-------------------|-----------------|----------|---------|
| Free | 50 | 3 | 3 | 100MB |
| Pro | Unlimited | 10 | Unlimited | 10GB |
| Team | Unlimited | 20 | Unlimited | 50GB |
| Enterprise | Unlimited | 50 | Unlimited | 500GB |

### Implementation
```typescript
// Rate limiter middleware
const rateLimiter = rateLimit({
  windowMs: 60 * 1000, // 1 minute
  max: (req) => {
    const tier = req.user.subscription.tier;
    return RATE_LIMITS[tier];
  },
  message: 'Rate limit exceeded. Upgrade your plan for higher limits.',
});
```

## 🚀 Deployment Architecture

### Infrastructure
```
┌────────────────────────────────────────┐
│         Cloudflare (CDN & WAF)         │
└────────────────────────────────────────┘
                  │
                  ▼
┌────────────────────────────────────────┐
│         Load Balancer (AWS ALB)        │
└────────────────────────────────────────┘
                  │
        ┌─────────┴─────────┐
        ▼                   ▼
┌──────────────┐    ┌──────────────┐
│   API Server │    │  API Server  │
│   (ECS/K8s)  │    │  (ECS/K8s)   │
└──────────────┘    └──────────────┘
        │                   │
        └─────────┬─────────┘
                  ▼
        ┌──────────────────┐
        │   PostgreSQL     │
        │   (RDS/Supabase) │
        └──────────────────┘
```

### Hosting Options

#### Option 1: Full AWS
- **Frontend**: Expo EAS for app distribution
- **Backend**: ECS Fargate / EKS
- **Database**: RDS PostgreSQL
- **Storage**: S3
- **Cache**: ElastiCache Redis
- **Cost**: ~$200-500/month starting

#### Option 2: Supabase + Vercel (Recommended for MVP)
- **Frontend**: Expo EAS
- **Backend**: Vercel Serverless Functions
- **Database**: Supabase (PostgreSQL)
- **Storage**: Supabase Storage
- **Real-time**: Supabase Real-time
- **Cost**: ~$50-100/month starting

#### Option 3: Railway (Easiest)
- **All-in-one**: Railway for everything
- **Cost**: ~$20-50/month starting

## 📈 Scalability Considerations

### Horizontal Scaling
- Stateless API servers
- Load balancer distribution
- Database read replicas
- Redis cluster for caching

### Vertical Scaling
- Optimize database queries
- Implement caching strategy
- Use CDN for static assets
- Compress API responses

### AI Cost Optimization
- Cache common completions
- Use smaller models for simple tasks
- Implement prompt compression
- Batch requests when possible

## 🧪 Testing Strategy

### Frontend
- Unit tests: Jest + React Native Testing Library
- E2E tests: Detox
- Visual regression: Chromatic

### Backend
- Unit tests: Jest
- Integration tests: Supertest
- Load testing: Artillery

### CI/CD
- GitHub Actions
- Automated testing on PR
- Automated deployment on merge

## 📱 Mobile App Distribution

### iOS
- Apple Developer Account ($99/year)
- App Store submission
- TestFlight for beta testing

### Android
- Google Play Console ($25 one-time)
- Play Store submission
- Internal testing track

### Updates
- OTA updates via Expo for non-native changes
- App Store/Play Store for native changes

## 🔄 Real-time Features

### WebSocket Events
```typescript
// Client → Server
- 'code:edit'       // Live code editing
- 'ai:request'      // AI request
- 'project:sync'    // Project synchronization

// Server → Client
- 'ai:response'     // AI response streaming
- 'ai:complete'     // Completion finished
- 'sync:update'     // Project update
```

## 🎯 Performance Targets

- **App Launch**: < 2 seconds
- **AI Response**: < 3 seconds (first token)
- **Code Editor**: 60 FPS
- **API Response**: < 200ms (p95)
- **Database Query**: < 50ms (p95)

## 🔌 Third-party Integrations

### Required
- Anthropic/OpenAI API (AI)
- Stripe (payments)
- RevenueCat (subscription management)
- Supabase (backend)

### Optional
- GitHub API (code export)
- GitLab API
- Discord API (community)
- Slack API (team notifications)

---

This architecture is designed to be:
- **Scalable**: Handle growth from 100 to 100,000 users
- **Cost-effective**: Start cheap, scale as revenue grows
- **Maintainable**: Clean code structure, well-documented
- **Secure**: Industry-standard security practices
- **Fast**: Optimized for mobile performance
