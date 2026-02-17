
# Referral Builder

A full-stack referral management application built with React (Vite + TypeScript) and NestJS (TypeORM + MySQL).

This application allows users to create, edit, preview, paginate, and manage referrals with full avatar upload lifecycle support.

---

# 🚀 Tech Stack

## Frontend
- React (Vite)
- TypeScript
- React Hook Form + Zod
- TanStack React Query
- TanStack Table
- TailwindCSS v4
- Framer Motion
- Sonner (Toast)
- Vitest + Testing Library

## Backend
- NestJS
- TypeORM
- MySQL (Docker)
- Multer (file upload)
- Class Validator / Transformer
- Jest

---

# 📦 Project Structure

referral-builder/
  apps/
    api/        # NestJS backend
    web/        # React frontend
  ARCHITECTURE.md
  README.md

---

# 🛠 Installation Guide

## Prerequisites

- Node.js (v24.13.1 recommended)
- Docker
- npm

---

# 🐳 Backend Setup

cd apps/api
cp .env.example .env
docker compose up --build

Services started:

- API → http://localhost:3000
- phpMyAdmin → http://localhost:8080
- MySQL (Docker container)

---

# 💻 Frontend Setup

cd apps/web
npm install
npm run dev

Frontend runs at:

http://localhost:5173

---

# 🧪 Running Tests

## Backend

cd apps/api
npm run test

## Frontend

cd apps/web
npm run test

---

# ✨ Features Implemented

## Referral Form
- Live preview while typing
- Fully validated using Zod
- Responsive layout
- Works on latest Chrome

## Avatar Lifecycle (Full Support)
- Upload avatar
- Instant preview
- Replace avatar
- Remove avatar
- Persist avatar in database
- Return full URL from backend
- Server-side transformation of avatarUrl
- Clean handling of nullable avatar column

## Referral Management
- Server-side pagination
- Edit via modal
- Soft delete
- Confirmation dialog
- Loading skeletons
- Animated modal transitions

---

# 🏗 Architecture Overview

High-level system flow:

React Frontend
      ↓ (REST)
NestJS Backend
      ↓
MySQL (Dockerized)

## Backend Design
- Controller layer handles requests
- Service layer contains business logic
- Explicit avatar lifecycle handling
- DTO validation with transformation
- Soft delete via TypeORM

Avatar handling strategy:
- Database stores relative path only
- API returns full URL dynamically
- Client never controls avatarUrl directly

## Frontend Design
- Reusable UI components (Button, Input, Modal, DataTable)
- Feature-based structure
- React Query for server state
- Form abstraction with RHF
- Controlled FormData handling for file uploads

---

# 🔐 Soft Delete

Referrals are soft deleted using TypeORM’s soft delete functionality.
Deleted records are excluded from normal queries.

---

# 📱 Responsiveness

- Mobile-first form layout
- Responsive table
- Adaptive modals
- Works across screen sizes

---

# 🧠 Key Technical Decisions

- Server-side pagination for scalability
- Explicit file lifecycle management
- Nullable database column with strict TypeScript typing
- Separation of Create vs Update DTO validation strictness
- Behavior-driven frontend testing
- Clean transformation of multipart boolean values

---

# 📌 Notes

- Avatar files are stored locally in /uploads
- Only backend constructs avatarUrl
- FormData used consistently for create & update
- Designed for maintainability and clarity

---

# 👨‍💻 Author

Jerson Conmigo
