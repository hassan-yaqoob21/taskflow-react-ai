# TaskFlow — AI-Assisted Task Management Dashboard

A modern, responsive task management web application built with React. TaskFlow allows users to manage tasks through a clean dashboard interface with full CRUD operations, search, filtering, and localStorage persistence.

## Features

- **Dashboard** with statistics cards (total, completed, pending, high priority) and progress bar
- **Task Management** — create, edit, delete, and mark tasks as completed
- **Task Form** with validation (title required, 3+ characters, due date required)
- **Search** by title, description, or category with instant results
- **Filters** — All, Active, Completed, High Priority (works with search)
- **Delete Confirmation** dialog before permanent removal
- **Toast Notifications** for user feedback on all actions
- **localStorage Persistence** — tasks survive page refreshes
- **Responsive Design** — works on desktop, tablet, and mobile
- **Accessibility** — semantic HTML, ARIA labels, keyboard navigation, focus states

## Technology Stack

- React 19
- Vite
- JavaScript (ES6+)
- CSS (custom, no UI framework)
- Lucide React (icons)
- Vitest + Testing Library (testing)

## Installation

```bash
npm install
```

## How to Run

```bash
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

## Available Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server |
| `npm run build` | Production build |
| `npm run preview` | Preview production build |
| `npm test` | Run tests |
| `npm run test:watch` | Run tests in watch mode |
| `npm run lint` | Run linter |

## Project Structure

```
src/
├── components/
│   ├── Layout/
│   │   ├── Sidebar.jsx        — Navigation sidebar
│   │   ├── Header.jsx         — Top bar with search and add button
│   │   └── Layout.jsx         — Page layout wrapper
│   │
│   ├── Dashboard/
│   │   ├── StatCard.jsx       — Statistics card
│   │   └── TaskSummary.jsx    — Progress bar
│   │
│   ├── Tasks/
│   │   ├── TaskList.jsx       — Task grid with empty states
│   │   ├── TaskCard.jsx       — Individual task card
│   │   ├── TaskForm.jsx       — Add/edit form with validation
│   │   ├── TaskFilters.jsx    — Filter buttons
│   │   ├── TaskSearch.jsx     — Search input
│   │   └── DeleteConfirmation.jsx — Delete dialog
│   │
│   └── UI/
│       ├── Button.jsx         — Reusable button
│       ├── Modal.jsx          — Accessible modal dialog
│       ├── EmptyState.jsx     — Empty state display
│       └── Toast.jsx          — Toast notifications
│
├── data/
│   └── initialTasks.js        — 8 sample tasks
│
├── hooks/
│   └── useLocalStorage.js     — localStorage persistence hook
│
├── utils/
│   └── dateUtils.js           — Date formatting helpers
│
├── __tests__/                 — Component tests
├── App.jsx                    — Main application
├── main.jsx                   — Entry point
└── index.css                  — Global styles
```

## AI-Assisted Development

This project was developed with AI as a coding assistant. The AI helped with:

- Project scaffolding and setup
- Component generation and architecture
- State management design
- CSS styling and responsive breakpoints
- Test generation
- Debugging and lint fixes

The AI followed an incremental build approach — analyzing the specification first, then building components in logical groups (primitives → layout → dashboard → tasks → wiring → styling → testing).

## Manual Improvements

Three meaningful improvements were made beyond the initial AI-generated code:

### 1. Lint Warning Resolution

AI initially used `useEffect` to set state in Toast.jsx and TaskForm.jsx, triggering "set-state-in-effect" lint warnings. Manually refactored:
- Toast now initializes `visible` state to `true` directly
- TaskForm initializes state from props and uses a `key` prop for remounting

### 2. Toast Notification System

Added a Toast notification component that wasn't in the original AI output. Provides lightweight feedback for task creation, updates, deletion, and completion without blocking the UI.

### 3. Test Failure Fix

The DeleteConfirmation test failed because a regex matcher couldn't match text split across `<strong>` elements. Manually adjusted the matcher to target the correct text node.

## Testing

Run all tests:

```bash
npm test
```

Tests cover:
- TaskForm validation (empty title, short title, missing due date, valid submission, edit pre-population)
- TaskCard rendering and action buttons
- TaskFilters rendering and click behavior
- TaskSearch input and clear functionality
- DeleteConfirmation dialog actions
- StatCard rendering

**21 tests, all passing.**

## Screenshots

> Add screenshots here after running the application.

## Lessons Learned

- Incremental development prevents overwhelming complexity
- Linting early catches patterns that become harder to fix later
- Testing library text matchers need care when text is split across JSX elements
- Initializing state from props via `useEffect` is often better handled by component keying
- localStorage error handling prevents crashes from malformed data
