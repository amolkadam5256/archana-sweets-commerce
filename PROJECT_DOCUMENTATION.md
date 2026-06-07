# Archana Sweets Project Documentation

This document describes the current Archana Sweets codebase: implemented pages, planned/linked pages, frontend components, state management, API services, backend scaffold, libraries, utilities, and remaining implementation work.

## Project Overview

Archana Sweets is an ecommerce application for premium homemade Indian sweets, gift boxes, festival collections, corporate orders, and Pune delivery. The repository currently contains:

- A Next.js 16 App Router frontend using React 19 and TypeScript.
- A Tailwind CSS 4 design system with maroon, gold, cream, light mode, and dark mode tokens.
- Redux Toolkit slices for auth, cart, wishlist, UI overlays, and theme.
- TanStack Query provider configuration for future server-state fetching.
- Axios service modules for auth, products, orders, reviews, and payments.
- A FastAPI backend scaffold with route aggregation, auth/product routes, settings, middleware, and placeholder endpoints.

## Technology Stack

### Frontend

- `next`: App Router framework.
- `react`, `react-dom`: UI runtime.
- `typescript`: Static typing.
- `tailwindcss`: Utility-first styling and custom design tokens.
- `@reduxjs/toolkit`, `react-redux`: Client state management.
- `@tanstack/react-query`: Server state caching and request coordination.
- `axios`: HTTP client.
- `framer-motion`: Animations, page section reveals, drawer/overlay transitions.
- `lucide-react`: Icon system.
- `react-hook-form`, `@hookform/resolvers`, `zod`: Login form validation.
- `react-hot-toast`: Toast notifications.
- `react-loading-skeleton`: Loading placeholders for product cards.
- `clsx`, `tailwind-merge`: Safe class name composition through the `cn` utility.
- `date-fns`, `zustand`, `class-variance-authority`, `react-icons`: Installed and available, but not central in the current visible implementation.

### Backend

- `fastapi`: API framework.
- `uvicorn`: ASGI server.
- `sqlalchemy`, `asyncpg`, `psycopg2-binary`: Database access.
- `pydantic`, `pydantic-settings`: Schemas and settings.
- `python-jose`, `passlib`: JWT/password security tooling.
- `redis`, `slowapi`: Cache/rate limiting.
- `razorpay`: Payment integration target.
- `boto3`, `Pillow`, `aiofiles`: Media/upload support target.
- `structlog`: Structured logging target.
- `pytest`, `pytest-asyncio`, `faker`: Testing tools.

## Folder Structure

```text
archana-sweets/
  app/                         Next.js App Router routes and global CSS
  app/(public)/                Public route group: homepage and public layout
  app/(auth)/                  Auth route group: login and auth layout
  components/
    layout/                    Header, footer, search overlay, cart drawer
    shared/                    Homepage reusable marketing sections
    ui/                        Theme provider and theme toggle
  config/                      App config and API endpoint constants
  constants/                   Brand, navigation, categories, order/payment constants
  features/
    auth/                      Auth Redux slice
    cart/                      Cart Redux slice
    categories/components/     Category UI sections
    products/components/       Product/homepage UI sections
    wishlist/                  Wishlist Redux slice
  lib/                         Axios API client
  providers/                   Redux, React Query, theme, toast providers
  services/                    Frontend API service modules
  store/                       Redux store and shared slices
  types/                       TypeScript app/domain types
  utils/                       Shared helper functions
  backend/                     FastAPI backend scaffold
    app/api/v1/endpoints/      Backend route handlers
    app/core/                  Backend settings, security, logging
    app/database/              SQLAlchemy database session
    app/middleware/            Rate limiting middleware
    app/models/                SQLAlchemy models
    app/schemas/               Pydantic request/response schemas
    app/services/              Backend business logic
```

## Implemented Frontend Pages

### `/`

File: `app/(public)/page.tsx`

The homepage is implemented and composed from these sections:

- `HeroSection`: Brand hero with trust signals, shop CTA, WhatsApp ordering CTA, and animated desktop orbit graphic.
- `FeaturedCategories`: Category grid based on `PRODUCT_CATEGORIES`.
- `FeaturedProducts`: Mock best-seller product grid with skeleton loading, pricing, rating, badges, wishlist icon, and add-to-cart button UI.
- `WhyChooseUs`: Brand promise cards and stats.
- `FestivalSection`: Festival collection cards linking to planned festival routes.
- `CorporateSection`: Corporate gifting benefits, stats, and WhatsApp quote CTA.
- `TestimonialsSection`: Static customer review cards.
- `NewsletterSection`: Local-only subscription form with fake delay and success state.

Homepage metadata is configured with SEO title and description.

### `/login`

File: `app/(auth)/login/page.tsx`

Login page features:

