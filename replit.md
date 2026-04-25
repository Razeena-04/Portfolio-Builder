# Workspace

## Overview

Personal portfolio website for **Razeena R** — AI & Data Science student and full-stack developer.

Built as a single-page vanilla **HTML / CSS / JavaScript** site (no UI frameworks), inside the pnpm monorepo. Vite is used only as the dev server / static bundler.

## Stack

- **Monorepo tool**: pnpm workspaces
- **Node.js version**: 24
- **Package manager**: pnpm
- **Portfolio (`artifacts/portfolio`)**: vanilla HTML, CSS, JS, served via Vite
- **TypeScript version**: 5.9 (used by other workspace packages, not the portfolio)

## Portfolio features

- 2 themes — Dark (default, indigo accent) and Peacock Blue — toggled from the navbar dropdown and persisted in `localStorage`
- Glassmorphism cards, smooth scroll, sticky navbar with active-link highlighting
- Animated reveal on scroll, animated skill bars, typewriter hero subtitle
- Project / experience / certification sections built from real data
- Contact form opens the user's mail client with the message pre-filled
- "Download Resume" button generates a printable resume page on the fly
- Fully responsive (mobile + desktop)

## Key files (portfolio)

- `artifacts/portfolio/index.html` — full page markup
- `artifacts/portfolio/src/style.css` — themes (CSS variables) + all styling
- `artifacts/portfolio/src/script.js` — theme switcher, animations, form, etc.

## Key Commands

- `pnpm run typecheck` — full typecheck across all packages
- `pnpm run build` — typecheck + build all packages
