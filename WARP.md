# WARP.md

This file provides guidance to WARP (warp.dev) when working with code in this repository.

## Development Commands

### Laravel Backend Commands
```bash
# Start development server
php artisan serve

# Run database migrations
php artisan migrate

# Seed database with sample data
php artisan db:seed

# Clear application cache
php artisan cache:clear
php artisan config:clear
php artisan view:clear

# Generate application key (needed for new installations)
php artisan key:generate

# Run tests
php artisan test
# Or using PHPUnit directly
./vendor/bin/phpunit

# Code formatting with Laravel Pint
./vendor/bin/pint

# Create new migrations, models, controllers
php artisan make:migration create_example_table
php artisan make:model Example
php artisan make:controller ExampleController --resource
```

### Frontend React/Laravel Mix Commands
```bash
# Install dependencies
npm install

# Development build with file watching
npm run dev
npm run watch

# Production build
npm run production

# Hot module replacement for development
npm run hot

# Build SSR bundle
npm run ssr
```

### Single Test Execution
```bash
# Run specific test file
php artisan test tests/Feature/ExampleTest.php

# Run specific test method
php artisan test --filter test_specific_method

# Run tests with coverage
php artisan test --coverage
```

## High-Level Architecture

This is a **Laravel 11 + React (Inertia.js) medical/healthcare management system** with multi-language support and e-commerce capabilities.

### Key Architectural Components

**Backend Structure (Laravel)**
- **Multi-tenancy**: Designed for medical institutions with department and doctor management
- **Permission System**: Uses Spatie Laravel Permission for role-based access control
- **Payment Integration**: Supports multiple payment gateways (Stripe, PayPal, Razorpay, manual gateways)
- **Content Management**: Multilingual content system with separate content tables for localization
- **API-First Design**: Structured with separate Admin and Frontend controllers

**Frontend Structure (React + Inertia.js)**
- **Dual Interface**: Separate admin dashboard (`resources/js/Admin/`) and frontend (`resources/js/Frontend/`)
- **Component Architecture**: Uses React with Inertia.js for SPA-like experience without API complexity
- **Asset Compilation**: Laravel Mix handles both admin and frontend asset compilation separately

### Core Domain Models

**Medical System Core:**
- `Doctor` + `DoctorContent` (multilingual doctor profiles)
- `Department` + `DepartmentContent` (medical departments)
- `DepartmentCategory` + `DepartmentCategoryContent` (department classifications)

**Content Management:**
- `Post` + `PostContent` (blog/articles)
- `Page` + `PageContent` (static pages)
- `Category` + `CategoryContent` (content categorization)
- All content models have separate `*Content` tables for multilingual support

**E-commerce System:**
- `Product` + `ProductContent` (medical products/services)
- `ProductCategory` + `ProductCategoryContent`
- `Order` + `OrderItem` (order management)
- `PricingPlan` + `PricingPlanContent` (subscription plans)
- `Coupon` (discount system)

**User & Communication:**
- `User` (with Spatie roles/permissions)
- `Ticket` + `TicketReply` (support system)
- `FormResponse` + `FormResponseType` (dynamic form handling)
- `Review` (product/service reviews)

### Key Patterns & Conventions

**Multilingual Content Pattern:**
Every user-facing content model has a corresponding `*Content` model that stores localized versions. For example, `Doctor` model contains core data while `DoctorContent` contains language-specific fields.

**Resource Controllers:**
Controllers are organized into `Admin/` and `Frontend/` namespaces with clear separation of concerns. Admin controllers handle CRUD operations, while Frontend controllers handle public-facing features.

**Route Organization:**
- `routes/web.php` - Frontend routes
- `routes/admin.php` - Admin panel routes (protected by auth middleware)
- `routes/api.php` - API routes
- `routes/auth.php` - Authentication routes

**Permission Structure:**
Uses dot notation for permissions (e.g., `posts.create`, `doctors.edit`) integrated with Laravel's Gate system and middleware.

### Development Context

**Environment Setup:**
The application expects a MySQL database and requires several environment variables for payment gateways, mail services, and file storage. Check `.env.example` for required configurations.

**Asset Compilation:**
The system uses Laravel Mix with separate webpack configurations for admin and frontend. Each has its own entry point and output directory structure.

**File Upload Handling:**
Media files are managed through a `Media` model and there's a dedicated `MediaController` for file operations.

**Custom Helper Functions:**
The application includes custom helpers in `app/Helpers/helpers.php` that are autoloaded via Composer.

### Payment Gateway Integration
The system supports multiple payment methods with a unified interface through `PaymentRepository`. Each gateway has dedicated callback routes for success/cancel scenarios.

### Testing Structure
Tests are organized into Feature and Unit tests following Laravel conventions. The application includes PHPUnit configuration for testing database interactions.