- Email/password login.
- Mobile OTP login.
- React Hook Form validation.
- Zod schemas for email/password and Indian mobile number.
- Password visibility toggle.
- OTP send and verify flows.
- Redux auth state update through `setCredentials`.
- Toast notifications.
- Placeholder Google sign-in button.
- Links to planned `/forgot-password` and `/register` pages.

Important current behavior:

- On successful login, the page uses `window.location.href = "/"`.
- `authService.login`, `authService.sendOtp`, and `authService.verifyOtp` expect backend responses with `{ data: { user, tokens } }`.
- Some toast strings and special characters show encoding artifacts in the current source and should be cleaned.

## Layouts

### Root Layout

File: `app/layout.tsx`

Responsibilities:

- Imports global styles.
- Defines global metadata, Open Graph, Twitter, robots, Google verification placeholder, and viewport.
- Sets `html lang="en"`.
- Runs an inline anti-FOUC script before paint to apply `archana-theme` from local storage.
- Wraps all routes in `Providers`.

### Public Layout

File: `app/(public)/layout.tsx`

Responsibilities:

- Renders `Header`, page content, and `Footer`.
- Mounts `SearchOverlay` and `CartDrawer`.
- Adds a floating WhatsApp order button using `getWhatsAppLink`.

### Auth Layout

File: `app/(auth)/layout.tsx`

Responsibilities:

- Renders `Header`.
- Centers auth pages vertically.
- Mounts `SearchOverlay` and `CartDrawer`.

## Linked or Planned Frontend Pages

The navigation, sitemap, footer, header, and CTAs link to many routes that do not currently have page files. These need implementation before production.

Public shopping pages:

- `/shop`
- `/shop/new-arrivals`
- `/shop/best-sellers`
- `/shop/sugar-free`
- `/shop/premium`
- `/products/[slug]`
- `/categories`
- `/categories/[slug]`

Gift/festival pages:

- `/gift-boxes`
- `/gift-boxes/premium`
- `/gift-boxes/corporate`
- `/gift-boxes/wedding`
- `/gift-boxes/family`
- `/gift-boxes/custom`
- `/festival-specials`
- `/festival-specials/diwali`
- `/festival-specials/raksha-bandhan`
- `/festival-specials/ganesh-chaturthi`
- `/festival-specials/holi`
- `/festival-specials/seasonal`

Business/info pages:

- `/about`
- `/contact`
- `/bulk-orders`
- `/bulk-orders/corporate`
- `/bulk-orders/events`
- `/bulk-orders/weddings`
- `/bulk-orders/catering`
- `/corporate-gifts`
- `/track-order`

Account and checkout pages:

- `/register`
- `/forgot-password`
- `/dashboard`
- `/dashboard/profile`
- `/dashboard/orders`
- `/dashboard/wishlist`
- `/dashboard/addresses`
- `/dashboard/rewards`
- `/cart`
- `/checkout`

Policy pages:

- `/privacy-policy`
- `/terms`
- `/refund-policy`
- `/shipping-policy`

Admin pages:

- `/admin`
- `/admin/dashboard`
- `/admin/products`
- `/admin/categories`
- `/admin/orders`
- `/admin/customers`
- `/admin/coupons`
- `/admin/inventory`
- `/admin/analytics`
- `/admin/banners`

## Layout Components

### `Header`

File: `components/layout/Header.tsx`

Main responsibilities:

- Sticky top offer bar with animated rotating offers.
- Brand logo link.
- Desktop navigation using `NAV_STRUCTURE`.
- Mega-menu dropdowns for nav items with children.
- Search button that dispatches `openSearch`.
- Theme toggle.
- Wishlist link and count from Redux.
- Cart button and count from Redux.
- Account dropdown for guest/authenticated users.
- Mobile bottom navigation.
- Mobile slide-out menu.
- WhatsApp order CTA in mobile menu.

State and hooks:

- Reads pathname through `usePathname`.
- Reads cart count, wishlist count, mobile menu state, auth state, and user from Redux.
- Uses local `isScrolled` state for compact sticky header.
- Uses local `hoveredMenu` state for desktop dropdowns and account menu.
- Uses an imperative `slideRef` animation for the offer ticker.

Current implementation notes:

- `ACCOUNT_LINKS` is imported but not used.
- Several linked routes are planned but not implemented.
- The sign-out button is visible when authenticated but does not dispatch `logout`.
- Some special characters in offer text are corrupted and should be normalized.

### `Footer`

File: `components/layout/Footer.tsx`

Main responsibilities:

- Trust indicator row.
- Footer newsletter panel.
- Brand summary and social links.
- Navigation links from `NAV_LINKS`.
- Best seller category links from `PRODUCT_CATEGORIES`.
- Contact details from `BRAND`.
- WhatsApp CTA.
- Policy links and copyright.

Current implementation notes:

- Footer newsletter form prevents default but does not send data.
- Some linked routes are planned.
- Some text has encoding artifacts.

