# Orion AI SOC Analyst Dashboard

A professional, next-generation AI SOC (Security Operations Center) analyst platform built with Next.js 14, TypeScript, and Tailwind CSS v4.

## ✨ Features

### 🎯 Dashboard
- **Real-time Metrics**: Track total alerts investigated, mean time to conclusion, human hours saved, and autonomous coverage
- **Investigation Velocity Charts**: Visualize activity volume over time
- **Active Feed**: Monitor ongoing AI reasoning steps with live status indicators

### 🔍 Investigations Management
- **High-Density Data Table**: Rapid triage with sortable columns
- **Smart Filtering**: Filter by verdict (Malicious, Suspicious, Benign), source, and time range
- **Detailed Investigation Views**: Deep-dive into each security incident

### 📊 Investigation Detail Pages
- **Summary**: AI verdict with confidence scores and reasoning trails
- **Findings**: Detailed security artifacts and threat indicators
- **Evidence Locker**: Immutable forensic storage with SHA256 verification
- **Remediations**: AI-recommended response actions
- **Changelog**: Complete audit trail of all AI and human actions

## 🎨 Design Features

- **Professional Gradient Color Palette**: Teal-to-Blue for primary actions, Emerald-to-Mint for benign findings, Crimson-to-Orange for malicious alerts
- **Glassmorphism**: Modern semi-transparent UI with backdrop blur effects
- **Responsive Design**: Optimized for desktop and tablet viewing
- **Dark Theme**: Professional SOC analyst aesthetic

## 🚀 Tech Stack

- **Framework**: [Next.js 16](https://nextjs.org/) (App Router)
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **Styling**: [Tailwind CSS v4](https://tailwindcss.com/)
- **Icons**: [Lucide React](https://lucide.dev/)
- **Animations**: [Framer Motion](https://www.framer.com/motion/)
- **Charts**: [Recharts](https://recharts.org/)

## 📦 Installation

```bash
# Clone the repository
git clone https://github.com/Sidreyas/Orion_preview.git

# Navigate to the project directory
cd Orion_preview

# Install dependencies
npm install

# Run the development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser to view the dashboard.

## 📁 Project Structure

```
Orion-preview/
├── src/
│   ├── app/
│   │   ├── dashboard/              # Main dashboard page
│   │   ├── investigations/
│   │   │   ├── all/                # Investigations list
│   │   │   └── [id]/               # Dynamic investigation detail
│   │   │       ├── layout.tsx      # Shared layout with sub-navbar
│   │   │       ├── page.tsx        # Summary page
│   │   │       ├── findings/       # Findings page
│   │   │       ├── evidence/       # Evidence locker page
│   │   │       ├── remediations/   # Remediations page
│   │   │       └── changelog/      # Changelog page
│   │   ├── layout.tsx              # Root layout
│   │   └── globals.css             # Global styles
│   ├── components/
│   │   └── Sidebar.tsx             # Navigation sidebar
│   └── lib/
│       └── utils.ts                # Utility functions
├── package.json
├── tsconfig.json
├── next.config.js
└── postcss.config.js
```

## 🛠️ Available Scripts

```bash
# Start development server
npm run dev

# Build for production
npm run build

# Start production server
npm start

# Run linter
npm run lint
```

## 🎯 Key Routes

- `/dashboard` - Main security dashboard
- `/investigations/all` - List of all investigations
- `/investigations/[id]` - Investigation summary
- `/investigations/[id]/findings` - Detailed findings
- `/investigations/[id]/evidence` - Evidence locker
- `/investigations/[id]/remediations` - Suggested remediations
- `/investigations/[id]/changelog` - Investigation audit trail

## 🔒 Security Features

- **Tamper-proof Evidence Storage**: All forensic artifacts are stored with SHA256 verification
- **Complete Audit Trail**: Every AI and human action is logged
- **Transparent AI Reasoning**: Full reasoning trails for every verdict
- **Role-based Response Actions**: Automated remediation with approval workflows

## 🌟 Inspiration

This project was inspired by modern SOC analyst platforms like [Dropzone AI](https://www.dropzone.ai/), designed to showcase next-generation AI-driven security operations.

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 🤝 Contributing

Contributions, issues, and feature requests are welcome! Feel free to check the [issues page](https://github.com/Sidreyas/Orion_preview/issues).

## 👨‍💻 Author

**Sidreyas**
- GitHub: [@Sidreyas](https://github.com/Sidreyas)

---

Built with ❤️ using Next.js and Tailwind CSS
