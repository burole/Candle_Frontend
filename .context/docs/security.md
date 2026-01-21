---
type: doc
name: security
description: Security policies, authentication, secrets management, and compliance requirements
category: security
generated: 2026-01-21
status: active
scaffoldVersion: "2.0.0"
---

# Security & Compliance Notes

## Overview
This document outlines the security guardrails, authentication mechanisms, and data protection policies for the Candle Frontend application. All contributors must adhere to these standards to ensure the integrity and confidentiality of user data.

## Authentication & Authorization

### Authentication
- **Service**: Authentication is managed via `AuthService` (`src/services/auth.service.ts`).
- **Mechanism**: The application likely uses token-based authentication (JWT or similar opaque tokens) exchanged via the `AuthResponse` type.
- **Flow**:
  1. User submits credentials via the Login form (`app/(auth)/login`).
  2. A Server Action calls `AuthService`.
  3. Upon success, a session/cookie is established.

### Authorization
- **Role-Based Access Control (RBAC)**: Access to specific routes (e.g., `app/dashboard`, `app/credito`) should be guarded by middleware or server-side checks to ensure the user has the necessary permissions.
- **Client-Side**: UI elements may be conditionally rendered based on the user's `AuthState`.

## Secrets & Sensitive Data

### Storage
- **Environment Variables**: Sensitive configuration (API keys, database URLs, 3rd party secrets) are stored in `.env` files.
  - **Local**: `.env` (git-ignored).
  - **Production**: Injected via the deployment platform's secrets manager.
- **Repo Policy**: **NEVER** commit `.env` files or hardcode secrets in the source code.

### Data Protection
- **PII (Personally Identifiable Information)**: Data such as CPFs (`src/validators`), names, and financial history must be handled with care.
  - **Transmission**: All data must be transmitted over HTTPS.
  - **Logging**: Avoid logging raw PII in widespread logs; use masked values where possible.

## Compliance & Policies

### Data Privacy
- **LGPD (Lei Geral de Proteção de Dados)**: As a Brazilian-focused application (indicated by CPF/CNPJ usage), we must comply with LGPD regulations regarding data collection, storage, and user rights (access, deletion).

### Best Practices
- **Input Validation**: usage of `Zod` schemas (`src/validators`) is mandatory for all user inputs to prevent Injection attacks.
- **Dependencies**: regularly audit `package.json` for known vulnerabilities using `npm audit`.

## Incident Response

In the event of a security breach or data leak:
1. **Identify**: Confirm the breach and its scope.
2. **Contain**: Revoke compromised keys and take affected services offline if necessary.
3. **Escalate**: Notify the Technical Lead / Security Officer immediately.
4. **Remediate**: Patch the vulnerability and rotate secrets.
5. **Analyze**: Conduct a post-mortem to prevent recurrence.

## Related Resources
- [Architecture Guide](./architecture.md)
- [Project Overview](./project-overview.md)
