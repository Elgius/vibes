# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Common Development Commands

### Development
```bash
npm run dev      # Start Next.js development server with Turbopack
```

### Build & Production
```bash
npm run build    # Build for production
npm run start    # Start production server
```

### Code Quality
```bash
npm run lint     # Run ESLint for code linting
```

## High-Level Architecture

### Project Overview
This is a Next.js 15 application called "Spill the Vibes" - a mood-based platform for analyzing and discussing relationship situations. The app features dynamic theming based on user-selected moods (vibrant, romantic, sunny, mystical, serene).

### Key Architecture Patterns

1. **Theme/Mood System**
   - Central `ColorPaletteContext` (src/context/color-palette-context.tsx) manages app-wide mood state
   - Each mood has associated color schemes and content variations
   - Theme changes dynamically update UI colors and messaging

2. **Page Structure & Navigation Flow**
   - `/` - Landing page with mood selector → navigates to `/onboarding`
   - `/onboarding` - User onboarding (terms, age verification, name) → navigates to `/user`
   - `/user` - Main chat interface with streaming AI responses
   - `/search` - Analysis form with mood-specific content
   - `/result` - Analysis results page (with custom layout)
   - `/example/[mood]` - Dynamic mood example pages

3. **API Integration**
   - Self-contained using Next.js API routes with OpenAI SDK
   - Key endpoints:
     - `/api/chat` - Streaming chat responses with mood-based conversations using GPT-4o-mini
     - `/api/analyze` - Relationship situation analysis
   - Stripe integration for payments (`/api/checkout_sessions`)
   - Mood-specific system prompts embedded in API routes

4. **Component Architecture**
   - UI components built with Radix UI primitives (src/components/ui/)
   - Styled with Tailwind CSS v4 and custom CSS variables
   - Key components:
     - `SituationshipForm` - Main user input form
     - `Contexts` - Image upload and question interface
     - `ColorPaletteModal` - Mood selection interface

5. **State Management**
   - React Context for global state (color palette)
   - Local component state for forms and UI interactions
   - LocalStorage for persisting user preferences

6. **Styling Approach**
   - Tailwind CSS v4 with PostCSS
   - CSS custom properties for dynamic theming
   - Theme variables defined by data-theme attribute
   - Utility-first approach with component variants

7. **AI Integration**
   - Currently uses OpenAI SDK (`@ai-sdk/openai`) with GPT-4o-mini model
   - Implements streaming responses using `streamText` from `ai` package
   - Five mood-based AI personalities: vibrant, romantic, sunny, mystical, serene
   - Temperature set to 0.7 for balanced creativity and consistency
   - **Future Migration**: Planning to transition to Anthropic/Claude architecture in future development phases

## Development Roadmap (from todo.md)
1. Magic Summary Feature - Intelligent content summarization
2. Text Processing Enhancement - Paragraph whitespace normalization
3. API Optimization - Binary format for payloads
4. Dashboard - Profile page and journal entries

## Important Notes
- Uses TypeScript with strict mode enabled
- Path alias `@/` maps to `./src/`
- TikTok Sans font integration for branding
- OpenAI API key stored in `.env.local` as `OPENAI_API_KEY`
- No backend dependency - fully self-contained Next.js app
- No test framework currently configured
- **Migration Note**: Currently using OpenAI models; future versions will migrate to Anthropic/Claude for enhanced AI capabilities