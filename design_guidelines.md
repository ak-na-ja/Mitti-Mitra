# Design Guidelines: Farmer Advisory Mobile Web App

## Design Approach

**System Foundation**: Material Design adapted for low-literacy, mobile-first agricultural context
**Key Adaptation**: Prioritize visual communication over text, maximize touch targets, ensure outdoor visibility

### Core Design Principles
1. **Visual-First**: Every action represented by large, universally recognizable icons
2. **Generous Touch Targets**: All interactive elements minimum 56x56px (larger than standard 48px)
3. **Extreme Simplification**: Maximum 3-tap depth for any feature
4. **Bilingual Parity**: Hindi and English receive equal visual weight and clarity
5. **Offline Clarity**: Always-visible connectivity status with clear visual indicators

---

## Typography

### Font Selection
- **Primary**: Noto Sans (excellent Hindi/Devanagari support via Google Fonts)
- **Fallback**: System UI fonts for performance

### Type Scale (Mobile-Optimized)
- **Hero/Welcome Text**: 32px/2rem, Bold (800)
- **Section Headings**: 24px/1.5rem, Bold (700)
- **Card Titles**: 20px/1.25rem, Semibold (600)
- **Body Text**: 18px/1.125rem, Regular (400) — larger than standard for readability
- **Helper Text**: 16px/1rem, Regular (400)
- **Button Text**: 18px/1.125rem, Semibold (600)

### Typography Rules
- Line height: 1.6 for all body text (enhanced readability)
- Letter spacing: 0.5px for Devanagari script
- Text alignment: Left-aligned for reading, center-aligned for CTAs
- Maximum line length: 60 characters for body text
- Avoid all-caps except for single-word labels

---

## Layout System

### Spacing Primitives (Tailwind Units)
**Standard Set**: Use units 4, 6, 8, 12, 16 consistently
- **Micro spacing** (between related items): 4 units (p-4, m-4)
- **Component padding**: 6 units (p-6)
- **Section spacing**: 8 units (py-8, my-8)
- **Major sections**: 12-16 units (py-12, py-16)

### Grid & Container
- **Mobile Container**: Full width with px-4 (16px side gutters)
- **Max Width**: max-w-md (448px) for content containers
- **Touch Targets**: Minimum h-14 (56px) for all buttons/cards
- **Card Spacing**: gap-6 between cards in vertical lists

### Responsive Breakpoints
- **Mobile-first**: Base styles for 320px+
- **Tablet**: md: breakpoint (768px) for landscape/tablet views
- **Desktop** (secondary): lg: breakpoint (1024px) - optional enhancement

---

## Component Library

### Navigation
**Bottom Tab Bar** (Primary Navigation)
- Fixed bottom position, 72px height
- 4 large icon buttons: Home, Tips, Pest Help, Profile
- Active state: Icon + label visible, inactive: icon only
- Icon size: 32x32px minimum
- Text label: 14px below icon

**Top Bar** (Contextual)
- 64px height, includes back button (when needed) + page title + language toggle
- Language toggle: Flag icons (IN-flag for Hindi, US-flag for English)

### Cards

**Info Card** (Personalized Tips)
- Minimum height: 120px
- Large icon (48x48px) on left
- Title + description vertically stacked on right
- Bottom: Action arrow or button
- Rounded corners: rounded-2xl (16px)
- Shadow: shadow-lg for depth

**Weekly Checklist Card**
- Full-width card with checklist items
- Each item: 64px height with checkbox (32x32px) + icon + text
- Checkboxes: Large, tactile, with checkmark animation
- Card header: "This Week" with week number

**Pest Help Card**
- Large upload area: 200px height with camera icon (64x64px)
- Alternative: Voice input button, same size as upload area
- Result display: Image thumbnail + text response + audio playback button

### Forms (Onboarding)

**Dropdown Selects**
- Minimum height: 64px
- Large chevron icon (24x24px)
- Label above input (16px)
- Touch area extends full width
- Selected value in 18px font

**Input Structure** (3-step onboarding)
- Each step: Single full-screen view
- Progress indicator: 3 dots at top (active/inactive states)
- Large icon representing current step (80x80px)
- Question text: 24px
- Input field: Full width, 64px height
- "Next" button: Fixed bottom, full width, 64px height

