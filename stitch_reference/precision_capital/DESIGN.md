---
name: Precision Capital
colors:
  surface: '#101419'
  surface-dim: '#101419'
  surface-bright: '#36393f'
  surface-container-lowest: '#0a0e13'
  surface-container-low: '#181c21'
  surface-container: '#1c2025'
  surface-container-high: '#262a30'
  surface-container-highest: '#31353b'
  on-surface: '#e0e2ea'
  on-surface-variant: '#bccbb9'
  inverse-surface: '#e0e2ea'
  inverse-on-surface: '#2d3136'
  outline: '#869585'
  outline-variant: '#3d4a3d'
  surface-tint: '#4ae176'
  primary: '#4be277'
  on-primary: '#003915'
  primary-container: '#22c55e'
  on-primary-container: '#004b1e'
  inverse-primary: '#006e2f'
  secondary: '#4de082'
  on-secondary: '#003919'
  secondary-container: '#00b55d'
  on-secondary-container: '#003e1c'
  tertiary: '#fabe22'
  on-tertiary: '#402d00'
  tertiary-container: '#daa300'
  on-tertiary-container: '#533c00'
  error: '#ffb4ab'
  on-error: '#690005'
  error-container: '#93000a'
  on-error-container: '#ffdad6'
  primary-fixed: '#6bff8f'
  primary-fixed-dim: '#4ae176'
  on-primary-fixed: '#002109'
  on-primary-fixed-variant: '#005321'
  secondary-fixed: '#6dfe9c'
  secondary-fixed-dim: '#4de082'
  on-secondary-fixed: '#00210c'
  on-secondary-fixed-variant: '#005227'
  tertiary-fixed: '#ffdf9f'
  tertiary-fixed-dim: '#f9bd22'
  on-tertiary-fixed: '#261a00'
  on-tertiary-fixed-variant: '#5c4300'
  background: '#101419'
  on-background: '#e0e2ea'
  surface-variant: '#31353b'
typography:
  display:
    fontFamily: geist
    fontSize: 40px
    fontWeight: '600'
    lineHeight: 48px
    letterSpacing: -0.03em
  display-mobile:
    fontFamily: geist
    fontSize: 30px
    fontWeight: '600'
    lineHeight: 36px
    letterSpacing: -0.025em
  headline-lg:
    fontFamily: geist
    fontSize: 28px
    fontWeight: '600'
    lineHeight: 34px
    letterSpacing: -0.02em
  headline-lg-mobile:
    fontFamily: geist
    fontSize: 22px
    fontWeight: '600'
    lineHeight: 28px
    letterSpacing: -0.015em
  headline-md:
    fontFamily: geist
    fontSize: 20px
    fontWeight: '500'
    lineHeight: 26px
    letterSpacing: -0.015em
  headline-sm:
    fontFamily: geist
    fontSize: 16px
    fontWeight: '500'
    lineHeight: 22px
    letterSpacing: -0.01em
  body-lg:
    fontFamily: geist
    fontSize: 15px
    fontWeight: '400'
    lineHeight: 22px
    letterSpacing: -0.005em
  body-md:
    fontFamily: geist
    fontSize: 13px
    fontWeight: '400'
    lineHeight: 18px
    letterSpacing: 0em
  body-sm:
    fontFamily: geist
    fontSize: 11px
    fontWeight: '400'
    lineHeight: 16px
    letterSpacing: 0.01em
  mono-metric-lg:
    fontFamily: jetbrainsMono
    fontSize: 24px
    fontWeight: '500'
    lineHeight: 28px
    letterSpacing: -0.02em
  mono-metric-md:
    fontFamily: jetbrainsMono
    fontSize: 14px
    fontWeight: '500'
    lineHeight: 18px
    letterSpacing: -0.01em
  label-caps:
    fontFamily: geist
    fontSize: 11px
    fontWeight: '600'
    lineHeight: 14px
    letterSpacing: 0.05em
rounded:
  sm: 0.25rem
  DEFAULT: 0.5rem
  md: 0.75rem
  lg: 1rem
  xl: 1.5rem
  full: 9999px
