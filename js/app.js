/* ==========================================================================
   SkillBridge — Student Career Navigator
   Core Application Controller: Navigation, Router, Career Explorer & App State
   ========================================================================== */

const SkillBridgeApp = {
  activeSection: 'dashboard',
  careersFilter: 'all',
  careersSearchQuery: '',

  init() {
    this.setupNavigation();
    this.setupCareerExplorer();
    this.setupProfileSettings();
    this.setupModals();
    this.setupLanguage();

    // Initialize sub-modules
    if (window.SkillGapModule) SkillGapModule.init();
    if (window.RoadmapModule) RoadmapModule.init();
    if (window.TrackersModule) TrackersModule.init();
    if (window.ResourcesModule) ResourcesModule.init();
    if (window.AIAssistantModule) AIAssistantModule.init();

    // Render initial views
    this.updateAllViews();

    // Handle initial hash routing
    this.handleRoute();
    window.addEventListener('hashchange', () => this.handleRoute());

    console.log('SkillBridge Application Initialized Successfully.');
  },

  /* ------------------------------------------------------------------------
     Routing & Navigation
     ------------------------------------------------------------------------ */
  setupNavigation() {
    const navLinks = document.querySelectorAll('.desktop-nav .nav-link, .drawer-nav-link');
    navLinks.forEach(link => {
      link.addEventListener('click', (e) => {
        const target = link.getAttribute('data-target');
        if (target) {
          e.preventDefault();
          window.location.hash = target;
          this.closeMobileDrawer();
        }
      });
    });

    // Mobile Hamburger
    const toggle = document.getElementById('mobileNavToggle');
    const drawer = document.getElementById('mobileDrawer');
    const drawerClose = document.getElementById('drawerClose');

    if (toggle && drawer) {
      toggle.addEventListener('click', () => {
        drawer.classList.add('open');
      });
    }

    if (drawerClose && drawer) {
      drawerClose.addEventListener('click', () => {
        drawer.classList.remove('open');
      });
    }

    if (drawer) {
      drawer.addEventListener('click', (e) => {
        if (e.target === drawer) {
          drawer.classList.remove('open');
        }
      });
    }
  },

  closeMobileDrawer() {
    const drawer = document.getElementById('mobileDrawer');
    if (drawer) drawer.classList.remove('open');
  },

  handleRoute() {
    let hash = window.location.hash.replace('#', '') || 'dashboard';
    const validSections = ['dashboard', 'careers', 'skill-gap', 'roadmap', 'projects', 'coding', 'resources'];
    if (!validSections.includes(hash)) {
      hash = 'dashboard';
    }

    this.activeSection = hash;

    // Toggle active section
    document.querySelectorAll('.page-section').forEach(sec => {
      sec.classList.remove('active');
    });

    const activeEl = document.getElementById(`sec-${hash}`);
    if (activeEl) {
      activeEl.classList.add('active');
    }

    // Toggle nav active state
    document.querySelectorAll('.desktop-nav .nav-link, .drawer-nav-link').forEach(link => {
      if (link.getAttribute('data-target') === hash) {
        link.classList.add('active');
      } else {
        link.classList.remove('active');
      }
    });

    window.scrollTo({ top: 0, behavior: 'smooth' });

    // Re-draw canvas chart if navigating to skill-gap
    if (hash === 'skill-gap' && window.SkillGapModule) {
      setTimeout(() => SkillGapModule.updateCalculations(), 100);
    }
  },

  /* ------------------------------------------------------------------------
     Career Explorer Sub-System
     ------------------------------------------------------------------------ */
  setupCareerExplorer() {
    // Filter chips
    const filterChips = document.querySelectorAll('.career-filter-chip');
    filterChips.forEach(chip => {
      chip.addEventListener('click', (e) => {
        filterChips.forEach(c => c.classList.remove('active'));
        e.currentTarget.classList.add('active');
        this.careersFilter = e.currentTarget.getAttribute('data-category') || 'all';
        this.renderCareersGrid();
      });
    });

    // Search input
    const searchInput = document.getElementById('careersSearchInput');
    if (searchInput) {
      searchInput.addEventListener('input', (e) => {
        this.careersSearchQuery = e.target.value.toLowerCase().trim();
        this.renderCareersGrid();
      });
    }

    this.renderCareersGrid();
  },

  renderCareersGrid() {
    const container = document.getElementById('careersGrid');
    if (!container) return;

    const currentTarget = SkillBridgeStorage.getSelectedCareer();
    let careers = CAREERS_DATA;

    if (this.careersFilter !== 'all') {
      careers = careers.filter(c => c.category.toLowerCase().includes(this.careersFilter.toLowerCase()));
    }

    if (this.careersSearchQuery) {
      careers = careers.filter(c => 
        c.title.toLowerCase().includes(this.careersSearchQuery) ||
        c.description.toLowerCase().includes(this.careersSearchQuery) ||
        (c.coreStack && c.coreStack.some(s => s.toLowerCase().includes(this.careersSearchQuery)))
      );
    }

    if (careers.length === 0) {
      container.innerHTML = `
        <div style="grid-column: 1 / -1; text-align: center; padding: 3rem 1rem; color: var(--text-muted);">
          No career tracks found matching your filter criteria.
        </div>
      `;
      return;
    }

    container.innerHTML = careers.map(career => {
      const isSelected = career.id === currentTarget;
      return `
        <div class="card career-card ${isSelected ? 'selected-career' : ''}" id="career_${career.id}">
          <div>
            <div class="career-top">
              <div class="career-icon-box">${career.icon}</div>
              <span class="badge ${career.demand === 'Very High' ? 'badge-rose' : 'badge-cyan'}">${career.demand} Demand</span>
            </div>
            
            <h3 class="career-title">${career.title}</h3>
            <p class="career-desc">${career.description}</p>

            <div class="career-meta-row">
              <div class="career-meta-item">
                <span>Avg Salary</span>
                <strong>${career.avgSalary}</strong>
              </div>
              <div class="career-meta-item">
                <span>Growth Rate</span>
                <strong style="color: var(--accent-emerald);">${career.growthRate}</strong>
              </div>
            </div>

            <div class="career-skills-tags">
              ${(career.coreStack || []).slice(0, 4).map(st => `<span class="tag-pill">${st}</span>`).join('')}
            </div>
          </div>

          <div class="career-actions">
            <button class="btn btn-sm ${isSelected ? 'btn-secondary' : 'btn-primary'}" style="flex: 1;" onclick="SkillBridgeApp.selectTargetCareer('${career.id}')">
              ${isSelected ? '✓ Current Target' : 'Set as Target'}
            </button>
            <button class="btn btn-sm btn-outline" onclick="SkillBridgeApp.inspectCareer('${career.id}')" title="View Detailed Curriculum">
              Inspect
            </button>
          </div>
        </div>
      `;
    }).join('');
  },

  selectTargetCareer(careerId) {
    SkillBridgeStorage.setSelectedCareer(careerId);
    this.renderCareersGrid();
    this.onCareerChange(careerId);
    this.showToast(`Target career changed to ${getCareerById(careerId).title}!`, 'success');
  },

  inspectCareer(careerId) {
    const career = getCareerById(careerId);
    const modalTitle = document.getElementById('modalCareerTitle');
    const modalBody = document.getElementById('modalCareerBody');
    if (modalTitle && modalBody) {
      modalTitle.textContent = `${career.icon} ${career.title}`;
      modalBody.innerHTML = `
        <div style="margin-bottom: 1.25rem;">
          <p style="font-size: 0.95rem; color: var(--text-main); line-height: 1.6; margin-bottom: 1rem;">${career.overview || career.description}</p>
          <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 1rem; margin-bottom: 1.25rem; background: rgba(15,23,42,0.6); padding: 1rem; border-radius: 8px;">
            <div>
              <span style="font-size: 0.75rem; color: var(--text-dim); text-transform: uppercase;">Average Compensation</span>
              <div style="font-size: 1.1rem; font-weight: 700; color: var(--accent-cyan);">${career.avgSalary}</div>
            </div>
            <div>
              <span style="font-size: 0.75rem; color: var(--text-dim); text-transform: uppercase;">Hiring Velocity</span>
              <div style="font-size: 1.1rem; font-weight: 700; color: var(--accent-emerald);">${career.growthRate}</div>
            </div>
          </div>

          <h4 style="font-size: 0.95rem; margin-bottom: 0.5rem; color: var(--accent-cyan);">Essential Core Skills:</h4>
          <div style="display: flex; flex-direction: column; gap: 0.4rem; margin-bottom: 1.25rem;">
            ${career.skills.map(s => `
              <div style="font-size: 0.85rem; padding: 0.4rem 0.6rem; background: rgba(255,255,255,0.03); border-radius: 4px; display: flex; justify-content: space-between;">
                <span><strong>${s.name}</strong> - <span style="color: var(--text-muted);">${s.desc}</span></span>
                <span class="badge badge-${s.importance === 'critical' ? 'rose' : 'cyan'}" style="margin-left: 0.5rem;">${s.importance}</span>
              </div>
            `).join('')}
          </div>

          <h4 style="font-size: 0.95rem; margin-bottom: 0.5rem; color: var(--accent-cyan);">Signature Portfolio Projects:</h4>
          <ul style="margin-left: 1.25rem; font-size: 0.86rem; color: var(--text-muted); line-height: 1.6;">
            ${(career.recommendedProjects || []).map(p => `<li><strong>${p.title}</strong> (\`${p.stack}\`): ${p.desc}</li>`).join('')}
          </ul>
        </div>
      `;
      this.openModal('modalCareerInspect');
    }
  },

  onCareerChange(careerId) {
    if (window.SkillGapModule) SkillGapModule.setCareer(careerId);
    if (window.RoadmapModule) RoadmapModule.render();
    this.updateAllViews();
  },

  /* ------------------------------------------------------------------------
     Reactive Dashboard View & Stats Calculations
     ------------------------------------------------------------------------ */
  updateAllViews() {
    const profile = SkillBridgeStorage.getProfile();
    const careerId = SkillBridgeStorage.getSelectedCareer();
    const career = getCareerById(careerId);
    const ratings = SkillBridgeStorage.getSkillRatings();
    const codingData = SkillBridgeStorage.getCodingData();
    const projects = SkillBridgeStorage.getProjects();
    const completedMilestones = SkillBridgeStorage.getCompletedMilestones();

    // 1. Welcome banner
    const welcomeName = document.getElementById('dashStudentName');
    if (welcomeName) welcomeName.textContent = profile.name || 'Student';

    const targetCareerPill = document.getElementById('dashTargetCareerPill');
    if (targetCareerPill) targetCareerPill.textContent = `${career.icon} ${career.title}`;

    // 2. Readiness Calculation
    let totalScore = 0;
    let maxScore = 0;
    career.skills.forEach(s => {
      const userVal = ratings[s.id] !== undefined ? ratings[s.id] : 30;
      const weight = s.importance === 'critical' ? 1.5 : (s.importance === 'high' ? 1.2 : 1.0);
      totalScore += (userVal / s.defaultBench) * 100 * weight;
      maxScore += 100 * weight;
    });

    const readinessPct = Math.min(100, Math.round(totalScore / (maxScore || 1)));

    // Circular Gauge update
    const gaugeVal = document.getElementById('dashGaugeValue');
    if (gaugeVal) gaugeVal.textContent = `${readinessPct}%`;

    const gaugeCircle = document.getElementById('dashGaugeCircle');
    if (gaugeCircle) {
      const circumference = 2 * Math.PI * 60; // r=60
      const offset = circumference - (readinessPct / 100) * circumference;
      gaugeCircle.style.strokeDasharray = `${circumference}`;
      gaugeCircle.style.strokeDashoffset = `${offset}`;
    }

    // Stat Cards
    const statSkills = document.getElementById('dashStatSkills');
    if (statSkills) statSkills.textContent = `${career.skills.length}`;

    const statStreak = document.getElementById('dashStatStreak');
    if (statStreak) statStreak.textContent = `${codingData.streak || 0}d`;

    const statProjects = document.getElementById('dashStatProjects');
    if (statProjects) {
      const completedProjs = projects.filter(p => p.status === 'completed').length;
      statProjects.textContent = `${completedProjs} / ${projects.length}`;
    }

    // Next Action Card Recommendation
    const nextActionCard = document.getElementById('dashNextActionText');
    if (nextActionCard) {
      const firstIncomplete = career.phases[0]?.milestones?.find(m => !completedMilestones.includes(m.id));
      if (firstIncomplete) {
        nextActionCard.innerHTML = `Advance your roadmap: Work on <strong>${firstIncomplete.title}</strong> (${firstIncomplete.hours})`;
      } else {
        nextActionCard.innerHTML = `Log your daily algorithmic problem in <strong>Coding Practice</strong> to keep your streak!`;
      }
    }
  },

  /* ------------------------------------------------------------------------
     Profile & Settings Modal
     ------------------------------------------------------------------------ */
  setupProfileSettings() {
    const form = document.getElementById('formProfileSettings');
    if (form) {
      form.addEventListener('submit', (e) => {
        e.preventDefault();
        const profile = SkillBridgeStorage.getProfile();
        profile.name = form.profileName.value.trim() || 'Student';
        profile.university = form.profileUniversity.value.trim();
        profile.gradYear = form.profileGradYear.value.trim();
        profile.dreamCompanies = form.profileDreamCompanies.value.trim();
        SkillBridgeStorage.setProfile(profile);

        this.closeModal('modalProfile');
        this.updateAllViews();
        this.showToast('Profile updated successfully!', 'success');
      });
    }

    // Export Data JSON
    const exportDataBtn = document.getElementById('btnExportUserData');
    if (exportDataBtn) {
      exportDataBtn.addEventListener('click', () => {
        const json = SkillBridgeStorage.exportAllData();
        const blob = new Blob([json], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `SkillBridge-backup-${new Date().toISOString().split('T')[0]}.json`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
        this.showToast('Backup JSON exported successfully!', 'info');
      });
    }

    // Reset Data
    const resetDataBtn = document.getElementById('btnResetUserData');
    if (resetDataBtn) {
      resetDataBtn.addEventListener('click', () => {
        if (confirm('Are you sure you want to reset all local progress to default demo settings?')) {
          SkillBridgeStorage.resetAllData();
          window.location.reload();
        }
      });
    }
  },

  openProfileModal() {
    const profile = SkillBridgeStorage.getProfile();
    const form = document.getElementById('formProfileSettings');
    if (form) {
      form.profileName.value = profile.name || '';
      form.profileUniversity.value = profile.university || '';
      form.profileGradYear.value = profile.gradYear || '';
      form.profileDreamCompanies.value = profile.dreamCompanies || '';
    }
    this.openModal('modalProfile');
  },

  /* ------------------------------------------------------------------------
     Language Switching
     ------------------------------------------------------------------------ */
  setupLanguage() {
    const langSelect = document.getElementById('langSelector');
    if (langSelect) {
      langSelect.value = SkillBridgeStorage.getLanguage();
      langSelect.addEventListener('change', (e) => {
        const chosen = e.target.value;
        SkillBridgeStorage.setLanguage(chosen);
        if (typeof updateDOMTranslations === 'function') {
          updateDOMTranslations();
        }
        this.showToast(`Language switched to ${chosen.toUpperCase()}`, 'info');
      });
    }
    if (typeof updateDOMTranslations === 'function') {
      updateDOMTranslations();
    }
  },

  /* ------------------------------------------------------------------------
     Modal System & Toast Alerts
     ------------------------------------------------------------------------ */
  setupModals() {
    document.querySelectorAll('.modal-overlay').forEach(overlay => {
      overlay.addEventListener('click', (e) => {
        if (e.target === overlay) {
          overlay.classList.remove('open');
        }
      });
    });

    document.querySelectorAll('.modal-close').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const modal = e.currentTarget.closest('.modal-overlay');
        if (modal) modal.classList.remove('open');
      });
    });
  },

  openModal(modalId) {
    const m = document.getElementById(modalId);
    if (m) m.classList.add('open');
  },

  closeModal(modalId) {
    const m = document.getElementById(modalId);
    if (m) m.classList.remove('open');
  },

  showToast(message, type = 'info') {
    const container = document.getElementById('toastContainer');
    if (!container) return;

    const toast = document.createElement('div');
    toast.className = `toast toast-${type}`;
    
    let icon = 'ℹ️';
    if (type === 'success') icon = '✓';
    if (type === 'error') icon = '⚠️';

    toast.innerHTML = `
      <span style="font-weight: 700; color: ${type === 'success' ? 'var(--accent-emerald)' : 'var(--accent-cyan)'};">${icon}</span>
      <span>${message}</span>
    `;

    container.appendChild(toast);

    setTimeout(() => {
      toast.style.opacity = '0';
      toast.style.transform = 'translateY(-8px)';
      setTimeout(() => toast.remove(), 250);
    }, 3200);
  }
};

// Auto-boot on DOM ready
document.addEventListener('DOMContentLoaded', () => {
  SkillBridgeApp.init();
});

