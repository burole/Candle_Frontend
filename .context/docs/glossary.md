---
type: doc
name: glossary
description: Project terminology, type definitions, domain entities, and business rules
category: glossary
generated: 2026-01-21
status: active
scaffoldVersion: "2.0.0"
---

# Glossary & Domain Concepts

## Core Terms

### Domain Concepts
- **Consulta (Query):** A check or search performed against a database or external service to retrieve information about an entity (Person or Company).
- **Crédito (Credit):** The process or feature related to assessing an entity's creditworthiness.
- **CPF:** "Cadastro de Pessoas Físicas" - The Brazilian individual taxpayer registry identification number.
- **CNPJ:** "Cadastro Nacional da Pessoa Jurídica" - The Brazilian corporate taxpayer registry identification number.
- **Corporate Action:** A specific type of query or assessment targeting business entities (CNPJ).
- **Premium Credit:** An enhanced credit assessment with deeper data analysis.
- **Billing Type:** Categorization of how a user is charged (e.g., Prepaid, Postpaid).

### Technical Concepts
- **ActionState:** A standard response object used in Server Actions to communicate success, error, or validation issues to the client.
- **Strategy Pattern:** A design pattern used in `src/lib/consultas/strategies` to define a family of algorithms (queries) and make them interchangeable.
- **Factory Pattern:** Used to select the appropriate Strategy at runtime based on the input type (e.g., CPF vs CNPJ).
- **Service:** A stateless class or module in `src/services` that orchestrates business logic and data access.

## Type Definitions

Key TypeScript interfaces and types found in the codebase:

- **`ActionState`**:
  - *Location:* `src/actions/query.actions.ts`, `src/actions/auth.actions.ts`
  - *Description:* Standardized structure for Server Action return values.
  
- **`AuthResponse`**:
  - *Location:* `src/types/auth.ts`
  - *Description:* Payload returned upon successful authentication.

- **`AssessmentState`**:
  - *Location:* `src/actions/credit.actions.ts`
  - *Description:* State object specific to credit assessment flows.

- **`BillingType`**:
  - *Location:* `src/types/payment.ts`
  - *Description:* Enum or Union type defining payment/billing models.

## Personas / Actors

- **User:** A generic visitor or registered customer using the platform.
- **Analyst:** A specialized user who may review or interpret complex credit reports.
- **Admin:** A user with elevated privileges to manage system settings (implied).
- **API Client:** External systems consuming the Candle public API (if exposed).

## Acronyms & Abbreviations

- **RSC:** React Server Components
- **SSR:** Server-Side Rendering
- **DTO:** Data Transfer Object
- **UI:** User Interface
- **UX:** User Experience
- **auth:** Authentication/Authorization

## Domain Rules & Invariants

- **Validation:** All CPF/CNPJ inputs must pass strict formatting and checksum validation (via `src/validators`).
- **Security:** Credit reports are sensitive data and must only be accessible by the requester or authorized personnel.
- **Statelessness:** Server Actions should be stateless where possible, relying on the inputs and database state.
