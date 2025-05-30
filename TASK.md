# TASK.md

## Initial Tasks
- **T1: Market Scan** ✅  
  - Explore existing npm packages (`@n8n/chat`, alternatives) ✅  
  - List out feature gaps and customization limits ✅

- **T2: Repo Setup** ✅  
  - ~~Initialize monorepo (TurboRepo or pnpm workspaces)~~ (Used standard Next.js project structure) ✅  
  - ~~Create Next.js app in `examples/` and `packages/widget/`~~ (Created single Next.js app) ✅

- **T3: Install Dependencies** ✅  
  - `npm install @n8n/chat` ✅  
  - Add React, TypeScript, Tailwind ✅

- **T4: Basic Embed Page** ✅  
  - Create page that renders the chat widget ✅  
  - Connect to a dummy n8n webhook ✅

- **T5: Configuration API** ✅  
  - Wrap `@n8n/chat` in our own component ✅  
  - Expose props: `logo`, `primaryColor`, `welcomeText`, etc. ✅

- **T6: Theming & Design** ✅  
  - Integrate Tailwind config for theme tokens ✅  
  - Add dark/light mode support ✅

- **T7: Deployment Pipeline** ✅  
  - Project ready for Vercel deployment ✅  
  - Added deployment instructions to README ✅

- **T8: Documentation Draft** ✅  
  - Write README with install, usage, and customization guide ✅

## Current Tasks (2025-04-24)
- **T9: Embeddable Script Creation** ✅
  - Configure build process to output standalone script ✅
  - Create global configuration object for script initialization ✅
  - Optimize bundle size for faster loading ✅
  - Implement session tracking and enhanced data transmission ✅

- **T10: Enhanced n8n Integration** ✅
  - Improve session tracking with persistent IDs ✅
  - Ensure all user data (name, email, etc.) is properly transmitted to n8n ✅
  - Add support for custom data fields to be passed to webhook ✅
  - Add page context information to webhook payload ✅

- **T11: Cross-Platform Embedding** ✅
  - Create embedding instructions for WordPress ✅
  - Create embedding instructions for Wix ✅
  - Create embedding instructions for standard HTML sites ✅
  - Test embedding on various platforms ✅

- **T12: Documentation Update** ✅
  - Update README with embedding instructions ✅
  - Create platform-specific guides ✅
  - Add troubleshooting section ✅

## Discovered During Work
- Created a mock implementation of the Chat component for development purposes
- Added custom CSS styling for the chat widget
- Fixed build issues with Tailwind CSS and PostCSS configuration
- Added TypeScript interfaces for better type safety
- Created a test file for the ChatWidget component
- Added widget positioning feature (left/right) ✅
- Added open/close functionality with toggle button ✅
- Added message sending functionality with send button ✅
- Fixed suggested questions functionality ✅
- Implemented user data collection form with validation ✅
- Enhanced webhook payload with user data and session information ✅

## Backlog Ideas
- Keyboard accessibility improvements  
- Offline fallback UI  
- Analytics integration (Google Analytics, Segment)  
- Multi-tenant support per subdomain
- Custom widget themes via CSS variables
- File upload capabilities
- Message history persistence
