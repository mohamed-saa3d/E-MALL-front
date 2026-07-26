# 🛒 E-MALL — Enterprise E-Commerce Frontend

![Next.js](https://img.shields.io/badge/Next.js-15-black?style=for-the-badge&logo=next.js)
![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue?style=for-the-badge&logo=typescript)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.0-38B2AC?style=for-the-badge&logo=tailwind-css)
![Redux Toolkit](https://img.shields.io/badge/Redux_Toolkit-2.0-764ABC?style=for-the-badge&logo=redux)
![TanStack Query](https://img.shields.io/badge/TanStack_Query-5.0-FF4154?style=for-the-badge&logo=react-query)

A modern, highly scalable, and type-safe E-Commerce frontend platform built using **Next.js (App Router)** and **TypeScript**. Engineered following **Feature-Driven Modular Architecture**, strict separation of concerns, resilient authentication mechanics, and enterprise-grade state management.

🌐 **[Live Demo](https://e-mall-demo.vercel.app)** | 📖 **[API Documentation](#)**

---

## ✨ Key Technical Highlights

* 🔒 **Role-Based Access Control (RBAC)**: Multi-tenant protection for `user`, `vendor`, and `admin` roles utilizing Next.js Middleware and client-side guards (`RoleGuard`, `ProtectedRoute`).
* ⚡ **Resilient Network Layer**: Axios Interceptors with silent background token refreshing (`refreshToken`), request queuing for concurrent `401`s, and strict error boundaries.
* 🎯 **100% Strict Type Safety**: End-to-end TypeScript interfaces aligning directly with flat backend payloads.
* 📦 **Dual State Architecture**:
  * **Redux Toolkit**: Synchronous UI state, local cart persistence, and auth state management.
  * **TanStack Query (React Query)**: Server state hydration, asynchronous caching, and optimistic UI updates.
* 🏗️ **Domain-Driven Modular Architecture**: Clean separation where each feature encapsulates its own APIs, types, components, slices, and hooks.
* 🎨 **Production UX**: Graceful loading fallbacks, zero blank screens during rehydration, and full screen responsiveness.

---

## 🛠️ Tech Stack & Ecosystem

### Core Framework & Language
* **Framework**: [Next.js](https://nextjs.org/) (App Router)
* **Language**: [TypeScript](https://www.typescriptlang.org/) (Strict Mode)

### State Management & Data Fetching
* **Global App State**: [Redux Toolkit](https://redux-toolkit.js.org/)
* **Server State & Caching**: [TanStack Query v5](https://tanstack.com/query)
* **HTTP Client**: [Axios](https://axios-http.com/) (Custom Interceptors & Storage sync)

### UI & Styling
* **Styling**: [Tailwind CSS](https://tailwindcss.com/)
* **Icons**: [Lucide React](https://lucide.dev/)
* **Class Utilities**: `clsx` & `tailwind-merge` (`cn` helper)

### Quality Assurance & Tooling
* **Git Hooks**: [Husky](https://typicode.github.io/husky/) (Pre-commit linting & workspace type-checking)
* **Formatters & Linters**: Prettier & ESLint

---

## 📁 Project Architecture

The workspace adheres to a **Modular Feature-Driven Structure** under `src/`:

```text
src/
├── app/                   # Next.js App Router (Layouts & Route Groups)
│   ├── (admin)/           # Dedicated Admin Dashboard Routes
│   ├── (auth)/            # Auth Suite (Login, Register, Password Reset)
│   ├── (protected)/       # Authenticated Application Routes
│   ├── (public)/          # Public Storefront & Browsing Pages
│   ├── (user)/            # Customer Checkout & Profile Routes
│   └── (vendor)/          # Vendor Management Routes
├── components/            # Shared Layouts & Common UI Elements
├── config/                # Environment Configuration & Schema Validation
├── constants/             # App-wide Routes & Static Constants
├── hooks/                 # Reusable Generic Hooks (`useApiMutation`, etc.)
├── modules/               # Domain Modules (Feature-based Boundaries)
│   ├── auth/              # Auth API, Slices, Guards, Hooks & Types
│   └── cart/              # Cart Business Logic, LocalStorage Sync Middleware
├── providers/             # React Context Providers (Store, Query, Auth)
├── services/              # Axios Client, Interceptors, Logger & Storage
├── store/                 # Centralized Redux Store Configuration
└── utils/                 # Formatters, Helpers, and Custom Validators
