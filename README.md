# AI Project Generator

![Version](https://img.shields.io/badge/version-1.0.0-blue)
![License](https://img.shields.io/badge/license-MIT-green)
![Node](https://img.shields.io/badge/node-%3E%3D16.0.0-brightgreen)

A full-stack web application that generates creative project ideas using AI technology. This application helps developers, students, and teams discover innovative project concepts tailored to their skill level, domain expertise, and project constraints.

## 📋 Table of Contents

- [Features](#features)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Configuration](#configuration)
- [Running the Application](#running-the-application)
- [API Documentation](#api-documentation)
- [Database Schema](#database-schema)
- [Deployment](#deployment)
- [Development](#development)
- [Environment Variables](#environment-variables)
- [Contributing](#contributing)
- [License](#license)

## ✨ Features

### Core Functionality
- **AI-Powered Project Generation**: Generate unique and creative project ideas using OpenAI API
- **Customizable Parameters**: Filter projects by:
  - **Domain**: Choose from multiple technical domains (Web Dev, Mobile, AI/ML, DevOps, etc.)
  - **Skill Level**: Beginner, Intermediate, Advanced
  - **Team Size**: Solo, 2-3 people, 4-5 people, 6+ people
  - **Time Limit**: 2 weeks, 1 month, 3 months, 6 months, 1 year
  - **Strictness Level**: Conservative, Moderate, Aggressive
  - **Project Type**: Personal, Educational, Startup, Open Source
  - **Complexity**: Low, Medium, High

- **Project History**: Save and view previously generated project ideas
- **Dark/Light Mode**: Responsive theme switching for comfortable viewing
- **Responsive Design**: Works seamlessly on desktop and mobile devices

### Technical Features
- **WebSocket Support**: Real-time communication capabilities
- **Error Handling**: Comprehensive error handling and user feedback
- **Type Safety**: Full TypeScript support across frontend and backend
- **Database Persistence**: PostgreSQL with Drizzle ORM for data management
- **Performance Optimized**: Cold start optimization with selective dependency bundling

## 🛠 Tech Stack

### Frontend
- **Framework**: React 18+ with TypeScript
- **Build Tool**: Vite
- **Styling**: Tailwind CSS + PostCSS
- **UI Components**: Radix UI (shadcn/ui)
- **Forms**: React Hook Form + Zod validation
- **State Management**: TanStack React Query (v5)
- **Animations**: Framer Motion
- **Utilities**: Class Variance Authority, clsx, tailwind-merge

### Backend
- **Runtime**: Node.js
- **Framework**: Express.js
- **Language**: TypeScript
- **ORM**: Drizzle ORM
- **Database**: PostgreSQL
- **Session Management**: connect-pg-simple
- **API Integration**: OpenAI SDK

### DevOps & Build
- **Build System**: esbuild + Vite
- **Package Manager**: npm
- **Environment Management**: dotenv
- **TypeScript Compiler**: tsc

### Additional Tools
- **Code Generation**: tsx (TypeScript execution)
- **Cross-platform**: cross-env for environment variables

## 📁 Project Structure

```
Code-Generator/
├── client/                          # Frontend application
│   ├── src/
│   │   ├── components/             # React components
│   │   │   ├── ui/                 # Reusable UI components
│   │   │   │   ├── accordion.tsx   # Accordion component
│   │   │   │   ├── button.tsx      # Button component
│   │   │   │   ├── card.tsx        # Card component
│   │   │   │   ├── form.tsx        # Form element
│   │   │   │   └── ...             # Other shadcn/ui components
│   │   ├── hooks/                  # Custom React hooks
│   │   │   ├── use-ideas.ts        # Project ideas hook
│   │   │   ├── use-mobile.tsx      # Mobile detection hook
│   │   │   └── use-toast.ts        # Toast notifications
│   │   ├── lib/
│   │   │   ├── queryClient.ts      # React Query client setup
│   │   │   └── utils.ts            # Utility functions
│   │   ├── pages/                  # Page components
│   │   │   ├── Home.tsx            # Main home page
│   │   │   └── not-found.tsx       # 404 page
│   │   ├── App.tsx                 # Root App component
│   │   ├── main.tsx                # Entry point
│   │   └── index.css               # Global styles
│   ├── index.html                  # HTML template
│   └── requirements.md             # Frontend requirements
├── server/                          # Backend application
│   ├── replit_integrations/        # Replit-specific integrations
│   │   ├── audio/                  # Audio processing
│   │   ├── batch/                  # Batch operations
│   │   ├── chat/                   # Chat functionality
│   │   └── image/                  # Image processing
│   ├── index.ts                    # Server entry point
│   ├── routes.ts                   # API routes
│   ├── db.ts                       # Database client
│   ├── storage.ts                  # Storage utilities
│   ├── vite.ts                     # Vite dev server integration
│   └── static.ts                   # Static file serving
├── shared/                          # Shared code
│   ├── routes.ts                   # Shared route definitions
│   ├── schema.ts                   # Database schema & types
│   └── models/                     # Data models
│       └── chat.ts                 # Chat model
├── script/
│   └── build.ts                    # Custom build script
├── package.json                    # Dependencies & scripts
├── tsconfig.json                   # TypeScript configuration
├── vite.config.ts                  # Vite configuration
├── drizzle.config.ts               # Drizzle ORM configuration
├── tailwind.config.ts              # Tailwind CSS configuration
├── postcss.config.js               # PostCSS configuration
├── components.json                 # shadcn/ui component config
└── README.md                       # This file
```

## 📋 Prerequisites

- **Node.js**: v16.0.0 or higher
- **npm**: v7.0.0 or higher
- **PostgreSQL**: v12 or higher (can use Neon for cloud database)
- **OpenAI API Key** (optional): For AI-powered project generation
  - If not provided, the app uses mock data for development

## 🚀 Installation

### 1. Clone the Repository
```bash
git clone https://github.com/kshailaja455/AI-ProjectGenerator01.git
cd Code-Generator
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Set Up Environment Variables
Create a `.env` file in the root directory:
```bash
cp .env.example .env  # If available
# OR create manually and add:
DATABASE_URL=postgresql://user:password@host:port/database
OPENAI_API_KEY=your_api_key_here  # Optional
DEBUG_LOGS=false
```

### 4. Initialize Database
```bash
npm run db:push
```

This command will:
- Create the PostgreSQL database schema
- Set up the `project_ideas` table
- Prepare the database for the application

## ⚙️ Configuration

### Environment Variables

| Variable | Required | Description | Default |
|----------|----------|-------------|---------|
| `DATABASE_URL` | Yes | PostgreSQL connection string | N/A |
| `OPENAI_API_KEY` | No | OpenAI API key for AI features | N/A (uses mock data) |
| `NODE_ENV` | No | Environment mode (development/production) | development |
| `PORT` | No | Server port | 5000 |
| `DEBUG_LOGS` | No | Enable console logging | true |

### Database Connection String Format
```
postgresql://[user]:[password]@[host]:[port]/[database]?sslmode=require
```

Example using Neon:
```
postgresql://neondb_owner:npg_xxxxx@ep-xxxxx-pooler.c-4.us-east-1.aws.neon.tech/neondb?sslmode=require&channel_binding=require
```

## 📖 Running the Application

### Development Mode
```bash
npm run dev
```
Runs both frontend (Vite dev server) and backend (Express) in development mode.
- Frontend: http://localhost:5173
- Backend: http://localhost:5000
- Live hot module reloading enabled

### Production Build
```bash
npm run build
```
Creates optimized production build:
- Frontend bundle: `dist/public/`
- Backend bundle: `dist/index.cjs`
- Minified code with tree-shaking

### Production Start
```bash
npm start
```
Runs the production-built application.
- Serves frontend from `dist/public/`
- Backend on configured PORT (default: 5000)

### Type Checking
```bash
npm run check
```
Runs TypeScript compiler to check for type errors without emitting files.

## 🔌 API Documentation

### POST `/api/ideas/generate`
Generates a new project idea based on provided parameters.

**Request Body:**
```json
{
  "domain": "web_development",
  "skillLevel": "intermediate",
  "teamSize": 2,
  "timeLimit": "3_months",
  "strictnessLevel": "moderate",
  "projectType": "personal",
  "complexity": "medium"
}
```

**Response:**
```json
{
  "id": 1,
  "domain": "web_development",
  "skillLevel": "intermediate",
  "teamSize": 2,
  "timeLimit": "3_months",
  "strictnessLevel": "moderate",
  "projectType": "personal",
  "complexity": "medium",
  "result": {
    "title": "Project Title",
    "description": "Detailed project description",
    "technologies": ["Tech1", "Tech2"],
    "challenges": ["Challenge 1", "Challenge 2"],
    "timeline": "Estimated timeline",
    "resources": ["Resource 1", "Resource 2"]
  },
  "createdAt": "2024-03-24T10:30:00Z"
}
```

### GET `/api/ideas`
Retrieves all previously generated project ideas.

**Response:**
```json
[
  {
    "id": 1,
    "domain": "web_development",
    "result": { ... },
    "createdAt": "2024-03-24T10:30:00Z"
  }
]
```

## 🗄️ Database Schema

### project_ideas Table

| Column | Type | Constraints | Description |
|--------|------|-------------|-------------|
| id | SERIAL | PRIMARY KEY | Unique identifier |
| domain | TEXT | NOT NULL | Project domain |
| skill_level | TEXT | NOT NULL | Required skill level |
| team_size | INTEGER | NOT NULL | Number of team members |
| time_limit | TEXT | NOT NULL | Project duration |
| strictness_level | TEXT | NOT NULL | Project constraint level |
| project_type | TEXT | NOT NULL | Type of project |
| complexity | TEXT | NOT NULL | Project complexity |
| result | JSONB | NOT NULL | Generated project details (JSON) |
| created_at | TIMESTAMP | DEFAULT NOW() | Creation timestamp |

### Result JSON Structure
```json
{
  "title": "string",
  "description": "string",
  "technologies": ["string"],
  "challenges": ["string"],
  "timeline": "string",
  "resources": ["string"],
  "learningOutcomes": ["string"]
}
```

## 🚢 Deployment

### Deploy to Render

#### Prerequisites
1. GitHub repository (already set up)
2. PostgreSQL database (Render or Neon)
3. OpenAI API key (optional)

#### Steps

1. **Prepare Repository**
   ```bash
   # Remove .env file from git
   git rm --cached .env
   echo ".env" >> .gitignore
   git commit -m "Remove sensitive .env file"
   git push origin main
   ```

2. **Create Render Account**
   - Go to https://render.com
   - Connect your GitHub repository

3. **Set Environment Variables in Render Dashboard**
   - `DATABASE_URL`: PostgreSQL connection string
   - `OPENAI_API_KEY`: (optional)
   - `NODE_ENV`: `production`
   - `DEBUG_LOGS`: `false`

4. **Deploy**
   - Push to GitHub main branch
   - Render automatically builds and deploys
   - Build command: `npm run build`
   - Start command: `npm start`

5. **Use Render PostgreSQL** (Optional)
   - Can use Neon (PostgreSQL as a Service)
   - Or link Render's internal PostgreSQL

### Deploy to Other Platforms

#### Vercel (Frontend Only)
```bash
vercel deploy
```

#### Heroku (Legacy)
```bash
heroku login
heroku create your-app-name
git push heroku main
```

#### Railway / Fly.io
- Similar to Render process
- Set environment variables in platform dashboard
- Push to GitHub for auto-deployment

## 🛠 Development

### Adding New Components
Components are located in `client/src/components/`.

```typescript
// client/src/components/MyComponent.tsx
import React from 'react';

export function MyComponent() {
  return <div>My Component</div>;
}
```

### Adding New API Routes
Routes are defined in `server/routes.ts`.

```typescript
// server/routes.ts
export function registerRoutes(app: Express) {
  app.post("/api/endpoint", async (req, res) => {
    // Handle request
  });
}
```

### Adding New Database Entities
Modify `shared/schema.ts` and run migrations:

```typescript
// shared/schema.ts
export const myTable = pgTable("my_table", {
  id: serial("id").primaryKey(),
  // ... columns
});
```

Then run:
```bash
npm run db:push
```

### Styling
The project uses Tailwind CSS. Add styles directly in components:

```jsx
<div className="flex items-center justify-between gap-4 bg-gradient-to-r from-blue-500 to-purple-600 p-4 rounded-lg">
  Styled content
</div>
```

### Debugging

#### Backend
- Enable debug logs: Set `DEBUG_LOGS=true` in `.env`
- Check console output for request/response logs
- Use HTTP client (Postman, Thunder Client) to test APIs

#### Frontend
- Open browser DevTools (F12)
- Check Network tab for API requests
- Use React DevTools extension for component inspection
- Check Console for JavaScript errors

### Testing Locally
```bash
# Terminal 1: Start backend
npm run dev

# Terminal 2: Test APIs
curl http://localhost:5000/api/ideas/generate \
  -X POST \
  -H "Content-Type: application/json" \
  -d '{
    "domain": "web_development",
    "skillLevel": "beginner",
    "teamSize": 1,
    "timeLimit": "2_weeks",
    "strictnessLevel": "conservative",
    "projectType": "personal",
    "complexity": "low"
  }'
```

## 🐛 Troubleshooting

### Database Connection Issues
```
Error: connect ECONNREFUSED
```
- Verify `DATABASE_URL` is correct
- Ensure PostgreSQL service is running
- Check network connectivity

### Build Failures
```bash
npm run check  # Check for TypeScript errors
npm install   # Reinstall dependencies
rm -rf node_modules package-lock.json
npm install
```

### Port Already in Use
```bash
# Change port in .env or code:
PORT=3000 npm run dev
```

### Module Not Found Errors
```bash
# Clear cache and reinstall
npm cache clean --force
npm install
```

## 📝 Environment Variables Security

⚠️ **IMPORTANT**: Never commit `.env` file to version control!

- Always add `.env` to `.gitignore`
- Use environment variable management in deployment platform
- Rotate API keys regularly
- Never share `.env` in messages or documentation

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/amazing-feature`
3. Commit changes: `git commit -m 'Add amazing feature'`
4. Push to branch: `git push origin feature/amazing-feature`
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🙏 Acknowledgments

- Built with [React](https://react.dev)
- Styled with [Tailwind CSS](https://tailwindcss.com)
- UI Components from [Radix UI](https://www.radix-ui.com)
- Database powered by [Drizzle ORM](https://orm.drizzle.team)
- AI features by [OpenAI](https://openai.com)

## 📞 Support

For issues, questions, or suggestions:
- Open an issue on GitHub
- Check existing issues first
- Provide detailed error messages and steps to reproduce

## 🔗 Useful Links

- [GitHub Repository](https://github.com/kshailaja455/AI-ProjectGenerator01)
- [Node.js Documentation](https://nodejs.org/docs/)
- [PostgreSQL Documentation](https://www.postgresql.org/docs/)
- [React Documentation](https://react.dev)
- [TypeScript Documentation](https://www.typescriptlang.org/docs/)
- [Render Deployment Guide](https://render.com/docs)

---

**Last Updated**: March 24, 2026

Made with ❤️ by the Development Team
