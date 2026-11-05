// ─────────────────────────────────────────────────────────────
// Portfolio content — single source of truth.
// Facts come from Priyanshu's portfolio content, his SDE resume and
// his AI/ML Engineer resume (the newer one wins where they differ).
// ─────────────────────────────────────────────────────────────

export const navLinks = [
  { id: 'about', title: 'About' },
  { id: 'work', title: 'Work' },
  { id: 'approach', title: 'Skills' },
  { id: 'experience', title: 'Experience' },
  { id: 'journey', title: 'Journey' },
]

export const personalInfo = {
  name: 'Priyanshu Raj Mishra',
  firstName: 'Priyanshu',
  middleName: 'Raj',
  lastName: 'Mishra',
  initials: 'PR',
  role: 'Software & AI/ML Engineer',
  email: 'priyanshu001raj@gmail.com',
  phone: '+91-8709020989',
  location: 'Ranchi, Jharkhand, India',
  city: 'Ranchi, India',
  college: 'BIT Mesra',
  cgpa: '9.19',
  leetcodeRating: '1600+',
  dsaCount: '800+',
  scholarship: 'GP Birla Scholarship (4x)',
  currentRole: 'Final-year B.Tech · BIT Mesra',
  currentProject: 'Tech Lead @ Explorify Trips, alongside final-year B.Tech',
  availability: 'Final-year student · seeking SDE & AI/ML roles',
  availabilityLong: 'Final-year B.Tech student actively looking for full-time SDE, AI/ML Engineer and Data Science roles',
  resumeUrl: 'https://drive.google.com/file/d/1GVbbXz9nd7VLLZtd61EZhfrvZB8lJM8b/view?usp=drive_link',
  githubUsername: 'priyanshu12-stack',
  githubUrl: 'https://github.com/priyanshu12-stack',
  linkedinUrl: 'https://www.linkedin.com/in/priyanshu-raj-mishra-59ba20316/',
  leetcodeUrl: 'https://leetcode.com/u/Hhystxn2xX/',

  heroIntro:
    'Final-year ECE student at BIT Mesra who ships both software and models — a production portal for 70,000+ users at BCCL, a graph neural network reproduced and extended at IIT (ISM), and AI tools that run in the browser.',

  bio1:
    "I'm an ECE undergraduate at BIT Mesra (CGPA 9.19) working across software engineering and AI/ML. My foundation is competitive programming — 800+ DSA problems and a 1600+ LeetCode rating (top ~20% globally).",
  bio2:
    'At IIT (ISM) Dhanbad I implemented and extended an IEEE TNNLS 2026 graph neural network in PyTorch; at BCCL I engineered a production Employee Self-Service Portal serving 70,000+ employees. I work with PyTorch, Transformers and Scikit-learn, and use DSA and full-stack skills to take models to production.',
  bio3:
    "Now in my final year, I'm looking for full-time Software Engineer, AI/ML Engineer and Data Science roles where I can ship high-impact work in fast-paced, product-driven teams.",
}

// Rotated in the hero — the roles Priyanshu is targeting.
export const roles = ['Software Engineer', 'AI/ML Engineer', 'Full-Stack Developer', 'Data Scientist', 'Open-Source Contributor']

export const traits = [
  'Fast Learner',
  'Problem Solver',
  'Team Player',
  'DSA Enthusiast',
  'Open Source Contributor',
  'Leadership',
]

