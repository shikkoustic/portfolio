# Portfolio — Design Direction

## References
- **Structure/interaction model:** vranchsinha.vercel.app — distinct, self-contained sections,
  each with its own color treatment / gimmick (draggable cards, polaroid stickers, street-sign
  "direction" cards, receipt-style footer that recaps the whole page).
- **Visual language:** "OldSoul Construction" (Dribbble ref) — cream/off-white base, near-black
  ink text, bold condensed display type for headlines, boxed two-line wordmark logo, minimal
  pill nav, small bracket `{ }` and parenthetical `( )` annotations, diagonal `\\` accent marks,
  pill CTA buttons, small inset photography.

## Palette
- `--cream: #F3EFE6` page background
- `--cream-2: #EAE4D6` card/section alt background
- `--ink: #15130F` near-black text
- `--ink-soft: #4A463D` secondary text
- `--line: #D8D0BE` hairline borders
- Per-project accent (used only inside that project's card + its section glow):
  - CricLens — `#2F5233` (pitch green)
  - BaseCase — `#2A4FD6` (electric indigo)
  - ResumeForge AI — `#C17A2E` (warm amber/paper)
  - AI Assistant — `#6C4FD6` (violet)
  - Vayu (AQI) — `#2F8FB5` (sky blue)

## Type
- Display: **Archivo** (black/expanded, condensed-feeling at large sizes) — headlines, nav wordmark.
- Body: **Inter** — paragraphs, labels.

## Section map (one page, scroll-driven)
1. **Hero** — boxed wordmark + pill nav, big headline, "{ }" + "( 2026 )" motifs, CTA pill.
2. **Selected Work** — 5 draggable/scroll project cards, each its own accent glow + live link.
3. **About** — bio, inset photo, diagonal accents.
4. **Direction** — roles/activities as street-sign draggable cards (SIH teams, DSA Club, Amazon ML).
5. **Stack** — tech/tool marquee strip.
6. **Contact** — cream "receipt" footer recapping the page, ending in email/GitHub/resume links.

## Motion
- Framer Motion scroll-reveals (fade + rise) per section.
- Draggable horizontal card rows (work + direction) with spring physics.
- Hover glow on project cards using per-project accent.
- Marquee for stack strip, CSS keyframe, pauses on hover.