### `SearchOverlay`

File: `components/layout/SearchOverlay.tsx`

Main responsibilities:

- Full-screen search modal controlled by Redux `ui.isSearchOpen`.
- Focuses input when opened.
- Locks body scroll while open.
- Shows popular searches when query is empty.
- Shows category quick links.
- Shows placeholder search cards when query is present.
- Links to `/shop?q=...` for actual search result page.

Current implementation notes:

- ESC hint is displayed but there is no keyboard listener to close on Escape.
- Search results are placeholders; connect to `productService.searchProducts` or a `/shop` search page.

### `CartDrawer`

File: `components/layout/CartDrawer.tsx`

Main responsibilities:

- Slide-in cart drawer controlled by Redux `ui.isCartOpen`.
- Locks body scroll while open.
- Shows free delivery progress using `FREE_DELIVERY_THRESHOLD`.
- Renders empty state with `/shop` CTA.
- Renders cart items with product image/placeholder, quantity controls, remove action, subtotal, delivery fee, and total.
- Links to `/checkout` and `/cart`.

State and actions:

- Reads cart items through `selectCartItems`.
- Reads totals through `selectCartTotals`.
- Dispatches `updateQuantity`, `removeItem`, and `closeCart`.

Current implementation notes:

- Cart is client state only. It is not persisted or synced to backend yet.
- Product images use plain `<img>` rather than `next/image`.
- Checkout and cart pages are planned.

## Homepage Section Components

### `HeroSection`

File: `features/products/components/HeroSection.tsx`

Provides the first homepage viewport with brand messaging, trust signals, `/shop` CTA, WhatsApp CTA, and animated desktop brand orbit.

### `FeaturedCategories`

File: `features/categories/components/FeaturedCategories.tsx`

Renders category cards from `PRODUCT_CATEGORIES` and links each card to `/categories/[slug]`.

### `FeaturedProducts`

File: `features/products/components/FeaturedProducts.tsx`

Renders mock product data and simulated loading skeletons.

Internal functions:

- `ProductSkeleton`: Loading card UI.
- `ProductCard`: Product card UI with discount, rating, badges, and add-to-cart button.
- `FeaturedProducts`: Manages fake loading timer and grid rendering.

Current implementation notes:

- Data is hard-coded in `MOCK_PRODUCTS`.
- Add-to-cart button does not dispatch `addItem`.
- Wishlist button does not dispatch `toggleWishlist`.
- Product detail links point to planned `/products/[slug]`.

### `WhyChooseUs`

File: `components/shared/WhyChooseUs.tsx`

Renders static reason cards and business stats.

### `FestivalSection`

File: `features/products/components/FestivalSection.tsx`

Renders festival-specific cards linking to planned festival category pages.

### `CorporateSection`

File: `features/products/components/CorporateSection.tsx`

Renders corporate gifting benefits, statistics, CTA to `/corporate-gifts`, and WhatsApp quote link.

### `TestimonialsSection`

File: `components/shared/TestimonialsSection.tsx`

Renders static testimonials and a Google rating banner.

### `NewsletterSection`

File: `components/shared/NewsletterSection.tsx`

Renders newsletter signup UI with local state, fake loading, and success message. It still needs API integration.

## UI Components

### `ThemeProvider`

File: `components/ui/ThemeProvider.tsx`

Responsibilities:

- Initializes theme from local storage through `initTheme`.
- Applies `data-theme` and `dark` class to the root element.
- Persists selected mode under `archana-theme`.
- Watches system color-scheme changes when mode is `system`.

### `ThemeToggle`

File: `components/ui/ThemeToggle.tsx`

Responsibilities:

- Toggles light/dark mode through Redux `toggleTheme`.
- Animates icon changes with Framer Motion.
- Supports compact icon sizing for mobile bottom navigation.

## Providers

File: `providers/index.tsx`

The `Providers` component wraps the app with:

- Redux `Provider`.
- TanStack `QueryClientProvider`.
- `ThemeProvider`.
- `react-hot-toast` `Toaster`.
- React Query Devtools in development.

React Query defaults:

- `staleTime`: 1 minute.
- `gcTime`: 5 minutes.
- `retry`: 1.
- `refetchOnWindowFocus`: false.

## State Management

### Store

File: `store/index.ts`

Registered slices:

- `auth`
- `cart`
- `wishlist`
- `ui`
- `theme`

Exports:

- `store`
- `RootState`
- `AppDispatch`
- `useAppDispatch`
- `useAppSelector`

### Auth Slice

File: `features/auth/auth.slice.ts`

State:

- `user`
- `tokens`
- `isAuthenticated`
- `isLoading`

Reducers:

- `setCredentials`: Stores user/tokens in Redux and writes access/refresh tokens to local storage.
- `updateUser`: Merges partial user fields.
- `logout`: Clears Redux auth state and local storage tokens.
- `setLoading`: Updates loading state.