// The tabbed "perspective" explorer in About (modelled on the reference's signal explorer).
export const perspectives = [
  {
    key: 'build',
    tab: 'Build',
    label: 'Structure',
    role: 'Software Engineer · Full-Stack',
    title: 'Give an idea structure.',
    text: 'REST APIs, 2FA auth and full-stack products in production — from a 70,000-user enterprise portal to a travel marketplace I lead as Tech Lead.',
    link: { href: '#work', text: 'See the products' },
  },
  {
    key: 'learn',
    tab: 'Model',
    label: 'Intelligence',
    role: 'AI / ML Engineer',
    title: 'Teach a machine to see patterns.',
    text: 'Graph neural networks reproduced to within 1.07 pp of a published IEEE TNNLS result, and a WavLM + GRU speech pipeline for Parkinson’s detection.',
    link: { href: '#experience', text: 'See the research' },
  },
  {
    key: 'data',
    tab: 'Analyse',
    label: 'Signal',
    role: 'Data Science',
    title: 'Separate signal from noise.',
    text: 'EDA, SQL and dashboards with Pandas, NumPy, PostgreSQL and Power BI — and ablations and probes that show what actually moves a model’s accuracy.',
    link: { href: '#approach', text: 'See the toolkit' },
  },
  {
    key: 'share',
    tab: 'Share',
    label: 'Community',
    role: 'Open-Source Contributor',
    title: 'Build in the open.',
    text: 'Every project here is public on GitHub — from deep-learning notebooks to full-stack apps — with the code and decisions open for anyone to read, fork and learn from.',
    link: { href: 'https://github.com/priyanshu12-stack', text: 'Open GitHub', external: true },
  },
]


export const marqueeItems = [
  'PyTorch', 'React', 'Graph Neural Networks', 'Next.js', 'Transformers', 'Node.js', 'OpenCV',
  'TypeScript', 'Vision Transformers', 'MongoDB', 'Scikit-learn', 'Docker',
]

// ── Projects ────────────────────────────────────────────────
// `visual` selects an abstract, typographic preview (no fake screenshots).
// `track` drives the filter tabs.
export const projectFilters = [
  { key: 'all', label: 'All work' },
  { key: 'ai', label: 'AI & ML' },
  { key: 'web', label: 'Full stack' },
]

