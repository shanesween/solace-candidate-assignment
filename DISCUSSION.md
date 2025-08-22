# DISCUSSION.md

## Project Implementation Overview

This technical assessment involved transforming a basic advocate table application into a production-ready system. The work addressed three core requirements through systematic improvements across the entire application stack.

## Core Requirements Addressed

### 1. Bug Fixes and Anti-Pattern Resolution

#### Database and API Issues

- **Fixed TypeScript compilation errors** throughout the application, particularly with Drizzle ORM type conflicts using proper type assertions
- **Resolved database connection issues** with proper error handling for missing DATABASE_URL

#### Code Quality and Architecture

- **Created reusable generic components** including infinite query hooks and search components
- **Implemented proper data fetching patterns** using custom hooks instead of direct API calls in components
- **Separated search functionality** from table display with dedicated API endpoints
- **Added utility functions** for data formatting (phone numbers, experience display)
- **Established consistent TypeScript interfaces** for API responses and component props

### 2. UI/UX Design Improvements for Patient Experience

#### Professional Design System

- **Implemented Solace brand colors** (#265b4e) throughout the interface for visual consistency
- **Created a reusable Chip component** with multiple variants for displaying specialties and tags
- **Designed clean, professional advocate detail pages** with comprehensive information display
- **Built responsive layouts** that work seamlessly across desktop and mobile devices

#### Patient-Focused User Experience

- **Developed intuitive search functionality** with real-time dropdown results and keyboard navigation
- **Added helpful loading states and error messages** to guide users through interactions
- **Created smooth navigation flows** from search to advocate details with proper breadcrumbs

#### User Experience Enhancements

- **Added hover states and visual feedback** for interactive elements (table rows, buttons)
- **Implemented keyboard navigation** for search dropdown (arrow keys, Enter, Escape)
- **Created intuitive click-to-navigate** functionality from table rows to advocate details
- **Formatted phone numbers and data** for better readability (e.g., "(555) 123-4567" instead of raw numbers)

### 3. Performance Optimization for Scale

#### Backend Performance

- **Implemented cursor-based pagination** to handle hundreds of thousands of records efficiently
- **Created optimized search API** with selective field projection to reduce data transfer
- **Added proper database query optimization** with ILIKE queries for fuzzy search
- **Designed API endpoints** that scale linearly regardless of database size

#### Frontend Performance

- **Implemented infinite scroll** with intersection observer for efficient data loading
- **Used TanStack Query** for intelligent caching and background data synchronization
- **Created viewport-constrained tables** that scroll within fixed containers rather than causing page-level scrolling

#### Scalability Architecture

- **Built generic reusable hooks** (useInfiniteApiQuery) for consistent data fetching patterns
- **Created efficient table rendering** with proper data flattening and minimal re-renders
- **Designed API responses** with pagination metadata (hasNextPage, nextCursor) for client-side handling
- **Implemented modular component structure** for easy maintenance and testing

## What I Would Do With More Time

#### Component Development & UI

- **Utilize a component library and design system** for faster shared component development and proper theming. I decided against integrating a component and styling library in order to focus on the development of API, hooks, table and profile pages, but this would have accelerated my UI development
- **Root header and navigation layout and styling** - Create a proper application shell with consistent navigation and branding
- **Comprehensive accessibility audit** - Screen reader testing, keyboard navigation validation, ARIA labels, and WCAG compliance

#### Performance & Infrastructure

- **Caching layer for frequently accessed data** - Redis implementation for search results and advocate profiles to reduce database load
- **Add debounced search queries** - Deduce API call frequency
- **Proper indexing on searchable fields** - Database indexes on firstName, lastName, city, and degree fields for faster query performance
- **Column-level sorting and filtering** - Advanced table functionality allowing users to sort and filter by multiple criteria

#### Testing & Quality

- **Unit testing on API routes** - Comprehensive test coverage for all endpoint logic, error handling, and edge cases
- **Integration testing** - Test the full data flow from API to UI components
- **Performance testing** - Load testing for search API and infinite scroll under heavy usage
