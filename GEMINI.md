# FoodSmash - Gemini CLI Instructional Context

This document provides essential information for Gemini CLI to understand and interact effectively with the FoodSmash project.

## Project Overview
FoodSmash is a premium Nuxt 3 application designed to showcase unusual food combinations. It prioritizes **visual excellence** and **modern UI/UX**, utilizing a custom dark theme with sleek transitions and responsive design.

### Core Stack
- **Framework:** [Nuxt 3](https://nuxt.com/) (version 4.2.1)
- **Frontend Library:** [Vue 3](https://vuejs.org/) (Composition API)
- **Icons:** [Lucide Vue Next](https://lucide.dev/guide/packages/lucide-vue-next)
- **Testing:** [Vitest](https://vitest.dev/) & Python-based [Playwright](https://playwright.dev/python/)
- **Language:** [TypeScript](https://www.typescriptlang.org/)
- **Style:** Vanilla CSS (No Tailwind)

## Agent & Skill Integration
This project uses the `aph` tool for skill management. Skills are stored in `.agent/skills/`.
- **Active Skills:** Test-Driven Development, Systematic Debugging, UI/UX Pro Max, Clean Code, Brainstorming, and more.
- **Workflow:** Always refer to `.agent/rules/` for core development mandates.
- **Skill Usage:** Use `aph search` and `aph add` to manage specialized capabilities.

## Directory Structure
- `app/`: Primary source directory.
    - `pages/`: Route-level Vue components.
    - `layouts/`: Global application layouts.
    - `assets/css/`: Global styles (`main.css`).
- `.agent/`: AI agent configuration and skills.
    - `skills/`: Installed `aph` skills.
    - `rules/`: Mandates for agent behavior and coding standards.
- `test/`: Test suite.
    - `test/nuxt/`: Vitest component tests using `mountSuspended`.
    - `test/pill_test.py`: E2E validation script using Playwright (Python).
- `nuxt.config.ts`: Nuxt 4 compatibility and module configuration.

## Key Commands
- **Install Dependencies:** `npm install`
- **Run Dev Server:** `npm run dev`
- **Run Unit Tests:** `npm test`
- **Run Python E2E:** `python test/pill_test.py` (Requires `playwright` python package)
- **Skill Management:** `aph list --installed`, `aph search <term>`, `aph add <skill>`

## Development Conventions
- **TDD First:** Always write failing tests in `test/nuxt/` before implementation.
- **Composition API:** Strict use of `<script setup lang="ts">`.
- **Vanilla CSS:** Use custom CSS in `app/assets/css/main.css`. Avoid Tailwind and inline styles.
- **Visual Mandate:** Interfaces must feel premium. Use the established HSL/Hex palette and smooth transitions.
- **Semicolons:** Do not use semicolons in JS/TS.
- **Imports:** Use relative imports; avoid path aliases.

## Styling & Theme
The project uses a curated dark theme defined in `app/assets/css/main.css`:
- **Background:** `#1A1A2E` (Deep Navy)
- **Component BG:** `#2C2C54`
- **Primary Accent:** `#ff74ef` (Pink)
- **Secondary Accent:** `#86e5ff` (Cyan)
- **Fonts:** 'Poppins' (Sans) for body, 'Lora' (Serif) for headings.

## Future Interactions
1.  **Context:** Check `.agent/rules/web-development-rules.md` for UI/UX standards.
2.  **Verification:** Before completing a task, ensure both Vitest and (if applicable) Playwright tests pass.
3.  **New Features:** Start by brainstorming with the `brainstorming` skill and then follow the TDD workflow.