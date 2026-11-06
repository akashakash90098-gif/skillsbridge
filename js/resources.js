/* ==========================================================================
   SkillBridge — Student Career Navigator
   Resources Module: Curated Industry Learning Hub & Bookmarks
   ========================================================================== */

const RESOURCES_DATA = [
  {
    id: 'res_mdn',
    title: 'MDN Web Docs',
    category: 'fullstack',
    type: 'docs',
    badge: 'Official / Essential',
    description: 'The premier documentation resource for HTML5, CSS3, Web APIs, and JavaScript specifications.',
    url: 'https://developer.mozilla.org',
    difficulty: 'All Levels',
    isFree: true
  },
  {
    id: 'res_roadmap_sh',
    title: 'Roadmap.sh Developer Roadmaps',
    category: 'all',
    type: 'cheatsheet',
    badge: 'Community Driven',
    description: 'Interactive visual roadmaps and guides for frontend, backend, DevOps, and AI roles.',
    url: 'https://roadmap.sh',
    difficulty: 'All Levels',
    isFree: true
  },
  {
    id: 'res_neetcode',
    title: 'NeetCode 150 & Algorithms Guide',
    category: 'all',
    type: 'interactive',
    badge: 'Interview Prep',
    description: 'Curated list of 150 fundamental coding interview questions categorized by algorithmic pattern.',
    url: 'https://neetcode.io',
    difficulty: 'Intermediate',
    isFree: true
  },
  {
    id: 'res_fullstackopen',
    title: 'Full Stack Open — University of Helsinki',
    category: 'fullstack',
    type: 'course',
    badge: 'University Grade',
    description: 'Deep dive into modern web development with React, Redux, Node.js, GraphQL, TypeScript, and Docker.',
    url: 'https://fullstackopen.com',
    difficulty: 'Intermediate',
    isFree: true
  },
  {
    id: 'res_fastapi',
    title: 'FastAPI Official Documentation & Tutorial',
    category: 'aiml',
    type: 'docs',
    badge: 'High Performance',
    description: 'Modern, fast (high-performance) web framework for building APIs with Python 3.8+ based on standard Python type hints.',
    url: 'https://fastapi.tiangolo.com',
    difficulty: 'Intermediate',
    isFree: true
  },
  {
    id: 'res_huggingface',
    title: 'Hugging Face Deep Learning Course',
    category: 'aiml',
    type: 'course',
    badge: 'GenAI & NLP',
    description: 'Hands-on practical guide to Transformers, fine-tuning LLMs, datasets, and pipelines with PyTorch.',
    url: 'https://huggingface.co/learn',
    difficulty: 'Intermediate',
    isFree: true
  },
  {
    id: 'res_kubernetes_io',
    title: 'Kubernetes Interactive Tutorials & Docs',
    category: 'clouddevops',
    type: 'interactive',
    badge: 'Cloud Native',
    description: 'Official interactive Kubernetes environment to practice deploying and scaling containerized applications.',
    url: 'https://kubernetes.io/docs/tutorials/',
    difficulty: 'Intermediate',
    isFree: true
  },
  {
    id: 'res_owasp',
    title: 'OWASP Top 10 Security Risks & Mitigations',
    category: 'cybersecurity',
    type: 'docs',
    badge: 'Industry Standard',
    description: 'Standard awareness document for developers and web application security detailing top attack vectors.',
    url: 'https://owasp.org/www-project-top-ten/',
    difficulty: 'Beginner to Advanced',
    isFree: true
  },
  {
    id: 'res_khan_stats',
    title: 'Khan Academy: Statistics & Probability',
    category: 'datascience',
    type: 'course',
    badge: 'Foundations',
    description: 'Comprehensive intuitive coverage of random variables, distributions, confidence intervals, and hypothesis tests.',
    url: 'https://www.khanacademy.org/math/statistics-probability',
    difficulty: 'Beginner',
    isFree: true
  },
  {
    id: 'res_react_dev',
    title: 'React.dev Official Documentation',
    category: 'fullstack',
    type: 'docs',
    badge: 'Interactive Docs',
    description: 'Learn modern React with interactive code sandboxes, diagrams, and best practices directly from the React team.',
    url: 'https://react.dev',
    difficulty: 'All Levels',
    isFree: true
  }
];

