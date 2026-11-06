/* ==========================================================================
   SkillBridge — Student Career Navigator
   Trackers Module: Portfolio Projects Kanban & Coding Practice Engine
   ========================================================================== */

const TrackersModule = {
  projectFilter: 'all', // 'all', 'in-progress', 'completed', 'idea'
  codingFilter: 'all',  // 'all', 'Easy', 'Medium', 'Hard'
  codingSearchQuery: '',

  init() {
    this.bindEvents();
    this.renderProjects();
    this.renderCoding();
  },

  bindEvents() {
    // Project filter tabs
    const pFilterBtns = document.querySelectorAll('.project-tab-btn');
    pFilterBtns.forEach(btn => {
      btn.addEventListener('click', (e) => {
        pFilterBtns.forEach(b => b.classList.remove('active'));
        e.currentTarget.classList.add('active');
        this.projectFilter = e.currentTarget.getAttribute('data-status') || 'all';
        this.renderProjects();
      });
    });

    // Add Project Modal Form
    const addProjForm = document.getElementById('formAddProject');
    if (addProjForm) {
      addProjForm.addEventListener('submit', (e) => {
        e.preventDefault();
        this.handleSaveNewProject(e.target);
      });
    }

    // Coding Problem Modal Form
    const logProbForm = document.getElementById('formLogProblem');
    if (logProbForm) {
      logProbForm.addEventListener('submit', (e) => {
        e.preventDefault();
        this.handleSaveNewProblem(e.target);
      });
    }

    // Coding difficulty filters
    const diffBtns = document.querySelectorAll('.coding-filter-pill');
    diffBtns.forEach(btn => {
      btn.addEventListener('click', (e) => {
        diffBtns.forEach(b => b.classList.remove('active'));
        e.currentTarget.classList.add('active');
        this.codingFilter = e.currentTarget.getAttribute('data-diff') || 'all';
        this.renderCodingProblemsTable();
      });
    });

    // Coding search input
    const codingSearch = document.getElementById('codingSearchInput');
    if (codingSearch) {
      codingSearch.addEventListener('input', (e) => {
        this.codingSearchQuery = e.target.value.toLowerCase().trim();
        this.renderCodingProblemsTable();
      });
    }
  },

  /* ------------------------------------------------------------------------
     Projects Sub-Module
     ------------------------------------------------------------------------ */
  renderProjects() {
    const container = document.getElementById('projectsContainer');
    if (!container) return;

    let projects = SkillBridgeStorage.getProjects();

    if (this.projectFilter !== 'all') {
      projects = projects.filter(p => p.status === this.projectFilter);
    }

    if (projects.length === 0) {
      container.innerHTML = `
        <div style="grid-column: 1 / -1; text-align: center; padding: 3rem 1rem; background: var(--bg-card); border-radius: var(--radius-md); border: 1px dashed var(--border-subtle);">
          <div style="font-size: 2rem; margin-bottom: 0.5rem;">📂</div>
          <p style="color: var(--text-muted); margin-bottom: 1rem;">No portfolio projects found for filter <strong>${this.projectFilter}</strong>.</p>
          <button class="btn btn-primary btn-sm" onclick="SkillBridgeApp.openModal('modalAddProject')">+ Add a Project</button>
        </div>
      `;
      return;
    }

    container.innerHTML = projects.map(proj => {
      const statusBadge = proj.status === 'completed'
        ? '<span class="badge badge-emerald">✓ Completed</span>'
        : (proj.status === 'in-progress'
          ? '<span class="badge badge-cyan">⚙ In Progress</span>'
          : '<span class="badge badge-amber">💡 Idea Stage</span>');

      return `
        <div class="project-card" id="proj_card_${proj.id}">
          <div>
            <div class="project-card-header">
              <h3 class="project-name">${proj.title}</h3>
              ${statusBadge}
            </div>
            <p class="project-desc">${proj.description}</p>
            <div style="display: flex; flex-wrap: wrap; gap: 0.35rem; margin-bottom: 1rem;">
              ${(proj.techStack || []).map(tech => `<span class="tag-pill">${tech}</span>`).join('')}
            </div>
          </div>

          <div>
            <div style="display: flex; align-items: center; justify-content: space-between; gap: 0.5rem; margin-bottom: 0.75rem; font-size: 0.8rem;">
              <span style="color: var(--text-dim);">Status:</span>
              <select onchange="TrackersModule.changeProjectStatus('${proj.id}', this.value)" style="background: rgba(15,23,42,0.8); border: 1px solid var(--border-subtle); color: var(--text-main); font-size: 0.78rem; padding: 2px 6px; border-radius: 4px; outline: none;">
                <option value="in-progress" ${proj.status === 'in-progress' ? 'selected' : ''}>In Progress</option>
                <option value="completed" ${proj.status === 'completed' ? 'selected' : ''}>Completed</option>
                <option value="idea" ${proj.status === 'idea' ? 'selected' : ''}>Idea</option>
              </select>
            </div>

            <div class="project-links">
              ${proj.demoUrl && proj.demoUrl !== '#' ? `
                <a href="${proj.demoUrl}" target="_blank" rel="noopener noreferrer" class="btn btn-sm btn-outline" style="flex: 1;">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path><polyline points="15 3 21 3 21 9"></polyline><line x1="10" y1="14" x2="21" y2="3"></line></svg>
                  Live Demo
                </a>
              ` : ''}
              ${proj.githubUrl ? `
                <a href="${proj.githubUrl}" target="_blank" rel="noopener noreferrer" class="btn btn-sm btn-secondary" style="flex: 1;">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path></svg>
                  Source
                </a>
              ` : ''}
              <button class="btn btn-sm btn-icon-only" onclick="TrackersModule.deleteProject('${proj.id}')" title="Delete Project">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="var(--accent-rose)" stroke-width="2"><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path></svg>
              </button>
            </div>
          </div>
        </div>
      `;
    }).join('');
  },

  changeProjectStatus(id, newStatus) {
    SkillBridgeStorage.updateProjectStatus(id, newStatus);
    this.renderProjects();
    if (window.SkillBridgeApp) {
      window.SkillBridgeApp.updateAllViews();
      window.SkillBridgeApp.showToast('Project status updated!', 'info');
    }
  },

  deleteProject(id) {
    if (confirm('Are you sure you want to delete this project?')) {
      SkillBridgeStorage.deleteProject(id);
      this.renderProjects();
      if (window.SkillBridgeApp) {
        window.SkillBridgeApp.updateAllViews();
        window.SkillBridgeApp.showToast('Project deleted', 'info');
      }
    }
  },

  handleSaveNewProject(form) {
    const title = form.projectTitle.value.trim();
    const description = form.projectDesc.value.trim();
    const stackStr = form.projectStack.value.trim();
    const status = form.projectStatus.value;
    const demoUrl = form.projectDemo.value.trim();
    const githubUrl = form.projectRepo.value.trim();

    if (!title || !description) {
      alert('Please provide a title and description.');
      return;
    }

    const techStack = stackStr ? stackStr.split(',').map(s => s.trim()).filter(Boolean) : ['JavaScript'];

    SkillBridgeStorage.addProject({
      title,
      description,
      techStack,
      status,
      demoUrl,
      githubUrl
    });

    form.reset();
    SkillBridgeApp.closeModal('modalAddProject');
    this.renderProjects();
    SkillBridgeApp.updateAllViews();
    SkillBridgeApp.showToast('Project added to portfolio!', 'success');
  },

  /* ------------------------------------------------------------------------
     Coding Practice Sub-Module
     ------------------------------------------------------------------------ */
  renderCoding() {
    const codingData = SkillBridgeStorage.getCodingData();
    
    // Update streak counter
    const streakEl = document.getElementById('codingStreakNum');
    if (streakEl) streakEl.textContent = codingData.streak || 0;

    const totalEl = document.getElementById('codingTotalSolved');
    if (totalEl) totalEl.textContent = (codingData.problems || []).length;

    // Render Heatmap
    this.renderHeatmap(codingData);

    // Render Problems Table
    this.renderCodingProblemsTable();
  },

  renderHeatmap(codingData) {
    const grid = document.getElementById('codingHeatmapGrid');
    if (!grid) return;

    // Generate 15 weeks x 7 days = 105 cells
    const days = 105;
    const problems = codingData.problems || [];
    
    // Group problem dates
    const dateCounts = {};
    problems.forEach(p => {
      dateCounts[p.date] = (dateCounts[p.date] || 0) + 1;
    });

    let cellsHtml = '';
    const now = new Date();

    for (let i = days - 1; i >= 0; i--) {
      const d = new Date(now.getTime() - i * 86400000);
      const dateStr = d.toISOString().split('T')[0];
      const count = dateCounts[dateStr] || 0;
      
      let levelClass = '';
      if (count >= 4) levelClass = 'level-4';
      else if (count === 3) levelClass = 'level-3';
      else if (count === 2) levelClass = 'level-2';
      else if (count === 1) levelClass = 'level-1';

      cellsHtml += `<div class="heat-cell ${levelClass}" title="${dateStr}: ${count} problems solved"></div>`;
    }

    grid.innerHTML = cellsHtml;
  },

  renderCodingProblemsTable() {
    const tbody = document.getElementById('codingProblemsTbody');
    if (!tbody) return;

    const codingData = SkillBridgeStorage.getCodingData();
    let problems = codingData.problems || [];

    // Filter by difficulty
    if (this.codingFilter !== 'all') {
      problems = problems.filter(p => p.difficulty === this.codingFilter);
    }

    // Filter by search query
    if (this.codingSearchQuery) {
      problems = problems.filter(p => 
        p.title.toLowerCase().includes(this.codingSearchQuery) ||
        (p.topic && p.topic.toLowerCase().includes(this.codingSearchQuery)) ||
        (p.platform && p.platform.toLowerCase().includes(this.codingSearchQuery))
      );
    }

    if (problems.length === 0) {
      tbody.innerHTML = `
        <tr>
          <td colspan="5" style="text-align: center; padding: 2rem; color: var(--text-muted);">
            No problem entries found matching your filter criteria.
          </td>
        </tr>
      `;
      return;
    }

    tbody.innerHTML = problems.map(prob => {
      const diffBadge = prob.difficulty === 'Easy'
        ? '<span class="badge badge-emerald">Easy</span>'
        : (prob.difficulty === 'Medium'
          ? '<span class="badge badge-amber">Medium</span>'
          : '<span class="badge badge-rose">Hard</span>');

      return `
        <tr>
          <td>
            <div style="font-weight: 600; color: var(--text-main);">${prob.title}</div>
            ${prob.notes ? `<div style="font-size: 0.76rem; color: var(--text-dim); margin-top: 2px;">${prob.notes}</div>` : ''}
          </td>
          <td><span class="tag-pill">${prob.platform || 'LeetCode'}</span></td>
          <td><span class="badge badge-indigo">${prob.topic || 'General DSA'}</span></td>
          <td>${diffBadge}</td>
          <td style="color: var(--text-dim); font-size: 0.8rem;">${prob.date || 'Recent'}</td>
        </tr>
      `;
    }).join('');
  },

  handleSaveNewProblem(form) {
    const title = form.probTitle.value.trim();
    const platform = form.probPlatform.value;
    const difficulty = form.probDifficulty.value;
    const topic = form.probTopic.value.trim() || 'General DSA';
    const notes = form.probNotes.value.trim();

    if (!title) {
      alert('Please enter a problem title.');
      return;
    }

    SkillBridgeStorage.addCodingProblem({
      title,
      platform,
      difficulty,
      topic,
      notes
    });

    form.reset();
    SkillBridgeApp.closeModal('modalLogProblem');
    this.renderCoding();
    SkillBridgeApp.updateAllViews();
    SkillBridgeApp.showToast('Problem logged! Streak updated 🔥', 'success');
  }
};
