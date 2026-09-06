# AI Prompts Used

## Project Planning

Prompt:
"Read my Readme.md and start building my app. This is a React task management dashboard called TaskFlow."

AI analyzed the full 668-line specification, created a structured todo list, and began incremental development following the spec's recommended build order.

## Project Setup

Prompt:
Implicit from the initial request — AI scaffolded Vite + React, installed lucide-react, and created the full directory structure.

## Component Development

Prompt:
Implicit from the incremental build plan — AI generated all component files across Layout/, Dashboard/, Tasks/, and UI/ directories in parallel batches.

Key components generated:
- Button, Modal, EmptyState (UI primitives)
- Sidebar, Header, Layout (layout system)
- StatCard, TaskSummary (dashboard)
- TaskCard, TaskForm, TaskList, TaskFilters, TaskSearch, DeleteConfirmation (task management)

## State Management & Wiring

Prompt:
Implicit — AI created the useLocalStorage hook, dateUtils, and wired all state management into App.jsx with useState, useMemo, and useCallback.

## Testing Setup

Prompt:
Implicit — AI installed vitest, @testing-library/react, and @testing-library/jest-dom, then created test files for TaskForm, TaskCard, TaskFilters, TaskSearch, DeleteConfirmation, and StatCard.

## Debugging — Lint Warnings

Problem:
oxlint reported "set-state-in-effect" warnings for Toast.jsx and TaskForm.jsx.

AI suggestion:
Refactor Toast to initialize visible state to true instead of setting it in useEffect. Refactor TaskForm to initialize state from props directly and use a key prop for remounting.

My final solution:
Applied both fixes. Toast now starts visible. TaskForm uses `key={editingTask?.id || 'new'}` to force remount. Both lint warnings resolved.

## Debugging — Test Failure

Problem:
DeleteConfirmation test failed — text matcher `/task to delete/` couldn't match because the task name was wrapped in `<strong>` elements.

AI suggestion:
Use a more specific text matcher.

My final solution:
Changed regex to `/Task to Delete/` which matches the text content within the strong element. Test passed.

## Refactoring

Prompt:
Implicit — AI reviewed lint output and proactively fixed the two state-in-effect warnings without being asked.

AI suggestion:
Remove useEffect from Toast.jsx (initialize visible to true), remove useEffect from TaskForm.jsx (initialize state from props + key prop).

My changes:
Applied both. Zero lint warnings, all tests still passing.

## Responsive Design

Prompt:
Implicit — AI generated all CSS with media queries for desktop, tablet (768px), and mobile (480px) breakpoints.

Key responsive decisions:
- Sidebar collapses with slide-in animation on mobile
- Stats grid goes from 4-col → 2-col → 1-col
- Task grid goes from multi-col → single-col
- Header search hides on very small screens
- Action buttons always visible on mobile (no hover dependency)
