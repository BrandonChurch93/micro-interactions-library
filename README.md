# 🎨 Micro-Interactions Library

A collection of **15 beautiful, accessible, copy-paste micro-interactions** for modern web applications. Built with Next.js 14, TypeScript, and pure CSS/Web Animations API.

[![Live Demo](https://img.shields.io/badge/demo-live-success)](https://micro-interactions-library.vercel.app)
[![Next.js](https://img.shields.io/badge/Next.js-14-black)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue)](https://www.typescriptlang.org/)
[![License](https://img.shields.io/badge/license-MIT-green)](LICENSE)

## ✨ Features

- **15 Production-Ready Components** - State transitions, click feedback, accessibility-first interactions, and navigation patterns
- **Copy-Paste Ready** - Each component is self-contained with syntax highlighting and one-click copy
- **Accessibility First** - WCAG 2.1 AA compliant with keyboard navigation and screen reader support
- **Dark Mode** - System-aware theme with manual toggle
- **Zero Dependencies** - Most components use pure CSS; complex animations use Web Animations API
- **TypeScript** - Fully typed for better developer experience
- **Responsive** - Works beautifully on all screen sizes
- **Search** - Fast ⌘+K search to find components instantly

## 🚀 Live Demo

Visit the live site: [micro-interactions-library.vercel.app](https://micro-interactions-library.vercel.app)

## 📦 Components

### State Transitions (5)

1. **Button Loading States** - Idle → Loading → Success → Error flow
2. **Skeleton to Content** - Smooth loading placeholders with multiple variants
3. **Toast Notifications** - Position-aware toast system with auto-dismiss
4. **Form Input Validation** - Real-time validation with error/success states
5. **Progress Bar** - Animated progress with multiple easing options

### Click Feedback (4)

6. **Ripple Effect** - Material Design-inspired click ripples
7. **Bounce Press** - Satisfying squash & stretch animation
8. **Glow Pulse** - Expanding glow ring on interaction
9. **Confetti Burst** - Celebratory particle explosion

### Accessibility-First (3)

10. **Focus Indicators** - Three beautiful focus ring variants
11. **Skip to Content** - Keyboard navigation helper
12. **Reduced Motion Toggle** - Respect user preferences

### Navigation (3)

13. **Mobile Menu Transition** - Smooth hamburger menu animation
14. **Tab Indicator Slide** - Animated tab selection indicator
15. **Dropdown Menu** - Accessible dropdown with keyboard support

## 🛠️ Tech Stack

- **Framework:** Next.js 14 (App Router)
- **Language:** TypeScript
- **Styling:** CSS Modules + CSS Variables
- **Animation:** Pure CSS Transitions (80%) + Web Animations API (20%)
- **Search:** cmdk
- **Syntax Highlighting:** Shiki
- **Accessibility:** react-aria
- **Deployment:** Vercel

## 🏃‍♂️ Getting Started

### Prerequisites

- Node.js 18+
- npm or yarn

### Installation

```bash
# Clone the repository
git clone https://github.com/BrandonChurch93/micro-interactions-library.git

# Navigate to project directory
cd micro-interactions-library

# Install dependencies
npm install

# Run development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to see the site.

## 📁 Project Structure

```
micro-interactions-library/
├── app/
│   ├── components/
│   │   └── [slug]/
│   │       └── page.tsx          # Dynamic component pages
│   ├── layout.tsx                 # Root layout with metadata
│   ├── page.tsx                   # Homepage with hero & grid
│   └── globals.css                # Global styles & CSS variables
├── components/
│   ├── demos/                     # Auto-playing hero demos
│   ├── interactions/              # All 15 micro-interaction components
│   └── ui/                        # Shared UI components
├── lib/
│   └── components.ts              # Component metadata & constants
└── public/
    ├── og-image.svg               # Social sharing image
    ├── favicon.svg                # Site favicon
    └── site.webmanifest           # PWA manifest
```

## 🎯 Usage

Each component page includes:

- **Live Interactive Demo** - Try it out in real-time
- **Implementation Code** - Copy-paste ready TypeScript/CSS
- **Variants** - Multiple visual styles to choose from
- **Usage Notes** - Best practices and accessibility tips

Simply click the "Copy Code" button and paste into your project!

## 🧪 Building for Production

```bash
# Create production build
npm run build

# Test production build locally
npm start
```

## 🌟 Why This Project?

This library demonstrates:

- ✅ **Clean Architecture** - Well-organized, maintainable code
- ✅ **Performance** - Optimized animations using transform/opacity
- ✅ **Accessibility** - WCAG 2.1 AA compliance throughout
- ✅ **Modern Best Practices** - TypeScript, CSS Modules, App Router
- ✅ **User Experience** - Thoughtful interactions that feel delightful
- ✅ **Developer Experience** - Easy to understand, copy, and customize

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🤝 Contributing

Contributions, issues, and feature requests are welcome! Feel free to check the [issues page](https://github.com/BrandonChurch93/micro-interactions-library/issues).

## 📧 Contact

Created by **Brandon Church**

Portfolio: [brandonchurchprotfolio.com](https://www.brandonchurchprotfolio.com)

Project Link: [https://github.com/BrandonChurch93/micro-interactions-library](https://github.com/BrandonChurch93/micro-interactions-library)

---

⭐ Star this repo if you found it helpful!
