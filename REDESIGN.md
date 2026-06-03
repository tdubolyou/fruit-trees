# Fruit Trees of Toronto - Redesign Documentation

## Project Overview
**Goal**: Modernize the Fruit Trees of Toronto application into a Svelte-based app with AI-enhanced features  
**Approach**: Design Thinking methodology  
**Date Started**: April 28, 2026

---

## Current State Analysis

### Application Purpose
An interactive map showing fruiting trees on public land in Toronto, enabling:
- Urban exploration and discovery
- General interest in spatial patterns
- Operational fruit picking activities
- Educational awareness of urban food sources

### Current Implementation (2018 Version)

#### Technical Stack
- **Frontend**: Vanilla HTML/CSS/JavaScript (single file: `index.html`)
- **Mapping**: Mapbox GL JS v0.45.0 (2018 version - outdated)
- **Data Source**: City of Toronto Open Data (2017 dataset)
- **Hosting**: Static site
- **File Size**: ~26KB single HTML file

#### Core Features

1. **Interactive Map Display**
   - Dark-themed Mapbox map centered on Toronto
   - Fruit trees displayed as colored circles
   - Circle size = tree diameter (DBH - Diameter at Breast Height)
   - Zoom range: 11-14
   - Fixed bounds to Toronto area

2. **Filtering System**
   - **By Type** (8 categories):
     - Apple
     - Apricot
     - Peach
     - Plum
     - Cherry (Cherry, Choke, Purpleleaf, Sargent)
     - Pear (Bradford Pear, Pear)
     - Berries (Mulberry, Black/Red Mulberry, Hackberry)
     - Nuts (Walnut, Black Walnut, American Chestnut, American Hazel, Hazel)
   
   - **By Ripening Month**: 
     - Slider control (April - December)
     - Can combine with type filters

3. **Information Display**
   - **On Hover Tooltip**:
     - Tree type (common name)
     - Individual tree diameter
     - Average diameter for that species
     - Fruit ripening time

4. **Mobile Responsiveness**
   - Collapsible sidebar
   - Mobile-optimized info button
   - Responsive layout breakpoint at 700px

#### Data Structure
Trees categorized by 18 common names:
- APPLE
- CHERRY, CHOKE CHERRY, PURPLELEAF CHERRY, SARGENT CHERRY
- WALNUT, BLACK WALNUT
- APRICOT
- BRADFORD PEAR, PEAR
- PLUM
- PEACH
- MULBERRY, BLACK (RED) MULBERRY
- HACK-BERRY
- AMERICAN CHESTNUT, AMERICAN HAZEL, HAZEL

#### Current Strengths
 -Simple, focused user experience  
 -Effective visual representation (color + size encoding)  
 -Useful filtering capabilities  
 -Mobile-friendly design  
 -Fast loading (single static file)  
 -Clear visual hierarchy  
 -Good information density  

#### Current Limitations
- **Data Currency**: Dataset from 2017 (9 years old)
- **Data Accuracy**: Known inaccuracies in source data
- **Technology Debt**: 
  - Mapbox GL JS v0.45.0 (2018) vs current v3.x
  - Vanilla JS patterns vs modern framework
  - No build system or dependency management
- **Limited Functionality**:
  - No routing/navigation to trees
  - No personalization (favorites, lists)
  - No location services integration
  - No predictive or seasonal intelligence
  - No educational content
  - No accessibility information
  - No multi-language support
- **No Return Visit Value**: Static data with no temporal features
- **Discovery Limitations**: 
  - Filter-only interface (no search)
  - No smart recommendations
  - No contextual suggestions

---

## User Research Insights

### Primary Use Cases
1. **Urban Exploration**: Discovering fruit trees during walks/bike rides
2. **Spatial Interest**: Understanding patterns of urban fruit trees
3. **Operational Foraging**: Planning actual fruit picking activities

### User Feedback
- **Primary Pain Point**: Data currency and accuracy
- **User Expectation**: Information accurate enough to trust for in-person visits
- **Value Proposition**: "Value in visiting the site to see what exists on the ground"

### Key User Need
> Users want to visit trees in real life based on app information - trust and accuracy are critical

---

## Design Thinking Process

### Phase 1: Empathize 
- Identified core user motivations
- Understood primary pain points
- Recognized the trust/accuracy challenge

### Phase 2: Define 

**Core Problem Statement**:
*"How might we create a trustworthy, intelligent fruit tree discovery experience that provides real value for people visiting trees on the ground, while respecting that data accuracy and currency are foundational requirements?"*

**Constraints**:
- Fresh, accurate data will be available (solvable problem): https://open.toronto.ca/dataset/street-tree-data/
- No reliance on user-generated content
- Must maintain or improve current simplicity
- Focus on AI-enhanced usability

**Problem Themes Identified**:

#### Theme 1: Content Depth & Richness
**Current State**: Minimal information (species name, diameter, ripening month)

**Problems to Solve**:
1. **Species Information Gap**
   - Users lack educational context about each tree species
   - No identification guidance for on-the-ground verification
   - Missing practical information (growth characteristics, native status, ecological value)
   - No visual references for species recognition

2. **Visual Representation**
   - No tree-specific graphics or illustrations
   - Map relies solely on colored circles
   - Difficult to visually distinguish species beyond color

3. **Contextual Layers Missing**
   - Map shows only fruit trees in isolation
   - No neighborhood context
   - No historical or ecological layers
   - No infrastructure context (parks, bike paths, transit)

4. **Basemap Limitations**
   - Generic dark map style
   - Not optimized for fruit tree discovery
   - Limited customization options

**Desired State**:
- Rich species guides with identification details, growing characteristics, ecological info
- Custom graphics/illustrations for each species
- Multiple contextual map layers users can toggle
- Custom basemap designed specifically for fruit tree exploration

