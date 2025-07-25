# Leagacy - Fantasy League Management DApp Design Document

## 1. Overview

### 1.1 System Architecture
Leagacy is a React-based decentralized application (DApp) that facilitates fantasy sports league management through blockchain technology. The application follows a modern component-based architecture with centralized state management and Web3 integration.

### 1.2 Technology Stack
- **Frontend Framework**: React 18+ with functional components and hooks
- **UI Library**: Material-UI (MUI) with custom fantasy-themed styling
- **State Management**: Redux Toolkit with centralized store
- **Routing**: React Router v6 with client-side navigation
- **Web3 Integration**: RainbowKit + Wagmi for wallet connectivity
- **Blockchain**: Base Layer 2 network with Ethereum compatibility
- **Build System**: Webpack with custom configuration
- **Development Tools**: Truffle for smart contract development

### 1.3 Project Structure
```
client/
├── src/
│   ├── components/          # Reusable UI components
│   ├── hooks/              # Custom React hooks
│   ├── redux/              # State management
│   ├── utils/              # Utility functions and adapters
│   ├── assets/             # Static assets (fonts, icons, images)
│   ├── styles/             # Global and component styles
│   ├── contexts/           # React context providers
│   └── mock/               # Mock data for development
├── public/                 # Static public assets
└── build/                  # Production build output
truffle/
├── contracts/              # Smart contracts
├── migrations/             # Deployment scripts
├── test/                   # Contract tests
└── scripts/                # Utility scripts
```

## 2. Architecture

### 2.1 Component Architecture

```
App (Root)
├── ThemeProvider (MUI)
├── TopNavigation
│   ├── MenuComponent
│   ├── CreateLeagueButton
│   └── ConnectWalletButton
└── Router
    ├── MainContent (Dashboard)
    ├── CreateLeague
    ├── ManageLeagues
    │   └── ManageLeaguesTable
    └── LeagueDetails
```

### 2.2 State Management Architecture

```
Redux Store
├── appSlice
│   ├── leagues[]           # League data array
│   ├── loading            # Loading states
│   ├── error              # Error handling
│   └── user               # User-specific data
├── walletSlice (future)
│   ├── address            # Connected wallet address
│   ├── balance            # Wallet balance
│   └── network            # Current network
└── uiSlice (future)
    ├── theme              # UI theme preferences
    └── notifications      # User notifications
```

### 2.3 Data Flow Architecture

```
Smart Contracts (Base Network)
    ↓
Blockchain Data Adapters
    ↓
Redux Store (Normalized State)
    ↓
React Components (UI Layer)
    ↓
User Interactions
    ↓
Web3 Transactions (RainbowKit/Wagmi)
```

## 3. Components and Interfaces

### 3.1 Core Layout Components

#### App.jsx
**Purpose**: Root application component with routing and theme setup
**Current Implementation**:
```jsx
- ThemeProvider integration with custom fantasy theme
- React Router setup with main routes
- Mock data loading for development
- Layout structure with TopNavigation and route rendering
```

#### TopNavigation.jsx  
**Purpose**: Main navigation bar with wallet connection
**Current Implementation**:
```jsx
- AppBar with Leagacy branding
- MenuComponent for league navigation
- CreateLeagueButton (when wallet connected)
- ConnectWalletButton with address display
- Responsive layout with proper spacing
```

### 3.2 Navigation Components

#### MenuComponent.jsx
**Purpose**: Dropdown menu for league navigation
**Current Implementation**:
```jsx
- IconButton with Menu dropdown
- Dynamic league list from Redux state
- Commissioner indicators (SupervisorAccountIcon)
- Navigation with preserved URL parameters
- Empty state handling for no leagues
```

#### CreateLeagueButton.jsx
**Purpose**: Button to navigate to league creation
**Current Implementation**:
```jsx
- Material-UI Button with AddIcon
- React Router Link integration
- Conditional rendering based on wallet connection
```

### 3.3 Dashboard Components

#### MainContent.jsx (Dashboard)
**Purpose**: Main dashboard/landing page
**Current Implementation**:
```jsx
- Wallet connection state handling
- Welcome message and instructions
- Call-to-action buttons for Create/Manage leagues
- Responsive layout with proper spacing
```

### 3.4 League Management Components

#### CreateLeague.jsx
**Purpose**: Multi-step league creation form
**Current Implementation**:
```jsx
- Sport selection with icons (NFL, NBA, MLB, NHL, Custom)
- Dynamic year generation based on sport type
- Chain selection (Base network focus)
- Currency selection (ETH, USDC, USDT) with icons
- Form validation with error handling
- Confirmation dialog before submission
- Responsive grid layout
```

**Form Fields**:
- Sport (Select with icons)
- Custom Sport (TextField - conditional)
- Year (Select with dynamic options)
- League Name (TextField)
- League Size (TextField)
- Chain (Select - Base only for MVP)
- Fee (TextField with currency selector)

#### ManageLeagues.jsx
**Purpose**: League management interface with tabs
**Current Implementation**:
```jsx
- Tab interface (Current/Past leagues)
- Redux state integration for league filtering
- Empty state handling
- Responsive tab layout
```

