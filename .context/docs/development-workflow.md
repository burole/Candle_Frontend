---
type: doc
name: development-workflow
description: Day-to-day engineering processes, branching, and contribution guidelines
category: workflow
generated: 2026-01-21
status: active
scaffoldVersion: "2.0.0"
---

# Development Workflow

## Overview
This document outlines the standard engineering processes for the Candle Frontend repository. We prioritize clean code, rapid iteration, and high-quality user experiences.

## Local Development

### Prerequisites
- **Node.js**: Version 18 or higher
- **npm**: Installed with Node.js
- **Git**: For version control

### Setup Instructions
1. **Clone the repository**:
   ```bash
   git clone <repository-url>
   cd Candle_Frontend
   ```
2. **Install Dependencies**:
   ```bash
   npm install
   ```
3. **Environment Configuration**:
   - Copy the example environment file: `cp .env.example .env`
   - Fill in the required API keys and secrets in `.env`.

### Common Commands
- **Start Development Server**: 
  ```bash
  npm run dev
  ```
  Runs the app at `http://localhost:3000`. Hot reloading is enabled.

- **Build for Production**:
  ```bash
  npm run build
  ```
  Compiles the application for production deployment.

- **Start Production Server**:
  ```bash
  npm start
  ```
  Runs the built application locally.

- **Lint Code**:
  ```bash
  npm run lint
  ```
  Checks for code style and potential errors.

## Branching & Version Control

We follow a **Feature Branch** workflow:

1. **Main Branch (`main`)**: The source of truth. Always deployable.
2. **Feature Branches**: Created for every new feature or bug fix.
   - Naming convention: `feat/feature-name`, `fix/bug-description`, `refactor/component-name`.
   - Example: `feat/credit-report-ui` or `fix/login-validation`.

### Process
1. Create a new branch from `main`.
2. Implement changes locally.
3. Commit often with descriptive messages.
4. Push the branch to the remote repository.
5. Open a Pull Request (PR) targeting `main`.

## Code Review Expectations

All changes must go through a Pull Request review process.

### Author Responsibilities
- **Self-Review**: Check your code against the [Style Guide](./tooling.md) before opening a PR.
- **Description**: clearly explain *what* changed and *why*.
- **Tests**: Ensure any new logic is tested (unit or manual verification steps provided).
- **Screenshots**: Attach screenshots or videos for UI changes.

### Reviewer Checklist
- **Functionality**: Does the code do what it's supposed to?
- **Security**: Are there any exposed secrets or insecure patterns?
- **Performance**: Are there unnecessary re-renders or heavy computations?
- **Accessibility**: specific checks for semantic HTML and aria labels.

## Collaboration with AI Agents
This repository uses the `.context/` system. You can leverage specific agents for help:
- **@code-reviewer**: Request a review of your PR or local changes.
- **@feature-developer**: Ask for help implementing a specific feature.
- **@architect-specialist**: Consult on structural changes or new patterns.

## Onboarding Tasks
New to the project? Try these steps:
1. Run the app locally and explore the "Consultas" flow.
2. Read the [Project Overview](./project-overview.md) to understand the domain.
3. Pick a "good first issue" or ask the team for a small UI task (e.g., updating a component in `design-system/`).

## Related Documents
- [Testing Strategy](./testing-strategy.md)
- [Tooling](./tooling.md)
