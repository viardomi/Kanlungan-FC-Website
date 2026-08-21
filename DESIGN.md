---
name: Kanlungan Football Club
description: Chase progress, not perfection.
colors:
  ink: "#0b0b0a"
  ink-soft: "#1b1b18"
  paper: "#f4f0e6"
  paper-2: "#e2dbcd"
  white: "#fffdf6"
  yellow: "#f6c400"
  yellow-soft: "#ffdf58"
  green: "#174a37"
  green-soft: "#d8e3d8"
  muted: "#635f53"
  error: "#b52f26"
typography:
  display:
    fontFamily: "Sora, Arial, sans-serif"
    fontSize: "clamp(3.5rem, 8vw, 6.875rem)"
    fontWeight: 600
    lineHeight: 1.02
    letterSpacing: "-0.055em"
  headline:
    fontFamily: "Sora, Arial, sans-serif"
    fontSize: "clamp(2.4rem, 5vw, 4.25rem)"
    fontWeight: 600
    lineHeight: 1.02
    letterSpacing: "-0.055em"
  title:
    fontFamily: "Sora, Arial, sans-serif"
    fontSize: "2rem"
    fontWeight: 600
    lineHeight: 1.02
    letterSpacing: "-0.05em"
  body:
    fontFamily: "DM Sans, Arial, sans-serif"
    fontSize: "1rem"
    fontWeight: 400
    lineHeight: 1.55
  label:
    fontFamily: "DM Sans, Arial, sans-serif"
    fontSize: "0.6875rem"
    fontWeight: 700
    lineHeight: 1.2
    letterSpacing: "0.12em"
rounded:
  hairline: "2px"
spacing:
  xs: "8px"
  sm: "13px"
  md: "16px"
  lg: "24px"
  xl: "48px"
  section: "112px"
components:
  button-primary:
    backgroundColor: "{colors.yellow}"
    textColor: "{colors.ink}"
    rounded: "{rounded.hairline}"
    padding: "0 19px"
    height: "46px"
  button-outline:
    backgroundColor: "transparent"
    textColor: "{colors.ink}"
    rounded: "{rounded.hairline}"
    padding: "0 19px"
    height: "46px"
  text-link:
    textColor: "{colors.ink}"
    typography: "700 13px DM Sans, Arial, sans-serif"
  field:
    backgroundColor: "{colors.paper}"
    textColor: "{colors.ink}"
    rounded: "{rounded.hairline}"
    padding: "10px 12px"
    height: "44px"
---

# Design System: Kanlungan Football Club

## Overview

**Creative North Star: "The Weekend Touchline"**

Kanlungan's visual system feels like the edge of a real community pitch on a weekend: direct, warm, energetic, and grounded. It uses an editorial composition rather than a generic sports template. Large typographic statements, crisp rules, field-line geometry, and documentary club imagery make the work feel official without becoming corporate.

The atmosphere is intentionally restrained. Black and warm paper create the base, yellow marks action and optimism, and green carries the pitch, progress, and community roles. Surfaces are mostly flat, spacing is generous, corners are nearly square, and motion is purposeful rather than loud. The official crest is treated as the club's identity anchor and is never replaced with a fabricated mark.

**Key Characteristics:**
- Editorial football-club identity with a clear information hierarchy.
- Warm, family-oriented tone with confident matchday energy.
- Flat tonal surfaces, hairline rules, and rare accent color.
- Real club imagery with descriptive alt text and youth-photo privacy guidance.

## Colors

The palette is a quiet warm-neutral canvas with three controlled identity signals: ink for authority, yellow for action, and field green for growth and community.