export const projects = [
  {
    id: 'parkinsons',
    name: "Parkinson's Detection",
    subtitle: 'Speech-Based Diagnostic AI',
    type: 'Deep learning · Audio',
    year: '2026',
    track: ['ai'],
    description:
      "A hybrid pipeline (WavLM + GRU + RBF-kernel SVM) that detects Parkinson's Disease from speech, reaching 72%+ accuracy on the PC-GITA clinical corpus.",
    highlights: [
      'Torchaudio pipeline over 5 vowel classes with 16 kHz resampling and dynamic padding',
      'GRU compresses 768-D WavLM embeddings into a 128-D vector (6× smaller), beating MFCC / jitter / shimmer features',
      'Tracked accuracy, precision, recall and F1',
    ],
    metrics: [['72%+', 'accuracy'], ['6×', 'smaller embedding'], ['5', 'vowel classes']],
    tags: ['PyTorch', 'WavLM', 'GRU', 'Torchaudio', 'Scikit-learn', 'NumPy', 'Pandas'],
    github: 'https://github.com/priyanshu12-stack/parkinsons_detection',
    live: null,
    featured: true,
    visual: 'wave',
  },
  {
    id: 'vibecode',
    name: 'Vibecode Editor',
    subtitle: 'AI-Powered Browser IDE',
    type: 'AI developer tool',
    year: '2026',
    track: ['ai', 'web'],
    description:
      'A browser AI IDE with 6 project templates (React, Next.js, Express, Vue, Hono, Angular) that runs npm installs, dev servers and live previews 100% in-browser via WebContainers (WASM) — zero per-user compute cost.',
    highlights: [
      '3-tier AI fallback chain (Gemini → Ollama → OpenAI) across 3 API routes for chat, code completion and review',
      '2-provider OAuth (Google, GitHub) with a 7-model MongoDB schema',
    ],
    metrics: [['6', 'templates'], ['3-tier', 'AI fallback'], ['0', 'server compute']],
    tags: ['Next.js 15', 'TypeScript', 'WebContainers', 'Gemini API', 'Prisma', 'MongoDB', 'Docker'],
    github: 'https://github.com/priyanshu12-stack/AI-vscode',
    live: 'https://ai-vscode.vercel.app/',
    featured: true,
    visual: 'code',
  },
  {
    id: 'ipl-oracle',
    name: 'IPL Oracle',
    subtitle: 'Cricket analytics & prediction',
    type: 'Analytics · Machine learning',
    track: ['ai', 'web'],
    description:
      'Interactive IPL analytics and prediction platform with live match data, team stats, player performance visualization, and ML-backed win probability forecasts.',
    highlights: [],
    metrics: [['ML', 'win probability'], ['Live', 'match data']],
    tags: ['React', 'Python', 'Machine Learning', 'Data Analytics', 'Vercel'],
    github: 'https://github.com/priyanshu12-stack/ipl_oracle',
    live: 'https://ipl-oracle-blond.vercel.app/',
    featured: true,
    visual: 'word',
    word: 'IPL',
  },
  {
    id: 'genai-resume',
    name: 'GenAI Resume Analyzer',
    subtitle: '& Interview Planner',
    type: 'Generative AI',
    track: ['ai', 'web'],
    description:
      'AI-powered platform that analyzes resumes and generates personalized interview prep plans with ATS scores, skill gap analysis, and role-specific mock questions using Google Gemini.',
    tags: ['Python', 'Google Gemini', 'AI/ML', 'Flask', 'Full Stack'],
    github: 'https://github.com/priyanshu12-stack/Genai_resume_analyzer_and_interview_plannerview_planner',
    live: 'https://genai-resume-analyzer-and-ingterview-okkc.onrender.com/',
    featured: false,
  },
  {
    id: 'assistant',
    name: 'MyVirtual Assistant',
    subtitle: 'AI Automation Platform',
    type: 'AI automation',
    track: ['ai', 'web'],
    description:
      'Modular AI-driven MERN assistant with natural language command parsing, 8+ secure backend API routes, MVC architecture, Cloudinary media storage, and 30% efficiency improvement.',
    tags: ['MongoDB', 'Express.js', 'React', 'Node.js', 'Cloudinary', 'JWT'],
    github: 'https://github.com/priyanshu12-stack/My_Virtual_Assistant',
    live: 'https://my-virtual-assistant-seven.vercel.app/',
    featured: false,
  },
  {
    id: 'jobconnect',
    name: 'JobConnect',
    subtitle: 'Full Stack Job Portal (MERN)',
    type: 'MERN platform',
    track: ['web'],
    description:
      'A complete full-stack job portal where candidates register, search and apply for jobs and recruiters post openings — built on MongoDB, Express.js, React and Node.js, deployed on Render with MongoDB Atlas.',
    highlights: [
      'JWT authentication with role-based access for Admin, Recruiter and Job-seeker',
      'Post and manage job listings, apply to jobs and manage applications',
      'Protected routes with session persistence; RESTful Express API over Mongoose models',
    ],
    metrics: [['3', 'user roles'], ['12+', 'REST endpoints'], ['JWT', 'auth']],
    tags: ['MongoDB', 'Express.js', 'React', 'Node.js', 'React Router', 'JWT', 'Mongoose'],
    github: 'https://github.com/priyanshu12-stack/mern_project_job_portal',
    live: 'https://mern-project-job-portal.onrender.com/',
    featured: true,
    visual: 'jobs',
  },
  {
    id: 'videotube',
    name: 'VideoTube',
    subtitle: 'YouTube-inspired backend',
    type: 'Backend API',
    track: ['web'],
    description:
      'A YouTube-inspired backend in Express and MongoDB, structured into controllers, models, routes and middlewares — JWT auth with cookies, bcrypt password hashing, Multer + Cloudinary media uploads and paginated aggregation queries.',
    tags: ['Node.js', 'Express.js', 'MongoDB', 'Mongoose', 'JWT', 'bcrypt', 'Cloudinary', 'Multer'],
    github: 'https://github.com/priyanshu12-stack/backeend-videotube',
    live: null,
    featured: false,
  },
  {
    id: 'obys',
    name: 'Obys Agency',
    subtitle: 'Creative Studio Clone',
    type: 'Creative frontend',
    track: ['web'],
    description:
      'Award-winning creative agency website clone featuring GSAP scroll animations, smooth cursor effects, Locomotive Scroll, and immersive UI/UX design interactions.',
    tags: ['HTML', 'CSS', 'JavaScript', 'GSAP', 'Locomotive Scroll'],
    github: 'https://github.com/priyanshu12-stack/Obys-Agency',
    live: 'https://obys-agency-eosin-tau.vercel.app/',
    featured: false,
  },
]

