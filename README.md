# 🚀 Priyanshu Raj | Full-Stack Developer Portfolio

A modern, highly interactive, and premium dark-themed personal portfolio website built to showcase my software engineering journey, skills, and projects.

## 🔗 Live Demo
> **[View Live Portfolio Here](#)** *(Link coming soon)*

---

## ✨ Overview
This portfolio is designed with a heavy focus on fluid UI/UX, utilizing **glassmorphism**, dynamic **accent colors**, and **buttery-smooth scrolling** to create a premium browsing experience. Every section is intricately animated to respond to scroll events and user interactions seamlessly across both ultra-wide desktops and mobile devices.

## 🚀 Built With (Tech Stack)

### Core
- **[React.js](https://react.js.org/)** - Component-based UI framework
- **[Vite](https://vitejs.dev/)** - Lightning fast build tool
- **[Tailwind CSS](https://tailwindcss.com/)** - Utility-first CSS framework for rapid UI styling

### Animation & Physics
- **[Framer Motion](https://www.framer.com/motion/)** - Production-ready, declarative animation library for React
- **[Lenis](https://studiofreight.github.io/lenis/)** - Lightweight fluid smooth scrolling overriding chunky native scrollbars
- **[React Icons](https://react-icons.github.io/react-icons/)** - Complete SVG icon integration

### Backend / Services
- **[EmailJS](https://www.emailjs.com/)** - Client-side secure automated email handling for the contact form

---

## 🎨 Features & Animations

1. **Fluid Smooth Scrolling**: Powered by `@studio-freight/lenis`, the entire website operates on a customized scroll physics engine that ties perfectly into Framer Motion.
2. **Dynamic Theming & Accent Gradients**: Elements, buttons, glowing shadows, and text elegantly orchestrate colors through dedicated CSS variables ensuring reactive consistency.
3. **Sticky Scroll Physics**: The **Projects** section embraces a "sticky-stacking" animation where cards smoothly layer over each other as you scroll down the page.
4. **Interactive Horizontal Marquees**: The **Experience** timeline is driven by a seamless continuous CSS marquee animation on desktop (which pauses on hover) and cleanly gracefully collapses to a vertical layout on mobile.
5. **Glassmorphism**: Modals, navbar, and card components utilize deep background blurring (`backdrop-filter`) for premium aesthetic depth and shadowing.
6. **Fully Responsive Ecosystem**: Every layout constraint calculates the user viewport—scaling down gracefully for iPhones.

---

## 📁 Project Structure

```text
├── public/                 # Static assets
├── src/
│   ├── assets/             # Images and illustrative SVGs 
│   ├── components/         # Reusable UI elements (Navbar, Cards, Loaders, ScrollProgress)
│   ├── constants/          # Static data (Skills arrays, Education entries, Project links)
│   ├── sections/           # Large full-viewport sections (Hero, Projects, Experience, Contact)
│   ├── utils/              # Helper functions (e.g., Framer Motion stagger variants)
│   ├── App.jsx             # Main application component integrating smooth-scroll wrapper
│   └── index.css           # Global theme variables, utility classes, and keyframes
├── .env                    # Environment variables for EmailJS (Not tracked via .gitignore)
├── index.html              # HTML DOM entry point
├── package.json            # NPM Dependencies
└── vite.config.js          # Vite configuration
```

---

## 🛠️ Installation & Workflow

To run this project locally, follow these easy steps:

1. **Clone the repository**
   ```bash
   git clone https://github.com/priyanshu12-stack/Portfolio_priyanshu.git
   cd Portfolio_priyanshu
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   Create a `.env` file in the root directory and add your EmailJS credentials to enable the Contact form:
   ```env
   VITE_EMAILJS_SERVICE_ID=your_service_id
   VITE_EMAILJS_TEMPLATE_ID=your_template_id
   VITE_EMAILJS_PUBLIC_KEY=your_public_key
   ```
   *(Note: The `.gitignore` is already protecting this file from accidentally being uploaded)*

4. **Start the development server**
   ```bash
   npm run dev
   ```

5. **Build for production**
   ```bash
   npm run build
   ```

---

## 📫 Contact / Connect

**Priyanshu Raj**  
- **GitHub:** [@priyanshu12-stack](https://github.com/priyanshu12-stack)
- **Email:** priyanshu001raj@gmail.com

---
*If you like this portfolio design and structure, feel free to drop a ⭐ on the repository!*
