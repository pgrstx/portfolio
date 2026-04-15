/* ============================================================
   github.js — GitHub API fetch, project rendering, filtering
   ============================================================ */

const GITHUB_USERNAME = 'pgrstx';
const EXCLUDED_REPOS  = ['pgrstx', 'portfolio', 'dums-editorial', 'just-dums'];
const CACHE_KEY       = 'pg_github_repos_v2';
const CACHE_TTL       = 5 * 60 * 1000; // 5 minutes

/* Hard-coded featured projects (shown first, enriched with API data) */
const FEATURED_PROJECTS = [
  {
    name: 'Circuit-Designer',
    display: 'Circuit Designer AI',
    description: 'Natural language → circuit generator. LLM API + JSON schema enforcement + RAG pipeline, Node.js backend.',
    category: 'ai-ml',
    status: 'Ongoing',
  },
  {
    name: 'Inbox-Whisper-LLM-Project',
    display: 'InboxWhisper',
    description: 'LangGraph agentic email task manager. GPT-4o-mini, Microsoft Graph API, SQLite, LangSmith, Streamlit.',
    category: 'ai-ml',
    status: '2025',
  },
  {
    name: 'StreetGPT',
    display: 'StreetGPT',
    description: 'Real-time multimodal AI pipeline. OpenAI Vision API, live webcam scene captioning, dynamic prompt generation.',
    category: 'ai-ml',
    status: '2025',
  },
  {
    name: 'ClaudexSiri',
    display: 'ClaudexSiri',
    description: 'AI voice assistant for macOS replacing Siri. Claude API + Python — always-on voice interface.',
    category: 'ai-ml',
    status: '2026',
  },
  {
    name: 'PARL-OS-Project',
    display: 'PARL-OS',
    description: 'Phase-Aware Reinforcement Learning page replacement policy. OS project implementing a novel RL-based memory management algorithm.',
    category: 'systems',
    status: '2026',
  },
  {
    name: 'GestureControl',
    display: 'GestureControl',
    description: 'Interactive image control via hand gestures. OpenCV + MediaPipe landmark detection for real-time gesture recognition.',
    category: 'ai-ml',
    status: '2025',
  },
  {
    name: 'BlockChain-Project',
    display: 'BlockChain Project',
    description: 'Basic blockchain implementation from scratch. Python — proof-of-work, chaining, validation, and wallet simulation.',
    category: 'systems',
    status: '2024',
  },
  {
    name: 'PranavGupta-langsmith-MAT496',
    display: 'LangSmith MAT496',
    description: 'LangSmith evaluation framework for academic ML project. LLM tracing, dataset management, and evaluation pipelines.',
    category: 'ai-ml',
    status: '2026',
  },
];

/* Language → color map */
const LANG_COLORS = {
  Python:     '#3776ab',
  JavaScript: '#f7df1e',
  TypeScript: '#3178c6',
  C:          '#555555',
  HTML:       '#e34c26',
  CSS:        '#563d7c',
  Jupyter:    '#da5b0b',
  Shell:      '#89e051',
  default:    '#ffffff',
};

function getLangColor(lang) {
  return LANG_COLORS[lang] || LANG_COLORS.default;
}

function formatDate(iso) {
  if (!iso) return '';
  const d = new Date(iso);
  return d.toLocaleDateString('en-US', { month: 'short', year: 'numeric' });
}

function titleCase(str) {
  return str.replace(/-/g, ' ').replace(/\b\w/g, c => c.toUpperCase());
}

/* ── Fetch from GitHub API ───────────────────────────────── */
async function fetchGitHubRepos() {
  // Check session cache
  try {
    const cached = sessionStorage.getItem(CACHE_KEY);
    if (cached) {
      const { data, ts } = JSON.parse(cached);
      if (Date.now() - ts < CACHE_TTL) return { repos: data, fromCache: true, ts };
    }
  } catch (_) {}

  const resp = await fetch(
    `https://api.github.com/users/${GITHUB_USERNAME}/repos?sort=updated&per_page=50`,
    { headers: { Accept: 'application/vnd.github.v3+json' } }
  );

  if (!resp.ok) throw new Error(`GitHub API ${resp.status}`);

  const data = await resp.json();
  const ts = Date.now();

  try {
    sessionStorage.setItem(CACHE_KEY, JSON.stringify({ data, ts }));
  } catch (_) {}

  return { repos: data, fromCache: false, ts };
}

/* ── Build the repo map from API data ───────────────────── */
function buildRepoMap(repos) {
  const map = {};
  repos.forEach(r => { map[r.name] = r; });
  return map;
}

