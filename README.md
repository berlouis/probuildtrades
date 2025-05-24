# Reno Solutions Builder Verification System

A comprehensive platform for managing builder registrations, verifications, and compliance monitoring with advanced Redis caching.

## Overview

The Builder Verification System is a web-based application that allows administrators to:

- Verify builder licenses and credentials against government databases
- Track builder compliance status and history
- Manage builder profiles and documentation
- Generate detailed reports on verification activities
- Set up automatic verification schedules
- Monitor high-risk builders with an intelligent risk scoring system
- Optimize performance with intelligent Redis caching

## Features

### Authentication System
- Secure login for different user roles (admin, verifier, field inspector)
- Role-based permissions and access control
- Password reset functionality
- Multi-factor authentication for secure access

### Builder Management
- Comprehensive builder profiles with contact and business information
- License and credential tracking
- Document management for licenses, insurance, and certifications
- Social media integration

### Verification System
- Individual builder verification
- Batch verification for multiple builders
- Scheduled automatic verifications
- Integration with government license databases
- Document verification with OCR capabilities

### Subscription System
- Tiered subscription plans for Builders, Trades, and Organizations
- Monthly and annual payment options with discounts
- Automated billing and invoice generation
- Subscription management portal
- Usage monitoring and analytics
- Enterprise-level customization for large organizations
- Automatic renewal notifications and grace periods
- Promotional code and discount management

### Payment Processing
- Secure payment gateway integration (Stripe, PayPal)
- Automated receipting system
- Subscription lifecycle management
- Payment method management
- Tax calculation based on jurisdiction
- Refund and credit processing
- Financial reporting and reconciliation

### Reporting
- Customizable report generation
- Multiple export formats (PDF, Excel, CSV, JSON)
- Verification history reports
- Compliance summary reports
- Incident reports
- Subscription and revenue reports

### Monitoring
- Risk scoring system to identify high-risk builders
- Incident tracking and management
- Automated flagging for expired credentials
- Compliance rate monitoring
- Subscription analytics and churn prediction

### Mobile Support
- Field verification capabilities
- Responsive design for on-site inspections
- Offline data collection with synchronization
- Mobile subscription management

### AI Chatbot Assistant
- Multilingual support for over 40 languages
- Text-to-speech and speech-to-text capabilities
- Context-aware responses for builder-specific questions
- Automated appointment scheduling
- Document requirement explanations
- 24/7 availability for urgent inquiries
- Seamless handoff to human agents when needed
- Subscription plan recommendations and assistance

### Website Localization
- Comprehensive language translation system
- Support for 15+ languages commonly used in the construction industry
- Automatic content translation based on user preferences
- Regional compliance adaptation
- Location-specific builder requirements
- Localized pricing and subscription information

### Redis Cache System
- High-performance caching for frequently accessed data
- Intelligent cache warming strategies
- Geographic cache distribution
- Cache analytics and monitoring
- Dynamic TTL (Time To Live) optimization
- Predictive caching using ML algorithms
- Automated cache eviction policies

## Technology Stack

- **Frontend**: Next.js, React, TypeScript, Tailwind CSS
- **UI Components**: Shadcn UI
- **Form Handling**: React Hook Form, Zod validation
- **Authentication**: NextAuth with JWT
- **State Management**: React Context API
- **Caching**: Redis with advanced optimization strategies
- **Database**: Prisma ORM with PostgreSQL
- **Payment Processing**: Stripe API, PayPal API
- **Subscription Management**: Custom subscription engine with Stripe Billing
- **AI Services**: OpenAI GPT-4 integration, Azure Cognitive Services
- **Translation**: i18next, Google Cloud Translation API
- **Voice Processing**: Web Speech API, Amazon Polly
- **Monitoring**: Grafana dashboards for Redis performance

## Project Components

This repository includes two main components that work together:

1. **Builder Verification System** - The main Next.js application that provides the user interface and core verification functionality
2. **Redis Cache System** - A dedicated caching module that optimizes performance for the verification system

## Getting Started

### Prerequisites

- Node.js 18 or higher
- Bun (preferred) or npm/yarn
- Docker and Docker Compose (for Redis)

