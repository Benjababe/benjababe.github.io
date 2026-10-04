# AGENTS.md — Portfolio Upgrade Guide

> Living document of possible improvements for [benjababe.github.io](https://benjababe.github.io). Organised by priority and complexity.

---

## 🟢 Quick Wins (Low Effort, High Impact)

### 1. Fix PWA Manifest
- `public/manifest.json` still says `"Create React App Sample"` — update name/description to match the portfolio.
- Add a larger icon (192×192 / 512×512 PNG) so the site installs properly on mobile.

### 2. Structured Data (JSON-LD)
- Add `Person` and `WebSite` JSON-LD to `index.html` for better Google/SEO understanding. This helps your name, role, and links appear in rich results.

```html
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "Person",
  "name": "Benjamin Goh",
  "url": "https://benjababe.github.io",
  "jobTitle": "Backend Developer",
  "email": "bengohzy@gmail.com",
  "sameAs": [
    "https://github.com/Benjababe",
    "https://www.linkedin.com/in/benjamin-goh-978201227/"
  ],
  "alumniOf": [
    { "@type": "CollegeOrUniversity", "name": "Nanyang Technological University" },
    { "@type": "CollegeOrUniversity", "name": "Temasek Polytechnic" }
  ]
}
</script>
```

### 3. Add a Contact Section / Form
- Currently the only CTA is an email link. Add a small `<section id="contact">` with:
  - A simple contact form (Name, Email, Message) wired to `mailto:` or a service like Formspree / Netlify Forms.
  - Or at minimum, a prominent "Get in Touch" button that stands out more than the current social icons.

### 4. Add a Blog Section
- A `/blog` route (or dedicated section) with technical write-ups from your work at DSNE, Seer, FoodLine, or hobby projects.
- Even a few markdown-driven posts dramatically increase SEO value and show depth.

### 5. Improve `rel` on External Links
- All external links already use `target="_blank"` and `rel="noreferrer"`. Add `noopener` as well:
  ```html
  <a ... rel="noopener noreferrer">
  ```
  This prevents the "tabnabbing" security issue in older browsers.

---

## 🟡 Medium Effort (Notable UX / Feature Gains)

### 6. Add Project Screenshots / Demos
- Every project currently has links but no visual preview.
- For each `ProjectEntry`:
  - Add a thumbnail/screenshot image.
  - Consider embedding a short Loom/Vimeo demo video for interactive projects (MultiAI Playground, Multiplayer Self Driving).
- This greatly increases engagement — people want to *see* what you built.

### 7. Contact Form with Client-Side Validation
- Build a `<ContactForm />` component with:
  - HTML5 validation + React state for real-time feedback.
  - Integration with Formspree, Getform, or EmailJS (no backend needed).
  - Success/error toast notifications.

### 8. Theme Toggle (Dark / Light Mode)
- The current CSS only has a dark theme. Add a toggle in the header:
  ```tsx
  const [theme, setTheme] = useState<'dark' | 'light'>(
    () => (localStorage.getItem('theme') as 'dark' | 'light') || 'dark',
  );
  ```
  - Use CSS custom properties (`--bg`, `--text`, etc.) scoped to `[data-theme="..."]`.
  - Respect `prefers-color-scheme` on first visit.
  - Persist choice in `localStorage`.

### 9. Accessibility (A11y) Improvements
| Issue | Fix |
|---|---|
| Scroll-based active nav has no keyboard focus | Add `tabIndex={0}` and `onKeyDown` to header nav items |
| `aria-current="page"` missing on active nav | Set when `activeCategory === hRef.name` |
| SVG icons have no accessible text | Add `<title>` inside each icon component or `aria-label` |
| Expand/collapse projects lacks ARIA | Use `<button aria-expanded={expandProjects}>` + `aria-controls="projects-list"` |
| Skills list missing role | Add `role="list"` on skill containers (already has `aria-label`) |
| No skip-link for keyboard users | Add a hidden "Skip to main content" anchor link at top of `App.tsx` |

### 10. Respect `prefers-reduced-motion`
- AOS animations look great but some users prefer no motion. Wrap the `Aos.init()` call:
  ```ts
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (!prefersReducedMotion) {
    Aos.init({ duration: 1000, once: true });
  }
  ```

### 11. Lazy-Load Images
- Your pet sprite sheets, mugshot, and project images load immediately. Add `loading="lazy"` to all `<img>` tags not in the initial viewport (especially project thumbnails, Kuma images, pet sprites).
- Consider using `loading="eager"` only for above-the-fold content.

### 12. Service Worker / Better PWA
- Currently the manifest exists but there's no service worker registered.
- Use Vite's built-in SW support via a plugin:
  - Install `vite-plugin-pwa` and register a workbox-based service worker for offline/caching.
  - This would enable offline-first, push notifications, and installability improvements.

---

## 🟠 Advanced (Significant Architecture / Feature Work)

### 13. Multi-Language Support (i18n)
- You already internationalised NTUMoons — apply the same pattern here.
- Use `react-i18next` or `next-intl` to support English + Mandarin/Singlish.
- Add a language toggle in the header.

### 14. Skills Proficiency Visualization
- Currently skills are displayed as equal-sized icons. Add proficiency levels:
  - Rating scale (Expert / Proficient / Familiar) with visual indicators.
  - Or group into categories: Languages, Frameworks, DevOps, Databases, etc.
  - This helps recruiters quickly scan your actual depth vs breadth.

### 15. Blog with Markdown Support
- Convert blog posts to MDX or use a static markdown approach.
- Options:
  - **mdx-bundler** — compile MDX at build time with Vite.
  - **VitePress / Astro** — consider migrating the site to Astro (islands architecture) for even better performance while keeping React components.
- Add syntax highlighting, reading time estimates, and a table of contents for longer posts.

### 16. Performance Optimisations
| Area | Current | Suggestion |
|---|---|---|
| Bundle size | No tree-shaking analysis | Run `vite-bundle-visualizer` to identify bloat |
| AOS import | Full library loaded | Only the animation utilities you need, or switch to CSS-only animations |
| Skill icons | ~60+ SVGs imported | Sprite sheet or icon font for batched requests |
| Pet sprites | GIF files (~15 files) | Convert to WebP sprite sheet with CSS animation |
| Resume PDF | Inline loaded | Add `loading="lazy"` and consider a thumbnail preview |

### 17. Test Coverage
- Currently using `@testing-library/react` but no tests exist in the repo.
- Add vitest + testing library setup:
  - Unit test utility functions (`matomo.ts`, scroll helpers).
  - Component tests for Header active-section logic, Project expand/collapse state.
  - E2E with Playwright for critical paths (nav scroll, contact form, theme toggle).

### 18. CMS Integration / Headless Content
- Currently all content (projects, experience, education) is hardcoded in TSX components.
- Move to a headless CMS (Sanity, Contentful, or even GitHub-backed Decap CMS):
  - Enables non-developers to update content.
  - Blog posts, projects, and resume entries become editable.
  - Keeps the React/Vite build fast (content is fetched at build time via ISR).

### 19. Analytics Dashboard Enhancements
- Matomo is configured but basic. Add:
  - Event tracking for skill icon hover/click (which skills get most attention).
  - Time-on-page per section (already throttled, good start).
  - Custom dimension for device type / browser.
  - Funnel: landing → scroll to projects → click GitHub → click LinkedIn.

### 20. Easter Eggs & Delight
Your portfolio already has pets — lean into that! Ideas:
- **Konami Code**: ↑↑↓↓←→←→BA triggers a rainbow mode or spawns a puppy army.
- **Pet interactions**: Clicking on the pet sprites makes them do something (jump, play dead).
- **Terminal easter egg**: Typing `?` or `/help` in the URL shows hidden dev tips.
- **Seasonal theme**: Automatic Halloween pumpkin or Christmas snow overlay.
- **Secret project**: A hidden 4th nav item (e.g., "Pets" → `/pets`) linking to your sprite art gallery.

---

## 🔵 Long-Term / Strategic

### 21. Migrate to Astro
- Your site is essentially a static portfolio with React sprinkled in for interactivity.
- **Astro** would give you:
  - Zero JS by default (only hydrate interactive components).
  - Built-in MDX for blog posts.
  - Better initial load performance (smaller bundle).
  - Same React components where needed (pets, drag demos).

### 22. Add a Resume / CV Download Counter
- Track how many times your resume PDF is downloaded in Matomo as a conversion event.
- Display "Downloaded X times" as social proof.

### 23. Open Graph & Social Sharing
- Ensure `og:image`, `og:title`, `og:description`, and `twitter:card` meta tags exist in `index.html`.
- This controls how your link looks when shared on LinkedIn, Twitter, Discord, etc.

### 24. Code Documentation / Developer Notes
- Add JSDoc comments to utility functions (`matomo.ts`, scroll helpers).
- Consider a `/dev` route or `DEVELOPER.md` explaining:
  - Build commands, deployment pipeline (gh-pages), Lighthouse CI setup.
  - How to add new skill icons (already documented in README — consider moving here).
  - Environment variable setup (`VITE_MATOMO_ENABLED`).

### 25. Automated Visual Regression Testing
- Add Playwright visual tests to catch unexpected layout shifts.
- Run on PRs before deploy — ensures new CSS doesn't break the pixel-perfect dark theme.

---

## 📋 Quick Checklist

Use this as a priority tracker:

| # | Task | Priority | Status |
|---|---|---|---|
| 1 | Fix PWA manifest | High / Low-effort | ☐ |
| 2 | Add JSON-LD structured data | High / Low-effort | ☐ |
| 3 | Contact section/form | High / Medium | ☐ |
| 4 | Blog section | High / Medium | ☐ |
| 5 | Add `noopener` to external links | High / Low-effort | ☐ |
| 6 | Project screenshots/demos | Medium / Medium | ☐ |
| 7 | Contact form with validation | Medium / Medium | ☐ |
| 8 | Dark/Light theme toggle | Medium / Medium | ☐ |
| 9 | Accessibility improvements | High / Medium | ☐ |
| 10 | `prefers-reduced-motion` support | Medium / Low-effort | ☐ |
| 11 | Lazy-load images | Medium / Low-effort | ☐ |
| 12 | Service Worker / PWA | Medium / Medium | ☐ |
| 13 | Multi-language (i18n) | Low / Advanced | ☐ |
| 14 | Skills proficiency visualization | Low / Medium | ☐ |
| 15 | Blog with markdown/MDX | Medium / Advanced | ☐ |
| 16 | Performance optimisations | High / Advanced | ☐ |
| 17 | Test coverage (vitest + Playwright) | Medium / Advanced | ☐ |
| 18 | Headless CMS integration | Low / Advanced | ☐ |
| 19 | Analytics dashboard enhancements | Low / Medium | ☐ |
| 20 | Easter eggs & delight | Low / Fun | ☐ |
| 21 | Migrate to Astro | Strategic / Advanced | ☐ |
| 22 | Resume download counter | Low / Medium | ☐ |
| 23 | OG/social sharing meta tags | Medium / Low-effort | ☐ |
| 24 | Developer docs | Low / Low-effort | ☐ |
| 25 | Visual regression testing | Low / Advanced | ☐ |

---

*Last updated: 2026-01-15*
