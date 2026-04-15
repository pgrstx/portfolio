# CLAUDE.md — Pranav Gupta Portfolio Site
## Master Build Instructions for Claude Code

---

## WHO YOU ARE BUILDING FOR

**Name:** Pranav Gupta  
**Email:** guptapranav2006@gmail.com  
**Phone:** +91 9873168747  
**LinkedIn:** https://www.linkedin.com/in/pgrstx  
**GitHub:** https://github.com/pgrstx  
**Role:** B.Tech CSE student at Shiv Nadar University (graduating 2028)  
**Headline:** BEL Intern – SAR Processing | State-level Roll Ball Captain | JEE Mains 92.3 Percentile  

---

## PROJECT OVERVIEW

Build a **single-page portfolio website** that:
- Is visually **striking, dynamic, and crazy-good** with a pure **black and white** color palette
- **Auto-fetches GitHub projects** via the GitHub REST API (no manual updates needed)
- Embeds LinkedIn profile badge for LinkedIn presence
- Is deployed to **GitHub Pages** at `https://pgrstx.github.io/portfolio` (repo: `pgrstx/portfolio`)
- Claude Code **commits after every logical task** (not everything at the end) and **pushes automatically**
- Each commit message describes exactly what was added

---

## CRITICAL WORKFLOW RULES FOR CLAUDE CODE

1. **Commit after every task** listed below — small, real commits with descriptive messages
2. **Push to GitHub after every commit** (`git push origin main`)
3. Never batch all changes into one commit at the end
4. Use conventional commit format: `feat:`, `style:`, `fix:`, `chore:`, `docs:`
5. After initial setup, always `git pull` before making changes
6. Deploy target is GitHub Pages — keep all paths relative, no server-side code

---

## TECH STACK

- **Framework:** Vanilla HTML + CSS + JavaScript (no build step, pure GitHub Pages compatibility)
- **Fonts:** Google Fonts — `Space Grotesk` (body) + `Space Mono` (mono/code accents)
- **Icons:** Lucide Icons (CDN) or SVG inline
- **GitHub Data:** GitHub REST API v3 (public, no auth needed for public repos)
  - Endpoint: `https://api.github.com/users/pgrstx/repos?sort=updated&per_page=30`
  - Endpoint: `https://api.github.com/users/pgrstx` (profile info)
- **LinkedIn:** LinkedIn Profile Badge widget (embedded via their official badge script)
- **Animations:** CSS keyframes + Intersection Observer API for scroll-triggered effects
- **Deployment:** GitHub Pages via `gh-pages` branch OR `main` branch root
- **Auto-refresh of GitHub data:** Client-side fetch on every page load (always fresh)

---

## DESIGN SPECIFICATION

### Color Palette (STRICT — black and white only)
```
--bg-primary:     #000000   (main background)
--bg-secondary:   #0a0a0a   (card backgrounds)
--bg-tertiary:    #111111   (subtle depth)
--border:         #1a1a1a   (borders, dividers)
--border-bright:  #333333   (hover borders)
--text-primary:   #ffffff   (headings)
--text-secondary: #a0a0a0   (body, descriptions)
--text-muted:     #555555   (placeholders, dates)
--accent:         #ffffff   (glows, highlights — white glow only)
--neon-white:     rgba(255,255,255,0.05)  (glassmorphism fills)
```

### Visual Effects Required
- **Grain/noise texture overlay** on the full page (CSS SVG filter or canvas)
- **Cursor glow** — white radial gradient follows the mouse cursor
- **Glitch text animation** on the hero name (CSS glitch effect)
- **Scanline effect** subtle horizontal lines overlay (reminiscent of CRT monitor)
- **Scroll-triggered fade+slide** animations using Intersection Observer
- **Hover states** with white border glow (`box-shadow: 0 0 20px rgba(255,255,255,0.15)`)
- **Typewriter effect** for the tagline/headline under name
- **Parallax scrolling** on hero section background elements
- **Animated grid/dot background** in hero — subtle CSS animated grid lines
- **Number counter animations** for stats (percentile, CGPA, etc.)
- **Magnetic hover** on CTA buttons (JS mouse tracking)
- **Project cards** flip or expand on hover to reveal full description
- **Terminal-style** intro block showing skills as if being typed into a terminal
- **Scroll progress bar** at top of page (thin white line)