/* ── Render a project card ───────────────────────────────── */
function createProjectCard(proj, apiRepo, featured) {
  const name    = proj.display || titleCase(proj.name);
  const desc    = (apiRepo && apiRepo.description) ? apiRepo.description : proj.description;
  const lang    = apiRepo ? apiRepo.language : null;
  const stars   = apiRepo ? apiRepo.stargazers_count : 0;
  const forks   = apiRepo ? apiRepo.forks_count : 0;
  const updated = apiRepo ? formatDate(apiRepo.updated_at) : (proj.status || '');
  const url     = apiRepo ? apiRepo.html_url : `https://github.com/${GITHUB_USERNAME}/${proj.name}`;
  const color   = getLangColor(lang);
  const cat     = proj.category || 'other';

  const card = document.createElement('div');
  card.className = 'project-card reveal-child';
  card.dataset.category = cat;

  card.innerHTML = `
    ${featured ? '<div class="project-card__featured" title="Featured project"></div>' : ''}
    <div class="project-card__header">
      <h3 class="project-card__name">${name}</h3>
      <a href="${url}" target="_blank" rel="noopener noreferrer" class="project-card__link" title="View on GitHub">
        <i data-lucide="external-link"></i>
      </a>
    </div>
    <p class="project-card__desc">${desc || 'No description available.'}</p>
    <div class="project-card__footer">
      ${lang ? `<span class="project-card__lang"><span class="lang-dot" style="background:${color}"></span>${lang}</span>` : '<span></span>'}
      <span class="project-card__meta">
        ${stars > 0 ? `<span><i data-lucide="star"></i>${stars}</span>` : ''}
        ${forks > 0 ? `<span><i data-lucide="git-fork"></i>${forks}</span>` : ''}
      </span>
      <span class="project-card__date">${updated}</span>
    </div>
  `;

  return card;
}

/* ── Render all projects ─────────────────────────────────── */
function renderProjects(repos) {
  const grid = document.getElementById('projectsGrid');
  if (!grid) return;

  // Clear skeletons
  grid.innerHTML = '';

  const repoMap = buildRepoMap(repos);
  const fragment = document.createDocumentFragment();
  const featuredNames = new Set(FEATURED_PROJECTS.map(p => p.name));

  // 1. Featured projects first
  FEATURED_PROJECTS.forEach(proj => {
    const apiRepo = repoMap[proj.name] || null;
    fragment.appendChild(createProjectCard(proj, apiRepo, true));
  });

  // 2. Remaining API repos (not excluded, not already featured)
  repos
    .filter(r => !EXCLUDED_REPOS.includes(r.name) && !featuredNames.has(r.name))
    .forEach(r => {
      const proj = { name: r.name, display: titleCase(r.name), description: r.description, category: guessCategory(r) };
      fragment.appendChild(createProjectCard(proj, r, false));
    });

  grid.appendChild(fragment);

  // Re-init Lucide icons and scroll reveal
  if (window.lucide) lucide.createIcons();
  observeRevealChildren(grid);
}

/* ── Guess category from repo topics/language/name ──────── */
function guessCategory(repo) {
  const text = ((repo.name || '') + ' ' + (repo.description || '') + ' ' + (repo.language || '')).toLowerCase();
  if (/llm|gpt|openai|langchain|langgraph|ai|ml|rag|embedding|model|neural|vision|gesture|mediapipe/.test(text)) return 'ai-ml';
  if (/os|kernel|system|compiler|blockchain|page|memory|algo/.test(text)) return 'systems';
  if (/web|html|css|react|vue|node|express|api|server/.test(text)) return 'web';
  if (/research|report|paper|survey|analysis/.test(text)) return 'research';
  return 'other';
}

/* ── Filter buttons ──────────────────────────────────────── */
function initProjectFilters() {
  document.querySelectorAll('.filter-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const filter = btn.dataset.filter;
      document.querySelectorAll('.project-card').forEach(card => {
        const match = filter === 'all' || card.dataset.category === filter;
        card.style.display = match ? '' : 'none';
      });
    });
  });
}

/* ── Observe reveal-child elements ──────────────────────── */
function observeRevealChildren(parent) {
  const io = new IntersectionObserver((entries) => {
    entries.forEach((e, i) => {
      if (e.isIntersecting) {
        setTimeout(() => e.target.classList.add('visible'), i * 60);
        io.unobserve(e.target);
      }
    });
  }, { threshold: 0.1 });

  parent.querySelectorAll('.reveal-child').forEach(el => io.observe(el));
}

/* ── Update live indicator ───────────────────────────────── */
function updateLiveIndicator(ts, fromCache) {
  const indicator = document.getElementById('githubLiveIndicator');
  const timestamp = document.getElementById('githubTimestamp');
  if (!indicator || !timestamp) return;

  const date = new Date(ts);
  const timeStr = date.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });
  timestamp.textContent = `${fromCache ? 'Cached' : 'Fetched'} at ${timeStr}`;
}

/* ── Main entry point ────────────────────────────────────── */
async function initGitHub() {
  try {
    const { repos, fromCache, ts } = await fetchGitHubRepos();
    renderProjects(repos.filter(r => !EXCLUDED_REPOS.includes(r.name)));
    updateLiveIndicator(ts, fromCache);
    initProjectFilters();
  } catch (err) {
    console.warn('GitHub API error:', err);
    // Fall back to featured projects only with no API data
    renderProjects([]);
    updateLiveIndicator(Date.now(), false);
    initProjectFilters();

    const ts = document.getElementById('githubTimestamp');
    if (ts) ts.textContent = 'Could not fetch live data — showing local projects';
  }
}

// Initialize when DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initGitHub);
} else {
  initGitHub();
}
