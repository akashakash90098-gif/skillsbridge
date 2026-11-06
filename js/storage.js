/* ==========================================================================
   SkillBridge — Student Career Navigator
   Storage Module: LocalStorage State Management & Defaults
   ========================================================================== */

const SB_STORAGE_KEYS = {
  PROFILE: 'sb_profile',
  SELECTED_CAREER: 'sb_selected_career',
  SKILLS: 'sb_skills_ratings',
  MILESTONES: 'sb_milestones',
  PROJECTS: 'sb_projects',
  CODING: 'sb_coding_problems',
  AI_HISTORY: 'sb_ai_history',
  BOOKMARKS: 'sb_bookmarks',
  LANG: 'sb_language',
  THEME: 'sb_theme'
};

const SkillBridgeStorage = {
  // Profile
  getProfile() {
    try {
      const data = localStorage.getItem(SB_STORAGE_KEYS.PROFILE);
      return data ? JSON.parse(data) : {
        name: 'Alex Rivera',
        university: 'Global Institute of Technology',
        gradYear: '2026',
        targetCareer: 'fullstack',
        dreamCompanies: 'Google, Stripe, Microsoft',
        bio: 'Passionate computer science student aiming for senior engineering roles.'
      };
    } catch (e) {
      console.warn('Storage read failed:', e);
      return { name: 'Student', targetCareer: 'fullstack' };
    }
  },

  setProfile(profile) {
    try {
      localStorage.setItem(SB_STORAGE_KEYS.PROFILE, JSON.stringify(profile));
    } catch (e) {
      console.error('Failed to save profile', e);
    }
  },

  // Target Career
  getSelectedCareer() {
    try {
      return localStorage.getItem(SB_STORAGE_KEYS.SELECTED_CAREER) || 'fullstack';
    } catch (e) {
      return 'fullstack';
    }
  },

  setSelectedCareer(careerId) {
    try {
      localStorage.setItem(SB_STORAGE_KEYS.SELECTED_CAREER, careerId);
    } catch (e) {
      console.error('Failed to save career', e);
    }
  },

  // Skill Ratings: { [skillId]: number (0-100) }
  getSkillRatings() {
    try {
      const data = localStorage.getItem(SB_STORAGE_KEYS.SKILLS);
      return data ? JSON.parse(data) : {};
    } catch (e) {
      return {};
    }
  },

  setSkillRating(skillId, rating) {
    try {
      const ratings = this.getSkillRatings();
      ratings[skillId] = Number(rating);
      localStorage.setItem(SB_STORAGE_KEYS.SKILLS, JSON.stringify(ratings));
      return ratings;
    } catch (e) {
      console.error('Failed to save skill rating', e);
      return {};
    }
  },

  setBatchSkillRatings(ratingsObj) {
    try {
      const ratings = { ...this.getSkillRatings(), ...ratingsObj };
      localStorage.setItem(SB_STORAGE_KEYS.SKILLS, JSON.stringify(ratings));
      return ratings;
    } catch (e) {
      console.error('Failed to batch save skills', e);
    }
  },

  // Roadmap Milestones: array of completed milestone IDs
  getCompletedMilestones() {
    try {
      const data = localStorage.getItem(SB_STORAGE_KEYS.MILESTONES);
      return data ? JSON.parse(data) : ['m1_html_css', 'm1_js_basics'];
    } catch (e) {
      return [];
    }
  },

  toggleMilestone(milestoneId) {
    try {
      let completed = this.getCompletedMilestones();
      if (completed.includes(milestoneId)) {
        completed = completed.filter(id => id !== milestoneId);
      } else {
        completed.push(milestoneId);
      }
      localStorage.setItem(SB_STORAGE_KEYS.MILESTONES, JSON.stringify(completed));
      return completed;
    } catch (e) {
      console.error('Failed to toggle milestone', e);
      return [];
    }
  },

  // Portfolio Projects
  getProjects() {
    try {
      const data = localStorage.getItem(SB_STORAGE_KEYS.PROJECTS);
      if (data) return JSON.parse(data);

      // Default Starter Projects
      const defaultProjects = [
        {
          id: 'proj_1',
          title: 'SkillBridge Career Navigator',
          description: 'Interactive career guidance web app with real-time skill-gap analysis, custom roadmaps, and AI assistant.',
          techStack: ['JavaScript', 'HTML5', 'CSS3', 'Node.js', 'Vercel API'],
          status: 'completed',
          demoUrl: '#',
          githubUrl: 'https://github.com',
          featured: true,
          date: '2026-11-01'
        },
        {
          id: 'proj_2',
          title: 'E-Commerce Microservices Engine',
          description: 'High-throughput inventory and checkout service built with REST API, PostgreSQL, and Redis cache.',
          techStack: ['Node.js', 'Express', 'PostgreSQL', 'Docker'],
          status: 'in-progress',
          demoUrl: '',
          githubUrl: 'https://github.com',
          featured: false,
          date: '2026-10-15'
        },
        {
          id: 'proj_3',
          title: 'Real-Time Collaborative Code Editor',
          description: 'WebSocket-driven in-browser code editor with syntax highlighting and instant multi-cursor sync.',
          techStack: ['WebSockets', 'React', 'Node.js'],
          status: 'idea',
          demoUrl: '',
          githubUrl: '',
          featured: false,
          date: '2026-11-05'
        }
      ];
      this.setProjects(defaultProjects);
      return defaultProjects;
    } catch (e) {
      return [];
    }
  },

  setProjects(projects) {
    try {
      localStorage.setItem(SB_STORAGE_KEYS.PROJECTS, JSON.stringify(projects));
    } catch (e) {
      console.error('Failed to save projects', e);
    }
  },

  addProject(project) {
    const projects = this.getProjects();
    const newProj = {
      id: 'proj_' + Date.now(),
      date: new Date().toISOString().split('T')[0],
      featured: false,
      ...project
    };
    projects.unshift(newProj);
    this.setProjects(projects);
    return newProj;
  },

  deleteProject(id) {
    let projects = this.getProjects();
    projects = projects.filter(p => p.id !== id);
    this.setProjects(projects);
    return projects;
  },

  updateProjectStatus(id, newStatus) {
    const projects = this.getProjects();
    const target = projects.find(p => p.id === id);
    if (target) {
      target.status = newStatus;
      this.setProjects(projects);
    }
    return projects;
  },

  // Coding Practice Tracker & Streaks
  getCodingData() {
    try {
      const data = localStorage.getItem(SB_STORAGE_KEYS.CODING);
      if (data) return JSON.parse(data);

      const defaultData = {
        streak: 12,
        lastActiveDate: new Date().toISOString().split('T')[0],
        problems: [
          {
            id: 'prob_1',
            title: 'Two Sum',
            platform: 'LeetCode',
            difficulty: 'Easy',
            topic: 'Arrays & Hashing',
            date: '2026-11-06',
            notes: 'Used hash map for O(n) one-pass solution.'
          },
          {
            id: 'prob_2',
            title: 'Longest Substring Without Repeating Characters',
            platform: 'LeetCode',
            difficulty: 'Medium',
            topic: 'Sliding Window',
            date: '2026-11-05',
            notes: 'Tracked character index positions to slide left pointer.'
          },
          {
            id: 'prob_3',
            title: 'Valid Parentheses',
            platform: 'LeetCode',
            difficulty: 'Easy',
            topic: 'Stack',
            date: '2026-11-04',
            notes: 'Classic stack matching closing to opening bracket.'
          },
          {
            id: 'prob_4',
            title: 'Course Schedule (Cycle Detection)',
            platform: 'LeetCode',
            difficulty: 'Medium',
            topic: 'Graphs & BFS/DFS',
            date: '2026-11-03',
            notes: 'Kahn topological sort with in-degree array.'
          },
          {
            id: 'prob_5',
            title: 'Trapping Rain Water',
            platform: 'LeetCode',
            difficulty: 'Hard',
            topic: 'Two Pointers',
            date: '2026-11-02',
            notes: 'Calculated leftMax and rightMax with two pointers approach.'
          }
        ]
      };
      this.setCodingData(defaultData);
      return defaultData;
    } catch (e) {
      return { streak: 0, problems: [] };
    }
  },

  setCodingData(codingData) {
    try {
      localStorage.setItem(SB_STORAGE_KEYS.CODING, JSON.stringify(codingData));
    } catch (e) {
      console.error('Failed to save coding data', e);
    }
  },

  addCodingProblem(problem) {
    const data = this.getCodingData();
    const today = new Date().toISOString().split('T')[0];
    
    // Check streak continuation
    if (data.lastActiveDate !== today) {
      const yesterday = new Date(Date.now() - 86400000).toISOString().split('T')[0];
      if (data.lastActiveDate === yesterday) {
        data.streak += 1;
      } else {
        data.streak = 1;
      }
      data.lastActiveDate = today;
    }

    const newProblem = {
      id: 'prob_' + Date.now(),
      date: today,
      ...problem
    };
    data.problems.unshift(newProblem);
    this.setCodingData(data);
    return data;
  },

  // AI Chat History
  getAiHistory() {
    try {
      const data = localStorage.getItem(SB_STORAGE_KEYS.AI_HISTORY);
      return data ? JSON.parse(data) : [
        {
          sender: 'bot',
          time: 'Just now',
          text: 'Hello! I am your **SkillBridge AI Career Copilot**. I can evaluate your skill gaps, generate a personalized 30-day study sprint, suggest portfolio projects, or conduct mock technical interview questions for your chosen career track. What would you like to explore today?'
        }
      ];
    } catch (e) {
      return [];
    }
  },

  setAiHistory(history) {
    try {
      localStorage.setItem(SB_STORAGE_KEYS.AI_HISTORY, JSON.stringify(history));
    } catch (e) {
      console.error('Failed to save chat history', e);
    }
  },

  clearAiHistory() {
    try {
      localStorage.removeItem(SB_STORAGE_KEYS.AI_HISTORY);
    } catch (e) {}
  },

  // Bookmarks
  getBookmarks() {
    try {
      const data = localStorage.getItem(SB_STORAGE_KEYS.BOOKMARKS);
      return data ? JSON.parse(data) : ['res_mdn', 'res_roadmap_sh'];
    } catch (e) {
      return [];
    }
  },

  toggleBookmark(resourceId) {
    try {
      let marks = this.getBookmarks();
      if (marks.includes(resourceId)) {
        marks = marks.filter(id => id !== resourceId);
      } else {
        marks.push(resourceId);
      }
      localStorage.setItem(SB_STORAGE_KEYS.BOOKMARKS, JSON.stringify(marks));
      return marks;
    } catch (e) {
      return [];
    }
  },

  // Language & Theme
  getLanguage() {
    return localStorage.getItem(SB_STORAGE_KEYS.LANG) || 'en';
  },

  setLanguage(lang) {
    localStorage.setItem(SB_STORAGE_KEYS.LANG, lang);
  },

  // Backup & Restore
  exportAllData() {
    const backup = {};
    for (const key of Object.values(SB_STORAGE_KEYS)) {
      backup[key] = localStorage.getItem(key);
    }
    return JSON.stringify(backup, null, 2);
  },

  importAllData(jsonString) {
    try {
      const backup = JSON.parse(jsonString);
      for (const [key, value] of Object.entries(backup)) {
        if (value !== null) {
          localStorage.setItem(key, value);
        }
      }
      return true;
    } catch (e) {
      console.error('Invalid backup data', e);
      return false;
    }
  },

  resetAllData() {
    for (const key of Object.values(SB_STORAGE_KEYS)) {
      localStorage.removeItem(key);
    }
  }
};

