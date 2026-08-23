// Single source of truth — every fact here is pulled directly from
// Srikanth's resume. Do not add projects, numbers, or claims that
// aren't in the source PDF.

export const profile = {
  name: 'Srikanth Chakali',
  headline: 'Full-Stack Developer & CS Undergraduate',
  tagline:
    'Computer Science undergraduate with hands-on experience building full-stack applications using Python, PostgreSQL, Flask, and JavaScript/React.',
  summary:
    'Skilled in database design, secure authentication (JWT, bcrypt), and deploying production-ready web applications with role-based access control and real user data.',
  location: 'Kurnool, Andhra Pradesh',
  phone: '+91 9000074837',
  email: 'chakalisrikanth32@gmail.com',
  photo: '/profile.jpg',
  resumeFile: '/Srikanth_Chakali_Resume.pdf',
  // TODO: replace these with your real profile URLs — the resume PDF
  // lists them as link text only, without visible destination URLs.
  links: {
    github: 'https://github.com/srikanth-chakali',
    linkedin: 'https://www.linkedin.com/in/srikanth-chakali-23ata05060/',
    email: 'mailto:chakalisrikanth32@gmail.com',
  },
}

export const skillGroups = [
  {
    label: 'Languages',
    items: ['Python', 'SQL', 'Java (OOP Fundamentals)'],
  },
  {
    label: 'Web & Frameworks',
    items: ['HTML5', 'CSS3', 'JavaScript', 'React', 'Streamlit', 'Flask'],
  },
  {
    label: 'Databases',
    items: ['PostgreSQL', 'MySQL'],
  },
  {
    label: 'Tools',
    items: ['Git', 'GitHub', 'Visual Studio Code'],
  },
  {
    label: 'Practices',
    items: ['Problem Solving', 'Communication', 'Adaptability', 'Time Management'],
  },
]

export const projects = [
  {
    title: 'CashFlow — Personal Expense Tracker',
    date: 'Jun 2025',
    stack: ['Python', 'Flask', 'PostgreSQL'],
    description:
      'Full-stack personal expense tracker with secure authentication, income/expense management, savings calculation, and category-wise spending analysis across 6+ expense categories.',
    points: [
      'PostgreSQL-based user-specific data storage, bcrypt password hashing, and CSV export; deployed on Vercel to support unlimited concurrent users with fully isolated data.',
      'Designed and optimized a relational database schema across 4+ tables for efficient transaction storage, retrieval, and filtering — reducing average query response time for filtered views.',
    ],
    github: 'https://github.com/srikanth-chakali/cashflow_expense_tracker',
    demo: 'https://cashflow-expense-tracker.vercel.app/',
  },
  {
    title: 'Personal Portfolio Website',
    date: 'Jul 2026',
    stack: ['HTML5', 'CSS3', 'JavaScript'],
    description:
      'Responsive personal portfolio website featuring theme switching, smooth navigation, and an interactive project showcase across 5+ sections.',
    points: [
      'Integrated a Formspree-powered contact form and fully responsive design, improving accessibility and recruiter engagement across 3+ device breakpoints (mobile, tablet, desktop).',
    ],
    github: 'https://github.com/srikanth-chakali/my-portfolio',
    demo: 'https://srikanth-chakali-portfolio.vercel.app/',
  },
]

export const experience = [
  {
    company: 'InternPe',
    role: 'Python Programming Intern',
    location: 'Remote',
    date: 'May 2025 – Jul 2025',
    points: [
      'Completed a 6-week Python programming internship, building 5+ mini-projects covering scripting, application logic, and problem-solving.',
      'Applied core Python concepts to deliver 5+ functional applications, meeting all assigned project deadlines and deliverables.',
    ],
  },
]

export const education = [
  {
    school: 'G. Pullaiah College of Engineering and Technology',
    degree: 'Bachelor of Technology in Computer Science and Engineering',
    location: 'Kurnool, Andhra Pradesh',
    date: '2023 – 2027',
  },
  {
    school: 'Board of Intermediate Education, Andhra Pradesh',
    degree: 'Intermediate (MPC — Mathematics, Physics and Chemistry)',
    location: 'Andhra Pradesh',
    date: '2021 – 2023',
  },
]

export const certifications = [
  { name: 'AWS Certified AI Practitioner', issuer: 'Amazon Web Services (AWS)', date: 'Jul 2026' },
  { name: 'Introduction to AI and Fundamentals of AI', issuer: 'IBM SkillsBuild', date: 'Jun 2026' },
  { name: 'Data Analysis with Python', issuer: 'freeCodeCamp', date: 'Jun 2026' },
  { name: 'Deloitte Australia Data Analytics Job Simulation', issuer: 'Forage', date: 'May 2026' },
  { name: 'Programming with Python 3.X', issuer: 'Simplilearn SkillUp', date: 'May 2026' },
]

export const achievements = [
  'Completed the Employability Skills Program by EduSkills, focusing on communication, teamwork, and workplace readiness.',
  'Participated in the TechnoVerse Hackathon organized by Cognizant, collaborating with peers on technology-driven problem solving.',
]

export const nav = [
  { label: 'About', href: '#about' },
  { label: 'Skills', href: '#skills' },
  { label: 'Projects', href: '#projects' },
  { label: 'Experience', href: '#experience' },
  { label: 'Education', href: '#education' },
  { label: 'Contact', href: '#contact' },
]
