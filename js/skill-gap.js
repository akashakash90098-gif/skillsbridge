/* ==========================================================================
   SkillBridge — Student Career Navigator
   Skill-Gap Module: Assessment Logic, Real-Time Scoring, Canvas Chart
   ========================================================================== */

const SkillGapModule = {
  currentCareerId: 'fullstack',

  init() {
    this.currentCareerId = SkillBridgeStorage.getSelectedCareer();
    this.bindEvents();
    this.render();
  },

  bindEvents() {
    const careerSelect = document.getElementById('skillCareerSelect');
    if (careerSelect) {
      careerSelect.addEventListener('change', (e) => {
        this.currentCareerId = e.target.value;
        SkillBridgeStorage.setSelectedCareer(this.currentCareerId);
        this.render();
        if (window.SkillBridgeApp) {
          window.SkillBridgeApp.onCareerChange(this.currentCareerId);
        }
      });
    }

    const quickRateBtn = document.getElementById('btnQuickRateAll');
    if (quickRateBtn) {
      quickRateBtn.addEventListener('click', () => {
        this.quickRateIntermediate();
      });
    }

    const syncRoadmapBtn = document.getElementById('btnSyncRoadmap');
    if (syncRoadmapBtn) {
      syncRoadmapBtn.addEventListener('click', () => {
        window.location.hash = '#roadmap';
        if (window.SkillBridgeApp) {
          window.SkillBridgeApp.showToast('Roadmap synced with your current skill ratings!', 'success');
        }
      });
    }
  },

  setCareer(careerId) {
    this.currentCareerId = careerId;
    const careerSelect = document.getElementById('skillCareerSelect');
    if (careerSelect) {
      careerSelect.value = careerId;
    }
    this.render();
  },

  render() {
    const career = getCareerById(this.currentCareerId);
    const container = document.getElementById('skillItemsContainer');
    if (!container) return;

    // Populate dropdown if needed
    const careerSelect = document.getElementById('skillCareerSelect');
    if (careerSelect && careerSelect.options.length <= 1) {
      careerSelect.innerHTML = CAREERS_DATA.map(c => 
        `<option value="${c.id}" ${c.id === this.currentCareerId ? 'selected' : ''}>${c.icon} ${c.title}</option>`
      ).join('');
    } else if (careerSelect) {
      careerSelect.value = this.currentCareerId;
    }

    const ratings = SkillBridgeStorage.getSkillRatings();
    
    // Group skills by category
    const grouped = {};
    career.skills.forEach(skill => {
      const cat = skill.category || 'Core Competencies';
      if (!grouped[cat]) grouped[cat] = [];
      grouped[cat].push(skill);
    });

    let html = '';
    for (const [category, skills] of Object.entries(grouped)) {
      html += `
        <div class="skill-category-group">
          <div class="skill-category-title">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="9 18 15 12 9 6"></polyline></svg>
            ${category}
          </div>
          ${skills.map(skill => {
            const currentVal = ratings[skill.id] !== undefined ? ratings[skill.id] : 30;
            const targetVal = skill.defaultBench;
            const diff = currentVal - targetVal;
            const statusClass = diff >= 0 ? 'text-emerald' : (diff >= -25 ? 'text-amber' : 'text-rose');
            
            return `
              <div class="skill-item-row" data-skill-id="${skill.id}">
                <div class="skill-info">
                  <div class="skill-name-row">
                    <span class="skill-name">${skill.name}</span>
                    <span class="skill-importance importance-${skill.importance}">${skill.importance}</span>
                  </div>
                  <p class="skill-desc" style="font-size: 0.8rem; color: var(--text-dim); margin-bottom: 0.5rem;">${skill.desc}</p>
                  
                  <!-- Target benchmark vs current progress bar -->
                  <div style="display: flex; align-items: center; justify-content: space-between; font-size: 0.75rem; color: var(--text-muted); margin-bottom: 4px;">
                    <span>Current: <strong style="color: var(--accent-cyan);">${currentVal}%</strong></span>
                    <span>Target: <strong>${targetVal}%</strong></span>
                  </div>
                  <div style="height: 6px; background: rgba(255,255,255,0.06); border-radius: 3px; position: relative; overflow: hidden;">
                    <div style="position: absolute; left: 0; top: 0; bottom: 0; width: ${targetVal}%; background: rgba(255,255,255,0.12); border-right: 2px dashed #94a3b8;" title="Target Benchmark: ${targetVal}%"></div>
                    <div style="position: absolute; left: 0; top: 0; bottom: 0; width: ${currentVal}%; background: ${currentVal >= targetVal ? 'var(--accent-emerald)' : 'linear-gradient(90deg, #38bdf8, #6366f1)'}; transition: width 0.3s ease;"></div>
                  </div>
                </div>

                <div class="rating-pills-group">
                  <button type="button" class="rating-btn ${currentVal === 0 ? 'active' : ''}" onclick="SkillGapModule.setRating('${skill.id}', 0)">0% None</button>
                  <button type="button" class="rating-btn ${currentVal === 25 ? 'active' : ''}" onclick="SkillGapModule.setRating('${skill.id}', 25)">25% Novice</button>
                  <button type="button" class="rating-btn ${currentVal === 60 ? 'active' : ''}" onclick="SkillGapModule.setRating('${skill.id}', 60)">60% Competent</button>
                  <button type="button" class="rating-btn ${currentVal === 90 ? 'active' : ''}" onclick="SkillGapModule.setRating('${skill.id}', 90)">90% Proficient</button>
                </div>
              </div>
            `;
          }).join('')}
        </div>
      `;
    }

    container.innerHTML = html;
    this.updateCalculations();
  },

  setRating(skillId, val) {
    SkillBridgeStorage.setSkillRating(skillId, val);
    this.render();
    if (window.SkillBridgeApp) {
      window.SkillBridgeApp.updateAllViews();
    }
  },

  quickRateIntermediate() {
    const career = getCareerById(this.currentCareerId);
    const batch = {};
    career.skills.forEach(s => {
      batch[s.id] = 60;
    });
    SkillBridgeStorage.setBatchSkillRatings(batch);
    this.render();
    if (window.SkillBridgeApp) {
      window.SkillBridgeApp.showToast('All skills set to Competent (60%) baseline', 'info');
      window.SkillBridgeApp.updateAllViews();
    }
  },

  updateCalculations() {
    const career = getCareerById(this.currentCareerId);
    const ratings = SkillBridgeStorage.getSkillRatings();
    
    let totalScore = 0;
    let maxPossible = 0;
    let masteredCount = 0;
    let criticalGaps = [];

    career.skills.forEach(skill => {
      const userVal = ratings[skill.id] !== undefined ? ratings[skill.id] : 30;
      const targetVal = skill.defaultBench;
      
      const weight = skill.importance === 'critical' ? 1.5 : (skill.importance === 'high' ? 1.2 : 1.0);
      totalScore += (userVal / targetVal) * 100 * weight;
      maxPossible += 100 * weight;

      if (userVal >= targetVal * 0.9) {
        masteredCount++;
      } else if (userVal < 50 && (skill.importance === 'critical' || skill.importance === 'high')) {
        criticalGaps.push({ skill, gap: targetVal - userVal });
      }
    });

    const readinessPct = Math.min(100, Math.round(totalScore / (maxPossible || 1)));

    // Update Score Pill in UI
    const scoreValEl = document.getElementById('gapReadinessScore');
    if (scoreValEl) {
      scoreValEl.textContent = `${readinessPct}%`;
    }

    const masteredEl = document.getElementById('gapMasteredCount');
    if (masteredEl) {
      masteredEl.textContent = `${masteredCount} of ${career.skills.length}`;
    }

    // Critical gaps list
    const gapsListEl = document.getElementById('criticalGapsList');
    if (gapsListEl) {
      if (criticalGaps.length === 0) {
        gapsListEl.innerHTML = `
          <div style="color: var(--accent-emerald); font-size: 0.85rem; display: flex; align-items: center; gap: 0.5rem; padding: 0.5rem 0;">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="20 6 9 17 4 12"></polyline></svg>
            No critical gaps! You are close to target hiring benchmarks.
          </div>
        `;
      } else {
        gapsListEl.innerHTML = criticalGaps.map(item => `
          <li style="display: flex; align-items: center; justify-content: space-between; font-size: 0.82rem; margin-bottom: 0.4rem; padding: 0.35rem 0.5rem; background: rgba(244, 63, 94, 0.08); border-radius: 4px; border-left: 2px solid var(--accent-rose);">
            <span style="color: var(--text-main); font-weight: 500;">${item.skill.name}</span>
            <span style="color: var(--accent-rose); font-weight: 700;">-${item.gap}% gap</span>
          </li>
        `).join('');
      }
    }

    // Draw comparison canvas chart
    this.drawChart(career, ratings);
  },

  drawChart(career, ratings) {
    const canvas = document.getElementById('skillGapCanvas');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // High DPI Canvas Scaling
    const dpr = window.devicePixelRatio || 1;
    const width = canvas.parentElement.clientWidth || 400;
    const height = 260;

    canvas.width = width * dpr;
    canvas.height = height * dpr;
    canvas.style.width = width + 'px';
    canvas.style.height = height + 'px';
    ctx.scale(dpr, dpr);

    ctx.clearRect(0, 0, width, height);

    const skills = career.skills.slice(0, 7); // Show top 7 skills
    const barHeight = 14;
    const gap = 20;
    const startY = 25;
    const maxBarWidth = width - 150;

    skills.forEach((skill, index) => {
      const userVal = ratings[skill.id] !== undefined ? ratings[skill.id] : 30;
      const targetVal = skill.defaultBench;
      const y = startY + index * (barHeight + gap);

      // Skill Label
      ctx.fillStyle = '#94a3b8';
      ctx.font = '11px Inter, sans-serif';
      ctx.textAlign = 'left';
      ctx.fillText(skill.name.length > 18 ? skill.name.slice(0, 16) + '...' : skill.name, 10, y + 10);

      const barX = 130;
      const userW = (userVal / 100) * maxBarWidth;
      const targetW = (targetVal / 100) * maxBarWidth;

      // Background Track
      ctx.fillStyle = 'rgba(255, 255, 255, 0.04)';
      ctx.fillRect(barX, y, maxBarWidth, barHeight);

      // Target marker line
      ctx.fillStyle = 'rgba(56, 189, 248, 0.25)';
      ctx.fillRect(barX, y, targetW, barHeight);
      ctx.fillStyle = '#38bdf8';
      ctx.fillRect(barX + targetW - 2, y - 2, 3, barHeight + 4);

      // User Fill Bar
      const gradient = ctx.createLinearGradient(barX, 0, barX + userW, 0);
      gradient.addColorStop(0, '#0284c7');
      gradient.addColorStop(1, userVal >= targetVal ? '#10b981' : '#38bdf8');
      ctx.fillStyle = gradient;
      ctx.fillRect(barX, y + 2, userW, barHeight - 4);

      // Value text
      ctx.fillStyle = '#f8fafc';
      ctx.font = 'bold 10px Inter, sans-serif';
      ctx.textAlign = 'right';
      ctx.fillText(`${userVal}%`, width - 5, y + 11);
    });
  }
};

