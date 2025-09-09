# WARP.md

This file provides guidance to WARP (warp.dev) when working with code in this repository.

## Project Overview

ProHealth Medical is a comprehensive medical platform built with Laravel 11 and React/Inertia.js. It features a dual frontend architecture with separate admin and public interfaces, and includes medical functionalities like departments, doctors, appointments, products, testimonials, and a complete e-commerce system.

## Technology Stack

- **Backend**: Laravel 11.34.2 (PHP ^8.1)
- **Frontend**: React 18.2.0 + Inertia.js 1.3.2
- **Build System**: Laravel Mix 6.0.49
- **State Management**: Redux Toolkit 1.9.5
- **Styling**: SCSS + Bootstrap
- **Database**: MySQL (with migrations and seeders)
- **Payment Processing**: Stripe, PayPal, Razorpay, SSL Commerce
- **Additional Features**: Multi-language support, role-based permissions, SEO tools

## Development Commands

### Core Development
```bash
# Install dependencies
composer install
npm install

# Environment setup
cp .env.example .env
php artisan key:generate

# Database setup
php artisan migrate
php artisan db:seed

# Build assets (development)
npm run dev
npm run watch

# Build assets (production)
npm run prod

# Start development server
php artisan serve
```

### Asset Management
```bash
# Watch files with hot module replacement
npm run hot

# Watch files with polling (useful in Docker/VM)
npm run watch-poll

# Build SSR assets
npm run ssr
```

### Testing
```bash
# Run all tests
php artisan test
# or
./vendor/bin/phpunit

# Run specific test suite
./vendor/bin/phpunit --testsuite=Feature
./vendor/bin/phpunit --testsuite=Unit

# Run single test
./vendor/bin/phpunit tests/Feature/ProfileTest.php
```

### Database Management
```bash
# Run migrations
php artisan migrate

# Rollback migrations
php artisan migrate:rollback

# Refresh database with seeding
php artisan migrate:refresh --seed

# Create new migration
php artisan make:migration create_example_table

# Create new seeder
php artisan make:seeder ExampleSeeder
```

### Cache and Optimization
```bash
# Clear all caches
php artisan cache:clear
php artisan config:clear
php artisan route:clear
php artisan view:clear

# Optimize for production
php artisan config:cache
php artisan route:cache
php artisan view:cache

# Generate sitemap
php artisan admin:generate-sitemap
```

### Code Quality
```bash
# Format code with Pint
./vendor/bin/pint

# Fix specific files
./vendor/bin/pint app/Http/Controllers
```

## Architecture Overview

### Multi-Application Structure
The project uses a sophisticated routing architecture with separate interfaces:
- **Frontend**: Public-facing medical website (`routes/web.php`)
- **Admin Panel**: Administrative interface (`routes/admin.php`) 
- **User Dashboard**: Patient/user dashboard (`routes/user.php`)
- **Authentication**: Separate auth routes (`routes/auth.php`)
- **API**: RESTful API endpoints (`routes/api.php`)

### Route Organization
- **Frontend routes**: Handle public pages, blog, departments, doctors, products
- **Admin routes**: Protected by `auth`, `verified`, `checkRole` middleware with extensive permission-based access control
- **User routes**: Protected user dashboard with `auth`, `verified` middleware
- **Auth routes**: Handle registration, login, password reset, social login

### Frontend Architecture (React/Inertia)
- **Dual App Structure**: Separate React applications for frontend and admin
  - `resources/js/Frontend/app.jsx` - Public website
  - `resources/js/Admin/app.jsx` - Admin panel
- **SSR Support**: Server-side rendering with `resources/js/Frontend/ssr.js`
- **Redux Integration**: Global state management with Redux Toolkit
- **Component Structure**: Page components organized under respective Apps

### Backend Architecture
- **Controllers**: Organized by functionality (Admin, Frontend, Auth namespaces)
- **Models**: Comprehensive medical domain models (Doctor, Department, Patient, Order, etc.)
- **Middleware**: Custom middleware for role checking, language setting, Inertia handling
- **Repositories**: Data access layer for complex business logic
- **Services**: Business logic services (Payment, Purify, Laralink)

### Key Domain Models
- **Medical**: Doctor, Department, DepartmentCategory, Testimonial
- **Content**: Post, Page, Category, Tag, Comment
- **E-commerce**: Product, ProductCategory, Order, OrderItem, Coupon
- **Payment**: PaymentHistory, PricingPlan, ManualPaymentGateway  
- **User Management**: User with role-based permissions
- **Communication**: Contact, FormResponse, Ticket, TicketReply

### Payment Integration
Multi-gateway payment system supporting:
- Stripe (`stripe/stripe-php`)
- PayPal (`omnipay/paypal`)
- Razorpay (`razorpay/razorpay`)
- SSL Commerce (custom integration)
- Manual payment gateways

### Permission System
Robust permission system using Spatie Laravel Permission:
- Role-based access control throughout admin routes
- Granular permissions (e.g., `posts.create`, `doctors.edit`, `users.delete`)
- Middleware protection with `can()` method usage

## Important Configuration

### Multi-language Support
- Language files in `lang/` directory (JSON format)
- `SetLanguage` middleware for automatic language detection
- Translation management through admin panel

### Media Management
- Centralized media library system
- Image upload and management through admin interface
- Editor image upload support for WYSIWYG editors

### SEO and Content
- SEO tools integration (`artesaos/seotools`)
- Automatic sitemap generation
- Slug management for URLs
- Content management with multilingual support

## Development Guidelines

### File Organization
- Controllers organized by context (Admin, Frontend, Auth)
- Models use content tables pattern (e.g., `Doctor` + `DoctorContent`)
- React components follow App/Pages structure
- SCSS files organized by application type

### Database Conventions
- Uses content tables for multilingual support
- Consistent naming conventions for models and migrations
- Proper foreign key relationships and constraints

### Testing Strategy
- Feature tests for key user flows
- Unit tests for business logic
- Test database configuration in `phpunit.xml`

### Asset Building
- Separate webpack configs for frontend and admin
- Laravel Mix handles compilation and optimization
- Static assets copied from `resources/static` to `public/static`

### Authentication Flow
- Standard Laravel authentication with Inertia.js
- Social login support (Facebook, Google)
- Email verification and password reset functionality
- Role-based redirection after login

## Common Issues and Solutions

### Asset Compilation
If assets aren't compiling properly:
```bash
rm -rf node_modules package-lock.json
npm install
npm run dev
```

### Permission Errors
For permission-related issues:
```bash
# Check user roles and permissions
php artisan tinker
>>> User::with('roles', 'permissions')->find(1)
```

### Cache Issues
When experiencing configuration issues:
```bash
php artisan config:clear
php artisan cache:clear
composer dump-autoload
```