Implementation needs:

- Hydrate auth state from local storage on page load.
- Attach logout action to header sign-out button.
- Add route protection for dashboard/admin/checkout pages.

### Cart Slice

File: `features/cart/cart.slice.ts`

State:

- `items`
- `couponCode`
- `couponDiscount`

Reducers:

- `addItem`
- `updateQuantity`
- `removeItem`
- `clearCart`
- `applyCoupon`
- `removeCoupon`
- `setCart`

Selectors:

- `selectCartItems`
- `selectCartCount`
- `selectCartTotals`

Totals logic:

- `subtotal`: Sum of item `totalPrice`.
- `deliveryFee`: Free when subtotal is greater than or equal to `FREE_DELIVERY_THRESHOLD`, otherwise `DELIVERY_FEE`.
- `total`: `subtotal - discount + deliveryFee`.

Implementation needs:

- Persist cart to local storage or backend.
- Recalculate totals server-side at checkout.
- Validate inventory and pricing before order creation.

### Wishlist Slice

File: `features/wishlist/wishlist.slice.ts`

State:

- `items`

Reducers:

- `addToWishlist`
- `removeFromWishlist`
- `toggleWishlist`
- `setWishlist`
- `clearWishlist`

Selectors:

- `selectWishlistItems`
- `selectWishlistCount`
- `selectIsInWishlist`

Implementation needs:

- Connect product cards to wishlist actions.
- Persist locally for guests and sync with backend for logged-in users.

### UI Slice

File: `store/slices/ui.slice.ts`

State:

- `isMobileMenuOpen`
- `isCartOpen`
- `isSearchOpen`
- `isAuthModalOpen`
- `authModalMode`
- `globalLoading`

Reducers:

- `toggleMobileMenu`
- `closeMobileMenu`
- `openCart`
- `closeCart`
- `toggleCart`
- `openSearch`
- `closeSearch`
- `openAuthModal`
- `closeAuthModal`
- `setGlobalLoading`

### Theme Slice

File: `store/slices/theme.slice.ts`

State:

- `mode`: `light`, `dark`, or `system`.
- `resolved`: Actual applied mode, `light` or `dark`.

Reducers:

- `setTheme`
- `initTheme`
- `toggleTheme`

Implementation note:

- Root anti-FOUC script and `ThemeProvider` both use `archana-theme`; constants also define `STORAGE_KEYS.THEME` as `as_theme`, so this should be standardized.

## TypeScript Domain Types

All frontend domain types are re-exported through `types/index.ts`, so feature code can import from `@/types`.

### API Types

File: `types/api.types.ts`

- `ApiResponse<T>`: Generic response wrapper with `success`, `data`, `message`, and optional `errors`.
- `PaginatedResponse<T>`: Paginated response with `success`, `data`, and `meta`.
- `PaginationMeta`: Includes `total`, `page`, `limit`, `totalPages`, `hasNextPage`, and `hasPrevPage`.
- `PaginationParams`: Common query params: `page`, `limit`, `search`, `sortBy`, `sortOrder`.
- `ApiError`: Standard frontend error shape with `status`, `message`, and optional field errors.

### Auth Types

File: `types/auth.types.ts`

- `AuthTokens`: `accessToken`, `refreshToken`, `expiresIn`.
- `AuthState`: Redux auth state.
- `LoginRequest`: Email/password login payload.
- `RegisterRequest`: First name, last name, email, phone, password, confirm password.
- `OtpRequest`: Phone number OTP request payload.
- `OtpVerifyRequest`: Phone and OTP verification payload.
- `GoogleAuthRequest`: Google ID token payload.
- `ForgotPasswordRequest`: Email payload.
- `ResetPasswordRequest`: Reset token and new password payload.

Important contract mismatch:

- Frontend uses camelCase fields like `firstName`, `confirmPassword`, `idToken`, `accessToken`.
- Backend Pydantic schemas currently use snake_case fields like `first_name`, `confirm_password`, `id_token`, `access_token`.
- Either add backend aliases/population by name or transform request/response payloads in frontend services.

### User Types

File: `types/user.types.ts`

- `UserRole`: `customer`, `admin`, `super_admin`.
- `User`: Email, phone, first/last name, avatar, role, email/phone verification, timestamps.
- `Address`: Address type, name, phone, address lines, city, state, pincode, default flag.
- `UserProfile`: Extends `User` with `addresses`.

### Product Types

File: `types/product.types.ts`