export const proofMetrics = [
  { value: '70,000+', label: 'Employees served by the BCCL portal I engineered' },
  { value: '82.5%', label: 'GNN accuracy on Cora · within 1.07 pp of IEEE TNNLS paper' },
  { value: '20+', label: 'Projects built and published on GitHub' },
  { value: '800+', label: 'DSA problems solved · LeetCode 1600+' },
]

// ── Skills ──────────────────────────────────────────────────
// `icon` is a react-icons export name, resolved in Skills.jsx.
export const skillCategories = [
  {
    title: 'AI / ML / Computer Vision',
    short: 'AI · ML · CV',
    summary: 'Deep learning for graphs, speech and vision — from reproducing papers to designing new architectures.',
    skills: [
      { name: 'PyTorch', icon: 'SiPytorch' },
      { name: 'OpenCV', icon: 'SiOpencv' },
      { name: 'CNNs' },
      { name: 'Vision Transformers (ViT)' },
      { name: 'Object Detection & Tracking' },
      { name: 'Graph Neural Networks' },
      { name: 'Scikit-learn', icon: 'SiScikitlearn' },
      { name: 'HuggingFace Transformers', icon: 'SiHuggingface' },
      { name: 'WavLM', icon: 'SiPytorch' },
      { name: 'Torchaudio', icon: 'SiPytorch' },
    ],
  },
  {
    title: 'Data',
    short: 'Data',
    summary: 'Cleaning, feature engineering, SQL analysis and dashboards — raw data to business insight.',
    skills: [
      { name: 'Pandas', icon: 'SiPandas' },
      { name: 'NumPy', icon: 'SiNumpy' },
      { name: 'Matplotlib', icon: 'SiPython' },
      { name: 'EDA', icon: 'SiJupyter' },
      { name: 'MySQL', icon: 'SiMysql' },
      { name: 'MongoDB', icon: 'SiMongodb' },
      { name: 'PostgreSQL', icon: 'SiPostgresql' },
      { name: 'SQL' },
      { name: 'Seaborn', icon: 'SiPython' },
      { name: 'SQLAlchemy', icon: 'SiSqlalchemy' },
      { name: 'Power BI' },
      { name: 'Excel', icon: 'excel' },
    ],
  },
  {
    title: 'Languages',
    short: 'Languages',
    summary: 'C++ for DSA, Python for ML, JavaScript/TypeScript for product work.',
    skills: [
      { name: 'Python', icon: 'SiPython' },
      { name: 'C++', icon: 'SiCplusplus' },
      { name: 'C', icon: 'SiC' },
      { name: 'JavaScript', icon: 'SiJavascript' },
      { name: 'TypeScript', icon: 'SiTypescript' },
    ],
  },
  {
    title: 'Web & Backend',
    short: 'Web',
    summary: 'Interfaces, REST APIs and authentication across the MERN and Next.js stacks.',
    skills: [
      { name: 'React.js', icon: 'SiReact' },
      { name: 'Next.js', icon: 'SiNextdotjs' },
      { name: 'Node.js', icon: 'SiNodedotjs' },
      { name: 'Express.js', icon: 'SiExpress' },
      { name: 'REST APIs' },
      { name: 'Tailwind CSS', icon: 'SiTailwindcss' },
      { name: 'Vite', icon: 'SiVite' },
      { name: 'Cloudinary', icon: 'SiCloudinary' },
      { name: 'Multer', icon: 'SiNodedotjs' },
    ],
  },
  {
    title: 'Cloud & Tools',
    short: 'Tools',
    summary: 'Versioning, containers, deployment and the AI tooling I use day to day.',
    skills: [
      { name: 'Git', icon: 'SiGit' },
      { name: 'GitHub', icon: 'SiGithub' },
      { name: 'Docker', icon: 'SiDocker' },
      { name: 'AWS DynamoDB', icon: 'aws' },
      { name: 'Vercel', icon: 'SiVercel' },
      { name: 'Render', icon: 'SiRender' },
      { name: 'GitHub Copilot', icon: 'SiGithubcopilot' },
      { name: 'Gemini', icon: 'SiGooglegemini' },
      { name: 'Claude Code', icon: 'SiAnthropic' },
    ],
  },
  {
    title: 'Core CS',
    short: 'Core CS',
    summary: 'The foundations underneath the code.',
    skills: [
      { name: 'Data Structures & Algorithms', icon: 'SiLeetcode' },
      { name: 'OOPS' },
      { name: 'DBMS' },
      { name: 'Operating Systems', icon: 'SiLinux' },
      { name: 'Computer Networks', icon: 'SiCisco' },
    ],
  },
  {
    title: 'Interpersonal',
    short: 'People',
    summary: 'How I work with people.',
    skills: [
      { name: 'Leadership' },
      { name: 'Teamwork' },
      { name: 'Event Management' },
      { name: 'Public Speaking' },
    ],
  },
]

