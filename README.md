# 🎸 MusicMart - Modern Musical Instruments E-Commerce Platform

> Developed & Authored by **iamgws**  
> Repository: [github.com/sameer481/Music-Mart-Musical-Instruments-Store](https://github.com/sameer481/Music-Mart-Musical-Instruments-Store.git)

![MusicMart Dark Theme Banner](https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?auto=format&fit=crop&w=1200&q=80)

---

## 🌟 Overview

**MusicMart** is a state-of-the-art, feature-rich web application built for musicians, audio engineers, and gear enthusiasts. It combines a massive **5,000-product catalog**, real-time **Web Audio API sound samplers**, **Indian Rupee (INR / ₹) price conversions**, live **GPS Order Tracking**, and a comprehensive **Store Admin Dashboard** wrapped in an ultra-sleek dark slate aesthetic.

---

## 🔥 Key Features

- 🎹 **5,000 Product Instrument Catalog**: Dynamically generated high-fidelity catalog spanning Electric Guitars, Acoustics, Synths, Digital Pianos, Electronic Drums, Studio Microphones, DJ Decks, and Accessories from world-class brands (*Fender, Gibson, Ibanez, Moog, Roland, Neumann, Shure, Pioneer DJ*).
- 🇮🇳 **Indian Rupee (INR / ₹) Currency Engine**: All prices, subtotals, tax estimates, shipping meters, deal countdowns, and order totals format in Indian Rupees (`₹`) with `en-IN` comma formatting.
- 🔊 **Interactive Web Audio API Sampler**: Audition audio synthesizer previews and instrument sound samplers directly in your browser without external audio files.
- 🚚 **Real-Time GPS Order Tracking**: Interactive 4-step delivery pipeline (*Processing*, *Shipped*, *Out for Delivery*, *Delivered*) with BlueDart tracking IDs and shipping address details.
- 👑 **Store Admin Dashboard**: Master control panel to inspect total store sales revenue, add new custom products, edit prices/stock inline, and update customer order statuses.
- 🎨 **Minimal Dark Slate Aesthetic**: Curated obsidian palette (`#020617` / `#0f172a`), subtle slate borders (`rgba(51, 65, 85, 0.6)`), crisp typography, and responsive micro-animations.
- ⚡ **27 Modular Component Stylesheets**: Zero monolithic CSS bloat; every component imports its own modular `.css` file for maximum maintainability.
- 🔍 **Product Comparison & Quick View**: Side-by-side spec comparison table and instant Quick View modals.

---

## 🛠️ Technology Stack

- **Core**: React 18, HTML5, JavaScript ES6+
- **Build Tooling**: Vite 8
- **Styling**: Vanilla CSS, Tailwind CSS CDN
- **Icons**: Lucide React Icons
- **Audio Engine**: Web Audio API Synthesizer Synth
- **Formatting**: `Intl.NumberFormat` / `en-IN` Locale Engine

---

## 🚀 Getting Started

### 1. Prerequisites
Ensure you have **Node.js** (v16.0 or higher) and **npm** installed on your machine.

### 2. Installation

Clone the repository to your local directory:

```bash
git clone https://github.com/sameer481/Music-Mart-Musical-Instruments-Store.git
cd Music-Mart-Musical-Instruments-Store
```

Install project dependencies:

```bash
npm install
```

### 3. Run Development Server

Start the local Vite development server:

```bash
npm run dev
```

Open your browser and navigate to `http://localhost:5173/`.

### 4. Build for Production

To create an optimized production bundle:

```bash
npm run build
```

---

## 📂 Project Structure

```
FRONTEND_PROJECT/
├── index.html                  # HTML entry point with Tailwind CDN & Fonts
├── src/
│   ├── main.jsx                # React root entry
│   ├── App.jsx                 # Main layout & application state controller
│   ├── index.css               # Design system tokens & global utility rules
│   ├── data/
│   │   └── products.js         # 5,000 product dataset & CURRENCIES definition
│   ├── utils/
│   │   └── audioSynth.js       # Web Audio API synthesizer sampler
│   └── components/             # 27 Modular React Components + Stylesheets
│       ├── Navbar.jsx & Navbar.css
│       ├── ProductCatalog.jsx & ProductCatalog.css
│       ├── ProductCard.jsx & ProductCard.css
│       ├── CartDrawer.jsx & CartDrawer.css
│       ├── OrderTrackingModal.jsx & OrderTrackingModal.css
│       ├── AdminPanelModal.jsx & AdminPanelModal.css
│       ├── ProductQuickViewModal.jsx & ProductQuickViewModal.css
│       ├── CompareModal.jsx & CompareModal.css
│       ├── DealsSection.jsx & DealsSection.css
│       ├── StudioBundleSection.jsx & StudioBundleSection.css
│       └── ...
├── package.json
└── README.md
```

---

## ✍️ Author & Credits

Designed, Developed, & Maintained by **iamgws**.

- **GitHub**: [github.com/sameer481](https://github.com/sameer481)
- **Repository**: [Music-Mart-Musical-Instruments-Store](https://github.com/sameer481/Music-Mart-Musical-Instruments-Store.git)

---

*Made with ❤️ for musicians and gear lovers worldwide.*
