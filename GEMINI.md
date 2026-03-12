# FoodSmash - Gemini CLI Instructional Context

This document provides essential information for Gemini CLI to understand and interact effectively with the FoodSmash project.

## Project Overview
FoodSmash is a dummy application built with **Nuxt 3** designed to showcase and teach the capabilities of Gemini CLI. Its theme centers around a community-driven platform for sharing and discovering unusual food combinations.

### Core Stack
- **Framework:** [Nuxt 3](https://nuxt.com/) (version 4.2.1)
- **Frontend Library:** [Vue 3](https://vuejs.org/) (Composition API)
- **Icons:** [Lucide Vue Next](https://lucide.dev/guide/packages/lucide-vue-next)
- **Testing:** [Vitest](https://vitest.dev/) with `@nuxt/test-utils`
- **Language:** [TypeScript](https://www.typescriptlang.org/)

## Directory Structure
- `app/`: The primary source directory for the application.
    - `pages/`: Vue components that define the application's routes (e.g., `index.vue`, `create.vue`).
    - `layouts/`: Reusable layouts for pages (e.g., `default.vue`).
    - `assets/css/`: Global stylesheets (`main.css`).
    - `app.vue`: The root application component.
- `test/`: Contains the test suite.
    - `test/nuxt/`: Specialized tests that run in a Nuxt environment using `mountSuspended`.
- `public/`: Static assets accessible directly.
- `nuxt.config.ts`: Nuxt-specific configuration (modules, CSS, etc.).
- `vitest.config.ts`: Configuration for the Vitest test runner, including multi-project support for unit and Nuxt environment tests.

## Key Commands
- **Install Dependencies:** `npm install`
- **Run Development Server:** `npm run dev` (Available at `http://localhost:3000`)
- **Run Tests:** `npm test` or `npx vitest`
- **Build for Production:** `npm run build`
- **Preview Production Build:** `npm run preview`

## Development Conventions
- **Composition API:** Always use `<script setup lang="ts">` in Vue components.
- **Testing:** New features or bug fixes should be accompanied by tests in `test/nuxt/`. Use `mountSuspended` for testing components that require a Nuxt environment.
- **Styling:** Custom styles are managed in `app/assets/css/main.css`. Avoid adding inline styles where possible.
- **Lucide Icons:** Use `lucide-vue-next` for iconography.
- **Nuxt 4 Transition:** The project is configured with a `compatibilityDate` of `2025-07-15`, indicating preparation for Nuxt 4 features.

## Future Interactions
When performing tasks in this repository:
1.  **Context:** Refer to `app/pages/` for existing route logic and `app/layouts/` for global UI structure.
2.  **Test-driven Development (TDD) skill use:** Prioritize writing tests in `test/nuxt/` and `test/` before or alongside implementation.
3.  **Nuxt Modules:** Check `nuxt.config.ts` before adding new dependencies to ensure they are properly integrated.

# Additional Coding Preferences:
- Do not use semicolons for any JavaScript/TypeScript.
- Do not use Tailwind classes in compenet templates.
- Keep project dependencies minimal.
- Use relative imports and NOT a path alias.