// ── Experience (most recent first) ──────────────────────────
export const experiences = [
  {
    role: 'Summer Intern, CSE Department',
    company: 'Indian Institute of Technology (ISM) Dhanbad',
    period: 'May 2026 — Jul 2026',
    location: 'Dhanbad, Jharkhand',
    kind: 'AI / ML Research',
    stat: ['82.5%', 'Cora accuracy'],
    points: [
      'Reproduced the Spatially Adaptive Filtering (SAF) GNN (IEEE TNNLS 2026) in PyTorch, reaching 82.5% accuracy on Cora (2,708 nodes, 7 classes) — within 1.07 pp of the published 83.57%.',
      'Optimized training with sparse tensor ops (~11× faster) and closed-form nonlocal aggregation; switching to full eigendecomposition (2,708 eigenpairs, ~5 s) lifted accuracy from ~61% to 82.5% (+21 pp).',
      'Designed Multi-Resolution SAF (MR-SAF), a novel extension with 3 frequency bands, independent learnable Bernstein filters and 6-stream node-wise attention to separate signal from noise across the graph spectrum.',
      'Ran Dirichlet-energy profiling, information probes and ablations: removing the low-frequency branch cut accuracy by >50 pp, while mid/high bands changed it by ~0 pp on Cora (homophily 0.81).',
    ],
    tags: ['PyTorch', 'Graph Neural Networks', 'Spectral Methods', 'Ablation Studies', 'Python'],
  },
  {
    role: 'Full-Stack Developer Intern',
    company: 'Bharat Coking Coal Limited (BCCL)',
    companyNote: 'Systems Dept. · A Coal India Subsidiary',
    period: 'Apr 2026 — Jun 2026',
    location: 'Hybrid',
    kind: 'Production Software',
    stat: ['70,000+', 'employees served'],
    points: [
      'Engineered a production Employee Self-Service Portal (React.js, Node.js, Express.js, MySQL, Sequelize) serving 70,000+ employees across 52+ collieries.',
      'Built 2FA login (JWT, OTP, MD5-legacy compatibility) with zero password resets, and 7 core modules (Auth, Dashboard, Apply, Status, Vacancy, Seniority, Profile) on 15+ REST endpoints.',
      'Integrated with 4 live production MySQL tables, adding 1 new table + 2 columns while keeping 100% data continuity with the legacy PHP system.',
      'Added a bilingual (English + Hindi) UI with React Hook Form + Zod, a 5-stage approval timeline and automated PDF generation.',
    ],
    tags: ['React.js', 'Node.js', 'Express.js', 'MySQL', 'Sequelize ORM', 'JWT', 'REST API'],
  },
  {
    role: 'Software Engineer — Tech Lead',
    company: 'Explorify Trips',
    period: 'Oct 2025 — Present',
    location: 'Remote',
    kind: 'Leadership',
    current: true,
    stat: ['4', 'DynamoDB tables'],
    points: [
      'Architected a full-stack travel marketplace using Next.js 14, TypeScript, AWS DynamoDB and NextAuth — multi-role auth across two production platforms.',
      'Designed 4 DynamoDB tables managing end-to-end booking lifecycle with commission-based revenue model.',
      'Engineered secure RazorPay payment workflow: order creation, verification, and automated refund rules via RESTful APIs.',
    ],
    tags: ['Next.js', 'TypeScript', 'DynamoDB', 'AWS', 'RazorPay'],
  },
  {
    role: 'Cyber Security Specialist',
    company: 'Centre for Development of Advanced Computing (C-DAC)',
    period: 'Apr 2025 — May 2025',
    location: 'India, Remote',
    kind: 'Security',
    points: [
      'Internship focusing on identifying, mitigating, and preventing cybersecurity risks and vulnerabilities.',
      'Managed internet security protocols and enhanced organizational security postures through risk assessment methodologies.',
    ],
    tags: ['Cyber Security Risk', 'Internet Security'],
  },
  {
    role: 'Member',
    company: 'Aerospace Society, BIT Mesra',
    period: 'Aug 2024 — Present',
    location: 'Mesra, On-site',
    kind: 'Community',
    current: true,
    points: [
      'Full-time involvement in the Aerospace Society at BIT Mesra.',
      'Collaborated on technical projects and developed leadership and teamwork skills within a demanding environment.',
    ],
    tags: ['Leadership', 'Teamwork', 'Project Management'],
  },
]

