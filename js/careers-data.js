/* ==========================================================================
   SkillBridge — Student Career Navigator
   Careers Dataset: 8 High-Demand Industry Tracks, Detailed Skills & Roadmaps
   ========================================================================== */

const CAREERS_DATA = [
  {
    id: 'fullstack',
    title: 'Full Stack Web Developer',
    category: 'Software Engineering',
    icon: '💻',
    demand: 'Very High',
    avgSalary: '$105,000 / yr',
    growthRate: '+25% (2024-2030)',
    description: 'Build end-to-end modern web applications with responsive frontend interfaces, resilient backend microservices, relational databases, and cloud deployment pipelines.',
    overview: 'Full Stack Developers are among the most recruited software professionals globally. You will master both client-side experience design and server-side architecture, enabling you to take an idea from napkin sketch to production-scale application.',
    coreStack: ['JavaScript / TypeScript', 'React / Next.js', 'Node.js / Express', 'PostgreSQL / Prisma', 'Tailwind CSS', 'Docker & Git'],
    skills: [
      { id: 'fs_js_ts', name: 'JavaScript & TypeScript Mastery', category: 'Languages', importance: 'critical', defaultBench: 90, desc: 'ES6+, async/await, closures, prototypes, TypeScript generics & strict types.' },
      { id: 'fs_react', name: 'React & Component Architecture', category: 'Frontend', importance: 'critical', defaultBench: 85, desc: 'Hooks, state management, Server Components, SSR with Next.js, memoization.' },
      { id: 'fs_node', name: 'Node.js & Backend APIs', category: 'Backend', importance: 'critical', defaultBench: 85, desc: 'RESTful API design, Express/Fastify, middleware, authentication (JWT/OAuth), error handling.' },
      { id: 'fs_db', name: 'Database Design (SQL & NoSQL)', category: 'Data', importance: 'high', defaultBench: 80, desc: 'PostgreSQL schema modeling, indexing, ACID transactions, migrations, and Redis caching.' },
      { id: 'fs_html_css', name: 'Modern CSS & Responsive Design', category: 'Frontend', importance: 'high', defaultBench: 85, desc: 'Flexbox, Grid, CSS variables, mobile-first layouts, Web Vitals, and Tailwind CSS.' },
      { id: 'fs_git_ci', name: 'Git & Deployment Pipelines', category: 'DevOps', importance: 'medium', defaultBench: 75, desc: 'Branching strategies, GitHub Actions, Vercel/AWS deployment, Docker containerization.' },
      { id: 'fs_testing', name: 'Testing & Code Quality', category: 'Testing', importance: 'medium', defaultBench: 70, desc: 'Unit testing with Jest/Vitest, integration tests, end-to-end testing with Playwright.' }
    ],
    phases: [
      {
        phaseNum: 1,
        title: 'Phase 1: Web Foundations & Modern JavaScript',
        duration: '4-6 Weeks',
        milestones: [
          { id: 'm_fs_1_1', title: 'HTML5 Semantic Structure & Responsive CSS3', hours: '25 hrs', topics: ['Semantic tags', 'CSS Grid & Flexbox', 'Mobile-first media queries', 'CSS Variables'], projectIdea: 'Responsive SaaS Landing Page with dark mode' },
          { id: 'm_fs_1_2', title: 'Deep JavaScript Fundamentals & DOM API', hours: '35 hrs', topics: ['Event loop & promises', 'Fetch API & async/await', 'Array methods', 'Closures & Scope'], projectIdea: 'Interactive Task & Budget Planner with LocalStorage' }
        ]
      },
      {
        phaseNum: 2,
        title: 'Phase 2: Modern Frontend & Component Systems',
        duration: '5-7 Weeks',
        milestones: [
          { id: 'm_fs_2_1', title: 'React 19 & Next.js App Router', hours: '40 hrs', topics: ['Custom hooks', 'Context API & Zustand', 'Server Components', 'Dynamic Routing'], projectIdea: 'Full-featured Movie & Anime Discovery Portal' },
          { id: 'm_fs_2_2', title: 'TypeScript for Production Frontends', hours: '20 hrs', topics: ['Interfaces & Type Aliases', 'Generics', 'Zod validation', 'Strict null checks'], projectIdea: 'Type-safe Dynamic Form & Survey Builder' }
        ]
      },
      {
        phaseNum: 3,
        title: 'Phase 3: Backend Services & Database Engineering',
        duration: '6-8 Weeks',
        milestones: [
          { id: 'm_fs_3_1', title: 'RESTful API Engineering with Node.js & Express', hours: '35 hrs', topics: ['REST standards', 'JWT Authentication & Cookies', 'Rate limiting', 'Input sanitization'], projectIdea: 'Multi-tenant Blogging & Publication REST API' },
          { id: 'm_fs_3_2', title: 'Relational Databases with PostgreSQL & Prisma ORM', hours: '30 hrs', topics: ['Schema relations', 'Foreign keys', 'Indexes & Query optimization', 'Prisma migrations'], projectIdea: 'Inventory & Order Processing Database Engine' }
        ]
      },
      {
        phaseNum: 4,
        title: 'Phase 4: Production Systems, DevOps & Portfolio',
        duration: '4-6 Weeks',
        milestones: [
          { id: 'm_fs_4_1', title: 'Docker Containers & Cloud Deployment', hours: '25 hrs', topics: ['Dockerfiles & Compose', 'Vercel / Railway / AWS EC2', 'GitHub Actions CI/CD', 'SSL & DNS'], projectIdea: 'Containerized Full-Stack Web Application deployed to public URL' },
          { id: 'm_fs_4_2', title: 'Production Capstone & Resume Polishing', hours: '40 hrs', topics: ['End-to-end testing', 'Lighthouse 95+ performance', 'Open Graph metadata', 'Clean README'], projectIdea: 'Production SaaS with Payments (Stripe) and Auth' }
        ]
      }
    ],
    recommendedProjects: [
      { title: 'DevConnect — Real-Time Developer Collaboration', stack: 'Next.js, TypeScript, PostgreSQL, WebSockets', desc: 'A real-time workspace where developers find open-source collaborators, share code snippets with live cursor sync, and track project milestones.' },
      { title: 'CloudStore E-Commerce Platform', stack: 'React, Node.js, Express, Stripe, Redis', desc: 'High-performance e-commerce engine featuring atomic inventory reservation, cart caching with Redis, and Stripe checkout integration.' },
      { title: 'TaskFlow Agile Kanban System', stack: 'HTML5 Drag & Drop, Tailwind, Node.js, MongoDB', desc: 'A sleek Kanban board with multi-column drag-and-drop, activity logs, priority tags, and automated weekly sprint summaries.' }
    ]
  },

  {
    id: 'aiml',
    title: 'AI & Machine Learning Engineer',
    category: 'Artificial Intelligence',
    icon: '🤖',
    demand: 'Very High',
    avgSalary: '$128,000 / yr',
    growthRate: '+38% (2024-2030)',
    description: 'Develop intelligent systems, fine-tune foundational Large Language Models (LLMs), build retrieval-augmented generation (RAG) pipelines, and deploy scalable ML models.',
    overview: 'As artificial intelligence transforms every industry, AI/ML Engineers design the mathematical and algorithmic pipelines that turn unstructured data into actionable predictions and autonomous systems.',
    coreStack: ['Python', 'PyTorch / TensorFlow', 'Hugging Face Transformers', 'LangChain / LlamaIndex', 'FastAPI', 'Vector Databases (Chroma/Pinecone)'],
    skills: [
      { id: 'ai_python', name: 'Advanced Python for Data & ML', category: 'Languages', importance: 'critical', defaultBench: 90, desc: 'NumPy vectorized operations, Pandas dataframes, memory efficiency, OOP.' },
      { id: 'ai_math', name: 'Linear Algebra & Probability', category: 'Math', importance: 'critical', defaultBench: 80, desc: 'Matrix decomposition, gradients, backpropagation calculus, Bayes theorem.' },
      { id: 'ai_pytorch', name: 'Deep Learning with PyTorch', category: 'Frameworks', importance: 'critical', defaultBench: 85, desc: 'Tensors, autograd, CNNs, RNNs/LSTMs, custom loss functions and optimizers.' },
      { id: 'ai_llm', name: 'LLMs, Transformers & RAG', category: 'Generative AI', importance: 'high', defaultBench: 85, desc: 'Attention mechanism, Hugging Face pipelines, embeddings, RAG architectures.' },
      { id: 'ai_api', name: 'Model Serving & FastAPI', category: 'Deployment', importance: 'high', defaultBench: 75, desc: 'Asynchronous REST APIs, latency optimization, Dockerization, ONNX runtime.' },
      { id: 'ai_vector', name: 'Vector Search & Embeddings', category: 'Data', importance: 'medium', defaultBench: 75, desc: 'Cosine similarity, HNSW indexing, ChromaDB, Pinecone, LangChain.' }
    ],
    phases: [
      {
        phaseNum: 1,
        title: 'Phase 1: Mathematical Foundations & Python for AI',
        duration: '5-7 Weeks',
        milestones: [
          { id: 'm_ai_1_1', title: 'Applied Linear Algebra & Calculus for ML', hours: '30 hrs', topics: ['Matrix transformations', 'Eigenvalues', 'Partial derivatives', 'Gradient descent'], projectIdea: 'From-scratch Gradient Descent Visualizer in Python' },
          { id: 'm_ai_1_2', title: 'NumPy & Pandas High-Performance Data Processing', hours: '25 hrs', topics: ['Vectorization', 'Data wrangling', 'Feature scaling', 'Missing value imputation'], projectIdea: 'Automated Exploratory Data Analysis Toolkit' }
        ]
      },
      {
        phaseNum: 2,
        title: 'Phase 2: Classical Machine Learning & Scikit-Learn',
        duration: '4-6 Weeks',
        milestones: [
          { id: 'm_ai_2_1', title: 'Supervised & Unsupervised Learning Algorithms', hours: '35 hrs', topics: ['Linear/Logistic regression', 'Random Forests', 'XGBoost', 'K-Means clustering'], projectIdea: 'Customer Churn & Credit Risk Predictor with SHAP values' },
          { id: 'm_ai_2_2', title: 'Model Evaluation & Cross-Validation', hours: '20 hrs', topics: ['Precision, Recall, F1', 'ROC-AUC', 'K-Fold CV', 'Hyperparameter tuning'], projectIdea: 'Automated ML Model Benchmark Matrix' }
        ]
      },
      {
        phaseNum: 3,
        title: 'Phase 3: Deep Learning, PyTorch & Transformers',
        duration: '6-8 Weeks',
        milestones: [
          { id: 'm_ai_3_1', title: 'Neural Networks & PyTorch Fundamentals', hours: '40 hrs', topics: ['Feedforward networks', 'Backprop', 'Loss functions', 'Transfer learning with ResNet'], projectIdea: 'Medical Image Classification System with PyTorch' },
          { id: 'm_ai_3_2', title: 'Transformers & Natural Language Processing', hours: '35 hrs', topics: ['Self-attention', 'BERT & GPT architectures', 'Tokenization', 'Fine-tuning with PEFT/LoRA'], projectIdea: 'Custom Domain Sentiment & Intent Classifier' }
        ]
      },
      {
        phaseNum: 4,
        title: 'Phase 4: Generative AI, RAG & Production MLOps',
        duration: '5-7 Weeks',
        milestones: [
          { id: 'm_ai_4_1', title: 'Retrieval-Augmented Generation (RAG) Pipelines', hours: '30 hrs', topics: ['Document chunking', 'Embeddings generation', 'Vector search', 'Re-ranking'], projectIdea: 'Enterprise PDF Document Assistant with Citations' },
          { id: 'm_ai_4_2', title: 'Model Serving with FastAPI & Docker', hours: '25 hrs', topics: ['Asynchronous endpoints', 'Batching inference', 'Docker container', 'Cloud deployment'], projectIdea: 'Low-latency AI Inference Microservice on Vercel/Cloud' }
        ]
      }
    ],
    recommendedProjects: [
      { title: 'DocuMind — Enterprise RAG Knowledge Base', stack: 'Python, PyTorch, LangChain, ChromaDB, FastAPI', desc: 'Allows users to upload PDFs and research papers, asking nuanced questions with semantic citations and verifiable source highlights.' },
      { title: 'SkinVision — Dermatological Lesion Classifier', stack: 'PyTorch, ResNet50, FastAPI, React', desc: 'A deep learning computer vision model trained on dermoscopic imagery that flags potential melanoma risks with confidence intervals.' },
      { title: 'SmartSQL — Natural Language to SQL Agent', stack: 'Python, Hugging Face, SQLite, Streamlit', desc: 'Translates plain English prompts into complex multi-table SQL queries, validating database schemas and running explain plans.' }
    ]
  },

  {
    id: 'clouddevops',
    title: 'Cloud & DevOps Engineer',
    category: 'Infrastructure & Cloud',
    icon: '☁️',
    demand: 'High',
    avgSalary: '$118,000 / yr',
    growthRate: '+22% (2024-2030)',
    description: 'Architect automated continuous delivery pipelines, orchestrate Kubernetes clusters, automate cloud infrastructure with Terraform, and enforce zero-downtime reliability.',
    overview: 'DevOps Engineers bridge the gap between software development and IT infrastructure, building automated systems that allow software releases to happen safely, reliably, and hundreds of times per day.',
    coreStack: ['Linux / Bash', 'Docker', 'Kubernetes', 'AWS (EC2, S3, IAM, EKS)', 'Terraform', 'GitHub Actions / CI-CD', 'Prometheus & Grafana'],
    skills: [
      { id: 'do_linux', name: 'Linux System Administration & Shell', category: 'OS', importance: 'critical', defaultBench: 85, desc: 'Process management, networking (iptables, DNS), bash scripting, systemd.' },
      { id: 'do_docker', name: 'Containerization with Docker', category: 'Containers', importance: 'critical', defaultBench: 90, desc: 'Multi-stage builds, container security, networking, Docker Compose.' },
      { id: 'do_k8s', name: 'Kubernetes Orchestration', category: 'Containers', importance: 'critical', defaultBench: 80, desc: 'Pods, Deployments, Services, Ingress, ConfigMaps, Helm charts, autoscaling.' },
      { id: 'do_aws', name: 'Cloud Architecture (AWS / GCP)', category: 'Cloud', importance: 'high', defaultBench: 85, desc: 'VPC, IAM least privilege, S3, EC2, ECS/EKS, CloudFront, Route53.' },
      { id: 'do_iac', name: 'Infrastructure as Code (Terraform)', category: 'IaC', importance: 'high', defaultBench: 80, desc: 'Terraform state management, modules, declarative cloud provisioning.' },
      { id: 'do_cicd', name: 'CI/CD Pipelines (GitHub Actions)', category: 'Automation', importance: 'high', defaultBench: 85, desc: 'Automated test runners, artifact build, semantic versioning, zero-downtime deploys.' }
    ],
    phases: [
      {
        phaseNum: 1,
        title: 'Phase 1: Linux Systems & Shell Scripting',
        duration: '4 Weeks',
        milestones: [
          { id: 'm_do_1_1', title: 'Linux Command Line & Server Administration', hours: '25 hrs', topics: ['File permissions & SSH', 'Networking tools', 'System monitoring', 'Cron jobs'], projectIdea: 'Automated Remote Server Backup & Health Audit Script' }
        ]
      },
      {
        phaseNum: 2,
        title: 'Phase 2: Containerization & Docker Mastery',
        duration: '4-5 Weeks',
        milestones: [
          { id: 'm_do_2_1', title: 'Production Docker Containers & Microservices', hours: '30 hrs', topics: ['Multi-stage Dockerfiles', 'Alpine base images', 'Compose networking', 'Volume mounts'], projectIdea: 'Full 3-Tier Web App Containerization with Redis & Postgres' }
        ]
      },
      {
        phaseNum: 3,
        title: 'Phase 3: Kubernetes & Cloud Infrastructure',
        duration: '6 Weeks',
        milestones: [
          { id: 'm_do_3_1', title: 'Kubernetes Cluster Management & Helm', hours: '40 hrs', topics: ['Deployments & StatefulSets', 'Horizontal Pod Autoscalers', 'Ingress controllers', 'Helm charts'], projectIdea: 'Resilient Microservices Cluster on K8s with Zero Downtime Rollouts' },
          { id: 'm_do_3_2', title: 'Terraform Infrastructure as Code', hours: '30 hrs', topics: ['HCL syntax', 'AWS VPC & Security Groups', 'Remote S3 backend', 'Modular Terraform'], projectIdea: 'One-Click Production AWS VPC & EKS Deployment via Terraform' }
        ]
      },
      {
        phaseNum: 4,
        title: 'Phase 4: CI/CD Pipelines, Observability & GitOps',
        duration: '4 Weeks',
        milestones: [
          { id: 'm_do_4_1', title: 'GitHub Actions Automated CI/CD Pipeline', hours: '25 hrs', topics: ['Automated unit tests', 'Docker Hub image push', 'Staging deployment', 'Production gate'], projectIdea: 'End-to-End GitOps Pipeline with ArgoCD or GitHub Actions' }
        ]
      }
    ],
    recommendedProjects: [
      { title: 'ZeroDowntime — Automated GitOps Kubernetes Pipeline', stack: 'Kubernetes, Helm, GitHub Actions, Docker, ArgoCD', desc: 'An enterprise-grade continuous deployment pipeline that deploys canary releases to a Kubernetes cluster with automatic rollbacks upon health check failure.' },
      { title: 'Multi-Region AWS Cloud Infrastructure via Terraform', stack: 'Terraform, AWS, IAM, CloudWatch, S3', desc: 'Complete declarative infrastructure module deploying high-availability VPCs, load balancers, and RDS multi-AZ databases across multiple geographical regions.' },
      { title: 'Observability Stack with Prometheus & Grafana', stack: 'Prometheus, Grafana, Alertmanager, Node Exporter', desc: 'A full monitoring suite with pre-built dashboards monitoring CPU, RAM, disk I/O, HTTP latency, and automated Slack alerts.' }
    ]
  },

  {
    id: 'datascience',
    title: 'Data Scientist & Analytics Engineer',
    category: 'Data & Analytics',
    icon: '📊',
    demand: 'High',
    avgSalary: '$112,000 / yr',
    growthRate: '+27% (2024-2030)',
    description: 'Transform raw data into strategic insights through statistical modeling, SQL transformations, predictive analytics, and executive business intelligence dashboards.',
    overview: 'Data Scientists help businesses make decisions based on empirical evidence. You will uncover hidden patterns, forecast metrics, and build data pipelines that deliver real commercial impact.',
    coreStack: ['Python', 'SQL (PostgreSQL/Snowflake)', 'Pandas & NumPy', 'Scikit-learn', 'Tableau / PowerBI', 'dbt (Data Build Tool)'],
    skills: [
      { id: 'ds_sql', name: 'Advanced SQL & Data Warehousing', category: 'Data', importance: 'critical', defaultBench: 90, desc: 'Window functions, CTEs, self-joins, query optimization, star schema modeling.' },
      { id: 'ds_python', name: 'Python Analytics (Pandas/NumPy)', category: 'Languages', importance: 'critical', defaultBench: 90, desc: 'Data cleaning, aggregations, time series, statistical tests, vectorization.' },
      { id: 'ds_stats', name: 'Applied Statistics & A/B Testing', category: 'Math', importance: 'critical', defaultBench: 85, desc: 'Hypothesis testing, p-values, confidence intervals, sample size calculation.' },
      { id: 'ds_viz', name: 'Data Visualization & Storytelling', category: 'BI', importance: 'high', defaultBench: 80, desc: 'Seaborn, Matplotlib, Plotly interactive charts, Tableau executive dashboards.' },
      { id: 'ds_ml', name: 'Predictive Modeling & Scikit-Learn', category: 'ML', importance: 'high', defaultBench: 75, desc: 'Classification, regression, clustering, feature engineering, cross-validation.' }
    ],
    phases: [
      {
        phaseNum: 1,
        title: 'Phase 1: Advanced SQL & Relational Analytics',
        duration: '4 Weeks',
        milestones: [
          { id: 'm_ds_1_1', title: 'Mastering SQL Window Functions & Analytics', hours: '30 hrs', topics: ['LEAD/LAG', 'ROW_NUMBER', 'DENSE_RANK', 'Running totals & rolling averages'], projectIdea: 'E-commerce Cohort Retention & Churn SQL Analysis' }
        ]
      },
      {
        phaseNum: 2,
        title: 'Phase 2: Python Data Wrangling & Exploratory Analysis',
        duration: '5 Weeks',
        milestones: [
          { id: 'm_ds_2_1', title: 'Pandas Data Cleaning & Time-Series Modeling', hours: '35 hrs', topics: ['Datetime manipulation', 'Resampling', 'Pivot tables', 'Handling missing data'], projectIdea: 'Stock Market & Crypto Financial Trend Forecaster' }
        ]
      },
      {
        phaseNum: 3,
        title: 'Phase 3: Machine Learning & Predictive Analytics',
        duration: '6 Weeks',
        milestones: [
          { id: 'm_ds_3_1', title: 'Predictive Modeling with Scikit-Learn', hours: '40 hrs', topics: ['Random Forests', 'Gradient Boosting (XGBoost)', 'Model interpretation', 'Feature importance'], projectIdea: 'Real Estate Price Valuation & House Price Prediction Model' }
        ]
      }
    ],
    recommendedProjects: [
      { title: 'Consumer Retention & Lifetime Value (LTV) Engine', stack: 'Python, SQL, Scikit-learn, Tableau', desc: 'Analyzes user behavioral cohorts to predict 12-month Customer Lifetime Value with an interactive business intelligence dashboard.' },
      { title: 'FraudShield — Financial Transaction Anomaly Detection', stack: 'Python, Isolation Forest, XGBoost, Streamlit', desc: 'Detects fraudulent credit card transactions in real-time with an anomaly detection algorithm and interactive inspection console.' }
    ]
  },

  {
    id: 'cybersecurity',
    title: 'Cybersecurity Analyst & SecOps',
    category: 'Security',
    icon: '🛡️',
    demand: 'Very High',
    avgSalary: '$115,000 / yr',
    growthRate: '+32% (2024-2030)',
    description: 'Defend organizational networks, assess vulnerabilities, conduct penetration tests, investigate incident response logs, and enforce defense-in-depth protocols.',
    overview: 'As digital assets become the primary targets of cyber warfare, Cybersecurity Analysts protect critical systems, identify zero-day vulnerabilities, and ensure cryptographic compliance across enterprise networks.',
    coreStack: ['Linux & Networking (TCP/IP)', 'Wireshark & Nmap', 'SIEM (Splunk/Wazuh)', 'Burp Suite', 'Python / Bash Scripting', 'OWASP Top 10'],
    skills: [
      { id: 'sec_net', name: 'Network Protocols & Packet Analysis', category: 'Networking', importance: 'critical', defaultBench: 85, desc: 'TCP/IP handshake, DNS, HTTPS/TLS, routing, Wireshark packet capture.' },
      { id: 'sec_linux', name: 'Linux Security & Hardening', category: 'OS', importance: 'critical', defaultBench: 80, desc: 'File permissions, sudoers, auditd, iptables, SSH key authentication.' },
      { id: 'sec_owasp', name: 'Web Application Security (OWASP Top 10)', category: 'AppSec', importance: 'critical', defaultBench: 85, desc: 'SQL injection, XSS, CSRF, SSRF, broken access control, secure headers.' },
      { id: 'sec_siem', name: 'SIEM & Threat Monitoring', category: 'SecOps', importance: 'high', defaultBench: 75, desc: 'Log correlation, Splunk SPL, intrusion detection (Snort/Suricata), alerting.' },
      { id: 'sec_crypto', name: 'Applied Cryptography & PKI', category: 'Security', importance: 'medium', defaultBench: 70, desc: 'Symmetric/Asymmetric encryption (AES, RSA, ECC), hashing, digital signatures.' }
    ],
    phases: [
      {
        phaseNum: 1,
        title: 'Phase 1: Networking & Linux Fundamentals',
        duration: '4-5 Weeks',
        milestones: [
          { id: 'm_sec_1_1', title: 'TCP/IP Architecture & Wireshark Deep Dive', hours: '30 hrs', topics: ['Packet inspection', 'DNS spoofing detection', 'SYN flood analysis', 'Nmap port scanning'], projectIdea: 'Network Traffic Anomaly & Port Scanner Script in Python' }
        ]
      },
      {
        phaseNum: 2,
        title: 'Phase 2: Web App Penetration Testing',
        duration: '5 Weeks',
        milestones: [
          { id: 'm_sec_2_1', title: 'Exploiting & Patching the OWASP Top 10', hours: '35 hrs', topics: ['SQL injection defense', 'XSS sanitization', 'Burp Suite proxy', 'JWT tampering'], projectIdea: 'Vulnerable Web App Sandbox & Security Patch Audit Report' }
        ]
      }
    ],
    recommendedProjects: [
      { title: 'SecurLog — Automated SIEM & Intrusion Detection System', stack: 'Python, ElasticSearch, Snort, Bash', desc: 'Parses server authentication logs and network alerts to flag brute-force attempts and anomalous geo-logins in real-time.' },
      { title: 'Vulnerability Scanner & Remediation Pipeline', stack: 'Python, Nmap, OWASP ZAP API, SQLite', desc: 'An automated vulnerability scanner that checks open endpoints for known CVEs and outputs executive-ready mitigation guides.' }
    ]
  },

  {
    id: 'mobile',
    title: 'Mobile App Developer (iOS & Android)',
    category: 'Mobile Engineering',
    icon: '📱',
    demand: 'High',
    avgSalary: '$108,000 / yr',
    growthRate: '+19% (2024-2030)',
    description: 'Craft intuitive native and cross-platform mobile apps for millions of users with smooth animations, offline-first sync, and push notifications.',
    overview: 'Mobile Developers bring digital products straight into users pockets. Master cross-platform frameworks like React Native or Flutter to build fluid, high-performance apps that shine on both iOS and Android.',
    coreStack: ['React Native / Flutter', 'TypeScript / Dart', 'Mobile UI & Gestures', 'Async Storage / SQLite', 'Push Notifications', 'App Store / Play Store Deployment'],
    skills: [
      { id: 'mob_react_native', name: 'React Native & Cross-Platform UI', category: 'Frameworks', importance: 'critical', defaultBench: 85, desc: 'Core components, Flexbox layouts, React Navigation, native bridge.' },
      { id: 'mob_state', name: 'State Management & Offline Storage', category: 'Architecture', importance: 'critical', defaultBench: 80, desc: 'Redux Toolkit/Zustand, AsyncStorage, SQLite offline sync, cache invalidation.' },
      { id: 'mob_api', name: 'REST & GraphQL Integration', category: 'Networking', importance: 'high', defaultBench: 80, desc: 'Axios, background data fetching, push notifications, image caching.' },
      { id: 'mob_perf', name: 'Mobile Performance & Animation', category: 'UX', importance: 'medium', defaultBench: 75, desc: '60fps animations (Reanimated), memory profiling, bundle size reduction.' }
    ],
    phases: [
      {
        phaseNum: 1,
        title: 'Phase 1: React Native Core & Mobile Navigation',
        duration: '5 Weeks',
        milestones: [
          { id: 'm_mob_1_1', title: 'Mobile Layouts, Navigation & Touch Gestures', hours: '35 hrs', topics: ['React Navigation v6', 'Touchables & gestures', 'Safe area insets', 'Custom themes'], projectIdea: 'Fitness & Habit Tracking Mobile App with local streak counter' }
        ]
      }
    ],
    recommendedProjects: [
      { title: 'FitPulse — Offline-First Workout & Calorie Tracker', stack: 'React Native, TypeScript, SQLite, Reanimated', desc: 'A slick native mobile fitness companion with interactive graphs, offline logging, and daily push notification reminders.' }
    ]
  },

  {
    id: 'uiux',
    title: 'UI/UX Designer & Frontend Engineer',
    category: 'Design & Engineering',
    icon: '🎨',
    demand: 'High',
    avgSalary: '$102,000 / yr',
    growthRate: '+18% (2024-2030)',
    description: 'Bridge user experience design and frontend engineering: craft world-class design systems in Figma, conduct user research, and build accessible, pixel-perfect web interfaces.',
    overview: 'Design Engineers are rare unicorns who can design the user journey in Figma and directly implement it in semantic, accessible HTML, CSS, and interactive JavaScript.',
    coreStack: ['Figma / FigJam', 'Design Systems & Tokens', 'HTML5 & Modern CSS3', 'JavaScript / TypeScript', 'Web Accessibility (WCAG 2.1)', 'Framer Motion'],
    skills: [
      { id: 'des_figma', name: 'Figma Prototyping & Auto Layout', category: 'Design', importance: 'critical', defaultBench: 90, desc: 'Components, variants, tokens, interactive prototypes, user flows.' },
      { id: 'des_css', name: 'Advanced CSS & Micro-Interactions', category: 'Frontend', importance: 'critical', defaultBench: 90, desc: 'CSS custom properties, keyframe animations, glassmorphism, responsive grids.' },
      { id: 'des_a11y', name: 'Accessibility (a11y) & WCAG Compliance', category: 'Engineering', importance: 'high', defaultBench: 85, desc: 'ARIA roles, keyboard navigation, contrast ratios, screen reader testing.' },
      { id: 'des_sys', name: 'Design Systems & Component Libraries', category: 'Architecture', importance: 'high', defaultBench: 80, desc: 'Atomic design, token pipelines, Storybook documentation.' }
    ],
    phases: [
      {
        phaseNum: 1,
        title: 'Phase 1: Figma Mastery & Design System Tokens',
        duration: '4 Weeks',
        milestones: [
          { id: 'm_des_1_1', title: 'Figma Auto-Layout & Design Tokens Architecture', hours: '30 hrs', topics: ['Auto-layout 5.0', 'Typography scales', 'Spacing rules', 'Component variants'], projectIdea: 'Complete Multi-Brand Design System in Figma and Storybook' }
        ]
      }
    ],
    recommendedProjects: [
      { title: 'Aura Design System & Component Library', stack: 'Figma, HTML5, CSS Variables, Storybook', desc: 'An enterprise design system featuring 40+ accessible UI components, dark/light themes, and strict WCAG AAA compliance.' }
    ]
  },

  {
    id: 'blockchain',
    title: 'Blockchain & Smart Contract Developer',
    category: 'Web3 & Decentralized',
    icon: '⛓️',
    demand: 'Growing',
    avgSalary: '$125,000 / yr',
    growthRate: '+20% (2024-2030)',
    description: 'Develop decentralized applications (dApps), write secure and gas-optimized Solidity smart contracts, and build Web3 frontend integrations.',
    overview: 'Web3 Developers build trustless applications powered by cryptographic consensus and decentralized ledgers, with a focus on immutable security and verifiable ownership.',
    coreStack: ['Solidity', 'Ethereum / EVM', 'Hardhat / Foundry', 'Ethers.js / Viem', 'IPFS', 'Smart Contract Auditing'],
    skills: [
      { id: 'bc_solidity', name: 'Solidity & Smart Contract Development', category: 'Languages', importance: 'critical', defaultBench: 85, desc: 'Data types, memory vs storage, modifiers, events, OpenZeppelin standards.' },
      { id: 'bc_security', name: 'Smart Contract Security & Reentrancy', category: 'Security', importance: 'critical', defaultBench: 85, desc: 'Reentrancy guards, integer overflow, flash loan risks, Slither analyzer.' },
      { id: 'bc_web3', name: 'Web3 Frontend Integration (Ethers/Viem)', category: 'Frontend', importance: 'high', defaultBench: 80, desc: 'Metamask connection, transaction signing, gas estimation, event listening.' }
    ],
    phases: [
      {
        phaseNum: 1,
        title: 'Phase 1: Solidity & EVM Architecture',
        duration: '5 Weeks',
        milestones: [
          { id: 'm_bc_1_1', title: 'Solidity Syntax & ERC Standards (ERC-20 & ERC-721)', hours: '35 hrs', topics: ['ERC-20 token standard', 'ERC-721 NFT minting', 'Gas optimization', 'Hardhat testing'], projectIdea: 'Decentralized Crowd-Funding Smart Contract on Sepolia Testnet' }
        ]
      }
    ],
    recommendedProjects: [
      { title: 'DeFi Vault — Decentralized Yield & Staking DApp', stack: 'Solidity, Hardhat, Next.js, Ethers.js', desc: 'A smart contract staking pool with proportional reward distribution, unit-tested with Hardhat and audited against reentrancy.' }
    ]
  }
];

function getCareerById(careerId) {
  return CAREERS_DATA.find(c => c.id === careerId) || CAREERS_DATA[0];
}