- `Category`: Category metadata, hierarchy, active state, sort order, and children.
- `ProductImage`: Image URL, alt text, primary flag, sort order.
- `WeightUnit`: `g`, `kg`, `piece`, `box`, `pack`.
- `ProductVariant`: Weight/unit, price, original price, stock, SKU.
- `Product`: Product description, category, images, variants, tags, flags, rating, price range, shelf life, ingredients, allergens, timestamps.
- `ProductFilters`: Category, price range, feature/best-seller flags, tags, search, and sort mode.
- `Review`: Product review with user summary, rating, title, comment, images, verification flag, helpful count, timestamp.

### Cart and Wishlist Types

File: `types/cart.types.ts`

- `CartItem`: Product, variant, quantity, unit price, total price.
- `Cart`: Optional user cart with totals, coupon, and item list.
- `WishlistItem`: Product saved by user with added timestamp.

### Order Types

File: `types/order.types.ts`

- `OrderStatus`: `pending`, `confirmed`, `processing`, `shipped`, `out_for_delivery`, `delivered`, `cancelled`, `refunded`.
- `PaymentStatus`: `pending`, `paid`, `failed`, `refunded`.
- `PaymentMethod`: Razorpay, UPI, cards, net banking, COD.
- `OrderItem`: Product snapshot, variant label, quantity, price, total.
- `Order`: Full order with items, address, status, payment details, totals, coupon, Razorpay IDs, notes, delivery dates, timestamps.
- `OrderTracking`: Order status and timeline.
- `OrderTrackingEvent`: Timeline event with status, description, timestamp, completion flag.

### UI Types

File: `types/ui.types.ts`

- `NavItem`: Navigation item with optional icon, badge, and children.
- `BreadcrumbItem`: Breadcrumb label and optional href.
- `ToastOptions`: Toast type, title, description, duration.
- `ModalProps`: Common modal props.
- `SelectOption`: Generic label/value option.
- `FilterOption`: Filter label and optional count.

## Config and Constants

### `config/index.ts`

Provides:

- `appConfig`: App name, URL, tagline, API URL, Google client ID, Razorpay key, GA ID, WhatsApp number.
- `API_ENDPOINTS`: Frontend endpoint map for auth, users, products, categories, cart, wishlist, orders, payments, reviews, and admin.

Default API base URL:

```text
http://localhost:8000/api/v1
```

### `constants/index.ts`

Provides:

- `BRAND`: Name, tagline, domain, contact, GST placeholder, social links.
- `NAV_STRUCTURE`: Header navigation and dropdown children.
- `NAV_LINKS`: Alias of `NAV_STRUCTURE` for footer usage.
- `ACCOUNT_LINKS`: Account nav list.
- `PRODUCT_CATEGORIES`: Category IDs, names, and slugs.
- `ORDER_STATUS_LABELS`: Display labels for order lifecycle.
- `PAYMENT_METHODS`: Razorpay and COD labels.
- `DEFAULT_PAGE_SIZE`, `PAGE_SIZE_OPTIONS`.
- `FREE_DELIVERY_THRESHOLD`, `DELIVERY_FEE`.
- OTP constants.
- Local storage keys.
- React Query keys.

Important mismatch:

- `HeroSection` says free delivery above INR 499, but `FREE_DELIVERY_THRESHOLD` is `999`. Update copy or constant.

## Utilities

File: `utils/index.ts`

Functions:

- `cn(...inputs)`: Combines `clsx` and `tailwind-merge`.
- `formatPrice(amount)`: Formats INR without decimal places.
- `calculateDiscount(original, sale)`: Returns rounded discount percentage.
- `truncate(text, maxLength)`: Shortens text and appends ellipsis.
- `slugify(text)`: Converts text to URL-safe slug.
- `formatDate(dateStr, options)`: Formats date for `en-IN`.
- `formatRelativeTime(dateStr)`: Returns recent relative time or formatted date.
- `getStarRating(rating)`: Returns 5 entries as `full`, `half`, or `empty`.
- `getWhatsAppLink(phone, message)`: Builds `wa.me` URL.
- `isValidIndianPhone(phone)`: Validates 10-digit Indian mobile numbers.
- `isValidPincode(pincode)`: Validates 6-digit Indian pincodes.
- `getInitials(firstName, lastName)`: Returns uppercase initials.
- `deepClone(obj)`: JSON-based deep clone.

Implementation note:

- `truncate` currently contains an encoding artifact for the ellipsis. Replace with `...` or a valid `…`.

## API Client and Frontend Services

### Axios Client

File: `lib/api-client.ts`

Responsibilities:

- Creates an Axios instance with `appConfig.apiUrl`.
- Adds JSON headers.
- Attaches JWT access token from local storage.
- On `401`, attempts refresh with refresh token.
- Clears tokens and redirects to `/login` when refresh fails.

Implementation notes:

- Refresh request posts to `${appConfig.apiUrl}/auth/refresh` with `{ refreshToken }`.
- Backend `refresh_token` currently accepts `refresh_token: str` as a function parameter, so request/response contract should be aligned.
- The `_retry` property is used on Axios config but not typed.

### Auth Service

