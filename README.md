# 🚀 SkillBridge — Student Career Navigator

> **Bridging the gap between classroom theory and industry-grade engineering mastery.**  
> An interactive web application built with semantic HTML5, modern CSS3, and vanilla JavaScript, backed by a secure Vercel serverless AI copilot.

---

## 📌 Overview

**SkillBridge** is a comprehensive, client-first career navigation platform designed for computer science and engineering students. It empowers learners to identify their target software engineering specialization, evaluate their competencies against actual hiring benchmarks, follow an actionable multi-phase learning roadmap, track portfolio projects, maintain daily algorithmic coding streaks, and get on-demand mentorship via an AI Career Copilot.

---

## ✨ Key Features

1. **🧭 Career Path Explorer**
   - 8 industry tracks: *Full Stack Web Developer, AI & Machine Learning Engineer, Cloud & DevOps Engineer, Data Scientist, Cybersecurity Analyst, Mobile App Developer, UI/UX Design Engineer, Blockchain Developer*.
   - Real-world hiring demand ratings, entry-level salaries, market growth projections, and core required tech stacks.
   - Deep-dive curriculum inspection modal for each path.

2. **📊 Interactive Skill-Gap Analyzer**
   - Interactive rating pills for core competencies (`0% None`, `25% Novice`, `60% Competent`, `90% Proficient`).
   - Real-time **Readiness Score** calculation weighted by skill criticality.
   - Dynamic HTML5 Canvas bar/radar comparison chart comparing your current proficiency against industry hiring standards.
   - Immediate detection of high-priority skill gaps with tailored recommendations.

3. **🗺️ Personalized Learning Roadmap**
   - Structured multi-phase progression (*Foundations ➔ Core Stack ➔ Advanced Architectures ➔ Production Capstone*).
   - Interactive milestone checkboxes that persist progress in `localStorage`.
   - Time estimates, topic lists, suggested sprint projects, and one-click text roadmap export.

4. **💼 Portfolio Project Tracker**
   - Manage production-grade portfolio projects with status tabs (*All, In Progress, Completed, Ideas*).
   - Pre-loaded with recommended industry capstone ideas matching your target track.
   - Store GitHub repository URLs, live demo URLs, and tech stack tags.

5. **🔥 Daily Coding Practice Tracker**
   - Active daily streak counter with animated flame indicator.
   - 15-week (105-day) GitHub-style activity heatmap visualization.
   - Quick problem logger recording platform (*LeetCode, HackerRank, NeetCode*), difficulty, algorithmic pattern, and solution notes.
   - Searchable and difficulty-filtered history table.

6. **📚 Curated Learning Resources Hub**
   - High-yield documentation, free university courses (*Full Stack Open, CS50, Hugging Face*), interactive tutorials, and cheat sheets.
   - One-click bookmarking system saved to local storage.

7. **🤖 AI Career Copilot (Drawer & Floating Assistant)**
   - Powered by a secure serverless function at `/api/ai` supporting **Google Gemini API** (`GEMINI_API_KEY`) or **OpenAI API** (`OPENAI_API_KEY`).
   - **Zero-failure fallback**: If no API key is provided, the intelligent local rule engine automatically handles skill-gap analyses, 30-day study plans, project suggestions, and mock interview quizzes without crashing or faking data.
   - Markdown formatting with code syntax highlighting and quick-prompt chips.

8. **🌐 Multilingual & Local Data Sovereignty**
   - Seamless language toggle across English, Spanish, Hindi, and French.
   - 100% private: all user state, ratings, streak logs, and preferences remain on your device in `localStorage`.
   - Full JSON export and data backup capabilities.

---

## 🛠️ Technology Stack

- **Frontend**: Semantic HTML5, Modern CSS3 (CSS Variables, Flexbox, Grid, Glassmorphism), Vanilla JavaScript (ES6+ Modules, Canvas API, LocalStorage).
- **Backend / Serverless**: Node.js serverless functions running on Vercel (`/api/ai.js`).
- **Styling**: Custom dark navy, cyan, and electric blue design system (`#070d19`, `#38bdf8`, `#6366f1`).
- **Zero Heavy Dependencies**: No bloated frameworks or build steps required for the frontend. Fast load times and high Lighthouse performance.

---

## 📂 Project Structure