### Installation

1. Clone the repository:
   git clone https://github.com/your-username/renosolutions.git
   cd renosolutions

2. Install dependencies:
   bun install
   # or
   npm install

3. Set up Redis:
   # Start Redis server
   bash scripts/start-redis.sh
   # or for production environment
   bash setup-redis-config.sh

4. Set up environment variables:
   cp .env.example .env
   # Then edit .env with your configuration

5. Run the development server:
   bun dev
   # or
   npm run dev

6. Open http://localhost:3000 in your browser to see the application.

### Demo Accounts

The system comes with several pre-configured demo accounts:

- **Admin**: admin@example.com / password123
- **Verification Agent**: verifier@example.com / password123
- **Field Inspector**: inspector@example.com / password123

## Project Structure

### Main Application Structure

- src/ - Main Next.js application
  - app/ - Next.js app directory (App Router)
    - admin/ - Admin dashboard routes
      - dashboard/ - Main dashboard
      - reports/ - Reports generation
      - cache/ - Cache management UI
      - login/ - Admin login
      - subscriptions/ - Subscription management
      - payments/ - Payment processing and reporting
    - api/ - API routes
      - auth/ - Authentication endpoints
      - builders/ - Builder data endpoints
      - cache/ - Cache management API
      - reports/ - Report generation endpoints
      - chat/ - AI chatbot API endpoints
      - translate/ - Translation service endpoints
      - subscriptions/ - Subscription management API
      - payments/ - Payment processing API
      - webhooks/ - External service webhooks (Stripe, etc.)
    - builders/ - Builder-facing pages
      - profile/ - Builder profile management
      - verification/ - Verification status pages
      - documents/ - Document upload and management
      - subscription/ - Subscription management pages
      - billing/ - Billing history and payment methods
    - trades/ - Trade-specific pages
      - dashboard/ - Trade dashboard
      - verification/ - Trade verification pages
      - subscription/ - Trade subscription management
    - organizations/ - Organization-level pages
      - dashboard/ - Organization dashboard
      - members/ - Member management
      - billing/ - Organization billing
      - subscription/ - Enterprise subscription management
    - inspectors/ - Field inspector pages
      - dashboard/ - Mobile-optimized dashboards
      - verification/ - On-site verification tools
    - public/ - Public-facing website pages
      - about/ - About us page
      - services/ - Services information
      - contact/ - Contact forms
      - register/ - Builder registration
      - resources/ - Educational resources
      - pricing/ - Subscription plans and pricing
      - features/ - Feature comparison by subscription tier

### Website Components

- src/components/ - React components
  - ui/ - UI components (shadcn)
  - builder/ - Builder-specific components
  - admin/ - Admin components including cache dashboards
  - marketing/ - Components for public website
    - hero/ - Hero sections
    - features/ - Feature highlights
    - pricing/ - Pricing tables
    - testimonials/ - Builder testimonials
  - layout/ - Layout components
    - headers/ - Site headers by section
    - footers/ - Site footers
    - navigation/ - Navigation menus
  - chatbot/ - AI assistant components
    - chat-interface.tsx - Main chatbot interface
    - voice-controls.tsx - Voice input/output controls
    - message-history.tsx - Chat history display
    - language-selector.tsx - Language selection for chatbot
  - localization/ - Translation components
    - language-switcher.tsx - User language preference control
    - translated-content.tsx - Content with translation support
    - region-selector.tsx - Regional settings selector
  - subscription/ - Subscription components
    - plan-selector.tsx - Subscription plan selection
    - payment-form.tsx - Payment information form
    - billing-history.tsx - Billing history display
    - usage-metrics.tsx - Subscription usage metrics
    - upgrade-prompt.tsx - Plan upgrade suggestions

### Payment and Subscription Services

