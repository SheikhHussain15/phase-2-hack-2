# Frontend Application for Multi-User Todo Web Application

This is the frontend for the multi-user todo web application built with Next.js 16+ and React 18+.

## Features

- Next.js 16+ with App Router
- TypeScript 5+ support
- Better Auth integration for authentication
- Tailwind CSS for styling
- Responsive, mobile-first design
- Task management functionality

## Prerequisites

- Node.js 18+
- npm or yarn

## Setup Instructions

1. Clone the repository
2. Navigate to the frontend directory
3. Install dependencies:

```bash
npm install
```

## Environment Variables

Create a `.env.local` file in the frontend root directory with the following variables:

```bash
NEXT_PUBLIC_API_BASE_URL=http://localhost:8000
NEXT_PUBLIC_BETTER_AUTH_URL=http://localhost:3000/api/auth
```

## Running the Application

```bash
# Development mode
npm run dev

# Production build
npm run build
npm start
```

The application will be available at `http://localhost:3000`.

## Project Structure

```
frontend/
├── src/
│   ├── app/                 # Next.js 16+ App Router structure
│   │   ├── (auth)/          # Public routes (login, signup)
│   │   │   ├── login/
│   │   │   └── signup/
│   │   ├── tasks/           # Protected route for task management
│   │   ├── layout.tsx       # Root layout
│   │   └── page.tsx         # Home page
│   ├── components/          # Reusable UI components
│   │   ├── auth/
│   │   ├── tasks/
│   │   ├── ui/              # Base UI components
│   │   └── common/          # Shared components
│   ├── services/            # API services and authentication
│   │   ├── auth/
│   │   ├── api-client/
│   │   └── middleware/
│   ├── hooks/               # Custom React hooks
│   ├── lib/                 # Utility functions
│   ├── styles/              # Global styles and Tailwind config
│   └── types/               # TypeScript type definitions
└── tests/
    ├── unit/
    ├── integration/
    └── e2e/
```

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm start` - Start production server
- `npm run lint` - Run ESLint