### Layout — Single Page Sections (in order)
1. `#hero` — Full viewport, name + glitch + typewriter + CTA buttons
2. `#about` — Quick bio, education table, key stats
3. `#experience` — Timeline of internships (BEL, DRIIV)
4. `#projects` — Live-fetched GitHub repo cards (auto-updating)
5. `#skills` — Visual skill tags grouped by category
6. `#achievements` — ASME, JEE, Duke of Edinburgh, sports
7. `#connect` — LinkedIn badge + GitHub link + email CTA

---

## PERSONAL DATA (hard-coded sections)

### Education
| Degree | Board | Institute | Score | Year |
|--------|-------|-----------|-------|------|
| B.Tech CSE | Shiv Nadar University | Shiv Nadar Institute of Eminence | 7.62/10 CGPA | 2028 |
| Class XII | CBSE | Seth Anandram Jaipuria School, Ghaziabad | 93% | 2024 |
| Class X | CBSE | Amity International School Sector-6, Vasundhara | 92% | 2022 |

### Internships
**Central Research Laboratory (BEL) – GAD** | Jun 2025 – Aug 2025
- SAR Processing: Python pipelines for Sentinel-1 SAR satellite datasets
- Automated data visualization in Python and C
- Geospatial navigation apps using Copernicus satellite imagery
- UAV: QGroundControl, MAVLink, Pixhawk, drone-GCS pipelines

**DRIIV: Delhi Research Implementation and Innovation – IIT Delhi** | Dec 2024 – Jan 2025
- 200-page research report on UAV/UAS/eVTOL/UTM systems
- Technical blog at driiv.co.in
- Strategic analysis, data visualization, policy research

### Projects (hard-coded with rich descriptions — GitHub API supplements these)
1. **Circuit Designer AI** — Natural language → circuit generator. LLM API + JSON schema enforcement + RAG pipeline, Node.js backend. `github.com/pgrstx/Circuit-Designer` — Ongoing
2. **InboxWhisper** — LangGraph agentic email task manager. GPT-4o-mini, Microsoft Graph API, SQLite, LangSmith, Streamlit. `github.com/pgrstx/Inbox-Whisper-LLM-Project` — 2025
3. **StreetGPT** — Real-time multimodal AI pipeline. OpenAI Vision API, live webcam scene captioning, dynamic prompt generation. `github.com/pgrstx/StreetGPT` — 2025
4. **ASME SDC — Autonomous Nut Sorter** — All-India engineering competition, 7th place. Multi-sensor material/size classification, autonomous actuation pipeline. — 2024
5. **ClaudexSiri** — AI voice assistant for macOS replacing Siri. Python. `github.com/pgrstx/ClaudexSiri` — 2026
6. **PARL-OS** — Phase-Aware Reinforcement Learning page replacement policy. CSD 204 OS project. Python. `github.com/pgrstx/PARL-OS-Project` — 2026
7. **GestureControl** — Interactive image control via hand gestures. OpenCV + MediaPipe. `github.com/pgrstx/GestureControl` — 2025
8. **BlockChain-Project** — Basic blockchain implementation from scratch. Python. `github.com/pgrstx/BlockChain-Project` — 2024

### Skills
**AI & LLMs:** Prompt Engineering, JSON Schemas, LLM Evaluation, Response Validation, Constrained Generation, OpenAI API  
**RAG Frameworks:** LangGraph, LangChain, RAG, LangSmith, Microsoft Graph API  
**Computer Vision:** OpenCV, MediaPipe, Real-time Gesture Recognition, Landmark Detection  
**Languages:** Python, JavaScript (Node.js), C, SQL, TypeScript, HTML/CSS  
**Tools:** Git, GitHub, Jupyter Notebooks, Streamlit, SQLite, Linux, CAD, Vibe-coding  

### Achievements
- ASME SDC 2024-25: 7th place nationally, 100+ competing teams
- JEE Mains 2024: Top 7.7% of 1.2 million+ aspirants (92.3 percentile)
- Duke of Edinburgh Bronze Award (2022)
- State-level Roll Ball Captain (skating), 2019–2022
- School basketball team, 3 years
- Volunteer: Girl Up Shiv Nadar University (Human Rights), Duke of Edinburgh (Poverty Alleviation)

### Badges / Certifications
- Data Science Orientation (2026)
- AWS Cloud Foundation (2026)
- AWS Cloud Architecting (2026)

---

