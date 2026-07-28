---
name: web-design-guidelines
description: Web Interface Guidelines for UI code review, accessibility, semantic HTML, visual consistency, and modern design compliance.
---

# Web Interface Guidelines Skill

Compliance guidelines for clean code structure, accessibility, visual design, and user experience.

## 1. Semantic HTML & Structure
- Use explicit HTML5 tags (`<header>`, `<nav>`, `<main>`, `<section>`, `<article>`, `<footer>`).
- Ensure every page or top view has exactly one `<h1>` heading.
- Provide descriptive `aria-label` and `id` attributes for interactive buttons, tabs, input fields, and modal dialogs.

## 2. Touch & Interaction Targets
- All buttons, links, tab items, and dropdown triggers must meet minimum size standards (44x44px touch target).
- Explicit hover and focus states for all interactive UI elements.
- Loading and processing spinners for async actions (e.g. form submission, file uploads, PDF rendering).

## 3. Responsive & Performance Best Practices
- Fast image and font loading with preconnect links and Google Fonts optimization.
- Fluid typography and grid systems using CSS Flexbox / Grid.
- Clean component separation for UI elements (Navbar, Hero, CourseCard, LibraryViewer, StudentPortal, AdminPortal, Footer).
