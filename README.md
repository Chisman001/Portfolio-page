# Emmanuel Chisom — Portfolio

> Personal portfolio website for Emmanuel Chisom, Full-Stack Developer & AI Specialist.

**Live site:** [https://chisman.netlify.app/](https://chisman.netlify.app/)

---

## Overview

A responsive, single-page portfolio showcasing skills, projects, and contact info. Built with plain HTML, CSS, and vanilla JavaScript, styled with Tailwind CSS via CDN.

## Features

- Animated hero section with floating dots, geometric shapes, and letter animations
- Smooth scroll navigation with mobile hamburger menu
- Scroll-triggered section and card animations via `IntersectionObserver`
- Project showcase with live demo links
- Contact section with social links (LinkedIn, GitHub, Gmail)
- Respects `prefers-reduced-motion` for accessibility

## Tech Stack

| Layer | Technology |
|-------|------------|
| Markup | HTML5 |
| Styling | Tailwind CSS (CDN), custom CSS |
| Behavior | Vanilla JavaScript (Web Animations API) |
| Hosting | Netlify |

## Project Structure

```
├── index.html      # Main single-page layout (nav, all sections)
├── script.js       # Animations, dots, mobile menu, scroll effects
├── styles.css      # Custom styles, shapes, mobile nav, motion overrides
└── .gitignore
```

## Sections

- **Home** – Hero with animated name, social links, and CTA
- **About** – Stats, frontend/backend/database skill stacks
- **AI** – LLM integration, AI APIs, and smart features overview
- **Projects** – TextileHub, Castfor, TaskFlow, Expense Tracker
- **Contact** – Message form + social links

## Projects Showcased

| Project | Description |
|---------|-------------|
| **TextileHub** | Full-stack business management dashboard |
| **Castfor** | Real-time weather app with interactive map |
| **TaskFlow** | Task management app with authentication |
| **Expense Tracker** | Personal finance tracker with live balance |

## Running Locally

No build step required — open `index.html` directly in a browser, or use a local server:

```bash
# Using VS Code Live Server (configured on port 5501)
# Or with any static file server:
npx serve .
```

## Deployment

Deployed automatically via [Netlify](https://www.netlify.com/) from the `main` branch.

## Author

**Emmanuel Chisom** — Computer Science student at Landmark University, 3+ years coding experience.

- Live Portfolio: [chisman.netlify.app](https://chisman.netlify.app/)