## GITHUB AUTO-SYNC SPECIFICATION

The Projects section must:
1. On page load, call `https://api.github.com/users/pgrstx/repos?sort=updated&per_page=30`
2. Filter out repos named `pgrstx` (profile readme), `portfolio`, `dums-editorial`, `just-dums` (not relevant)
3. For each repo, display:
   - Repo name (formatted, replace hyphens with spaces, Title Case)
   - Description (from API, fall back to hard-coded descriptions above if API description is empty)
   - Primary language with colored dot
   - Star count + fork count
   - Last updated date (formatted as "Apr 2026")
   - Link to GitHub repo
4. Hard-coded projects (Circuit Designer, InboxWhisper, etc.) should appear FIRST, then remaining GitHub repos
5. Show a "Loading..." skeleton state while fetching
6. Handle API rate limiting gracefully (show cached/static data if API fails)
7. Add a subtle "Live from GitHub" indicator with a pulsing green dot... wait, no green — use a pulsing white dot

---

## GITHUB PAGES DEPLOYMENT SETUP

```bash
# One-time setup Claude Code must do:
git init
git remote add origin https://github.com/pgrstx/portfolio.git
# Create repo via GitHub CLI:
gh repo create pgrstx/portfolio --public --description "Personal portfolio — auto-syncs with GitHub"
# Enable GitHub Pages from main branch root in repo settings:
gh api repos/pgrstx/portfolio/pages --method POST --field source[branch]=main --field source[path]=/
```

The site lives at `index.html` in the root. No build step. GitHub Pages serves directly.

---

## TASK LIST (Execute in order, commit after each)

### PHASE 1 — Project Setup
- [ ] **Task 1.1** — `git init` in `/Users/pranavgupta/Portfolio`, create `.gitignore`, create `gh repo create pgrstx/portfolio --public`, set remote, initial commit: `chore: initialize portfolio repository`
- [ ] **Task 1.2** — Create folder structure: `index.html`, `css/style.css`, `css/animations.css`, `js/main.js`, `js/github.js`, `js/effects.js`, `assets/` — commit: `chore: scaffold project structure`
- [ ] **Task 1.3** — Set up GitHub Pages: push to main, enable Pages via `gh` CLI — commit: `chore: enable GitHub Pages deployment`

### PHASE 2 — Base HTML & CSS Foundation
- [ ] **Task 2.1** — Write full `index.html` skeleton: all sections with semantic HTML, correct IDs, meta tags, OG tags, Google Fonts import, Lucide icons CDN — commit: `feat: add base HTML structure with all sections`
- [ ] **Task 2.2** — Write `css/style.css`: CSS variables, reset, typography, base layout, grid system, responsive breakpoints — commit: `style: add base CSS variables, typography, layout`
- [ ] **Task 2.3** — Style the navigation: fixed top nav, scroll-aware (becomes opaque after 50px scroll), hamburger for mobile — commit: `feat: add responsive navigation bar`

