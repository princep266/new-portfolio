# Prince Prajapati — Premium 3D Interactive Developer Portfolio

An interactive, cinematic 3D personal portfolio and digital workspace built for **Prince Prajapati** — Final-year B.Tech Information Technology student specializing in Cybersecurity, Aspiring Web Developer & Defensive Security Enthusiast based in Mumbai, India.

> *"Building Digital Experiences. Exploring Cybersecurity. Solving Real-World Problems."*

---

## 🚀 Key Highlights & Architecture

- **Interactive 3D Centerpiece**: High-performance React Three Fiber / Three.js floating digital network sphere with rotating cyber geodesic lattices, connected data nodes, orbital rings with data packets, and pointer parallax reaction. Includes a lightweight 2D canvas fallback for low-spec / mobile devices.
- **Custom Interactive CLI Terminal**: Authentic Unix/Linux-style command-line environment (`prince@cyber-workstation: ~`) supporting:
  - `help`: Command documentation
  - `about`: Prince's background & philosophy
  - `skills`: Categorized technical arsenal
  - `projects`: Detailed engineering dossiers
  - `education`: Academic degrees and institution details
  - `contact`: Direct contact channels
  - `scan`: Live SOC socket vulnerability inspection simulation
  - `whoami`: Active analyst session info
  - `clear`: Screen buffer flush
  - *Features*: Tab auto-completion, Arrow Up/Down command history, quick-click suggestion chips, and session copy.
- **Interactive SOC Defense & Packet Simulator**: Live network packet flow visualizer illustrating Prince's flagship **ML-Based DoS Intrusion Detection System**:
  - Live animated packet streams (Normal TCP/TLS vs DoS SYN Floods).
  - "Simulate DoS Attack" interactive trigger button.
  - Anomaly classification and pfSense stateful firewall drop mitigation.
  - Live SOC alert telemetry event stream with live packet counters.
- **Technical Skills Matrix**: Comprehensive categorization across Programming, Frontend, Backend, Databases, Network Security, Security Monitoring, Security Tools, and Other Technologies with real-time search, category filters, and detailed technical inspection modals without invented percentages.
- **Featured Projects Showcase**: In-depth coverage of the ML-Based DoS IDS (Problem, Approach, Architecture Pipeline, Solution), plus reserved clean slots for future engineering projects.
- **Academic Foundation Timeline**: Animated chronological timeline showcasing B.Tech in IT (Cybersecurity Honors) from Shree L.R. Tiwari College of Engineering and Diploma in Computer Engineering from Thakur Polytechnic.
- **Single Source of Truth**: All personal details, project details, skills, and links are cleanly managed in [`src/data/portfolioData.ts`](./src/data/portfolioData.ts).
- **Interactive Resume Dossier Modal**: Print-to-PDF ready and summary text export.

---

## 🛠️ Technology Stack

- **Framework**: [Next.js 14](https://nextjs.org/) (App Router, React 18, TypeScript)
- **3D Graphics**: [Three.js](https://threejs.org/) & [@react-three/fiber](https://docs.pmnd.rs/react-three-fiber)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/) (Cyber palette, glassmorphism, responsive bento grids)
- **Motion**: [Framer Motion](https://www.framer.com/motion/)
- **Icons**: [Lucide React](https://lucide.dev/) & Custom SVG brand vector components

---

## 💻 Getting Started Locally

```bash
# 1. Install dependencies
npm install

# 2. Run the development server
npm run dev

# 3. Open in your browser
# Navigate to http://localhost:3000
```

To create an optimized production build:

```bash
npm run build
npm run start
```

---

## 📁 Project Structure

```
portfolio/
├── src/
│   ├── app/
│   │   ├── globals.css         # Cyber glows, glassmorphism, custom scrollbar
│   │   ├── layout.tsx          # SEO, Open Graph metadata, viewport
│   │   └── page.tsx            # Main portfolio layout orchestrator
│   ├── components/
│   │   ├── hero/               # 3D Cyber globe, fallback, HeroSection
│   │   ├── about/              # Bento-grid about section & philosophy
│   │   ├── skills/             # Categorized arsenal, filter pills, inspector modal
│   │   ├── projects/           # Featured ML DoS IDS, architecture modal, future slots
│   │   ├── education/          # Academic qualifications timeline
│   │   ├── terminal/           # Interactive developer CLI terminal
│   │   ├── cyber/              # Interactive SOC packet defense simulator
│   │   ├── contact/            # Validated contact form, direct copy, social channels
│   │   ├── navbar/             # Floating navbar with active spy & mobile drawer
│   │   ├── footer/             # Cyber footer with back-to-top
│   │   └── ui/                 # Custom cursor, cyber background, resume modal
│   └── data/
│       └── portfolioData.ts    # Centralized portfolio data store
└── tailwind.config.ts          # Custom cyber color scheme & animations
```

---

## 🔒 Authenticity & Compliance

- **No invented work experience, awards, scores, certifications, or fake GitHub stats.**
- All content directly reflects Prince Prajapati's confirmed academic and technical profile.
