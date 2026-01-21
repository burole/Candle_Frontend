---
type: doc
name: tooling
description: Scripts, IDE settings, automation, and developer productivity tips
category: tooling
generated: 2026-01-21
status: active
scaffoldVersion: "2.0.0"
---

# Tooling & Productivity Guide

## Overview
This guide lists the tools, scripts, and configurations that power the development experience for Candle Frontend. Adopting these tools ensures consistency and efficiency across the team.

## Required Tooling

### Primary Tools
- **Node.js**: Runtime environment (v18+ required).
  - *Verify*: `node -v`
- **npm**: Package manager (comes with Node.js).
  - *Verify*: `npm -v`
- **Git**: Version control system.
  - *Verify*: `git --version`

### Recommended
- **nvm** (Node Version Manager): To easily switch between Node.js versions.
  - *Install*: `curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.0/install.sh | bash`

## Recommended Automation

### NPM Scripts
We use `npm` to run common tasks. These are defined in `package.json`.

- **`npm run dev`**: Starts the Next.js development server with hot-module replacement.
- **`npm run build`**: Creates an optimized production build.
- **`npm run start`**: Runs the production-ready server (requires `build` first).
- **`npm run lint`**: Runs ESLint to catch syntax and style errors.

### Code Quality Tools
- **ESLint**: Static code analysis.
  - *Config*: `.eslintrc` (or `eslint.config.mjs`)
- **Prettier**: Code formatting (if configured).
  - *Tip*: Integrate with your editor to "Format on Save".

## IDE / Editor Setup

We recommend **Visual Studio Code (VS Code)** for its robust TypeScript and React support.

### Recommended Extensions
1. **ESLint**: Integrates ESLint into VS Code.
2. **Prettier - Code formatter**: For consistent code style.
3. **Tailwind CSS IntelliSense**: Autocomplete and preview for Tailwind classes.
4. **Pretty TypeScript Errors**: Makes TS errors easier to read.
5. **GitLens**: Supercharges Git capabilities within the editor.

### Workspace Settings
Consider adding a `.vscode/settings.json` (if not already present) to enforce team standards:

```json
{
  "editor.formatOnSave": true,
  "editor.defaultFormatter": "esbenp.prettier-vscode",
  "editor.codeActionsOnSave": {
    "source.fixAll.eslint": true
  }
}
```

## Productivity Tips

- **Next.js Fast Refresh**: The dev server is optimized for speed. If things get stuck, `rm -rf .next` and restarting `npm run dev` often fixes cache issues.
- **Quick Component Creation**: Use snippets or AI tools (like `.context` agents) to scaffold new components following the project structure in `src/components`.
- **Browser Tools**: Use the React Developer Tools and Redux DevTools (if applicable) browser extensions for debugging component state.

## Related Resources
- [Development Workflow](./development-workflow.md)