**Information Sources Identified**:
-  [Toronto Species Guide](https://www.toronto.ca/services-payments/water-environment/trees/tree-planting/species-planted-on-streets/) - comprehensive tree data
  - Mature size, growth rate, sensitivity
  - Flowers, fall color, fruit characteristics
  - Native status, wildlife value
  - Recommended locations
- Additional needed: Fruit-specific guides, foraging info, recipes, identification photos

---

#### Theme 2: AI Interaction & Intelligence
**Current State**: Static data display with manual filtering only

**Problems to Solve**:
1. **Geographic Analysis Gap**
   - No area-based summaries or insights
   - Users can't quickly understand "what's in my neighborhood?"
   - No comparative analysis between areas
   - Missing pattern recognition

2. **Interaction Limitations**
   - Filter-only interface (no conversational queries)
   - No personalized recommendations
   - No predictive or temporal intelligence
   - No contextual suggestions based on user state

3. **Information Overload**
   - Too many trees to process visually
   - No smart prioritization
   - No guided discovery paths

**Desired State**:
- **Pre-packaged Geographic Summaries**:
  - By Ward (25 wards in Toronto)
  - By Census Tract (CT)
  - By Neighborhood (140+ official neighborhoods)
  - Custom boundary support (draw area → get summary)
  
  Example Summary Structure:
  ```
  Ward 10 - Spadina-Fort York
  - Total fruit trees: 234
  - Most common: Cherry (67), Pear (45), Apple (38)
  - Diversity index: 6 species
  - Peak season: August-September
  - Notable clusters: [locations]
  - Age distribution: [chart]
  - Ripeness forecast this week: [species]
  ```

- AI-powered conversational interface
- Contextual recommendations
- Predictive ripeness modeling
- Pattern detection and insights

---

#### Theme 3: Accessibility & Inclusivity
**Current State**: Basic responsive design, no formal accessibility compliance

**Problems to Solve**:
1. **WCAG 2.1 AA Non-Compliance**
   - Color contrast ratios not verified
   - Keyboard navigation incomplete
   - Screen reader support limited
   - Touch target sizes may be insufficient
   - No skip navigation links
   - Map interactions not fully accessible

2. **Physical Accessibility Information Missing**
   - No indication of tree reachability
   - No terrain/mobility information
   - No public transit accessibility data

3. **Cognitive Accessibility Gaps**
   - Interface may be overwhelming
   - No simplified mode
   - Information architecture could be clearer

4. **Sensory Accessibility**
   - Color-only coding for tree types
   - No alternative visual encodings
   - No audio descriptions for map features

**Desired State**:
- **Full WCAG 2.1 Level AA Compliance**:
  -  Perceivable: Color contrast 4.5:1+, text alternatives, adaptable content
  -  Operable: Keyboard accessible, sufficient time, seizure-safe, navigable
  -  Understandable: Readable, predictable, input assistance
  -  Robust: Compatible with assistive technologies

- Physical accessibility indicators for each tree
- Multiple sensory channels for information
- Progressive disclosure to reduce cognitive load
- Simplified mode option

---

### Phase 3: Ideate 
*(Features brainstormed - see Feature Brainstorm section below)*

### Phase 4: Prototype
*(Next phase - to be developed)*

### Phase 5: Test
*(To be conducted with prototype)*

---

## Feature Brainstorm

### Mapping Features to Problem Themes

| Feature | Content | AI Interaction | Accessibility |
|---------|---------|----------------|---------------|
| Species Guide Library | ● ● ● | | ● |
| Custom Tree Graphics | ● ● ● | | ● |
| Additional Map Layers | ● ● ● | | ● |
| Enhanced Basemap | ● ● | | ● |
| Geographic Summaries | ● | ● ● ● | ● |
| Natural Language Search | | ● ● ● | ● ● |
| Dashboard Questions | ● | ● ● | ● ● |
| Story Map | ● ● ● | ● ● | ● |
| Predictive Intelligence | | ● ● ● | |
| Smart Routing | | ● ● | ● ● |
| AI Assistant/Chatbot | ● ● | ● ● | ● ● |
| Visual Intelligence | ● ● | ● | ● |
| Accessibility Features | | | ● ● ● |

● ● ● = Primary impact
● ● = Secondary impact
● = Tertiary impact

---

### Category A: Content & Information Architecture

#### 1. Species Guide Library
**Concept**: Comprehensive, beautifully designed guides for each fruit tree species

**Problem Addressed**: Theme 1 - Content Depth

**Structure** (following Toronto's street tree model):

**Per-Species Page/Panel**:
```
┌─────────────────────────────────────────┐
│  🍎 APPLE (Malus domestica)             │
│  ───────────────────────────────────    │
│  [Hero Image/Illustration]              │
│                                         │
│  Quick Facts                            │
│  • Native Status: Introduced            │
│  • Mature Size: Medium (8-12m)          │
│  • Growth Rate: Medium                  │
│  • Fall Color: Yellow-green             │
│  • Fruit Season: August-October         │
│                                         │
│  Identification                         │
│  • Leaves: Simple, oval, serrated       │
│  • Bark: Grey-brown, fissured           │
│  • Flowers: White-pink, spring          │
│  • Fruit: Pome, 5-10cm diameter         │
│                                         │
│  Ripeness Indicators                    │
│  • Color: Green → Yellow/Red            │
│  • Firmness: Gives slightly to pressure │
│  • Seeds: Dark brown to black           │
│  • Taste test: Sweet, not starchy       │
│                                         │
│  Foraging Notes                         │
│  • Best picking time: Late Sept - Oct   │
│  • Storage: 2-4 weeks refrigerated      │
│  • Uses: Fresh eating, cooking, cider   │
│  • Safety: Avoid heavily trafficked     │
│           areas, wash thoroughly        │
│                                         │
│  Ecological Value                       │
│  • Pollinator support: High (spring)    │
│  • Wildlife food: Birds, mammals        │
│  • Shade provision: Moderate            │
│                                         │
│  In Toronto                             │
│  • Total trees: [count]                 │
│  • Neighborhoods: [top 3]               │
│  • Oldest specimen: ~[age] years        │
│  • Peak locations: [map thumbnail]      │
│                                         │
│  [View All Apples on Map] [Recipes]     │
└─────────────────────────────────────────┘
```

**Content Sources**:
- Toronto tree species database (already documented)
- Ontario foraging guides
- Horticulture databases
- Ecological research
- AI-generated summaries with human review

**Visual Assets Needed**:
- Tree silhouette (full form)
- Leaf close-up (identification)
- Bark texture
- Flower close-up
- Fruit at various ripeness stages
- Seasonal progression (spring → summer → fall → winter)

**Technical Approach**:
- Structured data (JSON/YAML per species)
- Markdown for descriptive content
- SVG illustrations for botanical features
- Photo galleries with captions
- Responsive cards/panels
- Progressive loading

**Accessibility**:
- Alt text for all images
- Structured heading hierarchy
- Keyboard navigable
- Screen reader optimized descriptions

---

#### 2. Custom Tree Graphics & Icons
**Concept**: Beautiful, distinctive visual representations for each species

**Problem Addressed**: Theme 1 - Visual Representation

**Asset Types**:

**A. Map Markers (Multiple Styles)**
- **Minimal**: Colored circles (current)
- **Icon**: Simple fruit icon overlay (apple, pear, cherry, etc.)
- **Illustrated**: Stylized tree silhouette with fruit
- **Seasonal**: Different appearance by season/ripeness

**B. Species Illustrations**
- Full tree form (botanical illustration style)
- Leaf patterns
- Fruit cross-sections
- Flower details
- Seasonal variations

**C. UI Icons**
- Filter category icons
- Navigation elements
- Feature status icons (ripe, past peak, etc.)

**Design Approach**:
- Consistent illustration style (line art + flat color)
- Accessible color palette (from design system)
- Multiple sizes (16px → 512px)
- SVG format (scalable, small file size)
- Dark theme optimized

**Implementation**:
- Icon library (Svelte components)
- Dynamic marker generation
- LOD (Level of Detail) for map zoom levels
- User preference for marker style

---

#### 3. Additional Context Map Layers
**Concept**: Toggle-able map layers providing geographic context

**Problem Addressed**: Theme 1 - Contextual Layers

**Layer Categories**:

**A. Infrastructure Layers**
- **Parks & Green Spaces**: Highlight park boundaries, ravines, trails
- **Bike Network**: Bike lanes, trails, bike share stations
- **Transit**: Subway, streetcar, bus routes + stops
- **Parking**: Public parking locations
- **Water Fountains**: Hydration stops for foraging trips

**B. Administrative Boundaries**
- **Wards**: 25 political wards (for summaries)
- **Neighborhoods**: 140+ official neighborhoods
- **Census Tracts**: Fine-grained statistical areas
- **Custom Areas**: User-drawn polygons

**C. Historical/Cultural Layers**
- **Building Age**: Choropleth showing construction eras
- **Heritage Sites**: Designated heritage properties
- **Community Gardens**: Urban agriculture locations
- **Farmers Markets**: Seasonal market locations

**D. Environmental Layers**
- **Tree Canopy**: Overall canopy coverage (context for fruit trees)
- **Elevation/Terrain**: Topography for accessibility
- **Soil Quality**: Where available from city data
- **Microclimates**: Urban heat islands, cooler areas

**E. Temporal Layers**
- **Current Ripeness**: Heatmap of ready-to-pick trees
- **Historical Harvests**: User patterns (if tracking allowed)
- **Seasonal Patterns**: Animation showing ripeness over year

**Technical Approach**:
- Vector tiles for performance
- Layer toggle controls (sidebar/menu)
- Opacity sliders
- Layer combinations presets
- Legend for each layer
- Mapbox/MapLibre layer groups

**Accessibility**:
- Keyboard toggle
- Screen reader announcements
- Pattern fills in addition to colors
- High contrast mode

---

#### 4. Enhanced Custom Basemap
**Concept**: Purpose-built basemap optimized for fruit tree discovery

**Problem Addressed**: Theme 1 - Basemap Limitations

**Design Requirements**:

**Visual Hierarchy**:
1. Fruit trees (highest priority)
2. Parks/green spaces (context)
3. Major streets (navigation)
4. Water bodies (orientation)
5. Everything else (minimal)

**Style Specifications**:
```javascript
{
  // Base colors from design system
  background: '#0a0a0a',
  water: '#1a2332',
  parks: '#0d1a0d', // subtle darker green
  land: '#1a1a1a',
  
  // Simplified roads
  motorway: { color: '#3a3a3a', width: 'scaled' },
  major: { color: '#2a2a2a', width: 'scaled' },
  minor: { display: 'none at lower zooms' },
  
  // Minimal labels
  neighborhoods: { 
    color: '#666666',
    font: 'var(--font-primary)',
    size: 'scaled',
    display: 'zoom >= 12'
  },
  streets: {
    display: 'zoom >= 14',
    color: '#555555'
  },
  
  // Hide clutter
  POIs: { display: 'none' },
  buildings: { 
    display: 'zoom >= 14',
    fill: '#242424',
    opacity: 0.3
  }
}
```

**Map Modes**:
- **Dark Mode** (default): Current style
- **Light Mode**: For daytime outdoor use (high contrast)
- **Satellite Hybrid**: Aerial imagery + tree markers
- **Terrain**: Topographic for accessibility planning

**Interactions**:
- Smooth zoom transitions
- Pitch/tilt for 3D exploration
- Bearing rotation
- Gesture support (pinch, rotate on mobile)

**Performance**:
- Vector tiles (fast, crisp at any zoom)
- Aggressive label decluttering
- Simplified geometries
- Progressive enhancement

---

### Category B: Interactive Intelligence

#### 5. Geographic Boundary Summaries
**Concept**: AI-generated insights for predefined and custom geographic areas

**Problem Addressed**: Theme 2 - Geographic Analysis Gap

**Boundary Types**:

**A. Predefined Boundaries**

**1. Wards (25 in Toronto)**
```
Ward 10: Spadina-Fort York Summary
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

📊 Overview
├─ Total fruit trees: 234
├─ Trees per km²: 18.7
├─ Ward ranking: 3rd of 25
└─ Last updated: Apr 28, 2026

🌳 Species Breakdown
├─ Cherry (28.6%) ████████████ 67 trees
├─ Pear (19.2%) ████████ 45 trees
├─ Apple (16.2%) ███████ 38 trees
├─ Plum (14.1%) ██████ 33 trees
├─ Mulberry (10.3%) █████ 24 trees
├─ Walnut (6.8%) ███ 16 trees
├─ Peach (3.4%) ██ 8 trees
└─ Apricot (1.3%) █ 3 trees

📈 Diversity
├─ Species count: 8
├─ Diversity index: 0.79 (High)
└─ Compare to city average: +12%

📅 Seasonal Profile
├─ Peak season: August-September
├─ Longest season: April-October (cherry)
└─ Currently ripe: Mulberry (24 trees)

🗺️ Distribution Patterns
├─ Notable clusters:
│  • Fort York corridor (18 trees, 0.2km²)
│  • Garrison Common (12 trees)
│  • Bathurst Quay (9 trees)
├─ Dispersion: Even (cluster index: 0.42)
└─ Accessibility: 87% near bike paths

🌱 Tree Characteristics
├─ Average DBH: 32.4cm
├─ Estimated avg age: 28 years
├─ Size distribution:
│  • Small (0-20cm): 15%
│  • Medium (20-40cm): 62%
│  • Large (40cm+): 23%
└─ Oldest specimen: ~67 years (Walnut, Liberty Village)

🎯 Top Locations
1. Fort York Blvd @ Bathurst - 8 trees in 100m
2. Garrison Common North - 6 diverse species
3. Queens Quay W corridor - Cherry-lined path

🔮 This Week's Forecast
├─ Ready to pick: Mulberry (peak)
├─ Ripening soon: Early cherries (3-5 days)
└─ Weather impact: Warm week = earlier ripening

📍 Getting Here
├─ TTC: 511 Bathurst, 509 Harbourfront
├─ Bike: Waterfront Trail, Bathurst bike lane
└─ Parking: Limited street parking

[View on Map] [Compare to Other Wards] [Download Data]
```

**2. Neighborhoods (140+ official)**
- Similar structure, neighborhood-scale
- More granular distribution analysis
- Compare to adjacent neighborhoods

**3. Census Tracts**
- Statistical analysis
- Demographic correlations (optional, privacy-conscious)
- Density metrics

**B. Custom Boundaries**

**Draw-Your-Own Area Tool**:
- Click map to draw polygon
- Or search address + radius
- Instant summary generation
- Save/share custom areas

**AI Analysis Features**:
- Automatic cluster detection
- Route suggestions within area
- Comparative ranking
- Temporal patterns
- Diversity scoring
- Accessibility analysis

**Technical Approach**:
- Pre-computed summaries for standard boundaries (cached)
- Real-time computation for custom areas
- Spatial database queries (PostGIS or similar)
- AI-generated narrative text
- Data visualization (charts, mini-maps)
- Export options (PDF, JSON, shareable link)

**Accessibility**:
- Screen reader friendly tables
- Alt text for charts
- Keyboard navigable comparisons
- Plain language summaries

---

### Category B: Interactive Intelligence (continued)

#### 1. Natural Language Exploration
**Concept**: Conversational interface for exploring fruit trees

**Features**:
- Conversational search: "Show me pear trees within 20 minutes that ripen in September"
- Smart query interpretation: "good trees for a weekend bike ride" or "easy picking for kids"
- Context-aware follow-ups: "Show me more like these" or "What's nearby that ripens earlier?"
- Multi-parameter queries combining location, time, species, accessibility

**AI Component**:
- Natural language processing to parse user intent
- Geocoding and spatial reasoning
- Query optimization and suggestion

**User Value**: Eliminates complex filter combinations, makes exploration intuitive

---

#### 2. Fruit Trees Dashboard
**Concept**: At-a-glance insights with predefined questions and answers structured intuitively

**Dashboard Panels**:

**Quick Stats**
- Total trees in Toronto: [dynamic count]
- Currently ripe: [count] trees across [x] species
- Ripening this week: [count]
- Peak season: [current/upcoming]

**Predefined Smart Questions** (card-based interface)
- 🍎 "What's ripe near me right now?"
  - Auto-geolocates, shows nearby ripe trees on mini-map
  - Click to expand full view
  
- 🗓️ "What can I pick this month?"
  - Calendar-style visualization
  - Species breakdown by week
  
- 🚴 "Best fruit picking routes near me?"
  - 3 pre-generated routes (short/medium/long)
  - Shows distance, duration, tree count, diversity
  
- 📊 "Which fruit trees are most common?"
  - Visual ranking with species distribution
  - Interactive - click to filter map
  
- 🌳 "What's the oldest tree I can visit?"
  - Estimated age leaders (see Story Map feature)
  - Historical context
  
- 🥧 "What can I make with today's harvest?"
  - Recipe suggestions based on currently ripe species
  - Links to preparation guides
  
- 🌡️ "How's weather affecting ripening?"
  - AI-generated ripeness forecast
  - "Warmer week = cherries 3-5 days early"

**Design Approach**:
- Card-based grid layout
- One-click answers (no navigation required)
- Visual data representation (charts, mini-maps)
- Progressive disclosure (summary → detail)
- Mobile-first design

**AI Component**:
- Dynamic answer generation
- Personalized based on location/time/season
- Predictive modeling for ripeness
- Recipe matching algorithms

**User Value**: Eliminates "what should I look for?" problem, provides instant actionable insights

---

#### 3. Story Map Component
**Concept**: Narrative-driven walkthrough exploring the history, ecology, and stories of Toronto's fruit trees

**Story Layers**:

**Layer 1: Tree Age & History**
- **Age Estimation Algorithm**:
  - Input: Species + Current DBH (diameter at breast height)
  - Calculation: Species-specific growth rates
  - Output: Estimated planting year ± confidence range
  - Example: "This apple tree (~45cm DBH) is approximately 40-50 years old, likely planted 1976-1986"

- **Historical Context Integration**:
  - Cross-reference with building ages (city property data)
  - "This pear tree predates the surrounding condos by ~15 years"
  - Identify heritage trees or notable specimens
  - Link to neighborhood development timelines

**Layer 2: Ecological Stories**
- **Species Journey**: "How did European pears arrive in Toronto?"
- **Seasonal Narratives**: "The Cherry Blossom Route - Spring in Toronto"
- **Biodiversity Tales**: "From Fruit to Forest - Urban ecology"

**Layer 3: Cultural & Community Stories**
- **Neighborhood Profiles**: "The Fruit Trees of High Park"
- **Culinary History**: "From Tree to Table - Toronto's edible landscape"
- **Urban Planning**: "How Toronto became a food forest"

**Story Map Features**:

**Interactive Timeline**
- Slider showing decades (1950s → 2020s)
- Trees fade in/out based on estimated planting date
- Historical photos/maps overlay
- "Watch Toronto's fruit forest grow"

**Curated Story Routes**
- Pre-designed narrative paths through the city
- Audio-guide style waypoints (text or actual audio)
- Example routes:
  - "The Heritage Trees Walk" (oldest specimens)
  - "Neighborhood Evolution Tour" (trees + building ages)
  - "Seasonal Journey" (follow spring → fall ripening)
  - "Species Spotlight" (deep dive on one type)

**Story Cards**
- Pop-up narratives when clicking trees
- Example: 
  ```
  🌳 The Century Walnut
  Estimated Age: 95 years (planted ~1931)
  
  This black walnut predates the surrounding neighborhood 
  by 40 years. It likely grew in an orchard that once 
  covered this area...
  
  [Read More] [Similar Trees] [Visit Route]
  ```

**Comparative Visualization**
- "Trees vs. Buildings": Toggle to show building footprints with construction dates
- Color-code: Trees older than buildings vs. newer plantings
- Pattern recognition: "Postwar planting boom" visible in spatial clusters

**AI-Generated Narratives**
- AI analyzes spatial patterns and generates observations
- "Clustering analysis reveals intentional fruit tree corridors planted in the 1980s greening initiative"
- "This neighborhood shows higher diversity (8 species) compared to city average (4.2)"

**Design Approach**:
- Cinematic presentation mode (full-screen storytelling)
- Scroll-based or click-through narrative progression
- Rich media: historical photos, illustrations, data visualizations
- Map animations synchronized with narrative
- "Explorer mode" for self-directed discovery
- "Guided mode" for linear storytelling

**Technical Components**:
- Tree age calculation engine
- Historical data integration (building ages, city records)
- Spatial analysis for pattern detection
- Content management system for stories
- Animation framework for map transitions

**User Value**: 
- Transforms data into meaning
- Provides "why" not just "where"
- Creates emotional connection to urban landscape
- Educational without being didactic
- Encourages deeper exploration and return visits

---

### Category B: Wayfinding & Navigation

#### 4. Intelligent Routing & Planning
**Concept**: AI-optimized routes for fruit picking adventures

**Features**:
- **Trip Planner**: "Create a 2-hour walking route hitting 5 apple trees"
  - Optimizes for: distance, ripeness timing, tree size, accessibility
  - Multi-objective optimization
  
- **Multi-modal Routing**: 
  - Walk/bike/transit integration
  - Real-time transit data
  - Bike share station awareness
  
- **Seasonal Route Suggestions**: 
  - AI-curated "foraging walks" based on current ripeness
  - Weekly updated "What's Good Now" routes
  
- **Route Customization**:
  - Duration slider (30 min → 4 hours)
  - Difficulty level (flat, hills okay, adventurous)
  - Tree density preference (few large trees vs. many small)
  - Species focus or diversity

**AI Component**:
- Route optimization algorithms
- Multi-criteria decision making
- Real-time data integration (weather, transit)
- Learning from spatial patterns

**User Value**: Turns exploration into curated experience, maximizes foraging efficiency

---

### Category C: Predictive & Contextual

#### 5. Predictive Intelligence
**Concept**: Forward-looking ripeness forecasting

**Features**:
- **Ripeness Forecasting**:
  - Historical weather patterns × current year data
  - Species phenology models
  - "Peak harvest window: Sept 12-18 (87% confidence)"
  
- **Personalized Alerts**: 
  - "Your saved cherry trees will be ripe in 3-5 days"
  - Browser notifications (opt-in)
  
- **Peak Time Predictions**:
  - Per-tree ripeness estimates
  - Citywide ripeness heatmap

**AI Component**:
- Weather API integration
- Phenology modeling
- Time-series prediction

**User Value**: Perfect timing for visits, reduced wasted trips

---

#### 6. Contextual Smart Recommendations
**Concept**: Right tree, right time, right place

**Features**:
- **Context-Aware Suggestions**:
  - Location + time available
  - Weather-responsive: "Rainy today? Explore satellite view mode"
  - Season/ripeness
  - Previously viewed patterns (session-based, no login required)
  
- **Discovery Engine**:
  - "Trees you haven't explored yet near your frequent areas"
  - "Similar trees to ones you've viewed"
  - Serendipity mode: deliberate randomization for surprise

**AI Component**:
- Recommendation algorithms
- Pattern matching
- Context awareness

**User Value**: Reduces decision paralysis, enables discovery

---

### Category D: Information & Education

#### 7. Educational AI Assistant
**Concept**: Chatbot for tree-specific knowledge

**Features**:
- **Tree-Specific Q&A**:
  - Click tree → chat interface appears
  - "How do I know when this is ripe?"
  - "What recipes work with these plums?"
  - "Is this safe to eat from this location?"
  
- **Identification Help**: 
  - "Show me what ripe fruit looks like on this species"
  - Comparison photos (ripe vs. unripe)
  
- **Foraging Ethics**: 
  - Contextual tips about sustainable harvesting
  - Public land etiquette
  - "Take only what you need" guidelines
  
- **Preparation Guides**:
  - Species-specific harvesting techniques
  - Storage recommendations
  - Preservation methods

**AI Component**:
- LLM-based chat interface
- Tree-context injection
- Safety-focused responses (avoid giving bad advice)

**User Value**: On-demand expertise, reduces barriers to foraging

---

#### 8. Visual Intelligence
**Concept**: AI-enhanced visual context

**Features**:
- **Smart Tree Previews**:
  - AI-generated street view thumbnails showing exact tree location
  - Circle overlay on street view
  - "Look for the large tree on the northeast corner"
  
- **Seasonal Visualization**:
  - Trees shown differently based on current ripeness status
  - Color intensity = ripeness confidence
  - Icon states: budding → flowering → ripening → ready → past peak
  
- **Context Awareness**:
  - Highlight trees based on time of day (daylight hours)
  - Weather overlays
  - Seasonal map themes

**AI Component**:
- Image processing for street view matching
- Computer vision for tree identification in imagery
- Dynamic styling algorithms

**User Value**: Easier ground-truthing, visual confirmation before visiting

---

### Category E: Accessibility & Inclusivity

#### 9. WCAG 2.1 AA Compliance Implementation
**Concept**: Full accessibility compliance for all users

**Problem Addressed**: Theme 3 - Accessibility & Inclusivity

**WCAG 2.1 Level AA Requirements**:

---

**Principle 1: Perceivable**

**1.1 Text Alternatives**
-  All images have descriptive alt text
-  Map markers have accessible labels
-  Complex graphics (charts) have detailed descriptions
-  Decorative images marked appropriately (alt="")

**1.2 Time-based Media** (if video/audio added)
-  Captions for audio content
-  Audio descriptions for video
-  Transcripts available

**1.3 Adaptable Content**
-  Semantic HTML structure (proper headings hierarchy)
-  Content order makes sense when linearized
-  Instructions don't rely on sensory characteristics alone
  - - Bad: "Click the red button"
  -  Good: "Click the 'Filter' button (marked in red)"
-  Responsive to user's preferred orientation
-  Input purpose identified (autocomplete attributes)

**1.4 Distinguishable**
-  **Color Contrast**:
  - Normal text: 4.5:1 minimum
  - Large text (18pt+): 3:1 minimum
  - UI components: 3:1 minimum
  - Verified against all backgrounds
  
-  **Text Resizing**: Works up to 200% without loss of content
-  **Images of Text**: Avoided except for logos
-  **Reflow**: Content reflows at 320px without horizontal scroll
-  **Text Spacing**: User can adjust without loss of content
-  **Content on Hover/Focus**: Dismissible, hoverable, persistent
-  **Non-text Contrast**: UI components and graphics 3:1 minimum

**Color Independence**:
```
Tree Categories - Multi-Channel Encoding:
├─ Color: Distinct hues (current)
├─ Shape: Different marker shapes per category
├─ Pattern: Fill patterns in filters/legends
└─ Text label: Always available on demand

Example:
🍎 Apple:   Color=#e41a1c + Circle + Solid fill
🍑 Peach:   Color=#ff7f00 + Diamond + Diagonal lines
🍒 Cherry:  Color=#e78ac3 + Heart + Dots
```

---

**Principle 2: Operable**

**2.1 Keyboard Accessible**
-  All functionality available via keyboard
-  No keyboard traps
-  Keyboard shortcuts documented
-  Character key shortcuts can be disabled/remapped

**Keyboard Navigation Map**:
```
Tab Order:
1. Skip to main content
2. Navigation menu
3. Filter controls
4. Map controls (zoom, layers)
5. Map markers (focusable, Tab cycles through)
6. Sidebar content
7. Footer

Shortcuts:
├─ ? : Show keyboard shortcuts
├─ / : Focus search
├─ Esc : Close modals/panels
├─ Arrow keys : Navigate map
├─ +/- : Zoom in/out
├─ Tab : Cycle through markers
├─ Enter : Select marker/activate control
└─ Space : Toggle filters
```

**2.2 Enough Time**
-  No time limits on interactions
-  Auto-updating content can be paused (if any)
-  Session timeouts warned with option to extend

**2.3 Seizures and Physical Reactions**
-  No flashing content > 3 times per second
-  Animation respects `prefers-reduced-motion`
-  No parallax effects for users who request reduced motion

**2.4 Navigable**
-  Skip navigation links ("Skip to map", "Skip to content")
-  Descriptive page titles
-  Logical focus order
-  Link purposes clear from text (no "click here")
-  Multiple ways to find content (search, nav, sitemap)
-  Headings and labels descriptive
-  Focus indicator visible (2px outline, high contrast)

**2.5 Input Modalities**
-  Touch targets minimum 44x44px
-  Pointer cancellation (up-event)
-  Label in name matches accessible name
-  Motion actuation has alternative
-  Works with one pointer (no multitouch requirement)

---

**Principle 3: Understandable**

**3.1 Readable**
-  Language of page identified (`<html lang="en">`)
-  Language of parts identified (if multilingual)
-  Plain language writing (Grade 8-10 reading level)
-  Difficult words/jargon explained in glossary

**3.2 Predictable**
-  Focus doesn't cause unexpected context changes
-  Input doesn't cause unexpected context changes
-  Navigation consistent across pages/views
-  Components identified consistently
-  Change requests confirmed before execution

**3.3 Input Assistance**
-  Error identification (form validation)
-  Labels or instructions provided
-  Error suggestions offered
-  Error prevention for critical actions (confirmations)
-  Context-sensitive help available

---

**Principle 4: Robust**

**4.1 Compatible**
-  Valid HTML (passes W3C validator)
-  No duplicate IDs
-  Proper parent-child relationships
-  ARIA attributes used correctly
-  Status messages announced

**ARIA Implementation**:
```html
<!-- Map region -->
<div role="application" aria-label="Interactive fruit tree map">
  <div role="toolbar" aria-label="Map controls">
    <button aria-label="Zoom in" aria-pressed="false">+</button>
    <button aria-label="Zoom out">-</button>
  </div>
  
  <!-- Filter controls -->
  <div role="group" aria-labelledby="filter-heading">
    <h2 id="filter-heading">Filter by fruit type</h2>
    <button role="switch" 
            aria-checked="true" 
            aria-label="Show apple trees">
      <span aria-hidden="true">🍎</span> Apple
    </button>
  </div>
  
  <!-- Live region for dynamic updates -->
  <div role="status" aria-live="polite" aria-atomic="true">
    234 trees found in current view
  </div>
  
  <!-- Map markers -->
  <button role="button" 
          aria-label="Apple tree at 123 Main Street, 
                      diameter 45cm, ripe in September"
          tabindex="0">
  </button>
</div>
```

---

**Additional Accessibility Features**:

**Screen Reader Optimization**
- Descriptive map announcements
- Landmark regions properly labeled
- Skip to map/content links
- Form labels properly associated
- Status updates announced via live regions

**High Contrast Mode**
- Detects system preference (`prefers-contrast: high`)
- Increased contrast theme
- Borders on all interactive elements
- Patterns in addition to colors

**Reduced Motion**
- Detects `prefers-reduced-motion: reduce`
- Disables animations and transitions
- Instant state changes instead of animated
- No parallax or auto-playing content

**Text Customization Support**
```css
/* Supports user text spacing adjustments */
* {
  /* Allow line height override */
  line-height: max(1.5, var(--user-line-height, 1.5));
  
  /* Allow letter spacing override */
  letter-spacing: max(0.12em, var(--user-letter-spacing, 0));
  
  /* Allow word spacing override */
  word-spacing: max(0.16em, var(--user-word-spacing, 0));
  
  /* Allow paragraph spacing override */
  margin-bottom: max(2em, var(--user-paragraph-spacing, 0));
}
```

**Font & Typography**
- Minimum 16px base font size
- Relative units (rem, em) not pixels
- Resizable to 200% without breakage
- System font stack as fallback
- No justified text (readability)

**Focus Management**
```css
:focus-visible {
  outline: 2px solid var(--color-accent-primary);
  outline-offset: 2px;
  box-shadow: 0 0 0 4px rgba(74, 158, 255, 0.2);
}

/* Skip link */
.skip-link {
  position: absolute;
  top: -40px;
  left: 0;
  padding: 8px;
  background: var(--color-accent-primary);
  color: white;
  z-index: 1000;
}

.skip-link:focus {
  top: 0;
}
```

---

#### 10. Physical Accessibility Intelligence
**Concept**: Understanding on-the-ground accessibility

**Problem Addressed**: Theme 3 - Physical Accessibility Information

**Features**:

**Terrain & Mobility Analysis**:
- Sidewalk presence/quality
- Slope/elevation data (% grade)
- Curb cuts at intersections
- Surface type (paved, gravel, grass)
- Barriers (stairs, narrow passages)

**Accessibility Scoring**:
```
Tree #12345: Apple at High Park
━━━━━━━━━━━━━━━━━━━━━━━━━━━━

♿ Accessibility: EXCELLENT
├─ Terrain: Flat, paved path
├─ Reach: Low branches, no ladder needed
├─ Parking: Accessible parking 50m away
├─ Transit: 506 Carlton (accessible) - 100m
├─ Facilities: Accessible washroom 200m
└─ Rest areas: Benches nearby

⚠️ Considerations:
• Path 1.5m wide (wheelchair accessible)
• Smooth asphalt surface
• Well-lit area (safe anytime)
• Heavy foot traffic (good for safety)
```

**Accessibility Levels**:
- 🟢 **Easy Access**: Paved, flat, near parking/transit
- 🟡 **Moderate**: Some obstacles, manageable for most
- 🟠 **Challenging**: Stairs, steep slopes, rough terrain
- ⚪ **Unknown**: Insufficient data

**Picking Accessibility**:
- Tree height vs. reachability
- Low-hanging fruit indicator
- Ladder requirement estimate
- Fruit drop potential (pick from ground)

**Safety Assessment**:
- Traffic volume (quiet street vs. busy road)
- Lighting (day-only vs. evening-ok)
- Isolation vs. well-traveled
- Public vs. semi-private property clarity

**Route Planning Accessibility**:
- Filter routes by accessibility level
- Avoid stairs/steep grades option
- Prioritize accessible parking
- Transit accessibility consideration
- Rest stop placement

**Data Sources**:
- City sidewalk/infrastructure data
- OpenStreetMap accessibility tags
- Elevation data (SRTM, city LiDAR)
- Transit accessibility info (TTC)
- Street view imagery analysis (AI)

---

#### 11. Cognitive Accessibility Features
**Concept**: Reducing cognitive load and complexity

**Problem Addressed**: Theme 3 - Cognitive Accessibility

**Features**:

**Simplified Mode**
- Toggle to "Easy Mode"
- Reduced visual complexity
- Fewer options shown at once
- Larger touch targets
- Simpler language
- Step-by-step guidance

**Progressive Disclosure**
- Show essential info first
- "Learn more" expands details
- Collapsible sections
- Wizard-style flows for complex tasks

**Consistent Patterns**
- Same actions work same way everywhere
- Predictable navigation
- Familiar iconography
- Clear mental models

**Error Prevention & Recovery**
- Undo capability
- Confirmation for destructive actions
- Helpful error messages
- Suggested corrections

**Clear Information Architecture**
- Logical grouping
- Clear headings
- Breadcrumb navigation
- Visual hierarchy

**Reduce Distractions**
- Focus mode (hide non-essential UI)
- Pause auto-updates
- Minimal animations
- Clean, uncluttered design

---

#### 12. Testing & Validation
**Concept**: Ensuring accessibility compliance

**Testing Tools**:
-  axe DevTools (automated testing)
-  WAVE (Web Accessibility Evaluation Tool)
-  Lighthouse (Chrome accessibility audit)
-  NVDA/JAWS screen readers (manual testing)
-  VoiceOver (macOS/iOS testing)
-  Keyboard-only navigation testing
-  Color contrast analyzers
-  HTML validator (W3C)

**Testing Checklist**:
- [ ] All images have alt text
- [ ] Color contrast ratios verified
- [ ] Keyboard navigation complete
- [ ] Screen reader announces correctly
- [ ] Focus indicators visible
- [ ] Touch targets adequate size
- [ ] Forms have labels
- [ ] ARIA attributes correct
- [ ] No flashing content
- [ ] Reduced motion respected
- [ ] Text resizable to 200%
- [ ] No horizontal scroll at 320px
- [ ] Skip navigation works
- [ ] Headings hierarchical
- [ ] Language identified
- [ ] Error messages helpful

**User Testing**:
- Recruit users with disabilities
- Test with assistive technologies
- Observe real usage patterns
- Iterate based on feedback

---

---

## Problem-Solution Matrix

### Theme 1: Content Depth & Richness

| Problem | Solution Feature | Priority | Complexity |
|---------|-----------------|----------|------------|
| Lack of species info | Species Guide Library | ● ● ● | Medium |
| No visual references | Custom Tree Graphics & Icons | ● ● ● | Medium |
| Missing context | Additional Map Layers | ● ● | High |
| Generic basemap | Enhanced Custom Basemap | ● ● | Medium |
| No educational content | Educational AI Assistant | ● | Medium |
| Limited identification help | Visual Intelligence + Species Guides | ● ● | High |

**Data Requirements**:
-  Toronto tree species database (available)
- ⚠️ Fruit-specific foraging guides (needs curation)
- ⚠️ Species illustrations/photos (needs creation/licensing)
-  City infrastructure data (available - open data)
- ⚠️ Historical/building age data (partially available)

---

### Theme 2: AI Interaction & Intelligence

| Problem | Solution Feature | Priority | Complexity |
|---------|-----------------|----------|------------|
| No area summaries | Geographic Boundary Summaries | ● ● ● | Medium |
| Manual filtering only | Natural Language Search | ● ● | High |
| No insights | Dashboard Questions | ● ● ● | Medium |
| Static data | Predictive Intelligence | ● ● | High |
| No guided discovery | Story Map Component | ● ● | Medium-High |
| Information overload | Smart Recommendations | ● | Medium |
| No trip planning | Intelligent Routing | ● ● | High |

**AI Technology Stack**:
- LLM API (OpenAI, Anthropic, or local) for NL processing
- Spatial analysis (PostGIS, Turf.js)
- Weather API integration (Environment Canada)
- Phenology models (custom or academic)
- Route optimization (OSRM, Valhalla, or Google Maps API)

---

### Theme 3: Accessibility & Inclusivity

| Problem | Solution Feature | Priority | Complexity |
|---------|-----------------|----------|------------|
| WCAG non-compliance | Full WCAG 2.1 AA Implementation | ● ● ● | Medium |
| No physical access info | Physical Accessibility Intelligence | ● ● | Medium |
| Cognitive barriers | Cognitive Accessibility Features | ● ● | Low-Medium |
| Color-only encoding | Multi-channel visual encoding | ● ● ● | Low |
| Screen reader gaps | ARIA implementation + SR optimization | ● ● ● | Medium |
| Keyboard nav incomplete | Full keyboard navigation | ● ● ● | Low-Medium |

**Accessibility Requirements**:
- Must-have: WCAG 2.1 AA compliance (non-negotiable)
- Testing with real assistive technology users
- Accessibility audit before launch
- Ongoing monitoring and iteration

---

## Feature Priority Levels

### ● ● ● CRITICAL (MVP Must-Haves)
These features are essential for the core value proposition and solve the biggest user problems:

1. **Updated Data Integration** - Foundational requirement
2. **Species Guide Library** - Addresses content gap
3. **WCAG 2.1 AA Compliance** - Accessibility baseline
4. **Enhanced Basemap** - Improved visual foundation
5. **Custom Tree Graphics** - Better visual communication
6. **Enhanced Filter System** - Improved discoverability
7. **Interactive Tooltips** - Rich tree information

**MVP Scope Rationale**: These features provide a solid, accessible foundation that significantly improves upon the current version without requiring AI infrastructure.

---

### ● ● ● MVP+ (Phase 1.5)
AI-enhanced features that add significant intelligence and insights:

8. **Geographic Summaries (Ward/Neighborhood)** - AI value proposition
9. **Dashboard Questions** - Intuitive discovery with AI-generated answers
10. **Custom Area Summaries** - Draw-your-own boundary analysis
11. **AI-Powered Insights** - Pattern detection and observations

**MVP+ Rationale**: These features require AI integration but provide the "wow factor" that differentiates this from a simple map update. Separating them allows MVP to launch faster while keeping AI features as a clear Phase 1.5 milestone.

---

### ● ● HIGH PRIORITY (Phase 2)
Significant value-add features that enhance the core experience:

8. **Story Map Component** - Engagement and education
9. **Natural Language Search** - Advanced AI interaction
10. **Additional Map Layers (Infrastructure)** - Practical context
11. **Physical Accessibility Intelligence** - Inclusivity
12. **Predictive Ripeness** - Timing optimization
13. **Cognitive Accessibility Features** - Broader inclusivity

---

### ● FUTURE ENHANCEMENTS (Phase 3+)
Nice-to-have features for continued evolution:

14. **Intelligent Routing** - Advanced trip planning
15. **Smart Recommendations** - Personalization
16. **Visual Intelligence (Street View)** - Enhanced verification
17. **Additional Map Layers (Historical)** - Deep exploration
18. **Multi-language Support** - Toronto's diversity
19. **Mobile App (Native)** - On-location experience

---

## MVP Feature Specification

### MVP Scope Definition

**What's In** (Core MVP):
- Modern Svelte/SvelteKit architecture  
- Updated fruit tree data (2026)  
- 8 comprehensive species guides (one per category)  
- Custom basemap optimized for fruit trees  
- SVG icon system for tree types  
- Full WCAG 2.1 AA compliance  
- Keyboard navigation  
- Screen reader optimization  
- High contrast mode  
- Responsive mobile design  
- Enhanced filter system (improved UX)  
- Ripening month slider  
- Interactive tooltips with tree details  
- Tree discovery by species (filter pills) and location (browser geolocation)  

**Note**: "Search" for MVP means filter-pills + `GeolocateControl` to centre the map on the user. Free-text address geocoding is deferred (requires a third-party service and is not essential for the core "find fruit trees near me" task).

**What's Deferred**:

**MVP+ / Phase 1.5** (AI-Enhanced Features):
- 5 core dashboard questions with AI-generated answers  
- Ward-level geographic summaries (25 wards)  
- Neighborhood-level summaries (top 20+ neighborhoods)  
- AI-powered insights and patterns  
- Custom area summaries (draw-your-own boundary)  

**Phase 2** (Advanced AI):
- Natural language conversational search  
- Story Map timeline feature  
- Predictive ripeness forecasting  

**Phase 3** (Advanced Features):
- Intelligent route planning  
- Street view integration  
- User accounts / saved favorites  

**Phase 4+** (Future):
- Mobile native app  
- Real-time notifications  
- Community features  

---

## Technical Implementation Plan

### Simplicity Principles

The architecture below is deliberately scoped to the MVP feature set. Each piece of the system has been justified against a feature in the **Core MVP** list. Any piece that only supports a deferred feature (Phase 1.5+) lives in a clearly labelled deferred section and is not part of the initial build.

**Guardrails applied to keep this simple**:

1. **Lean on the platform.** MapLibre's built-in `NavigationControl`, `GeolocateControl`, and `AttributionControl` cover all MVP map controls — no custom control components.
2. **Lean on the OS.** `prefers-contrast`, `prefers-reduced-motion`, and `prefers-color-scheme` give users their high-contrast / reduced-motion preferences for free. No in-app theme toggle for MVP.
3. **Lean on MapLibre filters.** Category and ripening-month filtering happen via MapLibre filter expressions on the GPU, not a JS-level filter pass over GeoJSON.
4. **One file per concern.** ETL is one file, not six. Types are one file, not four. State has two stores (trees + filters), not four.
5. **Flat component tree.** `src/lib/components/*.svelte` — no `map/`, `filters/`, `ui/`, `layout/`, `species/` subfolders until there are >15 components in the project.
6. **Pre-made PMTiles for MVP.** Use a hosted Protomaps basemap (or download a pre-built one) instead of running tippecanoe/planetiler locally. Custom basemap generation moves to Phase 2 if needed.
7. **No premature abstractions.** No `Button.svelte` / `Card.svelte` until used in 3+ places. No `params/category.ts` matcher for 8 known slugs — validate inside `+page.ts`.

**What was removed from the original architecture sketch (and why)**:

| Removed | Rationale |
|---|---|
| `state/map.svelte.ts`, `state/preferences.svelte.ts` | Map viewport is owned by MapLibre. User prefs come from OS media queries. |
| `data/months.ts`, `data/species-meta.ts` | Tiny constant + only feeds Phase 2 age estimation. |
| `utils/age-estimate.ts`, `utils/filter.ts` | Phase 2 feature; native MapLibre filter expressions. |
| `params/category.ts` matcher | One-line validation in `+page.ts` is simpler. |
| `service-worker.ts` | Already labelled optional; defer until offline becomes a real requirement. |
| `data/boundaries/*.geojson`, `tiles/context.pmtiles` | Both support MVP+ / Phase 2 features. |
| `MapControls`, `TreeMarkers`, `MapLegend`, `Sidebar`, `MobileNav`, `Header`, `Button`, `Card`, `ThemeToggle` | Folded into existing components or replaced with MapLibre/HTML primitives. |
| Three-tier test folders (`unit/component/e2e`) | Two folders is enough. |
| Three GH Actions workflows | `ci.yml` + `update-data.yml` covers it. |
| Cabinet Grotesk display font | Inter alone is sufficient. |

The result is roughly **half the file count** of the original sketch while still covering every Core MVP feature. The full simplified structure is in **File Structure** below.

---

### Architecture Overview

**Static Site Architecture** (GitHub Pages hosted)

```
┌─────────────────────────────────────────────────────────┐
│                   CLIENT (Browser)                      │
│  ┌──────────────────────────────────────────────────┐  │
│  │         SvelteKit Static Site                    │  │
│  │  ┌────────────────┬──────────────────────────┐  │  │
│  │  │   UI Layer     │   State Management       │  │  │
│  │  │  • Components  │   • Svelte stores        │  │  │
│  │  │  • Pages       │   • Client-side routing  │  │  │
│  │  └────────────────┴──────────────────────────┘  │  │
│  │  ┌────────────────┬──────────────────────────┐  │  │
│  │  │   Map Layer    │   Data Fetching          │  │  │
│  │  │  • MapLibre GL │   • Fruit trees API      │  │  │
│  │  │  • PMTiles     │   • Species data         │  │  │
│  │  └────────────────┴──────────────────────────┘  │  │
│  └──────────────────────────────────────────────────┘  │
│             ↓ fetch                    ↓ load          │
│    ┌────────────────┐        ┌──────────────────┐     │
│    │ Fruit Trees    │        │  PMTiles         │     │
│    │ GeoJSON API    │        │  Basemap         │     │
│    │ (static file)  │        │  (client-side)   │     │
│    └────────────────┘        └──────────────────┘     │
└─────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────┐
│              STATIC ASSETS (GitHub Pages)               │
│  ┌──────────────────────────────────────────────────┐  │
│  │  Built SvelteKit App (adapter-static)            │  │
│  │  • HTML/CSS/JS bundles                           │  │
│  │  • Pre-rendered pages                            │  │
│  │  • Design system assets                          │  │
│  └──────────────────────────────────────────────────┘  │
│  ┌──────────────────────────────────────────────────┐  │
│  │  Data Files (JSON/GeoJSON)                       │  │
│  │  • /data/trees.geojson (fruit trees)            │  │
│  │  • /data/species/*.json (species guides)         │  │
│  │  • /data/boundaries/*.geojson (wards, etc)       │  │
│  └──────────────────────────────────────────────────┘  │
│  ┌──────────────────────────────────────────────────┐  │
│  │  PMTiles Files                                   │  │
│  │  • /tiles/basemap.pmtiles (basemap)              │  │
│  │  • /tiles/context.pmtiles (parks, transit, etc)  │  │
│  └──────────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────┐
│              ETL PROCESS (GitHub Actions)               │
│  ┌──────────────────────────────────────────────────┐  │
│  │  Monthly Data Update Workflow                    │  │
│  │  1. Fetch from City of Toronto API               │  │
│  │  2. Filter to fruit-bearing species              │  │
│  │  3. Transform and enrich data                    │  │
│  │  4. Generate GeoJSON files                       │  │
│  │  5. Update PMTiles if needed                     │  │
│  │  6. Commit to repository                         │  │
│  │  7. Trigger GitHub Pages rebuild                 │  │
│  └──────────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────────┘
```

### Technology Stack

**Frontend**:
- **Framework**: SvelteKit v2+ (with `adapter-static`)
- **Language**: TypeScript (strict mode)
- **Svelte**: v5 (Runes mode: `$state`, `$derived`, `$effect`, `$props`)
- **Styling**: CSS custom properties (design tokens) + Svelte scoped `<style>`
- **Maps**: MapLibre GL JS v4.x
- **Tiles**: PMTiles (client-side, no tile server needed)
- **Build**: Vite (included with SvelteKit)
- **State**: Svelte 5 runes (`$state`, `$state.raw` for large data like GeoJSON)
- **Accessibility**: Svelte compile-time a11y warnings + axe-core + manual testing

**Data Layer** (Static Files):
- **Tree Data**: GeoJSON (fetched client-side)
- **Species Guides**: JSON or Markdown with frontmatter
- **Boundaries**: GeoJSON (wards, neighborhoods, census tracts)
- **Basemap**: PMTiles format (self-contained, efficient)

**Infrastructure**:
- **Hosting**: GitHub Pages (free, simple, reliable)
- **CDN**: GitHub's built-in CDN
- **Domain**: Custom domain via GitHub Pages
- **Analytics**: Privacy-friendly (Plausible, Fathom, or Simple Analytics)

**Data Pipeline** (ETL):
- **Automation**: GitHub Actions (scheduled monthly)
- **Source**: City of Toronto Open Data API
- **Processing**: Node.js script or Python
- **Storage**: Git repository (data files committed)
- **Deployment**: Automatic via GitHub Pages

**Development**:
- **Version Control**: Git + GitHub
- **Testing**: Vitest (unit), Playwright (e2e)
- **Linting**: ESLint + Prettier
- **Accessibility**: axe-core, Pa11y CI
- **CI/CD**: GitHub Actions

---

### Key Technology Benefits

**1. PMTiles**
-  Client-side tile rendering (no tile server needed)
-  Single file per tileset (easy deployment)
-  Range request support (efficient, only loads needed tiles)
-  Works perfectly with GitHub Pages
-  Can be cached aggressively by CDN
-  Open source, no vendor lock-in

**2. GitHub Pages**
-  Free hosting (no infrastructure costs)
-  Automatic HTTPS
-  Custom domain support
-  Built-in CDN (fast globally)
-  Simple deployment (push to deploy)
-  Integrates with GitHub Actions
-  Reliable uptime

**3. Static Site (SvelteKit adapter-static)**
-  Fast load times (pre-rendered HTML)
-  No server required
-  Works offline (with service worker)
-  Perfect Lighthouse scores
-  Client-side routing (SPA after initial load)
-  SEO-friendly (static HTML)

**4. Client-Side Data Fetching**
-  Simple architecture
-  Cacheable API responses
-  No database maintenance
-  Easy to version control
-  Transparent data updates

---

## Data Strategy

### Data Sources

**1. Primary Fruit Tree Data**
- **Source**: City of Toronto Open Data API - Street Trees dataset
  - API Endpoint: `https://ckan0.cf.opendata.inter.prod-toronto.ca/api/3/action/datastore_search`
  - Dataset ID: (Street Trees dataset identifier)
- **Update Frequency**: Monthly automated check
- **Format**: CSV/JSON from API → transformed to GeoJSON
- **Required Fields**:
  - Location (latitude, longitude)
  - Species (COMMON_NAM, BOTANICAL_NAME)
  - DBH_TRUNK (diameter at breast height)
  - Address/intersection
  - Any fruit-related metadata

**2. Basemap & Context Layers**
- **Basemap**: OpenStreetMap data → PMTiles
  - Custom style (optimized for fruit tree visibility)
  - Dark theme focused
- **Context Layers** (optional, in PMTiles):
  - Parks and green spaces
  - Bike network
  - Major streets
  - Neighborhoods boundaries
- **Generation**: Use tools like `tippecanoe` or `planetiler`

**3. Boundary Data** (for MVP+)
- **Wards**: Toronto Open Data (25 wards) - GeoJSON
- **Neighborhoods**: City of Toronto (140+) - GeoJSON
- **Census Tracts**: Statistics Canada - GeoJSON
- **Storage**: `/data/boundaries/` folder

**4. Species Information**
- **Source**: Manual curation + Toronto tree species guide
- **Format**: JSON or Markdown with frontmatter
- **Storage**: `/data/species/` folder or `/content/species/` for Markdown
- **Structure**:
```json
{
  "commonName": "Apple",
  "category": "apple",
  "scientificName": "Malus domestica",
  "description": "...",
  "identification": {...},
  "ripening": "August-October",
  "foraging": {...}
}
```

---

### Data Pipeline & ETL Process

**GitHub Actions Workflow** (runs monthly on 1st of month at 00:00 UTC)

```yaml
name: Update Fruit Trees Data

on:
  schedule:
    - cron: '0 0 1 * *'  # Monthly on the 1st
  workflow_dispatch:  # Manual trigger option

jobs:
  update-data:
    runs-on: ubuntu-latest
    
    steps:
      1. Checkout repository
      2. Fetch latest data from City API
      3. Run ETL script (Node.js or Python)
      4. Check for changes
      5. If changed:
         - Commit updated data files
         - Trigger site rebuild
      6. Send notification (optional)
```
***CONFIRM LOGIC***
**ETL Script Process** (single file, MVP scope):

```
1. EXTRACT
   └─ Fetch street trees from City of Toronto API (paginated)

2. TRANSFORM
   ├─ Filter to known fruit-bearing COMMON_NAM values
   ├─ Drop rows with invalid lat/lon or missing required fields
   ├─ Map COMMON_NAM → category id (one of 8)
   └─ Attach ripeningMonths array per category

3. LOAD
   ├─ Write static/data/trees.geojson (FeatureCollection)
   └─ Write static/data/meta.json (lastUpdated, count, bounds)

4. DEPLOY (handled by separate workflow)
   └─ If files changed: commit + push → GitHub Pages rebuilds
```

**Deferred to MVP+/Phase 2** (not in MVP ETL):
- Tree age estimation from DBH + species growth rate (Story Map feature)
- Ward / neighborhood spatial join (geographic summaries)
- Schema validation library (lightweight inline checks are enough at MVP scale)

**Example single-file ETL** (`scripts/etl.ts`):

```typescript
import { writeFile } from 'node:fs/promises';
import { CATEGORIES } from '../src/lib/categories.ts';

const API = 'https://ckan0.cf.opendata.inter.prod-toronto.ca/api/3/action/datastore_search';

const speciesToCategory = new Map<string, string>(
  CATEGORIES.flatMap(c => c.species.map(s => [s, c.id] as const))
);

async function fetchAll(resourceId: string) {
  const out: any[] = [];
  let offset = 0;
  while (true) {
    const url = `${API}?resource_id=${resourceId}&limit=10000&offset=${offset}`;
    const { result } = await (await fetch(url)).json();
    out.push(...result.records);
    if (result.records.length < 10000) break;
    offset += 10000;
  }
  return out;
}

function toFeature(row: any) {
  const category = speciesToCategory.get(row.COMMON_NAM);
  if (!category) return null;
  const lon = Number(row.LONGITUDE), lat = Number(row.LATITUDE);
  if (!Number.isFinite(lon) || !Number.isFinite(lat)) return null;
  const cat = CATEGORIES.find(c => c.id === category)!;
  return {
    type: 'Feature' as const,
    geometry: { type: 'Point' as const, coordinates: [lon, lat] },
    properties: {
      id: row._id,
      species: row.COMMON_NAM,
      category,
      dbh: Number(row.DBH_TRUNK) || 0,
      ripeningMonths: cat.ripeningMonths
    }
  };
}

async function main() {
  const rows = await fetchAll(process.env.RESOURCE_ID!);
  const features = rows.map(toFeature).filter(Boolean);
  const fc = { type: 'FeatureCollection' as const, features };

  const lons = features.map(f => f!.geometry.coordinates[0]);
  const lats = features.map(f => f!.geometry.coordinates[1]);
  const meta = {
    lastUpdated: new Date().toISOString(),
    count: features.length,
    bounds: [Math.min(...lons), Math.min(...lats), Math.max(...lons), Math.max(...lats)]
  };

  await writeFile('static/data/trees.geojson', JSON.stringify(fc));
  await writeFile('static/data/meta.json', JSON.stringify(meta, null, 2));
  console.log(`Wrote ${features.length} fruit trees.`);
}

main().catch(e => { console.error(e); process.exit(1); });
```

---

### Data Serving Strategy

**1. Fruit Trees Data**
```
File: /data/trees.geojson
Size: ~500KB - 2MB (estimated for Toronto fruit trees)
Caching: Long-term (1 month), invalidate on update
Loading: Lazy load on map initialization
Format: GeoJSON FeatureCollection
```

**Client-side handling**:
```javascript
// Load trees data
const response = await fetch('/data/trees.geojson');
const treesData = await response.json();

// Add to map
map.addSource('fruit-trees', {
  type: 'geojson',
  data: treesData
});
```

**2. Basemap (PMTiles)**
```
File: /tiles/basemap.pmtiles
Size: 50-200MB (depends on zoom levels and detail)
Caching: Long-term (indefinite)
Loading: Range requests (loads only visible tiles)
Protocol: pmtiles:// 
```

**MapLibre integration**:
```javascript
import { Protocol } from 'pmtiles';

// Register PMTiles protocol
const protocol = new Protocol();
maplibregl.addProtocol('pmtiles', protocol.tile);

// Use PMTiles source
map.addSource('basemap', {
  type: 'vector',
  url: 'pmtiles:///tiles/basemap.pmtiles'
});
```

**3. Species Data**
```
Files: /data/species/{apple,cherry,peach,pear,plum,apricot,berry,nuts}.json
Size: ~10-20KB per file
Caching: Long-term
Loading: On-demand (when species guide route is visited)
```

**4. Meta**
```
File: /data/meta.json
Size: < 1KB
Contents: { lastUpdated, count, bounds }
Loading: Alongside trees.geojson on map init
```

**Deferred to MVP+**: `/data/boundaries/*.geojson` (wards, neighbourhoods) — only needed once geographic summary features land in Phase 1.5.

---

### File Structure

**Flat, MVP-scoped layout — Svelte 5 / SvelteKit conventions throughout.**

```
fruit-trees-toronto/
│
├─ src/
│  ├─ app.html                    # Page template
│  ├─ app.css                     # Tokens + global styles + a11y media queries
│  │
│  ├─ routes/
│  │  ├─ +layout.svelte           # Inline header, skip link, live region
│  │  ├─ +layout.ts               # prerender = true, trailingSlash = 'always'
│  │  ├─ +page.svelte             # Home: full-screen map + filter bar
│  │  ├─ +page.ts                 # Loads /data/trees.geojson + meta.json
│  │  ├─ species/
│  │  │  ├─ +page.svelte          # Species index (8 cards)
│  │  │  └─ [category]/
│  │  │     ├─ +page.svelte       # Species guide
│  │  │     └─ +page.ts           # Loads species JSON; throws 404 if invalid slug
│  │  ├─ about/+page.svelte       # About, credits, data sources
│  │  └─ +error.svelte            # Accessible error page
│  │
│  └─ lib/
│     ├─ components/              # Flat — no subfolders until >15 components
│     │  ├─ Map.svelte            # MapLibre init + PMTiles + tree source/layer + popup wiring
│     │  ├─ TreePopup.svelte      # role="dialog", focus trap, Escape closes
│     │  ├─ FilterBar.svelte      # Pills + month slider (also acts as legend)
│     │  ├─ CategoryPill.svelte   # role="switch", aria-checked
│     │  ├─ MonthSlider.svelte    # role="slider", aria-valuetext
│     │  ├─ SpeciesCard.svelte    # Used on species index
│     │  ├─ SpeciesDetail.svelte  # Used on species/[category]
│     │  ├─ Icon.svelte           # SVG wrapper (aria-hidden when decorative)
│     │  ├─ SkipLink.svelte
│     │  ├─ VisuallyHidden.svelte
│     │  └─ LiveRegion.svelte     # aria-live="polite" announcer
│     │
│     ├─ state/
│     │  ├─ trees.svelte.ts       # $state.raw GeoJSON, loading, error, lastUpdated
│     │  └─ filters.svelte.ts     # activeCategories: Set, selectedMonth, derived MapLibre filter expr
│     │
│     ├─ categories.ts            # 8 categories: id, label, color, species[], ripeningMonths
│     ├─ map-style.ts             # Basemap style + tree circle paint properties
│     ├─ a11y.ts                  # Focus trap, announce()
│     └─ types.ts                 # FruitTree, Category, SpeciesGuide
│
├─ static/
│  ├─ data/
│  │  ├─ trees.geojson            # ETL output (~500KB-2MB)
│  │  ├─ meta.json                # { lastUpdated, count, bounds }
│  │  └─ species/                 # 8 files: apple, cherry, peach, pear, plum, apricot, berry, nuts
│  │     └─ {category}.json
│  ├─ tiles/
│  │  └─ basemap.pmtiles          # Pre-made (Protomaps) for MVP
│  ├─ icons/                      # 8 SVG fruit/tree icons
│  │  └─ {category}.svg
│  ├─ .nojekyll
│  ├─ favicon.png
│  └─ og-image.png
│
├─ scripts/
│  └─ etl.ts                      # Single file: fetch → filter → write GeoJSON + meta.json
│
├─ tests/
│  ├─ unit/                       # Vitest: filters logic, categories mapping
│  └─ e2e/                        # Playwright: user flows + axe-core a11y checks
│
├─ .github/workflows/
│  ├─ ci.yml                      # Lint, typecheck, test, build, deploy on push to main
│  └─ update-data.yml             # Monthly ETL cron (commits new trees.geojson)
│
├─ svelte.config.js               # adapter-static, fallback: '404.html', precompress
├─ vite.config.ts
├─ tsconfig.json                  # strict
├─ eslint.config.js
├─ .prettierrc
├─ package.json
└─ README.md
```

**File counts at a glance**:

| Area | Original | Simplified | Notes |
|---|---|---|---|
| Components | 20 (5 subfolders) | 11 (flat) | MapControls/TreeMarkers/MapLegend/Header/Sidebar/MobileNav/Button/Card/ThemeToggle dropped |
| State stores | 4 | 2 | Map state owned by MapLibre; preferences from OS media queries |
| Data modules | 3 | 1 | months/species-meta inlined or deferred |
| Utils | 5 | 2 | filter (use MapLibre expressions), age-estimate (Phase 2), format (inline) dropped |
| Types files | 4 | 1 | Single `types.ts` |
| ETL files | 6 + shell script | 1 | One `scripts/etl.ts` |
| Test folders | 3 | 2 | unit + e2e |
| GH workflows | 3 | 2 | CI + deploy combined |
| Boundaries / context tiles | 2 | 0 | Deferred to MVP+/Phase 2 |
| Service worker | 1 | 0 | Defer until offline is a real requirement |
| Param matcher | 1 | 0 | Validate inline in `+page.ts` |

---

### SvelteKit Configuration

**`svelte.config.js`** (GitHub Pages with adapter-static):

```javascript
import adapter from '@sveltejs/adapter-static';
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';

const config = {
  preprocess: vitePreprocess(),
  kit: {
    adapter: adapter({
      pages: 'build',
      assets: 'build',
      fallback: '404.html',
      precompress: true,
      strict: true
    }),
    paths: {
      base: process.argv.includes('dev') ? '' : process.env.BASE_PATH
    }
  }
};

export default config;
```

**`src/routes/+layout.ts`** (root layout config):

```typescript
export const prerender = true;
export const trailingSlash = 'always';
```

**`src/routes/species/[category]/+page.ts`** (inline param validation, no separate matcher):

```typescript
import { error } from '@sveltejs/kit';
import { CATEGORIES } from '$lib/categories';

export const prerender = true;

export const entries = () => CATEGORIES.map(c => ({ category: c.id }));

export async function load({ params, fetch }) {
  if (!CATEGORIES.some(c => c.id === params.category)) {
    error(404, 'Unknown species category');
  }
  const res = await fetch(`/data/species/${params.category}.json`);
  return { species: await res.json() };
}
```

`entries()` tells SvelteKit which dynamic routes to prerender — all 8 species pages become static HTML at build time.

---

### Svelte 5 Patterns & Conventions

**State Management** (Runes, not legacy stores):

```typescript
// src/lib/state/trees.svelte.ts
import type { FeatureCollection } from 'geojson';

class TreeState {
  // $state.raw for large, immutable GeoJSON (no deep proxy overhead)
  data = $state.raw<FeatureCollection | null>(null);
  loading = $state(false);
  error = $state<string | null>(null);
  lastUpdated = $state<string | null>(null);

  get count() {
    return this.data?.features.length ?? 0;
  }

  async load(basePath: string) {
    this.loading = true;
    this.error = null;
    try {
      const res = await fetch(`${basePath}/data/trees.geojson`);
      this.data = await res.json();
      const meta = await (await fetch(`${basePath}/data/meta.json`)).json();
      this.lastUpdated = meta.lastUpdated;
    } catch (e) {
      this.error = e instanceof Error ? e.message : 'Failed to load tree data';
    } finally {
      this.loading = false;
    }
  }
}

export const treeState = new TreeState();
```

```typescript
// src/lib/state/filters.svelte.ts
import { CATEGORIES } from '$lib/categories';
import type { ExpressionSpecification } from 'maplibre-gl';

class FilterState {
  activeCategories = $state<Set<string>>(new Set(CATEGORIES.map(c => c.id)));
  selectedMonth = $state<number | null>(null);

  get hasActiveFilters() {
    return this.activeCategories.size < CATEGORIES.length
      || this.selectedMonth !== null;
  }

  // Derived MapLibre filter expression — applied directly to the tree layer.
  // No JS-level filtering pass; MapLibre evaluates this on the GPU.
  get mapFilter(): ExpressionSpecification {
    const parts: ExpressionSpecification[] = [
      ['in', ['get', 'category'], ['literal', [...this.activeCategories]]]
    ];
    if (this.selectedMonth !== null) {
      parts.push(['in', this.selectedMonth, ['get', 'ripeningMonths']]);
    }
    return parts.length === 1 ? parts[0] : ['all', ...parts];
  }

  toggleCategory(id: string) {
    const next = new Set(this.activeCategories);
    if (next.has(id)) next.delete(id);
    else next.add(id);
    this.activeCategories = next;
  }

  resetAll() {
    this.activeCategories = new Set(CATEGORIES.map(c => c.id));
    this.selectedMonth = null;
  }
}

export const filterState = new FilterState();
```

**Map state and selected tree** intentionally do *not* live in their own store. MapLibre owns viewport (centre, zoom, bearing) — reading it back via `map.getCenter()` is fine. Selected tree is local UI state inside `Map.svelte` because no other component needs it. **User preferences** (high-contrast, reduced-motion, dark-mode) live in CSS via `@media (prefers-*)` queries, not in JS state.

**Component Patterns** (Svelte 5 Runes, no legacy syntax):

```svelte
<!-- src/lib/components/filters/CategoryPill.svelte -->
<script lang="ts">
  import type { Category } from '$lib/types/species';
  import Icon from '$lib/components/ui/Icon.svelte';

  let { category, active, ontoggle }: {
    category: Category;
    active: boolean;
    ontoggle: () => void;
  } = $props();
</script>

<button
  role="switch"
  aria-checked={active}
  aria-label="Show {category.label} trees"
  class={['pill', { active }]}
  style:--fruit-color={category.color}
  onclick={ontoggle}
>
  <Icon name={category.id} aria-hidden="true" />
  {category.label}
</button>

<style>
  .pill {
    display: inline-flex;
    align-items: center;
    gap: var(--space-2);
    padding: var(--space-2) var(--space-4);
    border: 1px solid var(--color-border-subtle);
    border-radius: var(--radius-full);
    background: var(--color-bg-tertiary);
    color: var(--color-text-tertiary);
    font-size: var(--text-sm);
    font-weight: var(--font-medium);
    cursor: pointer;
    opacity: 0.5;
    transition: all var(--duration-base) var(--ease-out);
  }

  .pill.active {
    background: var(--fruit-color);
    color: white;
    border-color: var(--fruit-color);
    opacity: 0.85;
  }

  .pill:hover {
    opacity: 1;
  }

  .pill:focus-visible {
    outline: 2px solid var(--color-accent-primary);
    outline-offset: 2px;
  }
</style>
```

**MapLibre Integration** (browser-only, dynamic import):

```svelte
<!-- src/lib/components/map/MapContainer.svelte -->
<script lang="ts">
  import { onMount } from 'svelte';
  import { browser } from '$app/environment';
  import { base } from '$app/paths';
  import { treeState } from '$lib/state/trees.svelte';
  import LiveRegion from '$lib/components/ui/LiveRegion.svelte';

  let container: HTMLDivElement;
  let map: maplibregl.Map | undefined = $state();
  let mapStatus = $state('Loading map...');

  onMount(async () => {
    const maplibregl = await import('maplibre-gl');
    const { Protocol } = await import('pmtiles');

    const protocol = new Protocol();
    maplibregl.addProtocol('pmtiles', protocol.tile);

    map = new maplibregl.Map({
      container,
      style: {
        version: 8,
        sources: {
          basemap: {
            type: 'vector',
            url: `pmtiles://${base}/tiles/basemap.pmtiles`
          }
        },
        layers: [/* basemap style layers */]
      },
      center: [-79.39, 43.69],
      zoom: 11,
      minZoom: 10,
      maxZoom: 16,
      maxBounds: [[-79.74, 43.42], [-79.02, 44.02]],
      attributionControl: false
    });

    map.addControl(new maplibregl.NavigationControl(), 'bottom-right');
    map.addControl(new maplibregl.AttributionControl({ compact: true }));

    map.on('load', () => {
      mapStatus = `Map loaded. ${treeState.count} fruit trees displayed.`;
    });

    return () => {
      map?.remove();
    };
  });