File: `services/auth.service.ts`

Functions:

- `login(data)`
- `register(data)`
- `googleLogin(data)`
- `sendOtp(data)`
- `verifyOtp(data)`
- `forgotPassword(data)`
- `resetPassword(data)`
- `logout()`
- `getMe()`

Expected response shape:

```ts
ApiResponse<{ user: User; tokens: AuthTokens }>
```

### Product Service

File: `services/product.service.ts`

Functions:

- `getProducts(params)`
- `getProduct(slug)`
- `getFeaturedProducts()`
- `getBestSellers()`
- `searchProducts(query, params)`
- `getProductReviews(productId, params)`
- `submitReview(productId, data)`

### Order Service

File: `services/order.service.ts`

Functions:

- `getOrders(params)`
- `getOrder(id)`
- `createOrder(data)`
- `cancelOrder(id, reason)`
- `getOrderTracking(id)`
- `createPaymentOrder(orderId)`
- `verifyPayment(data)`

Implementation note:

- The frontend expects detailed order and payment endpoints, but backend order/payment files are currently placeholders.

## SEO and Discovery

### Metadata

Configured in `app/layout.tsx` and homepage route metadata.

Includes:

- Site title and title template.
- Description and keywords.
- Open Graph image placeholder `/og-image.jpg`.
- Twitter card metadata.
- Robots config.
- Google verification placeholder.

Implementation needs:

- Add real `/public/og-image.jpg`.
- Replace `your-google-site-verification`.
- Add metadata to new public pages.

### Sitemap

File: `app/sitemap.ts`

Currently includes homepage, shop, categories, festival, corporate, about, contact, and several category URLs.

Important issue:

- Sitemap category slugs such as `/categories/besan-laddu` and `/categories/dry-fruit-laddu` do not match `PRODUCT_CATEGORIES`, which use slugs like `laddu`, `dry-fruit-sweets`, `barfi`, etc.

### Robots

File: `app/robots.ts`

Allows all public pages and disallows:

- `/dashboard/`
- `/admin/`
- `/checkout/`
- `/api/`
- `/(auth)/`

Implementation note:

- App Router route groups are not URL path segments, so `/(auth)/` is not a real public URL. If login/register should be indexed or blocked, use actual paths.

## Styling and Design System

File: `app/globals.css`

Design tokens:

- Maroon palette.
- Gold palette.
- Cream palette.
- Font variables.
- Radius tokens.
- Light/dark semantic CSS variables.

Reusable classes:

- `.container-custom`
- `.btn-primary`
- `.btn-primary-sm`
- `.btn-outline`
- `.glass`
- `.text-gradient-gold`
- `.shadow-premium`
- `.divider-gold`

Dark mode:

- Uses `[data-theme="dark"]`.
- Overrides common background, border, text, hover, input, dropdown, and scrollbar utilities.

Implementation notes:

- Components frequently use highly rounded `rounded-2xl` and `rounded-3xl`; keep consistency or tighten if the design system changes.
- Several CSS comments contain encoding artifacts and can be cleaned.

## Backend Architecture

### App Entry

File: `backend/app/main.py`

Responsibilities:

- Creates FastAPI app.
- Configures logging.
- Initializes database in lifespan startup.
- Adds CORS middleware.
- Sets up rate limiter.
- Includes API router under `settings.API_PREFIX`.
- Adds `/health` endpoint.
- Enables docs only when `settings.DEBUG` is true.

### Router Aggregator

File: `backend/app/api/v1/router.py`

Registered routers:

- `/auth`
- `/products`
- `/categories`
- `/users`
- `/cart`
- `/wishlist`
- `/orders`
- `/payments`
- `/reviews`
- `/coupons`
- `/admin`

### Auth Endpoints

File: `backend/app/api/v1/endpoints/auth.py`

Implemented route definitions:

- `POST /auth/login`
- `POST /auth/register`
- `POST /auth/google`
- `POST /auth/otp/send`
- `POST /auth/otp/verify`
- `POST /auth/refresh`
- `POST /auth/forgot-password`
- `POST /auth/reset-password`
- `POST /auth/logout`

These call `AuthService` except logout, which returns a message directly.

### Product Endpoints

File: `backend/app/api/v1/endpoints/products.py`

Implemented route definitions:

- `GET /products/`
- `GET /products/featured`
- `GET /products/best-sellers`
- `GET /products/search`
- `GET /products/{slug}`
- `GET /products/{product_id}/reviews`

These call `ProductService`.

### Placeholder Endpoints

The following backend endpoint files currently expose only simple root placeholder responses:

- `categories.py`
- `cart.py`
- `wishlist.py`
- `orders.py`
- `payments.py`
- `users.py`
- `admin.py`
- Similar review/coupon scaffolds should be verified before integration.

Example placeholder shape:

```json
{ "success": true, "data": [], "message": "cart endpoint" }
```

## Backend Data Models

Backend models live in `backend/app/models/` and use SQLAlchemy 2 mapped columns with PostgreSQL UUID primary keys.

### User Models

File: `backend/app/models/user.py`

- `User`: Customer/admin account with email, phone, password hash, first/last name, avatar, role, Google ID, verification flags, active flag, timestamps.
- `Address`: User address with type, contact name/phone, address lines, city, state, pincode, default flag.
- `OtpVerification`: OTP record with phone, hashed OTP, verification flag, attempts, expiry, creation timestamp.

Relationships:

- `User.addresses` -> `Address`
- `User.orders` -> `Order`
- `User.reviews` -> `Review`

### Product Models

File: `backend/app/models/product.py`

- `Category`: Name, slug, description, image, parent category, active flag, sort order, SEO metadata.
- `Product`: Name, slug, descriptions, category, tags, flags, rating, review count, price range, min order quantity, shelf life, ingredients, allergens, SEO metadata.
- `ProductImage`: Product image URL, alt text, primary flag, sort order.
- `ProductVariant`: Product weight/unit, price, original price, stock, SKU, active flag.
- `Review`: Product/user review with rating, title, comment, images, verified purchase flag, helpful count.

Relationships:

- `Category.products` -> `Product`
- `Product.category` -> `Category`
- `Product.images` -> `ProductImage`
- `Product.variants` -> `ProductVariant`
- `Product.reviews` -> `Review`

### Order, Cart, and Coupon Models

File: `backend/app/models/order.py`

- `Cart`: Optional user or session cart with coupon code and timestamps.
- `CartItem`: Cart product, variant, quantity, and captured price.
- `Order`: Order number, user, shipping address JSON snapshot, order status, payment status, payment method, totals, coupon data, Razorpay IDs, notes, delivery dates.
- `OrderItem`: Order product snapshot with name, image, variant label, quantity, price, total.
- `Coupon`: Code, description, discount type/value, minimum order amount, max discount, usage limit/count, active flag, validity dates.

Important implementation note:

- The database models exist, but several endpoint/service layers for these models are still placeholders. Do not assume cart/order/payment flows are production-ready until services and route handlers are implemented and tested.

## Backend Services and Schemas

### Auth Service

File: `backend/app/services/auth_service.py`

Implemented business logic:

- `login`: Finds user by email, verifies password, checks active state, returns user and JWT token pair.
- `register`: Checks duplicate email, hashes password, creates customer, returns user and tokens.
- `send_otp`: Generates OTP, hashes it, stores OTP record, leaves SMS sending as TODO.
- `verify_otp`: Finds latest unverified OTP, checks expiry and value, creates user if phone does not exist, returns tokens.
- `refresh`: Decodes refresh token and returns a new token pair.
- `_user_to_dict`: Converts SQLAlchemy user model to frontend-style camelCase user fields.

Partially implemented or TODO:

- `google_login`: Returns `501 Not Implemented`.
- `forgot_password`: Returns generic success message; email sending is TODO.
- `reset_password`: Returns success message; token verification/password update are TODO.
- OTP sending through MSG91 is TODO.

Important contract notes:

- `refresh` returns `{ data: { tokens } }`, but the Axios refresh interceptor expects `data.data.accessToken`.
- Login/register return `data.tokens`, but backend token generation and frontend token field names must be checked for camelCase alignment.

### Product Service

File: `backend/app/services/product_service.py`

Implemented business logic:

- `get_products`: Applies active product filter, category filter, featured/best-seller flags, min/max price, text search, sorting, pagination, and returns paginated response.
- `get_by_slug`: Loads active product by slug with images, variants, and category.
- `get_featured`: Returns up to 8 featured active products.
- `get_best_sellers`: Returns up to 8 best sellers by review count.
- `search`: Delegates to `get_products` with search text.
- `get_reviews`: Returns recent reviews for a product.
- `_product_to_dict`: Converts product model to frontend-style response fields.

Important contract notes:

- `_product_to_dict` currently returns a partial product object, not every required field from `types/product.types.ts`.
- `ProductImage` objects returned do not include `id` or `sortOrder`.
- `ProductVariant` objects returned do not include `originalPrice` or `sku`.
- Paginated backend schema uses snake_case names in `PaginationMeta`, while frontend expects camelCase names.

### Auth Schemas

File: `backend/app/schemas/auth.py`

- `LoginRequest`: Email and password.
- `RegisterRequest`: First name, last name, email, phone, password, confirm password.
- `OtpSendRequest`: Phone.
- `OtpVerifyRequest`: Phone and OTP.
- `GoogleAuthRequest`: Google ID token.
- `ForgotPasswordRequest`: Email.
- `ResetPasswordRequest`: Token and password fields.
- `TokenData`: Access token, refresh token, expiry, token type.
- `TokenResponse`: Success, message, data.