### Primary
- **Matchday Yellow** (#f6c400): Primary action, key labels, progress moments, and the visual spark against ink and green.
- **Field Green** (#174a37): Training, achievements, sponsor/community surfaces, and the club's development story.

### Secondary
- **Warm Sunlight** (#ffdf58): Hover and softer yellow states where the primary accent needs a little more air.

### Neutral
- **Touchline Ink** (#0b0b0a): Header, hero, footer, media surfaces, and high-emphasis type.
- **Warm Paper** (#f4f0e6): Main reading canvas and light form surfaces.
- **Paper Shadow** (#e2dbcd): Page heroes and softly separated sections.
- **White Paper** (#fffdf6): Card surfaces inside tinted sections.
- **Quiet Text** (#635f53): Supporting copy and secondary metadata.
- **Error Red** (#b52f26): Form validation only.

### Named Rules
**The Three Signal Rule.** Yellow is the action signal, green is the community signal, and ink is the authority signal. Do not let all three compete equally in a single component.

## Typography

**Display Font:** Sora (with Arial, sans-serif)
**Body Font:** DM Sans (with Arial, sans-serif)
**Label/Mono Font:** DM Sans in uppercase with tracked spacing.

**Character:** Sora gives headlines a compact, contemporary sports-editorial voice. DM Sans keeps family logistics, form labels, and announcements exceptionally readable on small screens.

### Hierarchy
- **Display** (600, `clamp(56px, 8vw, 110px)`, 1.02): Hero message and page-level statements.
- **Headline** (600, `clamp(38px, 5vw, 68px)`, 1.02): Section introductions and major CTAs.
- **Title** (600, around 32px, 1.02): Cards, team rows, and achievement titles.
- **Body** (400, 16–18px, 1.55): Explanatory copy, updates, and family-facing content, kept to comfortable reading widths.
- **Label** (700, 9–13px, tracked, often uppercase): Navigation context, metadata, indexes, and utility information.

### Named Rules
**The Headline / Human Copy Rule.** Let Sora carry the statement; let DM Sans carry the explanation. Never make a logistics paragraph fight a display headline.

## Layout

The page uses a centered shell capped at 1180px, with a 24px minimum outer gutter on desktop and tighter 20px gutters on mobile. Sections are spacious at roughly 112px vertical padding, with hairline rules and tonal backgrounds doing the work of visual grouping.

Desktop layouts favor asymmetric editorial grids: hero copy beside a photographic field panel, three-column program and update groups, and two-column contact/sponsor compositions. At tablet and mobile widths, these collapse into one readable flow. Navigation becomes a compact menu, cards stack or use two columns, and field lines remain decorative without forcing horizontal overflow.

## Elevation & Depth

This is a flat-by-default system. Depth comes from ink/paper/green tonal changes, real photography with dark overlays, hairline borders, and occasional responsive movement. Shadows are reserved for the hero ball and small interaction cues; cards should not float like a dashboard.

### Shadow Vocabulary
- **Hero object** (`0 18px 36px rgba(0,0,0,.2)`): Gives the football graphic a tactile focal point.
- **Interactive lift** (`translateY(-2px)`): A restrained hover cue for buttons, never a permanent card shadow.

### Named Rules
**The Flat-By-Default Rule.** If a boundary can be communicated with a tonal surface or a line, do not add a shadow.

## Shapes

The form language is crisp and almost square: the shared radius is 2px. Borders are fine and functional, often using a low-opacity ink or white line. Circular geometry is reserved for football and trust motifs such as the hero ball, dot markers, and small proof marks. Photography is clipped by its tile, not rounded into generic cards.

## Components

### Buttons
- **Shape:** Hairline corners (2px), compact and confident.
- **Primary:** Matchday Yellow with Touchline Ink text, 46px tall, 19px horizontal padding.
- **Hover / Focus:** Yellow lifts to Warm Sunlight and moves up 2px; visible yellow focus ring uses a 3px outline with 4px offset.
- **Secondary / Ghost:** Transparent ink outline in light contexts; text links remain borderless and gain yellow on hover.

### Cards / Containers
- **Corner Style:** 2px where a boundary is needed; avoid decorative rounding.
- **Background:** White Paper, Touchline Ink, Field Green, or a purposeful tinted section surface.
- **Shadow Strategy:** Flat at rest; use tonal contrast and borders first.
- **Border:** One-pixel rule for structure, not ornament.
- **Internal Padding:** 25–27px on desktop cards, reduced proportionally on mobile.

### Inputs / Fields
- **Style:** Warm Paper fill, 1px muted border, 2px radius, 44px minimum height; textarea expands to at least 108px.
- **Focus:** Ink border plus a 3px translucent yellow ring with a 4px offset.
- **Error / Disabled:** Error Red border for invalid fields; disabled actions visibly reduce opacity and remove lift.

### Navigation
- **Style:** Sticky Touchline Ink bar with crest, compact Sora brand treatment, DM Sans links, and a yellow registration action.
- **States:** Muted paper links at rest, yellow underline on hover/active, high-contrast visible keyboard focus.
- **Mobile:** Links collapse into an accessible menu toggle; keep the registration action easy to find.

### Field Panel

The signature hero panel is a photographic pitch with a restrained dark overlay, thin field markings, short uppercase metadata, and a graphic ball motif. It should feel like a matchday artifact, not a decorative background. Preserve the panel's readable contrast and remove or simplify its motion for reduced-motion users.

## Do's and Don'ts

### Do:
- **Do** keep the crest prominent and use the supplied `KanlunganCrest.svg` as the identity source.
- **Do** reserve Matchday Yellow for action, highlights, and meaningful progress signals.
- **Do** use Field Green to connect sections to training, achievement, and community.
- **Do** keep headlines compact, left-aligned, and editorially direct.
- **Do** protect mobile readability, focus states, and youth-photo privacy notices.
- **Do** prefer confirmed facts and honest empty/integration states over invented content.

### Don't:
- **Don't** turn every surface yellow or green; the neutral canvas is part of the identity.
- **Don't** use generic pill-heavy sports UI, oversized gradients, or dashboard-like floating cards.
- **Don't** fabricate coach names, player rosters, fees, schedules, tournament facts, or a replacement crest.
- **Don't** let animation compete with registration, schedules, results, or family logistics.
