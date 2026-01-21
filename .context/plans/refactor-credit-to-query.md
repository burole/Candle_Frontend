---
type: plan
name: refactor-credit-to-query
title: Refactor Credit to Query Architecture
description: Merge /app/credito into /app/consulta, unify components, and update navigation to reflect that Credit is a type of Query
status: active
generated: 2026-01-21
version: 1.0.0
owner: architect-specialist
---

# Plan: Refactor Credit to Query Architecture

## Overview
This plan outlines the refactoring strategy to merge the `/credito` routes into the `/consulta` structure. This aligns the frontend with the backend's "Queries Module" architecture, treating "Credit" as just another type of query (Consulta).

**Goals:**
1.  Eliminate the deprecated `/credito` route.
2.  Unify component libraries (`src/components/credito` -> `src/components/query`).
3.  Update the `app/consulta` pages to support all query types.
4.  Ensure visual consistency using the Design System and ShadCN components.

## Phased Approach

### Phase 1: Planning & Analysis (P)
**Objective**: Map out the component migration and verify backend alignment.
**Owner**: @architect-specialist

1.  **Map Component Overlap**:
    - Compare `src/components/credito/*` with `src/components/query/*`.
    - Identify unique components in `credito` that need to be moved.
    - **Deliverable**: A list of components to move/rename.
2.  **Define New Route Structures**:
    - `app/consulta/page.tsx`: Main dashboard for selecting query types (including Credit).
    - `app/consulta/[code]/page.tsx`: Generic result/execution page.
    - **Deliverable**: Route update specification.
3.  **Checkpoint**: Commit plan and design notes.
    - `git commit -m "docs(plan): define refactor strategy for credit-to-query"`

### Phase 2: Refactoring & Implementation (E)
**Objective**: Move code and update routes.
**Owner**: @feature-developer, @refactoring-specialist

1.  **Component Migration**:
    - Move unique components from `src/components/credito` to `src/components/query`.
    - Rename to fit `Query*` convention if necessary (e.g., `ConsultaCard` -> `QueryCard` if generic, or `CreditQueryCard` if specific).
    - Update imports in all files.
2.  **Route Updates**:
    - Modify `app/consulta/page.tsx` to include "Credit" as a selectable option, using the Design System (Cards/Grid).
    - Ensure `app/consulta/[code]` can render `ConsultaPageContent` (or its equivalent) based on the query type.
3.  **Deprecation**:
    - Remove `app/credito` directory.
    - Update `src/components/layout` (Sidebar/Header) to remove "/credito" links and point to "/consulta".
4.  **Checkpoint**: All code moved, app builds.
    - `git commit -m "refactor: merge credito components and routes into query"`

### Phase 3: Verification & Polish (V)
**Objective**: Ensure no regressions and UI consistency.
**Owner**: @frontend-specialist, @test-writer

1.  **Visual Audit**:
    - Verify the "Consulta" dashboard looks correct with the new items.
    - Verify the Credit Report view still renders correctly under the new route.
2.  **Link Testing**:
    - Click all navigation links to ensure no 404s.
    - Test the full flow: Dashboard -> Select Credit Query -> Input Data -> View Result.
3.  **Clean Up**:
    - Delete empty `src/components/credito` folder.
    - Fix any linting errors from unused imports.

## Agent Lineup

1.  **@architect-specialist**:
    - Oversee the migration strategy.
    - Ensure the "Query" abstraction holds up for Credit types.
2.  **@refactoring-specialist**:
    - execute the moving of files and updating of imports.
    - Deduplicate identical components (e.g., if `ConsultaCard` and `CategoryCard` are duplicates).
3.  **@frontend-specialist**:
    - Redesign the `app/consulta/page.tsx` to look premium and consistent with `@design-system`.

## Documentation Touchpoints
- `docs/architecture.md`: Update "Components" section to reflect merged structure.
- `docs/glossary.md`: Update definition of "Consulta" to explicitly include Credit.

## Success Criteria
- [ ] `/credito` route returns 404 or redirects to `/consulta`.
- [ ] `/consulta` lists "Credit" options.
- [ ] All credit features work under the new URL structure.
- [ ] No duplicate code in `src/components/credito` and `src/components/query`.

## Rollback Plan
If the refactor causes critical breakage:
1.  Revert the git commit: `git revert <commit-hash>`.
2.  Restore the `app/credito` directory.
