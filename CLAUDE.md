# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Overview

Firecrawl Content Migrator is a Next.js 15 web application that helps users scrape and migrate content from websites using the Firecrawl API. It's built with TypeScript, React 19, and uses shadcn/ui components.

## Development Commands

```bash
# Install dependencies
npm install

# Run development server with Turbopack
npm run dev

# Build for production
npm run build

# Start production server
npm start

# Run linting
npm run lint
```

## Environment Setup

The application requires a Firecrawl API key configured in `.env.local`:
```env
FIRECRAWL_API_KEY=fc-YOUR_ACTUAL_API_KEY_HERE
```

## Project Architecture

### Core Technology Stack
- **Framework**: Next.js 15.3.5 with App Router
- **Language**: TypeScript with strict mode enabled
- **UI Components**: shadcn/ui (Radix UI primitives + Tailwind CSS)
- **Styling**: Tailwind CSS with tailwind-merge and class-variance-authority
- **State Management**: React hooks (useState, useEffect)
- **API Integration**: Firecrawl SDK (@mendable/firecrawl-js)

### Directory Structure
- `/src/app/` - Next.js App Router pages and API routes
  - `/api/map/` - Website mapping endpoint
  - `/api/crawl/` - Content scraping and schema inference endpoint
- `/src/components/` - React components
  - `/ui/` - shadcn/ui components (40+ pre-built components)
  - `/layout/` - Layout components (header, hero, layout wrapper)
- `/src/lib/` - Utility functions (cn helper for className merging)
- `/src/hooks/` - Custom React hooks

### Key API Routes

#### `/api/map/route.ts`
- Maps website structure using Firecrawl's mapUrl
- Analyzes URLs to categorize posts, categories, tags, pages
- Returns URL list with analysis metadata

#### `/api/crawl/route.ts`
- **GET**: Infers schema from sample page
- **POST**: Batch scrapes selected URLs with schema extraction
- Supports intelligent schema inference based on content patterns
- Handles both structured extraction and markdown fallback

### Frontend Architecture
- Single-page application with multi-step workflow
- Client-side state management for:
  - URL mapping results
  - Selected URLs for scraping
  - Schema configuration
  - Extracted data
- Tree view component for URL selection
- Collapsible JSON viewer for data inspection
- CSV export functionality

### Schema System
The application uses a flexible schema system to extract structured data:
- Automatic inference from content patterns (prices, dates, authors, etc.)
- Support for string, number, boolean, and array field types
- Conversion between internal schema format and Firecrawl's JSON schema

### Important Patterns
- All API routes validate the Firecrawl API key from environment variables
- Batch scraping with fallback to individual requests on failure
- Intelligent content analysis for e-commerce, blog, and business pages
- Markdown and HTML dual-format processing for robust extraction

## Code Style Guidelines
- Use TypeScript strict mode
- Follow Next.js App Router conventions
- Use shadcn/ui components when available
- Apply Tailwind CSS classes directly (avoid custom CSS)
- Use the `cn()` helper from `/src/lib/utils.ts` for conditional classes
- Maintain existing import patterns using `@/` alias for src directory

## Testing Approach
No test framework is currently configured. When implementing tests, check package.json and project structure first to determine the appropriate testing approach.