# 🎓 AI Smart Campus Management System

> A complete, modern, professional, production-ready full-stack university operating system built for live presentations and seamless Netlify deployment.

![Antigravity AI Campus Management System](https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=1200&auto=format&fit=crop&q=80)

---

## 🌟 Executive Features Overview

The **AI Smart Campus Management System** unifies students, faculty, academics, attendance, fees, library loans, communication, and executive analytics into a cohesive, responsive web platform.

### 👥 Role-Based Portals & Demo Access
- **Administrator Portal:** Executive dashboard, full CRUD over students & faculty, fee financial logs, system analytics, and campus announcements.
- **Teacher / Faculty Portal:** Class schedules, quick attendance marking matrix, gradebook submissions, and AI class drop warnings.
- **Student Portal:** Course timetable, CGPA transcripts, attendance percentage tracker, library checkout status, and interactive **Campus AI Assistant**.
- **Parent / Guardian Portal:** Child academic progress, attendance reports, tuition fee receipt view & online payment portal.

---

## 🔑 Demo Access Credentials

You can log in instantly using the demo switcher buttons on the login screen or use these pre-filled credentials:

| Role | Name | Email | Password |
| :--- | :--- | :--- | :--- |
| **👑 Admin** | Dr. Elizabeth Warren | `admin@campus.edu` | `demo1234` |
| **👨‍🏫 Teacher** | Dr. Robert Vance | `robert.vance@campus.edu` | `demo1234` |
| **🎓 Student** | Alex Morgan | `alex.morgan@campus.edu` | `demo1234` |
| **👨‍👩‍👦 Parent** | Robert Morgan | `robert.morgan@gmail.com` | `demo1234` |

---

## 🛠️ Technology Stack

- **Frontend Core:** React 18 + Vite 5
- **Styling & UI:** Tailwind CSS v3 + Modern Glassmorphism + Responsive Drawer Navigation
- **Icons & Visuals:** Lucide React
- **Data Visualization:** Recharts (Area, Bar, Pie, Line Charts)
- **Data Persistence:** LocalStorage Service Layer with fallback dataset
- **Deployment Target:** Netlify (configured via `netlify.toml` and `_redirects` SPA rules)

---

## 🚀 Quick Start & Installation

### 1. Clone & Install Dependencies

```bash
# Navigate to project root
cd "campus mangement"

# Install packages
npm install
```

### 2. Run Local Development Server

```bash
npm run dev
```

Open your browser at `http://localhost:3000` to interact with the live application.

---

## 📦 Production Build

To test the optimized production build locally:

```bash
npm run build
```

This compiles optimized bundles into the `dist/` directory.

---

## ☁️ Deployment Instructions for Netlify

The application is pre-configured for instant zero-config deployment on Netlify.

### Option A: Netlify CLI Deployment
```bash
# Install Netlify CLI (if not already installed)
npm install -g netlify-cli

# Deploy directly from build folder
netlify deploy --prod
```
- **Build Command:** `npm run build`
- **Publish Directory:** `dist`

### Option B: Netlify Git Import
1. Push this workspace to your GitHub/GitLab repository.
2. Connect repository to Netlify dashboard.
3. Netlify automatically reads `netlify.toml` with the SPA redirect rule `/* -> /index.html 200`.

---

## 📁 Project Structure

```
├── public/
│   └── _redirects              # Netlify SPA fallback rule
├── src/
│   ├── components/
│   │   ├── auth/              # Role login & demo access modal
│   │   ├── dashboards/        # Role-tailored dashboards (Admin, Teacher, Student, Parent)
│   │   ├── landing/           # Public Hero, Features, How it Works, FAQ landing page
│   │   ├── layout/            # Navbar, Sidebar, MobileNav drawer, Footer
│   │   ├── modules/           # 14 Core Feature Modules (Students, Faculty, Attendance, etc.)
│   │   └── ui/                # Reusable Cards, Buttons, Badges, Modals, StatCards
│   ├── context/
│   │   ├── AuthContext.jsx    # Role & authentication state switcher
│   │   ├── DataContext.jsx    # LocalStorage CRUD service layer
│   │   ├── ThemeContext.jsx   # Dark/light mode switcher
│   │   └── ToastContext.jsx   # Global floating toast alert system
│   ├── data/
│   │   └── initialData.js     # Realistic demo dataset (30+ students, 10+ teachers, etc.)
│   ├── App.jsx                # Main application tab router
│   ├── main.jsx               # React DOM entry point
│   └── index.css              # Tailwind CSS directives & scrollbar styles
├── index.html
├── netlify.toml               # Netlify build configuration
├── package.json
├── vite.config.js
└── README.md
```

---

## 🎯 Presentation Highlights & Future Roadmap

### Unique Highlights
- **AI Attendance Anomaly Alert:** Generates real-time notifications when attendance drops.
- **Campus AI Assistant:** Conversational AI UI answering queries on timetables, grades, and exams.
- **LocalStorage Data Persistence:** Full CRUD operations persist state across browser refreshes.

### Future Roadmap
- Real OpenAI / Gemini API Integration
- Face Recognition Camera Attendance Marking
- Supabase / PostgreSQL Cloud Backend Integration
- Automated SMS / WhatsApp Guardian Alerts