#### ManageLeaguesTable.jsx
**Purpose**: Table display for league data
**Current Implementation**:
```jsx
- Material-UI Table with proper headers
- League row components with navigation
- Commissioner indicators
- Payment status display
- Sticky column for league names
- Click navigation to league details
```

#### LeagueDetails.jsx
**Purpose**: Individual league information display
**Current Implementation**:
```jsx
- URL parameter extraction (league ID)
- Redux state lookup for league data
- League information display
- Commissioner status indication
- Currency formatting integration
```

### 3.5 UI Components

#### FantasyButton.jsx
**Purpose**: Custom-styled button with fantasy aesthetic
**Current Implementation**:
```jsx
- Styled Material-UI Button with complex CSS
- Royal purple background with gold text
- Layered border effects with parchment styling
- Inverted corners using CSS mask-image
- Hover and focus states
- Responsive sizing options
```

#### ConnectWalletButton.jsx
**Purpose**: Wallet connection interface
**Current Implementation**:
```jsx
- RainbowKit ConnectButton wrapper
- Props passthrough for customization
- Integration with Wagmi for wallet state
```

### 3.6 Custom Hooks

#### useNavigateWithParams.jsx
**Purpose**: Navigation with URL parameter preservation
**Current Implementation**:
```jsx
- React Router useNavigate wrapper
- URL parameter preservation across navigation
- Query string handling for mock data
```

## 4. Data Models

### 4.1 League Data Model

```javascript
// Frontend League Object (after adapter transformation)
{
  id: string,              // Contract address or unique identifier
  name: string,            // League name
  sport: string,           // Sport type (NFL, NBA, MLB, NHL, etc.)
  year: number | array,    // Season year(s)
  archived: boolean,       // League completion status
  commish: boolean,        // User is commissioner
  fee: number,             // Entry fee amount
  currency: object,        // Currency object with display info
  chain: object,           // Blockchain network info
  leagueSize: number,      // Maximum number of participants
  paid: boolean            // User payment status
}
```

### 4.2 Blockchain Data Model

```javascript
// Raw Blockchain League Structure
{
  name: string,                    // League name
  sportId: string,                 // Numeric sport identifier
  seasonStartTimestamp: string,    // Unix timestamp
  seasonEndTimestamp: string,      // Unix timestamp
  archived: boolean,               // Completion status
  commissioner: string,            // Ethereum address
  entryFeeWei: string,            // Fee in wei (18 decimals)
  currencyAddress: string,         // Token contract address
  chainId: string,                 // Network chain ID
  members: array,                  // Array of member addresses
  maxMembers: string,              // Maximum participants
  paymentStatus: object            // Address -> boolean mapping
}
```

### 4.3 Currency Data Model

```javascript
// Currency Object Structure
{
  id: string,          // Internal identifier
  name: string,        // Display name
  code: string,        // Currency code (ETH, USDC, etc.)
  symbol: string,      // Display symbol
  decimals: number,    // Decimal places
  icon: ReactComponent // Currency icon component
}
```

### 4.4 Chain Data Model

```javascript
// Chain Object Structure
{
  id: string,          // Chain identifier
  name: string,        // Display name
  chainId: number,     // Network chain ID
  rpcUrl: string,      // RPC endpoint
  blockExplorer: string, // Block explorer URL
  icon: ReactComponent   // Chain icon component
}
```

## 5. State Management

### 5.1 Redux Store Structure

#### appSlice.js
**Current Implementation**:
```javascript
// Initial State
{
  leagues: [],         // Array of league objects
  loading: false,      // Loading state for async operations
  error: null          // Error message handling
}

// Actions
- setLeagues(leagues): Direct league array update
- fetchBlockchainData(): Async thunk for blockchain data

// Async Thunks
- fetchBlockchainData: Fetches and adapts blockchain data
```

#### Future State Slices
```javascript
// walletSlice (planned)
{
  address: string,     // Connected wallet address
  balance: string,     // Wallet balance
  network: object,     // Current network info
  connected: boolean   // Connection status
}

// uiSlice (planned)
{
  theme: string,       // Theme preference
  notifications: [],   // User notifications
  loading: object      // Component-specific loading states
}
```

### 5.2 Data Adapters

#### leagacyAdapter.js
**Purpose**: Transform blockchain data to frontend format
**Current Implementation**:
```javascript
- adaptBlockchainLeagues(): Main transformation function
- Wei to ETH conversion
- Sport ID to name mapping
- Timestamp to year conversion
- Currency address to object mapping
- Commissioner status determination
- Payment status checking
```

## 6. Error Handling

### 6.1 Component-Level Error Handling

#### Form Validation
```javascript
// CreateLeague.jsx validation pattern
- Field-specific error states (sportError, yearError, etc.)
- Real-time validation on form submission
- Helper text display for validation errors
- Form submission prevention on validation failure
```

#### Data Loading
```javascript
// LeagueDetails.jsx error handling
- League not found handling
- Graceful degradation with fallback UI
- Error boundary implementation (planned)
```

