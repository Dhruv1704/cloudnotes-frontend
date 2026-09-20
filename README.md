# 📝 Cloudnotes - Frontend

[![React](https://img.shields.io/badge/React-18.2.0-61DAFB?style=for-the-badge&logo=react&logoColor=black)](https://reactjs.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.3.3-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
[![React Router](https://img.shields.io/badge/React_Router-v6-CA4245?style=for-the-badge&logo=react-router&logoColor=white)](https://reactrouter.com/)
[![PWA](https://img.shields.io/badge/PWA-Ready-5A0FC8?style=for-the-badge&logo=pwa&logoColor=white)](https://web.dev/progressive-web-apps/)
[![Firebase](https://img.shields.io/badge/Firebase-Hosting-FFCA28?style=for-the-badge&logo=firebase&logoColor=black)](https://firebase.google.com/)

A modern, responsive, and feature-rich cloud note-taking Progressive Web Application (PWA). Cloudnotes provides a seamless experience for organizing your ideas with interactive color-coded cards, real-time client-side search, secure cookie-based authentication, and offline capability.

---

## 📑 Table of Contents

- [Overview](#-overview)
- [Key Features](#-key-features)
- [Tech Stack](#-tech-stack)
- [Project Architecture & Structure](#-project-architecture--structure)
- [Environment Variables](#-environment-variables)
- [Getting Started](#-getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
  - [Running the Development Server](#running-the-development-server)
  - [Building for Production](#building-for-production)
- [Backend API Integration](#-backend-api-integration)
- [PWA & Offline Support](#-pwa--offline-support)
- [Available Scripts](#-available-scripts)
- [Deployment](#-deployment)

---

## 🌟 Overview

**Cloudnotes Frontend** is a single-page React application built with Tailwind CSS and React Router. It communicates with a separate RESTful backend service for note persistence and user authentication.

Whether you are on a desktop or mobile device, Cloudnotes adapts seamlessly to your screen, allowing you to create, edit, organize, and search your personal notes effortlessly.

---

## ✨ Key Features

### 🔐 Authentication & Security
- **User Registration & Login:** Clean modal and page interfaces for user sign-up and authentication with real-time field validation.
- **Password Visibility Toggle:** Interactive show/hide password toggle for enhanced usability.
- **Secure Token Management:** Utilizes `react-cookie` to store and manage authentication tokens (`web-token`) with security flags.
- **Protected Routes & Redirects:** Automatic redirection to login if unauthenticated, and redirection to the notes dashboard when authenticated.

### 🎨 Note Management (CRUD)
- **Interactive Color Palette:** Floating expandable color picker supporting customizable note card themes (`#71ffaf`, `#ffc972`, `#ff9b74`, `#b692fe`, `#00d4ff`, `#e6ee92`).
- **Create Notes:** Add notes with title (min 3 chars), description (min 5 chars), and custom category tags.
- **Edit Notes:** In-place modal editing with form pre-filling and click-away dismissal.
- **Delete Confirmation:** Modal prompt confirming deletion to prevent accidental data loss.
- **Reverse Chronological Display:** Automatically sorts notes so your latest thoughts appear first.

### 🔍 Real-Time Search & Dynamic Navigation
- **Instant Search:** Dynamic client-side search filtering across titles, descriptions, and tags with zero latency.
- **Smart Sticky Search Bar:** Automatically detects scroll direction—tucks away on scroll down and slides back into view when scrolling up.
- **Responsive Layout:** Fixed desktop sidebar navigation with smooth logout triggers, transitioning to a streamlined top navbar on mobile viewports.

### 📶 Offline-First & Progressive Web App (PWA)
- **Service Worker Integration:** Offline caching and faster load times powered by Workbox.
- **Local Storage Caching:** Notes are saved to `localStorage` to allow offline read-access.
- **Connectivity Awareness:** Detects network status (`navigator.onLine`) and displays warning toasts if attempting mutations while offline.

### 💬 Polish & User Experience (UX)
- **Top Loading Progress Bar:** Visual indicator (`react-top-loading-bar`) giving immediate feedback during network requests.
- **Toast Notifications:** Alert toasts (`react-toastify`) for successful operations and clear error messaging.
- **Click-Away Modals:** Accessible dialog handling via `@uidotdev/usehooks` `useClickAway`.

---

## 🛠️ Tech Stack

| Category | Technology | Description |
|---|---|---|
| **Core Framework** | [React 18](https://react.dev/) | Component-based UI library (Hooks & Context API) |
| **Routing** | [React Router v6](https://reactrouter.com/) | Client-side routing (`BrowserRouter`, `Routes`, `Route`) |
| **Styling** | [Tailwind CSS v3](https://tailwindcss.com/) | Utility-first CSS framework for responsive design |
| **State Management** | React Context API | Centralized note and UI state management (`NoteState`) |
| **HTTP & API** | Fetch API | Native asynchronous requests to the backend server |
| **Authentication/Cookies** | [react-cookie](https://www.npmjs.com/package/react-cookie) | Cookie management for authentication tokens |
| **Icons** | [Font Awesome](https://fontawesome.com/) | Scalable vector icons for actions, controls, and UI buttons |
| **Progress & Notifications** | [react-top-loading-bar](https://www.npmjs.com/package/react-top-loading-bar), [react-toastify](https://www.npmjs.com/package/react-toastify) | Smooth top progress feedback and toast popups |
| **Utility Hooks** | [@uidotdev/usehooks](https://usehooks.com/) | Clean `useClickAway` hook for modal dismissal |
| **PWA** | Service Worker & Web App Manifest | Installable web app with standalone mode |
| **Hosting Config** | [Firebase Hosting](https://firebase.google.com/docs/hosting) | Single-page application rewrite configurations |

---

## 📁 Project Architecture & Structure

```text
cloudnotes-frontend/
├── public/
│   ├── favicon.ico              # Browser favicon
│   ├── index.html               # Main HTML entry point
│   ├── manifest.json            # PWA Web App Manifest
│   ├── maskable.png             # Adaptive maskable PWA icon
│   └── logo*.png                # Multi-resolution application icons
├── src/
│   ├── Components/
│   │   ├── AddButton.js         # Floating expandable action button for adding notes
│   │   ├── AddNote.js           # Modal dialog for creating a note
│   │   ├── DeleteNote.js        # Confirmation modal dialog for deleting a note
│   │   ├── EditNote.js          # Modal dialog for updating existing notes
│   │   ├── LogIn.js             # User login page & authentication form
│   │   ├── Navbar.js            # Mobile navigation bar with logout button
│   │   ├── NoteCard.js          # Individual note card with actions and styling
│   │   ├── Notes.js             # Main dashboard rendering notes grid & search
│   │   ├── SideBar.js           # Desktop fixed sidebar navigation
│   │   └── SignUp.js            # User registration modal
│   ├── context/
│   │   └── notes/
│   │       ├── NoteState.js     # Context provider managing CRUD and auth state
│   │       └── noteContext.js   # React context definition
│   ├── App.css                  # Custom animations, buttons, and scrollbar styles
│   ├── App.js                   # Application route definitions & providers
│   ├── index.css                # Tailwind directives and base typography
│   ├── index.js                 # React DOM mount point & Service Worker registration
│   ├── service-worker.js        # PWA caching strategy and lifecycle
│   └── serviceWorkerRegistration.js # Service worker registration helper
├── .env                         # Environment variables (Backend host URL)
├── firebase.json                # Firebase hosting rewrite configuration
├── package.json                 # Project dependencies and npm scripts
└── tailwind.config.js           # Tailwind CSS configuration
```

---

## ⚙️ Environment Variables

Create a `.env` file in the root directory of the frontend project:

| Variable | Required | Description | Example |
|---|---|---|---|
| `REACT_APP_HOST` | **Yes** | Base URL pointing to the running backend API service | `http://localhost:5000` (local) or `https://your-backend.com` (production) |

> [!NOTE]
> Create React App requires custom environment variables to be prefixed with `REACT_APP_`. After modifying `.env`, restart your local development server.

---

## 🚀 Getting Started

### Prerequisites

- **Node.js**: v16.x or later (v18.x recommended)
- **npm**: v8.x or later (comes bundled with Node.js)
- A running instance of the **Cloudnotes Backend** service (or the production backend URL).

### Installation

1. Navigate to the frontend directory:
   ```bash
   cd frontend
   ```

2. Install the dependencies:
   ```bash
   npm install
   ```

3. Set up your `.env` file:
   ```bash
   # On Windows (PowerShell)
   Copy-Item .env.example .env   # if example exists, or create .env directly
   ```
   Ensure `REACT_APP_HOST` points to your backend URL.

### Running the Development Server

Start the React development server:

```bash
npm start
```

Open [http://localhost:3000](http://localhost:3000) in your browser to view the application. The page automatically reloads when edits are saved.

### Building for Production

Compile an optimized production build:

```bash
npm run build
```

This creates a `build/` directory containing minified, production-ready bundles with hashed filenames.

---

## 🔌 Backend API Integration

The frontend expects the backend server specified in `REACT_APP_HOST` to expose the following endpoints:

| Method | Endpoint | Description | Auth Header Required | Request Body |
|---|---|---|---|---|
| `POST` | `/api/authen/createuser` | Register a new user | No | `{ name, email, password }` |
| `POST` | `/api/authen/login` | Authenticate existing user | No | `{ email, password }` |
| `GET` | `/api/note/fetchNotes` | Fetch all user notes | `web-token: <jwt_token>` | None |
| `POST` | `/api/note/addNote` | Create a new note | `web-token: <jwt_token>` | `{ title, description, tag, color }` |
| `PUT` | `/api/note/updateNote/:id` | Update an existing note | `web-token: <jwt_token>` | `{ title, description, tag, color }` |
| `DELETE` | `/api/note/deleteNote/:id` | Delete a note by ID | `web-token: <jwt_token>` | None |

> [!IMPORTANT]
> All authenticated requests send the `web-token` header containing the JWT received upon login/sign-up.

---

## 📱 PWA & Offline Support

Cloudnotes is configured as an installable **Progressive Web App**:
- **Installable:** Users can install the app on mobile (Android/iOS) or desktop (Chrome/Edge) to run in standalone window mode.
- **Offline Notes Access:** Notes fetched while online are mirrored to `localStorage`. If the user loses connectivity, existing notes remain readable.
- **Service Worker:** Enabled by default in production builds through `serviceWorkerRegistration.register()`.

---

## 📜 Available Scripts

In the project directory, you can run:

- `npm start` – Starts the development server at [http://localhost:3000](http://localhost:3000).
- `npm run build` – Bundles the app for production in the `build/` directory.
- `npm test` – Launches the test runner in interactive watch mode.
- `npm run eject` – Ejects Create React App configuration (one-way operation).
- `npm run both` – Uses `concurrently` to launch both frontend and local backend concurrently (if co-located).

---

## 🚢 Deployment

### Firebase Hosting

The project is pre-configured with `firebase.json` for single-page application rewrites:

1. Install the Firebase CLI if you haven't already:
   ```bash
   npm install -g firebase-tools
   ```
2. Log in to Firebase:
   ```bash
   firebase login
   ```
3. Build the frontend:
   ```bash
   npm run build
   ```
4. Deploy:
   ```bash
   firebase deploy --only hosting
   ```

### Vercel / Netlify

When deploying to Vercel or Netlify, configure the build settings as follows:
- **Build Command:** `npm run build`
- **Output Directory:** `build`
- **Environment Variables:** Set `REACT_APP_HOST` to your production backend URL.
- **SPA Rewrite Rule:** Route all requests (`/*`) to `/index.html` to allow React Router to handle page routing.