</script>

<div
  bind:this={container}
  class="map-container"
  role="application"
  aria-label="Interactive fruit tree map of Toronto"
  aria-roledescription="map"
>
  {#if !map}
    <div class="map-loading" role="status">
      <p>Loading map...</p>
    </div>
  {/if}
</div>

<LiveRegion message={mapStatus} />

<style>
  .map-container {
    position: absolute;
    inset: 0;
    width: 100%;
    height: 100%;
  }

  .map-loading {
    display: grid;
    place-items: center;
    height: 100%;
    color: var(--color-text-tertiary);
  }
</style>
```

---

### Svelte 5 Best Practices Applied

**1. Use `$state.raw` for large immutable data**
GeoJSON tree data (~1-2MB) is never mutated client-side. Using `$state.raw` avoids deep proxy overhead that `$state` would add to thousands of feature objects.

**2. Use `$derived` over `$effect` for computed values**
Filtered tree lists, active counts, and category stats are all `$derived` expressions rather than effects that write to state.

**3. Dynamic imports for browser-only code**
MapLibre GL and PMTiles are imported dynamically inside `onMount` since they require `window`/`document` and cannot run during SSR/prerender.

**4. Runes mode only (no legacy patterns)**
- `$props()` instead of `export let`
- `$state` instead of writable stores
- `onclick={handler}` instead of `on:click={handler}`
- `{#snippet}` + `{@render}` instead of `<slot>`
- Class-based state modules (`.svelte.ts`) instead of store files

**5. Scoped styles by default**
All component styles use Svelte's built-in `<style>` scoping. Global styles (resets, tokens) live in `app.css`. Child component styling uses CSS custom properties, not `:global`.

**6. Keyed `{#each}` blocks**
All list rendering uses unique keys (tree IDs, category IDs) for efficient DOM updates.

**7. `precompress: true` in adapter-static**
Generates `.br` and `.gz` files at build time for smaller transfer sizes.

---

### Accessibility Architecture

**Component-Level Patterns**:

| Component | ARIA Role/Pattern | Keyboard | Screen Reader |
|-----------|------------------|----------|---------------|
| `Map` | `role="application"`, `aria-roledescription="map"` | Arrow keys pan, +/- zoom | Announces tree count on load |
| `TreePopup` | `role="dialog"`, `aria-modal="true"` | Escape closes, focus trap | Announces tree details |
| `FilterBar` | `role="toolbar"`, `aria-label="Filter trees"` | Arrow keys between pills | Acts as legend (color + label per pill) |
| `CategoryPill` | `role="switch"`, `aria-checked` | Space/Enter toggles | "Show apple trees, on/off" |
| `MonthSlider` | `role="slider"`, `aria-valuetext` | Arrow keys step | "Ripening month: September" |
| `SkipLink` | Standard skip link | Tab to reveal | "Skip to main content" |
| `LiveRegion` | `aria-live="polite"` | N/A | Announces filter/map changes |

**No separate `MapLegend`** — `FilterBar` is the legend. Each `CategoryPill` shows the category's colour swatch via its `--fruit-color` CSS variable, so colour ↔ category mapping is conveyed once, accessibly, in the same control users already use.

**Focus Management**:
- On route change: SvelteKit auto-focuses `<body>`, screen readers announce new `<title>`
- On popup open: Focus moves into popup, trapped until Escape
- On popup close: Focus returns to triggering element
- On filter change: `LiveRegion` announces updated tree count

**`<svelte:head>` per page** (unique, descriptive titles):
```svelte
<!-- src/routes/+page.svelte -->
<svelte:head>
  <title>Fruit Trees of Toronto - Interactive Map</title>
  <meta name="description" content="..." />
</svelte:head>

<!-- src/routes/species/[category]/+page.svelte -->
<svelte:head>
  <title>{species.label} Trees - Fruit Trees of Toronto</title>
</svelte:head>
```

**Reduced Motion**:
```css
/* In app.css */
@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
    scroll-behavior: auto !important;
  }
}
```

**High Contrast**:
```css
@media (prefers-contrast: more) {
  :root {
    --color-border-subtle: var(--color-border-strong);
    --tree-active-opacity: 1;
  }
}
```

---

### Data Update Flow

```
┌──────────────────────────────────────────┐
│  GitHub Actions (Scheduled Monthly)      │
└──────────────────┬───────────────────────┘
                   ↓
         ┌─────────────────────┐
         │  Fetch City API     │
         │  (Street Trees)     │
         └──────────┬──────────┘
                    ↓
         ┌─────────────────────┐
         │  Run ETL Script     │
         │  • Filter fruit     │
         │  • Enrich data      │
         │  • Generate GeoJSON │
         └──────────┬──────────┘
                    ↓
              ┌──────────┐
              │ Changed? │
              └─────┬────┘
                    ↓
               ┌────┴────┐
              YES       NO
               │         │
               ↓         └──> End
    ┌──────────────────┐
    │ Commit to repo   │
    │ /data/trees.json │
    └────────┬─────────┘
             ↓
    ┌──────────────────┐
    │ GitHub Pages     │
    │ Auto-rebuild     │
    └────────┬─────────┘
             ↓
    ┌──────────────────┐
    │ Live site        │
    │ Updated!         │
    └──────────────────┘
```

---

### Performance Optimization

**1. Data Loading**
- `$state.raw` for GeoJSON (avoids deep proxy overhead on thousands of features)
- Dynamic `import()` for MapLibre + PMTiles (keeps initial bundle small)
- `precompress: true` generates `.br` and `.gz` files at build time
- SvelteKit code-splitting delivers only the JS needed per page

**2. Map Rendering**
- PMTiles range requests (loads only tiles visible in viewport)
- Marker clustering at low zoom via MapLibre `clusterRadius`
- WebGL acceleration (MapLibre hardware rendering)
- Debounced interaction handlers (hover, filter updates)

**3. Build Optimization**
- Vite automatic code splitting + tree shaking
- All pages pre-rendered to static HTML (adapter-static)
- `precompress: true` for brotli + gzip static files
- SVG icons inlined as Svelte components (no extra HTTP requests)
- Minimize assets in `/static/` — `import` images where possible for hash-based caching

**4. Load Sequencing**
```
1. HTML (pre-rendered, instant)              ~ 0ms
2. CSS (inlined critical, async rest)        ~ 50ms
3. SvelteKit JS (code-split, per-page)       ~ 100ms
4. PMTiles basemap (range requests, async)   ~ 200ms
5. trees.geojson (fetch on map load)         ~ 300ms
6. Species data (on-demand, per route)       ~ lazy
```

**5. Caching Strategy**
- Hashed asset filenames (Vite default) — cached indefinitely
- `/data/*.geojson` — GitHub Pages default caching (10 min), browser re-validates
- `/tiles/*.pmtiles` — long-lived, only regenerated on basemap change
- Pre-compressed `.br`/`.gz` files served by compatible hosts

**6. Performance Targets**
- **Lighthouse**: 95+ (Performance, Accessibility, Best Practices, SEO)
- **First Contentful Paint**: < 1s
- **Largest Contentful Paint**: < 2.5s
- **Time to Interactive**: < 3s
- **Total bundle (initial page)**: < 100KB gzipped (excluding map data)
- Test in `vite preview` (not `dev`) for production-accurate metrics

---

## Success Metrics

### User Engagement
- Monthly active users (MAU)
- Session duration
- Pages per session
- Return visitor rate
- Mobile vs. desktop split

### Feature Usage
- Dashboard questions clicked
- Geographic summaries viewed
- Species guides accessed
- Map layers toggled
- Filters applied

### Accessibility
- % of sessions with assistive tech detected
- Keyboard navigation usage
- Screen reader compatibility (no errors)
- WCAG audit score (target: 100%)

### Performance
- Page load time (target: < 2s)
- Time to interactive (target: < 3s)
- Lighthouse score (target: 95+)
- Map render time (target: < 1s)

### AI Features
- Summary generation success rate
- Dashboard question accuracy (user feedback)
- AI chat usage (if implemented)
- Prediction accuracy (ripeness, if implemented)

### Data Quality
- Trees with complete information (target: > 95%)
- Geocoding accuracy (target: 100%)
- Species identification accuracy (target: 100%)
- Data update frequency (quarterly minimum)

---

## Key Design Questions

### Primary Use Case Priority
**Question**: What's the primary use case to optimize for?

Options:
- **A) Planning Mode**: "I want to go fruit picking this weekend - help me plan"
- **B) Discovery Mode**: "I'm exploring my neighborhood - surprise me"
- **C) Learning Mode**: "I'm curious about urban fruit trees - teach me"
- **D) Navigation Mode**: "I'm here now - guide me to the nearest ripe tree"

