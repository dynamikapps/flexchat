# ROADMAP.md

## 1. Vision & Scope
- **Goal:** Build a lightweight, embeddable chat widget with deep theming and extensibility, powered by n8n workflows.
- **Key Features:**
  - Pluggable branding (logo, colors, fonts)
  - Configurable welcome messages, suggested questions, and UI text
  - Theming via Tailwind CSS tokens or CSS-in-JS
  - Multi-instance support (multiple widgets per site)
  - Analytics hooks (events for open, message sent, closed)
  - Optional user info capture (name, email) before chat
  - Easy embedding via script tag on any website platform (WordPress, HTML, Wix, etc.)
  - Widget positioning (left or right)
  - Session tracking for consistent conversations

## 2. Architecture
- **Frontend:** React + TypeScript + Tailwind CSS (compiled to standalone script)
- **Widget Core:** Based on `@n8n/chat` (or fork) for chat UI + webhook integration
- **Backend/Webhook:** n8n hosted (self-hosted or n8n cloud) exposing HTTP Webhook node
- **Deployment:** 
  - Widget: CDN-hosted script for embedding
  - Demo: Vercel for showcase site
- **CI/CD:** GitHub Actions for build, tests, and deployment

## 3. Milestones
1. **Research & Prototype**  
   - Evaluate `@n8n/chat` capabilities  
   - Sketch customization API  
2. **Core Widget Package**  
   - Fork or wrap `@n8n/chat`  
   - Expose config props for branding and messages  
3. **Theming & Styling**  
   - Integrate Tailwind design tokens  
   - Add dark/light mode support  
4. **Advanced Features**  
   - Analytics event layer  
   - Multi-widget instances  
   - Dynamic suggested questions from API  
5. **Embeddable Script Creation**
   - Bundle widget as standalone script
   - Create global configuration object
   - Optimize bundle size
6. **Platform Integration Guides**
   - WordPress embedding instructions
   - Wix embedding instructions
   - HTML site embedding instructions
7. **Documentation & Examples**  
   - README with install/use guide  
   - Example site with live demo
8. **Release & Deployment**  
   - Host script on CDN
   - Deploy demo on Vercel  
   - Blog post or video walkthrough

## 4. Success Metrics
- ✓ Ability to change all UI text/colors via props  
- ✓ Simple script tag embedding on any platform
- ✓ < 50 KB bundle size for embeddable script
- ✓ Successful data transmission to n8n (messages, user info, session data)
- ✓ 80% test coverage