# Design Document: Portfolio Version 2 - "Quiet Quantum" (Hyper-minimalist)

**Date:** 2026-03-30  
**Project:** My Portfolio v2  
**Theme:** Hyper-minimalist / Quiet Quantum

## Overview
A complete visual overhaul of the portfolio focusing on extreme minimalism, high-contrast typography, and refined spatial interactions. The "Quiet Quantum" aesthetic preserves the technical "hacker" identity while elevating it to a premium, Swiss-inspired design.

## Core Principles
1. **Ruthless Simplification:** Remove all non-essential decorative layers (heavy glows, dense grids, complex 3D objects).
2. **Text-Backed Identity:** Maintain the character-based profile image as a subtle "ghost" background.
3. **Physical Interactions:** Use GSAP and Framer Motion for spring-based physics and organic scroll-driven depth.
4. **Monochromatic Focus:** A strict `#030308` (Deep Space) and `#FFFFFF` (Stark White) palette, with `#38BDF8` (Sky Blue) reserved for interaction points.

## Architecture & Tech Stack
* **Framework:** Next.js 14 (App Router).
* **Styling:** Tailwind CSS (Vanilla CSS for custom masks/filters).
* **Animations:**
    * **GSAP + ScrollTrigger:** For performance-critical background parallax and image scaling.
    * **Framer Motion:** For declarative UI transitions (entry/exit) and spring-based micro-interactions.
* **Content:** All text content remains decoupled from the UI layer to ensure ease of updates.

## UI/UX: The "Quiet Quantum" Experience

### 1. Palette & Typography
* **Background:** Solid `#030308`.
* **Headings:** Poppins (Light/ExtraLight) with aggressive tracking (`tracking-tighter`). Large font sizes (e.g., `text-[15vw]`) used as structural elements.
* **Body:** Inter/Poppins (Regular) with increased line-height for maximum legibility.
* **Accents:** `#38BDF8` used for buttons, links, and active nav states.

### 2. The "Textback" Background Integration
* **Implementation:** The `bw-elijah.png` image will be rendered with `mix-blend-mode: luminosity` and an opacity of `0.15`.
* **Behavior:** Using GSAP, the image will subtly scale from `1.1` to `1.0` as the user scrolls, creating a "lens" effect that pulls the user into the content.

## Component Strategy

### Hero Section
* **Visual:** Minimalist typography ("ELIJAH ORTEGA") centered, with the `HackerText` effect appearing only on initial page load.
* **Interaction:** A single, high-contrast "View Projects" button with a spring-based hover effect.

### About Section
* **Layout:** Two-column grid with extreme whitespace. The "textback" profile image subtly visible behind the text.
* **Focus:** Biography and core philosophy presented as a clean reading experience.

### Projects Section
* **UI:** A vertical list of projects. On hover, a project's details (image/description) "reveal" with a smooth spring animation. No complex cards; just raw, high-quality typography.

### Skills & Education
* **UI:** A simple, high-density grid using icons from `lucide-react` in monochrome, turning to `#38BDF8` only on hover.

## Implementation Workflow
1. **Isolation:** Create a new branch `feature/v2-quiet-quantum` using `git worktree`.
2. **Global Styles:** Update `globals.css` with the new palette and typography settings.
3. **Core Layout:** Redefine `layout.js` and `page.js` to establish the new minimal structure.
4. **Component Refinement:** Surgically refactor each component (Hero, About, Projects) to match the new aesthetic.
5. **Animation Pass:** Integrate GSAP ScrollTrigger and Framer Motion spring physics.
6. **Validation:** Exhaustive cross-device and performance testing.