*(Awaiting decision)*

---

## Design System

### Color Palette

#### Primary: Fruit Tree Categories
The core visual identity based on fruit tree types:

| Category | Hex Code | RGB | Usage |
|----------|----------|-----|-------|
| **Apple** | `#e41a1c` | rgb(228, 26, 28) | Map markers, apple-related UI |
| **Apricot** | `#e5c494` | rgb(229, 196, 148) | Map markers, apricot-related UI |
| **Peach** | `#ff7f00` | rgb(255, 127, 0) | Map markers, peach-related UI |
| **Plum** | `#7570b3` | rgb(117, 112, 179) | Map markers, plum-related UI |
| **Cherry** | `#e78ac3` | rgb(231, 138, 195) | Map markers, cherry-related UI |
| **Pear** | `#a6d854` | rgb(166, 216, 84) | Map markers, pear-related UI |
| **Berry** | `#6699ff` | rgb(102, 153, 255) | Map markers, berry-related UI |
| **Nuts** | `#a65628` | rgb(166, 86, 40) | Map markers, nut tree-related UI |

**Design Notes**:
- High contrast against dark backgrounds
- Distinct hues for accessibility
- Maintain 4.5:1 contrast ratio minimum with backgrounds
- Colors chosen for perceptual differentiation

#### Foundation Colors