// Headline numbers for the experience chapter.
export const impactNumbers = [
  { value: '70,000+', title: 'Employees on one portal', text: 'The BCCL Employee Self-Service Portal serves 70,000+ employees across 52+ collieries.' },
  { value: '+21 pp', title: 'Accuracy from one insight', text: 'Full eigendecomposition took the IIT (ISM) GNN reproduction from ~61% to 82.5% on Cora.' },
]

// ── Education, achievements & certifications ────────────────
export const education = [
  {
    period: '08/2023 — Present',
    title: 'B.Tech in Electronics and Communication Engineering',
    institution: 'Birla Institute of Technology, Mesra — Ranchi, Jharkhand',
    score: 'CGPA: 9.19',
    logo: '/assets/bit-logo.jpg',
  },
  {
    period: '2022',
    title: 'Senior Secondary Education (Class 12)',
    institution: 'Rajkamal Saraswati Vidya Mandir (CBSE) — Dhanbad, Jharkhand',
    score: 'Percentage: 92.3%',
    logo: '/assets/svm-logo.jpg',
  },
  {
    period: '2020',
    title: 'Secondary Education (Class 10)',
    institution: 'Rajkamal Saraswati Vidya Mandir (CBSE) — Dhanbad, Jharkhand',
    score: 'Percentage: 95.6%',
    logo: '/assets/svm-logo.jpg',
  },
]

export const achievements = [
  { value: '4×', title: 'GP Birla Scholarship', text: 'Awarded four times for consistent academic excellence.' },
  { value: '1600+', title: 'LeetCode rating', text: 'Top 20% globally · 800+ problems solved across platforms.', url: 'https://leetcode.com/u/Hhystxn2xX/' },
  { value: 'Top 10', title: 'IIC Business Idea Competition', text: 'Among 500+ teams, organized by the Institution’s Innovation Council.' },
  { value: '9.19', title: 'CGPA at BIT Mesra', text: 'B.Tech, Electronics & Communication.' },
]

export const certifications = [
  { title: 'Web Development Bootcamp', issuer: 'Udemy' },
  { title: 'Mastering Data Structures and Algorithms', issuer: 'Udemy' },
]

export const socialLinks = [
  { name: 'LinkedIn', url: 'https://www.linkedin.com/in/priyanshu-raj-mishra-59ba20316/' },
  { name: 'GitHub', url: 'https://github.com/priyanshu12-stack' },
  { name: 'LeetCode', url: 'https://leetcode.com/u/Hhystxn2xX/' },
  { name: 'Resume', url: 'https://drive.google.com/file/d/1GVbbXz9nd7VLLZtd61EZhfrvZB8lJM8b/view?usp=drive_link' },
]

export const contactServices = [
  'Full-time SDE Role',
  'AI / ML Engineer Role',
  'Data Science Role',
  'Internship',
  'Project Collaboration',
]
