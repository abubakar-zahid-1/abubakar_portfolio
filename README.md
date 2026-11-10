# Abubakar Z. — Professional Portfolio & Digital Marketing Showcase
> **Selfer Clone**: Modern dark aesthetic, smooth scroll spy, animated typing rotator, interactive modals, animated odometer stats, filterable case studies, and a full working Node.js/Express backend.

---

## 🌟 Features Included

- **Exact 1:1 Design Language**: Faithful to the high-contrast dark theme, warm coral-orange accents (`#ff5722`), floating geometric badges, and clean typography.
- **Hero Section with Dynamic Rotator**: Real-time typewriter effect cycling through:
  - *Digital Marketing Executive*
  - *Lead SEO & Organic Growth Strategist*
  - *Performance Marketing Team Lead*
  - *B2B Lead Generation Specialist*
  - *AI Workflow & Automation Architect*
- **Photos Integrated**:
  - Hero section features Abubakar's headshot (`hero-avatar.jpg`).
  - About Me section features Abubakar's portrait (`about-photo.jpg`).
- **Interactive Modals**:
  - Click **"Read More"** on any of the 6 specialized services to view detailed deliverables and capabilities.
  - Click **"View Case Study"** on any project to view key results, impact metrics, and tool stacks.
- **Filterable Case Studies Gallery**:
  - Filter by *All*, *SEO & Growth*, *B2B Lead Gen*, *Automation & AI*, and *Brand Authority*.
- **Live Counter Numbers (Odometer)**:
  - Animated incrementing numbers for *Years of Experience (2+)*, *Campaigns Executed (15+)*, *Organic Traffic Lift (40%)*, and *Clients & Partners (20+)*.
- **One-Click Resume Download**:
  - "Download CV" buttons trigger direct download of Abubakar's PDF resume (`Abubakar_Z_Resume.pdf`).
- **Working Contact Form & Admin Inbox**:
  - Submissions are validated and stored in `data/messages.json`.
  - Abubakar can view all received inquiries by clicking **"View Inquiries (Admin)"** in the footer or pressing `Ctrl + Shift + M`.

---

## 📁 Project Structure

```text
abubakar-portfolio/
├── data/
│   ├── portfolio-data.json       # All content, services, projects, stats in structured JSON
│   └── messages.json             # Stores submitted contact form inquiries
├── public/
│   ├── index.html                # Main portfolio front-end
│   ├── css/
│   │   └── style.css             # Theme, animations, grid, cards, responsive styling
│   ├── js/
│   │   └── main.js               # Rotator, filters, odometer, modal logic, AJAX form
│   └── assets/
│       ├── img/                  # Profile headshots & project visual mockups
│       └── docs/                 # Original PDF resume (Abubakar_Z_Resume.pdf)
├── generate-assets.js            # Generator for project SVG graphics
├── server.js                     # Express.js backend server with REST APIs
└── package.json                  # Dependencies (Express, CORS)
```

---

## 🚀 How to Run Locally

1. Open PowerShell / Terminal in this project directory:
   ```powershell
   cd "C:\Users\Keenly Digitall\.gemini\antigravity\scratch\abubakar-portfolio"
   ```

2. Start the server:
   ```powershell
   node server.js
   ```

3. Open your browser and visit:
   ```text
   http://localhost:3000
   ```

---

## 🔌 API Endpoints

| Method | Endpoint | Description |
| :--- | :--- | :--- |
| `GET` | `/` | Serves the full portfolio website |
| `GET` | `/api/portfolio` | Returns structured portfolio JSON data |
| `POST` | `/api/contact` | Handles contact form submissions & saves to disk |
| `GET` | `/api/messages` | Returns all received messages (Admin view) |
| `GET` | `/api/download-cv` | Directly downloads `Abubakar_Z_Resume.pdf` |
| `GET` | `/api/health` | Server uptime and health check |

---

## ☁️ Deployment Guide

- **Render / Railway / DigitalOcean / Heroku**:
  Push this directory to a GitHub repository, create a Web Service, and set the start command to `node server.js`.
- **cPanel / Apache / Shared Hosting**:
  If using PHP, the frontend files in `public/` can be uploaded directly to `public_html`, and the contact form can point to a simple PHP mail script.
- **Vercel / Netlify**:
  Deploy `public/` as a static site and deploy `api/contact` as a serverless function.
