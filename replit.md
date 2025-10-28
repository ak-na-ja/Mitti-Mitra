# Farmer Advisory Mobile Web App

## Overview
A mobile-first progressive web application providing agricultural advisory services to Indian farmers. The app emphasizes accessibility for low-literacy users through visual design, bilingual support (English/Hindi), and AI-powered crop analysis. It helps farmers identify crop diseases, receive personalized farming tips via intelligent multi-dimensional filtering, and manage weekly tasks with weather-aware recommendations. The project aims to improve agricultural productivity and sustainability for small-scale farmers in India.

## User Preferences
Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend
- **Framework**: React 18+ with TypeScript, Vite for bundling.
- **UI**: shadcn/ui (Radix UI, Tailwind CSS), Material Design adapted for mobile-first, visual-first, low-literacy context.
- **State Management**: React Context API for language, LocalStorage for persistent user data, tips cache, weather, and translation cache. TanStack React Query for server state.
- **Design Principles**: Visual-first, maximum 3-tap depth, bilingual (English/Hindi with Noto Sans Devanagari), large touch targets, mobile-optimized typography.

### Backend
- **Server**: Express.js REST API on Node.js.
- **API Design**: RESTful, JSON format, Multer for multipart form-data (image uploads up to 10MB).
- **Development**: Vite middleware for HMR.

### Data Storage
- **Current**: In-memory storage (`MemStorage`) for user data, LocalStorage for client-side persistence.
- **Future-Proofing**: Drizzle ORM configured for PostgreSQL (via Neon Database serverless driver) with defined user schema and migration system.

### Core Features & Algorithms
- **AI-Powered Crop Analysis**: Image-based disease/pest identification using Google Gemini, returning issues, severity, solutions, and recommendations.
- **Smart Tips Filtering**: Multi-dimensional algorithm scores and ranks 40+ tips based on crop, location, soil type, season, weather, growth stage, irrigation type, and priority. Uses weighted scoring (e.g., Crop Match 100 pts, State Match 80 pts).
- **Weather-Triggered Alerts**: Automated alerts for heavy rainfall, heatwave, high humidity, and drought with actionable recommendations.
- **Weekly Task Generator**: Combines seasonal, weather-based, soil maintenance, and crop stage-specific tasks.
- **Bilingual Translation**: React Context and LocalStorage cache manage English/Hindi content. Google Gemini API for automatic translation (cache-first approach).
- **Offline-First**: LocalStorage caching for user profile, tips, weather data, and translations ensures functionality with poor connectivity.
- **Farmer Profile Management**: Editable profile screen (crop, state, district, soil type, weather indicators) with cascading dropdowns. Changes trigger automatic tip recalculation.

## External Dependencies

- **AI/ML Services**: Google Gemini 2.5 Flash API (`@google/genai`) for crop analysis and automatic translation.
- **Database**: Neon Database (PostgreSQL serverless) with `@neondatabase/serverless` driver (configured, but currently using in-memory/LocalStorage).
- **UI Libraries**: Radix UI (headless components), Lucide React (icons), TanStack React Query (server state management).
- **Font Services**: Google Fonts (Noto Sans, Noto Sans Devanagari).
- **File Upload**: Multer (for multipart form-data handling).
- **Session Management**: `connect-pg-simple` (configured for future PostgreSQL session store).