spacing:
  space-2xs: 0.125rem
  space-xs: 0.25rem
  space-sm: 0.5rem
  space-md: 0.75rem
  space-base: 1rem
  space-lg: 1.25rem
  space-xl: 1.5rem
  space-2xl: 2rem
  space-3xl: 3rem
  container-padding: 1.5rem
  grid-gutter: 1rem
---

## Brand & Style

The design system projects absolute financial discipline, computational clarity, and institutional quiet luxury. Crafted for discerning users managing high-velocity personal balance sheets, the interface discards decorative gimmicks, speculative neon tropes, and superfluous glass blurs in favor of hyper-refined software utility inspired by modern engineering tools and tier-one fintech dashboards.

### Personality & Emotional Tenor
- **Surgical Precision:** Every pixel, line-height increment, and boundary communicates deterministic accuracy.
- **Calm Authority:** A dark, low-reflective chassis diminishes cognitive fatigue and foregrounds fiscal data.
- **Velocity & Density:** High information density without claustrophobia, utilizing rhythmic spacing and micro-delimiters.

### Aesthetic Foundation
- **Modern Minimal Fintech:** Deep carbon backgrounds paired with razor-sharp 1px boundary lines.
- **Restrained Micro-Accents:** Vibrant emerald accents are deployed exclusively for positive yields, forward actions, and system health—never as ambient decoration.

## Colors

The palette operates on a strict functional stratification system designed for dark surfaces. Ambient illumination is completely rejected; contrast is achieved strictly via luminance steps of neutral slates and deliberate semantic indicators.

### Surface Tiers
- **Canvas Base (`#0B0F14`):** The foundational viewport floor. Carries zero structural illumination.
- **Card Surface (`#121820`):** First-tier elevations housing modular groupings, charts, and metric clusters.
- **Interactive Surface (`#171E27`):** Elevated components, hover targets, active cell selections, and dropdown overlays.
- **Structural Delimiter (`#222B36`):** Uniform 1px hairline border tone for all surfaces, dividing rules, and data grid matrices.

### Semantics & Accents
- **Primary Accent (`#22C55E`):** Represents balance growth, positive returns, active confirmations, and primary CTAs.
- **Secondary Accent (`#4ADE80`):** Used for sparkline paths, positive delta gradients, and badge hover states.
- **Negative / Outflow (`#F87171`):** Indicates spending spikes, portfolio drops, debt obligations, and destructive prompts.
- **Warning / Pending (`#FBBF24`):** Highlights escrow holds, manual review notifications, and budget thresholds (80%+).
- **Text Primary (`#F8FAFC`):** Primary numerical readouts, critical headers, and primary controls.
- **Text Muted (`#94A3B8`):** Dimension labels, timestamps, deactivated actions, and secondary descriptors.

## Typography

Typography establishes an unwavering informational hierarchy. Body and headings leverage the ultra-clean geometry of Geist, while all monetary data points, ledger amounts, basis points, and transaction identifiers are locked to tabular mono typography to maintain static columnar alignment across live data feeds.

### Tabular Formatting Rule
Every monetary figure and percentage must explicitly enable OpenType tabular digits (`font-feature-settings: "tnum" 1`). Figures must never jump, slide, or misalign during live rate refreshes.

### Type Pairing Guidance
- **Labels:** Rendered using `label-caps` in uppercase format with muted slate tone (`#94A3B8`) to provide structural section headers without competing with primary readouts.
- **Metrics:** Financial balances are paired immediately with a micro-label (`body-sm`) indicator representing period comparisons (e.g., `+2.4% vs last month`).

## Layout & Spacing

The dashboard relies on an orderly, fixed-fluid hybrid grid anchored by a 4px base increment. The interface avoids arbitrary gaps; card interiors prioritize ergonomic data density.

### Breakpoint Matrix
- **Mobile (< 768px):** Single-column stacked flow. Grid gutters collapse to `0.75rem` (`12px`), screen edge padding locked to `1rem` (`16px`). Navigation migrates to a pinned bottom tray.
- **Tablet (768px - 1024px):** 6-column fluid grid. Gutters set to `1rem` (`16px`). Side navigation collapses to an icon-only strip (64px width).
- **Desktop (> 1024px):** 12-column rigid grid with a max container constraint of `1440px`. Fixed 240px lateral navigation, with `1.25rem` (`20px`) grid gutters and `2rem` (`32px`) canvas gutters.

