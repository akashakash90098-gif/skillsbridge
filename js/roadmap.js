/* ==========================================================================
   SkillBridge — Student Career Navigator
   Roadmap Module: Interactive Milestones, Phase Tracker & Progress Engine
   ========================================================================== */

const RoadmapModule = {
  currentFilter: 'all', // 'all', 'pending', 'completed'

  init() {
    this.bindEvents();
    this.render();
  },

  bindEvents() {
    const filterBtns = document.querySelectorAll('.roadmap-filter-btn');
    filterBtns.forEach(btn => {
      btn.addEventListener('click', (e) => {
        filterBtns.forEach(b => b.classList.remove('active'));
        e.currentTarget.classList.add('active');
        this.currentFilter = e.currentTarget.getAttribute('data-filter') || 'all';
        this.render();
      });
    });

    const exportBtn = document.getElementById('btnExportRoadmap');
    if (exportBtn) {
      exportBtn.addEventListener('click', () => {
        this.exportRoadmapText();
      });
    }
  },

  render() {
    const careerId = SkillBridgeStorage.getSelectedCareer();
    const career = getCareerById(careerId);
    const container = document.getElementById('roadmapPhasesContainer');
    if (!container) return;

    // Update career title banner in roadmap header
    const titleEl = document.getElementById('roadmapCareerTitle');
    if (titleEl) {
      titleEl.textContent = `${career.icon} ${career.title}`;
    }

    const completed = SkillBridgeStorage.getCompletedMilestones();
    let totalMilestones = 0;
    let completedCount = 0;

    career.phases.forEach(phase => {
      phase.milestones.forEach(m => {
        totalMilestones++;
        if (completed.includes(m.id)) completedCount++;
      });
    });

    const percent = Math.round((completedCount / (totalMilestones || 1)) * 100);

    // Update Progress header
    const pctEl = document.getElementById('roadmapProgressPercent');
    if (pctEl) pctEl.textContent = `${percent}%`;

    const progBar = document.getElementById('roadmapProgressBarFill');
    if (progBar) progBar.style.width = `${percent}%`;

    const countEl = document.getElementById('roadmapMilestoneCount');
    if (countEl) countEl.textContent = `${completedCount} of ${totalMilestones} completed`;

    // Render Phases & Milestones
    let html = '';
    career.phases.forEach((phase) => {
      // Filter milestones if needed
      const filteredMilestones = phase.milestones.filter(m => {
        const isDone = completed.includes(m.id);
        if (this.currentFilter === 'pending') return !isDone;
        if (this.currentFilter === 'completed') return isDone;
        return true;
      });

      if (filteredMilestones.length === 0 && this.currentFilter !== 'all') {
        return; // Skip phase if no matching milestones
      }

      html += `
        <div class="roadmap-phase-block">
          <div class="phase-node">${phase.phaseNum}</div>
          <div class="roadmap-phase-header">
            <div>
              <h3 style="font-size: 1.15rem; color: var(--text-main); margin-bottom: 2px;">${phase.title}</h3>
              <span style="font-size: 0.8rem; color: var(--accent-cyan); font-weight: 500;">Estimated: ${phase.duration}</span>
            </div>
          </div>

          <div class="phase-milestones-list">
            ${filteredMilestones.map(m => {
              const isChecked = completed.includes(m.id);
              return `
                <div class="milestone-item ${isChecked ? 'completed' : ''}" id="card_${m.id}">
                  <input type="checkbox" class="milestone-checkbox" 
                    id="chk_${m.id}" 
                    ${isChecked ? 'checked' : ''} 
                    onchange="RoadmapModule.toggleMilestone('${m.id}')"
                    aria-label="Mark ${m.title} as completed"
                  />
                  <div class="milestone-body">
                    <div style="display: flex; align-items: center; justify-content: space-between; flex-wrap: wrap; gap: 0.5rem; margin-bottom: 0.4rem;">
                      <label for="chk_${m.id}" class="milestone-title" style="cursor: pointer; margin-bottom: 0;">${m.title}</label>
                      <span class="badge badge-indigo">${m.hours || '20 hrs'}</span>
                    </div>

                    <div style="display: flex; flex-wrap: wrap; gap: 0.35rem; margin-bottom: 0.75rem;">
                      ${(m.topics || []).map(t => `<span class="tag-pill">${t}</span>`).join('')}
                    </div>

                    ${m.projectIdea ? `
                      <div style="background: rgba(15, 23, 42, 0.6); border: 1px solid var(--border-subtle); border-radius: 6px; padding: 0.65rem 0.85rem; font-size: 0.82rem; display: flex; align-items: center; gap: 0.5rem;">
                        <span style="color: var(--accent-amber);">💡 Project Sprint:</span>
                        <span style="color: var(--text-main); font-weight: 500;">${m.projectIdea}</span>
                      </div>
                    ` : ''}
                  </div>
                </div>
              `;
            }).join('')}
          </div>
        </div>
      `;
    });

    if (!html) {
      html = `
        <div style="text-align: center; padding: 3rem 1rem; color: var(--text-muted);">
          <p>No milestones match the selected filter <strong>${this.currentFilter}</strong>.</p>
        </div>
      `;
    }

    container.innerHTML = html;
  },

  toggleMilestone(id) {
    SkillBridgeStorage.toggleMilestone(id);
    this.render();
    if (window.SkillBridgeApp) {
      window.SkillBridgeApp.updateAllViews();
      window.SkillBridgeApp.showToast('Milestone progress updated!', 'success');
    }
  },

  exportRoadmapText() {
    const career = getCareerById(SkillBridgeStorage.getSelectedCareer());
    const completed = SkillBridgeStorage.getCompletedMilestones();
    
    let text = `=================================================\n`;
    text += `SkillBridge Learning Roadmap: ${career.title}\n`;
    text += `Target Career Demand: ${career.demand} | Avg Salary: ${career.avgSalary}\n`;
    text += `Generated on: ${new Date().toLocaleDateString()}\n`;
    text += `=================================================\n\n`;

    career.phases.forEach(p => {
      text += `[${p.title}] (Duration: ${p.duration})\n`;
      p.milestones.forEach(m => {
        const isDone = completed.includes(m.id) ? '[X]' : '[ ]';
        text += `  ${isDone} ${m.title} (${m.hours})\n`;
        text += `      Topics: ${m.topics.join(', ')}\n`;
        if (m.projectIdea) text += `      Sprint Project: ${m.projectIdea}\n`;
      });
      text += `\n`;
    });

    // Create a temporary downloadable text file
    const blob = new Blob([text], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `SkillBridge-${career.id}-roadmap.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);

    if (window.SkillBridgeApp) {
      window.SkillBridgeApp.showToast('Roadmap downloaded successfully!', 'info');
    }
  }
};
