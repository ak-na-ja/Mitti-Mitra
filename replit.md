# Farmer Advisory Mobile Web App

## Overview
A mobile-first progressive web application designed to provide agricultural advisory services to Indian farmers. The app aims to enhance agricultural productivity and sustainability by offering AI-powered crop analysis for disease identification, personalized farming tips through intelligent multi-dimensional filtering, and weekly task management with weather-aware recommendations. It prioritizes accessibility for low-literacy users with a visual-first design, bilingual support (English/Hindi), and a maximum 3-tap depth navigation.

## User Preferences
Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend
- **Framework**: React 18+ with TypeScript, Vite.
- **UI**: shadcn/ui (Radix UI, Tailwind CSS) adapted for a mobile-first, visual-first, low-literacy context. Material Design principles are applied.
- **State Management**: React Context API for language, LocalStorage for persistent user data, tips, weather, and translation caches. TanStack React Query for server state.
- **Design Principles**: Visual-first, maximum 3-tap depth, bilingual (English/Hindi with Noto Sans Devanagari), large touch targets, mobile-optimized typography.

### Backend
- **Server**: Express.js REST API on Node.js.
- **API Design**: RESTful, JSON format, with Multer for multipart form-data (image uploads up to 10MB).

### Data Storage
- **Current**: In-memory storage and LocalStorage for client-side persistence.
- **Future-Proofing**: Drizzle ORM configured for PostgreSQL (via Neon Database serverless driver) with defined user schema and migration system.

### Core Features
- **AI-Powered Crop Analysis**: Image-based disease/pest identification using Google Gemini, providing issues, severity, solutions, and recommendations.
- **Smart Tips Filtering**: A multi-dimensional algorithm that scores and ranks tips based on crop, location, soil type, season, weather, growth stage, irrigation type, and priority using weighted scoring.
- **Weather-Triggered Alerts**: Automated alerts for adverse weather conditions with actionable recommendations.
- **Weekly Task Generator**: Combines seasonal, weather-based, soil maintenance, and crop stage-specific tasks.
- **Bilingual Translation**: Manages English/Hindi content via React Context and LocalStorage cache, with Google Gemini API for automatic translation (cache-first).
- **Offline-First**: LocalStorage caching for critical data ensures functionality with limited connectivity.
- **Farmer Profile Management**: Editable profile screen where changes trigger automatic tip recalculation. Weather indicators are auto-fetched and read-only.
- **Advice History & Feedback System**: Automatically tracks all AI crop analysis sessions. Farmers can review past advice, provide feedback on effectiveness (rating, outcome status, impact metrics like yield and crop saved), and search/filter sessions.
- **Expert Connection System**: Farmers can connect with agricultural experts via call or message. Features intelligent filtering by crop type and location, search functionality, expert profiles with ratings, availability status, and contact history tracking.
- **Google OAuth Authentication**: Implemented for user login, including smart redirect logic for new vs. returning users and a mock authentication mode for development.
- **Onboarding Flow**: A 4-step process (Name, Crop, Location, Soil) to gather essential farmer information, stored in LocalStorage.
- **Global Header with App Logo**: Sticky header component displaying the centered Mittimitra logo (70px height) with language toggle in top-right corner. Logo is clickable to navigate home from non-home pages. Consistent placement across all screens (Login, Onboarding, Home tabs, Profile).

## External Dependencies

- **AI/ML Services**: Google Gemini 2.5 Flash API (`@google/genai`) for crop analysis and automatic translation.
- **Database**: Neon Database (PostgreSQL serverless) with `@neondatabase/serverless` driver (configured).
- **UI Libraries**: Radix UI (headless components), Lucide React (icons), TanStack React Query (server state management), `@react-oauth/google` for Google OAuth.
- **Font Services**: Google Fonts (Noto Sans, Noto Sans Devanagari).
- **File Upload**: Multer (for multipart form-data handling).
- **Session Management**: `connect-pg-simple` (configured for future PostgreSQL session store).