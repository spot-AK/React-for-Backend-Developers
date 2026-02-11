# Prerequisites

This document covers everything you need — both **tools to install** and **knowledge to have** — before working on this project.

---

## 🛠️ Technical Prerequisites

### 1. Node.js (Required)

Node.js is the JavaScript runtime that powers the development server and build tools.

- **Recommended version**: LTS (v20 or later)
- **Includes**: npm (Node Package Manager)

#### Installation (Windows)

**Option A: NVM for Windows (Recommended)**

1. Download `nvm-setup.exe` from the [nvm-windows releases](https://github.com/coreybutler/nvm-windows/releases)
2. Run the installer as **Administrator**
3. Open a **new PowerShell** (as Administrator) and run:

```powershell
nvm install lts
nvm use lts
```

4. Verify installation:

```powershell
node --version
npm --version
```

**Option B: Using WSL (Windows Subsystem for Linux)**

1. Install WSL:

```powershell
wsl --install
```

2. Restart your computer
3. Open Ubuntu from the Start menu and follow the Linux instructions below

#### Installation (macOS)

```bash
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.40.1/install.sh | bash
source ~/.zshrc
nvm install --lts
nvm use --lts
```

#### Installation (Linux / Ubuntu)

```bash
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.40.1/install.sh | bash
source ~/.bashrc
nvm install --lts
nvm use --lts
```

---

### 2. Code Editor (Recommended)

- **VS Code** — [Download here](https://code.visualstudio.com/)
- Recommended extensions:
  - **ESLint** — Catches code issues
  - **Tailwind CSS IntelliSense** — Autocomplete for Tailwind classes
  - **Prettier** — Code formatting
  - **TypeScript Importer** — Auto-import suggestions

---

### 3. Git (Optional but Recommended)

Used for version control and cloning the repository.

- **Windows**: [Download Git for Windows](https://git-scm.com/download/win)
- **macOS**: `xcode-select --install` or `brew install git`
- **Linux**: `sudo apt install git`

---

### 4. Browser

Any modern browser works. **Google Chrome** or **Microsoft Edge** is recommended for their developer tools (F12).

---

## 📚 Knowledge Prerequisites

### 🟢 Essential (Must Know)

#### HTML & CSS Basics

You should be comfortable with:

- HTML tags (`div`, `span`, `h1`, `p`, `button`, `input`, `img`)
- CSS concepts: colors, padding, margin, flexbox, grid
- How classes and IDs work

> **Why?** React's JSX looks almost identical to HTML, and Tailwind CSS uses utility classes for styling.

#### JavaScript Fundamentals

You should understand:

- Variables (`const`, `let`)
- Data types (string, number, boolean, array, object)
- Functions and arrow functions (`() => {}`)
- Array methods (`map()`, `filter()`, `find()`)
- Object destructuring (`const { name, age } = person`)
- Template literals (`` `Hello ${name}` ``)
- `import` / `export` (ES Modules)
- `async` / `await` and Promises
- Ternary operator (`condition ? valueA : valueB`)

> **Why?** JavaScript is the foundation of React. Every component is a JavaScript function.

#### Basic TypeScript

You should know:

- Type annotations (`const name: string = "John"`)
- Interfaces and types (`interface User { name: string; age: number }`)
- Generic types (basic understanding of `Array<string>`, `Promise<Data>`)
- Union types (`"up" | "down"`)

> **Why?** The entire project is written in TypeScript for type safety and better developer experience.

---

### 🟡 Helpful (Good to Know)

#### React Basics

- What components are (functions that return JSX)
- Props — passing data to components
- State — local data that changes over time (`useState`)
- JSX — writing HTML-like syntax inside JavaScript
- Event handling (`onClick`, `onChange`)

> **Example from this project:**

```tsx
interface StatCardProps {
  title: string;
  value: string;
  change: string;
  trend: "up" | "down";
}

export function StatCard({ title, value, change, trend }: StatCardProps) {
  return (
    <div>
      <h3>{title}</h3>
      <p>{value}</p>
    </div>
  );
}
```

#### Component-Based Architecture

- Breaking UI into small, reusable pieces
- Composing complex UIs from simple building blocks
- Parent-child relationships between components

> **Analogy for backend developers:** Components are like classes — each has a single responsibility, receives inputs (props), and produces output (rendered UI).

#### Package Managers (npm)

- What `package.json` is (like `pom.xml`, `requirements.txt`, or `go.mod`)
- `npm install` — install dependencies
- `npm run dev` — run scripts defined in `package.json`
- What `node_modules` is (where dependencies are stored)

---

### 🔵 Can Learn Along the Way

#### React Router

Handles navigation between pages without full page reloads.

```tsx
<Routes>
  <Route path="/" element={<Layout />}>
    <Route index element={<DashboardPage />} />
    <Route path="analytics" element={<AnalyticsPage />} />
  </Route>
</Routes>
```

> **Analogy:** Like backend routing (`/api/users` → `UsersController`), but for UI pages.

#### Tailwind CSS

A utility-first CSS framework — you style elements by adding class names directly.

```tsx
<div className="flex items-center gap-4 p-6 bg-white rounded-lg shadow">
  <h2 className="text-xl font-bold text-gray-900">Dashboard</h2>
</div>
```

| Class | What it does |
|---|---|
| `flex` | Display as flexbox |
| `items-center` | Vertically center items |
| `gap-4` | Space between items |
| `p-6` | Padding on all sides |
| `bg-white` | White background |
| `rounded-lg` | Rounded corners |
| `text-xl` | Larger text size |
| `font-bold` | Bold text |

#### Recharts

A charting library for React — you pass data as props and it renders charts.

```tsx
<BarChart data={salesData}>
  <Bar dataKey="revenue" fill="#3b82f6" />
</BarChart>
```

#### Fetch API

Used to make HTTP requests to backend APIs.

```tsx
const response = await fetch("https://api.example.com/data");
const data = await response.json();
```

---

## 🧠 Concepts Map (Backend → Frontend)

| Backend Concept | Frontend Equivalent |
|---|---|
| Class / Module | Component |
| Constructor parameters | Props |
| Instance variables | State (`useState`) |
| Method calls | Event handlers (`onClick`) |
| Templates (Thymeleaf, Jinja, Blade) | JSX |
| Routes / Controllers | React Router |
| Dependency injection | Context API / Props |
| Unit tests | Component tests (React Testing Library) |
| `pom.xml` / `requirements.txt` | `package.json` |
| Build tool (Maven, Gradle) | Vite |

---

## 📖 Recommended Learning Resources

| Resource | Link |
|---|---|
| React Official Tutorial | [https://react.dev/learn](https://react.dev/learn) |
| TypeScript Handbook | [https://www.typescriptlang.org/docs/](https://www.typescriptlang.org/docs/) |
| Tailwind CSS Docs | [https://tailwindcss.com/docs](https://tailwindcss.com/docs) |
| JavaScript.info | [https://javascript.info/](https://javascript.info/) |
| React Router Docs | [https://reactrouter.com/](https://reactrouter.com/) |
| Recharts Docs | [https://recharts.org/](https://recharts.org/) |

---

## ✅ Checklist Before You Start

- [ ] Node.js installed (`node --version` shows v20+)
- [ ] npm available (`npm --version`)
- [ ] Code editor installed (VS Code recommended)
- [ ] Comfortable with HTML, CSS, and JavaScript basics
- [ ] Basic understanding of TypeScript syntax
- [ ] Ran `npm install` successfully
- [ ] Ran `npm run dev` and opened `http://localhost:5173`