### 6.2 Redux Error Handling

#### Async Operation Errors
```javascript
// appSlice.js error handling
- fetchBlockchainData.rejected: Error state update
- Error message storage in state
- Component-level error display
```

### 6.3 Web3 Error Handling

#### Wallet Connection Errors
```javascript
// Handled by RainbowKit
- Connection failures
- Network switching errors
- Transaction rejection handling
```

#### Smart Contract Interaction Errors
```javascript
// Planned error handling
- Gas estimation failures
- Transaction timeout handling
- Contract method call failures
- Network congestion handling
```

## 7. Styling and Theme

### 7.1 Theme System

#### theme.js
**Current Implementation**:
```javascript
// Fantasy Grimoire Theme
- Primary: Royal purple (#6741D9)
- Secondary: Fantasy Gold (#FFD700)
- Custom typography with Jakobenz font
- Parchment background textures
- Component overrides for Material-UI
```

### 7.2 Custom Styling

#### Fantasy Button Styling
```css
- Complex layered border effects
- Parchment-style outer border
- Gold inner border
- Royal purple background
- Inverted corners with mask-image
- Responsive hover states
```

#### Responsive Design
```css
- Mobile-first approach
- Material-UI breakpoint system
- Flexible grid layouts
- Touch-optimized interface elements
```

## 8. Integration Patterns

### 8.1 Web3 Integration

#### RainbowKit Setup
```javascript
// index.jsx configuration
- Base network focus
- Wagmi provider integration
- Query client setup
- Cool mode enabled
```

#### Wallet State Management
```javascript
// Component integration pattern
- useAccount hook for wallet state
- Conditional rendering based on connection
- Address display and management
```

### 8.2 Router Integration

#### Navigation Patterns
```javascript
// React Router v6 patterns
- Component-based routing
- URL parameter extraction
- Programmatic navigation
- Parameter preservation
```

### 8.3 Mock Data Integration

#### Development Data
```javascript
// data.js structure
- Blockchain-like data structure
- Multiple league examples
- Commissioner/member roles
- Payment status simulation
```

## 9. Performance Considerations

### 9.1 Component Optimization

#### React Optimization
```javascript
// Current patterns
- Functional components with hooks
- Proper dependency arrays in useEffect
- Component memoization opportunities
```

#### Bundle Optimization
```javascript
// Webpack configuration
- Code splitting opportunities
- Dynamic imports for large components
- Asset optimization
```

### 9.2 State Management Optimization

#### Redux Performance
```javascript
// Optimization opportunities
- Selector memoization
- Normalized state structure
- Efficient update patterns
```

## 10. Testing Strategy

### 10.1 Component Testing

#### Current Test Setup
```javascript
// Planned testing approach
- Jest and React Testing Library
- Component unit tests
- User interaction testing
- Accessibility testing
```

### 10.2 Integration Testing

#### Web3 Integration Testing
```javascript
// Planned testing approach
- Mock wallet providers
- Contract interaction testing
- Network switching testing
```

## 11. Future Enhancements

### 11.1 Planned Components

#### Enhanced Dashboard
```javascript
// Planned features
- Account balance display
- Transaction history
- Activity feed
- Analytics dashboard
```

#### Advanced League Management
```javascript
// Planned features
- League templates
- Bulk operations
- Advanced filtering
- Export functionality
```

### 11.2 State Management Evolution

#### Additional Slices
```javascript
// Planned state additions
- walletSlice: Comprehensive wallet state
- uiSlice: UI preferences and notifications
- transactionSlice: Transaction history and status
```

### 11.3 Integration Enhancements

#### Smart Contract Integration
```javascript
// Planned integrations
- Real blockchain data fetching
- Contract deployment integration
- Transaction monitoring
- Event listening
```

#### Third-Party Integrations
```javascript
// Planned integrations
- Sports data APIs
- Price feed integration
- Analytics services
- Notification services
```

## 12. Security Considerations

### 12.1 Frontend Security

#### Input Validation
```javascript
// Current validation patterns
- Form field validation
- Type checking
- Sanitization requirements
```

#### Web3 Security
```javascript
// Security considerations
- Transaction verification
- Contract address validation
- Secure wallet integration
- User consent patterns
```

### 12.2 Data Security

#### State Security
```javascript
// Security patterns
- Sensitive data handling
- Local storage security
- Error message sanitization
```

## 13. Development Workflow

### 13.1 Component Development

#### Development Pattern
```javascript
// Standard component structure
- Functional component with hooks
- PropTypes validation
- Error boundary wrapping
- Accessibility considerations
```

#### Styling Pattern
```javascript
// Styling approach
- Material-UI styled components
- Theme integration
- Responsive design patterns
- Custom fantasy styling
```

### 13.2 State Management Workflow

#### Redux Development
```javascript
// Development pattern
- Slice-based organization
- Async thunk patterns
- Adapter integration
- Error handling
```

This design document provides a comprehensive overview of the Leagacy DApp architecture, components, and implementation details based on your requirements and existing codebase. It serves as a blueprint for continued development and can be updated as the application evolves.