### PHASE 3 — Hero Section
- [ ] **Task 3.1** — Build hero section HTML+CSS: full viewport, name in huge type, subtitle — commit: `feat: add hero section layout`
- [ ] **Task 3.2** — Implement animated CSS grid background in hero (moving dot grid or line grid) — commit: `style: add animated grid background to hero`
- [ ] **Task 3.3** — Add glitch text effect on "Pranav Gupta" (CSS keyframe animation with clip-path/transform distortions) — commit: `feat: add glitch animation on hero name`
- [ ] **Task 3.4** — Add typewriter effect for the rotating taglines: "BEL SAR Intern", "AI/ML Builder", "State Roll Ball Captain", "CS @ Shiv Nadar University" — commit: `feat: add typewriter effect for hero taglines`
- [ ] **Task 3.5** — Add cursor glow effect (JS mouse tracking, CSS radial gradient follows cursor) — commit: `feat: add interactive cursor glow effect`
- [ ] **Task 3.6** — Add CTA buttons: "View Projects" (scrolls to #projects) + "Download CV" (link to CV PDF) + "Connect" (scrolls to #connect) with magnetic hover JS — commit: `feat: add hero CTA buttons with magnetic hover`

### PHASE 4 — Visual Effects Layer
- [ ] **Task 4.1** — Add grain/noise texture overlay to entire page (CSS SVG feTurbulence filter or canvas-based) — commit: `style: add film grain noise texture overlay`
- [ ] **Task 4.2** — Add scanline effect overlay (CSS repeating linear gradient, low opacity) — commit: `style: add CRT scanline effect`
- [ ] **Task 4.3** — Add scroll progress bar (thin 2px white line at top of viewport, JS-driven) — commit: `feat: add scroll progress indicator`
- [ ] **Task 4.4** — Implement Intersection Observer for all sections: fade-in + slide-up on scroll — commit: `feat: add scroll-triggered reveal animations`
- [ ] **Task 4.5** — Write `css/animations.css` with all keyframe definitions — commit: `style: extract all keyframe animations to animations.css`

### PHASE 5 — About Section
- [ ] **Task 5.1** — Build about section: short bio paragraph, education table with animated rows — commit: `feat: add about section with education table`
- [ ] **Task 5.2** — Add animated stat counters: "92.3 Percentile", "7th Place Nationally", "200-Page Research Report" — animate numbers counting up on scroll — commit: `feat: add animated stat counters`

### PHASE 6 — Experience Section (Timeline)
- [ ] **Task 6.1** — Build vertical timeline component CSS with connecting line, dot markers — commit: `feat: add experience timeline component`
- [ ] **Task 6.2** — Add BEL internship entry with full description, tags (SAR, Python, UAV, Satellite Data) — commit: `feat: add BEL internship to timeline`
- [ ] **Task 6.3** — Add DRIIV internship entry with full description, tags (UAV Research, IIT Delhi, Technical Writing) — commit: `feat: add DRIIV internship to timeline`

### PHASE 7 — Projects Section (GitHub Live Sync)
- [ ] **Task 7.1** — Write `js/github.js`: async fetch from GitHub API, parse response, handle errors, cache in sessionStorage — commit: `feat: add GitHub API integration module`
- [ ] **Task 7.2** — Build project card component: name, description, language badge, stars, last updated, GitHub link — commit: `feat: add project card component`
- [ ] **Task 7.3** — Build skeleton loading state for project cards (animated shimmer) — commit: `feat: add skeleton loading state for project cards`
- [ ] **Task 7.4** — Render hard-coded featured projects first (8 projects from personal data above) with rich descriptions, then remaining GitHub repos from API — commit: `feat: render featured projects with GitHub API supplement`
- [ ] **Task 7.5** — Add project card hover: expand with full description, show tech stack tags — commit: `style: add project card hover expand effect`
- [ ] **Task 7.6** — Add "Live from GitHub" pulsing indicator with last-fetched timestamp — commit: `feat: add live GitHub sync indicator`
- [ ] **Task 7.7** — Add filter tabs: "All", "AI/ML", "Systems", "Web", "Research" — client-side filter — commit: `feat: add project category filter tabs`

### PHASE 8 — Skills Section
- [ ] **Task 8.1** — Build skills section: grouped pill/tag layout for each category — commit: `feat: add skills section with grouped tags`
- [ ] **Task 8.2** — Add hover animation on skill tags (invert colors, slight scale) — commit: `style: add skill tag hover animations`
- [ ] **Task 8.3** — Add terminal-style block: fake terminal showing `pip install langchain langgraph openai opencv-python` typing out — commit: `feat: add terminal-style skill showcase block`

### PHASE 9 — Achievements Section
- [ ] **Task 9.1** — Build achievements section: cards for ASME, JEE, Duke of Edinburgh, Roll Ball, Basketball, Volunteering — commit: `feat: add achievements section`
- [ ] **Task 9.2** — Add badge/certification strip at bottom of achievements — commit: `feat: add certification badges strip`

### PHASE 10 — Connect Section
- [ ] **Task 10.1** — Build connect section: headline, subtext, LinkedIn badge embed, GitHub link, email CTA — commit: `feat: add connect section with LinkedIn and GitHub links`
- [ ] **Task 10.2** — Add LinkedIn Profile Badge (official embed): `<script src="https://platform.linkedin.com/badges/js/profile.js" async defer></script>` with badge div styled to match black/white theme — commit: `feat: embed LinkedIn profile badge`
- [ ] **Task 10.3** — Style the footer: minimal, copyright, links — commit: `feat: add footer`

### PHASE 11 — Polish & Performance
- [ ] **Task 11.1** — Make fully responsive: test at 320px, 768px, 1024px, 1440px breakpoints — fix all layout issues — commit: `fix: responsive layout fixes for all breakpoints`
- [ ] **Task 11.2** — Add `meta` tags for SEO: description, keywords, OG image, Twitter card — commit: `chore: add SEO and social meta tags`
- [ ] **Task 11.3** — Add smooth scroll behavior, active nav link highlighting on scroll — commit: `feat: add smooth scroll and active nav state`
- [ ] **Task 11.4** — Optimize: lazy load images, minimize repaints, use `will-change` on animated elements — commit: `perf: optimize animations and lazy loading`
- [ ] **Task 11.5** — Add `prefers-reduced-motion` media query to disable heavy animations for accessibility — commit: `feat: add reduced motion accessibility support`

### PHASE 12 — GitHub Actions Auto-Deploy
- [ ] **Task 12.1** — Create `.github/workflows/deploy.yml`: on push to main, deploy to GitHub Pages automatically — commit: `chore: add GitHub Actions workflow for auto-deploy`
- [ ] **Task 12.2** — Create `.github/workflows/readme-sync.yml`: weekly cron job that triggers a no-op commit to refresh GitHub API cache (keeps the live data fresh indicator accurate) — commit: `chore: add weekly refresh workflow`
- [ ] **Task 12.3** — Final push, verify GitHub Pages is live at `https://pgrstx.github.io/portfolio` — commit: `chore: final deployment verification`

---

## FILE STRUCTURE (target)

```
Portfolio/
├── CLAUDE.md                    ← this file
├── index.html                   ← single page, all sections
├── css/
│   ├── style.css                ← variables, layout, components
│   └── animations.css           ← all keyframe definitions
├── js/
│   ├── main.js                  ← init, nav, scroll, Intersection Observer
│   ├── github.js                ← GitHub API fetch, render, cache
│   └── effects.js               ← cursor glow, magnetic buttons, grain
├── assets/
│   ├── cv.pdf                   ← copy of Pranav's CV for download
│   └── og-image.png             ← OG image for social sharing (generate a simple one)
└── .github/
    └── workflows/
        ├── deploy.yml           ← auto deploy on push
        └── readme-sync.yml      ← weekly refresh
```

---

## GITHUB API IMPLEMENTATION NOTES

```javascript
// js/github.js — key logic
const GITHUB_USERNAME = 'pgrstx';
const EXCLUDED_REPOS = ['pgrstx', 'portfolio', 'dums-editorial', 'just-dums'];
const FEATURED_REPOS = [
  'Circuit-Designer',
  'Inbox-Whisper-LLM-Project', 
  'StreetGPT',
  'ClaudexSiri',
  'PARL-OS-Project',
  'GestureControl',
  'BlockChain-Project',
  'PranavGupta-langsmith-MAT496'
];

async function fetchGitHubRepos() {
  // 1. Check sessionStorage cache first (avoid re-fetching on tab switch)
  // 2. Fetch from API
  // 3. Filter excluded repos
  // 4. Sort: featured first, then by updated_at
  // 5. Merge with hard-coded descriptions (override empty API descriptions)
  // 6. Render cards
  // 7. Cache result in sessionStorage with timestamp
}
```

---

## LINKEDIN NOTE

LinkedIn's public API does not allow fetching profile data without OAuth. The site handles this by:
1. Embedding the **official LinkedIn Profile Badge** (their own embed widget, always up to date)
2. Providing a direct link to `https://www.linkedin.com/in/pgrstx`
3. The badge widget is maintained by LinkedIn and always shows current info

---

## IMPORTANT REMINDERS FOR CLAUDE CODE

- Every time you finish a task, `git add -A && git commit -m "..." && git push origin main`
- Check `gh repo view pgrstx/portfolio` to confirm the repo exists before pushing
- If the repo doesn't exist yet, create it: `gh repo create pgrstx/portfolio --public`
- Enable GitHub Pages: Settings → Pages → Source: main branch, root folder
- The site must work with ZERO backend — pure static files
- No npm, no build step, no node_modules — just files
- Test the GitHub API fetch in browser console before claiming it works
- The LinkedIn badge may look different on dark backgrounds — override its CSS to match the black theme using `!important` or a wrapper with CSS filter if needed
- Copy `/Users/pranavgupta/Desktop/CV_Pranav.pdf` to `assets/cv.pdf` at the start

---

## START COMMAND

Begin with Task 1.1. Go through all tasks in order. Commit and push after every single task.