### Data Row Standards
All ledger rows enforce a fixed standard height of `48px` on desktop and `56px` on mobile (to preserve touch fidelity), keeping alignment rhythm uniform regardless of record count.

## Elevation & Depth

This system intentionally rejects diffuse ambient shadows and high-saturation halos. Depth is articulated exclusively through tonal stratification and perimeter micro-borders.

### Hierarchy of Depth
1. **Canvas Level (Ground):** `#0B0F14` creates an infinite ground plane absorbing all ambient visual energy.
2. **Card Paneling (Elevation 1):** Solid `#121820` bounded by a strict `1px solid #222B36` stroke. No dropshadow.
3. **Hover & Interactive Targets (Elevation 2):** Surfaces shift immediately to `#171E27`, with the perimeter stroke lifting subtly to `#2E3A49`.
4. **Floating Overlays & Menus (Elevation 3):** Solid `#171E27` bounded by `1px solid #2E3A49` accompanied by a clinical, low-spread drop shadow: `0 8px 24px -4px rgba(0, 0, 0, 0.6)`.

### Border Discipline
All cards, containers, input states, and popovers maintain a non-negotiable 1px structural boundary. There are no partial borders or omitted separator lines; dividing lines between rows must precisely match the `#222B36` token.

## Shapes

Corner curvature is standardized across the entire ecosystem. The system enforces an authentic **14px** outer corner radius for primary surfaces, scaling down proportionally for nested elements to preserve geometric harmony.

### Radius Scale
- **Cards & Primary Modules:** `14px` (`rounded-lg` contextualized to standard).
- **Interactive Controls (Buttons, Inputs):** `8px` (`rounded-md`).
- **Pills, Badges & Micro-tags:** `6px` or fully circular (`9999px`) strictly for status dot indicators.
- **Nested Inner Containers:** `8px` when set inside cards to honor concentric geometry (`14px outer - 6px padding offset ≈ 8px inner`).

## Components

### Buttons
- **Primary:** Surface `#22C55E`, text `#0B0F14` (semi-bold). No gradients. Hover shifts fill to `#4ADE80`. Active state scales subtly down (`transform: scale(0.98)`).
- **Secondary:** Surface `#121820`, border `1px solid #222B36`, text `#F8FAFC`. Hover brings background to `#171E27` and border to `#2E3A49`.
- **Ghost:** Borderless, text `#94A3B8`. Hover introduces text `#F8FAFC` and surface `#171E27`.

### Cards & Ledger Tables
- **Cards:** Background `#121820`, border `1px solid #222B36`, border-radius `14px`, internal padding `1.25rem`. Header areas feature an explicit bottom micro-border when table rows follow.
- **Ledger Rows:** Alternating backgrounds are avoided. Default state transparent; hover triggers background `#171E27` with transition duration `100ms`. Cells delimited by `1px solid #222B36` bottom borders.

### Data Chips & Status Indicators
- **Positive Delta Chip:** Surface `rgba(34, 197, 94, 0.1)`, text `#22C55E`, border `1px solid rgba(34, 197, 94, 0.2)`. Formatted as `+4.12%` with JetBrains Mono.
- **Negative Delta Chip:** Surface `rgba(248, 113, 113, 0.1)`, text `#F87171`, border `1px solid rgba(248, 113, 113, 0.2)`. Formatted as `-1.20%`.
- **Status Dot:** 6px solid circle preceding label text with appropriate semantic tint.

### Inputs & Controls
- **Text & Numerical Input:** Height `40px`, background `#0B0F14`, border `1px solid #222B36`, border-radius `8px`, typography `Geist 13px`. Focus transitions border to `#22C55E` with zero outward ring spread.
- **Checkbox:** Symmetrical `16px` box with `4px` radius. Unchecked: `#0B0F14` with `#222B36` border. Checked: `#22C55E` fill with `#0B0F14` crisp check icon.

### Financial Metric Displays
Consists of three vertical nodes:
1. Category Title (`label-caps`, `#94A3B8`).
2. Main Balance (`mono-metric-lg`, `#F8FAFC`).
3. Comparative Subtext (`body-sm`) containing the semantic delta chip and timeframe reference.