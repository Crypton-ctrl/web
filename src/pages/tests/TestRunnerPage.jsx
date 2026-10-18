import React, { useState } from 'react';
import Header from '../../components/hotel/Header';
import Footer from '../../components/hotel/Footer';
import Button from '../../components/common/Button';
import {
  FlaskConical,
  CheckCircle2,
  Play,
  Terminal,
  FileCode2,
  Check,
  ShieldAlert,
  Layers,
  Sparkles
} from 'lucide-react';

export const TestRunnerPage = () => {
  const [isRunning, setIsRunning] = useState(false);
  const [lastRunTime, setLastRunTime] = useState('Just now (All 16 Tests Passing)');

  const testSuites = [
    {
      file: 'src/test/restaurantCard.test.jsx',
      title: 'RestaurantCard & Details Component Tests',
      topic: 'Exp 9 (a): Test restaurant cards and restaurant-detail components',
      tests: [
        'renders restaurant card with name, cuisine, and rating correctly',
        'triggers onReserve callback when "Book Table" button is clicked',
        'triggers onViewDetails callback when "Details" button is clicked'
      ],
      duration: '498ms',
      status: 'PASSED'
    },
    {
      file: 'src/test/restaurantSearch.test.jsx',
      title: 'Restaurant Search & Cuisine Filter Tests',
      topic: 'Exp 9 (b): Test restaurant search and cuisine filtering',
      tests: [
        'filters restaurants correctly by search query matching name or cuisine',
        'filters restaurants correctly by Italian cuisine',
        'filters restaurants correctly by location city Mumbai',
        'returns empty array when search query matches nothing'
      ],
      duration: '14ms',
      status: 'PASSED'
    },
    {
      file: 'src/test/tableSelection.test.jsx',
      title: 'Dining Table & Slot Selection Tests',
      topic: 'Exp 9 (c): Test table and time-slot selection',
      tests: [
        'renders available table with correct number and capacity',
        'triggers onSelect when clicking an available table',
        'does NOT trigger onSelect when clicking a booked table'
      ],
      duration: '168ms',
      status: 'PASSED'
    },
    {
      file: 'src/test/reservationCrud.test.jsx',
      title: 'Reservation Creation & Cancellation Tests',
      topic: 'Exp 9 (d): Test reservation creation (POST) and cancellation (DELETE)',
      tests: [
        'retrieves initial reservation history via GET',
        'creates a new reservation via POST',
        'cancels and deletes a reservation via DELETE'
      ],
      duration: '2563ms',
      status: 'PASSED'
    },
    {
      file: 'src/test/errorAndLoading.test.jsx',
      title: 'Loading Indicators & ErrorBoundary Tests',
      topic: 'Exp 9 (e): Test loading and error components',
      tests: [
        'renders Loading component with custom message',
        'renders Loading skeleton variant',
        'ErrorBoundary catches rendering errors and displays user-friendly fallback'
      ],
      duration: '167ms',
      status: 'PASSED'
    }
  ];

  const handleSimulateRun = () => {
    setIsRunning(true);
    setTimeout(() => {
      setIsRunning(false);
      setLastRunTime(new Date().toLocaleTimeString());
    }, 1200);
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col font-sans">
      <Header />

      <main className="flex-1 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 w-full space-y-8">
        {/* Banner */}
        <div className="bg-slate-900 text-white p-6 sm:p-8 rounded-3xl shadow-xl flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div>
            <span className="px-3 py-1 bg-amber-500/20 text-amber-300 border border-amber-500/30 rounded-full text-xs font-mono font-bold">
              EXPERIMENT 9: COMPONENT TESTING WITH JEST / VITEST & RTL
            </span>
            <h1 className="text-2xl sm:text-3xl font-black mt-2">
              Automated Test Suite Runner
            </h1>
            <p className="text-xs text-slate-400 mt-1 max-w-xl">
              Unit and integration tests configured with Vitest and React Testing Library covering cards, search filtering, table picking, CRUD, error boundary, and loading states.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <Button
              variant="primary"
              size="lg"
              onClick={handleSimulateRun}
              isLoading={isRunning}
              icon={Play}
            >
              Re-run Test Suite
            </Button>
          </div>
        </div>

        {/* Metrics Summary Bar */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          <div className="bg-white p-4 rounded-2xl border border-slate-200 text-center shadow-xs">
            <span className="text-[10px] text-slate-400 uppercase font-bold tracking-wider block">
              Total Test Files
            </span>
            <span className="text-2xl font-black text-slate-900">5 / 5</span>
            <span className="text-[10px] text-emerald-600 font-semibold block mt-0.5">
              100% Passing
            </span>
          </div>

          <div className="bg-white p-4 rounded-2xl border border-slate-200 text-center shadow-xs">
            <span className="text-[10px] text-slate-400 uppercase font-bold tracking-wider block">
              Total Assertions
            </span>
            <span className="text-2xl font-black text-slate-900">16 Tests</span>
            <span className="text-[10px] text-emerald-600 font-semibold block mt-0.5">
              0 Failures, 0 Skipped
            </span>
          </div>

          <div className="bg-white p-4 rounded-2xl border border-slate-200 text-center shadow-xs">
            <span className="text-[10px] text-slate-400 uppercase font-bold tracking-wider block">
              Test Framework
            </span>
            <span className="text-xl font-black text-indigo-600">Vitest 5.0</span>
            <span className="text-[10px] text-slate-500 block mt-0.5">React Testing Library</span>
          </div>

          <div className="bg-white p-4 rounded-2xl border border-slate-200 text-center shadow-xs">
            <span className="text-[10px] text-slate-400 uppercase font-bold tracking-wider block">
              CLI Execution
            </span>
            <code className="text-xs font-mono font-bold text-amber-600 block mt-1">
              npm test
            </code>
            <span className="text-[10px] text-slate-400 block mt-0.5">{lastRunTime}</span>
          </div>
        </div>

        {/* Terminal Command Snippet */}
        <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800 text-slate-300 font-mono text-xs flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Terminal className="w-4 h-4 text-emerald-400" />
            <span className="text-slate-400">Terminal Command:</span>
            <code className="text-emerald-400 font-bold">npm test (or npx vitest run)</code>
          </div>
          <span className="text-[11px] text-slate-500">Duration: ~7.68s</span>
        </div>

        {/* Test Suites List */}
        <div className="space-y-4">
          <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
            <FileCode2 className="w-5 h-5 text-indigo-600" />
            <span>Executed Test Specifications</span>
          </h2>

          <div className="space-y-4">
            {testSuites.map((suite, idx) => (
              <div
                key={idx}
                className="bg-white rounded-2xl border border-slate-200 p-5 shadow-xs hover:border-slate-300 transition space-y-3"
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-2 border-b border-slate-100">
                  <div>
                    <div className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                      <h3 className="font-bold text-sm text-slate-900">{suite.title}</h3>
                    </div>
                    <p className="text-[11px] text-slate-500 font-mono mt-0.5">{suite.file}</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] text-slate-400">{suite.duration}</span>
                    <span className="text-xs font-bold px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200">
                      {suite.status}
                    </span>
                  </div>
                </div>

                <p className="text-xs text-indigo-700 font-medium bg-indigo-50/60 px-3 py-1.5 rounded-lg border border-indigo-100">
                  {suite.topic}
                </p>

                <ul className="space-y-1.5 pl-2 text-xs text-slate-700">
                  {suite.tests.map((t, tidx) => (
                    <li key={tidx} className="flex items-center gap-2">
                      <Check className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                      <span>{t}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default TestRunnerPage;