**Neutrals** (Dark theme primary)
```
--color-bg-primary: #0a0a0a (near black)
--color-bg-secondary: #1a1a1a (dark grey)
--color-bg-tertiary: #2a2a2a (medium dark grey)
--color-bg-elevated: #333333 (elevated surfaces)

--color-text-primary: #f6f6f6 (off white)
--color-text-secondary: #d3d3d3 (light grey)
--color-text-tertiary: #999999 (medium grey)
--color-text-disabled: #666666 (dark grey)

--color-border-subtle: #333333
--color-border-default: #555555
--color-border-strong: #808080
```

**Accent Colors**
```
--color-accent-primary: #4a9eff (bright blue)
--color-accent-secondary: #00d9b3 (teal)
--color-success: #00c853 (green)
--color-warning: #ffa726 (orange)
--color-error: #ff5252 (red)
--color-info: #64b5f6 (light blue)
```

**Map-Specific**
```
--map-bg: #000000 (pure black)
--map-water: #1a2332 (dark blue-grey)
--map-land: #1a1a1a (dark grey)
--map-roads: #2a2a2a (medium grey)
--map-labels: #999999 (light grey)

--tree-base-circle: #555555 (inactive/base layer)
--tree-base-opacity: 0.2

--tree-active-opacity: 0.7 (default)
--tree-hover-opacity: 0.9
--tree-selected-opacity: 1.0
```

