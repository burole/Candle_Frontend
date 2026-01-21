---
type: doc
name: testing-strategy
description: Test frameworks, patterns, coverage requirements, and quality gates
category: testing
generated: 2026-01-21
status: active
scaffoldVersion: "2.0.0"
---

# Testing Strategy

## Overview
Our testing strategy aims to ensure the reliability and correctness of business logic, especially regarding financial calculations and credit assessments. We prioritize unit testing for critical logic and integration testing for user flows.

## Test Types

### 1. Unit Tests
- **Scope**: Individual functions, strategies, factories, and utility helpers.
- **Framework**: Jest (implied standard) or Vitest (if configured).
- **Naming**: `*.test.ts` or `*.spec.ts`.
- **Location**: Co-located with the source file or in a `__tests__` directory.
- **Focus**:
  - `src/lib/consultas/strategies`: Verify each strategy processes data correctly.
  - `src/lib/consultas/factories`: Ensure the factory returns the correct strategy.
  - `src/validators`: Verify Zod schemas reject invalid inputs.

### 2. Integration Tests
- **Scope**: Interaction between Services and Server Actions.
- **Goal**: Ensure the data flows correctly from the action to the service and back.
- **Mocking**: External APIs (payment gateways, credit bureaus) **MUST** be mocked to prevent real charges or data leaks during testing.

### 3. E2E Tests (End-to-End)
- **Scope**: Critical user journeys (Login -> Dashboard -> Credit Check).
- **Tooling**: Playwright or Cypress (recommended if not yet installed).
- **Frequency**: Run on major releases or via CI pipelines.

## Running Tests

Execute the following commands from the project root:

- **Run All Unit Tests**:
  ```bash
  npm run test
  ```

- **Run in Watch Mode** (for development):
  ```bash
  npm run test:watch
  ```

- **Generate Coverage Report**:
  ```bash
  npm run test:coverage
  ```

## Quality Gates

### CI/CD Checks
Before merging any Pull Request, the following checks must pass:
1. **Linting**: `npm run lint` must return 0 errors.
2. **Build**: `npm run build` must complete successfully.
3. **Tests**: All unit tests must pass.

### Coverage Expectations
- **Critical Paths**: 80%+ coverage for `src/lib/consultas` and `src/services`.
- **UI Components**: Snapshot testing is optional but recommended for complex reports.

## Troubleshooting

- **Environment Variables**: Ensure you are using a `.env.test` file or mocking environment variables if your tests depend on configuration.
- **Async Operations**: Be careful with async/await in tests. Ensure all promises are resolved.
- **Mocks**: If a test fails unexpectedly, check if external service mocks are correctly reset between tests.

## Related Resources
- [Development Workflow](./development-workflow.md)
