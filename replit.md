# Farmer Advisory Mobile Web App

## Overview

A mobile-first progressive web application designed to provide agricultural advisory services to farmers in India. The app focuses on accessibility for low-literacy users through visual-first design, bilingual support (English/Hindi), and AI-powered crop analysis. The application helps farmers identify crop diseases, receive personalized farming tips through intelligent multi-dimensional filtering, and manage weekly agricultural tasks with weather-aware recommendations.

### Key Features
- **AI-Powered Crop Analysis**: Image-based disease and pest identification using Google Gemini API with automatic bilingual translation
- **Smart Tips System**: Multi-dimensional filtering algorithm that scores and ranks 40+ farming tips based on crop, location, soil type, season, weather conditions, and growth stage
- **Weather-Triggered Alerts**: Automated alerts for heavy rainfall, high temperature, high humidity, and drought conditions with actionable recommendations
- **Weekly Task Generator**: Context-aware task lists combining seasonal requirements, weather-based actions, soil maintenance, and crop stage priorities
- **Offline-First Design**: LocalStorage caching for tips, weather data, and user preferences ensuring functionality with poor connectivity
- **Bilingual UI**: Complete English/Hindi toggle with Noto Sans Devanagari font support and automatic content translation

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
- React Context API for language preferences (LanguageContext) with caching for translated content
- LocalStorage for persistent data including:
  - User onboarding data (crop, location, soil, growth stage)
  - Filtered tips cache with matched factors
  - Weather data (current conditions + 7-day forecast)
  - Translation cache (English ↔ Hindi) to minimize API calls
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

## Smart Tips Filtering System

### Architecture Overview
The smart tips system uses a sophisticated multi-dimensional scoring algorithm to deliver highly personalized farming advice.

### Tip Database Structure
- **40+ farming tips** covering 5 major crops
- **Crop coverage**: Rice, Wheat, Cotton, Maize, Vegetables
- **Geographic coverage**: 10 Indian states (Punjab, Haryana, Uttar Pradesh, Maharashtra, Gujarat, Madhya Pradesh, Karnataka, Andhra Pradesh, Tamil Nadu, Bihar)
- **Soil types**: Alluvial, Black, Red, Laterite, Desert, Mountain
- **Seasons**: Kharif (June-Nov), Rabi (Nov-Apr), Zaid (Mar-June) with automatic month-based detection
- **Growth stages**: Vegetative, Flowering, Grain Filling, Harvesting
- **Irrigation types**: Flood, Sprinkler, Drip

### Filtering Algorithm (`client/src/utils/tipFiltering.ts`)

**Scoring System** (higher score = higher relevance):
1. **Crop Match** (100 points) - Required; tips without crop match are excluded
2. **State Match** (80 points) - Required; ensures geographic relevance
3. **Soil Type Match** (60 points) - Bonus for soil-specific recommendations
4. **Season Match** (50 points) - Auto-detected from current month
5. **Growth Stage Match** (70 points) - If user specifies crop stage
6. **Irrigation Type Match** (40 points) - If user specifies irrigation method
7. **Weather Trigger Match** (90 points) - Temperature/rainfall/humidity thresholds
8. **Priority Level** (30/15/0 points) - High/Medium/Low urgency

**Process Flow**:
1. Load user profile (crop, state, soil, optional: stage, irrigation)
2. Normalize lowercase localStorage values to proper TypeScript types
3. Get current season from month
4. Get mock weather data (or real API data in production)
5. Score all 40+ tips using weighted algorithm
6. Filter out tips with score = 0
7. Sort by score descending
8. Return top 5 tips with matched factors for UI badges

### Weather-Triggered Alerts (`client/src/data/farmingTips.ts`)

**Alert Triggers**:
- **Heavy Rainfall**: rainfall > 20mm → HIGH severity
  - Action: Clear drainage channels, avoid fertilizer application
- **Heat Wave**: temperature > 35°C → HIGH severity  
  - Action: Increase irrigation frequency, provide shade for young plants
- **High Humidity**: humidity > 70% → MEDIUM severity
  - Action: Monitor for fungal diseases, improve ventilation
- **Drought**: rainfall < 5mm AND humidity < 30% → HIGH severity
  - Action: Increase irrigation, apply mulch to retain moisture

### Weekly Task Generator

**Task Sources** (combined into single checklist):
1. **Season-specific tasks**: Based on Kharif/Rabi/Zaid requirements
2. **Weather-based tasks**: Triggered by current conditions (e.g., "Clear drainage" if heavy rain)
3. **Soil-specific tasks**: Maintenance for soil type (e.g., "Test pH" for Black soil)
4. **Crop stage tasks**: Critical actions for growth phase (e.g., "Apply fertilizer" during Vegetative stage)

### UI Components

**SmartTipCard** (`client/src/components/SmartTipCard.tsx`):
- Icon from Lucide React library
- Bilingual title and description
- Priority badge (High/Medium/Low) with semantic colors
- Expandable "Learn more" section with smooth animation
- "Why this tip?" explanation showing matched factors as badges
- Full bilingual support with automatic translation toggle

**WeatherAlertCard** (`client/src/components/WeatherAlertCard.tsx`):
- Red border-left accent for visual prominence
- Severity badge with color coding (HIGH/MEDIUM/LOW)
- Icon indicating weather condition
- Bilingual title and description
- "Action Required" section with specific steps

**WeatherForecastCard** (`client/src/components/WeatherForecastCard.tsx`):
- 7-day horizontal scrollable grid
- Compact mobile-first design
- Icons for temperature, rainfall, humidity
- Day labels (Today, Mon, Tue, etc.)

### Bilingual Translation System

**Architecture**:
- Language context stored in React Context API
- Translation cache stored in localStorage (key: `{contentType}-{language}-{identifier}`)
- Google Gemini API used for automatic translation when English content is toggled to Hindi
- Cache-first approach: check localStorage before calling API

**Cached Content Types**:
- Tip titles and descriptions
- Alert messages
- Task descriptions  
- "Why this tip?" explanations

**Performance Optimization**:
- Single translation API call per tip (not per field)
- Cache persists across sessions
- Instant toggle between languages using cached data

### Offline-First Caching Strategy

**LocalStorage Keys**:
- `farmer-app-data`: User profile (crop, location, soil, growthStage)
- `filtered-tips`: Scored and filtered tips with matched factors
- `current-weather`: Mock weather conditions (temp, rainfall, humidity)
- `weather-forecast`: 7-day forecast array
- `{tip-id}-translation-hi`: Hindi translations per tip
- `language`: Current UI language preference

**Normalization Functions** (`client/src/pages/Home.tsx`):
- `normalizeCrop()`: Converts lowercase "rice" → "Rice"
- `normalizeState()`: Converts lowercase "punjab" → "Punjab"  
- `normalizeSoil()`: Converts lowercase "alluvial" → "Alluvial"

**Rationale**: Onboarding flow saves lowercase values to localStorage, but TypeScript types and filtering algorithm expect proper case. Normalization ensures compatibility without breaking existing user data.