#### Semantic Colors

**Ripeness Status**
```
--ripeness-not-yet: #64b5f6 (blue - future)
--ripeness-soon: #ffa726 (orange - upcoming)
--ripeness-ready: #00c853 (green - peak)
--ripeness-late: #ff5252 (red - past peak)
--ripeness-unknown: #808080 (grey - no data)
```

**Accessibility Levels**
```
--access-easy: #00c853 (green)
--access-moderate: #ffa726 (orange)
--access-difficult: #ff5252 (red)
--access-unknown: #808080 (grey)
```

---

### Typography

#### Font Families
```css
--font-primary: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
--font-mono: ui-monospace, 'JetBrains Mono', 'Fira Code', monospace;
```

**Rationale**:
- **Inter** as the single typeface for body and headings keeps font payload to one weight family. Excellent screen readability and full weight range.
- **`ui-monospace`** as the first mono fallback uses the OS-native mono (SF Mono / Cascadia / DejaVu) with zero download cost.

**Deferred to a later visual refresh**: a distinct display typeface (e.g., Cabinet Grotesk). Inter at lower weights handles MVP headings well.

#### Type Scale
```css
--text-xs: 0.75rem (12px)
--text-sm: 0.875rem (14px)
--text-base: 1rem (16px)
--text-lg: 1.125rem (18px)
--text-xl: 1.25rem (20px)
--text-2xl: 1.5rem (24px)
--text-3xl: 1.875rem (30px)
--text-4xl: 2.25rem (36px)
--text-5xl: 3rem (48px)
```

#### Font Weights
```css
--font-light: 300
--font-regular: 400
--font-medium: 500
--font-semibold: 600
--font-bold: 700
```

#### Line Heights
```css
--leading-tight: 1.25
--leading-snug: 1.375
--leading-normal: 1.5
--leading-relaxed: 1.625
--leading-loose: 2
```

#### Usage Guidelines

**H1 - Main Title**
```css
font-size: var(--text-4xl);
font-weight: var(--font-light);
line-height: var(--leading-tight);
color: var(--color-text-primary);
```

**H2 - Section Headers**
```css
font-size: var(--text-2xl);
font-weight: var(--font-regular);
line-height: var(--leading-snug);
color: var(--color-text-secondary);
```

**Body Text**
```css
font-size: var(--text-base);
font-weight: var(--font-regular);
line-height: var(--leading-relaxed);
color: var(--color-text-primary);
```

**Small Text / Captions**
```css
font-size: var(--text-sm);
font-weight: var(--font-regular);
line-height: var(--leading-normal);
color: var(--color-text-tertiary);
```

---

### Spacing System

```css
--space-0: 0
--space-1: 0.25rem (4px)
--space-2: 0.5rem (8px)
--space-3: 0.75rem (12px)
--space-4: 1rem (16px)
--space-5: 1.25rem (20px)
--space-6: 1.5rem (24px)
--space-8: 2rem (32px)
--space-10: 2.5rem (40px)
--space-12: 3rem (48px)
--space-16: 4rem (64px)
--space-20: 5rem (80px)
--space-24: 6rem (96px)
```

