# React Dashboard Tutorial

A simple React dashboard built with Vite, TypeScript, Tailwind CSS, and shadcn/ui components. This project is designed to teach React fundamentals to backend developers.

## 📚 What You'll Learn

- React component architecture
- Component composition and reusability
- React Router for navigation
- State management basics
- Props and TypeScript interfaces
- Styling with Tailwind CSS
- Using third-party libraries (Recharts for charts)

## 🏗️ Project Structure

```
src/
├── components/
│   ├── layout/          # Layout components (Sidebar, Layout)
│   ├── shared/          # Reusable components (Charts, Cards, Lists)
│   └── ui/              # Base UI components (Button, Card, Badge)
├── data/                # Mock data files
├── lib/                 # Utility functions
├── pages/               # Page components for each route
├── App.tsx              # Main app with routing
├── main.tsx             # Entry point
└── index.css            # Global styles with Tailwind
```

## 🚀 Prerequisites

Before you begin, you need to install Node.js. We recommend using NVM (Node Version Manager) to manage Node.js versions.

---

## 📦 Installing NVM and Node.js

### 🐧 Ubuntu / Linux

#### Step 1: Install NVM

```bash
# Download and install NVM
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.40.1/install.sh | bash

# Reload your shell configuration
source ~/.bashrc

# Or if you use zsh
source ~/.zshrc
```

#### Step 2: Verify NVM installation

```bash
nvm --version
```

#### Step 3: Install Node.js

```bash
# Install the latest LTS version
nvm install --lts

# Or install a specific version
nvm install 20

# Use the installed version
nvm use --lts
```

#### Step 4: Verify Node.js installation

```bash
node --version
npm --version
```

---

### 🍎 macOS

#### Step 1: Install NVM

```bash
# Download and install NVM
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.40.1/install.sh | bash

# Reload your shell configuration
# For bash:
source ~/.bash_profile

# For zsh (default on newer macOS):
source ~/.zshrc
```

#### Step 2: Verify NVM installation

```bash
nvm --version
```

#### Step 3: Install Node.js

```bash
# Install the latest LTS version
nvm install --lts

# Use the installed version
nvm use --lts
```

#### Step 4: Verify Node.js installation

```bash
node --version
npm --version
```

---

### 🪟 Windows

There are two options for Windows:

#### Option A: NVM for Windows (Recommended)

1. **Download the installer**
   - Go to [nvm-windows releases](https://github.com/coreybutler/nvm-windows/releases)
   - Download `nvm-setup.exe` from the latest release

2. **Run the installer**
   - Run `nvm-setup.exe` as Administrator
   - Follow the installation wizard

3. **Open a new PowerShell or Command Prompt** (as Administrator)

4. **Install Node.js**
   ```powershell
   # List available versions
   nvm list available
   
   # Install the latest LTS version
   nvm install lts
   
   # Use the installed version
   nvm use lts
   ```

5. **Verify installation**
   ```powershell
   node --version
   npm --version
   ```

#### Option B: Using WSL (Windows Subsystem for Linux)

If you prefer a Unix-like environment:

1. **Install WSL**
   ```powershell
   wsl --install
   ```

2. **Restart your computer**

3. **Open Ubuntu from the Start menu and follow the Linux instructions above**

---

## 🛠️ Project Setup

### Step 1: Clone or Download the Project

```bash
# If using git
git clone <repository-url>
cd dashboard

# Or navigate to the project folder
cd path/to/dashboard
```

### Step 2: Install Dependencies

```bash
npm install
```

### Step 3: Start the Development Server

```bash
npm run dev
```

### Step 4: Open in Browser

Open your browser and navigate to:
```
http://localhost:5173
```

---

## 📖 Understanding the Code

### Key Concepts

#### 1. Components
React applications are built with reusable components. See `src/components/` for examples:
- **UI Components** (`src/components/ui/`): Basic building blocks like `Button`, `Card`, `Badge`
- **Shared Components** (`src/components/shared/`): Reusable business components like `StatCard`, `DataList`, `BarChart`
- **Page Components** (`src/pages/`): Full page layouts that compose multiple components

#### 2. Props
Components receive data through props. Example from `StatCard`:

```tsx
interface StatCardProps {
  title: string
  value: string
  change: string
  trend: "up" | "down"
}

export function StatCard({ title, value, change, trend }: StatCardProps) {
  // Component uses these props to render
}
```

#### 3. Routing
React Router handles navigation. See `src/App.tsx`:

```tsx
<Routes>
  <Route path="/" element={<Layout />}>
    <Route index element={<DashboardPage />} />
    <Route path="analytics" element={<AnalyticsPage />} />
    {/* ... more routes */}
  </Route>
</Routes>
```

#### 4. Data Flow
Data is defined in `src/data/dashboard-data.ts` and imported into page components:

```tsx
import { overviewStats } from "@/data/dashboard-data"

// Used in component
{overviewStats.map((stat) => (
  <StatCard key={stat.id} {...stat} />
))}
```

---

## 🎨 Styling with Tailwind CSS

This project uses Tailwind CSS for styling. Key concepts:

- **Utility classes**: `className="flex items-center gap-4 p-6"`
- **Responsive design**: `className="grid md:grid-cols-2 lg:grid-cols-4"`
- **CSS Variables**: Theme colors defined in `src/index.css`

---

## 📁 Available Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server |
| `npm run build` | Build for production |
| `npm run preview` | Preview production build |
| `npm run lint` | Run ESLint |

---

## 🧩 Project Features

1. **Dashboard** - Overview with stats cards, charts, and activity feed
2. **Analytics** - Traffic sources pie chart, visitor line chart, page views table
3. **Users** - User management with role badges and status indicators
4. **Products** - Product inventory with sales charts
5. **Settings** - Configuration options grouped by category

---

## 📚 Further Learning

- [React Documentation](https://react.dev/)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [React Router Documentation](https://reactrouter.com/)
- [Recharts Documentation](https://recharts.org/)

---

## 🤝 Tips for Backend Developers

1. **Think in Components**: Break UI into small, reusable pieces
2. **Props are like Function Parameters**: Pass data down through the component tree
3. **State is like Instance Variables**: Local data that can change over time
4. **JSX is like HTML Templates**: But with JavaScript expressions
5. **Hooks are like Lifecycle Methods**: `useEffect`, `useState`, etc.

---

## 📝 License

This project is open source and available for learning purposes.