### Buttons

**Primary Action Button**
- Height: 56px minimum (h-14)
- Width: Full width on mobile (w-full)
- Text: 18px semibold
- Rounded: rounded-xl (12px)
- Icon + Text combination preferred

**Icon Button** (Secondary actions)
- Size: 56x56px (touch-friendly)
- Icon: 28x28px centered
- Rounded: rounded-full

**Toggle Button** (Language Switch)
- Width: 120px, Height: 48px
- Two-state design with smooth slide animation
- Flag icons: 24x24px

### Visual Feedback

**Loading States**
- Skeleton screens for content loading
- Large spinner (48x48px) for actions
- "Saving for offline" message with icon

**Empty States**
- Large illustration (200x200px)
- Short message: 20px
- Suggested action button below

**Success/Error Alerts**
- Toast notifications at bottom
- 56px height, full width
- Icon (24x24px) + message
- Auto-dismiss after 4 seconds

---

## Icons

**Library**: Heroicons (via CDN) for consistency
**Size Standards**:
- Navigation icons: 32x32px
- Card header icons: 24x24px
- Action icons: 24x24px
- Feature/category icons: 48x48px
- Onboarding step icons: 80x80px

**Essential Icons**:
- Home, Lightbulb (Tips), Bug (Pest), User (Profile)
- Camera, Microphone, Play, Speaker
- Droplet (Irrigation), Sun (Planting), Sprout (Crop)
- CheckCircle, Calendar, Map

---

## Images

**Hero Section** (Home Screen):
- Full-width banner image: 240px height
- Image: Farmer in field with crops (authentic, local context)
- Overlay: Gradient overlay for text legibility
- Content: Welcome message in selected language + farmer name

**Pest Help Section**:
- Photo upload preview: Square, 200x200px
- Result image: Identified pest/disease, 160x160px
- Placeholder: Camera icon illustration

**Tips Cards**:
- Small thumbnail images: 64x64px circular crops
- Visual representations: Seeds, water drops, pest illustrations

**Onboarding**:
- Step illustrations: 200x200px, simple line art showing crop, location, soil

**Image Guidelines**:
- Use authentic photos of Indian farmers and crops
- Illustrations should be simple, high-contrast line art
- Compress all images for offline performance (<50KB each)
- Provide alt text in both Hindi and English

---

## Accessibility & Offline

### Touch Targets
- All interactive elements: Minimum 56x56px
- Spacing between adjacent targets: Minimum 8px

### Contrast
- Text on backgrounds: WCAG AA minimum (4.5:1 for normal text)
- Icons on backgrounds: 3:1 minimum
- High contrast mode support for outdoor visibility

### Offline Indicators
- Persistent top banner when offline (24px height)
- Cached content marked with offline icon
- "Save for offline" option on all tips

### Audio Support
- Text-to-speech for all tips (Hindi/English)
- Voice input for pest queries
- Large play/pause buttons (56x56px)

---

## Animation Guidelines

**Minimal & Purposeful Only**:
- Page transitions: Simple slide (200ms)
- Button feedback: Scale down slightly on press (100ms)
- Loading: Pulse animation on skeleton screens
- Success: Single checkmark animation on task completion

**Avoid**:
- Decorative animations
- Auto-playing content
- Parallax or scroll-triggered effects

---

## Layout Examples

### Home Screen Structure
1. Top bar (64px): Logo + Language toggle
2. Hero banner (240px): Welcome image with greeting
3. Weekly card (auto-height): Checklist
4. Quick tips grid (2-column on tablet): 3-4 prominent tip cards
5. Bottom navigation (72px): 4 icons

### Onboarding Flow
- Single-screen steps, no scrolling
- Large central icon
- Question + dropdown
- Bottom: Progress dots + Next button

### Tips Screen
- Search/filter bar (64px) - icon-based
- Category tabs (56px) - icon + text
- Vertical scrolling cards with generous spacing (gap-6)
- Pull-to-refresh for updates

### Pest Help Screen
- Large upload zone (center)
- Voice input alternative (below)
- Recent queries list (bottom half)
- Each result: Expandable card with image + advice + audio