**Common Patterns**:
- Component padding: `var(--space-4)` to `var(--space-6)`
- Card spacing: `var(--space-6)` to `var(--space-8)`
- Section margins: `var(--space-12)` to `var(--space-16)`
- Element gaps: `var(--space-2)` to `var(--space-4)`

---

### Border Radius

```css
--radius-none: 0
--radius-sm: 0.125rem (2px)
--radius-base: 0.25rem (4px)
--radius-md: 0.375rem (6px)
--radius-lg: 0.5rem (8px)
--radius-xl: 0.75rem (12px)
--radius-2xl: 1rem (16px)
--radius-full: 9999px (circular)
```

**Usage**:
- Buttons: `--radius-lg`
- Cards: `--radius-xl`
- Input fields: `--radius-md`
- Tree markers: `--radius-full` (circles)
- Modals: `--radius-2xl`

---

### Shadows & Elevation

```css
--shadow-sm: 0 1px 2px 0 rgb(0 0 0 / 0.3);
--shadow-base: 0 1px 3px 0 rgb(0 0 0 / 0.4), 0 1px 2px -1px rgb(0 0 0 / 0.4);
--shadow-md: 0 4px 6px -1px rgb(0 0 0 / 0.4), 0 2px 4px -2px rgb(0 0 0 / 0.4);
--shadow-lg: 0 10px 15px -3px rgb(0 0 0 / 0.4), 0 4px 6px -4px rgb(0 0 0 / 0.4);
--shadow-xl: 0 20px 25px -5px rgb(0 0 0 / 0.4), 0 8px 10px -6px rgb(0 0 0 / 0.4);
--shadow-2xl: 0 25px 50px -12px rgb(0 0 0 / 0.5);
```

**Elevation Hierarchy**:
- Level 0 (base): No shadow
- Level 1 (cards): `--shadow-base`
- Level 2 (dropdowns): `--shadow-md`
- Level 3 (modals): `--shadow-lg`
- Level 4 (tooltips): `--shadow-xl`

---

### Map Styling

#### Circle Markers (Trees)

**Default State**
```javascript
{
  'circle-radius': {
    property: 'DBH_TRUNK',
    type: 'exponential',
    stops: [
      [0, 2.5],    // Minimum size
      [200, 12]    // Maximum size
    ]
  },
  'circle-opacity': 0.7,
  'circle-color': [
    'match',
    ['get', 'COMMON_NAM'],
    'APPLE', '#e41a1c',
    'APRICOT', '#e5c494',
    'PEACH', '#ff7f00',
    'PLUM', '#7570b3',
    'CHERRY', '#e78ac3',
    'CHOKE CHERRY', '#e78ac3',
    'PURPLELEAF CHERRY', '#e78ac3',
    'SARGENT CHERRY', '#e78ac3',
    'PEAR', '#a6d854',
    'BRADFORD PEAR', '#a6d854',
    'MULBERRY', '#6699ff',
    'BLACK (RED) MULBERRY', '#6699ff',
    'HACK-BERRY', '#6699ff',
    'WALNUT', '#a65628',
    'BLACK WALNUT', '#a65628',
    'AMERICAN CHESTNUT', '#a65628',
    'AMERICAN HAZEL', '#a65628',
    'HAZEL', '#a65628',
    '#cccccc'  // fallback
  ],
  'circle-stroke-width': 0,
  'circle-blur': 0
}
```

**Hover State**
```javascript
{
  'circle-opacity': 0.9,
  'circle-stroke-width': 2,
  'circle-stroke-color': '#ffffff',
  'circle-stroke-opacity': 0.8
}
```

**Selected State**
```javascript
{
  'circle-opacity': 1.0,
  'circle-stroke-width': 3,
  'circle-stroke-color': '#ffffff',
  'circle-stroke-opacity': 1.0,
  'circle-radius': ['+', ['get', 'radius'], 2] // slightly larger
}
```

**Ripeness Overlay** (optional layer)
```javascript
{
  'circle-stroke-width': 2,
  'circle-stroke-color': [
    'match',
    ['get', 'ripeness_status'],
    'not-yet', '#64b5f6',
    'soon', '#ffa726',
    'ready', '#00c853',
    'late', '#ff5252',
    '#808080'  // unknown
  ]
}
```

#### Base Layer (Background Trees)
```javascript
{
  'circle-radius': {
    property: 'DBH_TRUNK',
    type: 'exponential',
    stops: [[0, 2], [200, 10]]
  },
  'circle-opacity': 0.2,
  'circle-color': '#555555'
}
```

**Purpose**: Show filtered-out trees in muted state for spatial context

#### Map Style
```
Base: Mapbox Dark v11 (or MapLibre equivalent)
Customizations:
  - Water: #1a2332
  - Land: #1a1a1a
  - Roads: Simplified, minimal labels
  - POIs: Hidden (reduce clutter)
  - Labels: Neighborhood names only at appropriate zoom
```

---

### Component Patterns

#### Card Component
```css
.card {
  background: var(--color-bg-secondary);
  border: 1px solid var(--color-border-subtle);
  border-radius: var(--radius-xl);
  padding: var(--space-6);
  box-shadow: var(--shadow-base);
  transition: all 0.2s ease;
}

.card:hover {
  border-color: var(--color-border-default);
  box-shadow: var(--shadow-md);
  transform: translateY(-2px);
}
```

#### Button Variants

**Primary**
```css
.btn-primary {
  background: var(--color-accent-primary);
  color: white;
  padding: var(--space-3) var(--space-6);
  border-radius: var(--radius-lg);
  font-weight: var(--font-medium);
  box-shadow: var(--shadow-sm);
}
```

**Secondary**
```css
.btn-secondary {
  background: var(--color-bg-tertiary);
  color: var(--color-text-primary);
  border: 1px solid var(--color-border-default);
  padding: var(--space-3) var(--space-6);
  border-radius: var(--radius-lg);
}
```

**Ghost**
```css
.btn-ghost {
  background: transparent;
  color: var(--color-text-secondary);
  padding: var(--space-3) var(--space-6);
  border-radius: var(--radius-lg);
}

.btn-ghost:hover {
  background: var(--color-bg-tertiary);
}
```

#### Dashboard Question Cards

```css
.question-card {
  background: var(--color-bg-secondary);
  border: 1px solid var(--color-border-subtle);
  border-radius: var(--radius-xl);
  padding: var(--space-6);
  cursor: pointer;
  transition: all 0.2s ease;
  min-height: 120px;
  display: flex;
  flex-direction: column;
  gap: var(--space-3);
}

.question-card:hover {
  border-color: var(--color-accent-primary);
  box-shadow: var(--shadow-md);
  transform: translateY(-2px);
}

.question-card__icon {
  font-size: var(--text-3xl);
  line-height: 1;
}

.question-card__title {
  font-size: var(--text-lg);
  font-weight: var(--font-medium);
  color: var(--color-text-primary);
}

.question-card__preview {
  font-size: var(--text-sm);
  color: var(--color-text-tertiary);
}
```

#### Tooltip/Popup
```css
.tooltip {
  background: var(--color-bg-elevated);
  border: 1px solid var(--color-border-strong);
  border-radius: var(--radius-lg);
  padding: var(--space-4);
  box-shadow: var(--shadow-xl);
  max-width: 300px;
  font-size: var(--text-sm);
}
```

#### Filter Pills
```css
.filter-pill {
  display: inline-flex;
  align-items: center;
  gap: var(--space-2);
  padding: var(--space-2) var(--space-4);
  border-radius: var(--radius-full);
  font-size: var(--text-sm);
  font-weight: var(--font-medium);
  cursor: pointer;
  transition: all 0.2s ease;
}

.filter-pill--inactive {
  background: var(--color-bg-tertiary);
  color: var(--color-text-tertiary);
  opacity: 0.5;
}

.filter-pill--active {
  background: var(--fruit-color); /* dynamic based on category */
  color: white;
  opacity: 0.85;
}

.filter-pill--active:hover {
  opacity: 1;
}
```

---

### Animation & Motion

#### Timing Functions
```css
--ease-in: cubic-bezier(0.4, 0, 1, 1);
--ease-out: cubic-bezier(0, 0, 0.2, 1);
--ease-in-out: cubic-bezier(0.4, 0, 0.2, 1);
--ease-bounce: cubic-bezier(0.68, -0.55, 0.265, 1.55);
```

#### Duration
```css
--duration-fast: 150ms;
--duration-base: 200ms;
--duration-slow: 300ms;
--duration-slower: 500ms;
```

#### Common Transitions
```css
/* Hover effects */
transition: all var(--duration-base) var(--ease-out);

/* Map interactions */
transition: opacity var(--duration-slow) var(--ease-in-out);

/* Modal entrance */
transition: transform var(--duration-slow) var(--ease-bounce);
```

---

### Responsive Breakpoints

```css
--breakpoint-sm: 640px   /* Mobile landscape */
--breakpoint-md: 768px   /* Tablet portrait */
--breakpoint-lg: 1024px  /* Tablet landscape / Small desktop */
--breakpoint-xl: 1280px  /* Desktop */
--breakpoint-2xl: 1536px /* Large desktop */
```

**Mobile-First Approach**:
- Default styles for mobile (< 640px)
- Scale up for larger screens
- Map takes full viewport on mobile
- Collapsible panels/sidebars

---

### Accessibility Guidelines

#### Color Contrast
- **AA Standard (minimum)**: 4.5:1 for normal text, 3:1 for large text
- **AAA Standard (target)**: 7:1 for normal text, 4.5:1 for large text
- All fruit colors tested against dark backgrounds
- Provide non-color indicators where needed (icons, patterns)

#### Focus States
```css
:focus-visible {
  outline: 2px solid var(--color-accent-primary);
  outline-offset: 2px;
}
```

#### Keyboard Navigation
- All interactive elements keyboard-accessible
- Logical tab order
- Skip-to-content links
- Escape to close modals

#### Screen Readers
- Semantic HTML structure
- ARIA labels for map interactions
- Alt text for images
- Live regions for dynamic updates

---

### Design Principles

1. **Dark-First Design**: Optimized for low-light viewing (evening foraging planning)
2. **Information Density**: Balance detail with clarity
3. **Progressive Disclosure**: Show essentials first, details on demand
4. **Spatial Consistency**: Map remains primary focus
5. **Gestural Fluidity**: Smooth, responsive interactions
6. **Contextual Awareness**: UI adapts to user state (location, time, season)
7. **Accessible by Default**: WCAG AA minimum, AAA target

---

## Implementation Roadmap

### Revised Timeline Overview
- **Phase 0**: Foundation (Weeks 1-2)
- **Phase 1**: MVP Core (Weeks 3-8) - *No AI features*
- **Phase 2**: Accessibility & Polish (Weeks 9-10)
- **Phase 3**: MVP Launch (Weeks 11-12)
- **Phase 1.5**: MVP+ AI Integration (Weeks 13-16) - *AI features added*
- **Phase 2+**: Advanced Features (Weeks 17+)

Total to MVP: **12 weeks**  
Total to MVP+: **16 weeks**

---

### Phase 0: Foundation (Weeks 1-2)
**Goal**: Set up development environment and data pipeline

**Week 1: Project Setup**
- [ ] Initialize SvelteKit project with `adapter-static`
- [ ] Set up development tools (TypeScript, ESLint, Prettier)
- [ ] Configure GitHub repository
- [ ] Set up GitHub Pages deployment
- [ ] Configure accessibility testing tools (axe, Pa11y)
- [ ] Install MapLibre GL JS + PMTiles dependencies
- [ ] Set up basic project structure

**Week 2: Data Pipeline**
- [ ] Create single-file ETL (`scripts/etl.ts`)
- [ ] Fetch data from City of Toronto API (paginated)
- [ ] Filter to fruit-bearing species + map to 8 categories
- [ ] Write `static/data/trees.geojson` and `static/data/meta.json`
- [ ] Set up GitHub Actions workflow (monthly ETL)
- [ ] Download a pre-made Protomaps PMTiles basemap (Toronto region)
- [ ] Test data loading in browser

**Deliverable**: Working development environment with clean data pipeline

---

### Phase 1: MVP Core (Weeks 3-8)
**Goal**: Build functional MVP with core features (no AI)

**Weeks 3-4: Visual Foundation**
- [ ] Implement design system (tokens, components)
- [ ] Build custom basemap style
- [ ] Create SVG icon system (8 fruit categories)
- [ ] Develop responsive layout shell
- [ ] Implement WCAG-compliant color palette
- [ ] Build accessibility utilities (keyboard nav, focus management)

**Weeks 5-6: Map & Data Display**
- [ ] Integrate Mapbox/MapLibre
- [ ] Render tree markers with custom icons
- [ ] Implement filtering system (categories + month slider)
- [ ] Build interactive tooltips
- [ ] Add zoom/pan controls
- [ ] Optimize map performance

**Weeks 7-8: Content & Polish**
- [ ] Create 8 species guide pages (one per category)
- [ ] Build species comparison features
- [ ] Add basic tree search functionality
- [ ] Implement tree detail pages
- [ ] Create help/about content
- [ ] Content review and refinement

**Deliverable**: Functional MVP ready for accessibility audit

---

### Phase 2: Accessibility & Polish (Weeks 9-10)
**Goal**: Achieve WCAG 2.1 AA compliance

- [ ] Comprehensive accessibility audit
- [ ] Fix all WCAG violations
- [ ] Implement keyboard navigation for all features
- [ ] Optimize screen reader experience
- [ ] Test with NVDA, JAWS, VoiceOver
- [ ] Add high contrast mode
- [ ] Implement reduced motion support
- [ ] Write comprehensive alt text
- [ ] Test with real users (assistive tech)
- [ ] Performance optimization
- [ ] Cross-browser testing
- [ ] Mobile device testing

**Deliverable**: WCAG 2.1 AA compliant application

---

### Phase 3: Launch Preparation (Weeks 11-12)
**Goal**: Deploy and soft launch

- [ ] Final content review and polish
- [ ] SEO optimization
- [ ] Analytics setup
- [ ] Privacy policy / terms
- [ ] Deployment to production
- [ ] Performance monitoring setup
- [ ] Error tracking (Sentry or similar)
- [ ] Create documentation
- [ ] Soft launch to limited audience
- [ ] Gather initial feedback
- [ ] Iterate based on feedback

**Deliverable**: Live MVP in production

---

### Phase 1.5 (MVP+): AI Integration (Weeks 13-16)
**Goal**: Add AI-enhanced features to create MVP+

**Weeks 13-14: AI Infrastructure**
- [ ] Set up AI API integration (Anthropic Claude or OpenAI)
- [ ] Build summary generation system
- [ ] Create AI prompt templates
- [ ] Develop caching strategy for AI responses
- [ ] Test AI output quality and accuracy
- [ ] Implement rate limiting and error handling

**Weeks 15-16: Dashboard & Summaries**
- [ ] Build dashboard with 5 core question cards
- [ ] Generate all 25 ward-level summaries
- [ ] Generate top 20+ neighborhood summaries
- [ ] Implement custom area summary tool (draw boundary)
- [ ] Add AI-powered insights and patterns
- [ ] Create summary sharing/export features
- [ ] Test and refine AI responses
- [ ] Performance optimization for AI features

