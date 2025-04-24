# ROADMAP.md

## 1. Vision & Scope
- **Goal:** Build a React/Next.js-based chat widget package with deep theming and extensibility, powered by n8n workflows.
- **Key Features:**
  - Pluggable branding (logo, colors, fonts)
  - Configurable welcome messages, suggested questions, and UI text
  - Theming via Tailwind CSS tokens or CSS-in-JS
  - Multi-instance support (multiple widgets per site)
  - Analytics hooks (events for open, message sent, closed)
  - Optional user info capture (name, email) before chat
  - Easy deployment on Vercel with zero-config defaults
  - Widget positioning (left or right)

## 2. Architecture
- **Frontend:** Next.js + React + TypeScript + Tailwind CSS  
- **Widget Core:** Based on `@n8n/chat` (or fork) for chat UI + webhook integration :contentReference[oaicite:1]{index=1}
- **Backend/Webhook:** n8n hosted (self-hosted or n8n cloud) exposing HTTP Webhook node  
- **Deployment:** Vercel for frontend; n8n hosted separately  
- **CI/CD:** GitHub Actions for build, tests, and Vercel preview deploys

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
5. **Documentation & Examples**  
   - README with install/use guide  
   - Example site in monorepo  
6. **Release & Deployment**  
   - Publish to npm  
   - Deploy demo on Vercel  
   - Blog post or video walkthrough

## 4. Success Metrics
- ✓ Ability to change all UI text/colors via props  
- ✓ Zero-config deploy on Vercel  
- ✓ < 100 KB bundle size  
- ✓ 80% test coverage