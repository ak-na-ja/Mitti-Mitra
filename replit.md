# Farmer Advisory Mobile Web App

## Overview

A mobile-first progressive web application designed to provide agricultural advisory services to farmers in India. The app focuses on accessibility for low-literacy users through visual-first design, bilingual support (English/Hindi), and AI-powered crop analysis. The application helps farmers identify crop diseases, receive personalized farming tips, and manage weekly agricultural tasks.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture

**Framework & Build System**
- React 18+ with TypeScript for type safety and component-based architecture
- Vite as the build tool for fast development and optimized production builds
- Single-page application (SPA) with client-side routing handled through conditional rendering

**UI Component Library**
- shadcn/ui components built on Radix UI primitives for accessible, headless components
- Tailwind CSS for utility-first styling with custom theme configuration
- Material Design adaptation optimized for mobile-first, low-literacy agricultural context

**State Management**
- React Context API for language preferences (LanguageContext)
- LocalStorage for persistent data (onboarding data, user preferences, language selection)
- TanStack React Query for server state management and API data caching

**Design Principles**
- Visual-first approach with large, recognizable icons (minimum 56x56px touch targets)
- Maximum 3-tap depth for any feature
- Bilingual support with equal visual weight for Hindi (Devanagari script) and English
- Noto Sans font family for excellent Hindi/Devanagari support
- Mobile-optimized typography (18px base body text for readability)

### Backend Architecture

**Server Framework**
- Express.js REST API server
- Node.js runtime with ES modules
- HTTP server creation via Node's built-in `http` module

**Development Environment**
- Vite middleware integration for development with HMR (Hot Module Replacement)
- Separate development and production server configurations
- Custom logging middleware for API request tracking

**API Design**
- RESTful endpoint structure
- Multipart form-data support via Multer for image uploads
- JSON request/response format
- File size limits (10MB for image uploads)

### Data Storage Solutions

**Current Implementation**
- In-memory storage via `MemStorage` class for user data
- Map-based data structure for runtime user storage
- LocalStorage on client for user preferences and onboarding data

**Database Schema (PostgreSQL Ready)**
- Drizzle ORM configured for PostgreSQL via Neon Database serverless driver
- User schema defined with UUID primary keys, username/password fields
- Migration system configured via Drizzle Kit
- Connection via `DATABASE_URL` environment variable

**Rationale**: The app currently uses in-memory storage for simplicity, but is architected to migrate to PostgreSQL when persistence is required. Drizzle ORM provides type-safe database queries and easy schema migrations.

### External Dependencies

**AI/ML Services**
- **Google Gemini 2.5 Flash API** (`@google/genai`)
  - Purpose: Crop disease identification and soil health analysis from images
  - Endpoint: `/api/analyze-crop`
  - Input: Multipart form image upload (max 10MB)
  - Output: JSON with issues array (disease/pest/deficiency detection), severity levels, solutions, general health assessment, and recommendations
  - API key required via `GEMINI_API_KEY` environment variable

**Database**
- **Neon Database** (PostgreSQL serverless)
  - Driver: `@neondatabase/serverless`
  - Connection via `DATABASE_URL` environment variable
  - Configured but not actively used (in-memory storage currently active)

**Third-Party UI Libraries**
- **Radix UI**: Headless accessible component primitives (dialogs, dropdowns, navigation, etc.)
- **Lucide React**: Icon library for consistent iconography
- **TanStack React Query**: Server state management and caching

**Font Services**
- **Google Fonts**: Noto Sans and Noto Sans Devanagari for bilingual typography support

**Session Management**
- `connect-pg-simple`: PostgreSQL session store (configured for future use)
- Express session middleware ready for authentication implementation

**File Upload**
- **Multer**: Multipart form-data handling for image uploads
- Memory storage for temporary file processing before API submission