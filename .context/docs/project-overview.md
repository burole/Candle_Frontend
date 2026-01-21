---
type: doc
name: project-overview
description: High-level overview of the project, its purpose, and key components
category: overview
generated: 2026-01-21
status: active
scaffoldVersion: "2.0.0"
---

# Project Overview

## Introduction
Candle Frontend is a modern web application designed to facilitate credit assessment, financial queries, and corporate actions. Built with **Next.js**, **TypeScript**, and **Tailwind CSS**, it provides a robust interface for users to manage credit requests ("crédito"), perform background checks ("consultas"), and handle payments securely. The platform integrates user authentication, detailed reporting, and a responsive design system to deliver a seamless financial service experience.

## Primary Purpose
The core mission of Candle is to streamline financial decision-making for individuals and businesses.
- **Problem Solved:** Simplifying the complex process of credit analysis and entity background verification.
- **Value Proposition:** Fast, accurate, and user-friendly access to financial data and credit assessment tools.
- **Target Audience:** Financial analysts, credit officers, corporate users, and individuals seeking financial services.

## High-Level Architecture
The system follows a modern React-based architecture:
- **Frontend Framework:** Next.js (App Router) for server-side rendering and static generation.
- **Language:** TypeScript for type safety and developer productivity.
- **Styling:** Tailwind CSS with a custom design system (`design-system/`) and ShadCN UI components (`src/components/ui`).
- **State Management:** React Server Actions for data mutations (`src/actions`) and client-side hooks.
- **API Integration:** Dedicated services (`src/services`) and API handlers (`src/lib/api`) for communicating with backend systems.

## Key Features
- **Authentication & Security:** specialized login and registration flows (`app/(auth)`), protected via `AuthService`.
- **Credit Assessment:** comprehensive workflows for analyzing creditworthiness (`assessCreditAction`, `assessPremiumCreditAction`).
- **Entity Queries:** robust tools for querying CPF/CNPJ and corporate data (`assessCorporateAction`, `assessCreditCpfAction`).
- **Payment Processing:** integrated payment gateways and billing management (`src/components/payment`).
- **Interactive Reports:** dynamic report generation for credit and query results (`src/components/credito/report`).

## Technology Stack
- **Runtime:** Node.js
- **Framework:** Next.js (React)
- **Language:** TypeScript
- **Styling:** Tailwind CSS, PostCSS
- **Validation:** Zod (implied by `src/validators`)
- **Linting:** ESLint

## Getting Started Checklist
1. **Install Prerequisites:** Ensure Node.js (v18+) and npm are installed.
2. **Install Dependencies:** Run `npm install` in the project root.
3. **Configure Environment:** Copy `.env.example` to `.env` and fill in necessary API keys.
4. **Run Development Server:** Execute `npm run dev` to start the local server on `http://localhost:3000`.
5. **Explore Documentation:** Check `docs/development-workflow.md` for daily coding standards.

## Next Steps
- Review the **Architecture Guide** (`docs/architecture.md`) for deep dives into the system design.
- Check the **Development Workflow** (`docs/development-workflow.md`) to understand contribution guidelines.
- Explore the **Component Library** in `src/components/ui` to understand the UI building blocks.
