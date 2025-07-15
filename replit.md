# AriasHealth.ai - Replit Development Guide

## Overview

AriasHealth.ai is a peer-support mental health platform designed specifically for veterans and their families. The application is built as a full-stack TypeScript application with React frontend and Express backend, focusing on creating safe spaces for peer connection and support in substance use recovery.

## System Architecture

### Frontend Architecture
- **Framework**: React 18 with TypeScript
- **Routing**: Wouter for client-side routing
- **Styling**: Tailwind CSS with custom theme integration
- **UI Components**: Radix UI components with shadcn/ui design system
- **State Management**: React Query for server state, React Context for accessibility features
- **Build Tool**: Vite with custom configuration for development and production

### Backend Architecture
- **Runtime**: Node.js with Express.js framework
- **Language**: TypeScript with ES modules
- **Database ORM**: Drizzle ORM for type-safe database operations
- **Security**: Comprehensive middleware stack including helmet, rate limiting, and bot detection
- **Real-time Features**: Socket.IO for video chat functionality
- **Logging**: Custom rotating file logger for security and analytics

### Database Architecture
- **Primary Database**: PostgreSQL (configured for Neon serverless)
- **Connection**: @neondatabase/serverless with connection pooling
- **Schema Management**: Drizzle Kit for migrations and schema management
- **Tables**: Veterans enrollment forms, waitlists, resource usage tracking, security logs, visitor analytics

## Key Components

### Core Pages
- **Home**: Hero section with enrollment form and platform preview
- **Resources**: Comprehensive mental health and veteran resources
- **ResourceLocator**: State-by-state and international resource finder
- **Contact**: Privacy-focused contact form with anonymous submission options
- **VideoRoom**: Peer-to-peer video chat functionality

### Authentication & Security
- **No traditional authentication**: Focus on privacy-first approach
- **Security Middleware**: Bot detection, rate limiting, IP reputation checking
- **Privacy Controls**: Anonymous submissions, minimal PII collection
- **Accessibility**: Full WCAG compliance with screen reader support

### Data Collection & Analytics
- **Form Submissions**: Veteran enrollment and waitlist tracking
- **Resource Usage**: Anonymous tracking of resource clicks and usage patterns
- **Geographic Analytics**: Country/state-level usage without personal identification
- **Security Monitoring**: Comprehensive logging of security events

## Data Flow

### User Enrollment Flow
1. User visits homepage and fills out enrollment form
2. Form validation occurs client-side with Zod schemas
3. Data submitted to `/api/veterans/enroll` endpoint
4. Server validates and stores in veterans table
5. Success confirmation displayed to user

### Resource Tracking Flow
1. User interacts with resources (clicks links, selects states)
2. Anonymous tracking data sent to various `/api/resource/track-*` endpoints
3. Data stored in respective usage tables for analytics
4. No personal information linked to usage patterns

### Security Monitoring Flow
1. All requests pass through security middleware stack
2. Bot detection, rate limiting, and IP reputation checks
3. Suspicious activity logged to security logs
4. Real-time monitoring of traffic patterns

## External Dependencies

### Core Dependencies
- **Database**: Neon PostgreSQL serverless database
- **Security**: MaxMind GeoIP2 for geographic data, IP reputation services
- **UI Framework**: Radix UI primitives, Lucide React icons
- **Development**: Vite, TypeScript, Tailwind CSS
- **Real-time**: Socket.IO for video chat, SimplePeer for WebRTC

### Third-party Integrations
- **Crisis Resources**: Veterans Crisis Line, SAMHSA National Helpline
- **Geographic Services**: State and country resource databases
- **Video Chat**: WebRTC-based peer-to-peer communication

## Deployment Strategy

### Development Environment
- **Hot Reloading**: Vite dev server with Express backend
- **Database**: Local or development Neon database instance
- **Environment Variables**: DATABASE_URL required for database connection

### Production Build
- **Frontend**: Vite builds static assets to `dist/public`
- **Backend**: esbuild bundles server code to `dist/index.js`
- **Deployment**: Single Node.js process serving both frontend and API

### Environment Configuration
- **Required**: `DATABASE_URL` for PostgreSQL connection
- **Optional**: Various API keys for enhanced security features
- **Logging**: Automatic log rotation and retention policies

## User Preferences

Preferred communication style: Simple, everyday language.

## Changelog

Changelog:
- June 28, 2025. Initial setup
- June 28, 2025. Removed all peer-to-peer video chat functionality including Socket.IO server, video chat components, and related routing. Replaced "PairLink" branding with "Willow" throughout the application. Ensured all linked resources are publicly funded or nonprofit services.
- July 15, 2025. Removed Willow preview images from MVPPreview and PlatformPreview components. Replaced with descriptive text content.