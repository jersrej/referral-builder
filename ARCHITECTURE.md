# Architecture Overview

This document explains the high-level architecture and design decisions
of the Referral Builder application.

------------------------------------------------------------------------

# High-Level System Architecture

```
Frontend React (Vite + TS) -> Backend NestJS API -> MySQL DB (Dockerized)
```

------------------------------------------------------------------------

# Frontend Architecture

The frontend follows a modular and reusable component-based structure.

    UI Layer
       |-- Button
       |-- Input
       |-- Modal
       |-- ConfirmDialog
       |-- DataTable
       |-- Pagination
       |-- EmptyState

    Feature Layer
       |-- ReferralForm
       |-- ReferralPreview
       |-- ReferralsTable

    Hooks Layer
       |-- useCreateReferral
       |-- useUpdateReferral
       |-- useDeleteReferral
       |-- useGetReferrals

### Key Design Principles

-   Reusable UI primitives
-   Feature-based folder organization
-   Server-state management via React Query
-   Form validation using React Hook Form + Zod
-   Behavior-driven component testing (Vitest)

------------------------------------------------------------------------

# Backend Architecture

The backend follows a layered architecture pattern.

    Controller Layer
       |-- ReferralsController

    Service Layer
       |-- ReferralsService

    Data Layer
       |-- TypeORM Repository

    Database
       |-- MySQL (Soft Delete Enabled)

### Backend Design Decisions

-   Business logic isolated in services
-   Server-side pagination
-   Soft delete via TypeORM
-   File upload handled via Multer
-   Service-layer unit testing

------------------------------------------------------------------------

# Scalability Considerations

-   Server-side pagination ensures efficient data handling
-   Repository pattern abstracts database access
-   Modular frontend components allow future feature extension
-   Clear separation of concerns improves maintainability

------------------------------------------------------------------------

# Future Improvements

-   Authentication & authorization
-   Cloud-based file storage
-   API versioning
-   CI/CD pipeline integration
-   E2E testing (Playwright or Cypress)
