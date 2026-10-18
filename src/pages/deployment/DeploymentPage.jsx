import React from 'react';
import Header from '../../components/hotel/Header';
import Footer from '../../components/hotel/Footer';
import {
  UploadCloud,
  CheckCircle2,
  Terminal,
  ExternalLink,
  Layers,
  Sparkles,
  Server,
  Globe,
  GitBranch
} from 'lucide-react';

export const DeploymentPage = () => {
  const comparisonData = [
    {
      feature: 'SPA Route Handling',
      vercel: 'Rewrites via vercel.json ({ "source": "/(.*)", "destination": "/index.html" })',
      netlify: 'Redirects via netlify.toml ([[redirects]] from = "/*" to = "/index.html")',
      ghpages: 'Requires 404.html SPA redirect trick or HashRouter'
    },
    {
      feature: 'Production Build Command',
      vercel: 'npm run build',
      netlify: 'npm run build',
      ghpages: 'npm run build (via gh-pages or GitHub Action)'
    },
    {
      feature: 'Publish / Output Directory',
      vercel: 'dist (auto-detected for Vite)',
      netlify: 'dist (configured in netlify.toml)',
      ghpages: 'dist (pushed to gh-pages branch)'
    },
    {
      feature: 'HTTPS / Free SSL',
      vercel: 'Automatic Let\'s Encrypt SSL',
      netlify: 'Automatic Let\'s Encrypt SSL',
      ghpages: 'Automatic GitHub TLS / SSL'
    },
    {
      feature: 'Continuous Deployment (Git)',
      vercel: 'Zero-config git push triggers instant preview & prod builds',
      netlify: 'Git hook triggers deploy with deploy previews',
      ghpages: 'GitHub Actions workflow or gh-pages CLI script'
    },
    {
      feature: 'Serverless Functions / API',
      vercel: 'Native Edge & Node serverless functions in /api',
      netlify: 'Netlify Functions in netlify/functions',
      ghpages: 'Static only (no native backend serverless runtime)'
    }
  ];

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col font-sans">
      <Header />

      <main className="flex-1 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 w-full space-y-8 animate-fadeIn">
        {/* Banner */}
        <div className="bg-slate-900 text-white p-6 sm:p-8 rounded-3xl shadow-xl flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div>
            <span className="px-3 py-1 bg-violet-500/20 text-violet-300 border border-violet-500/30 rounded-full text-xs font-mono font-bold">
              EXPERIMENT 12: DEPLOYMENT PLATFORMS
            </span>
            <h1 className="text-2xl sm:text-3xl font-black mt-2">
              Production Build & Multi-Cloud Deployment Guide
            </h1>
            <p className="text-xs text-slate-400 mt-1 max-w-xl">
              Step-by-step procedures, build outputs, configuration files, and comparative evaluation for Vercel, Netlify, and GitHub Pages.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-xs font-mono font-bold px-3 py-1.5 rounded-xl bg-violet-950 text-violet-300 border border-violet-800">
              Build: dist/index.html
            </span>
          </div>
        </div>

        {/* Step 1: Production Build */}
        <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-xs space-y-4">
          <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
            <Terminal className="w-5 h-5 text-indigo-600" />
            <span>Step A: Generate the Production Build</span>
          </h2>
          <p className="text-xs text-slate-600">
            Run the optimized Vite production compiler. Assets will be bundled, minified, gzipped, and output to the <code className="font-mono bg-slate-100 px-1 py-0.5 rounded text-indigo-600">dist/</code> directory.
          </p>

          <div className="bg-slate-950 p-4 rounded-2xl text-xs font-mono text-emerald-400 flex items-center justify-between">
            <code>npm run build</code>
            <span className="text-slate-400 text-[11px]">✓ Built in ~690ms</span>
          </div>
        </div>

        {/* Step 2: Deployment Guides for Vercel, Netlify, GitHub Pages */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Vercel */}
          <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-xs flex flex-col justify-between space-y-4">
            <div className="space-y-3">
              <div className="w-10 h-10 rounded-2xl bg-black text-white flex items-center justify-center font-bold text-lg">
                ▲
              </div>
              <h3 className="font-bold text-base text-slate-900">1. Deploy on Vercel</h3>
              <p className="text-xs text-slate-500 leading-relaxed">
                Recommended for highest performance Edge CDN, automatic routing rewrites, and instant zero-config Git deploys.
              </p>

              <div className="bg-slate-900 p-3 rounded-xl text-[11px] font-mono text-indigo-200 space-y-1">
                <p className="text-slate-400"># Install & Deploy via CLI</p>
                <p>npm i -g vercel</p>
                <p>vercel</p>
                <p>vercel --prod</p>
              </div>

              <div className="text-[11px] text-slate-600">
                Config file: <code className="text-indigo-600 font-bold font-mono">vercel.json</code> included in root.
              </div>
            </div>
          </div>

          {/* Netlify */}
          <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-xs flex flex-col justify-between space-y-4">
            <div className="space-y-3">
              <div className="w-10 h-10 rounded-2xl bg-teal-500 text-white flex items-center justify-center font-bold text-lg">
                ◆
              </div>
              <h3 className="font-bold text-base text-slate-900">2. Deploy on Netlify</h3>
              <p className="text-xs text-slate-500 leading-relaxed">
                Ideal for form handling, branch deploy previews, split testing, and global edge network rules.
              </p>

              <div className="bg-slate-900 p-3 rounded-xl text-[11px] font-mono text-teal-200 space-y-1">
                <p className="text-slate-400"># Install & Deploy via CLI</p>
                <p>npm i -g netlify-cli</p>
                <p>netlify init</p>
                <p>netlify deploy --prod</p>
              </div>

              <div className="text-[11px] text-slate-600">
                Config file: <code className="text-teal-600 font-bold font-mono">netlify.toml</code> included in root.
              </div>
            </div>
          </div>

          {/* GitHub Pages */}
          <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-xs flex flex-col justify-between space-y-4">
            <div className="space-y-3">
              <div className="w-10 h-10 rounded-2xl bg-slate-800 text-white flex items-center justify-center font-bold">
                <GitBranch className="w-5 h-5" />
              </div>
              <h3 className="font-bold text-base text-slate-900">3. GitHub Pages</h3>
              <p className="text-xs text-slate-500 leading-relaxed">
                Hosted directly from your GitHub repository branch with automated GitHub Actions CI/CD workflows.
              </p>

              <div className="bg-slate-900 p-3 rounded-xl text-[11px] font-mono text-amber-200 space-y-1">
                <p className="text-slate-400"># Deploy via gh-pages</p>
                <p>npm i -D gh-pages</p>
                <p>npx gh-pages -d dist</p>
              </div>

              <div className="text-[11px] text-slate-600">
                Config file: <code className="text-amber-600 font-bold font-mono">public/404.html</code> included for SPA router.
              </div>
            </div>
          </div>
        </div>

        {/* Step 3: Platform Comparison Matrix (Topic f) */}
        <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-xs space-y-4">
          <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
            <Layers className="w-5 h-5 text-indigo-600" />
            <span>Platform Comparison Matrix (Experiment 12 topic f)</span>
          </h2>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border border-slate-200 rounded-xl overflow-hidden">
              <thead className="bg-slate-100 text-slate-700 uppercase font-bold tracking-wider">
                <tr>
                  <th className="p-3 border-b border-slate-200">Evaluation Criteria</th>
                  <th className="p-3 border-b border-slate-200 text-indigo-600">Vercel</th>
                  <th className="p-3 border-b border-slate-200 text-teal-600">Netlify</th>
                  <th className="p-3 border-b border-slate-200 text-slate-700">GitHub Pages</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {comparisonData.map((row, idx) => (
                  <tr key={idx} className="hover:bg-slate-50/70 transition">
                    <td className="p-3 font-bold text-slate-800">{row.feature}</td>
                    <td className="p-3 text-slate-600">{row.vercel}</td>
                    <td className="p-3 text-slate-600">{row.netlify}</td>
                    <td className="p-3 text-slate-600">{row.ghpages}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default DeploymentPage;