const ResourcesModule = {
  currentTrackFilter: 'all',
  currentTypeFilter: 'all',
  searchQuery: '',

  init() {
    this.bindEvents();
    this.render();
  },

  bindEvents() {
    const trackPills = document.querySelectorAll('.res-track-pill');
    trackPills.forEach(pill => {
      pill.addEventListener('click', (e) => {
        trackPills.forEach(p => p.classList.remove('active'));
        e.currentTarget.classList.add('active');
        this.currentTrackFilter = e.currentTarget.getAttribute('data-track') || 'all';
        this.render();
      });
    });

    const searchInput = document.getElementById('resSearchInput');
    if (searchInput) {
      searchInput.addEventListener('input', (e) => {
        this.searchQuery = e.target.value.toLowerCase().trim();
        this.render();
      });
    }
  },

  render() {
    const container = document.getElementById('resourcesGrid');
    if (!container) return;

    const bookmarks = SkillBridgeStorage.getBookmarks();
    let list = RESOURCES_DATA;

    // Track filter
    if (this.currentTrackFilter !== 'all') {
      list = list.filter(r => r.category === this.currentTrackFilter || r.category === 'all');
    }

    // Search query filter
    if (this.searchQuery) {
      list = list.filter(r => 
        r.title.toLowerCase().includes(this.searchQuery) ||
        r.description.toLowerCase().includes(this.searchQuery) ||
        r.type.toLowerCase().includes(this.searchQuery)
      );
    }

    if (list.length === 0) {
      container.innerHTML = `
        <div style="grid-column: 1 / -1; text-align: center; padding: 3rem 1rem; color: var(--text-muted);">
          No learning resources found matching your search.
        </div>
      `;
      return;
    }

    container.innerHTML = list.map(item => {
      const isBookmarked = bookmarks.includes(item.id);
      return `
        <div class="resource-card" id="res_${item.id}">
          <div>
            <div style="display: flex; align-items: flex-start; justify-content: space-between; gap: 0.5rem; margin-bottom: 0.5rem;">
              <span class="badge badge-indigo">${item.badge}</span>
              <button class="btn btn-sm btn-icon-only" onclick="ResourcesModule.toggleBookmark('${item.id}')" title="Bookmark resource" style="border: none; background: transparent;">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="${isBookmarked ? 'var(--accent-amber)' : 'none'}" stroke="${isBookmarked ? 'var(--accent-amber)' : 'var(--text-dim)'}" stroke-width="2">
                  <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z"></path>
                </svg>
              </button>
            </div>
            <h3 style="font-size: 1.1rem; font-weight: 700; color: var(--text-main); margin-bottom: 0.5rem;">${item.title}</h3>
            <p style="font-size: 0.86rem; color: var(--text-muted); line-height: 1.5; margin-bottom: 1.25rem;">${item.description}</p>
          </div>

          <div style="display: flex; align-items: center; justify-content: space-between; gap: 0.75rem; border-top: 1px solid var(--border-subtle); padding-top: 0.85rem; font-size: 0.8rem;">
            <span style="color: var(--accent-emerald); font-weight: 600;">${item.isFree ? '100% Free' : 'Freemium'}</span>
            <a href="${item.url}" target="_blank" rel="noopener noreferrer" class="btn btn-sm btn-outline">
              Visit Resource
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path><polyline points="15 3 21 3 21 9"></polyline><line x1="10" y1="14" x2="21" y2="3"></line></svg>
            </a>
          </div>
        </div>
      `;
    }).join('');
  },

  toggleBookmark(id) {
    SkillBridgeStorage.toggleBookmark(id);
    this.render();
    if (window.SkillBridgeApp) {
      window.SkillBridgeApp.showToast('Bookmark updated!', 'info');
    }
  }
};

