---
version: alpha
name: "Geometric Monochrome Editorial"
description: "ONE CAREER ACADEMY uses a stark two-tone palette of near-black (#292929) on warm off-white (#f6f3f6) to create a bold, editorial identity. The hero is dominated by large geometric shapes. a circle and a square rendered in solid black. paired with ultra-large hairline display typography (ApocNormalHairline at 80–120px). The layout is deliberately sparse, using generous negative space as a primary design element. Three typefaces layer distinct roles: ApocNormalHairline for display, acumin-pro for UI and body, FOT-Matisse ProN / fot-matisse-pron for Japanese editorial headings, and Noto Sans JP for Japanese body text. Rounded pill shapes (60px radius) appear in interactive elements. No shadows are used; depth is achieved entirely through contrast and scale."
colors:
  pure-white: "#ffffff"
  warm-off-white: "#f6f3f6"
  ink-black: "#292929"
  mid-gray: "#939393"
  light-gray: "#cccccc"
typography:
  display-hero:
    fontFamily: "ApocNormalHairline"
    fontSize: "120px"
    fontWeight: "400"
    lineHeight: "123.6px"
    letterSpacing: "3.6px"
  display-large:
    fontFamily: "ApocNormalHairline"
    fontSize: "100px"
    fontWeight: "400"
    lineHeight: "103px"
    letterSpacing: "2px"
  display-medium:
    fontFamily: "ApocNormalHairline"
    fontSize: "80px"
    fontWeight: "400"
    lineHeight: "82.4px"
    letterSpacing: "2px"
  japanese-heading-large:
    fontFamily: "fot-matisse-pron"
    fontSize: "24px"
    fontWeight: "400"
    lineHeight: "24.72px"
    letterSpacing: "-0.576px"
  japanese-body:
    fontFamily: "FOT-Matisse ProN"
    fontSize: "18px"
    fontWeight: "400"
    lineHeight: "18px"
  ui-body-latin:
    fontFamily: "acumin-pro"
    fontSize: "18px"
    fontWeight: "400"
    lineHeight: "23.4px"
    letterSpacing: "1.6px"
  ui-label-bold:
    fontFamily: "acumin-pro"
    fontSize: "13px"
    fontWeight: "700"
    lineHeight: "13px"
  ui-caption:
    fontFamily: "acumin-pro"
    fontSize: "12px"
    fontWeight: "400"
    lineHeight: "12.36px"
  cjk-body:
    fontFamily: "Noto Sans JP"
    fontSize: "16px"
    fontWeight: "400"
    lineHeight: "16px"
  cjk-heading:
    fontFamily: "Noto Sans JP"
    fontSize: "20px"
    fontWeight: "400"
    lineHeight: "20px"
    letterSpacing: "2px"
  accent-latin:
    fontFamily: "montserrat"
    fontSize: "16px"
    fontWeight: "400"
    lineHeight: "16px"
rounded:
  pill: "60px"
  card: "20px"
  circle-top: "50% 50% 0px 0px"
spacing:
  xs: "10px"
  sm: "12px"
  md: "20px"
  lg: "32px"
  xl: "40px"
  2xl: "60px"
  3xl: "100px"
components:
  button-hover-background-overlay:
    textColor: "{colors.pure-white}"
    backgroundColor: "{colors.pure-white}"
    rounded: "{rounded.circle-top}"
    borderWidth: "0px"
    boxShadow: "none"
    padding: "0px"
    fontSize: "16px"
  content-card:
    rounded: "{rounded.card}"
    backgroundColor: "{colors.pure-white}"
    textColor: "{colors.ink-black}"
    boxShadow: "none"
    fontFamily: "FOT-Matisse ProN"
    fontSize: "18px"
    fontWeight: "400"
  footer:
    textColor: "{colors.ink-black}"
    backgroundColor: "{colors.warm-off-white}"
    borderColor: "{colors.light-gray}"
    fontFamily: "acumin-pro"
    fontSize: "12px"
    boxShadow: "none"
  hero-display-geometric-hero:
    backgroundColor: "{colors.warm-off-white}"
    textColor: "{colors.ink-black}"
    fontSize: "120px"
    fontFamily: "ApocNormalHairline"
    fontWeight: "400"
    letterSpacing: "3.6px"
    rounded: "0px"
    boxShadow: "none"
    padding: "0px"
  label-tag:
    rounded: "{rounded.pill}"
    fontFamily: "acumin-pro"
    fontSize: "13px"
    fontWeight: "700"
    textColor: "{colors.ink-black}"
    backgroundColor: "{colors.pure-white}"
    boxShadow: "none"
  navigation-link:
    textColor: "{colors.ink-black}"
    backgroundColor: "transparent"
    fontSize: "13px"
    fontFamily: "acumin-pro"
    fontWeight: "700"
    rounded: "0px"
    boxShadow: "none"
    padding: "0px"
  swiper-carousel:
    textColor: "#007aff"
    backgroundColor: "transparent"
    boxShadow: "none"
