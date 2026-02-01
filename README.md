# React Assignment 

Overview:

This project is a single-page React application built as part of a React Developer Intern assignment.
It demonstrates strong fundamentals in React hooks, state management, component modularity, side effects, and UI synchronization.

The application contains five independent tasks, combined into a single app using a tab-based layout for easy navigation and review.

Tech Stack:

React (Vite)

JavaScript (ES6+)

Tailwind CSS

LocalStorage API

Getting Started (Run Locally)
Prerequisites

Node.js v18 or higher

npm or yarn

Steps
# Clone the repository
git clone <your-github-repo-url>

# Navigate to the project folder
cd react-internship-assignment

# Install dependencies
npm install

# Start the development server
npm run dev


The app will be available at:
>>> http://localhost:5173

Project Structure
src/
├── components/
│   ├── todo/
│   │   ├── TodoApp.jsx
│   │   ├── TodoForm.jsx
│   │   ├── TodoList.jsx
│   │   └── TodoItem.jsx
│   ├── form/
│   │   └── UserForm.jsx
│   ├── progress/
│   │   └── ProgressBar.jsx
│   ├── timer/
│   │   └── CountdownTimer.jsx
│   └── search/
│       └── SearchList.jsx
├── App.jsx
└── main.jsx


The structure follows component modularity and separation of concerns, making each task easy to understand and review independently.

Features & Tasks
✅ Task 1: Todo App

Add, delete, and toggle tasks

Priority support (Low / Medium / High)

Filter tasks (All / Active / Completed)

Persistent storage using localStorage

Derived state for filters and counts

Concepts used:
useState, useEffect, controlled inputs, derived state

✅ Task 2: Form Handling & Validation

Controlled form inputs

Inline validation with error messages

Email validation using Regex

Show / Hide password toggle

Displays submitted data below the form

Clears form after successful submission

Concepts used:
Form state management, validation logic, conditional rendering

✅ Task 3: Dynamic Progress Bar

Multiple numeric inputs (0–100)

Main progress bar based on average of inputs

Individual sub-bars for each input

Automatic clamping of invalid values

Dynamic UI updates

Concepts used:
Array state management, derived calculations, UI synchronization

✅ Task 4: Advanced Countdown Timer

Configurable start time (seconds)

Start, Pause, Resume, Reset controls

Millisecond precision

Prevents multiple timers from running

Persists timer state across page refresh using end timestamps

Displays status (Idle / Running / Paused / Completed)

Concepts used:
useEffect, useRef, time-based calculations, persistence logic

✅ Task 5: Live Search with Highlighting

Case-insensitive search

Real-time filtering

Highlight matching text using Regex

Displays count of matching results

Shows “No matches found” state

Concepts used:
String manipulation, regex, conditional rendering 
 
