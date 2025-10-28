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
- **Expert Connection System**: Farmers can connect with agricultural experts via call or message. Features intelligent filtering by crop type and location, search functionality, expert profiles with ratings, availability status, and contact history tracking.

## External Dependencies

- **AI/ML Services**: Google Gemini 2.5 Flash API (`@google/genai`) for crop analysis and automatic translation.
- **Database**: Neon Database (PostgreSQL serverless) with `@neondatabase/serverless` driver (configured, but currently using in-memory/LocalStorage).
- **UI Libraries**: Radix UI (headless components), Lucide React (icons), TanStack React Query (server state management).
- **Font Services**: Google Fonts (Noto Sans, Noto Sans Devanagari).
- **File Upload**: Multer (for multipart form-data handling).
- **Session Management**: `connect-pg-simple` (configured for future PostgreSQL session store).
## Recent Changes

### Google OAuth Authentication (October 2025)
1. **Login Screen Implementation**
   - Created dedicated Login page with Google OAuth integration
   - Integrated @react-oauth/google library for Google sign-in
   - Added mock authentication mode for testing without actual OAuth setup
   - Google sign-in button follows official brand guidelines (white background, Google colors, 44px minimum height)
   - Positioned below "OR" divider for clear visual separation

2. **Authentication Context**
   - Created AuthContext to manage global authentication state
   - Stores user data (email, name, profile picture, OAuth token) in localStorage
   - Provides login/logout functions throughout the app
   - Persists authentication across page refreshes

3. **Smart Redirect Logic**
   - First-time users: Login → Onboarding → Home
   - Returning users: Login → Home (skips onboarding)
   - Unauthenticated users: Redirected to Login screen
   - Profile and onboarding data persist across logout/login cycles

4. **Logout Functionality**
   - Added Account section in Profile tab
   - Displays authenticated user's email and name
   - Logout button clears authentication but preserves profile data
   - Allows users to switch accounts without losing farm profile

5. **Mock Authentication Mode**
   - Simulates Google OAuth flow without requiring actual OAuth setup
   - Creates test user with email "farmer.test@example.com"
   - Includes 1-second delay to simulate network request
   - Perfect for development and testing

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

## Expert Connection System (October 2025)

### Feature Overview
Farmers can connect with agricultural experts for personalized advice through calls or messages. The system helps farmers find relevant experts based on their crop type and location.

### Expert Database
- **Location**: `client/src/data/experts.ts`
- **8 Mock Experts** with diverse specializations:
  - Dr. Rajesh Kumar (Punjab) - Crop diseases, IPM, Soil health
  - Priya Sharma (Haryana) - Irrigation, Water management
  - Suresh Patel (Gujarat) - Cotton farming, Pest control
  - Meena Devi (UP) - Organic farming, Composting
  - Amit Singh (Maharashtra) - Soil testing, Nutrient management
  - Lakshmi Reddy (Andhra Pradesh) - Rice cultivation, SRI method
  - Karan Verma (Punjab) - IPM, Biological control
  - Sunita Nair (Karnataka) - Vegetable farming, Greenhouse

### Intelligent Filtering
1. **Primary Filter**: By crop type AND location (state)
   - Shows experts who specialize in farmer's crop OR work in farmer's state
   - Function: `filterExpertsByCropAndLocation(experts, crop, state)`

2. **Search Filter**: By name, title, location, or specialization
   - Real-time search as farmer types
   - Function: `searchExperts(experts, query)`

### Expert Card UI
**Component**: `client/src/components/ExpertCard.tsx`

**Display Elements**:
- Profile picture (56x56px) with availability status indicator
  - Green dot = Available
  - Grey dot = Unavailable
- Name and professional title
- Rating (out of 5) and total consultation count
- Location: District, State
- Specializations displayed as badges
- Availability hours (e.g., "Available weekdays 9 AM - 5 PM")
- Two action buttons (48px minimum height for accessibility):
  - **Call Button**: Uses `tel:` protocol to initiate phone call
  - **Message Button**: Opens messaging modal

### Message Modal
**Component**: `client/src/components/MessageModal.tsx`

**Features**:
- Expert profile summary (image, name, title)
- Multi-line textarea for message input
- Send button (disabled when message is empty)
- Cancel button to close modal
- Success toast notification on send
- Stores sent messages in localStorage

### Contact History Tracking
Two localStorage keys maintain contact history:

1. **`expert-contact-history`**: Tracks all interactions (calls + messages)
```json
[{
  "expertId": "exp-001",
  "expertName": "Dr. Rajesh Kumar",
  "type": "call" | "message",
  "timestamp": "2025-10-28T19:45:00.000Z"
}]
```

2. **`expert-messages`**: Stores message content
```json
[{
  "expertId": "exp-001",
  "expertName": "Dr. Rajesh Kumar",
  "message": "I need help with pest management",
  "timestamp": "2025-10-28T19:45:00.000Z",
  "status": "sent"
}]
```

### User Flow
1. Farmer navigates to **Tips tab**
2. Scrolls to "Connect with Experts" section (below Weather Forecast)
3. Sees experts filtered by their crop and location
4. Can search for specific experts using search bar
5. Views expert profiles with ratings and specializations
6. Chooses to either:
   - **Call**: Taps Call button → Phone app opens with expert's number
   - **Message**: Taps Message button → Modal opens → Types message → Sends
7. Contact history is automatically saved for future reference

### Design Principles
- Mobile-first: 48px minimum touch targets for buttons
- Visual-first: Clear status indicators (green/grey availability dots)
- Accessibility: Large text, clear icons, bilingual support
- Offline-ready: Contact history persists in localStorage