**Deliverable**: MVP+ with full AI-enhanced geographic intelligence

---

### Phase 2: Advanced Features (Weeks 17+)
**Goal**: Add advanced features based on user feedback

**Priority Features**:
1. Story Map component (narrative tours)
2. Natural language search
3. Additional map layers (infrastructure, historical)
4. Predictive ripeness modeling
5. Physical accessibility scoring
6. Intelligent route planning (early version)

**Deliverable**: Enhanced version with advanced features

---

## Immediate Next Steps

### This Week
1.  **Complete design thinking documentation** (DONE)
2.  **Key technology decisions made**:
   - Hosting: GitHub Pages
   - Map library: MapLibre GL JS
   - Map tiles: PMTiles for basemap
   - Data: GeoJSON for fruit trees (static files)
   - Architecture: Static site (SvelteKit `adapter-static`)
   - ETL: GitHub Actions monthly
3. **Review and approve**:
   - [ ] Problem definition accurate?
   - [ ] Solution approach sound?
   - [ ] MVP scope appropriate (Core MVP without AI features)?
   - [ ] MVP+ / Phase 1.5 separation makes sense?
   - [ ] Static site architecture acceptable?
4. **Remaining design decisions**:
   - [ ] Species guide depth and format
   - [ ] PMTiles source (pre-made vs. custom)
   - [ ] Content format for species guides

### Next Week (Start Phase 0)
5. **Project initialization**:
   - [ ] Create GitHub repository
   - [ ] Initialize SvelteKit project with `adapter-static`
   - [ ] Configure GitHub Pages deployment
   - [ ] Set up development tools (TypeScript, ESLint, Prettier)
6. **ETL development**:
   - [ ] Create ETL script (fetch from City API)
   - [ ] Test data filtering and transformation
   - [ ] Generate first `trees.geojson` file
   - [ ] Set up GitHub Actions workflow

### Week 3 (Phase 0 continues)
7. **Basemap and development environment**:
   - [ ] Acquire/generate PMTiles basemap
   - [ ] Install MapLibre + PMTiles dependencies
   - [ ] Test basic map rendering
   - [ ] Verify data loading in browser

---

## Open Questions & Decisions Needed

### Critical Decisions

 **DECIDED** (Based on requirements):

1. **Map Library**: MapLibre GL JS
   - Open-source, no usage costs
   - Excellent PMTiles support
   - Modern WebGL rendering
   - Active community

2. **Map Tiles**: PMTiles
   - Client-side rendering (no tile server)
   - Single file per tileset
   - Perfect for GitHub Pages
   - Efficient range requests

3. **Hosting**: GitHub Pages
   - Free (no infrastructure costs)
   - Simple deployment
   - Built-in CDN
   - Automatic HTTPS

4. **Data Architecture**: Static files + ETL
   - GeoJSON for fruit trees
   - PMTiles for basemap
   - Monthly ETL via GitHub Actions
   - No database needed

5. **Build**: SvelteKit with adapter-static
   - Pre-rendered static site
   - Client-side routing
   - Perfect for GitHub Pages
   - SEO-friendly

**DEFERRED** (To be decided later):

6. **LLM Provider** *(Decision deferred to Phase 1.5)*:
   - OpenAI (GPT-4): Best quality, expensive, well-documented
   - Anthropic (Claude): Great quality, cheaper, strong on summaries
   - Local (Llama, etc.): Free, privacy, but quality/speed tradeoffs
   - **Recommendation**: Anthropic Claude for summaries (cheaper, excellent at structured output)
   - **Note**: Not needed for MVP launch, decide before Phase 1.5 begins
   - **Implementation note**: For static site, AI features would require:
     - Serverless functions (GitHub doesn't support these natively)
     - External API service, or
     - Pre-generated content (run AI during build/ETL)

7. **Content Management**:
   - **Option A**: Markdown files (simple, version-controlled)
   - **Option B**: JSON files (structured, easy to parse)
   - **Recommendation**: Start with JSON for species data, Markdown for long-form content (guides, about pages)

### Design Decisions

**STILL TO DECIDE**:

12. **Species Guide Depth**: How comprehensive should each guide be?
    - Option A: Brief (300-400 words per species)
    - Option B: Comprehensive (800-1000 words per species)
    - **Recommendation**: Start with comprehensive (better content differentiation)
    - **Format**: JSON with structured fields + markdown description
    - **Decision needed**: Approve depth and structure

13. **PMTiles Basemap Source**: ✅ **DECIDED for MVP** — Use a pre-made PMTiles basemap (Protomaps build, or download a Toronto-region clip).
    - Rationale: avoids the entire `tippecanoe` / `planetiler` toolchain for MVP.
    - Custom basemap generation (full design-system styling, hidden POIs, custom labels) deferred to **Phase 2** if/when needed.
    - Visual customisation for MVP comes from the MapLibre **style** layer paint properties applied on top of the pre-made vector tiles, not from regenerating the tiles.

**DEFERRED TO PHASE 1.5**:

14. **Dashboard Questions**: Which 5 to prioritize for MVP+ (Phase 1.5)?
    - Proposed:
      1. "What's ripe near me right now?"
      2. "What can I pick this month?"
      3. "Which fruit trees are most common?"
      4. "Best fruit picking routes near me?"
      5. "What's the oldest tree I can visit?"
    - **Decision needed**: Approve or modify list (deferred to Phase 1.5 planning)

15. **Geographic Boundaries**: Which to prioritize for MVP+ (Phase 1.5)?
    - All 25 wards (comprehensive coverage)
    - Top 20+ neighborhoods (most usage)
    - **Recommendation**: Both (pre-generate all summaries during ETL)
    - **Note**: Deferred to Phase 1.5

16. **AI Summary Implementation**: How to generate summaries for static site?
    - **Option A**: Run AI during monthly ETL, store as static JSON files
    - **Option B**: Use serverless functions (requires different hosting)
    - **Recommendation**: Option A (keeps static architecture, lower cost)
    - **Trade-off**: Summaries only update monthly, but that's fine given data update frequency

### Technical Decisions

 **DECIDED**:

8. **Fruit Tree Data Format**: GeoJSON (static file)
   - Simple, widely supported
   - Human-readable
   - Easy to version control
   - Efficient enough for ~1000-5000 trees
   - Client-side filtering fast enough
   - **Note**: If dataset grows >10,000 trees, consider vector tiles

9. **Basemap Format**: PMTiles (vector tiles)
   - Efficient for basemap (millions of features)
   - Client-side rendering
   - No server infrastructure
   - Single file deployment

10. **Data Updates**: Monthly ETL via GitHub Actions
    - Automated, no manual intervention
    - Free (GitHub Actions free tier generous)
    - Transparent (all changes in git history)
    - Rebuilds site automatically

**DEFERRED** (Phase 1.5):

11. **AI Content Generation**: 
    - **Option A**: Pre-generate during ETL (summaries baked into data files)
    - **Option B**: Serverless functions (requires moving off GitHub Pages)
    - **Option C**: External API service
    - **Recommendation**: Option A for Phase 1.5 (pre-generate summaries monthly, store as static JSON)

---

## Risk Assessment

### Technical Risks
| Risk | Probability | Impact | Mitigation |
|------|-------------|--------|------------|
| AI API costs too high | Medium | High | Pre-compute summaries, cache aggressively, use cheaper models |
| Map performance issues | Low | Medium | Vector tiles, clustering, progressive loading |
| Data quality problems | Medium | High | Thorough cleaning, validation, manual review |
| Accessibility compliance gaps | Low | High | Early testing, automated tools, expert review |

### Project Risks
| Risk | Probability | Impact | Mitigation |
|------|-------------|--------|------------|
| Scope creep | High | Medium | Strict MVP definition, phase-based approach |
| Timeline overrun | Medium | Low | Buffer built into estimates, prioritization |
| Data update logistics | Low | Medium | Automated pipeline, quarterly schedule |
| User adoption | Medium | High | Soft launch, feedback loops, marketing plan |

### External Risks
| Risk | Probability | Impact | Mitigation |
|------|-------------|--------|------------|
| City data discontinued | Low | High | Archive data, build relationships with city |
| API pricing changes | Medium | Medium | Abstract providers, build fallbacks |
| Technology obsolescence | Low | Low | Standard tech choices, modular architecture |

---

## Success Criteria

### MVP Launch Criteria (Must Meet All)
- - All 8 fruit tree categories represented
- - Complete species guides (one per category minimum)
- - Enhanced filter system functional
- - Basic tree search working
- - WCAG 2.1 AA compliance (audit score 100%)
- - Mobile responsive (works on 320px width)
- - Lighthouse score > 90 (performance, accessibility, best practices)
- - Zero critical accessibility errors
- - Keyboard navigation complete
- - Screen reader tested (NVDA, VoiceOver)
- - Page load < 3 seconds
- - Map renders < 1 second
- - Cross-browser tested (Chrome, Firefox, Safari, Edge)

### MVP+ Launch Criteria (Phase 1.5 - Must Meet All)
- - All 25 ward summaries available
- - Dashboard with 5 working AI-powered questions
- - Top 20+ neighborhood summaries available
- - Custom area summary tool functional
- - AI responses accurate and helpful (manual review)
- - Summary caching working (fast load times)
- - AI error handling robust
- - Cost monitoring in place (API usage tracking)

### 3-Month Post-MVP Launch Success
- 500+ monthly active users (baseline: establish in first month)
- 60%+ return visitor rate
- Average session > 3 minutes
- < 5% bounce rate from homepage
- Zero critical bugs reported
- Positive user feedback (survey or qualitative)

### 3-Month Post-MVP+ Success (After Phase 1.5)
- 1,000+ monthly active users
- Dashboard questions clicked in 70%+ of sessions
- Geographic summaries viewed in 40%+ of sessions
- AI-generated content rated helpful by users
- Increased session duration vs MVP baseline

### 6-Month Goals
- 2,000+ monthly active users
- Featured on Toronto-related blogs/sites
- Organic search traffic established
- Community engagement (social mentions, shares)
- Data updated at least once since launch
- Phase 2 features in development

---

## Appendix

### Reference Materials
- [Toronto Open Data - Street Trees](https://www.toronto.ca/city-government/data-research-maps/open-data/open-data-catalogue/#0e785adb-d130-8957-a572-5d6fdb5cc275)
- [Toronto Tree Species Guide](https://www.toronto.ca/services-payments/water-environment/trees/tree-planting/species-planted-on-streets/)
- [WCAG 2.1 Guidelines](https://www.w3.org/WAI/WCAG21/quickref/)
- [SvelteKit Documentation](https://kit.svelte.dev/docs)
- [Mapbox GL JS Documentation](https://docs.mapbox.com/mapbox-gl-js/)
- [MapLibre GL JS Documentation](https://maplibre.org/maplibre-gl-js/docs/)

### Glossary
- **DBH**: Diameter at Breast Height (1.3m) - standard tree measurement
- **Phenology**: Study of cyclic plant life events (e.g., fruit ripening)
- **WCAG**: Web Content Accessibility Guidelines
- **LLM**: Large Language Model (AI for text generation)
- **PostGIS**: Spatial database extension for PostgreSQL
- **Vector Tiles**: Efficient map data format
- **MVP**: Minimum Viable Product

---

## Document History

| Date | Version | Changes | Author |
|------|---------|---------|--------|
| Apr 28, 2026 | 1.0 | Initial design thinking documentation | Tom Weatherburn |
| | | - Current state analysis | |
| | | - Problem definition (3 themes) | |
| | | - Feature brainstorming | |
| | | - Design system | |
| | | - Technical architecture | |
| | | - Implementation roadmap | |
| Apr 28, 2026 | 1.1 | Revised MVP scope | Tom Weatherburn |
| | | - Moved AI features to MVP+/Phase 1.5 | |
| | | - Simplified MVP to core mapping features | |
| | | - Separated dashboard & summaries to Phase 1.5 | |
| | | - Updated roadmap (MVP: 12 weeks, MVP+: 16 weeks) | |
| | | - Deferred LLM provider decision to Phase 1.5 | |
| Apr 28, 2026 | 1.2 | Finalized technical architecture | Tom Weatherburn |
| | | - Specified static site architecture (GitHub Pages) | |
| | | - Confirmed MapLibre GL JS + PMTiles | |
| | | - Defined ETL process (GitHub Actions monthly) | |
| | | - Eliminated database requirement (static GeoJSON) | |
| | | - Documented complete data pipeline | |
| | | - Updated Phase 0 tasks for static architecture | |
| Apr 28, 2026 | 1.3 | Refined architecture for Svelte 5 best practices | Tom Weatherburn |
| | | - Restructured file tree to SvelteKit conventions | |
| | | - Svelte 5 runes ($state, $derived, $props) throughout | |
| | | - $state.raw for GeoJSON perf, dynamic imports for MapLibre | |
| | | - Component architecture with a11y roles/ARIA patterns | |
| | | - GitHub Pages config (adapter-static, fallback, base path) | |
| | | - Added test structure (unit, component, e2e, a11y) | |
| | | - Focus management and LiveRegion patterns | |
| | | - Performance load sequencing and targets | |
| Apr 29, 2026 | 1.4 | Aggressively simplified architecture to MVP scope | Tom Weatherburn |
| | | - Added "Simplicity Principles" section with explicit guardrails | |
| | | - Flattened components folder (5 subfolders → flat, 20 → 11 files) | |
| | | - State stores 4 → 2 (dropped map state and preferences; OS owns prefs) | |
| | | - Filtering moved to MapLibre filter expressions (no JS filter pass) | |
| | | - Data modules 3 → 1 (months/species-meta dropped or inlined) | |
| | | - Utils 5 → 2 (age-estimate and filter dropped; format inlined) | |
| | | - Types collapsed 4 → 1 file | |
| | | - ETL collapsed 6 files → single `scripts/etl.ts` | |
| | | - Removed: service-worker, params matcher, boundaries, context tiles | |
| | | - Dropped Header/Sidebar/MobileNav/Button/Card/ThemeToggle components | |
| | | - "Search" defined as filter pills + GeolocateControl (no free-text) | |
| | | - Locked PMTiles to pre-made (Protomaps) for MVP | |
| | | - Single display typeface (Inter) — Cabinet Grotesk deferred | |
| | | - Test folders 3 → 2; GH workflows 3 → 2 | |

---

**Next Review**: After key decisions made, before Phase 0 begins

---

## Technical Migration Path

### From
- Single HTML file
- Vanilla JavaScript
- Mapbox GL JS v0.45.0
- Static data embedded/referenced

### To
- **Framework**: SvelteKit
- **Mapping**: Mapbox GL JS v3.x or MapLibre GL
- **AI Integration**: TBD (LLM API, local models, etc.)
- **Data**: Dynamic data source with update strategy
- **Build System**: Vite (SvelteKit default)
- **Deployment**: TBD

---

## Project Metadata

**Original Authors**: Tom Weatherburn (@teedubolya), William Davis (@willy_maps)  
**Original Release**: 2018  
**Data Source**: City of Toronto Open Data Catalogue  
**License**: TBD  
**Redesign Lead**: Tom Weatherburn