Validation:

- Indian phone validation uses `^[6-9]\d{9}$`.
- Password must be at least 8 characters.
- Confirm password must match password.

### Common Schemas

File: `backend/app/schemas/common.py`

- `MessageResponse`: Success message with optional data.
- `ErrorResponse`: Error response with optional errors.
- `PaginationMeta`: Backend pagination metadata.
- `PaginatedResponse`: Generic paginated response.

Important contract note:

- Backend `PaginationMeta` uses `total_pages`, `has_next_page`, and `has_prev_page`.
- Frontend `PaginationMeta` expects `totalPages`, `hasNextPage`, and `hasPrevPage`.

## Backend Settings

File: `backend/app/core/config.py`

Settings include:

- App name, version, API prefix, debug, environment.
- PostgreSQL async database URL.
- Database pool settings.
- Redis URL and cache TTL.
- JWT secret, algorithm, access/refresh expiry.
- Google OAuth credentials.
- Allowed CORS origins.
- AWS S3 media settings.
- Razorpay keys.
- MSG91 OTP settings.
- Resend email settings.
- Rate limit per minute.

Important security note:

- Default secrets and database URL values must be overridden in environment files before any real deployment.

## Environment Variables

File: `.env.local.example`

Contains frontend and backend examples for:

- App URLs and branding.
- API URL.
- Database.
- Redis.
- JWT/auth.
- Google OAuth.
- Razorpay.
- Stripe future support.
- AWS/Cloudinary.
- Algolia.
- MSG91/Twilio OTP.
- Resend/email.
- Analytics/monitoring.
- Google Maps.
- WhatsApp Business.
- Admin emails.
- Rate limiting.

Recommended local setup:

```bash
npm install
npm run dev
```

Recommended quality checks:

```bash
npm run lint
npx tsc --noEmit
npm run build
python -m compileall backend/app
```

## Implementation Roadmap

### Highest Priority

1. Clean encoding artifacts across source files.
2. Build missing public pages: shop, categories, product detail, about, contact.
3. Connect product UI to real `productService` data using TanStack Query.
4. Implement add-to-cart and wishlist actions on product cards.
5. Persist cart and wishlist.
6. Align frontend API response types with backend response models.
7. Finish backend CRUD/services for products, categories, users, cart, wishlist, orders, payments, reviews, coupons, and admin.
8. Implement checkout with server-side price recalculation.
9. Implement Razorpay order creation, verification, and webhook handling.
10. Add auth hydration, protected routes, and logout behavior.

### Ecommerce Features Needed

- Product listing filters, sorting, pagination, search.
- Product detail pages with variants, images, stock, reviews, related products.
- Category landing pages.
- Cart page.
- Checkout page with address selection/addition.
- Coupon validation.
- Order creation and confirmation.
- Payment verification.
- COD availability rules.
- Order tracking.
- User dashboard.
- Wishlist page.
- Address management.
- Review submission.
- Admin product/category/order management.
- Inventory management.
- Banner/festival content management.

### Content and Marketing Pages Needed

- About page.
- Contact page with contact form and map.
- Corporate gifts page.
- Bulk order pages.
- Festival collection pages.
- Policy pages: privacy, terms, refund, shipping.

### Production Readiness Needed

- Real secrets and environment management.
- Database migrations.
- Seed data.
- Input validation on backend.
- Auth middleware/dependencies.
- Admin role checks.
- Rate limit verification.
- Error handling standardization.
- Logging and monitoring.
- SEO metadata per page.
- Real images and Open Graph assets.
- Accessibility audit.
- Mobile viewport QA.
- Unit and integration tests.
- Payment security review.

## Known Mismatches and Risks

- Frontend links many routes that do not exist yet.
- Backend has many placeholder endpoints.
- Frontend service contracts and backend response models need alignment.
- Cart and wishlist are currently client-only.
- Product grid uses mock data.
- Newsletter forms do not call a backend.
- Google login button is visual only.
- Header logout button is visual only.
- Sitemap includes routes that may not match category constants.
- Free delivery copy and constant disagree.
- Theme local storage keys are inconsistent.
- Several files contain text encoding artifacts.
- Some installed libraries are unused and should either be used intentionally or removed later.

## Suggested Build Order

1. Fix encoding and constants mismatches.
2. Create real product/category backend data model, migrations, and seed data.
3. Build `/shop`, `/categories`, `/categories/[slug]`, and `/products/[slug]`.
4. Connect homepage featured products to backend.
5. Wire cart and wishlist UI to Redux and persistence.
6. Build auth registration, forgot/reset password, and auth hydration.
7. Build checkout and order creation.
8. Add Razorpay integration and payment verification.
9. Build dashboard pages.
10. Build admin pages.
11. Add content/policy pages.
12. Add tests and production deployment hardening.