```text
skillsbridge/
├── index.html              # Main application entry point & SPA layout
├── vercel.json             # Vercel deployment configuration & security headers
├── README.md               # Complete project documentation
├── .gitignore              # Git ignore rules for node_modules, .env, and temp files
├── .env.example            # Environment variables template for AI configuration
├── assets/
│   ├── favicon.svg         # SVG favicon
│   └── logo.svg            # SkillBridge brand logo
├── css/
│   ├── main.css            # Design tokens, reset, header, navigation, and typography
│   ├── components.css      # UI controls, cards, badges, modal, drawer, and tables
│   └── responsive.css      # Breakpoints (320px, 375px, 768px, 1024px, 1440px)
├── js/
│   ├── storage.js          # LocalStorage persistence layer & state management
│   ├── translations.js     # Multilingual dictionaries (EN, ES, HI, FR)
│   ├── careers-data.js     # Curated dataset for 8 tech tracks & milestones
│   ├── skill-gap.js        # Skill assessment engine & HTML5 Canvas chart
│   ├── roadmap.js          # Dynamic roadmap timeline & milestone tracker
│   ├── trackers.js         # Portfolio projects & daily coding practice trackers
│   ├── resources.js        # Curated learning resources hub & bookmarks
│   ├── ai-assistant.js     # AI Copilot drawer, API client & local fallback
│   └── app.js              # Core router, career explorer, and modal manager
└── api/
    └── ai.js               # Vercel serverless function (Gemini / OpenAI proxy)
```

---

## 💻 Local Development Setup

Because SkillBridge uses standard web technologies, you can run the frontend instantly without any build steps!

### Option 1: Using Python's Built-in Server
```bash
# Navigate to the project root
cd skillsbridge

# Start a local HTTP server
python -m http.server 3000
```
Open [http://localhost:3000](http://localhost:3000) in your browser.

### Option 2: Using Node.js `npx serve`
```bash
npx serve .
```

### Option 3: Using Vercel CLI (For Testing the Serverless API locally)
```bash
# Install Vercel CLI globally (if not already installed)
npm install -g vercel

# Create a .env.local file with your API key
echo GEMINI_API_KEY=your_key_here > .env.local

# Run local development server with serverless functions support
vercel dev
```

---

## 🔑 AI Copilot Configuration (Optional)

The AI Career Copilot works straight out of the box using its **built-in local intelligence rule engine**.

To enable live external AI responses:
1. Obtain an API key from [Google AI Studio](https://aistudio.google.com/) (`GEMINI_API_KEY`) or [OpenAI](https://platform.openai.com/api-keys) (`OPENAI_API_KEY`).
2. Add the environment variable in your **Vercel Project Settings**:
   - Go to **Project Settings ➔ Environment Variables**.
   - Key: `GEMINI_API_KEY` (or `OPENAI_API_KEY`).
   - Value: `your_actual_api_key`.
   - Environments: Production, Preview, Development.
3. Redeploy your project. The serverless function `/api/ai.js` will automatically detect the key and switch to live model generation.

---

## 🚀 GitHub & Vercel Deployment Instructions

### 1. Initialize and Push to GitHub
```bash
# Check status
git status

# Stage all files
git add .

# Commit changes
git commit -m "Complete SkillBridge Student Career Navigator deployment ready"

# Set your branch to main
git branch -M main

# Add your GitHub repository remote (replace with your actual repo URL)
git remote add origin https://github.com/YOUR_USERNAME/skillbridge.git

# Push to GitHub
git push -u origin main
```

### 2. Deploy to Vercel
1. Log in to your [Vercel Dashboard](https://vercel.com).
2. Click **Add New... ➔ Project**.
3. Import your `skillbridge` repository from GitHub.
4. Configure Project Settings:
   - **Framework Preset**: `Other`
   - **Root Directory**: `./` (leave default)
   - **Build Command**: *(leave empty)*
   - **Output Directory**: *(leave empty)*
5. (Optional) Under **Environment Variables**, add `GEMINI_API_KEY` or `OPENAI_API_KEY`.
6. Click **Deploy**.
7. Within ~20 seconds, your site is live with a public URL (e.g. `https://skillbridge-xxxx.vercel.app`).

---

## 📱 Responsive Testing Matrix

SkillBridge has been tested and verified across key viewport widths:
- **320px (Small Mobile)**: Compact header, touch-friendly rating buttons, single-column cards.
- **375px (Standard Mobile)**: Full typography scaling, stacked navigation drawer, touch targets ≥ 44px.
- **768px (Tablet)**: Balanced 2-column cards, scrollable activity heatmap, responsive tables.
- **1024px (Laptop)**: Split skill-gap analyzer with sticky benchmark summary.
- **1440px (Desktop)**: Full 4-column metric grid, rich visual hierarchy, and side-by-side analysis.

---

## 📄 License
This project is open-source and available under the **MIT License**.