- src/services/ - Backend services
  - subscription/ - Subscription management
    - subscription-manager.ts - Core subscription logic
    - plan-calculator.ts - Plan pricing and feature calculator
    - usage-tracker.ts - Subscription usage monitoring
    - renewal-service.ts - Subscription renewal processing
  - payment/ - Payment processing
    - stripe-service.ts - Stripe payment integration
    - paypal-service.ts - PayPal integration
    - invoice-generator.ts - Invoice creation service
    - receipt-service.ts - Receipt generation
  - ai/ - AI service integrations
    - openai-service.ts - OpenAI integration
    - azure-voice.ts - Azure voice services
    - context-manager.ts - Conversation context handling
  - translation/ - Translation services
    - i18n-config.ts - i18next configuration
    - google-translate.ts - Google Translation API integration
    - language-detector.ts - Automatic language detection

### Website Assets

- public/ - Static assets
  - images/ - Site images and logos
  - videos/ - Promotional videos
  - documents/ - PDF templates and guides
  - fonts/ - Custom web fonts
  - locales/ - Translation files
    - en/ - English translations
    - es/ - Spanish translations
    - fr/ - French translations
    - zh/ - Chinese translations
    - (and other supported languages)
  - audio/ - Voice prompts and notifications
  - templates/ - Email and PDF templates
    - invoices/ - Invoice templates
    - receipts/ - Receipt templates
    - subscription/ - Subscription notification templates
- styles/ - Global styles and theme

### Backend Systems

- reno-cache-system/ - Dedicated caching system
  - src/ - Source code for cache system
    - lib/ - Core libraries
    - scripts/ - Operational scripts
    - app/ - Next.js app components
    - data/ - Data loaders
    - tests/ - Test suite for cache system
- redis/ - Redis configuration files
- monitoring/ - Monitoring setup
- scripts/ - Operational scripts

## Deploying to Production

Detailed instructions for deploying to production environments can be found in:
- [DEPLOYMENT_GUIDE.md](DEPLOYMENT_GUIDE.md) - General deployment information
- [REDIS_PRODUCTION_SETUP.md](REDIS_PRODUCTION_SETUP.md) - Redis production configuration
- [REDIS_SENTINEL_GUIDE.md](REDIS_SENTINEL_GUIDE.md) - Setting up Redis Sentinel for high availability
- [PAYMENT_GATEWAY_SETUP.md](PAYMENT_GATEWAY_SETUP.md) - Setting up payment gateways

## Documentation

Additional documentation files:
- [CACHE_ARCHITECTURE.md](CACHE_ARCHITECTURE.md) - Details of the caching architecture
- [DATABASE_INTEGRATION.md](DATABASE_INTEGRATION.md) - Database setup and integration
- [QUERY_CACHING.md](QUERY_CACHING.md) - Details on query caching strategies
- [CHATBOT_CONFIGURATION.md](CHATBOT_CONFIGURATION.md) - AI chatbot setup and customization
- [TRANSLATION_GUIDE.md](TRANSLATION_GUIDE.md) - Adding and managing translations
- [SUBSCRIPTION_MANAGEMENT.md](SUBSCRIPTION_MANAGEMENT.md) - Subscription system overview
- [PAYMENT_PROCESSING.md](PAYMENT_PROCESSING.md) - Payment processing integration

## Contributing

We welcome contributions to the Renosolutions Builder Verification System! Please read [CONTRIBUTING.md](CONTRIBUTING.md) for details on our code of conduct and the process for submitting pull requests.

Key contribution areas:
- Frontend UI enhancements
- Cache optimization strategies
- Performance improvements
- Documentation and examples
- Testing and bug fixes
- AI capabilities expansion
- New language support
- Subscription and payment features

## License

[Apache License 2.0](LICENSE)

Copyright © 2025 Reno Solutions, Inc. All rights reserved.

This software is licensed under the Apache License, Version 2.0. You may obtain a copy of the License at:
http://www.apache.org/licenses/LICENSE-2.0

## Acknowledgements

- [Shadcn UI](https://ui.shadcn.com) - UI components
- [Next.js](https://nextjs.org/) - React framework
- [Tailwind CSS](https://tailwindcss.com/) - CSS framework
- [Redis](https://redis.io/) - In-memory data store
- [OpenAI](https://openai.com/) - AI services
- [i18next](https://www.i18next.com/) - Internationalization framework
- [Stripe](https://stripe.com/) - Payment processing
- [PayPal](https://www.paypal.com/) - Payment processing
