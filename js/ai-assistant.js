/* ==========================================================================
   SkillBridge — Student Career Navigator
   AI Career Assistant: Copilot Drawer, Serverless API Caller & Local Fallback
   ========================================================================== */

const AIAssistantModule = {
  isOpen: false,
  isGenerating: false,

  init() {
    this.bindEvents();
    this.renderHistory();
  },

  bindEvents() {
    // Open/Close triggers
    const toggleBtns = document.querySelectorAll('.js-open-ai-drawer');
    toggleBtns.forEach(btn => {
      btn.addEventListener('click', () => this.openDrawer());
    });

    const closeBtn = document.getElementById('aiDrawerClose');
    if (closeBtn) {
      closeBtn.addEventListener('click', () => this.closeDrawer());
    }

    // Chat form
    const form = document.getElementById('aiChatForm');
    if (form) {
      form.addEventListener('submit', (e) => {
        e.preventDefault();
        const input = document.getElementById('aiChatInput');
        const text = input.value.trim();
        if (text) {
          input.value = '';
          this.sendMessage(text);
        }
      });
    }

    // Quick prompt chips
    const chips = document.querySelectorAll('.quick-prompt-chip');
    chips.forEach(chip => {
      chip.addEventListener('click', (e) => {
        const promptText = e.currentTarget.getAttribute('data-prompt') || e.currentTarget.textContent;
        this.sendMessage(promptText.trim());
      });
    });

    // Clear chat
    const clearBtn = document.getElementById('aiClearHistory');
    if (clearBtn) {
      clearBtn.addEventListener('click', () => {
        if (confirm('Clear chat history?')) {
          SkillBridgeStorage.clearAiHistory();
          this.renderHistory();
        }
      });
    }
  },

  openDrawer() {
    const drawer = document.getElementById('aiDrawer');
    if (drawer) {
      drawer.classList.add('open');
      this.isOpen = true;
      document.body.style.overflow = window.innerWidth <= 768 ? 'hidden' : '';
      setTimeout(() => {
        const input = document.getElementById('aiChatInput');
        if (input) input.focus();
      }, 300);
    }
  },

  closeDrawer() {
    const drawer = document.getElementById('aiDrawer');
    if (drawer) {
      drawer.classList.remove('open');
      this.isOpen = false;
      document.body.style.overflow = '';
    }
  },

  renderHistory() {
    const container = document.getElementById('aiMessagesList');
    if (!container) return;

    const history = SkillBridgeStorage.getAiHistory();
    container.innerHTML = history.map(msg => this.createMessageHTML(msg.sender, msg.text, msg.time)).join('');
    this.scrollToBottom();
  },

  createMessageHTML(sender, text, time) {
    const isBot = sender === 'bot';
    const formattedText = this.formatMarkdown(text);

    return `
      <div class="chat-message ${isBot ? 'bot' : 'user'}">
        <div class="chat-bubble">
          ${formattedText}
          <div style="font-size: 0.7rem; color: ${isBot ? 'var(--text-dim)' : 'rgba(255,255,255,0.7)'}; margin-top: 0.35rem; text-align: right;">
            ${time || 'Now'}
          </div>
        </div>
      </div>
    `;
  },

  formatMarkdown(str) {
    if (!str) return '';
    let text = str
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;');

    // Code blocks ```code```
    text = text.replace(/```([\s\S]*?)```/g, '<pre style="background: rgba(0,0,0,0.4); padding: 0.75rem; border-radius: 6px; overflow-x: auto; margin: 0.5rem 0; font-size: 0.8rem; border: 1px solid var(--border-subtle);"><code>$1</code></pre>');

    // Inline code `code`
    text = text.replace(/`([^`]+)`/g, '<code style="background: rgba(255,255,255,0.1); padding: 2px 5px; border-radius: 4px; font-size: 0.85em; color: var(--accent-cyan);">$1</code>');

    // Bold **text**
    text = text.replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>');

    // Italic *text*
    text = text.replace(/\*([^*]+)\*/g, '<em>$1</em>');

    // Newlines to <br> or list items
    const lines = text.split('\n');
    let inList = false;
    let result = '';

    lines.forEach(line => {
      const trimmed = line.trim();
      if (trimmed.startsWith('- ') || trimmed.startsWith('• ') || /^\d+\.\s/.test(trimmed)) {
        if (!inList) {
          result += '<ul style="margin: 0.5rem 0 0.5rem 1.25rem; padding: 0;">';
          inList = true;
        }
        const bulletContent = trimmed.replace(/^[-•\d.]+\s*/, '');
        result += `<li style="margin-bottom: 0.25rem;">${bulletContent}</li>`;
      } else {
        if (inList) {
          result += '</ul>';
          inList = false;
        }
        if (trimmed) {
          result += `<p style="margin-bottom: 0.45rem;">${trimmed}</p>`;
        }
      }
    });

    if (inList) result += '</ul>';
    return result;
  },

  scrollToBottom() {
    const container = document.getElementById('aiMessagesList');
    if (container) {
      container.scrollTop = container.scrollHeight;
    }
  },

  async sendMessage(userInput) {
    if (this.isGenerating) return;
    this.isGenerating = true;

    const time = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

    // Append User message to UI
    const history = SkillBridgeStorage.getAiHistory();
    history.push({ sender: 'user', text: userInput, time });
    SkillBridgeStorage.setAiHistory(history);
    this.renderHistory();

    // Show typing placeholder
    const container = document.getElementById('aiMessagesList');
    const typingId = 'typing_' + Date.now();
    if (container) {
      container.insertAdjacentHTML('beforeend', `
        <div class="chat-message bot" id="${typingId}">
          <div class="chat-bubble" style="display: flex; align-items: center; gap: 0.5rem; color: var(--accent-cyan);">
            <div class="pulse-dot"></div>
            <span>SkillBridge AI is thinking...</span>
          </div>
        </div>
      `);
      this.scrollToBottom();
    }

    const currentCareer = getCareerById(SkillBridgeStorage.getSelectedCareer());
    const profile = SkillBridgeStorage.getProfile();
    const ratings = SkillBridgeStorage.getSkillRatings();

    let botResponse = '';
    let isRealAI = false;

    try {
      // Attempt to invoke the serverless API endpoint
      const response = await fetch('/api/ai', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: userInput,
          career: {
            id: currentCareer.id,
            title: currentCareer.title,
            skills: currentCareer.skills
          },
          student: profile,
          currentRatings: ratings
        })
      });

      if (response.ok) {
        const data = await response.json();
        if (data.reply) {
          botResponse = data.reply;
          isRealAI = data.source === 'ai';
        }
      }
    } catch (err) {
      console.warn('API /api/ai not reachable or offline, using SkillBridge Local Rule Engine fallback:', err);
    }

    // If serverless endpoint is not configured or failed, use rich rule-based fallback
    if (!botResponse) {
      botResponse = this.generateLocalFallback(userInput, currentCareer, profile, ratings);
    }

    // Remove typing indicator
    const typingEl = document.getElementById(typingId);
    if (typingEl) typingEl.remove();

    // Save & render bot response
    history.push({
      sender: 'bot',
      text: botResponse,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    });
    SkillBridgeStorage.setAiHistory(history);
    this.renderHistory();
    this.isGenerating = false;
  },

  generateLocalFallback(query, career, profile, ratings) {
    const q = query.toLowerCase();

    // 1. Skill gap analysis prompt
    if (q.includes('gap') || q.includes('analyze') || q.includes('focus')) {
      const missingSkills = career.skills.filter(s => (ratings[s.id] || 30) < s.defaultBench);
      const top3 = missingSkills.slice(0, 3);
      
      let reply = `### 📊 Skill-Gap Analysis for **${career.title}**\n\n`;
      reply += `Based on your profile, here is where you stand relative to hiring standards:\n\n`;
      if (top3.length > 0) {
        reply += `**Top 3 Immediate Focus Areas:**\n`;
        top3.forEach((s, i) => {
          const current = ratings[s.id] || 30;
          reply += `${i + 1}. **${s.name}** (Current: ${current}% | Target: ${s.defaultBench}%)\n   - *Why it matters*: ${s.desc}\n`;
        });
        reply += `\n**Recommended Action:** Head over to the **Learning Roadmap** tab to check off Milestone 1 and begin the hands-on sprint project.`;
      } else {
        reply += `🎉 **Outstanding!** You have met or exceeded the hiring benchmark for all core skills in **${career.title}**. Focus now on building production-grade portfolio projects and practicing LeetCode Mediums!`;
      }
      return reply;
    }

    // 2. 30-day study sprint prompt
    if (q.includes('30-day') || q.includes('study plan') || q.includes('sprint') || q.includes('plan')) {
      return `### 🗓️ 30-Day Intensive Sprint for **${career.title}**\n\n` +
        `Here is your structured 4-week roadmap to rapidly close competencies:\n\n` +
        `- **Week 1: Core Fundamentals & Tooling**\n` +
        `  - Revisit critical language concepts (Promises, async patterns, types).\n` +
        `  - Set up local Docker environments and Git workflow.\n` +
        `- **Week 2: Backend & Architecture Deep-Dive**\n` +
        `  - Build secure REST APIs with authentication (JWT, OAuth).\n` +
        `  - Model database schemas with relational constraints and indexing.\n` +
        `- **Week 3: Production Portfolio Sprint**\n` +
        `  - Develop a complete full-stack capstone project featuring real-time capabilities or caching.\n` +
        `  - Deploy to Vercel/Cloud with automated CI/CD.\n` +
        `- **Week 4: Technical Interview & DSA Prep**\n` +
        `  - Solve 15 targeted NeetCode/LeetCode problems (Arrays, Two Pointers, Trees).\n` +
        `  - Practice answering behavioral and system architecture questions using the STAR format.\n\n` +
        `*Tip: Log your daily problems in the **Coding Practice** tracker to keep your streak burning!*`;
    }

    // 3. Project recommendation prompt
    if (q.includes('project') || q.includes('resume') || q.includes('portfolio') || q.includes('build')) {
      const recs = career.recommendedProjects || [];
      let reply = `### 🚀 Recommended High-Impact Projects for **${career.title}**\n\n`;
      reply += `Recruiters look for architectural complexity, test coverage, and public deployments. Here are top picks:\n\n`;
      recs.forEach((p, idx) => {
        reply += `${idx + 1}. **${p.title}**\n   - **Tech Stack:** \`${p.stack}\`\n   - **Architecture:** ${p.desc}\n\n`;
      });
      reply += `You can add these directly to your **Portfolio Project Tracker** tab to track implementation status!`;
      return reply;
    }

    // 4. Mock interview prompt
    if (q.includes('interview') || q.includes('question') || q.includes('quiz')) {
      return `### 🎤 Technical Mock Interview for **${career.title}**\n\n` +
        `Test your technical knowledge with these 3 real-world interview questions:\n\n` +
        `**1. Core Architecture:** How does the browser event loop handle microtasks (e.g. Promises) vs macrotasks (e.g. \`setTimeout\`)?\n` +
        `   - *What the interviewer expects:* Explanation of the call stack, microtask queue priority, and render cycles.\n\n` +
        `**2. System Reliability:** When scaling database queries under heavy read traffic, when would you choose Redis caching over direct database read replicas?\n` +
        `   - *What the interviewer expects:* Trade-offs regarding cache invalidation complexity, TTL strategies, and memory constraints vs replica lag.\n\n` +
        `**3. Production Security:** How do you prevent and mitigate Cross-Site Scripting (XSS) and SQL Injection in a modern web app?\n` +
        `   - *What the interviewer expects:* Parameterized queries, Content Security Policy (CSP), HTTP-only cookies, and DOM sanitization.\n\n` +
        `*Try typing your answer to question 1 below to test your explanation!*`;
    }

    // Default guidance
    return `### 💡 Career Guidance for **${career.title}**\n\n` +
      `I can help you navigate every stage of your preparation for **${career.title}** roles:\n\n` +
      `- **Skill-Gap Assessment:** Ask *"Analyze my skill gap"* to see high-priority deficiencies.\n` +
      `- **Actionable Study Sprints:** Ask *"Create a 30-day study plan"* for a structured calendar.\n` +
      `- **Standout Portfolio Ideas:** Ask *"Suggest resume projects"* with full architecture notes.\n` +
      `- **Interview Readiness:** Ask *"Give me 3 technical interview questions"* to test yourself.\n\n` +
      `*(SkillBridge Local Intelligence Mode)*`;
  }
};
