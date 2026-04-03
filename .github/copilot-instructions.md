# Project Guidelines

## Code Style
- Use PascalCase for component names (e.g., `LoginForm.jsx`)
- Use camelCase with "use" prefix for custom hooks (e.g., `useTheme.js`)
- Always use `@/*` path alias pointing to `src/`
- Follow shadcn/ui patterns for UI components with CVA (class-variance-authority) for variants
- Use `cn()` utility for Tailwind class merging (clsx + tailwind-merge)
- Prefer CSS variables for theming over hardcoded values

## Architecture
- **App Router**: Use Next.js 16 app router with route groups for logical separation ((auth), (dashboard), (marketing))
- **State Management**: Zustand for global UI state, React Query for server state
- **Authentication**: Firebase Auth with Google OAuth, protected routes via AuthGuard middleware
- **API**: Axios with Firebase token interceptor, feature-organized API calls in `src/features/{feature}/api/`
- **Component Organization**: Feature-based structure with api/, components/, hooks/ subfolders
- **Theming**: next-themes with CSS variables, supports light/dark modes

## Build and Test
- `npm run dev` — Start development server
- `npm run build` — Production build
- `npm run start` — Run production server
- `npm run lint` — Run ESLint
- No test runner configured yet

## Conventions
- Wrap new pages in "use client" for interactivity
- All feature-specific code in `src/features/{feature}/` with consistent api/components/hooks structure
- Use dynamic segments for query IDs: `[query_id]/page.jsx`
- Public routes must be added to AuthGuard's PUBLIC_ROUTES array
- API responses follow documented JSDoc patterns
- Animations: Framer Motion for transitions, Lottie for JSON animations