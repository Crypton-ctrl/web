# Full-Stack React & Web Development Lab Suite (Experiments 1 – 12)

An interactive, production-ready React application built with **React 19**, **Vite 8**, **Tailwind CSS v4**, **React Router v7**, **Zustand**, **Axios**, and **Vitest / React Testing Library**.

---

## 🚀 Quick Start

### 1. Run Development Server
```bash
npm run dev
```
Navigate to `http://localhost:5173`.

### 2. Run Test Suite (Experiment 9)
```bash
npm test
```
Runs 16 unit and integration tests across 5 test suites with Vitest and React Testing Library.

### 3. Build for Production (Experiments 10 & 12)
```bash
npm run build
```

---

## 📚 Experiments Implemented

- **Experiment 1**: Hotel Booking Application Using React Hooks (`useState`, `useEffect`, `useRef`, `useMemo`, `useCallback`, Props, Reusable Components)
- **Experiment 2**: Hotel Search and Reservation Management Using Custom Hooks (`useHotels`, `useBooking`) and Context API (`BookingContext`, Local Storage Sync)
- **Experiment 3**: Hotel Booking Navigation Using React Router (Dynamic Routing `/hotel/:id`, Nested Routing `/booking/*` with `Outlet`, `useParams`, `useNavigate`)
- **Experiment 4**: Protected Restaurant Reservation Routes with Authentication and Error Handling (`ProtectedRoute`, `AuthContext`, Form Validation, `ErrorBoundary`)
- **Experiment 5**: Restaurant Reservation Application using REST APIs (Axios, Async Data, Location and Cuisine Filtering)
- **Experiment 6**: Restaurant Reservation State Management (Zustand Global Store, Custom Logger Middleware, Local Storage Persistence)
- **Experiment 7**: Restaurant Reservation CRUD Operations (GET, POST, PUT/PATCH, DELETE, Reservation History)
- **Experiment 8**: Secure Restaurant Reservation using Authentication (Token Management, Axios Bearer Interceptor, 401 Unauthorized handling)
- **Experiment 9**: Test Restaurant Reservation Components (Jest / Vitest, React Testing Library - 16 Tests Passed)
- **Experiment 10**: Optimize Restaurant Reservation Application (Performance, Lazy Loading, Code Splitting, PWA Manifest & Service Worker, Accessibility, XSS Security)
- **Experiment 12**: Deploy Restaurant Reservation Application (Netlify `netlify.toml`, Vercel `vercel.json`, GitHub Pages `404.html`, Platform Comparison)

---

## 🛠️ Tech Stack
- **Framework**: React 19 + Vite 8
- **Styling**: Tailwind CSS v4
- **Routing**: React Router v7
- **State Management**: Zustand v5 (with custom logger middleware & persistence)
- **HTTP Client**: Axios with Bearer token request and 401 response interceptors
- **Testing**: Vitest + React Testing Library + @testing-library/jest-dom
- **Icons**: Lucide React
- **PWA**: Web App Manifest (`manifest.json`) + Service Worker (`sw.js`)
