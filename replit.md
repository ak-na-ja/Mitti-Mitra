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
- **Farmer Profile Management**: Editable profile screen with farmer's name, crop, state, district, and soil type. Weather indicators (temperature, rainfall, humidity) are auto-fetched and read-only. Profile changes trigger automatic tip recalculation.

## External Dependencies

- **AI/ML Services**: Google Gemini 2.5 Flash API (`@google/genai`) for crop analysis and automatic translation.
- **Database**: Neon Database (PostgreSQL serverless) with `@neondatabase/serverless` driver (configured, but currently using in-memory/LocalStorage).
- **UI Libraries**: Radix UI (headless components), Lucide React (icons), TanStack React Query (server state management).
- **Font Services**: Google Fonts (Noto Sans, Noto Sans Devanagari).
- **File Upload**: Multer (for multipart form-data handling).
- **Session Management**: `connect-pg-simple` (configured for future PostgreSQL session store).
## Recent Changes

### Profile Feature Updates (October 2025)
1. **Farmer Name Added to Onboarding**
   - New Step 0 in onboarding flow: Name input field
   - Onboarding expanded from 3 to 4 steps (Name → Crop → Location → Soil)
   - Name is stored in localStorage 'farmer-app-data' with key 'name'
   - Supports both English and Hindi input

2. **Home Tab Enhancement**
   - Welcome message now displays actual farmer's name from localStorage
   - "Welcome, Ramesh Kumar!" instead of generic "Welcome, Farmer!"
   - Falls back to "Farmer" / "किसान" if name is not set

3. **Profile Tab Redesign**
   - Farmer's name displayed prominently at top with user icon
   - Card title changed from "Update Profile" to "Farm Profile"
   - Profile summary card shows: Name, Crop • State • District • Soil
   - Weather indicators (°C, mm, %) displayed as read-only in summary card

4. **Weather Indicators Made Read-Only**
   - Removed editable temperature, rainfall, humidity inputs from profile form
   - Weather data is now auto-fetched from localStorage 'current-weather'
   - Weather values are managed by the system, not manually by farmers
   - This change reflects the design that weather should be automatically fetched

## Onboarding Flow

**4-Step Process**:
1. **Name**: Text input asking "What is your name?" / "आपका नाम क्या है?"
2. **Crop**: Visual selection from 6 crop types (Wheat, Rice, Cotton, Sugarcane, Maize, Pulses)
3. **Location**: State selection from 6 major Indian states
4. **Soil**: Soil type selection (Alluvial, Black, Red, Laterite, Desert)

**Data Storage**:
```json
localStorage['farmer-app-data'] = {
  "name": "Ramesh Kumar",
  "crop": "rice",
  "location": "haryana",
  "soil": "black"
}
```

## Profile Management System

### Profile Data Structure
- **Name**: Farmer's name (string)
- **Crop Type**: Rice, Wheat, Cotton, Maize, Vegetables
- **State**: 10 Indian states with district mappings
- **District**: Cascading dropdown populated based on state
- **Soil Type**: Alluvial, Black, Red, Laterite, Desert, Mountain
- **Weather Indicators** (Read-only): Temperature (°C), Rainfall (mm), Humidity (%)

### Profile Update Flow
1. Farmer navigates to Profile tab
2. Views current profile summary (name, crop, state, district, soil, weather)
3. Edits crop, state, district, or soil in "Farm Profile" card
4. Clicks "Save Changes"
5. localStorage updated, filtered-tips cache cleared
6. 'profile-updated' event dispatched
7. Tips tab automatically recalculates with new profile
8. Success toast: "Profile Updated" / "प्रोफ़ाइल अपडेट हो गई"

### Weather Auto-Fetch
Weather indicators are sourced from localStorage 'current-weather' which is populated by:
- Mock weather data generator (getMockWeather) in development
- Real weather API integration (future implementation)
- Manual updates are NOT allowed to ensure data consistency