---

## Overview

ONE CAREER ACADEMY uses a stark two-tone palette of near-black (#292929) on warm off-white (#f6f3f6) to create a bold, editorial identity. The hero is dominated by large geometric shapes. a circle and a square rendered in solid black. paired with ultra-large hairline display typography (ApocNormalHairline at 80–120px). The layout is deliberately sparse, using generous negative space as a primary design element. Three typefaces layer distinct roles: ApocNormalHairline for display, acumin-pro for UI and body, FOT-Matisse ProN / fot-matisse-pron for Japanese editorial headings, and Noto Sans JP for Japanese body text. Rounded pill shapes (60px radius) appear in interactive elements. No shadows are used; depth is achieved entirely through contrast and scale.

**Signature traits:**
- Dual typeface system: Pairs ApocNormalHairline and fot-matisse-pron across the type hierarchy.
- Soft, rounded geometry: Generous corner rounding up to 60px.
- Single-accent color discipline: A neutral-led palette reserves #f6f3f6 as the lone accent.

## Colors

The palette uses 5 validated color tokens across 1 theme profile. Semantic roles stay attached to observed usage so generation agents can choose accents without inventing new color meaning.

**Semantic naming:**
- **border-text** maps to `ink-black`: Role "text" is grounded by usage context "Primary text, headings, SVG fills, borders, and all foreground elements across header, main, and footer".
- **action-background** maps to `pure-white`: Role "background" is grounded by usage context "Card surfaces, button backgrounds, swiper preloader; high-frequency surface color".
- **surface-background** maps to `warm-off-white`: Role "background" is grounded by usage context "Primary page background — a warm, slightly pinkish off-white that softens the stark black shapes".
- **border-border** maps to `light-gray`: Role "border" is grounded by usage context "Subtle dividers and border accents in footer, header, and hero zones".

### Text Scale
- **Ink Black** (#292929): Primary text, headings, SVG fills, borders, and all foreground elements across header, main, and footer. Role: text. {authored: rgb(41, 41, 41), space: rgb}
- **Mid Gray** (#939393): Secondary or muted text in footer zone. Role: text. {authored: rgb(147, 147, 147), space: rgb}

### Interactive
- **Light Gray** (#cccccc): Subtle dividers and border accents in footer, header, and hero zones. Role: border. {authored: rgb(204, 204, 204), space: rgb}

### Surface & Shadows
- **Pure White** (#ffffff): Card surfaces, button backgrounds, swiper preloader; high-frequency surface color. Role: background. {authored: rgb(255, 255, 255), space: rgb}
- **Warm Off-White** (#f6f3f6): Primary page background — a warm, slightly pinkish off-white that softens the stark black shapes. Role: background. {authored: rgb(246, 243, 246), space: rgb}

## Typography

Typography uses ApocNormalHairline, fot-matisse-pron, FOT-Matisse ProN, acumin-pro, Noto Sans JP, montserrat across extracted hierarchy roles. Keep hierarchy mapped to these token rows before adding decorative type styles.

Mixes ApocNormalHairline and fot-matisse-pron and FOT-Matisse ProN and acumin-pro and Noto Sans JP and montserrat for visual contrast. Weight range spans regular, bold. Sizes range from 12px to 120px.

### Font Roles
- **Headline Font**: ApocNormalHairline
- **Body Font**: ApocNormalHairline

### Type Scale Evidence
| Role | Font | Size | Weight | Line Height | Letter Spacing | Stack / Features | Notes |
|------|------|------|--------|-------------|----------------|------------------|-------|
| Largest hero display text; ultra-thin hairline weight creates dramatic typographic contrast | ApocNormalHairline | 120px | 400 | 123.6px | 3.6px | ApocNormalHairline, sans-serif | Extracted token |
| Secondary hero display and section titles in Latin script | ApocNormalHairline | 100px | 400 | 103px | 2px | ApocNormalHairline, sans-serif | Extracted token |
| Tertiary display headings | ApocNormalHairline | 80px | 400 | 82.4px | 2px | ApocNormalHairline, sans-serif | Extracted token |
| Japanese editorial section headings; Matisse serif style | fot-matisse-pron | 24px | 400 | 24.72px | -0.576px | fot-matisse-pron, sans-serif | Extracted token |
| Japanese body and editorial text | FOT-Matisse ProN | 18px | 400 | 18px | normal | FOT-Matisse ProN | Extracted token |
| Primary Latin UI body text with generous letter-spacing | acumin-pro | 18px | 400 | 23.4px | 1.6px | acumin-pro, sans-serif | Extracted token |
| Bold labels, tags, and navigation items | acumin-pro | 13px | 700 | 13px | normal | acumin-pro, sans-serif | Extracted token |
| Small captions, metadata, and auxiliary text | acumin-pro | 12px | 400 | 12.36px | normal | acumin-pro, sans-serif | Extracted token |
| Japanese body copy and general CJK text | Noto Sans JP | 16px | 400 | 16px | normal | Noto Sans JP, sans-serif | Extracted token |
| Japanese section headings with tracked spacing | Noto Sans JP | 20px | 400 | 20px | 2px | Noto Sans JP, sans-serif | Extracted token |
| Accent Latin labels and supplementary UI text | montserrat | 16px | 400 | 16px | normal | montserrat, Hiragino Kaku Gothic ProN, Hiragino Sans, BIZ UDPGothic, Meiryo, sans-serif | Extracted token |

## Layout

Responsive system uses 3 breakpoint tier(s): mobile, tablet, desktop.

This system uses a 10px base grid with scale values 10, 12, 20, 32, 40, 60, 100.

### Responsive Strategy
- **mobile (<= 1280px)**: Constrain layout for small viewports and prioritize vertical stacking.
- **tablet (768-1280px)**: Increase spacing and column structure for medium-width viewports.
- **desktop (Unknown)**: Expand layout density and horizontal composition for wide viewports.

### Spacing System
| Token | Value | Px | Notes |
|------|-------|----|-------|
| xs | 10px | 10 | Extracted spacing token |
| sm | 12px | 12 | Extracted spacing token |
| md | 20px | 20 | Extracted spacing token |
| lg | 32px | 32 | Extracted spacing token |
| xl | 40px | 40 | Extracted spacing token |
| 2xl | 60px | 60 | Extracted spacing token |
| 3xl | 100px | 100 | Extracted spacing token |

## Elevation & Depth

Keep depth flat unless validated shadow or interaction evidence appears in the extraction payload. Do not invent shadows beyond this evidence boundary.

### Shadow Evidence
| Shadow Token | Layers | Details |
|--------------|--------|---------|
| n/a | 0 | No validated shadow payload |

### Interaction Signals
| Theme | Signal | Evidence |
|-------|--------|----------|
| Light | outline-color | rgb(41, 41, 41) ; rgb(255, 255, 255) |
| Light | outline-width | 3px |
| Light | outline-offset | 0px |
| Light | transform | matrix(1, 0, 0, 1, 0, 0) ; matrix(0.984808, -0.173648, 0.173648, 0.984808, 0, 23.3906) ; matrix(1, 0, 0, 1, 0, 18.5391) |

## Shapes

Shape language maps directly to rounded tokens. Keep component corners consistent with the role mapping below before introducing bespoke geometry.

### Radius Roles
| Token | Value | Px | Role Mapping |
|------|-------|----|--------------|
| circle-top | 50% 50% 0px 0px | 0 | Hairline corner |
| card | 20px | 20 | Card corner |
| pill | 60px | 60 | Large surface corner |

### Geometry Evidence
| Radius Token | Shape | Units |
|--------------|-------|-------|
| pill | 60px | px |
| card | 20px | px |
| circle-top | 50% 50% 0px 0px | %, px |

## Components

Components should be recreated from token references first, then tuned with variant notes and probe-backed state guidance.
- **Hero Display**: Full-viewport hero section featuring oversized geometric shapes (circle + square in solid #292929) alongside ultra-large hairline display type. The composition is asymmetric and left-anchored with vast negative space on the right.
- **Navigation Link**: Header navigation links rendered in acumin-pro with no underline by default. Uses #292929 on transparent background.
- **Button**: Pill-shaped interactive button with hover background animation. The btn-hover-bg span is a white semi-circle overlay used for hover state transitions.
- **Label Tag**: Pill-shaped category or content label using 60px border-radius, rendered in acumin-pro bold at small size.
- **Content Card**: Course or article card with 20px border-radius, featuring Japanese editorial typography (FOT-Matisse ProN) for titles and acumin-pro for metadata.
- **Swiper Carousel**: Horizontal swipe carousel (Swiper.js) used for course or content browsing. Uses --swiper-theme-color (#007aff) for navigation controls and --swiper-preloader-color (#fff) for loading state.
- **Footer**: Site footer using #292929 text on off-white background, with #939393 for secondary/muted text and #cccccc for divider lines.

### Button

**Hover Background Overlay**
- textColor: #ffffff
- backgroundColor: #ffffff
- rounded: 50% 50% 0px 0px
- borderWidth: 0px
- boxShadow: none
- padding: 0px
- fontSize: 16px
- State guidance: Probe-confirmed: span.btn-hover-bg borderRadius 50% 50% 0px 0px — a half-circle mask used for animated hover reveal. Outer button likely uses 60px pill radius from CSSOM.

### Content Card

**Default**
- rounded: 20px
- backgroundColor: #ffffff
- textColor: #292929
- boxShadow: none
- fontFamily: FOT-Matisse ProN
- fontSize: 18px
- fontWeight: 400
- State guidance: 20px radius from CSSOM (2 hits). No shadows — depth achieved via background contrast only.

### Footer

**Default**
- textColor: #292929
- backgroundColor: #f6f3f6
- borderColor: #cccccc
- fontFamily: acumin-pro
- fontSize: 12px
- boxShadow: none
- State guidance: Footer zone confirmed in ranked token evidence for #292929, #939393, and #cccccc.

### Hero Display

**Geometric Hero**
- backgroundColor: #f6f3f6
- textColor: #292929
- fontSize: 120px
- fontFamily: ApocNormalHairline
- fontWeight: 400
- letterSpacing: 3.6px
- rounded: 0px
- boxShadow: none
- padding: 0px
- State guidance: Probe-confirmed: h1.mv-title color #292929, fontSize 120px, no border, no shadow. Shapes are CSS-rendered circles and rectangles.

### Label Tag

**Default**
- rounded: 60px
- fontFamily: acumin-pro
- fontSize: 13px
- fontWeight: 700
- textColor: #292929
- backgroundColor: #ffffff
- boxShadow: none
- State guidance: 60px radius is the dominant border-radius in CSSOM (16 hits). Likely used for pill tags and category badges.

### Navigation Link

**Default**
- textColor: #292929
- backgroundColor: transparent
- fontSize: 13px
- fontFamily: acumin-pro
- fontWeight: 700
- rounded: 0px
- boxShadow: none
- padding: 0px
- State guidance: Probe-confirmed via a.mv-label-link: color #292929, fontSize 16px, padding 12px 0px 0px, no border, no shadow.

### Swiper Carousel

**Default**
- textColor: #007aff
- backgroundColor: transparent
- boxShadow: none
- State guidance: CSS variables --swiper-theme-color and --swiper-preloader-color confirmed in stylesheet. Navigation size 44px from --swiper-navigation-size.

## Do's and Don'ts

Guardrails protect Dual typeface system, Soft, rounded geometry, Single-accent color discipline without adding unsupported visual claims.

| Do | Don't |
|----|---------|
| Do maintain consistent spacing using the base grid | Don't make unsupported claims about absent visual features |
| Do maintain WCAG AA contrast ratios (4.5:1 for normal text) | Don't mix rounded and sharp corners in the same view |
| Do use the primary color only for the single most important action per screen |  |
| Do verify evidence before writing new design-system guidance |  |

## Responsive Evidence

### Breakpoints
| Name | Width | Key Changes |
|------|-------|-------------|
| Breakpoint 1 | <= 920px | (hover: hover) and (pointer: fine) and (max-width: 920px) |
| Breakpoint 2 | <= 1280px | (max-width: 1280px) |
| Tablet | 768-1280px | (min-width: 768px) and (max-width: 1280px) and (max-height: 770px) |
| Breakpoint 4 | Unknown | (hover: hover) and (pointer: fine) |

## Agent Prompt Guide

### Example Component Prompts
- Create Button variant that preserves Pill-shaped interactive button with hover background animation. The btn-hover-bg span is a white semi-circle overlay used for hover state transitions..
- Create Content Card variant that preserves Course or article card with 20px border-radius, featuring Japanese editorial typography (FOT-Matisse ProN) for titles and acumin-pro for metadata..
- Create Footer variant that preserves Site footer using #292929 text on off-white background, with #939393 for secondary/muted text and #cccccc for divider lines..

### Iteration Guide
1. Start with extracted palette and typography roles only.
2. Map spacing and radius directly from token tables before visual polish.
3. Apply component patterns one section at a time and compare against source intent.
4. Keep elevation claims tied to explicit evidence in output.
5. Iterate with smallest diffs and re-check section hierarchy after each change.
